(function () {
    const scriptElement = document.createElement('script')
    scriptElement.src = 'http://res2.wx.qq.com/open/js/jweixin-1.4.0.js'
    document.body.append(scriptElement)
    scriptElement.onload = () => {
        fetch(`http://www.diswares.com/api/wx/sign?url=${encodeURIComponent(window.location.href.split('#')[0])}`)
            .then(response => {
                response.json().then(resp => {
                    const desc = document.getElementsByTagName('meta')['description'].content
                    // @ts-ignore
                    // noinspection JSUnresolvedVariable
                    window.wx.config({
                        debug: false,
                        appId: resp.appId,
                        timestamp: resp.timestamp,
                        nonceStr: resp.nonceStr,
                        signature: resp.signature,
                        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareQQ', 'onMenuShareTimeline']
                    })
                    const data = {
                        wxTitle: document.title,
                        wxDesc: desc ? desc : ' ',
                        href: window.location.href,
                        wxImg: `${window.location.protocol}//${window.location.host}/fatewa/icons/android-chrome-512x512.png`
                    }
                    // @ts-ignore
                    // noinspection JSUnresolvedVariable
                    window.wx.ready(function (e) {
                        // @ts-ignore
                        // noinspection JSUnresolvedFunction,JSUnresolvedVariable
                        window.wx.onMenuShareQQ({ // 分享QQ
                            title: data.wxTitle, // 分享标题
                            link: data.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致且分享的地址不要带端口
                            desc: data.wxDesc,
                            imgUrl: data.wxImg, // 分享图标
                            success: function (e) {
                                // 用户确认分享后执行的回调函数
                                // alert(e)
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        })

                        // @ts-ignore
                        // noinspection JSUnresolvedFunction,JSUnresolvedVariable
                        window.wx.onMenuShareTimeline({ // 分享QQ
                            title: data.wxTitle, // 分享标题
                            link: data.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致且分享的地址不要带端口
                            desc: data.wxDesc,
                            imgUrl: data.wxImg, // 分享图标
                            success: function (e) {
                                // 用户确认分享后执行的回调函数
                                // alert(e)
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        })

                        // @ts-ignore
                        // noinspection JSUnresolvedFunction,JSUnresolvedVariable
                        window.wx.updateAppMessageShareData({ // 分享好友
                            title: data.wxTitle, // 分享标题
                            link: data.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致且分享的地址不要带端口
                            desc: data.wxDesc,
                            imgUrl: data.wxImg, // 分享图标
                            type: '', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function (e) {
                                // 用户点击了分享后执行的回调函数
                                // alert(e);
                            }
                        })

                        // @ts-ignore
                        // noinspection JSUnresolvedFunction,JSUnresolvedVariable
                        window.wx.onMenuShareTimeline({ // 分享朋友圈
                            title: data.wxTitle, // 分享标题
                            link: data.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致且分享的地址不要带端口
                            desc: data.wxDesc,
                            imgUrl: data.wxImg, // 分享图标
                            success: function (e) {
                            }
                        })
                    })
                })
            })
    }
})()
