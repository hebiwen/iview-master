// 字符串格式化
String.prototype.format = function(){
    if(arguments.length === 0) return this;
	var param = arguments[0], str= this;
	if(typeof(param) === 'object') {
		for(var key in param)
			str = str.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
		return str;
	} else {
		for(var i = 0; i < arguments.length; i++)
			str = str.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
		return str;
	}
}

// 字符串格式化 string.Format
// String.prototype.format = function () {
//     var args = arguments;
//     return this.replace(/\{(\d+)\}/g,
//         function (m, i) {
//             return args[i];
//         });
// }

//给日期类型添加一个格式化的方法
Date.prototype.format = function (format) {
    /* 
     * eg:format="yyyy-MM-dd hh:mm:ss"; 
     */
    var o = {
        "M+": this.getMonth() + 1, // month  
        "d+": this.getDate(), // day  
        "h+": this.getHours(), // hour  
        "m+": this.getMinutes(), // minute  
        "s+": this.getSeconds(), // second  
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter  
        "S": this.getMilliseconds()
        // millisecond  
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
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
};




