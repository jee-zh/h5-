/* eslint-disable */
import ajax from '../../../common/js/ajax.js'
function commitUserView(videoid, reporttype) {
  /*点击上报到达观 reporttype=PGC 是精选大图上报  REC是小图*/
  ajax({
    type: 'POST',
    url: 'https://m.video.baomihua.com/interfaces/uploaduseraction.ashx',
    data:{ actionType: reporttype, videoId: videoid },
    success: function(){}
  })
}
export default commitUserView