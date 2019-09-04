/* eslint-disable */
function openApp(options) { // 启动app
  let {
    appname,
    objid,
    title,
    downurl,
    appPoster,
    number,
    index,
    addressid
  } = options
  var config = {
    scheme_IOS: '',
    //安卓启动app字段
    scheme_Adr: 'baomihua://baomihua.android/splashActivity?adNum=' + number,
    //跳转到下载中间页字段
    download_url: 'http://page.wenzhiji.com/h5/index.html?videoid=' + objid + '&title=' + escape(title.replace(/ /g, "?").replace(/ /g, "&")) + '&appurl=' + downurl + '&appposter=' + appPoster + '&number=' + number + '&pagetype=' + index + '&addressid=' + addressid,
    timeout: 600
  };
  var startTime = Date.now();
  var url = config.scheme_Adr;
  if (addressid === 'video-paused') { //视频播放到2/3暂停位
    url = 'baomihua://baomihua.android/splashActivity?videoId=' + objid
  } else if (appname === 'kuaikan') { //快看推广位
    url = ''
    addressid = 1
    var pagePath = (downurl.indexOf('kuaikan_') > -1) ? 'http://page.wenzhiji.com/h5/kuaikan01' : 'http://page.wenzhiji.com/h5/kuaikan'
    config.download_url = pagePath + '.html?videoid=' + objid + '&title=' + escape(title.replace(/ /g, "?").replace(/ /g, "&")) + '&appurl=' + downurl + '&appposter=' + appPoster + '&number=' + number + '&pagetype=' + index + '&addressid=' + addressid
  } else if (downurl.indexOf('xiaoxiao') > -1) { //小小落地页
    config.download_url = 'http://page.wenzhiji.com/h5/xiaoxiaoapp.html?appurl=' + downurl + '&num=' + number
  } else if (objid === 'video_end') { //打开爆米花视频app观看高清视频入口启动到app首页
    url = 'baomihua://baomihua.android/mainActivity'
    config.download_url = downurl
  }
  if (appname !== 'kuaikan' && downurl.indexOf('psd_bmhwap') === -1) { //非快看app才尝试启动app
    window.location.href = url;
  }
  //来自播放结束位更改下载地址
  if (objid === 0) {
    config.download_url = 'https://storage.baomihua.com/app/baomihua/android/baomihua15_h5.apk'
  }
  var t = setTimeout(function () {
    var endTime = Date.now();
    if ((!startTime || (endTime - startTime) < (config.timeout + 200)) && addressid !== 'video-paused') {
      //如果装了app并跳到客户端后，endTime - startTime 一定> timeout + 200
      window.location = config.download_url;
    } else {}
  }, config.timeout);
  window.onblur = function () {
    clearTimeout(t);
  }
}
export default openApp