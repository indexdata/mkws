/*! Copyright (c) 2013-2018 Index Data ApS. http://indexdata.com
   Licence: LGPL, http://www.indexdata.com/licences/lgpl
   created at: Mon Nov 26 12:20:10 GMT 2018
   MKWS GIT id: 5b3b01d14c2333dbc4341acba1b2e6a50153d4ee
   pz2.js GIT id: 
*/
/*! jQuery v1.10.0 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
//@ 
*/
(function(e,t){var n,r,i=typeof t,o=e.location,a=e.document,s=a.documentElement,l=e.jQuery,u=e.$,c={},p=[],f="1.10.0",d=p.concat,h=p.push,g=p.slice,m=p.indexOf,y=c.toString,v=c.hasOwnProperty,b=f.trim,x=function(e,t){return new x.fn.init(e,t,r)},w=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=/\S+/g,C=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,k=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,E=/^[\],:{}\s]*$/,S=/(?:^|:|,)(?:\s*\[)+/g,A=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,j=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,D=/^-ms-/,L=/-([\da-z])/gi,H=function(e,t){return t.toUpperCase()},q=function(e){(a.addEventListener||"load"===e.type||"complete"===a.readyState)&&(_(),x.ready())},_=function(){a.addEventListener?(a.removeEventListener("DOMContentLoaded",q,!1),e.removeEventListener("load",q,!1)):(a.detachEvent("onreadystatechange",q),e.detachEvent("onload",q))};x.fn=x.prototype={jquery:f,constructor:x,init:function(e,n,r){var i,o;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof x?n[0]:n,x.merge(this,x.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:a,!0)),k.test(i[1])&&x.isPlainObject(n))for(i in n)x.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(o=a.getElementById(i[2]),o&&o.parentNode){if(o.id!==i[2])return r.find(e);this.length=1,this[0]=o}return this.context=a,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return g.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(g.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},l=1,u=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},l=2),"object"==typeof s||x.isFunction(s)||(s={}),u===l&&(s=this,--l);u>l;l++)if(null!=(o=arguments[l]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(x.isPlainObject(r)||(n=x.isArray(r)))?(n?(n=!1,a=e&&x.isArray(e)?e:[]):a=e&&x.isPlainObject(e)?e:{},s[i]=x.extend(c,a,r)):r!==t&&(s[i]=r));return s},x.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=l),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){if(e===!0?!--x.readyWait:!x.isReady){if(!a.body)return setTimeout(x.ready);x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(a,[x]),x.fn.trigger&&x(a).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray||function(e){return"array"===x.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?c[y.call(e)]||"object":typeof e},isPlainObject:function(e){var n;if(!e||"object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!v.call(e,"constructor")&&!v.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(r){return!1}if(x.support.ownLast)for(n in e)return v.call(e,n);for(n in e);return n===t||v.call(e,n)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||a;var r=k.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=x.trim(n),n&&E.test(n.replace(A,"@").replace(j,"]").replace(S,"")))?Function("return "+n)():(x.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||x.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&x.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(D,"ms-").replace(L,H)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:b&&!b.call("\ufeff\u00a0")?function(e){return null==e?"":b.call(e)}:function(e){return null==e?"":(e+"").replace(C,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(m)return m.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return d.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),x.isFunction(e)?(r=g.call(arguments,2),i=function(){return e.apply(n||this,r.concat(g.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):t},access:function(e,n,r,i,o,a,s){var l=0,u=e.length,c=null==r;if("object"===x.type(r)){o=!0;for(l in r)x.access(e,n,l,r[l],!0,a,s)}else if(i!==t&&(o=!0,x.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(x(e),n)})),n))for(;u>l;l++)n(e[l],r,s?i:i.call(e[l],l,n(e[l],r)));return o?e:c?n.call(e):u?n(e[0],r):a},now:function(){return(new Date).getTime()},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),x.ready.promise=function(t){if(!n)if(n=x.Deferred(),"complete"===a.readyState)setTimeout(x.ready);else if(a.addEventListener)a.addEventListener("DOMContentLoaded",q,!1),e.addEventListener("load",q,!1);else{a.attachEvent("onreadystatechange",q),e.attachEvent("onload",q);var r=!1;try{r=null==e.frameElement&&a.documentElement}catch(i){}r&&r.doScroll&&function o(){if(!x.isReady){try{r.doScroll("left")}catch(e){return setTimeout(o,50)}_(),x.ready()}}()}return n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){c["[object "+t+"]"]=t.toLowerCase()});function M(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}r=x(a),function(e,t){var n,r,i,o,a,s,l,u,c,p,f,d,h,g,m,y,v,b="sizzle"+-new Date,w=e.document,T=0,C=0,N=lt(),k=lt(),E=lt(),S=!1,A=function(){return 0},j=typeof t,D=1<<31,L={}.hasOwnProperty,H=[],q=H.pop,_=H.push,M=H.push,O=H.slice,F=H.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},B="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",P="[\\x20\\t\\r\\n\\f]",R="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",W=R.replace("w","w#"),$="\\["+P+"*("+R+")"+P+"*(?:([*^$|!~]?=)"+P+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+W+")|)|)"+P+"*\\]",I=":("+R+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+$.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+P+"+|((?:^|[^\\\\])(?:\\\\.)*)"+P+"+$","g"),X=RegExp("^"+P+"*,"+P+"*"),U=RegExp("^"+P+"*([>+~]|"+P+")"+P+"*"),V=RegExp(P+"*[+~]"),Y=RegExp("="+P+"*([^\\]'\"]*)"+P+"*\\]","g"),J=RegExp(I),G=RegExp("^"+W+"$"),Q={ID:RegExp("^#("+R+")"),CLASS:RegExp("^\\.("+R+")"),TAG:RegExp("^("+R.replace("w","w*")+")"),ATTR:RegExp("^"+$),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+P+"*(even|odd|(([+-]|)(\\d*)n|)"+P+"*(?:([+-]|)"+P+"*(\\d+)|))"+P+"*\\)|)","i"),bool:RegExp("^(?:"+B+")$","i"),needsContext:RegExp("^"+P+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+P+"*((?:-\\d)?\\d*)"+P+"*\\)|)(?=[^-]|$)","i")},K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,et=/^(?:input|select|textarea|button)$/i,tt=/^h\d$/i,nt=/'|\\/g,rt=RegExp("\\\\([\\da-f]{1,6}"+P+"?|("+P+")|.)","ig"),it=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{M.apply(H=O.call(w.childNodes),w.childNodes),H[w.childNodes.length].nodeType}catch(ot){M={apply:H.length?function(e,t){_.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function at(e,t,n,i){var o,a,s,l,u,c,d,m,y,x;if((t?t.ownerDocument||t:w)!==f&&p(t),t=t||f,n=n||[],!e||"string"!=typeof e)return n;if(1!==(l=t.nodeType)&&9!==l)return[];if(h&&!i){if(o=Z.exec(e))if(s=o[1]){if(9===l){if(a=t.getElementById(s),!a||!a.parentNode)return n;if(a.id===s)return n.push(a),n}else if(t.ownerDocument&&(a=t.ownerDocument.getElementById(s))&&v(t,a)&&a.id===s)return n.push(a),n}else{if(o[2])return M.apply(n,t.getElementsByTagName(e)),n;if((s=o[3])&&r.getElementsByClassName&&t.getElementsByClassName)return M.apply(n,t.getElementsByClassName(s)),n}if(r.qsa&&(!g||!g.test(e))){if(m=d=b,y=t,x=9===l&&e,1===l&&"object"!==t.nodeName.toLowerCase()){c=bt(e),(d=t.getAttribute("id"))?m=d.replace(nt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",u=c.length;while(u--)c[u]=m+xt(c[u]);y=V.test(e)&&t.parentNode||t,x=c.join(",")}if(x)try{return M.apply(n,y.querySelectorAll(x)),n}catch(T){}finally{d||t.removeAttribute("id")}}}return At(e.replace(z,"$1"),t,n,i)}function st(e){return K.test(e+"")}function lt(){var e=[];function t(n,r){return e.push(n+=" ")>o.cacheLength&&delete t[e.shift()],t[n]=r}return t}function ut(e){return e[b]=!0,e}function ct(e){var t=f.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function pt(e,t,n){e=e.split("|");var r,i=e.length,a=n?null:t;while(i--)(r=o.attrHandle[e[i]])&&r!==t||(o.attrHandle[e[i]]=a)}function ft(e,t){var n=e.getAttributeNode(t);return n&&n.specified?n.value:e[t]===!0?t.toLowerCase():null}function dt(e,t){return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}function ht(e){return"input"===e.nodeName.toLowerCase()?e.defaultValue:t}function gt(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function mt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function yt(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function vt(e){return ut(function(t){return t=+t,ut(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}s=at.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},r=at.support={},p=at.setDocument=function(e){var n=e?e.ownerDocument||e:w;return n!==f&&9===n.nodeType&&n.documentElement?(f=n,d=n.documentElement,h=!s(n),r.attributes=ct(function(e){return e.innerHTML="<a href='#'></a>",pt("type|href|height|width",dt,"#"===e.firstChild.getAttribute("href")),pt(B,ft,null==e.getAttribute("disabled")),e.className="i",!e.getAttribute("className")}),r.input=ct(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")}),pt("value",ht,r.attributes&&r.input),r.getElementsByTagName=ct(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),r.getElementsByClassName=ct(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),r.getById=ct(function(e){return d.appendChild(e).id=b,!n.getElementsByName||!n.getElementsByName(b).length}),r.getById?(o.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},o.filter.ID=function(e){var t=e.replace(rt,it);return function(e){return e.getAttribute("id")===t}}):(delete o.find.ID,o.filter.ID=function(e){var t=e.replace(rt,it);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),o.find.TAG=r.getElementsByTagName?function(e,n){return typeof n.getElementsByTagName!==j?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},o.find.CLASS=r.getElementsByClassName&&function(e,n){return typeof n.getElementsByClassName!==j&&h?n.getElementsByClassName(e):t},m=[],g=[],(r.qsa=st(n.querySelectorAll))&&(ct(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||g.push("\\["+P+"*(?:value|"+B+")"),e.querySelectorAll(":checked").length||g.push(":checked")}),ct(function(e){var t=n.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&g.push("[*^$]="+P+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||g.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),g.push(",.*:")})),(r.matchesSelector=st(y=d.webkitMatchesSelector||d.mozMatchesSelector||d.oMatchesSelector||d.msMatchesSelector))&&ct(function(e){r.disconnectedMatch=y.call(e,"div"),y.call(e,"[s!='']:x"),m.push("!=",I)}),g=g.length&&RegExp(g.join("|")),m=m.length&&RegExp(m.join("|")),v=st(d.contains)||d.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},r.sortDetached=ct(function(e){return 1&e.compareDocumentPosition(n.createElement("div"))}),A=d.compareDocumentPosition?function(e,t){if(e===t)return S=!0,0;var i=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t);return i?1&i||!r.sortDetached&&t.compareDocumentPosition(e)===i?e===n||v(w,e)?-1:t===n||v(w,t)?1:c?F.call(c,e)-F.call(c,t):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return S=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:c?F.call(c,e)-F.call(c,t):0;if(o===a)return gt(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?gt(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},n):f},at.matches=function(e,t){return at(e,null,null,t)},at.matchesSelector=function(e,t){if((e.ownerDocument||e)!==f&&p(e),t=t.replace(Y,"='$1']"),!(!r.matchesSelector||!h||m&&m.test(t)||g&&g.test(t)))try{var n=y.call(e,t);if(n||r.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(i){}return at(t,f,null,[e]).length>0},at.contains=function(e,t){return(e.ownerDocument||e)!==f&&p(e),v(e,t)},at.attr=function(e,n){(e.ownerDocument||e)!==f&&p(e);var i=o.attrHandle[n.toLowerCase()],a=i&&L.call(o.attrHandle,n.toLowerCase())?i(e,n,!h):t;return a===t?r.attributes||!h?e.getAttribute(n):(a=e.getAttributeNode(n))&&a.specified?a.value:null:a},at.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},at.uniqueSort=function(e){var t,n=[],i=0,o=0;if(S=!r.detectDuplicates,c=!r.sortStable&&e.slice(0),e.sort(A),S){while(t=e[o++])t===e[o]&&(i=n.push(o));while(i--)e.splice(n[i],1)}return e},a=at.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=a(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=a(t);return n},o=at.selectors={cacheLength:50,createPseudo:ut,match:Q,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(rt,it),e[3]=(e[4]||e[5]||"").replace(rt,it),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||at.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&at.error(e[0]),e},PSEUDO:function(e){var n,r=!e[5]&&e[2];return Q.CHILD.test(e[0])?null:(e[3]&&e[4]!==t?e[2]=e[4]:r&&J.test(r)&&(n=bt(r,!0))&&(n=r.indexOf(")",r.length-n)-r.length)&&(e[0]=e[0].slice(0,n),e[2]=r.slice(0,n)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(rt,it).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=N[e+" "];return t||(t=RegExp("(^|"+P+")"+e+"("+P+"|$)"))&&N(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=at.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,l){var u,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!l&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[b]||(m[b]={}),u=c[e]||[],d=u[0]===T&&u[1],f=u[0]===T&&u[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[T,d,f];break}}else if(v&&(u=(t[b]||(t[b]={}))[e])&&u[0]===T)f=u[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[b]||(p[b]={}))[e]=[T,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=o.pseudos[e]||o.setFilters[e.toLowerCase()]||at.error("unsupported pseudo: "+e);return r[b]?r(t):r.length>1?(n=[e,e,"",t],o.setFilters.hasOwnProperty(e.toLowerCase())?ut(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=F.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:ut(function(e){var t=[],n=[],r=l(e.replace(z,"$1"));return r[b]?ut(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:ut(function(e){return function(t){return at(e,t).length>0}}),contains:ut(function(e){return function(t){return(t.textContent||t.innerText||a(t)).indexOf(e)>-1}}),lang:ut(function(e){return G.test(e||"")||at.error("unsupported lang: "+e),e=e.replace(rt,it).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===d},focus:function(e){return e===f.activeElement&&(!f.hasFocus||f.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!o.pseudos.empty(e)},header:function(e){return tt.test(e.nodeName)},input:function(e){return et.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:vt(function(){return[0]}),last:vt(function(e,t){return[t-1]}),eq:vt(function(e,t,n){return[0>n?n+t:n]}),even:vt(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:vt(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:vt(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:vt(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}};for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})o.pseudos[n]=mt(n);for(n in{submit:!0,reset:!0})o.pseudos[n]=yt(n);function bt(e,t){var n,r,i,a,s,l,u,c=k[e+" "];if(c)return t?0:c.slice(0);s=e,l=[],u=o.preFilter;while(s){(!n||(r=X.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),l.push(i=[])),n=!1,(r=U.exec(s))&&(n=r.shift(),i.push({value:n,type:r[0].replace(z," ")}),s=s.slice(n.length));for(a in o.filter)!(r=Q[a].exec(s))||u[a]&&!(r=u[a](r))||(n=r.shift(),i.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?at.error(e):k(e,l).slice(0)}function xt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function wt(e,t,n){var r=t.dir,o=n&&"parentNode"===r,a=C++;return t.first?function(t,n,i){while(t=t[r])if(1===t.nodeType||o)return e(t,n,i)}:function(t,n,s){var l,u,c,p=T+" "+a;if(s){while(t=t[r])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[r])if(1===t.nodeType||o)if(c=t[b]||(t[b]={}),(u=c[r])&&u[0]===p){if((l=u[1])===!0||l===i)return l===!0}else if(u=c[r]=[p],u[1]=e(t,n,s)||i,u[1]===!0)return!0}}function Tt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function Ct(e,t,n,r,i){var o,a=[],s=0,l=e.length,u=null!=t;for(;l>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),u&&t.push(s));return a}function Nt(e,t,n,r,i,o){return r&&!r[b]&&(r=Nt(r)),i&&!i[b]&&(i=Nt(i,o)),ut(function(o,a,s,l){var u,c,p,f=[],d=[],h=a.length,g=o||St(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:Ct(g,f,e,s,l),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,l),r){u=Ct(y,d),r(u,[],s,l),c=u.length;while(c--)(p=u[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){u=[],c=y.length;while(c--)(p=y[c])&&u.push(m[c]=p);i(null,y=[],u,l)}c=y.length;while(c--)(p=y[c])&&(u=i?F.call(o,p):f[c])>-1&&(o[u]=!(a[u]=p))}}else y=Ct(y===a?y.splice(h,y.length):y),i?i(null,a,y,l):M.apply(a,y)})}function kt(e){var t,n,r,i=e.length,a=o.relative[e[0].type],s=a||o.relative[" "],l=a?1:0,c=wt(function(e){return e===t},s,!0),p=wt(function(e){return F.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;i>l;l++)if(n=o.relative[e[l].type])f=[wt(Tt(f),n)];else{if(n=o.filter[e[l].type].apply(null,e[l].matches),n[b]){for(r=++l;i>r;r++)if(o.relative[e[r].type])break;return Nt(l>1&&Tt(f),l>1&&xt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&kt(e.slice(l,r)),i>r&&kt(e=e.slice(r)),i>r&&xt(e))}f.push(n)}return Tt(f)}function Et(e,t){var n=0,r=t.length>0,a=e.length>0,s=function(s,l,c,p,d){var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,C=u,N=s||a&&o.find.TAG("*",d&&l.parentNode||l),k=T+=null==C?1:Math.random()||.1;for(w&&(u=l!==f&&l,i=n);null!=(h=N[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,l,c)){p.push(h);break}w&&(T=k,i=++n)}r&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,r&&b!==v){g=0;while(m=t[g++])m(x,y,l,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=q.call(p));y=Ct(y)}M.apply(p,y),w&&!s&&y.length>0&&v+t.length>1&&at.uniqueSort(p)}return w&&(T=k,u=C),x};return r?ut(s):s}l=at.compile=function(e,t){var n,r=[],i=[],o=E[e+" "];if(!o){t||(t=bt(e)),n=t.length;while(n--)o=kt(t[n]),o[b]?r.push(o):i.push(o);o=E(e,Et(i,r))}return o};function St(e,t,n){var r=0,i=t.length;for(;i>r;r++)at(e,t[r],n);return n}function At(e,t,n,i){var a,s,u,c,p,f=bt(e);if(!i&&1===f.length){if(s=f[0]=f[0].slice(0),s.length>2&&"ID"===(u=s[0]).type&&r.getById&&9===t.nodeType&&h&&o.relative[s[1].type]){if(t=(o.find.ID(u.matches[0].replace(rt,it),t)||[])[0],!t)return n;e=e.slice(s.shift().value.length)}a=Q.needsContext.test(e)?0:s.length;while(a--){if(u=s[a],o.relative[c=u.type])break;if((p=o.find[c])&&(i=p(u.matches[0].replace(rt,it),V.test(s[0].type)&&t.parentNode||t))){if(s.splice(a,1),e=i.length&&xt(s),!e)return M.apply(n,i),n;break}}}return l(e,f)(i,t,!h,n,V.test(e)),n}o.pseudos.nth=o.pseudos.eq;function jt(){}jt.prototype=o.filters=o.pseudos,o.setFilters=new jt,r.sortStable=b.split("").sort(A).join("")===b,p(),[0,0].sort(A),r.detectDuplicates=S,x.find=at,x.expr=at.selectors,x.expr[":"]=x.expr.pseudos,x.unique=at.uniqueSort,x.text=at.getText,x.isXMLDoc=at.isXML,x.contains=at.contains}(e);var O={};function F(e){var t=O[e]={};return x.each(e.match(T)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?O[e]||F(e):x.extend({},e);var n,r,i,o,a,s,l=[],u=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=l.length,n=!0;l&&o>a;a++)if(l[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,l&&(u?u.length&&c(u.shift()):r?l=[]:p.disable())},p={add:function(){if(l){var t=l.length;(function i(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&p.has(n)||l.push(n):n&&n.length&&"string"!==r&&i(n)})})(arguments),n?o=l.length:r&&(s=t,c(r))}return this},remove:function(){return l&&x.each(arguments,function(e,t){var r;while((r=x.inArray(t,l,r))>-1)l.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?x.inArray(e,l)>-1:!(!l||!l.length)},empty:function(){return l=[],o=0,this},disable:function(){return l=u=r=t,this},disabled:function(){return!l},lock:function(){return u=t,r||p.disable(),this},locked:function(){return!u},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!l||i&&!u||(n?u.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var a=o[0],s=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=g.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?g.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,l,u;if(r>1)for(s=Array(r),l=Array(r),u=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(a(t,u,n)).fail(o.reject).progress(a(t,l,s)):--i;return i||o.resolveWith(u,n),o.promise()}}),x.support=function(t){var n,r,o,s,l,u,c,p,f,d=a.createElement("div");if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*")||[],r=d.getElementsByTagName("a")[0],!r||!r.style||!n.length)return t;s=a.createElement("select"),u=s.appendChild(a.createElement("option")),o=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t.getSetAttribute="t"!==d.className,t.leadingWhitespace=3===d.firstChild.nodeType,t.tbody=!d.getElementsByTagName("tbody").length,t.htmlSerialize=!!d.getElementsByTagName("link").length,t.style=/top/.test(r.getAttribute("style")),t.hrefNormalized="/a"===r.getAttribute("href"),t.opacity=/^0.5/.test(r.style.opacity),t.cssFloat=!!r.style.cssFloat,t.checkOn=!!o.value,t.optSelected=u.selected,t.enctype=!!a.createElement("form").enctype,t.html5Clone="<:nav></:nav>"!==a.createElement("nav").cloneNode(!0).outerHTML,t.inlineBlockNeedsLayout=!1,t.shrinkWrapBlocks=!1,t.pixelPosition=!1,t.deleteExpando=!0,t.noCloneEvent=!0,t.reliableMarginRight=!0,t.boxSizingReliable=!0,o.checked=!0,t.noCloneChecked=o.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!u.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}o=a.createElement("input"),o.setAttribute("value",""),t.input=""===o.getAttribute("value"),o.value="t",o.setAttribute("type","radio"),t.radioValue="t"===o.value,o.setAttribute("checked","t"),o.setAttribute("name","t"),l=a.createDocumentFragment(),l.appendChild(o),t.appendChecked=o.checked,t.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip;for(f in x(t))break;return t.ownLast="0"!==f,x(function(){var n,r,o,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",l=a.getElementsByTagName("body")[0];l&&(n=a.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",l.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",o=d.getElementsByTagName("td"),o[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===o[0].offsetHeight,o[0].style.display="",o[1].style.display="none",t.reliableHiddenOffsets=p&&0===o[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",x.swap(l,null!=l.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===d.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(a.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(l.style.zoom=1)),l.removeChild(n),n=d=o=r=null)}),n=s=l=u=r=o=null,t}({});var B=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;function R(e,n,r,i){if(x.acceptData(e)){var o,a,s=x.expando,l=e.nodeType,u=l?x.cache:e,c=l?e[s]:e[s]&&s;
if(c&&u[c]&&(i||u[c].data)||r!==t||"string"!=typeof n)return c||(c=l?e[s]=p.pop()||x.guid++:s),u[c]||(u[c]=l?{}:{toJSON:x.noop}),("object"==typeof n||"function"==typeof n)&&(i?u[c]=x.extend(u[c],n):u[c].data=x.extend(u[c].data,n)),a=u[c],i||(a.data||(a.data={}),a=a.data),r!==t&&(a[x.camelCase(n)]=r),"string"==typeof n?(o=a[n],null==o&&(o=a[x.camelCase(n)])):o=a,o}}function W(e,t,n){if(x.acceptData(e)){var r,i,o=e.nodeType,a=o?x.cache:e,s=o?e[x.expando]:x.expando;if(a[s]){if(t&&(r=n?a[s]:a[s].data)){x.isArray(t)?t=t.concat(x.map(t,x.camelCase)):t in r?t=[t]:(t=x.camelCase(t),t=t in r?[t]:t.split(" ")),i=t.length;while(i--)delete r[t[i]];if(n?!I(r):!x.isEmptyObject(r))return}(n||(delete a[s].data,I(a[s])))&&(o?x.cleanData([e],!0):x.support.deleteExpando||a!=a.window?delete a[s]:a[s]=null)}}}x.extend({cache:{},noData:{applet:!0,embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(e){return e=e.nodeType?x.cache[e[x.expando]]:e[x.expando],!!e&&!I(e)},data:function(e,t,n){return R(e,t,n)},removeData:function(e,t){return W(e,t)},_data:function(e,t,n){return R(e,t,n,!0)},_removeData:function(e,t){return W(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&x.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),x.fn.extend({data:function(e,n){var r,i,o=null,a=0,s=this[0];if(e===t){if(this.length&&(o=x.data(s),1===s.nodeType&&!x._data(s,"parsedAttrs"))){for(r=s.attributes;r.length>a;a++)i=r[a].name,0===i.indexOf("data-")&&(i=x.camelCase(i.slice(5)),$(s,i,o[i]));x._data(s,"parsedAttrs",!0)}return o}return"object"==typeof e?this.each(function(){x.data(this,e)}):arguments.length>1?this.each(function(){x.data(this,e,n)}):s?$(s,e,x.data(s,e)):null},removeData:function(e){return this.each(function(){x.removeData(this,e)})}});function $(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(P,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:B.test(r)?x.parseJSON(r):r}catch(o){}x.data(e,n,r)}else r=t}return r}function I(e){var t;for(t in e)if(("data"!==t||!x.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}x.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=x._data(e,n),r&&(!i||x.isArray(r)?i=x._data(e,n,x.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),a=function(){x.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),o.cur=i,i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return x._data(e,n)||x._data(e,n,{empty:x.Callbacks("once memory").add(function(){x._removeData(e,t+"queue"),x._removeData(e,n)})})}}),x.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?x.queue(this[0],e):n===t?this:this.each(function(){var t=x.queue(this,e,n);x._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=x.Deferred(),a=this,s=this.length,l=function(){--i||o.resolveWith(a,[a])};"string"!=typeof e&&(n=e,e=t),e=e||"fx";while(s--)r=x._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(l));return l(),o.promise(n)}});var z,X,U=/[\t\r\n\f]/g,V=/\r/g,Y=/^(?:input|select|textarea|button|object)$/i,J=/^(?:a|area)$/i,G=/^(?:checked|selected)$/i,Q=x.support.getSetAttribute,K=x.support.input;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return e=x.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,l="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(l)for(t=(e||"").match(T)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(U," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,l=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(l)for(t=(e||"").match(T)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(U," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,r="boolean"==typeof t;return x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var o,a=0,s=x(this),l=t,u=e.match(T)||[];while(o=u[a++])l=r?l:!s.hasClass(o),s[l?"addClass":"removeClass"](o)}else(n===i||"boolean"===n)&&(this.className&&x._data(this,"__className__",this.className),this.className=this.className||e===!1?"":x._data(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(U," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=x.isFunction(e),this.each(function(n){var o;1===this.nodeType&&(o=i?e.call(this,n,x(this).val()):e,null==o?o="":"number"==typeof o?o+="":x.isArray(o)&&(o=x.map(o,function(e){return null==e?"":e+""})),r=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=x.valHooks[o.type]||x.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(V,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=x.find.attr(e,"value");return null!=t?t:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,l=0>i?s:o?i:0;for(;s>l;l++)if(n=r[l],!(!n.selected&&l!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),a=i.length;while(a--)r=i[a],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,n,r){var o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===i?x.prop(e,n,r):(1===s&&x.isXMLDoc(e)||(n=n.toLowerCase(),o=x.attrHooks[n]||(x.expr.match.bool.test(n)?X:z)),r===t?o&&"get"in o&&null!==(a=o.get(e,n))?a:(a=x.find.attr(e,n),null==a?t:a):null!==r?o&&"set"in o&&(a=o.set(e,r,n))!==t?a:(e.setAttribute(n,r+""),r):(x.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(T);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)?K&&Q||!G.test(n)?e[r]=!1:e[x.camelCase("default-"+n)]=e[r]=!1:x.attr(e,n,""),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!x.isXMLDoc(e),a&&(n=x.propFix[n]||n,o=x.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var t=x.find.attr(e,"tabindex");return t?parseInt(t,10):Y.test(e.nodeName)||J.test(e.nodeName)&&e.href?0:-1}}}}),X={set:function(e,t,n){return t===!1?x.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&x.propFix[n]||n,n):e[x.camelCase("default-"+n)]=e[n]=!0,n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,n){var r=x.expr.attrHandle[n]||x.find.attr;x.expr.attrHandle[n]=K&&Q||!G.test(n)?function(e,n,i){var o=x.expr.attrHandle[n],a=i?t:(x.expr.attrHandle[n]=t)!=r(e,n,i)?n.toLowerCase():null;return x.expr.attrHandle[n]=o,a}:function(e,n,r){return r?t:e[x.camelCase("default-"+n)]?n.toLowerCase():null}}),K&&Q||(x.attrHooks.value={set:function(e,n,r){return x.nodeName(e,"input")?(e.defaultValue=n,t):z&&z.set(e,n,r)}}),Q||(z={set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},x.expr.attrHandle.id=x.expr.attrHandle.name=x.expr.attrHandle.coords=function(e,n,r){var i;return r?t:(i=e.getAttributeNode(n))&&""!==i.value?i.value:null},x.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&r.specified?r.value:t},set:z.set},x.attrHooks.contenteditable={set:function(e,t,n){z.set(e,""===t?!1:t,n)}},x.each(["width","height"],function(e,n){x.attrHooks[n]={set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}}})),x.support.hrefNormalized||x.each(["href","src"],function(e,t){x.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}}),x.support.style||(x.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.support.enctype||(x.propFix.enctype="encoding"),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,n){return x.isArray(n)?e.checked=x.inArray(x(e).val(),n)>=0:t}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;function it(){return!0}function ot(){return!1}function at(){try{return a.activeElement}catch(e){}}x.event={global:{},add:function(e,n,r,o,a){var s,l,u,c,p,f,d,h,g,m,y,v=x._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=x.guid++),(l=v.events)||(l=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof x===i||e&&x.event.triggered===e.type?t:x.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(T)||[""],u=n.length;while(u--)s=rt.exec(n[u])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),g&&(p=x.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=x.event.special[g]||{},d=x.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&x.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=l[g])||(h=l[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),x.event.global[g]=!0);e=null}},remove:function(e,t,n,r,i){var o,a,s,l,u,c,p,f,d,h,g,m=x.hasData(e)&&x._data(e);if(m&&(c=m.events)){t=(t||"").match(T)||[""],u=t.length;while(u--)if(s=rt.exec(t[u])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){p=x.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),l=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));l&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||x.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)x.event.remove(e,d+t[u],n,r,!0);x.isEmptyObject(c)&&(delete m.handle,x._removeData(e,"events"))}},trigger:function(n,r,i,o){var s,l,u,c,p,f,d,h=[i||a],g=v.call(n,"type")?n.type:n,m=v.call(n,"namespace")?n.namespace.split("."):[];if(u=f=i=i||a,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+x.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),l=0>g.indexOf(":")&&"on"+g,n=n[x.expando]?n:new x.Event(g,"object"==typeof n&&n),n.isTrigger=o?2:3,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:x.makeArray(r,[n]),p=x.event.special[g]||{},o||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!o&&!p.noBubble&&!x.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(u=u.parentNode);u;u=u.parentNode)h.push(u),f=u;f===(i.ownerDocument||a)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((u=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(x._data(u,"events")||{})[n.type]&&x._data(u,"handle"),s&&s.apply(u,r),s=l&&u[l],s&&x.acceptData(u)&&s.apply&&s.apply(u,r)===!1&&n.preventDefault();if(n.type=g,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(h.pop(),r)===!1)&&x.acceptData(i)&&l&&i[g]&&!x.isWindow(i)){f=i[l],f&&(i[l]=null),x.event.triggered=g;try{i[g]()}catch(y){}x.event.triggered=t,f&&(i[l]=f)}return n.result}},dispatch:function(e){e=x.event.fix(e);var n,r,i,o,a,s=[],l=g.call(arguments),u=(x._data(this,"events")||{})[e.type]||[],c=x.event.special[e.type]||{};if(l[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((x.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,l),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],l=n.delegateCount,u=e.target;if(l&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!=this;u=u.parentNode||this)if(1===u.nodeType&&(u.disabled!==!0||"click"!==e.type)){for(o=[],a=0;l>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?x(r,this).index(u)>=0:x.find(r,this,null,[u]).length),o[r]&&o.push(i);o.length&&s.push({elem:u,handlers:o})}return n.length>l&&s.push({elem:this,handlers:n.slice(l)}),s},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,o=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new x.Event(o),t=r.length;while(t--)n=r[t],e[n]=o[n];return e.target||(e.target=o.srcElement||a),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,o):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,o,s=n.button,l=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||a,o=i.documentElement,r=i.body,e.pageX=n.clientX+(o&&o.scrollLeft||r&&r.scrollLeft||0)-(o&&o.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(o&&o.scrollTop||r&&r.scrollTop||0)-(o&&o.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&l&&(e.relatedTarget=l===e.target?n.toElement:l),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==at()&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===at()&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},click:{trigger:function(){return x.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=a.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},x.Event=function(e,n){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&x.extend(this,n),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,t):new x.Event(e,n)},x.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.submitBubbles||(x.event.special.submit={setup:function(){return x.nodeName(this,"form")?!1:(x.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=x.nodeName(n,"input")||x.nodeName(n,"button")?n.form:t;r&&!x._data(r,"submitBubbles")&&(x.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),x._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&x.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return x.nodeName(this,"form")?!1:(x.event.remove(this,"._submit"),t)}}),x.support.changeBubbles||(x.event.special.change={setup:function(){return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(x.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),x.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),x.event.simulate("change",this,e,!0)})),!1):(x.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!x._data(t,"changeBubbles")&&(x.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||x.event.simulate("change",this.parentNode,e,!0)}),x._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return x.event.remove(this,"._change"),!Z.test(this.nodeName)}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&a.addEventListener(e,r,!0)},teardown:function(){0===--n&&a.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return x().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=x.guid++)),this.each(function(){x.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,x(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){x.event.remove(this,e,r,n)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?x.event.trigger(e,n,r,!0):t}});var st=/^.[^:#\[\.,]*$/,lt=/^(?:parents|prev(?:Until|All))/,ut=x.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t,n=x(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(x.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e||[],!0))},filter:function(e){return this.pushStack(ft(this,e||[],!1))},is:function(e){return!!ft(this,"string"==typeof e&&ut.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],a=ut.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(a?a.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?x.inArray(this[0],x(e)):x.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return pt(e,"nextSibling")},prev:function(e){return pt(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return x.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(ct[e]||(i=x.unique(i)),lt.test(e)&&(i=i.reverse())),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!x(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(st.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return x.inArray(e,t)>=0!==n})}function dt(e){var t=ht.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Ct=/^(?:checkbox|radio)$/i,Nt=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:x.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(a),Dt=jt.appendChild(a.createElement("div"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===t?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||a).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Lt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Lt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(Ft(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&_t(Ft(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&x.cleanData(Ft(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&x.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,""):t;if(!("string"!=typeof e||Tt.test(e)||!x.support.htmlSerialize&&mt.test(e)||!x.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(vt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(x.cleanData(Ft(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=d.apply([],e);var r,i,o,a,s,l,u=0,c=this.length,p=this,f=c-1,h=e[0],g=x.isFunction(h);if(g||!(1>=c||"string"!=typeof h||x.support.checkClone)&&Nt.test(h))return this.each(function(r){var i=p.eq(r);g&&(e[0]=h.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(l=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),r=l.firstChild,1===l.childNodes.length&&(l=r),r)){for(a=x.map(Ft(l,"script"),Ht),o=a.length;c>u;u++)i=l,u!==f&&(i=x.clone(i,!0,!0),o&&x.merge(a,Ft(i,"script"))),t.call(this[u],i,u);if(o)for(s=a[a.length-1].ownerDocument,x.map(a,qt),u=0;o>u;u++)i=a[u],kt.test(i.type||"")&&!x._data(i,"globalEval")&&x.contains(s,i)&&(i.src?x._evalUrl(i.src):x.globalEval((i.text||i.textContent||i.innerHTML||"").replace(St,"")));l=r=null}return this}});function Lt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function Ht(e){return e.type=(null!==x.find.attr(e,"type"))+"/"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function _t(e,t){var n,r=0;for(;null!=(n=e[r]);r++)x._data(n,"globalEval",!t||x._data(t[r],"globalEval"))}function Mt(e,t){if(1===t.nodeType&&x.hasData(e)){var n,r,i,o=x._data(e),a=x._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)x.event.add(t,n,s[n][r])}a.data&&(a.data=x.extend({},a.data))}}function Ot(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!x.support.noCloneEvent&&t[x.expando]){i=x._data(t);for(r in i.events)x.removeEvent(t,r,i.handle);t.removeAttribute(x.expando)}"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),x.support.html5Clone&&e.innerHTML&&!x.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Ct.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=0,i=[],o=x(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),x(o[r])[t](n),h.apply(i,n.get());return this.pushStack(i)}});function Ft(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||x.nodeName(o,n)?s.push(o):x.merge(s,Ft(o,n));return n===t||n&&x.nodeName(e,n)?x.merge([e],s):s}function Bt(e){Ct.test(e.type)&&(e.defaultChecked=e.checked)}x.extend({clone:function(e,t,n){var r,i,o,a,s,l=x.contains(e.ownerDocument,e);if(x.support.html5Clone||x.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(x.support.noCloneEvent&&x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(r=Ft(o),s=Ft(e),a=0;null!=(i=s[a]);++a)r[a]&&Ot(i,r[a]);if(t)if(n)for(s=s||Ft(e),r=r||Ft(o),a=0;null!=(i=s[a]);a++)Mt(i,r[a]);else Mt(e,o);return r=Ft(o,"script"),r.length>0&&_t(r,!l&&Ft(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,l,u,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if("object"===x.type(o))x.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement("div")),l=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[l]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];while(i--)s=s.lastChild;if(!x.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!x.support.tbody){o="table"!==l||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)x.nodeName(u=o.childNodes[i],"tbody")&&!u.childNodes.length&&o.removeChild(u)}x.merge(d,s.childNodes),s.textContent="";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),x.support.appendChecked||x.grep(Ft(d,"input"),Bt),h=0;while(o=d[h++])if((!r||-1===x.inArray(o,r))&&(a=x.contains(o.ownerDocument,o),s=Ft(f.appendChild(o),"script"),a&&_t(s),n)){i=0;while(o=s[i++])kt.test(o.type||"")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,l=x.expando,u=x.cache,c=x.support.deleteExpando,f=x.event.special;for(;null!=(n=e[s]);s++)if((t||x.acceptData(n))&&(o=n[l],a=o&&u[o])){if(a.events)for(r in a.events)f[r]?x.event.remove(n,r):x.removeEvent(n,r,a.handle);u[o]&&(delete u[o],c?delete n[l]:typeof n.removeAttribute!==i?n.removeAttribute(l):n[l]=null,p.push(o))}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})
}}),x.fn.extend({wrapAll:function(e){if(x.isFunction(e))return this.each(function(t){x(this).wrapAll(e.call(this,t))});if(this[0]){var t=x(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+w+")(.*)$","i"),Yt=RegExp("^("+w+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+w+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=x._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=x._data(r,"olddisplay",ln(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&x._data(r,"olddisplay",i?n:x.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}x.fn.extend({css:function(e,n){return x.access(this,function(e,n,r){var i,o,a={},s=0;if(x.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=x.css(e,n[s],!1,o);return a}return r!==t?x.style(e,n,r):x.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:nn(this))?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":x.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,l=x.camelCase(n),u=e.style;if(n=x.cssProps[l]||(x.cssProps[l]=tn(u,l)),s=x.cssHooks[n]||x.cssHooks[l],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:u[n];if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(x.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||x.cssNumber[l]||(r+="px"),x.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(u[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{u[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,l=x.camelCase(n);return n=x.cssProps[l]||(x.cssProps[l]=tn(e.style,l)),s=x.cssHooks[n]||x.cssHooks[l],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||x.isNumeric(o)?o||0:a):a}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),l=s?s.getPropertyValue(n)||s[n]:t,u=e.style;return s&&(""!==l||x.contains(e.ownerDocument,e)||(l=x.style(e,n)),Yt.test(l)&&Ut.test(n)&&(i=u.width,o=u.minWidth,a=u.maxWidth,u.minWidth=u.maxWidth=u.width=l,l=s.width,u.width=i,u.minWidth=o,u.maxWidth=a)),l}):a.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),l=s?s[n]:t,u=e.style;return null==l&&u&&u[n]&&(l=u[n]),Yt.test(l)&&!zt.test(n)&&(i=u.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),u.left="fontSize"===n?"1em":l,l=u.pixelLeft+"px",u.left=i,a&&(o.left=a)),""===l?"auto":l});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function an(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;for(;4>o;o+=2)"margin"===n&&(a+=x.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=x.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=x.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=x.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=x.css(e,"border"+Zt[o]+"Width",!0,i)));return a}function sn(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?"border":"content"),r,o)+"px"}function ln(e){var t=a,n=Gt[e];return n||(n=un(e,t),"none"!==n&&n||(Pt=(Pt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=un(e,t),Pt.detach()),Gt[e]=n),n}function un(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,n){x.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(x.css(e,"display"))?x.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x.support.opacity||(x.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=x.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===x.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i)}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,n){return n?x.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,n){x.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?x(e).position()[n]+"px":r):t}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!x.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||x.css(e,"display"))},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(x.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Ct.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(fn,"\r\n")}}):{name:t.name,value:n.replace(fn,"\r\n")}}).get()}}),x.param=function(e,n){var r,i=[],o=function(e,t){t=x.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join("&").replace(cn,"+")};function gn(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)gn(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var mn,yn,vn=x.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Cn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Nn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=x.fn.load,An={},jn={},Dn="*/".concat("*");try{yn=o.href}catch(Ln){yn=a.createElement("a"),yn.href="",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(T)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(l){var u;return o[l]=!0,x.each(e[l]||[],function(e,l){var c=l(n,r,i);return"string"!=typeof c||a||o[c]?a?!(u=c):t:(n.dataTypes.unshift(c),s(c),!1)}),u}return s(n.dataTypes[0])||!o["*"]&&s("*")}function _n(e,n){var r,i,o=x.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,n,r){if("string"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,l=e.indexOf(" ");return l>=0&&(i=e.slice(l,e.length),e=e.slice(0,l)),x.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&x.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?x("<div>").append(x.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Cn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?_n(_n(e,x.ajaxSettings),t):_n(x.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){"object"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,l,u,c,p=x.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?x(f):x.event,h=x.Deferred(),g=x.Callbacks("once memory"),m=p.statusCode||{},y={},v={},b=0,w="canceled",C={readyState:0,getResponseHeader:function(e){var t;if(2===b){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===b?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return b||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return b||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>b)for(t in e)m[t]=[m[t],e[t]];else C.always(e[C.status]);return this},abort:function(e){var t=e||w;return u&&u.abort(t),k(0,t),this}};if(h.promise(C).complete=g.add,C.success=C.done,C.error=C.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=x.trim(p.dataType||"*").toLowerCase().match(T)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?"80":"443"))===(mn[3]||("http:"===mn[1]?"80":"443")))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=x.param(p.data,p.traditional)),qn(An,p,n,C),2===b)return C;l=p.global,l&&0===x.active++&&x.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Nn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(x.lastModified[o]&&C.setRequestHeader("If-Modified-Since",x.lastModified[o]),x.etag[o]&&C.setRequestHeader("If-None-Match",x.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&C.setRequestHeader("Content-Type",p.contentType),C.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);for(i in p.headers)C.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,C,p)===!1||2===b))return C.abort();w="abort";for(i in{success:1,error:1,complete:1})C[i](p[i]);if(u=qn(jn,p,n,C)){C.readyState=1,l&&d.trigger("ajaxSend",[C,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){C.abort("timeout")},p.timeout));try{b=1,u.send(y,k)}catch(N){if(!(2>b))throw N;k(-1,N)}}else k(-1,"No Transport");function k(e,n,r,i){var c,y,v,w,T,N=n;2!==b&&(b=2,s&&clearTimeout(s),u=t,a=i||"",C.readyState=e>0?4:0,c=e>=200&&300>e||304===e,r&&(w=Mn(p,C,r)),w=On(p,w,C,c),c?(p.ifModified&&(T=C.getResponseHeader("Last-Modified"),T&&(x.lastModified[o]=T),T=C.getResponseHeader("etag"),T&&(x.etag[o]=T)),204===e||"HEAD"===p.type?N="nocontent":304===e?N="notmodified":(N=w.state,y=w.data,v=w.error,c=!v)):(v=N,(e||!N)&&(N="error",0>e&&(e=0))),C.status=e,C.statusText=(n||N)+"",c?h.resolveWith(f,[y,N,C]):h.rejectWith(f,[C,N,v]),C.statusCode(m),m=t,l&&d.trigger(c?"ajaxSuccess":"ajaxError",[C,p,c?y:v]),g.fireWith(f,[C,N]),l&&(d.trigger("ajaxComplete",[C,p]),--x.active||x.event.trigger("ajaxStop")))}return C},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,n){return x.get(e,t,n,"script")}}),x.each(["get","post"],function(e,n){x[n]=function(e,r,i,o){return x.isFunction(r)&&(o=o||i,i=r,r=t),x.ajax({url:e,type:n,dataType:o,data:r,success:i})}});function Mn(e,n,r){var i,o,a,s,l=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in l)if(l[s]&&l[s].test(o)){u.unshift(s);break}if(u[0]in r)a=u[0];else{for(s in r){if(!u[0]||e.converters[s+" "+u[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==u[0]&&u.unshift(a),r[a]):t}function On(e,t,n,r){var i,o,a,s,l,u={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)u[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!l&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),l=o,o=c.shift())if("*"===o)o=l;else if("*"!==l&&l!==o){if(a=u[l+" "+o]||u["* "+o],!a)for(i in u)if(s=i.split(" "),s[1]===o&&(a=u[l+" "+s[0]]||u["* "+s[0]])){a===!0?a=u[i]:u[i]!==!0&&(o=s[0],c.unshift(s[1]));break}if(a!==!0)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(p){return{state:"parsererror",error:a?p:"No conversion from "+l+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),x.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=a.head||x("head")[0]||a.documentElement;return{send:function(t,i){n=a.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var Fn=[],Bn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Fn.pop()||x.expando+"_"+vn++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,l=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");return l||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=x.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,l?n[l]=n[l].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||x.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,Fn.push(o)),s&&x.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}x.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=x.ajaxSettings.xhr(),x.support.cors=!!Rn&&"withCredentials"in Rn,Rn=x.support.ajax=!!Rn,Rn&&x.ajaxTransport(function(n){if(!n.crossDomain||x.support.cors){var r;return{send:function(i,o){var a,s,l=n.xhr();if(n.username?l.open(n.type,n.url,n.async,n.username,n.password):l.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)l[s]=n.xhrFields[s];n.mimeType&&l.overrideMimeType&&l.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)l.setRequestHeader(s,i[s])}catch(u){}l.send(n.hasContent&&n.data||null),r=function(e,i){var s,u,c,p;try{if(r&&(i||4===l.readyState))if(r=t,a&&(l.onreadystatechange=x.noop,$n&&delete Pn[a]),i)4!==l.readyState&&l.abort();else{p={},s=l.status,u=l.getAllResponseHeaders(),"string"==typeof l.responseText&&(p.text=l.responseText);try{c=l.statusText}catch(f){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,u)},n.async?4===l.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},x(e).unload($n)),Pn[a]=r),l.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+w+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Yn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),a=(x.cssNumber[e]||"px"!==o&&+r)&&Yn.exec(x.css(n.elem,e)),s=1,l=20;if(a&&a[3]!==o){o=o||a[3],i=i||[],a=+r||1;do s=s||".5",a/=s,x.style(n.elem,e,a+o);while(s!==(s=n.cur()/r)&&1!==s&&--l)}return i&&(n.unit=o,n.start=+a||+r||0,n.end=i[1]?a+(i[1]+1)*i[2]:+i[2]),n}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=x.now()}function Zn(e,t,n){var r,i=(Qn[t]||[]).concat(Qn["*"]),o=0,a=i.length;for(;a>o;o++)if(r=i[o].call(n,t,e))return r}function er(e,t,n){var r,i,o=0,a=Gn.length,s=x.Deferred().always(function(){delete l.elem}),l=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,u.startTime+u.duration-t),r=n/u.duration||0,o=1-r,a=0,l=u.tweens.length;for(;l>a;a++)u.tweens[a].run(o);return s.notifyWith(e,[u,o,n]),1>o&&l?n:(s.resolveWith(e,[u]),!1)},u=s.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,u.opts,t,n,u.opts.specialEasing[t]||u.opts.easing);return u.tweens.push(r),r},stop:function(t){var n=0,r=t?u.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)u.tweens[n].run(1);return t?s.resolveWith(e,[u,t]):s.rejectWith(e,[u,t]),this}}),c=u.props;for(tr(c,u.opts.specialEasing);a>o;o++)if(r=Gn[o].call(u,e,c,u.opts))return r;return x.map(c,Zn,u),x.isFunction(u.opts.start)&&u.opts.start.call(e,u),x.fx.timer(x.extend(l,{elem:e,anim:u,queue:u.opts.queue})),u.progress(u.opts.progress).done(u.opts.done,u.opts.complete).fail(u.opts.fail).always(u.opts.always)}function tr(e,t){var n,r,i,o,a;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),a=x.cssHooks[r],a&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(er,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,l,u=this,c={},p=e.style,f=e.nodeType&&nn(e),d=x._data(e,"fxshow");n.queue||(s=x._queueHooks(e,"fx"),null==s.unqueued&&(s.unqueued=0,l=s.empty.fire,s.empty.fire=function(){s.unqueued||l()}),s.unqueued++,u.always(function(){u.always(function(){s.unqueued--,x.queue(e,"fx").length||s.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(x.support.inlineBlockNeedsLayout&&"inline"!==ln(e.nodeName)?p.zoom=1:p.display="inline-block")),n.overflow&&(p.overflow="hidden",x.support.shrinkWrapBlocks||u.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],Vn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show"))continue;c[r]=d&&d[r]||x.style(e,r)}if(!x.isEmptyObject(c)){d?"hidden"in d&&(f=d.hidden):d=x._data(e,"fxshow",{}),o&&(d.hidden=!f),f?x(e).show():u.done(function(){x(e).hide()}),u.done(function(){var t;x._removeData(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)a=Zn(f?d[r]:0,r,u),r in d||(d[r]=a.start,f&&(a.end=a.start,a.start="width"===r||"height"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}x.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),a=function(){var t=er(this,x.extend({},e),o);a.finish=function(){t.stop(!0)},(i||x._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=x.timers,a=x._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=x._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,a=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.cur&&i.cur.finish&&i.cur.finish.call(this),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=rr.prototype.init,x.fx.tick=function(){var e,n=x.timers,r=0;for(Xn=x.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||x.fx.stop(),Xn=t},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){Un||(Un=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(Un),Un=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){x.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,x.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},x.offset={setOffset:function(e,t,n){var r=x.css(e,"position");"static"===r&&(e.style.position="relative");var i=x(e),o=i.offset(),a=x.css(e,"top"),s=x.css(e,"left"),l=("absolute"===r||"fixed"===r)&&x.inArray("auto",[a,s])>-1,u={},c={},p,f;l?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),x.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(u.top=t.top-o.top+p),null!=t.left&&(u.left=t.left-o.left+f),"using"in t?t.using.call(e,u):i.css(u)}},x.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===x.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(n=e.offset()),n.top+=x.css(e[0],"borderTopWidth",!0),n.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-x.css(r,"marginTop",!0),left:t.left-n.left-x.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);x.fn[e]=function(i){return x.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?x(a).scrollLeft():o,r?o:x(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return x.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}x.each({Height:"height",Width:"width"},function(e,n){x.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){x.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return x.access(this,function(n,r,i){var o;return x.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?x.css(n,r,s):x.style(n,r,i,s)},n,a?i:t,a,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&"object"==typeof module.exports?module.exports=x:(e.jQuery=e.$=x,"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}))})(window);
/*! jQuery JSON plugin v2.4.0 | github.com/Krinkle/jquery-json */
!function($){"use strict";var escape=/["\\\x00-\x1f\x7f-\x9f]/g,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},hasOwn=Object.prototype.hasOwnProperty;$.toJSON="object"==typeof JSON&&JSON.stringify?JSON.stringify:function(a){if(null===a)return"null";var b,c,d,e,f=$.type(a);if("undefined"===f)return void 0;if("number"===f||"boolean"===f)return String(a);if("string"===f)return $.quoteString(a);if("function"==typeof a.toJSON)return $.toJSON(a.toJSON());if("date"===f){var g=a.getUTCMonth()+1,h=a.getUTCDate(),i=a.getUTCFullYear(),j=a.getUTCHours(),k=a.getUTCMinutes(),l=a.getUTCSeconds(),m=a.getUTCMilliseconds();return 10>g&&(g="0"+g),10>h&&(h="0"+h),10>j&&(j="0"+j),10>k&&(k="0"+k),10>l&&(l="0"+l),100>m&&(m="0"+m),10>m&&(m="0"+m),'"'+i+"-"+g+"-"+h+"T"+j+":"+k+":"+l+"."+m+'Z"'}if(b=[],$.isArray(a)){for(c=0;c<a.length;c++)b.push($.toJSON(a[c])||"null");return"["+b.join(",")+"]"}if("object"==typeof a){for(c in a)if(hasOwn.call(a,c)){if(f=typeof c,"number"===f)d='"'+c+'"';else{if("string"!==f)continue;d=$.quoteString(c)}f=typeof a[c],"function"!==f&&"undefined"!==f&&(e=$.toJSON(a[c]),b.push(d+":"+e))}return"{"+b.join(",")+"}"}},$.evalJSON="object"==typeof JSON&&JSON.parse?JSON.parse:function(str){return eval("("+str+")")},$.secureEvalJSON="object"==typeof JSON&&JSON.parse?JSON.parse:function(str){var filtered=str.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"");if(/^[\],:{}\s]*$/.test(filtered))return eval("("+str+")");throw new SyntaxError("Error parsing JSON, source is not valid.")},$.quoteString=function(a){return a.match(escape)?'"'+a.replace(escape,function(a){var b=meta[a];return"string"==typeof b?b:(b=a.charCodeAt(),"\\u00"+Math.floor(b/16).toString(16)+(b%16).toString(16))})+'"':'"'+a+'"'}}(jQuery);var __extends=this.__extends||function(c,d){function n(){this.constructor=c}for(var e in d)d.hasOwnProperty(e)&&(c[e]=d[e]);n.prototype=d.prototype;c.prototype=new n};
function JL(c){if(!c)return JL.__;Array.prototype.reduce||(Array.prototype.reduce=function(c,d){for(var l=d,h=0;h<this.length;h++)l=c(l,this[h],h,this);return l});var d="";return("."+c).split(".").reduce(function(c,e,l,h){d=d?d+("."+e):e;e=c["__"+d];void 0===e&&(JL.Logger.prototype=c,e=new JL.Logger(d),c["__"+d]=e);return e},JL.__)}
(function(c){function d(a,b,k){void 0!==b[a]&&(null===b[a]?delete k[a]:k[a]=b[a])}function n(a){if(null!=c.enabled&&!c.enabled||null!=c.maxMessages&&1>c.maxMessages)return!1;try{if(a.userAgentRegex&&!RegExp(a.userAgentRegex).test(navigator.userAgent))return!1}catch(b){}try{if(a.ipRegex&&c.clientIP&&!RegExp(a.ipRegex).test(c.clientIP))return!1}catch(k){}return!0}function e(a,b){try{if(a.disallow&&RegExp(a.disallow).test(b))return!1}catch(k){}return!0}function l(a){return"function"==typeof a?a instanceof
RegExp?a.toString():a():a}function h(a){a=l(a);switch(typeof a){case "string":return new m(a,null,a);case "number":return a=a.toString(),new m(a,null,a);case "boolean":return a=a.toString(),new m(a,null,a);case "undefined":return new m("undefined");case "object":return a instanceof RegExp||a instanceof String||a instanceof Number||a instanceof Boolean?(a=a.toString(),new m(a,null,a)):new m(null,a,JSON.stringify(a));default:return new m("unknown",null,"unknown")}}c.enabled;c.maxMessages;c.defaultAjaxUrl;
c.clientIP;c.requestId="";var m=function(){return function(a,b,k){this.msg=a;this.meta=b;this.finalString=k}}();c.setOptions=function(a){d("enabled",a,this);d("maxMessages",a,this);d("defaultAjaxUrl",a,this);d("clientIP",a,this);d("requestId",a,this);return this};c.getAllLevel=function(){return-2147483648};c.getTraceLevel=function(){return 1E3};c.getDebugLevel=function(){return 2E3};c.getInfoLevel=function(){return 3E3};c.getWarnLevel=function(){return 4E3};c.getErrorLevel=function(){return 5E3};
c.getFatalLevel=function(){return 6E3};c.getOffLevel=function(){return 2147483647};var g=function(){return function(a,b){this.inner=b;this.name="JL.Exception";this.message=h(a).finalString}}();c.Exception=g;g.prototype=Error();var r=function(){return function(a,b,k,c){this.l=a;this.m=b;this.n=k;this.t=c}}();c.LogItem=r;g=function(){function a(b,a){this.appenderName=b;this.sendLogItems=a;this.level=c.getTraceLevel();this.sendWithBufferLevel=2147483647;this.storeInBufferLevel=-2147483648;this.bufferSize=
0;this.batchSize=1;this.buffer=[];this.batchBuffer=[]}a.prototype.setOptions=function(b){d("level",b,this);d("ipRegex",b,this);d("userAgentRegex",b,this);d("disallow",b,this);d("sendWithBufferLevel",b,this);d("storeInBufferLevel",b,this);d("bufferSize",b,this);d("batchSize",b,this);this.bufferSize<this.buffer.length&&(this.buffer.length=this.bufferSize);return this};a.prototype.log=function(b,a,c,d,f,g,h){!n(this)||!e(this,g)||f<this.storeInBufferLevel||(b=new r(f,g,h,(new Date).getTime()),f<this.level?
0<this.bufferSize&&(this.buffer.push(b),this.buffer.length>this.bufferSize&&this.buffer.shift()):(f<this.sendWithBufferLevel||!this.buffer.length||(this.batchBuffer=this.batchBuffer.concat(this.buffer),this.buffer.length=0),this.batchBuffer.push(b),this.batchBuffer.length>=this.batchSize&&this.sendBatch()))};a.prototype.sendBatch=function(){0==this.batchBuffer.length||null!=c.maxMessages&&1>c.maxMessages||(null!=c.maxMessages&&(c.maxMessages-=this.batchBuffer.length),this.sendLogItems(this.batchBuffer),
this.batchBuffer.length=0)};return a}();c.Appender=g;var p=function(a){function b(c){a.call(this,c,b.prototype.sendLogItemsAjax)}__extends(b,a);b.prototype.setOptions=function(b){d("url",b,this);a.prototype.setOptions.call(this,b);return this};b.prototype.sendLogItemsAjax=function(b){try{var a="/jsnlog.logger";null!=c.defaultAjaxUrl&&(a=c.defaultAjaxUrl);this.url&&(a=this.url);var d=JSON.stringify({r:c.requestId,lg:b}),f=new XMLHttpRequest;f.open("POST",a);f.setRequestHeader("Content-Type","application/json");
f.setRequestHeader("JSNLog-RequestId",c.requestId);f.send(d)}catch(e){}};return b}(g);c.AjaxAppender=p;var q=function(a){function b(c){a.call(this,c,b.prototype.sendLogItemsConsole)}__extends(b,a);b.prototype.clog=function(b){console.log(b)};b.prototype.cerror=function(b){console.error?console.error(b):this.clog(b)};b.prototype.cwarn=function(b){console.warn?console.warn(b):this.clog(b)};b.prototype.cinfo=function(b){console.info?console.info(b):this.clog(b)};b.prototype.cdebug=function(b){console.debug?
console.debug(b):this.cinfo(b)};b.prototype.sendLogItemsConsole=function(b){try{if(console){var a;for(a=0;a<b.length;++a){var d=b[a],f=d.n+": "+d.m;"undefined"===typeof window&&(f=new Date(d.t)+" | "+f);d.l<=c.getDebugLevel()?this.cdebug(f):d.l<=c.getInfoLevel()?this.cinfo(f):d.l<=c.getWarnLevel()?this.cwarn(f):this.cerror(f)}}}catch(e){}};return b}(g);c.ConsoleAppender=q;g=function(){function a(b){this.loggerName=b;this.seenRegexes=[]}a.prototype.setOptions=function(b){d("level",b,this);d("userAgentRegex",
b,this);d("disallow",b,this);d("ipRegex",b,this);d("appenders",b,this);d("onceOnly",b,this);this.seenRegexes=[];return this};a.prototype.buildExceptionObject=function(b){var a={};b.stack?a.stack=b.stack:a.e=b;b.message&&(a.message=b.message);b.name&&(a.name=b.name);b.data&&(a.data=b.data);b.inner&&(a.inner=this.buildExceptionObject(b.inner));return a};a.prototype.log=function(b,a,c){var d=0;if(!this.appenders)return this;if(b>=this.level&&n(this)&&(c?(d=this.buildExceptionObject(c),d.logData=l(a)):
d=a,a=h(d),e(this,a.finalString))){if(this.onceOnly)for(d=this.onceOnly.length-1;0<=d;){if(RegExp(this.onceOnly[d]).test(a.finalString)){if(this.seenRegexes[d])return this;this.seenRegexes[d]=!0}d--}a.meta=a.meta||{};a.meta.loggerName=this.loggerName;for(d=this.appenders.length-1;0<=d;)this.appenders[d].log(1E3>=b?"trace":2E3>=b?"debug":3E3>=b?"info":4E3>=b?"warn":5E3>=b?"error":"fatal",a.msg,a.meta,function(){},b,a.finalString,this.loggerName),d--}return this};a.prototype.trace=function(a){return this.log(1E3,
a)};a.prototype.debug=function(a){return this.log(2E3,a)};a.prototype.info=function(a){return this.log(3E3,a)};a.prototype.warn=function(a){return this.log(4E3,a)};a.prototype.error=function(a){return this.log(5E3,a)};a.prototype.fatal=function(a){return this.log(6E3,a)};a.prototype.fatalException=function(a,c){return this.log(6E3,a,c)};return a}();c.Logger=g;c.createAjaxAppender=function(a){return new p(a)};c.createConsoleAppender=function(a){return new q(a)};g=new p("");"undefined"===typeof window&&
(g=new q(""));c.__=new c.Logger("");c.__.setOptions({level:c.getDebugLevel(),appenders:[g]})})(JL||(JL={}));var exports;"undefined"!==typeof exports&&(exports.JL=JL);var define;"function"==typeof define&&define.amd&&define("jsnlog",[],function(){return JL});"function"==typeof __jsnlog_configure&&__jsnlog_configure();
mkws_jQuery = jQuery.noConflict(true);
/*!

 handlebars v3.0.3

Copyright (C) 2011-2014 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["Handlebars"] = factory();
	else
		root["Handlebars"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(8)['default'];

	exports.__esModule = true;

	var _runtime = __webpack_require__(1);

	var _runtime2 = _interopRequireDefault(_runtime);

	// Compiler imports

	var _AST = __webpack_require__(2);

	var _AST2 = _interopRequireDefault(_AST);

	var _Parser$parse = __webpack_require__(3);

	var _Compiler$compile$precompile = __webpack_require__(4);

	var _JavaScriptCompiler = __webpack_require__(5);

	var _JavaScriptCompiler2 = _interopRequireDefault(_JavaScriptCompiler);

	var _Visitor = __webpack_require__(6);

	var _Visitor2 = _interopRequireDefault(_Visitor);

	var _noConflict = __webpack_require__(7);

	var _noConflict2 = _interopRequireDefault(_noConflict);

	var _create = _runtime2['default'].create;
	function create() {
	  var hb = _create();

	  hb.compile = function (input, options) {
	    return _Compiler$compile$precompile.compile(input, options, hb);
	  };
	  hb.precompile = function (input, options) {
	    return _Compiler$compile$precompile.precompile(input, options, hb);
	  };

	  hb.AST = _AST2['default'];
	  hb.Compiler = _Compiler$compile$precompile.Compiler;
	  hb.JavaScriptCompiler = _JavaScriptCompiler2['default'];
	  hb.Parser = _Parser$parse.parser;
	  hb.parse = _Parser$parse.parse;

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_noConflict2['default'](inst);

	inst.Visitor = _Visitor2['default'];

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(8)['default'];

	exports.__esModule = true;

	var _import = __webpack_require__(10);

	var base = _interopRequireWildcard(_import);

	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)

	var _SafeString = __webpack_require__(11);

	var _SafeString2 = _interopRequireDefault(_SafeString);

	var _Exception = __webpack_require__(12);

	var _Exception2 = _interopRequireDefault(_Exception);

	var _import2 = __webpack_require__(13);

	var Utils = _interopRequireWildcard(_import2);

	var _import3 = __webpack_require__(14);

	var runtime = _interopRequireWildcard(_import3);

	var _noConflict = __webpack_require__(7);

	var _noConflict2 = _interopRequireDefault(_noConflict);

	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	function create() {
	  var hb = new base.HandlebarsEnvironment();

	  Utils.extend(hb, base);
	  hb.SafeString = _SafeString2['default'];
	  hb.Exception = _Exception2['default'];
	  hb.Utils = Utils;
	  hb.escapeExpression = Utils.escapeExpression;

	  hb.VM = runtime;
	  hb.template = function (spec) {
	    return runtime.template(spec, hb);
	  };

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_noConflict2['default'](inst);

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	var AST = {
	  Program: function Program(statements, blockParams, strip, locInfo) {
	    this.loc = locInfo;
	    this.type = 'Program';
	    this.body = statements;

	    this.blockParams = blockParams;
	    this.strip = strip;
	  },

	  MustacheStatement: function MustacheStatement(path, params, hash, escaped, strip, locInfo) {
	    this.loc = locInfo;
	    this.type = 'MustacheStatement';

	    this.path = path;
	    this.params = params || [];
	    this.hash = hash;
	    this.escaped = escaped;

	    this.strip = strip;
	  },

	  BlockStatement: function BlockStatement(path, params, hash, program, inverse, openStrip, inverseStrip, closeStrip, locInfo) {
	    this.loc = locInfo;
	    this.type = 'BlockStatement';

	    this.path = path;
	    this.params = params || [];
	    this.hash = hash;
	    this.program = program;
	    this.inverse = inverse;

	    this.openStrip = openStrip;
	    this.inverseStrip = inverseStrip;
	    this.closeStrip = closeStrip;
	  },

	  PartialStatement: function PartialStatement(name, params, hash, strip, locInfo) {
	    this.loc = locInfo;
	    this.type = 'PartialStatement';

	    this.name = name;
	    this.params = params || [];
	    this.hash = hash;

	    this.indent = '';
	    this.strip = strip;
	  },

	  ContentStatement: function ContentStatement(string, locInfo) {
	    this.loc = locInfo;
	    this.type = 'ContentStatement';
	    this.original = this.value = string;
	  },

	  CommentStatement: function CommentStatement(comment, strip, locInfo) {
	    this.loc = locInfo;
	    this.type = 'CommentStatement';
	    this.value = comment;

	    this.strip = strip;
	  },

	  SubExpression: function SubExpression(path, params, hash, locInfo) {
	    this.loc = locInfo;

	    this.type = 'SubExpression';
	    this.path = path;
	    this.params = params || [];
	    this.hash = hash;
	  },

	  PathExpression: function PathExpression(data, depth, parts, original, locInfo) {
	    this.loc = locInfo;
	    this.type = 'PathExpression';

	    this.data = data;
	    this.original = original;
	    this.parts = parts;
	    this.depth = depth;
	  },

	  StringLiteral: function StringLiteral(string, locInfo) {
	    this.loc = locInfo;
	    this.type = 'StringLiteral';
	    this.original = this.value = string;
	  },

	  NumberLiteral: function NumberLiteral(number, locInfo) {
	    this.loc = locInfo;
	    this.type = 'NumberLiteral';
	    this.original = this.value = Number(number);
	  },

	  BooleanLiteral: function BooleanLiteral(bool, locInfo) {
	    this.loc = locInfo;
	    this.type = 'BooleanLiteral';
	    this.original = this.value = bool === 'true';
	  },

	  UndefinedLiteral: function UndefinedLiteral(locInfo) {
	    this.loc = locInfo;
	    this.type = 'UndefinedLiteral';
	    this.original = this.value = undefined;
	  },

	  NullLiteral: function NullLiteral(locInfo) {
	    this.loc = locInfo;
	    this.type = 'NullLiteral';
	    this.original = this.value = null;
	  },

	  Hash: function Hash(pairs, locInfo) {
	    this.loc = locInfo;
	    this.type = 'Hash';
	    this.pairs = pairs;
	  },
	  HashPair: function HashPair(key, value, locInfo) {
	    this.loc = locInfo;
	    this.type = 'HashPair';
	    this.key = key;
	    this.value = value;
	  },

	  // Public API used to evaluate derived attributes regarding AST nodes
	  helpers: {
	    // a mustache is definitely a helper if:
	    // * it is an eligible helper, and
	    // * it has at least one parameter or hash segment
	    helperExpression: function helperExpression(node) {
	      return !!(node.type === 'SubExpression' || node.params.length || node.hash);
	    },

	    scopedId: function scopedId(path) {
	      return /^\.|this\b/.test(path.original);
	    },

	    // an ID is simple if it only has one part, and that part is not
	    // `..` or `this`.
	    simpleId: function simpleId(path) {
	      return path.parts.length === 1 && !AST.helpers.scopedId(path) && !path.depth;
	    }
	  }
	};

	// Must be exported as an object rather than the root of the module as the jison lexer
	// must modify the object to operate properly.
	exports['default'] = AST;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(8)['default'];

	var _interopRequireWildcard = __webpack_require__(9)['default'];

	exports.__esModule = true;
	exports.parse = parse;

	var _parser = __webpack_require__(15);

	var _parser2 = _interopRequireDefault(_parser);

	var _AST = __webpack_require__(2);

	var _AST2 = _interopRequireDefault(_AST);

	var _WhitespaceControl = __webpack_require__(16);

	var _WhitespaceControl2 = _interopRequireDefault(_WhitespaceControl);

	var _import = __webpack_require__(17);

	var Helpers = _interopRequireWildcard(_import);

	var _extend = __webpack_require__(13);

	exports.parser = _parser2['default'];

	var yy = {};
	_extend.extend(yy, Helpers, _AST2['default']);

	function parse(input, options) {
	  // Just return if an already-compiled AST was passed in.
	  if (input.type === 'Program') {
	    return input;
	  }

	  _parser2['default'].yy = yy;

	  // Altering the shared object here, but this is ok as parser is a sync operation
	  yy.locInfo = function (locInfo) {
	    return new yy.SourceLocation(options && options.srcName, locInfo);
	  };

	  var strip = new _WhitespaceControl2['default']();
	  return strip.accept(_parser2['default'].parse(input));
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(8)['default'];

	exports.__esModule = true;
	exports.Compiler = Compiler;
	exports.precompile = precompile;
	exports.compile = compile;

	var _Exception = __webpack_require__(12);

	var _Exception2 = _interopRequireDefault(_Exception);

	var _isArray$indexOf = __webpack_require__(13);

	var _AST = __webpack_require__(2);

	var _AST2 = _interopRequireDefault(_AST);

	var slice = [].slice;

	function Compiler() {}

	// the foundHelper register will disambiguate helper lookup from finding a
	// function in a context. This is necessary for mustache compatibility, which
	// requires that context functions in blocks are evaluated by blockHelperMissing,
	// and then proceed as if the resulting value was provided to blockHelperMissing.

	Compiler.prototype = {
	  compiler: Compiler,

	  equals: function equals(other) {
	    var len = this.opcodes.length;
	    if (other.opcodes.length !== len) {
	      return false;
	    }

	    for (var i = 0; i < len; i++) {
	      var opcode = this.opcodes[i],
	          otherOpcode = other.opcodes[i];
	      if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
	        return false;
	      }
	    }

	    // We know that length is the same between the two arrays because they are directly tied
	    // to the opcode behavior above.
	    len = this.children.length;
	    for (var i = 0; i < len; i++) {
	      if (!this.children[i].equals(other.children[i])) {
	        return false;
	      }
	    }

	    return true;
	  },

	  guid: 0,

	  compile: function compile(program, options) {
	    this.sourceNode = [];
	    this.opcodes = [];
	    this.children = [];
	    this.options = options;
	    this.stringParams = options.stringParams;
	    this.trackIds = options.trackIds;

	    options.blockParams = options.blockParams || [];

	    // These changes will propagate to the other compiler components
	    var knownHelpers = options.knownHelpers;
	    options.knownHelpers = {
	      helperMissing: true,
	      blockHelperMissing: true,
	      each: true,
	      'if': true,
	      unless: true,
	      'with': true,
	      log: true,
	      lookup: true
	    };
	    if (knownHelpers) {
	      for (var _name in knownHelpers) {
	        if (_name in knownHelpers) {
	          options.knownHelpers[_name] = knownHelpers[_name];
	        }
	      }
	    }

	    return this.accept(program);
	  },

	  compileProgram: function compileProgram(program) {
	    var childCompiler = new this.compiler(),
	        // eslint-disable-line new-cap
	    result = childCompiler.compile(program, this.options),
	        guid = this.guid++;

	    this.usePartial = this.usePartial || result.usePartial;

	    this.children[guid] = result;
	    this.useDepths = this.useDepths || result.useDepths;

	    return guid;
	  },

	  accept: function accept(node) {
	    this.sourceNode.unshift(node);
	    var ret = this[node.type](node);
	    this.sourceNode.shift();
	    return ret;
	  },

	  Program: function Program(program) {
	    this.options.blockParams.unshift(program.blockParams);

	    var body = program.body,
	        bodyLength = body.length;
	    for (var i = 0; i < bodyLength; i++) {
	      this.accept(body[i]);
	    }

	    this.options.blockParams.shift();

	    this.isSimple = bodyLength === 1;
	    this.blockParams = program.blockParams ? program.blockParams.length : 0;

	    return this;
	  },

	  BlockStatement: function BlockStatement(block) {
	    transformLiteralToPath(block);

	    var program = block.program,
	        inverse = block.inverse;

	    program = program && this.compileProgram(program);
	    inverse = inverse && this.compileProgram(inverse);

	    var type = this.classifySexpr(block);

	    if (type === 'helper') {
	      this.helperSexpr(block, program, inverse);
	    } else if (type === 'simple') {
	      this.simpleSexpr(block);

	      // now that the simple mustache is resolved, we need to
	      // evaluate it by executing `blockHelperMissing`
	      this.opcode('pushProgram', program);
	      this.opcode('pushProgram', inverse);
	      this.opcode('emptyHash');
	      this.opcode('blockValue', block.path.original);
	    } else {
	      this.ambiguousSexpr(block, program, inverse);

	      // now that the simple mustache is resolved, we need to
	      // evaluate it by executing `blockHelperMissing`
	      this.opcode('pushProgram', program);
	      this.opcode('pushProgram', inverse);
	      this.opcode('emptyHash');
	      this.opcode('ambiguousBlockValue');
	    }

	    this.opcode('append');
	  },

	  PartialStatement: function PartialStatement(partial) {
	    this.usePartial = true;

	    var params = partial.params;
	    if (params.length > 1) {
	      throw new _Exception2['default']('Unsupported number of partial arguments: ' + params.length, partial);
	    } else if (!params.length) {
	      params.push({ type: 'PathExpression', parts: [], depth: 0 });
	    }

	    var partialName = partial.name.original,
	        isDynamic = partial.name.type === 'SubExpression';
	    if (isDynamic) {
	      this.accept(partial.name);
	    }

	    this.setupFullMustacheParams(partial, undefined, undefined, true);

	    var indent = partial.indent || '';
	    if (this.options.preventIndent && indent) {
	      this.opcode('appendContent', indent);
	      indent = '';
	    }

	    this.opcode('invokePartial', isDynamic, partialName, indent);
	    this.opcode('append');
	  },

	  MustacheStatement: function MustacheStatement(mustache) {
	    this.SubExpression(mustache); // eslint-disable-line new-cap

	    if (mustache.escaped && !this.options.noEscape) {
	      this.opcode('appendEscaped');
	    } else {
	      this.opcode('append');
	    }
	  },

	  ContentStatement: function ContentStatement(content) {
	    if (content.value) {
	      this.opcode('appendContent', content.value);
	    }
	  },

	  CommentStatement: function CommentStatement() {},

	  SubExpression: function SubExpression(sexpr) {
	    transformLiteralToPath(sexpr);
	    var type = this.classifySexpr(sexpr);

	    if (type === 'simple') {
	      this.simpleSexpr(sexpr);
	    } else if (type === 'helper') {
	      this.helperSexpr(sexpr);
	    } else {
	      this.ambiguousSexpr(sexpr);
	    }
	  },
	  ambiguousSexpr: function ambiguousSexpr(sexpr, program, inverse) {
	    var path = sexpr.path,
	        name = path.parts[0],
	        isBlock = program != null || inverse != null;

	    this.opcode('getContext', path.depth);

	    this.opcode('pushProgram', program);
	    this.opcode('pushProgram', inverse);

	    this.accept(path);

	    this.opcode('invokeAmbiguous', name, isBlock);
	  },

	  simpleSexpr: function simpleSexpr(sexpr) {
	    this.accept(sexpr.path);
	    this.opcode('resolvePossibleLambda');
	  },

	  helperSexpr: function helperSexpr(sexpr, program, inverse) {
	    var params = this.setupFullMustacheParams(sexpr, program, inverse),
	        path = sexpr.path,
	        name = path.parts[0];

	    if (this.options.knownHelpers[name]) {
	      this.opcode('invokeKnownHelper', params.length, name);
	    } else if (this.options.knownHelpersOnly) {
	      throw new _Exception2['default']('You specified knownHelpersOnly, but used the unknown helper ' + name, sexpr);
	    } else {
	      path.falsy = true;

	      this.accept(path);
	      this.opcode('invokeHelper', params.length, path.original, _AST2['default'].helpers.simpleId(path));
	    }
	  },

	  PathExpression: function PathExpression(path) {
	    this.addDepth(path.depth);
	    this.opcode('getContext', path.depth);

	    var name = path.parts[0],
	        scoped = _AST2['default'].helpers.scopedId(path),
	        blockParamId = !path.depth && !scoped && this.blockParamIndex(name);

	    if (blockParamId) {
	      this.opcode('lookupBlockParam', blockParamId, path.parts);
	    } else if (!name) {
	      // Context reference, i.e. `{{foo .}}` or `{{foo ..}}`
	      this.opcode('pushContext');
	    } else if (path.data) {
	      this.options.data = true;
	      this.opcode('lookupData', path.depth, path.parts);
	    } else {
	      this.opcode('lookupOnContext', path.parts, path.falsy, scoped);
	    }
	  },

	  StringLiteral: function StringLiteral(string) {
	    this.opcode('pushString', string.value);
	  },

	  NumberLiteral: function NumberLiteral(number) {
	    this.opcode('pushLiteral', number.value);
	  },

	  BooleanLiteral: function BooleanLiteral(bool) {
	    this.opcode('pushLiteral', bool.value);
	  },

	  UndefinedLiteral: function UndefinedLiteral() {
	    this.opcode('pushLiteral', 'undefined');
	  },

	  NullLiteral: function NullLiteral() {
	    this.opcode('pushLiteral', 'null');
	  },

	  Hash: function Hash(hash) {
	    var pairs = hash.pairs,
	        i = 0,
	        l = pairs.length;

	    this.opcode('pushHash');

	    for (; i < l; i++) {
	      this.pushParam(pairs[i].value);
	    }
	    while (i--) {
	      this.opcode('assignToHash', pairs[i].key);
	    }
	    this.opcode('popHash');
	  },

	  // HELPERS
	  opcode: function opcode(name) {
	    this.opcodes.push({ opcode: name, args: slice.call(arguments, 1), loc: this.sourceNode[0].loc });
	  },

	  addDepth: function addDepth(depth) {
	    if (!depth) {
	      return;
	    }

	    this.useDepths = true;
	  },

	  classifySexpr: function classifySexpr(sexpr) {
	    var isSimple = _AST2['default'].helpers.simpleId(sexpr.path);

	    var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);

	    // a mustache is an eligible helper if:
	    // * its id is simple (a single part, not `this` or `..`)
	    var isHelper = !isBlockParam && _AST2['default'].helpers.helperExpression(sexpr);

	    // if a mustache is an eligible helper but not a definite
	    // helper, it is ambiguous, and will be resolved in a later
	    // pass or at runtime.
	    var isEligible = !isBlockParam && (isHelper || isSimple);

	    // if ambiguous, we can possibly resolve the ambiguity now
	    // An eligible helper is one that does not have a complex path, i.e. `this.foo`, `../foo` etc.
	    if (isEligible && !isHelper) {
	      var _name2 = sexpr.path.parts[0],
	          options = this.options;

	      if (options.knownHelpers[_name2]) {
	        isHelper = true;
	      } else if (options.knownHelpersOnly) {
	        isEligible = false;
	      }
	    }

	    if (isHelper) {
	      return 'helper';
	    } else if (isEligible) {
	      return 'ambiguous';
	    } else {
	      return 'simple';
	    }
	  },

	  pushParams: function pushParams(params) {
	    for (var i = 0, l = params.length; i < l; i++) {
	      this.pushParam(params[i]);
	    }
	  },

	  pushParam: function pushParam(val) {
	    var value = val.value != null ? val.value : val.original || '';

	    if (this.stringParams) {
	      if (value.replace) {
	        value = value.replace(/^(\.?\.\/)*/g, '').replace(/\//g, '.');
	      }

	      if (val.depth) {
	        this.addDepth(val.depth);
	      }
	      this.opcode('getContext', val.depth || 0);
	      this.opcode('pushStringParam', value, val.type);

	      if (val.type === 'SubExpression') {
	        // SubExpressions get evaluated and passed in
	        // in string params mode.
	        this.accept(val);
	      }
	    } else {
	      if (this.trackIds) {
	        var blockParamIndex = undefined;
	        if (val.parts && !_AST2['default'].helpers.scopedId(val) && !val.depth) {
	          blockParamIndex = this.blockParamIndex(val.parts[0]);
	        }
	        if (blockParamIndex) {
	          var blockParamChild = val.parts.slice(1).join('.');
	          this.opcode('pushId', 'BlockParam', blockParamIndex, blockParamChild);
	        } else {
	          value = val.original || value;
	          if (value.replace) {
	            value = value.replace(/^\.\//g, '').replace(/^\.$/g, '');
	          }

	          this.opcode('pushId', val.type, value);
	        }
	      }
	      this.accept(val);
	    }
	  },

	  setupFullMustacheParams: function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
	    var params = sexpr.params;
	    this.pushParams(params);

	    this.opcode('pushProgram', program);
	    this.opcode('pushProgram', inverse);

	    if (sexpr.hash) {
	      this.accept(sexpr.hash);
	    } else {
	      this.opcode('emptyHash', omitEmpty);
	    }

	    return params;
	  },

	  blockParamIndex: function blockParamIndex(name) {
	    for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
	      var blockParams = this.options.blockParams[depth],
	          param = blockParams && _isArray$indexOf.indexOf(blockParams, name);
	      if (blockParams && param >= 0) {
	        return [depth, param];
	      }
	    }
	  }
	};

	function precompile(input, options, env) {
	  if (input == null || typeof input !== 'string' && input.type !== 'Program') {
	    throw new _Exception2['default']('You must pass a string or Handlebars AST to Handlebars.precompile. You passed ' + input);
	  }

	  options = options || {};
	  if (!('data' in options)) {
	    options.data = true;
	  }
	  if (options.compat) {
	    options.useDepths = true;
	  }

	  var ast = env.parse(input, options),
	      environment = new env.Compiler().compile(ast, options);
	  return new env.JavaScriptCompiler().compile(environment, options);
	}

	function compile(input, _x, env) {
	  var options = arguments[1] === undefined ? {} : arguments[1];

	  if (input == null || typeof input !== 'string' && input.type !== 'Program') {
	    throw new _Exception2['default']('You must pass a string or Handlebars AST to Handlebars.compile. You passed ' + input);
	  }

	  if (!('data' in options)) {
	    options.data = true;
	  }
	  if (options.compat) {
	    options.useDepths = true;
	  }

	  var compiled = undefined;

	  function compileInput() {
	    var ast = env.parse(input, options),
	        environment = new env.Compiler().compile(ast, options),
	        templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
	    return env.template(templateSpec);
	  }

	  // Template is only compiled on first use and cached after that point.
	  function ret(context, execOptions) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled.call(this, context, execOptions);
	  }
	  ret._setup = function (setupOptions) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled._setup(setupOptions);
	  };
	  ret._child = function (i, data, blockParams, depths) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled._child(i, data, blockParams, depths);
	  };
	  return ret;
	}

	function argEquals(a, b) {
	  if (a === b) {
	    return true;
	  }

	  if (_isArray$indexOf.isArray(a) && _isArray$indexOf.isArray(b) && a.length === b.length) {
	    for (var i = 0; i < a.length; i++) {
	      if (!argEquals(a[i], b[i])) {
	        return false;
	      }
	    }
	    return true;
	  }
	}

	function transformLiteralToPath(sexpr) {
	  if (!sexpr.path.parts) {
	    var literal = sexpr.path;
	    // Casting to string here to make false and 0 literal values play nicely with the rest
	    // of the system.
	    sexpr.path = new _AST2['default'].PathExpression(false, 0, [literal.original + ''], literal.original + '', literal.loc);
	  }
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(8)['default'];

	exports.__esModule = true;

	var _COMPILER_REVISION$REVISION_CHANGES = __webpack_require__(10);

	var _Exception = __webpack_require__(12);

	var _Exception2 = _interopRequireDefault(_Exception);

	var _isArray = __webpack_require__(13);

	var _CodeGen = __webpack_require__(18);

	var _CodeGen2 = _interopRequireDefault(_CodeGen);

	function Literal(value) {
	  this.value = value;
	}

	function JavaScriptCompiler() {}

	JavaScriptCompiler.prototype = {
	  // PUBLIC API: You can override these methods in a subclass to provide
	  // alternative compiled forms for name lookup and buffering semantics
	  nameLookup: function nameLookup(parent, name /* , type*/) {
	    if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
	      return [parent, '.', name];
	    } else {
	      return [parent, '[\'', name, '\']'];
	    }
	  },
	  depthedLookup: function depthedLookup(name) {
	    return [this.aliasable('this.lookup'), '(depths, "', name, '")'];
	  },

	  compilerInfo: function compilerInfo() {
	    var revision = _COMPILER_REVISION$REVISION_CHANGES.COMPILER_REVISION,
	        versions = _COMPILER_REVISION$REVISION_CHANGES.REVISION_CHANGES[revision];
	    return [revision, versions];
	  },

	  appendToBuffer: function appendToBuffer(source, location, explicit) {
	    // Force a source as this simplifies the merge logic.
	    if (!_isArray.isArray(source)) {
	      source = [source];
	    }
	    source = this.source.wrap(source, location);

	    if (this.environment.isSimple) {
	      return ['return ', source, ';'];
	    } else if (explicit) {
	      // This is a case where the buffer operation occurs as a child of another
	      // construct, generally braces. We have to explicitly output these buffer
	      // operations to ensure that the emitted code goes in the correct location.
	      return ['buffer += ', source, ';'];
	    } else {
	      source.appendToBuffer = true;
	      return source;
	    }
	  },

	  initializeBuffer: function initializeBuffer() {
	    return this.quotedString('');
	  },
	  // END PUBLIC API

	  compile: function compile(environment, options, context, asObject) {
	    this.environment = environment;
	    this.options = options;
	    this.stringParams = this.options.stringParams;
	    this.trackIds = this.options.trackIds;
	    this.precompile = !asObject;

	    this.name = this.environment.name;
	    this.isChild = !!context;
	    this.context = context || {
	      programs: [],
	      environments: []
	    };

	    this.preamble();

	    this.stackSlot = 0;
	    this.stackVars = [];
	    this.aliases = {};
	    this.registers = { list: [] };
	    this.hashes = [];
	    this.compileStack = [];
	    this.inlineStack = [];
	    this.blockParams = [];

	    this.compileChildren(environment, options);

	    this.useDepths = this.useDepths || environment.useDepths || this.options.compat;
	    this.useBlockParams = this.useBlockParams || environment.useBlockParams;

	    var opcodes = environment.opcodes,
	        opcode = undefined,
	        firstLoc = undefined,
	        i = undefined,
	        l = undefined;

	    for (i = 0, l = opcodes.length; i < l; i++) {
	      opcode = opcodes[i];

	      this.source.currentLocation = opcode.loc;
	      firstLoc = firstLoc || opcode.loc;
	      this[opcode.opcode].apply(this, opcode.args);
	    }

	    // Flush any trailing content that might be pending.
	    this.source.currentLocation = firstLoc;
	    this.pushSource('');

	    /* istanbul ignore next */
	    if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
	      throw new _Exception2['default']('Compile completed with content left on stack');
	    }

	    var fn = this.createFunctionContext(asObject);
	    if (!this.isChild) {
	      var ret = {
	        compiler: this.compilerInfo(),
	        main: fn
	      };
	      var programs = this.context.programs;
	      for (i = 0, l = programs.length; i < l; i++) {
	        if (programs[i]) {
	          ret[i] = programs[i];
	        }
	      }

	      if (this.environment.usePartial) {
	        ret.usePartial = true;
	      }
	      if (this.options.data) {
	        ret.useData = true;
	      }
	      if (this.useDepths) {
	        ret.useDepths = true;
	      }
	      if (this.useBlockParams) {
	        ret.useBlockParams = true;
	      }
	      if (this.options.compat) {
	        ret.compat = true;
	      }

	      if (!asObject) {
	        ret.compiler = JSON.stringify(ret.compiler);

	        this.source.currentLocation = { start: { line: 1, column: 0 } };
	        ret = this.objectLiteral(ret);

	        if (options.srcName) {
	          ret = ret.toStringWithSourceMap({ file: options.destName });
	          ret.map = ret.map && ret.map.toString();
	        } else {
	          ret = ret.toString();
	        }
	      } else {
	        ret.compilerOptions = this.options;
	      }

	      return ret;
	    } else {
	      return fn;
	    }
	  },

	  preamble: function preamble() {
	    // track the last context pushed into place to allow skipping the
	    // getContext opcode when it would be a noop
	    this.lastContext = 0;
	    this.source = new _CodeGen2['default'](this.options.srcName);
	  },

	  createFunctionContext: function createFunctionContext(asObject) {
	    var varDeclarations = '';

	    var locals = this.stackVars.concat(this.registers.list);
	    if (locals.length > 0) {
	      varDeclarations += ', ' + locals.join(', ');
	    }

	    // Generate minimizer alias mappings
	    //
	    // When using true SourceNodes, this will update all references to the given alias
	    // as the source nodes are reused in situ. For the non-source node compilation mode,
	    // aliases will not be used, but this case is already being run on the client and
	    // we aren't concern about minimizing the template size.
	    var aliasCount = 0;
	    for (var alias in this.aliases) {
	      // eslint-disable-line guard-for-in
	      var node = this.aliases[alias];

	      if (this.aliases.hasOwnProperty(alias) && node.children && node.referenceCount > 1) {
	        varDeclarations += ', alias' + ++aliasCount + '=' + alias;
	        node.children[0] = 'alias' + aliasCount;
	      }
	    }

	    var params = ['depth0', 'helpers', 'partials', 'data'];

	    if (this.useBlockParams || this.useDepths) {
	      params.push('blockParams');
	    }
	    if (this.useDepths) {
	      params.push('depths');
	    }

	    // Perform a second pass over the output to merge content when possible
	    var source = this.mergeSource(varDeclarations);

	    if (asObject) {
	      params.push(source);

	      return Function.apply(this, params);
	    } else {
	      return this.source.wrap(['function(', params.join(','), ') {\n  ', source, '}']);
	    }
	  },
	  mergeSource: function mergeSource(varDeclarations) {
	    var isSimple = this.environment.isSimple,
	        appendOnly = !this.forceBuffer,
	        appendFirst = undefined,
	        sourceSeen = undefined,
	        bufferStart = undefined,
	        bufferEnd = undefined;
	    this.source.each(function (line) {
	      if (line.appendToBuffer) {
	        if (bufferStart) {
	          line.prepend('  + ');
	        } else {
	          bufferStart = line;
	        }
	        bufferEnd = line;
	      } else {
	        if (bufferStart) {
	          if (!sourceSeen) {
	            appendFirst = true;
	          } else {
	            bufferStart.prepend('buffer += ');
	          }
	          bufferEnd.add(';');
	          bufferStart = bufferEnd = undefined;
	        }

	        sourceSeen = true;
	        if (!isSimple) {
	          appendOnly = false;
	        }
	      }
	    });

	    if (appendOnly) {
	      if (bufferStart) {
	        bufferStart.prepend('return ');
	        bufferEnd.add(';');
	      } else if (!sourceSeen) {
	        this.source.push('return "";');
	      }
	    } else {
	      varDeclarations += ', buffer = ' + (appendFirst ? '' : this.initializeBuffer());

	      if (bufferStart) {
	        bufferStart.prepend('return buffer + ');
	        bufferEnd.add(';');
	      } else {
	        this.source.push('return buffer;');
	      }
	    }

	    if (varDeclarations) {
	      this.source.prepend('var ' + varDeclarations.substring(2) + (appendFirst ? '' : ';\n'));
	    }

	    return this.source.merge();
	  },

	  // [blockValue]
	  //
	  // On stack, before: hash, inverse, program, value
	  // On stack, after: return value of blockHelperMissing
	  //
	  // The purpose of this opcode is to take a block of the form
	  // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
	  // replace it on the stack with the result of properly
	  // invoking blockHelperMissing.
	  blockValue: function blockValue(name) {
	    var blockHelperMissing = this.aliasable('helpers.blockHelperMissing'),
	        params = [this.contextName(0)];
	    this.setupHelperArgs(name, 0, params);

	    var blockName = this.popStack();
	    params.splice(1, 0, blockName);

	    this.push(this.source.functionCall(blockHelperMissing, 'call', params));
	  },

	  // [ambiguousBlockValue]
	  //
	  // On stack, before: hash, inverse, program, value
	  // Compiler value, before: lastHelper=value of last found helper, if any
	  // On stack, after, if no lastHelper: same as [blockValue]
	  // On stack, after, if lastHelper: value
	  ambiguousBlockValue: function ambiguousBlockValue() {
	    // We're being a bit cheeky and reusing the options value from the prior exec
	    var blockHelperMissing = this.aliasable('helpers.blockHelperMissing'),
	        params = [this.contextName(0)];
	    this.setupHelperArgs('', 0, params, true);

	    this.flushInline();

	    var current = this.topStack();
	    params.splice(1, 0, current);

	    this.pushSource(['if (!', this.lastHelper, ') { ', current, ' = ', this.source.functionCall(blockHelperMissing, 'call', params), '}']);
	  },

	  // [appendContent]
	  //
	  // On stack, before: ...
	  // On stack, after: ...
	  //
	  // Appends the string value of `content` to the current buffer
	  appendContent: function appendContent(content) {
	    if (this.pendingContent) {
	      content = this.pendingContent + content;
	    } else {
	      this.pendingLocation = this.source.currentLocation;
	    }

	    this.pendingContent = content;
	  },

	  // [append]
	  //
	  // On stack, before: value, ...
	  // On stack, after: ...
	  //
	  // Coerces `value` to a String and appends it to the current buffer.
	  //
	  // If `value` is truthy, or 0, it is coerced into a string and appended
	  // Otherwise, the empty string is appended
	  append: function append() {
	    if (this.isInline()) {
	      this.replaceStack(function (current) {
	        return [' != null ? ', current, ' : ""'];
	      });

	      this.pushSource(this.appendToBuffer(this.popStack()));
	    } else {
	      var local = this.popStack();
	      this.pushSource(['if (', local, ' != null) { ', this.appendToBuffer(local, undefined, true), ' }']);
	      if (this.environment.isSimple) {
	        this.pushSource(['else { ', this.appendToBuffer('\'\'', undefined, true), ' }']);
	      }
	    }
	  },

	  // [appendEscaped]
	  //
	  // On stack, before: value, ...
	  // On stack, after: ...
	  //
	  // Escape `value` and append it to the buffer
	  appendEscaped: function appendEscaped() {
	    this.pushSource(this.appendToBuffer([this.aliasable('this.escapeExpression'), '(', this.popStack(), ')']));
	  },

	  // [getContext]
	  //
	  // On stack, before: ...
	  // On stack, after: ...
	  // Compiler value, after: lastContext=depth
	  //
	  // Set the value of the `lastContext` compiler value to the depth
	  getContext: function getContext(depth) {
	    this.lastContext = depth;
	  },

	  // [pushContext]
	  //
	  // On stack, before: ...
	  // On stack, after: currentContext, ...
	  //
	  // Pushes the value of the current context onto the stack.
	  pushContext: function pushContext() {
	    this.pushStackLiteral(this.contextName(this.lastContext));
	  },

	  // [lookupOnContext]
	  //
	  // On stack, before: ...
	  // On stack, after: currentContext[name], ...
	  //
	  // Looks up the value of `name` on the current context and pushes
	  // it onto the stack.
	  lookupOnContext: function lookupOnContext(parts, falsy, scoped) {
	    var i = 0;

	    if (!scoped && this.options.compat && !this.lastContext) {
	      // The depthed query is expected to handle the undefined logic for the root level that
	      // is implemented below, so we evaluate that directly in compat mode
	      this.push(this.depthedLookup(parts[i++]));
	    } else {
	      this.pushContext();
	    }

	    this.resolvePath('context', parts, i, falsy);
	  },

	  // [lookupBlockParam]
	  //
	  // On stack, before: ...
	  // On stack, after: blockParam[name], ...
	  //
	  // Looks up the value of `parts` on the given block param and pushes
	  // it onto the stack.
	  lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
	    this.useBlockParams = true;

	    this.push(['blockParams[', blockParamId[0], '][', blockParamId[1], ']']);
	    this.resolvePath('context', parts, 1);
	  },

	  // [lookupData]
	  //
	  // On stack, before: ...
	  // On stack, after: data, ...
	  //
	  // Push the data lookup operator
	  lookupData: function lookupData(depth, parts) {
	    if (!depth) {
	      this.pushStackLiteral('data');
	    } else {
	      this.pushStackLiteral('this.data(data, ' + depth + ')');
	    }

	    this.resolvePath('data', parts, 0, true);
	  },

	  resolvePath: function resolvePath(type, parts, i, falsy) {
	    var _this = this;

	    if (this.options.strict || this.options.assumeObjects) {
	      this.push(strictLookup(this.options.strict, this, parts, type));
	      return;
	    }

	    var len = parts.length;
	    for (; i < len; i++) {
	      /*eslint-disable no-loop-func */
	      this.replaceStack(function (current) {
	        var lookup = _this.nameLookup(current, parts[i], type);
	        // We want to ensure that zero and false are handled properly if the context (falsy flag)
	        // needs to have the special handling for these values.
	        if (!falsy) {
	          return [' != null ? ', lookup, ' : ', current];
	        } else {
	          // Otherwise we can use generic falsy handling
	          return [' && ', lookup];
	        }
	      });
	      /*eslint-enable no-loop-func */
	    }
	  },

	  // [resolvePossibleLambda]
	  //
	  // On stack, before: value, ...
	  // On stack, after: resolved value, ...
	  //
	  // If the `value` is a lambda, replace it on the stack by
	  // the return value of the lambda
	  resolvePossibleLambda: function resolvePossibleLambda() {
	    this.push([this.aliasable('this.lambda'), '(', this.popStack(), ', ', this.contextName(0), ')']);
	  },

	  // [pushStringParam]
	  //
	  // On stack, before: ...
	  // On stack, after: string, currentContext, ...
	  //
	  // This opcode is designed for use in string mode, which
	  // provides the string value of a parameter along with its
	  // depth rather than resolving it immediately.
	  pushStringParam: function pushStringParam(string, type) {
	    this.pushContext();
	    this.pushString(type);

	    // If it's a subexpression, the string result
	    // will be pushed after this opcode.
	    if (type !== 'SubExpression') {
	      if (typeof string === 'string') {
	        this.pushString(string);
	      } else {
	        this.pushStackLiteral(string);
	      }
	    }
	  },

	  emptyHash: function emptyHash(omitEmpty) {
	    if (this.trackIds) {
	      this.push('{}'); // hashIds
	    }
	    if (this.stringParams) {
	      this.push('{}'); // hashContexts
	      this.push('{}'); // hashTypes
	    }
	    this.pushStackLiteral(omitEmpty ? 'undefined' : '{}');
	  },
	  pushHash: function pushHash() {
	    if (this.hash) {
	      this.hashes.push(this.hash);
	    }
	    this.hash = { values: [], types: [], contexts: [], ids: [] };
	  },
	  popHash: function popHash() {
	    var hash = this.hash;
	    this.hash = this.hashes.pop();

	    if (this.trackIds) {
	      this.push(this.objectLiteral(hash.ids));
	    }
	    if (this.stringParams) {
	      this.push(this.objectLiteral(hash.contexts));
	      this.push(this.objectLiteral(hash.types));
	    }

	    this.push(this.objectLiteral(hash.values));
	  },

	  // [pushString]
	  //
	  // On stack, before: ...
	  // On stack, after: quotedString(string), ...
	  //
	  // Push a quoted version of `string` onto the stack
	  pushString: function pushString(string) {
	    this.pushStackLiteral(this.quotedString(string));
	  },

	  // [pushLiteral]
	  //
	  // On stack, before: ...
	  // On stack, after: value, ...
	  //
	  // Pushes a value onto the stack. This operation prevents
	  // the compiler from creating a temporary variable to hold
	  // it.
	  pushLiteral: function pushLiteral(value) {
	    this.pushStackLiteral(value);
	  },

	  // [pushProgram]
	  //
	  // On stack, before: ...
	  // On stack, after: program(guid), ...
	  //
	  // Push a program expression onto the stack. This takes
	  // a compile-time guid and converts it into a runtime-accessible
	  // expression.
	  pushProgram: function pushProgram(guid) {
	    if (guid != null) {
	      this.pushStackLiteral(this.programExpression(guid));
	    } else {
	      this.pushStackLiteral(null);
	    }
	  },

	  // [invokeHelper]
	  //
	  // On stack, before: hash, inverse, program, params..., ...
	  // On stack, after: result of helper invocation
	  //
	  // Pops off the helper's parameters, invokes the helper,
	  // and pushes the helper's return value onto the stack.
	  //
	  // If the helper is not found, `helperMissing` is called.
	  invokeHelper: function invokeHelper(paramSize, name, isSimple) {
	    var nonHelper = this.popStack(),
	        helper = this.setupHelper(paramSize, name),
	        simple = isSimple ? [helper.name, ' || '] : '';

	    var lookup = ['('].concat(simple, nonHelper);
	    if (!this.options.strict) {
	      lookup.push(' || ', this.aliasable('helpers.helperMissing'));
	    }
	    lookup.push(')');

	    this.push(this.source.functionCall(lookup, 'call', helper.callParams));
	  },

	  // [invokeKnownHelper]
	  //
	  // On stack, before: hash, inverse, program, params..., ...
	  // On stack, after: result of helper invocation
	  //
	  // This operation is used when the helper is known to exist,
	  // so a `helperMissing` fallback is not required.
	  invokeKnownHelper: function invokeKnownHelper(paramSize, name) {
	    var helper = this.setupHelper(paramSize, name);
	    this.push(this.source.functionCall(helper.name, 'call', helper.callParams));
	  },

	  // [invokeAmbiguous]
	  //
	  // On stack, before: hash, inverse, program, params..., ...
	  // On stack, after: result of disambiguation
	  //
	  // This operation is used when an expression like `{{foo}}`
	  // is provided, but we don't know at compile-time whether it
	  // is a helper or a path.
	  //
	  // This operation emits more code than the other options,
	  // and can be avoided by passing the `knownHelpers` and
	  // `knownHelpersOnly` flags at compile-time.
	  invokeAmbiguous: function invokeAmbiguous(name, helperCall) {
	    this.useRegister('helper');

	    var nonHelper = this.popStack();

	    this.emptyHash();
	    var helper = this.setupHelper(0, name, helperCall);

	    var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

	    var lookup = ['(', '(helper = ', helperName, ' || ', nonHelper, ')'];
	    if (!this.options.strict) {
	      lookup[0] = '(helper = ';
	      lookup.push(' != null ? helper : ', this.aliasable('helpers.helperMissing'));
	    }

	    this.push(['(', lookup, helper.paramsInit ? ['),(', helper.paramsInit] : [], '),', '(typeof helper === ', this.aliasable('"function"'), ' ? ', this.source.functionCall('helper', 'call', helper.callParams), ' : helper))']);
	  },

	  // [invokePartial]
	  //
	  // On stack, before: context, ...
	  // On stack after: result of partial invocation
	  //
	  // This operation pops off a context, invokes a partial with that context,
	  // and pushes the result of the invocation back.
	  invokePartial: function invokePartial(isDynamic, name, indent) {
	    var params = [],
	        options = this.setupParams(name, 1, params, false);

	    if (isDynamic) {
	      name = this.popStack();
	      delete options.name;
	    }

	    if (indent) {
	      options.indent = JSON.stringify(indent);
	    }
	    options.helpers = 'helpers';
	    options.partials = 'partials';

	    if (!isDynamic) {
	      params.unshift(this.nameLookup('partials', name, 'partial'));
	    } else {
	      params.unshift(name);
	    }

	    if (this.options.compat) {
	      options.depths = 'depths';
	    }
	    options = this.objectLiteral(options);
	    params.push(options);

	    this.push(this.source.functionCall('this.invokePartial', '', params));
	  },

	  // [assignToHash]
	  //
	  // On stack, before: value, ..., hash, ...
	  // On stack, after: ..., hash, ...
	  //
	  // Pops a value off the stack and assigns it to the current hash
	  assignToHash: function assignToHash(key) {
	    var value = this.popStack(),
	        context = undefined,
	        type = undefined,
	        id = undefined;

	    if (this.trackIds) {
	      id = this.popStack();
	    }
	    if (this.stringParams) {
	      type = this.popStack();
	      context = this.popStack();
	    }

	    var hash = this.hash;
	    if (context) {
	      hash.contexts[key] = context;
	    }
	    if (type) {
	      hash.types[key] = type;
	    }
	    if (id) {
	      hash.ids[key] = id;
	    }
	    hash.values[key] = value;
	  },

	  pushId: function pushId(type, name, child) {
	    if (type === 'BlockParam') {
	      this.pushStackLiteral('blockParams[' + name[0] + '].path[' + name[1] + ']' + (child ? ' + ' + JSON.stringify('.' + child) : ''));
	    } else if (type === 'PathExpression') {
	      this.pushString(name);
	    } else if (type === 'SubExpression') {
	      this.pushStackLiteral('true');
	    } else {
	      this.pushStackLiteral('null');
	    }
	  },

	  // HELPERS

	  compiler: JavaScriptCompiler,

	  compileChildren: function compileChildren(environment, options) {
	    var children = environment.children,
	        child = undefined,
	        compiler = undefined;

	    for (var i = 0, l = children.length; i < l; i++) {
	      child = children[i];
	      compiler = new this.compiler(); // eslint-disable-line new-cap

	      var index = this.matchExistingProgram(child);

	      if (index == null) {
	        this.context.programs.push(''); // Placeholder to prevent name conflicts for nested children
	        index = this.context.programs.length;
	        child.index = index;
	        child.name = 'program' + index;
	        this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
	        this.context.environments[index] = child;

	        this.useDepths = this.useDepths || compiler.useDepths;
	        this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
	      } else {
	        child.index = index;
	        child.name = 'program' + index;

	        this.useDepths = this.useDepths || child.useDepths;
	        this.useBlockParams = this.useBlockParams || child.useBlockParams;
	      }
	    }
	  },
	  matchExistingProgram: function matchExistingProgram(child) {
	    for (var i = 0, len = this.context.environments.length; i < len; i++) {
	      var environment = this.context.environments[i];
	      if (environment && environment.equals(child)) {
	        return i;
	      }
	    }
	  },

	  programExpression: function programExpression(guid) {
	    var child = this.environment.children[guid],
	        programParams = [child.index, 'data', child.blockParams];

	    if (this.useBlockParams || this.useDepths) {
	      programParams.push('blockParams');
	    }
	    if (this.useDepths) {
	      programParams.push('depths');
	    }

	    return 'this.program(' + programParams.join(', ') + ')';
	  },

	  useRegister: function useRegister(name) {
	    if (!this.registers[name]) {
	      this.registers[name] = true;
	      this.registers.list.push(name);
	    }
	  },

	  push: function push(expr) {
	    if (!(expr instanceof Literal)) {
	      expr = this.source.wrap(expr);
	    }

	    this.inlineStack.push(expr);
	    return expr;
	  },

	  pushStackLiteral: function pushStackLiteral(item) {
	    this.push(new Literal(item));
	  },

	  pushSource: function pushSource(source) {
	    if (this.pendingContent) {
	      this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
	      this.pendingContent = undefined;
	    }

	    if (source) {
	      this.source.push(source);
	    }
	  },

	  replaceStack: function replaceStack(callback) {
	    var prefix = ['('],
	        stack = undefined,
	        createdStack = undefined,
	        usedLiteral = undefined;

	    /* istanbul ignore next */
	    if (!this.isInline()) {
	      throw new _Exception2['default']('replaceStack on non-inline');
	    }

	    // We want to merge the inline statement into the replacement statement via ','
	    var top = this.popStack(true);

	    if (top instanceof Literal) {
	      // Literals do not need to be inlined
	      stack = [top.value];
	      prefix = ['(', stack];
	      usedLiteral = true;
	    } else {
	      // Get or create the current stack name for use by the inline
	      createdStack = true;
	      var _name = this.incrStack();

	      prefix = ['((', this.push(_name), ' = ', top, ')'];
	      stack = this.topStack();
	    }

	    var item = callback.call(this, stack);

	    if (!usedLiteral) {
	      this.popStack();
	    }
	    if (createdStack) {
	      this.stackSlot--;
	    }
	    this.push(prefix.concat(item, ')'));
	  },

	  incrStack: function incrStack() {
	    this.stackSlot++;
	    if (this.stackSlot > this.stackVars.length) {
	      this.stackVars.push('stack' + this.stackSlot);
	    }
	    return this.topStackName();
	  },
	  topStackName: function topStackName() {
	    return 'stack' + this.stackSlot;
	  },
	  flushInline: function flushInline() {
	    var inlineStack = this.inlineStack;
	    this.inlineStack = [];
	    for (var i = 0, len = inlineStack.length; i < len; i++) {
	      var entry = inlineStack[i];
	      /* istanbul ignore if */
	      if (entry instanceof Literal) {
	        this.compileStack.push(entry);
	      } else {
	        var stack = this.incrStack();
	        this.pushSource([stack, ' = ', entry, ';']);
	        this.compileStack.push(stack);
	      }
	    }
	  },
	  isInline: function isInline() {
	    return this.inlineStack.length;
	  },

	  popStack: function popStack(wrapped) {
	    var inline = this.isInline(),
	        item = (inline ? this.inlineStack : this.compileStack).pop();

	    if (!wrapped && item instanceof Literal) {
	      return item.value;
	    } else {
	      if (!inline) {
	        /* istanbul ignore next */
	        if (!this.stackSlot) {
	          throw new _Exception2['default']('Invalid stack pop');
	        }
	        this.stackSlot--;
	      }
	      return item;
	    }
	  },

	  topStack: function topStack() {
	    var stack = this.isInline() ? this.inlineStack : this.compileStack,
	        item = stack[stack.length - 1];

	    /* istanbul ignore if */
	    if (item instanceof Literal) {
	      return item.value;
	    } else {
	      return item;
	    }
	  },

	  contextName: function contextName(context) {
	    if (this.useDepths && context) {
	      return 'depths[' + context + ']';
	    } else {
	      return 'depth' + context;
	    }
	  },

	  quotedString: function quotedString(str) {
	    return this.source.quotedString(str);
	  },

	  objectLiteral: function objectLiteral(obj) {
	    return this.source.objectLiteral(obj);
	  },

	  aliasable: function aliasable(name) {
	    var ret = this.aliases[name];
	    if (ret) {
	      ret.referenceCount++;
	      return ret;
	    }

	    ret = this.aliases[name] = this.source.wrap(name);
	    ret.aliasable = true;
	    ret.referenceCount = 1;

	    return ret;
	  },

	  setupHelper: function setupHelper(paramSize, name, blockHelper) {
	    var params = [],
	        paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
	    var foundHelper = this.nameLookup('helpers', name, 'helper');

	    return {
	      params: params,
	      paramsInit: paramsInit,
	      name: foundHelper,
	      callParams: [this.contextName(0)].concat(params)
	    };
	  },

	  setupParams: function setupParams(helper, paramSize, params) {
	    var options = {},
	        contexts = [],
	        types = [],
	        ids = [],
	        param = undefined;

	    options.name = this.quotedString(helper);
	    options.hash = this.popStack();

	    if (this.trackIds) {
	      options.hashIds = this.popStack();
	    }
	    if (this.stringParams) {
	      options.hashTypes = this.popStack();
	      options.hashContexts = this.popStack();
	    }

	    var inverse = this.popStack(),
	        program = this.popStack();

	    // Avoid setting fn and inverse if neither are set. This allows
	    // helpers to do a check for `if (options.fn)`
	    if (program || inverse) {
	      options.fn = program || 'this.noop';
	      options.inverse = inverse || 'this.noop';
	    }

	    // The parameters go on to the stack in order (making sure that they are evaluated in order)
	    // so we need to pop them off the stack in reverse order
	    var i = paramSize;
	    while (i--) {
	      param = this.popStack();
	      params[i] = param;

	      if (this.trackIds) {
	        ids[i] = this.popStack();
	      }
	      if (this.stringParams) {
	        types[i] = this.popStack();
	        contexts[i] = this.popStack();
	      }
	    }

	    if (this.trackIds) {
	      options.ids = this.source.generateArray(ids);
	    }
	    if (this.stringParams) {
	      options.types = this.source.generateArray(types);
	      options.contexts = this.source.generateArray(contexts);
	    }

	    if (this.options.data) {
	      options.data = 'data';
	    }
	    if (this.useBlockParams) {
	      options.blockParams = 'blockParams';
	    }
	    return options;
	  },

	  setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
	    var options = this.setupParams(helper, paramSize, params, true);
	    options = this.objectLiteral(options);
	    if (useRegister) {
	      this.useRegister('options');
	      params.push('options');
	      return ['options=', options];
	    } else {
	      params.push(options);
	      return '';
	    }
	  }
	};

	(function () {
	  var reservedWords = ('break else new var' + ' case finally return void' + ' catch for switch while' + ' continue function this with' + ' default if throw' + ' delete in try' + ' do instanceof typeof' + ' abstract enum int short' + ' boolean export interface static' + ' byte extends long super' + ' char final native synchronized' + ' class float package throws' + ' const goto private transient' + ' debugger implements protected volatile' + ' double import public let yield await' + ' null true false').split(' ');

	  var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

	  for (var i = 0, l = reservedWords.length; i < l; i++) {
	    compilerWords[reservedWords[i]] = true;
	  }
	})();

	JavaScriptCompiler.isValidJavaScriptVariableName = function (name) {
	  return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
	};

	function strictLookup(requireTerminal, compiler, parts, type) {
	  var stack = compiler.popStack(),
	      i = 0,
	      len = parts.length;
	  if (requireTerminal) {
	    len--;
	  }

	  for (; i < len; i++) {
	    stack = compiler.nameLookup(stack, parts[i], type);
	  }

	  if (requireTerminal) {
	    return [compiler.aliasable('this.strict'), '(', stack, ', ', compiler.quotedString(parts[i]), ')'];
	  } else {
	    return stack;
	  }
	}

	exports['default'] = JavaScriptCompiler;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(8)['default'];

	exports.__esModule = true;

	var _Exception = __webpack_require__(12);

	var _Exception2 = _interopRequireDefault(_Exception);

	var _AST = __webpack_require__(2);

	var _AST2 = _interopRequireDefault(_AST);

	function Visitor() {
	  this.parents = [];
	}

	Visitor.prototype = {
	  constructor: Visitor,
	  mutating: false,

	  // Visits a given value. If mutating, will replace the value if necessary.
	  acceptKey: function acceptKey(node, name) {
	    var value = this.accept(node[name]);
	    if (this.mutating) {
	      // Hacky sanity check:
	      if (value && (!value.type || !_AST2['default'][value.type])) {
	        throw new _Exception2['default']('Unexpected node type "' + value.type + '" found when accepting ' + name + ' on ' + node.type);
	      }
	      node[name] = value;
	    }
	  },

	  // Performs an accept operation with added sanity check to ensure
	  // required keys are not removed.
	  acceptRequired: function acceptRequired(node, name) {
	    this.acceptKey(node, name);

	    if (!node[name]) {
	      throw new _Exception2['default'](node.type + ' requires ' + name);
	    }
	  },

	  // Traverses a given array. If mutating, empty respnses will be removed
	  // for child elements.
	  acceptArray: function acceptArray(array) {
	    for (var i = 0, l = array.length; i < l; i++) {
	      this.acceptKey(array, i);

	      if (!array[i]) {
	        array.splice(i, 1);
	        i--;
	        l--;
	      }
	    }
	  },

	  accept: function accept(object) {
	    if (!object) {
	      return;
	    }

	    if (this.current) {
	      this.parents.unshift(this.current);
	    }
	    this.current = object;

	    var ret = this[object.type](object);

	    this.current = this.parents.shift();

	    if (!this.mutating || ret) {
	      return ret;
	    } else if (ret !== false) {
	      return object;
	    }
	  },

	  Program: function Program(program) {
	    this.acceptArray(program.body);
	  },

	  MustacheStatement: function MustacheStatement(mustache) {
	    this.acceptRequired(mustache, 'path');
	    this.acceptArray(mustache.params);
	    this.acceptKey(mustache, 'hash');
	  },

	  BlockStatement: function BlockStatement(block) {
	    this.acceptRequired(block, 'path');
	    this.acceptArray(block.params);
	    this.acceptKey(block, 'hash');

	    this.acceptKey(block, 'program');
	    this.acceptKey(block, 'inverse');
	  },

	  PartialStatement: function PartialStatement(partial) {
	    this.acceptRequired(partial, 'name');
	    this.acceptArray(partial.params);
	    this.acceptKey(partial, 'hash');
	  },

	  ContentStatement: function ContentStatement() {},
	  CommentStatement: function CommentStatement() {},

	  SubExpression: function SubExpression(sexpr) {
	    this.acceptRequired(sexpr, 'path');
	    this.acceptArray(sexpr.params);
	    this.acceptKey(sexpr, 'hash');
	  },

	  PathExpression: function PathExpression() {},

	  StringLiteral: function StringLiteral() {},
	  NumberLiteral: function NumberLiteral() {},
	  BooleanLiteral: function BooleanLiteral() {},
	  UndefinedLiteral: function UndefinedLiteral() {},
	  NullLiteral: function NullLiteral() {},

	  Hash: function Hash(hash) {
	    this.acceptArray(hash.pairs);
	  },
	  HashPair: function HashPair(pair) {
	    this.acceptRequired(pair, 'value');
	  }
	};

	exports['default'] = Visitor;
	module.exports = exports['default'];
	/* content */ /* comment */ /* path */ /* string */ /* number */ /* bool */ /* literal */ /* literal */

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	exports.__esModule = true;
	/*global window */

	exports['default'] = function (Handlebars) {
	  /* istanbul ignore next */
	  var root = typeof global !== 'undefined' ? global : window,
	      $Handlebars = root.Handlebars;
	  /* istanbul ignore next */
	  Handlebars.noConflict = function () {
	    if (root.Handlebars === Handlebars) {
	      root.Handlebars = $Handlebars;
	    }
	  };
	};

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports["default"] = function (obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};

	    if (typeof obj === "object" && obj !== null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }

	    newObj["default"] = obj;
	    return newObj;
	  }
	};

	exports.__esModule = true;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(8)['default'];

	exports.__esModule = true;
	exports.HandlebarsEnvironment = HandlebarsEnvironment;
	exports.createFrame = createFrame;

	var _import = __webpack_require__(13);

	var Utils = _interopRequireWildcard(_import);

	var _Exception = __webpack_require__(12);

	var _Exception2 = _interopRequireDefault(_Exception);

	var VERSION = '3.0.1';
	exports.VERSION = VERSION;
	var COMPILER_REVISION = 6;

	exports.COMPILER_REVISION = COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '== 1.x.x',
	  5: '== 2.0.0-alpha.x',
	  6: '>= 2.0.0-beta.1'
	};

	exports.REVISION_CHANGES = REVISION_CHANGES;
	var isArray = Utils.isArray,
	    isFunction = Utils.isFunction,
	    toString = Utils.toString,
	    objectType = '[object Object]';

	function HandlebarsEnvironment(helpers, partials) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};

	  registerDefaultHelpers(this);
	}

	HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,

	  logger: logger,
	  log: log,

	  registerHelper: function registerHelper(name, fn) {
	    if (toString.call(name) === objectType) {
	      if (fn) {
	        throw new _Exception2['default']('Arg not supported with multiple helpers');
	      }
	      Utils.extend(this.helpers, name);
	    } else {
	      this.helpers[name] = fn;
	    }
	  },
	  unregisterHelper: function unregisterHelper(name) {
	    delete this.helpers[name];
	  },

	  registerPartial: function registerPartial(name, partial) {
	    if (toString.call(name) === objectType) {
	      Utils.extend(this.partials, name);
	    } else {
	      if (typeof partial === 'undefined') {
	        throw new _Exception2['default']('Attempting to register a partial as undefined');
	      }
	      this.partials[name] = partial;
	    }
	  },
	  unregisterPartial: function unregisterPartial(name) {
	    delete this.partials[name];
	  }
	};

	function registerDefaultHelpers(instance) {
	  instance.registerHelper('helperMissing', function () {
	    if (arguments.length === 1) {
	      // A missing field in a {{foo}} constuct.
	      return undefined;
	    } else {
	      // Someone is actually trying to call something, blow up.
	      throw new _Exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
	    }
	  });

	  instance.registerHelper('blockHelperMissing', function (context, options) {
	    var inverse = options.inverse,
	        fn = options.fn;

	    if (context === true) {
	      return fn(this);
	    } else if (context === false || context == null) {
	      return inverse(this);
	    } else if (isArray(context)) {
	      if (context.length > 0) {
	        if (options.ids) {
	          options.ids = [options.name];
	        }

	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      if (options.data && options.ids) {
	        var data = createFrame(options.data);
	        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
	        options = { data: data };
	      }

	      return fn(context, options);
	    }
	  });

	  instance.registerHelper('each', function (context, options) {
	    if (!options) {
	      throw new _Exception2['default']('Must pass iterator to #each');
	    }

	    var fn = options.fn,
	        inverse = options.inverse,
	        i = 0,
	        ret = '',
	        data = undefined,
	        contextPath = undefined;

	    if (options.data && options.ids) {
	      contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
	    }

	    if (isFunction(context)) {
	      context = context.call(this);
	    }

	    if (options.data) {
	      data = createFrame(options.data);
	    }

	    function execIteration(field, index, last) {
	      if (data) {
	        data.key = field;
	        data.index = index;
	        data.first = index === 0;
	        data.last = !!last;

	        if (contextPath) {
	          data.contextPath = contextPath + field;
	        }
	      }

	      ret = ret + fn(context[field], {
	        data: data,
	        blockParams: Utils.blockParams([context[field], field], [contextPath + field, null])
	      });
	    }

	    if (context && typeof context === 'object') {
	      if (isArray(context)) {
	        for (var j = context.length; i < j; i++) {
	          execIteration(i, i, i === context.length - 1);
	        }
	      } else {
	        var priorKey = undefined;

	        for (var key in context) {
	          if (context.hasOwnProperty(key)) {
	            // We're running the iterations one step out of sync so we can detect
	            // the last iteration without have to scan the object twice and create
	            // an itermediate keys array.
	            if (priorKey) {
	              execIteration(priorKey, i - 1);
	            }
	            priorKey = key;
	            i++;
	          }
	        }
	        if (priorKey) {
	          execIteration(priorKey, i - 1, true);
	        }
	      }
	    }

	    if (i === 0) {
	      ret = inverse(this);
	    }

	    return ret;
	  });

	  instance.registerHelper('if', function (conditional, options) {
	    if (isFunction(conditional)) {
	      conditional = conditional.call(this);
	    }

	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if (!options.hash.includeZero && !conditional || Utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });

	  instance.registerHelper('unless', function (conditional, options) {
	    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
	  });

	  instance.registerHelper('with', function (context, options) {
	    if (isFunction(context)) {
	      context = context.call(this);
	    }

	    var fn = options.fn;

	    if (!Utils.isEmpty(context)) {
	      if (options.data && options.ids) {
	        var data = createFrame(options.data);
	        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
	        options = { data: data };
	      }

	      return fn(context, options);
	    } else {
	      return options.inverse(this);
	    }
	  });

	  instance.registerHelper('log', function (message, options) {
	    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
	    instance.log(level, message);
	  });

	  instance.registerHelper('lookup', function (obj, field) {
	    return obj && obj[field];
	  });
	}

	var logger = {
	  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

	  // State enum
	  DEBUG: 0,
	  INFO: 1,
	  WARN: 2,
	  ERROR: 3,
	  level: 1,

	  // Can be overridden in the host environment
	  log: function log(level, message) {
	    if (typeof console !== 'undefined' && logger.level <= level) {
	      var method = logger.methodMap[level];
	      (console[method] || console.log).call(console, message); // eslint-disable-line no-console
	    }
	  }
	};

	exports.logger = logger;
	var log = logger.log;

	exports.log = log;

	function createFrame(object) {
	  var frame = Utils.extend({}, object);
	  frame._parent = object;
	  return frame;
	}

	/* [args, ]options */

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	// Build out our basic SafeString type
	function SafeString(string) {
	  this.string = string;
	}

	SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
	  return '' + this.string;
	};

	exports['default'] = SafeString;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

	function Exception(message, node) {
	  var loc = node && node.loc,
	      line = undefined,
	      column = undefined;
	  if (loc) {
	    line = loc.start.line;
	    column = loc.start.column;

	    message += ' - ' + line + ':' + column;
	  }

	  var tmp = Error.prototype.constructor.call(this, message);

	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }

	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, Exception);
	  }

	  if (loc) {
	    this.lineNumber = line;
	    this.column = column;
	  }
	}

	Exception.prototype = new Error();

	exports['default'] = Exception;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.extend = extend;

	// Older IE versions do not directly support indexOf so we must implement our own, sadly.
	exports.indexOf = indexOf;
	exports.escapeExpression = escapeExpression;
	exports.isEmpty = isEmpty;
	exports.blockParams = blockParams;
	exports.appendContextPath = appendContextPath;
	var escape = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  '\'': '&#x27;',
	  '`': '&#x60;'
	};

	var badChars = /[&<>"'`]/g,
	    possible = /[&<>"'`]/;

	function escapeChar(chr) {
	  return escape[chr];
	}

	function extend(obj /* , ...source */) {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }

	  return obj;
	}

	var toString = Object.prototype.toString;

	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	/*eslint-disable func-style, no-var */
	var isFunction = function isFunction(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	/* istanbul ignore next */
	if (isFunction(/x/)) {
	  exports.isFunction = isFunction = function (value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	var isFunction;
	exports.isFunction = isFunction;
	/*eslint-enable func-style, no-var */

	/* istanbul ignore next */
	var isArray = Array.isArray || function (value) {
	  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
	};exports.isArray = isArray;

	function indexOf(array, value) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    if (array[i] === value) {
	      return i;
	    }
	  }
	  return -1;
	}

	function escapeExpression(string) {
	  if (typeof string !== 'string') {
	    // don't escape SafeStrings, since they're already safe
	    if (string && string.toHTML) {
	      return string.toHTML();
	    } else if (string == null) {
	      return '';
	    } else if (!string) {
	      return string + '';
	    }

	    // Force a string conversion as this will be done by the append regardless and
	    // the regex test will do this transparently behind the scenes, causing issues if
	    // an object's to string has escaped characters in it.
	    string = '' + string;
	  }

	  if (!possible.test(string)) {
	    return string;
	  }
	  return string.replace(badChars, escapeChar);
	}

	function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}

	function blockParams(params, ids) {
	  params.path = ids;
	  return params;
	}

	function appendContextPath(contextPath, id) {
	  return (contextPath ? contextPath + '.' : '') + id;
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = __webpack_require__(9)['default'];

	var _interopRequireDefault = __webpack_require__(8)['default'];

	exports.__esModule = true;
	exports.checkRevision = checkRevision;

	// TODO: Remove this line and break up compilePartial

	exports.template = template;
	exports.wrapProgram = wrapProgram;
	exports.resolvePartial = resolvePartial;
	exports.invokePartial = invokePartial;
	exports.noop = noop;

	var _import = __webpack_require__(13);

	var Utils = _interopRequireWildcard(_import);

	var _Exception = __webpack_require__(12);

	var _Exception2 = _interopRequireDefault(_Exception);

	var _COMPILER_REVISION$REVISION_CHANGES$createFrame = __webpack_require__(10);

	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = _COMPILER_REVISION$REVISION_CHANGES$createFrame.COMPILER_REVISION;

	  if (compilerRevision !== currentRevision) {
	    if (compilerRevision < currentRevision) {
	      var runtimeVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[currentRevision],
	          compilerVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[compilerRevision];
	      throw new _Exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
	    } else {
	      // Use the embedded version info since the runtime doesn't know about this revision yet
	      throw new _Exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
	    }
	  }
	}

	function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new _Exception2['default']('No environment passed to template');
	  }
	  if (!templateSpec || !templateSpec.main) {
	    throw new _Exception2['default']('Unknown template object: ' + typeof templateSpec);
	  }

	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as psuedo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);

	  function invokePartialWrapper(partial, context, options) {
	    if (options.hash) {
	      context = Utils.extend({}, context, options.hash);
	    }

	    partial = env.VM.resolvePartial.call(this, partial, context, options);
	    var result = env.VM.invokePartial.call(this, partial, context, options);

	    if (result == null && env.compile) {
	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
	      result = options.partials[options.name](context, options);
	    }
	    if (result != null) {
	      if (options.indent) {
	        var lines = result.split('\n');
	        for (var i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;
	          }

	          lines[i] = options.indent + lines[i];
	        }
	        result = lines.join('\n');
	      }
	      return result;
	    } else {
	      throw new _Exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
	    }
	  }

	  // Just add water
	  var container = {
	    strict: function strict(obj, name) {
	      if (!(name in obj)) {
	        throw new _Exception2['default']('"' + name + '" not defined in ' + obj);
	      }
	      return obj[name];
	    },
	    lookup: function lookup(depths, name) {
	      var len = depths.length;
	      for (var i = 0; i < len; i++) {
	        if (depths[i] && depths[i][name] != null) {
	          return depths[i][name];
	        }
	      }
	    },
	    lambda: function lambda(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;
	    },

	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,

	    fn: function fn(i) {
	      return templateSpec[i];
	    },

	    programs: [],
	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
	      var programWrapper = this.programs[i],
	          fn = this.fn(i);
	      if (data || depths || blockParams || declaredBlockParams) {
	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
	      }
	      return programWrapper;
	    },

	    data: function data(value, depth) {
	      while (value && depth--) {
	        value = value._parent;
	      }
	      return value;
	    },
	    merge: function merge(param, common) {
	      var obj = param || common;

	      if (param && common && param !== common) {
	        obj = Utils.extend({}, common, param);
	      }

	      return obj;
	    },

	    noop: env.VM.noop,
	    compilerInfo: templateSpec.compiler
	  };

	  function ret(context) {
	    var options = arguments[1] === undefined ? {} : arguments[1];

	    var data = options.data;

	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);
	    }
	    var depths = undefined,
	        blockParams = templateSpec.useBlockParams ? [] : undefined;
	    if (templateSpec.useDepths) {
	      depths = options.depths ? [context].concat(options.depths) : [context];
	    }

	    return templateSpec.main.call(container, context, container.helpers, container.partials, data, blockParams, depths);
	  }
	  ret.isTop = true;

	  ret._setup = function (options) {
	    if (!options.partial) {
	      container.helpers = container.merge(options.helpers, env.helpers);

	      if (templateSpec.usePartial) {
	        container.partials = container.merge(options.partials, env.partials);
	      }
	    } else {
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	    }
	  };

	  ret._child = function (i, data, blockParams, depths) {
	    if (templateSpec.useBlockParams && !blockParams) {
	      throw new _Exception2['default']('must pass block params');
	    }
	    if (templateSpec.useDepths && !depths) {
	      throw new _Exception2['default']('must pass parent depths');
	    }

	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
	  };
	  return ret;
	}

	function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
	  function prog(context) {
	    var options = arguments[1] === undefined ? {} : arguments[1];

	    return fn.call(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), depths && [context].concat(depths));
	  }
	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  prog.blockParams = declaredBlockParams || 0;
	  return prog;
	}

	function resolvePartial(partial, context, options) {
	  if (!partial) {
	    partial = options.partials[options.name];
	  } else if (!partial.call && !options.name) {
	    // This is a dynamic partial that returned a string
	    options.name = partial;
	    partial = options.partials[partial];
	  }
	  return partial;
	}

	function invokePartial(partial, context, options) {
	  options.partial = true;

	  if (partial === undefined) {
	    throw new _Exception2['default']('The partial ' + options.name + ' could not be found');
	  } else if (partial instanceof Function) {
	    return partial(context, options);
	  }
	}

	function noop() {
	  return '';
	}

	function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? _COMPILER_REVISION$REVISION_CHANGES$createFrame.createFrame(data) : {};
	    data.root = context;
	  }
	  return data;
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;
	/* istanbul ignore next */
	/* Jison generated parser */
	var handlebars = (function () {
	    var parser = { trace: function trace() {},
	        yy: {},
	        symbols_: { error: 2, root: 3, program: 4, EOF: 5, program_repetition0: 6, statement: 7, mustache: 8, block: 9, rawBlock: 10, partial: 11, content: 12, COMMENT: 13, CONTENT: 14, openRawBlock: 15, END_RAW_BLOCK: 16, OPEN_RAW_BLOCK: 17, helperName: 18, openRawBlock_repetition0: 19, openRawBlock_option0: 20, CLOSE_RAW_BLOCK: 21, openBlock: 22, block_option0: 23, closeBlock: 24, openInverse: 25, block_option1: 26, OPEN_BLOCK: 27, openBlock_repetition0: 28, openBlock_option0: 29, openBlock_option1: 30, CLOSE: 31, OPEN_INVERSE: 32, openInverse_repetition0: 33, openInverse_option0: 34, openInverse_option1: 35, openInverseChain: 36, OPEN_INVERSE_CHAIN: 37, openInverseChain_repetition0: 38, openInverseChain_option0: 39, openInverseChain_option1: 40, inverseAndProgram: 41, INVERSE: 42, inverseChain: 43, inverseChain_option0: 44, OPEN_ENDBLOCK: 45, OPEN: 46, mustache_repetition0: 47, mustache_option0: 48, OPEN_UNESCAPED: 49, mustache_repetition1: 50, mustache_option1: 51, CLOSE_UNESCAPED: 52, OPEN_PARTIAL: 53, partialName: 54, partial_repetition0: 55, partial_option0: 56, param: 57, sexpr: 58, OPEN_SEXPR: 59, sexpr_repetition0: 60, sexpr_option0: 61, CLOSE_SEXPR: 62, hash: 63, hash_repetition_plus0: 64, hashSegment: 65, ID: 66, EQUALS: 67, blockParams: 68, OPEN_BLOCK_PARAMS: 69, blockParams_repetition_plus0: 70, CLOSE_BLOCK_PARAMS: 71, path: 72, dataName: 73, STRING: 74, NUMBER: 75, BOOLEAN: 76, UNDEFINED: 77, NULL: 78, DATA: 79, pathSegments: 80, SEP: 81, $accept: 0, $end: 1 },
	        terminals_: { 2: "error", 5: "EOF", 13: "COMMENT", 14: "CONTENT", 16: "END_RAW_BLOCK", 17: "OPEN_RAW_BLOCK", 21: "CLOSE_RAW_BLOCK", 27: "OPEN_BLOCK", 31: "CLOSE", 32: "OPEN_INVERSE", 37: "OPEN_INVERSE_CHAIN", 42: "INVERSE", 45: "OPEN_ENDBLOCK", 46: "OPEN", 49: "OPEN_UNESCAPED", 52: "CLOSE_UNESCAPED", 53: "OPEN_PARTIAL", 59: "OPEN_SEXPR", 62: "CLOSE_SEXPR", 66: "ID", 67: "EQUALS", 69: "OPEN_BLOCK_PARAMS", 71: "CLOSE_BLOCK_PARAMS", 74: "STRING", 75: "NUMBER", 76: "BOOLEAN", 77: "UNDEFINED", 78: "NULL", 79: "DATA", 81: "SEP" },
	        productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [12, 1], [10, 3], [15, 5], [9, 4], [9, 4], [22, 6], [25, 6], [36, 6], [41, 2], [43, 3], [43, 1], [24, 3], [8, 5], [8, 5], [11, 5], [57, 1], [57, 1], [58, 5], [63, 1], [65, 3], [68, 3], [18, 1], [18, 1], [18, 1], [18, 1], [18, 1], [18, 1], [18, 1], [54, 1], [54, 1], [73, 2], [72, 1], [80, 3], [80, 1], [6, 0], [6, 2], [19, 0], [19, 2], [20, 0], [20, 1], [23, 0], [23, 1], [26, 0], [26, 1], [28, 0], [28, 2], [29, 0], [29, 1], [30, 0], [30, 1], [33, 0], [33, 2], [34, 0], [34, 1], [35, 0], [35, 1], [38, 0], [38, 2], [39, 0], [39, 1], [40, 0], [40, 1], [44, 0], [44, 1], [47, 0], [47, 2], [48, 0], [48, 1], [50, 0], [50, 2], [51, 0], [51, 1], [55, 0], [55, 2], [56, 0], [56, 1], [60, 0], [60, 2], [61, 0], [61, 1], [64, 1], [64, 2], [70, 1], [70, 2]],
	        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {

	            var $0 = $$.length - 1;
	            switch (yystate) {
	                case 1:
	                    return $$[$0 - 1];
	                    break;
	                case 2:
	                    this.$ = new yy.Program($$[$0], null, {}, yy.locInfo(this._$));
	                    break;
	                case 3:
	                    this.$ = $$[$0];
	                    break;
	                case 4:
	                    this.$ = $$[$0];
	                    break;
	                case 5:
	                    this.$ = $$[$0];
	                    break;
	                case 6:
	                    this.$ = $$[$0];
	                    break;
	                case 7:
	                    this.$ = $$[$0];
	                    break;
	                case 8:
	                    this.$ = new yy.CommentStatement(yy.stripComment($$[$0]), yy.stripFlags($$[$0], $$[$0]), yy.locInfo(this._$));
	                    break;
	                case 9:
	                    this.$ = new yy.ContentStatement($$[$0], yy.locInfo(this._$));
	                    break;
	                case 10:
	                    this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
	                    break;
	                case 11:
	                    this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1] };
	                    break;
	                case 12:
	                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
	                    break;
	                case 13:
	                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
	                    break;
	                case 14:
	                    this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
	                    break;
	                case 15:
	                    this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
	                    break;
	                case 16:
	                    this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
	                    break;
	                case 17:
	                    this.$ = { strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]), program: $$[$0] };
	                    break;
	                case 18:
	                    var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$),
	                        program = new yy.Program([inverse], null, {}, yy.locInfo(this._$));
	                    program.chained = true;

	                    this.$ = { strip: $$[$0 - 2].strip, program: program, chain: true };

	                    break;
	                case 19:
	                    this.$ = $$[$0];
	                    break;
	                case 20:
	                    this.$ = { path: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 2], $$[$0]) };
	                    break;
	                case 21:
	                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
	                    break;
	                case 22:
	                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
	                    break;
	                case 23:
	                    this.$ = new yy.PartialStatement($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], yy.stripFlags($$[$0 - 4], $$[$0]), yy.locInfo(this._$));
	                    break;
	                case 24:
	                    this.$ = $$[$0];
	                    break;
	                case 25:
	                    this.$ = $$[$0];
	                    break;
	                case 26:
	                    this.$ = new yy.SubExpression($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], yy.locInfo(this._$));
	                    break;
	                case 27:
	                    this.$ = new yy.Hash($$[$0], yy.locInfo(this._$));
	                    break;
	                case 28:
	                    this.$ = new yy.HashPair(yy.id($$[$0 - 2]), $$[$0], yy.locInfo(this._$));
	                    break;
	                case 29:
	                    this.$ = yy.id($$[$0 - 1]);
	                    break;
	                case 30:
	                    this.$ = $$[$0];
	                    break;
	                case 31:
	                    this.$ = $$[$0];
	                    break;
	                case 32:
	                    this.$ = new yy.StringLiteral($$[$0], yy.locInfo(this._$));
	                    break;
	                case 33:
	                    this.$ = new yy.NumberLiteral($$[$0], yy.locInfo(this._$));
	                    break;
	                case 34:
	                    this.$ = new yy.BooleanLiteral($$[$0], yy.locInfo(this._$));
	                    break;
	                case 35:
	                    this.$ = new yy.UndefinedLiteral(yy.locInfo(this._$));
	                    break;
	                case 36:
	                    this.$ = new yy.NullLiteral(yy.locInfo(this._$));
	                    break;
	                case 37:
	                    this.$ = $$[$0];
	                    break;
	                case 38:
	                    this.$ = $$[$0];
	                    break;
	                case 39:
	                    this.$ = yy.preparePath(true, $$[$0], this._$);
	                    break;
	                case 40:
	                    this.$ = yy.preparePath(false, $$[$0], this._$);
	                    break;
	                case 41:
	                    $$[$0 - 2].push({ part: yy.id($$[$0]), original: $$[$0], separator: $$[$0 - 1] });this.$ = $$[$0 - 2];
	                    break;
	                case 42:
	                    this.$ = [{ part: yy.id($$[$0]), original: $$[$0] }];
	                    break;
	                case 43:
	                    this.$ = [];
	                    break;
	                case 44:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 45:
	                    this.$ = [];
	                    break;
	                case 46:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 53:
	                    this.$ = [];
	                    break;
	                case 54:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 59:
	                    this.$ = [];
	                    break;
	                case 60:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 65:
	                    this.$ = [];
	                    break;
	                case 66:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 73:
	                    this.$ = [];
	                    break;
	                case 74:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 77:
	                    this.$ = [];
	                    break;
	                case 78:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 81:
	                    this.$ = [];
	                    break;
	                case 82:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 85:
	                    this.$ = [];
	                    break;
	                case 86:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 89:
	                    this.$ = [$$[$0]];
	                    break;
	                case 90:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 91:
	                    this.$ = [$$[$0]];
	                    break;
	                case 92:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	            }
	        },
	        table: [{ 3: 1, 4: 2, 5: [2, 43], 6: 3, 13: [2, 43], 14: [2, 43], 17: [2, 43], 27: [2, 43], 32: [2, 43], 46: [2, 43], 49: [2, 43], 53: [2, 43] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: [1, 11], 14: [1, 18], 15: 16, 17: [1, 21], 22: 14, 25: 15, 27: [1, 19], 32: [1, 20], 37: [2, 2], 42: [2, 2], 45: [2, 2], 46: [1, 12], 49: [1, 13], 53: [1, 17] }, { 1: [2, 1] }, { 5: [2, 44], 13: [2, 44], 14: [2, 44], 17: [2, 44], 27: [2, 44], 32: [2, 44], 37: [2, 44], 42: [2, 44], 45: [2, 44], 46: [2, 44], 49: [2, 44], 53: [2, 44] }, { 5: [2, 3], 13: [2, 3], 14: [2, 3], 17: [2, 3], 27: [2, 3], 32: [2, 3], 37: [2, 3], 42: [2, 3], 45: [2, 3], 46: [2, 3], 49: [2, 3], 53: [2, 3] }, { 5: [2, 4], 13: [2, 4], 14: [2, 4], 17: [2, 4], 27: [2, 4], 32: [2, 4], 37: [2, 4], 42: [2, 4], 45: [2, 4], 46: [2, 4], 49: [2, 4], 53: [2, 4] }, { 5: [2, 5], 13: [2, 5], 14: [2, 5], 17: [2, 5], 27: [2, 5], 32: [2, 5], 37: [2, 5], 42: [2, 5], 45: [2, 5], 46: [2, 5], 49: [2, 5], 53: [2, 5] }, { 5: [2, 6], 13: [2, 6], 14: [2, 6], 17: [2, 6], 27: [2, 6], 32: [2, 6], 37: [2, 6], 42: [2, 6], 45: [2, 6], 46: [2, 6], 49: [2, 6], 53: [2, 6] }, { 5: [2, 7], 13: [2, 7], 14: [2, 7], 17: [2, 7], 27: [2, 7], 32: [2, 7], 37: [2, 7], 42: [2, 7], 45: [2, 7], 46: [2, 7], 49: [2, 7], 53: [2, 7] }, { 5: [2, 8], 13: [2, 8], 14: [2, 8], 17: [2, 8], 27: [2, 8], 32: [2, 8], 37: [2, 8], 42: [2, 8], 45: [2, 8], 46: [2, 8], 49: [2, 8], 53: [2, 8] }, { 18: 22, 66: [1, 32], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 28], 78: [1, 29], 79: [1, 31], 80: 30 }, { 18: 33, 66: [1, 32], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 28], 78: [1, 29], 79: [1, 31], 80: 30 }, { 4: 34, 6: 3, 13: [2, 43], 14: [2, 43], 17: [2, 43], 27: [2, 43], 32: [2, 43], 37: [2, 43], 42: [2, 43], 45: [2, 43], 46: [2, 43], 49: [2, 43], 53: [2, 43] }, { 4: 35, 6: 3, 13: [2, 43], 14: [2, 43], 17: [2, 43], 27: [2, 43], 32: [2, 43], 42: [2, 43], 45: [2, 43], 46: [2, 43], 49: [2, 43], 53: [2, 43] }, { 12: 36, 14: [1, 18] }, { 18: 38, 54: 37, 58: 39, 59: [1, 40], 66: [1, 32], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 28], 78: [1, 29], 79: [1, 31], 80: 30 }, { 5: [2, 9], 13: [2, 9], 14: [2, 9], 16: [2, 9], 17: [2, 9], 27: [2, 9], 32: [2, 9], 37: [2, 9], 42: [2, 9], 45: [2, 9], 46: [2, 9], 49: [2, 9], 53: [2, 9] }, { 18: 41, 66: [1, 32], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 28], 78: [1, 29], 79: [1, 31], 80: 30 }, { 18: 42, 66: [1, 32], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 28], 78: [1, 29], 79: [1, 31], 80: 30 }, { 18: 43, 66: [1, 32], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 28], 78: [1, 29], 79: [1, 31], 80: 30 }, { 31: [2, 73], 47: 44, 59: [2, 73], 66: [2, 73], 74: [2, 73], 75: [2, 73], 76: [2, 73], 77: [2, 73], 78: [2, 73], 79: [2, 73] }, { 21: [2, 30], 31: [2, 30], 52: [2, 30], 59: [2, 30], 62: [2, 30], 66: [2, 30], 69: [2, 30], 74: [2, 30], 75: [2, 30], 76: [2, 30], 77: [2, 30], 78: [2, 30], 79: [2, 30] }, { 21: [2, 31], 31: [2, 31], 52: [2, 31], 59: [2, 31], 62: [2, 31], 66: [2, 31], 69: [2, 31], 74: [2, 31], 75: [2, 31], 76: [2, 31], 77: [2, 31], 78: [2, 31], 79: [2, 31] }, { 21: [2, 32], 31: [2, 32], 52: [2, 32], 59: [2, 32], 62: [2, 32], 66: [2, 32], 69: [2, 32], 74: [2, 32], 75: [2, 32], 76: [2, 32], 77: [2, 32], 78: [2, 32], 79: [2, 32] }, { 21: [2, 33], 31: [2, 33], 52: [2, 33], 59: [2, 33], 62: [2, 33], 66: [2, 33], 69: [2, 33], 74: [2, 33], 75: [2, 33], 76: [2, 33], 77: [2, 33], 78: [2, 33], 79: [2, 33] }, { 21: [2, 34], 31: [2, 34], 52: [2, 34], 59: [2, 34], 62: [2, 34], 66: [2, 34], 69: [2, 34], 74: [2, 34], 75: [2, 34], 76: [2, 34], 77: [2, 34], 78: [2, 34], 79: [2, 34] }, { 21: [2, 35], 31: [2, 35], 52: [2, 35], 59: [2, 35], 62: [2, 35], 66: [2, 35], 69: [2, 35], 74: [2, 35], 75: [2, 35], 76: [2, 35], 77: [2, 35], 78: [2, 35], 79: [2, 35] }, { 21: [2, 36], 31: [2, 36], 52: [2, 36], 59: [2, 36], 62: [2, 36], 66: [2, 36], 69: [2, 36], 74: [2, 36], 75: [2, 36], 76: [2, 36], 77: [2, 36], 78: [2, 36], 79: [2, 36] }, { 21: [2, 40], 31: [2, 40], 52: [2, 40], 59: [2, 40], 62: [2, 40], 66: [2, 40], 69: [2, 40], 74: [2, 40], 75: [2, 40], 76: [2, 40], 77: [2, 40], 78: [2, 40], 79: [2, 40], 81: [1, 45] }, { 66: [1, 32], 80: 46 }, { 21: [2, 42], 31: [2, 42], 52: [2, 42], 59: [2, 42], 62: [2, 42], 66: [2, 42], 69: [2, 42], 74: [2, 42], 75: [2, 42], 76: [2, 42], 77: [2, 42], 78: [2, 42], 79: [2, 42], 81: [2, 42] }, { 50: 47, 52: [2, 77], 59: [2, 77], 66: [2, 77], 74: [2, 77], 75: [2, 77], 76: [2, 77], 77: [2, 77], 78: [2, 77], 79: [2, 77] }, { 23: 48, 36: 50, 37: [1, 52], 41: 51, 42: [1, 53], 43: 49, 45: [2, 49] }, { 26: 54, 41: 55, 42: [1, 53], 45: [2, 51] }, { 16: [1, 56] }, { 31: [2, 81], 55: 57, 59: [2, 81], 66: [2, 81], 74: [2, 81], 75: [2, 81], 76: [2, 81], 77: [2, 81], 78: [2, 81], 79: [2, 81] }, { 31: [2, 37], 59: [2, 37], 66: [2, 37], 74: [2, 37], 75: [2, 37], 76: [2, 37], 77: [2, 37], 78: [2, 37], 79: [2, 37] }, { 31: [2, 38], 59: [2, 38], 66: [2, 38], 74: [2, 38], 75: [2, 38], 76: [2, 38], 77: [2, 38], 78: [2, 38], 79: [2, 38] }, { 18: 58, 66: [1, 32], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 28], 78: [1, 29], 79: [1, 31], 80: 30 }, { 28: 59, 31: [2, 53], 59: [2, 53], 66: [2, 53], 69: [2, 53], 74: [2, 53], 75: [2, 53], 76: [2, 53], 77: [2, 53], 78: [2, 53], 79: [2, 53] }, { 31: [2, 59], 33: 60, 59: [2, 59], 66: [2, 59], 69: [2, 59], 74: [2, 59], 75: [2, 59], 76: [2, 59], 77: [2, 59], 78: [2, 59], 79: [2, 59] }, { 19: 61, 21: [2, 45], 59: [2, 45], 66: [2, 45], 74: [2, 45], 75: [2, 45], 76: [2, 45], 77: [2, 45], 78: [2, 45], 79: [2, 45] }, { 18: 65, 31: [2, 75], 48: 62, 57: 63, 58: 66, 59: [1, 40], 63: 64, 64: 67, 65: 68, 66: [1, 69], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 28], 78: [1, 29], 79: [1, 31], 80: 30 }, { 66: [1, 70] }, { 21: [2, 39], 31: [2, 39], 52: [2, 39], 59: [2, 39], 62: [2, 39], 66: [2, 39], 69: [2, 39], 74: [2, 39], 75: [2, 39], 76: [2, 39], 77: [2, 39], 78: [2, 39], 79: [2, 39], 81: [1, 45] }, { 18: 65, 51: 71, 52: [2, 79], 57: 72, 58: 66, 59: [1, 40], 63: 73, 64: 67, 65: 68, 66: [1, 69], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 28], 78: [1, 29], 79: [1, 31], 80: 30 }, { 24: 74, 45: [1, 75] }, { 45: [2, 50] }, { 4: 76, 6: 3, 13: [2, 43], 14: [2, 43], 17: [2, 43], 27: [2, 43], 32: [2, 43], 37: [2, 43], 42: [2, 43], 45: [2, 43], 46: [2, 43], 49: [2, 43], 53: [2, 43] }, { 45: [2, 19] }, { 18: 77, 66: [1, 32], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 28], 78: [1, 29], 79: [1, 31], 80: 30 }, { 4: 78, 6: 3, 13: [2, 43], 14: [2, 43], 17: [2, 43], 27: [2, 43], 32: [2, 43], 45: [2, 43], 46: [2, 43], 49: [2, 43], 53: [2, 43] }, { 24: 79, 45: [1, 75] }, { 45: [2, 52] }, { 5: [2, 10], 13: [2, 10], 14: [2, 10], 17: [2, 10], 27: [2, 10], 32: [2, 10], 37: [2, 10], 42: [2, 10], 45: [2, 10], 46: [2, 10], 49: [2, 10], 53: [2, 10] }, { 18: 65, 31: [2, 83], 56: 80, 57: 81, 58: 66, 59: [1, 40], 63: 82, 64: 67, 65: 68, 66: [1, 69], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 28], 78: [1, 29], 79: [1, 31], 80: 30 }, { 59: [2, 85], 60: 83, 62: [2, 85], 66: [2, 85], 74: [2, 85], 75: [2, 85], 76: [2, 85], 77: [2, 85], 78: [2, 85], 79: [2, 85] }, { 18: 65, 29: 84, 31: [2, 55], 57: 85, 58: 66, 59: [1, 40], 63: 86, 64: 67, 65: 68, 66: [1, 69], 69: [2, 55], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 28], 78: [1, 29], 79: [1, 31], 80: 30 }, { 18: 65, 31: [2, 61], 34: 87, 57: 88, 58: 66, 59: [1, 40], 63: 89, 64: 67, 65: 68, 66: [1, 69], 69: [2, 61], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 28], 78: [1, 29], 79: [1, 31], 80: 30 }, { 18: 65, 20: 90, 21: [2, 47], 57: 91, 58: 66, 59: [1, 40], 63: 92, 64: 67, 65: 68, 66: [1, 69], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 28], 78: [1, 29], 79: [1, 31], 80: 30 }, { 31: [1, 93] }, { 31: [2, 74], 59: [2, 74], 66: [2, 74], 74: [2, 74], 75: [2, 74], 76: [2, 74], 77: [2, 74], 78: [2, 74], 79: [2, 74] }, { 31: [2, 76] }, { 21: [2, 24], 31: [2, 24], 52: [2, 24], 59: [2, 24], 62: [2, 24], 66: [2, 24], 69: [2, 24], 74: [2, 24], 75: [2, 24], 76: [2, 24], 77: [2, 24], 78: [2, 24], 79: [2, 24] }, { 21: [2, 25], 31: [2, 25], 52: [2, 25], 59: [2, 25], 62: [2, 25], 66: [2, 25], 69: [2, 25], 74: [2, 25], 75: [2, 25], 76: [2, 25], 77: [2, 25], 78: [2, 25], 79: [2, 25] }, { 21: [2, 27], 31: [2, 27], 52: [2, 27], 62: [2, 27], 65: 94, 66: [1, 95], 69: [2, 27] }, { 21: [2, 89], 31: [2, 89], 52: [2, 89], 62: [2, 89], 66: [2, 89], 69: [2, 89] }, { 21: [2, 42], 31: [2, 42], 52: [2, 42], 59: [2, 42], 62: [2, 42], 66: [2, 42], 67: [1, 96], 69: [2, 42], 74: [2, 42], 75: [2, 42], 76: [2, 42], 77: [2, 42], 78: [2, 42], 79: [2, 42], 81: [2, 42] }, { 21: [2, 41], 31: [2, 41], 52: [2, 41], 59: [2, 41], 62: [2, 41], 66: [2, 41], 69: [2, 41], 74: [2, 41], 75: [2, 41], 76: [2, 41], 77: [2, 41], 78: [2, 41], 79: [2, 41], 81: [2, 41] }, { 52: [1, 97] }, { 52: [2, 78], 59: [2, 78], 66: [2, 78], 74: [2, 78], 75: [2, 78], 76: [2, 78], 77: [2, 78], 78: [2, 78], 79: [2, 78] }, { 52: [2, 80] }, { 5: [2, 12], 13: [2, 12], 14: [2, 12], 17: [2, 12], 27: [2, 12], 32: [2, 12], 37: [2, 12], 42: [2, 12], 45: [2, 12], 46: [2, 12], 49: [2, 12], 53: [2, 12] }, { 18: 98, 66: [1, 32], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 28], 78: [1, 29], 79: [1, 31], 80: 30 }, { 36: 50, 37: [1, 52], 41: 51, 42: [1, 53], 43: 100, 44: 99, 45: [2, 71] }, { 31: [2, 65], 38: 101, 59: [2, 65], 66: [2, 65], 69: [2, 65], 74: [2, 65], 75: [2, 65], 76: [2, 65], 77: [2, 65], 78: [2, 65], 79: [2, 65] }, { 45: [2, 17] }, { 5: [2, 13], 13: [2, 13], 14: [2, 13], 17: [2, 13], 27: [2, 13], 32: [2, 13], 37: [2, 13], 42: [2, 13], 45: [2, 13], 46: [2, 13], 49: [2, 13], 53: [2, 13] }, { 31: [1, 102] }, { 31: [2, 82], 59: [2, 82], 66: [2, 82], 74: [2, 82], 75: [2, 82], 76: [2, 82], 77: [2, 82], 78: [2, 82], 79: [2, 82] }, { 31: [2, 84] }, { 18: 65, 57: 104, 58: 66, 59: [1, 40], 61: 103, 62: [2, 87], 63: 105, 64: 67, 65: 68, 66: [1, 69], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 28], 78: [1, 29], 79: [1, 31], 80: 30 }, { 30: 106, 31: [2, 57], 68: 107, 69: [1, 108] }, { 31: [2, 54], 59: [2, 54], 66: [2, 54], 69: [2, 54], 74: [2, 54], 75: [2, 54], 76: [2, 54], 77: [2, 54], 78: [2, 54], 79: [2, 54] }, { 31: [2, 56], 69: [2, 56] }, { 31: [2, 63], 35: 109, 68: 110, 69: [1, 108] }, { 31: [2, 60], 59: [2, 60], 66: [2, 60], 69: [2, 60], 74: [2, 60], 75: [2, 60], 76: [2, 60], 77: [2, 60], 78: [2, 60], 79: [2, 60] }, { 31: [2, 62], 69: [2, 62] }, { 21: [1, 111] }, { 21: [2, 46], 59: [2, 46], 66: [2, 46], 74: [2, 46], 75: [2, 46], 76: [2, 46], 77: [2, 46], 78: [2, 46], 79: [2, 46] }, { 21: [2, 48] }, { 5: [2, 21], 13: [2, 21], 14: [2, 21], 17: [2, 21], 27: [2, 21], 32: [2, 21], 37: [2, 21], 42: [2, 21], 45: [2, 21], 46: [2, 21], 49: [2, 21], 53: [2, 21] }, { 21: [2, 90], 31: [2, 90], 52: [2, 90], 62: [2, 90], 66: [2, 90], 69: [2, 90] }, { 67: [1, 96] }, { 18: 65, 57: 112, 58: 66, 59: [1, 40], 66: [1, 32], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 28], 78: [1, 29], 79: [1, 31], 80: 30 }, { 5: [2, 22], 13: [2, 22], 14: [2, 22], 17: [2, 22], 27: [2, 22], 32: [2, 22], 37: [2, 22], 42: [2, 22], 45: [2, 22], 46: [2, 22], 49: [2, 22], 53: [2, 22] }, { 31: [1, 113] }, { 45: [2, 18] }, { 45: [2, 72] }, { 18: 65, 31: [2, 67], 39: 114, 57: 115, 58: 66, 59: [1, 40], 63: 116, 64: 67, 65: 68, 66: [1, 69], 69: [2, 67], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 28], 78: [1, 29], 79: [1, 31], 80: 30 }, { 5: [2, 23], 13: [2, 23], 14: [2, 23], 17: [2, 23], 27: [2, 23], 32: [2, 23], 37: [2, 23], 42: [2, 23], 45: [2, 23], 46: [2, 23], 49: [2, 23], 53: [2, 23] }, { 62: [1, 117] }, { 59: [2, 86], 62: [2, 86], 66: [2, 86], 74: [2, 86], 75: [2, 86], 76: [2, 86], 77: [2, 86], 78: [2, 86], 79: [2, 86] }, { 62: [2, 88] }, { 31: [1, 118] }, { 31: [2, 58] }, { 66: [1, 120], 70: 119 }, { 31: [1, 121] }, { 31: [2, 64] }, { 14: [2, 11] }, { 21: [2, 28], 31: [2, 28], 52: [2, 28], 62: [2, 28], 66: [2, 28], 69: [2, 28] }, { 5: [2, 20], 13: [2, 20], 14: [2, 20], 17: [2, 20], 27: [2, 20], 32: [2, 20], 37: [2, 20], 42: [2, 20], 45: [2, 20], 46: [2, 20], 49: [2, 20], 53: [2, 20] }, { 31: [2, 69], 40: 122, 68: 123, 69: [1, 108] }, { 31: [2, 66], 59: [2, 66], 66: [2, 66], 69: [2, 66], 74: [2, 66], 75: [2, 66], 76: [2, 66], 77: [2, 66], 78: [2, 66], 79: [2, 66] }, { 31: [2, 68], 69: [2, 68] }, { 21: [2, 26], 31: [2, 26], 52: [2, 26], 59: [2, 26], 62: [2, 26], 66: [2, 26], 69: [2, 26], 74: [2, 26], 75: [2, 26], 76: [2, 26], 77: [2, 26], 78: [2, 26], 79: [2, 26] }, { 13: [2, 14], 14: [2, 14], 17: [2, 14], 27: [2, 14], 32: [2, 14], 37: [2, 14], 42: [2, 14], 45: [2, 14], 46: [2, 14], 49: [2, 14], 53: [2, 14] }, { 66: [1, 125], 71: [1, 124] }, { 66: [2, 91], 71: [2, 91] }, { 13: [2, 15], 14: [2, 15], 17: [2, 15], 27: [2, 15], 32: [2, 15], 42: [2, 15], 45: [2, 15], 46: [2, 15], 49: [2, 15], 53: [2, 15] }, { 31: [1, 126] }, { 31: [2, 70] }, { 31: [2, 29] }, { 66: [2, 92], 71: [2, 92] }, { 13: [2, 16], 14: [2, 16], 17: [2, 16], 27: [2, 16], 32: [2, 16], 37: [2, 16], 42: [2, 16], 45: [2, 16], 46: [2, 16], 49: [2, 16], 53: [2, 16] }],
	        defaultActions: { 4: [2, 1], 49: [2, 50], 51: [2, 19], 55: [2, 52], 64: [2, 76], 73: [2, 80], 78: [2, 17], 82: [2, 84], 92: [2, 48], 99: [2, 18], 100: [2, 72], 105: [2, 88], 107: [2, 58], 110: [2, 64], 111: [2, 11], 123: [2, 70], 124: [2, 29] },
	        parseError: function parseError(str, hash) {
	            throw new Error(str);
	        },
	        parse: function parse(input) {
	            var self = this,
	                stack = [0],
	                vstack = [null],
	                lstack = [],
	                table = this.table,
	                yytext = "",
	                yylineno = 0,
	                yyleng = 0,
	                recovering = 0,
	                TERROR = 2,
	                EOF = 1;
	            this.lexer.setInput(input);
	            this.lexer.yy = this.yy;
	            this.yy.lexer = this.lexer;
	            this.yy.parser = this;
	            if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
	            var yyloc = this.lexer.yylloc;
	            lstack.push(yyloc);
	            var ranges = this.lexer.options && this.lexer.options.ranges;
	            if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
	            function popStack(n) {
	                stack.length = stack.length - 2 * n;
	                vstack.length = vstack.length - n;
	                lstack.length = lstack.length - n;
	            }
	            function lex() {
	                var token;
	                token = self.lexer.lex() || 1;
	                if (typeof token !== "number") {
	                    token = self.symbols_[token] || token;
	                }
	                return token;
	            }
	            var symbol,
	                preErrorSymbol,
	                state,
	                action,
	                a,
	                r,
	                yyval = {},
	                p,
	                len,
	                newState,
	                expected;
	            while (true) {
	                state = stack[stack.length - 1];
	                if (this.defaultActions[state]) {
	                    action = this.defaultActions[state];
	                } else {
	                    if (symbol === null || typeof symbol == "undefined") {
	                        symbol = lex();
	                    }
	                    action = table[state] && table[state][symbol];
	                }
	                if (typeof action === "undefined" || !action.length || !action[0]) {
	                    var errStr = "";
	                    if (!recovering) {
	                        expected = [];
	                        for (p in table[state]) if (this.terminals_[p] && p > 2) {
	                            expected.push("'" + this.terminals_[p] + "'");
	                        }
	                        if (this.lexer.showPosition) {
	                            errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
	                        } else {
	                            errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
	                        }
	                        this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected });
	                    }
	                }
	                if (action[0] instanceof Array && action.length > 1) {
	                    throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
	                }
	                switch (action[0]) {
	                    case 1:
	                        stack.push(symbol);
	                        vstack.push(this.lexer.yytext);
	                        lstack.push(this.lexer.yylloc);
	                        stack.push(action[1]);
	                        symbol = null;
	                        if (!preErrorSymbol) {
	                            yyleng = this.lexer.yyleng;
	                            yytext = this.lexer.yytext;
	                            yylineno = this.lexer.yylineno;
	                            yyloc = this.lexer.yylloc;
	                            if (recovering > 0) recovering--;
	                        } else {
	                            symbol = preErrorSymbol;
	                            preErrorSymbol = null;
	                        }
	                        break;
	                    case 2:
	                        len = this.productions_[action[1]][1];
	                        yyval.$ = vstack[vstack.length - len];
	                        yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
	                        if (ranges) {
	                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
	                        }
	                        r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
	                        if (typeof r !== "undefined") {
	                            return r;
	                        }
	                        if (len) {
	                            stack = stack.slice(0, -1 * len * 2);
	                            vstack = vstack.slice(0, -1 * len);
	                            lstack = lstack.slice(0, -1 * len);
	                        }
	                        stack.push(this.productions_[action[1]][0]);
	                        vstack.push(yyval.$);
	                        lstack.push(yyval._$);
	                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
	                        stack.push(newState);
	                        break;
	                    case 3:
	                        return true;
	                }
	            }
	            return true;
	        }
	    };
	    /* Jison generated lexer */
	    var lexer = (function () {
	        var lexer = { EOF: 1,
	            parseError: function parseError(str, hash) {
	                if (this.yy.parser) {
	                    this.yy.parser.parseError(str, hash);
	                } else {
	                    throw new Error(str);
	                }
	            },
	            setInput: function setInput(input) {
	                this._input = input;
	                this._more = this._less = this.done = false;
	                this.yylineno = this.yyleng = 0;
	                this.yytext = this.matched = this.match = "";
	                this.conditionStack = ["INITIAL"];
	                this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
	                if (this.options.ranges) this.yylloc.range = [0, 0];
	                this.offset = 0;
	                return this;
	            },
	            input: function input() {
	                var ch = this._input[0];
	                this.yytext += ch;
	                this.yyleng++;
	                this.offset++;
	                this.match += ch;
	                this.matched += ch;
	                var lines = ch.match(/(?:\r\n?|\n).*/g);
	                if (lines) {
	                    this.yylineno++;
	                    this.yylloc.last_line++;
	                } else {
	                    this.yylloc.last_column++;
	                }
	                if (this.options.ranges) this.yylloc.range[1]++;

	                this._input = this._input.slice(1);
	                return ch;
	            },
	            unput: function unput(ch) {
	                var len = ch.length;
	                var lines = ch.split(/(?:\r\n?|\n)/g);

	                this._input = ch + this._input;
	                this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
	                //this.yyleng -= len;
	                this.offset -= len;
	                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
	                this.match = this.match.substr(0, this.match.length - 1);
	                this.matched = this.matched.substr(0, this.matched.length - 1);

	                if (lines.length - 1) this.yylineno -= lines.length - 1;
	                var r = this.yylloc.range;

	                this.yylloc = { first_line: this.yylloc.first_line,
	                    last_line: this.yylineno + 1,
	                    first_column: this.yylloc.first_column,
	                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
	                };

	                if (this.options.ranges) {
	                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
	                }
	                return this;
	            },
	            more: function more() {
	                this._more = true;
	                return this;
	            },
	            less: function less(n) {
	                this.unput(this.match.slice(n));
	            },
	            pastInput: function pastInput() {
	                var past = this.matched.substr(0, this.matched.length - this.match.length);
	                return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
	            },
	            upcomingInput: function upcomingInput() {
	                var next = this.match;
	                if (next.length < 20) {
	                    next += this._input.substr(0, 20 - next.length);
	                }
	                return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
	            },
	            showPosition: function showPosition() {
	                var pre = this.pastInput();
	                var c = new Array(pre.length + 1).join("-");
	                return pre + this.upcomingInput() + "\n" + c + "^";
	            },
	            next: function next() {
	                if (this.done) {
	                    return this.EOF;
	                }
	                if (!this._input) this.done = true;

	                var token, match, tempMatch, index, col, lines;
	                if (!this._more) {
	                    this.yytext = "";
	                    this.match = "";
	                }
	                var rules = this._currentRules();
	                for (var i = 0; i < rules.length; i++) {
	                    tempMatch = this._input.match(this.rules[rules[i]]);
	                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
	                        match = tempMatch;
	                        index = i;
	                        if (!this.options.flex) break;
	                    }
	                }
	                if (match) {
	                    lines = match[0].match(/(?:\r\n?|\n).*/g);
	                    if (lines) this.yylineno += lines.length;
	                    this.yylloc = { first_line: this.yylloc.last_line,
	                        last_line: this.yylineno + 1,
	                        first_column: this.yylloc.last_column,
	                        last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length };
	                    this.yytext += match[0];
	                    this.match += match[0];
	                    this.matches = match;
	                    this.yyleng = this.yytext.length;
	                    if (this.options.ranges) {
	                        this.yylloc.range = [this.offset, this.offset += this.yyleng];
	                    }
	                    this._more = false;
	                    this._input = this._input.slice(match[0].length);
	                    this.matched += match[0];
	                    token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
	                    if (this.done && this._input) this.done = false;
	                    if (token) {
	                        return token;
	                    } else {
	                        return;
	                    }
	                }
	                if (this._input === "") {
	                    return this.EOF;
	                } else {
	                    return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), { text: "", token: null, line: this.yylineno });
	                }
	            },
	            lex: function lex() {
	                var r = this.next();
	                if (typeof r !== "undefined") {
	                    return r;
	                } else {
	                    return this.lex();
	                }
	            },
	            begin: function begin(condition) {
	                this.conditionStack.push(condition);
	            },
	            popState: function popState() {
	                return this.conditionStack.pop();
	            },
	            _currentRules: function _currentRules() {
	                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
	            },
	            topState: function topState() {
	                return this.conditionStack[this.conditionStack.length - 2];
	            },
	            pushState: function begin(condition) {
	                this.begin(condition);
	            } };
	        lexer.options = {};
	        lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {

	            function strip(start, end) {
	                return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng - end);
	            }

	            var YYSTATE = YY_START;
	            switch ($avoiding_name_collisions) {
	                case 0:
	                    if (yy_.yytext.slice(-2) === "\\\\") {
	                        strip(0, 1);
	                        this.begin("mu");
	                    } else if (yy_.yytext.slice(-1) === "\\") {
	                        strip(0, 1);
	                        this.begin("emu");
	                    } else {
	                        this.begin("mu");
	                    }
	                    if (yy_.yytext) {
	                        return 14;
	                    }break;
	                case 1:
	                    return 14;
	                    break;
	                case 2:
	                    this.popState();
	                    return 14;

	                    break;
	                case 3:
	                    yy_.yytext = yy_.yytext.substr(5, yy_.yyleng - 9);
	                    this.popState();
	                    return 16;

	                    break;
	                case 4:
	                    return 14;
	                    break;
	                case 5:
	                    this.popState();
	                    return 13;

	                    break;
	                case 6:
	                    return 59;
	                    break;
	                case 7:
	                    return 62;
	                    break;
	                case 8:
	                    return 17;
	                    break;
	                case 9:
	                    this.popState();
	                    this.begin("raw");
	                    return 21;

	                    break;
	                case 10:
	                    return 53;
	                    break;
	                case 11:
	                    return 27;
	                    break;
	                case 12:
	                    return 45;
	                    break;
	                case 13:
	                    this.popState();return 42;
	                    break;
	                case 14:
	                    this.popState();return 42;
	                    break;
	                case 15:
	                    return 32;
	                    break;
	                case 16:
	                    return 37;
	                    break;
	                case 17:
	                    return 49;
	                    break;
	                case 18:
	                    return 46;
	                    break;
	                case 19:
	                    this.unput(yy_.yytext);
	                    this.popState();
	                    this.begin("com");

	                    break;
	                case 20:
	                    this.popState();
	                    return 13;

	                    break;
	                case 21:
	                    return 46;
	                    break;
	                case 22:
	                    return 67;
	                    break;
	                case 23:
	                    return 66;
	                    break;
	                case 24:
	                    return 66;
	                    break;
	                case 25:
	                    return 81;
	                    break;
	                case 26:
	                    // ignore whitespace
	                    break;
	                case 27:
	                    this.popState();return 52;
	                    break;
	                case 28:
	                    this.popState();return 31;
	                    break;
	                case 29:
	                    yy_.yytext = strip(1, 2).replace(/\\"/g, "\"");return 74;
	                    break;
	                case 30:
	                    yy_.yytext = strip(1, 2).replace(/\\'/g, "'");return 74;
	                    break;
	                case 31:
	                    return 79;
	                    break;
	                case 32:
	                    return 76;
	                    break;
	                case 33:
	                    return 76;
	                    break;
	                case 34:
	                    return 77;
	                    break;
	                case 35:
	                    return 78;
	                    break;
	                case 36:
	                    return 75;
	                    break;
	                case 37:
	                    return 69;
	                    break;
	                case 38:
	                    return 71;
	                    break;
	                case 39:
	                    return 66;
	                    break;
	                case 40:
	                    return 66;
	                    break;
	                case 41:
	                    return "INVALID";
	                    break;
	                case 42:
	                    return 5;
	                    break;
	            }
	        };
	        lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{\/)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:$)/];
	        lexer.conditions = { mu: { rules: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42], inclusive: false }, emu: { rules: [2], inclusive: false }, com: { rules: [5], inclusive: false }, raw: { rules: [3, 4], inclusive: false }, INITIAL: { rules: [0, 1, 42], inclusive: true } };
	        return lexer;
	    })();
	    parser.lexer = lexer;
	    function Parser() {
	        this.yy = {};
	    }Parser.prototype = parser;parser.Parser = Parser;
	    return new Parser();
	})();exports["default"] = handlebars;
	module.exports = exports["default"];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(8)['default'];

	exports.__esModule = true;

	var _Visitor = __webpack_require__(6);

	var _Visitor2 = _interopRequireDefault(_Visitor);

	function WhitespaceControl() {}
	WhitespaceControl.prototype = new _Visitor2['default']();

	WhitespaceControl.prototype.Program = function (program) {
	  var isRoot = !this.isRootSeen;
	  this.isRootSeen = true;

	  var body = program.body;
	  for (var i = 0, l = body.length; i < l; i++) {
	    var current = body[i],
	        strip = this.accept(current);

	    if (!strip) {
	      continue;
	    }

	    var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot),
	        _isNextWhitespace = isNextWhitespace(body, i, isRoot),
	        openStandalone = strip.openStandalone && _isPrevWhitespace,
	        closeStandalone = strip.closeStandalone && _isNextWhitespace,
	        inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;

	    if (strip.close) {
	      omitRight(body, i, true);
	    }
	    if (strip.open) {
	      omitLeft(body, i, true);
	    }

	    if (inlineStandalone) {
	      omitRight(body, i);

	      if (omitLeft(body, i)) {
	        // If we are on a standalone node, save the indent info for partials
	        if (current.type === 'PartialStatement') {
	          // Pull out the whitespace from the final line
	          current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
	        }
	      }
	    }
	    if (openStandalone) {
	      omitRight((current.program || current.inverse).body);

	      // Strip out the previous content node if it's whitespace only
	      omitLeft(body, i);
	    }
	    if (closeStandalone) {
	      // Always strip the next node
	      omitRight(body, i);

	      omitLeft((current.inverse || current.program).body);
	    }
	  }

	  return program;
	};
	WhitespaceControl.prototype.BlockStatement = function (block) {
	  this.accept(block.program);
	  this.accept(block.inverse);

	  // Find the inverse program that is involed with whitespace stripping.
	  var program = block.program || block.inverse,
	      inverse = block.program && block.inverse,
	      firstInverse = inverse,
	      lastInverse = inverse;

	  if (inverse && inverse.chained) {
	    firstInverse = inverse.body[0].program;

	    // Walk the inverse chain to find the last inverse that is actually in the chain.
	    while (lastInverse.chained) {
	      lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
	    }
	  }

	  var strip = {
	    open: block.openStrip.open,
	    close: block.closeStrip.close,

	    // Determine the standalone candiacy. Basically flag our content as being possibly standalone
	    // so our parent can determine if we actually are standalone
	    openStandalone: isNextWhitespace(program.body),
	    closeStandalone: isPrevWhitespace((firstInverse || program).body)
	  };

	  if (block.openStrip.close) {
	    omitRight(program.body, null, true);
	  }

	  if (inverse) {
	    var inverseStrip = block.inverseStrip;

	    if (inverseStrip.open) {
	      omitLeft(program.body, null, true);
	    }

	    if (inverseStrip.close) {
	      omitRight(firstInverse.body, null, true);
	    }
	    if (block.closeStrip.open) {
	      omitLeft(lastInverse.body, null, true);
	    }

	    // Find standalone else statments
	    if (isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
	      omitLeft(program.body);
	      omitRight(firstInverse.body);
	    }
	  } else if (block.closeStrip.open) {
	    omitLeft(program.body, null, true);
	  }

	  return strip;
	};

	WhitespaceControl.prototype.MustacheStatement = function (mustache) {
	  return mustache.strip;
	};

	WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function (node) {
	  /* istanbul ignore next */
	  var strip = node.strip || {};
	  return {
	    inlineStandalone: true,
	    open: strip.open,
	    close: strip.close
	  };
	};

	function isPrevWhitespace(body, i, isRoot) {
	  if (i === undefined) {
	    i = body.length;
	  }

	  // Nodes that end with newlines are considered whitespace (but are special
	  // cased for strip operations)
	  var prev = body[i - 1],
	      sibling = body[i - 2];
	  if (!prev) {
	    return isRoot;
	  }

	  if (prev.type === 'ContentStatement') {
	    return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
	  }
	}
	function isNextWhitespace(body, i, isRoot) {
	  if (i === undefined) {
	    i = -1;
	  }

	  var next = body[i + 1],
	      sibling = body[i + 2];
	  if (!next) {
	    return isRoot;
	  }

	  if (next.type === 'ContentStatement') {
	    return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
	  }
	}

	// Marks the node to the right of the position as omitted.
	// I.e. {{foo}}' ' will mark the ' ' node as omitted.
	//
	// If i is undefined, then the first child will be marked as such.
	//
	// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
	// content is met.
	function omitRight(body, i, multiple) {
	  var current = body[i == null ? 0 : i + 1];
	  if (!current || current.type !== 'ContentStatement' || !multiple && current.rightStripped) {
	    return;
	  }

	  var original = current.value;
	  current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, '');
	  current.rightStripped = current.value !== original;
	}

	// Marks the node to the left of the position as omitted.
	// I.e. ' '{{foo}} will mark the ' ' node as omitted.
	//
	// If i is undefined then the last child will be marked as such.
	//
	// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
	// content is met.
	function omitLeft(body, i, multiple) {
	  var current = body[i == null ? body.length - 1 : i - 1];
	  if (!current || current.type !== 'ContentStatement' || !multiple && current.leftStripped) {
	    return;
	  }

	  // We omit the last node if it's whitespace only and not preceeded by a non-content node.
	  var original = current.value;
	  current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, '');
	  current.leftStripped = current.value !== original;
	  return current.leftStripped;
	}

	exports['default'] = WhitespaceControl;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(8)['default'];

	exports.__esModule = true;
	exports.SourceLocation = SourceLocation;
	exports.id = id;
	exports.stripFlags = stripFlags;
	exports.stripComment = stripComment;
	exports.preparePath = preparePath;
	exports.prepareMustache = prepareMustache;
	exports.prepareRawBlock = prepareRawBlock;
	exports.prepareBlock = prepareBlock;

	var _Exception = __webpack_require__(12);

	var _Exception2 = _interopRequireDefault(_Exception);

	function SourceLocation(source, locInfo) {
	  this.source = source;
	  this.start = {
	    line: locInfo.first_line,
	    column: locInfo.first_column
	  };
	  this.end = {
	    line: locInfo.last_line,
	    column: locInfo.last_column
	  };
	}

	function id(token) {
	  if (/^\[.*\]$/.test(token)) {
	    return token.substr(1, token.length - 2);
	  } else {
	    return token;
	  }
	}

	function stripFlags(open, close) {
	  return {
	    open: open.charAt(2) === '~',
	    close: close.charAt(close.length - 3) === '~'
	  };
	}

	function stripComment(comment) {
	  return comment.replace(/^\{\{~?\!-?-?/, '').replace(/-?-?~?\}\}$/, '');
	}

	function preparePath(data, parts, locInfo) {
	  locInfo = this.locInfo(locInfo);

	  var original = data ? '@' : '',
	      dig = [],
	      depth = 0,
	      depthString = '';

	  for (var i = 0, l = parts.length; i < l; i++) {
	    var part = parts[i].part,

	    // If we have [] syntax then we do not treat path references as operators,
	    // i.e. foo.[this] resolves to approximately context.foo['this']
	    isLiteral = parts[i].original !== part;
	    original += (parts[i].separator || '') + part;

	    if (!isLiteral && (part === '..' || part === '.' || part === 'this')) {
	      if (dig.length > 0) {
	        throw new _Exception2['default']('Invalid path: ' + original, { loc: locInfo });
	      } else if (part === '..') {
	        depth++;
	        depthString += '../';
	      }
	    } else {
	      dig.push(part);
	    }
	  }

	  return new this.PathExpression(data, depth, dig, original, locInfo);
	}

	function prepareMustache(path, params, hash, open, strip, locInfo) {
	  // Must use charAt to support IE pre-10
	  var escapeFlag = open.charAt(3) || open.charAt(2),
	      escaped = escapeFlag !== '{' && escapeFlag !== '&';

	  return new this.MustacheStatement(path, params, hash, escaped, strip, this.locInfo(locInfo));
	}

	function prepareRawBlock(openRawBlock, content, close, locInfo) {
	  if (openRawBlock.path.original !== close) {
	    var errorNode = { loc: openRawBlock.path.loc };

	    throw new _Exception2['default'](openRawBlock.path.original + ' doesn\'t match ' + close, errorNode);
	  }

	  locInfo = this.locInfo(locInfo);
	  var program = new this.Program([content], null, {}, locInfo);

	  return new this.BlockStatement(openRawBlock.path, openRawBlock.params, openRawBlock.hash, program, undefined, {}, {}, {}, locInfo);
	}

	function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
	  // When we are chaining inverse calls, we will not have a close path
	  if (close && close.path && openBlock.path.original !== close.path.original) {
	    var errorNode = { loc: openBlock.path.loc };

	    throw new _Exception2['default'](openBlock.path.original + ' doesn\'t match ' + close.path.original, errorNode);
	  }

	  program.blockParams = openBlock.blockParams;

	  var inverse = undefined,
	      inverseStrip = undefined;

	  if (inverseAndProgram) {
	    if (inverseAndProgram.chain) {
	      inverseAndProgram.program.body[0].closeStrip = close.strip;
	    }

	    inverseStrip = inverseAndProgram.strip;
	    inverse = inverseAndProgram.program;
	  }

	  if (inverted) {
	    inverted = inverse;
	    inverse = program;
	    program = inverted;
	  }

	  return new this.BlockStatement(openBlock.path, openBlock.params, openBlock.hash, program, inverse, openBlock.strip, inverseStrip, close && close.strip, this.locInfo(locInfo));
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	/*global define */

	var _isArray = __webpack_require__(13);

	var SourceNode = undefined;

	try {
	  /* istanbul ignore next */
	  if (false) {
	    // We don't support this in AMD environments. For these environments, we asusme that
	    // they are running on the browser and thus have no need for the source-map library.
	    var SourceMap = require('source-map');
	    SourceNode = SourceMap.SourceNode;
	  }
	} catch (err) {}

	/* istanbul ignore if: tested but not covered in istanbul due to dist build  */
	if (!SourceNode) {
	  SourceNode = function (line, column, srcFile, chunks) {
	    this.src = '';
	    if (chunks) {
	      this.add(chunks);
	    }
	  };
	  /* istanbul ignore next */
	  SourceNode.prototype = {
	    add: function add(chunks) {
	      if (_isArray.isArray(chunks)) {
	        chunks = chunks.join('');
	      }
	      this.src += chunks;
	    },
	    prepend: function prepend(chunks) {
	      if (_isArray.isArray(chunks)) {
	        chunks = chunks.join('');
	      }
	      this.src = chunks + this.src;
	    },
	    toStringWithSourceMap: function toStringWithSourceMap() {
	      return { code: this.toString() };
	    },
	    toString: function toString() {
	      return this.src;
	    }
	  };
	}

	function castChunk(chunk, codeGen, loc) {
	  if (_isArray.isArray(chunk)) {
	    var ret = [];

	    for (var i = 0, len = chunk.length; i < len; i++) {
	      ret.push(codeGen.wrap(chunk[i], loc));
	    }
	    return ret;
	  } else if (typeof chunk === 'boolean' || typeof chunk === 'number') {
	    // Handle primitives that the SourceNode will throw up on
	    return chunk + '';
	  }
	  return chunk;
	}

	function CodeGen(srcFile) {
	  this.srcFile = srcFile;
	  this.source = [];
	}

	CodeGen.prototype = {
	  prepend: function prepend(source, loc) {
	    this.source.unshift(this.wrap(source, loc));
	  },
	  push: function push(source, loc) {
	    this.source.push(this.wrap(source, loc));
	  },

	  merge: function merge() {
	    var source = this.empty();
	    this.each(function (line) {
	      source.add(['  ', line, '\n']);
	    });
	    return source;
	  },

	  each: function each(iter) {
	    for (var i = 0, len = this.source.length; i < len; i++) {
	      iter(this.source[i]);
	    }
	  },

	  empty: function empty() {
	    var loc = arguments[0] === undefined ? this.currentLocation || { start: {} } : arguments[0];

	    return new SourceNode(loc.start.line, loc.start.column, this.srcFile);
	  },
	  wrap: function wrap(chunk) {
	    var loc = arguments[1] === undefined ? this.currentLocation || { start: {} } : arguments[1];

	    if (chunk instanceof SourceNode) {
	      return chunk;
	    }

	    chunk = castChunk(chunk, this, loc);

	    return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
	  },

	  functionCall: function functionCall(fn, type, params) {
	    params = this.generateList(params);
	    return this.wrap([fn, type ? '.' + type + '(' : '(', params, ')']);
	  },

	  quotedString: function quotedString(str) {
	    return '"' + (str + '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\u2028/g, '\\u2028') // Per Ecma-262 7.3 + 7.8.4
	    .replace(/\u2029/g, '\\u2029') + '"';
	  },

	  objectLiteral: function objectLiteral(obj) {
	    var pairs = [];

	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        var value = castChunk(obj[key], this);
	        if (value !== 'undefined') {
	          pairs.push([this.quotedString(key), ':', value]);
	        }
	      }
	    }

	    var ret = this.generateList(pairs);
	    ret.prepend('{');
	    ret.add('}');
	    return ret;
	  },

	  generateList: function generateList(entries, loc) {
	    var ret = this.empty(loc);

	    for (var i = 0, len = entries.length; i < len; i++) {
	      if (i) {
	        ret.add(',');
	      }

	      ret.add(castChunk(entries[i], this, loc));
	    }

	    return ret;
	  },

	  generateArray: function generateArray(entries, loc) {
	    var ret = this.generateList(entries, loc);
	    ret.prepend('[');
	    ret.add(']');

	    return ret;
	  }
	};

	exports['default'] = CodeGen;
	module.exports = exports['default'];

	/* NOP */

/***/ }
/******/ ])
});
;/*
 * $Id$
** pz2.js - pazpar2's javascript client library.
*/

//since explorer is flawed
if (!window['Node']) {
    window.Node = new Object();
    Node.ELEMENT_NODE = 1;
    Node.ATTRIBUTE_NODE = 2;
    Node.TEXT_NODE = 3;
    Node.CDATA_SECTION_NODE = 4;
    Node.ENTITY_REFERENCE_NODE = 5;
    Node.ENTITY_NODE = 6;
    Node.PROCESSING_INSTRUCTION_NODE = 7;
    Node.COMMENT_NODE = 8;
    Node.DOCUMENT_NODE = 9;
    Node.DOCUMENT_TYPE_NODE = 10;
    Node.DOCUMENT_FRAGMENT_NODE = 11;
    Node.NOTATION_NODE = 12;
}

// prevent execution of more than once
if(typeof window.pz2 == "undefined") {
window.undefined = window.undefined;

var pz2 = function ( paramArray )
{
    
    // at least one callback required
    if ( !paramArray )
        throw new Error("Pz2.js: Array with parameters has to be supplied."); 

    //supported pazpar2's protocol version
    this.windowid = paramArray.windowid || window.name;
    this.suppProtoVer = '1';
    if (typeof paramArray.pazpar2path != "undefined")
        this.pz2String = paramArray.pazpar2path;
    else
        this.pz2String = "/pazpar2/search.pz2";
    this.useSessions = true;
    
    this.stylesheet = paramArray.detailstylesheet || null;
    //load stylesheet if required in async mode
    if( this.stylesheet ) {
        var context = this;
        var request = new pzHttpRequest( this.stylesheet );
        request.get( {}, function ( doc ) { context.xslDoc = doc; } );
    }
    
    this.errorHandler = paramArray.errorhandler || null;
    this.showResponseType = paramArray.showResponseType || "xml";
    
    // function callbacks
    this.initCallback = paramArray.oninit || null;
    this.statCallback = paramArray.onstat || null;
    this.showCallback = paramArray.onshow || null;
    this.termlistCallback = paramArray.onterm || null;
    this.recordCallback = paramArray.onrecord || null;
    this.bytargetCallback = paramArray.onbytarget || null;
    this.resetCallback = paramArray.onreset || null;

    // termlist keys
    this.termKeys = paramArray.termlist || "subject";
    
    // some configurational stuff
    this.keepAlive = 50000;
    
    if ( paramArray.keepAlive < this.keepAlive )
        this.keepAlive = paramArray.keepAlive;

    this.sessionID = null;
    this.serviceId = paramArray.serviceId || null;
    this.initStatusOK = false;
    this.pingStatusOK = false;
    this.searchStatusOK = false;
    this.mergekey = paramArray.mergekey || null;
    this.rank = paramArray.rank || null;
    
    // for sorting
    this.currentSort = "relevance";

    // where are we?
    this.currentStart = 0;
    // currentNum can be overwritten in show 
    this.currentNum = 20;

    // last full record retrieved
    this.currRecID = null;
    
    // current query
    this.currQuery = null;

    //current raw record offset
    this.currRecOffset = null;

    //timers
    this.pingTimer = null;
    this.statTime = paramArray.stattime || 1000;
    this.statTimer = null;
    this.termTime = paramArray.termtime || 1000;
    this.termTimer = null;
    this.showTime = paramArray.showtime || 1000;
    this.showTimer = null;
    this.showFastCount = 4;
    this.bytargetTime = paramArray.bytargettime || 1000;
    this.bytargetTimer = null;
    this.recordTime = paramArray.recordtime || 500;
    this.recordTimer = null;

    // counters for each command and applied delay
    this.dumpFactor = 500;
    this.showCounter = 0;
    this.termCounter = 0;
    this.statCounter = 0;
    this.bytargetCounter = 0;
    this.recordCounter = 0;

    // active clients, updated by stat and show
    // might be an issue since bytarget will poll accordingly
    this.activeClients = 1;

    // if in proxy mode no need to init
    if (paramArray.usesessions != undefined) {
         this.useSessions = paramArray.usesessions;
        this.initStatusOK = true;
    }
    // else, auto init session or wait for a user init?
    if (this.useSessions && paramArray.autoInit !== false) {
        this.init(this.sessionID, this.serviceId);
    }
    // Version parameter
    this.version = paramArray.version || null;
};

pz2.prototype = 
{
    //error handler for async error throws
   throwError: function (errMsg, errCode)
   {
        var err = new Error(errMsg);
        if (errCode) err.code = errCode;
                
        if (this.errorHandler) {
            this.errorHandler(err);
        }
        else {
            throw err;
        }
   },

    // stop activity by clearing tiemouts 
   stop: function ()
   {
       clearTimeout(this.statTimer);
       clearTimeout(this.showTimer);
       clearTimeout(this.termTimer);
       clearTimeout(this.bytargetTimer);
    },
    
    // reset status variables
    reset: function ()
    {   
        if ( this.useSessions ) {
            this.sessionID = null;
            this.initStatusOK = false;
            this.pingStatusOK = false;
            clearTimeout(this.pingTimer);
        }
        this.searchStatusOK = false;
        this.stop();
            
        if ( this.resetCallback )
                this.resetCallback(this.windowid);
    },

    init: function (sessionId, serviceId) 
    {
        this.reset();
        
        // session id as a param
        if (sessionId && this.useSessions ) {
            this.initStatusOK = true;
            this.sessionID = sessionId;
            this.ping();
        // old school direct pazpar2 init
        } else if (this.useSessions) {
            var context = this;
            var request = new pzHttpRequest(this.pz2String, this.errorHandler);
            var opts = {'command' : 'init'};
            if (serviceId) opts.service = serviceId;
            request.safeGet(
                opts,
                function(data) {
                    if ( data.getElementsByTagName("status")[0]
                            .childNodes[0].nodeValue == "OK" ) {
                        if ( data.getElementsByTagName("protocol")[0]
                                .childNodes[0].nodeValue 
                            != context.suppProtoVer )
                            throw new Error(
                                "Server's protocol not supported by the client"
                            );
                        context.initStatusOK = true;
                        context.sessionID = 
                            data.getElementsByTagName("session")[0]
                                .childNodes[0].nodeValue;
                        if (data.getElementsByTagName("keepAlive").length > 0) {
                            context.keepAlive = data.getElementsByTagName("keepAlive")[0].childNodes[0].nodeValue;
                        }
                        context.pingTimer =
                            setTimeout(
                                function () {
                                    context.ping();
                                },
                                context.keepAlive
                            );
                        if ( context.initCallback )
                            context.initCallback(context.windowid);
                    }
                    else
                        context.throwError('Init failed. Malformed WS resonse.',
                                            110);
                }
            );
        // when through proxy no need to init
        } else {
            this.initStatusOK = true;
	}
    },
    // no need to ping explicitly
    ping: function () 
    {
        // pinging only makes sense when using pazpar2 directly
        if( !this.initStatusOK || !this.useSessions )
            throw new Error(
            'Pz2.js: Ping not allowed (proxy mode) or session not initialized.'
            );
        var context = this;

        clearTimeout(context.pingTimer);

        var request = new pzHttpRequest(this.pz2String, this.errorHandler);
        request.safeGet(
            { "command": "ping", "session": this.sessionID, "windowid" : context.windowid },
            function(data) {
                if ( data.getElementsByTagName("status")[0]
                        .childNodes[0].nodeValue == "OK" ) {
                    context.pingStatusOK = true;
                    context.pingTimer =
                        setTimeout(
                            function () {
                                context.ping();
                            },
                            context.keepAlive
                        );
                }
                else
                    context.throwError('Ping failed. Malformed WS resonse.',
                                        111);
            }
        );
    },
    search: function (query, num, sort, filter, showfrom, addParamsArr)
    {
        clearTimeout(this.statTimer);
        clearTimeout(this.showTimer);
        clearTimeout(this.termTimer);
        clearTimeout(this.bytargetTimer);
        
        this.showCounter = 0;
        this.termCounter = 0;
        this.bytargetCounter = 0;
        this.statCounter = 0;
        this.activeClients = 1;
        
        // no proxy mode
        if( !this.initStatusOK )
            throw new Error('Pz2.js: session not initialized.');
        
        if( query !== undefined )
            this.currQuery = query;
        else
            throw new Error("Pz2.js: no query supplied to the search command.");
        
        if ( showfrom !== undefined )
            var start = showfrom;
        else
            var start = 0;

	var searchParams = { 
          "command": "search",
          "query": this.currQuery, 
          "session": this.sessionID,
          "windowid" : this.windowid
        };
	
        if( sort !== undefined ) {
            this.currentSort = sort;
	    searchParams["sort"] = sort;
	}
        if (filter !== undefined) searchParams["filter"] = filter;
        if (this.mergekey) searchParams["mergekey"] = this.mergekey;
        if (this.rank) searchParams["rank"] = this.rank;

        // copy additional parmeters, do not overwrite
        if (addParamsArr != undefined) {
            for (var prop in addParamsArr) {
                if (!searchParams.hasOwnProperty(prop))
                    searchParams[prop] = addParamsArr[prop];
            }
        }
        
        var context = this;
        var request = new pzHttpRequest(this.pz2String, this.errorHandler);
        request.safeGet(
            searchParams,
            function(data) {
                if ( data.getElementsByTagName("status")[0]
                        .childNodes[0].nodeValue == "OK" ) {
                    context.searchStatusOK = true;
                    //piggyback search
                    if (context.showCallback)
                        context.show(start, num, sort);
                    if (context.statCallback)
                        context.stat();
                    if (context.termlistCallback)
                        context.termlist();
                    if (context.bytargetCallback)
                        context.bytarget();
                }
                else
                    context.throwError('Search failed. Malformed WS resonse.',
                                        112);
            }
        );
    },
    stat: function()
    {
        if( !this.initStatusOK )
            throw new Error('Pz2.js: session not initialized.');
        
        // if called explicitly takes precedence
        clearTimeout(this.statTimer);
        
        var context = this;
        var request = new pzHttpRequest(this.pz2String, this.errorHandler);
        request.safeGet(
            { "command": "stat", "session": this.sessionID, "windowid" : context.windowid },
            function(data) {
                if ( data.getElementsByTagName("stat") ) {
                    var activeClients = 
                        Number( data.getElementsByTagName("activeclients")[0]
                                    .childNodes[0].nodeValue );
                    context.activeClients = activeClients;

		    var stat = Element_parseChildNodes(data.documentElement);

                    context.statCounter++;
		    var delay = context.statTime 
                        + context.statCounter * context.dumpFactor;
                    
                    if ( activeClients > 0 )
                        context.statTimer = 
                            setTimeout( 
                                function () {
                                    context.stat();
                                },
                                delay
                            );
                    context.statCallback(stat, context.windowid);
                }
                else
                    context.throwError('Stat failed. Malformed WS resonse.',
                                        113);
            }
        );
    },
    show: function(start, num, sort, query_state)
    {
        if( !this.searchStatusOK && this.useSessions )
            throw new Error(
                'Pz2.js: show command has to be preceded with a search command.'
            );
        
        // if called explicitly takes precedence
        clearTimeout(this.showTimer);
        
        if( sort !== undefined )
            this.currentSort = sort;
        if( start !== undefined )
            this.currentStart = Number( start );
        if( num !== undefined )
            this.currentNum = Number( num );

        var context = this;
        var request = new pzHttpRequest(this.pz2String, this.errorHandler);
	var requestParameters = 
          {
              "command": "show", 
              "session": this.sessionID, 
              "start": this.currentStart,
              "num": this.currentNum, 
              "sort": this.currentSort, 
              "block": 1,
              "type": this.showResponseType,
              "windowid" : this.windowid
          };
        if (query_state)
          requestParameters["query-state"] = query_state;
	if (this.version && this.version > 0)
	    requestParameters["version"] = this.version;
        request.safeGet(
	  requestParameters,
          function(data, type) {
            var show = null;
            var activeClients = 0;
            if (type === "json") {
              show = {};
              activeClients = Number(data.activeclients[0]);
              show.activeclients = activeClients;
              show.merged = Number(data.merged[0]);
              show.total = Number(data.total[0]);
              show.start = Number(data.start[0]);
              show.num = Number(data.num[0]);
              show.hits = data.hit;
            } else if (data.getElementsByTagName("status")[0]
                  .childNodes[0].nodeValue == "OK") {
                // first parse the status data send along with records
                // this is strictly bound to the format
                activeClients = 
                  Number(data.getElementsByTagName("activeclients")[0]
                      .childNodes[0].nodeValue);
                show = {
                  "activeclients": activeClients,
                  "merged": 
                    Number( data.getElementsByTagName("merged")[0]
                        .childNodes[0].nodeValue ),
                  "total": 
                    Number( data.getElementsByTagName("total")[0]
                        .childNodes[0].nodeValue ),
                  "start": 
                    Number( data.getElementsByTagName("start")[0]
                        .childNodes[0].nodeValue ),
                  "num": 
                    Number( data.getElementsByTagName("num")[0]
                        .childNodes[0].nodeValue ),
                  "hits": []
                };
                // parse all the first-level nodes for all <hit> tags
                var hits = data.getElementsByTagName("hit");
                for (i = 0; i < hits.length; i++)
                  show.hits[i] = Element_parseChildNodes(hits[i]);
            } else {
              context.throwError('Show failed. Malformed WS resonse.',
                  114);
            };
	    
	    var approxNode = data.getElementsByTagName("approximation");
	    if (approxNode && approxNode[0] && approxNode[0].childNodes[0] && approxNode[0].childNodes[0].nodeValue)
		show['approximation'] = 
		  Number( approxNode[0].childNodes[0].nodeValue);
	      

	      data.getElementsByTagName("")
            context.activeClients = activeClients; 
            context.showCounter++;
            var delay = context.showTime;
            if (context.showCounter > context.showFastCount)
              delay += context.showCounter * context.dumpFactor;
            if ( activeClients > 0 )
              context.showTimer = setTimeout(
                function () {
                  context.show();
                }, 
                delay);
              context.showCallback(show, context.windowid);
          }
        );
    },
    record: function(id, offset, syntax, handler)
    {
        // we may call record with no previous search if in proxy mode
        if(!this.searchStatusOK && this.useSessions)
           throw new Error(
            'Pz2.js: record command has to be preceded with a search command.'
            );
        
        if( id !== undefined )
            this.currRecID = id;
        
	var recordParams = { 
            "command": "record", 
            "session": this.sessionID,
            "id": this.currRecID,
            "windowid" : this.windowid
        };
	
	this.currRecOffset = null;
        if (offset != undefined) {
	    recordParams["offset"] = offset;
            this.currRecOffset = offset;
        }

        if (syntax != undefined)
            recordParams['syntax'] = syntax;

        //overwrite default callback id needed
        var callback = this.recordCallback;
        var args = undefined;
        if (handler != undefined) {
            callback = handler['callback'];
            args = handler['args'];
        }
        
        var context = this;
        var request = new pzHttpRequest(this.pz2String, this.errorHandler);

        request.safeGet(
	    recordParams,
            function(data) {
                var recordNode;
                var record;                                
                //raw record
                if (context.currRecOffset !== null) {
                    record = new Array();
                    record['xmlDoc'] = data;
                    record['offset'] = context.currRecOffset;
                    callback(record, args, context.windowid);
                //pz2 record
                } else if ( recordNode = 
                    data.getElementsByTagName("record")[0] ) {
                    // if stylesheet was fetched do not parse the response
                    if ( context.xslDoc ) {
                        record = new Array();
                        record['xmlDoc'] = data;
                        record['xslDoc'] = context.xslDoc;
                        record['recid'] = 
                            recordNode.getElementsByTagName("recid")[0]
                                .firstChild.nodeValue;
                    //parse record
                    } else {
                        record = Element_parseChildNodes(recordNode);
                    }    
		    var activeClients = 
		       Number( data.getElementsByTagName("activeclients")[0]
		 		.childNodes[0].nodeValue );
		    context.activeClients = activeClients; 
                    context.recordCounter++;
                    var delay = context.recordTime + context.recordCounter * context.dumpFactor;
                    if ( activeClients > 0 )
                        context.recordTimer = 
                           setTimeout ( 
                               function() {
                                  context.record(id, offset, syntax, handler);
                                  },
                                  delay
                               );                                    
                    callback(record, args, context.windowid);
                }
                else
                    context.throwError('Record failed. Malformed WS resonse.',
                                        115);
            }
        );
    },

    termlist: function()
    {
        if( !this.searchStatusOK && this.useSessions )
            throw new Error(
            'Pz2.js: termlist command has to be preceded with a search command.'
            );

        // if called explicitly takes precedence
        clearTimeout(this.termTimer);
        
        var context = this;
        var request = new pzHttpRequest(this.pz2String, this.errorHandler);
        request.safeGet(
            { 
                "command": "termlist", 
                "session": this.sessionID, 
                "name": this.termKeys,
                "windowid" : this.windowid, 
		"version" : this.version
	
            },
            function(data) {
                if ( data.getElementsByTagName("termlist") ) {
                    var activeClients = 
                        Number( data.getElementsByTagName("activeclients")[0]
                                    .childNodes[0].nodeValue );
                    context.activeClients = activeClients;
                    var termList = { "activeclients":  activeClients };
                    var termLists = data.getElementsByTagName("list");
                    //for each termlist
                    for (i = 0; i < termLists.length; i++) {
                	var listName = termLists[i].getAttribute('name');
                        termList[listName] = new Array();
                        var terms = termLists[i].getElementsByTagName('term');
                        //for each term in the list
                        for (j = 0; j < terms.length; j++) { 
                            var term = {
                                "name": 
                                    (terms[j].getElementsByTagName("name")[0]
                                        .childNodes.length 
                                    ? terms[j].getElementsByTagName("name")[0]
                                        .childNodes[0].nodeValue
                                    : 'ERROR'),
                                "freq": 
                                    terms[j]
                                    .getElementsByTagName("frequency")[0]
                                    .childNodes[0].nodeValue || 'ERROR'
                            };

			    // Only for xtargets: id, records, filtered
                            var termIdNode = 
                                terms[j].getElementsByTagName("id");
                            if(terms[j].getElementsByTagName("id").length)
                                term["id"] = 
                                    termIdNode[0].childNodes[0].nodeValue;
                            termList[listName][j] = term;

			    var recordsNode  = terms[j].getElementsByTagName("records");
			    if (recordsNode && recordsNode.length)
				term["records"] = recordsNode[0].childNodes[0].nodeValue;
                              
			    var filteredNode  = terms[j].getElementsByTagName("filtered");
			    if (filteredNode && filteredNode.length)
				term["filtered"] = filteredNode[0].childNodes[0].nodeValue;
                              
                        }
                    }

                    context.termCounter++;
                    var delay = context.termTime 
                        + context.termCounter * context.dumpFactor;
                    if ( activeClients > 0 )
                        context.termTimer = 
                            setTimeout(
                                function () {
                                    context.termlist();
                                }, 
                                delay
                            );
                   
                    context.termlistCallback(termList, context.windowid);
                }
                else
                    context.throwError('Termlist failed. Malformed WS resonse.',
                                        116);
            }
        );

    },
    bytarget: function()
    {
        if( !this.initStatusOK && this.useSessions )
            throw new Error(
            'Pz2.js: bytarget command has to be preceded with a search command.'
            );
        
        // no need to continue
        if( !this.searchStatusOK )
            return;

        // if called explicitly takes precedence
        clearTimeout(this.bytargetTimer);
        
        var context = this;
        var request = new pzHttpRequest(this.pz2String, this.errorHandler);
        request.safeGet(
            { 
		"command": "bytarget", 
		"session": this.sessionID, 
		"block": 1,
		"windowid" : this.windowid,
		"version" : this.version
	    },
            function(data) {
                if ( data.getElementsByTagName("status")[0]
                        .childNodes[0].nodeValue == "OK" ) {
                    var targetNodes = data.getElementsByTagName("target");
                    var bytarget = new Array();
                    for ( i = 0; i < targetNodes.length; i++) {
                        bytarget[i] = new Array();
                        for( j = 0; j < targetNodes[i].childNodes.length; j++ ) {
                            if ( targetNodes[i].childNodes[j].nodeType 
                                == Node.ELEMENT_NODE ) {
                                var nodeName = 
                                    targetNodes[i].childNodes[j].nodeName;
				if (targetNodes[i].childNodes[j].firstChild != null) 
				{
                                    var nodeText = targetNodes[i].childNodes[j]
					.firstChild.nodeValue;
                                    bytarget[i][nodeName] = nodeText;
				}
				else { 
				    bytarget[i][nodeName] = "";  
				}


                            }
                        }
                        if (bytarget[i]["state"]=="Client_Disconnected") {
                          bytarget[i]["hits"] = "Error";
                        } else if (bytarget[i]["state"]=="Client_Error") {
                          bytarget[i]["hits"] = "Error";                          
                        } else if (bytarget[i]["state"]=="Client_Working") {
                          bytarget[i]["hits"] = "...";
                        }
                        var targetsSuggestions = targetNodes[i].getElementsByTagName("suggestions");
                        if (targetsSuggestions != undefined && targetsSuggestions.length>0) {
                          var suggestions = targetsSuggestions[0];
                          bytarget[i]["suggestions"] = Element_parseChildNodes(suggestions);
                        }
                    }
                    
                    context.bytargetCounter++;
                    var delay = context.bytargetTime 
                        + context.bytargetCounter * context.dumpFactor;
                    if ( context.activeClients > 0 )
                        context.bytargetTimer = 
                            setTimeout(
                                function () {
                                    context.bytarget();
                                }, 
                                delay
                            );

                    context.bytargetCallback(bytarget, context.windowid);
                }
                else
                    context.throwError('Bytarget failed. Malformed WS resonse.',
                                        117);
            }
        );
    },
    
    // just for testing, probably shouldn't be here
    showNext: function(page)
    {
        var step = page || 1;
        this.show( ( step * this.currentNum ) + this.currentStart );     
    },

    showPrev: function(page)
    {
        if (this.currentStart == 0 )
            return false;
        var step = page || 1;
        var newStart = this.currentStart - (step * this.currentNum );
        this.show( newStart > 0 ? newStart : 0 );
    },

    showPage: function(pageNum)
    {
        //var page = pageNum || 1;
        this.show(pageNum * this.currentNum);
    }
};

/*
********************************************************************************
** AJAX HELPER CLASS ***********************************************************
********************************************************************************
*/
var pzHttpRequest = function (url, errorHandler, cookieDomain, windowId) {
        this.maxUrlLength = 2048;
        this.request = null;
        this.url = url;
        this.errorHandler = errorHandler || null;
        this.async = true;
        this.requestHeaders = {};
        this.isXDR = false;
        this.domainRegex = /https?:\/\/([^:/]+).*/;
        this.cookieDomain = cookieDomain || null;
        this.windowId = windowId || window.name;

        var xhr = new XMLHttpRequest();
        var domain = this._getDomainFromUrl(url);
        if ("withCredentials" in xhr) {
          // XHR for Chrome/Firefox/Opera/Safari.
        } else if (domain && this._isCrossDomain(domain) &&
            typeof XDomainRequest != "undefined") {
          // use XDR (IE7/8) when no other way
          xhr = new XDomainRequest();
          this.isXDR = true;
        } else {
          // CORS not supported.
        }
        this.request = xhr;
};


pzHttpRequest.prototype = 
{
    safeGet: function ( params, callback )
    {
        var encodedParams =  this.encodeParams(params);
        var url = this._urlAppendParams(encodedParams);
        if (url.length >= this.maxUrlLength) {
            this.requestHeaders["Content-Type"]
                = "application/x-www-form-urlencoded";
            this._send( 'POST', this.url, encodedParams, callback );
        } else {
            this._send( 'GET', url, '', callback );
        }
    },

    get: function ( params, callback ) 
    {
        this._send( 'GET', this._urlAppendParams(this.encodeParams(params)), 
            '', callback );
    },

    post: function ( params, data, callback )
    {
        this._send( 'POST', this._urlAppendParams(this.encodeParams(params)), 
            data, callback );
    },

    load: function ()
    {
        this.async = false;
        this.request.open( 'GET', this.url, this.async );
        this.request.send('');
        if ( this.request.status == 200 )
            return this.request.responseXML;
    },

    encodeParams: function (params)
    {
        var sep = "";
        var encoded = "";
        for (var key in params) {
            if (params[key] != null) {
                encoded += sep + key + '=' + encodeURIComponent(params[key]);
                sep = '&';
            }
        }
        return encoded;
    },

    _getDomainFromUrl: function (url)
    {
      if (this.cookieDomain) return this.cookieDomain; //explicit cookie domain
      var m = this.domainRegex.exec(url);
      return (m && m.length > 1) ? m[1] : null;
    },

    _strEndsWith: function (str, suffix) 
    {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
    },

    _isCrossDomain: function (domain)
    {
      if (this.cookieDomain) return true; //assume xdomain is cookie domain set
      return !this._strEndsWith(domain, document.domain); 
    },

    getCookie: function (sKey) {
      return decodeURI(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" 
        + encodeURI(sKey).replace(/[\-\.\+\*]/g, "\\$&") 
        + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },

    setCookie: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { 
        return false; 
      }
      var sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity 
              ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" 
              : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toGMTString();
            break;
        }
      }
      document.cookie = encodeURI(sKey) + "=" + encodeURI(sValue) 
        + sExpires 
        + (sDomain ? "; domain=" + sDomain : "") 
        + (sPath ? "; path=" + sPath : "") 
        + (bSecure ? "; secure" : "");
      return true;
    },
    
    _send: function ( type, url, data, callback)
    {
        var context = this;
        this.callback = callback;
        this.async = true;
        //we never do withCredentials, so if it's CORS and we have
        //session cookie, resend it
        var domain = this._getDomainFromUrl(url);
        if (domain && this._isCrossDomain(domain) &&
            this.getCookie(domain+":"+this.windowId+":SESSID")) {
          //rewrite the URL
          var sessparam = ';jsessionid=' + this.getCookie(domain+":"+this.windowId+":SESSID");
          var q = url.indexOf('?');
          if (q == -1) {
            url += sessparam;            
          } else {
            url = url.substring(0, q) + sessparam + url.substring(q);
          }
        }
        this.request.open( type, url, this.async );
        if (!this.isXDR) {
          //setting headers is only allowed with XHR
          for (var key in this.requestHeaders)
            this.request.setRequestHeader(key, this.requestHeaders[key]);
        }
        if (this.isXDR) {
          this.request.onload = function () {
            //fake XHR props
            context.request.status = 200;
            context.request.readyState = 4;
            //handle
            context._handleResponse(url);
          }
          this.request.onerror = function () {
            //fake XHR props
            context.request.status = 417; //not really, but what can we do
            context.request.readyState = 4;
            //handle
            context._handleResponse(url);
          }
        } else {
          this.request.onreadystatechange = function () {
            context._handleResponse(url); /// url used ONLY for error reporting
          }
        }
        this.request.send(data);
    },

    _urlAppendParams: function (encodedParams)
    {
        if (encodedParams)
            return this.url + "?" + encodedParams;
        else
            return this.url;
    },

    _handleResponse: function (requestUrl)
    {
        if ( this.request.readyState == 4 ) { 
            // pick up appplication errors first
            var errNode = null;
            // xdomainreq does not have responseXML
            if (this.isXDR) {
              if (this.request.contentType.match(/\/xml/)){                
                var dom = new ActiveXObject('Microsoft.XMLDOM');
                dom.async = false;                
                dom.loadXML(this.request.responseText);
                this.request.responseXML = dom;
              } else {
                this.request.responseXML = null;
              }
            }
            if (this.request.responseXML &&
                (errNode = this.request.responseXML.documentElement)
                && errNode.nodeName == 'error') {
                var errMsg = errNode.getAttribute("msg");
                var errCode = errNode.getAttribute("code");
                var errAddInfo = '';
                if (errNode.childNodes.length)
                    errAddInfo = ': ' + errNode.childNodes[0].nodeValue;
                           
                var err = new Error(errMsg + errAddInfo);
                err.code = errCode;
	    
                if (this.errorHandler) {
                    this.errorHandler(err);
                }
                else {
                    throw err;
                }
            } 
            else if (this.request.status == 200 && 
                     this.request.responseXML === null) {
              if (this.request.responseText !== null) {
                //assume JSON
		        var json = null; 
		        var text = this.request.responseText;
		        if (typeof window.JSON == "undefined") {
		          json = eval("(" + text + ")");
                } else { 
		          try {
		    	    json = JSON.parse(text);
		          } catch (e) {
                  }
		        } 
		        this.callback(json, "json");
              } else {
                var err = new Error("XML/Text response is empty but no error " +
                                    "for " + requestUrl);
                err.code = -1;
                if (this.errorHandler) {
                    this.errorHandler(err);
                } else {
                    throw err;
                }
              }
            } else if (this.request.status == 200) {
                //set cookie manually only if cross-domain
                var domain = this._getDomainFromUrl(requestUrl);
                if (domain && this._isCrossDomain(domain)) {
                  var jsessionId = this.request.responseXML
                    .documentElement.getAttribute('jsessionId');
                  if (jsessionId)                  
                    this.setCookie(domain+":"+this.windowId+":SESSID", jsessionId);
                }
                this.callback(this.request.responseXML);
            } else {
                var err = new Error("HTTP response not OK: " 
                            + this.request.status + " - " 
                            + this.request.statusText );
                err.code = '00' + this.request.status;        
                if (this.errorHandler) {
                    this.errorHandler(err);
                }
                else {
                    throw err;
                }
            }
        }
    }
};

/*
********************************************************************************
** XML HELPER FUNCTIONS ********************************************************
********************************************************************************
*/

// DOMDocument

if ( window.ActiveXObject) {
    var DOMDoc = document;
} else {
    var DOMDoc = Document.prototype;
}

DOMDoc.newXmlDoc = function ( root )
{
    var doc;

    if (document.implementation && document.implementation.createDocument) {
        doc = document.implementation.createDocument('', root, null);
    } else if ( window.ActiveXObject ) {
        doc = new ActiveXObject("MSXML2.DOMDocument");
        doc.loadXML('<' + root + '/>');
    } else {
        throw new Error ('No XML support in this browser');
    }

    return doc;
}

   
DOMDoc.parseXmlFromString = function ( xmlString ) 
{
    var doc;

    if ( window.DOMParser ) {
        var parser = new DOMParser();
        doc = parser.parseFromString( xmlString, "text/xml");
    } else if ( window.ActiveXObject ) {
        doc = new ActiveXObject("MSXML2.DOMDocument");
        doc.loadXML( xmlString );
    } else {
        throw new Error ("No XML parsing support in this browser.");
    }

    return doc;
}

DOMDoc.transformToDoc = function (xmlDoc, xslDoc)
{
    if ( window.XSLTProcessor ) {
        var proc = new XSLTProcessor();
        proc.importStylesheet( xslDoc );
        return proc.transformToDocument(xmlDoc);
    } else if ( window.ActiveXObject ) {
        return document.parseXmlFromString(xmlDoc.transformNode(xslDoc));
    } else {
        alert( 'Unable to perform XSLT transformation in this browser' );
    }
}
 
// DOMElement

Element_removeFromDoc = function (DOM_Element)
{
    DOM_Element.parentNode.removeChild(DOM_Element);
}

Element_emptyChildren = function (DOM_Element)
{
    while( DOM_Element.firstChild ) {
        DOM_Element.removeChild( DOM_Element.firstChild )
    }
}

Element_appendTransformResult = function ( DOM_Element, xmlDoc, xslDoc )
{
    if ( window.XSLTProcessor ) {
        var proc = new XSLTProcessor();
        proc.importStylesheet( xslDoc );
        var docFrag = false;
        docFrag = proc.transformToFragment( xmlDoc, DOM_Element.ownerDocument );
        DOM_Element.appendChild(docFrag);
    } else if ( window.ActiveXObject ) {
        DOM_Element.innerHTML = xmlDoc.transformNode( xslDoc );
    } else {
        alert( 'Unable to perform XSLT transformation in this browser' );
    }
}
 
Element_appendTextNode = function (DOM_Element, tagName, textContent )
{
    var node = DOM_Element.ownerDocument.createElement(tagName);
    var text = DOM_Element.ownerDocument.createTextNode(textContent);

    DOM_Element.appendChild(node);
    node.appendChild(text);

    return node;
}

Element_setTextContent = function ( DOM_Element, textContent )
{
    if (typeof DOM_Element.textContent !== "undefined") {
        DOM_Element.textContent = textContent;
    } else if (typeof DOM_Element.innerText !== "undefined" ) {
        DOM_Element.innerText = textContent;
    } else {
        throw new Error("Cannot set text content of the node, no such method.");
    }
}

Element_getTextContent = function (DOM_Element)
{
    if ( typeof DOM_Element.textContent != 'undefined' ) {
        return DOM_Element.textContent;
    } else if (typeof DOM_Element.text != 'undefined') {
        return DOM_Element.text;
    } else {
        throw new Error("Cannot get text content of the node, no such method.");
    }
}

Element_parseChildNodes = function (node)
{
    var parsed = {};
    var hasChildElems = false;
    var textContent = '';

    if (node.hasChildNodes()) {
        var children = node.childNodes;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            switch (child.nodeType) {
              case Node.ELEMENT_NODE:
                hasChildElems = true;
                var nodeName = child.nodeName; 
                if (!(nodeName in parsed))
                    parsed[nodeName] = [];
                parsed[nodeName].push(Element_parseChildNodes(child));
                break;
              case Node.TEXT_NODE:
                textContent += child.nodeValue;
                break;
              case Node.CDATA_SECTION_NODE:
                textContent += child.nodeValue;
                break;
            }
        }
    }

    var attrs = node.attributes;
    for (var i = 0; i < attrs.length; i++) {
        hasChildElems = true;
        var attrName = '@' + attrs[i].nodeName;
        var attrValue = attrs[i].nodeValue;
        parsed[attrName] = attrValue;
    }

    // if no nested elements/attrs set value to text
    if (hasChildElems)
      parsed['#text'] = textContent;
    else
      parsed = textContent;
    
    return parsed;
}

/* do not remove trailing bracket */
}
// Handlebars helpers

Handlebars.registerHelper('mkws-json', function(obj) {
  return mkws.$.toJSON(obj);
});


// This is intended to handle paragraphs from Wikipedia, hence the
// rather hacky code to remove numbered references.
//
Handlebars.registerHelper('mkws-paragraphs', function(obj, nPara, nSent) {
  var acc = [];

  // For some reason, Handlebars provides the value
  // {"hash":{},"data":{}} for parameters that are not provided. So we
  // have to be prepared for actual numbers, explicitly undefined
  // values and this dumb magic value.
  if (obj && (nPara === undefined || nPara.hasOwnProperty('hash') || nPara == 0 || nPara > obj.length)) {
    nPara = obj.length;
  }
  if (nSent === undefined || nSent.hasOwnProperty('hash') || nSent == 0) {
    nSent = Infinity;
  }

  for (var i = 0; i < nPara; i++) {
    // Remove numbered references such as "[1,3,4]" from text
    var text = obj[i].replace(/\[[0-9,]+\]/g, '');
    // Next line from http://stackoverflow.com/questions/18914629/split-string-into-sentences-in-javascript
    var sentences = text.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
    if (sentences.length > nSent)
      sentences.length = nSent;

    acc.push('<p>', sentences.join(' '), '</p>');
    nSent -= sentences.length;
    if (nSent == 0)
      break;
  }

  return acc.join('');
});


Handlebars.registerHelper('mkws-translate', function(s) {
  return mkws.M(s);
});


// We need {{mkws-attr '@name'}} because Handlebars can't parse {{@name}}
Handlebars.registerHelper('mkws-attr', function(attrName) {
  return this[attrName];
});


/*
 * Use as follows: {{#mkws-if-any NAME1 having="NAME2"}}
 * Applicable when NAME1 is the name of an array
 * The guarded code runs only if at least one element of the NAME1
 * array has a subelement called NAME2.
 */
Handlebars.registerHelper('mkws-if-any', function(items, options) {
  var having = options.hash.having;
  for (var i in items) {
    var item = items[i]
    if (!having || item[having]) {
      return options.fn(this);
    }
  }
  return "";
});


Handlebars.registerHelper('mkws-first', function(items, options) {
  var having = options.hash.having;
  for (var i in items) {
    var item = items[i]
    if (!having || item[having]) {
      return options.fn(item);
    }
  }
  return "";
});


Handlebars.registerHelper('mkws-commaList', function(items, options) {
  var out = "";

  for (var i in items) {
    if (i > 0) out += ", ";
    out += options.fn(items[i])
  }

  return out;
});


Handlebars.registerHelper('mkws-index1', function(obj) {
  return obj.data.index + 1;
});

Handlebars.registerHelper('mkws-indexplus', function(delta, obj) {
  return obj.data.index + delta;
});

Handlebars.registerHelper('mkws-repeat', function(count, options) {
  var out = "";
  for (var i = 0; i < count; i++) {
    out += options.fn(this);
  }
  return out;
});

// Ridiculous that Handlebars has no way to do "or"
Handlebars.registerHelper('mkws-if-either', function(cond1, cond2, options) {
  if (typeof cond1 === 'function') { cond1 = cond1.call(this); }
  if (typeof cond2 === 'function') { cond2 = cond2.call(this); }

  if (cond1 || cond2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

// Ridiculous that this, too, is not part of regular Handlebars
// This code is by Mike Griffin, taken from this blog comment:
//      http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/#comment-44

Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {
  var operators, result;

  if (arguments.length < 3) {
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
  }

  if (options === undefined) {
    options = rvalue;
    rvalue = operator;
    operator = "===";
  }

  operators = {
    '==': function (l, r) { return l == r; },
    '===': function (l, r) { return l === r; },
    '!=': function (l, r) { return l != r; },
    '!==': function (l, r) { return l !== r; },
    '<': function (l, r) { return l < r; },
    '>': function (l, r) { return l > r; },
    '<=': function (l, r) { return l <= r; },
    '>=': function (l, r) { return l >= r; },
    'typeof': function (l, r) { return typeof l == r; },
    'matches': function (l, r) { return l.match(r); }
  };

  if (!operators[operator]) {
    throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
  }

  result = operators[operator](lvalue, rvalue);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
/*! MKWS, the MasterKey Widget Set.
 *  Copyright (C) 2013-2015 Index Data
 *  See the file LICENSE for details
 */

"use strict";


// Set up global mkws object. Contains truly global state such as SP
// authentication, and a hash of team objects, indexed by team-name.
//
// We set it as a property of window to make the global explicit as
// some things complain about an implicit global.
window.mkws = {
  $: $, // Our own local copy of the jQuery object
  authenticated: false,
  authenticating: false,
  active: false,
  logger: undefined,
  log_level: "info",
  teams: {},
  widgetType2function: {},
  defaultTemplates: {},

  locale_lang: {
    "de": {
      "Authors": "Autoren",
      "Subjects": "Schlagw&ouml;rter",
      "Sources": "Daten und Quellen",
      "source": "datenquelle",
      "Facets": "Termlisten",
      "Next": "Weiter",
      "Prev": "Zur&uuml;ck",
      "Search": "Suche",
      "Sort by": "Sortieren nach",
      "and show": "und zeige",
      "per page": "pro Seite",
      "Displaying": "Zeige",
      "to": "von",
      "of": "aus",
      "found": "gefunden",
      "Title": "Titel",
      "Author": "Autor",
      "author": "autor",
      "Date": "Datum",
      "Subject": "Schlagwort",
      "subject": "schlagwort",
      "Location": "Bestand",
      "Locations": "Bestand",
      "Records": "Datens&auml;tze",
      "Targets": "Datenbanken",
      "State": "Status",
      "relevance": "Relevanz",
      "title": "Titel",
      "newest": "Neueste",
      "oldest": "&Auml;lteste",

      "dummy": "dummy"
    },

    "da": {
      "Authors": "Forfattere",
      "Subjects": "Emner",
      "Sources": "Kilder",
      "source": "kilder",
      "Facets": "Termlists",
      "Next": "N&aelig;ste",
      "Prev": "Forrige",
      "Search": "S&oslash;g",
      "Sort by": "Sorter efter",
      "and show": "og vis",
      "per page": "per side",
      "Displaying": "Viser",
      "to": "til",
      "of": "ud af",
      "found": "fandt",
      "Title": "Title",
      "Author": "Forfatter",
      "author": "forfatter",
      "Date": "Dato",
      "Subject": "Emneord",
      "subject": "emneord",
      "Location": "Lokation",
      "Locations": "Lokationer",
      "Records": "Poster",
      "Targets": "Baser",
      "State": "Status",
      "relevance": "Relevans",
      "title": "Titel",
      "newest": "Nyeste",
      "oldest": "Ældste",

      "dummy": "dummy"
    }
  }
};

// We may be using a separate copy
if (typeof(mkws_jQuery) !== "undefined") {
  mkws.$ = mkws_jQuery;
} else {
  mkws.$ = jQuery;
}

// It's ridiculous that JSNLog doesn't provide this
mkws.stringToLevel = function(s) {
  if (s === 'trace') {
    return JL.getTraceLevel();
  } else if (s === 'debug') {
    return JL.getDebugLevel();
  } else if (s === 'info') {
    return JL.getInfoLevel();
  } else if (s === 'warn') {
    return JL.getWarnLevel();
  } else if (s === 'error') {
    return JL.getErrorLevel();
  } else if (s === 'fatal') {
    return JL.getFatalLevel();
  } else {
    throw "bad log-level '" + s + "'";
  }
}

mkws.logger = JL('mkws');
var consoleAppender = JL.createConsoleAppender('consoleAppender');
mkws.logger.setOptions({ "appenders": [consoleAppender] });


function _log() {
  var argsAsARealArray = Array.prototype.slice.call(arguments);
  var fn = argsAsARealArray.shift();
  fn.apply(mkws.logger, argsAsARealArray);
};
mkws.trace = function(x) { _log(mkws.logger.trace, x) };
mkws.debug = function(x) { _log(mkws.logger.debug, x) };
mkws.info = function(x) { _log(mkws.logger.info, x) };
mkws.warn = function(x) { _log(mkws.logger.warn, x) };
mkws.error = function(x) { _log(mkws.logger.error, x) };
mkws.fatal = function(x) { _log(mkws.logger.fatal, x) };


// Translation function.
mkws.M = function(word) {
  var lang = mkws.config.lang;

  if (!lang || !mkws.locale_lang[lang])
    return word;

  return mkws.locale_lang[lang][word] || word;
};


// This function is taken from a StackOverflow answer
// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript/901144#901144
mkws.getParameterByName = function(name, url) {
  if (!url) url = location.search;
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(url);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


mkws.registerWidgetType = function(name, fn) {
  if(mkws._old2new.hasOwnProperty(name)) {
      mkws.warn("registerWidgetType old widget name: " + name + " => " + mkws._old2new[name]);
      name = mkws._old2new[name];
  }

  mkws.widgetType2function[name] = fn;
  mkws.info("registered widget-type '" + name + "'");
};

mkws.aliasWidgetType = function(newName, oldName) {
  mkws.widgetType2function[newName] = mkws.widgetType2function[oldName];
  mkws.info("aliased widget-type '" + newName + "' to '" + oldName + "'");

};

mkws.promotionFunction = function(name) {
  return mkws.widgetType2function[name];
};


mkws.setMkwsConfig = function(overrides) {
  var config_default = {
    use_service_proxy: true,
    pazpar2_url: undefined,
    pp2_hostname: "sp-mkws.indexdata.com",
    pp2_path: "service-proxy/",
    service_proxy_auth: undefined,
    sp_auth_path: undefined,
    sp_auth_query: "command=auth&action=perconfig",
    sp_auth_credentials: undefined,
    lang: "",
    sort_options: [["relevance"], ["title:1", "title"], ["date:0", "newest"], ["date:1", "oldest"]],
    perpage_options: [10, 20, 30, 50],
    sort_default: "relevance",
    perpage_default: 20,
    show_lang: true,    /* show/hide language menu */
    show_sort: true,    /* show/hide sort menu */
    show_perpage: true, /* show/hide perpage menu */
    show_switch: true,  /* show/hide switch menu */
    lang_options: [],   /* display languages links for given languages, [] for all */
    facets: ["xtargets", "subject", "author"], /* display facets, in this order, [] for none */
    responsive_design_width: undefined, /* a page with less pixel width considered as narrow */
    log_level: 1,     /* log level for development: 0..2 */
    template_vars: {}, /* values that may be exposed to templates */

    dummy: "dummy"
  };

  mkws.config = mkws.objectInheritingFrom(config_default);
  for (var k in overrides) {
    mkws.config[k] = overrides[k];
  }
};


// This code is from Douglas Crockford's article "Prototypal Inheritance in JavaScript"
// http://javascript.crockford.com/prototypal.html
// mkws.objectInheritingFrom behaves the same as Object.create,
// but since the latter is not available in IE8 we can't use it.
//
mkws.objectInheritingFrom = function(o) {
  function F() {}
  F.prototype = o;
  return new F();
}


// The following functions are dispatchers for team methods that
// are called from the UI using a team-name rather than implicit
// context.
mkws.switchView = function(tname, view) {
  mkws.teams[tname].switchView(view);
};

mkws.showDetails = function(tname, prefixRecId) {
  mkws.teams[tname].showDetails(prefixRecId);
};

mkws.limitTarget  = function(tname, id, name) {
  mkws.teams[tname].limitTarget(id, name);
};

mkws.limitMultipleTargets = function(tname, idsAndNames) {
  mkws.teams[tname].limitMultipleTargets(idsAndNames);
}

mkws.limitQuery  = function(tname, field, value) {
  mkws.teams[tname].limitQuery(field, value);
};

mkws.limitCategory  = function(tname, id) {
  mkws.teams[tname].limitCategory(id);
};

mkws.delimitTarget = function(tname, id) {
  mkws.teams[tname].delimitTarget(id);
};

mkws.delimitQuery = function(tname, field, value) {
  mkws.teams[tname].delimitQuery(field, value);
};

mkws.showPage = function(tname, pageNum) {
  mkws.teams[tname].showPage(pageNum);
};

mkws.pagerPrev = function(tname) {
  mkws.teams[tname].pagerPrev();
};

mkws.pagerNext = function(tname) {
  mkws.teams[tname].pagerNext();
};


mkws.pazpar2_url = function() {
  if (mkws.config.pazpar2_url) {
    mkws.info("using pre-baked pazpar2_url '" + mkws.config.pazpar2_url + "'");
    return mkws.config.pazpar2_url;
  } else {
    var s = document.location.protocol + "//" + mkws.config.pp2_hostname + "/" + mkws.config.pp2_path;
    mkws.info("generated pazpar2_url '" + s + "'");
    return s;
  }
};


// We put a session token in window.name, as it's the only place to
// keep data that is preserved across reloads and within-site
// navigation. pz2.js picks this up and uses it as part of the
// cookie-name, to ensure we get a new session when we need one.
//
// We want to use different sessions for different windows/tabs (so
// they don't receive each other's messages), different hosts and
// different paths on a host (since in general these will
// authenticate as different libraries). So the window name needs to
// include the hostname and the path from the URL, plus the token.
//
var token;
if (window.name) {
  token = window.name.replace(/.*\//, '');
  mkws.debug("Reusing existing window token '" + token + "'");
} else {
  // Incredible that the standard JavaScript runtime doesn't define a
  // unique windowId. Instead, we have to make one up. And since there's
  // no global area shared between windows, the best we can do for
  // ensuring uniqueness is generating a random ID and crossing our
  // fingers.
  //
  // Ten chars from 26 alpha-numerics = 36^10 = 3.65e15 combinations.
  // At one per second, it will take 116 million years to duplicate a token
  token = Math.random().toString(36).slice(2, 12);
  mkws.debug("Generated new window token '" + token + "'");
}

window.name = window.location.hostname + window.location.pathname + '/' + token;
mkws.info("Using window.name '" + window.name + "'");


// wrapper to provide local copy of the jQuery object.
(function($) {
  var _old2new = { // Maps old-style widget names to new-style
    'Authname': 'auth-name',
    'ConsoleBuilder': 'console-builder',
    'Coverart': 'cover-art',
    'GoogleImage': 'google-image',
    'MOTD': 'motd',
    'MOTDContainer': 'motd-container',
    'Perpage': 'per-page',
    'SearchForm': 'search-form',
    'ReferenceUniverse': 'reference-universe',
    'Termlists': 'facets'
  };
  // Annoyingly, there is no built-in way to invert a hash
  var _new2old = {};
  for (var key in _old2new) {
    if(_old2new.hasOwnProperty(key)) {
      _new2old[_old2new[key]] = key;
    }
  }

  mkws._old2new = _old2new;

  function handleNodeWithTeam(node, callback) {
    // First branch for DOM objects; second branch for jQuery objects
    var classes = node.className || node.attr('class');
    if (!classes) {
      // For some reason, if we try to proceed when classes is
      // undefined, we don't get an error message, but this
      // function and its callers, up several stack level,
      // silently return. What a crock.
      mkws.fatal("handleNodeWithTeam() called on node with no classes");
      return;
    }
    var list = classes.split(/\s+/)
    var teamName, type;

    for (var i = 0; i < list.length; i++) {
      var cname = list[i];
      if (cname.match(/^mkws-team-/)) {
        // New-style teamnames of the form mkws-team-xyz
        teamName = cname.replace(/^mkws-team-/, '');
      } else if (cname.match(/^mkwsTeam_/)) {
        // Old-style teamnames of the form mkwsTeam_xyz
        teamName = cname.replace(/^mkwsTeam_/, '');
      } else if (cname.match(/^mkws-/)) {
        // New-style names of the from mkws-foo-bar
        type = cname.replace(/^mkws-/, '');
      } else if (cname.match(/^mkws/)) {
        // Old-style names of the form mkwsFooBar
        var tmp = cname.replace(/^mkws/, '');
        type = _old2new[tmp] || tmp.toLowerCase();
      }
    }

    // Widgets without a team are on team "AUTO"
    if (!teamName) {
      teamName = "AUTO";
      // Autosearch widgets don't join team AUTO if there is already an
      // autosearch on the team or the team has otherwise gotten a query
      if (node.getAttribute("autosearch")) {
        if (mkws.autoHasAuto ||
            mkws.teams["AUTO"] && mkws.teams["AUTO"].config["query"]) {
          mkws.warn("AUTO team already has a query, using unique team");
          teamName = "UNIQUE";
        }
        mkws.autoHasAuto = true;
      }
    }

    // Widgets on team "UNIQUE" get a random team
    if (teamName === "UNIQUE") {
      teamName = Math.floor(Math.random() * 100000000).toString();
    }

    callback.call(node, teamName, type);
  }


  function resizePage() {
    var threshhold = mkws.config.responsive_design_width;
    var width = $(window).width();
    var from, to, method;

    if ((mkws.width === undefined || mkws.width > threshhold) &&
        width <= threshhold) {
      from = "wide"; to = "narrow"; method = "hide";
    } else if ((mkws.width === undefined || mkws.width <= threshhold) &&
               width > threshhold) {
      from = "narrow"; to = "wide"; method = "show";
    }
    mkws.width = width;

    if (from) {
      mkws.info("changing from " + from + " to " + to + ": " + width);
      for (var tname in mkws.teams) {
        var team = mkws.teams[tname];
        team.visitWidgets(function(t, w) {
          var w1 = team.widget(t + "-container-" + from);
          var w2 = team.widget(t + "-container-" + to);
          if (w1) {
            w1.node.hide();
          }
          if (w2) {
            w2.node.show();
            w.node.appendTo(w2.node);
          }
        });
        team.queue("resize-" + to).publish();
      }
    }
  };


  /*
   * Run service-proxy authentication in background (after page load).
   * The username/password is configured in the apache config file
   * for the site.
   */
  function authenticateSession(auth_url, auth_domain, pp2_url) {
    mkws.authenticating = true;
    mkws.info("service proxy authentication on URL: " + auth_url);

    if (!auth_domain) {
      auth_domain = pp2_url.replace(/^(https?:)?\/\/(.*?)\/.*/, '$2');
      mkws.info("guessed auth_domain '" + auth_domain + "' from pp2_url '" + pp2_url + "'");
    }

    var request = new pzHttpRequest(auth_url, function(err) {
      alert("HTTP call for authentication failed: " + err)
      return;
    }, auth_domain);

    request.get(null, function(data) {
      mkws.authenticating = false;
      if (!$.isXMLDoc(data)) {
        alert("Service Proxy authentication response is not a valid XML document");
        return;
      }
      var status = $(data).find("status");
      if (status.text() != "OK") {
        var message = $(data).find("message");
        alert("Service Proxy authentication response: " + status.text() + " (" + message.text() + ")");
        return;
      }

      mkws.info("service proxy authentication successful");
      mkws.authenticated = true;
      var authName = $(data).find("displayName").text();
      // You'd think there would be a better way to do this:
      var realm = $(data).find("realm:not(realmAttributes realm)").text();
      for (var teamName in mkws.teams) {
        mkws.teams[teamName].queue("authenticated").publish(authName, realm);
      }

      runAutoSearches();
    });
  }


  function runAutoSearches() {
    mkws.info("running auto searches");

    for (var teamName in mkws.teams) {
      mkws.teams[teamName].queue("ready").publish();
    }
  }


  function selectorForAllWidgets() {
    if (mkws.config && mkws.config.scan_all_nodes) {
      // This is the old version, which works by telling jQuery to
      // find every node that has a class beginning with "mkws". In
      // theory it should be slower than the class-based selector; but
      // instrumentation suprisingly shows this is consistently
      // faster. It also has the advantage that any widgets of
      // non-registered types are logged as warnings rather than
      // silently ignored.
      return '[class^="mkws"],[class*=" mkws"]';
    } else {
      // This is the new version, which works by looking up the
      // specific classes of all registered widget types and their
      // resize containers. Because all it requires jQuery to do is
      // some hash lookups in pre-built tables, it should be very
      // fast; but it silently ignores widgets of unregistered types.
      var s = "";
      for (var type in mkws.widgetType2function) {
	if (s) s += ',';
	s += '.mkws-' + type;
	s += ',.mkws-' + type + "-container-wide";
	s += ',.mkws-' + type + "-container-narrow";
        // Annoyingly, we also need to recognise old-style names
        var oldtype = _new2old[type] || type.charAt(0).toUpperCase() + type.slice(1);
	s += ',.mkws' + oldtype;
	s += ',.mkws' + oldtype + "-Container-wide";
	s += ',.mkws' + oldtype + "-Container-narrow";
      }
      return s;
    }
  }


  function makeWidgetsWithin(level, node) {
    if (node) var widgetNodes = node.find(selectorForAllWidgets());
    else widgetNodes = $(selectorForAllWidgets());
    // Return false if we parse no widgets
    if (widgetNodes.length < 1) return false;
    widgetNodes.each(function() {
      handleNodeWithTeam(this, function(tname, type) {
        var myTeam = mkws.teams[tname];
        if (!myTeam) {
          myTeam = mkws.teams[tname] = mkws.makeTeam($, tname);
        }

        var oldHTML = this.innerHTML;
        var myWidget = mkws.makeWidget($, myTeam, type, this);
        myTeam.addWidget(myWidget);
        var newHTML = this.innerHTML;
        if (newHTML !== oldHTML) {
          myTeam.info("widget " + type + " HTML changed: reparsing");
          makeWidgetsWithin(level+1, $(this));
        }
      });
    });
    return true;
  }


  // The second "rootsel" parameter is passed to jQuery and is a DOM node
  // or a selector string you would like to constrain the search for widgets to.
  //
  // This function has no side effects if run again on an operating session,
  // even if the element/selector passed causes existing widgets to be reparsed:
  //
  // (TODO: that last bit isn't true and we currently have to avoid reinitialising
  // widgets, MKWS-261)
  //
  // * configuration is not regenerated
  // * authentication is not performed again
  // * autosearches are not re-run
  mkws.init = function(message, rootsel) {
    var greet = "MKWS initialised";
    if (rootsel) greet += " (limited to " + rootsel + ")"
    if (message) greet += " :: " + message;
    mkws.info(greet);

    // MKWS is not active until init() has been run against an object with widget nodes.
    // We only set initial configuration when MKWS is first activated.
    if (!mkws.isActive) {
      var widgetSelector = selectorForAllWidgets();
      if ($(widgetSelector).length < 1) {
        mkws.warn("no widgets found");
        return;
      }

      // Initial configuration
      mkws.autoHasAuto = false;
      var saved_config;
      if (typeof mkws_config === 'undefined') {
        mkws.info("setting empty config");
        saved_config = {};
      } else {
        mkws.info("using config: " + $.toJSON(mkws_config));
        saved_config = mkws_config;
      }
      mkws.setMkwsConfig(saved_config);

      for (var key in mkws.config) {
        if (mkws.config.hasOwnProperty(key)) {
          if (key.match(/^language_/)) {
            var lang = key.replace(/^language_/, "");
            // Copy custom languages into list
            mkws.locale_lang[lang] = mkws.config[key];
            mkws.info("added locally configured language '" + lang + "'");
          }
        }
      }

      var lang = mkws.getParameterByName("lang") || mkws.config.lang;
      if (!lang || !mkws.locale_lang[lang]) {
        mkws.config.lang = ""
      } else {
        mkws.config.lang = lang;
      }

      mkws.info("using language: " + (mkws.config.lang ? mkws.config.lang : "none"));

      // protocol independent link for pazpar2: "//mkws/sp" -> "https://mkws/sp"
      if (mkws.pazpar2_url().match(/^\/\//)) {
        mkws.config.pazpar2_url = document.location.protocol + mkws.config.pazpar2_url;
        mkws.info("adjusted protocol independent link to " + mkws.pazpar2_url());
      }

      if (mkws.config.responsive_design_width) {
        // Responsive web design - change layout on the fly based on
        // current screen width. Required for mobile devices.
        $(window).resize(resizePage);
        // initial check after page load
        $(document).ready(resizePage);
      }
    }

    var then = $.now();
    // If we've made no widgets, return without starting an SP session
    // or marking MKWS active.
    if (makeWidgetsWithin(1, rootsel ? $(rootsel) : undefined) === false) {
      return false;
    }
    var now = $.now();

    mkws.info("walking MKWS nodes took " + (now-then) + " ms");
    for (var tName in mkws.teams) {
      var myTeam = mkws.teams[tName]
      myTeam.makePz2();
      myTeam.info("made PZ2 object");
      /*
        myTeam.visitWidgets(function(t, w) {
          mkws.debug("  has widget of type '" + t + "': " + w);
        });
      */
    }

    function sp_auth_url(config) {
      if (config.service_proxy_auth) {
	mkws.info("using pre-baked sp_auth_url '" + config.service_proxy_auth + "'");
	return config.service_proxy_auth;
      } else {
	var s = '//';
	s += config.sp_auth_hostname ? config.sp_auth_hostname : config.pp2_hostname;
	s += '/';
	s += config.sp_auth_path ? config.sp_auth_path : config.pp2_path;
        var q = config.sp_auth_query;
        if (q) {
          s += '?' + q;
        }
	var c = config.sp_auth_credentials;
	if (c) {
	  s += ('&username=' + c.substr(0, c.indexOf('/')) +
		'&password=' + c.substr(c.indexOf('/')+1));
	}
	mkws.info("generated sp_auth_url '" + s + "'");
	return s;
      }
    }

    if (mkws.config.use_service_proxy && !mkws.authenticated && !mkws.authenticating) {
      authenticateSession(sp_auth_url(mkws.config),
                          mkws.config.service_proxy_auth_domain,
                          mkws.pazpar2_url());
    } else if (!mkws.authenticating) {
      // raw pp2 or we have a session already open
      runAutoSearches();
      for (var teamName in mkws.teams) {
        mkws.teams[teamName].queue("authenticated").publish();
      }
    }

    mkws.isActive = true;
    return true;
  };

  $(document).ready(function() {
    if (!window.mkws_noready && !mkws.authenticating && !mkws.active) {
       mkws.init();
    }
  });

  // Set global log_level flag early so that _log() works
  if (typeof mkws_config !== 'undefined') {
    var tmp = mkws_config.log_level;
    if (typeof tmp !== 'undefined') {
      mkws.logger.setOptions({ "level": mkws.stringToLevel(tmp) });
    }
  }
})(mkws.$);
// Factory function for team objects. As much as possible, this uses
// only member variables (prefixed "m_") and inner functions with
// private scope.
//
// Some functions are visible as member-functions to be called from
// outside code -- specifically, from generated HTML. These functions
// are that.switchView(), showDetails(), limitTarget(), limitMultipleTargets(), limitQuery(),
// limitCategory(), delimitTarget(), delimitQuery(), showPage(),
// pagerPrev(), pagerNext().
//
// Before the team can be used for searching and related operations,
// its pz2 object must be created by calling team.makePz2().
//
mkws.makeTeam = function($, teamName) {
  var that = {};
  var m_teamName = teamName;
  var m_submitted = false;
  var m_query; // initially undefined
  var m_sortOrder; // will be set below
  var m_perpage; // will be set below
  var m_filterSet = filterSet(that);
  var m_totalRecordCount = 0;
  var m_currentPage = 1;
  var m_currentRecordId = '';
  var m_currentRecordData = null;
  var m_logTime = {
    // Timestamps for logging
    "start": $.now(),
    "last": $.now()
  };
  var m_paz; // will be initialised below
  var m_templateText = {}; // widgets can register templates to be compiled
  var m_template = {}; // compiled templates, from any source
  var m_widgets = {}; // Maps widget-type to array of widget objects
  var m_gotRecords = false;

  var config = mkws.objectInheritingFrom(mkws.config);
  that.config = config;

  that.toString = function() { return '[Team ' + teamName + ']'; };

  // Accessor methods for individual widgets: readers
  that.name = function() { return m_teamName; };
  that.submitted = function() { return m_submitted; };
  that.sortOrder = function() { return m_sortOrder; };
  that.perpage = function() { return m_perpage; };
  that.query = function() { return m_query; };
  that.totalRecordCount = function() { return m_totalRecordCount; };
  that.currentPage = function() { return m_currentPage; };
  that.currentRecordId = function() { return m_currentRecordId; };
  that.currentRecordData = function() { return m_currentRecordData; };
  that.filters = function() { return m_filterSet; };
  that.gotRecords = function() { return m_gotRecords; };

  // Accessor methods for individual widgets: writers
  that.set_sortOrder = function(val) { m_sortOrder = val };
  that.set_perpage = function(val) { m_perpage = val };


  // The following PubSub code is modified from the jQuery manual:
  // http://api.jquery.com/jQuery.Callbacks/
  //
  // Use as:
  //    team.queue("eventName").subscribe(function(param1, param2 ...) { ... });
  //    team.queue("eventName").publish(arg1, arg2, ...);
  //
  var m_queues = {};
  function queue(id) {
    if (!m_queues[id]) {
      var callbacks = $.Callbacks();
      m_queues[id] = {
        publish: callbacks.fire,
        subscribe: callbacks.add,
        unsubscribe: callbacks.remove
      };
    }
    return m_queues[id];
  };
  that.queue = queue;


  function _log(fn, s) {
    var now = $.now();
    var timestamp = (((now - m_logTime.start)/1000).toFixed(3) + " (+" +
                     ((now - m_logTime.last)/1000).toFixed(3) + ") ");
    m_logTime.last = now;
    fn.call(mkws.log, m_teamName + ": " + timestamp + s);
    that.queue("log").publish(m_teamName, timestamp, s);
  }

  that.trace = function(x) { _log(mkws.trace, x) };
  that.debug = function(x) { _log(mkws.debug, x) };
  that.info = function(x) { _log(mkws.info, x) };
  that.warn = function(x) { _log(mkws.warn, x) };
  that.error = function(x) { _log(mkws.error, x) };
  that.fatal = function(x) { _log(mkws.fatal, x) };

  that.info("making new widget team");

  m_sortOrder = config.sort_default;
  m_perpage = config.perpage_default;

  // pz2.js event handlers:
  function onInit() {
    that.info("init");
    m_paz.stat();
    m_paz.bytarget();
  }

  function onBytarget(data) {
    that.info("bytarget");
    queue("targets").publish(data);
  }

  function onStat(data) {
    queue("stat").publish(data);
    var hitcount = parseInt(data.hits[0], 10);
    if (!m_gotRecords && hitcount > 0) {
      m_gotRecords = true;
      queue("firstrecords").publish(hitcount);
    }
    if (parseInt(data.activeclients[0], 10) === 0) {
      that.info("complete");
      queue("complete").publish(hitcount);
    }
  }

  function onTerm(data) {
    that.info("term");
    queue("facets").publish(data);
  }

  function onShow(data, teamName) {
    that.info("show");
    m_totalRecordCount = data.merged;
    that.info("found " + m_totalRecordCount + " records");
    queue("pager").publish(data);
    queue("records").publish(data);
  }

  function onRecord(data, args, teamName) {
    that.info("record");
    // FIXME: record is async!!
    clearTimeout(m_paz.recordTimer);
    queue("record").publish(data);
    var detRecordDiv = findnode(recordDetailsId(data.recid[0]));
    if (detRecordDiv.length) {
      // in case on_show was faster to redraw element
      return;
    }
    m_currentRecordData = data;
    var recordDiv = findnode('.' + recordElementId(m_currentRecordData.recid[0]));
    var html = renderDetails(m_currentRecordData);
    $(recordDiv).append(html);
  }


  // create a parameters array and pass it to the pz2's constructor
  // then register the form submit event with the pz2.search function
  // autoInit is set to true on default
  that.makePz2 = function() {
    that.debug("m_queues=" + $.toJSON(m_queues));
    var params = {
      "windowid": teamName,
      "pazpar2path": mkws.pazpar2_url(),
      "usesessions" : config.use_service_proxy ? false : true,
      "showtime": 500,            //each timer (show, stat, term, bytarget) can be specified this way
      "termlist": config.facets.join(',')
    };

    params.oninit = onInit;
    if (m_queues.targets) {
      params.onbytarget = onBytarget;
      that.info("setting bytarget callback");
    }
    if (m_queues.stat || m_queues.firstrecords || m_queues.complete) {
      params.onstat = onStat;
      that.info("setting stat callback");
    }
    if (m_queues.facets && config.facets.length) {
      params.onterm = onTerm;
      that.info("setting term callback");
    }
    if (m_queues.records) {
      that.info("setting show callback");
      params.onshow = onShow;
      // Record callback is subscribed from records callback
      that.info("setting record callback");
      params.onrecord = onRecord;
    }

    m_paz = new pz2(params);
    that.info("created main pz2 object");
  }


  // Used by the Records widget and onRecord()
  function recordElementId(s) {
    return 'mkws-rec_' + s.replace(/[^a-z0-9]/ig, '_');
  }
  that.recordElementId = recordElementId;

  // Used by onRecord(), showDetails() and renderDetails()
  function recordDetailsId(s) {
    return 'mkws-det_' + s.replace(/[^a-z0-9]/ig, '_');
  }


  that.targetFiltered = function(id) {
    return m_filterSet.targetFiltered(id);
  };


  that.limitTarget = function(id, name) {
    that.info("limitTarget(id=" + id + ", name=" + name + ")");
    m_filterSet.add(targetFilter(id, name));
    if (m_query) triggerSearch();
    return false;
  };


  that.limitMultipleTargets = function(idsAndNames) {
    that.info("limitMultipleTargetsTargets", idsAndNames);
    for (var i in idsAndNames) {
      var pair = idsAndNames[i];
      m_filterSet.add(targetFilter(pair[0], pair[1]));
    }
    if (m_query) triggerSearch();
    return false;
  };


  that.limitQuery = function(field, value) {
    that.info("limitQuery(field=" + field + ", value=" + value + ")");
    m_filterSet.add(fieldFilter(field, value));
    if (m_query) triggerSearch();
    return false;
  };


  that.limitCategory = function(id) {
    that.info("limitCategory(id=" + id + ")");
    // Only one category filter at a time
    m_filterSet.removeMatching(function(f) { return f.type === 'category' });
    if (id !== '') m_filterSet.add(categoryFilter(id));
    if (m_query) triggerSearch();
    return false;
  };


  that.delimitTarget = function(id) {
    that.info("delimitTarget(id=" + id + ")");
    m_filterSet.removeMatching(function(f) { return f.type === 'target' });
    if (m_query) triggerSearch();
    return false;
  };


  that.delimitQuery = function(field, value) {
    that.info("delimitQuery(field=" + field + ", value=" + value + ")");
    m_filterSet.removeMatching(function(f) { return f.type == 'field' &&
                                             field == f.field && value == f.value });
    if (m_query) triggerSearch();
    return false;
  };


  that.showPage = function(pageNum) {
    m_currentPage = pageNum;
    m_paz.showPage(m_currentPage - 1);
  };


  that.pagerNext = function() {
    if (m_totalRecordCount - m_perpage*m_currentPage > 0) {
      m_paz.showNext();
      m_currentPage++;
    }
  };


  that.pagerPrev = function() {
    if (m_paz.showPrev() != false)
      m_currentPage--;
  };


  that.reShow = function() {
    resetPage();
    m_paz.show(0, m_perpage, m_sortOrder);
  };


  function resetPage() {
    m_currentPage = 1;
    m_totalRecordCount = 0;
    m_gotRecords = false;
  }
  that.resetPage = resetPage;


  function newSearch(widget, query, sortOrder, maxrecs, perpage, limit, targets, torusquery) {
    that.info("newSearch: " + query);

    if (config.use_service_proxy && !mkws.authenticated) {
      alert("searching before authentication");
      return;
    }

    {
      if (!sortOrder) sortOrder = widget.config.sort;
      if (!maxrecs) maxrecs = widget.config.maxrecs;
      if (!perpage) perpage = widget.config.perpage;
      if (!limit) limit = widget.config.limit;
      if (!targets) targets = widget.config.targets;
      if (!torusquery) torusquery = widget.config.targetfilter;
      var target = widget.config.target;
      if (target) torusquery = 'udb=="' + target + '"';

      var s = "running search: '" + query + "'";
      if (sortOrder) s += " sorted by '" + sortOrder + "'";
      if (maxrecs) s += " restricted to " + maxrecs + " records";
      if (perpage) s += " with " + perpage + " per page";
      if (limit) s += " limited by '" + limit + "'";
      if (targets) s += " in targets '" + targets + "'";
      if (torusquery) s += " constrained by torusquery '" + torusquery + "'";
      that.info(s);
    }

    m_filterSet.removeMatching(function(f) { return f.type !== 'category' });
    triggerSearch(query, sortOrder, maxrecs, perpage, limit, targets, torusquery);
    switchView('records'); // In case it's configured to start off as hidden
    m_submitted = true;
  }
  that.newSearch = newSearch;


  function triggerSearch(query, sortOrder, maxrecs, perpage, limit, targets, torusquery) {
    resetPage();

    // Continue to use previous query/sort-order unless new ones are specified
    if (query) m_query = query;
    if (sortOrder) m_sortOrder = sortOrder;
    if (perpage) m_perpage = perpage;
    if (targets) m_filterSet.add(targetFilter(targets, targets));

    var pp2filter = m_filterSet.pp2filter();
    var pp2limit = m_filterSet.pp2limit(limit);
    var pp2catLimit = m_filterSet.pp2catLimit();
    if (pp2catLimit) {
      pp2filter = pp2filter ? pp2filter + "," + pp2catLimit : pp2catLimit;
    }

    var params = {};
    if (pp2limit) params.limit = pp2limit;
    if (maxrecs) params.maxrecs = maxrecs;
    if (torusquery) {
      if (!mkws.config.use_service_proxy)
        alert("can't narrow search by torusquery when not authenticated");
      params.torusquery = torusquery;
    }

    that.info("triggerSearch(" + m_query + "): filters = " + m_filterSet.toJSON() + ", " +
        "pp2filter = " + pp2filter + ", params = " + $.toJSON(params));

    m_paz.search(m_query, m_perpage, m_sortOrder, pp2filter, undefined, params);
    queue("searchtriggered").publish();
  }

  // fetch record details to be retrieved from the record queue
  that.fetchDetails = function(recId) {
    that.info("fetchDetails() requesting record '" + recId + "'");
    m_paz.record(recId);
  };


  // switching view between targets and records
  function switchView(view) {
    var targets = widgetNode('targets');
    var results = widgetNode('results') || widgetNode('records');
    var blanket = widgetNode('blanket');
    var motd    = widgetNode('motd');

    switch(view) {
    case 'targets':
      if (targets) $(targets).show();
      if (results) $(results).hide();
      if (blanket) $(blanket).hide();
      if (motd) $(motd).hide();
      break;
    case 'records':
      if (targets) $(targets).hide();
      if (results) $(results).show();
      if (blanket) $(blanket).show();
      if (motd) $(motd).hide();
      break;
    default:
      alert("Unknown view '" + view + "'");
    }
  }
  that.switchView = switchView;


  // detailed record drawing
  that.showDetails = function(recId) {
    var oldRecordId = m_currentRecordId;
    m_currentRecordId = recId;

    // remove current detailed view if any
    findnode('#' + recordDetailsId(oldRecordId)).remove();

    // if the same clicked, just hide
    if (recId == oldRecordId) {
      m_currentRecordId = '';
      m_currentRecordData = null;
      return;
    }
    // request the record
    that.info("showDetails() requesting record '" + recId + "'");
    m_paz.record(recId);
  };


  // Finds the node of the specified class within the current team
  function findnode(selector, teamName) {
    teamName = teamName || m_teamName;

    if (teamName === 'AUTO') {
      selector = (selector + '.mkws-team-' + teamName + ',' +
                  selector + ':not([class^="mkws-team"],[class*=" mkws-team"])');
    } else {
      selector = selector + '.mkws-team-' + teamName;
    }

    var node = $(selector);
    //that.debug('findnode(' + selector + ') found ' + node.length + ' nodes');
    return node;
  }


  function widgetNode(type) {
    var w = that.widget(type);
    return w ? w.node : undefined;
  }

  function renderDetails(data, marker) {
    var template = loadTemplate("details");
    var details = template(data);
    return '<div class="mkws-details mkwsDetails mkwsTeam_' + m_teamName + '" ' +
      'id="' + recordDetailsId(data.recid[0]) + '">' + details + '</div>';
  }
  that.renderDetails = renderDetails;


  that.registerTemplate = function(name, text) {
    if(mkws._old2new.hasOwnProperty(name)) {
      that.warn("registerTemplate: old widget name: " + name + " => " + mkws._old2new[name]);
      name = mkws._old2new[name];
    }
    m_templateText[name] = text;
  };


  function loadTemplate(name, fallbackString) {
    if(mkws._old2new.hasOwnProperty(name)) {
       that.warn("loadTemplate: old widget name: " + name + " => " + mkws._old2new[name]);
       name = mkws._old2new[name];
    }

    var template = m_template[name];
    if (template === undefined && Handlebars.compile) {
      var source;
      var node = $(".mkws-template-" + name + " .mkws-team-" + that.name());
      if (node && node.length < 1) {
        node = $(".mkws-template-" + name);
      }
      if (node) source = node.html();
      if (!source) source = m_templateText[name];
      if (source) {
        template = Handlebars.compile(source);
        that.info("compiled template '" + name + "'");
      }
    }
    //if (template === undefined) template = mkws_templatesbyteam[m_teamName][name];
    if (template === undefined && Handlebars.templates) {
      template = Handlebars.templates["mkws-template-" + name];
    }
    if (template === undefined && mkws.defaultTemplates) {
      template = mkws.defaultTemplates[name];
    }
    if (template) {
      m_template[name] = template;
      return template;
    }
    else {
      that.info("No MKWS template for " + name);
      return null;
    }
  }
  that.loadTemplate = loadTemplate;


  that.addWidget = function(w) {
    if (m_widgets[w.type] === undefined) {
      m_widgets[w.type] = [ w ];
    } else {
      m_widgets[w.type].push(w);
    }
  }

  that.widget = function(type) {
    var list = m_widgets[type];

    if (!list)
      return undefined;
    if (list.length > 1) {
      alert("widget('" + type + "') finds " + list.length + " widgets: using first");
    }
    return list[0];
  }

  that.visitWidgets = function(callback) {
    for (var type in m_widgets) {
      var list = m_widgets[type];
      for (var i = 0; i < list.length; i++) {
        var res = callback(type, list[i]);
        if (res !== undefined) {
          return res;
        }
      }
    }
    return undefined;
  };

  return that;
};
// Factory function for sets of filters.
function filterSet(team) {
  var m_team = team;
  var m_list = [];

  var that = {};

  that.toJSON = function() {
    return mkws.$.toJSON(m_list);
  };

  that.add = function(filter) {
    m_list.push(filter);
  };

  that.visitTargets = function(callback) {
    for (var i in m_list) {
      var filter = m_list[i];
      if (filter.type === 'target') {
        callback(filter.id, filter.name);
      }
    }
  };

  that.visitFields = function(callback) {
    for (var i in m_list) {
      var filter = m_list[i];
      if (filter.type === 'field') {
        callback(filter.field, filter.value);
      }
    }
  };

  that.visitCategories = function(callback) {
    for (var i in m_list) {
      var filter = m_list[i];
      if (filter.type === 'category') {
        callback(filter.id);
      }
    }
  };

  that.removeMatching = function(matchFn) {
    var newList = [];
    for (var i in m_list) {
      var filter = m_list[i];
      if (matchFn(filter)) {
        m_team.info("removeMatching: removing filter " + mkws.$.toJSON(filter));
      } else {
        m_team.info("removeMatching: keeping filter " + mkws.$.toJSON(filter));
        newList.push(filter);
      }
    }
    m_list = newList;
  };

  that.targetFiltered = function(id) {
    for (var i = 0; i < m_list.length; i++) {
      if (m_list[i].type === 'target' ||
          m_list[i].id === 'pz:id=' + id) {
        return true;
      }
    }
    return false;
  };

  that.pp2filter = function() {
    var res = "";

    that.visitTargets(function(id, name) {
      if (res) res += "|";
      if (id.match(/^[a-z:]+[=~]/)) {
        var newId = id.replace(/^[a-z:]+[=~]/, '');
        m_team.info("filter '" + id + "' already begins with SETTING OP: changed to '" + newId + "'");
        id = newId;
      }
      res += id;
    });

    return res ? 'pz:id=' + res : "";
  };

  that.pp2limit = function(initial) {
    var res = initial || "";

    that.visitFields(function(field, value) {
      if (res) res += ",";
      res += field + "=" + value.replace(/[\\|,]/g, '\\$&');
    });
    return res;
  }

  that.pp2catLimit = function() {
    var res = "";

    that.visitCategories(function(id) {
      if (res) res += ",";
      res += "category~" + id.replace(/[\\,]/g, '\\$&');
    });
    return res;
  }

  return that;
}


// Factory functions for filters. These can be of several types.
function targetFilter(id, name) {
  return {
    type: 'target',
    id: id,
    name: name
  };
}

function fieldFilter(field, value) {
  return {
    type: 'field',
    field: field,
    value: value
  };
}

function categoryFilter(id) {
  return {
    type: 'category',
    id: id
  };
}
// Factory function for widget objects.
mkws.makeWidget = function($, team, type, node) {
  // Static register of attributes that do not contribute to config
  var ignoreAttrs = {
    id:1, 'class':1, style:1, name:1, action:1, type:1, size:1,
    value:1, width:1, valign:1
  };

  var that = {
    team: team,
    type: type,
    node: $(node),
    config: mkws.objectInheritingFrom(team.config)
  };

  that.trace = team.trace;
  that.debug = team.debug;
  that.info = team.info;
  that.warn = team.warn;
  that.error = team.error;
  that.fatal = team.fatal;

  that.toString = function() {
    return '[Widget ' + team.name() + ':' + type + ']';
  };

  that.value = function() {
    return node.value;
  };

  // Returns the HTML of a subwidget of the specified type. It gets
  // the same attributes at the parent widget that invokes this
  // function, except where overrides are passed in. If defaults are
  // also provided, then these are used when the parent widget
  // provides no values.
  that.subwidget = function(type, overrides, defaults) {
    var attrs = { _team: team.name() };
    
    // Copy locally-set properties from the parent widget
    for (var name in this.config) {
      if (this.config.hasOwnProperty(name)) {
        attrs[name] = this.config[name];
        this.info(this + " copied property " + name + "='" + attrs[name] + "' to " + type + " subwidget");
      }
    }
    
    for (var name in overrides) {
      this.info(this + " overrode property " + name + "='" + overrides[name] + "' (was '" + attrs[name] + "') for " + type + " subwidget");
      attrs[name] = overrides[name];
    }

    if (defaults) {
      for (var name in defaults) {
        if (!attrs[name]) {
          attrs[name] = defaults[name];
          this.info(this + " fell back to default property " + name + "='" + attrs[name] + "' for " + type + " subwidget");
        }
      }
    }

    var s = [];
    s.push('<div class="mkws', type, ' mkws-team-', attrs._team, '"');
    for (var name in attrs) {    
      if (name !== '_team')
        s.push(' ', name, '="', attrs[name], '"');
    }
    s.push('></div>');
    return s.join('');
  };

  function expandValue(val) {
    if (val.match(/^!param!/)) {
      var param = val.replace(/^!param!/, '');
      var optional = param.match(/^\?/);
      if (optional) {
        param = param.replace(/^\?/, ''); 
      }
      val = mkws.getParameterByName(param);
      that.info("obtained val '" + val + "' from param '" + param + "'");
      if (!val && !optional) {
        alert("This page has a MasterKey widget that needs a val specified by the '" + param + "' parameter");
      }
    } else if (val.match(/^!path!/)) {
      var index = val.replace(/^!path!/, '');
      var path = window.location.pathname.split('/');
      val = path[path.length - index];
      that.info("obtained val '" + val + "' from path-component '" + index + "'");
      if (!val) {
        alert("This page has a MasterKey widget that needs a val specified by the path-component " + index);
      }
    } else if (val.match(/^!var!/)) {
      var name = val.replace(/^!var!/, '');
      val = window[name]; // It's ridiculous that this works
      that.info("obtained val '" + val + "' from variable '" + name + "'");
      if (!val) {
        alert("This page has a MasterKey widget that needs a val specified by the '" + name + "' variable");
      }
    }
    return val;
  };

  // Utility function for use by all widgets that can invoke autosearch.
  that.autosearch = function() {
    var that = this;
    var query = this.config.autosearch;
    if (query) {
      // Should do this more elegantly with message passing
      var widget = this.team.widget('query');
      if (widget) { widget.node.val(query); }

      this.team.queue("ready").subscribe(function() {
        // Postpone search until the team is ready: configuration
        // items are not yet set for Record subclass widgets that fill
        // them in in the subclass, as widget.autosearch is called in
        // the superclass, before the subclass fiddles with the
        // configuration.
        that.team.newSearch(that, query);
      });
    }
  };

  // Utility function for all widgets that want to hide in narrow windows
  that.hideWhenNarrow = function() {
    var that = this;
    this.team.queue("resize-narrow").subscribe(function(n) {
      that.node.hide();
    });
    this.team.queue("resize-wide").subscribe(function(n) {
      that.node.show();
    });
  };


  for (var i = 0; i < node.attributes.length; i++) {
    var a = node.attributes[i];
    var val = expandValue(a.value);
    if (a.name === 'data-mkws-config') {
      // Treat as a JSON fragment configuring just this widget
      this.info(node + ": parsing config fragment '" + val + "'");
      var data;
      try {
        data = $.parseJSON(val);
        for (var key in data) {
          this.info(node + ": adding config element " + key + "='" + data[key] + "'");
          that.config[key] = data[key];
        }
      } catch (err) {
        alert("Can't parse " + node + " data-mkws-config as JSON: " + val);
      }
    } else if (a.name.match (/^data-mkws-/)) {
      var name = a.name.replace(/^data-mkws-/, '')
      that.config[name] = val;
      this.info(that + ": set data-mkws attribute " + name + "='" + val + "'");
    } else if (!ignoreAttrs[a.name]) {
      that.config[a.name] = val;
      this.info(that + ": set regular attribute " + a.name + "='" + val + "'");
    }
  }

  var fn = mkws.promotionFunction(type);
  if (fn) {
    fn.call(that);
    this.info("made " + type + " widget(node=" + node + ")");
  } else if (type.match(/-[Cc]ontainer-(narrow|wide)$/)) {
    // Not really a widget: no need to log its lack of promotion
  } else {
    this.info("made UNPROMOTED widget(type=" + type + ", node=" + node + ")");
  }

  return that;
};
(function($) { // jQuery wrapper

// Functions follow for promoting the regular widget object into
// widgets of specific types. These could be moved into their own
// source files.


mkws.registerWidgetType('targets', function() {
  if (!this.config.show_switch) return;
  var that = this;

  this.node.html('No information available yet.');
  this.node.css("display", "none");

  this.team.queue("targets").subscribe(function(data) {
    // There is a bug in pz2.js wherein it makes each data object an array but
    // simply assigns properties to it.
    // TODO: remove this when PAZ-946 is addressed.
    var cleandata = [];
    for (var i = 0; i < data.length; i++) {
      var cur = {};
      cur.name = data[i].name;
      cur.id = data[i].id;
      cur.hits = data[i].hits;
      cur.diagnostic = data[i].diagnostic;
      cur.message = data[i].message;
      cur.records = data[i].records;
      cur.state = data[i].state.replace(/^Client_/, '');
      cleandata.push(cur);
    }

    cleandata.sort(function(a,b) { return a.name.localeCompare(b.name) });

    var template = that.team.loadTemplate(that.config.template || "targets");
    that.node.html(template({data: cleandata}));
  });
});


mkws.registerWidgetType('stat', function() {
  var that = this;
  this.team.queue("stat").subscribe(function(data) {
    var template = that.team.loadTemplate(that.config.template || "stat");
    that.node.html(template(data));
  });
});


mkws.registerWidgetType('pager', function() {
  var that = this;
  var M = mkws.M;

  this.team.queue("pager").subscribe(function(data) {
    var teamName = that.team.name();
    var output = {};
    output.first = data.start + 1;
    output.last = data.start + data.num;
    output.count = data.merged;
    output.found = data.total;

    //client indexes pages from 1 but pz2 from 0
    var onsides = 5;
    var pages = Math.ceil(that.team.totalRecordCount() / that.team.perpage());
    var currentPage = that.team.currentPage();

    var firstClkbl = (currentPage - onsides > 0)
      ? currentPage - onsides
      : 1;
    var lastClkbl = firstClkbl + 2*onsides < pages
      ? firstClkbl + 2*onsides
      : pages;

    if (firstClkbl > 1) output.morePrev = true;
    if (lastClkbl < pages) output.moreNext = true;

    if (currentPage > 1) output.prevClick = "mkws.pagerPrev(\'" + teamName + "\');";

    output.pages = [];
    for(var i = firstClkbl; i <= lastClkbl; i++) {
      var o = {};
      o.number = i;
      if (i !== currentPage) {
        o.click = "mkws.showPage(\'" + teamName + "\', " + i + ");";
      }
      output.pages.push(o);
    }

    if (pages - currentPage > 0) output.nextClick = "mkws.pagerNext(\'" + teamName + "\')";

    var template = that.team.loadTemplate(that.config.template || "pager");
    that.node.html(template(output));
  });
});

mkws.registerWidgetType('details', function() {
  var that = this;
  var recid = that.node.attr("data-mkws-recid");
  if (this.team.gotRecords()) { 
    that.team.fetchDetails(recid);
  } else {
    this.team.queue("firstrecords").subscribe(function() {
      that.team.fetchDetails(recid);
    });
  }
  this.team.queue("record").subscribe(function(data) {
    if ($.inArray(recid, data.recid) > -1) {
      var template = that.team.loadTemplate(that.config.template || "details");
      that.node.html(template(data));
    }
  });
});

mkws.registerWidgetType('records', function() {
  var that = this;
  var team = this.team;

  this.team.queue("searchtriggered").subscribe(function() {
    var op = that.config.newsearch_opacity;
    if (op !== undefined) { that.node.fadeTo(500, op); }
  });

  var m_dataToRedraw = null;
  function refreshRecordData() {
    that.node.css('opacity', 1);

    if (m_dataToRedraw) {
      for (var i = 0; i < m_dataToRedraw.hits.length; i++) {
        var hit = m_dataToRedraw.hits[i];
        hit.detailLinkId = team.recordElementId(hit.recid[0]);
        hit.detailClick = "mkws.showDetails('" + team.name() + "', '" + hit.recid[0] + "');return false;";
        hit.containerClass = "mkws-summary mkwsSummary mkws-team-" + team.name();
        hit.containerClass += " " + hit.detailLinkId;
        // ### At some point, we may be able to move the
        // m_currentRecordId and m_currentRecordData members
        // from the team object into this widget.
        if (hit.recid == team.currentRecordId()) {
          if (team.currentRecordData()) {
            hit.renderedDetails = team.renderDetails(team.currentRecordData());
          } 
        }

        var urls = hit['md-electronic-url'];
        if (!urls && hit.location && hit.location[0]) {
          urls = hit.location[0]['md-electronic-url'];
        }

        if (urls) {
          var bestLink = null;
          var otherLinks = [];
          for (var j = 0; j < urls.length; j++) {
            var url = urls[j];
            if (!url.match(/^(https?:)?\/\//)) {
              that.warn("link '" + url + "' is not a valid URL");
            } else if (!bestLink) {
              bestLink = url;
            } else {
              otherLinks.push(url);
            }
          }
          hit.bestLink = bestLink;
          hit.otherLinks = otherLinks;
        }
      }

      var template = team.loadTemplate(that.config.template || "records");
      var summaryPartial = team.loadTemplate(that.config['summary-template'] || "summary");
      var tdata = $.extend({}, {"hits": m_dataToRedraw.hits}, that.config.template_vars);
      that.node.html(template(tdata, {"partials":{"summary":summaryPartial}}));
    }

    m_dataToRedraw = null;
  }

  var m_frozen = false;
  this.team.queue("records").subscribe(function(data) {
    m_dataToRedraw = data;
    if (!m_frozen) {
      refreshRecordData();
    }
  });

  var m_timer;
  this.node.mousemove(function() {
    var op = that.config.freeze_opacity;
    if (op !== undefined) { that.node.css('opacity', op); }
    m_frozen = true;
    clearTimeout(m_timer);
    m_timer = setTimeout(unfreezeRecordDisplay, 1000);
  });

  function unfreezeRecordDisplay() {
    clearTimeout(m_timer);
    that.node.css('opacity', 1);
    m_frozen = false;
    refreshRecordData();
  }
  this.node.mouseleave(unfreezeRecordDisplay);

  that.autosearch();
});


mkws.registerWidgetType('navi', function() {
  var that = this;
  var teamName = this.team.name();

  this.team.queue("searchtriggered").subscribe(function() {
    var filters = that.team.filters();
    var output = {filters:[]};

    filters.visitTargets(function(id, name) {
      var cur = {};
      cur.facet = 'source';
      cur.value = name;
      cur.click = "mkws.delimitTarget('" + teamName + "', '" + id + "'); return false;";
      output.filters.push(cur);
    });

    filters.visitFields(function(field, value) {
      var cur = {};
      cur.facet = field;
      cur.value = value;
      cur.click = "mkws.delimitQuery('" + teamName + "', '" + field + "', '" + value + "'" + ");return false;";
      output.filters.push(cur);
    });

    var template = that.team.loadTemplate(that.config.template || "navi");
    that.node.html(template(output));
  });
});


// It seems this and the Perpage widget doen't need to subscribe to
// anything, since they produce events rather than consuming them.
//
mkws.registerWidgetType('sort', function() {
  var that = this;

  this.node.change(function() {
    that.team.set_sortOrder(that.node.val());
    if (that.team.submitted()) {
      that.team.reShow();
    }
    return false;
  });
});


mkws.registerWidgetType('per-page', function() {
  var that = this;

  this.node.change(function() {
    that.team.set_perpage(that.node.val());
    if (that.team.submitted()) {
      that.team.reShow();
    }
    return false;
  });
});


mkws.registerWidgetType('done', function() {
  var that = this;
  this.team.queue("complete").subscribe(function(n) {
    var template = that.team.loadTemplate(that.config.template || "done");
    that.node.html(template({count: n}));
  });
});


mkws.registerWidgetType('switch', function() {
  if (!this.config.show_switch) return;
  var tname = this.team.name();
  var output = {};
  output.recordClick = "mkws.switchView(\'" + tname + "\', \'records\')";
  output.targetClick = "mkws.switchView(\'" + tname + "\', \'targets\')";
  var template = this.team.loadTemplate(this.config.template || "switch");
  this.node.html(template(output));
  this.hideWhenNarrow();
});


mkws.registerWidgetType('search', function() {
  var output = {};
  output.team = this.team.name();
  var template = this.team.loadTemplate(this.config.template || "search");
  this.node.html(template(output));
});


mkws.registerWidgetType('search-form', function() {
  var team = this.team;
  var that = this;
  this.node.submit(function() {
    var val = team.widget('query').value();
    if (team.widget('query-field')) {
      // If there's a query-field widget, it must name its radio-buttons "field"
      val = that.node.context.field.value + '=' + val;
    }
    team.newSearch(that, val);
    return false;
  });
});


mkws.registerWidgetType('results', function() {
  var template = this.team.loadTemplate(this.config.template || "results");
  this.node.html(template({team: this.team.name()}));
  this.autosearch();
});


mkws.registerWidgetType('ranking', function() {
  var output = {};
  output.perPage = [];
  output.sort = [];
  output.team = this.team.name();
  output.showSort = this.config.show_sort;
  output.showPerPage = this.config.show_perpage;

  var order = this.team.sortOrder();
  this.info("making sort, sortOrder = '" + order + "'");
  for (var i = 0; i < this.config.sort_options.length; i++) {
    var cur = {};
    var opt = this.config.sort_options[i];
    cur.key = opt[0];
    cur.label = opt.length == 1 ? opt[0] : mkws.M(opt[1]);
    if (order == cur.key || order == cur.label) cur.selected = true;
    output.sort.push(cur);
  }

  var perpage = this.team.perpage();
  this.info("making perpage, perpage = " + perpage);
  for(var i = 0; i < this.config.perpage_options.length; i++) {
    var cur = {};
    cur.perPage = this.config.perpage_options[i];
    if (cur.perPage == perpage) cur.selected = true;
    output.perPage.push(cur);
  }

  var template = this.team.loadTemplate(this.config.template || "ranking");
  this.node.html(template(output));
});


mkws.registerWidgetType('lang', function() {
  // dynamic URL or static page? /path/foo?query=test
  /* create locale language menu */
  if (!this.config.show_lang) return;

  var lang_default = "en";
  var lang = this.config.lang || lang_default;
  var list = [];

  /* display a list of configured languages, or all */
  var lang_options = this.config.lang_options;
  var toBeIncluded = {};
  for (var i = 0; i < lang_options.length; i++) {
    toBeIncluded[lang_options[i]] = true;
  }

  for (var k in mkws.locale_lang) {
    if (toBeIncluded[k] || lang_options.length == 0) {
      cur = {};
      if (lang === k) cur.selected = true;
      cur.code = k;
      cur.url = lang_url(k);
      list.push(cur);
    }
  }

  // add english link
  if (lang_options.length == 0 || toBeIncluded[lang_default]) {
      cur = {};
      if (lang === lang_default) cur.selected = true;
      cur.code = lang_default;
      cur.url = lang_url(lang_default);
      list.push(cur);
  }

  this.info("language menu: " + list.join(", "));

  var template = this.team.loadTemplate(this.config.template || "lang");
  this.node.html(template({languages: list}));
  this.hideWhenNarrow();

  // set or re-set "lang" URL parameter
  function lang_url(lang) {
    var query = location.search;
    // no query parameters? done
    if (!query) {
      return "?lang=" + lang;
    }

    // parameter does not exist
    if (!query.match(/[\?&]lang=/)) {
      return query + "&lang=" + lang;
    }

    // replace existing parameter
    query = query.replace(/\?lang=([^&#;]*)/, "?lang=" + lang);
    query = query.replace(/\&lang=([^&#;]*)/, "&lang=" + lang);
    return query;
  }
});


mkws.registerWidgetType('motd', function() {
  var container = this.team.widget('motd-container');
  if (container) {
    // Move the MOTD from the provided element down into the container
    this.node.appendTo(container.node);
  }
});


// This widget has no functionality of its own, but its configuration
// is copied up into its team, allowing it to affect other widgets in
// the team.
//
mkws.registerWidgetType('config', function() {
  var c = this.config;
  for (var name in c) {
    if (c.hasOwnProperty(name)) {
      this.team.config[name] = c[name];
      this.info(this + " copied property " + name + "='" + c[name] + "' up to team");
    }
  }
});


mkws.registerWidgetType('progress', function() {
  var that = this;
  this.node.hide();
  this.team.queue("stat").subscribe(function(data) {
    var template = that.team.loadTemplate(that.config.template || "progress");
    that.node.html(template({
      done: data.clients - data.activeclients,
      waiting: data.activeclients
    }));
    that.node.show();
  });
});


mkws.registerWidgetType('waiting', function() {
  var that = this;

  this.node.css("visibility", "hidden");
  var template = that.team.loadTemplate(that.config.template || "waiting");
  this.node.html(template({
    src: this.config.src || "//mkws.indexdata.com/progress.gif"
  }));

  this.team.queue("searchtriggered").subscribe(function(data) {
    that.node.css("visibility", "visible");
  });
  this.team.queue("complete").subscribe(function(n) {
    that.node.css("visibility", "hidden");
  });
});


// Some elements have mkws* classes that makes them appear as widgets
// -- for example, because we want to style them using CSS -- but have
// no actual functionality. We register these to prevent ignorable
// warnings when they occur.

mkws.registerWidgetType('query', function() {});
mkws.registerWidgetType('query-field', function() {});
mkws.registerWidgetType('motd-container', function() {});
mkws.registerWidgetType('button', function() {});


})(mkws.$); // jQuery wrapper
mkws.registerWidgetType('facets', function() {
  // Initially hide the facets; display when we get results
  var that = this;
  var team = this.team;

  this.team.queue("searchtriggered").subscribe(function() {
    var op = that.config.newsearch_opacity;
    if (op !== undefined) { that.node.fadeTo(500, op); }
  });

  team.queue("facets").subscribe(function(data) {
    that.node.css('opacity', 1);
    that.node.addClass("active");
  });

  var template = team.loadTemplate(this.config.template || "facets");
  this.node.html(template({
    team: team.name(),
    facets: this.config.facets
  }));
  this.autosearch();
});


mkws.registerWidgetType('facet', function() {
  var facetConfig = {
    xtargets: [ "Sources",  16, false ],
    subject:  [ "Subjects", 10, true ],
    author:   [ "Authors",  10, true ]
  }
  var that = this;
  var team = this.team;
  var name = that.config.facet;
  var ref = facetConfig[name] || [ "Unknown", 10, true ];
  var caption = this.config['facet_caption_' + name] || ref[0];
  var max     = parseInt(this.config['facet_max_' + name] || ref[1]);
  var pzIndex = ref[2] ? name : null;

  that.toString = function() {
    return '[Widget ' + team.name() + ':' + that.type + '(' + name + ')]';
  };

  team.queue("facets").subscribe(function(data) {
    data = data[name];
    var terms = [];
    var teamName = team.name();
    for (var i = 0; i < data.length && i < max; i++) {
      var linkdata = "";
      var action = "";
      if (!pzIndex) {
        // Special case: target selection
        linkdata += ('target_id='+data[i].id+' ');
        if (!team.targetFiltered(data[i].id)) {
          action = 'mkws.limitTarget(\'' + teamName + '\', this.getAttribute(\'target_id\'),this.firstChild.nodeValue)';
        }
      } else {
        action = 'mkws.limitQuery(\'' + teamName + '\', \'' + pzIndex + '\', this.firstChild.nodeValue)';
      }
      linkdata += 'onclick="' + action + ';return false;"';
      terms.push({
        term: data[i].name,
        field: data[i].id,
        count: data[i].freq,
        linkdata: linkdata
      }); 
    }
    // configured template > facet specific template > default facet template
    var template;
    if (that.config.template) {
      template = team.loadTemplate(that.config.template);
    } else {
      template = team.loadTemplate("facet-" + name);
      if (template) {
        that.info("Using facet-" + name + " template.")
      } else {
        that.info("No " + name + " specific template, using default.")
        template = team.loadTemplate("facet");
      }
    }
    that.node.html(template({
      team: teamName,
      name: name,
      caption: caption,
      terms: terms
    }));
  });
  this.autosearch();
});
mkws.registerWidgetType('auth-name', function() {
  var that = this;

  this.team.queue("authenticated").subscribe(function(authName) {
    that.node.html(authName);
  });
});
mkws.registerWidgetType('categories', function() {
  var that = this;

  this.team.queue("authenticated").subscribe(function(authName, realm) {
    var req = new pzHttpRequest(mkws.pazpar2_url() + "?command=categories", function(err) {
      alert("HTTP call for categories failed: " + err)
    });

    req.get(null, function(data) {
      var $ = mkws.$;
      if (!$.isXMLDoc(data)) {
        alert("categories response document is not XML");
        return;
      }
      that.info("got categories: " + data);

      var text = [];
      text.push("Select category: ");
      text.push("<select name='mkws-category mkwsCategory' " +
                "onchange='mkws.limitCategory(\"" + that.team.name() + "\", this.value)'>");
      text.push("<option value=''>[All]</option>");
      $(data).find('category').each(function() {
        var name = $(this).find('categoryName').text();
        var id = $(this).find('categoryId').text();
        text.push("<option value='", id, "'>", name, "</option>");
      });
      text.push("</select>");
      that.node.html(text.join(''));
    });
  });
});
mkws.registerWidgetType('log', function() {
  var that = this;

  this.team.queue("log").subscribe(function(teamName, timestamp, message) {
    that.node.append(teamName + ": " + timestamp + message + "<br/>");
  });
});
// A widget for a record-list of a single record
mkws.registerWidgetType('record', function() {
  if (!this.config.maxrecs) this.config.maxrecs = 1;
  var that = this;
  var team = this.team;
  team.queue("records").subscribe(function(data) {
    var template = team.loadTemplate(that.config.template || "details");
    var targs = mkws.$.extend({}, data.hits[0], that.config.template_vars);
    that.node.html(template(targs));
  });
  that.autosearch();
});

mkws.registerWidgetType('images', function() {
  mkws.promotionFunction('records').call(this);
  if (!this.config.template) this.config.template = 'images';
});

mkws.registerWidgetType('google-image', function() {
  mkws.promotionFunction('images').call(this);
  if (!this.config.target) this.config.target = 'Google_Images';
});

mkws.registerWidgetType('lolcat', function() {
  mkws.promotionFunction('google-image').call(this);
  if (!this.config.autosearch) this.config.autosearch = 'kitteh';
});

mkws.registerWidgetType('cover-art', function() {
  mkws.promotionFunction('images').call(this);
  if (!this.config.target) this.config.target = 'AmazonBooks';
});
mkws.registerWidgetType('wikipedia', function() {
  mkws.promotionFunction('record').call(this);
  if (!this.config.target) this.config.target = 'wikimedia_wikipedia_single_result';
  if (!this.config.template) this.config.template = 'wikipedia';
  this.config.template_vars.paragraphs = this.config.paragraphs || 0;
  this.config.template_vars.sentences = this.config.sentences || 0;
  this.config.template_vars.credit = this.config.credit || "Wikipedia";
});
mkws.aliasWidgetType('reference', 'wikipedia');
mkws.registerWidgetType('reference-universe', function() {
  if (!this.config.target) this.config.target = 'paratext_ruprime';
  if (!this.config.perpage) this.config.perpage = 5;
  if (!this.config.sort) this.config.sort = "position";
  this.team.registerTemplate('reference-universe', '\
<h2>Results from Reference Universe</h2>\
<ul>\
{{#each hits}}\
  <li>\
    {{#mkws-first md-electronic-url}}\
    <a href="{{this}}">\
    {{/mkws-first}}\
      {{md-title}}\
    </a>\
  {{#if md-title-remainder}}\
    <span>{{md-title-remainder}}</span>\
  {{/if}}\
  {{#if md-title-responsibility}}\
    <span><i>{{md-title-responsibility}}</i></span>\
  {{/if}}\
  </li>\
{{/each}}\
</ul>\
');

  var that = this;
  var template = that.team.loadTemplate(that.config.template || "reference-universe");
  this.team.queue("records").subscribe(function(data) {
    that.node.html(template(data));
  }); 
  that.autosearch();
});
mkws.registerWidgetType('builder', function() {
  var that = this;
  var team = this.team;

  var button = mkws.$('<button/>', {
    type: 'button',
    text: this.config.text || "Build!"
  });
  this.node.append(button);
  button.click(function() {
    var   query = team.widget('query').value();
    var    sort = team.widget('sort').value();
    var perpage = team.widget('per-page').value();

    var html = ('<div class="mkws-records mkwsRecords" ' +
                'autosearch="' + query + '" ' +
                'sort="' + sort + '" ' +
                'perpage="' + perpage + '"></div>');
    var fn = that.callback || alert;
    fn(html);
  });
});

mkws.registerWidgetType('console-builder', function() {
  mkws.promotionFunction('builder').call(this);
  this.callback = function(s) {
    that.info("generated widget: " + s);
  }
});
(function() {
  var template = Handlebars.template, templates = mkws.defaultTemplates = mkws.defaultTemplates || {};
templates['details'] = template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "        ("
    + this.escapeExpression(((helper = (helper = helpers['md-title-remainder'] || (depth0 != null ? depth0['md-title-remainder'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-title-remainder","hash":{},"data":data}) : helper)))
    + ")\n";
},"3":function(depth0,helpers,partials,data) {
    var helper;

  return "        <i>"
    + this.escapeExpression(((helper = (helper = helpers['md-title-responsibility'] || (depth0 != null ? depth0['md-title-responsibility'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-title-responsibility","hash":{},"data":data}) : helper)))
    + "</i>\n";
},"5":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "  <tr>\n    <th>"
    + alias2((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Date",{"name":"mkws-translate","hash":{},"data":data}))
    + "</th>\n    <td>"
    + alias2(((helper = (helper = helpers['md-date'] || (depth0 != null ? depth0['md-date'] : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"md-date","hash":{},"data":data}) : helper)))
    + "</td>\n  </tr>\n";
},"7":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "  <tr>\n    <th>"
    + alias2((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Author",{"name":"mkws-translate","hash":{},"data":data}))
    + "</th>\n    <td>"
    + alias2(((helper = (helper = helpers['md-author'] || (depth0 != null ? depth0['md-author'] : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"md-author","hash":{},"data":data}) : helper)))
    + "</td>\n  </tr>\n";
},"9":function(depth0,helpers,partials,data) {
    var stack1;

  return "  <tr>\n    <th>"
    + this.escapeExpression((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helpers.helperMissing).call(depth0,"Links",{"name":"mkws-translate","hash":{},"data":data}))
    + "</th>\n    <td>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0['md-electronic-url'] : depth0),{"name":"each","hash":{},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </td>\n  </tr>\n";
},"10":function(depth0,helpers,partials,data) {
    var helper, alias1=this.escapeExpression;

  return "        <a href=\""
    + alias1(this.lambda(depth0, depth0))
    + "\">Link"
    + alias1(((helper = (helper = helpers['mkws-index1'] || (depth0 != null ? depth0['mkws-index1'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"mkws-index1","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"12":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return "  <tr>\n    <th>"
    + this.escapeExpression((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Subject",{"name":"mkws-translate","hash":{},"data":data}))
    + "</th>\n    <td>\n"
    + ((stack1 = (helpers['mkws-first'] || (depth0 && depth0['mkws-first']) || alias1).call(depth0,(depth0 != null ? depth0.location : depth0),{"name":"mkws-first","hash":{"having":"md-subject"},"fn":this.program(13, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </td>\n  </tr>\n";
},"13":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-subject'] : depth0),{"name":"if","hash":{},"fn":this.program(14, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"14":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers['mkws-commaList'] || (depth0 && depth0['mkws-commaList']) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['md-subject'] : depth0),{"name":"mkws-commaList","hash":{},"fn":this.program(15, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"15":function(depth0,helpers,partials,data) {
    return "            "
    + this.escapeExpression(this.lambda(depth0, depth0));
},"17":function(depth0,helpers,partials,data) {
    return "        "
    + this.escapeExpression((helpers['mkws-attr'] || (depth0 && depth0['mkws-attr']) || helpers.helperMissing).call(depth0,"@name",{"name":"mkws-attr","hash":{},"data":data}));
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "<table>\n  <tr>\n    <th>"
    + alias2((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Title",{"name":"mkws-translate","hash":{},"data":data}))
    + "</th>\n    <td>\n      "
    + alias2(((helper = (helper = helpers['md-title'] || (depth0 != null ? depth0['md-title'] : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"md-title","hash":{},"data":data}) : helper)))
    + "\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-title-remainder'] : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-title-responsibility'] : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </td>\n  </tr>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-date'] : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-author'] : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-electronic-url'] : depth0),{"name":"if","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers['mkws-if-any'] || (depth0 && depth0['mkws-if-any']) || alias1).call(depth0,(depth0 != null ? depth0.location : depth0),{"name":"mkws-if-any","hash":{"having":"md-subject"},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  <tr>\n    <th>"
    + alias2((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Locations",{"name":"mkws-translate","hash":{},"data":data}))
    + "</th>\n    <td>\n"
    + ((stack1 = (helpers['mkws-commaList'] || (depth0 && depth0['mkws-commaList']) || alias1).call(depth0,(depth0 != null ? depth0.location : depth0),{"name":"mkws-commaList","hash":{},"fn":this.program(17, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n    </td>\n  </tr>\n</table>\n";
},"useData":true});
templates['done'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing;

  return ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Search complete: found",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + " "
    + this.escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"count","hash":{},"data":data}) : helper)))
    + " "
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"records",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "\n\n";
},"useData":true});
templates['facet'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "  <div class=\"mkws-term mkwsTerm\">\n    <a href=\"#\" "
    + ((stack1 = ((helper = (helper = helpers.linkdata || (depth0 != null ? depth0.linkdata : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"linkdata","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + ">"
    + alias3(((helper = (helper = helpers.term || (depth0 != null ? depth0.term : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"term","hash":{},"data":data}) : helper)))
    + "</a> <span>"
    + alias3(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"count","hash":{},"data":data}) : helper)))
    + "</span>\n  </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "\n<div class=\"mkws-facet-title mkwsFacetTitle\">"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.caption : depth0),{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</div>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.terms : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['facets'] = template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "  <div class=\"mkws-facet mkwsFacet mkws-team-"
    + alias2(alias1((depths[1] != null ? depths[1].team : depths[1]), depth0))
    + "\" data-mkws-facet=\""
    + alias2(alias1(depth0, depth0))
    + "\"></div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.facets : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
templates['images'] = template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "  <a href=\"#\" id=\""
    + alias3(((helper = (helper = helpers.detailLinkId || (depth0 != null ? depth0.detailLinkId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"detailLinkId","hash":{},"data":data}) : helper)))
    + "\" onclick=\""
    + alias3(((helper = (helper = helpers.detailClick || (depth0 != null ? depth0.detailClick : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"detailClick","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = (helpers['mkws-first'] || (depth0 && depth0['mkws-first']) || alias1).call(depth0,(depth0 != null ? depth0['md-thumburl'] : depth0),{"name":"mkws-first","hash":{},"fn":this.program(2, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    <br/>\n  </a>\n";
},"2":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "      <img src=\""
    + alias2(alias1(depth0, depth0))
    + "\" alt=\""
    + alias2(alias1((depths[1] != null ? depths[1]['md-title'] : depths[1]), depth0))
    + "\"/>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.hits : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
templates['lang'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.unless.call(depth0,(data && data.last),{"name":"unless","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var helper;

  return "<span>"
    + this.escapeExpression(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"code","hash":{},"data":data}) : helper)))
    + "</span>";
},"4":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "<a href=\""
    + ((stack1 = ((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\">"
    + this.escapeExpression(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"code","hash":{},"data":data}) : helper)))
    + "</a>";
},"6":function(depth0,helpers,partials,data) {
    return "    |\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.languages : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"useData":true});
templates['navi'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "  <span>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,(depth0 != null ? depth0.facet : depth0),{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>: <a class=\"mkws-removable mkwsRemovable\" href=\"#\" onclick=\""
    + ((stack1 = ((helper = (helper = helpers.click || (depth0 != null ? depth0.click : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"click","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\">"
    + this.escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"value","hash":{},"data":data}) : helper)))
    + "</a>\n  "
    + ((stack1 = helpers.unless.call(depth0,(data && data.last),{"name":"unless","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"2":function(depth0,helpers,partials,data) {
    return "|";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.filters : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"useData":true});
templates['pager'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression, alias3="function";

  return "  <span>"
    + alias2((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Displaying",{"name":"mkws-translate","hash":{},"data":data}))
    + "</span>:\n  "
    + alias2(((helper = (helper = helpers.first || (depth0 != null ? depth0.first : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"first","hash":{},"data":data}) : helper)))
    + " <span>"
    + alias2((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"to",{"name":"mkws-translate","hash":{},"data":data}))
    + "</span> "
    + alias2(((helper = (helper = helpers.last || (depth0 != null ? depth0.last : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"last","hash":{},"data":data}) : helper)))
    + "\n  <span>"
    + alias2((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"of",{"name":"mkws-translate","hash":{},"data":data}))
    + "</span> "
    + alias2(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"count","hash":{},"data":data}) : helper)))
    + " (<span>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"found",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>: "
    + alias2(((helper = (helper = helpers.found || (depth0 != null ? depth0.found : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"found","hash":{},"data":data}) : helper)))
    + ")\n";
},"3":function(depth0,helpers,partials,data) {
    return "  No hits.\n";
},"5":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "    <a href=\"#\" class=\"mkws-prev mkwsPrev\" onclick=\""
    + this.escapeExpression(((helper = (helper = helpers.prevClick || (depth0 != null ? depth0.prevClick : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"prevClick","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Prev",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</a> |\n";
},"7":function(depth0,helpers,partials,data) {
    var stack1;

  return "    <span class=\"mkws-prev mkwsPrev\">"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helpers.helperMissing).call(depth0,"Prev",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</span> |\n";
},"9":function(depth0,helpers,partials,data) {
    return "...";
},"11":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.click : depth0),{"name":"if","hash":{},"fn":this.program(12, data, 0),"inverse":this.program(14, data, 0),"data":data})) != null ? stack1 : "");
},"12":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "      <a href=\"#\" onclick=\""
    + alias3(((helper = (helper = helpers.click || (depth0 != null ? depth0.click : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"click","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.number || (depth0 != null ? depth0.number : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"number","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"14":function(depth0,helpers,partials,data) {
    var helper;

  return "      <span class=\"mkws-current-page mkwsCurrentPage\">"
    + this.escapeExpression(((helper = (helper = helpers.number || (depth0 != null ? depth0.number : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"number","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"16":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "    | <a href=\"#\" class=\"mkws-next mkwsNext\" onclick=\""
    + this.escapeExpression(((helper = (helper = helpers.nextClick || (depth0 != null ? depth0.nextClick : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"nextClick","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Next",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</a>\n";
},"18":function(depth0,helpers,partials,data) {
    var stack1;

  return "    | <span class=\"mkws-next mkwsNext\">"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helpers.helperMissing).call(depth0,"Next",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"mkws-pager-desc\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.found : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n\n<div class=\"mkws-pager-list\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.prevClick : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "\n  "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.morePrev : depth0),{"name":"if","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pages : depth0),{"name":"each","hash":{},"fn":this.program(11, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n  "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.moreNext : depth0),{"name":"if","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.nextClick : depth0),{"name":"if","hash":{},"fn":this.program(16, data, 0),"inverse":this.program(18, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});
templates['progress'] = template({"1":function(depth0,helpers,partials,data) {
    return "&#x2588;";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return "<span class=\"mkws-waiting mkws-waiting mkwsWaiting\">"
    + ((stack1 = (helpers['mkws-repeat'] || (depth0 && depth0['mkws-repeat']) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.waiting : depth0),{"name":"mkws-repeat","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</span>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<span class=\"mkws-done mkws-done mkwsDone\">"
    + ((stack1 = (helpers['mkws-repeat'] || (depth0 && depth0['mkws-repeat']) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.done : depth0),{"name":"mkws-repeat","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</span>"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.waiting : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['ranking'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "<span>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Sort by",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n    <select class=\"mkws-sort mkwsSort mkws-team-"
    + this.escapeExpression(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.sort : depth0),{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </select>";
},"2":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.program(5, data, 0),"data":data})) != null ? stack1 : "");
},"3":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "          <option value=\""
    + ((stack1 = ((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\" selected=\"selected\">"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,(depth0 != null ? depth0.label : depth0),{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</option>\n";
},"5":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "          <option value=\""
    + this.escapeExpression(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,(depth0 != null ? depth0.label : depth0),{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</option>\n";
},"7":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "    <span>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"and show",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n    <select class=\"mkws-perpage mkwsPerpage mkws-team-"
    + this.escapeExpression(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.perPage : depth0),{"name":"each","hash":{},"fn":this.program(8, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </select>\n    <span>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"per page",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>";
},"8":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":this.program(9, data, 0),"inverse":this.program(11, data, 0),"data":data})) != null ? stack1 : "");
},"9":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "          <option value=\""
    + alias3(((helper = (helper = helpers.perPage || (depth0 != null ? depth0.perPage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"perPage","hash":{},"data":data}) : helper)))
    + "\" selected=\"selected\">"
    + alias3(((helper = (helper = helpers.perPage || (depth0 != null ? depth0.perPage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"perPage","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"11":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "          <option value=\""
    + alias3(((helper = (helper = helpers.perPage || (depth0 != null ? depth0.perPage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"perPage","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.perPage || (depth0 != null ? depth0.perPage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"perPage","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<form>"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.showSort : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.showPerPage : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</form>\n\n";
},"useData":true});
templates['records'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "  <div class=\""
    + this.escapeExpression(((helper = (helper = helpers.containerClass || (depth0 != null ? depth0.containerClass : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"containerClass","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = this.invokePartial(partials.summary,depth0,{"name":"summary","data":data,"indent":"    ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "  </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.hits : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['results'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<table width=\"100%\" border=\"0\" cellpadding=\"6\" cellspacing=\"0\">\n  <tr>\n    <td class=\"mkws-facets-container-wide mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\" width=\"250\" valign=\"top\">\n      <div class=\"mkws-facets mkwsTermlists mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\"></div>\n    </td>\n    <td class=\"mkws-motd-container mkwsMOTDContainer mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\" valign=\"top\">\n      <div class=\"mkws-ranking mkwsRanking mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\"></div>\n      <div class=\"mkws-pager mkwsPager mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\"></div>\n      <div class=\"mkws-navi mkwsNavi mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\"></div>\n      <div class=\"mkws-records mkwsRecords mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\"></div>\n    </td>\n  </tr>\n  <tr>\n    <td colspan=\"2\">\n      <div class=\"mkws-facets-container-narrow mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\"></div>\n    </td>\n  </tr>\n</table>\n\n";
},"useData":true});
templates['search'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<form name=\"mkws-search-form\" class=\"mkws-search-form mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\" action=\"\">\n  <input class=\"mkws-query mkws-query mkwsQuery mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\" type=\"text\"/>\n  <input class=\"mkws-button mkws-button mkwsButton mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\" type=\"submit\" value=\""
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Search",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "\"/>\n</form>\n\n";
},"useData":true});
templates['stat'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return " -- <span class=\"mkws-client-count mkwsClientCount\">"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Active clients",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + " : "
    + alias3(((helper = (helper = helpers.activeclients || (depth0 != null ? depth0.activeclients : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"activeclients","hash":{},"data":data}) : helper)))
    + "/"
    + alias3(((helper = (helper = helpers.clients || (depth0 != null ? depth0.clients : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"clients","hash":{},"data":data}) : helper)))
    + "</span> -- "
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Retrieved records",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + " : "
    + alias3(((helper = (helper = helpers.records || (depth0 != null ? depth0.records : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"records","hash":{},"data":data}) : helper)))
    + "/"
    + alias3(((helper = (helper = helpers.hits || (depth0 != null ? depth0.hits : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"hits","hash":{},"data":data}) : helper)))
    + "\n";
},"useData":true});
templates['summary'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.escapeExpression;

  return "  <a class=\"mkws-field-thumb\" href=\"#\" onclick=\""
    + alias1(((helper = (helper = helpers.detailClick || (depth0 != null ? depth0.detailClick : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"detailClick","hash":{},"data":data}) : helper)))
    + "\">\n    <img src=\""
    + alias1(this.lambda(((stack1 = (depth0 != null ? depth0['md-thumburl'] : depth0)) != null ? stack1['0'] : stack1), depth0))
    + "\" onerror=\"this.style.display='none'\"/>\n  </a>\n";
},"3":function(depth0,helpers,partials,data) {
    var helper;

  return "    <span class=\"mkws-field-title-remainder\">"
    + this.escapeExpression(((helper = (helper = helpers['md-title-remainder'] || (depth0 != null ? depth0['md-title-remainder'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-title-remainder","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"5":function(depth0,helpers,partials,data) {
    var helper;

  return "    <span class=\"mkws-field-author\">"
    + this.escapeExpression(((helper = (helper = helpers['md-author'] || (depth0 != null ? depth0['md-author'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-author","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"7":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-title-responsibility'] : depth0),{"name":"if","hash":{},"fn":this.program(8, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"8":function(depth0,helpers,partials,data) {
    var helper;

  return "      <span class=\"mkws-field-author\">"
    + this.escapeExpression(((helper = (helper = helpers['md-title-responsibility'] || (depth0 != null ? depth0['md-title-responsibility'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-title-responsibility","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"10":function(depth0,helpers,partials,data) {
    var helper;

  return "    <div class=\"mkws-field-description\">"
    + this.escapeExpression(((helper = (helper = helpers['md-description'] || (depth0 != null ? depth0['md-description'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-description","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"12":function(depth0,helpers,partials,data) {
    var helper;

  return "    <span class=\"mkws-field-date\">"
    + this.escapeExpression(((helper = (helper = helpers['md-date'] || (depth0 != null ? depth0['md-date'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-date","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"14":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "  "
    + ((stack1 = ((helper = (helper = helpers.renderedDetails || (depth0 != null ? depth0.renderedDetails : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"renderedDetails","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-thumburl'] : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "<div class=\"mkws-field-data\">\n  <span class=\"mkws-field-title\">\n  <a href=\"#\" id=\""
    + alias3(((helper = (helper = helpers.detailLinkId || (depth0 != null ? depth0.detailLinkId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"detailLinkId","hash":{},"data":data}) : helper)))
    + "\" onclick=\""
    + alias3(((helper = (helper = helpers.detailClick || (depth0 != null ? depth0.detailClick : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"detailClick","hash":{},"data":data}) : helper)))
    + "\">\n    "
    + alias3(((helper = (helper = helpers['md-title'] || (depth0 != null ? depth0['md-title'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"md-title","hash":{},"data":data}) : helper)))
    + "\n  </a>\n  </span>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-title-remainder'] : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-author'] : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-description'] : depth0),{"name":"if","hash":{},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-date'] : depth0),{"name":"if","hash":{},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.renderedDetails : depth0),{"name":"if","hash":{},"fn":this.program(14, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['switch'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "<a href=\"#\" onclick=\""
    + ((stack1 = ((helper = (helper = helpers.recordClick || (depth0 != null ? depth0.recordClick : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"recordClick","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\">"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Records",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</a>\n<span>|</span>\n<a href=\"#\" onclick=\""
    + ((stack1 = ((helper = (helper = helpers.targetClick || (depth0 != null ? depth0.targetClick : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"targetClick","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\">"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Targets",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</a>\n";
},"useData":true});
templates['targets'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "    <tr>\n      <td>"
    + ((stack1 = ((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</td>\n      <td>\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.id : depth0),"matches","^(solr-|lui.)",{"name":"compare","hash":{},"fn":this.program(2, data, 0),"inverse":this.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "      </td>\n      <td>"
    + alias3(((helper = (helper = helpers.hits || (depth0 != null ? depth0.hits : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"hits","hash":{},"data":data}) : helper)))
    + "</td>\n      <td>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "      </td>\n      <td>"
    + alias3(((helper = (helper = helpers.records || (depth0 != null ? depth0.records : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"records","hash":{},"data":data}) : helper)))
    + "</td>\n      <td>"
    + alias3(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"state","hash":{},"data":data}) : helper)))
    + "</td>\n    </tr>\n";
},"2":function(depth0,helpers,partials,data) {
    return "	  <b title=\"Harvested, and stored locally\" style=\"color:darkgreen\">H</b>\n";
},"4":function(depth0,helpers,partials,data) {
    return "	  <span title=\"Searched on the remote site\" style=\"color:darkred\">S</span>\n";
},"6":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "         "
    + alias3(((helper = (helper = helpers.diagnostic || (depth0 != null ? depth0.diagnostic : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"diagnostic","hash":{},"data":data}) : helper)))
    + " ("
    + alias3(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"message","hash":{},"data":data}) : helper)))
    + ")\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return "<table>\n  <thead>\n    <tr>\n      <td>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Target ID",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</td>\n      <td>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Type",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</td>\n      <td>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Hits",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</td>\n      <td>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Diags",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</td>\n      <td>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Records",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</td>\n      <td>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"State",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</td>\n      </td>\n    </tr>\n  </thead>\n  <tbody>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </tbody>\n</table>\n";
},"useData":true});
templates['waiting'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<img src=\""
    + this.escapeExpression(((helper = (helper = helpers.src || (depth0 != null ? depth0.src : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"src","hash":{},"data":data}) : helper)))
    + "\"/>\n";
},"useData":true});
templates['wikipedia'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<!--\ndisplay only the first image\n\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-thumburl'] : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "-->\n\n<!-- multiple images -->\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0['md-thumburl'] : depth0),{"name":"each","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n<h1><a href=\""
    + alias3(((helper = (helper = helpers['md-electronic-url'] || (depth0 != null ? depth0['md-electronic-url'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"md-electronic-url","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + alias3(((helper = (helper = helpers['md-title'] || (depth0 != null ? depth0['md-title'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"md-title","hash":{},"data":data}) : helper)))
    + "</a></h1>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-title-remainder'] : depth0),{"name":"if","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-title-responsibility'] : depth0),{"name":"if","hash":{},"fn":this.program(8, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-disambiguationurl'] : depth0),{"name":"if","hash":{},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers['mkws-paragraphs'] || (depth0 && depth0['mkws-paragraphs']) || alias1).call(depth0,(depth0 != null ? depth0['md-description'] : depth0),(depth0 != null ? depth0.paragraphs : depth0),(depth0 != null ? depth0.sentences : depth0),{"name":"mkws-paragraphs","hash":{},"data":data})) != null ? stack1 : "")
    + "\n<p class=\"mkws-credit mkwsCredit\">"
    + alias3(((helper = (helper = helpers.credit || (depth0 != null ? depth0.credit : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"credit","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.escapeExpression;

  return "<img src=\""
    + alias1(this.lambda(((stack1 = (depth0 != null ? depth0['md-thumburl'] : depth0)) != null ? stack1['0'] : stack1), depth0))
    + "\" alt=\""
    + alias1(((helper = (helper = helpers['md-title'] || (depth0 != null ? depth0['md-title'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-title","hash":{},"data":data}) : helper)))
    + "\">\n";
},"4":function(depth0,helpers,partials,data) {
    var helper, alias1=this.escapeExpression;

  return "  <img src=\""
    + alias1(this.lambda(depth0, depth0))
    + "\" alt=\""
    + alias1(((helper = (helper = helpers['md-title'] || (depth0 != null ? depth0['md-title'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-title","hash":{},"data":data}) : helper)))
    + "\">\n";
},"6":function(depth0,helpers,partials,data) {
    var helper;

  return "<b>"
    + this.escapeExpression(((helper = (helper = helpers['md-title-remainder'] || (depth0 != null ? depth0['md-title-remainder'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-title-remainder","hash":{},"data":data}) : helper)))
    + "</b>\n";
},"8":function(depth0,helpers,partials,data) {
    var helper;

  return "<i>"
    + this.escapeExpression(((helper = (helper = helpers['md-title-responsibility'] || (depth0 != null ? depth0['md-title-responsibility'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-title-responsibility","hash":{},"data":data}) : helper)))
    + "</i>\n";
},"10":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<p class=\"mkws-disambiguation\"\n>Did you mean <a href=\""
    + alias3(((helper = (helper = helpers['md-disambiguationurl'] || (depth0 != null ? depth0['md-disambiguationurl'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"md-disambiguationurl","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\"\n	>a different "
    + alias3(((helper = (helper = helpers['md-title'] || (depth0 != null ? depth0['md-title'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"md-title","hash":{},"data":data}) : helper)))
    + "</a>?</p>\n";
},"12":function(depth0,helpers,partials,data) {
    return "<p>Not found in Wikipedia.</p>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-title'] : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(12, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});
})();/* generic function to open results in a popup window
 *
 */

//"use strict";
// $(document).ready(function () {
mkws.registerWidgetType('popup', function() {
    var $ = mkws.$;
    var debug = this.info;
    debug("init popup window");

    var popup_window = $(this.node);
    // var popup_window = $(".mkws-popup mkwsPopup"); // $(document).ready()
    if (!popup_window) {
        debug("no popup found, skip...");
        return;
    } else {
        debug("number of popup windows found: " + popup_window.length);
    }

    if (!$.ui) {
        alert("Error: jquery-ui.js is missing, did you include it after jQuery core in the HTML file?");
        return;
    }

    // more than one widget on a page are possible
    popup_window.each(function(i) {
        var that = $(this);

        // all atributes are strings, convert them to integers here
        var width = parseInt(that.attr("popup_width") || "800");
        var height = parseInt(that.attr("popup_height") || "600");
        var autoOpen = parseInt(that.attr("popup_autoOpen") || "0");
        var modal = parseInt(that.attr("popup_modal") || "0");

        debug("Popup parameters: width: " + width + ", height: " + height + ", autoOpen: " + autoOpen);
        that.dialog({
            closeOnEscape: true,
            autoOpen: autoOpen,
            height: height,
            width: width,
            modal: modal ? true : false,
            resizable: true,
            buttons: {
                Cancel: function() {
                    that.dialog("close");
                }
            },
            close: function() {}
        });

        // open at search query submit: "input.mkws-button mkwsButton"
        var id_botton = that.attr("popup_button");
        if (id_botton) {
            $(id_botton).button().click(function() {
                that.dialog("open");
            });
        }
    });
});
function _setFontSize(size) {
  console.log('setting font-size to "' + size + '"');
  document.getElementById("top-header").style.fontSize = size;
  document.getElementById("main-content").style.fontSize = size;
}

function smallerText() { _setFontSize('medium') }
function regularText() { _setFontSize('large') }
function biggerText() { _setFontSize('x-large') }
  

function _setColorsForClass(className, foregroundColor, backgroundColor) {
  var e = document.getElementsByClassName(className);
  for(var i = 0; i < e.length; i++) {
    e[i].style.color = foregroundColor;
    e[i].style.backgroundColor =  backgroundColor;
  }
}

function _setColors(foregroundColor, backgroundColor, linkColor, currentPageForegroundColor, currentPageBackgroundColor, facetTitleBackgroundColor) {
  console.log('setting foreground=' + foregroundColor + ', background=' + backgroundColor);

  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    if (links[i].href) {
      links[i].style.color = linkColor;
    }
  }

  _setColorsForClass('main', foregroundColor, backgroundColor);
  _setColorsForClass('header', foregroundColor, backgroundColor);
  _setColorsForClass('footer', foregroundColor, backgroundColor);
  _setColorsForClass('results', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-waiting', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-targets', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-ranking', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-pager', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-navi', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-records', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-switch', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-facets', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-facet-title', foregroundColor, facetTitleBackgroundColor);
  _setColorsForClass('mkws-current-page', currentPageForegroundColor, currentPageBackgroundColor);
}

function highContrast() { _setColors("White", "Black", "Yellow", "White", "DimGray", "DimGray") }
function defaultContrast() { _setColors("Black", "White", "DarkBlue", "White", "DarkBlue", "WhiteSmoke") }
