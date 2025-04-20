const axios = require('axios');

// Function to format the reading data for the prompt (ensure this matches tarot.js)
function formatReadingForClaude(reading) {
    const { spread, cards } = reading;
    let prompt = `Please interpret this Tarot reading.\nSpread: ${spread.name} (${spread.description})\n\nCards Drawn:\n`;
    cards.forEach((card, index) => {
        const position = spread.positions[index] || `Position ${index + 1}`;
        const reversedText = card.isReversed ? ' (Reversed)' : '';
        prompt += `- ${position}: ${card.name}${reversedText}\n`; // Keep it concise for the API
    });
    prompt += "\nProvide a thoughtful, nuanced interpretation focusing on connections and insights.";
    return prompt;
}

// Fallback interpretation (basic)
function getFallbackInterpretation(reading) {
    let interpretation = `<h3>Fallback Interpretation</h3><p>Could not reach the AI interpretation service. Here is a basic summary:</p>`;
    interpretation += `<p>Spread: ${reading.spread.name}</p><ul>`;
    reading.cards.forEach((card, index) => {
        const position = reading.spread.positions[index] || `Position ${index + 1}`;
        const reversedText = card.isReversed ? ' (Reversed)' : '';
        interpretation += `<li>${position}: ${card.name}${reversedText} - ${card.description}</li>`;
    });
    interpretation += `</ul>`;
    return interpretation;
}

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
        // Don't send fallback if API key is missing server-side
        return res.status(500).json({ error: 'Server configuration error: API key missing.' });
    }

    try {
        const { reading } = req.body;
        if (!reading || !reading.spread || !reading.cards) {
            return res.status(400).json({ error: 'Invalid reading data provided.' });
        }

        const prompt = formatReadingForClaude(reading);

        const response = await axios.post(
            'https://api.anthropic.com/v1/messages',
            {
                model: 'claude-3-haiku-20240307', // Using Haiku for speed/cost
                max_tokens: 1024,
                messages: [
                    { role: 'user', content: prompt }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01'
                }
            }
        );

        // Ensure response.data.content is an array and has at least one element
        if (!response.data.content || !Array.isArray(response.data.content) || response.data.content.length === 0) {
             console.error('Unexpected response structure from Claude API:', response.data);
             throw new Error('Invalid response format received from API.');
        }

        // Format the text content for HTML display
        const rawText = response.data.content[0].text;
        const interpretation = rawText.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');

        res.status(200).json({ interpretation });

    } catch (error) {
        console.error('Error calling Anthropic API:', error.response ? error.response.data : error.message);
        // Generate and send fallback if API call fails
        if (req.body.reading) {
            const fallbackInterpretation = getFallbackInterpretation(req.body.reading);
            // Still send 200 OK but indicate it's a fallback
            return res.status(200).json({ interpretation: fallbackInterpretation, fallback: true });
        }
        // If no reading data available for fallback, send generic error
        res.status(500).json({ error: 'Failed to get interpretation from AI service.' });
    }
};
