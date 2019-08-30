/* eslint-disable */
function getStyle(Ele, attr) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(Ele, null)[attr];
  }
  return Ele.currentStyle[attr];
}

function animate(Ele, json, callback) {
  //清空定时器,保证一个dom对象,只有一个定时器
  clearInterval(Ele.timer);
  Ele.timer = setInterval(() => {
    let flag = true;
    let current = 0;
    let target = 0;
    let step = 0;
    for (var attr in json) {
      if (attr == "opacity") {
        current = getStyle(Ele, attr) * 100;
        target = json[attr] * 100;
      } else {
        current = parseInt(getStyle(Ele, attr));
        target = json[attr]
      }

      step = (target - current) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);

      if (attr == "opacity") {
        Ele.style[attr] = (current + step) / 100;
        Ele.style.filter = `Alpha(Opacity=${current+step})`;
      } else if (attr == "zIndex") {
        Ele.style[attr] = json[attr]
      } else {
        Ele.style[attr] = current + step + 'px';
      }
      if (parseInt(current) != parseInt(target)) {
        flag = false;
      } else {
        flag = true;
      }
      if (flag) {
        clearInterval(Ele.timer);
        if (typeof (callback) == "function") {
          callback();
        }
      }
    }
  }, 20)
}
export default animate