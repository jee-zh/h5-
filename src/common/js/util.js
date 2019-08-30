/* eslint-disable */
import getQueryString from './getQuery.js'
const isFromHZ = getQueryString('ly') === 'hz_taoxinwen' ? true : false;

//判断来源为true才加载广告
const isFromIqiyi = window.location.href.indexOf('ly=iqiyi') > -1 || document.referrer.indexOf('m.iqiyi.com') > -1 || window.location.href.indexOf('m.iqiyi.com') > -1 || navigator.userAgent.indexOf('IqiyiApp') > -1
const isLoadAdsFlag = window.location.href.indexOf('ref=re') > -1 || getQueryString('ly') === 'xzh' || isFromIqiyi;
//新增字段 1为一跳 2为二跳  3是合作页
const curPagesType = isLoadAdsFlag ? 2 : (window.location.href.indexOf('type=coop')>-1 ? 3 : 1);
// 是否来自爱奇艺app内嵌H5，是的话暂时不展示app导量，爱奇艺取消了下载功能
const isFromIQYApp = navigator.userAgent.indexOf('IqiyiApp') > -1
window.isLoadAdsFlag = isLoadAdsFlag
window.curPagesType = curPagesType
function getJSONPForRelatedVideo(a) {
  var b = document.createElement('script');
  b.type = 'text/javascript',
  b.src = a.url,
  window[a.jsonpCallback] = function(b) {
    a.callback && a.callback.call(a.context, b)
  };
  var c = function() {
    try {
      delete window[a.jsonpCallback]
    } catch(c) {
      window[a.jsonpCallback] = null
    }
    b.parentNode.removeChild(b),
      b = null
  };
  b.readyState ? b.onreadystatechange = function() {
      ('loaded' == b.readyState || 'complete' == b.readyState) && (b.onreadystatechange = null, c())
    } : b.onload = function() {
      c()
    },
  document.getElementsByTagName('head')[0].appendChild(b)
}
function getTimestampByHours() {
  var a = new Date(),
    b = a.getFullYear(),
    c = a.getMonth() + 1,
    d = a.getDate()
  return b + '' + c + d
}
function getDateTimeByHours () {
  var a = new Date,
  b = a.getFullYear(),
  c = a.getMonth() + 1,
  d = a.getDate(),
  e = a.getHours();
  return b + "" + c + d+e
}
function isFromSG () {//是否来自搜狗
  return document.referrer.indexOf('sogou.com') > -1  || location.href.indexOf('sogou') > -1
}
// 是否来自神马
function isFromSM (){
  return document.referrer.indexOf('sm.cn') > -1
}
// 是否来自百度
function isFromBaidu () {
  return document.referrer.indexOf('baidu.com') > -1 || document.referrer.indexOf('dwz.cn') > -1
}
function isFromBaiduCookie () {//是否来自百度，用来加载列表新样式和广告
  return !isFromHZ
}
function getJs (i, a) {
  if (document.getElementById(i)) {
    var b = document.createElement("script");
    b.type = "text/javascript";
    if (b.readyState) {
      b.onreadystatechange = function() {
        if (b.readyState == "loaded" || b.readyState == "complete") {
          b.onreadystatechange = null
        }
      }
    } else {
      b.onload = function() {}
    }
    b.src = a;
    document.getElementById(i).appendChild(b);
  }
}
// 是否是少儿频道
function isChildrenChannel () {//少儿和宝宝频道
  return VIDEO_INFOS.UserChannelId.toString() === '7' || VIDEO_INFOS.UserChannelId.toString() === '12';
}
function isAppleMobileDevice () {
  var ua = navigator.userAgent.toLowerCase();
  var isIPad = ua.match(/ipad/i) != null;
  return isIPad || ((ua.match(/iphone/i) != null) || (ua.match(/ipod/i) != null));
}
function isAndroidMobileDevice () {
  var ua = navigator.userAgent.toLowerCase();
  return ua.match(/(android);?[\s\/]+([\d.]+)?/);
}

function getScrollTop () {
  return document.documentElement.scrollTop || document.body.scrollTop
}
function changeHourMinutestr (str) {
  if (str !== "0" && str !== "" && str !== null) {
    return ((Math.floor(str / 60)).toString().length < 2 ? "0" + (Math.floor(str / 60)).toString() :
      (Math.floor(str / 60)).toString()) + ":" + ((str % 60).toString().length < 2 ? "0" + parseInt((str % 60).toString()) : parseInt((str % 60).toString()));
  } else {
    return "";
  }
}
function getRandomNum(minnum, maxnum, n) { //随机数
  var choice = maxnum - minnum + 1;
  var num = Math.floor(Math.random() * choice + minnum);
  if (n === num) {
    return getRandomNum(minnum, maxnum, n)
  }else{
    return num
  }
}
const Top100PV = { videoId: "39574859,40085700,38827601,36853162,38907041,38509494,36873820,36914108,36884832,37270031,12733638,39054069,38435325,36016725,27293938,39456429,37093355,12733749,24603842,36619880,38917550,35434530,36682966,37045116,24681339,36192725,35409330,35179997,27707147,39044764,29892755,35934053,38773685,38983691,37099768,35951879,39068275,39091673,35950897,39014153,39848552,20855143,36670451,39130298,34934819,39467195,36662902,27623866,36016716,35806216,12513663,38699963,39053989,36649849,36090924,39108659,14506108,31229180,38764131,36649847,36098491,37978547,12308955,38705409,36268892,39026150,30055406,34942956,37072440,33369602,35908402,39044258,36625502,29191673,32966436,39017160,33422423,30104879,37490924,37649207,37003251,35420406,35475073,40022040,12357103,36860570,36928017,39109780,35582582,39163251,36668043,36873796,38112556,36276321,36197313,37099771,36181915,36027804,34455993,36151390",
  videoId10:"39574859,40085700,38827601,36853162,38907041,38509494,36873820,36914108,36884832,37270031",
  videoId100New: "36265198,36938006,37069087,35891838,36649832,21068445,39924333,35998755,39025744,36004665,35387544,31430628,19985790,37149507,24817313,23685194,36644922,28212452,35001977,33159766,40177503,33116235,40017856,33181970,1518351,40195791,37340159,39132704,39133621,37518944,36691455,37505422,40233427,40202441,2237948,36101972,36657890,38352190,34491119,40238955,36462007,35539563,30323536,34372658,17629494,36330796,33097542,36089349,39981739,39830770,24287714,37635442,35512615,40196115,37506080,35130307,33418504,39977864,35543050,38281555,39162799,35995953,37072628,40223035,23340841,34415522,40256533,24724367,37081419,36159078,31787519,34536094,38979931,38699900,37197735,39149927,39033266,37438221,36480177,40017882,36329674,40079541,38102336,40200935,29505101,35047946,40193805,21068443,35086450,38705365,33336714,36655769,36179416,30333947,36478408,40244537,40056330,18731118",
  isTop100Video: function (n, vId) {
    const videoid = n === 10 ? this.videoId10 : (n === 100 ? this.videoId : this.videoId100New)
    return videoid.indexOf(vId) > -1 ? true : false;
  },
}
const UTILS = {
  getJSONPForRelatedVideo,
  getTimestampByHours,
  getDateTimeByHours,
  changeHourMinutestr,
  getRandomNum,
  isFromBaiduCookie,
  isFromSG,
  isFromSM,
  isFromBaidu,
  isFromHZ,
  getJs,
  isLoadAdsFlag,
  curPagesType,
  isChildrenChannel,
  isAppleMobileDevice,
  isAndroidMobileDevice,
  getScrollTop,
  Top100PV
}
export default UTILS