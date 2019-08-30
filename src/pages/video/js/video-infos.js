/* eslint-disable */
import animate from '../../../common/js/animate.js'
// 工具
import UTILS from '../../../common/js/util.js'
class VIDEO_INFOS_INT {
  constructor () {
    this.videoInfosBox = document.querySelector('.video-infos-box')
    
  }
  init () {
    
  let _html = `<div class="open-app-btn open-app-btn-big">打开爆米花视频APP 看高清完整版</div><div class="title oneLine">${VIDEO_INFOS.videoTitle}<span class="zoom"></span></div>
    <div class="video-footer-box">
      <div class="video-footer">
        <div class="from"><img src="${VIDEO_INFOS.userAvatar}" class="pic">
        ${VIDEO_INFOS.userName}
          <em class="indent-tag"></em></div>
        <div class="hot-box">${UTILS.getRandomNum(10000, 20000)}</div>
      </div>
    </div>`
  this.videoInfosBox.innerHTML = _html
  this.handleInfosZoom()
  this.title = this.videoInfosBox.querySelector('.title')
  }
  handleInfosZoom () {
    // 用户信息缩放
    const download = this.videoInfosBox.querySelector('.open-app-btn-big')
    const zoom = this.videoInfosBox.querySelector('.zoom')
    const topBtn = document.querySelector('.header-top-btn')
    let zoomIndex = 1
    setTimeout(() => {
      download.classList.add('move')
      download.style.left = document.body.scrollWidth/2 - 15 + "px"
    }, 10000)
    setTimeout(() => {
      animate(download, {
        top: 0,
        opacity: 0,
        left:(topBtn.getBoundingClientRect().left+30),
      },function(){
      })
    }, 10100)
    // 箭头事件
    zoom.addEventListener('click', () => {
      if (zoomIndex === 0) {
        this.videoInfosBox.classList.add('close')
        this.title.classList.add('oneLine')
        zoomIndex = 1
      } else {
        this.videoInfosBox.classList.remove('close')
        this.title.classList.remove('oneLine')
        zoomIndex = 0
      }
    })
  }
}


export default VIDEO_INFOS_INT