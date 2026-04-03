const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    console.log("Proxy!!!!");
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost:8080',
            changeOrigin: true,
            logLevel: 'debug',
            onProxyReq: (proxyReq, req, res) => {
                console.log(`[Proxy Request] ${req.method} ${req.url} -> http://localhost:8080${req.url}`);
            },
            onError: (err, req, res) => {
                console.error('[Proxy Error]', err);
            }
        })
    )
}