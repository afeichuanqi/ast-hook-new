const fs = require('fs');
const path = require('path');
class ProxyUtils {
    // 响应替换 优先级：1
    replaceResponse = [
        // {
        //     url: 'https://deo.shopeemobile.com/shopee/web-sdk/default/live/index.min.js',
        //     resources: './replaceResponse/a2c28765276c37d92105a7edad14caf106d93c87.js',
        //     method: 'POST'
        // },
        // {
        //     url: 'https://deo.shopeemobile.com/shopee/web-sdk/js/live/a2c28765276c37d92105a7edad14caf106d93c87.js',
        //     resources: './replaceResponse/a2c28765276c37d92105a7edad14caf106d93c87.js'
        // },
        // {
        //     url: 'https://www.baidu.com/',
        //     resources: './replaceResponse/baidu.html'
        // },
        {
            matchTexts: ['https://www.baidu.com/sugrec?&', '&req=2&csor=0'],
            resources: './replaceResponse/sugrec.json',
            method: 'post'
        }
    ]
    // 允许hook的url地址
    allowProxyUrl = [
        // "https://deo.shopeemobile.com/shopee/web-sdk/default/live/index.min.js"
        "https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/js/components/ai-talk-switch-1d0888d91e.js"
    ];
    // 允许对哪个html进行Cookie_hook
    allowHtmlHookCookieUrl = [
        'https://www.baidu.com/'
    ];
    // 是否允许翻墙
    proxyAgent = {
        open: false,
        url: 'http://127.0.0.1:10809'
    };

    matchAllowProxyUrl(requestDetail, responseDetail) {
        const reqUrl = requestDetail.url;
        return this.allowProxyUrl.some(url => reqUrl.indexOf(url) > -1) ||
            this.matchAllowHookCookieUrl(requestDetail, responseDetail) ||
            this.matchReplaceUrl(requestDetail, responseDetail);
    }

    matchAllowHookCookieUrl(requestDetail, responseDetail) {
        const reqUrl = requestDetail.url;
        return this.allowHtmlHookCookieUrl.some(url => url === reqUrl);
    }
    // 更换代理配置
    getProxyAgent() {
        return this.proxyAgent;
    }
    //替换资源匹配方法
    matchReplaceUrlFn = (i, requestDetail) => {
        const reqUrl = requestDetail.url;
        // var regExp = new RegExp(url, "g");
        // return regExp.test(reqUrl)
        if (i.matchTexts.every(matchText => reqUrl.indexOf(matchText) > -1)) {
            if (i.method) {
                return (i.method.toUpperCase() === requestDetail.requestOptions.method)
            }
            return true;
        }
        return false;
    }
    // 是否拦截替换资源 优先级1
    matchReplaceUrl(requestDetail, responseDetail) {
        console.log(responseDetail)
        return this.replaceResponse.some(i => {
            return this.matchReplaceUrlFn(i, requestDetail)
        })
    }
    matchReplaceUrlResponse(requestDetail, responseDetail) {
        const reqUrl = requestDetail.url;
        const data = this.replaceResponse.find(i => {
            return this.matchReplaceUrlFn(i, requestDetail)
        })
        if (!data) {
            console.warn(`匹配网址：${reqUrl}资源找不到`)
        }
        return fs.readFileSync(path.resolve(__dirname, data.resources)).toString();
    }
}
module.exports = new ProxyUtils();