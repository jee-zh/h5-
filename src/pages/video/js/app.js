/* eslint-disable */
import UTILS from '../../../common/js/util.js'
import getStat from '../../../common/js/getStat.js'
import getQueryString from '../../../common/js/getQuery.js'
import openApp from './openApp.js'
class APP_EXTEND {
  constructor () {}
  init () {
    this.setInfosByVideo()
  }
  setInfosByVideo () {//视频下方下载看高清入口
      let smallDom = document.createElement('div')
      smallDom.className = 'open-app-btn-small open-app-btn'
      smallDom.innerHTML = '<p><span>下载</span><span>App</span></p>'
      smallDom.style.zIndex = '10000'
      document.body.appendChild(smallDom)
    
    //触发监测滚动事件
    this.handleOpenAppScroll(smallDom)
    //触发点击
    this.handleOpenAppClick()

  }
  handleOpenAppScroll (smallDom) {//滚动事件
    document.addEventListener('touchstart', function(){
      if (!smallDom.classList.contains('touching')) {
        smallDom.classList.add('touching')
      }
    })
    document.addEventListener('touchend', function(){
      smallDom.classList.remove('touching')
    })
    let smallBtn = document.querySelector('.open-app-btn-small')
    let _this = this
    if (UTILS.isLoadAdsFlag) {//加载了底部广告，按钮上移
      smallBtn.style.bottom="2.4rem"
    }
    let throttleFlag = true
    let btnOffsetTop = document.querySelector('.player').offsetHeight + 37
    let bottomFix = null;
    _this.handleOpenAppScrollFuc(bottomFix, smallBtn, btnOffsetTop)
    window.addEventListener("scroll", function(e){//监测滚动
      if (throttleFlag) {//节流
        _this.handleOpenAppScrollFuc(bottomFix, smallBtn, btnOffsetTop)
        throttleFlag = false
        setTimeout(function(){
          throttleFlag = true
        }, 150)
      }
    })
  }
  handleOpenAppScrollFuc (bottomFix, smallBtn, btnOffsetTop){//滚动事件方法
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    if (scrollTop > btnOffsetTop) {//滚动到不可见区域，另一个按钮显示
      if(smallBtn.style.display === 'none' || smallBtn.style.display === ''){
        smallBtn.style.display = 'block'
        if (!smallBtn.getAttribute("data-exposure")) {
          var objid = UTILS.isChildrenChannel() ? 1 : 2
          // this.handleExposureByApp('H5VideoOpenAppWatch', objid)
          smallBtn.setAttribute("data-exposure","true")
        }
        
      }
    }else{//可见区域，另一个按钮隐藏
      if(smallBtn.style.display === 'block'){
        smallBtn.style.display = 'none'
      }
    }
  }
  handleOpenAppClick (){//点击事件
    var openBtn = document.querySelectorAll('.open-app-btn')
    var that = this
    for (var j=0; j<openBtn.length; j++) {//两个入口遍历添加点击事件
      openBtn[j].addEventListener('click', function(){//播放器下方
        that.handleOpenAppClickFuc(this, that)
      }, false)
    }

  }
  handleOpenAppClickFuc (_this, that){//具体点击操作
    //添加点击统计
    //默认安卓
    var clickId = 1 
    var objid = UTILS.isChildrenChannel() ? 387 : 385
    var timer = null
    if (_this.className.indexOf('open-app-btn-big') > -1) {//大按钮(安卓)
      if (UTILS.isAppleMobileDevice()) {//大按钮(ios)
        clickId = 3
      }
    }else{//下方悬浮 安卓
      clickId = 2
      if (UTILS.isAppleMobileDevice()) {//(ios)
        clickId = 4
      }
    }
    getStat(objid, clickId)
    //启动或者下载app
    var timer = null
    var appUrl = 'https://storage.baomihua.com/app/baomihua/android/baomihua6_h5.apk';// = UserChannelId === '7' ? 'https://storage.baomihua.com/app/baomihua/android/baomihua_appstore.apk' : 'https://storage.baomihua.com/app/baomihua/android/baomihua14_h5.apk'
    var outsideString = getQueryString('outside') 
    if (UTILS.isFromSG() || outsideString === 'sg') {
      appUrl = 'https://storage.baomihua.com/app/baomihua/android/baomihua5_h5.apk'
    }else if (UTILS.isFromSM() || outsideString === 'sm') {
      appUrl = 'https://storage.baomihua.com/app/baomihua/android/baomihua7_h5.apk'
    }else if (UTILS.isFromBaidu() || outsideString === 'bd') {
      appUrl = 'https://storage.baomihua.com/app/baomihua/android/baomihua8_h5.apk'
    }
    if (UTILS.isChildrenChannel()) {
      appUrl = 'https://storage.baomihua.com/app/baomihua/android/baomihua16_h5.apk'
    }
    if (!UTILS.isAppleMobileDevice()) {//非ios
      clearTimeout(timer)
      timer = setTimeout(function(){
        if (UTILS.isAndroidMobileDevice()) {//启动app
          openApp({
            appname: 'baomihua',
            objid: '',
            title: '',
            downurl: appUrl,//下载包地址
            appPoster: '',
            number: '',
            index: '',
            addressid: 'appwatch'
          })
        }
      }, 100)
    }else{//ios跳到app store
      window.location.href = "https://itunes.apple.com/cn/app/%E7%88%86%E7%B1%B3%E8%8A%B1%E8%A7%86%E9%A2%91-%E6%AF%8F%E6%97%A5%E6%96%B0%E9%B2%9C%E7%83%AD%E7%82%B9%E7%88%86%E4%B8%8D%E5%81%9C/id781186884?mt=8"
    }
  }
}
export default APP_EXTEND