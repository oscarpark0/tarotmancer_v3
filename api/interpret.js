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

        const response = await axios.post(
            'https://api.anthropic.com/v1/messages',
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01'
                },
                timeout: 30000
            }
        );
        res.status(200).json(response.data);

    } catch (error) {
        console.error('Error calling Anthropic API:', error);

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('API Error Data:', error.response.data);
            console.error('API Error Status:', error.response.status);
            const errorMessage = error.response.data?.error?.message || 'An error occurred with the interpretation service.';
            return res.status(error.response.status || 500).json({ error: errorMessage });
        } else if (error.request) {
            // The request was made but no response was received
            console.error('API No Response:', error.request);
            if (error.code === 'ECONNABORTED') {
                return res.status(504).json({ error: 'Request to interpretation service timed out.' });
            }
            return res.status(502).json({ error: 'Could not connect to interpretation service. No response received.' });
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Axios Setup Error:', error.message);
            return res.status(500).json({ error: 'An unexpected error occurred while preparing the interpretation request.' });
        }
    }
};
