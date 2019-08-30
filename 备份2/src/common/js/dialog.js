/* eslint-disable */
var dialogs = {
  showLoading: function(string, type){
    var dialog = document.createElement("div"),
    dislogClassName = type === 'black' ? "mask-black-dialog" : "mask-white-dialog";
    dialog.className = dislogClassName
    dialog.innerHTML = '<div class="m-loading"><div class="loading-icon"></div><div class="loading-txt">' + string + '</div></div>'
    !document.querySelector('.' + dislogClassName) && document.body.appendChild(dialog)
  },
  hideLoading: function(type, callback){
    var dislogClassName = type === 'black' ? "mask-black-dialog" : "mask-white-dialog";
    document.querySelector('.' + dislogClassName) && document.body.removeChild(document.querySelector('.' + dislogClassName))
    callback && callback()
  },
  toast: function(string, type, time, fuc, theme){
    var dialog = document.createElement("div"),
    dislogClassName = theme === 'black' ? "mask-black-dialog" : "mask-white-dialog";
    var html = ''
    if (type === 'none' || '') {
      html += '<div class="m-toast none-icon">'
    }else{
      html += '<div class="m-toast ">'
    }
    if (type === 'success') {
      html += '<div class="toast-success-ico"></div>'
    } else if (type === 'error') {
      html += '<div class="toast-error-ico"></div>'
    }
    dialog.className = dislogClassName
    html += '<p class="toast-content">' + string + '</p></div>'
    dialog.innerHTML = html
    !document.querySelector('.' + dislogClassName) && document.body.appendChild(dialog)
    setTimeout(function(){
      document.querySelector('.' + dislogClassName) && document.body.removeChild(document.querySelector('.' + dislogClassName))
      if (typeof fuc === 'function') {
        fuc()
      }
    }, time || 1500)
  },
  alert: function(string, fuc, theme){
    var dialog = document.createElement("div"),
    dislogClassName = theme === 'black' ? "mask-white-dialog" : "mask-black-dialog";
    dialog.className = dislogClassName
    dialog.innerHTML = '<div class="m-confirm m-alert"><div class="confirm-bd">' + string + '</div><div class="confirm-ft"><a href="javascript:;" class="confirm-btn primary">知道了</a></div></div>'
    !document.querySelector('.' + dislogClassName) && document.body.appendChild(dialog)
    document.querySelector('.' + dislogClassName).querySelector('.confirm-ft').onclick = function(){
      document.querySelector('.' + dislogClassName) && document.body.removeChild(document.querySelector('.' + dislogClassName))
      if (typeof fuc === 'function') {
        fuc()
      }
    }
  },
  confirm:function(title, content, optionsArray, theme){
    var dialog = document.createElement("div"),
    dislogClassName = theme === 'black' ? "mask-white-dialog" : "mask-black-dialog";
    dialog.className = dislogClassName
    var _html = '<div class="m-confirm"><div class="confirm-hd"><strong class="confirm-title">'+title+'</strong></div><div class="confirm-bd">'+content+'</div><div class="confirm-ft">'
    for (var k=0; k < optionsArray.length; k++) {
      if (optionsArray.length === 1) {
        if (optionsArray[k].color) {
          _html += '<a href="javascript:;" class="confirm-btn default" style="color:'+optionsArray[k].color+'">' + optionsArray[k].txt + '</a>'
        }else{
          _html += '<a href="javascript:;" class="confirm-btn default">' + optionsArray[k].txt + '</a>'
        } 
      }else if (optionsArray.length === 2) {
        if (k === 0) {
          if (optionsArray[k].color) {
            _html += '<a href="javascript:;" class="confirm-btn default" style="color:'+optionsArray[k].color+'">' + optionsArray[k].txt + '</a>'
          }else{
            _html += '<a href="javascript:;" class="confirm-btn default">' + optionsArray[k].txt + '</a>'
          } 
        }else if (k === 1) {
          if (optionsArray[k].color) {
            _html += '<a href="javascript:;" class="confirm-btn primary" style="color:'+optionsArray[k].color+'">' + optionsArray[k].txt + '</a>'
          }else{
            _html += '<a href="javascript:;" class="confirm-btn primary">' + optionsArray[k].txt + '</a>'
          } 
        }
      }
    }
    _html += '</div></div>'
    dialog.innerHTML = _html
    !document.querySelector('.' + dislogClassName) && document.body.appendChild(dialog)
    var dislogBox = document.querySelector('.' + dislogClassName)
    for (var i=0; i<optionsArray.length; i++) {
      (function(h){
        dislogBox.querySelectorAll('.confirm-btn')[h].onclick = function(){
          dislogBox && document.body.removeChild(dislogBox);
          if (optionsArray[h].callback && typeof(optionsArray[h].callback) === 'function') {
            optionsArray[h].callback()
          }
        }
      })(i)
    }
  },
  notify: function(string, times, fuc){
    var dialog = document.createElement("div"),
    dislogClassName = "m-notify";
    dialog.className = dislogClassName
    dialog.innerHTML = string
    if(!document.querySelector('.' + dislogClassName)){
      !document.querySelector('.' + dislogClassName) && document.body.appendChild(dialog)
      notifytime = setTimeout(function(){
        dialog.classList = 'm-notify notify-out'
        if (typeof fuc === 'function') {
          fuc()
        }
        notifytimer = setTimeout(function(){
          console.log(2)
          document.querySelector('.' + dislogClassName) && document.body.removeChild(document.querySelector('.' + dislogClassName))
        }, 35)
        
      }, times || 2000)
    }
    
  }
}
export default dialogs