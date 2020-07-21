
let util = {

};

util.title = function (title, vm) {
    let iTitle = '文库商城';
    if (title) {
        iTitle += ' - ' + (title.i18n ? vm.$t(title.i18n) : title);
    }
    window.document.title = iTitle;
};

// 目标数组是否包含当前数组中的元素
util.inOf = function (arr, targetArr) {
    let res = true;
    arr.forEach(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

// 目标数组是否包含当前元素
util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

/**
 * 格式化日期
 * @param {Date} date 日期
 * @param {String} fmt 格式化后的字符串 如：2020-06-20 10:00:00
 */
util.formatDate = function formatDate(date, fmt) {
    if (typeof date == 'string') {
      return date;
    }
  
    if (!fmt) fmt = "yyyy-MM-dd hh:mm:ss";
  
    if (!date || date == null) return null;
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
    return fmt
  }

  /**
   * 图片转换为base64
   * @param {*} sourceCanvas  dd
   */
util.uploadBase64 = function(sourceCanvas){
    var canvas = document.createElement('canvas'); 
    var context = canvas.getContext('2d'); 
    var width = sourceCanvas.width; 
    var height = sourceCanvas.height; 
    canvas.width = width; 
    canvas.height = height; 
    context.imageSmoothingEnabled = true; 
    context.drawImage(sourceCanvas, 0, 0, width, height); 
    context.globalCompositeOperation = 'destination-in'; 
    context.beginPath(); 
    context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true); 
    context.fill(); 
    return canvas; 
}

/**
 * 将Canvas转换为文件
 * @param {*} dataURL 图片路径
 * @param {*} fileName 图片名称
 */
util.dataURLtoFile = function(dataURL,fileName){
    let arr = dataURL.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let suffix = mime.split('/')[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], `${fileName}`, {type: mime})
}

/**
 * 判断参数是否为空或为NULL
 * @param {String} obj 字符串
 * @return { Object } ture|false 
 */
util.isNullOrEmpty = function(obj){
    if(typeof obj == 'undefined' || obj == null || obj == '' ){
        return true;
    }else{
        return false;
    }
}


export default util;
