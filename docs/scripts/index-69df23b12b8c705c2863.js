(self.webpackChunkgithub_site=self.webpackChunkgithub_site||[]).push([[826],{37:(e,t,n)=>{"use strict";n(386);var r=n(610),o=n(917);function a(){return"u".concat((0,o.x0)())}var l=n(325),c=n.n(l);n(433),n(335),n(980),n(251),n(759);var i=function e(t,n){(0,r.Z)(this,e),this.name=t,this.callback=n,this.selector="section.site-section--".concat(t),this.id=a()},u=[new i("previews",(function(e){var t=e.querySelector(".form-examples");null==t||t.addEventListener("submit",(function(e){e.preventDefault()}))})),new i("textarea",(function(e){var t=e.querySelector("#code-area"),n=(e.querySelector("#highlighting"),e.querySelector("#highlighting-content"));t.addEventListener("keyup",(function(){n.innerText=t.value,c().highlightElement(n)}))})),new i("tables",(function(e){var t,n=e.querySelector("#big-table"),r=(n.querySelector("thead"),n.querySelector("tbody"),n.querySelector("tbfooter"),e.querySelector(".cell-editor")),o=r.querySelector(".cell-editor__input");n.addEventListener("click",(function(e){e.stopPropagation();var n,a=e.target;a.classList.contains("table__cell")&&a!==t&&(t&&t.classList.remove("table__cell--selected"),a.classList.add("table__cell--selected"),t=a,(n=a).classList.toggle("table__cell--editing",!0),o.value=n.textContent,n.appendChild(r),o.focus())})),r.addEventListener("submit",(function(e){e.preventDefault(),t.textContent=o.value,t.classList.remove("table__cell--editing"),o.value=""}))}))],s=new Map;function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}document.querySelector(".gheader");var d,y=document.querySelector("main"),v=document.querySelector(".global-footer");!function(e,t){var n,r=[],o=function(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,l=!0,c=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return l=e.done,e},e:function(e){c=!0,a=e},f:function(){try{l||null==n.return||n.return()}finally{if(c)throw a}}}}(t);try{for(o.s();!(n=o.n()).done;){var a=n.value,l=a.selector,c=a.callback,i=e.querySelector(l);i&&(c(i),r.push(i))}}catch(e){o.e(e)}finally{o.f()}}(y,u),(d=v.querySelector(".component-container")).id=a(),d.querySelectorAll("#".concat(d.id," > *")).forEach((function(e){s.set(e.className,e)}))},386:(e,t,n)=>{"use strict";e.exports=n.p+"assets/images/favicon-32x32-736eae1ff09acfe04c50.png"}},e=>{"use strict";e.O(0,[382],(()=>(37,e(e.s=37)))),e.O()}]);
//# sourceMappingURL=index-69df23b12b8c705c2863.js.map