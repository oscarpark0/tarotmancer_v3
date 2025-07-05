const axios = require('axios');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        console.error('ANTHROPIC_API_KEY environment variable not set.');
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    try {
        const requestBody = req.body;
        if (!requestBody || typeof requestBody !== 'object' || !requestBody.messages || !requestBody.model) {
            console.error('Invalid request body received:', requestBody);
            return res.status(400).json({ error: 'Invalid request body provided.' });
        }

        const payload = {
            ...requestBody,
            stream: true,
        };

        const anthropicResponse = await axios.post(
            'https://api.anthropic.com/v1/messages',
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01',
                },
                responseType: 'stream',
            }
        );

        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');

        anthropicResponse.data.on('data', (chunk) => {
            const lines = chunk.toString('utf8').split('\n').filter(line => line.trim() !== '');
            for (const line of lines) {
                if (line.startsWith('data:')) {
                    const data = line.substring(5).trim();
                    try {
                        const parsed = JSON.parse(data);
                        if (parsed.type === 'content_block_delta') {
                            const text = parsed.delta.text;
                            res.write(text);
                        }
                    } catch (e) {
                        console.error('Error parsing stream data chunk:', e);
                    }
                }
            }
        });

        anthropicResponse.data.on('end', () => {
            res.end();
        });

        anthropicResponse.data.on('error', (err) => {
            console.error('Stream error from Anthropic:', err);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Error during streaming.' });
            } else {
                res.end();
            }
        });

    } catch (error) {
        console.error('Error calling Anthropic API:', error);

        if (error.response) {
            console.error('API Error Data:', error.response.data);
            console.error('API Error Status:', error.response.status);
            const errorMessage = error.response.data?.error?.message || 'An error occurred with the interpretation service.';
            if (!res.headersSent) {
              res.status(error.response.status || 500).json({ error: errorMessage });
            }
        } else if (error.request) {
            console.error('API No Response:', error.request);
            if (!res.headersSent) {
              if (error.code === 'ECONNABORTED') {
                  res.status(504).json({ error: 'Request to interpretation service timed out.' });
              } else {
                  res.status(502).json({ error: 'Could not connect to interpretation service. No response received.' });
              }
            }
        } else {
            console.error('Axios Setup Error:', error.message);
            if (!res.headersSent) {
              res.status(500).json({ error: 'An unexpected error occurred while preparing the interpretation request.' });
            }
        }
    }
};
