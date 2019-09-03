/* eslint-disable */
import UTILS from '../../../common/js/util.js'
import getScript from '../../../common/js/getScript.js'
class BAIDU_ASYNC_AD {
  constructor () {
    this.recommend = document.querySelector('#recommend')
    this.lis = this.recommend.querySelectorAll('li')
  }
  init () {
    // 首先穿插进dom节点
    this.handleDomInsert()

    // 底部悬浮
    // this.handleBotBanner()
  }
  handleBotBanner () {
    // 非少儿频道并且是二跳才加载百度底悬
    if (UTILS.isLoadAdsFlag && !UTILS.isChildrenChannel()) {
      let oBottom = document.createElement('div')
      oBottom.id = 'bottom-panle-box'
      document.body.appendChild(oBottom)
      let adId = UTILS.isAppleMobileDevice() ? 'u3162270' : 'u3163747'
      getScript({
        url: 'https://cpro.baidustatic.com/cpro/ui/cm.js',
        destroy: false,
        callback: function (){
          BAIDU_CLB_fillSlotAsync(adId, 'bottom-panle-box')
        }
      })
    }
    
  }
  handleDomInsert () {
    for (let k=0; k< this.lis.length; k++) {
      if (k%5 === 0 && k<21) {
        this.lis[k].insertAdjacentHTML('afterend', `<li id="NewD-${(k/5)+1}" class="NewD-list">加载中...</li>`);
      }
    }
    // 节点穿插完毕，再根据滚动触发加载广告
    this.handleDomInsertFuc()
  }
  handleDomInsertFuc () {
    let newDList = document.querySelectorAll('.NewD-list')
    let listLength = newDList.length
    let wHeight = screen.height
    let scrollFlag = true
    //默认加载一次
    this.handleListChangeADFuc(wHeight, newDList, listLength)
    //滚动加载，并且设置节流
    window.addEventListener('scroll', () => {
      if (scrollFlag) {
        scrollFlag = false
        this.handleListChangeADFuc(wHeight, newDList, listLength)
        setTimeout(function(){
          scrollFlag = true
        }, 20)
      }
    })
  }
  handleListChangeADFuc (wHeight, newDList, listLength) {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    let curHeight= scrollTop + wHeight + 200;
    //遍历节点，判断每个节点是否可视，可视并且未加载过广告，则加载广告
    for (let i=1; i <= listLength; i++) {
      //判断当前节点存在，防止追加dom时没有加载广告节点
      if (document.querySelector('#NewD-'+i)) {
        let itemTop = newDList[i-1].offsetTop;
        //即将滚到到可视区，并且当前广告位还没有加载广告
        if(itemTop < curHeight + 600 && !newDList[i-1].getAttribute("data-loaded")){
          if (UTILS.isLoadAdsFlag) {
            UTILS.getJs(newDList[i-1].id, '//b1.baomihua.com/site/b79d.js?wrnx=tajjx')
          } else {
            UTILS.getJs(newDList[i-1].id, '//b1.baomihua.com/production/m5uns.js?ojfp=rlfbl')
          }
          newDList[i-1].setAttribute("data-loaded","true");//加载广告后添加加载标识
        }
      }
    }
  }
}
export default BAIDU_ASYNC_AD