/* eslint-disable */
import UTILS from '../../../common/js/util.js'
import getStat from '../../../common/js/getStat'
import {BMH_APP_IOS_URL} from './path.js'
import openApp from './openApp.js'
class PLAYER {
  constructor () {}
  init () {
    this.allowPlay = true
    this.primaryPlayer = document.querySelector('#primaryPlayer')
  }
  addListenerVideoUpdate () {
    let _this = this
    let iframe = document.querySelector('#videoIframe')
    iframe.onload = function () {
      if(UTILS.isFromHZ){return}//来自淘新闻不展示app推广
      var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      var iframeVideo = iframeDocument.querySelector("video")
      _this.iframeVideo = iframeVideo
      iframeVideo.addEventListener('ended', _this.handleEvent.bind(_this), false)
      //属于top100内的视频并且是二跳，增播放到2/3时暂停，添加app导量
      if (UTILS.Top100PV.isTop100Video(100, VIDEO_INFOS.flvid) && location.href.indexOf('ref=re') > -1) {
        iframeVideo.addEventListener('timeupdate', _this.handleEvent.bind(_this), false)
      }
      //属于top10 增加导量位
      if (UTILS.Top100PV.isTop100Video(10, VIDEO_INFOS.flvid) && !UTILS.isFromIqiyi) {
        iframeVideo.addEventListener('timeupdate', _this.handleEvent.bind(_this), false)
      }
    }
  }
  handleEvent (event) {
    switch(event.type) {
			case 'ended':
				this.onended()
        break
      case 'timeupdate':
        this.ontimeupdate()
        break;
			case 'error': //黑屏
				break
		}
  }
  onended () {
    if (!UTILS.isChildrenChannel()){
      var html = '<a href="https://itunes.apple.com/cn/app/%E7%88%86%E7%B1%B3%E8%8A%B1%E8%A7%86%E9%A2%91-%E6%AF%8F%E6%97%A5%E6%96%B0%E9%B2%9C%E7%83%AD%E7%82%B9%E7%88%86%E4%B8%8D%E5%81%9C/id781186884?mt=8"><img src="//static01.baomihua.com/img/mobile/v3/video_end_poster.png" class="app app-enter-video"></a>'
      if (!UTILS.isAppleMobileDevice()) {
        html = '<img src="//static01.baomihua.com/img/mobile/v3/video_end_poster.png" class="app app-enter-video">'
      }
      this.primaryPlayer.innerHTML = html
      //H5播放视频后出现的后贴片广告曝光统计
      getStat(1122, 1)
      this.handleEndClick()
      
    }
  }
  handleEndClick (title='', img=0, num=0, index=0, addressid='') {
    document.querySelector('.app-enter-video').addEventListener('click', () => {
      let downurl = 'https://storage.baomihua.com/app/baomihua/android/baomihua4_h5.apk',
      objid = 'video_end',
      appname = 'baomihua'
      getStat(380, 1)

      if (downurl.indexOf('/baomihua') === -1 && downurl.indexOf('/kuaikan') === -1 && downurl.indexOf('/baomihua_js') === -1 && downurl.indexOf('xiaoxiao') === -1) { //&& downurl.indexOf('/psd_bmhwap') === -1
          location.href = downurl
          return
        }
        setTimeout(function(){
          if (UTILS.isAndroidMobileDevice()) {
            if (downurl.indexOf('kuaikan') > -1 || downurl.indexOf('/baomihua_js') > -1) {
              appname = 'kuaikan'
            }
            openApp({//objid,视频标题， 下载地址， 视频封面， 排序num， 一跳还是二跳 1是一跳
              appname: appname,
              objid: objid,
              title: title,
              downurl: downurl,
              appPoster: img,
              number: num,
              index: index,
              addressid: addressid
            })
          }
        }, 100)
    })
  }
  ontimeupdate () {
    //添加播放到2/3显示app暂停位
    var video = this.iframeVideo
    this.totalTime = video.duration
    if (video.currentTime < this.totalTime * 0.66) {//解决用户往回看时的不触发
      if (this.allowPlay) {
        this.allowPlay = false
      }
    }
    if (video.currentTime < this.totalTime && video.currentTime > this.totalTime * 0.66 && !this.allowPlay ) {//注意部分手机timeupdate第一次返回的currentTime是视频的时长，所以加上默认小于时长
      video.pause()
      this.allowPlay = true
      var volume = video.volume
      //触发暂停位
      var videoClickNum = UTILS.Top100PV.isTop100Video(10, VIDEO_INFOS.flvid) ? 382 : 381;//统计字段 默认top100是381，top10是382
      this.addPausedEvent(volume, videoClickNum)
    }
  }
  addPausedEvent (volume, videoClickNum){ // 添加暂停位
    let posterImg = this.iframeVideo.parentNode.querySelector('.poster img').getAttribute('src')
    let html = `<div class="v-paused"><img src="${posterImg}" class="v-paused-poster"><div class="v-paused-mask"></div><div class="v-paused-inner"><img src="//static01.baomihua.com/img/mobile/v3/video-paused-bg2.png" class="paused-image"></div><div class="progress"><span class="paused-small-btn"></span><span class="play-time">${UTILS.changeHourMinutestr(this.iframeVideo.currentTime)}</span><div class="progress-line"><div class="progress-line-active"></div><div class="progress-ball"></div></div><span class="total-time">${UTILS.changeHourMinutestr(this.totalTime)}</span><span class="full-btn"></span></div></div>`
    var odiv = document.createElement('div')
    odiv.className = 'v-paused'
    odiv.innerHTML = html
    this.primaryPlayer.appendChild(odiv)
    this.iframeVideo.style.width = '1px'
    this.iframeVideo.style.height="1px"
    this.iframeVideo.volume = 0
    var progressWrap = document.querySelector('.progress')
    var progressLine = progressWrap.querySelector('.progress-line')
    var progressLineActive = progressWrap.querySelector('.progress-line-active')
    var progressBall = progressWrap.querySelector('.progress-ball')
    var width = progressLine.offsetWidth
    progressLineActive.style.width = width * 0.66 + 'px'
    progressBall.style.left = (width * 0.66) - 4 + 'px'
    //曝光统计
    if (videoClickNum === 381) {//top100
      getStat(1123, 1)
    }else{//top10
      getStat(1124, 1)
    }
    
    //触发继续播放逻辑
    this.continuePlay(volume, videoClickNum)
  }
  continuePlay (volume, videoClickNum){
    var clickUrl = ''
    let _this = this
    // var bcode = flvid + '|' + channelId + '|2|15|' + videoClickNum + '|11'
    var refurl = '无';
    var vPaused = document.querySelector('.v-paused')
    if (document.referrer) {
      refurl = encodeURIComponent(document.referrer) + '|' + encodeURIComponent(location.href) + 'actionurlsep' + encodeURIComponent(clickUrl);
    } else {
      refurl = refurl + '|' + encodeURIComponent(location.href) + 'actionurlsep' + encodeURIComponent(clickUrl);
    }
    vPaused.querySelector('.paused-image').addEventListener('click', function(){
      // bcode = flvid + '|' + channelId + '|2|15|' + videoClickNum + '|12'
      // if (UTILS.isAppleMobileDevice()) {
      //   bcode = flvid + '|' + channelId + '|2|15|' + videoClickNum + '|22'
      // }
      getStat(videoClickNum, VIDEO_INFOS.flvid)
      var url = "https://storage.baomihua.com/app/baomihua/android/baomihua3_h5.apk"
      if (UTILS.isAppleMobileDevice()) {
        url = BMH_APP_IOS_URL
      }
      window.location.href = url
    })
    vPaused.querySelector('.v-paused-mask').addEventListener('click', function(){
      continuePlayByPlay()
    })
    vPaused.querySelector('.progress').addEventListener('click', function(){
      continuePlayByPlay()
    })
    function continuePlayByPlay() {
      _this.iframeVideo.play()
      _this.primaryPlayer.removeChild(document.querySelector('.v-paused'))
      _this.iframeVideo.style.width = '100%'
      _this.iframeVideo.style.height="100%"
      _this.iframeVideo.parentNode.querySelector('.poster').style.display = 'none'
      _this.iframeVideo.volume = volume
    }
  }
}
const PLAYERs = new PLAYER()
PLAYERs.init()
window.videoBeforeLoad = function(flag){
  var bd_video_poster_src = '';
  var playerBox = document.querySelector('#primaryPlayer')
  // if (flag === true || flag === false) {return}
  if (!UTILS.isChildrenChannel()) {
    if (flag === 1) {
      if(UTILS.curPagesType === 1 && location.href.indexOf('?ly=hz_txw_yangsheng') === -1){
        bd_video_poster_src = '//b1.baomihua.com/source/production/o7gki.js?m=hzejeiqe'
      }else if(UTILS.curPagesType === 2 && location.href.indexOf('?ly=hz_txw_yangsheng') === -1){
        bd_video_poster_src = '//b1.baomihua.com/production/res/static/6eiv.js?qld=inimut'
      }
    } else if (flag === 2) {
      var time = 11
      var odiv = document.createElement('div')
      odiv.className = 'poster-before-master'
      odiv.id = 'poster-before-master'
      odiv.innerHTML = '<div class="master-time" style="display:none">广告剩余：<span>10</span>秒</div>'
      playerBox.appendChild(odiv)
      var timeCount = document.querySelector('.master-time span')
      window.ADEZ_slotid = 1031799;
      window.ADEZ_target = 'poster-before-master'
      UTILS.getJs('poster-before-master', 'https://pic.ggxt.net/sdk/js/core.m.js')
      var timers = setInterval(function(){
            if (odiv.children.length > 2) {
              if (document.querySelector('.master-time').style.display === 'none') {
                var bcode = '1|1|2|15|1125|1'
                getStat(3, bcode, location.href)
                document.querySelector('.master-time').style.display = 'block'
                // document.querySelector('.poster-before-master').addEventListener('click', function(){
                  
                // })
              }
              time--
              timeCount.textContent = (time>=10 ? ''+time : '0'+time)
              if (time === 0) {
                playerBox.removeChild(odiv)
                clearInterval(timers)
              }
            }
          }, 1000)
    }else{
      bd_video_poster_src = ''
    }
    if (UTILS.isFromHZ || UTILS.isFromSG()) {//来自淘新闻不展示前贴
      bd_video_poster_src = '';
    }
  }
  var oiframe = document.createElement('iframe')
  oiframe.setAttribute('frameborder', 0)
  oiframe.scrolling = 'no'
  oiframe.setAttribute('adSrc', bd_video_poster_src)
  oiframe.id = 'videoIframe'
  oiframe.style.position = 'absolute'
  oiframe.style.left = '0'
  oiframe.style.top = '0'
  oiframe.style.right = '0'
  oiframe.style.bottom = '0'
  oiframe.style.width = '100%'
  oiframe.style.height = '100%'
  oiframe.src = '//m.video.baomihua.com/iframe/player.html?videoId='+VIDEO_INFOS.flvid+'&from=h5video'
  playerBox.appendChild(oiframe)
  PLAYERs.addListenerVideoUpdate()
}
// window.videoBeforeLoad = function(flag){
//   var bd_video_poster_src = '';
//   if (!UTILS.isChildrenChannel() && flag) {
//     if(UTILS.curPagesType === 1 && location.href.indexOf('?ly=hz_txw_yangsheng') === -1){
//       bd_video_poster_src = '//b1.baomihua.com/source/production/o7gki.js?m=hzejeiqe'
//     }else if(UTILS.curPagesType === 2 && location.href.indexOf('?ly=hz_txw_yangsheng') === -1){
//       bd_video_poster_src = '//b1.baomihua.com/production/res/static/6eiv.js?qld=inimut'
//     }
//     if (UTILS.isFromHZ || UTILS.isFromSG()) {//来自淘新闻不展示前贴
//       bd_video_poster_src = '';
//     }
//   }
//   document.querySelector('#primaryPlayer').innerHTML = '<iframe src="./player.html?videoId='+flvid+'&from=h5video" frameborder="0" scrolling="no" style="position:absolute;left:0;right:0;top:0;bottom:0;width:100%;height:100%" id="videoIframe" adSrc="'+bd_video_poster_src+'"></iframe>'
//   PLAYERs.addListenerVideoUpdate()
// }
// videoBeforeLoad(1)