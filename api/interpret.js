const axios = require('axios');

// Vercel Serverless Function handler
module.exports = async (req, res) => {
    // Set CORS headers for all responses
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle OPTIONS preflight request for CORS
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Get API Key from environment variables
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        console.error('ANTHROPIC_API_KEY environment variable not set.');
        // Provide a generic server error message to the client
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    try {
        // The frontend now sends the body in the exact format needed by Anthropic.
        // We just need to validate that the body exists.
        const requestBody = req.body;
        if (!requestBody || typeof requestBody !== 'object' || !requestBody.messages || !requestBody.model) {
            console.error('Invalid request body received:', requestBody);
            return res.status(400).json({ error: 'Invalid request body provided.' });
        }

        // Forward the request body directly to Anthropic API
        const response = await axios.post(
            'https://api.anthropic.com/v1/messages',
            requestBody, // Pass the received body directly
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01'
                },
                 // Add a timeout to prevent hanging requests (e.g., 30 seconds)
                timeout: 30000
            }
        );

        // Send the successful response from Anthropic back to the frontend
        res.status(200).json(response.data);

    } catch (error) {
        console.error('Error calling Anthropic API:', error.response ? error.response.data : error.message);

        // Check if the error is from Axios (e.g., network error, timeout)
        if (error.isAxiosError) {
             if (error.code === 'ECONNABORTED') {
                return res.status(504).json({ error: 'Request to interpretation service timed out.' });
            }
            // Other Axios error (e.g., network issue)
             return res.status(502).json({ error: 'Could not connect to interpretation service.' });
        }
        
        // Check if the error is from Anthropic API (forward the status and message if possible)
        if (error.response && error.response.data && error.response.data.error) {
             const statusCode = error.response.status || 500;
             return res.status(statusCode).json({ error: error.response.data.error.message || 'Error processing interpretation request.' });
        }
        
        // Generic server error
        res.status(500).json({ error: 'An unexpected error occurred while getting the interpretation.' });
    }
};
