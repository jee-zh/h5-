/* eslint-disable */
import '../../common/css/reset.css'
import '../../common/css/border.css'
import './video.css';
// 头部导航
import NAV_MOBILE from './js/nav.js'
// 视频信息
import VIDEO_INFOS_INT from './js/video-infos.js'
// 列表
import VIDEO_LIST from './js/list.js'
// 导航部分
new NAV_MOBILE().init()
// 播放器部分
import './js/player.js'
// 播放器下方部分
new VIDEO_INFOS_INT().init()
// 列表部分
new VIDEO_LIST().init()
console.log('2.0.0')
