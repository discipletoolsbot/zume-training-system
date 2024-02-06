var et=Object.defineProperty;var tt=(s,e,t)=>e in s?et(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var E=(s,e,t)=>(tt(s,typeof e!="symbol"?e+"":e,t),t),se=(s,e,t)=>{if(!e.has(s))throw TypeError("Cannot "+t)};var C=(s,e,t)=>(se(s,e,"read from private field"),t?t.call(s):e.get(s)),M=(s,e,t)=>{if(e.has(s))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(s):e.set(s,t)},ie=(s,e,t,i)=>(se(s,e,"write to private field"),i?i.call(s,t):e.set(s,t),t);var T=(s,e,t)=>(se(s,e,"access private method"),t);import{createApp as st}from"https://unpkg.com/petite-vue?module";const ve=document.querySelector(".nav-toggle"),it=document.querySelector("#nav");ve&&ve.addEventListener("click",s=>{it.classList.toggle("nav--visible")});const nt=({title:s,url:e,copyFeedback:t,shareFeedback:i})=>({title:s,url:e,webShareSupported:navigator.share,clipboardSupported:navigator.clipboard,shareFeedback:"",copyFeedback:"",noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported},share(){navigator.share({title:s,url:e,text:s}).then(()=>{this.shareFeedback=i,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(n=>console.error("Error sharing",n))},copyLink(){navigator.clipboard.writeText(e).then(()=>{this.copyFeedback=t,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(n=>console.error(n))}});window.zumeInitShareLinks=()=>{st({share:nt}).mount()};var de;let at=(de=class{static save(e,t){localStorage.setItem(this.createKey(e),JSON.stringify(t))}static load(e){const t=localStorage.getItem(this.createKey(e));try{return JSON.parse(t)}catch{return t}}static createKey(e){return this.prefix+e}},E(de,"prefix","Z5_"),de);window.ZumeStorage=at;var k,Y,Ie,X,Oe,ee,je,V,ue;class Te{constructor(e){M(this,Y);M(this,X);M(this,ee);M(this,V);E(this,"WIZARD_STATE_NAME","zume_wizard_state");E(this,"STALE_LIFESPAN",10*60*1e3);E(this,"MAX_LIFESPAN",60*60*1e3);M(this,k,void 0);this.moduleName=e,ie(this,k,T(this,Y,Ie).call(this))}empty(){return Object.keys(C(this,k).data).length===0}isDataStale(){return T(this,V,ue).call(this,C(this,k),this.STALE_LIFESPAN)}get(e){return C(this,k).data[e]}getAll(){return C(this,k).data}add(e,t){C(this,k).data[e]=t,T(this,ee,je).call(this),localStorage.setItem(this.WIZARD_STATE_NAME,JSON.stringify(C(this,k)))}clear(){ie(this,k,null),localStorage.removeItem(this.WIZARD_STATE_NAME)}}k=new WeakMap,Y=new WeakSet,Ie=function(){const e=T(this,X,Oe).call(this);return e&&!T(this,V,ue).call(this,e,this.MAX_LIFESPAN)?e:{module:this.moduleName,data:{},timestamp:Date.now()}},X=new WeakSet,Oe=function(){return JSON.parse(localStorage.getItem(this.WIZARD_STATE_NAME))},ee=new WeakSet,je=function(){C(this,k).timestamp=Date.now()},V=new WeakSet,ue=function(e,t){return Date.now()-e.timestamp>t};const y={gettingStarted:"getting-started",makeAGroup:"make-a-group",getACoach:"get-a-coach",joinAPlan:"join-a-training",connectWithFriend:"connect-with-friend",joinFriendsPlan:"join-friends-training",checkin:"checkin"},$={completeProfile:"completeProfile",makePlan:"makePlan",inviteFriends:"inviteFriends",getACoach:"getACoach",joinTraining:"joinTraining",connectFriend:"connectFriend",joinFriendsTraining:"joinFriendsTraining",checkin:"checkin",planDecision:"planDecision"},rt={howManySessions:"how-many-sessions",whatTimeOfDay:"what-time-of-day",howOften:"how-often",startDate:"what-start-date"},l={updateName:"update-your-name",updateLocation:"update-your-location",updatePhone:"update-your-phone",inviteFriends:"invite-friends",contactPreferences:"contact-preferences",languagePreferences:"preferred-language",howCanWeServe:"how-can-we-serve",connectingToCoach:"connecting-to-coach",joinTraining:"join-training",connectToFriend:"connect-friend",joinFriendsPlan:"join-friends-training",checkinSubmit:"checkin-submit",...rt},ot={[l.updateName]:{field:"name",testExistance:(s,e)=>e.has_set_name},[l.updateLocation]:{field:"location",testExistance:s=>!(s.source&&s.source==="ip")},[l.updatePhone]:{field:"phone",testExistance:s=>!!s}};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const J=window,me=J.ShadowRoot&&(J.ShadyCSS===void 0||J.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ge=Symbol(),$e=new WeakMap;let Le=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==ge)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(me&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=$e.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&$e.set(t,e))}return e}toString(){return this.cssText}};const lt=s=>new Le(typeof s=="string"?s:s+"",void 0,ge),ct=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((i,n,o)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+s[o+1],s[0]);return new Le(t,s,ge)},ht=(s,e)=>{me?s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),n=J.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=t.cssText,s.appendChild(i)})},_e=me?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return lt(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ne;const G=window,ye=G.trustedTypes,dt=ye?ye.emptyScript:"",ke=G.reactiveElementPolyfillSupport,pe={toAttribute(s,e){switch(e){case Boolean:s=s?dt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},Ne=(s,e)=>e!==s&&(e==e||s==s),ae={attribute:!0,type:String,converter:pe,reflect:!1,hasChanged:Ne};let O=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const n=this._$Ep(i,t);n!==void 0&&(this._$Ev.set(n,i),e.push(n))}),e}static createProperty(e,t=ae){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,n=this.getPropertyDescriptor(e,i,t);n!==void 0&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(n){const o=this[e];this[t]=n,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||ae}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const n of i)this.createProperty(n,t[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const n of i)t.unshift(_e(n))}else e!==void 0&&t.push(_e(e));return t}static _$Ep(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return ht(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=ae){var n;const o=this.constructor._$Ep(e,i);if(o!==void 0&&i.reflect===!0){const a=(((n=i.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?i.converter:pe).toAttribute(t,i.type);this._$El=e,a==null?this.removeAttribute(o):this.setAttribute(o,a),this._$El=null}}_$AK(e,t){var i;const n=this.constructor,o=n._$Ev.get(e);if(o!==void 0&&this._$El!==o){const a=n.getPropertyOptions(o),d=typeof a.converter=="function"?{fromAttribute:a.converter}:((i=a.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?a.converter:pe;this._$El=o,this[o]=d.fromAttribute(t,a.type),this._$El=null}}requestUpdate(e,t,i){let n=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Ne)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((n,o)=>this[o]=n),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach(n=>{var o;return(o=n.hostUpdate)===null||o===void 0?void 0:o.call(n)}),this.update(i)):this._$Ek()}catch(n){throw t=!1,this._$Ek(),n}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(i=>{var n;return(n=i.hostUpdated)===null||n===void 0?void 0:n.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$EO(i,this[i],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};O.finalized=!0,O.elementProperties=new Map,O.elementStyles=[],O.shadowRootOptions={mode:"open"},ke==null||ke({ReactiveElement:O}),((ne=G.reactiveElementVersions)!==null&&ne!==void 0?ne:G.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var re;const Q=window,L=Q.trustedTypes,we=L?L.createPolicy("lit-html",{createHTML:s=>s}):void 0,K="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,be="?"+x,ut=`<${be}>`,N=document,q=()=>N.createComment(""),B=s=>s===null||typeof s!="object"&&typeof s!="function",Fe=Array.isArray,He=s=>Fe(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",oe=`[ 	
\f\r]`,H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Se=/-->/g,xe=/>/g,D=RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ee=/'/g,Ce=/"/g,Ue=/^(?:script|style|textarea|title)$/i,pt=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),r=pt(1),w=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),Ae=new WeakMap,j=N.createTreeWalker(N,129,null,!1),qe=(s,e)=>{const t=s.length-1,i=[];let n,o=e===2?"<svg>":"",a=H;for(let h=0;h<t;h++){const c=s[h];let f,m,p=-1,g=0;for(;g<c.length&&(a.lastIndex=g,m=a.exec(c),m!==null);)g=a.lastIndex,a===H?m[1]==="!--"?a=Se:m[1]!==void 0?a=xe:m[2]!==void 0?(Ue.test(m[2])&&(n=RegExp("</"+m[2],"g")),a=D):m[3]!==void 0&&(a=D):a===D?m[0]===">"?(a=n??H,p=-1):m[1]===void 0?p=-2:(p=a.lastIndex-m[2].length,f=m[1],a=m[3]===void 0?D:m[3]==='"'?Ce:Ee):a===Ce||a===Ee?a=D:a===Se||a===xe?a=H:(a=D,n=void 0);const b=a===D&&s[h+1].startsWith("/>")?" ":"";o+=a===H?c+ut:p>=0?(i.push(f),c.slice(0,p)+K+c.slice(p)+x+b):c+x+(p===-2?(i.push(void 0),h):b)}const d=o+(s[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return[we!==void 0?we.createHTML(d):d,i]};class W{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let o=0,a=0;const d=e.length-1,h=this.parts,[c,f]=qe(e,t);if(this.el=W.createElement(c,i),j.currentNode=this.el.content,t===2){const m=this.el.content,p=m.firstChild;p.remove(),m.append(...p.childNodes)}for(;(n=j.nextNode())!==null&&h.length<d;){if(n.nodeType===1){if(n.hasAttributes()){const m=[];for(const p of n.getAttributeNames())if(p.endsWith(K)||p.startsWith(x)){const g=f[a++];if(m.push(p),g!==void 0){const b=n.getAttribute(g.toLowerCase()+K).split(x),v=/([.?@])?(.*)/.exec(g);h.push({type:1,index:o,name:v[2],strings:b,ctor:v[1]==="."?We:v[1]==="?"?Ve:v[1]==="@"?Ze:Z})}else h.push({type:6,index:o})}for(const p of m)n.removeAttribute(p)}if(Ue.test(n.tagName)){const m=n.textContent.split(x),p=m.length-1;if(p>0){n.textContent=L?L.emptyScript:"";for(let g=0;g<p;g++)n.append(m[g],q()),j.nextNode(),h.push({type:2,index:++o});n.append(m[p],q())}}}else if(n.nodeType===8)if(n.data===be)h.push({type:2,index:o});else{let m=-1;for(;(m=n.data.indexOf(x,m+1))!==-1;)h.push({type:7,index:o}),m+=x.length-1}o++}}static createElement(e,t){const i=N.createElement("template");return i.innerHTML=e,i}}function R(s,e,t=s,i){var n,o,a,d;if(e===w)return e;let h=i!==void 0?(n=t._$Co)===null||n===void 0?void 0:n[i]:t._$Cl;const c=B(e)?void 0:e._$litDirective$;return(h==null?void 0:h.constructor)!==c&&((o=h==null?void 0:h._$AO)===null||o===void 0||o.call(h,!1),c===void 0?h=void 0:(h=new c(s),h._$AT(s,t,i)),i!==void 0?((a=(d=t)._$Co)!==null&&a!==void 0?a:d._$Co=[])[i]=h:t._$Cl=h),h!==void 0&&(e=R(s,h._$AS(s,e.values),h,i)),e}class Be{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:n}=this._$AD,o=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:N).importNode(i,!0);j.currentNode=o;let a=j.nextNode(),d=0,h=0,c=n[0];for(;c!==void 0;){if(d===c.index){let f;c.type===2?f=new F(a,a.nextSibling,this,e):c.type===1?f=new c.ctor(a,c.name,c.strings,this,e):c.type===6&&(f=new Je(a,this,e)),this._$AV.push(f),c=n[++h]}d!==(c==null?void 0:c.index)&&(a=j.nextNode(),d++)}return o}v(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class F{constructor(e,t,i,n){var o;this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cp=(o=n==null?void 0:n.isConnected)===null||o===void 0||o}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=R(this,e,t),B(e)?e===_||e==null||e===""?(this._$AH!==_&&this._$AR(),this._$AH=_):e!==this._$AH&&e!==w&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):He(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==_&&B(this._$AH)?this._$AA.nextSibling.data=e:this.$(N.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:n}=e,o=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=W.createElement(n.h,this.options)),n);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===o)this._$AH.v(i);else{const a=new Be(o,this),d=a.u(this.options);a.v(i),this.$(d),this._$AH=a}}_$AC(e){let t=Ae.get(e.strings);return t===void 0&&Ae.set(e.strings,t=new W(e)),t}T(e){Fe(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const o of e)n===t.length?t.push(i=new F(this.k(q()),this.k(q()),this,this.options)):i=t[n],i._$AI(o),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class Z{constructor(e,t,i,n,o){this.type=1,this._$AH=_,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=_}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,n){const o=this.strings;let a=!1;if(o===void 0)e=R(this,e,t,0),a=!B(e)||e!==this._$AH&&e!==w,a&&(this._$AH=e);else{const d=e;let h,c;for(e=o[0],h=0;h<o.length-1;h++)c=R(this,d[i+h],t,h),c===w&&(c=this._$AH[h]),a||(a=!B(c)||c!==this._$AH[h]),c===_?e=_:e!==_&&(e+=(c??"")+o[h+1]),this._$AH[h]=c}a&&!n&&this.j(e)}j(e){e===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class We extends Z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===_?void 0:e}}const mt=L?L.emptyScript:"";class Ve extends Z{constructor(){super(...arguments),this.type=4}j(e){e&&e!==_?this.element.setAttribute(this.name,mt):this.element.removeAttribute(this.name)}}class Ze extends Z{constructor(e,t,i,n,o){super(e,t,i,n,o),this.type=5}_$AI(e,t=this){var i;if((e=(i=R(this,e,t,0))!==null&&i!==void 0?i:_)===w)return;const n=this._$AH,o=e===_&&n!==_||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,a=e!==_&&(n===_||o);o&&this.element.removeEventListener(this.name,this,n),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class Je{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){R(this,e)}}const gt={O:K,P:x,A:be,C:1,M:qe,L:Be,D:He,R,I:F,V:Z,H:Ve,N:Ze,U:We,F:Je},De=Q.litHtmlPolyfillSupport;De==null||De(W,F),((re=Q.litHtmlVersions)!==null&&re!==void 0?re:Q.litHtmlVersions=[]).push("2.7.3");const bt=(s,e,t)=>{var i,n;const o=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let a=o._$litPart$;if(a===void 0){const d=(n=t==null?void 0:t.renderBefore)!==null&&n!==void 0?n:null;o._$litPart$=a=new F(e.insertBefore(q(),d),d,void 0,t??{})}return a._$AI(s),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var le,ce;let u=class extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=bt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return w}};u.finalized=!0,u._$litElement$=!0,(le=globalThis.litElementHydrateSupport)===null||le===void 0||le.call(globalThis,{LitElement:u});const Pe=globalThis.litElementPolyfillSupport;Pe==null||Pe({LitElement:u});((ce=globalThis.litElementVersions)!==null&&ce!==void 0?ce:globalThis.litElementVersions=[]).push("3.3.2");class ft extends u{static get properties(){return{type:{type:String},finishUrl:{type:String},user:{type:Object},step:{attribute:!1},steps:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.stepIndex=0,this.steps=[],this.modules={},this.step={},this.t=window.SHAREDFUNCTIONS.escapeObject(jsObject.translations),this._handleHistoryPopState=this._handleHistoryPopState.bind(this),window.addEventListener("popstate",this._handleHistoryPopState),this.stateManager=new Te}render(){if(!this.isWizardLoaded()){const e=this.getWizard(this.type);this.loadWizard(e),this._handleHistoryPopState(!0)}return this.steps.length===0?r`
            <div class="cover-page">
                <div class="stack center | text-center">
                    <h1 class="brand">${this.t.bad_wizard}</h1>
                    <p>${this.t.found_bad_wizard}</p>
                    <div class="center"><img class="w-50" src="https://imgs.search.brave.com/3f3MurVApxsoxJlmqxLF0fs5-WlAk6sEu9IV3sICb_k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWR2ZXJ0aXNlY2Fz/dC5jb20vcG9kY2Fz/dC9pbWFnZS9WZXJ5/QmFkV2l6YXJkcw.jpeg" alt="bad wizards" /></div>
                    <a class="btn" href="/">${this.t.home}</a>
                </div>
            </div>`:r`
        <div class="container center">

            <header class="py-1 px--4 w-100 position-relative">
                <div class="text-end" id="wizard-skip-button">${this.headerButtons()}</div>
                <div class="center">${this.stepCounter()}</div>
            </header>

            <article class="${this.containerSize()} center text-center">
                ${this.currentStep()}
            </article>

            <footer class="stack-1 ${this.containerSize()} | my-3">
                ${this.footer()}
            </footer>

        </div>
        `}containerSize(){const e=this.steps[this.stepIndex];return(e.slug=l.joinTraining)?"container-md":"container-xsm"}currentStep(){const e=this.steps[this.stepIndex];return e.component(e,this.t,"w-100")}headerButtons(){const{skippable:e}=this.step,t=this.stepIndex===this.steps.length-1;return r`
        <div class="cluster | inline s-3">
            ${e&&!t?r`<button @click=${this._onSkip} class="brand">${this.t.skip}</button>`:""}
            ${!e&&!t?r`
                    <button @click=${this._onQuit} class="d-flex">
                        <svg data-src="${jsObject.images_url+"/close-button-01.svg"}" class="h-2"></svg>
                    </button>
                    `:""}
        </div>
        `}finishButton(){return r`
            <div class="text-center d-flex justify-content-between">
                <div class="cluster ms-auto">
                    <button @click=${this._onFinish} ?disabled=${this.loading} class="btn ${this.loading?"disabled":""}">${this.t.finish}</button>
                </div>
            </div>
        `}stepCounter(){return r`
            <div class="cluster">
                ${this.steps.map((e,t)=>{const i=t<=this.stepIndex;return r`<div class="step-circle ${i?"complete":""}"></div>`})}
            </div>
        `}footer(){return this.stepIndex===this.steps.length-1?this.finishButton():""}_onBack(){if(this.stepIndex>0){const e=this.stepIndex-1;this._gotoStep(e)}}_onNext(){if(this.stepIndex+1<this.steps.length){const e=this.stepIndex+1;this._gotoStep(e)}else this._onFinish()}_onSkip(){const e=this.step.module;for(let t=this.stepIndex+1;t<this.steps.length;t++)if(this.steps[t].module!==e){this._gotoStep(t);return}this._onFinish()}_onQuit(){this._onFinish(!0)}_onFinish(e=!1){this.stateManager.clear(),this.finishUrl||(window.location.href="/");const t=new URL(this.finishUrl);e||(this.type===y.checkin?t.searchParams.set("completed",this.type):t.searchParams.set("completed",this.type)),window.location.href=t}_gotoStep(e,t=!0){if(this.steps.length!==0&&(this.stepIndex=this.clampSteps(e),this.step=this.steps[this.stepIndex],t)){const i=new URL(window.location.href),n=i.pathname.split("/"),o=n[n.length-1];let a="";Object.values(y).includes(o)?a=n.join("/")+"/"+this.step.slug+i.search:a=n.slice(0,-1).join("/")+"/"+this.step.slug+i.search,window.history.pushState(null,null,a)}}clampSteps(e){let t=e;return e>this.steps.length-1&&(t=this.steps.length-1),e<0&&(t=0),t}_handleHistoryPopState(e=!1){const i=new URL(window.location.href).pathname.split("/"),n=i[i.length-1];Object.values(y).includes(n)&&this._gotoStep(0,!1);let o="",a=0;this.steps.forEach(({slug:d,module:h},c)=>{if(o!==h&&(o=h,a=c),n===d){if(e===!0&&this.stateManager.isDataStale()){this._gotoStep(a);return}this._gotoStep(c,!1)}})}_handlePlanDecision(e){switch(e.target.dataset.decision){case"make":this.updateWizard(y.makeAGroup);break;case"join":this.updateWizard(y.joinAPlan);break;case"skip":default:this._onSkip();break}}_handleLoading(e){const{loading:t}=e.detail;this.loading=t}makeModule(e=[],t=!1){const i={steps:[],skippable:t};return e.forEach(n=>{Object.keys(I).includes(n)&&i.steps.push(I[n])}),i}getModule(e,t=!1){const i={[$.completeProfile]:{steps:[I[l.updateName],I[l.updateLocation]],skippable:t},[$.planDecision]:{steps:[{slug:"plan-decision",component:(o,a,d)=>r`
                            <div class=${`stack ${d}`}>
                                <h2>Join or start a training</h2>
                                <button class="btn" data-decision="make" @click=${this._handlePlanDecision}>Start a training</button>
                                <button class="btn" data-decision="join" @click=${this._handlePlanDecision}>Join a public training</button>
                                <button class="btn outline" data-decision="skip" @click=${this._handlePlanDecision}>Skip for now</button>
                            </div>
                        `}],skippable:t},[$.makePlan]:this.makeModule([l.howManySessions,l.whatTimeOfDay,l.howOften,l.startDate,l.inviteFriends],t),[$.inviteFriends]:{steps:[I[l.inviteFriends]],skippable:t},[$.joinTraining]:{steps:[I[l.joinTraining]]}};return Object.keys(i).includes(e)?i[e]:i[$.completeProfile]}isWizardLoaded(){return Object.keys(this.modules).length!==0}loadWizard(e,t=!1){this.modules=e,t===!1&&(this.steps=[],this.stepIndex=0),Object.entries(this.modules).forEach(([i,{steps:n,skippable:o}])=>{const a=zumeProfile.profile;n.forEach(({component:d,slug:h})=>{const c=ot[h];let f=null;if(c&&a){if(c.testExistance(a[c.field],a))return;f=a[c.field]}const m={component:d,slug:h,module:i,skippable:o,doneHandler:this._onNext,handleLoading:this._handleLoading};f!==null&&(m.value=f),this.steps.push(m)})}),t===!1&&this._gotoStep(0)}updateWizard(e){const t=this.getWizard(e);Object.keys(t).length!==0&&this.loadWizard(t)}isWizardTypeValid(e){return!!Object.values(y).includes(e)}getWizard(e){return this.isWizardTypeValid(e)?{[y.gettingStarted]:{[$.completeProfile]:this.makeModule([l.updateName,l.updateLocation],!0),[$.planDecision]:this.getModule($.planDecision)},[y.makeAGroup]:{[$.makePlan]:this.getModule($.makePlan)},[y.getACoach]:{[$.completeProfile]:this.makeModule([l.updateName,l.updateLocation,l.updatePhone]),[$.getACoach]:this.makeModule([l.contactPreferences,l.languagePreferences,l.howCanWeServe,l.connectingToCoach])},[y.joinAPlan]:{[$.completeProfile]:this.makeModule([l.updateName,l.updateLocation,l.updatePhone]),[$.joinTraining]:this.getModule($.joinTraining)},[y.connectWithFriend]:{[$.completeProfile]:this.makeModule([l.updateName,l.updateLocation],!0),[$.connectFriend]:this.makeModule([l.connectToFriend])},[y.joinFriendsPlan]:{[$.completeProfile]:this.makeModule([l.updateName,l.updateLocation],!0),[$.joinFriendsTraining]:this.makeModule([l.joinFriendsPlan])},[y.checkin]:{[$.checkin]:this.makeModule([l.checkinSubmit])}}[e]:{}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._handleHistoryPopState)}createRenderRoot(){return this}}window.customElements.define("zume-wizard",ft);const I={[l.updateName]:{slug:l.updateName,component:(s,e,t)=>r`
            <complete-profile
                class=${t}
                name=${s.slug}
                module=${s.module}
                ?skippable=${s.skippable}
                .t="${e.complete_profile}"
                variant=${l.updateName}
                @done-step=${s.doneHandler}
                value=${JSON.stringify(s.value)}
            ></complete-profile>
        `},[l.updateLocation]:{slug:l.updateLocation,component:(s,e,t)=>r`
            <complete-profile
                class=${t}
                name=${s.slug}
                module=${s.module}
                ?skippable=${s.skippable}
                .t="${e.complete_profile}"
                variant=${l.updateLocation}
                @done-step=${s.doneHandler}
                value=${JSON.stringify(s.value)}
            ></complete-profile>
        `},[l.updatePhone]:{slug:l.updatePhone,component:(s,e,t)=>r`
            <complete-profile
                class=${t}
                name=${s.slug}
                module=${s.module}
                ?skippable=${s.skippable}
                .t="${e.complete_profile}"
                variant=${l.updatePhone}
                @done-step=${s.doneHandler}
                value=${JSON.stringify(s.value)}
            ></complete-profile>
        `},[l.contactPreferences]:{slug:l.contactPreferences,component:(s,e,t)=>r`
            <request-coach
                class=${t}
                name=${s.slug}
                module=${s.module}
                ?skippable=${s.skippable}
                .t="${e.get_a_coach}"
                variant=${l.contactPreferences}
                @done-step=${s.doneHandler}
            ></request-coach>
        `},[l.languagePreferences]:{slug:l.languagePreferences,component:(s,e,t)=>r`
            <request-coach
                class=${t}
                name=${s.slug}
                module=${s.module}
                ?skippable=${s.skippable}
                .t="${e.get_a_coach}"
                variant=${l.languagePreferences}
                @done-step=${s.doneHandler}
            ></request-coach>
        `},[l.howCanWeServe]:{slug:l.howCanWeServe,component:(s,e,t)=>r`
            <request-coach
                class=${t}
                name=${s.slug}
                module=${s.module}
                ?skippable=${s.skippable}
                .t="${e.get_a_coach}"
                variant=${l.howCanWeServe}
                @done-step=${s.doneHandler}
            ></request-coach>
        `},[l.connectingToCoach]:{slug:l.connectingToCoach,component:(s,e,t)=>r`
            <request-coach
                class=${t}
                name=${s.slug}
                module=${s.module}
                ?skippable=${s.skippable}
                .t="${e.get_a_coach}"
                variant=${l.connectingToCoach}
                @done-step=${s.doneHandler}
                @loadingChange=${s.handleLoading}
            ></request-coach>
        `},[l.inviteFriends]:{slug:l.inviteFriends,component:(s,e,t)=>r`
            <invite-friends
                class=${t}
                name=${s.slug}
                module=${s.module}
                ?skippable=${s.skippable}
                .t=${e.share}
            ></invite-friends>
        `},[l.joinTraining]:{slug:l.joinTraining,component:(s,e,t)=>r`
            <join-training
                class=${t}
                name=${s.slug}
                module=${s.module}
                ?skippable=${s.skippable}
                .t=${e.join_training}
                @done-step=${s.doneHandler}
                @loadingChange=${s.handleLoading}
            ></join-training>
        `},[l.joinFriendsPlan]:{slug:l.joinFriendsPlan,component:(s,e,t)=>r`
            <join-friends-training
                class=${t}
                name=${s.slug}
                module=${s.module}
                ?skippable=${s.skippable}
                .t=${e.join_training}
                @done-step=${s.doneHandler}
                @loadingChange=${s.handleLoading}
            ></join-friends-training>
        `},[l.connectToFriend]:{slug:l.connectToFriend,component:(s,e,t)=>r`
            <connect-friend
                class=${t}
                name=${s.slug}
                module=${s.module}
                ?skippable=${s.skippable}
                .t=${e.connect_friend}
                @done-step=${s.doneHandler}
                @loadingChange=${s.handleLoading}
            ></connect-friend>
        `},[l.checkinSubmit]:{slug:l.checkinSubmit,component:(s,e,t)=>r`
            <session-checkin
                class=${t}
                name=${s.slug}
                module=${s.module}
                ?skippable=${s.skippable}
                .t=${e.checkin}
                @done-step=${s.doneHandler}
                @loadingChange=${s.handleLoading}
            ></session-checkin>
        `},[l.howManySessions]:{slug:l.howManySessions,component:(s,e,t)=>r`
            <make-group
                class=${t}
                name=${s.slug}
                module=${s.module}
                variant=${l.howManySessions}
                ?skippable=${s.skippable}
                .t=${e.checkin}
                @done-step=${s.doneHandler}
            ></make-group>
        `},[l.whatTimeOfDay]:{slug:l.whatTimeOfDay,component:(s,e,t)=>r`
            <make-group
                class=${t}
                name=${s.slug}
                module=${s.module}
                variant=${l.whatTimeOfDay}
                ?skippable=${s.skippable}
                .t=${e.checkin}
                @done-step=${s.doneHandler}
            ></make-group>
        `},[l.howOften]:{slug:l.howOften,component:(s,e,t)=>r`
            <make-group
                class=${t}
                name=${s.slug}
                module=${s.module}
                variant=${l.howOften}
                ?skippable=${s.skippable}
                .t=${e.checkin}
                @done-step=${s.doneHandler}
            ></make-group>
        `},[l.startDate]:{slug:l.startDate,component:(s,e,t)=>r`
            <make-group
                class=${t}
                name=${s.slug}
                module=${s.module}
                variant=${l.startDate}
                ?skippable=${s.skippable}
                .t=${e.checkin}
                @done-step=${s.doneHandler}
            ></make-group>
        `}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ge=s=>(...e)=>({_$litDirective$:s,values:e});class Qe{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:vt}=gt,$t=s=>s.strings===void 0,ze=()=>document.createComment(""),U=(s,e,t)=>{var i;const n=s._$AA.parentNode,o=e===void 0?s._$AB:e._$AA;if(t===void 0){const a=n.insertBefore(ze(),o),d=n.insertBefore(ze(),o);t=new vt(a,d,s,s.options)}else{const a=t._$AB.nextSibling,d=t._$AM,h=d!==s;if(h){let c;(i=t._$AQ)===null||i===void 0||i.call(t,s),t._$AM=s,t._$AP!==void 0&&(c=s._$AU)!==d._$AU&&t._$AP(c)}if(a!==o||h){let c=t._$AA;for(;c!==a;){const f=c.nextSibling;n.insertBefore(c,o),c=f}}}return t},P=(s,e,t=s)=>(s._$AI(e,t),s),_t={},Ke=(s,e=_t)=>s._$AH=e,yt=s=>s._$AH,he=s=>{var e;(e=s._$AP)===null||e===void 0||e.call(s,!1,!0);let t=s._$AA;const i=s._$AB.nextSibling;for(;t!==i;){const n=t.nextSibling;t.remove(),t=n}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const kt=Ge(class extends Qe{constructor(s){if(super(s),s.type!==z.PROPERTY&&s.type!==z.ATTRIBUTE&&s.type!==z.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!$t(s))throw Error("`live` bindings can only contain a single expression")}render(s){return s}update(s,[e]){if(e===w||e===_)return e;const t=s.element,i=s.name;if(s.type===z.PROPERTY){if(e===t[i])return w}else if(s.type===z.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(i))return w}else if(s.type===z.ATTRIBUTE&&t.getAttribute(i)===e+"")return w;return Ke(s),e}});class wt extends u{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},value:{type:String},locations:{attribute:!1},locationError:{attribute:!1},phoneError:{attribute:!1},city:{attribute:!1},loading:{attribute:!1},state:{attribute:!1},localValue:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.locations=[],this.locationError="",this.city="",this.loading=!1,this.localValue="",this.phoneError="",this._clearLocations=this._clearLocations.bind(this),this._handleSuggestions=this._handleSuggestions.bind(this),this._debounceCityChange=debounce(getAddressSuggestions(this._handleSuggestions,zumeProfile.map_key)).bind(this),this._handleCityInputChange=this._handleCityInputChange.bind(this)}firstUpdated(){this.renderRoot.querySelector(".inputs input").focus(),this.value!==""&&(this.localValue=JSON.parse(this.value))}render(){var e;return r`
        <form class="inputs stack" @submit=${this._handleSubmit}>
            ${this.variant===l.updateName?r`
                <h2>${this.t.name_question}</h2>
                <div class="">
                    <label for="name">${this.t.name}</label>
                    <input class="input" type="text" id="name" name="name" value=${this.localValue} ?required=${!this.skippable}>
                </div>
            `:""}

            ${this.variant===l.updatePhone?r`
                <h2>${this.t.phone_question}</h2>
                <div class="">
                    <label for="phone">${this.t.phone}</label>
                    <input
                        class="input"
                        type="tel"
                        id="phone"
                        name="phone"
                        pattern="\\(?\\+?[\\(\\)\\-\\s0-9]*"
                        value=""
                        ?required=${!this.skippable}
                        @input=${this._handleInput}
                        @invalid=${this._handleInvalid}
                    >
                    <div class="input-error" data-state="${this.phoneError.length?"":"empty"}" >${this.phoneError}</div>
                </div>
            `:""}

            ${this.variant===l.updateLocation?r`
                <h2>${this.t.location_question}</h2>
                <div class="form-group">
                    <label class="input-label" for="city">${this.t.city}</label>
                    <input
                        class="input"
                        type="text"
                        id="city"
                        name="city"
                        .value="${this.city?kt(this.city):(e=this.localValue)==null?void 0:e.label}"
                        @input=${this._handleCityChange}
                    >
                    <span class="loading-spinner ${this.loading?"active":""}"></span>
                    <p class="input-subtext">${this.t.approximate_location}</p>
                </div>
                <button>${this.t.accept}</button>
                <div id="address_results">
                    ${this.locationError}
                    ${this.locations.map(t=>r`
                            <div
                                class="address-result"
                                id="${t.id}"
                                data-place-name=${t.place_name}
                                @click=${this._handleLocationSelection}
                            >
                                ${t.place_name}
                            </div>
                        `)}
                </div>
                <div class="cluster | mx-auto">
                    <button type="submit" class="btn" ?disabled=${this.loading}>${this.t.next}</button>
                </div>
            `:""}
            ${[l.updatePhone,l.updateName].includes(this.variant)?r`
                <div class="cluster | mx-auto">
                    <button type="submit" class="btn" ?disabled=${this.loading}>${this.t.next}</button>
                    <span class="loading-spinner ${this.loading?"active":""}"></span>
                </div>
            `:""}
        </form>
        `}_handleInput(e){this.phoneError=""}_handleInvalid(e){e.preventDefault(),this.phoneError=this.t.phone_error}_handleSubmit(e){e.preventDefault(),e.srcElement.querySelector("#city")?this._handleSubmitLocation():this._handleDone(e)}_handleDone(e){e&&e.preventDefault();const t=e.target[0];if(t.type==="submit")return;let{name:i,value:n}=t;t.type==="tel"&&(n=t.value.replace(/[\(\)\-\s]/g,"")),this._updateProfile(i,n,()=>{this._sendDoneStepEvent()})}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleCityChange(e){this._handleCityInputChange(e),this._debounceCityChange(e)}_handleCityInputChange(e){this.city=e.target.value}_handleSuggestions(e){e.features.length<1&&(this.locationError=this.t.no_locations_found),this.locations=e.features}_handleLocationSelection(e){this.city=e.target.dataset.placeName;const t=getLocationGridFromMapbox(e.target.id,zumeProfile.profile.location);this.localValue=t,this._clearLocations()}_handleSubmitLocation(){if(this.localValue.source==="ip"){const{label:e,level:t,lat:i,lng:n}=this.localValue;this.localValue={source:"user",grid_id:!1,label:e,level:t,lat:Number(i),lng:Number(n)}}this._updateProfile("location_grid_meta",this.localValue,()=>{this._sendDoneStepEvent()})}_updateProfile(e,t,i=()=>{}){this.loading=!0;const n={[e]:t};fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(n),headers:{"X-WP-Nonce":jsObject.nonce}}).then(o=>o.json()).then(o=>{zumeProfile.profile=o,i()}).catch(o=>{console.error(o)}).finally(()=>{this.loading=!1})}_clearLocations(){this.locations=[]}createRenderRoot(){return this}}window.customElements.define("complete-profile",wt);class St extends u{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},inviteCode:{type:String}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.t={},this.inviteCode="123456",this.url=`https://zume5.test/zume_app/plan_invite${this.inviteCode!==""?"?code="+this.inviteCode:""}`}render(){return r`
            <div class="center stack">
                <h2>${this.t.title}</h2>
                <p>${this.t.share_with_friends}</p>
                <share-links url=${this.url} title="${this.t.join_my_plan}" .t=${this.t}></share-links>
            </div>
        `}createRenderRoot(){return this}}window.customElements.define("invite-friends",St);class xt extends u{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},errorMessage:{attribute:!1},message:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.state={},this.errorMessage="",this.message="",this.loading=!1,this.contactPreferences=["email","text","phone","whatsapp","signal","telegram","messenger"]}firstUpdated(){this.message=this.t.connect_success;const e=this.stateManager.getAll();if(this.variant===l.connectingToCoach){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));const t=(n=>{n===!1&&(this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting)),n.coach_request&&n.coach_request.errors&&Object.keys(n.coach_request.errors).length!==0&&Object.keys(n.coach_request.errors)[0]==="already_has_coach"&&(this.message=this.t.already_coached,this.setErrorMessage(this.t.error_connecting)),this._handleFinish()}).bind(this),i=(()=>{this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting),this._handleFinish()}).bind(this);makeRequest("POST","get_a_coach",{data:e},"zume_system/v1/").done(t).fail(i).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return this.stateManager||(this.stateManager=new Te(this.module),this.state=this.stateManager.get(this.variant)||{},this.variant===l.languagePreferences&&!this.state.value&&(this.state.value=zumeProfile.profile.preferred_language||"en",this.stateManager.add(this.variant,this.state)),this.variant===l.contactPreferences&&Object.keys(this.state).length===0&&(this.state=Object.fromEntries(zumeProfile.profile.contact_preference.map(e=>[e,"true"])))),r`
        <form class="inputs stack-2" @submit=${this._handleDone}>
            ${this.variant===l.contactPreferences?r`
                <h2>${this.t.contact_preference_question}</h2>
                <div class="stack center container-sm | align-items-start text-start">
                    ${this.contactPreferences.map(e=>r`
                        <div>
                            <input type="checkbox" name="contact-preference" id=${e} value=${e} @change=${this._handleChange} ?checked=${!!this.state[e]} />
                            <label for=${e}>${this.t[e]}</label>
                        </div>
                    `)}
                </div>
            `:""}

            ${this.variant===l.languagePreferences?r`
                <h2>${this.t.language_preference_question}</h2>
                <div class="stack">
                    <label for="preferred-language">${this.t.language_preference}</label>
                    <select name="preferred-language" id="preferred-language" @change=${this._handleChange} >

                        ${Object.values(jsObject.languages).map(e=>r`
                            <option value=${e.code} ?selected=${e.code===this.state.value} >
                                ${e.nativeName} - ${e.enDisplayName}
                            </option>
                        `)}

                    </select>
                </div>
            `:""}

            ${this.variant===l.howCanWeServe?r`
                <h2>${this.t.how_can_we_serve}</h2>
                <div class="stack center | container-sm align-items-start text-start">
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="how-can-we-serve" id="coaching" value="coaching-request" @change=${this._handleChange} ?checked=${!!this.state.coaching} />
                        <label for="coaching">${this.t.coaching}</label>
                    </div>
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="how-can-we-serve" id="technical" value="technical-assistance" @change=${this._handleChange} ?checked=${!!this.state.technical} />
                        <label for="technical">${this.t.technical_assistance}</label>
                    </div>
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="how-can-we-serve" id="implementation" value="question-about-implementation" @change=${this._handleChange} ?checked=${!!this.state.implementation} />
                        <label for="implementation">${this.t.question_implementation}</label>
                    </div>
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="how-can-we-serve" id="content" value="question-about-content" @change=${this._handleChange} ?checked=${!!this.state.content} />
                        <label for="content">${this.t.question_content}</label>
                    </div>
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="how-can-we-serve" id="group-started" value="help-with-group" @change=${this._handleChange} ?checked=${!!this.state["group-started"]} />
                        <label for="group-started">${this.t.help_with_group}</label>
                    </div>
                </div>
            `:""}
            ${this.variant===l.connectingToCoach?r`

                <h1>${this.t.connecting_coach_title}</h1>
                <p>${this.message}</p>
                <span class="loading-spinner ${this.loading?"active":""}"></span>
            `:""}
            ${this.variant!==l.connectingToCoach?r`
                    <div class="cluster | mx-auto">
                        <span class="loading-spinner ${this.loading?"active":""}"></span>
                        <button type="submit" class="btn" ?disabled=${this.loading}>${this.t.next}</button>
                    </div>
                `:""}
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        </form>
        `}_handleDone(e){if(e&&e.preventDefault(),Object.keys(this.state).length===0){this.setErrorMessage(this.t.missing_response);return}this._sendDoneStepEvent()}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleFinish(){setTimeout(()=>{this._sendDoneStepEvent()},3e3)}_handleChange(e){e.target.type==="checkbox"&&(this.state[e.target.value]=e.target.checked),e.target.type==="text"&&(this.state.value=e.target.value),e.target.type==="select-one"&&(this.state.value=e.target.value),this.stateManager.add(this.variant,this.state)}createRenderRoot(){return this}}customElements.define("request-coach",xt);class Et extends u{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.showTrainings=!1,this.loading=!1}firstUpdated(){const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.loading=!1,this.showTrainings=!0;return}const t=e.searchParams.get("code");this.connectToPlan(t)}connectToPlan(e){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait,this.code=e,makeRequest("POST","connect/public-plan",{code:e},"zume_system/v1").then(t=>{console.log(t),this.message=this.t.success.replace("%s",t.name),this._sendDoneStepEvent()}).fail(({responseJSON:t})=>{console.log(t),this.message="",t.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}_handleChosenTraining(e){console.log(e);const{code:t}=e.detail;this.showTrainings=!1,this.connectToPlan(t)}render(){return r`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            ${this.showTrainings?r`
                <public-trainings .t=${this.t} @chosen-training=${this._handleChosenTraining}></public-trainings>
            `:""}
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("join-training",Et);class Ct extends u{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1;return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","connect/plan",{code:t},"zume_system/v1").then(i=>{console.log(i),this.message=this.t.success.replace("%s",i.name),this._sendDoneStepEvent()}).fail(({responseJSON:i})=>{console.log(i),this.message="",i.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return r`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("join-friends-training",Ct);class At extends u{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","connect/friend",{code:t},"zume_system/v1").then(i=>{console.log(i),this.message=this.t.success.replace("%s",i.name),this._sendDoneStepEvent()}).fail(({responseJSON:i})=>{console.log(i),this.message="",i.code==="bad_friend_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return r`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("connect-friend",At);class Dt extends u{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","checkin",{code:t},"zume_system/v1").then(i=>{this.message=this.t.success.replace("%s",i.name),this._sendDoneStepEvent()}).fail(({responseJSON:i})=>{console.log(i),this.message="",i.code==="bad_checkin_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){console.log(e),this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return r`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("session-checkin",Dt);class Pt extends u{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},errorMessage:{attribute:!1},message:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.state={},this.errorMessage="",this.message="",this.loading=!1}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return r`
            ${this.variant===l.howManySessions?r`
                <h2>Will you do 1 or 2 hour training sessions?</h2>
                <div class="stack">
                    <button class="btn" @click=${this._handleDone}>1 hour (20 sessions)</button>
                    <button class="btn" @click=${this._handleDone}>2 hour (10 sessions)</button>
                </div>
            `:""}
            ${this.variant===l.whatTimeOfDay?r`
                <h2>What time of day?</h2>
                <div class="stack">
                    <button class="btn" @click=${this._handleDone}>Morning</button>
                    <button class="btn" @click=${this._handleDone}>Afternoon</button>
                    <button class="btn" @click=${this._handleDone}>Evening</button>
                </div>
            `:""}
            ${this.variant===l.howOften?r`
                <h2>How often will you meet?</h2>
                <div class="stack">
                    <button class="btn" @click=${this._handleDone}>Every day</button>
                    <button class="btn" @click=${this._handleDone}>Once a week</button>
                    <button class="btn" @click=${this._handleDone}>Twice a month</button>
                    <button class="btn" @click=${this._handleDone}>Once a month</button>
                </div>
            `:""}
            ${this.variant===l.startDate?r`
                <h2>When do you plan to start?</h2>
                <input type="date">
                <button class="btn" @click=${this._handleDone}>Done</button>
            `:""}

        `}_handleDone(e){e&&e.preventDefault(),this._sendDoneStepEvent()}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleFinish(){setTimeout(()=>{this._sendDoneStepEvent()},3e3)}createRenderRoot(){return this}}customElements.define("make-group",Pt);function zt(s){return s?JSON.parse('{"'+s.substring(1).replace(/&/g,'","').replace(/=/g,'":"')+'"}'):{}}function Rt(s,e){let t={};const i=s.split("/").filter(o=>o!=""),n=e.split("/").filter(o=>o!="");return i.map((o,a)=>{/^:/.test(o)&&(t[o.substring(1)]=n[a])}),t}function Mt(s){return s?new RegExp("^(|/)"+s.replace(/:[^\s/]+/g,"([\\wÀ-ÖØ-öø-ÿ-]+)")+"(|/)$"):new RegExp("(^$|^/$)")}function Tt(s,e){if(Mt(e).test(s))return!0}function It(s){return class extends s{static get properties(){return{route:{type:String,reflect:!0,attribute:"route"},canceled:{type:Boolean}}}constructor(...e){super(...e),this.route="",this.canceled=!1}connectedCallback(...e){super.connectedCallback(...e),this.routing(this.constructor.routes,(...t)=>this.router(...t)),window.addEventListener("route",()=>{this.routing(this.constructor.routes,(...t)=>this.router(...t))}),window.onpopstate=()=>{window.dispatchEvent(new CustomEvent("route"))}}routed(e,t,i,n,o,a){a&&a(e,t,i,n),o(e,t,i,n)}routing(e,t){this.canceled=!0;const i=decodeURI(window.location.pathname),n=decodeURI(window.location.search);let o=e.filter(h=>h.pattern==="*")[0],a=e.filter(h=>h.pattern!=="*"&&Tt(i,h.pattern))[0],d=zt(n);a?(a.params=Rt(a.pattern,i),a.data=a.data||{},a.authentication&&a.authentication.authenticate&&typeof a.authentication.authenticate=="function"?(this.canceled=!1,Promise.resolve(a.authentication.authenticate.bind(this).call()).then(h=>{this.canceled||(h?a.authorization&&a.authorization.authorize&&typeof a.authorization.authorize=="function"?(this.canceled=!1,Promise.resolve(a.authorization.authorize.bind(this).call()).then(c=>{this.canceled||(c?this.routed(a.name,a.params,d,a.data,t,a.callback):this.routed(a.authorization.unauthorized.name,a.params,d,a.data,t,a.callback))})):this.routed(a.name,a.params,d,a.data,t,a.callback):this.routed(a.authentication.unauthenticated.name,a.params,d,a.data,t,a.callback))})):a.authorization&&a.authorization.authorize&&typeof a.authorization.authorize=="function"?(this.canceled=!1,Promise.resolve(a.authorization.authorize.bind(this).call()).then(h=>{this.canceled||(h?this.routed(a.name,a.params,d,a.data,t,a.callback):this.routed(a.authorization.unauthorized.name,a.params,d,a.data,t,a.callback))})):this.routed(a.name,a.params,d,a.data,t,a.callback)):o&&(o.data=o.data||{},this.routed(o.name,{},d,o.data,t,o.callback))}}}function Ot(s){return class extends s{navigate(e){window.history.pushState({},null,e),window.dispatchEvent(new CustomEvent("route"))}}}class A extends It(u){static get properties(){return{route:{type:String},params:{type:Object},query:{type:Object}}}static get routes(){return[{name:"getting-started",pattern:`${zumeDashboard.base_url}/getting-started`,icon:"",data:{component:"dash-getting-started"}},{name:"training",pattern:`${zumeDashboard.base_url}/training`,icon:"",data:{component:"dash-training"}},{name:"practicing",pattern:`${zumeDashboard.base_url}/practicing`,icon:"",data:{component:"dash-practicing"}},{name:"my-coach",pattern:`${zumeDashboard.base_url}/my-coach`,parent:"practicing",icon:"zume-coach",translation:zumeDashboard.translations.my_coach,data:{component:"dash-coach"}},{name:"my-tools",pattern:`${zumeDashboard.base_url}/my-tools`,parent:"practicing",icon:"zume-tools",translation:zumeDashboard.translations.my_tools,data:{component:"dash-tools"}},{name:"my-plans",pattern:`${zumeDashboard.base_url}/my-plans`,parent:"practicing",icon:"zume-plans",translation:zumeDashboard.translations.my_plans,data:{component:"dash-plans"}},{name:"my-churches",pattern:`${zumeDashboard.base_url}/my-churches`,parent:"practicing",icon:"zume-churches",translation:zumeDashboard.translations.my_churches,data:{component:"dash-churches"}},{name:"my-maps",pattern:`${zumeDashboard.base_url}/my-maps`,parent:"practicing",icon:"zume-location",translation:zumeDashboard.translations.my_maps,data:{component:"dash-maps"}},{name:"not-found",pattern:"*",icon:"",data:{component:"dash-not-found"}}]}static getRoute(e){return A.routes.find(i=>i.name===e)}static childRoutesOf(e){return A.routes.filter(({parent:i})=>i===e)}constructor(){super(),this.route="",this.params={},this.query={},this.data={},this.addEventListener("route",e=>{console.log(e)})}router(e,t,i,n){this.route=e,this.params=t,this.query=i,this.data=n}makeHref(e){return`${zumeDashboard.base_url}/${e}`}makeHrefRoute(e){const i=A.routes.find(({name:n})=>n===e);return i?i.pattern:(console.error("MISSING ROUTE",e),"")}renderRoute(){const{component:e}=this.data;return e?document.createElement(e):""}render(){return r`
            <div class="dashboard">

            <div class="dashboard__sidebar">
                <ul class="stack-2 | progress-menu accordion-menu" data-accordion-menu data-submenu-toggle="true">
                    <li class="menu-section">
                        <nav-link
                            href=${this.makeHref("getting-started")}
                            class="menu-section__title menu-btn"
                            icon="zume-start"
                            text=${zumeDashboard.translations.getting_started}>
                        </nav-link>
                        <progress-circle percent="66" radius="12"></progress-circle>

                        <ul class="nested is-active">
                            <li>
                                <nav-link
                                    class="menu-btn"
                                    href=${zumeDashboard.urls.set_profile_wizard}
                                    ?disabled=${!0}
                                    ?completed=${!0}
                                    ?directLink=${!0}
                                    icon="zume-profile"
                                    text=${zumeDashboard.translations.set_profile}
                                ></nav-link>
                                <span class="icon zume-check-mark success"></span>
                            </li>
                            <li>
                                <nav-link
                                    class="menu-btn"
                                    href=${zumeDashboard.urls.plan_training_wizard}
                                    ?disabled=${!0}
                                    ?completed=${!0}
                                    ?directLink=${!0}
                                    icon="zume-start"
                                    text=${zumeDashboard.translations.plan_a_training}
                                ></nav-link>
                                <span class="icon zume-check-mark success"></span>
                            </li>
                            <li>
                                <nav-link
                                    ?directLink=${!0}
                                    class="menu-btn"
                                    href=${zumeDashboard.urls.get_coach_wizard}
                                    icon="zume-coach"
                                    text=${zumeDashboard.translations.get_a_coach}
                                ></nav-link>
                                <span class="icon zume-check-mark success"></span>
                            </li>
                        </ul>
                    </li>
                    <li class="menu-section">
                        <nav-link
                            href=${this.makeHref("training")}
                            class="menu-section__title menu-btn"
                            icon="zume-training"
                            text=${zumeDashboard.translations.training}
                        >
                        </nav-link>
                        <ul class="nested is-active">
                            <li>
                                <nav-link
                                    class="menu-btn"
                                    href="#"
                                    icon="zume-progress"
                                    text=${zumeDashboard.translations.my_progress}
                                ></nav-link>
                            </li>
                            <li>
                                <nav-link
                                    class="menu-btn"
                                    href="#"
                                    icon="zume-group"
                                    text=${zumeDashboard.translations.my_training}
                                ></nav-link>
                            </li>
                        </ul>
                    </li>
                    <li class="menu-section">
                        <nav-link
                            href=${this.makeHref("practicing")}
                            class="menu-section__title menu-btn"
                            icon="zume-practicing"
                            text=${zumeDashboard.translations.practicing}
                        ></nav-link>
                        <ul class="nested is-active">
                            ${A.childRoutesOf("practicing").map(e=>r`
                                        <li>
                                            <nav-link
                                                class="menu-btn"
                                                href=${this.makeHrefRoute(e.name)}
                                                icon=${e.icon}
                                                text=${e.translation}
                                            ></nav-link>
                                        </li>
                                    `)}
                        </ul>
                    </li>
                </ul>
            </div>

            ${this.renderRoute()}
        </div>
        `}createRenderRoot(){return this}}customElements.define("dash-board",A);class jt extends u{render(){return r`
            <div class="dashboard__content">
                <div class="dashboard__header">
                    <h1 class="h3">Churches</h1>
                    <launch-course></launch-course>
                </div>
                <div class="dashboard__main">
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-churches",jt);class Lt extends u{render(){return r`
            <div class="dashboard__content">
                <div class="dashboard__header">
                    <h1 class="h3">Coach</h1>
                    <launch-course></launch-course>
                </div>
                <div class="dashboard__main">
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-coach",Lt);class Nt extends u{render(){return r`
            <div class="dashboard__header">
            </div>

            <div class="dashboard__main">
            </div>

            <div class="dashboard__secondary">
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-content",Nt);class Ft extends u{render(){return r`
            <div class="stack | card cta">
                <h2 class="h5 text-center">${zumeDashboard.translations.get_a_coach}</h2>
                <p>Don't forget about our free coaching</p>
                <a href="#" class="btn light uppercase">${zumeDashboard.translations.get_a_coach}</a>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-cta",Ft);class Ht extends u{render(){return r`
            <div class="dashboard__content">
                <div class="dashboard__header">
                    <h1 class="h3">Getting Started</h1>
                    <launch-course slot="header-action"></launch-course>
                </div>
                <div class="dashboard__main">
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-getting-started",Ht);class Ut extends u{render(){return r`
            <div class="dashboard__content">
                <div class="dashboard__header">
                    <h1 class="h3">Maps</h1>
                    <launch-course></launch-course>
                </div>
                <div class="dashboard__main">
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-maps",Ut);class qt extends u{render(){return r`
            <div class="dashboard__content">
                <div class="dashboard__header">
                    <h1 class="h3">Not Found</h1>
                    <launch-course></launch-course>
                </div>
                <div class="dashboard__main">
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-not-found",qt);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Re=(s,e,t)=>{const i=new Map;for(let n=e;n<=t;n++)i.set(s[n],n);return i},Bt=Ge(class extends Qe{constructor(s){if(super(s),s.type!==z.CHILD)throw Error("repeat() can only be used in text expressions")}dt(s,e,t){let i;t===void 0?t=e:e!==void 0&&(i=e);const n=[],o=[];let a=0;for(const d of s)n[a]=i?i(d,a):a,o[a]=t(d,a),a++;return{values:o,keys:n}}render(s,e,t){return this.dt(s,e,t).values}update(s,[e,t,i]){var n;const o=yt(s),{values:a,keys:d}=this.dt(e,t,i);if(!Array.isArray(o))return this.ht=d,a;const h=(n=this.ht)!==null&&n!==void 0?n:this.ht=[],c=[];let f,m,p=0,g=o.length-1,b=0,v=a.length-1;for(;p<=g&&b<=v;)if(o[p]===null)p++;else if(o[g]===null)g--;else if(h[p]===d[b])c[b]=P(o[p],a[b]),p++,b++;else if(h[g]===d[v])c[v]=P(o[g],a[v]),g--,v--;else if(h[p]===d[v])c[v]=P(o[p],a[v]),U(s,c[v+1],o[p]),p++,v--;else if(h[g]===d[b])c[b]=P(o[g],a[b]),U(s,o[p],o[g]),g--,b++;else if(f===void 0&&(f=Re(d,b,v),m=Re(h,p,g)),f.has(h[p]))if(f.has(h[g])){const S=m.get(d[b]),te=S!==void 0?o[S]:null;if(te===null){const fe=U(s,o[p]);P(fe,a[b]),c[b]=fe}else c[b]=P(te,a[b]),U(s,o[p],te),o[S]=null;b++}else he(o[g]),g--;else he(o[p]),p++;for(;b<=v;){const S=U(s,c[v+1]);P(S,a[b]),c[b++]=S}for(;p<=g;){const S=o[p++];S!==null&&he(S)}return this.ht=d,Ke(s,c),w}});class Wt extends u{static get properties(){return{loading:{type:Boolean,attribute:!1},commitments:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1}}}constructor(){super(),this.loading=!0,this.route=A.getRoute("my-plans"),this.filterName="my-plans-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.renderListItem=this.renderListItem.bind(this),this.closeCommitmentsModal=this.closeCommitmentsModal.bind(this)}firstUpdated(){const e=this.filterStatus||"";this.fetchCommitments(e)}updated(){jQuery(document).foundation()}fetchCommitments(){const e=this.filterStatus;makeRequest("GET","commitments",{status:e},"zume_system/v1").done(t=>{this.commitments=t}).always(()=>{this.loading=!1})}openCommitmentsModal(){const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("open")}closeCommitmentsModal(){const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("close")}clearCommitmentsModal(){jQuery(".post-training-plan").each(function(e){this.value=""})}addCommitments(){jQuery(".post-training-plan").each(function(e){const t=jQuery(this).val();if(t){const n=jQuery(this).prev().text();console.log("Question: "+n+" Answer: "+t);var i=new Date;i.setDate(i.getDate()+30),this.value="",makeRequest("POST","commitment",{user_id:zumeDashboard.user_profile.user_id,post_id:zumeDashboard.user_profile.contact_id,meta_key:"tasks",note:"Question: "+n+" Answer: "+t,question:n,answer:t,date:i,category:"post_training_plan"},"zume_system/v1").done(o=>{console.log(o)})}}),this.closeCommitmentsModal()}completeCommitment(e){let t={id:e,user_id:zumeDashboard.user_profile.user_id};makeRequest("PUT","commitment",t,"zume_system/v1").done(i=>{this.fetchCommitments()})}deleteCommitment(e){let t={id:e,user_id:zumeDashboard.user_profile.user_id};makeRequest("DELETE","commitment",t,"zume_system/v1").done(i=>{this.closeMenu(e),this.fetchCommitments()})}editCommitment(e){console.log(e)}filterCommitments(e){this.filterStatus=e,this.fetchCommitments(e),ZumeStorage.save(this.filterName,e),this.closeFilter()}closeFilter(){const e=this.querySelector("#filter-menu");jQuery(e).foundation("close")}closeMenu(e){const t=this.querySelector(`#kebab-menu-${e}`);jQuery(t).foundation("close")}renderListItem(e){const{question:t,answer:i,id:n,status:o}=e;return r`
            <li class="list__item">
                <span>${t} <b>${i}</b></span>
                <div class="list__secondary">
                    <div class="d-flex w-6rem justify-content-center">
                        ${o==="closed"?r`<span class="icon zume-check-mark success"></span>`:r`
                                <button
                                    class="btn light uppercase tight break-anywhere"
                                    @click=${()=>this.completeCommitment(n)}
                                >
                                    ${zumeDashboard.translations.done}
                                </button>
                            `}
                    </div>
                    <button class="icon-btn" data-toggle="kebab-menu-${n}">
                        <span class="icon zume-kebab brand-light"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="kebab-menu-${n}" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment="right" data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li class="hidden"><button class="menu-btn" @click=${()=>this.editCommitment(n)}><span class="icon zume-pencil"></span>${zumeDashboard.translations.edit}</button></li>
                        <li><button class="menu-btn" @click=${()=>this.deleteCommitment(n)}><span class="icon zume-trash"></span>${zumeDashboard.translations.delete}</button></li>
                    </ul>
                </div>
            </li>

        `}render(){return r`
            <div class="dashboard__content">
                <div class="dashboard__header">
                    <div class="d-flex gap-0">
                        <h1 class="h3">${this.route.translation}</h1>
                        <button class="icon-btn f-2" @click=${this.openCommitmentsModal}>
                            <span class="visually-hidden">${zumeDashboard.translations.add_commitments}</span>
                            <span class="icon zume-plus brand-light" aria-hidden="true"></span>
                        </button>
                        <button class="icon-btn f-2" data-toggle="filter-menu">
                            <span class="visually-hidden">${zumeDashboard.translations.filter}</span>
                            <span class="icon zume-filter brand-light" aria-hidden="true"></span>
                        </button>
                    </div>
                    <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment="right" data-close-on-click="true" data-close-on-click-inside="true">
                        <ul>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus==="open"?"selected":""}" @click=${()=>this.filterCommitments("open")}>
                                    <span class="icon zume-sort-todo" aria-hidden="true"></span>
                                    ${zumeDashboard.translations.active}
                                </button>
                            </li>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus==="closed"?"selected":""}" @click=${()=>this.filterCommitments("closed")}>
                                    <span class="icon zume-sort-done" aria-hidden="true"></span>
                                    ${zumeDashboard.translations.completed}
                                </button>
                            </li>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus===""?"selected":""}" @click=${()=>this.filterCommitments("")}>
                                    <span class="icon zume-sort-all" aria-hidden="true"></span>
                                    ${zumeDashboard.translations.both}
                                </button>
                            </li>
                        </ul>
                    </div>
                    <launch-course></launch-course>
                </div>
                <div class="dashboard__main">
                    ${this.loading?r`<span class="loading-spinner active"></span>`:r`
                                <ul class="list">
                                    <li class="list__item">
                                        <h2 class="f-1">I will</h2>
                                    </li>
                                    ${!this.loading&&this.commitments&&this.commitments.length>0?Bt(this.commitments,e=>e.id,this.renderListItem):""}
                                </ul>
                            `}

                </div>
            </div>
            <div class="reveal large" id="new-commitments-form" data-reveal data-v-offset="20">
                <button class="ms-auto d-block w-2rem" data-close aria-label="Close modal" type="button" @click=${this.clearCommitmentsModal}>
                        <img src=${`${zumeDashboard.images_url}/close-button-01.svg`} alt="close button">
                </button>
                <div id="pieces-content" class="stack">
                    <div class="stack--3">
                      <label for="plan_name">I will share My Story [Testimony] and God's Story [the Gospel] with the following individuals:</label>
                      <input type="text" name="" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will invite the following people to begin an Accountability Group with me:</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will challenge the following people to begin their own Accountability Groups and train them how to do it:</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will invite the following people to begin a 3/3 Group with me:</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will challenge the following people to begin their own 3/3 Groups and train them how to do it:</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will invite the following people to participate in a 3/3 Hope or Discover Group [see Appendix of Zúme Guidebook]</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will invite the following people to participate in Prayer Walking with me:</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will Prayer Walk once every [days / weeks / months].</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will equip the following people to share their story and God's Story and make a List of 100 of the people in their relational network:</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will challenge the following people to use the Prayer Cycle tool on a periodic basis:</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will use the Prayer Cycle tool once every [days / weeks / months].</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will invite the following people to be part of a Leadership Cell that I will lead:</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will encourage the following people to go through this Zúme Training course:</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">Other commitments:</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <button class="btn" @click=${this.addCommitments}>Save</button>
                    </div>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-plans",Wt);class Vt extends u{constructor(){super(),this.routeName="practicing",this.routes=A.childRoutesOf("practicing")}render(){return r`
            <div class="dashboard__content">
                <div class="dashboard__header">
                    <h1 class="h3">Practicing</h1>
                    <launch-course></launch-course>
                </div>
                <div class="dashboard__main p-1">
                    <div class="nav-grid">
                        ${this.routes.map(e=>r`
                            <grid-link
                                href=${e.pattern}
                                text=${zumeDashboard.translations[e.translation]||""}
                                icon=${e.icon}
                            >
                            </grid-link>
                        `)}
                    </div>
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-practicing",Vt);class Zt extends u{render(){return r`
            <div class="dashboard__content">
                <div class="dashboard__header">
                    <h1 class="h3">Tools</h1>
                    <launch-course></launch-course>
                </div>
                <div class="dashboard__main">
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-tools",Zt);class Jt extends u{render(){return r`
            <div class="dashboard__content">
                <div class="dashboard__header">
                    <h1 class="h3">Training</h1>
                    <launch-course></launch-course>
                </div>
                <div class="dashboard__main">
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-training",Jt);class Ye extends Ot(u){static get properties(){return{href:{type:String},class:{type:String},disabled:{type:Boolean},completed:{type:Boolean},directLink:{type:Boolean},icon:{type:String},text:{type:String}}}constructor(){super(),this.href="",this.class="",this.icon="",this.text="",this.disabled=!1,this.completed=!1,this.directLink=!1}handleClick(e){this.directLink||(e.preventDefault(),this.navigate(this.href))}printBool(e){return e?"true":"false"}render(){return r`
            <a
                href=${this.href}
                class=${this.class}
                @click=${this.handleClick}
                aria-disabled=${this.printBool(this.disabled)}
                data-completed=${this.printBool(this.completed)}
            >
                <span class="icon ${this.icon} brand-light"></span>
                <span>${this.text}</span>
            </a>
        `}createRenderRoot(){return this}}customElements.define("nav-link",Ye);class Gt extends Ye{constructor(){super()}renderText(){return this.text.split(" ").map(e=>r`
            <span>${e}</span>
        `)}render(){return r`
            <a
                href=${this.href}
                class="card-btn grid-link"
                role="button"
                @click=${this.handleClick}
                aria-disabled=${this.printBool(this.disabled)}
                data-completed=${this.printBool(this.completed)}
            >
                <span class="icon ${this.icon} brand-light"></span>
                ${this.renderText()}
            </a>
        `}}customElements.define("grid-link",Gt);class Qt extends u{render(){return r`
            <button class="btn uppercase light" data-toggle="launch-course-panel">
                ${zumeDashboard.translations.launch_course}
            </button>
            <div class="dropdown-pane" id="launch-course-panel" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment="right" data-close-on-click="true">
                <ul>
                    <li><a class="menu-btn" href="<?php echo esc_url( zume_10_session_url() ) ?>"><span class="icon zume-course"></span>${zumeDashboard.translations.ten_session_course}</a></li>
                    <li><a class="menu-btn" href="<?php echo esc_url( zume_20_session_url() ) ?>"><span class="icon zume-course"></span>${zumeDashboard.translations.twenty_session_course}</a></li>
                    <li><a class="menu-btn" href="<?php echo esc_url( zume_intensive_session_url() ) ?>"><span class="icon zume-course"></span>${zumeDashboard.translations.three_day_intensive_course}</a></li>
                </ul>
            </div>
        `}createRenderRoot(){return this}}customElements.define("launch-course",Qt);class Kt extends u{static get properties(){return{title:{type:String},sections:{type:Array}}}render(){return r`
            <div class="container">
                <h1 class="text-center">${this.title}</h1>
                ${this.sections.map((e,t)=>r`
                        <course-section .section=${e}></course-section>
                    `)}
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-guide",Kt);const Me=["slideshow","guide"];class Yt extends u{static get properties(){return{languageCode:{type:String},homeUrl:{type:String},assetsPath:{type:String},translations:{type:Object},zumeSessions:{attribute:!1},lessonIndex:{attribute:!1},view:{attribute:!1},linkNodes:{attribute:!1},showIndex:{attribute:!1}}}constructor(){super();const e=new URL(window.location.href),t=this.getZumeSessions(e);this.zumeSessions=t;const i=this.getLessonIndex(e);this.lessonIndex=i,this.view=this.getView(e),this.changeSession(i,!1,t),this.handleSessionLink=this.handleSessionLink.bind(this),this.handleHistoryPopState=this.handleHistoryPopState.bind(this),window.addEventListener("popstate",this.handleHistoryPopState),document.querySelectorAll(".language-selector").forEach(function(o){o.addEventListener("click",()=>{const a=o.dataset.value,d=new URL(location.href),h=d.pathname.substring(1).split("/");let c="";h.length>0&&jsObject.zume_languages.includes(h[0])?c=h.slice(1).join("/"):c=h.join("/"),a!=="en"?c="/"+a+"/"+c:c="/"+c,c+=d.search,location.href=c})})}getView(e){if(e.searchParams.has("view")){const t=e.searchParams.get("view");if(Me.includes(t))return t}else return"slideshow"}getLessonIndex(e){if(e.searchParams.has("session")){const t=e.searchParams.get("session");if(t==="index")return"index";const i=Number(t);return Number.isInteger(i)?i-1:0}else return 0}getZumeSessions(e){const t=e.searchParams.get("type")||"10";this.type=t;let i;switch(t){case"10":i=zume10Sessions;break;case"20":i=zume20Sessions;break;case"intensive":i=zumeIntensiveSessions;break;default:i=zume10Sessions;break}return i}handleSessionLink(e){const t=e.target,i=Number(t.dataset.sessionNumber);this.lessonIndex=i,this.showIndex===!0&&(this.showIndex=!1),this.changeSession(this.lessonIndex)}getNextSession(){this.lessonIndex+=1,this.changeSession(this.lessonIndex)}getPreviousSession(){this.lessonIndex-=1,this.changeSession(this.lessonIndex)}changeSession(e,t=!0,i=null){if(e==="index"){this.showIndex=!0;return}else this.showIndex=!1;const n=i||this.zumeSessions;let o=e;e<0&&(o=0),e>n.length-1&&(o=n.length-1),this.lessonIndex=o,this.session=n[o],t&&this.pushHistory()}pushHistory(){const e=this.lessonIndex,t=this.view,i=new URL(window.location.href);e!==null&&Number.isInteger(e)&&i.searchParams.set("session",e+1),t&&i.searchParams.set("view",t),window.history.pushState(null,null,i.href)}handleHistoryPopState(){var n;const e=new URL(location.href),t=e.searchParams.has("session")?e.searchParams.get("session"):null,i=e.searchParams.get("view");(n=document.querySelector(".js-off-canvas-overlay"))==null||n.classList.remove("is-visible"),Number.isInteger(Number(t))&&(this.lessonIndex=t-1,this.changeSession(this.lessonIndex,!1)),t==="index"&&(this.lessonIndex="index",this.changeSession("index",!1)),i&&Me.includes(i)&&(this.view=i)}getSessionTitle(){return!this.session||!this.session.t?"":this.session.t}getSessionSections(){return!this.session||!this.session.sections?[]:this.session.sections}switchViews(e=!0){this.view==="guide"?this.view="slideshow":this.view="guide",e===!0&&this.pushHistory({view:this.view})}openMenu(){const e=this.querySelector("#offCanvas");jQuery(e).foundation("open")}render(){const e=this.showIndex?"visually-hidden":"",t=this.type==="intensive"?"container-xsm":"container-sm";return r`
            ${this.showIndex?r`
                    <div class="course-index | bg-brand-gradient">
                        <img src="${jsObject.images_url}/zume-training-logo-white.svg" alt="Zume Logo" class="mx-auto w-70 py-1" />
                        <div class="${t}" data-max-width="750">
                            <div class="grid | grid-min-8rem gutter0">
                                ${this.zumeSessions.map((i,n)=>r`
                                    <button
                                        class="card-btn | bg-white black m--2 gap--3 aspect-1 justify-content-evenly"
                                        data-session-number=${n}
                                        @click=${this.handleSessionLink}
                                    >
                                        <h2 class="f-0 bold">Session</h2>
                                        <p class="f-3 bold lh-sm">${n+1}</p>
                                        <span class="icon zume-course brand-light f-3"></span>
                                    </button>
                                `)}
                            </div>
                        </div>
                    </div>
                `:""}

            <nav class="${e} stack | bg-white px-0 text-center | off-canvas position-left justify-content-between py-1" id="offCanvas" data-off-canvas data-transition="overlap">
                <div class="stack">
                    <div style="text-align:center;padding: 1em;">
                        <img src="${this.assetsPath}/ZumeLOGO.svg" width="150px" alt="Zume" >
                    </div>
                    <!-- Close button -->
                    <button class="close-button" aria-label="Close menu" type="button" data-close>
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <!-- Menu -->
                    <a class="btn outline" href="${this.homeUrl}">${this.translations.home}</a>
                    <button class="btn d-flex align-items-center justify-content-center gap--4" data-open="language-menu-reveal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" class="ionicon" viewBox="0 0 512 512"><path d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M256 48c-58.07 0-112.67 93.13-112.67 208S197.93 464 256 464s112.67-93.13 112.67-208S314.07 48 256 48z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M117.33 117.33c38.24 27.15 86.38 43.34 138.67 43.34s100.43-16.19 138.67-43.34M394.67 394.67c-38.24-27.15-86.38-43.34-138.67-43.34s-100.43 16.19-138.67 43.34" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M256 48v416M464 256H48"/></svg>
                        ${this.languageCode}
                    </button>
                    <button class="btn" @click=${this.switchViews}>Switch Views</button>

                    <div class="stack-1 py-1">
                        ${this.zumeSessions.map((i,n)=>r`
                            <button
                                class="link session-link"
                                data-session-number="${n}"
                                @click=${this.handleSessionLink}
                            >
                                ${i.t}
                            </button>
                        `)}
                    </div>
                </div>

                <div class="stack">
                    <button class="btn outline" @click=${this.getPreviousSession}>Back</button>
                    <button class="btn" @click=${this.getNextSession}>Next</button>
                </div>
            </nav>

            <span class="${e} p-1 d-block position-relative z-1">
                <button id="hamburger-menu" class="nav-toggle show" @click=${this.openMenu}>
                    <span class="hamburger brand"></span>
                </button>
            </span>

            <div class="${e} container">
                ${this.view==="guide"?r`<course-guide title="${this.getSessionTitle()}" .sections=${this.getSessionSections()}></course-guide>`:r`<course-slideshow title="${this.getSessionTitle()}" .sections=${this.getSessionSections()}></course-slideshow>`}
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-presenter",Yt);class Xt extends u{static get properties(){return{section:{type:Object}}}constructor(){super()}render(){return this.title=this.section.t??null,this.description=this.section.d??null,this.info=this.section.info??null,this.duration=this.section.duration??null,this.parts=this.section.parts??[],r`
            ${this.title!==null?r`<h1>${this.title}</h1>`:""}
            ${this.description!==null?r`<p>${this.description}</p>`:""}
            ${this.info!==null?r`<p>${this.info}</p>`:""}
            ${this.duration!==null?r`<p>${this.duration}</p>`:""}

            ${this.parts.map(e=>r`<part-switcher .partData=${e}></part-switcher>`)}

        `}createRenderRoot(){return this}}customElements.define("course-section",Xt);class es extends u{static get properties(){return{title:{type:String},sections:{type:Array},sectionIndex:{attribute:!1},partIndex:{attribute:!1},currentSlide:{attribute:!1},index:{attribute:!1}}}constructor(){super(),this.reset(),this.listenForKeyboard=this.listenForKeyboard.bind(this),this.listenForMouseClick=this.listenForMouseClick.bind(this)}reset(){this.sectionIndex=-1,this.partIndex=-1,this.currentSlide=null,this.index=[]}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.listenForKeyboard),document.addEventListener("mousedown",this.listenForMouseClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.listenForKeyboard),document.removeEventListener("mousedown",this.listenForMouseClick)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e==="title"&&t!==i&&this.reset()}setupIndex(){this.sections&&(this.index=this.sections.map(e=>e.parts?e.parts.length:0))}nextSlide(){if(this.sectionIndex>this.sections.length-1&&(this.sectionIndex=this.sections.length-1),this.index[this.sectionIndex]===0||this.index[this.sectionIndex]===this.partIndex+1){if(this.sectionIndex===this.sections.length-1)return;this.setSlide(this.sectionIndex+1,-1);return}if(this.index[this.sectionIndex]>0){this.setSlide(this.sectionIndex,this.partIndex+1);return}}previousSlide(){if(this.sectionIndex<0&&(this.sectionIndex=0),this.index[this.sectionIndex]===0||this.partIndex===-1){if(this.sectionIndex===0)return;const e=this.index[this.sectionIndex-1]-1;this.setSlide(this.sectionIndex-1,e);return}this.setSlide(this.sectionIndex,this.partIndex-1)}listenForKeyboard(e){["Space","ArrowRight"].includes(e.code)&&this.nextSlide(),["Backspace","ArrowLeft"].includes(e.code)&&this.previousSlide()}listenForMouseClick(e){const{x:t}=e,{innerWidth:i}=window,n=10/100*i+80;t<n&&(this.querySelector(".clickable-area.back").classList.add("visible"),this.previousSlide()),t>i-n&&(this.querySelector(".clickable-area.forward").classList.add("visible"),this.nextSlide())}setSlide(e,t){if(this.sectionIndex=e,this.partIndex=t,t<0){const i=this.sections[e];this.currentSlide=r`<section-part .partData=${i}></section-part>`}else{const i=this.sections[e].parts[t];this.currentSlide=r`<part-switcher .partData=${i}></part-switcher>`}}render(){return this.index.length===0&&this.setupIndex(),this.sectionIndex<0&&this.setSlide(0,-1),r`
            <div class="text-center">
                <div class="container">
                    <h2>${this.title}</h2>
                    ${this.currentSlide}
                    <div class="fixed left right bottom d-flex justify-content-between py-2">
                        <button class="btn outline light" @click=${this.previousSlide}>Back</button>
                        <button class="btn  light" @click=${this.nextSlide}>Next</button>
                    </div>
                </div>
            </div>


            <div class="clickable-area back">
                <div class="absolute top bottom left right bg-gray-500 opacity-50"></div>
                <span class="absolute middle center brand f-3">🡰</span>
            </div>
            <div class="clickable-area forward">
                <div class="absolute top bottom left right bg-gray-500 opacity-50"></div>
                <span class="absolute middle center brand f-3">🡲</span>
            </div>

        `}createRenderRoot(){return this}}customElements.define("course-slideshow",es);class ts extends u{static get properties(){return{partData:{type:Object}}}render(){switch(this.partData.type){case"section":return r`<section-part .partData=${this.partData}></section-part>`;case"watch":return r`<watch-part .partData=${this.partData}></watch-part>`;case"discuss":return r`<discuss-part .partData=${this.partData}></discuss-part>`;case"read":return r`<read-part .partData=${this.partData}></read-part>`;case"see":return r`<see-part .partData=${this.partData}></see-part>`;case"share":return r`<share-part .partData=${this.partData}></share-part>`;case"listen":return r`<listen-part .partData=${this.partData}></listen-part>`;case"form":return r`<form-part .partData=${this.partData}></form-part>`;case"checkin":return r`<checkin-part .partData=${this.partData}></checkin-part>`;case"cta":default:return r`<basic-part .partData=${this.partData}></basic-part>`}}createRenderRoot(){return this}}customElements.define("part-switcher",ts);class ss extends u{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,i=this.partData.info??null;return r`
            ${e!==null?r`<h3>${e}</h3>`:""}
            ${t!==null?r`<p>${t}</p>`:""}
            ${i!==null?r`<p>${i}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("basic-part",ss);class is extends u{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,i=this.partData.info??null;return r`
            ${e!==null?r`<h3>${e}</h3>`:""}
            ${t!==null?r`<p>${t}</p>`:""}
            ${i!==null?r`<p>${i}</p>`:""}

            <div><img class="mx-auto" src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&amp;color=323a68&amp;data=https://zume5.training/zume_app/checkin/?code=5678" width="300px" alt="QR Code"></div>
            <p>
                or <br>
                zume.training/checkin and use code <strong class="text-lightblue"><a href="https://zume5.training/zume_app/checkin/?code=5678" target="_blank">5678</a></strong>
            </p>
        `}createRenderRoot(){return this}}customElements.define("checkin-part",is);class ns extends u{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,i=this.partData.info??null;return r`
            ${e!==null?r`<h3>${e}</h3>`:""}
            ${t!==null?r`<p>${t}</p>`:""}
            ${i!==null?r`<p>${i}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("discuss-part",ns);class as extends u{static get properties(){return{partData:{type:Object}}}render(){return this.partData.t,this.partData.d,this.partData.info,r`
            ${this.title!==null?r`<h2>${this.title}</h2>`:""}
            ${this.description!==null?r`<p>${this.description}</p>`:""}
            ${this.info!==null?r`<p>${this.info}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("form-part",as);class rs extends u{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,i=this.partData.info??null;return r`
            <h2 class="brand">LISTEN</h2>
            ${e!==null?r`<h3>${e}</h3>`:""}
            ${t!==null?r`<p>${t}</p>`:""}
            ${i!==null?r`<p>${i}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("listen-part",rs);class os extends u{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,i=this.partData.info??null;return r`
            <h2 class="brand">READ</h2>
            ${e!==null?r`<h3>${e}</h3>`:""}
            ${t!==null?r`<p>${t}</p>`:""}
            ${i!==null?r`<p>${i}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("read-part",os);class ls extends u{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,i=this.partData.info??null;return r`
            ${e!==null?r`<h2>${e}</h2>`:""}
            ${t!==null?r`<p>${t}</p>`:""}
            ${i!==null?r`<p>${i}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("section-part",ls);class cs extends u{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,i=this.partData.info??null;return r`
            <h2 class="brand">SEE</h2>
            ${e!==null?r`<h3>${e}</h3>`:""}
            ${t!==null?r`<p>${t}</p>`:""}
            ${i!==null?r`<p>${i}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("see-part",cs);class hs extends u{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,i=this.partData.info??null;return r`
            ${e!==null?r`<h3>${e}</h3>`:""}
            ${t!==null?r`<p>${t}</p>`:""}
            ${i!==null?r`<p>${i}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("share-part",hs);class ds extends u{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,i=this.partData.info??null;return r`
            ${e!==null?r`<h3>${e}</h3>`:""}
            ${t!==null?r`<p>${t}</p>`:""}
            ${i!==null?r`<p>${i}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("watch-part",ds);class Xe extends u{constructor(){super()}render(){return r`
            <div class="container">
                <div class="circle">
                    <div class="triangle"></div>
                </div>
            </div>
        `}}E(Xe,"styles",ct`
        :host {
            --play-button-size: 3rem;
            --play-button-color: red;
            --play-button-hover-color: darkred;
            --play-button-highlight: white;

            width: 100%;
            height: 100%;
        }

        :host(:hover) .circle {
            transform: scale(1.1);
            background-color: var(--play-button-hover-color);
        }

        .container {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }


        .circle {
            width: var(--play-button-size);
            height: var(--play-button-size);
            border-radius: 50%;
            background-color: var(--play-button-color);
            box-shadow: var(--play-button-shadow);

            display: flex;
            align-items: center;
            justify-content: center;

            transition: all 100ms linear;
        }

        .triangle {
          width: 0;
          height: 0;
          border-top: calc(var(--play-button-size) / 4.5) solid transparent;
          border-left: calc(var(--play-button-size) / 2.5) solid var(--play-button-highlight);
          border-bottom: calc(var(--play-button-size) / 4.5) solid transparent;
          margin-left: calc(var(--play-button-size) / 10);
        }
    `);window.customElements.define("play-button",Xe);class us extends u{constructor(){super();E(this,"webShareSupported",!!window.navigator.share);E(this,"clipboardSupported",!!window.navigator.clipboard);this.shareFeedback="",this.copyFeedback=""}static get properties(){return{url:{type:String},title:{type:String},t:{type:Object},shareFeedback:{attribute:!1},copyFeedback:{attribute:!1}}}share(){navigator.share({title:this.title,url:this.url,text:title}).then(()=>{this.shareFeedback=this.t.share_feedback,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(t=>console.error("Error sharing",t))}copyLink(){navigator.clipboard.writeText(this.url).then(()=>{this.copyFeedback=this.t.copy_feedback,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(t=>console.error(t))}noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported}render(){return r`
            <div id="share" tabindex="-1" class="stack--2">
              ${this.noOptionsAvailable()?r`
                  <div class="stack--2">
                    <p>${this.t.copy_and_share_text}</p>
                    <p class=""><code>${this.url}</code></p>
                  </div>
              `:r`
                  <div :class="cluster gap--1">
                    ${this.webShareSupported?r`
                        <div class="position-relative">
                          <button class="btn" @click=${this.share}>
                            <!-- Share icon -->
                            <span>${this.t.share}</span>
                          </button>
                          <p role="alert" aria-live="polite" id="shareFeedback" class="context-alert" data-state=${this.shareFeedback.length?"":"empty"}>${this.shareFeedback}</p>
                        </div>
                    `:""}
                    ${this.clipboardSupported?r`
                        <div class="position-relative">
                          <button class="btn" data-theme="ghost" @click=${this.copyLink}>
                            <!-- Link icon -->
                            <span>${this.t.copy_link}</span>
                          </button>
                          <p role="alert" aria-live="polite" id="copyFeedback" class="context-alert" data-state=${this.copyFeedback.length?"":"empty"}>${this.copyFeedback}</p>
                        </div>
                    `:""}
                  </div>
              `}


            </div>
        `}createRenderRoot(){return this}}customElements.define("share-links",us);class ps extends u{static get properties(){return{t:{type:Object},joinLink:{type:String},loading:{attribute:!1},posts:{attribute:!1}}}constructor(){super(),this.loading=!0,this.plans=[],this.getTrainings(),this.renderRow=this.renderRow.bind(this)}getTrainings(){makeRequest("POST","public_plans",{},"zume_system/v1").then(e=>{this.plans=e}).catch(e=>{console.log(e)}).always(()=>{this.loading=!1})}render(){return this.loading?r`<span class="loading-spinner active"></span>`:r`
            <table>
                <thead>
                    <tr>
                        <td>${this.t.name}</td>
                        <td>${this.t.next_date}</td>
                        <td>${this.t.start_time}</td>
                        <td>${this.t.timezone}</td>
                        <td>${this.t.language}</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    ${this.plans.length>0?this.plans.map(this.renderRow):this.t.no_plans}
               </tbody>
            </table>
        `}renderRow({join_key:e,language_note:t,post_title:i,time_of_day_note:n,timezone_note:o,...a}){const d=a.set_a_01?"a":"b",h=d==="a"?10:20,c=`set_${d}_`,f=Date.now()/1e3;let m="";for(let g=1;g<h+1;g++){const b=g<10?`0${g}`:`${g}`,v=a[c+b];if(m=v.timestamp,f<v.timestamp)break}const p=moment(m*1e3).format("MMM Do 'YY");return r`
            <tr>
                <td data-label="${this.t.name}">${i}</td>
                <td data-label="${this.t.next_date}">${p}</td>
                <td data-label="${this.t.start_time}">${n}</td>
                <td data-label="${this.t.timezone}">${o}</td>
                <td data-label="${this.t.language}">${t}</td>
                <td><button class="btn" data-code=${e} @click=${this._handleJoinTraining}>${this.t.join}</button></td>
            </tr>
        `}_handleJoinTraining(e){console.log(e);const t=e.target.dataset.code,i=new CustomEvent("chosen-training",{bubbles:!0,detail:{code:t}});this.dispatchEvent(i)}createRenderRoot(){return this}}customElements.define("public-trainings",ps);class ms extends u{static get properties(){return{radius:{type:Number},lineWidth:{type:Number},percent:{type:Number}}}constructor(){super(),this.radius=100,this.lineWidth=10,this.percent=30}width(){return this.radius*2+this.lineWidth}widthPx(){return this.appendPx(this.width())}center(){return this.width()/2}circumference(){return this.radius*2*Math.PI}circumferencePx(){return this.appendPx(this.circumference())}appendPx(e){return`${e}px`}render(){return r`
            <div
                class="progress-circle"
                style="--percent: ${this.percent}; --width: ${this.widthPx()}; --circ: ${this.circumferencePx()}"
            >
                <svg>
                    <circle
                        cx="${this.center()}"
                        cy="${this.center()}"
                        r="${this.radius}"
                    >
                    </circle>
                    <circle
                        cx="${this.center()}"
                        cy="${this.center()}"
                        r="${this.radius}"
                    >
                    </circle>
                </svg>
            </div>
        `}createRenderRoot(){return this}}customElements.define("progress-circle",ms);
//# sourceMappingURL=main-c1e1ffc6.js.map
