$(function () {
    let _domainUrl = [".gov.cn",
        "http://127.0.0.1:5500/",
        "http://www.wuhan.gov.cn/",
        "https://www.wuhan.gov.cn/",
        "http://61.183.175.130/",
        "http://liuyan.cjn.cn/",
        "http://zt.cjn.cn/",
        "https://whgjj.hkbchina.com/",
        "http://119.97.201.22:8083/"
    ];
    $(document).on("click", "a", function (event) {
        var outerURL = this.getAttribute("href");
        return checkDomain(event, outerURL, { domainUrl: _domainUrl, domainName: "武汉市政务服务和大数据管理局", domainType: 0 });
    });
    function checkDomain(event, outerURL, settings) {
        if (!arguments[0]) {
            //alert("传入的参数格式有误！");
            return;
        }

        if (!arguments[1]) {
            // alert("传入的参数格式有误！");
            return;
        }
        var defaultSetting = {
            domainUrl: [window.location.host],
            domainName: window.location.host,
            domainType: 0
        }

        var extendSetting = $.extend(defaultSetting, settings);
        if (/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(outerURL)) {
            if (outerURL != "" && outerURL.toLowerCase().indexOf("javascript:") == -1) {
                var domainUrlFlag = false;
                for (var item in extendSetting.domainUrl) {
                    if (outerURL.toLowerCase().indexOf(extendSetting.domainUrl[item]) == -1) {
                        domainUrlFlag = false;
                    } else {
                        domainUrlFlag = true;
                        break;
                    }
                }
                if (!domainUrlFlag) {
                    //阻止默认事件
                    if (event.preventDefault) {
                        event.preventDefault();
                    } else {
                        event.returnValue = false;
                    }
                    var layerIndex = layer.confirm('您访问的链接即将离开“武汉市人民政府”门户网站，是否继续？', {
                        btn: ['继续访问', '放弃'] //按钮
                    }, function () {
                        window.open(outerURL);
                        layer.close(layerIndex)
                    }, function () {
                        console.log(333)
                    });
                } else {
                    if (1 === parseInt(extendSetting.domainType)) {
                        window.open(outerURL);
                    }
                }
            }
        } else {
            console.log(400)
            return openInWzaFrame(outerURL);
        }
    }
    var wzaUrlConfig = ["./", "http://www.wuhan.gov.cn/", "http://jyh.wuhan.gov.cn/pub/whs_70/"];
    function openInWzaFrame(outerURL) {
        //检查是否无障碍加载
        var ifra = window.parent.frames['frame-main'];
        var interceptClick = false;
        if (ifra != null) {
            //判断是否开启了无障碍,并从无障碍的iframe中载入
            for (var item in wzaUrlConfig) {
                console.log(403)
                if (outerURL.toLowerCase().indexOf(wzaUrlConfig[item]) != -1) {
                    //是本单位的网站，则继续进行无障碍浏览
                    console.log(444)
                    ifra.location.href = outerURL;
                    interceptClick = true;
                    break
                }
            }
        }
        return !interceptClick;
    }
})
