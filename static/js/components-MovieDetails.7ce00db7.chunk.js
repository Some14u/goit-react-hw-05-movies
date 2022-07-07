"use strict";(self.webpackChunkgoit_react_hw_05_movies=self.webpackChunkgoit_react_hw_05_movies||[]).push([[385,466,304,414],{9947:function(t,e,i){i.r(e),i.d(e,{default:function(){return c}});var n=i(9380),r=i(4567),s=i(8001),a=i(6819),o=i(184),h=(0,n.importUrlAssociated)("cast","components/Cast"),u=(0,n.importUrlAssociated)("reviews","components/Reviews");function c(t){var e=r.theMovieDbApi.lazyGet("movie/"+t.urlParams.movieId);return null===e||!1===e.success?(0,o.jsx)(a.default,{}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s.BackLink,{path:"<<<",fallback:"/movies",children:"Go back"}),(0,o.jsxs)(s.Wrapper,{children:[(0,o.jsx)(s.Poster,{src:r.theMovieDbApi.imgUrl+r.theMovieDbApi.posterPath+e.poster_path,alt:"".concat(e.title," poster")}),(0,o.jsx)("div",{children:(0,o.jsxs)(s.Details,{children:[(0,o.jsxs)(s.Title,{children:[e.title,l(e.release_date)]}),(0,o.jsxs)("p",{children:["User score: ",10*e.vote_average,"%"]}),(0,o.jsx)("h3",{children:"Overview"}),(0,o.jsx)("p",{children:e.overview}),(0,o.jsx)("b",{children:"Genres"}),(0,o.jsx)("p",{children:e.genres.map((function(t){return t.name})).join(", ")}),(0,o.jsx)("hr",{}),(0,o.jsx)("b",{children:"Additional information"}),(0,o.jsxs)("ul",{children:[(0,o.jsx)("li",{children:(0,o.jsx)(s.Link,{path:"cast",historyAction:"replace",children:"Cast"})}),(0,o.jsx)("li",{children:(0,o.jsx)(s.Link,{path:"reviews",historyAction:"replace",children:"Reviews"})})]})]})})]}),(0,o.jsx)("hr",{}),(0,o.jsx)(h,{}),(0,o.jsx)(u,{})]})}function l(t){var e;return t&&""!==t?" ("+((null===(e=new Date(t))||void 0===e?void 0:e.getUTCFullYear())||t)+")":""}},8001:function(t,e,i){i.r(e),i.d(e,{BackLink:function(){return v},Details:function(){return p},Link:function(){return w},Poster:function(){return g},Title:function(){return f},Wrapper:function(){return d}});var n,r,s,a,o,h,u=i(168),c=i(9380),l=i(6031),d=l.default.article(n||(n=(0,u.Z)(["\n  display: flex;\n  padding-top: 20px;\n"]))),f=l.default.h1(r||(r=(0,u.Z)(["\n  margin-top: 0;\n"]))),p=l.default.div(s||(s=(0,u.Z)(["\n  padding-left: 20px;\n  max-width: 500px;\n"]))),g=l.default.img(a||(a=(0,u.Z)(["\n  display: block;\n  width: 240px;\n  height: 100%;\n"]))),w=(0,l.default)(c.ControllerLink)(o||(o=(0,u.Z)(["\n  &.matchUrl {\n    color: red;\n  }\n"]))),v=(0,l.default)(c.ControllerLink)(h||(h=(0,u.Z)(["\n  display: block;\n  width: fit-content;\n  transform: translateY(10px);\n"])))},1865:function(t,e,i){i.r(e);var n=i(9947);e.default=n.default},4567:function(t,e,i){i.r(e),i.d(e,{theMovieDbApi:function(){return c}});var n=i(5861),r=i(8683),s=i(5671),a=i(3144),o=i(7757),h=i.n(o),u=function(){function t(){(0,s.Z)(this,t),this.url="https://api.themoviedb.org/3/",this.cache={},this.configuration={images:{base_url:"http://image.tmdb.org/t/p/",secure_base_url:"https://image.tmdb.org/t/p/",backdrop_sizes:["w300","w780","w1280","original"],logo_sizes:["w45","w92","w154","w185","w300","w500","original"],poster_sizes:["w92","w154","w185","w342","w500","w780","original"],profile_sizes:["w45","w185","h632","original"],still_sizes:["w92","w185","w300","original"]}},this.DESIRED_POSTER_SIZE={width:240,height:356},this.DESIRED_PORTRAIT_SIZE={width:100,height:150},this.parameters={},this.loadConfiguration()}return(0,a.Z)(t,[{key:"findBestTag",value:function(t,e){var i=e.width,n=void 0===i?0:i,r=e.height,s=void 0===r?0:r;if(n+s===0)return"original";var a={w:0,h:0};return t.filter((function(t){return t.startsWith("w")})).map((function(t){return Number.parseInt(t.substring(1))})).sort((function(t,e){return e-t})).forEach((function(t){(0===a.w||t>n&&Math.abs(n-t)<Math.abs(n-a.w))&&(a.w=t)})),t.filter((function(t){return t.startsWith("h")})).sort((function(t,e){return e-t})).map((function(t){return Number.parseInt(t.substring(1))})).forEach((function(t){(0===a.h||t>s&&Math.abs(s-t)<Math.abs(s-a.h))&&(a.h=t)})),Math.abs(s-a.h)<Math.abs(n-a.w)?"h"+a.h:"w"+a.w}},{key:"loadConfiguration",value:function(){var t=this;this.get("configuration").then((function(e){t.configuration=(0,r.Z)((0,r.Z)({},t.configuration),e)})).finally((function(){t.buildImageUrls()}))}},{key:"buildImageUrls",value:function(){this.imgUrl=this.configuration.images.secure_base_url,this.posterPath=this.findBestTag(this.configuration.images.poster_sizes,this.DESIRED_POSTER_SIZE)+"/",this.portraitPath=this.findBestTag(this.configuration.images.profile_sizes,this.DESIRED_PORTRAIT_SIZE)+"/"}},{key:"buildRequestString",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i="?"+new URLSearchParams((0,r.Z)((0,r.Z)((0,r.Z)({},this.parameters),e),{},{api_key:"dcc9bedd4e44c237d701363380ef9ebd"}));return this.url+t+i}},{key:"createFetchPromise",value:function(t){return new Promise(function(){var e=(0,n.Z)(h().mark((function e(i){var n,r;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.fetch(t);case 2:return n=e.sent,e.next=5,n.json();case 5:r=e.sent,i(r);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}},{key:"get",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2?arguments[2]:void 0,n=this.buildRequestString(t,e);if(!this.cache[n]){var r=this.createFetchPromise(n);this.cache[n]=i?new l(r):r}return i?this.cache[n].read():this.cache[n]}},{key:"lazyGet",value:function(t,e){return this.get(t,e,!0)}}]),t}(),c=new u,l=function(){function t(e){var i=this;(0,s.Z)(this,t),this.status="pending",this.error=void 0,this.data=void 0,this.promise=null,this.promise=e.then((function(t){i.status="success",i.data=t})).catch((function(t){i.status="error",i.error=t}))}return(0,a.Z)(t,[{key:"read",value:function(){switch(this.status){case"pending":throw this.promise;case"error":throw this.error;default:return this.data}}}]),t}()}}]);
//# sourceMappingURL=components-MovieDetails.7ce00db7.chunk.js.map