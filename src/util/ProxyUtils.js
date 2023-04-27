const fs = require('fs');
const path = require('path');
class ProxyUtils {
    // 允许hook的url地址
    allowProxyUrl = [
    ];
    // 允许对哪个html进行Cookie_hook
    allowHtmlHookCookieUrl = [
    ];
    // 是否翻墙
    proxyAgent = {
        open: false,
        url: 'http://127.0.0.1:10809'
    };
    // 响应替换
    replaceResponse = [{
        url: 'https://www.baidu.com/',
        resources: './replaceResponse/baidu.html'
    }]
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
        console.log(data.resources)
        return fs.readFileSync(path.resolve(__dirname, data.resources)).toString();
    }
}
module.exports = new ProxyUtils();