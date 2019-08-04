/**
 * Created by Administrator on 2017/8/2.
 */

/**
 * Created by Administrator on 2017/8/2.
 */

var browser = {
    versions: function() {
        var u = navigator.userAgent;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Firefox') > -1, //火狐内核Gecko
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android
            iPhone: u.indexOf('iPhone') > -1 , //iPhone
            iPad: u.indexOf('iPad') > -1, //iPad
            webApp: u.indexOf('Safari') > -1, //Safari
            user :u,
        };
    }()
}


$.extend({
    tools:tools,//工具类
    regular:regular,//正则类
    getQueryString:getQueryString,//正则类
    ajaxPackage:ajaxPackage,//ajax托管
    msg: function (text) {
        //中间轻提示框
        layer.open({
            content: text,
            skin: 'msg',
            style: 'bottom:0;',
            time: 2 //2秒后自动关闭
        });
    },
    alert: function (text, btn,yes) {
        //ios风格确认按钮弹窗
        layer.open({
            content: text,
            skin: 'lzAlert',
            btn: btn || '我知道了',
            yes: function (index) {
                layer.close(index);
                if(typeof yes == 'function')yes(index);
            },
        });
    },
    footer: function (text, type) {
        //底部提示框
        layer.open({
            content: text,
            skin: 'footer',
            shadeClose: type ? false : true
        });
    },
    loading: function (text) {
        //加载中
        var loading = layer.open({
            type: 2,
            content: text,
            shadeClose: false
        });
        return loading
    },
    /**
     * 询问框弹窗
     * text-文字
     * btns-按钮文本-字符串数组
     * yes-成功回调
     * no-失败回调
     */
    inquiry: function (text, btns, yes, no) {
        var inquiry = layer.open({
            content: text,
            btn: btns,
            skin: "inquiry",
            yes: function (index) {
                layer.close(inquiry);
                yes(index);
            },
            no: function () {
                if($.tools().isFn(no)){
                    no();
                }
            }
        });
    }
});
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
//工具类
function tools(){
    return {
        android:browser.versions.android,//安卓
        trident: browser.versions.trident, //IE内核
        presto: browser.versions.presto, //opera内核
        webKit: browser.versions.webKit, //苹果、谷歌内核
        gecko: browser.versions.gecko, //火狐内核Gecko
        mobile: browser.versions.mobile, //是否为移动终端
        ios: browser.versions.ios, //ios
        iPhone: browser.versions.iPhone, //iPhone
        iPad: browser.versions.iPad, //iPad
        webApp: browser.versions.webApp, //Safari
        user: browser.versions.user, //Safari
        //微信
        isWeiXin: function () {
            var ua = window.navigator.userAgent.toLowerCase();
            console.log(ua)
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        },
        //获取安卓版本号
        getAnbanben: function () {
            var user=this.user;
            var index = user.indexOf("Android");
            if(index>0){
                return parseFloat(user.slice(index+8));
            }else{
                return null;
            }
        },
        // 获取html名称
        pageName: function () {
            var a = location.href;
            var b = a.split("/");
            var c = b.slice(b.length - 1, b.length).toString(String).split(".");
            return c.slice(0, 1);
        }
    }
}

//正则类
function regular(){
    return {
        //电话号码
        isPhone : function(phone) {
            var pattern = /^1[3,4,5,7,8]\d{9}$/;
            return pattern.test(phone);
        },
        //邮件
        isEmail : function(email) {
            var pattern = /^((([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})[; ,])*(([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})))$/;
            return pattern.test(email);
        },
        //姓名
        isName : function(val) {
            var pattern = /^[\u4E00-\u9FA5]{2,10}$/;
            return pattern.test(val);
        },
        //邮编
        isZip : function(val) {
            var pattern =  /^[0-9]\d{5}$/;
            return pattern.test(val);
        },
        //身份证
        issfz : function(val) {
            var pattern =  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            return pattern.test(val);
        },

    }
}
//对ajax 进行统一的托管处理: 比如统一的错误码处理et...
function ajaxPackage(paramList,num){
    //var baseUrl = ''; // 默认的基础url
    var baseUrl = 'http://bdm.lzyunying.com'; // 模拟域名
    var sendNum=num | 0;
    var _httpDefaultOpts = {
        type: 'POST', // GET/DELETE/HEAD/JSONP/POST/PUT
        url: '',
        dataType: 'json',
        params: {}, // 拼接在url的参数
        contentType:'application/x-www-form-urlencoded',
        data: {},
        isBase: true,
        beforeSend: function () {}, // ajax 执行开始 执行函数
        success: function (data,falseinfo) {}, // ajax 执行成功 执行函数
        error: function (data) {}, // ajax 执行失败 执行函数
        complete: function (data) {}// ajax 执行结束 执行函数
    };
    if ($.isPlainObject(paramList)) {
        paramList = $.extend({}, _httpDefaultOpts, paramList);
        //把所有参数按照英文首字母升序排列得到一个字符串
        if (paramList.isBase) {
            paramList.url = baseUrl + paramList.url;
        }
        ajax();
        function ajax(){
            $.ajax({
                type: paramList.type,
                url: paramList.url,
                dataType: paramList.dataType,
                data: paramList.data,
                contentType:paramList.contentType,
                async:paramList.async,
                beforeSend: function (request) {
                    paramList.beforeSend();
                    if(sendNum>0)return false;
                },
                success: function (data,textStatus,jqXHR ) {
                    sendNum++;
                    if(data.httpCode==401){
                        layer.msg("登录超时，请重新进入");
                        paramList.success(data,false);
                        return;
                    }
                    else if(data.httpCode==303){
                        layer.msg("请返回菜单重新进入");
                        paramList.success(data,false);
                        return;
                    }
                    else if(data.httpCode==500){
                        layer.msg("系统走神了,请稍候再试");
                        paramList.success(data,false);
                        return;
                    }
                    paramList.success(data,true);
                },
                error: function (data) {
                    paramList.error(data);
                },
                complete: function (data) {
                    paramList.complete(data);
                }
            });
        }
    }
}
//用户信息的判断函数，显示不同的字体
isiOS()
function isiOS(){
    var userAgents=$.tools();
    if (userAgents.ios || userAgents.iPhone || userAgents.iPad) {
        $("body").css("fontFamily","arial")
    }
}


