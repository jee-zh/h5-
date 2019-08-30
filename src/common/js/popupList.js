// 弹窗频道list
import {CHANNEL_LIST_POPUP} from './channelList'
function loadPopChannelList () {
  let _html = ''
  CHANNEL_LIST_POPUP.forEach((item) => {
    _html += `<li typeid="${item.id}">
    <div class="icon"><img src="https://static01.baomihua.com/img/mobile/v5/${item.icon}.png" width="68.96%"></div>
    <p class="name">${item.channel}</p>
  </li>`
  })
  let odiv = document.createElement('div')
  odiv.className = 'channel-list-mask'
  odiv.style.display = 'none'
  odiv.innerHTML = `<div class="channel-list-wrapper"><ul>${_html}</ul></div>`
  document.body.appendChild(odiv)
}
export default loadPopChannelList
