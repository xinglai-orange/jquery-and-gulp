!(function ($) {
    if(!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g,'');
        };
    }

    /*数字处理*/
    template.helper('numberFormat', function (value) {
        value = parseInt(value);
        if (isNaN(value)) {
            return 0;
        }

        if (value >= 10000) {
            value=value+"";
            var len=value.length;
            value=value.slice(0,len-3);
            return parseFloat(value/10) + "万";
        } else {
            return value
        }
    });
    /*数字处理-保留文字*/
    template.helper('numberFormatSuffix', function (value) {
        var reg=/([0-9]\d*\.?\d*)|(0\.\d*[0-9])/;
        var Suffix=value.replace(reg,"");
        value = parseInt(value);
        if (isNaN(value)) {
            return 0;
        }

        if (value >= 10000) {
            value=value+"";
            var len=value.length;
            value=value.slice(0,len-3);
            return parseFloat(value/10) + "万"+Suffix;
        } else {
            return value+Suffix;
        }
    });
    /*默认头像*/
    template.helper('defaultIco', function (value) {
        return !!value ? value : 'http://file.dakawengu.com/pubimages/headImg.png';
    });


    /*字符串截取*/
    template.helper('subString', function (content, length) {
        if (!content) {
            return "";
        }
        content = content.trim();
        //content=content
        //    .replace(/\[b\]([^\[]*?)\[\/b\]/igm, '<b>$1</b>')
        //    .replace(/\[i\]([^\[]*?)\[\/i\]/igm, '<i>$1</i>')
        //    .replace(/\[span\]([^\[]*?)\[\/span\]/igm, '<span>$1</span>')
        //    .replace(/\[url=([^\]]*)\]([^\[]*?)\[\/url\]/igm, '<a href="$1">$2</a>')
        //    .replace(/\[img\]([^\[]*?)\[\/img\]/igm, '<img src="$1" />');

        if (content.length > length + 1) {
            var first = content.toString().substring(0, length);
            content = first + "...";
        }
        return content;
    });
    /*时间转换*/
    template.helper('trustTime', function (inHisTime, pattern) {
        if (!inHisTime) {
            return;
        }
        inHisTime = inHisTime.toString().trim().replace(/-/gm, "/");
        var date = null,
            now = new Date();
        if (inHisTime.indexOf("/") != -1) {//yyyy-mm-dd HH:mm:ss
            date = new Date(inHisTime);
        } else {
            date = new Date(Number(inHisTime));// long 整型
        }
        var year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hours = date.getHours(),
            minute = date.getMinutes();
        var minuteTime = (hours < 10 ? "0" + hours : hours) + ":" + (minute < 10 ? "0" + minute : minute),
            monthTime = (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
        if (pattern && pattern.toLowerCase() === "time") {
            return minuteTime;
        } else if (now.toLocaleDateString() === date.toLocaleDateString()) {
            //当天 只显示时间
            return minuteTime;
        } else if (year === now.getFullYear()) {
            //当年 显示 月-日 时间
            return monthTime + " " + minuteTime;
        } else {
            //不是当年
            return year + "-" + monthTime + " " + minuteTime;
        }
    });
    /*替换地址*/
    template.helper('mp4Replace', function (content) {
        if (!content) {
            return "";
        }
        var comtentReplace =  content.replace('http://media.bigname.gp58.com','http://file.dakawengu.com')
            .replace('/video.m3u8','.mp4');
        return comtentReplace;
    });

    //htmlubb字符串处理
    template.helper('ubb2html', function (content) {
        // 转义 HTML 字符
        if(!content){
            return "";
        }
        var contents = content;
        // 解析 UBB 字符
        contents
            .replace(/\[b\]([^\[]*?)\[\/b\]/igm, '<b>$1</b>')
            .replace(/\[i\]([^\[]*?)\[\/i\]/igm, '<i>$1</i>')
            .replace(/\[p\]([^\[]*?)\[\/p\]/igm, '<p>$1</p>')
            .replace(/\[span\]([^\[]*?)\[\/span\]/igm, '<span>$1</span>')
            .replace(/\[url=([^\]]*)\]([^\[]*?)\[\/url\]/igm, '<a href="$1">$2</a>')
            .replace(/\[img\]([^\[]*?)\[\/img\]/igm, '<img src="$1" />');
        console.log(contents);
        return contents;
    });

    /*emoji表情过滤*/
    template.helper('emojiChange', function (content) {
        var html = content.trim().replace(/\n/g, '<br/>');
        html = jEmoji.softbankToUnified(html);
        html = jEmoji.googleToUnified(html);
        html = jEmoji.docomoToUnified(html);
        html = jEmoji.kddiToUnified(html);
        return jEmoji.unifiedToHTML(html);

    });
    /*月保费过滤*/
    template.helper('mouseCheck', function (content) {
        var myDate = new Date();
        if(myDate.getMonth()==11){
            var mouse=1;
        }else{
            var mouse=myDate.getMonth()+2;
        }
        return mouse+"月保费："+content+"元"
    });
    /*表格数过滤*/
    template.helper('formNum', function (content) {
        console.log(content);
        var formNum=0;
        for(k in content){
            formNum+=content[k].rightNames.length;
        }
        return formNum;
    });
    /*缴费方式过滤*/
    template.helper('payType', function (content) {
        console.log(content);
        if(content==1){
            return "趸交";
        }else if(content==2){
            return "年缴";
        }else if(content==3){
            return "月缴";
        }
    });






})(jQuery);


