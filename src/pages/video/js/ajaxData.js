/* eslint-disable */
import jsonp from '../../../common/js/jsonp.js'
import UTILS from '../../../common/js/util.js'
import {
  IPURL,
  RECOMMEND_DATA_URL
} from './path.js'
function getUserIp () {
  const pro = new Promise((resolve, reject) => {
    jsonp({
      url: IPURL,
      type: 'GET',
      context: this,
      dataType: 'jsonp',
      jsonp: 'jsoncallback',
      jsonpCallback: 'ok',
      time: 300000,
      error: function (error) {
        reject(error)
      },
      success: function (data) {
        resolve(data.infos)
      }
    })
  })
  return pro
}

function getListData (listType, flvid) {
  let pro = new Promise(function (resolve, reject) {
    UTILS.getJSONPForRelatedVideo({
      url: `${RECOMMEND_DATA_URL}/${listType}/${flvid}/0/0/jsonp${UTILS.getTimestampByHours()}`,
      context: this,
      jsonpCallback: `jsonp${UTILS.getTimestampByHours()}`,
      callback: function(res) {
        resolve(res)
      }
    })
  })
  return pro
}
export {
  getUserIp,
  getListData
}