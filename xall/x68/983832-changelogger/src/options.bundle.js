(()=>{"use strict";var e={708:(e,t,n)=>{n.r(t)},416:(e,t,n)=>{t.browser=n(567)},567:e=>{e.exports=browser}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e=n(416);class t{constructor(e){var t,n,o,a;e=null!=e?e:{},this.badge=null===(t=e.badge)||void 0===t||t,this.notification=null===(n=e.notification)||void 0===n||n,this.max=null!==(o=e.max)&&void 0!==o?o:10,this.ignore_no_changelogs=null!==(a=e.ignore_no_changelogs)&&void 0!==a&&a}}function o(e){e.matches?document.documentElement.dataset.theme="dark":document.documentElement.dataset.theme="light"}n(708);const a=document.getElementById("badge"),r=document.getElementById("notification"),i=document.getElementById("max"),s=document.getElementById("ignore_no_changelogs"),l=window.matchMedia("(prefers-color-scheme: dark)"),c=document.getElementById("clearChangelogsButton");o(l),document.addEventListener("DOMContentLoaded",(async function(){const n=new t((await e.browser.storage.local.get()).options);a.value=n.badge.toString(),r.value=n.notification.toString(),i.value=n.max.toString(),s.value=n.ignore_no_changelogs.toString()})),document.addEventListener("change",(function(){const t={badge:JSON.parse(a.value),notification:JSON.parse(r.value),max:parseInt(i.value),ignore_no_changelogs:JSON.parse(s.value)};e.browser.storage.local.set({options:t})})),l.addEventListener("change",o),c.addEventListener("click",(function(){e.browser.storage.local.set({changelogs:[]})}))})()})();
//# sourceMappingURL=options.bundle.js.map