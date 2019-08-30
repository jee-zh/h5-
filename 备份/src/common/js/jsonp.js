/* eslint-disable */
function jsonp (params) {
  params = params || {};
  params.data = params.data || {};
  var json = params.jsonp ? jsonp(params) : json(params);

  function jsonp(params) {
    var callbackName = params.jsonp;
    var head = document.getElementsByTagName('head')[0];
    params.data['jsoncallback'] = callbackName;
    var data = formatParams(params.data);
    var script = document.createElement('script');
    head.appendChild(script);
    window[callbackName] = function (json) {
      head.removeChild(script);
      clearTimeout(script.timer);
      window[callbackName] = null;
      params.success && params.success(json);
    };
    script.src = params.url + '?' + data;
    if (params.time) {
      script.timer = setTimeout(function () {
        window[callbackName] = null;
        head.removeChild(script);
        params.error && params.error({
          message: '超时'
        });
      }, time);
    }
  };

  function formatParams(data) {
    var arr = [];
    for (var name in data) {
      arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    };
    return arr.join('&')
  }
}
export default jsonp