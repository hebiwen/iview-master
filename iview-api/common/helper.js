
var util = {};

util.defaultPwd = '123456';

util.pageSize = 10;

util.sort = { asc : 1 , desc: -1 };

util.formatDate = function(date,format){
    /* 
     * eg:format="yyyy-MM-dd hh:mm:ss"; 
     */
    var o = {
        "M+": date.getMonth() + 1, // month  
        "d+": date.getDate(), // day  
        "h+": date.getHours(), // hour  
        "m+": date.getMinutes(), // minute  
        "s+": date.getSeconds(), // second  
        "q+": Math.floor((date.getMonth() + 3) / 3), // quarter  
        "S": date.getMilliseconds()
        // millisecond  
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4
                        - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? o[k]
                            : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

util.isNullOrEmpty = function(obj){
    if(typeof obj == 'undefined' || obj == null || obj == '' ){
        return true;
    }else{
        return false;
    }
}

util.currDate = util.formatDate(new Date(),"yyyy-MM-dd hh:mm");


// NBA final, laker, 总冠军
// var obj={
//     name: "laker",
//     msg: "总冠军"
//   }
//   var message1=`NBA final, ${obj.name}, ${obj.msg}` 

module.exports = util;
