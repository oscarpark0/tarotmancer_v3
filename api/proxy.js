// Vercel serverless function that forwards Proxyfier requests to Five9.
// Keeps the long-lived bearer token server-side as an env var.
//
// Required env vars:
//   FIVE9_PROXY_BEARER_TOKEN  - long-lived bearer token issued by Five9
//   FIVE9_PROXY_URL           - full proxy URL (default: the user's provisioned URL)

const DEFAULT_PROXY_URL = 'https://app.ps.five9.com/proxy/r/38tp/54qn';

module.exports = async (req, res) => {
    // Same-origin in production; permissive for local/preview testing.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const token = process.env.FIVE9_PROXY_BEARER_TOKEN;
    if (!token) {
        console.error('FIVE9_PROXY_BEARER_TOKEN is not set.');
        return res.status(500).json({ error: 'Server configuration error: missing proxy bearer token.' });
    }

    const proxyUrl = process.env.FIVE9_PROXY_URL || DEFAULT_PROXY_URL;

    let body = req.body;
    if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (_) {
            return res.status(400).json({ error: 'Invalid JSON body.' });
        }
    }
    if (!body || typeof body !== 'object') {
        return res.status(400).json({ error: 'Request body must be a JSON object matching RedirectProxyRequestDto.' });
    }
    if (!body.url || !body.method) {
        return res.status(400).json({ error: 'Body requires at least "url" and "method".' });
    }

    // Sensible defaults per the Proxyfier schema.
    const payload = {
        contentType: 'application/json',
        retryCount: 3,
        ...body,
    };

    // Diagnostic short-circuit: send ?echo=1 to skip the upstream call and
    // confirm the handler itself is responding correctly.
    if (req.query && (req.query.echo === '1' || req.query.echo === 'true')) {
        return res.status(200).json({
            ok: true,
            proxyUrl,
            tokenLen: token.length,
            receivedPayload: payload,
            runtime: { node: process.version, region: process.env.VERCEL_REGION || null },
        });
    }

    try {
        console.log('[proxy] calling', proxyUrl, 'method=', payload.method, 'url=', payload.url);
        const upstream = await fetch(proxyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        const text = await upstream.text();
        res.status(upstream.status);
        const ct = upstream.headers.get('content-type') || 'application/json';
        res.setHeader('Content-Type', ct);
        return res.send(text);
    } catch (err) {
        console.error('Proxyfier request failed:', err);
        return res.status(502).json({ error: 'Failed to reach Proxyfier service.', detail: String(err) });
    }
};
