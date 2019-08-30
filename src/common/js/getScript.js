/* eslint-disable */
function getScript (a) {
  if(a.destroy);
  else
    for(var b = document.getElementsByTagName("script"), c = b.length; c--;)
      if(b[c].src === a.url) return;
  var d = document.createElement("script");
  d.type = "text/javascript",
    d.src = a.url;
  var e = function() {
    d.parentNode.removeChild(d),
      d = null
  };
  d.readyState ? d.onreadystatechange = function() {
      ("loaded" == d.readyState || "complete" == d.readyState) && (d.onreadystatechange = null, a.destroy ? e() : a.callback && a.callback())
    } : d.onload = function() {
      a.destroy ? e() : a.callback && a.callback()
    },
    document.getElementsByTagName("head")[0].appendChild(d)
}
export default getScript