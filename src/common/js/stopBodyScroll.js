/* eslint-disable */
let winScrollTop = 0
function stopBodyScroll (isFixed) { //禁止页面滚动
  var bodyEl = document.body;
  if(isFixed) {
    winScrollTop = document.documentElement.scrollTop || document.body.scrollTop
    bodyEl.style.position = 'fixed'
    bodyEl.style.top = '0' + 'px'
  } else {
    bodyEl.style.position = ''
    bodyEl.style.top = ''
    window.scrollTo(0, winScrollTop) // 回到原先的top
  }
}
export default stopBodyScroll