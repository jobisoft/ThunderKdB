(()=>{"use strict";var e={209:(e,t,n)=>{n.r(t)},416:(e,t,n)=>{t.browser=n(567)},567:e=>{e.exports=browser}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e=n(416);function t(e){e.matches?document.documentElement.dataset.theme="dark":document.documentElement.dataset.theme="light"}n(209);const o=document.getElementById("settings"),r=document.getElementById("push"),s=window.matchMedia("(prefers-color-scheme: dark)");document.addEventListener("DOMContentLoaded",(async function(){var n;e.browser.browserAction.setBadgeText({text:""});const o=await e.browser.storage.local.get();t(s);let a=[];Array.isArray(o.changelogs)&&(a=o.changelogs),0===a.length&&a.push({id:"none",version:"0.0.0",icon:e.browser.runtime.getURL("icons/icon-96.png"),name:e.browser.i18n.getMessage("noChangelogsYetTitle"),release_notes:e.browser.i18n.getMessage("noChangelogsYet"),url:"https://addons.thunderbird.net"});const d=document.createDocumentFragment();for(const e of a){const t=document.createElement("div");t.className="item",d.appendChild(t);const o=document.createElement("span");o.className="name",t.appendChild(o);const r=document.createElement("img");r.src=e.icon,o.appendChild(r);const s=document.createElement("a");s.href=e.url,s.className="link",s.innerText=e.name,s.target="_blank",o.appendChild(s);const a=document.createElement("span");a.className="version",a.innerText=`- ${e.version}`,o.appendChild(a);const c=document.createElement("blockquote");c.className="changelog";const i=(new DOMParser).parseFromString(e.release_notes,"text/html");for(const e of[...i.querySelectorAll("a")]){const t=decodeURIComponent(e.href);t.startsWith("https://outgoing.prod.mozaws.net")&&(e.href=(null!==(n=t.match(/https?:\/\/outgoing\.prod\.mozaws\.net\/.*\/(https?:\/\/.*)/))&&void 0!==n?n:[])[1])}for(;i.body.firstChild;){const e=i.body.removeChild(i.body.firstChild);c.appendChild(e)}t.appendChild(c)}r.appendChild(d)})),s.addEventListener("change",t),o.addEventListener("click",(()=>e.browser.runtime.openOptionsPage()))})()})();
//# sourceMappingURL=changelog.bundle.js.map