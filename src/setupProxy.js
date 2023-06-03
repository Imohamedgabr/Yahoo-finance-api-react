const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = app => {
    app.use(
        createProxyMiddleware('/v8/finance/chart/MAREL.IC?region=US&lang=en-US&includePrePost=false&interval=1wk&range=5y&corsDomain=finance.yahoo.com&.tsrc=finance', {
            target: 'https://query1.finance.yahoo.com',
            changeOrigin: true
        })
    )
}