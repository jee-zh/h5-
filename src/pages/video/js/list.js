/* eslint-disable */
// 列表部分
// 引入懒加载
import LazyLoad from 'vanilla-lazyload'
// 工具
import UTILS from '../../../common/js/util.js'
import getQueryString from '../../../common/js/getQuery.js'
// 统计
import getStat from '../../../common/js/getStat.js'
// 获取ip、数据接口
import {
  getUserIp,
  getListData
} from './ajaxData.js'
// 百度广告
import BAIDU_ASYNC_AD from './baiduAD.js'
// app推广
import APP_EXTEND from './app.js'
// 第三方游戏广告
// import GAME_AD from './gameAD.js'
// 常用数据
import {RECOMMEND_VIDEO_LIST} from './path.js' 

// 上报达观
import commitUserView from './commitUserView.js'
window.commitUserView = commitUserView
// 列表是否已加载到数据，用来加载打底数据
let dataLoad = false
class VIDEO_LIST {
  constructor () {
    this.recommend = document.querySelector('#recommend')
  }
  init () {
    // 获取用户ip，根据ip返回字段加载列表数据
    getUserIp().then((res) => {
      const type = (res.indexOf('北京') > -1 || res.indexOf('杭州') > -1) ? 'ref_beijing' : 'listRecommend';
      // 调用数据
      getListData(type, VIDEO_INFOS.flvid).then((res) => {
        // 处理数据
        dataLoad = true
        this.getListDataCallback(res)
      })
      // 10s内获取不到数据则加载打底数据
      setTimeout(() => {
        if (!dataLoad) {
          // -1，表示当前是打底数据，前5个是app推广位
          this.getListDataCallback(RECOMMEND_VIDEO_LIST, -1)
          // 触发推广位事件
          this.handleBasicClick()
        }
      },10000)
    })
  }
  handleBasicClick () {
    // 推广位统计
    this.recommend.querySelectorAll('.basic').forEach((item, index) => {
      item.index = index+1
      item.addEventListener('click', () => {
        getStat(368, item.index)
      })
    })
  }
  getListDataCallback (res, type) {
    // 数据回调
    let html = ''
    if (!res || !res.retStr.length) {return html}
    // 来自杭州淘新闻，则展示小图模式
    let _html = UTILS.isFromBaiduCookie() ? this.setBigNewList(res.retStr, type) : this.setSmallOldList(res.retStr, type)
    if (UTILS.isFromBaiduCookie()) {
      html += `<ul class="new-list">${_html}</ul>`
    }else{
      html += `<ul class="old-list">${_html}</ul>`
    }
    
    this.recommend.innerHTML = html
    // 懒加载实例化
    new LazyLoad({
      elements_selector: '.lazy'
    })
    
    if (!UTILS.isChildrenChannel()) {
      // 调用百度大图广告
      new BAIDU_ASYNC_AD().init()
      // 加载第三方游戏广告
      // new GAME_AD()._init()
    }
    
    // 调用app推广
    new APP_EXTEND().init()
    
  }
  setBigNewList (res, type){
    // 拼接dom节点
    let listHtml = '';
    res.forEach((item, index) => {
      let {videoname='', videoimgurl, time = '', appname = '', videoid, apppic=''} = item
      videoname = decodeURIComponent(videoname)
      apppic = apppic.replace('http://', '//').replace('view01.img', 'view01.video')
      var isIndentFlag = !(item.companyName) ? false : true;//是否被认证
			if(videoimgurl.indexOf('/x/') > -1) {
				videoimgurl = videoimgurl.replace("/x/", "/640_360/");
			}
			if(document.location.protocol == "https:") {
				videoimgurl = videoimgurl.replace("http://", "//");
			}
      // let video_url = `//m.video.baomihua.com/m/${videoid}?ref=re`
      let video_url = `https://m.video.baomihua.com/video_mobile_new.aspx?videoId=${videoid}&ref=re`
      if(getQueryString('fr') === 'bdqt'){
        video_url += '&fr=bdqt'
      }
      if(location.href.indexOf('ly=ufrbmhwap') > -1 || location.href.indexOf('type=index') > -1){//来自站内的二跳增加标识type=index
        video_url += '&type=index'
      }
      var outsideString = getQueryString('outside')
      if (UTILS.isFromSG() || outsideString === 'sg') {//!UTILS.isMyBMH()
        video_url += '&outside=sg'
      }else if (UTILS.isFromSM() || outsideString === 'sm') {
        video_url += '&outside=sm'
      }else if (UTILS.isFromBaidu() || outsideString === 'bd') {
        video_url += '&outside=bd'
      }
      if (type === -1 && index < 5) {//默认数据前5条为app推广位
        listHtml += "<li class='basic list' data-videoid='" + videoid + "' data-url='http://m.video.baomihua.com/app/index.html?defaultdata'>";
        listHtml += '<a class="clearfix video-link" href="http://m.video.baomihua.com/app/index.html?defaultdata" target="_blank" style="margin-bottom:10px">';
      }else{
        listHtml += `<li class="list">`
        listHtml += `<a onclick="commitUserView('${videoid}','PGC')" href="${video_url}" class="video-link">`
      }
      
      listHtml += `<p class="video-txt">${videoname}</p>
      <img data-src="${videoimgurl}" class="lazy video-img" >
      <p class="play-btn"></p><p class="video-time">${time}</p></a>
      `
      if (type !== -1) {
        listHtml += `<div class="video-footer"><div class="from"><img src="${apppic}" class="pic" >${appname}`
        if (isIndentFlag) {
          listHtml += '<em class="indent-tag"></em>'
        }
        listHtml += `</div><div class="hot-box">${UTILS.getRandomNum(10000, 20000)}</div></div>`
      }
      listHtml += '</li>'
    })

    return listHtml;
  }
  setSmallOldList (rets, status) {
    var rets_length = rets.length
    var html = ''
		for(var k = 0; k < rets_length; k++) {
			var ret = rets[k],
      videoname = decodeURIComponent(ret.videoname),
      poster = ret.videoimgurl,
      time = ret.time ? ret.time : '',
      appname = ret.appname ? ret.appname : '',
      videoid = ret.videoid;
      var isIndentFlag = !(ret.companyName) ? false : true;//是否被认证
			if(poster.indexOf('/x/') > -1) {
				poster = poster.replace("/x/", "/230_144/");
			}
			if(document.location.protocol == "https:") {
				poster = poster.replace("http://", "//");
			}
      var video_url = "//m.video.baomihua.com/m/"+videoid+"?ref=re";
      if(getQueryString('fr') === 'bdqt'){
        video_url += '&fr=bdqt'
      }
      if(location.href.indexOf('ly=ufrbmhwap') > -1 || location.href.indexOf('type=index') > -1){//来自站内的二跳增加标识type=index
        video_url += '&type=index'
      }
      // if (MobileUtils.isFromNull()) {
      //   video_url += '&fr=null'
      // }
      var outsideString = getQueryString('outside')
      if (UTILS.isFromSG() || outsideString === 'sg') {//!MobileUtils.isMyBMH()
        video_url += '&outside=sg'
      }else if (UTILS.isFromSM() || outsideString === 'sm') {
        video_url += '&outside=sm'
      }else if (UTILS.isFromBaidu() || outsideString === 'bd') {
        video_url += '&outside=bd'
      }
      if (status === -1 && k < 5) {//默认数据前5条为app推广位
        html += "<li class='basic' data-videoid='" + videoid + "' data-url='http://m.video.baomihua.com/app/index.html?defaultdata'>";
        html += '<a class="link clearfix" href="http://m.video.baomihua.com/app/index.html?defaultdata" target="_blank">';
      }else{
        html += "<li>";
        html += '<a class="link clearfix" onclick="commitUserView(\'' + videoid + '\',\'\')" href="' + video_url + '">';
      }
			
			html += '<div class="pic">';
			html += '<img class="lazy" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF8fHxAAAAMCd7XAAAAAxJREFUeNpiYAAIMAAAAgABT21Z4QAAAABJRU5ErkJggg==" data-src="' + poster + '" alt="' + videoname + '">';
			if(time) {
				html += "<p class='video-time'>" + time + "</p>";
			}
			html += '</div><div class="info">';
			html += '<div class="info-item info-title">' + videoname + "</div>";
			html += '<div class="info-item info-count clearfix">';
      html += '<span class="info-name">' + appname; 
      if(isIndentFlag){
        html += '<em class="indent-tag"></em>'
      }
			html += "</span></div>";
			html += "</div>";
			html += "</a>";
			//html += '<a href="' + videoListAppURL + '" class="download-tips">app观看</a>';
      html += "</li>";
    }
    return html
  }
}
export default VIDEO_LIST

