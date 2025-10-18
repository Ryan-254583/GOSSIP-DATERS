"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[998],{9711:function(e,i,r){r.d(i,{BH:function(){return Deferred},LL:function(){return ErrorFactory},ZR:function(){return FirebaseError},zI:function(){return areCookiesEnabled},tV:function(){return base64Decode},L:function(){return base64urlEncodeWithoutPadding},Sg:function(){return createMockUserToken},ne:function(){return createSubscribe},vZ:function(){return function deepEqual(e,i){if(e===i)return!0;let r=Object.keys(e),o=Object.keys(i);for(let s of r){if(!o.includes(s))return!1;let r=e[s],l=i[s];if(isObject(r)&&isObject(l)){if(!deepEqual(r,l))return!1}else if(r!==l)return!1}for(let e of o)if(!r.includes(e))return!1;return!0}},pd:function(){return extractQuerystring},aH:function(){return getDefaultAppConfig},q4:function(){return getDefaultEmulatorHost},P0:function(){return getDefaultEmulatorHostnameAndPort},Pz:function(){return getExperimentalSetting},m9:function(){return getModularInstance},z$:function(){return getUA},ru:function(){return isBrowserExtension},Xx:function(){return isCloudWorkstation},L_:function(){return isCloudflareWorker},xb:function(){return isEmpty},w1:function(){return isIE},hl:function(){return isIndexedDBAvailable},uI:function(){return isMobileCordova},b$:function(){return isReactNative},G6:function(){return isSafari},Uo:function(){return pingServer},xO:function(){return querystring},zd:function(){return querystringDecode},dp:function(){return updateEmulatorBanner},eu:function(){return validateIndexedDBOpenable}});let getDefaultsFromPostinstall=()=>void 0;var o=r(3454);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let stringToByteArray$1=function(e){let i=[],r=0;for(let o=0;o<e.length;o++){let s=e.charCodeAt(o);s<128?i[r++]=s:(s<2048?i[r++]=s>>6|192:((64512&s)==55296&&o+1<e.length&&(64512&e.charCodeAt(o+1))==56320?(s=65536+((1023&s)<<10)+(1023&e.charCodeAt(++o)),i[r++]=s>>18|240,i[r++]=s>>12&63|128):i[r++]=s>>12|224,i[r++]=s>>6&63|128),i[r++]=63&s|128)}return i},byteArrayToString=function(e){let i=[],r=0,o=0;for(;r<e.length;){let s=e[r++];if(s<128)i[o++]=String.fromCharCode(s);else if(s>191&&s<224){let l=e[r++];i[o++]=String.fromCharCode((31&s)<<6|63&l)}else if(s>239&&s<365){let l=e[r++],h=e[r++],f=e[r++],d=((7&s)<<18|(63&l)<<12|(63&h)<<6|63&f)-65536;i[o++]=String.fromCharCode(55296+(d>>10)),i[o++]=String.fromCharCode(56320+(1023&d))}else{let l=e[r++],h=e[r++];i[o++]=String.fromCharCode((15&s)<<12|(63&l)<<6|63&h)}}return i.join("")},s={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,i){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();let r=i?this.byteToCharMapWebSafe_:this.byteToCharMap_,o=[];for(let i=0;i<e.length;i+=3){let s=e[i],l=i+1<e.length,h=l?e[i+1]:0,f=i+2<e.length,d=f?e[i+2]:0,g=s>>2,b=(3&s)<<4|h>>4,_=(15&h)<<2|d>>6,A=63&d;f||(A=64,l||(_=64)),o.push(r[g],r[b],r[_],r[A])}return o.join("")},encodeString(e,i){return this.HAS_NATIVE_SUPPORT&&!i?btoa(e):this.encodeByteArray(stringToByteArray$1(e),i)},decodeString(e,i){return this.HAS_NATIVE_SUPPORT&&!i?atob(e):byteArrayToString(this.decodeStringToByteArray(e,i))},decodeStringToByteArray(e,i){this.init_();let r=i?this.charToByteMapWebSafe_:this.charToByteMap_,o=[];for(let i=0;i<e.length;){let s=r[e.charAt(i++)],l=i<e.length,h=l?r[e.charAt(i)]:0;++i;let f=i<e.length,d=f?r[e.charAt(i)]:64;++i;let g=i<e.length,b=g?r[e.charAt(i)]:64;if(++i,null==s||null==h||null==d||null==b)throw new DecodeBase64StringError;let _=s<<2|h>>4;if(o.push(_),64!==d){let e=h<<4&240|d>>2;if(o.push(e),64!==b){let e=d<<6&192|b;o.push(e)}}}return o},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};let DecodeBase64StringError=class DecodeBase64StringError extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}};let base64Encode=function(e){let i=stringToByteArray$1(e);return s.encodeByteArray(i,!0)},base64urlEncodeWithoutPadding=function(e){return base64Encode(e).replace(/\./g,"")},base64Decode=function(e){try{return s.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null},getDefaultsFromGlobal=()=>/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==r.g)return r.g;throw Error("Unable to locate global object.")})().__FIREBASE_DEFAULTS__,getDefaultsFromEnvVariable=()=>{if(void 0===o||void 0===o.env)return;let e=o.env.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},getDefaultsFromCookie=()=>{let e;if("undefined"==typeof document)return;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}let i=e&&base64Decode(e[1]);return i&&JSON.parse(i)},getDefaults=()=>{try{return getDefaultsFromPostinstall()||getDefaultsFromGlobal()||getDefaultsFromEnvVariable()||getDefaultsFromCookie()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},getDefaultEmulatorHost=e=>getDefaults()?.emulatorHosts?.[e],getDefaultEmulatorHostnameAndPort=e=>{let i=getDefaultEmulatorHost(e);if(!i)return;let r=i.lastIndexOf(":");if(r<=0||r+1===i.length)throw Error(`Invalid host ${i} with no separate hostname and port!`);let o=parseInt(i.substring(r+1),10);return"["===i[0]?[i.substring(1,r-1),o]:[i.substring(0,r),o]},getDefaultAppConfig=()=>getDefaults()?.config,getExperimentalSetting=e=>getDefaults()?.[`_${e}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Deferred=class Deferred{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,i)=>{this.resolve=e,this.reject=i})}wrapCallback(e){return(i,r)=>{i?this.reject(i):this.resolve(r),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(i):e(i,r))}}};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function isCloudWorkstation(e){try{let i=e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e;return i.endsWith(".cloudworkstations.dev")}catch{return!1}}async function pingServer(e){let i=await fetch(e,{credentials:"include"});return i.ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function createMockUserToken(e,i){if(e.uid)throw Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let r=i||"demo-project",o=e.iat||0,s=e.sub||e.user_id;if(!s)throw Error("mockUserToken must contain 'sub' or 'user_id' field!");let l={iss:`https://securetoken.google.com/${r}`,aud:r,iat:o,exp:o+3600,auth_time:o,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...e};return[base64urlEncodeWithoutPadding(JSON.stringify({alg:"none",type:"JWT"})),base64urlEncodeWithoutPadding(JSON.stringify(l)),""].join(".")}let l={},h=!1;function updateEmulatorBanner(e,i){if("undefined"==typeof window||"undefined"==typeof document||!isCloudWorkstation(window.location.host)||l[e]===i||l[e]||h)return;function prefixedId(e){return`__firebase__banner__${e}`}l[e]=i;let r="__firebase__banner",o=function(){let e={prod:[],emulator:[]};for(let i of Object.keys(l))l[i]?e.emulator.push(i):e.prod.push(i);return e}(),s=o.prod.length>0;function setupDom(){let e,i;let o=(e=document.getElementById(r),i=!1,e||((e=document.createElement("div")).setAttribute("id",r),i=!0),{created:i,element:e}),l=prefixedId("text"),f=document.getElementById(l)||document.createElement("span"),d=prefixedId("learnmore"),g=document.getElementById(d)||document.createElement("a"),b=prefixedId("preprendIcon"),_=document.getElementById(b)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(o.created){let e=o.element;e.style.display="flex",e.style.background="#7faaf0",e.style.position="fixed",e.style.bottom="5px",e.style.left="5px",e.style.padding=".5em",e.style.borderRadius="5px",e.style.alignItems="center",g.setAttribute("id",d),g.innerText="Learn more",g.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",g.setAttribute("target","__blank"),g.style.paddingLeft="5px",g.style.textDecoration="underline";let i=function(){let e=document.createElement("span");return e.style.cursor="pointer",e.style.marginLeft="16px",e.style.fontSize="24px",e.innerHTML=" &times;",e.onclick=()=>{h=!0,function(){let e=document.getElementById(r);e&&e.remove()}()},e}();_.setAttribute("width","24"),_.setAttribute("id",b),_.setAttribute("height","24"),_.setAttribute("viewBox","0 0 24 24"),_.setAttribute("fill","none"),_.style.marginLeft="-6px",e.append(_,f,g,i),document.body.appendChild(e)}s?(f.innerText="Preview backend disconnected.",_.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(_.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,f.innerText="Preview backend running in this workspace."),f.setAttribute("id",l)}"loading"===document.readyState?window.addEventListener("DOMContentLoaded",setupDom):setupDom()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function getUA(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function isMobileCordova(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA())}function isCloudflareWorker(){return"undefined"!=typeof navigator&&"Cloudflare-Workers"===navigator.userAgent}function isBrowserExtension(){let e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function isReactNative(){return"object"==typeof navigator&&"ReactNative"===navigator.product}function isIE(){let e=getUA();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function isSafari(){return!function(){let e=getDefaults()?.forceEnvironment;if("node"===e)return!0;if("browser"===e)return!1;try{return"[object process]"===Object.prototype.toString.call(r.g.process)}catch(e){return!1}}()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function isIndexedDBAvailable(){try{return"object"==typeof indexedDB}catch(e){return!1}}function validateIndexedDBOpenable(){return new Promise((e,i)=>{try{let r=!0,o="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(o);s.onsuccess=()=>{s.result.close(),r||self.indexedDB.deleteDatabase(o),e(!0)},s.onupgradeneeded=()=>{r=!1},s.onerror=()=>{i(s.error?.message||"")}}catch(e){i(e)}})}function areCookiesEnabled(){return"undefined"!=typeof navigator&&!!navigator.cookieEnabled}let FirebaseError=class FirebaseError extends Error{constructor(e,i,r){super(i),this.code=e,this.customData=r,this.name="FirebaseError",Object.setPrototypeOf(this,FirebaseError.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ErrorFactory.prototype.create)}};let ErrorFactory=class ErrorFactory{constructor(e,i,r){this.service=e,this.serviceName=i,this.errors=r}create(e,...i){let r=i[0]||{},o=`${this.service}/${e}`,s=this.errors[e],l=s?s.replace(f,(e,i)=>{let o=r[i];return null!=o?String(o):`<${i}?>`}):"Error",h=`${this.serviceName}: ${l} (${o}).`,d=new FirebaseError(o,h,r);return d}};let f=/\{\$([^}]+)}/g;function isEmpty(e){for(let i in e)if(Object.prototype.hasOwnProperty.call(e,i))return!1;return!0}function isObject(e){return null!==e&&"object"==typeof e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function querystring(e){let i=[];for(let[r,o]of Object.entries(e))Array.isArray(o)?o.forEach(e=>{i.push(encodeURIComponent(r)+"="+encodeURIComponent(e))}):i.push(encodeURIComponent(r)+"="+encodeURIComponent(o));return i.length?"&"+i.join("&"):""}function querystringDecode(e){let i={},r=e.replace(/^\?/,"").split("&");return r.forEach(e=>{if(e){let[r,o]=e.split("=");i[decodeURIComponent(r)]=decodeURIComponent(o)}}),i}function extractQuerystring(e){let i=e.indexOf("?");if(!i)return"";let r=e.indexOf("#",i);return e.substring(i,r>0?r:void 0)}function createSubscribe(e,i){let r=new ObserverProxy(e,i);return r.subscribe.bind(r)}let ObserverProxy=class ObserverProxy{constructor(e,i){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=i,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(i=>{i.next(e)})}error(e){this.forEachObserver(i=>{i.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,i,r){let o;if(void 0===e&&void 0===i&&void 0===r)throw Error("Missing Observer.");void 0===(o=!function(e,i){if("object"!=typeof e||null===e)return!1;for(let r of i)if(r in e&&"function"==typeof e[r])return!0;return!1}(e,["next","error","complete"])?{next:e,error:i,complete:r}:e).next&&(o.next=noop),void 0===o.error&&(o.error=noop),void 0===o.complete&&(o.complete=noop);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?o.error(this.finalError):o.complete()}catch(e){}}),this.observers.push(o),s}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let i=0;i<this.observers.length;i++)this.sendOne(i,e)}sendOne(e,i){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{i(this.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function noop(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function getModularInstance(e){return e&&e._delegate?e._delegate:e}},3310:function(e,i,r){r.d(i,{Jn:function(){return $},KN:function(){return registerVersion},Mq:function(){return getApp},Xd:function(){return _registerComponent},ZF:function(){return initializeApp},qX:function(){return _getProvider},rh:function(){return _isFirebaseServerApp}});var o=r(75),s=r(4645),l=r(9711),h=r(6531);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let PlatformLoggerServiceImpl=class PlatformLoggerServiceImpl{constructor(e){this.container=e}getPlatformInfoString(){let e=this.container.getProviders();return e.map(e=>{if(!function(e){let i=e.getComponent();return i?.type==="VERSION"}(e))return null;{let i=e.getImmediate();return`${i.library}/${i.version}`}}).filter(e=>e).join(" ")}};let f="@firebase/app",d="0.14.4",g=new s.Yd("@firebase/app"),b="[DEFAULT]",_={[f]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/data-connect":"fire-data-connect","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","@firebase/ai":"fire-vertex","fire-js":"fire-js",firebase:"fire-js-all"},A=new Map,k=new Map,j=new Map;function _addComponent(e,i){try{e.container.addComponent(i)}catch(r){g.debug(`Component ${i.name} failed to register with FirebaseApp ${e.name}`,r)}}function _registerComponent(e){let i=e.name;if(j.has(i))return g.debug(`There were multiple attempts to register component ${i}.`),!1;for(let r of(j.set(i,e),A.values()))_addComponent(r,e);for(let i of k.values())_addComponent(i,e);return!0}function _getProvider(e,i){let r=e.container.getProvider("heartbeat").getImmediate({optional:!0});return r&&r.triggerHeartbeat(),e.container.getProvider(i)}function _isFirebaseServerApp(e){return null!=e&&void 0!==e.settings}let M=new l.LL("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let FirebaseAppImpl=class FirebaseAppImpl{constructor(e,i,r){this._isDeleted=!1,this._options={...e},this._config={...i},this._name=i.name,this._automaticDataCollectionEnabled=i.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new o.wA("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw M.create("app-deleted",{appName:this._name})}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $="12.4.0";function initializeApp(e,i={}){let r=e;if("object"!=typeof i){let e=i;i={name:e}}let s={name:b,automaticDataCollectionEnabled:!0,...i},h=s.name;if("string"!=typeof h||!h)throw M.create("bad-app-name",{appName:String(h)});if(r||(r=(0,l.aH)()),!r)throw M.create("no-options");let f=A.get(h);if(f){if((0,l.vZ)(r,f.options)&&(0,l.vZ)(s,f.config))return f;throw M.create("duplicate-app",{appName:h})}let d=new o.H0(h);for(let e of j.values())d.addComponent(e);let g=new FirebaseAppImpl(r,s,d);return A.set(h,g),g}function getApp(e=b){let i=A.get(e);if(!i&&e===b&&(0,l.aH)())return initializeApp();if(!i)throw M.create("no-app",{appName:e});return i}function registerVersion(e,i,r){let s=_[e]??e;r&&(s+=`-${r}`);let l=s.match(/\s|\//),h=i.match(/\s|\//);if(l||h){let e=[`Unable to register library "${s}" with version "${i}":`];l&&e.push(`library name "${s}" contains illegal characters (whitespace or "/")`),l&&h&&e.push("and"),h&&e.push(`version name "${i}" contains illegal characters (whitespace or "/")`),g.warn(e.join(" "));return}_registerComponent(new o.wA(`${s}-version`,()=>({library:s,version:i}),"VERSION"))}let q="firebase-heartbeat-store",ee=null;function getDbPromise(){return ee||(ee=(0,h.X3)("firebase-heartbeat-database",1,{upgrade:(e,i)=>{if(0===i)try{e.createObjectStore(q)}catch(e){console.warn(e)}}}).catch(e=>{throw M.create("idb-open",{originalErrorMessage:e.message})})),ee}async function readHeartbeatsFromIndexedDB(e){try{let i=await getDbPromise(),r=i.transaction(q),o=await r.objectStore(q).get(computeKey(e));return await r.done,o}catch(e){if(e instanceof l.ZR)g.warn(e.message);else{let i=M.create("idb-get",{originalErrorMessage:e?.message});g.warn(i.message)}}}async function writeHeartbeatsToIndexedDB(e,i){try{let r=await getDbPromise(),o=r.transaction(q,"readwrite"),s=o.objectStore(q);await s.put(i,computeKey(e)),await o.done}catch(e){if(e instanceof l.ZR)g.warn(e.message);else{let i=M.create("idb-set",{originalErrorMessage:e?.message});g.warn(i.message)}}}function computeKey(e){return`${e.name}!${e.options.appId}`}let HeartbeatServiceImpl=class HeartbeatServiceImpl{constructor(e){this.container=e,this._heartbeatsCache=null;let i=this.container.getProvider("app").getImmediate();this._storage=new HeartbeatStorageImpl(i),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){try{let e=this.container.getProvider("platform-logger").getImmediate(),i=e.getPlatformInfoString(),r=getUTCDateString();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(e=>e.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:i}),this._heartbeatsCache.heartbeats.length>30){let e=function(e){if(0===e.length)return -1;let i=0,r=e[0].date;for(let o=1;o<e.length;o++)e[o].date<r&&(r=e[o].date,i=o);return i}(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){g.warn(e)}}async getHeartbeatsHeader(){try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||0===this._heartbeatsCache.heartbeats.length)return"";let e=getUTCDateString(),{heartbeatsToSend:i,unsentEntries:r}=function(e,i=1024){let r=[],o=e.slice();for(let s of e){let e=r.find(e=>e.agent===s.agent);if(e){if(e.dates.push(s.date),countBytes(r)>i){e.dates.pop();break}}else if(r.push({agent:s.agent,dates:[s.date]}),countBytes(r)>i){r.pop();break}o=o.slice(1)}return{heartbeatsToSend:r,unsentEntries:o}}(this._heartbeatsCache.heartbeats),o=(0,l.L)(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return g.warn(e),""}}};function getUTCDateString(){let e=new Date;return e.toISOString().substring(0,10)}let HeartbeatStorageImpl=class HeartbeatStorageImpl{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!(0,l.hl)()&&(0,l.eu)().then(()=>!0).catch(()=>!1)}async read(){let e=await this._canUseIndexedDBPromise;if(!e)return{heartbeats:[]};{let e=await readHeartbeatsFromIndexedDB(this.app);return e?.heartbeats?e:{heartbeats:[]}}}async overwrite(e){let i=await this._canUseIndexedDBPromise;if(i){let i=await this.read();return writeHeartbeatsToIndexedDB(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){let i=await this._canUseIndexedDBPromise;if(i){let i=await this.read();return writeHeartbeatsToIndexedDB(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}}};function countBytes(e){return(0,l.L)(JSON.stringify({version:2,heartbeats:e})).length}_registerComponent(new o.wA("platform-logger",e=>new PlatformLoggerServiceImpl(e),"PRIVATE")),_registerComponent(new o.wA("heartbeat",e=>new HeartbeatServiceImpl(e),"PRIVATE")),registerVersion(f,d,""),registerVersion(f,d,"esm2020"),registerVersion("fire-js","")},75:function(e,i,r){r.d(i,{H0:function(){return ComponentContainer},wA:function(){return Component}});var o=r(9711);let Component=class Component{constructor(e,i,r){this.name=e,this.instanceFactory=i,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let s="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Provider=class Provider{constructor(e,i){this.name=e,this.container=i,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let i=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(i)){let e=new o.BH;if(this.instancesDeferred.set(i,e),this.isInitialized(i)||this.shouldAutoInitialize())try{let r=this.getOrInitializeService({instanceIdentifier:i});r&&e.resolve(r)}catch(e){}}return this.instancesDeferred.get(i).promise}getImmediate(e){let i=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(e){if(r)return null;throw e}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if("EAGER"===e.instantiationMode)try{this.getOrInitializeService({instanceIdentifier:s})}catch(e){}for(let[e,i]of this.instancesDeferred.entries()){let r=this.normalizeInstanceIdentifier(e);try{let e=this.getOrInitializeService({instanceIdentifier:r});i.resolve(e)}catch(e){}}}}clearInstance(e=s){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=s){return this.instances.has(e)}getOptions(e=s){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:i={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let o=this.getOrInitializeService({instanceIdentifier:r,options:i});for(let[e,i]of this.instancesDeferred.entries()){let s=this.normalizeInstanceIdentifier(e);r===s&&i.resolve(o)}return o}onInit(e,i){let r=this.normalizeInstanceIdentifier(i),o=this.onInitCallbacks.get(r)??new Set;o.add(e),this.onInitCallbacks.set(r,o);let s=this.instances.get(r);return s&&e(s,r),()=>{o.delete(e)}}invokeOnInitCallbacks(e,i){let r=this.onInitCallbacks.get(i);if(r)for(let o of r)try{o(e,i)}catch{}}getOrInitializeService({instanceIdentifier:e,options:i={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:e===s?void 0:e,options:i}),this.instances.set(e,r),this.instancesOptions.set(e,i),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=s){return this.component?this.component.multipleInstances?e:s:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ComponentContainer=class ComponentContainer{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let i=this.getProvider(e.name);if(i.isComponentSet())throw Error(`Component ${e.name} has already been registered with ${this.name}`);i.setComponent(e)}addOrOverwriteComponent(e){let i=this.getProvider(e.name);i.isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let i=new Provider(e,this);return this.providers.set(e,i),i}getProviders(){return Array.from(this.providers.values())}}},4645:function(e,i,r){var o,s;r.d(i,{Yd:function(){return Logger},in:function(){return o}});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let l=[];(s=o||(o={}))[s.DEBUG=0]="DEBUG",s[s.VERBOSE=1]="VERBOSE",s[s.INFO=2]="INFO",s[s.WARN=3]="WARN",s[s.ERROR=4]="ERROR",s[s.SILENT=5]="SILENT";let h={debug:o.DEBUG,verbose:o.VERBOSE,info:o.INFO,warn:o.WARN,error:o.ERROR,silent:o.SILENT},f=o.INFO,d={[o.DEBUG]:"log",[o.VERBOSE]:"log",[o.INFO]:"info",[o.WARN]:"warn",[o.ERROR]:"error"},defaultLogHandler=(e,i,...r)=>{if(i<e.logLevel)return;let o=new Date().toISOString(),s=d[i];if(s)console[s](`[${o}]  ${e.name}:`,...r);else throw Error(`Attempted to log a message with an invalid logType (value: ${i})`)};let Logger=class Logger{constructor(e){this.name=e,this._logLevel=f,this._logHandler=defaultLogHandler,this._userLogHandler=null,l.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in o))throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?h[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,o.DEBUG,...e),this._logHandler(this,o.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,o.VERBOSE,...e),this._logHandler(this,o.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,o.INFO,...e),this._logHandler(this,o.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,o.WARN,...e),this._logHandler(this,o.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,o.ERROR,...e),this._logHandler(this,o.ERROR,...e)}}},5062:function(e,i,r){r.d(i,{V8:function(){return s},z8:function(){return o}});var o,s,l="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},h={};(function(){function m(){this.blockSize=-1,this.blockSize=64,this.g=[,,,,],this.C=Array(this.blockSize),this.o=this.h=0,this.u()}function n(e,i,r){r||(r=0);let o=Array(16);if("string"==typeof i)for(var s=0;s<16;++s)o[s]=i.charCodeAt(r++)|i.charCodeAt(r++)<<8|i.charCodeAt(r++)<<16|i.charCodeAt(r++)<<24;else for(s=0;s<16;++s)o[s]=i[r++]|i[r++]<<8|i[r++]<<16|i[r++]<<24;i=e.g[0],r=e.g[1],s=e.g[2];let l=e.g[3],h;h=i+(l^r&(s^l))+o[0]+3614090360&4294967295,h=l+(s^(i=r+(h<<7&4294967295|h>>>25))&(r^s))+o[1]+3905402710&4294967295,h=s+(r^(l=i+(h<<12&4294967295|h>>>20))&(i^r))+o[2]+606105819&4294967295,h=r+(i^(s=l+(h<<17&4294967295|h>>>15))&(l^i))+o[3]+3250441966&4294967295,h=i+(l^(r=s+(h<<22&4294967295|h>>>10))&(s^l))+o[4]+4118548399&4294967295,h=l+(s^(i=r+(h<<7&4294967295|h>>>25))&(r^s))+o[5]+1200080426&4294967295,h=s+(r^(l=i+(h<<12&4294967295|h>>>20))&(i^r))+o[6]+2821735955&4294967295,h=r+(i^(s=l+(h<<17&4294967295|h>>>15))&(l^i))+o[7]+4249261313&4294967295,h=i+(l^(r=s+(h<<22&4294967295|h>>>10))&(s^l))+o[8]+1770035416&4294967295,h=l+(s^(i=r+(h<<7&4294967295|h>>>25))&(r^s))+o[9]+2336552879&4294967295,h=s+(r^(l=i+(h<<12&4294967295|h>>>20))&(i^r))+o[10]+4294925233&4294967295,h=r+(i^(s=l+(h<<17&4294967295|h>>>15))&(l^i))+o[11]+2304563134&4294967295,h=i+(l^(r=s+(h<<22&4294967295|h>>>10))&(s^l))+o[12]+1804603682&4294967295,h=l+(s^(i=r+(h<<7&4294967295|h>>>25))&(r^s))+o[13]+4254626195&4294967295,h=s+(r^(l=i+(h<<12&4294967295|h>>>20))&(i^r))+o[14]+2792965006&4294967295,h=r+(i^(s=l+(h<<17&4294967295|h>>>15))&(l^i))+o[15]+1236535329&4294967295,r=s+(h<<22&4294967295|h>>>10),h=i+(s^l&(r^s))+o[1]+4129170786&4294967295,i=r+(h<<5&4294967295|h>>>27),h=l+(r^s&(i^r))+o[6]+3225465664&4294967295,l=i+(h<<9&4294967295|h>>>23),h=s+(i^r&(l^i))+o[11]+643717713&4294967295,s=l+(h<<14&4294967295|h>>>18),h=r+(l^i&(s^l))+o[0]+3921069994&4294967295,r=s+(h<<20&4294967295|h>>>12),h=i+(s^l&(r^s))+o[5]+3593408605&4294967295,i=r+(h<<5&4294967295|h>>>27),h=l+(r^s&(i^r))+o[10]+38016083&4294967295,l=i+(h<<9&4294967295|h>>>23),h=s+(i^r&(l^i))+o[15]+3634488961&4294967295,s=l+(h<<14&4294967295|h>>>18),h=r+(l^i&(s^l))+o[4]+3889429448&4294967295,r=s+(h<<20&4294967295|h>>>12),h=i+(s^l&(r^s))+o[9]+568446438&4294967295,i=r+(h<<5&4294967295|h>>>27),h=l+(r^s&(i^r))+o[14]+3275163606&4294967295,l=i+(h<<9&4294967295|h>>>23),h=s+(i^r&(l^i))+o[3]+4107603335&4294967295,s=l+(h<<14&4294967295|h>>>18),h=r+(l^i&(s^l))+o[8]+1163531501&4294967295,r=s+(h<<20&4294967295|h>>>12),h=i+(s^l&(r^s))+o[13]+2850285829&4294967295,i=r+(h<<5&4294967295|h>>>27),h=l+(r^s&(i^r))+o[2]+4243563512&4294967295,l=i+(h<<9&4294967295|h>>>23),h=s+(i^r&(l^i))+o[7]+1735328473&4294967295,s=l+(h<<14&4294967295|h>>>18),h=r+(l^i&(s^l))+o[12]+2368359562&4294967295,h=i+((r=s+(h<<20&4294967295|h>>>12))^s^l)+o[5]+4294588738&4294967295,h=l+((i=r+(h<<4&4294967295|h>>>28))^r^s)+o[8]+2272392833&4294967295,h=s+((l=i+(h<<11&4294967295|h>>>21))^i^r)+o[11]+1839030562&4294967295,h=r+((s=l+(h<<16&4294967295|h>>>16))^l^i)+o[14]+4259657740&4294967295,h=i+((r=s+(h<<23&4294967295|h>>>9))^s^l)+o[1]+2763975236&4294967295,h=l+((i=r+(h<<4&4294967295|h>>>28))^r^s)+o[4]+1272893353&4294967295,h=s+((l=i+(h<<11&4294967295|h>>>21))^i^r)+o[7]+4139469664&4294967295,h=r+((s=l+(h<<16&4294967295|h>>>16))^l^i)+o[10]+3200236656&4294967295,h=i+((r=s+(h<<23&4294967295|h>>>9))^s^l)+o[13]+681279174&4294967295,h=l+((i=r+(h<<4&4294967295|h>>>28))^r^s)+o[0]+3936430074&4294967295,h=s+((l=i+(h<<11&4294967295|h>>>21))^i^r)+o[3]+3572445317&4294967295,h=r+((s=l+(h<<16&4294967295|h>>>16))^l^i)+o[6]+76029189&4294967295,h=i+((r=s+(h<<23&4294967295|h>>>9))^s^l)+o[9]+3654602809&4294967295,h=l+((i=r+(h<<4&4294967295|h>>>28))^r^s)+o[12]+3873151461&4294967295,h=s+((l=i+(h<<11&4294967295|h>>>21))^i^r)+o[15]+530742520&4294967295,h=r+((s=l+(h<<16&4294967295|h>>>16))^l^i)+o[2]+3299628645&4294967295,r=s+(h<<23&4294967295|h>>>9),h=i+(s^(r|~l))+o[0]+4096336452&4294967295,i=r+(h<<6&4294967295|h>>>26),h=l+(r^(i|~s))+o[7]+1126891415&4294967295,l=i+(h<<10&4294967295|h>>>22),h=s+(i^(l|~r))+o[14]+2878612391&4294967295,s=l+(h<<15&4294967295|h>>>17),h=r+(l^(s|~i))+o[5]+4237533241&4294967295,r=s+(h<<21&4294967295|h>>>11),h=i+(s^(r|~l))+o[12]+1700485571&4294967295,i=r+(h<<6&4294967295|h>>>26),h=l+(r^(i|~s))+o[3]+2399980690&4294967295,l=i+(h<<10&4294967295|h>>>22),h=s+(i^(l|~r))+o[10]+4293915773&4294967295,s=l+(h<<15&4294967295|h>>>17),h=r+(l^(s|~i))+o[1]+2240044497&4294967295,r=s+(h<<21&4294967295|h>>>11),h=i+(s^(r|~l))+o[8]+1873313359&4294967295,i=r+(h<<6&4294967295|h>>>26),h=l+(r^(i|~s))+o[15]+4264355552&4294967295,l=i+(h<<10&4294967295|h>>>22),h=s+(i^(l|~r))+o[6]+2734768916&4294967295,s=l+(h<<15&4294967295|h>>>17),h=r+(l^(s|~i))+o[13]+1309151649&4294967295,r=s+(h<<21&4294967295|h>>>11),h=i+(s^(r|~l))+o[4]+4149444226&4294967295,i=r+(h<<6&4294967295|h>>>26),h=l+(r^(i|~s))+o[11]+3174756917&4294967295,l=i+(h<<10&4294967295|h>>>22),h=s+(i^(l|~r))+o[2]+718787259&4294967295,s=l+(h<<15&4294967295|h>>>17),h=r+(l^(s|~i))+o[9]+3951481745&4294967295,e.g[0]=e.g[0]+i&4294967295,e.g[1]=e.g[1]+(s+(h<<21&4294967295|h>>>11))&4294967295,e.g[2]=e.g[2]+s&4294967295,e.g[3]=e.g[3]+l&4294967295}function t(e,i){this.h=i;let r=[],o=!0;for(let s=e.length-1;s>=0;s--){let l=0|e[s];o&&l==i||(r[s]=l,o=!1)}this.g=r}!function(e,i){function c(){}c.prototype=i.prototype,e.F=i.prototype,e.prototype=new c,e.prototype.constructor=e,e.D=function(e,r,o){for(var s=Array(arguments.length-2),l=2;l<arguments.length;l++)s[l-2]=arguments[l];return i.prototype[r].apply(e,s)}}(m,function(){this.blockSize=-1}),m.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},m.prototype.v=function(e,i){void 0===i&&(i=e.length);let r=i-this.blockSize,o=this.C,s=this.h,l=0;for(;l<i;){if(0==s)for(;l<=r;)n(this,e,l),l+=this.blockSize;if("string"==typeof e){for(;l<i;)if(o[s++]=e.charCodeAt(l++),s==this.blockSize){n(this,o),s=0;break}}else for(;l<i;)if(o[s++]=e[l++],s==this.blockSize){n(this,o),s=0;break}}this.h=s,this.o+=i},m.prototype.A=function(){var e=Array((this.h<56?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var i=1;i<e.length-8;++i)e[i]=0;i=8*this.o;for(var r=e.length-8;r<e.length;++r)e[r]=255&i,i/=256;for(this.v(e),e=Array(16),i=0,r=0;r<4;++r)for(let o=0;o<32;o+=8)e[i++]=this.g[r]>>>o&255;return e};var e,i={};function u(e){return -128<=e&&e<128?Object.prototype.hasOwnProperty.call(i,e)?i[e]:i[e]=new t([0|e],e<0?-1:0):new t([0|e],e<0?-1:0)}function v(e){if(isNaN(e)||!isFinite(e))return r;if(e<0)return x(v(-e));let i=[],o=1;for(let r=0;e>=o;r++)i[r]=e/o|0,o*=4294967296;return new t(i,0)}var r=u(0),l=u(1),f=u(16777216);function C(e){if(0!=e.h)return!1;for(let i=0;i<e.g.length;i++)if(0!=e.g[i])return!1;return!0}function B(e){return -1==e.h}function x(e){let i=e.g.length,r=[];for(let o=0;o<i;o++)r[o]=~e.g[o];return new t(r,~e.h).add(l)}function F(e,i){return e.add(x(i))}function G(e,i){for(;(65535&e[i])!=e[i];)e[i+1]+=e[i]>>>16,e[i]&=65535,i++}function H(e,i){this.g=e,this.h=i}function D(e,i){if(C(i))throw Error("division by zero");if(C(e))return new H(r,r);if(B(e))return i=D(x(e),i),new H(x(i.g),x(i.h));if(B(i))return i=D(e,x(i)),new H(x(i.g),i.h);if(e.g.length>30){if(B(e)||B(i))throw Error("slowDivide_ only works with positive integers.");for(var o=l,s=i;0>=s.l(e);)o=I(o),s=I(s);var h=J(o,1),f=J(s,1);for(s=J(s,2),o=J(o,2);!C(s);){var d=f.add(s);0>=d.l(e)&&(h=h.add(o),f=d),s=J(s,1),o=J(o,1)}return i=F(e,h.j(i)),new H(h,i)}for(h=r;e.l(i)>=0;){for(s=(s=Math.ceil(Math.log(o=Math.max(1,Math.floor(e.m()/i.m())))/Math.LN2))<=48?1:Math.pow(2,s-48),d=(f=v(o)).j(i);B(d)||d.l(e)>0;)o-=s,d=(f=v(o)).j(i);C(f)&&(f=l),h=h.add(f),e=F(e,d)}return new H(h,e)}function I(e){let i=e.g.length+1,r=[];for(let o=0;o<i;o++)r[o]=e.i(o)<<1|e.i(o-1)>>>31;return new t(r,e.h)}function J(e,i){let r=i>>5;i%=32;let o=e.g.length-r,s=[];for(let l=0;l<o;l++)s[l]=i>0?e.i(l+r)>>>i|e.i(l+r+1)<<32-i:e.i(l+r);return new t(s,e.h)}(e=t.prototype).m=function(){if(B(this))return-x(this).m();let e=0,i=1;for(let r=0;r<this.g.length;r++){let o=this.i(r);e+=(o>=0?o:4294967296+o)*i,i*=4294967296}return e},e.toString=function(e){if((e=e||10)<2||36<e)throw Error("radix out of range: "+e);if(C(this))return"0";if(B(this))return"-"+x(this).toString(e);let i=v(Math.pow(e,6));var r=this;let o="";for(;;){let s=D(r,i).g,l=(((r=F(r,s.j(i))).g.length>0?r.g[0]:r.h)>>>0).toString(e);if(C(r=s))return l+o;for(;l.length<6;)l="0"+l;o=l+o}},e.i=function(e){return e<0?0:e<this.g.length?this.g[e]:this.h},e.l=function(e){return B(e=F(this,e))?-1:C(e)?0:1},e.abs=function(){return B(this)?x(this):this},e.add=function(e){let i=Math.max(this.g.length,e.g.length),r=[],o=0;for(let s=0;s<=i;s++){let i=o+(65535&this.i(s))+(65535&e.i(s)),l=(i>>>16)+(this.i(s)>>>16)+(e.i(s)>>>16);o=l>>>16,i&=65535,l&=65535,r[s]=l<<16|i}return new t(r,-2147483648&r[r.length-1]?-1:0)},e.j=function(e){if(C(this)||C(e))return r;if(B(this))return B(e)?x(this).j(x(e)):x(x(this).j(e));if(B(e))return x(this.j(x(e)));if(0>this.l(f)&&0>e.l(f))return v(this.m()*e.m());let i=this.g.length+e.g.length,o=[];for(var s=0;s<2*i;s++)o[s]=0;for(s=0;s<this.g.length;s++)for(let i=0;i<e.g.length;i++){let r=this.i(s)>>>16,l=65535&this.i(s),h=e.i(i)>>>16,f=65535&e.i(i);o[2*s+2*i]+=l*f,G(o,2*s+2*i),o[2*s+2*i+1]+=r*f,G(o,2*s+2*i+1),o[2*s+2*i+1]+=l*h,G(o,2*s+2*i+1),o[2*s+2*i+2]+=r*h,G(o,2*s+2*i+2)}for(e=0;e<i;e++)o[e]=o[2*e+1]<<16|o[2*e];for(e=i;e<2*i;e++)o[e]=0;return new t(o,0)},e.B=function(e){return D(this,e).h},e.and=function(e){let i=Math.max(this.g.length,e.g.length),r=[];for(let o=0;o<i;o++)r[o]=this.i(o)&e.i(o);return new t(r,this.h&e.h)},e.or=function(e){let i=Math.max(this.g.length,e.g.length),r=[];for(let o=0;o<i;o++)r[o]=this.i(o)|e.i(o);return new t(r,this.h|e.h)},e.xor=function(e){let i=Math.max(this.g.length,e.g.length),r=[];for(let o=0;o<i;o++)r[o]=this.i(o)^e.i(o);return new t(r,this.h^e.h)},m.prototype.digest=m.prototype.A,m.prototype.reset=m.prototype.u,m.prototype.update=m.prototype.v,s=h.Md5=m,t.prototype.add=t.prototype.add,t.prototype.multiply=t.prototype.j,t.prototype.modulo=t.prototype.B,t.prototype.compare=t.prototype.l,t.prototype.toNumber=t.prototype.m,t.prototype.toString=t.prototype.toString,t.prototype.getBits=t.prototype.i,t.fromNumber=v,t.fromString=function y(e,i){if(0==e.length)throw Error("number format error: empty string");if((i=i||10)<2||36<i)throw Error("radix out of range: "+i);if("-"==e.charAt(0))return x(y(e.substring(1),i));if(e.indexOf("-")>=0)throw Error('number format error: interior "-" character');let o=v(Math.pow(i,8)),s=r;for(let r=0;r<e.length;r+=8){var l=Math.min(8,e.length-r);let h=parseInt(e.substring(r,r+l),i);l<8?(l=v(Math.pow(i,l)),s=s.j(l).add(v(h))):s=(s=s.j(o)).add(v(h))}return s},o=h.Integer=t}).apply(void 0!==l?l:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},4489:function(e,i,r){r.d(i,{FJ:function(){return g},JJ:function(){return o},UE:function(){return b},ii:function(){return s},jK:function(){return h},ju:function(){return d},kN:function(){return f},tw:function(){return l}});var o,s,l,h,f,d,g,b,_="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},A={};(function(){var e,i,r=Object.defineProperty,k=function(e){e=["object"==typeof globalThis&&globalThis,e,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof _&&_];for(var i=0;i<e.length;++i){var r=e[i];if(r&&r.Math==Math)return r}throw Error("Cannot find global object")}(this);function da(e,i){if(i)e:{var o=k;e=e.split(".");for(var s=0;s<e.length-1;s++){var l=e[s];if(!(l in o))break e;o=o[l]}(i=i(s=o[e=e[e.length-1]]))!=s&&null!=i&&r(o,e,{configurable:!0,writable:!0,value:i})}}da("Symbol.dispose",function(e){return e||Symbol("Symbol.dispose")}),da("Array.prototype.values",function(e){return e||function(){return this[Symbol.iterator]()}}),da("Object.entries",function(e){return e||function(e){var i,r=[];for(i in e)Object.prototype.hasOwnProperty.call(e,i)&&r.push([i,e[i]]);return r}});var j=j||{},M=this||self;function n(e){var i=typeof e;return"object"==i&&null!=e||"function"==i}function fa(e,i,r){return e.call.apply(e.bind,arguments)}function p(e,i,r){return(p=fa).apply(null,arguments)}function ha(e,i){var r=Array.prototype.slice.call(arguments,1);return function(){var i=r.slice();return i.push.apply(i,arguments),e.apply(this,i)}}function t(e,i){function c(){}c.prototype=i.prototype,e.Z=i.prototype,e.prototype=new c,e.prototype.constructor=e,e.Ob=function(e,r,o){for(var s=Array(arguments.length-2),l=2;l<arguments.length;l++)s[l-2]=arguments[l];return i.prototype[r].apply(e,s)}}var $="undefined"!=typeof AsyncContext&&"function"==typeof AsyncContext.Snapshot?e=>e&&AsyncContext.Snapshot.wrap(e):e=>e;function ja(e){let i=e.length;if(i>0){let r=Array(i);for(let o=0;o<i;o++)r[o]=e[o];return r}return[]}function ka(e,i){for(let i=1;i<arguments.length;i++){let o=arguments[i];var r=typeof o;if("array"==(r="object"!=r?r:o?Array.isArray(o)?"array":r:"null")||"object"==r&&"number"==typeof o.length){r=e.length||0;let i=o.length||0;e.length=r+i;for(let s=0;s<i;s++)e[r+s]=o[s]}else e.push(o)}}var q=new class{constructor(e,i){this.i=e,this.j=i,this.h=0,this.g=null}get(){let e;return this.h>0?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new ra,e=>e.reset());let ra=class ra{constructor(){this.next=this.g=this.h=null}set(e,i){this.h=e,this.g=i,this.next=null}reset(){this.next=this.g=this.h=null}};let ee,et=!1,en=new class{constructor(){this.h=this.g=null}add(e,i){let r=q.get();r.set(e,i),this.h?this.h.next=r:this.g=r,this.h=r}},ta=()=>{let e=Promise.resolve(void 0);ee=()=>{e.then(sa)}};function sa(){let e;for(var i;e=null,en.g&&(e=en.g,en.g=en.g.next,en.g||(en.h=null),e.next=null),i=e;){try{i.h.call(i.g)}catch(e){!function(e){M.setTimeout(()=>{throw e},0)}(e)}q.j(i),q.h<100&&(q.h++,i.next=q.g,q.g=i)}et=!1}function w(){this.u=this.u,this.C=this.C}function x(e,i){this.type=e,this.g=this.target=i,this.defaultPrevented=!1}w.prototype.u=!1,w.prototype.dispose=function(){this.u||(this.u=!0,this.N())},w.prototype[Symbol.dispose]=function(){this.dispose()},w.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},x.prototype.h=function(){this.defaultPrevented=!0};var ei=function(){if(!M.addEventListener||!Object.defineProperty)return!1;var e=!1,i=Object.defineProperty({},"passive",{get:function(){e=!0}});try{let c=()=>{};M.addEventListener("test",c,i),M.removeEventListener("test",c,i)}catch(e){}return e}();function y(e){return/^[\s\xa0]*$/.test(e)}function z(e,i){x.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e&&this.init(e,i)}t(z,x),z.prototype.init=function(e,i){let r=this.type=e.type,o=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;this.target=e.target||e.srcElement,this.g=i,(i=e.relatedTarget)||("mouseover"==r?i=e.fromElement:"mouseout"==r&&(i=e.toElement)),this.relatedTarget=i,o?(this.clientX=void 0!==o.clientX?o.clientX:o.pageX,this.clientY=void 0!==o.clientY?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType=e.pointerType,this.state=e.state,this.i=e,e.defaultPrevented&&z.Z.h.call(this)},z.prototype.h=function(){z.Z.h.call(this);let e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var er="closure_listenable_"+(1e6*Math.random()|0),eo=0;function wa(e,i,r,o,s){this.listener=e,this.proxy=null,this.src=i,this.type=r,this.capture=!!o,this.ha=s,this.key=++eo,this.da=this.fa=!1}function xa(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function ya(e,i,r){for(let o in e)i.call(r,e[o],o,e)}function Ba(e){let i={};for(let r in e)i[r]=e[r];return i}let es="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Da(e,i){let r,o;for(let i=1;i<arguments.length;i++){for(r in o=arguments[i])e[r]=o[r];for(let i=0;i<es.length;i++)r=es[i],Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}}function Ea(e){this.src=e,this.g={},this.h=0}function Ga(e,i){let r=i.type;if(r in e.g){var o,s=e.g[r],l=Array.prototype.indexOf.call(s,i,void 0);(o=l>=0)&&Array.prototype.splice.call(s,l,1),o&&(xa(i),0==e.g[r].length&&(delete e.g[r],e.h--))}}function Fa(e,i,r,o){for(let s=0;s<e.length;++s){let l=e[s];if(!l.da&&l.listener==i&&!!r==l.capture&&l.ha==o)return s}return -1}Ea.prototype.add=function(e,i,r,o,s){let l=e.toString();(e=this.g[l])||(e=this.g[l]=[],this.h++);let h=Fa(e,i,o,s);return h>-1?(i=e[h],r||(i.fa=!1)):((i=new wa(i,this.src,l,!!o,s)).fa=r,e.push(i)),i};var ea="closure_lm_"+(1e6*Math.random()|0),el={};function Na(e,i,r,o,s,l){if(!i)throw Error("Invalid event type");let h=n(s)?!!s.capture:!!s,f=Oa(e);if(f||(e[ea]=f=new Ea(e)),(r=f.add(i,r,o,h,l)).proxy)return r;if(o=function a(e){return Ra.call(a.src,a.listener,e)},r.proxy=o,o.src=e,o.listener=r,e.addEventListener)ei||(s=h),void 0===s&&(s=!1),e.addEventListener(i.toString(),o,s);else if(e.attachEvent)e.attachEvent(Qa(i.toString()),o);else if(e.addListener&&e.removeListener)e.addListener(o);else throw Error("addEventListener and attachEvent are unavailable.");return r}function Ta(e){if("number"!=typeof e&&e&&!e.da){var i=e.src;if(i&&i[er])Ga(i.i,e);else{var r=e.type,o=e.proxy;i.removeEventListener?i.removeEventListener(r,o,e.capture):i.detachEvent?i.detachEvent(Qa(r),o):i.addListener&&i.removeListener&&i.removeListener(o),(r=Oa(i))?(Ga(r,e),0==r.h&&(r.src=null,i[ea]=null)):xa(e)}}}function Qa(e){return e in el?el[e]:el[e]="on"+e}function Ra(e,i){if(e.da)e=!0;else{i=new z(i,this);let r=e.listener,o=e.ha||e.src;e.fa&&Ta(e),e=r.call(o,i)}return e}function Oa(e){return(e=e[ea])instanceof Ea?e:null}var eh="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ma(e){return"function"==typeof e?e:(e[eh]||(e[eh]=function(i){return e.handleEvent(i)}),e[eh])}function C(){w.call(this),this.i=new Ea(this),this.M=this,this.G=null}function D(e,i){let r,o;var s,l=e.G;if(l)for(s=[];l;l=l.G)s.push(l);if(e=e.M,l=i.type||i,"string"==typeof i)i=new x(i,e);else if(i instanceof x)i.target=i.target||e;else{var h=i;Da(i=new x(l,e),h)}if(h=!0,s)for(o=s.length-1;o>=0;o--)h=Va(r=i.g=s[o],l,!0,i)&&h;if(h=Va(r=i.g=e,l,!0,i)&&h,h=Va(r,l,!1,i)&&h,s)for(o=0;o<s.length;o++)h=Va(r=i.g=s[o],l,!1,i)&&h}function Va(e,i,r,o){if(!(i=e.i.g[String(i)]))return!0;i=i.concat();let s=!0;for(let l=0;l<i.length;++l){let h=i[l];if(h&&!h.da&&h.capture==r){let i=h.listener,r=h.ha||h.src;h.fa&&Ga(e.i,h),s=!1!==i.call(r,o)&&s}}return s&&!o.defaultPrevented}t(C,w),C.prototype[er]=!0,C.prototype.removeEventListener=function(e,i,r,o){!function Sa(e,i,r,o,s){if(Array.isArray(i))for(var l=0;l<i.length;l++)Sa(e,i[l],r,o,s);else(o=n(o)?!!o.capture:!!o,r=Ma(r),e&&e[er])?(e=e.i,(l=String(i).toString())in e.g&&(r=Fa(i=e.g[l],r,o,s))>-1&&(xa(i[r]),Array.prototype.splice.call(i,r,1),0==i.length&&(delete e.g[l],e.h--))):e&&(e=Oa(e))&&(i=e.g[i.toString()],e=-1,i&&(e=Fa(i,r,o,s)),(r=e>-1?i[e]:null)&&Ta(r))}(this,e,i,r,o)},C.prototype.N=function(){if(C.Z.N.call(this),this.i){var e=this.i;for(let i in e.g){let r=e.g[i];for(let e=0;e<r.length;e++)xa(r[e]);delete e.g[i],e.h--}}this.G=null},C.prototype.J=function(e,i,r,o){return this.i.add(String(e),i,!1,r,o)},C.prototype.K=function(e,i,r,o){return this.i.add(String(e),i,!0,r,o)};let Ya=class Ya extends w{constructor(e,i){super(),this.m=e,this.l=i,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:function Xa(e){e.g=function(e,i){if("function"!=typeof e){if(e&&"function"==typeof e.handleEvent)e=p(e.handleEvent,e);else throw Error("Invalid listener argument")}return Number(i)>2147483647?-1:M.setTimeout(e,i||0)}(()=>{e.g=null,e.i&&(e.i=!1,Xa(e))},e.l);let i=e.h;e.h=null,e.m.apply(null,i)}(this)}N(){super.N(),this.g&&(M.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}};function E(e){w.call(this),this.h=e,this.g={}}t(E,w);var eu=[];function $a(e){ya(e.g,function(e,i){this.g.hasOwnProperty(i)&&Ta(e)},e),e.g={}}E.prototype.N=function(){E.Z.N.call(this),$a(this)},E.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ef=M.JSON.stringify,ep=M.JSON.parse,ed=class{stringify(e){return M.JSON.stringify(e,void 0)}parse(e){return M.JSON.parse(e,void 0)}};function eb(){}function fb(){}var eg={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function gb(){x.call(this,"d")}function hb(){x.call(this,"c")}t(gb,x),t(hb,x);var em={},ey=null;function jb(){return ey=ey||new C}function kb(e){x.call(this,em.Ia,e)}function lb(e){let i=jb();D(i,new kb(i))}function mb(e,i){x.call(this,em.STAT_EVENT,e),this.stat=i}function J(e){let i=jb();D(i,new mb(i,e))}function nb(e,i){x.call(this,em.Ja,e),this.size=i}function ob(e,i){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return M.setTimeout(function(){e()},i)}function pb(){this.g=!0}function K(e,i,r,o){e.info(function(){return"XMLHTTP TEXT ("+i+"): "+function(e,i){if(!e.g)return i;if(!i)return null;try{let l=JSON.parse(i);if(l){for(e=0;e<l.length;e++)if(Array.isArray(l[e])){var r=l[e];if(!(r.length<2)){var o=r[1];if(Array.isArray(o)&&!(o.length<1)){var s=o[0];if("noop"!=s&&"stop"!=s&&"close"!=s)for(let e=1;e<o.length;e++)o[e]=""}}}}return ef(l)}catch(e){return i}}(e,r)+(o?" "+o:"")})}em.Ia="serverreachability",t(kb,x),em.STAT_EVENT="statevent",t(mb,x),em.Ja="timingevent",t(nb,x),pb.prototype.ua=function(){this.g=!1},pb.prototype.info=function(){};var ew={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},ev={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"};function xb(){}function L(e){return encodeURIComponent(String(e))}function N(e,i,r,o){this.j=e,this.i=i,this.l=r,this.S=o||1,this.V=new E(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new zb}function zb(){this.i=null,this.g="",this.h=!1}t(xb,eb),xb.prototype.g=function(){return new XMLHttpRequest},e=new xb;var eS={},eE={};function Cb(e,i,r){e.M=1,e.A=Db(O(i)),e.u=r,e.R=!0,Eb(e,null)}function Eb(e,i){e.F=Date.now(),Fb(e),e.B=O(e.A);var r=e.B,o=e.S;Array.isArray(o)||(o=[String(o)]),Gb(r.i,"t",o),e.C=0,r=e.j.L,e.h=new zb,e.g=Hb(e.j,r?i:null,!e.u),e.P>0&&(e.O=new Ya(p(e.Y,e,e.g),e.P)),i=e.V,r=e.g,o=e.ba;var s="readystatechange";Array.isArray(s)||(s&&(eu[0]=s.toString()),s=eu);for(let e=0;e<s.length;e++){let l=function Ka(e,i,r,o,s){if(o&&o.once)return function La(e,i,r,o,s){if(Array.isArray(i)){for(let l=0;l<i.length;l++)La(e,i[l],r,o,s);return null}return r=Ma(r),e&&e[er]?e.K(i,r,n(o)?!!o.capture:!!o,s):Na(e,i,r,!0,o,s)}(e,i,r,o,s);if(Array.isArray(i)){for(let l=0;l<i.length;l++)Ka(e,i[l],r,o,s);return null}return r=Ma(r),e&&e[er]?e.J(i,r,n(o)?!!o.capture:!!o,s):Na(e,i,r,!1,o,s)}(r,s[e],o||i.handleEvent,!1,i.h||i);if(!l)break;i.g[l.key]=l}i=e.J?Ba(e.J):{},e.u?(e.v||(e.v="POST"),i["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.B,e.v,e.u,i)):(e.v="GET",e.g.ea(e.B,e.v,null,i)),lb(),function(e,i,r,o,s,l){e.info(function(){if(e.g){if(l){var h="",f=l.split("&");for(let e=0;e<f.length;e++){var d=f[e].split("=");if(d.length>1){let e=d[0];d=d[1];let i=e.split("_");h=i.length>=2&&"type"==i[1]?h+(e+"=")+d+"&":h+(e+"=redacted&")}}}else h=null}else h=l;return"XMLHTTP REQ ("+o+") [attempt "+s+"]: "+i+"\n"+r+"\n"+h})}(e.i,e.v,e.B,e.l,e.S,e.u)}function Ob(e){return!!e.g&&"GET"==e.v&&2!=e.M&&e.j.Aa}function Fb(e){e.T=Date.now()+e.H,Sb(e,e.H)}function Sb(e,i){if(null!=e.D)throw Error("WatchDog timer not null");e.D=ob(p(e.aa,e),i)}function Jb(e){e.D&&(M.clearTimeout(e.D),e.D=null)}function Mb(e){0==e.j.I||e.K||Qb(e.j,e)}function Q(e){Jb(e);var i=e.O;i&&"function"==typeof i.dispose&&i.dispose(),e.O=null,$a(e.V),e.g&&(i=e.g,e.g=null,i.abort(),i.dispose())}function Lb(e,i){try{var r=e.j;if(0!=r.I&&(r.g==e||Tb(r.h,e))){if(!e.L&&Tb(r.h,e)&&3==r.I){try{var o=r.Ba.g.parse(i)}catch(e){o=null}if(Array.isArray(o)&&3==o.length){var s=o;if(0==s[0]){e:if(!r.v){if(r.g){if(r.g.F+3e3<e.F)Ub(r),Vb(r);else break e}Wb(r),J(18)}}else r.xa=s[1],0<r.xa-r.K&&s[2]<37500&&r.F&&0==r.A&&!r.C&&(r.C=ob(p(r.Va,r),6e3));1>=Xb(r.h)&&r.ta&&(r.ta=void 0)}else R(r,11)}else if((e.L||r.g==e)&&Ub(r),!y(i))for(s=r.Ba.g.parse(i),i=0;i<s.length;i++){let f=s[i],d=f[0];if(!(d<=r.K)){if(r.K=d,f=f[1],2==r.I){if("c"==f[0]){r.M=f[1],r.ba=f[2];let i=f[3];null!=i&&(r.ka=i,r.j.info("VER="+r.ka));let s=f[4];null!=s&&(r.za=s,r.j.info("SVER="+r.za));let d=f[5];null!=d&&"number"==typeof d&&d>0&&(o=1.5*d,r.O=o,r.j.info("backChannelRequestTimeoutMs_="+o)),o=r;let g=e.g;if(g){let e=g.g?g.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var l=o.h;l.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(l.j=l.l,l.g=new Set,l.h&&(Yb(l,l.h),l.h=null))}if(o.G){let e=g.g?g.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(o.wa=e,S(o.J,o.G,e))}}if(r.I=3,r.l&&r.l.ra(),r.aa&&(r.T=Date.now()-e.F,r.j.info("Handshake RTT: "+r.T+"ms")),(o=r).na=Zb(o,o.L?o.ba:null,o.W),e.L){$b(o.h,e);var h=o.O;h&&(e.H=h),e.D&&(Jb(e),Fb(e)),o.g=e}else ac(o);r.i.length>0&&bc(r)}else"stop"!=f[0]&&"close"!=f[0]||R(r,7)}else 3==r.I&&("stop"==f[0]||"close"==f[0]?"stop"==f[0]?R(r,7):cc(r):"noop"!=f[0]&&r.l&&r.l.qa(f),r.A=0)}}}lb(4)}catch(e){}}N.prototype.ba=function(e){e=e.target;let i=this.O;i&&3==P(e)?i.j():this.Y(e)},N.prototype.Y=function(e){try{if(e==this.g)e:{let f=P(this.g),d=this.g.ya(),g=this.g.ca();if(!(f<3)&&(3!=f||this.g&&(this.h.h||this.g.la()||Ib(this.g)))){this.K||4!=f||7==d||(8==d||g<=0?lb(3):lb(2)),Jb(this);var i=this.g.ca();this.X=i;var r=function(e){if(!Ob(e))return e.g.la();let i=Ib(e.g);if(""===i)return"";let r="",o=i.length,s=4==P(e.g);if(!e.h.i){if("undefined"==typeof TextDecoder)return Q(e),Mb(e),"";e.h.i=new M.TextDecoder}for(let l=0;l<o;l++)e.h.h=!0,r+=e.h.i.decode(i[l],{stream:!(s&&l==o-1)});return i.length=0,e.h.g+=r,e.C=0,e.h.g}(this);if(this.o=200==i,function(e,i,r,o,s,l,h){e.info(function(){return"XMLHTTP RESP ("+o+") [ attempt "+s+"]: "+i+"\n"+r+"\n"+l+" "+h})}(this.i,this.v,this.B,this.l,this.S,f,i),this.o){if(this.U&&!this.L){t:{if(this.g){var o,s=this.g;if((o=s.g?s.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(o)){var l=o;break t}}l=null}if(e=l)K(this.i,this.l,e,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Lb(this,e);else{this.o=!1,this.m=3,J(12),Q(this),Mb(this);break e}}if(this.R){let i;for(e=!0;!this.K&&this.C<r.length;)if((i=function(e,i){var r=e.C,o=i.indexOf("\n",r);return -1==o?eE:isNaN(r=Number(i.substring(r,o)))?eS:(o+=1)+r>i.length?eE:(i=i.slice(o,o+r),e.C=o+r,i)}(this,r))==eE){4==f&&(this.m=4,J(14),e=!1),K(this.i,this.l,null,"[Incomplete Response]");break}else if(i==eS){this.m=4,J(15),K(this.i,this.l,r,"[Invalid Chunk]"),e=!1;break}else K(this.i,this.l,i,null),Lb(this,i);if(Ob(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=f||0!=r.length||this.h.h||(this.m=1,J(16),e=!1),this.o=this.o&&e,e){if(r.length>0&&!this.W){this.W=!0;var h=this.j;h.g==this&&h.aa&&!h.P&&(h.j.info("Great, no buffering proxy detected. Bytes received: "+r.length),Pb(h),h.P=!0,J(11))}}else K(this.i,this.l,r,"[Invalid Chunked Response]"),Q(this),Mb(this)}else K(this.i,this.l,r,null),Lb(this,r);4==f&&Q(this),this.o&&!this.K&&(4==f?Qb(this.j,this):(this.o=!1,Fb(this)))}else(function(e){let i={};e=(e.g&&P(e)>=2&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let o=0;o<e.length;o++){if(y(e[o]))continue;var r=function(e){var i=1;e=e.split(":");let r=[];for(;i>0&&e.length;)r.push(e.shift()),i--;return e.length&&r.push(e.join(":")),r}(e[o]);let s=r[0];if("string"!=typeof(r=r[1]))continue;r=r.trim();let l=i[s]||[];i[s]=l,l.push(r)}!function(e,i){for(let r in e)i.call(void 0,e[r],r,e)}(i,function(e){return e.join(", ")})})(this.g),400==i&&r.indexOf("Unknown SID")>0?(this.m=3,J(12)):(this.m=0,J(13)),Q(this),Mb(this)}}}catch(e){}finally{}},N.prototype.cancel=function(){this.K=!0,Q(this)},N.prototype.aa=function(){this.D=null;let e=Date.now();e-this.T>=0?(function(e,i){e.info(function(){return"TIMEOUT: "+i})}(this.i,this.B),2!=this.M&&(lb(),J(17)),Q(this),this.m=2,Mb(this)):Sb(this,this.T-e)};var eC=class{constructor(e,i){this.g=e,this.map=i}};function ec(e){this.l=e||10,e=M.PerformanceNavigationTiming?(e=M.performance.getEntriesByType("navigation")).length>0&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):!!(M.chrome&&M.chrome.loadTimes&&M.chrome.loadTimes()&&M.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function fc(e){return!!e.h||!!e.g&&e.g.size>=e.j}function Xb(e){return e.h?1:e.g?e.g.size:0}function Tb(e,i){return e.h?e.h==i:!!e.g&&e.g.has(i)}function Yb(e,i){e.g?e.g.add(i):e.h=i}function $b(e,i){e.h&&e.h==i?e.h=null:e.g&&e.g.has(i)&&e.g.delete(i)}function hc(e){if(null!=e.h)return e.i.concat(e.h.G);if(null!=e.g&&0!==e.g.size){let i=e.i;for(let r of e.g.values())i=i.concat(r.G);return i}return ja(e.i)}ec.prototype.cancel=function(){if(this.i=hc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(let e of this.g.values())e.cancel();this.g.clear()}};var eT=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function T(e){let i;this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1,e instanceof T?(this.l=e.l,kc(this,e.j),this.o=e.o,this.g=e.g,lc(this,e.u),this.h=e.h,mc(this,nc(e.i)),this.m=e.m):e&&(i=String(e).match(eT))?(this.l=!1,kc(this,i[1]||"",!0),this.o=oc(i[2]||""),this.g=oc(i[3]||"",!0),lc(this,i[4]),this.h=oc(i[5]||"",!0),mc(this,i[6]||"",!0),this.m=oc(i[7]||"")):(this.l=!1,this.i=new pc(null,this.l))}function O(e){return new T(e)}function kc(e,i,r){e.j=r?oc(i,!0):i,e.j&&(e.j=e.j.replace(/:$/,""))}function lc(e,i){if(i){if(isNaN(i=Number(i))||i<0)throw Error("Bad port number "+i);e.u=i}else e.u=null}function mc(e,i,r){var o,s;i instanceof pc?(e.i=i,o=e.i,(s=e.l)&&!o.j&&(U(o),o.i=null,o.g.forEach(function(e,i){let r=i.toLowerCase();i!=r&&(yc(this,i),Gb(this,r,e))},o)),o.j=s):(r||(i=qc(i,eA)),e.i=new pc(i,e.l))}function S(e,i,r){e.i.set(i,r)}function Db(e){return S(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function oc(e,i){return e?i?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function qc(e,i,r){return"string"==typeof e?(e=encodeURI(e).replace(i,xc),r&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function xc(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}T.prototype.toString=function(){let e=[];var i=this.j;i&&e.push(qc(i,eI,!0),":");var r=this.g;return(r||"file"==i)&&(e.push("//"),(i=this.o)&&e.push(qc(i,eI,!0),"@"),e.push(L(r).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(r=this.u)&&e.push(":",String(r))),(r=this.h)&&(this.g&&"/"!=r.charAt(0)&&e.push("/"),e.push(qc(r,"/"==r.charAt(0)?e_:eD,!0))),(r=this.i.toString())&&e.push("?",r),(r=this.m)&&e.push("#",qc(r,ek)),e.join("")},T.prototype.resolve=function(e){let i=O(this),r=!!e.j;r?kc(i,e.j):r=!!e.o,r?i.o=e.o:r=!!e.g,r?i.g=e.g:r=null!=e.u;var o=e.h;if(r)lc(i,e.u);else if(r=!!e.h){if("/"!=o.charAt(0)){if(this.g&&!this.h)o="/"+o;else{var s=i.h.lastIndexOf("/");-1!=s&&(o=i.h.slice(0,s+1)+o)}}if(".."==(s=o)||"."==s)o="";else if(-1!=s.indexOf("./")||-1!=s.indexOf("/.")){o=0==s.lastIndexOf("/",0),s=s.split("/");let e=[];for(let i=0;i<s.length;){let r=s[i++];"."==r?o&&i==s.length&&e.push(""):".."==r?((e.length>1||1==e.length&&""!=e[0])&&e.pop(),o&&i==s.length&&e.push("")):(e.push(r),o=!0)}o=e.join("/")}else o=s}return r?i.h=o:r=""!==e.i.toString(),r?mc(i,nc(e.i)):r=!!e.m,r&&(i.m=e.m),i};var eI=/[#\/\?@]/g,eD=/[#\?:]/g,e_=/[#\?]/g,eA=/[#\?@]/g,ek=/#/g;function pc(e,i){this.h=this.g=null,this.i=e||null,this.j=!!i}function U(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,i){if(e){e=e.split("&");for(let r=0;r<e.length;r++){let o=e[r].indexOf("="),s,l=null;o>=0?(s=e[r].substring(0,o),l=e[r].substring(o+1)):s=e[r],i(s,l?decodeURIComponent(l.replace(/\+/g," ")):"")}}}(e.i,function(i,r){e.add(decodeURIComponent(i.replace(/\+/g," ")),r)}))}function yc(e,i){U(e),i=V(e,i),e.g.has(i)&&(e.i=null,e.h-=e.g.get(i).length,e.g.delete(i))}function zc(e,i){return U(e),i=V(e,i),e.g.has(i)}function Ac(e,i){U(e);let r=[];if("string"==typeof i)zc(e,i)&&(r=r.concat(e.g.get(V(e,i))));else for(e=Array.from(e.g.values()),i=0;i<e.length;i++)r=r.concat(e[i]);return r}function Gb(e,i,r){yc(e,i),r.length>0&&(e.i=null,e.g.set(V(e,i),ja(r)),e.h+=r.length)}function nc(e){let i=new pc;return i.i=e.i,e.g&&(i.g=new Map(e.g),i.h=e.h),i}function V(e,i){return i=String(i),e.j&&(i=i.toLowerCase()),i}function W(e,i,r,o,s){try{s&&(s.onload=null,s.onerror=null,s.onabort=null,s.ontimeout=null),o(r)}catch(e){}}function Dc(){this.g=new ed}function Ec(e){this.i=e.Sb||null,this.h=e.ab||!1}function Fc(e,i){C.call(this),this.H=e,this.o=i,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}function Ic(e){e.j.read().then(e.Ma.bind(e)).catch(e.ga.bind(e))}function Hc(e){e.readyState=4,e.l=null,e.j=null,e.B=null,Gc(e)}function Gc(e){e.onreadystatechange&&e.onreadystatechange.call(e)}function Jc(e){let i="";return ya(e,function(e,r){i+=r+":"+e+"\r\n"}),i}function Kc(e,i,r){e:{for(o in r){var o=!1;break e}o=!0}o||(r=Jc(r),"string"==typeof e?null!=r&&L(r):S(e,i,r))}function X(e){C.call(this),this.headers=new Map,this.L=e||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}(i=pc.prototype).add=function(e,i){U(this),this.i=null,e=V(this,e);let r=this.g.get(e);return r||this.g.set(e,r=[]),r.push(i),this.h+=1,this},i.forEach=function(e,i){U(this),this.g.forEach(function(r,o){r.forEach(function(r){e.call(i,r,o,this)},this)},this)},i.set=function(e,i){return U(this),this.i=null,zc(this,e=V(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[i]),this.h+=1,this},i.get=function(e,i){return e&&(e=Ac(this,e)).length>0?String(e[0]):i},i.toString=function(){if(this.i)return this.i;if(!this.g)return"";let e=[],i=Array.from(this.g.keys());for(let o=0;o<i.length;o++){var r=i[o];let s=L(r);r=Ac(this,r);for(let i=0;i<r.length;i++){let o=s;""!==r[i]&&(o+="="+L(r[i])),e.push(o)}}return this.i=e.join("&")},t(Ec,eb),Ec.prototype.g=function(){return new Fc(this.i,this.h)},t(Fc,C),(i=Fc.prototype).open=function(e,i){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.F=e,this.D=i,this.readyState=1,Gc(this)},i.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;let i={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};e&&(i.body=e),(this.H||M).fetch(new Request(this.D,i)).then(this.Pa.bind(this),this.ga.bind(this))},i.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&4!=this.readyState&&(this.g=!1,Hc(this)),this.readyState=0},i.Pa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,Gc(this)),this.g&&(this.readyState=3,Gc(this),this.g))){if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(void 0!==M.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Ic(this)}else e.text().then(this.Oa.bind(this),this.ga.bind(this))}},i.Ma=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var i=e.value?e.value:new Uint8Array(0);(i=this.B.decode(i,{stream:!e.done}))&&(this.response=this.responseText+=i)}e.done?Hc(this):Gc(this),3==this.readyState&&Ic(this)}},i.Oa=function(e){this.g&&(this.response=this.responseText=e,Hc(this))},i.Na=function(e){this.g&&(this.response=e,Hc(this))},i.ga=function(){this.g&&Hc(this)},i.setRequestHeader=function(e,i){this.A.append(e,i)},i.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},i.getAllResponseHeaders=function(){if(!this.h)return"";let e=[],i=this.h.entries();for(var r=i.next();!r.done;)e.push((r=r.value)[0]+": "+r[1]),r=i.next();return e.join("\r\n")},Object.defineProperty(Fc.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}}),t(X,C);var eO=/^https?$/i,ex=["POST","PUT"];function Nc(e,i){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=i,e.o=5,Oc(e),Pc(e)}function Oc(e){e.A||(e.A=!0,D(e,"complete"),D(e,"error"))}function Qc(e){if(e.h&&void 0!==j){if(e.v&&4==P(e))setTimeout(e.Ca.bind(e),0);else if(D(e,"readystatechange"),4==P(e)){e.h=!1;try{let l=e.ca();switch(l){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var i,r,o=!0;break;default:o=!1}if(!(i=o)){if(r=0===l){let i=String(e.D).match(eT)[1]||null;!i&&M.self&&M.self.location&&(i=M.self.location.protocol.slice(0,-1)),r=!eO.test(i?i.toLowerCase():"")}i=r}if(i)D(e,"complete"),D(e,"success");else{e.o=6;try{var s=P(e)>2?e.g.statusText:""}catch(e){s=""}e.l=s+" ["+e.ca()+"]",Oc(e)}}finally{Pc(e)}}}}function Pc(e,i){if(e.g){e.m&&(clearTimeout(e.m),e.m=null);let r=e.g;e.g=null,i||D(e,"ready");try{r.onreadystatechange=null}catch(e){}}}function P(e){return e.g?e.g.readyState:0}function Ib(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.F){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(e){return null}}function Rc(e,i,r){return r&&r.internalChannelParams&&r.internalChannelParams[e]||i}function Sc(e){this.za=0,this.i=[],this.j=new pb,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Rc("failFast",!1,e),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Rc("baseRetryDelayMs",5e3,e),this.Za=Rc("retryDelaySeedMs",1e4,e),this.Ta=Rc("forwardChannelMaxRetries",2,e),this.va=Rc("forwardChannelRequestTimeoutMs",2e4,e),this.ma=e&&e.xmlHttpFactory||void 0,this.Ua=e&&e.Rb||void 0,this.Aa=e&&e.useFetchStreams||!1,this.O=void 0,this.L=e&&e.supportsCrossDomainXhr||!1,this.M="",this.h=new ec(e&&e.concurrentRequestLimit),this.Ba=new Dc,this.S=e&&e.fastHandshake||!1,this.R=e&&e.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=e&&e.Pb||!1,e&&e.ua&&this.j.ua(),e&&e.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&e&&e.detectBufferingProxy||!1,this.ia=void 0,e&&e.longPollingTimeout&&e.longPollingTimeout>0&&(this.ia=e.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}function cc(e){if(Tc(e),3==e.I){var i=e.V++,r=O(e.J);if(S(r,"SID",e.M),S(r,"RID",i),S(r,"TYPE","terminate"),Uc(e,r),(i=new N(e,e.j,i)).M=2,i.A=Db(O(r)),r=!1,M.navigator&&M.navigator.sendBeacon)try{r=M.navigator.sendBeacon(i.A.toString(),"")}catch(e){}!r&&M.Image&&((new Image).src=i.A,r=!0),r||(i.g=Hb(i.j,null),i.g.ea(i.A)),i.F=Date.now(),Fb(i)}Vc(e)}function Vb(e){e.g&&(Pb(e),e.g.cancel(),e.g=null)}function Tc(e){Vb(e),e.v&&(M.clearTimeout(e.v),e.v=null),Ub(e),e.h.cancel(),e.m&&("number"==typeof e.m&&M.clearTimeout(e.m),e.m=null)}function bc(e){if(!fc(e.h)&&!e.m){e.m=!0;var i=e.Ea;ee||ta(),et||(ee(),et=!0),en.add(i,e),e.D=0}}function Zc(e,i){var r;r=i?i.l:e.V++;let o=O(e.J);S(o,"SID",e.M),S(o,"RID",r),S(o,"AID",e.K),Uc(e,o),e.u&&e.o&&Kc(o,e.u,e.o),r=new N(e,e.j,r,e.D+1),null===e.u&&(r.J=e.o),i&&(e.i=i.G.concat(e.i)),i=Yc(e,r,1e3),r.H=Math.round(.5*e.va)+Math.round(.5*e.va*Math.random()),Yb(e.h,r),Cb(r,o,i)}function Uc(e,i){e.H&&ya(e.H,function(e,r){S(i,r,e)}),e.l&&ya({},function(e,r){S(i,r,e)})}function Yc(e,i,r){r=Math.min(e.i.length,r);let o=e.l?p(e.l.Ka,e.l,e):null;e:{var s=e.i;let i=-1;for(;;){let e=["count="+r];-1==i?r>0?(i=s[0].g,e.push("ofs="+i)):i=0:e.push("ofs="+i);let f=!0;for(let d=0;d<r;d++){var l=s[d].g;let r=s[d].map;if((l-=i)<0)i=Math.max(0,s[d].g-100),f=!1;else try{l="req"+l+"_";try{var h=r instanceof Map?r:Object.entries(r);for(let[i,r]of h){let o=r;n(r)&&(o=ef(r)),e.push(l+i+"="+encodeURIComponent(o))}}catch(i){throw e.push(l+"type="+encodeURIComponent("_badmap")),i}}catch(e){o&&o(r)}}if(f){h=e.join("&");break e}}h=void 0}return e=e.i.splice(0,r),i.G=e,h}function ac(e){if(!e.g&&!e.v){e.Y=1;var i=e.Da;ee||ta(),et||(ee(),et=!0),en.add(i,e),e.A=0}}function Wb(e){return!e.g&&!e.v&&!(e.A>=3)&&(e.Y++,e.v=ob(p(e.Da,e),Xc(e,e.A)),e.A++,!0)}function Pb(e){null!=e.B&&(M.clearTimeout(e.B),e.B=null)}function $c(e){e.g=new N(e,e.j,"rpc",e.Y),null===e.u&&(e.g.J=e.o),e.g.P=0;var i=O(e.na);S(i,"RID","rpc"),S(i,"SID",e.M),S(i,"AID",e.K),S(i,"CI",e.F?"0":"1"),!e.F&&e.ia&&S(i,"TO",e.ia),S(i,"TYPE","xmlhttp"),Uc(e,i),e.u&&e.o&&Kc(i,e.u,e.o),e.O&&(e.g.H=e.O);var r=e.g;e=e.ba,r.M=1,r.A=Db(O(i)),r.u=null,r.R=!0,Eb(r,e)}function Ub(e){null!=e.C&&(M.clearTimeout(e.C),e.C=null)}function Qb(e,i){var r=null;if(e.g==i){Ub(e),Pb(e),e.g=null;var o=2}else{if(!Tb(e.h,i))return;r=i.G,$b(e.h,i),o=1}if(0!=e.I){if(i.o){if(1==o){r=i.u?i.u.length:0,i=Date.now()-i.F;var s,l=e.D;D(o=jb(),new nb(o,r)),bc(e)}else ac(e)}else if(3==(l=i.m)||0==l&&i.X>0||!(1==o&&(s=i,!(Xb(e.h)>=e.h.j-(e.m?1:0))&&(e.m?(e.i=s.G.concat(e.i),!0):1!=e.I&&2!=e.I&&!(e.D>=(e.Sa?0:e.Ta))&&(e.m=ob(p(e.Ea,e,s),Xc(e,e.D)),e.D++,!0)))||2==o&&Wb(e)))switch(r&&r.length>0&&((i=e.h).i=i.i.concat(r)),l){case 1:R(e,5);break;case 4:R(e,10);break;case 3:R(e,6);break;default:R(e,2)}}}function Xc(e,i){let r=e.Qa+Math.floor(Math.random()*e.Za);return e.isActive()||(r*=2),r*i}function R(e,i){if(e.j.info("Error code "+i),2==i){var r=p(e.bb,e),o=e.Ua;let i=!o;o=new T(o||"//www.google.com/images/cleardot.gif"),M.location&&"http"==M.location.protocol||kc(o,"https"),Db(o),i?function(e,i){let r=new pb;if(M.Image){let o=new Image;o.onload=ha(W,r,"TestLoadImage: loaded",!0,i,o),o.onerror=ha(W,r,"TestLoadImage: error",!1,i,o),o.onabort=ha(W,r,"TestLoadImage: abort",!1,i,o),o.ontimeout=ha(W,r,"TestLoadImage: timeout",!1,i,o),M.setTimeout(function(){o.ontimeout&&o.ontimeout()},1e4),o.src=e}else i(!1)}(o.toString(),r):function(e,i){let r=new pb,o=new AbortController,s=setTimeout(()=>{o.abort(),W(r,"TestPingServer: timeout",!1,i)},1e4);fetch(e,{signal:o.signal}).then(e=>{clearTimeout(s),e.ok?W(r,"TestPingServer: ok",!0,i):W(r,"TestPingServer: server error",!1,i)}).catch(()=>{clearTimeout(s),W(r,"TestPingServer: error",!1,i)})}(o.toString(),r)}else J(2);e.I=0,e.l&&e.l.pa(i),Vc(e),Tc(e)}function Vc(e){if(e.I=0,e.ja=[],e.l){let i=hc(e.h);(0!=i.length||0!=e.i.length)&&(ka(e.ja,i),ka(e.ja,e.i),e.h.i.length=0,ja(e.i),e.i.length=0),e.l.oa()}}function Zb(e,i,r){var o=r instanceof T?O(r):new T(r);if(""!=o.g)i&&(o.g=i+"."+o.g),lc(o,o.u);else{var s=M.location;o=s.protocol,i=i?i+"."+s.hostname:s.hostname,s=+s.port;let e=new T(null);o&&kc(e,o),i&&(e.g=i),s&&lc(e,s),r&&(e.h=r),o=e}return r=e.G,i=e.wa,r&&i&&S(o,r,i),S(o,"VER",e.ka),Uc(e,o),o}function Hb(e,i,r){if(i&&!e.L)throw Error("Can't create secondary domain capable XhrIo object.");return(i=new X(e.Aa&&!e.ma?new Ec({ab:r}):e.ma)).Fa(e.L),i}function ad(){}function bd(){}function Y(e,i){C.call(this),this.g=new Sc(i),this.l=e,this.h=i&&i.messageUrlParams||null,e=i&&i.messageHeaders||null,i&&i.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=i&&i.initMessageHeaders||null,i&&i.messageContentType&&(e?e["X-WebChannel-Content-Type"]=i.messageContentType:e={"X-WebChannel-Content-Type":i.messageContentType}),i&&i.sa&&(e?e["X-WebChannel-Client-Profile"]=i.sa:e={"X-WebChannel-Client-Profile":i.sa}),this.g.U=e,(e=i&&i.Qb)&&!y(e)&&(this.g.u=e),this.A=i&&i.supportsCrossDomainXhr||!1,this.v=i&&i.sendRawJson||!1,(i=i&&i.httpSessionIdParam)&&!y(i)&&(this.g.G=i,null!==(e=this.h)&&i in e&&i in(e=this.h)&&delete e[i]),this.j=new Z(this)}function cd(e){gb.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var i=e.__sm__;if(i){e:{for(let r in i){e=r;break e}e=void 0}(this.i=e)&&(e=this.i,i=null!==i&&e in i?i[e]:void 0),this.data=i}else this.data=e}function dd(){hb.call(this),this.status=1}function Z(e){this.g=e}(i=X.prototype).Fa=function(e){this.H=e},i.ea=function(i,r,o,s){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);r=r?r.toUpperCase():"GET",this.D=i,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():e.g(),this.g.onreadystatechange=$(p(this.Ca,this));try{this.B=!0,this.g.open(r,String(i),!0),this.B=!1}catch(e){Nc(this,e);return}if(i=o||"",o=new Map(this.headers),s){if(Object.getPrototypeOf(s)===Object.prototype)for(var l in s)o.set(l,s[l]);else if("function"==typeof s.keys&&"function"==typeof s.get)for(let e of s.keys())o.set(e,s.get(e));else throw Error("Unknown input type for opt_headers: "+String(s))}for(let[e,h]of(s=Array.from(o.keys()).find(e=>"content-type"==e.toLowerCase()),l=M.FormData&&i instanceof M.FormData,!(Array.prototype.indexOf.call(ex,r,void 0)>=0)||s||l||o.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),o))this.g.setRequestHeader(e,h);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(i),this.v=!1}catch(e){Nc(this,e)}},i.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=e||7,D(this,"complete"),D(this,"abort"),Pc(this))},i.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Pc(this,!0)),X.Z.N.call(this)},i.Ca=function(){this.u||(this.B||this.v||this.j?Qc(this):this.Xa())},i.Xa=function(){Qc(this)},i.isActive=function(){return!!this.g},i.ca=function(){try{return P(this)>2?this.g.status:-1}catch(e){return -1}},i.la=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},i.La=function(e){if(this.g){var i=this.g.responseText;return e&&0==i.indexOf(e)&&(i=i.substring(e.length)),ep(i)}},i.ya=function(){return this.o},i.Ha=function(){return"string"==typeof this.l?this.l:String(this.l)},(i=Sc.prototype).ka=8,i.I=1,i.connect=function(e,i,r,o){J(0),this.W=e,this.H=i||{},r&&void 0!==o&&(this.H.OSID=r,this.H.OAID=o),this.F=this.X,this.J=Zb(this,null,this.W),bc(this)},i.Ea=function(e){if(this.m){if(this.m=null,1==this.I){if(!e){this.V=Math.floor(1e5*Math.random()),e=this.V++;let s=new N(this,this.j,e),l=this.o;if(this.U&&(l?Da(l=Ba(l),this.U):l=this.U),null!==this.u||this.R||(s.J=l,l=null),this.S)e:{for(var i=0,r=0;r<this.i.length;r++){t:{var o=this.i[r];if("__data__"in o.map&&"string"==typeof(o=o.map.__data__)){o=o.length;break t}o=void 0}if(void 0===o)break;if((i+=o)>4096){i=r;break e}if(4096===i||r===this.i.length-1){i=r+1;break e}}i=1e3}else i=1e3;i=Yc(this,s,i),S(r=O(this.J),"RID",e),S(r,"CVER",22),this.G&&S(r,"X-HTTP-Session-Id",this.G),Uc(this,r),l&&(this.R?i="headers="+L(Jc(l))+"&"+i:this.u&&Kc(r,this.u,l)),Yb(this.h,s),this.Ra&&S(r,"TYPE","init"),this.S?(S(r,"$req",i),S(r,"SID","null"),s.U=!0,Cb(s,r,null)):Cb(s,r,i),this.I=2}}else 3==this.I&&(e?Zc(this,e):0==this.i.length||fc(this.h)||Zc(this))}},i.Da=function(){if(this.v=null,$c(this),this.aa&&!(this.P||null==this.g||this.T<=0)){var e=4*this.T;this.j.info("BP detection timer enabled: "+e),this.B=ob(p(this.Wa,this),e)}},i.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,J(10),Vb(this),$c(this))},i.Va=function(){null!=this.C&&(this.C=null,Vb(this),Wb(this),J(19))},i.bb=function(e){e?(this.j.info("Successfully pinged google.com"),J(2)):(this.j.info("Failed to ping google.com"),J(1))},i.isActive=function(){return!!this.l&&this.l.isActive(this)},(i=ad.prototype).ra=function(){},i.qa=function(){},i.pa=function(){},i.oa=function(){},i.isActive=function(){return!0},i.Ka=function(){},bd.prototype.g=function(e,i){return new Y(e,i)},t(Y,C),Y.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Y.prototype.close=function(){cc(this.g)},Y.prototype.o=function(e){var i=this.g;if("string"==typeof e){var r={};r.__data__=e,e=r}else this.v&&((r={}).__data__=ef(e),e=r);i.i.push(new eC(i.Ya++,e)),3==i.I&&bc(i)},Y.prototype.N=function(){this.g.l=null,delete this.j,cc(this.g),delete this.g,Y.Z.N.call(this)},t(cd,gb),t(dd,hb),t(Z,ad),Z.prototype.ra=function(){D(this.g,"a")},Z.prototype.qa=function(e){D(this.g,new cd(e))},Z.prototype.pa=function(e){D(this.g,new dd)},Z.prototype.oa=function(){D(this.g,"b")},bd.prototype.createWebChannel=bd.prototype.g,Y.prototype.send=Y.prototype.o,Y.prototype.open=Y.prototype.m,Y.prototype.close=Y.prototype.close,b=A.createWebChannelTransport=function(){return new bd},g=A.getStatEventTarget=function(){return jb()},d=A.Event=em,f=A.Stat={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},ew.NO_ERROR=0,ew.TIMEOUT=8,ew.HTTP_ERROR=6,h=A.ErrorCode=ew,ev.COMPLETE="complete",l=A.EventType=ev,fb.EventType=eg,eg.OPEN="a",eg.CLOSE="b",eg.ERROR="c",eg.MESSAGE="d",C.prototype.listen=C.prototype.J,s=A.WebChannel=fb,A.FetchXmlHttpFactory=Ec,X.prototype.listenOnce=X.prototype.K,X.prototype.getLastError=X.prototype.Ha,X.prototype.getLastErrorCode=X.prototype.ya,X.prototype.getStatus=X.prototype.ca,X.prototype.getResponseJson=X.prototype.La,X.prototype.getResponseText=X.prototype.la,X.prototype.send=X.prototype.ea,X.prototype.setWithCredentials=X.prototype.Fa,o=A.XhrIo=X}).apply(void 0!==_?_:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},3977:function(e,i,r){r.d(i,{ZF:function(){return o.ZF}});var o=r(3310);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(0,o.KN)("firebase","12.4.0","app")},5876:function(e,i,r){r.d(i,{Xb:function(){return o.ab},v0:function(){return o.p},Aj:function(){return o.z},LS:function(){return o.a6},e5:function(){return o.ac},w7:function(){return o.D},ck:function(){return o.al}});var o=r(9199);r(3310),r(9711),r(4645),r(75)},9828:function(e,i,r){r.d(i,{Bt:function(){return o.Bt},ET:function(){return o.ET},IO:function(){return o.IO},JU:function(){return o.JU},QT:function(){return o.QT},Xo:function(){return o.Xo},ad:function(){return o.ad},ar:function(){return o.ar},cf:function(){return o.cf},hJ:function(){return o.hJ},pl:function(){return o.pl}});var o=r(5595)},2806:function(e,i,r){r.d(i,{KL:function(){return getMessagingInWindow},LP:function(){return index_esm_getToken},ps:function(){return onMessage}});var o,s,l,h,f=r(3310),d=r(75),g=r(9711),b=r(6531);let _="@firebase/installations",A="0.6.19",k=`w:${A}`,j="FIS_v2",M=new g.LL("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function isServerError(e){return e instanceof g.ZR&&e.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function getInstallationsEndpoint({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function extractAuthTokenInfoFromResponse(e){return{token:e.token,requestStatus:2,expiresIn:Number(e.expiresIn.replace("s","000")),creationTime:Date.now()}}async function getErrorFromResponse(e,i){let r=await i.json(),o=r.error;return M.create("request-failed",{requestName:e,serverCode:o.code,serverMessage:o.message,serverStatus:o.status})}function getHeaders({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}async function retryIfServerError(e){let i=await e();return i.status>=500&&i.status<600?e():i}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function createInstallationRequest({appConfig:e,heartbeatServiceProvider:i},{fid:r}){let o=getInstallationsEndpoint(e),s=getHeaders(e),l=i.getImmediate({optional:!0});if(l){let e=await l.getHeartbeatsHeader();e&&s.append("x-firebase-client",e)}let h={fid:r,authVersion:j,appId:e.appId,sdkVersion:k},f={method:"POST",headers:s,body:JSON.stringify(h)},d=await retryIfServerError(()=>fetch(o,f));if(d.ok){let e=await d.json(),i={fid:e.fid||r,registrationStatus:2,refreshToken:e.refreshToken,authToken:extractAuthTokenInfoFromResponse(e.authToken)};return i}throw await getErrorFromResponse("Create Installation",d)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sleep(e){return new Promise(i=>{setTimeout(i,e)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $=/^[cdef][\w-]{21}$/;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function getKey(e){return`${e.appName}!${e.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let q=new Map;function fidChanged(e,i){let r=getKey(e);callFidChangeCallbacks(r,i),function(e,i){let r=(!ee&&"BroadcastChannel"in self&&((ee=new BroadcastChannel("[Firebase] FID Change")).onmessage=e=>{callFidChangeCallbacks(e.data.key,e.data.fid)}),ee);r&&r.postMessage({key:e,fid:i}),0===q.size&&ee&&(ee.close(),ee=null)}(r,i)}function callFidChangeCallbacks(e,i){let r=q.get(e);if(r)for(let e of r)e(i)}let ee=null,et="firebase-installations-store",en=null;function getDbPromise(){return en||(en=(0,b.X3)("firebase-installations-database",1,{upgrade:(e,i)=>{0===i&&e.createObjectStore(et)}})),en}async function set(e,i){let r=getKey(e),o=await getDbPromise(),s=o.transaction(et,"readwrite"),l=s.objectStore(et),h=await l.get(r);return await l.put(i,r),await s.done,h&&h.fid===i.fid||fidChanged(e,i.fid),i}async function remove(e){let i=getKey(e),r=await getDbPromise(),o=r.transaction(et,"readwrite");await o.objectStore(et).delete(i),await o.done}async function update(e,i){let r=getKey(e),o=await getDbPromise(),s=o.transaction(et,"readwrite"),l=s.objectStore(et),h=await l.get(r),f=i(h);return void 0===f?await l.delete(r):await l.put(f,r),await s.done,f&&(!h||h.fid!==f.fid)&&fidChanged(e,f.fid),f}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function getInstallationEntry(e){let i;let r=await update(e.appConfig,r=>{let o=function(e){let i=e||{fid:function(){try{let e=new Uint8Array(17),i=self.crypto||self.msCrypto;i.getRandomValues(e),e[0]=112+e[0]%16;let r=function(e){let i=/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){let i=btoa(String.fromCharCode(...e));return i.replace(/\+/g,"-").replace(/\//g,"_")}(e);return i.substr(0,22)}(e);return $.test(r)?r:""}catch{return""}}(),registrationStatus:0};return clearTimedOutRequest(i)}(r),s=function(e,i){if(0===i.registrationStatus){if(!navigator.onLine){let e=Promise.reject(M.create("app-offline"));return{installationEntry:i,registrationPromise:e}}let r={fid:i.fid,registrationStatus:1,registrationTime:Date.now()},o=registerInstallation(e,r);return{installationEntry:r,registrationPromise:o}}return 1===i.registrationStatus?{installationEntry:i,registrationPromise:waitUntilFidRegistration(e)}:{installationEntry:i}}(e,o);return i=s.registrationPromise,s.installationEntry});return""===r.fid?{installationEntry:await i}:{installationEntry:r,registrationPromise:i}}async function registerInstallation(e,i){try{let r=await createInstallationRequest(e,i);return set(e.appConfig,r)}catch(r){throw isServerError(r)&&409===r.customData.serverCode?await remove(e.appConfig):await set(e.appConfig,{fid:i.fid,registrationStatus:0}),r}}async function waitUntilFidRegistration(e){let i=await updateInstallationRequest(e.appConfig);for(;1===i.registrationStatus;)await sleep(100),i=await updateInstallationRequest(e.appConfig);if(0===i.registrationStatus){let{installationEntry:i,registrationPromise:r}=await getInstallationEntry(e);return r||i}return i}function updateInstallationRequest(e){return update(e,e=>{if(!e)throw M.create("installation-not-found");return clearTimedOutRequest(e)})}function clearTimedOutRequest(e){return 1===e.registrationStatus&&e.registrationTime+1e4<Date.now()?{fid:e.fid,registrationStatus:0}:e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function generateAuthTokenRequest({appConfig:e,heartbeatServiceProvider:i},r){let o=function(e,{fid:i}){return`${getInstallationsEndpoint(e)}/${i}/authTokens:generate`}(e,r),s=function(e,{refreshToken:i}){let r=getHeaders(e);return r.append("Authorization",`${j} ${i}`),r}(e,r),l=i.getImmediate({optional:!0});if(l){let e=await l.getHeartbeatsHeader();e&&s.append("x-firebase-client",e)}let h={installation:{sdkVersion:k,appId:e.appId}},f={method:"POST",headers:s,body:JSON.stringify(h)},d=await retryIfServerError(()=>fetch(o,f));if(d.ok){let e=await d.json(),i=extractAuthTokenInfoFromResponse(e);return i}throw await getErrorFromResponse("Generate Auth Token",d)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function refreshAuthToken(e,i=!1){let r;let o=await update(e.appConfig,o=>{var s;if(!isEntryRegistered(o))throw M.create("not-registered");let l=o.authToken;if(!i&&2===(s=l).requestStatus&&!function(e){let i=Date.now();return i<e.creationTime||e.creationTime+e.expiresIn<i+36e5}(s))return o;if(1===l.requestStatus)return r=waitUntilAuthTokenRequest(e,i),o;{if(!navigator.onLine)throw M.create("app-offline");let i=function(e){let i={requestStatus:1,requestTime:Date.now()};return{...e,authToken:i}}(o);return r=fetchAuthTokenFromServer(e,i),i}}),s=r?await r:o.authToken;return s}async function waitUntilAuthTokenRequest(e,i){let r=await updateAuthTokenRequest(e.appConfig);for(;1===r.authToken.requestStatus;)await sleep(100),r=await updateAuthTokenRequest(e.appConfig);let o=r.authToken;return 0===o.requestStatus?refreshAuthToken(e,i):o}function updateAuthTokenRequest(e){return update(e,e=>{if(!isEntryRegistered(e))throw M.create("not-registered");let i=e.authToken;return 1===i.requestStatus&&i.requestTime+1e4<Date.now()?{...e,authToken:{requestStatus:0}}:e})}async function fetchAuthTokenFromServer(e,i){try{let r=await generateAuthTokenRequest(e,i),o={...i,authToken:r};return await set(e.appConfig,o),r}catch(r){if(isServerError(r)&&(401===r.customData.serverCode||404===r.customData.serverCode))await remove(e.appConfig);else{let r={...i,authToken:{requestStatus:0}};await set(e.appConfig,r)}throw r}}function isEntryRegistered(e){return void 0!==e&&2===e.registrationStatus}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function getId(e){let{installationEntry:i,registrationPromise:r}=await getInstallationEntry(e);return r?r.catch(console.error):refreshAuthToken(e).catch(console.error),i.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function getToken(e,i=!1){await completeInstallationRegistration(e);let r=await refreshAuthToken(e,i);return r.token}async function completeInstallationRegistration(e){let{registrationPromise:i}=await getInstallationEntry(e);i&&await i}function getMissingValueError(e){return M.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ei="installations";(0,f.Xd)(new d.wA(ei,e=>{let i=e.getProvider("app").getImmediate(),r=/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if(!e||!e.options)throw getMissingValueError("App Configuration");if(!e.name)throw getMissingValueError("App Name");for(let i of["projectId","apiKey","appId"])if(!e.options[i])throw getMissingValueError(i);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(i),o=(0,f.qX)(i,"heartbeat");return{app:i,appConfig:r,heartbeatServiceProvider:o,_delete:()=>Promise.resolve()}},"PUBLIC")),(0,f.Xd)(new d.wA("installations-internal",e=>{let i=e.getProvider("app").getImmediate(),r=(0,f.qX)(i,ei).getImmediate();return{getId:()=>getId(r),getToken:e=>getToken(r,e)}},"PRIVATE")),(0,f.KN)(_,A),(0,f.KN)(_,A,"esm2020");let er="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",eo="google.c.a.c_id";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function arrayToBase64(e){let i=new Uint8Array(e),r=btoa(String.fromCharCode(...i));return r.replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}(o=l||(l={}))[o.DATA_MESSAGE=1]="DATA_MESSAGE",o[o.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION",(s=h||(h={})).PUSH_RECEIVED="push-received",s.NOTIFICATION_CLICKED="notification-clicked";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let es="fcm_token_details_db",ea="fcm_token_object_Store";async function migrateOldDatabase(e){if("databases"in indexedDB){let e=await indexedDB.databases(),i=e.map(e=>e.name);if(!i.includes(es))return null}let i=null,r=await (0,b.X3)(es,5,{upgrade:async(r,o,s,l)=>{if(o<2||!r.objectStoreNames.contains(ea))return;let h=l.objectStore(ea),f=await h.index("fcmSenderId").get(e);if(await h.clear(),f){if(2===o){if(!f.auth||!f.p256dh||!f.endpoint)return;i={token:f.fcmToken,createTime:f.createTime??Date.now(),subscriptionOptions:{auth:f.auth,p256dh:f.p256dh,endpoint:f.endpoint,swScope:f.swScope,vapidKey:"string"==typeof f.vapidKey?f.vapidKey:arrayToBase64(f.vapidKey)}}}else 3===o?i={token:f.fcmToken,createTime:f.createTime,subscriptionOptions:{auth:arrayToBase64(f.auth),p256dh:arrayToBase64(f.p256dh),endpoint:f.endpoint,swScope:f.swScope,vapidKey:arrayToBase64(f.vapidKey)}}:4===o&&(i={token:f.fcmToken,createTime:f.createTime,subscriptionOptions:{auth:arrayToBase64(f.auth),p256dh:arrayToBase64(f.p256dh),endpoint:f.endpoint,swScope:f.swScope,vapidKey:arrayToBase64(f.vapidKey)}})}}});return r.close(),await (0,b.Lj)(es),await (0,b.Lj)("fcm_vapid_details_db"),await (0,b.Lj)("undefined"),!function(e){if(!e||!e.subscriptionOptions)return!1;let{subscriptionOptions:i}=e;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof i.auth&&i.auth.length>0&&"string"==typeof i.p256dh&&i.p256dh.length>0&&"string"==typeof i.endpoint&&i.endpoint.length>0&&"string"==typeof i.swScope&&i.swScope.length>0&&"string"==typeof i.vapidKey&&i.vapidKey.length>0}(i)?null:i}let el="firebase-messaging-store",eh=null;function index_esm_getDbPromise(){return eh||(eh=(0,b.X3)("firebase-messaging-database",1,{upgrade:(e,i)=>{0===i&&e.createObjectStore(el)}})),eh}async function dbGet(e){let i=function({appConfig:e}){return e.appId}(e),r=await index_esm_getDbPromise(),o=await r.transaction(el).objectStore(el).get(i);if(o)return o;{let i=await migrateOldDatabase(e.appConfig.senderId);if(i)return await dbSet(e,i),i}}async function dbSet(e,i){let r=function({appConfig:e}){return e.appId}(e),o=await index_esm_getDbPromise(),s=o.transaction(el,"readwrite");return await s.objectStore(el).put(i,r),await s.done,i}let eu=new g.LL("messaging","Messaging",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."});/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function requestGetToken(e,i){let r;let o=await index_esm_getHeaders(e),s=getBody(i),l={method:"POST",headers:o,body:JSON.stringify(s)};try{let i=await fetch(getEndpoint(e.appConfig),l);r=await i.json()}catch(e){throw eu.create("token-subscribe-failed",{errorInfo:e?.toString()})}if(r.error){let e=r.error.message;throw eu.create("token-subscribe-failed",{errorInfo:e})}if(!r.token)throw eu.create("token-subscribe-no-token");return r.token}async function requestUpdateToken(e,i){let r;let o=await index_esm_getHeaders(e),s=getBody(i.subscriptionOptions),l={method:"PATCH",headers:o,body:JSON.stringify(s)};try{let o=await fetch(`${getEndpoint(e.appConfig)}/${i.token}`,l);r=await o.json()}catch(e){throw eu.create("token-update-failed",{errorInfo:e?.toString()})}if(r.error){let e=r.error.message;throw eu.create("token-update-failed",{errorInfo:e})}if(!r.token)throw eu.create("token-update-no-token");return r.token}async function requestDeleteToken(e,i){let r=await index_esm_getHeaders(e);try{let o=await fetch(`${getEndpoint(e.appConfig)}/${i}`,{method:"DELETE",headers:r}),s=await o.json();if(s.error){let e=s.error.message;throw eu.create("token-unsubscribe-failed",{errorInfo:e})}}catch(e){throw eu.create("token-unsubscribe-failed",{errorInfo:e?.toString()})}}function getEndpoint({projectId:e}){return`https://fcmregistrations.googleapis.com/v1/projects/${e}/registrations`}async function index_esm_getHeaders({appConfig:e,installations:i}){let r=await i.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${r}`})}function getBody({p256dh:e,auth:i,endpoint:r,vapidKey:o}){let s={web:{endpoint:r,auth:i,p256dh:e}};return o!==er&&(s.web.applicationPubKey=o),s}async function getTokenInternal(e){let i=await getPushSubscription(e.swRegistration,e.vapidKey),r={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:i.endpoint,auth:arrayToBase64(i.getKey("auth")),p256dh:arrayToBase64(i.getKey("p256dh"))},o=await dbGet(e.firebaseDependencies);if(!o)return getNewToken(e.firebaseDependencies,r);if(function(e,i){let r=i.vapidKey===e.vapidKey,o=i.endpoint===e.endpoint,s=i.auth===e.auth,l=i.p256dh===e.p256dh;return r&&o&&s&&l}(o.subscriptionOptions,r))return Date.now()>=o.createTime+6048e5?updateToken(e,{token:o.token,createTime:Date.now(),subscriptionOptions:r}):o.token;try{await requestDeleteToken(e.firebaseDependencies,o.token)}catch(e){console.warn(e)}return getNewToken(e.firebaseDependencies,r)}async function updateToken(e,i){try{let r=await requestUpdateToken(e.firebaseDependencies,i),o={...i,token:r,createTime:Date.now()};return await dbSet(e.firebaseDependencies,o),r}catch(e){throw e}}async function getNewToken(e,i){let r=await requestGetToken(e,i),o={token:r,createTime:Date.now(),subscriptionOptions:i};return await dbSet(e,o),o.token}async function getPushSubscription(e,i){let r=await e.pushManager.getSubscription();return r||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:function(e){let i="=".repeat((4-e.length%4)%4),r=(e+i).replace(/\-/g,"+").replace(/_/g,"/"),o=atob(r),s=new Uint8Array(o.length);for(let e=0;e<o.length;++e)s[e]=o.charCodeAt(e);return s}(i)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function externalizePayload(e){let i={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function(e,i){if(!i.notification)return;e.notification={};let r=i.notification.title;r&&(e.notification.title=r);let o=i.notification.body;o&&(e.notification.body=o);let s=i.notification.image;s&&(e.notification.image=s);let l=i.notification.icon;l&&(e.notification.icon=l)}(i,e),e.data&&(i.data=e.data),function(e,i){if(!i.fcmOptions&&!i.notification?.click_action)return;e.fcmOptions={};let r=i.fcmOptions?.link??i.notification?.click_action;r&&(e.fcmOptions.link=r);let o=i.fcmOptions?.analytics_label;o&&(e.fcmOptions.analyticsLabel=o)}(i,e),i}function index_esm_getMissingValueError(e){return eu.create("missing-app-config-values",{valueName:e})}!/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,i){let r=[];for(let o=0;o<e.length;o++)r.push(e.charAt(o)),o<i.length&&r.push(i.charAt(o));r.join("")}("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let MessagingService=class MessagingService{constructor(e,i,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;let o=/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if(!e||!e.options)throw index_esm_getMissingValueError("App Configuration Object");if(!e.name)throw index_esm_getMissingValueError("App Name");let{options:i}=e;for(let e of["projectId","apiKey","appId","messagingSenderId"])if(!i[e])throw index_esm_getMissingValueError(e);return{appName:e.name,projectId:i.projectId,apiKey:i.apiKey,appId:i.appId,senderId:i.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:o,installations:i,analyticsProvider:r}}_delete(){return Promise.resolve()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function registerDefaultSw(e){try{e.swRegistration=await navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"}),e.swRegistration.update().catch(()=>{}),await waitForRegistrationActive(e.swRegistration)}catch(e){throw eu.create("failed-service-worker-registration",{browserErrorMessage:e?.message})}}async function waitForRegistrationActive(e){return new Promise((i,r)=>{let o=setTimeout(()=>r(Error("Service worker not registered after 10000 ms")),1e4),s=e.installing||e.waiting;e.active?(clearTimeout(o),i()):s?s.onstatechange=e=>{e.target?.state==="activated"&&(s.onstatechange=null,clearTimeout(o),i())}:(clearTimeout(o),r(Error("No incoming service worker found.")))})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function updateSwReg(e,i){if(i||e.swRegistration||await registerDefaultSw(e),i||!e.swRegistration){if(!(i instanceof ServiceWorkerRegistration))throw eu.create("invalid-sw-registration");e.swRegistration=i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function updateVapidKey(e,i){i?e.vapidKey=i:e.vapidKey||(e.vapidKey=er)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function getToken$1(e,i){if(!navigator)throw eu.create("only-available-in-window");if("default"===Notification.permission&&await Notification.requestPermission(),"granted"!==Notification.permission)throw eu.create("permission-blocked");return await updateVapidKey(e,i?.vapidKey),await updateSwReg(e,i?.serviceWorkerRegistration),getTokenInternal(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function logToScion(e,i,r){let o=function(e){switch(e){case h.NOTIFICATION_CLICKED:return"notification_open";case h.PUSH_RECEIVED:return"notification_foreground";default:throw Error()}}(i),s=await e.firebaseDependencies.analyticsProvider.get();s.logEvent(o,{message_id:r[eo],message_name:r["google.c.a.c_l"],message_time:r["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function messageEventListener(e,i){let r=i.data;if(!r.isFirebaseMessaging)return;e.onMessageHandler&&r.messageType===h.PUSH_RECEIVED&&("function"==typeof e.onMessageHandler?e.onMessageHandler(externalizePayload(r)):e.onMessageHandler.next(externalizePayload(r)));let o=r.data;"object"==typeof o&&o&&eo in o&&"1"===o["google.c.a.e"]&&await logToScion(e,r.messageType,o)}let ef="@firebase/messaging",ep="0.12.23";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function isWindowSupported(){try{await (0,g.eu)()}catch(e){return!1}return"undefined"!=typeof window&&(0,g.hl)()&&(0,g.zI)()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function getMessagingInWindow(e=(0,f.Mq)()){return isWindowSupported().then(e=>{if(!e)throw eu.create("unsupported-browser")},e=>{throw eu.create("indexed-db-unsupported")}),(0,f.qX)((0,g.m9)(e),"messaging").getImmediate()}async function index_esm_getToken(e,i){return getToken$1(e=(0,g.m9)(e),i)}function onMessage(e,i){return(/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,i){if(!navigator)throw eu.create("only-available-in-window");return e.onMessageHandler=i,()=>{e.onMessageHandler=null}}(e=(0,g.m9)(e),i))}(0,f.Xd)(new d.wA("messaging",e=>{let i=new MessagingService(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",e=>messageEventListener(i,e)),i},"PUBLIC")),(0,f.Xd)(new d.wA("messaging-internal",e=>{let i=e.getProvider("messaging").getImmediate();return{getToken:e=>getToken$1(i,e)}},"PRIVATE")),(0,f.KN)(ef,ep),(0,f.KN)(ef,ep,"esm2020")},6531:function(e,i,r){var o;let s,l;r.d(i,{Lj:function(){return deleteDB},X3:function(){return openDB}});let instanceOfAny=(e,i)=>i.some(i=>e instanceof i),h=new WeakMap,f=new WeakMap,d=new WeakMap,g=new WeakMap,b=new WeakMap,_={get(e,i,r){if(e instanceof IDBTransaction){if("done"===i)return f.get(e);if("objectStoreNames"===i)return e.objectStoreNames||d.get(e);if("store"===i)return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return wrap(e[i])},set:(e,i,r)=>(e[i]=r,!0),has:(e,i)=>e instanceof IDBTransaction&&("done"===i||"store"===i)||i in e};function wrap(e){var i;if(e instanceof IDBRequest)return function(e){let i=new Promise((i,r)=>{let unlisten=()=>{e.removeEventListener("success",success),e.removeEventListener("error",error)},success=()=>{i(wrap(e.result)),unlisten()},error=()=>{r(e.error),unlisten()};e.addEventListener("success",success),e.addEventListener("error",error)});return i.then(i=>{i instanceof IDBCursor&&h.set(i,e)}).catch(()=>{}),b.set(i,e),i}(e);if(g.has(e))return g.get(e);let r="function"==typeof(i=e)?i!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(l||(l=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(i)?function(...e){return i.apply(unwrap(this),e),wrap(h.get(this))}:function(...e){return wrap(i.apply(unwrap(this),e))}:function(e,...r){let o=i.call(unwrap(this),e,...r);return d.set(o,e.sort?e.sort():[e]),wrap(o)}:(i instanceof IDBTransaction&&function(e){if(f.has(e))return;let i=new Promise((i,r)=>{let unlisten=()=>{e.removeEventListener("complete",complete),e.removeEventListener("error",error),e.removeEventListener("abort",error)},complete=()=>{i(),unlisten()},error=()=>{r(e.error||new DOMException("AbortError","AbortError")),unlisten()};e.addEventListener("complete",complete),e.addEventListener("error",error),e.addEventListener("abort",error)});f.set(e,i)}(i),instanceOfAny(i,s||(s=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])))?new Proxy(i,_):i;return r!==e&&(g.set(e,r),b.set(r,e)),r}let unwrap=e=>b.get(e);function openDB(e,i,{blocked:r,upgrade:o,blocking:s,terminated:l}={}){let h=indexedDB.open(e,i),f=wrap(h);return o&&h.addEventListener("upgradeneeded",e=>{o(wrap(h.result),e.oldVersion,e.newVersion,wrap(h.transaction),e)}),r&&h.addEventListener("blocked",e=>r(e.oldVersion,e.newVersion,e)),f.then(e=>{l&&e.addEventListener("close",()=>l()),s&&e.addEventListener("versionchange",e=>s(e.oldVersion,e.newVersion,e))}).catch(()=>{}),f}function deleteDB(e,{blocked:i}={}){let r=indexedDB.deleteDatabase(e);return i&&r.addEventListener("blocked",e=>i(e.oldVersion,e)),wrap(r).then(()=>void 0)}let A=["get","getKey","getAll","getAllKeys","count"],k=["put","add","delete","clear"],j=new Map;function getMethod(e,i){if(!(e instanceof IDBDatabase&&!(i in e)&&"string"==typeof i))return;if(j.get(i))return j.get(i);let r=i.replace(/FromIndex$/,""),o=i!==r,s=k.includes(r);if(!(r in(o?IDBIndex:IDBObjectStore).prototype)||!(s||A.includes(r)))return;let method=async function(e,...i){let l=this.transaction(e,s?"readwrite":"readonly"),h=l.store;return o&&(h=h.index(i.shift())),(await Promise.all([h[r](...i),s&&l.done]))[0]};return j.set(i,method),method}_={...o=_,get:(e,i,r)=>getMethod(e,i)||o.get(e,i,r),has:(e,i)=>!!getMethod(e,i)||o.has(e,i)}}}]);