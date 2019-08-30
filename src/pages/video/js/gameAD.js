/* eslint-disable */
import UTILS from '../../../common/js/util.js'
import getStat from '../../../common/js/getStat.js'
class GAME_AD {
  constructor () {
    this.lis = document.querySelectorAll('#recommend li')
  }
  _init () {
    // 插进信息流
    this.loadGameADS()
    // 底部悬浮
    // this.loadBottomGameADS()
    
  }
  loadGameADS (){
    let num = 2;
    // let _this = this
    if (!UTILS.isFromBaiduCookie()) {num=6}
    // lis[num].insertAdjacentHTML('afterend', '<li id="game" class="list-game" style="padding-bottom:10px" data-index="1"><iframe width="100%" frameborder="0" scrolling="no" sandbox="allow-forms allow-same-origin allow-scripts allow-popups" src="//m.video.baomihua.com/iframe/game-01.html" id="gameIframe1"></iframe></li>');
    if (!UTILS.isLoadAdsFlag) {
      num = 6
      this.lis[num].insertAdjacentHTML('afterend', '<li id="game-2" class="list-game" style="padding-bottom:10px" data-index="2"><iframe width="100%" frameborder="0" scrolling="no" sandbox="allow-forms allow-same-origin allow-scripts allow-popups" src="//m.video.baomihua.com/iframe/game-02.html" id="gameIframe2"></iframe></li>');
      getStat(1115, 1)
    }
    var index=0
    for (var k=1; k<3; k++) {
      (function(k){
        var gameIframe = document.querySelector('#gameIframe'+k)
        var time = setInterval(function(){
          if (gameIframe) {
            GAME_AD.setWinHeight(gameIframe, 1)
            index++
            if (index >= 20) {
              clearInterval(time)
            }
          }
        },1000)
      })(k)
    }
    let wHeight = screen.height
    let games = document.querySelectorAll('.list-game')
    let gameLength = games.length
    let scrollFlag = true
    window.addEventListener('scroll', () => {
      if (scrollFlag) {
        scrollFlag = false
        this.loadGameADSEx(wHeight, games, gameLength)
        setTimeout(function(){
          scrollFlag = true
        }, 20)
      }
    })
  }
  loadGameADSEx (wHeight, games, gameLength){
    let curHeight = UTILS.getScrollTop() + wHeight
    for (let i=1; i <= gameLength; i++) {
      let itemTop = games[i-1].offsetTop;
      if(itemTop < curHeight && !games[i-1].getAttribute("data-loaded")){
        games[i-1].setAttribute("data-loaded","true");
        let index = games[i-1].getAttribute('data-index')
        getStat(424, index)
      }
    }
  }

  static setWinHeight (obj, type) { 
    var iframeDocument = obj.contentDocument || obj.contentWindow.document;
    
    if (type === 1) {
      obj.height = iframeDocument.body.scrollHeight
    }else if (type === 2) {
      // 第三方底部悬浮
      var height = parseInt(iframeDocument.body.style.paddingBottom)
      // obj.height = iframeDocument.body.scrollHeight
      obj.height = iframeDocument.body.querySelector('div') ? iframeDocument.body.querySelector('div').offsetHeight-height : 50
    }
  }
// 底部悬浮
  static loadBottomGameADS () {
    if (VIDEO_INFOS.UserChannelId !== '7' && UTILS.isLoadAdsFlag) {
      // var oBot = document.createElement('div')
      // oBot.id = 'botBanner'
      // oBot.className = 'm-bt-bd'
      // document.body.appendChild(oBot)
      // MobileUtils.getJs('botBanner', '//o.a0usa.top/jquery/1.0/2019080614511110271_224_24_262_51.js?t=1')
      var oBot = document.createElement('div')
      oBot.id = 'botBanner'
      // oBot.className = 'm-bt-bd'
      oBot.innerHTML = '<iframe width="100%" height="100" frameborder="0" scrolling="no" sandbox="allow-forms allow-same-origin allow-scripts allow-popups" src="//m.video.baomihua.com/iframe/game-bottom.html" id="gameIframeFix"></iframe>'
      oBot.style.position = 'fixed'
      oBot.style.left = '0'
      oBot.style.right = '0'
      oBot.style.bottom = '0'
      oBot.style.zIndex = '20'
      oBot.style.fontSize = '0'
      document.body.appendChild(oBot)
      var gameIframe = document.querySelector('#gameIframeFix')
      let order = 0
      let timer = setInterval(() => {
        GAME_AD.setWinHeight(gameIframe, 2)
        order ++
        if (order>11) {clearInterval(timer)}
      },1000)
      getStat(1106, 1)
    }
  }
}
// 暴露让鹰眼调用
window.loadBottomGameADS = GAME_AD.loadBottomGameADS
export default GAME_AD