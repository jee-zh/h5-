/* eslint-disable */
// 导航部分
// 频道列表
// import {CHANNE_LlIST} from '../../../common/js/channelList.js'
// 禁止滚动
import stopBodyScroll from '../../../common/js/stopBodyScroll.js'
// 滚动
import BScroll from 'better-scroll'
// 弹层频道
import loadPopChannelList from '../../../common/js/popupList.js'
// 统计
import getStat from '../../../common/js/getStat'
// 工具
import UTILS from '../../../common/js/util.js'
// 打开启动app
import openApp from './openApp.js'
const CHANNE_LlIST = [{id: '101', channel:'娱乐'}, {id: '105', channel:'美女'}, {id: '3', channel:'搞笑'}, {id: '20', channel:'奇闻'},{id: '124', channel:'新时代'}, {id: '125', channel:'视频购物'},{id: '117', channel:'音乐'}, {id: '14', channel:'时尚'}, {id: '116', channel:'秀场'},{id: '106', channel:'美妆'}, {id: '120', channel:'穿搭'},{id: '115', channel:'拍客'}, {id: '107', channel:'历史'}, {id: '112', channel:'生活'}, {id: '119', channel:'健康'}, {id: '1', channel:'美食'}, {id: 2, channel:'舞蹈'}, {id: '111', channel:'星座'}, {id: '21', channel:'游戏'}, {id: '110', channel:'王者荣耀'}, {id: '123', channel:'绝地求生'}, {id: '118', channel:'开心一刻'}, {id: '108', channel:'科技'}, {id: '122', channel:'数码'}, {id: '13', channel:'汽车'}, {id: '12', channel:'少儿'}, {id: '113', channel:'宠物'}, {id: '114', channel:'宝宝'},{id: '134', channel:'旅游'}, {id: '133', channel:'小视频'}]
// 域名
const URLPATH = 'https://m.baomihua.com'
class NAV_MOBILE {
  constructor () {
    this.navScrollBox = document.querySelector('.nav-scroll')
    this.navInner = this.navScrollBox.querySelector('.nav-scroll-inner')
    this.moreBtn = this.navScrollBox.querySelector('.more-channel-btn')
  }
  init () {
    // 导航初始化
    this.navInt()
  }
  navInt () {
    let navHtml = ''
    CHANNE_LlIST.forEach((list) => {
      navHtml += `<li typeid="${list.id}"><span>${list.channel}</span></li>`
    })
    this.navInner.querySelector('ul').innerHTML = navHtml
    loadPopChannelList()
    // 触发导航滚动
    this.handelNavBar()
    
  }

  handelNavBar () {
    // 设置宽度
    var itemList = this.navInner.querySelectorAll('li');
    var width = 0
    let index = 0
    for (var  i = 0; i <itemList.length; i++) {
      width += itemList[i].getBoundingClientRect().width;
      (function(i){
        itemList[i].addEventListener('click', () => {
          const channelId = itemList[i].getAttribute('typeid')
          location.href = `${URLPATH}?id=${channelId}`
        })
      })(i);
      // if (itemList[i].getAttribute('typeid') === VIDEO_INFOS.channelId.toString()) {
      //   index = i
      //   itemList[index].classList.add('active')
      // }
    }
    this.navInner.getElementsByTagName('ul')[0].style.width = width + 'px'
    let scrollName = `navScroll`
    // 滚动实例化
    this[scrollName] = new BScroll(this.navInner, {
      scrollX:true,
      click: true
    })
    // this[scrollName].scrollToElement(itemList[index], 200, -document.body.scrollWidth / 2 +100, 0, 'easing')
    // 触发点击事件
    this.handleMoreBtnClick()
  }

  handleMoreBtnClick () {
    document.querySelector('.channel-list-mask').addEventListener('click', () => {
      // 遮罩点击则隐藏
      document.body.classList.remove('page-active')
      document.querySelector('.channel-list-mask').style.display = 'none'
      stopBodyScroll(false)
    })
    // 导航点击
    this.navScrollBox.addEventListener('click', (e) => {
      let ev = e || event
      let _target = ev.target || ev.srcElement
      if (_target.classList.contains('logo')) {
        // logo
        location.href = 'https://m.baomihua.com'
      } else if (_target.classList.contains('more-channel-btn')) {
        // 频道more
        if (document.body.classList.contains('page-active')) {
          // 已触发过，则隐藏
          document.body.classList.remove('page-active')
          document.querySelector('.channel-list-mask').style.display = 'none'
          stopBodyScroll(false)
        } else {
          // 没有触发，则显示
          document.body.classList.add('page-active')
          document.querySelector('.channel-list-mask').style.display = 'block'
          stopBodyScroll(true)
        }
      } else if (_target.classList.contains('header-top-btn')) {
        // 下载app
        let appUrl = 'https://storage.baomihua.com/app/baomihua/android/baomihua9_h5.apk'
        
        if (!UTILS.isAppleMobileDevice()) {//非ios
          clearTimeout(timer)
          // 点击统计
          getStat(1129, 1)
          let timer = setTimeout(function(){
            if (UTILS.isAndroidMobileDevice()) {//启动app
              openApp({
                appname: 'baomihua',
                objid: '',
                title: '',
                downurl: appUrl,//下载包地址
                appPoster: '',
                number: '',
                index: '',
                addressid: ''
              })
            }
          }, 100)
        }else{//ios跳到app store
          window.location.href = "https://itunes.apple.com/cn/app/%E7%88%86%E7%B1%B3%E8%8A%B1%E8%A7%86%E9%A2%91-%E6%AF%8F%E6%97%A5%E6%96%B0%E9%B2%9C%E7%83%AD%E7%82%B9%E7%88%86%E4%B8%8D%E5%81%9C/id781186884?mt=8"
        }
      }
    })
    // 弹出框点击事件
    this.handlePopChannelClick()
  }
  handlePopChannelClick () {
    let lis = document.querySelector('.channel-list-wrapper').querySelectorAll('li')
    let lis_length = lis.length
    for (let k=0; k<lis_length; k++) {
      lis[k].addEventListener('click', (e) => {
        const channelId = lis[k].getAttribute('typeid')
        location.href = `${URLPATH}/?id=${channelId}`
      })
    }
    stopBodyScroll(false)
  }
}
export default NAV_MOBILE