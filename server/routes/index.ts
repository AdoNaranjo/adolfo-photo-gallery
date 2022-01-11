import express, { Router } from 'express';
const { createProxyMiddleware } = require('http-proxy-middleware');

const router: Router = express.Router();

const updateQueryStringParameter = (path: string, key: string, value: string) => {
    const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    const separator = path.indexOf('?') !== -1 ? '&' : '?';
    if (path.match(re)) {
        return path.replace(re, '$1' + key + '=' + value + '$2');
    } else {
        return path + separator + key + '=' + value;
    }
};

var proxyOptions = {
    target: 'https://api.unsplash.com',
    changeOrigin: true,
    pathRewrite: function (path: string, req: any) {
        let newPath = path;
        newPath = updateQueryStringParameter(newPath, 'client_id', process.env?.ACCESS_KEY ?? '');
        return newPath.replace('/api', '');
    },
    onProxyReq(proxyReq: any, req: any, res: any) {
        console.log('[===== Proxy Request =====]');
        proxyReq.setHeader('Accept-Version', 'v1');
    },
    onProxyRes(proxyRes: any, req: any, res: any) {
        console.log('[===== Proxy Response =====]');
    },
};
var proxy = createProxyMiddleware(proxyOptions);

router.use('/', proxy);

module.exports = router;
