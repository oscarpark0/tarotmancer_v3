// Diagnostic endpoint: echoes inbound headers and remote info.
// Used to observe what the Five9 Proxyfier sends when it forwards requests
// to tarotmancer.com as its configured upstream.

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({
        method: req.method,
        url: req.url,
        httpVersion: req.httpVersion,
        headers: req.headers,
        socket: {
            remoteAddress: req.socket && req.socket.remoteAddress,
            remoteFamily: req.socket && req.socket.remoteFamily,
        },
        node: process.version,
        region: process.env.VERCEL_REGION || null,
        now: new Date().toISOString(),
    });
};
