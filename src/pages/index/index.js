/* eslint-disable */
import '../../common/css/reset.css'
import '../../common/css/dialog.css'
import './index.css';
// 工具
import UTILS from '../../common/js/util.js'
import jsonp from '../../common/js/jsonp.js'
import getQueryString from '../../common/js/getQuery.js'
import dialog from '../../common/js/dialog.js'
import BScroll from 'better-scroll'
// 禁止滚动
import stopBodyScroll from '../../common/js/stopBodyScroll.js'
// 引入懒加载
import LazyLoad from "vanilla-lazyload"
// 弹层频道
import loadPopChannelList from '../../common/js/popupList.js'
// 频道
import {CHANNE_LlIST} from '../../common/js/channelList.js'
// 上拉加载条件
import isReachBottom from '../../common/js/scrollLoad.js'
// 统计
import getStat from '../../common/js/getStat'
const LY = 'ufrbmhwap'
class App {
  constructor () {
    // 导航滚动父级
    this.nav = document.querySelector('.nav')
    this.headerTop = document.querySelector('.header-top')
    this.moreBtn = document.querySelectorAll('.more-channel-btn')
    this.topTip = document.querySelector('.refresh-hook'),
    this.loadHook = document.querySelector('.loading-hook');
    this.recommend = document.querySelector('#recommend')
    // 当前频道
    this.channelId = getQueryString('id') ? getQueryString('id') : '100'
    // 页码
    this.curPage = 1
    // 根据频道更改接口变量
    this.dataType = this.channelId === '100' ? 'h5_index' : 'h5_channel';
    this.loadDataFlag = true
  }
  // 初始化
  _init(){
    // 当前频道序号初始化
    this.lastIndexInt()
    // 导航栏初始化
    this.navInt()
    // 页面滚动
    this.setPageScroll()
    
    // 导航more按钮触发弹层
    this.handleMoreBtnClick()
    // 弹层频道列表点击事件
    this.handleChannelListClick()
  }
  lastIndexInt () {
    this.lastIndex = 0
    CHANNE_LlIST.forEach((item, index) => {
      if (item.id === this.channelId) {
        this.lastIndex = index
      }
    })
  }
  navInt () {
    let navHtml = ''
    CHANNE_LlIST.forEach((list) => {
      navHtml += `<li typeid="${list.id}"><span>${list.channel}</span></li>`
    })
    this.nav.querySelector('ul').innerHTML = navHtml
    // 导航滚动
    this.handelNavBar()
  }
  handelNavBar () {
    // 设置宽度
    var itemList = this.nav.getElementsByTagName('ul')[0].children;
    var width=0
    for (var  i = 0; i <itemList.length; i++) {
      var spanLength = itemList[i].querySelector('span').innerText.length
      if (i === 0) {
        width += 76
      }else if (spanLength === 2) {
        width += 58
      }else if (spanLength === 3) {
        width += 74
      }else{
        width += 90
      }
    }
    this.nav.getElementsByTagName('ul')[0].style.width = width + 'px'
    // 滚动实例化
    this.navScroll = new BScroll(this.nav, {
      scrollX:true,
      click: true
    })
    // 触发导航点击和选中样式更改
    this.handleChannelChoice(this.nav)
    // 设置导航的样式和选中状态，以及滚动到可视区
    this.setFixedNavInt()

    // 头部的logo点击事件和app下载事件
    this.otherBtnClick()
    // 加载弹层channellist
    loadPopChannelList()
  }

  setFixedNavInt () {
    let lis = document.querySelectorAll('.nav li')
    let screenWidth = -document.body.scrollWidth / 2
    // 默认全部取出选中样式
    for (let k = 0; k < lis.length; k++) {
      (function(k){
        lis[k].classList.remove('active')
      })(k)
    }
    // 当前选中的加载选中样式
    lis[this.lastIndex].classList.add('active')
    // 滚动到具体可视区
    this.navScroll.scrollToElement(lis[this.lastIndex], 200, screenWidth, 0, 'easing')
  }
  handleChannelChoice (nav) {
    // 选择操作
    let lis = nav.querySelectorAll('li')
    let that = this
    for (let k = 0; k < lis.length; k++) {
      (function(k){
        lis[k].addEventListener('click', (e) => {
          const id = lis[k].getAttribute('typeid')
          if (k !== that.lastIndex) {
            /**
             * 获取当前点击的频道id，设置页码为1，设置接口类型，然后加载数据，同时再调用一次导航逻辑
             */
            that.lastIndex = k
            let channelid = lis[k].getAttribute('typeid')
            that.channelId = channelid
            that.curPage = 1
            that.dataType = that.channelId === '100' ? 'h5_index' : 'h5_channel';
            that.getMoreListAjax('change')
            that.setFixedNavInt()
          }
        })
      })(k)
    }
    
  }
  handleMoreBtnClick () {
    // 两个按钮的点击，触发频道弹层选择
    for (let k=0; k<this.moreBtn.length; k++) {
      this.moreBtn[k].addEventListener('click', () => {
        // this.bodyScroll && this.bodyScroll.destroy()
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
      })
    }
    
    document.querySelector('.channel-list-mask').addEventListener('click', () => {
      // 遮罩点击则隐藏
      document.body.classList.remove('page-active')
      document.querySelector('.channel-list-mask').style.display = 'none'
      stopBodyScroll(false)
    })
  }
  otherBtnClick () {
    // 悬浮logo触发点击跳转
    this.headerTop.querySelector('.header-top-btn').addEventListener('click', () => {
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
    })
  }
  handleChannelListClick () {
    // 弹出的频道列表点击事件
    const channelList = document.querySelectorAll('.channel-list-wrapper li')
    const _length = channelList.length
    const that = this
    for (let k=0; k<_length; k++) {
      (function(k){
        channelList[k].addEventListener('click', function(){
          /**
           * 获取点击的频道id，加载数据，同时获得频道在导航上的序号，更改导航的样式
           */
          let channelid = channelList[k].getAttribute('typeid')
          that.channelId = channelid
          that.curPage = 1
          that.dataType = that.channelId === '100' ? 'h5_index' : 'h5_channel';
          var index = that.getChannelIndex(channelid)
          that.getMoreListAjax('change')
          that.lastIndex = index
          that.setFixedNavInt()
        })
      })(k)
    }
  }
  getChannelIndex (id) {
    const lis = this.nav.querySelectorAll('li')
    for (let k=0; k<lis.length; k++) {
      if (lis[k].getAttribute('typeid') === id) {
        return k
      }
    }
    return 0
  }
  setPageScroll () {
    // 设置页面滚动
    let that = this
    // if (!this.bodyScroll) {
    //   this.bodyScroll = new BScroll(this.recommend, {
    //     probeType: 3,
    //     click: true,
    //     mouseWheel: true
    //   });
    // }else{
    //   this.bodyScroll.refresh()
    // }
    this.getMoreListAjax('up')
    window.addEventListener('scroll', () => {
      if (isReachBottom() && this.loadDataFlag) {
        this.loadDataFlag = false
        this.loadHook.innerText = '加载中...';
        this.getMoreListAjax('up', () => {
          this.loadDataFlag = true
          this.loadHook.innerText = '上拉加载更多';
        })
      }
    })
    // 上拉加载
    // this.bodyScroll.on('touchEnd', function (position) {
    //   if(position.y < (this.maxScrollY - 30)) {
    //     that.loadHook.innerText = '加载中...';
    //     that.getMoreListAjax('up', function(){
    //       // dom更新后调整提示文字
    //       that.loadHook.innerText = '上拉加载更多';
    //     })
    //   }
    // })
  }
  getMoreListAjax (direction, succFun){
    // 获取数据加载进页面
    dialog.showLoading('拼命加载中...')
    var _data = {
      dataType: this.dataType,
      pageSize: 16,
      pageIndex: this.curPage,
      channelId: this.channelId
    }
    var that = this;
    jsonp({
      url: '//interface.video.baomihua.com/index.ashx',
      type: 'GET',
      data:_data,
      timeout: 30000,
      dataType: "jsonp",
      jsonp:'jsoncallback',
      jsonpcallback:'ok',
      success: function (data) {
        that.loadHook.innerHTML = '上拉加载更多'
        dialog.hideLoading()
        if(data.Videolist){
          var datas = data.Videolist;
          var _len = datas.length;
          var html = '';
          for (var i=0; i<_len; i++) {
            var curVideoImg = datas[i].videoImgUrl;
            var targetType = '_self';
            var curDATAS = datas[i];
            if (curVideoImg.indexOf('/x/') > -1) {
                curVideoImg = curVideoImg.replace("/x/", "/230_172/");
            }
            if (window.location.search == '?f=mVideo') {
                targetType = '_blank'
            }
            var videoPlayUrl = `https://m.video.baomihua.com/video_mobile_new.aspx?videoId=${datas[i].videoId}`
            var isIndentFlag = !(curDATAS.companyName) ? false : true; //是否被认证
            if (that.channelId === '133') { // 竖向
              html += that.setVerticalHtml(curDATAS, videoPlayUrl)
            } else {
              html += that.setBigNewList(curDATAS, videoPlayUrl, isIndentFlag, targetType)
            }
            
          }
          
          let recommend = document.querySelector('#recommend')
          let lis = recommend.querySelectorAll('li')
          if (that.channelId === '133') { // 竖向
            recommend.querySelector('ul').className = 'v-list-content'
          }else{
            recommend.querySelector('ul').className = 'list-content'
          }
          if(direction === 'change'){
            // 当前为切换频道
            document.querySelector('#recommend ul').innerHTML = html
            window.scrollTo(0, 0)
          }else{
            // 默认翻页
            if (lis.length > 0) {
              lis[lis.length-1].insertAdjacentHTML('afterend', html)
            } else {
              document.querySelector('#recommend ul').innerHTML = html
            }
          }
          new LazyLoad({
            elements_selector: '.lazy'
          })
          // 滚动刷新
          // that.bodyScroll.refresh();
          // 页码+1
          that.curPage++
          if(typeof succFun == 'function'){succFun()}
        }
      }
    })
  }
  setBigNewList (data, videoPlayUrl, isIndentFlag, targetType){
    // 拼接dom节点
    if (data) {
      var listHtml = '';
      var curVideoImg = data.videoImgUrl;
      if (curVideoImg.indexOf('/x/') > -1) {
          curVideoImg = curVideoImg.replace("/x/", "/640_360/");
      }
      var videoPlayUrl = videoPlayUrl + "&ly=" + LY
      if(getQueryString('fr') === 'bdqt'){//源自百度嵌套跳转
        videoPlayUrl += '&fr=bdqt'
      }
      listHtml += `<li class="list">
      <a onclick="commitUserView('${data.videoId}','PGC')" href="${videoPlayUrl}" class="video-link" target="${targetType}">
      <p class="video-txt">${data.videoTitle}</p>
      <img data-src="${curVideoImg}" class="video-img lazy" >
      <p class="play-btn"></p><p class="video-time">${data.videoCost}</p></a><div class="video-footer"><div class="from"><img src="${data.appPic}" class="pic" >${data.appName}
      `
      if (isIndentFlag) {
          listHtml += '<em class="indent-tag"></em>'
      }
      listHtml += `</div><div class="hot-box">${UTILS.getRandomNum(10000, 20000)}</div></div></li>`
    }
    return listHtml;
  }
  setVerticalHtml (data, videoPlayUrl) {
    if (data){
      var curVideoImg = data.videoImgUrl;
      if (curVideoImg.indexOf('/x/') > -1) {
          curVideoImg = curVideoImg.replace("/x/", "/360_490/");
      }
      var videoPlayUrl = videoPlayUrl + "&ly=" + LY
      if(getQueryString('fr') === 'bdqt'){//源自百度嵌套跳转
        videoPlayUrl += '&fr=bdqt'
      }
      var listHtml = `<li class="v-list"><a onclick="commitUserView('${data.videoId}','PGC')" href="${videoPlayUrl}"><div class="v-list-inner"><img class='v-poster' src="${curVideoImg}"><div class="v-infos-box">
      <p class="v-video-title">${data.videoTitle}</p>
      <div class="v-infos-user"><img src="${data.appPic}"><span class="v-appname">${data.appName}</span></div>
      </div></div></a></li>`
      return listHtml
    }
    return ''
  }
}

var appMobile = new App()
appMobile._init()