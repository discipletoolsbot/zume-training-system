var Oe=Object.defineProperty;var je=(i,e,t)=>e in i?Oe(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var E=(i,e,t)=>(je(i,typeof e!="symbol"?e+"":e,t),t),Y=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)};var k=(i,e,t)=>(Y(i,e,"read from private field"),t?t.call(i):e.get(i)),A=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},X=(i,e,t,s)=>(Y(i,e,"write to private field"),s?s.call(i,t):e.set(i,t),t);var D=(i,e,t)=>(Y(i,e,"access private method"),t);import{createApp as Ie}from"https://unpkg.com/petite-vue?module";var _,J,Ee,Z,xe,G,Ce,U,ae;class we{constructor(e){A(this,J);A(this,Z);A(this,G);A(this,U);E(this,"WIZARD_STATE_NAME","zume_wizard_state");E(this,"STALE_LIFESPAN",10*60*1e3);E(this,"MAX_LIFESPAN",60*60*1e3);A(this,_,void 0);this.moduleName=e,X(this,_,D(this,J,Ee).call(this))}empty(){return Object.keys(k(this,_).data).length===0}isDataStale(){return D(this,U,ae).call(this,k(this,_),this.STALE_LIFESPAN)}get(e){return k(this,_).data[e]}getAll(){return k(this,_).data}add(e,t){k(this,_).data[e]=t,D(this,G,Ce).call(this),localStorage.setItem(this.WIZARD_STATE_NAME,JSON.stringify(k(this,_)))}clear(){X(this,_,null),localStorage.removeItem(this.WIZARD_STATE_NAME)}}_=new WeakMap,J=new WeakSet,Ee=function(){const e=D(this,Z,xe).call(this);return e&&!D(this,U,ae).call(this,e,this.MAX_LIFESPAN)?e:{module:this.moduleName,data:{},timestamp:Date.now()}},Z=new WeakSet,xe=function(){return JSON.parse(localStorage.getItem(this.WIZARD_STATE_NAME))},G=new WeakSet,Ce=function(){k(this,_).timestamp=Date.now()},U=new WeakSet,ae=function(e,t){return Date.now()-e.timestamp>t};const $={gettingStarted:"getting-started",makeAGroup:"make-a-group",getACoach:"get-a-coach",joinAPlan:"join-a-training",connectWithFriend:"connect-with-friend",joinFriendsPlan:"join-friends-training",checkin:"checkin"},m={completeProfile:"completeProfile",makePlan:"makePlan",inviteFriends:"inviteFriends",getACoach:"getACoach",joinTraining:"joinTraining",connectFriend:"connectFriend",joinFriendsTraining:"joinFriendsTraining",checkin:"checkin",planDecision:"planDecision"},Le={howManySessions:"how-many-sessions",whatTimeOfDay:"what-time-of-day",howOften:"how-often",startDate:"what-start-date"},l={updateName:"update-your-name",updateLocation:"update-your-location",updatePhone:"update-your-phone",inviteFriends:"invite-friends",contactPreferences:"contact-preferences",languagePreferences:"preferred-language",howCanWeServe:"how-can-we-serve",connectingToCoach:"connecting-to-coach",joinTraining:"join-training",connectToFriend:"connect-friend",joinFriendsPlan:"join-friends-training",checkinSubmit:"checkin-submit",...Le},Ne={[l.updateName]:{field:"name",testExistance:(i,e)=>e.has_set_name},[l.updateLocation]:{field:"location",testExistance:i=>!(i.source&&i.source==="ip")},[l.updatePhone]:{field:"phone",testExistance:i=>!!i}};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const W=window,le=W.ShadowRoot&&(W.ShadyCSS===void 0||W.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ce=Symbol(),he=new WeakMap;let Ae=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==ce)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(le&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=he.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&he.set(t,e))}return e}toString(){return this.cssText}};const Fe=i=>new Ae(typeof i=="string"?i:i+"",void 0,ce),He=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((s,n,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[o+1],i[0]);return new Ae(t,i,ce)},Ue=(i,e)=>{le?i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const s=document.createElement("style"),n=W.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=t.cssText,i.appendChild(s)})},de=le?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return Fe(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Q;const B=window,ue=B.trustedTypes,qe=ue?ue.emptyScript:"",pe=B.reactiveElementPolyfillSupport,re={toAttribute(i,e){switch(e){case Boolean:i=i?qe:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},De=(i,e)=>e!==i&&(e==e||i==i),ee={attribute:!0,type:String,converter:re,reflect:!1,hasChanged:De};let z=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,s)=>{const n=this._$Ep(s,t);n!==void 0&&(this._$Ev.set(n,s),e.push(n))}),e}static createProperty(e,t=ee){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const s=typeof e=="symbol"?Symbol():"__"+e,n=this.getPropertyDescriptor(e,s,t);n!==void 0&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(n){const o=this[e];this[t]=n,this.requestUpdate(e,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||ee}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,s=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const n of s)this.createProperty(n,t[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const n of s)t.unshift(de(n))}else e!==void 0&&t.push(de(e));return t}static _$Ep(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,s;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((s=e.hostConnected)===null||s===void 0||s.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Ue(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var s;return(s=t.hostConnected)===null||s===void 0?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var s;return(s=t.hostDisconnected)===null||s===void 0?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$EO(e,t,s=ee){var n;const o=this.constructor._$Ep(e,s);if(o!==void 0&&s.reflect===!0){const r=(((n=s.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?s.converter:re).toAttribute(t,s.type);this._$El=e,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(e,t){var s;const n=this.constructor,o=n._$Ev.get(e);if(o!==void 0&&this._$El!==o){const r=n.getPropertyOptions(o),u=typeof r.converter=="function"?{fromAttribute:r.converter}:((s=r.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?r.converter:re;this._$El=o,this[o]=u.fromAttribute(t,r.type),this._$El=null}}requestUpdate(e,t,s){let n=!0;e!==void 0&&(((s=s||this.constructor.getPropertyOptions(e)).hasChanged||De)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),s.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,s))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((n,o)=>this[o]=n),this._$Ei=void 0);let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),(e=this._$ES)===null||e===void 0||e.forEach(n=>{var o;return(o=n.hostUpdate)===null||o===void 0?void 0:o.call(n)}),this.update(s)):this._$Ek()}catch(n){throw t=!1,this._$Ek(),n}t&&this._$AE(s)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(s=>{var n;return(n=s.hostUpdated)===null||n===void 0?void 0:n.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,s)=>this._$EO(s,this[s],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};z.finalized=!0,z.elementProperties=new Map,z.elementStyles=[],z.shadowRootOptions={mode:"open"},pe==null||pe({ReactiveElement:z}),((Q=B.reactiveElementVersions)!==null&&Q!==void 0?Q:B.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var te;const V=window,O=V.trustedTypes,ge=O?O.createPolicy("lit-html",{createHTML:i=>i}):void 0,oe="$lit$",S=`lit$${(Math.random()+"").slice(9)}$`,Pe="?"+S,We=`<${Pe}>`,j=document,N=()=>j.createComment(""),F=i=>i===null||typeof i!="object"&&typeof i!="function",Re=Array.isArray,Be=i=>Re(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",se=`[ 	
\f\r]`,L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,me=/-->/g,be=/>/g,x=RegExp(`>|${se}(?:([^\\s"'>=/]+)(${se}*=${se}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ve=/'/g,fe=/"/g,ze=/^(?:script|style|textarea|title)$/i,Ve=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),a=Ve(1),y=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),$e=new WeakMap,T=j.createTreeWalker(j,129,null,!1),Je=(i,e)=>{const t=i.length-1,s=[];let n,o=e===2?"<svg>":"",r=L;for(let c=0;c<t;c++){const h=i[c];let f,p,g=-1,v=0;for(;v<h.length&&(r.lastIndex=v,p=r.exec(h),p!==null);)v=r.lastIndex,r===L?p[1]==="!--"?r=me:p[1]!==void 0?r=be:p[2]!==void 0?(ze.test(p[2])&&(n=RegExp("</"+p[2],"g")),r=x):p[3]!==void 0&&(r=x):r===x?p[0]===">"?(r=n??L,g=-1):p[1]===void 0?g=-2:(g=r.lastIndex-p[2].length,f=p[1],r=p[3]===void 0?x:p[3]==='"'?fe:ve):r===fe||r===ve?r=x:r===me||r===be?r=L:(r=x,n=void 0);const C=r===x&&i[c+1].startsWith("/>")?" ":"";o+=r===L?h+We:g>=0?(s.push(f),h.slice(0,g)+oe+h.slice(g)+S+C):h+S+(g===-2?(s.push(void 0),c):C)}const u=o+(i[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return[ge!==void 0?ge.createHTML(u):u,s]};class H{constructor({strings:e,_$litType$:t},s){let n;this.parts=[];let o=0,r=0;const u=e.length-1,c=this.parts,[h,f]=Je(e,t);if(this.el=H.createElement(h,s),T.currentNode=this.el.content,t===2){const p=this.el.content,g=p.firstChild;g.remove(),p.append(...g.childNodes)}for(;(n=T.nextNode())!==null&&c.length<u;){if(n.nodeType===1){if(n.hasAttributes()){const p=[];for(const g of n.getAttributeNames())if(g.endsWith(oe)||g.startsWith(S)){const v=f[r++];if(p.push(g),v!==void 0){const C=n.getAttribute(v.toLowerCase()+oe).split(S),w=/([.?@])?(.*)/.exec(v);c.push({type:1,index:o,name:w[2],strings:C,ctor:w[1]==="."?Ge:w[1]==="?"?Ye:w[1]==="@"?Xe:K})}else c.push({type:6,index:o})}for(const g of p)n.removeAttribute(g)}if(ze.test(n.tagName)){const p=n.textContent.split(S),g=p.length-1;if(g>0){n.textContent=O?O.emptyScript:"";for(let v=0;v<g;v++)n.append(p[v],N()),T.nextNode(),c.push({type:2,index:++o});n.append(p[g],N())}}}else if(n.nodeType===8)if(n.data===Pe)c.push({type:2,index:o});else{let p=-1;for(;(p=n.data.indexOf(S,p+1))!==-1;)c.push({type:7,index:o}),p+=S.length-1}o++}}static createElement(e,t){const s=j.createElement("template");return s.innerHTML=e,s}}function I(i,e,t=i,s){var n,o,r,u;if(e===y)return e;let c=s!==void 0?(n=t._$Co)===null||n===void 0?void 0:n[s]:t._$Cl;const h=F(e)?void 0:e._$litDirective$;return(c==null?void 0:c.constructor)!==h&&((o=c==null?void 0:c._$AO)===null||o===void 0||o.call(c,!1),h===void 0?c=void 0:(c=new h(i),c._$AT(i,t,s)),s!==void 0?((r=(u=t)._$Co)!==null&&r!==void 0?r:u._$Co=[])[s]=c:t._$Cl=c),c!==void 0&&(e=I(i,c._$AS(i,e.values),c,s)),e}class Ze{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:s},parts:n}=this._$AD,o=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:j).importNode(s,!0);T.currentNode=o;let r=T.nextNode(),u=0,c=0,h=n[0];for(;h!==void 0;){if(u===h.index){let f;h.type===2?f=new q(r,r.nextSibling,this,e):h.type===1?f=new h.ctor(r,h.name,h.strings,this,e):h.type===6&&(f=new Qe(r,this,e)),this._$AV.push(f),h=n[++c]}u!==(h==null?void 0:h.index)&&(r=T.nextNode(),u++)}return o}v(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class q{constructor(e,t,s,n){var o;this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=n,this._$Cp=(o=n==null?void 0:n.isConnected)===null||o===void 0||o}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=I(this,e,t),F(e)?e===b||e==null||e===""?(this._$AH!==b&&this._$AR(),this._$AH=b):e!==this._$AH&&e!==y&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):Be(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==b&&F(this._$AH)?this._$AA.nextSibling.data=e:this.$(j.createTextNode(e)),this._$AH=e}g(e){var t;const{values:s,_$litType$:n}=e,o=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=H.createElement(n.h,this.options)),n);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===o)this._$AH.v(s);else{const r=new Ze(o,this),u=r.u(this.options);r.v(s),this.$(u),this._$AH=r}}_$AC(e){let t=$e.get(e.strings);return t===void 0&&$e.set(e.strings,t=new H(e)),t}T(e){Re(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,n=0;for(const o of e)n===t.length?t.push(s=new q(this.k(N()),this.k(N()),this,this.options)):s=t[n],s._$AI(o),n++;n<t.length&&(this._$AR(s&&s._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,t);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class K{constructor(e,t,s,n,o){this.type=1,this._$AH=b,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,s,n){const o=this.strings;let r=!1;if(o===void 0)e=I(this,e,t,0),r=!F(e)||e!==this._$AH&&e!==y,r&&(this._$AH=e);else{const u=e;let c,h;for(e=o[0],c=0;c<o.length-1;c++)h=I(this,u[s+c],t,c),h===y&&(h=this._$AH[c]),r||(r=!F(h)||h!==this._$AH[c]),h===b?e=b:e!==b&&(e+=(h??"")+o[c+1]),this._$AH[c]=h}r&&!n&&this.j(e)}j(e){e===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ge extends K{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===b?void 0:e}}const Ke=O?O.emptyScript:"";class Ye extends K{constructor(){super(...arguments),this.type=4}j(e){e&&e!==b?this.element.setAttribute(this.name,Ke):this.element.removeAttribute(this.name)}}class Xe extends K{constructor(e,t,s,n,o){super(e,t,s,n,o),this.type=5}_$AI(e,t=this){var s;if((e=(s=I(this,e,t,0))!==null&&s!==void 0?s:b)===y)return;const n=this._$AH,o=e===b&&n!==b||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==b&&(n===b||o);o&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,s;typeof this._$AH=="function"?this._$AH.call((s=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&s!==void 0?s:this.element,e):this._$AH.handleEvent(e)}}class Qe{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){I(this,e)}}const _e=V.litHtmlPolyfillSupport;_e==null||_e(H,q),((te=V.litHtmlVersions)!==null&&te!==void 0?te:V.litHtmlVersions=[]).push("2.7.3");const et=(i,e,t)=>{var s,n;const o=(s=t==null?void 0:t.renderBefore)!==null&&s!==void 0?s:e;let r=o._$litPart$;if(r===void 0){const u=(n=t==null?void 0:t.renderBefore)!==null&&n!==void 0?n:null;o._$litPart$=r=new q(e.insertBefore(N(),u),u,void 0,t??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ie,ne;let d=class extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const s=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=s.firstChild),s}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=et(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return y}};d.finalized=!0,d._$litElement$=!0,(ie=globalThis.litElementHydrateSupport)===null||ie===void 0||ie.call(globalThis,{LitElement:d});const ye=globalThis.litElementPolyfillSupport;ye==null||ye({LitElement:d});((ne=globalThis.litElementVersions)!==null&&ne!==void 0?ne:globalThis.litElementVersions=[]).push("3.3.2");class tt extends d{static get properties(){return{type:{type:String},finishUrl:{type:String},user:{type:Object},step:{attribute:!1},steps:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.stepIndex=0,this.steps=[],this.modules={},this.step={},this.t=window.SHAREDFUNCTIONS.escapeObject(jsObject.translations),this._handleHistoryPopState=this._handleHistoryPopState.bind(this),window.addEventListener("popstate",this._handleHistoryPopState),this.stateManager=new we}render(){if(!this.isWizardLoaded()){const e=this.getWizard(this.type);this.loadWizard(e),this._handleHistoryPopState(!0)}return this.steps.length===0?a`
            <div class="cover-page">
                <div class="stack center | text-center">
                    <h1 class="brand">${this.t.bad_wizard}</h1>
                    <p>${this.t.found_bad_wizard}</p>
                    <div class="center"><img class="w-50" src="https://imgs.search.brave.com/3f3MurVApxsoxJlmqxLF0fs5-WlAk6sEu9IV3sICb_k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWR2ZXJ0aXNlY2Fz/dC5jb20vcG9kY2Fz/dC9pbWFnZS9WZXJ5/QmFkV2l6YXJkcw.jpeg" alt="bad wizards" /></div>
                    <a class="btn" href="/">${this.t.home}</a>
                </div>
            </div>`:a`
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
        `}containerSize(){const e=this.steps[this.stepIndex];return(e.slug=l.joinTraining)?"container-md":"container-xsm"}currentStep(){const e=this.steps[this.stepIndex];return e.component(e,this.t,"w-100")}headerButtons(){const{skippable:e}=this.step,t=this.stepIndex===this.steps.length-1;return a`
        <div class="cluster | inline s-3">
            ${e&&!t?a`<button @click=${this._onSkip} class="brand">${this.t.skip}</button>`:""}
            ${!e&&!t?a`
                    <button @click=${this._onQuit} class="d-flex">
                        <svg data-src="${jsObject.images_url+"/close-button-01.svg"}" class="h-2"></svg>
                    </button>
                    `:""}
        </div>
        `}finishButton(){return a`
            <div class="text-center d-flex justify-content-between">
                <div class="cluster ms-auto">
                    <button @click=${this._onFinish} ?disabled=${this.loading} class="btn ${this.loading?"disabled":""}">${this.t.finish}</button>
                </div>
            </div>
        `}stepCounter(){return a`
            <div class="cluster">
                ${this.steps.map((e,t)=>{const s=t<=this.stepIndex;return a`<div class="step-circle ${s?"complete":""}"></div>`})}
            </div>
        `}footer(){return this.stepIndex===this.steps.length-1?this.finishButton():""}_onBack(){if(this.stepIndex>0){const e=this.stepIndex-1;this._gotoStep(e)}}_onNext(){if(this.stepIndex+1<this.steps.length){const e=this.stepIndex+1;this._gotoStep(e)}else this._onFinish()}_onSkip(){const e=this.step.module;for(let t=this.stepIndex+1;t<this.steps.length;t++)if(this.steps[t].module!==e){this._gotoStep(t);return}this._onFinish()}_onQuit(){this._onFinish(!0)}_onFinish(e=!1){this.stateManager.clear(),this.finishUrl||(window.location.href="/");const t=new URL(this.finishUrl);e||(this.type===$.checkin?t.searchParams.set("completed",this.type):t.searchParams.set("completed",this.type)),window.location.href=t}_gotoStep(e,t=!0){if(this.steps.length!==0&&(this.stepIndex=this.clampSteps(e),this.step=this.steps[this.stepIndex],t)){const s=new URL(window.location.href),n=s.pathname.split("/"),o=n[n.length-1];let r="";Object.values($).includes(o)?r=n.join("/")+"/"+this.step.slug+s.search:r=n.slice(0,-1).join("/")+"/"+this.step.slug+s.search,window.history.pushState(null,null,r)}}clampSteps(e){let t=e;return e>this.steps.length-1&&(t=this.steps.length-1),e<0&&(t=0),t}_handleHistoryPopState(e=!1){const s=new URL(window.location.href).pathname.split("/"),n=s[s.length-1];Object.values($).includes(n)&&this._gotoStep(0,!1);let o="",r=0;this.steps.forEach(({slug:u,module:c},h)=>{if(o!==c&&(o=c,r=h),n===u){if(e===!0&&this.stateManager.isDataStale()){this._gotoStep(r);return}this._gotoStep(h,!1)}})}_handlePlanDecision(e){switch(e.target.dataset.decision){case"make":this.updateWizard($.makeAGroup);break;case"join":this.updateWizard($.joinAPlan);break;case"skip":default:this._onSkip();break}}_handleLoading(e){const{loading:t}=e.detail;this.loading=t}makeModule(e=[],t=!1){const s={steps:[],skippable:t};return e.forEach(n=>{Object.keys(P).includes(n)&&s.steps.push(P[n])}),s}getModule(e,t=!1){const s={[m.completeProfile]:{steps:[P[l.updateName],P[l.updateLocation]],skippable:t},[m.planDecision]:{steps:[{slug:"plan-decision",component:(o,r,u)=>a`
                            <div class=${`stack ${u}`}>
                                <h2>Join or start a training</h2>
                                <button class="btn" data-decision="make" @click=${this._handlePlanDecision}>Start a training</button>
                                <button class="btn" data-decision="join" @click=${this._handlePlanDecision}>Join a public training</button>
                                <button class="btn outline" data-decision="skip" @click=${this._handlePlanDecision}>Skip for now</button>
                            </div>
                        `}],skippable:t},[m.makePlan]:this.makeModule([l.howManySessions,l.whatTimeOfDay,l.howOften,l.startDate,l.inviteFriends],t),[m.inviteFriends]:{steps:[P[l.inviteFriends]],skippable:t},[m.joinTraining]:{steps:[P[l.joinTraining]]}};return Object.keys(s).includes(e)?s[e]:s[m.completeProfile]}isWizardLoaded(){return Object.keys(this.modules).length!==0}loadWizard(e,t=!1){this.modules=e,t===!1&&(this.steps=[],this.stepIndex=0),Object.entries(this.modules).forEach(([s,{steps:n,skippable:o}])=>{const r=zumeProfile.profile;n.forEach(({component:u,slug:c})=>{const h=Ne[c];let f=null;if(h&&r){if(h.testExistance(r[h.field],r))return;f=r[h.field]}const p={component:u,slug:c,module:s,skippable:o,doneHandler:this._onNext,handleLoading:this._handleLoading};f!==null&&(p.value=f),this.steps.push(p)})}),t===!1&&this._gotoStep(0)}updateWizard(e){const t=this.getWizard(e);Object.keys(t).length!==0&&this.loadWizard(t)}isWizardTypeValid(e){return!!Object.values($).includes(e)}getWizard(e){return this.isWizardTypeValid(e)?{[$.gettingStarted]:{[m.completeProfile]:this.makeModule([l.updateName,l.updateLocation],!0),[m.planDecision]:this.getModule(m.planDecision)},[$.makeAGroup]:{[m.makePlan]:this.getModule(m.makePlan)},[$.getACoach]:{[m.completeProfile]:this.makeModule([l.updateName,l.updateLocation,l.updatePhone]),[m.getACoach]:this.makeModule([l.contactPreferences,l.languagePreferences,l.howCanWeServe,l.connectingToCoach])},[$.joinAPlan]:{[m.completeProfile]:this.makeModule([l.updateName,l.updateLocation,l.updatePhone]),[m.joinTraining]:this.getModule(m.joinTraining)},[$.connectWithFriend]:{[m.completeProfile]:this.makeModule([l.updateName,l.updateLocation],!0),[m.connectFriend]:this.makeModule([l.connectToFriend])},[$.joinFriendsPlan]:{[m.completeProfile]:this.makeModule([l.updateName,l.updateLocation],!0),[m.joinFriendsTraining]:this.makeModule([l.joinFriendsPlan])},[$.checkin]:{[m.checkin]:this.makeModule([l.checkinSubmit])}}[e]:{}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._handleHistoryPopState)}createRenderRoot(){return this}}window.customElements.define("zume-wizard",tt);const P={[l.updateName]:{slug:l.updateName,component:(i,e,t)=>a`
            <complete-profile
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.complete_profile}"
                variant=${l.updateName}
                @done-step=${i.doneHandler}
                value=${JSON.stringify(i.value)}
            ></complete-profile>
        `},[l.updateLocation]:{slug:l.updateLocation,component:(i,e,t)=>a`
            <complete-profile
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.complete_profile}"
                variant=${l.updateLocation}
                @done-step=${i.doneHandler}
                value=${JSON.stringify(i.value)}
            ></complete-profile>
        `},[l.updatePhone]:{slug:l.updatePhone,component:(i,e,t)=>a`
            <complete-profile
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.complete_profile}"
                variant=${l.updatePhone}
                @done-step=${i.doneHandler}
                value=${JSON.stringify(i.value)}
            ></complete-profile>
        `},[l.contactPreferences]:{slug:l.contactPreferences,component:(i,e,t)=>a`
            <request-coach
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.get_a_coach}"
                variant=${l.contactPreferences}
                @done-step=${i.doneHandler}
            ></request-coach>
        `},[l.languagePreferences]:{slug:l.languagePreferences,component:(i,e,t)=>a`
            <request-coach
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.get_a_coach}"
                variant=${l.languagePreferences}
                @done-step=${i.doneHandler}
            ></request-coach>
        `},[l.howCanWeServe]:{slug:l.howCanWeServe,component:(i,e,t)=>a`
            <request-coach
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.get_a_coach}"
                variant=${l.howCanWeServe}
                @done-step=${i.doneHandler}
            ></request-coach>
        `},[l.connectingToCoach]:{slug:l.connectingToCoach,component:(i,e,t)=>a`
            <request-coach
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.get_a_coach}"
                variant=${l.connectingToCoach}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></request-coach>
        `},[l.inviteFriends]:{slug:l.inviteFriends,component:(i,e,t)=>a`
            <invite-friends
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.share}
            ></invite-friends>
        `},[l.joinTraining]:{slug:l.joinTraining,component:(i,e,t)=>a`
            <join-training
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.join_training}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></join-training>
        `},[l.joinFriendsPlan]:{slug:l.joinFriendsPlan,component:(i,e,t)=>a`
            <join-friends-training
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.join_training}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></join-friends-training>
        `},[l.connectToFriend]:{slug:l.connectToFriend,component:(i,e,t)=>a`
            <connect-friend
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.connect_friend}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></connect-friend>
        `},[l.checkinSubmit]:{slug:l.checkinSubmit,component:(i,e,t)=>a`
            <session-checkin
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.checkin}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></session-checkin>
        `},[l.howManySessions]:{slug:l.howManySessions,component:(i,e,t)=>a`
            <make-group
                class=${t}
                name=${i.slug}
                module=${i.module}
                variant=${l.howManySessions}
                ?skippable=${i.skippable}
                .t=${e.checkin}
                @done-step=${i.doneHandler}
            ></make-group>
        `},[l.whatTimeOfDay]:{slug:l.whatTimeOfDay,component:(i,e,t)=>a`
            <make-group
                class=${t}
                name=${i.slug}
                module=${i.module}
                variant=${l.whatTimeOfDay}
                ?skippable=${i.skippable}
                .t=${e.checkin}
                @done-step=${i.doneHandler}
            ></make-group>
        `},[l.howOften]:{slug:l.howOften,component:(i,e,t)=>a`
            <make-group
                class=${t}
                name=${i.slug}
                module=${i.module}
                variant=${l.howOften}
                ?skippable=${i.skippable}
                .t=${e.checkin}
                @done-step=${i.doneHandler}
            ></make-group>
        `},[l.startDate]:{slug:l.startDate,component:(i,e,t)=>a`
            <make-group
                class=${t}
                name=${i.slug}
                module=${i.module}
                variant=${l.startDate}
                ?skippable=${i.skippable}
                .t=${e.checkin}
                @done-step=${i.doneHandler}
            ></make-group>
        `}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const R={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},st=i=>(...e)=>({_$litDirective$:i,values:e});class it{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const nt=i=>i.strings===void 0,at={},rt=(i,e=at)=>i._$AH=e;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ot=st(class extends it{constructor(i){if(super(i),i.type!==R.PROPERTY&&i.type!==R.ATTRIBUTE&&i.type!==R.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!nt(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[e]){if(e===y||e===b)return e;const t=i.element,s=i.name;if(i.type===R.PROPERTY){if(e===t[s])return y}else if(i.type===R.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(s))return y}else if(i.type===R.ATTRIBUTE&&t.getAttribute(s)===e+"")return y;return rt(i),e}});class lt extends d{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},value:{type:String},locations:{attribute:!1},locationError:{attribute:!1},phoneError:{attribute:!1},city:{attribute:!1},loading:{attribute:!1},state:{attribute:!1},localValue:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.locations=[],this.locationError="",this.city="",this.loading=!1,this.localValue="",this.phoneError="",this._clearLocations=this._clearLocations.bind(this),this._handleSuggestions=this._handleSuggestions.bind(this),this._debounceCityChange=debounce(getAddressSuggestions(this._handleSuggestions,zumeProfile.map_key)).bind(this),this._handleCityInputChange=this._handleCityInputChange.bind(this)}firstUpdated(){this.renderRoot.querySelector(".inputs input").focus(),this.value!==""&&(this.localValue=JSON.parse(this.value))}render(){var e;return a`
        <form class="inputs stack" @submit=${this._handleSubmit}>
            ${this.variant===l.updateName?a`
                <h2>${this.t.name_question}</h2>
                <div class="">
                    <label for="name">${this.t.name}</label>
                    <input class="input" type="text" id="name" name="name" value=${this.localValue} ?required=${!this.skippable}>
                </div>
            `:""}

            ${this.variant===l.updatePhone?a`
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

            ${this.variant===l.updateLocation?a`
                <h2>${this.t.location_question}</h2>
                <div class="form-group">
                    <label class="input-label" for="city">${this.t.city}</label>
                    <input
                        class="input"
                        type="text"
                        id="city"
                        name="city"
                        .value="${this.city?ot(this.city):(e=this.localValue)==null?void 0:e.label}"
                        @input=${this._handleCityChange}
                    >
                    <span class="loading-spinner ${this.loading?"active":""}"></span>
                    <p class="input-subtext">${this.t.approximate_location}</p>
                </div>
                <button>${this.t.accept}</button>
                <div id="address_results">
                    ${this.locationError}
                    ${this.locations.map(t=>a`
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
            ${[l.updatePhone,l.updateName].includes(this.variant)?a`
                <div class="cluster | mx-auto">
                    <button type="submit" class="btn" ?disabled=${this.loading}>${this.t.next}</button>
                    <span class="loading-spinner ${this.loading?"active":""}"></span>
                </div>
            `:""}
        </form>
        `}_handleInput(e){this.phoneError=""}_handleInvalid(e){e.preventDefault(),this.phoneError=this.t.phone_error}_handleSubmit(e){e.preventDefault(),e.srcElement.querySelector("#city")?this._handleSubmitLocation():this._handleDone(e)}_handleDone(e){e&&e.preventDefault();const t=e.target[0];if(t.type==="submit")return;let{name:s,value:n}=t;t.type==="tel"&&(n=t.value.replace(/[\(\)\-\s]/g,"")),this._updateProfile(s,n,()=>{this._sendDoneStepEvent()})}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleCityChange(e){this._handleCityInputChange(e),this._debounceCityChange(e)}_handleCityInputChange(e){this.city=e.target.value}_handleSuggestions(e){e.features.length<1&&(this.locationError=this.t.no_locations_found),this.locations=e.features}_handleLocationSelection(e){this.city=e.target.dataset.placeName;const t=getLocationGridFromMapbox(e.target.id,zumeProfile.profile.location);this.localValue=t,this._clearLocations()}_handleSubmitLocation(){if(this.localValue.source==="ip"){const{label:e,level:t,lat:s,lng:n}=this.localValue;this.localValue={source:"user",grid_id:!1,label:e,level:t,lat:Number(s),lng:Number(n)}}this._updateProfile("location_grid_meta",this.localValue,()=>{this._sendDoneStepEvent()})}_updateProfile(e,t,s=()=>{}){this.loading=!0;const n={[e]:t};fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(n),headers:{"X-WP-Nonce":jsObject.nonce}}).then(o=>o.json()).then(o=>{zumeProfile.profile=o,s()}).catch(o=>{console.error(o)}).finally(()=>{this.loading=!1})}_clearLocations(){this.locations=[]}createRenderRoot(){return this}}window.customElements.define("complete-profile",lt);class ct extends d{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},inviteCode:{type:String}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.t={},this.inviteCode="123456",this.url=`https://zume5.test/zume_app/plan_invite${this.inviteCode!==""?"?code="+this.inviteCode:""}`}render(){return a`
            <div class="center stack">
                <h2>${this.t.title}</h2>
                <p>${this.t.share_with_friends}</p>
                <share-links url=${this.url} title="${this.t.join_my_plan}" .t=${this.t}></share-links>
            </div>
        `}createRenderRoot(){return this}}window.customElements.define("invite-friends",ct);class ht extends d{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},errorMessage:{attribute:!1},message:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.state={},this.errorMessage="",this.message="",this.loading=!1,this.contactPreferences=["email","text","phone","whatsapp","signal","telegram","messenger"]}firstUpdated(){this.message=this.t.connect_success;const e=this.stateManager.getAll();if(this.variant===l.connectingToCoach){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));const t=(n=>{n===!1&&(this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting)),n.coach_request&&n.coach_request.errors&&Object.keys(n.coach_request.errors).length!==0&&Object.keys(n.coach_request.errors)[0]==="already_has_coach"&&(this.message=this.t.already_coached,this.setErrorMessage(this.t.error_connecting)),this._handleFinish()}).bind(this),s=(()=>{this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting),this._handleFinish()}).bind(this);makeRequest("POST","get_a_coach",{data:e},"zume_system/v1/").done(t).fail(s).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return this.stateManager||(this.stateManager=new we(this.module),this.state=this.stateManager.get(this.variant)||{},this.variant===l.languagePreferences&&!this.state.value&&(this.state.value=zumeProfile.profile.preferred_language||"en",this.stateManager.add(this.variant,this.state)),this.variant===l.contactPreferences&&Object.keys(this.state).length===0&&(this.state=Object.fromEntries(zumeProfile.profile.contact_preference.map(e=>[e,"true"])))),a`
        <form class="inputs stack-2" @submit=${this._handleDone}>
            ${this.variant===l.contactPreferences?a`
                <h2>${this.t.contact_preference_question}</h2>
                <div class="stack center container-sm | align-items-start text-start">
                    ${this.contactPreferences.map(e=>a`
                        <div>
                            <input type="checkbox" name="contact-preference" id=${e} value=${e} @change=${this._handleChange} ?checked=${!!this.state[e]} />
                            <label for=${e}>${this.t[e]}</label>
                        </div>
                    `)}
                </div>
            `:""}

            ${this.variant===l.languagePreferences?a`
                <h2>${this.t.language_preference_question}</h2>
                <div class="stack">
                    <label for="preferred-language">${this.t.language_preference}</label>
                    <select name="preferred-language" id="preferred-language" @change=${this._handleChange} >

                        ${Object.values(jsObject.languages).map(e=>a`
                            <option value=${e.code} ?selected=${e.code===this.state.value} >
                                ${e.nativeName} - ${e.enDisplayName}
                            </option>
                        `)}

                    </select>
                </div>
            `:""}

            ${this.variant===l.howCanWeServe?a`
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
            ${this.variant===l.connectingToCoach?a`

                <h1>${this.t.connecting_coach_title}</h1>
                <p>${this.message}</p>
                <span class="loading-spinner ${this.loading?"active":""}"></span>
            `:""}
            ${this.variant!==l.connectingToCoach?a`
                    <div class="cluster | mx-auto">
                        <span class="loading-spinner ${this.loading?"active":""}"></span>
                        <button type="submit" class="btn" ?disabled=${this.loading}>${this.t.next}</button>
                    </div>
                `:""}
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        </form>
        `}_handleDone(e){if(e&&e.preventDefault(),Object.keys(this.state).length===0){this.setErrorMessage(this.t.missing_response);return}this._sendDoneStepEvent()}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleFinish(){setTimeout(()=>{this._sendDoneStepEvent()},3e3)}_handleChange(e){e.target.type==="checkbox"&&(this.state[e.target.value]=e.target.checked),e.target.type==="text"&&(this.state.value=e.target.value),e.target.type==="select-one"&&(this.state.value=e.target.value),this.stateManager.add(this.variant,this.state)}createRenderRoot(){return this}}customElements.define("request-coach",ht);class dt extends d{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.showTrainings=!1,this.loading=!1}firstUpdated(){const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.loading=!1,this.showTrainings=!0;return}const t=e.searchParams.get("code");this.connectToPlan(t)}connectToPlan(e){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait,this.code=e,makeRequest("POST","connect/public-plan",{code:e},"zume_system/v1").then(t=>{console.log(t),this.message=this.t.success.replace("%s",t.name),this._sendDoneStepEvent()}).fail(({responseJSON:t})=>{console.log(t),this.message="",t.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}_handleChosenTraining(e){console.log(e);const{code:t}=e.detail;this.showTrainings=!1,this.connectToPlan(t)}render(){return a`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            ${this.showTrainings?a`
                <public-trainings .t=${this.t} @chosen-training=${this._handleChosenTraining}></public-trainings>
            `:""}
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("join-training",dt);class ut extends d{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1;return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","connect/plan",{code:t},"zume_system/v1").then(s=>{console.log(s),this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return a`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("join-friends-training",ut);class pt extends d{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","connect/friend",{code:t},"zume_system/v1").then(s=>{console.log(s),this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_friend_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return a`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("connect-friend",pt);class gt extends d{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","checkin",{code:t},"zume_system/v1").then(s=>{this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_checkin_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){console.log(e),this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return a`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("session-checkin",gt);class mt extends d{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},errorMessage:{attribute:!1},message:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.state={},this.errorMessage="",this.message="",this.loading=!1}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return a`
            ${this.variant===l.howManySessions?a`
                <h2>Will you do 1 or 2 hour training sessions?</h2>
                <div class="stack">
                    <button class="btn" @click=${this._handleDone}>1 hour (20 sessions)</button>
                    <button class="btn" @click=${this._handleDone}>2 hour (10 sessions)</button>
                </div>
            `:""}
            ${this.variant===l.whatTimeOfDay?a`
                <h2>What time of day?</h2>
                <div class="stack">
                    <button class="btn" @click=${this._handleDone}>Morning</button>
                    <button class="btn" @click=${this._handleDone}>Afternoon</button>
                    <button class="btn" @click=${this._handleDone}>Evening</button>
                </div>
            `:""}
            ${this.variant===l.howOften?a`
                <h2>How often will you meet?</h2>
                <div class="stack">
                    <button class="btn" @click=${this._handleDone}>Every day</button>
                    <button class="btn" @click=${this._handleDone}>Once a week</button>
                    <button class="btn" @click=${this._handleDone}>Twice a month</button>
                    <button class="btn" @click=${this._handleDone}>Once a month</button>
                </div>
            `:""}
            ${this.variant===l.startDate?a`
                <h2>When do you plan to start?</h2>
                <input type="date">
                <button class="btn" @click=${this._handleDone}>Done</button>
            `:""}

        `}_handleDone(e){e&&e.preventDefault(),this._sendDoneStepEvent()}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleFinish(){setTimeout(()=>{this._sendDoneStepEvent()},3e3)}createRenderRoot(){return this}}customElements.define("make-group",mt);function bt(i){return i?JSON.parse('{"'+i.substring(1).replace(/&/g,'","').replace(/=/g,'":"')+'"}'):{}}function vt(i,e){let t={};const s=i.split("/").filter(o=>o!=""),n=e.split("/").filter(o=>o!="");return s.map((o,r)=>{/^:/.test(o)&&(t[o.substring(1)]=n[r])}),t}function ft(i){return i?new RegExp("^(|/)"+i.replace(/:[^\s/]+/g,"([\\wÀ-ÖØ-öø-ÿ-]+)")+"(|/)$"):new RegExp("(^$|^/$)")}function $t(i,e){if(ft(e).test(i))return!0}function _t(i){return class extends i{static get properties(){return{route:{type:String,reflect:!0,attribute:"route"},canceled:{type:Boolean}}}constructor(...e){super(...e),this.route="",this.canceled=!1}connectedCallback(...e){super.connectedCallback(...e),this.routing(this.constructor.routes,(...t)=>this.router(...t)),window.addEventListener("route",()=>{this.routing(this.constructor.routes,(...t)=>this.router(...t))}),window.onpopstate=()=>{window.dispatchEvent(new CustomEvent("route"))}}routed(e,t,s,n,o,r){r&&r(e,t,s,n),o(e,t,s,n)}routing(e,t){this.canceled=!0;const s=decodeURI(window.location.pathname),n=decodeURI(window.location.search);let o=e.filter(c=>c.pattern==="*")[0],r=e.filter(c=>c.pattern!=="*"&&$t(s,c.pattern))[0],u=bt(n);r?(r.params=vt(r.pattern,s),r.data=r.data||{},r.authentication&&r.authentication.authenticate&&typeof r.authentication.authenticate=="function"?(this.canceled=!1,Promise.resolve(r.authentication.authenticate.bind(this).call()).then(c=>{this.canceled||(c?r.authorization&&r.authorization.authorize&&typeof r.authorization.authorize=="function"?(this.canceled=!1,Promise.resolve(r.authorization.authorize.bind(this).call()).then(h=>{this.canceled||(h?this.routed(r.name,r.params,u,r.data,t,r.callback):this.routed(r.authorization.unauthorized.name,r.params,u,r.data,t,r.callback))})):this.routed(r.name,r.params,u,r.data,t,r.callback):this.routed(r.authentication.unauthenticated.name,r.params,u,r.data,t,r.callback))})):r.authorization&&r.authorization.authorize&&typeof r.authorization.authorize=="function"?(this.canceled=!1,Promise.resolve(r.authorization.authorize.bind(this).call()).then(c=>{this.canceled||(c?this.routed(r.name,r.params,u,r.data,t,r.callback):this.routed(r.authorization.unauthorized.name,r.params,u,r.data,t,r.callback))})):this.routed(r.name,r.params,u,r.data,t,r.callback)):o&&(o.data=o.data||{},this.routed(o.name,{},u,o.data,t,o.callback))}}}function yt(i){return class extends i{navigate(e){window.history.pushState({},null,e),window.dispatchEvent(new CustomEvent("route"))}}}class M extends _t(d){static get properties(){return{route:{type:String},params:{type:Object},query:{type:Object}}}static get routes(){return[{name:"getting-started",pattern:`${zumeDashboard.base_url}/getting-started`,icon:"",data:{component:"dash-getting-started"}},{name:"training",pattern:`${zumeDashboard.base_url}/training`,icon:"",data:{component:"dash-training"}},{name:"practicing",pattern:`${zumeDashboard.base_url}/practicing`,icon:"",data:{component:"dash-practicing"}},{name:"my-coach",pattern:`${zumeDashboard.base_url}/my-coach`,parent:"practicing",icon:"zume-coach",translation:"my_coach",data:{component:"dash-coach"}},{name:"my-tools",pattern:`${zumeDashboard.base_url}/my-tools`,parent:"practicing",icon:"zume-tools",translation:"my_tools",data:{component:"dash-tools"}},{name:"my-plans",pattern:`${zumeDashboard.base_url}/my-plans`,parent:"practicing",icon:"zume-plans",translation:"my_plans",data:{component:"dash-plans"}},{name:"my-churches",pattern:`${zumeDashboard.base_url}/my-churches`,parent:"practicing",icon:"zume-churches",translation:"my_churches",data:{component:"dash-churches"}},{name:"my-maps",pattern:`${zumeDashboard.base_url}/my-maps`,parent:"practicing",icon:"zume-location",translation:"my_maps",data:{component:"dash-maps"}},{name:"not-found",pattern:"*",icon:"",data:{component:"dash-not-found"}}]}static childRoutesOf(e){return M.routes.filter(({parent:s})=>s===e)}constructor(){super(),this.route="",this.params={},this.query={},this.data={},this.addEventListener("route",e=>{console.log(e)})}router(e,t,s,n){this.route=e,this.params=t,this.query=s,this.data=n}makeHref(e){return`${zumeDashboard.base_url}/${e}`}makeHrefRoute(e){const s=M.routes.find(({name:n})=>n===e);return s?s.pattern:(console.error("MISSING ROUTE",e),"")}renderRoute(){const{component:e}=this.data;return e?document.createElement(e):""}render(){return a`
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
                        <ul class="nested">
                            ${M.childRoutesOf("practicing").map(e=>a`
                                        <li>
                                            <nav-link
                                                class="menu-btn"
                                                href=${this.makeHrefRoute(e.name)}
                                                icon=${e.icon}
                                                text=${zumeDashboard.translations[e.translation]}
                                            ></nav-link>
                                        </li>
                                    `)}
                        </ul>
                    </li>
                </ul>
            </div>

            ${this.renderRoute()}
        </div>
        `}createRenderRoot(){return this}}customElements.define("dash-board",M);class kt extends d{render(){return a`
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
        `}createRenderRoot(){return this}}customElements.define("dash-churches",kt);class St extends d{render(){return a`
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
        `}createRenderRoot(){return this}}customElements.define("dash-coach",St);class wt extends d{render(){return a`
            <div class="dashboard__header">
            </div>

            <div class="dashboard__main">
            </div>

            <div class="dashboard__secondary">
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-content",wt);class Et extends d{render(){return a`
            <div class="stack | card cta">
                <h2 class="h5 text-center">${zumeDashboard.translations.get_a_coach}</h2>
                <p>Don't forget about our free coaching</p>
                <a href="#" class="btn light uppercase">${zumeDashboard.translations.get_a_coach}</a>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-cta",Et);class xt extends d{render(){return a`
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
        `}createRenderRoot(){return this}}customElements.define("dash-getting-started",xt);class Ct extends d{render(){return a`
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
        `}createRenderRoot(){return this}}customElements.define("dash-maps",Ct);class At extends d{render(){return a`
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
        `}createRenderRoot(){return this}}customElements.define("dash-not-found",At);class Dt extends d{render(){return a`
            <div class="dashboard__content">
                <div class="dashboard__header">
                    <h1 class="h3">Plans</h1>
                    <launch-course></launch-course>
                </div>
                <div class="dashboard__main">
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-plans",Dt);class Pt extends d{constructor(){super(),this.routeName="practicing",this.routes=M.childRoutesOf("practicing")}render(){return a`
            <div class="dashboard__content">
                <div class="dashboard__header">
                    <h1 class="h3">Practicing</h1>
                    <launch-course></launch-course>
                </div>
                <div class="dashboard__main p-1">
                    <div class="nav-grid">
                        ${this.routes.map(e=>a`
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
        `}createRenderRoot(){return this}}customElements.define("dash-practicing",Pt);class Rt extends d{render(){return a`
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
        `}createRenderRoot(){return this}}customElements.define("dash-tools",Rt);class zt extends d{render(){return a`
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
        `}createRenderRoot(){return this}}customElements.define("dash-training",zt);class Te extends yt(d){static get properties(){return{href:{type:String},class:{type:String},disabled:{type:Boolean},completed:{type:Boolean},directLink:{type:Boolean},icon:{type:String},text:{type:String}}}constructor(){super(),this.href="",this.class="",this.icon="",this.text="",this.disabled=!1,this.completed=!1,this.directLink=!1}handleClick(e){this.directLink||(e.preventDefault(),this.navigate(this.href))}printBool(e){return e?"true":"false"}render(){return a`
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
        `}createRenderRoot(){return this}}customElements.define("nav-link",Te);class Tt extends Te{constructor(){super()}render(){return a`
            <a
                href=${this.href}
                class="card-btn grid-link"
                role="button"
                @click=${this.handleClick}
                aria-disabled=${this.printBool(this.disabled)}
                data-completed=${this.printBool(this.completed)}
            >
                <span class="icon ${this.icon} brand-light"></span>
                <span>${this.text}</span>
            </a>
        `}}customElements.define("grid-link",Tt);class Mt extends d{render(){return a`
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
        `}createRenderRoot(){return this}}customElements.define("launch-course",Mt);class Ot extends d{static get properties(){return{title:{type:String},sections:{type:Array}}}render(){return a`
            <div class="container">
                <h1 class="text-center">${this.title}</h1>
                ${this.sections.map((e,t)=>a`
                        <course-section .section=${e}></course-section>
                    `)}
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-guide",Ot);const ke=["slideshow","guide"];class jt extends d{static get properties(){return{languageCode:{type:String},homeUrl:{type:String},assetsPath:{type:String},translations:{type:Object},zumeSessions:{attribute:!1},lessonIndex:{attribute:!1},view:{attribute:!1},linkNodes:{attribute:!1},showIndex:{attribute:!1}}}constructor(){super();const e=new URL(window.location.href),t=this.getZumeSessions(e);this.zumeSessions=t;const s=this.getLessonIndex(e);this.lessonIndex=s,this.view=this.getView(e),this.changeSession(s,!1,t),this.handleSessionLink=this.handleSessionLink.bind(this),this.handleHistoryPopState=this.handleHistoryPopState.bind(this),window.addEventListener("popstate",this.handleHistoryPopState),document.querySelectorAll(".language-selector").forEach(function(o){o.addEventListener("click",()=>{const r=o.dataset.value,u=new URL(location.href),c=u.pathname.substring(1).split("/");let h="";c.length>0&&jsObject.zume_languages.includes(c[0])?h=c.slice(1).join("/"):h=c.join("/"),r!=="en"?h="/"+r+"/"+h:h="/"+h,h+=u.search,location.href=h})})}getView(e){if(e.searchParams.has("view")){const t=e.searchParams.get("view");if(ke.includes(t))return t}else return"slideshow"}getLessonIndex(e){if(e.searchParams.has("session")){const t=e.searchParams.get("session");if(t==="index")return"index";const s=Number(t);return Number.isInteger(s)?s-1:0}else return 0}getZumeSessions(e){const t=e.searchParams.get("type")||"10";this.type=t;let s;switch(t){case"10":s=zume10Sessions;break;case"20":s=zume20Sessions;break;case"intensive":s=zumeIntensiveSessions;break;default:s=zume10Sessions;break}return s}handleSessionLink(e){const t=e.target,s=Number(t.dataset.sessionNumber);this.lessonIndex=s,this.showIndex===!0&&(this.showIndex=!1),this.changeSession(this.lessonIndex)}getNextSession(){this.lessonIndex+=1,this.changeSession(this.lessonIndex)}getPreviousSession(){this.lessonIndex-=1,this.changeSession(this.lessonIndex)}changeSession(e,t=!0,s=null){if(e==="index"){this.showIndex=!0;return}else this.showIndex=!1;const n=s||this.zumeSessions;let o=e;e<0&&(o=0),e>n.length-1&&(o=n.length-1),this.lessonIndex=o,this.session=n[o],t&&this.pushHistory()}pushHistory(){const e=this.lessonIndex,t=this.view,s=new URL(window.location.href);e!==null&&Number.isInteger(e)&&s.searchParams.set("session",e+1),t&&s.searchParams.set("view",t),window.history.pushState(null,null,s.href)}handleHistoryPopState(){var n;const e=new URL(location.href),t=e.searchParams.has("session")?e.searchParams.get("session"):null,s=e.searchParams.get("view");(n=document.querySelector(".js-off-canvas-overlay"))==null||n.classList.remove("is-visible"),Number.isInteger(Number(t))&&(this.lessonIndex=t-1,this.changeSession(this.lessonIndex,!1)),t==="index"&&(this.lessonIndex="index",this.changeSession("index",!1)),s&&ke.includes(s)&&(this.view=s)}getSessionTitle(){return!this.session||!this.session.t?"":this.session.t}getSessionSections(){return!this.session||!this.session.sections?[]:this.session.sections}switchViews(e=!0){this.view==="guide"?this.view="slideshow":this.view="guide",e===!0&&this.pushHistory({view:this.view})}openMenu(){const e=this.querySelector("#offCanvas");jQuery(e).foundation("open")}render(){const e=this.showIndex?"visually-hidden":"",t=this.type==="intensive"?"container-xsm":"container-sm";return a`
            ${this.showIndex?a`
                    <div class="course-index | bg-brand-gradient">
                        <img src="${jsObject.images_url}/zume-training-logo-white.svg" alt="Zume Logo" class="mx-auto w-70 py-1" />
                        <div class="${t}" data-max-width="750">
                            <div class="grid | grid-min-8rem gutter0">
                                ${this.zumeSessions.map((s,n)=>a`
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
                        ${this.zumeSessions.map((s,n)=>a`
                            <button
                                class="link session-link"
                                data-session-number="${n}"
                                @click=${this.handleSessionLink}
                            >
                                ${s.t}
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
                ${this.view==="guide"?a`<course-guide title="${this.getSessionTitle()}" .sections=${this.getSessionSections()}></course-guide>`:a`<course-slideshow title="${this.getSessionTitle()}" .sections=${this.getSessionSections()}></course-slideshow>`}
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-presenter",jt);class It extends d{static get properties(){return{section:{type:Object}}}constructor(){super()}render(){return this.title=this.section.t??null,this.description=this.section.d??null,this.info=this.section.info??null,this.duration=this.section.duration??null,this.parts=this.section.parts??[],a`
            ${this.title!==null?a`<h1>${this.title}</h1>`:""}
            ${this.description!==null?a`<p>${this.description}</p>`:""}
            ${this.info!==null?a`<p>${this.info}</p>`:""}
            ${this.duration!==null?a`<p>${this.duration}</p>`:""}

            ${this.parts.map(e=>a`<part-switcher .partData=${e}></part-switcher>`)}

        `}createRenderRoot(){return this}}customElements.define("course-section",It);class Lt extends d{static get properties(){return{title:{type:String},sections:{type:Array},sectionIndex:{attribute:!1},partIndex:{attribute:!1},currentSlide:{attribute:!1},index:{attribute:!1}}}constructor(){super(),this.reset(),this.listenForKeyboard=this.listenForKeyboard.bind(this),this.listenForMouseClick=this.listenForMouseClick.bind(this)}reset(){this.sectionIndex=-1,this.partIndex=-1,this.currentSlide=null,this.index=[]}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.listenForKeyboard),document.addEventListener("mousedown",this.listenForMouseClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.listenForKeyboard),document.removeEventListener("mousedown",this.listenForMouseClick)}attributeChangedCallback(e,t,s){super.attributeChangedCallback(e,t,s),e==="title"&&t!==s&&this.reset()}setupIndex(){this.sections&&(this.index=this.sections.map(e=>e.parts?e.parts.length:0))}nextSlide(){if(this.sectionIndex>this.sections.length-1&&(this.sectionIndex=this.sections.length-1),this.index[this.sectionIndex]===0||this.index[this.sectionIndex]===this.partIndex+1){if(this.sectionIndex===this.sections.length-1)return;this.setSlide(this.sectionIndex+1,-1);return}if(this.index[this.sectionIndex]>0){this.setSlide(this.sectionIndex,this.partIndex+1);return}}previousSlide(){if(this.sectionIndex<0&&(this.sectionIndex=0),this.index[this.sectionIndex]===0||this.partIndex===-1){if(this.sectionIndex===0)return;const e=this.index[this.sectionIndex-1]-1;this.setSlide(this.sectionIndex-1,e);return}this.setSlide(this.sectionIndex,this.partIndex-1)}listenForKeyboard(e){["Space","ArrowRight"].includes(e.code)&&this.nextSlide(),["Backspace","ArrowLeft"].includes(e.code)&&this.previousSlide()}listenForMouseClick(e){const{x:t}=e,{innerWidth:s}=window,n=10/100*s+80;t<n&&(this.querySelector(".clickable-area.back").classList.add("visible"),this.previousSlide()),t>s-n&&(this.querySelector(".clickable-area.forward").classList.add("visible"),this.nextSlide())}setSlide(e,t){if(this.sectionIndex=e,this.partIndex=t,t<0){const s=this.sections[e];this.currentSlide=a`<section-part .partData=${s}></section-part>`}else{const s=this.sections[e].parts[t];this.currentSlide=a`<part-switcher .partData=${s}></part-switcher>`}}render(){return this.index.length===0&&this.setupIndex(),this.sectionIndex<0&&this.setSlide(0,-1),a`
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

        `}createRenderRoot(){return this}}customElements.define("course-slideshow",Lt);class Nt extends d{static get properties(){return{partData:{type:Object}}}render(){switch(this.partData.type){case"section":return a`<section-part .partData=${this.partData}></section-part>`;case"watch":return a`<watch-part .partData=${this.partData}></watch-part>`;case"discuss":return a`<discuss-part .partData=${this.partData}></discuss-part>`;case"read":return a`<read-part .partData=${this.partData}></read-part>`;case"see":return a`<see-part .partData=${this.partData}></see-part>`;case"share":return a`<share-part .partData=${this.partData}></share-part>`;case"listen":return a`<listen-part .partData=${this.partData}></listen-part>`;case"form":return a`<form-part .partData=${this.partData}></form-part>`;case"checkin":return a`<checkin-part .partData=${this.partData}></checkin-part>`;case"cta":default:return a`<basic-part .partData=${this.partData}></basic-part>`}}createRenderRoot(){return this}}customElements.define("part-switcher",Nt);class Ft extends d{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("basic-part",Ft);class Ht extends d{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}

            <div><img class="mx-auto" src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&amp;color=323a68&amp;data=https://zume5.training/zume_app/checkin/?code=5678" width="300px" alt="QR Code"></div>
            <p>
                or <br>
                zume.training/checkin and use code <strong class="text-lightblue"><a href="https://zume5.training/zume_app/checkin/?code=5678" target="_blank">5678</a></strong>
            </p>
        `}createRenderRoot(){return this}}customElements.define("checkin-part",Ht);class Ut extends d{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("discuss-part",Ut);class qt extends d{static get properties(){return{partData:{type:Object}}}render(){return this.partData.t,this.partData.d,this.partData.info,a`
            ${this.title!==null?a`<h2>${this.title}</h2>`:""}
            ${this.description!==null?a`<p>${this.description}</p>`:""}
            ${this.info!==null?a`<p>${this.info}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("form-part",qt);class Wt extends d{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            <h2 class="brand">LISTEN</h2>
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("listen-part",Wt);class Bt extends d{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            <h2 class="brand">READ</h2>
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("read-part",Bt);class Vt extends d{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            ${e!==null?a`<h2>${e}</h2>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("section-part",Vt);class Jt extends d{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            <h2 class="brand">SEE</h2>
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("see-part",Jt);class Zt extends d{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("share-part",Zt);class Gt extends d{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("watch-part",Gt);class Me extends d{constructor(){super()}render(){return a`
            <div class="container">
                <div class="circle">
                    <div class="triangle"></div>
                </div>
            </div>
        `}}E(Me,"styles",He`
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
    `);window.customElements.define("play-button",Me);class Kt extends d{constructor(){super();E(this,"webShareSupported",!!window.navigator.share);E(this,"clipboardSupported",!!window.navigator.clipboard);this.shareFeedback="",this.copyFeedback=""}static get properties(){return{url:{type:String},title:{type:String},t:{type:Object},shareFeedback:{attribute:!1},copyFeedback:{attribute:!1}}}share(){navigator.share({title:this.title,url:this.url,text:title}).then(()=>{this.shareFeedback=this.t.share_feedback,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(t=>console.error("Error sharing",t))}copyLink(){navigator.clipboard.writeText(this.url).then(()=>{this.copyFeedback=this.t.copy_feedback,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(t=>console.error(t))}noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported}render(){return a`
            <div id="share" tabindex="-1" class="stack--2">
              ${this.noOptionsAvailable()?a`
                  <div class="stack--2">
                    <p>${this.t.copy_and_share_text}</p>
                    <p class=""><code>${this.url}</code></p>
                  </div>
              `:a`
                  <div :class="cluster gap--1">
                    ${this.webShareSupported?a`
                        <div class="position-relative">
                          <button class="btn" @click=${this.share}>
                            <!-- Share icon -->
                            <span>${this.t.share}</span>
                          </button>
                          <p role="alert" aria-live="polite" id="shareFeedback" class="context-alert" data-state=${this.shareFeedback.length?"":"empty"}>${this.shareFeedback}</p>
                        </div>
                    `:""}
                    ${this.clipboardSupported?a`
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
        `}createRenderRoot(){return this}}customElements.define("share-links",Kt);class Yt extends d{static get properties(){return{t:{type:Object},joinLink:{type:String},loading:{attribute:!1},posts:{attribute:!1}}}constructor(){super(),this.loading=!0,this.plans=[],this.getTrainings(),this.renderRow=this.renderRow.bind(this)}getTrainings(){makeRequest("POST","public_plans",{},"zume_system/v1").then(e=>{this.plans=e}).catch(e=>{console.log(e)}).always(()=>{this.loading=!1})}render(){return this.loading?a`<span class="loading-spinner active"></span>`:a`
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
        `}renderRow({join_key:e,language_note:t,post_title:s,time_of_day_note:n,timezone_note:o,...r}){const u=r.set_a_01?"a":"b",c=u==="a"?10:20,h=`set_${u}_`,f=Date.now()/1e3;let p="";for(let v=1;v<c+1;v++){const C=v<10?`0${v}`:`${v}`,w=r[h+C];if(p=w.timestamp,f<w.timestamp)break}const g=moment(p*1e3).format("MMM Do 'YY");return a`
            <tr>
                <td data-label="${this.t.name}">${s}</td>
                <td data-label="${this.t.next_date}">${g}</td>
                <td data-label="${this.t.start_time}">${n}</td>
                <td data-label="${this.t.timezone}">${o}</td>
                <td data-label="${this.t.language}">${t}</td>
                <td><button class="btn" data-code=${e} @click=${this._handleJoinTraining}>${this.t.join}</button></td>
            </tr>
        `}_handleJoinTraining(e){console.log(e);const t=e.target.dataset.code,s=new CustomEvent("chosen-training",{bubbles:!0,detail:{code:t}});this.dispatchEvent(s)}createRenderRoot(){return this}}customElements.define("public-trainings",Yt);class Xt extends d{static get properties(){return{radius:{type:Number},lineWidth:{type:Number},percent:{type:Number}}}constructor(){super(),this.radius=100,this.lineWidth=10,this.percent=30}width(){return this.radius*2+this.lineWidth}widthPx(){return this.appendPx(this.width())}center(){return this.width()/2}circumference(){return this.radius*2*Math.PI}circumferencePx(){return this.appendPx(this.circumference())}appendPx(e){return`${e}px`}render(){return a`
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
        `}createRenderRoot(){return this}}customElements.define("progress-circle",Xt);const Se=document.querySelector(".nav-toggle"),Qt=document.querySelector("#nav");Se&&Se.addEventListener("click",i=>{Qt.classList.toggle("nav--visible")});const es=({title:i,url:e,copyFeedback:t,shareFeedback:s})=>({title:i,url:e,webShareSupported:navigator.share,clipboardSupported:navigator.clipboard,shareFeedback:"",copyFeedback:"",noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported},share(){navigator.share({title:i,url:e,text:i}).then(()=>{this.shareFeedback=s,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(n=>console.error("Error sharing",n))},copyLink(){navigator.clipboard.writeText(e).then(()=>{this.copyFeedback=t,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(n=>console.error(n))}});window.zumeInitShareLinks=()=>{Ie({share:es}).mount()};
//# sourceMappingURL=main-f8285af3.js.map
