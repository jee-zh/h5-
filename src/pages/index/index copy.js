/* eslint-disable */
import '../../common/css/reset.css'
import '../../common/css/dialog.css'
import './index.css';
import jsonp from '../../common/js/jsonp.js'
import getQueryString from '../../common/js/getQuery.js'
import dialog from '../../common/js/dialog.js'
import BScroll from 'better-scroll'
// 引入懒加载
import LazyLoad from "vanilla-lazyload"
const LY = 'ufrbmhwap'
// 频道
import {CHANNE_LlIST} from '../../common/js/channelList.js'
// 弹层频道
import loadPopChannelList from '../../common/js/popupList.js'
class App {
  constructor () {
      // 页面滚动父级
    this.pageWrapper = document.querySelector('#page-wrapper')
    // 导航滚动父级
    this.nav = document.querySelectorAll('.nav')
    this.headerTop = document.querySelector('.header-top')
    this.moreBtn = document.querySelectorAll('.more-channel-btn')
    this.topTip = document.querySelector('.refresh-hook'),
    this.loadHook = document.querySelector('.loading-hook');
    // 悬浮导航滚动父级
    this.navScrollBox = document.querySelector('.nav-scroll')
    // 当前频道
    this.channelId = getQueryString('id') ? getQueryString('id') : '100'
    
    // 页码
    this.curPage = 1
    // 根据频道更改接口变量
    this.dataType = this.channelId === '100' ? 'h5_index' : 'h5_channel';
  }
  // 初始化
  _init(){
    this.lastIndexInt()
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
    this.nav[0].querySelector('ul').innerHTML = navHtml
    this.nav[1].querySelector('ul').innerHTML = navHtml
    // 触发导航滚动
    this.handelNavBar()
    // 加载弹层channellist
    loadPopChannelList()
  }
  handelNavBar () {
    // 设置宽度
    var itemList = this.nav[0].getElementsByTagName('ul')[0].children;
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
    for (let k=0; k<this.nav.length; k++) {
      
      this.nav[k].getElementsByTagName('ul')[0].style.width = width + 'px'
      let scrollName = `navScroll-${k}`
      // 滚动实例化
      if (k===0) {
        this[scrollName] = new BScroll(this.nav[k], {
          scrollX:true,
          click: true
        })
      }else{
        this[scrollName] = new BScroll(this.nav[k], {
          scrollX:true
        })
      }
      
      // 触发导航点击和选中样式更改
      this.handleChannelChoice(this.nav[k])
      
    }
    // 统一设置两个导航的样式和选中状态
    this.setFixedNavInt()
  }

  setFixedNavInt () {
    for (let i=0; i<this.nav.length; i++) {
      let lis = document.querySelectorAll('.nav')[i].querySelectorAll('li')
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
      this['navScroll-'+i].scrollToElement(lis[this.lastIndex], 200, screenWidth+80, 0, 'easing')
    }
    
  }
  handleChannelChoice (nav) {
    // 选择操作
    let lis = nav.querySelectorAll('li')
    let that = this
    // this.lastIndex = 0
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
        if (document.body.classList.contains('page-active')) {
          // 已触发过，则隐藏
          document.body.classList.remove('page-active')
          document.querySelector('.channel-list-mask').style.display = 'none'
          
        } else {
          // 没有触发，则显示
          document.body.classList.add('page-active')
          document.querySelector('.channel-list-mask').style.display = 'block'
        }
      })
    }
    
    document.querySelector('.channel-list-mask').addEventListener('click', () => {
      // 遮罩点击则隐藏
      document.body.classList.remove('page-active')
      document.querySelector('.channel-list-mask').style.display = 'none'
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
    const lis = this.pageWrapper.querySelectorAll('li')
    for (let k=0; k<lis.length; k++) {
      if (lis[k].getAttribute('typeid') === id) {
        return k
      }
    }
    return 0
  }
  setPageScroll () {
    // 设置页面滚动
    var topHeight = this.nav[1].clientHeight + this.headerTop.clientHeight
    let that = this
    if (!this.bodyScroll) {
      this.bodyScroll = new BScroll(this.pageWrapper, {
        probeType: 3,
        click: true,
        mouseWheel: true
      });
    }else{
      this.bodyScroll.refresh()
    }
    this.getMoreListAjax('up')
    // 上拉加载
    this.bodyScroll.on('touchEnd', function (position) {
      if(position.y < (this.maxScrollY - 30)) {
        that.loadHook.innerText = '加载中...';
        that.getMoreListAjax('up', function(){
          // dom更新后调整提示文字
          that.loadHook.innerText = '上拉加载更多';
        })
      }
    })
    // 控制悬浮导航的显隐
    this.bodyScroll.on('scroll', (pos) => {
      if (-pos.y > topHeight) {
        if (!this.navScrollBox.classList.contains('scrolling')) {
          this.navScrollBox.classList.add('scrolling')
        }
      }else{
        if (this.navScrollBox.classList.contains('scrolling')) {
          this.navScrollBox.classList.remove('scrolling')
        }
      }
    })
    
  }
  getMoreListAjax (direction, succFun){
    // 获取数据加载进页面
    dialog.showLoading('拼命加载中...')
    var _data = {
      dataType: this.dataType,
      pageSize: 12,
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
            var videoPlayUrl = curDATAS.videoPlayUrl;
            
            var isIndentFlag = !(curDATAS.companyName) ? false : true; //是否被认证
            if (that.channelId === '114') { // 竖向
              html += that.setVerticalHtml(curDATAS, videoPlayUrl)
            } else {
              html += that.setBigNewList(curDATAS, videoPlayUrl, isIndentFlag, targetType)
            }
            
          }
          
          let recommend = document.querySelector('#recommend')
          let lis = recommend.querySelectorAll('li')
          if (that.channelId === '114') { // 竖向
            recommend.querySelector('ul').className = 'v-list-content'
          }else{
            recommend.querySelector('ul').className = 'list-content'
          }
          if(direction === 'change'){
            // 当前为切换频道
            document.querySelector('#recommend ul').innerHTML = html
            that.bodyScroll.scrollTo(0, 0)
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
          that.bodyScroll.refresh();
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
      var videoPlayUrl = videoPlayUrl + "?ly=" + LY
      if(getQueryString('fr') === 'bdqt'){//源自百度嵌套跳转
        videoPlayUrl += '&fr=bdqt'
      }
      listHtml += `<li class="list">
      <a onclick="commitUserView('${data.videoId}','PGC')" href="${videoPlayUrl}" class="video-link" target="${targetType}">
      <p class="video-txt">${data.videoTitle}</p>
      <img data-src="${curVideoImg}" class="lazy video-img" >
      <p class="play-btn"></p><p class="video-time">${data.videoCost}</p></a><div class="video-footer"><div class="from"><img src="${data.appPic}" class="pic" >${data.appName}
      `
      if (isIndentFlag) {
          listHtml += '<em class="indent-tag"></em>'
      }
      listHtml += `</div><div class="hot-box">3293</div></div></li>`
    }
    return listHtml;
  }
  setVerticalHtml (data, videoPlayUrl) {
    if (data){
      var curVideoImg = data.videoImgUrl;
      if (curVideoImg.indexOf('/x/') > -1) {
          curVideoImg = curVideoImg.replace("/x/", "/360_490/");
      }
      var videoPlayUrl = videoPlayUrl + "?ly=" + LY
      if(getQueryString('fr') === 'bdqt'){//源自百度嵌套跳转
        videoPlayUrl += '&fr=bdqt'
      }
      var listHtml = `<li class="v-list"><a onclick="commitUserView('${data.videoId}','PGC')" href="${videoPlayUrl}"><div class="v-list-inner"><img class='lazy v-poster' data-src="${curVideoImg}"><div class="v-infos-box">
      <p class="v-video-title">${data.videoTitle}</p>
      <div class="v-infos-user"><img src="${data.appPic}"><span class="v-appname">${data.appName}</span></div></a></div>
      </div></li>`
      return listHtml
    }
    return ''
  }
}

var appMobile = new App()
appMobile._init()







