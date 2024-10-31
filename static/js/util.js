(function (window, $) {
    var util = {};

    function listenClick($dom, list, item, fn) {
        $dom.find(list).on("click", item, function (e) {
            $dom.find(item).removeClass("active");
            $(this).addClass("active");
            var ind = $dom.find(item).index(this);
            fn ? fn(ind) : null;
        });
    }
    function toggleClick($dom, list, item, fn) {
        $dom.find(list).on("click", item, function (e) {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
            } else {
                $dom.find(item).removeClass("active");
                $(this).addClass("active");
            }
            var ind = $dom.find(item).index(this);
            fn ? fn(ind) : null;
        });
    }

    // 修改红色主题下的图片路径
    function changThemeImg(theme) {
        if (!theme) {
            $("body").show()
            return;
        }

        $("img").each(function (item, index) {
            var url = $(this).attr("src");
            if (theme === 'red') {
                if (url.indexOf("/images/blue/") > -1) {
                    url = url.replace(/\/images\/blue\//g, '/images/red/');
                }
            } else {
                if (url.indexOf("/images/red/") > -1) {
                    url = url.replace(/\/images\/red\//g, '/images/blue/');
                }
            }
            $(this).attr("src", url)
        })
        if (theme === 'red') {
            $("body").addClass("red").removeClass('blue')
        } else {
            $("body").removeClass("red").addClass('blue')
        }
        $("body").show()


    }
    // 设置主题
    function selTheme() {
        var theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : '';
        if (theme) {
            $(".theme-box li[tag=" + theme + "]").addClass('sel').siblings('li').removeClass("sel")
        }

        $(".theme-box li").on("click", function (e) {
            e.stopPropagation();
            var tag = $(this).attr("tag")
            $(this).addClass('sel').siblings('li').removeClass('sel')
            changThemeImg(tag)
        })
        $(".theme-box .sure").on("click", function (e) {
            e.stopPropagation();
            var tag = $(".theme-box").find(".sel").attr("tag")
            localStorage.setItem('theme', tag)
            $(".theme-box").removeClass("open")
            window.location.reload()
        })
        $(document).on("click", function (e) {
            var event = e || window.event;
            var target = event.target;
            if (target.className.indexOf('theme') > -1 || $(target).parent().hasClass("theme")) {
                $(".theme-box").addClass("open")
            } else {
                $(".theme-box").removeClass("open")
            }

        })
        // $(".theme").on("click", function (e) {

        // })

    }
    // 获取查询字符串
    function getQuery(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg); //从?之后开始匹配如getQuery(courseid)返回一个数组["courseid=8","","8","&",index:0,input:"courseid=8"]
        if (r != null) return window.decodeURI(r[2]);
        return null;
    }
    // 设置iframe的高度
    function setIframeHeight(iframe) {
        $("#rIframe").attr("height", "610");
        // console.log('kullo->'+$("#rIframe").attr("src"));
        if (iframe) {
            var iframeWin =
                iframe.contentWindow || iframe.contentDocument.parentWindow;
            if (iframeWin.document.body) {
                var src = $("#rIframe").attr("src");
                if (src && ('../../zwgk/szfxx/' == src || './szfxx/' == src)) {
                    $("#rIframe").attr("scrolling", "auto");
                    iframe.height = 1280;
                } else {
                    $("#rIframe").attr("scrolling", "no");
                    iframe.height =
                        iframeWin.document.documentElement.scrollHeight ||
                        iframeWin.document.body.scrollHeight;
                }
            }
        }
    }
    // 设置详情页字体大小
    function setFontSize() {
        $(".fontSizeChange").on("click", "span", function () {
            $(this).attr("style", "color:#2d66a5;font-weight:500;").siblings('span').css('color', "#444440")
            if ($(this).hasClass('bigFont')) {
                $(".article p").css("font-size", "22px")
                $(".article span").css("font-size", "22px")
            } else if ($(this).hasClass('normalFont')) {
                $(".article p").css("font-size", "20px")
                $(".article span").css("font-size", "20px")
            } else {
                $(".article p").css("font-size", "16px")
                $(".article span").css("font-size", "16px")
            }

        })
    }
    // tab切换
    // handleObj需要hover的对象
    // isShowObj需要显示的对象
    function tabToggle(handleObj, isShowObj, event) {
        if (!event) {
            event = 'hover'
        }
        handleObj[event](function () {
            if (handleObj.hasClass("web-item")) {
                $(".about-webs-wrap").show()
            }
            var tab = $(this).attr("tab");
            $(this)
                .addClass("active")
                .siblings()
                .removeClass("active");
            $("" + isShowObj + "[tab=" + tab + "]")
                .addClass("open")
                .siblings()
                .removeClass("open");
            if (handleObj.hasClass("web-item")) {
                var docH = +document.body.scrollHeight;
                // if ($(window).scrollTop() !== docH - 10) {
                //     $(window).scrollTop(docH - 100);
                // }
                $(".web-item-tit-box li[tab=" + tab + "]")
                    .addClass("active")
                    .siblings()
                    .removeClass("active");
            }
        });
    }
    // 搜索 相关（转移到ssi通用底部模板里）
    // function searchAbout() {
    //     $(document).on("click", function (e) {
    //         var target = e.target;
    //         // 跳转到搜索页
    //         if (target.className.indexOf("go-search") > -1) {
    //             var keyValue = $(target).siblings(".search-value").val();
    //             keyValue = encodeURIComponent(keyValue);
    //             if (keyValue) {
    //                 window.open('https://www.wuhan.gov.cn/ssp/main/index.html?siteId=ff8080818b7f970f018b7fcd75d60001#keyWord=' + keyValue);
    //                 // window.location.href = 'https://www.wuhan.gov.cn/ssp/main/index.html?siteId=ff8080818b7f970f018b7fcd75d60001#keyWord=' + keyValue ;
    //             }
    //         }
    //         if (target.className.indexOf("s-word") > -1) {
    //             // $(".search-value").val($(target).text());
    //             var keyValue = $(target).text();
    //             keyValue = encodeURIComponent(keyValue);
    //             window.open('https://www.wuhan.gov.cn/ssp/main/index.html?siteId=ff8080818b7f970f018b7fcd75d60001#keyWord=' + keyValue);
    //         }
    //         //跳转到政务公开的搜索标签
    //         if (target.className.indexOf("go-search-gov-info-open") > -1) {
    //             var keyValue = $(target).siblings(".search-value").val();
    //             keyValue = encodeURIComponent(keyValue);
    //             if (keyValue) {
    //                 window.open('https://www.wuhan.gov.cn/ssp/main/index.html?siteId=ff8080818b7f970f018b7fcd75d60001#keyWord=' + keyValue + '&sourceType=SSP_OPENINFO');
    //             }
    //         }
    //     });

    //     $('#searchKeyword').on('keypress', function (event) {
    //         if (event.keyCode == 13) {
    //             $('#searchBtn').trigger('click');
    //         }
    //     });

    //     $("#queryTable").on("keydown", function (e) {
    //         // 兼容FF和IE和Opera
    //         var target = e.target;
    //         var theEvent = e || window.event;
    //         var keyValue = $(target).val();
    //         keyValue = encodeURIComponent(keyValue);
    //         var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    //         if (target.className.indexOf(".search-value") > -1) {
    //             if (code == 13) {
    //                 //回车执行查询
    //                 window.open('https://www.wuhan.gov.cn/ssp/main/index.html?siteId=ff8080818b7f970f018b7fcd75d60001#keyWord=' + keyValue);
    //             }
    //         }
    //     });

    //     $("input.search-value").on("focus", function (e) {
    //         console.log('on focus');//input得到焦点时触发
    //     });
    //     $("input.search-value").on("input", function (e) {
    //         console.log('on input');//input内容改变时触发
    //     });
    //     $("input.search-value").on("blur", function (e) {
    //         console.log('on unfocus');//input失去焦点时触发
    //     });

    //     //搜索关键词联想
    //     //https://www.wuhan.gov.cn/igs/front/suggest/term.jhtml?code=ffd32baa9d7a4b0db3d2c7a55d2e8959&searchWord=sd+
    //     //https://www.wuhan.gov.cn/igs/front/suggest/term.jhtml?code=ffd32baa9d7a4b0db3d2c7a55d2e8959&searchWord=ss
    //     //https://www.wuhan.gov.cn/igs/front/suggest/term.jhtml?code=ffd32baa9d7a4b0db3d2c7a55d2e8959&searchWord=%E7%9C%81%E5%B8%82
    // }

    // 读取浏览器环境
    var inBrowser = typeof window !== 'undefined';
    var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
    var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
    var UA = inBrowser && window.navigator.userAgent.toLowerCase();
    var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
    var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
   
    // 
    util.isWap = isAndroid || isIOS;
    util.tabToggle = tabToggle;
    util.setIframeHeight = setIframeHeight;
    util.listenClick = listenClick;
    util.getQuery = getQuery;
    util.toggleClick = toggleClick;
    selTheme()
    // searchAbout();
    setFontSize()
    changThemeImg(localStorage.getItem('theme') ? localStorage.getItem('theme') : '')
    window.util = util;
})(window, $);