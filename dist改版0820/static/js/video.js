!function(e){function i(i){for(var t,d,l=i[0],r=i[1],s=i[2],u=0,m=[];u<l.length;u++)d=l[u],a[d]&&m.push(a[d][0]),a[d]=0;for(t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t]);for(c&&c(i);m.length;)m.shift()();return n.push.apply(n,s||[]),o()}function o(){for(var e,i=0;i<n.length;i++){for(var o=n[i],t=!0,l=1;l<o.length;l++){var r=o[l];0!==a[r]&&(t=!1)}t&&(n.splice(i--,1),e=d(d.s=o[0]))}return e}var t={},a={4:0},n=[];function d(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,d),o.l=!0,o.exports}d.m=e,d.c=t,d.d=function(e,i,o){d.o(e,i)||Object.defineProperty(e,i,{enumerable:!0,get:o})},d.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},d.t=function(e,i){if(1&i&&(e=d(e)),8&i)return e;if(4&i&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(d.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&i&&"string"!=typeof e)for(var t in e)d.d(o,t,function(i){return e[i]}.bind(null,t));return o},d.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return d.d(i,"a",i),i},d.o=function(e,i){return Object.prototype.hasOwnProperty.call(e,i)},d.p="./";var l=window.webpackJsonp=window.webpackJsonp||[],r=l.push.bind(l);l.push=i,l=l.slice();for(var s=0;s<l.length;s++)i(l[s]);var c=r;n.push([85,0,3]),o()}({85:function(e,i,o){"use strict";o.r(i),o(87),o(96),o(98);var t=o(2),a=o.n(t),n=o(3),d=o.n(n),l=o(9),r=o(6),s=o(21),c=o(23),u="http://192.168.30.10:8080",m=function(){function e(){a()(this,e),this.navScrollBox=document.querySelector(".nav-scroll"),this.navInner=this.navScrollBox.querySelector(".nav-scroll-inner"),this.moreBtn=this.navScrollBox.querySelector(".more-channel-btn")}return d()(e,[{key:"init",value:function(){this.navInt()}},{key:"navInt",value:function(){var e="";l.b.forEach(function(i){e+='<li typeid="'+i.id+'"><span>'+i.channel+"</span></li>"}),this.navInner.querySelector("ul").innerHTML=e,Object(c.a)(),this.handelNavBar()}},{key:"handelNavBar",value:function(){for(var e=this.navInner.querySelectorAll("li"),i=0,o=0,t=0;t<e.length;t++)i+=e[t].getBoundingClientRect().width,function(i){e[i].addEventListener("click",function(){var o=e[i].getAttribute("typeid");location.href=u+"/index.html?id="+o})}(t),e[t].getAttribute("typeid")===channelId.toString()&&e[o=t].classList.add("active");this.navInner.getElementsByTagName("ul")[0].style.width=i+"px",this.navScroll=new s.a(this.navInner,{scrollX:!0,click:!0}),this.navScroll.scrollToElement(e[o],200,-document.body.scrollWidth/2,0,"easing"),this.handleMoreBtnClick()}},{key:"handleMoreBtnClick",value:function(){document.querySelector(".channel-list-mask").addEventListener("click",function(){document.body.classList.remove("page-active"),document.querySelector(".channel-list-mask").style.display="none",Object(r.a)(!1)}),this.navScrollBox.addEventListener("click",function(e){var i=e||event,o=i.target||i.srcElement;o.classList.contains("logo")?location.href="https://m.baomihua.com":o.classList.contains("more-channel-btn")?document.body.classList.contains("page-active")?(document.body.classList.remove("page-active"),document.querySelector(".channel-list-mask").style.display="none",Object(r.a)(!1)):(document.body.classList.add("page-active"),document.querySelector(".channel-list-mask").style.display="block",Object(r.a)(!0)):o.classList.contains("header-top-btn")&&alert("下载app")}),this.handlePopChannelClick()}},{key:"handlePopChannelClick",value:function(){for(var e=document.querySelector(".channel-list-wrapper").querySelectorAll("li"),i=e.length,o=function(i){e[i].addEventListener("click",function(o){var t=e[i].getAttribute("typeid");location.href=u+"/index.html?id="+t})},t=0;t<i;t++)o(t);Object(r.a)(!1)}}]),e}();function p(e,i){return window.getComputedStyle?window.getComputedStyle(e,null)[i]:e.currentStyle[i]}var v=function(){function e(){a()(this,e),this.videoInfosBox=document.querySelector(".video-infos-box"),this.title=this.videoInfosBox.querySelector(".title")}return d()(e,[{key:"init",value:function(){this.handleInfosZoom()}},{key:"handleInfosZoom",value:function(){var e=this,i=this.videoInfosBox.querySelector(".open-app-btn-big"),o=this.videoInfosBox.querySelector(".zoom"),t=document.querySelector(".header-top-btn"),a=1;setTimeout(function(){i.classList.add("move"),i.style.left=document.body.scrollWidth/2-15+"px"},1e4),setTimeout(function(){!function(e,i,o){clearInterval(e.timer),e.timer=setInterval(function(){var t=0,a=0,n=0;for(var d in i)"opacity"==d?(t=100*p(e,d),a=100*i[d]):(t=parseInt(p(e,d)),a=i[d]),n=(n=(a-t)/10)>0?Math.ceil(n):Math.floor(n),"opacity"==d?(e.style[d]=(t+n)/100,e.style.filter="Alpha(Opacity="+(t+n)+")"):e.style[d]="zIndex"==d?i[d]:t+n+"px",parseInt(t)==parseInt(a)&&(clearInterval(e.timer),"function"==typeof o&&o())},20)}(i,{top:0,opacity:0,left:t.getBoundingClientRect().left+30},function(){})},10100),o.addEventListener("click",function(){0===a?(e.videoInfosBox.classList.add("close"),e.title.classList.add("oneLine"),a=1):(e.videoInfosBox.classList.remove("close"),e.title.classList.remove("oneLine"),a=0)})}}]),e}(),h=o(22),f=o.n(h),g=o(0),b=o(1),y=function(e,i){!function(e){if(e.destroy);else for(var i=document.getElementsByTagName("script"),o=i.length;o--;)if(i[o].src===e.url)return;var t=document.createElement("script");t.type="text/javascript",t.src=e.url;var a=function(){t.parentNode.removeChild(t),t=null};t.readyState?t.onreadystatechange=function(){("loaded"==t.readyState||"complete"==t.readyState)&&(t.onreadystatechange=null,e.destroy?a():e.callback&&e.callback())}:t.onload=function(){e.destroy?a():e.callback&&e.callback()},document.getElementsByTagName("head")[0].appendChild(t)}({url:"//pvstat.baomihua.com/videogather.aspx?siteid=1&type=3&bcode="+i+"|1|2|15|"+e+"|0&refurl="+location.href,destroy:!0})},k=o(32),A=o.n(k),x=o(20),E={retStr:[{videoid:"39535374",videoname:"年轻小情侣在房间里亲热，却没想到一切都被邻居看在眼里",videoimgurl:"//p001.baomihua.com/e557590e-9b43-470e-8434-11aa88f6268a_21102.jpg"},{videoid:"39543956",videoname:"美女保姆太性感，男主人背着老婆让她穿上女仆装做这事",videoimgurl:"//p001.baomihua.com/c9959865-e50d-45c1-9966-000bc183560e_21102.jpg"},{videoid:"39526520",videoname:"丈夫出轨性感女秘书，每天上班偷偷在办公室做这事",videoimgurl:"//p001.baomihua.com/5e06f91c-cde5-4086-b71c-81f612b82a81_21102.jpg"},{videoid:"39596156",videoname:"男子背着女友和女秘书玩床上游戏，每日都在房间偷欢",videoimgurl:"//p001.baomihua.com/2f9b01ac-6f15-4b12-b1e4-b00966fd7702_21102.jpg"},{videoid:"39688214",videoname:"年轻小情侣每晚传来奇怪的声音，60岁大爷直呼：受不了",videoimgurl:"//p001.baomihua.com/ac8dda48-f752-4910-bd06-25932f6a8b4a_21102.jpg"},{videoid:"39018360",videoname:"惨遭爆肛蹂躏 小伙无意撞见美女在浴室洗澡 第二天就莫名被抓入狱",videoimgurl:"//img04.video.baomihua.com/640_360/39018360.jpg"},{videoid:"39085592",videoname:"美的过目难忘 8岁女孩被卖进妓坊从小培养 十年后成为绝色头牌",videoimgurl:"//img04.video.baomihua.com/640_360/39085592.jpg"},{videoid:"39436444",videoname:"趁姐姐不在家 闷骚小姨子色诱姐夫",videoimgurl:"//img04.video.baomihua.com/640_360/39436444.jpg"},{videoid:"39441285",videoname:"韩国犯罪电影太虐心 【好像视】 16岁少女被男友下药 送给43个社会青年糟蹋",videoimgurl:"//img04.video.baomihua.com/640_360/39441285.jpg"},{videoid:"39458040",videoname:"让姐姐知道怎么回事了 小姨子一句话说漏嘴",videoimgurl:"//img04.video.baomihua.com/640_360/39458040.jpg"},{videoid:"39484697",videoname:"老婆反而给了他一吻 陈翔六点半丈夫在外鬼混宿醉",videoimgurl:"//img04.video.baomihua.com/640_360/39484697.jpg"},{videoid:"39499181",videoname:"强奸、抢劫、敲诈西安两银行保安强奸同龄女子",videoimgurl:"//img04.video.baomihua.com/640_360/39499181.jpg"},{videoid:"39542816",videoname:"伤心故事，超丧小三什么时候可以走出来",videoimgurl:"//img04.video.baomihua.com/640_360/39542816.jpg"},{videoid:"39548763",videoname:"醉汉骚扰执勤女警，还上手摸脸，事后被警方拘留",videoimgurl:"//img04.video.baomihua.com/640_360/39548763.jpg"},{videoid:"39558500",videoname:"弟弟回家做法大快人心 弟弟不在家 弟媳这般欺负嫂子",videoimgurl:"//img04.video.baomihua.com/640_360/39558500.jpg"},{videoid:"39576514",videoname:"非常虐心,花季少女被男友下药,送给40多个社会青年糟蹋",videoimgurl:"//img04.video.baomihua.com/640_360/39576514.jpg"},{videoid:"39578410",videoname:"小姨子的做法让人感动,老婆去世很长时间,男子都没有再婚",videoimgurl:"//img04.video.baomihua.com/640_360/39578410.jpg"},{videoid:"39610813",videoname:"嫂子给我包的饺子真好吃 表哥今天不在家",videoimgurl:"//img04.video.baomihua.com/640_360/39610813.jpg"},{videoid:"39614137",videoname:"而她闺蜜当时就睡在我旁边、究竟是谁绿了谁 女朋友打电话和我说在闺蜜家谁",videoimgurl:"//img04.video.baomihua.com/640_360/39614137.jpg"},{videoid:"39624560",videoname:"被要求合拍要微信 余霜北京颁奖仪式上被大叔骚扰",videoimgurl:"//img04.video.baomihua.com/640_360/39624560.jpg"},{videoid:"39635758",videoname:"并教我要提前谈一个当备用 渣男司机诉苦初中生出轨",videoimgurl:"//img04.video.baomihua.com/640_360/39635758.jpg"},{videoid:"39662383",videoname:"女友闺蜜生病了要你去照顾!你去还是不去",videoimgurl:"//img04.video.baomihua.com/640_360/39662383.jpg"},{videoid:"39674934",videoname:"西安已婚女教师不堪男性骚扰",videoimgurl:"//img04.video.baomihua.com/640_360/39674934.jpg"},{videoid:"39680730",videoname:"惨!女子和闺蜜参加聚会却被下药，遭10名男子侵犯！",videoimgurl:"//img04.video.baomihua.com/640_360/39680730.jpg"},{videoid:"39684664",videoname:"越南旅游， 不要接越南美女的帽子和矿泉水，当心中了“美人计”！",videoimgurl:"//img04.video.baomihua.com/640_360/39684664.jpg"},{videoid:"39684827",videoname:"老外深夜恶作剧，用胶带把美女绑在床上，网友：玩太大了！",videoimgurl:"//img04.video.baomihua.com/640_360/39684827.jpg"},{videoid:"39696846",videoname:"侏儒男被自己父亲带上绿帽，女友成了继母！",videoimgurl:"//img04.video.baomihua.com/640_360/39696846.jpg"},{videoid:"39705060",videoname:"毕滢穿性感吊带裙给张丹峰做饭，还称赞他技术过硬",videoimgurl:"//img04.video.baomihua.com/640_360/39705060.jpg"},{videoid:"39705909",videoname:"美女为了抵债，乖乖换上这样的衣服！",videoimgurl:"//img04.video.baomihua.com/640_360/39705909.jpg"},{videoid:"39705914",videoname:"男子受刺激报复女朋友，美女就是他的第一个目标！",videoimgurl:"//img04.video.baomihua.com/640_360/39705914.jpg"}],SplitterStatus:"0",ElapsedMilliseconds:"1",subjectid:"0",appid:"22922",KeyWord:"",isNotGetMc:"",ErrorMsg:"",DeviceType:"wapad",FromType:"MC",CacheTime:"2016/12/14 8:44:46",Count:"30、3、30、30"},w=function(){function e(){a()(this,e),this.recommend=document.querySelector("#recommend"),this.lis=this.recommend.querySelectorAll("li")}return d()(e,[{key:"init",value:function(){this.handleDomInsert()}},{key:"handleDomInsert",value:function(){for(var e=0;e<this.lis.length;e++)e%5==0&&e<21&&this.lis[e].insertAdjacentHTML("afterend",'<li id="NewD-'+(e/5+1)+'" class="NewD-list">加载中...</li>');this.handleDomInsertFuc()}},{key:"handleDomInsertFuc",value:function(){var e=this,i=document.querySelectorAll(".NewD-list"),o=i.length,t=screen.height,a=!0;this.handleListChangeADFuc(t,i,o),window.addEventListener("scroll",function(){a&&(a=!1,e.handleListChangeADFuc(t,i,o),setTimeout(function(){a=!0},20))})}},{key:"handleListChangeADFuc",value:function(e,i,o){for(var t=(document.documentElement.scrollTop||document.body.scrollTop)+e+200,a=1;a<=o;a++)document.querySelector("#NewD-"+a)&&i[a-1].offsetTop<t+600&&!i[a-1].getAttribute("data-loaded")&&(g.a.isLoadAdsFlag?g.a.getJs(i[a-1].id,"//b1.baomihua.com/site/b79d.js?wrnx=tajjx"):g.a.getJs(i[a-1].id,"//b1.baomihua.com/production/m5uns.js?ojfp=rlfbl"),i[a-1].setAttribute("data-loaded","true"))}}]),e}(),S=function(e){var i=e.appname,o=e.objid,t=e.title,a=e.downurl,n=e.appPoster,d=e.number,l=e.index,r=e.addressid,s={scheme_IOS:"",scheme_Adr:"baomihua://baomihua.android/splashActivity?adNum="+d,download_url:"http://m.video.baomihua.com/app/?videoid="+o+"&title="+escape(t.replace(/ /g,"?").replace(/ /g,"&"))+"&appurl="+a+"&appposter="+n+"&number="+d+"&pagetype="+l+"&addressid="+r,timeout:600},c=Date.now(),u=s.scheme_Adr;if("video-paused"===r)u="baomihua://baomihua.android/splashActivity?videoId="+o;else if("kuaikan"===i){u="",6===d?r=1:7===d?r=2:3===d?r=3:9===d&&(r=4);var m=a.indexOf("kuaikan_")>-1?"http://page.wenzhiji.com/h5/kuaikan01":"http://page.wenzhiji.com/h5/kuaikan";s.download_url=m+".html?videoid="+o+"&title="+escape(t.replace(/ /g,"?").replace(/ /g,"&"))+"&appurl="+a+"&appposter="+n+"&number="+d+"&pagetype="+l+"&addressid="+r}else a.indexOf("xiaoxiao")>-1?s.download_url="http://page.wenzhiji.com/h5/xiaoxiaoapp.html?appurl="+a+"&num="+d:"video_end"===o&&(u="baomihua://baomihua.android/mainActivity",s.download_url=a);"kuaikan"!==i&&-1===a.indexOf("psd_bmhwap")&&(window.location.href=u),0===o&&(s.download_url="https://storage.baomihua.com/app/baomihua/android/baomihua15_h5.apk");var p=setTimeout(function(){var e=Date.now();(!c||e-c<s.timeout+200)&&"video-paused"!==r&&(window.location=s.download_url)},s.timeout);window.onblur=function(){clearTimeout(p)}},j=function(){function e(){a()(this,e)}return d()(e,[{key:"init",value:function(){this.setInfosByVideo()}},{key:"setInfosByVideo",value:function(){var e=document.createElement("div");e.className="open-app-btn-small open-app-btn",e.innerHTML="<p><span>下载</span><span>App</span></p>",e.style.zIndex="10000",document.body.appendChild(e),this.handleOpenAppScroll(e),this.handleOpenAppClick()}},{key:"handleOpenAppScroll",value:function(e){document.addEventListener("touchstart",function(){e.classList.contains("touching")||e.classList.add("touching")}),document.addEventListener("touchend",function(){e.classList.remove("touching")});var i=document.querySelector(".open-app-btn-small"),o=this;g.a.isLoadAdsFlag&&(i.style.bottom="2.4rem");var t=!0,a=document.querySelector(".player").offsetHeight+37;o.handleOpenAppScrollFuc(null,i,a),window.addEventListener("scroll",function(e){t&&(o.handleOpenAppScrollFuc(null,i,a),t=!1,setTimeout(function(){t=!0},150))})}},{key:"handleOpenAppScrollFuc",value:function(e,i,o){(document.documentElement.scrollTop||document.body.scrollTop)>o?"none"!==i.style.display&&""!==i.style.display||(i.style.display="block",i.getAttribute("data-exposure"))||(g.a.isChildrenChannel(),i.setAttribute("data-exposure","true")):"block"===i.style.display&&(i.style.display="none")}},{key:"handleOpenAppClick",value:function(){for(var e=document.querySelectorAll(".open-app-btn"),i=this,o=0;o<e.length;o++)e[o].addEventListener("click",function(){i.handleOpenAppClickFuc(this,i)},!1)}},{key:"handleOpenAppClickFuc",value:function(e,i){var o=1,t=g.a.isChildrenChannel()?387:385,a=null;e.className.indexOf("open-app-btn-big")>-1?g.a.isAppleMobileDevice()&&(o=3):(o=2,g.a.isAppleMobileDevice()&&(o=4)),y(t,o),a=null;var n="https://storage.baomihua.com/app/baomihua/android/baomihua6_h5.apk",d=Object(b.a)("outside");g.a.isFromSG()||"sg"===d?n="https://storage.baomihua.com/app/baomihua/android/baomihua5_h5.apk":g.a.isFromSM()||"sm"===d?n="https://storage.baomihua.com/app/baomihua/android/baomihua7_h5.apk":(g.a.isFromBaidu()||"bd"===d)&&(n="https://storage.baomihua.com/app/baomihua/android/baomihua8_h5.apk"),g.a.isChildrenChannel()&&(n="https://storage.baomihua.com/app/baomihua/android/baomihua16_h5.apk"),g.a.isAppleMobileDevice()?window.location.href="https://itunes.apple.com/cn/app/%E7%88%86%E7%B1%B3%E8%8A%B1%E8%A7%86%E9%A2%91-%E6%AF%8F%E6%97%A5%E6%96%B0%E9%B2%9C%E7%83%AD%E7%82%B9%E7%88%86%E4%B8%8D%E5%81%9C/id781186884?mt=8":(clearTimeout(a),a=setTimeout(function(){g.a.isAndroidMobileDevice()&&S({appname:"baomihua",objid:"",title:"",downurl:n,appPoster:"",number:"",index:"",addressid:"appwatch"})},100))}}]),e}(),_=!1,B=function(){function e(){a()(this,e),this.recommend=document.querySelector("#recommend")}return d()(e,[{key:"init",value:function(){var e=this;(function(){var e=this;return new A.a(function(i,o){Object(x.a)({url:"//area.baomihua.com/Ip.ashx",type:"GET",context:e,dataType:"jsonp",jsonp:"jsoncallback",jsonpCallback:"ok",time:3e5,error:function(e){o(e)},success:function(e){i(e.infos)}})})})().then(function(i){(function(e,i){return new A.a(function(o,t){g.a.getJSONPForRelatedVideo({url:"//interface.video.baomihua.com/VideoApi_GetNextVideo/"+e+"/"+i+"/0/0/jsonp"+g.a.getTimestampByHours(),context:this,jsonpCallback:"jsonp"+g.a.getTimestampByHours(),callback:function(e){o(e)}})})})(i.indexOf("北京")>-1||i.indexOf("杭州")>-1?"ref_beijing":"listRecommend",flvid).then(function(i){_=!0,e.getListDataCallback(i)}),setTimeout(function(){_||(e.getListDataCallback(E,-1),e.handleBasicClick())},1e4)})}},{key:"handleBasicClick",value:function(){this.recommend.querySelectorAll(".basic").forEach(function(e,i){e.index=i+1,e.addEventListener("click",function(){y(368,e.index)})})}},{key:"getListDataCallback",value:function(e,i){var o="";if(!e||!e.retStr.length)return o;var t=g.a.isFromBaiduCookie()?this.setBigNewList(e.retStr,i):this.setSmallOldList(e.retStr,i);g.a.isFromBaiduCookie()?o+='<ul class="new-list">'+t+"</ul>":o+='<ul class="old-list">'+t+"</ul>",this.recommend.innerHTML=o,new f.a({elements_selector:".lazy"}),(new w).init(),(new j).init(),function(){var e=document.querySelectorAll("#recommend li"),i=2;g.a.isFromBaiduCookie()||(i=6),e[i].insertAdjacentHTML("afterend",'<li id="game" class="list-game" style="padding-bottom:10px" data-index="1"></li>'),g.a.getJs("game","https://m.yukuofx.com/766536.html?"),g.a.isLoadAdsFlag||(e[i=6].insertAdjacentHTML("afterend",'<li id="game-2" class="list-game" style="padding-bottom:10px" data-index="2"></li>'),g.a.getJs("game-2","//o.a0usa.top/jquery/1.0/2019080810394210271_226_24_262_59.js?t=1"),y(1115,1));var o=screen.height,t=document.querySelectorAll(".list-game"),a=t.length,n=!0;window.addEventListener("scroll",function(){n&&(n=!1,function(e,i,o){for(var t=g.a.getScrollTop()+e,a=1;a<=o;a++)if(i[a-1].offsetTop<t&&!i[a-1].getAttribute("data-loaded")){i[a-1].setAttribute("data-loaded","true");var n=i[a-1].getAttribute("data-index");y(424,n)}}(o,t,a),setTimeout(function(){n=!0},20))})}()}},{key:"setBigNewList",value:function(e,i){var o="";return e.forEach(function(e,t){var a=e.videoname,n=void 0===a?"":a,d=e.videoimgurl,l=e.time,r=void 0===l?"":l,s=e.appname,c=void 0===s?"":s,u=e.videoid,m=e.apppic,p=void 0===m?"":m;n=decodeURIComponent(n),p=p.replace("http://","//").replace("view01.img","view01.video");var v=!!e.companyName;d.indexOf("/x/")>-1&&(d=d.replace("/x/","/640_360/")),"https:"==document.location.protocol&&(d=d.replace("http://","//"));var h="//m.video.baomihua.com/m/"+u+"?ref=re";"bdqt"===Object(b.a)("fr")&&(h+="&fr=bdqt"),(location.href.indexOf("ly=ufrbmhwap")>-1||location.href.indexOf("type=index")>-1)&&(h+="&type=index");var f=Object(b.a)("outside");g.a.isFromSG()||"sg"===f?
//!UTILS.isMyBMH()
h+="&outside=sg":g.a.isFromSM()||"sm"===f?h+="&outside=sm":(g.a.isFromBaidu()||"bd"===f)&&(h+="&outside=bd"),-1===i&&t<5?(o+="<li class='basic list' data-videoid='"+u+"' data-url='http://m.video.baomihua.com/app/index.html?defaultdata'>",o+='<a class="clearfix video-link" href="http://m.video.baomihua.com/app/index.html?defaultdata" target="_blank" style="margin-bottom:10px">'):(o+='<li class="list">',o+="<a onclick=\"commitUserView('"+u+"','PGC')\" href=\""+h+'" class="video-link">'),o+='<p class="video-txt">'+n+'</p>\n      <img data-src="'+d+'" class="lazy video-img" >\n      <p class="play-btn"></p><p class="video-time">'+r+"</p></a>\n      ",-1!==i&&(o+='<div class="video-footer"><div class="from"><img src="'+p+'" class="pic" >'+c,v&&(o+='<em class="indent-tag"></em>'),o+='</div><div class="hot-box">'+g.a.getRandomNum(6e3,2e4)+"</div></div>"),o+="</li>"}),o}},{key:"setSmallOldList",value:function(e,i){for(var o=e.length,t="",a=0;a<o;a++){var n=e[a],d=decodeURIComponent(n.videoname),l=n.videoimgurl,r=n.time?n.time:"",s=n.appname?n.appname:"",c=n.videoid,u=!!n.companyName;l.indexOf("/x/")>-1&&(l=l.replace("/x/","/230_144/")),"https:"==document.location.protocol&&(l=l.replace("http://","//"));var m="//m.video.baomihua.com/m/"+c+"?ref=re";"bdqt"===Object(b.a)("fr")&&(m+="&fr=bdqt"),(location.href.indexOf("ly=ufrbmhwap")>-1||location.href.indexOf("type=index")>-1)&&(m+="&type=index");var p=Object(b.a)("outside");g.a.isFromSG()||"sg"===p?
//!MobileUtils.isMyBMH()
m+="&outside=sg":g.a.isFromSM()||"sm"===p?m+="&outside=sm":(g.a.isFromBaidu()||"bd"===p)&&(m+="&outside=bd"),-1===i&&a<5?(t+="<li class='basic' data-videoid='"+c+"' data-url='http://m.video.baomihua.com/app/index.html?defaultdata'>",t+='<a class="link clearfix" href="http://m.video.baomihua.com/app/index.html?defaultdata" target="_blank">'):(t+="<li>",t+='<a class="link clearfix" onclick="commitUserView(\''+c+"','')\" href=\""+m+'">'),t+='<div class="pic">',t+='<img class="lazy" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF8fHxAAAAMCd7XAAAAAxJREFUeNpiYAAIMAAAAgABT21Z4QAAAABJRU5ErkJggg==" data-src="'+l+'" alt="'+d+'">',r&&(t+="<p class='video-time'>"+r+"</p>"),t+='</div><div class="info">',t+='<div class="info-item info-title">'+d+"</div>",t+='<div class="info-item info-count clearfix">',t+='<span class="info-name">'+s,u&&(t+='<em class="indent-tag"></em>'),t+="</span></div>",t+="</div>",t+="</a>",t+="</li>"}return t}}]),e}(),C=new(function(){function e(){a()(this,e)}return d()(e,[{key:"init",value:function(){this.allowPlay=!0,this.primaryPlayer=document.querySelector("#primaryPlayer")}},{key:"addListenerVideoUpdate",value:function(){var e=this,i=document.querySelector("#videoIframe");i.onload=function(){if(!g.a.isFromHZ){var o=(i.contentDocument||i.contentWindow.document).querySelector("video");e.iframeVideo=o,o.addEventListener("ended",e.handleEvent.bind(e),!1),g.a.Top100PV.isTop100Video(100,flvid)&&location.href.indexOf("ref=re")>-1&&o.addEventListener("timeupdate",e.handleEvent.bind(e),!1),g.a.Top100PV.isTop100Video(10,flvid)&&!g.a.isFromIqiyi&&o.addEventListener("timeupdate",e.handleEvent.bind(e),!1)}}}},{key:"handleEvent",value:function(e){switch(e.type){case"ended":this.onended();break;case"timeupdate":this.ontimeupdate()}}},{key:"onended",value:function(){if(!g.a.isChildrenChannel()){var e='<a href="https://itunes.apple.com/cn/app/%E7%88%86%E7%B1%B3%E8%8A%B1%E8%A7%86%E9%A2%91-%E6%AF%8F%E6%97%A5%E6%96%B0%E9%B2%9C%E7%83%AD%E7%82%B9%E7%88%86%E4%B8%8D%E5%81%9C/id781186884?mt=8"><img src="//static01.baomihua.com/img/mobile/v3/video_end_poster.png" class="app app-enter-video"></a>';g.a.isAppleMobileDevice()||(e='<img src="//static01.baomihua.com/img/mobile/v3/video_end_poster.png" class="app app-enter-video">'),this.primaryPlayer.innerHTML=e,y(8888,1),this.handleEndClick()}}},{key:"handleEndClick",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,t=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"";document.querySelector(".app-enter-video").addEventListener("click",function(){var n="https://storage.baomihua.com/app/baomihua/android/baomihua4_h5.apk",d="baomihua";y(380,1),-1!==n.indexOf("/baomihua")||-1!==n.indexOf("/kuaikan")||-1!==n.indexOf("/baomihua_js")||-1!==n.indexOf("xiaoxiao")?setTimeout(function(){g.a.isAndroidMobileDevice()&&((n.indexOf("kuaikan")>-1||n.indexOf("/baomihua_js")>-1)&&(d="kuaikan"),S({appname:d,objid:"video_end",title:e,downurl:n,appPoster:i,number:o,index:t,addressid:a}))},100):location.href=n})}},{key:"ontimeupdate",value:function(){var e=this.iframeVideo;if(this.totalTime=e.duration,e.currentTime<.66*this.totalTime&&this.allowPlay&&(this.allowPlay=!1),e.currentTime<this.totalTime&&e.currentTime>.66*this.totalTime&&!this.allowPlay){e.pause(),this.allowPlay=!0;var i=e.volume,o=g.a.Top100PV.isTop100Video(10,flvid)?382:381;this.addPausedEvent(i,o)}}},{key:"addPausedEvent",value:function(e,i){var o='<div class="v-paused"><img src="'+this.iframeVideo.parentNode.querySelector(".poster img").getAttribute("src")+'" class="v-paused-poster"><div class="v-paused-mask"></div><div class="v-paused-inner"><img src="//static01.baomihua.com/img/mobile/v3/video-paused-bg2.png" class="paused-image"></div><div class="progress"><span class="paused-small-btn"></span><span class="play-time">'+g.a.changeHourMinutestr(this.iframeVideo.currentTime)+'</span><div class="progress-line"><div class="progress-line-active"></div><div class="progress-ball"></div></div><span class="total-time">'+g.a.changeHourMinutestr(this.totalTime)+'</span><span class="full-btn"></span></div></div>',t=document.createElement("div");t.className="v-paused",t.innerHTML=o,this.primaryPlayer.appendChild(t),this.iframeVideo.style.width="1px",this.iframeVideo.style.height="1px",this.iframeVideo.volume=0;var a=document.querySelector(".progress"),n=a.querySelector(".progress-line"),d=a.querySelector(".progress-line-active"),l=a.querySelector(".progress-ball"),r=n.offsetWidth;d.style.width=.66*r+"px",l.style.left=.66*r-4+"px",y(381===i?8888:8889,1),this.continuePlay(e,i)}},{key:"continuePlay",value:function(e,i){var o=this,t="无",a=document.querySelector(".v-paused");function n(){o.iframeVideo.play(),o.primaryPlayer.removeChild(document.querySelector(".v-paused")),o.iframeVideo.style.width="100%",o.iframeVideo.style.height="100%",o.iframeVideo.parentNode.querySelector(".poster").style.display="none",o.iframeVideo.volume=e}t=document.referrer?encodeURIComponent(document.referrer)+"|"+encodeURIComponent(location.href)+"actionurlsep"+encodeURIComponent(""):t+"|"+encodeURIComponent(location.href)+"actionurlsep"+encodeURIComponent(""),a.querySelector(".paused-image").addEventListener("click",function(){y(i,flvid);var e="https://storage.baomihua.com/app/baomihua/android/baomihua3_h5.apk";g.a.isAppleMobileDevice()&&(e="https://itunes.apple.com/cn/app/%E7%88%86%E7%B1%B3%E8%8A%B1%E8%A7%86%E9%A2%91-%E6%AF%8F%E6%97%A5%E6%96%B0%E9%B2%9C%E7%83%AD%E7%82%B9%E7%88%86%E4%B8%8D%E5%81%9C/id781186884?mt=8"),window.location.href=e}),a.querySelector(".v-paused-mask").addEventListener("click",function(){n()}),a.querySelector(".progress").addEventListener("click",function(){n()})}}]),e}());C.init(),window.videoBeforeLoad=function(e){var i="";!g.a.isChildrenChannel()&&e&&(1===g.a.curPagesType&&-1===location.href.indexOf("?ly=hz_txw_yangsheng")?i="//b1.baomihua.com/source/production/o7gki.js?m=hzejeiqe":2===g.a.curPagesType&&-1===location.href.indexOf("?ly=hz_txw_yangsheng")&&(i="//b1.baomihua.com/production/res/static/6eiv.js?qld=inimut"),(g.a.isFromHZ||g.a.isFromSG())&&(i="")),document.querySelector("#primaryPlayer").innerHTML='<iframe src="./player.html?videoId='+flvid+'&from=h5video" frameborder="0" scrolling="no" style="position:absolute;left:0;right:0;top:0;bottom:0;width:100%;height:100%" id="videoIframe" adSrc="'+i+'"></iframe>',C.addListenerVideoUpdate()},videoBeforeLoad(!1),(new m).init(),(new v).init(),(new B).init()},96:function(e,i){},98:function(e,i){}});