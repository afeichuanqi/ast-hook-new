const fs = require('fs');
const path = require('path');
class ProxyUtils {
    // 响应替换 优先级：1
    replaceResponse = [
        {
            url: 'https://deo.shopeemobile.com/shopee/web-sdk/default/live/index.min.js',
            resources: './replaceResponse/a2c28765276c37d92105a7edad14caf106d93c87.js'
        },
        {
            url: 'https://deo.shopeemobile.com/shopee/web-sdk/js/live/a2c28765276c37d92105a7edad14caf106d93c87.js',
            resources: './replaceResponse/a2c28765276c37d92105a7edad14caf106d93c87.js'
        }
    ]
    // 允许hook的url地址
    allowProxyUrl = [
        // "https://deo.shopeemobile.com/shopee/web-sdk/default/live/index.min.js"
    ];
    // 允许对哪个html进行Cookie_hook
    allowHtmlHookCookieUrl = [
        // 'https://www.baidu.com/'
    ];
    // 是否翻墙
    proxyAgent = {
        open: false,
        url: 'http://127.0.0.1:10809'
    };

    matchAllowProxyUrl(reqUrl) {
        return this.allowProxyUrl
            .concat(this.allowHtmlHookCookieUrl)
            .concat(this.replaceResponse.map(i => i.url))
            .some(url => url === reqUrl);
    }

    matchAllowHookCookieUrl(reqUrl) {
        return this.allowHtmlHookCookieUrl.some(url => url === reqUrl);
    }
    getProxyAgent() {
        return this.proxyAgent;
    }
    matchReplaceUrl(reqUrl) {
        return this.replaceResponse.map(i => i.url).some(url => url === reqUrl)
    }
    matchReplaceUrlResponse(reqUrl) {
        const data = this.replaceResponse.find(i => i.url === reqUrl)
        return fs.readFileSync(path.resolve(__dirname, data.resources)).toString();
    }
}
module.exports = new ProxyUtils();