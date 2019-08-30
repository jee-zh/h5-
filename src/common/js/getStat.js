/* eslint-disable */
import getScript from './getScript.js'
function getStat (objid, numid) {
  const bcode = `${numid}|1|2|15|${objid}|0`
  getScript({
    url: '//pvstat.baomihua.com/videogather.aspx?siteid=1&type=3&bcode=' + bcode + '&refurl=' + location.href,
    destroy: true
  })
}
export default getStat