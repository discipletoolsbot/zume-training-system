var dt=Object.defineProperty;var ht=(i,e,t)=>e in i?dt(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var k=(i,e,t)=>(ht(i,typeof e!="symbol"?e+"":e,t),t),ce=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)};var z=(i,e,t)=>(ce(i,e,"read from private field"),t?t.call(i):e.get(i)),L=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},de=(i,e,t,s)=>(ce(i,e,"write to private field"),s?s.call(i,t):e.set(i,t),t);var q=(i,e,t)=>(ce(i,e,"access private method"),t);var $e;let ut=($e=class{static save(e,t){localStorage.setItem(this.createKey(e),JSON.stringify(t))}static load(e){const t=localStorage.getItem(this.createKey(e));try{return JSON.parse(t)}catch{return t}}static createKey(e){return this.prefix+e}},k($e,"prefix","Z5_"),$e);window.ZumeStorage=ut;var j,ne,Be,ae,We,re,Qe,G,ye;class Fe{constructor(e){L(this,ne);L(this,ae);L(this,re);L(this,G);k(this,"WIZARD_STATE_NAME","zume_wizard_state");k(this,"STALE_LIFESPAN",10*60*1e3);k(this,"MAX_LIFESPAN",60*60*1e3);L(this,j,void 0);this.moduleName=e,de(this,j,q(this,ne,Be).call(this))}empty(){return Object.keys(z(this,j).data).length===0}isDataStale(){return q(this,G,ye).call(this,z(this,j),this.STALE_LIFESPAN)}get(e){return z(this,j).data[e]}getAll(){return z(this,j).data}add(e,t){z(this,j).data[e]=t,q(this,re,Qe).call(this),localStorage.setItem(this.WIZARD_STATE_NAME,JSON.stringify(z(this,j)))}clear(){de(this,j,null),localStorage.removeItem(this.WIZARD_STATE_NAME)}}j=new WeakMap,ne=new WeakSet,Be=function(){const e=q(this,ae,We).call(this);return e&&!q(this,G,ye).call(this,e,this.MAX_LIFESPAN)?e:{module:this.moduleName,data:{},timestamp:Date.now()}},ae=new WeakSet,We=function(){return JSON.parse(localStorage.getItem(this.WIZARD_STATE_NAME))},re=new WeakSet,Qe=function(){z(this,j).timestamp=Date.now()},G=new WeakSet,ye=function(e,t){return Date.now()-e.timestamp>t};const S={gettingStarted:"getting-started",makeAGroup:"make-a-group",getACoach:"get-a-coach",joinATraining:"join-a-training",connectWithFriend:"connect-with-friend",joinFriendsPlan:"join-friends-training",checkin:"checkin",setProfile:"set-profile",joinCommunity:"join-the-community"},$={completeProfile:"completeProfile",makePlan:"makePlan",inviteFriends:"inviteFriends",getACoach:"getACoach",joinTraining:"joinTraining",connectFriend:"connectFriend",joinFriendsTraining:"joinFriendsTraining",checkin:"checkin",planDecision:"planDecision",joinCommunity:"joinCommunity"},pt={howManySessions:"how-many-sessions",whatTimeOfDay:"what-time-of-day",howOften:"how-often",startDate:"what-start-date"},d={updateName:"update-your-name",updateLocation:"update-your-location",updatePhone:"update-your-phone",inviteFriends:"invite-friends",contactPreferences:"contact-preferences",languagePreferences:"preferred-language",howCanWeServe:"how-can-we-serve",connectingToCoach:"connecting-to-coach",joinTraining:"join-training",connectToFriend:"connect-friend",joinFriendsPlan:"join-friends-training",checkinSubmit:"checkin-submit",...pt},mt={[d.updateName]:{field:"name",testExistance:(i,e)=>e.has_set_name},[d.updateLocation]:{field:"location",testExistance:i=>!(i.source&&i.source==="ip")},[d.updatePhone]:{field:"phone",testExistance:i=>!!i}};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ee=window,we=ee.ShadowRoot&&(ee.ShadyCSS===void 0||ee.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ke=Symbol(),xe=new WeakMap;let Ze=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==ke)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(we&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=xe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&xe.set(t,e))}return e}toString(){return this.cssText}};const gt=i=>new Ze(typeof i=="string"?i:i+"",void 0,ke),bt=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((s,n,a)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[a+1],i[0]);return new Ze(t,i,ke)},vt=(i,e)=>{we?i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const s=document.createElement("style"),n=ee.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=t.cssText,i.appendChild(s)})},Ee=we?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return gt(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var he;const te=window,Oe=te.trustedTypes,ft=Oe?Oe.emptyScript:"",ze=te.reactiveElementPolyfillSupport,_e={toAttribute(i,e){switch(e){case Boolean:i=i?ft:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},Ke=(i,e)=>e!==i&&(e==e||i==i),ue={attribute:!0,type:String,converter:_e,reflect:!1,hasChanged:Ke};let N=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,s)=>{const n=this._$Ep(s,t);n!==void 0&&(this._$Ev.set(n,s),e.push(n))}),e}static createProperty(e,t=ue){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const s=typeof e=="symbol"?Symbol():"__"+e,n=this.getPropertyDescriptor(e,s,t);n!==void 0&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(n){const a=this[e];this[t]=n,this.requestUpdate(e,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||ue}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,s=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const n of s)this.createProperty(n,t[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const n of s)t.unshift(Ee(n))}else e!==void 0&&t.push(Ee(e));return t}static _$Ep(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,s;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((s=e.hostConnected)===null||s===void 0||s.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return vt(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var s;return(s=t.hostConnected)===null||s===void 0?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var s;return(s=t.hostDisconnected)===null||s===void 0?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$EO(e,t,s=ue){var n;const a=this.constructor._$Ep(e,s);if(a!==void 0&&s.reflect===!0){const r=(((n=s.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?s.converter:_e).toAttribute(t,s.type);this._$El=e,r==null?this.removeAttribute(a):this.setAttribute(a,r),this._$El=null}}_$AK(e,t){var s;const n=this.constructor,a=n._$Ev.get(e);if(a!==void 0&&this._$El!==a){const r=n.getPropertyOptions(a),l=typeof r.converter=="function"?{fromAttribute:r.converter}:((s=r.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?r.converter:_e;this._$El=a,this[a]=l.fromAttribute(t,r.type),this._$El=null}}requestUpdate(e,t,s){let n=!0;e!==void 0&&(((s=s||this.constructor.getPropertyOptions(e)).hasChanged||Ke)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),s.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,s))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((n,a)=>this[a]=n),this._$Ei=void 0);let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),(e=this._$ES)===null||e===void 0||e.forEach(n=>{var a;return(a=n.hostUpdate)===null||a===void 0?void 0:a.call(n)}),this.update(s)):this._$Ek()}catch(n){throw t=!1,this._$Ek(),n}t&&this._$AE(s)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(s=>{var n;return(n=s.hostUpdated)===null||n===void 0?void 0:n.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,s)=>this._$EO(s,this[s],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};N.finalized=!0,N.elementProperties=new Map,N.elementStyles=[],N.shadowRootOptions={mode:"open"},ze==null||ze({ReactiveElement:N}),((he=te.reactiveElementVersions)!==null&&he!==void 0?he:te.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pe;const se=window,F=se.trustedTypes,Te=F?F.createPolicy("lit-html",{createHTML:i=>i}):void 0,ie="$lit$",E=`lit$${(Math.random()+"").slice(9)}$`,Se="?"+E,$t=`<${Se}>`,B=document,K=()=>B.createComment(""),V=i=>i===null||typeof i!="object"&&typeof i!="function",Ve=Array.isArray,Je=i=>Ve(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",me=`[ 	
\f\r]`,Q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ae=/-->/g,Pe=/>/g,A=RegExp(`>|${me}(?:([^\\s"'>=/]+)(${me}*=${me}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Me=/'/g,Re=/"/g,Ge=/^(?:script|style|textarea|title)$/i,Ye=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),o=Ye(1),X=Ye(2),C=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),Ie=new WeakMap,H=B.createTreeWalker(B,129,null,!1),Xe=(i,e)=>{const t=i.length-1,s=[];let n,a=e===2?"<svg>":"",r=Q;for(let c=0;c<t;c++){const h=i[c];let g,u,p=-1,m=0;for(;m<h.length&&(r.lastIndex=m,u=r.exec(h),u!==null);)m=r.lastIndex,r===Q?u[1]==="!--"?r=Ae:u[1]!==void 0?r=Pe:u[2]!==void 0?(Ge.test(u[2])&&(n=RegExp("</"+u[2],"g")),r=A):u[3]!==void 0&&(r=A):r===A?u[0]===">"?(r=n??Q,p=-1):u[1]===void 0?p=-2:(p=r.lastIndex-u[2].length,g=u[1],r=u[3]===void 0?A:u[3]==='"'?Re:Me):r===Re||r===Me?r=A:r===Ae||r===Pe?r=Q:(r=A,n=void 0);const f=r===A&&i[c+1].startsWith("/>")?" ":"";a+=r===Q?h+$t:p>=0?(s.push(g),h.slice(0,p)+ie+h.slice(p)+E+f):h+E+(p===-2?(s.push(void 0),c):f)}const l=a+(i[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return[Te!==void 0?Te.createHTML(l):l,s]};class J{constructor({strings:e,_$litType$:t},s){let n;this.parts=[];let a=0,r=0;const l=e.length-1,c=this.parts,[h,g]=Xe(e,t);if(this.el=J.createElement(h,s),H.currentNode=this.el.content,t===2){const u=this.el.content,p=u.firstChild;p.remove(),u.append(...p.childNodes)}for(;(n=H.nextNode())!==null&&c.length<l;){if(n.nodeType===1){if(n.hasAttributes()){const u=[];for(const p of n.getAttributeNames())if(p.endsWith(ie)||p.startsWith(E)){const m=g[r++];if(u.push(p),m!==void 0){const f=n.getAttribute(m.toLowerCase()+ie).split(E),y=/([.?@])?(.*)/.exec(m);c.push({type:1,index:a,name:y[2],strings:f,ctor:y[1]==="."?tt:y[1]==="?"?st:y[1]==="@"?it:Y})}else c.push({type:6,index:a})}for(const p of u)n.removeAttribute(p)}if(Ge.test(n.tagName)){const u=n.textContent.split(E),p=u.length-1;if(p>0){n.textContent=F?F.emptyScript:"";for(let m=0;m<p;m++)n.append(u[m],K()),H.nextNode(),c.push({type:2,index:++a});n.append(u[p],K())}}}else if(n.nodeType===8)if(n.data===Se)c.push({type:2,index:a});else{let u=-1;for(;(u=n.data.indexOf(E,u+1))!==-1;)c.push({type:7,index:a}),u+=E.length-1}a++}}static createElement(e,t){const s=B.createElement("template");return s.innerHTML=e,s}}function I(i,e,t=i,s){var n,a,r,l;if(e===C)return e;let c=s!==void 0?(n=t._$Co)===null||n===void 0?void 0:n[s]:t._$Cl;const h=V(e)?void 0:e._$litDirective$;return(c==null?void 0:c.constructor)!==h&&((a=c==null?void 0:c._$AO)===null||a===void 0||a.call(c,!1),h===void 0?c=void 0:(c=new h(i),c._$AT(i,t,s)),s!==void 0?((r=(l=t)._$Co)!==null&&r!==void 0?r:l._$Co=[])[s]=c:t._$Cl=c),c!==void 0&&(e=I(i,c._$AS(i,e.values),c,s)),e}class et{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:s},parts:n}=this._$AD,a=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:B).importNode(s,!0);H.currentNode=a;let r=H.nextNode(),l=0,c=0,h=n[0];for(;h!==void 0;){if(l===h.index){let g;h.type===2?g=new W(r,r.nextSibling,this,e):h.type===1?g=new h.ctor(r,h.name,h.strings,this,e):h.type===6&&(g=new nt(r,this,e)),this._$AV.push(g),h=n[++c]}l!==(h==null?void 0:h.index)&&(r=H.nextNode(),l++)}return a}v(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class W{constructor(e,t,s,n){var a;this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=n,this._$Cp=(a=n==null?void 0:n.isConnected)===null||a===void 0||a}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=I(this,e,t),V(e)?e===_||e==null||e===""?(this._$AH!==_&&this._$AR(),this._$AH=_):e!==this._$AH&&e!==C&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):Je(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==_&&V(this._$AH)?this._$AA.nextSibling.data=e:this.$(B.createTextNode(e)),this._$AH=e}g(e){var t;const{values:s,_$litType$:n}=e,a=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=J.createElement(n.h,this.options)),n);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===a)this._$AH.v(s);else{const r=new et(a,this),l=r.u(this.options);r.v(s),this.$(l),this._$AH=r}}_$AC(e){let t=Ie.get(e.strings);return t===void 0&&Ie.set(e.strings,t=new J(e)),t}T(e){Ve(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,n=0;for(const a of e)n===t.length?t.push(s=new W(this.k(K()),this.k(K()),this,this.options)):s=t[n],s._$AI(a),n++;n<t.length&&(this._$AR(s&&s._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,t);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class Y{constructor(e,t,s,n,a){this.type=1,this._$AH=_,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=a,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=_}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,s,n){const a=this.strings;let r=!1;if(a===void 0)e=I(this,e,t,0),r=!V(e)||e!==this._$AH&&e!==C,r&&(this._$AH=e);else{const l=e;let c,h;for(e=a[0],c=0;c<a.length-1;c++)h=I(this,l[s+c],t,c),h===C&&(h=this._$AH[c]),r||(r=!V(h)||h!==this._$AH[c]),h===_?e=_:e!==_&&(e+=(h??"")+a[c+1]),this._$AH[c]=h}r&&!n&&this.j(e)}j(e){e===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===_?void 0:e}}const yt=F?F.emptyScript:"";class st extends Y{constructor(){super(...arguments),this.type=4}j(e){e&&e!==_?this.element.setAttribute(this.name,yt):this.element.removeAttribute(this.name)}}class it extends Y{constructor(e,t,s,n,a){super(e,t,s,n,a),this.type=5}_$AI(e,t=this){var s;if((e=(s=I(this,e,t,0))!==null&&s!==void 0?s:_)===C)return;const n=this._$AH,a=e===_&&n!==_||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==_&&(n===_||a);a&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,s;typeof this._$AH=="function"?this._$AH.call((s=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&s!==void 0?s:this.element,e):this._$AH.handleEvent(e)}}class nt{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){I(this,e)}}const _t={O:ie,P:E,A:Se,C:1,M:Xe,L:et,D:Je,R:I,I:W,V:Y,H:st,N:it,U:tt,F:nt},Le=se.litHtmlPolyfillSupport;Le==null||Le(J,W),((pe=se.litHtmlVersions)!==null&&pe!==void 0?pe:se.litHtmlVersions=[]).push("2.7.3");const wt=(i,e,t)=>{var s,n;const a=(s=t==null?void 0:t.renderBefore)!==null&&s!==void 0?s:e;let r=a._$litPart$;if(r===void 0){const l=(n=t==null?void 0:t.renderBefore)!==null&&n!==void 0?n:null;a._$litPart$=r=new W(e.insertBefore(K(),l),l,void 0,t??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ge,be;let b=class extends N{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const s=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=s.firstChild),s}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=wt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return C}};b.finalized=!0,b._$litElement$=!0,(ge=globalThis.litElementHydrateSupport)===null||ge===void 0||ge.call(globalThis,{LitElement:b});const qe=globalThis.litElementPolyfillSupport;qe==null||qe({LitElement:b});((be=globalThis.litElementVersions)!==null&&be!==void 0?be:globalThis.litElementVersions=[]).push("3.3.2");class kt extends b{static get properties(){return{type:{type:String},finishUrl:{type:String},user:{type:Object},translations:{type:Object},noUrlChange:{type:Boolean},step:{attribute:!1},steps:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.stepIndex=0,this.steps=[],this.modules={},this.step={},this.t=window.SHAREDFUNCTIONS.escapeObject(jsObject.translations),this._handleHistoryPopState=this._handleHistoryPopState.bind(this),window.addEventListener("popstate",this._handleHistoryPopState),this.stateManager=new Fe}resetWizard(){this.modules={}}firstUpdated(){this.translations&&(this.t=window.SHAREDFUNCTIONS.escapeObject(this.translations))}willUpdate(e){e.has("type")&&this.type===""&&this.resetWizard()}render(){if(!this.isWizardLoaded()){const e=this.getWizard(this.type);this.loadWizard(e),this._handleHistoryPopState(!0)}return this.isWizardTypeValid(this.type)?this.steps.length===0?o`
                <div class="cover-page">
                    <div class="stack center | text-center">
                        <h1 class="brand">${this.t.completed_wizard_title}</h1>
                        <p>${this.t.completed_wizard_text}</p>
                        ${this.finishButton()}
                    </div>
                </div>
            `:o`
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
        `:o`
                <div class="cover-page">
                    <div class="stack center | text-center">
                        <h1 class="brand">${this.t.bad_wizard}</h1>
                        <p>${this.t.found_bad_wizard}</p>
                        <div class="center"><img class="w-50" src="https://imgs.search.brave.com/3f3MurVApxsoxJlmqxLF0fs5-WlAk6sEu9IV3sICb_k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWR2ZXJ0aXNlY2Fz/dC5jb20vcG9kY2Fz/dC9pbWFnZS9WZXJ5/QmFkV2l6YXJkcw.jpeg" alt="bad wizards" /></div>
                        <a class="btn" href="/">${this.t.home}</a>
                    </div>
                </div>
            `}containerSize(){const e=this.steps[this.stepIndex];return(e.slug=d.joinTraining)?"container-md":"container-xsm"}currentStep(){const e=this.steps[this.stepIndex];return e.component(e,this.t,"w-100")}headerButtons(){const{skippable:e}=this.step,t=this.stepIndex===this.steps.length-1;return o`
        <div class="cluster | inline s-3">
            ${e&&!t?o`<button @click=${this._onSkip} class="brand">${this.t.skip}</button>`:""}
            ${!e&&!t&&!this.noUrlChange?o`
                    <button @click=${this._onQuit} class="d-flex">
                        <svg data-src="${jsObject.images_url+"/close-button-01.svg"}" class="h-2"></svg>
                    </button>
                    `:""}
        </div>
        `}finishButton(){return o`
            <div class="text-center d-flex justify-content-between">
                <div class="cluster ms-auto">
                    <button @click=${this._handleFinish} ?disabled=${this.loading} class="btn ${this.loading?"disabled":""}">${this.t.finish}</button>
                </div>
            </div>
        `}stepCounter(){return o`
            <div class="cluster">
                ${this.steps.map((e,t)=>{const s=t<=this.stepIndex;return o`<div class="step-circle ${s?"complete":""}"></div>`})}
            </div>
        `}footer(){return this.stepIndex===this.steps.length-1?this.finishButton():""}_onBack(){if(this.stepIndex>0){const e=this.stepIndex-1;this._gotoStep(e)}}_onNext(){if(this.stepIndex+1<this.steps.length){const e=this.stepIndex+1;this._gotoStep(e)}else this._onFinish()}_onSkip(){const e=this.step.module;for(let t=this.stepIndex+1;t<this.steps.length;t++)if(this.steps[t].module!==e){this._gotoStep(t);return}this._onFinish()}_onQuit(){this._onFinish(!0)}_handleFinish(){this._onFinish()}_onFinish(e=!1){if(this.stateManager.clear(),this.resetWizard(),!this.finishUrl){this.dispatchEvent(new CustomEvent("user-state:change",{bubbles:!0})),this.dispatchEvent(new CustomEvent("wizard-finished",{bubbles:!0}));return}const t=new URL(this.finishUrl);if(e===!1)if(this.type===S.checkin){const n=new URL(location.href).searchParams.get("code");if(n!==null){const a=new URL(jsObject.checkin_dashboard_url);a.searchParams.set("code",n),console.log("GOTO Checkin Dashboard"),window.location.href=a.href;return}}else t.searchParams.set("completed",this.type);console.log("GOTO Dashboard",e),window.location.href=t.href}_gotoStep(e,t=!0){if(this.steps.length!==0&&(this.stepIndex=this.clampSteps(e),this.step=this.steps[this.stepIndex],t&&!this.noUrlChange)){const s=new URL(window.location.href),n=s.pathname.split("/"),a=n[n.length-1];let r="";Object.values(S).includes(a)?r=n.join("/")+"/"+this.step.slug+s.search:r=n.slice(0,-1).join("/")+"/"+this.step.slug+s.search,window.history.pushState(null,null,r)}}clampSteps(e){let t=e;return e>this.steps.length-1&&(t=this.steps.length-1),e<0&&(t=0),t}_handleHistoryPopState(e=!1){const s=new URL(window.location.href).pathname.split("/"),n=s[s.length-1];Object.values(S).includes(n)&&this._gotoStep(0,!1);let a="",r=0;this.steps.forEach(({slug:l,module:c},h)=>{if(a!==c&&(a=c,r=h),n===l){if(e===!0&&this.stateManager.isDataStale()){this._gotoStep(r);return}this._gotoStep(h,!1)}})}_handlePlanDecision(e){switch(e.target.dataset.decision){case"make":this.updateWizard(S.makeAGroup);break;case"join":this.updateWizard(S.joinATraining);break;case"skip":default:this._onSkip();break}}_handleLoading(e){const{loading:t}=e.detail;this.loading=t}makeModule(e=[],t=!1){const s={steps:[],skippable:t};return e.forEach(n=>{Object.keys(U).includes(n)&&s.steps.push(U[n])}),s}getModule(e,t=!1){const s={[$.completeProfile]:{steps:[U[d.updateName],U[d.updateLocation]],skippable:t},[$.planDecision]:{steps:[{slug:"plan-decision",component:(a,r,l)=>o`
                            <div class=${`stack ${l}`}>
                                <h2>${r.join_or_start_a_training}</h2>
                                <button class="btn" data-decision="make" @click=${this._handlePlanDecision}>${r.start_a_training}</button>
                                <button class="btn" data-decision="join" @click=${this._handlePlanDecision}>${r.join_a_public_training}</button>
                                <button class="btn outline" data-decision="skip" @click=${this._handlePlanDecision}>${r.skip_for_now}</button>
                            </div>
                        `}],skippable:t},[$.joinCommunity]:{steps:[{slug:"join",component:(a,r,l)=>o`
                            <div class=${`stack ${l}`}>
                                <h2>${r.join_community}</h2>
                                <p>These are all the things that you get when you join</p> <!-- @todo content for this panel -->
                                <ul role="list">
                                    <li>lots of good things</li>
                                    <li>and more</li>
                                </ul>
                            </div>
                        `}]},[$.makePlan]:this.makeModule([d.howManySessions,d.whatTimeOfDay,d.howOften,d.startDate,d.inviteFriends],t),[$.inviteFriends]:{steps:[U[d.inviteFriends]],skippable:t},[$.joinTraining]:{steps:[U[d.joinTraining]]}};return Object.keys(s).includes(e)?s[e]:s[$.completeProfile]}isWizardLoaded(){return Object.keys(this.modules).length!==0}loadWizard(e,t=!1){this.modules=e,t===!1&&(this.steps=[],this.stepIndex=0),Object.entries(this.modules).forEach(([s,{steps:n,skippable:a}])=>{const r=jsObject.profile;n.forEach(({component:l,slug:c})=>{const h=mt[c];let g=null;if(h&&r){if(h.testExistance(r[h.field],r))return;g=r[h.field]}const u={component:l,slug:c,module:s,skippable:a,doneHandler:this._onNext,handleLoading:this._handleLoading};g!==null&&(u.value=g),this.steps.push(u)})}),t===!1&&this._gotoStep(0)}updateWizard(e){const t=this.getWizard(e);Object.keys(t).length!==0&&this.loadWizard(t)}isWizardTypeValid(e){return!!Object.values(S).includes(e)}getWizard(e){return this.isWizardTypeValid(e)?{[S.gettingStarted]:{[$.completeProfile]:this.makeModule([d.updateName,d.updateLocation],!0),[$.planDecision]:this.getModule($.planDecision)},[S.setProfile]:{[$.completeProfile]:this.makeModule([d.updateName,d.updateLocation],!0)},[S.makeAGroup]:{[$.makePlan]:this.getModule($.makePlan)},[S.getACoach]:{[$.completeProfile]:this.makeModule([d.updateName,d.updateLocation,d.updatePhone]),[$.getACoach]:this.makeModule([d.contactPreferences,d.languagePreferences,d.howCanWeServe,d.connectingToCoach])},[S.joinATraining]:{[$.completeProfile]:this.makeModule([d.updateName,d.updateLocation,d.updatePhone]),[$.joinTraining]:this.getModule($.joinTraining)},[S.connectWithFriend]:{[$.completeProfile]:this.makeModule([d.updateName,d.updateLocation],!0),[$.connectFriend]:this.makeModule([d.connectToFriend])},[S.joinFriendsPlan]:{[$.completeProfile]:this.makeModule([d.updateName,d.updateLocation],!0),[$.joinFriendsTraining]:this.makeModule([d.joinFriendsPlan])},[S.joinCommunity]:{[$.joinCommunity]:this.getModule($.joinCommunity)},[S.checkin]:{[$.checkin]:this.makeModule([d.checkinSubmit])}}[e]:{}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._handleHistoryPopState)}createRenderRoot(){return this}}window.customElements.define("zume-wizard",kt);const U={[d.updateName]:{slug:d.updateName,component:(i,e,t)=>o`
            <complete-profile
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.complete_profile}"
                variant=${d.updateName}
                @done-step=${i.doneHandler}
                value=${JSON.stringify(i.value)}
            ></complete-profile>
        `},[d.updateLocation]:{slug:d.updateLocation,component:(i,e,t)=>o`
            <complete-profile
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.complete_profile}"
                variant=${d.updateLocation}
                @done-step=${i.doneHandler}
                value=${JSON.stringify(i.value)}
            ></complete-profile>
        `},[d.updatePhone]:{slug:d.updatePhone,component:(i,e,t)=>o`
            <complete-profile
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.complete_profile}"
                variant=${d.updatePhone}
                @done-step=${i.doneHandler}
                value=${JSON.stringify(i.value)}
            ></complete-profile>
        `},[d.contactPreferences]:{slug:d.contactPreferences,component:(i,e,t)=>o`
            <request-coach
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.get_a_coach}"
                variant=${d.contactPreferences}
                @done-step=${i.doneHandler}
            ></request-coach>
        `},[d.languagePreferences]:{slug:d.languagePreferences,component:(i,e,t)=>o`
            <request-coach
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.get_a_coach}"
                variant=${d.languagePreferences}
                @done-step=${i.doneHandler}
            ></request-coach>
        `},[d.howCanWeServe]:{slug:d.howCanWeServe,component:(i,e,t)=>o`
            <request-coach
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.get_a_coach}"
                variant=${d.howCanWeServe}
                @done-step=${i.doneHandler}
            ></request-coach>
        `},[d.connectingToCoach]:{slug:d.connectingToCoach,component:(i,e,t)=>o`
            <request-coach
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.get_a_coach}"
                variant=${d.connectingToCoach}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></request-coach>
        `},[d.inviteFriends]:{slug:d.inviteFriends,component:(i,e,t)=>o`
            <invite-friends
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.share}
            ></invite-friends>
        `},[d.joinTraining]:{slug:d.joinTraining,component:(i,e,t)=>o`
            <join-training
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.join_training}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></join-training>
        `},[d.joinFriendsPlan]:{slug:d.joinFriendsPlan,component:(i,e,t)=>o`
            <join-friends-training
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.join_training}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></join-friends-training>
        `},[d.connectToFriend]:{slug:d.connectToFriend,component:(i,e,t)=>o`
            <connect-friend
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.connect_friend}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></connect-friend>
        `},[d.checkinSubmit]:{slug:d.checkinSubmit,component:(i,e,t)=>o`
            <session-checkin
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.checkin}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></session-checkin>
        `},[d.howManySessions]:{slug:d.howManySessions,component:(i,e,t)=>o`
            <make-group
                class=${t}
                name=${i.slug}
                module=${i.module}
                variant=${d.howManySessions}
                ?skippable=${i.skippable}
                .t=${e.checkin}
                @done-step=${i.doneHandler}
            ></make-group>
        `},[d.whatTimeOfDay]:{slug:d.whatTimeOfDay,component:(i,e,t)=>o`
            <make-group
                class=${t}
                name=${i.slug}
                module=${i.module}
                variant=${d.whatTimeOfDay}
                ?skippable=${i.skippable}
                .t=${e.checkin}
                @done-step=${i.doneHandler}
            ></make-group>
        `},[d.howOften]:{slug:d.howOften,component:(i,e,t)=>o`
            <make-group
                class=${t}
                name=${i.slug}
                module=${i.module}
                variant=${d.howOften}
                ?skippable=${i.skippable}
                .t=${e.checkin}
                @done-step=${i.doneHandler}
            ></make-group>
        `},[d.startDate]:{slug:d.startDate,component:(i,e,t)=>o`
            <make-group
                class=${t}
                name=${i.slug}
                module=${i.module}
                variant=${d.startDate}
                ?skippable=${i.skippable}
                .t=${e.checkin}
                @done-step=${i.doneHandler}
            ></make-group>
        `}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},at=i=>(...e)=>({_$litDirective$:i,values:e});class rt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:St}=_t,jt=i=>i.strings===void 0,Ue=()=>document.createComment(""),Z=(i,e,t)=>{var s;const n=i._$AA.parentNode,a=e===void 0?i._$AB:e._$AA;if(t===void 0){const r=n.insertBefore(Ue(),a),l=n.insertBefore(Ue(),a);t=new St(r,l,i,i.options)}else{const r=t._$AB.nextSibling,l=t._$AM,c=l!==i;if(c){let h;(s=t._$AQ)===null||s===void 0||s.call(t,i),t._$AM=i,t._$AP!==void 0&&(h=i._$AU)!==l._$AU&&t._$AP(h)}if(r!==a||c){let h=t._$AA;for(;h!==r;){const g=h.nextSibling;n.insertBefore(h,a),h=g}}}return t},P=(i,e,t=i)=>(i._$AI(e,t),i),Ct={},ot=(i,e=Ct)=>i._$AH=e,xt=i=>i._$AH,ve=i=>{var e;(e=i._$AP)===null||e===void 0||e.call(i,!1,!0);let t=i._$AA;const s=i._$AB.nextSibling;for(;t!==s;){const n=t.nextSibling;t.remove(),t=n}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Et=at(class extends rt{constructor(i){if(super(i),i.type!==M.PROPERTY&&i.type!==M.ATTRIBUTE&&i.type!==M.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!jt(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[e]){if(e===C||e===_)return e;const t=i.element,s=i.name;if(i.type===M.PROPERTY){if(e===t[s])return C}else if(i.type===M.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(s))return C}else if(i.type===M.ATTRIBUTE&&t.getAttribute(s)===e+"")return C;return ot(i),e}});class Ot extends b{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},value:{type:String},locations:{attribute:!1},locationError:{attribute:!1},phoneError:{attribute:!1},city:{attribute:!1},loading:{attribute:!1},state:{attribute:!1},localValue:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.locations=[],this.locationError="",this.city="",this.loading=!1,this.localValue="",this.phoneError="",this._clearLocations=this._clearLocations.bind(this),this._handleSuggestions=this._handleSuggestions.bind(this),this._debounceCityChange=debounce(getAddressSuggestions(this._handleSuggestions,jsObject.map_key)).bind(this),this._handleCityInputChange=this._handleCityInputChange.bind(this)}firstUpdated(){this.renderRoot.querySelector(".inputs input").focus(),this.value!==""&&(this.localValue=JSON.parse(this.value))}render(){var e;return o`
        <form class="inputs stack" @submit=${this._handleSubmit}>
            ${this.variant===d.updateName?o`
                <h2>${this.t.name_question}</h2>
                <div class="">
                    <label for="name">${this.t.name}</label>
                    <input class="input" type="text" id="name" name="name" value=${this.localValue} ?required=${!this.skippable}>
                </div>
            `:""}

            ${this.variant===d.updatePhone?o`
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

            ${this.variant===d.updateLocation?o`
                <h2>${this.t.location_question}</h2>
                <div class="form-group">
                    <label class="input-label" for="city">${this.t.city}</label>
                    <input
                        class="input"
                        type="text"
                        id="city"
                        name="city"
                        .value="${this.city?Et(this.city):(e=this.localValue)==null?void 0:e.label}"
                        @input=${this._handleCityChange}
                    >
                    <span class="loading-spinner ${this.loading?"active":""}"></span>
                    <p class="input-subtext">${this.t.approximate_location}</p>
                </div>
                <button>${this.t.accept}</button>
                <div id="address_results">
                    ${this.locationError}
                    ${this.locations.map(t=>o`
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
            ${[d.updatePhone,d.updateName].includes(this.variant)?o`
                <div class="cluster | mx-auto">
                    <button type="submit" class="btn" ?disabled=${this.loading}>${this.t.next}</button>
                    <span class="loading-spinner ${this.loading?"active":""}"></span>
                </div>
            `:""}
        </form>
        `}_handleInput(e){this.phoneError=""}_handleInvalid(e){e.preventDefault(),this.phoneError=this.t.phone_error}_handleSubmit(e){e.preventDefault(),e.srcElement.querySelector("#city")?this._handleSubmitLocation():this._handleDone(e)}_handleDone(e){e&&e.preventDefault();const t=e.target[0];if(t.type==="submit")return;let{name:s,value:n}=t;t.type==="tel"&&(n=t.value.replace(/[\(\)\-\s]/g,"")),this._updateProfile(s,n,()=>{this._sendDoneStepEvent()})}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleCityChange(e){this._handleCityInputChange(e),this._debounceCityChange(e)}_handleCityInputChange(e){this.city=e.target.value}_handleSuggestions(e){e.features.length<1&&(this.locationError=this.t.no_locations_found),this.locations=e.features}_handleLocationSelection(e){this.city=e.target.dataset.placeName;const t=getLocationGridFromMapbox(e.target.id,jsObject.profile.location);this.localValue=t,this._clearLocations()}_handleSubmitLocation(){if(this.localValue.source==="ip"){const{label:e,level:t,lat:s,lng:n}=this.localValue;this.localValue={source:"user",grid_id:!1,label:e,level:t,lat:Number(s),lng:Number(n)}}this._updateProfile("location_grid_meta",this.localValue,()=>{this._sendDoneStepEvent()})}_updateProfile(e,t,s=()=>{}){this.loading=!0;const n={[e]:t};fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(n),headers:{"X-WP-Nonce":jsObject.nonce}}).then(a=>a.json()).then(a=>{jsObject.profile=a,s()}).catch(a=>{console.error(a)}).finally(()=>{this.loading=!1})}_clearLocations(){this.locations=[]}createRenderRoot(){return this}}window.customElements.define("complete-profile",Ot);class zt extends b{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},inviteCode:{type:String}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.t={},this.inviteCode="123456",this.url=jsObject.site_url+`/zume_app/plan_invite${this.inviteCode!==""?"?code="+this.inviteCode:""}`}render(){return o`
            <div class="center stack">
                <h2>${this.t.title}</h2>
                <p>${this.t.share_with_friends}</p>
                <share-links url=${this.url} title="${this.t.join_my_plan}" .t=${this.t}></share-links>
            </div>
        `}createRenderRoot(){return this}}window.customElements.define("invite-friends",zt);class Tt extends b{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},errorMessage:{attribute:!1},message:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.state={},this.errorMessage="",this.message="",this.loading=!1,this.contactPreferences=["email","text","phone","whatsapp","signal","telegram","messenger"]}firstUpdated(){this.message=this.t.connect_success;const e=this.stateManager.getAll();if(this.variant===d.connectingToCoach){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));const t=(n=>{n===!1&&(this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting)),n.coach_request&&n.coach_request.errors&&Object.keys(n.coach_request.errors).length!==0&&Object.keys(n.coach_request.errors)[0]==="already_has_coach"&&(this.message=this.t.already_coached,this.setErrorMessage(this.t.error_connecting)),this._handleFinish()}).bind(this),s=(()=>{this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting),this._handleFinish()}).bind(this);makeRequest("POST","get_a_coach",{data:e},"zume_system/v1/").done(t).fail(s).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return this.stateManager||(this.stateManager=new Fe(this.module),this.state=this.stateManager.get(this.variant)||{},this.variant===d.languagePreferences&&!this.state.value&&(this.state.value=jsObject.profile.preferred_language||"en",this.stateManager.add(this.variant,this.state)),this.variant===d.contactPreferences&&Object.keys(this.state).length===0&&(this.state=Object.fromEntries(jsObject.profile.contact_preference.map(e=>[e,"true"])))),o`
        <form class="inputs stack-2" @submit=${this._handleDone}>
            ${this.variant===d.contactPreferences?o`
                <h2>${this.t.contact_preference_question}</h2>
                <div class="stack center container-sm | align-items-start text-start">
                    ${this.contactPreferences.map(e=>o`
                        <div>
                            <input type="checkbox" name="contact-preference" id=${"prefer_"+e} value=${e} @change=${this._handleChange} ?checked=${!!this.state[e]} />
                            <label for=${"prefer_"+e}>${this.t[e]}</label>
                        </div>
                    `)}
                </div>
            `:""}

            ${this.variant===d.languagePreferences?o`
                <h2>${this.t.language_preference_question}</h2>
                <div class="stack">
                    <label for="preferred-language">${this.t.language_preference}</label>
                    <select name="preferred-language" id="preferred-language" @change=${this._handleChange} >

                        ${Object.values(jsObject.languages).map(e=>o`
                            <option value=${e.code} ?selected=${e.code===this.state.value} >
                                ${e.nativeName} - ${e.enDisplayName}
                            </option>
                        `)}

                    </select>
                </div>
            `:""}

            ${this.variant===d.howCanWeServe?o`
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
            ${this.variant===d.connectingToCoach?o`

                <h1>${this.t.connecting_coach_title}</h1>
                <p>${this.message}</p>
                <span class="loading-spinner ${this.loading?"active":""}"></span>
            `:""}
            ${this.variant!==d.connectingToCoach?o`
                    <div class="cluster | mx-auto">
                        <span class="loading-spinner ${this.loading?"active":""}"></span>
                        <button type="submit" class="btn" ?disabled=${this.loading}>${this.t.next}</button>
                    </div>
                `:""}
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        </form>
        `}_handleDone(e){if(e&&e.preventDefault(),Object.keys(this.state).length===0){this.setErrorMessage(this.t.missing_response);return}this._sendDoneStepEvent()}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleFinish(){setTimeout(()=>{this._sendDoneStepEvent()},3e3)}_handleChange(e){e.target.type==="checkbox"&&(this.state[e.target.value]=e.target.checked),e.target.type==="text"&&(this.state.value=e.target.value),e.target.type==="select-one"&&(this.state.value=e.target.value),this.stateManager.add(this.variant,this.state)}createRenderRoot(){return this}}customElements.define("request-coach",Tt);class At extends b{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.showTrainings=!1,this.loading=!1}firstUpdated(){const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.loading=!1,this.showTrainings=!0;return}const t=e.searchParams.get("code");this.connectToPlan(t)}connectToPlan(e){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait,this.code=e,makeRequest("POST","connect/public-plan",{code:e},"zume_system/v1").then(t=>{console.log(t),this.message=this.t.success.replace("%s",t.name),this._sendDoneStepEvent()}).fail(({responseJSON:t})=>{console.log(t),this.message="",t.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}_handleChosenTraining(e){console.log(e);const{code:t}=e.detail;this.showTrainings=!1,this.connectToPlan(t)}render(){return o`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            ${this.showTrainings?o`
                <public-trainings .t=${this.t} @chosen-training=${this._handleChosenTraining}></public-trainings>
            `:""}
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("join-training",At);class Pt extends b{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1;return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","connect/plan",{code:t},"zume_system/v1").then(s=>{console.log(s),this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return o`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("join-friends-training",Pt);class Mt extends b{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","connect/friend",{code:t},"zume_system/v1").then(s=>{console.log(s),this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_friend_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return o`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("connect-friend",Mt);class Rt extends b{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","checkin",{code:t},"zume_system/v1").then(s=>{this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_checkin_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){console.log(e),this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return o`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("session-checkin",Rt);class It extends b{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},errorMessage:{attribute:!1},message:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.state={},this.errorMessage="",this.message="",this.loading=!1}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return o`
            ${this.variant===d.howManySessions?o`
                <h2>${jsObject.translations.question_which_session}</h2>
                <div class="stack">
                    <button class="btn" @click=${this._handleDone}>${jsObject.translations.hour_1_session_20}</button>
                    <button class="btn" @click=${this._handleDone}>${jsObject.translations.hour_2_session_10}</button>
                </div>
            `:""}
            ${this.variant===d.whatTimeOfDay?o`
                <h2>${jsObject.translations.question_which_time}</h2>
                <div class="stack">
                    <button class="btn" @click=${this._handleDone}>${jsObject.translations.morning}</button>
                    <button class="btn" @click=${this._handleDone}>${jsObject.translations.afternoon}</button>
                    <button class="btn" @click=${this._handleDone}>${jsObject.translations.evening}</button>
                </div>
            `:""}
            ${this.variant===d.howOften?o`
                <h2>${jsObject.translations.question_how_often}</h2>
                <div class="stack">
                    <button class="btn" @click=${this._handleDone}>${jsObject.translations.daily}</button>
                    <button class="btn" @click=${this._handleDone}>${jsObject.translations.weekly}</button>
                    <button class="btn" @click=${this._handleDone}>${jsObject.translations.bimonthly}</button>
                    <button class="btn" @click=${this._handleDone}>${jsObject.translations.monthly}</button>
                </div>
            `:""}
            ${this.variant===d.startDate?o`
                <h2>${jsObject.translations.question_when_will_you_start}</h2>
                <input type="date">
                <button class="btn" @click=${this._handleDone}>${jsObject.translations.done}</button>
            `:""}

        `}_handleDone(e){e&&e.preventDefault(),this._sendDoneStepEvent()}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleFinish(){setTimeout(()=>{this._sendDoneStepEvent()},3e3)}createRenderRoot(){return this}}customElements.define("make-group",It);function Lt(i){return i?JSON.parse('{"'+i.substring(1).replace(/&/g,'","').replace(/=/g,'":"')+'"}'):{}}function qt(i,e){let t={};const s=i.split("/").filter(a=>a!=""),n=e.split("/").filter(a=>a!="");return s.map((a,r)=>{/^:/.test(a)&&(t[a.substring(1)]=n[r])}),t}function Ut(i){return i?new RegExp("^(|/)"+i.replace(/:[^\s/]+/g,"([\\wÀ-ÖØ-öø-ÿ-]+)")+"(|/)$"):new RegExp("(^$|^/$)")}function Nt(i,e){if(Ut(e).test(i))return!0}function Dt(i){return class extends i{static get properties(){return{route:{type:String,reflect:!0,attribute:"route"},canceled:{type:Boolean}}}constructor(...e){super(...e),this.route="",this.canceled=!1}connectedCallback(...e){super.connectedCallback(...e),this.routing(this.constructor.routes,(...t)=>this.router(...t)),window.addEventListener("route",()=>{this.routing(this.constructor.routes,(...t)=>this.router(...t))}),window.onpopstate=()=>{window.dispatchEvent(new CustomEvent("route"))}}routed(e,t,s,n,a,r){r&&r(e,t,s,n),a(e,t,s,n)}routing(e,t){this.canceled=!0;const s=decodeURI(window.location.pathname),n=decodeURI(window.location.search);let a=e.filter(c=>c.pattern==="*")[0],r=e.filter(c=>c.pattern!=="*"&&Nt(s,c.pattern))[0],l=Lt(n);r?(r.params=qt(r.pattern,s),r.data=r.data||{},r.authentication&&r.authentication.authenticate&&typeof r.authentication.authenticate=="function"?(this.canceled=!1,Promise.resolve(r.authentication.authenticate.bind(this).call()).then(c=>{this.canceled||(c?r.authorization&&r.authorization.authorize&&typeof r.authorization.authorize=="function"?(this.canceled=!1,Promise.resolve(r.authorization.authorize.bind(this).call()).then(h=>{this.canceled||(h?this.routed(r.name,r.params,l,r.data,t,r.callback):this.routed(r.authorization.unauthorized.name,r.params,l,r.data,t,r.callback))})):this.routed(r.name,r.params,l,r.data,t,r.callback):this.routed(r.authentication.unauthenticated.name,r.params,l,r.data,t,r.callback))})):r.authorization&&r.authorization.authorize&&typeof r.authorization.authorize=="function"?(this.canceled=!1,Promise.resolve(r.authorization.authorize.bind(this).call()).then(c=>{this.canceled||(c?this.routed(r.name,r.params,l,r.data,t,r.callback):this.routed(r.authorization.unauthorized.name,r.params,l,r.data,t,r.callback))})):this.routed(r.name,r.params,l,r.data,t,r.callback)):a&&(a.data=a.data||{},this.routed(a.name,{},l,a.data,t,a.callback))}}}function Ht(i){return class extends i{navigate(e){window.history.pushState({},null,e),window.dispatchEvent(new CustomEvent("route"))}}}function fe(i){return(e,t)=>{e.preventDefault(),t(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:i}}))}}function Ne(){return[{name:"root",pattern:`${jsObject.base_url}`,icon:"",type:"dash-link",translation:"",data:{makeComponent:()=>""}},{name:"getting-started",pattern:`${jsObject.base_url}/getting-started`,icon:"zume-start",type:"dash-link",translation:jsObject.translations.getting_started,data:{makeComponent:i=>o`<dash-getting-started></dash-getting-started>`}},{name:"set-profile",pattern:"#",parent:"getting-started",icon:"zume-profile",type:"handled-link",clickHandler:fe("set-profile"),translation:jsObject.translations.set_profile,explanation:jsObject.translations.set_profile_explanation,data:{makeComponent:()=>""}},{name:"join-a-training",pattern:"#",parent:"getting-started",icon:"zume-start",type:"handled-link",clickHandler:fe("getting-started"),translation:jsObject.translations.plan_a_training,explanation:jsObject.translations.plan_a_training_explanation,data:{makeComponent:()=>""}},{name:"get-a-coach",pattern:"#",parent:"getting-started",icon:"zume-coach",type:"handled-link",clickHandler:fe("get-a-coach"),translation:jsObject.translations.get_a_coach,explanation:jsObject.translations.get_a_coach_explanation,data:{makeComponent:()=>""}},{name:"training",pattern:`${jsObject.base_url}/training`,icon:"zume-training",type:"dash-link",translation:jsObject.translations.training,data:{makeComponent:i=>o`<dash-training></dash-training>`}},{name:"my-training",pattern:`${jsObject.base_url}/my-training`,parent:"training",icon:"zume-trainings",type:"dash-link",translation:jsObject.translations.my_training,explanation:jsObject.translations.my_training_explanation,data:{makeComponent:i=>o`<dash-trainings ?showTeaser=${i}></dash-trainings>`}},{name:"my-progress",pattern:`${jsObject.base_url}/my-progress`,parent:"training",icon:"zume-progress",type:"dash-link",translation:jsObject.translations.my_progress,explanation:jsObject.translations.my_progress_explanation,data:{makeComponent:i=>o`<dash-progress ?showTeaser=${i}></dash-progress>`}},{name:"3-month-plan",pattern:`${jsObject.base_url}/3-month-plan`,parent:"training",icon:"zume-plans",type:"dash-link",translation:jsObject.translations.create_3_month_plan,explanation:jsObject.translations["3_month_plan_explanation"],data:{makeComponent:i=>o`<dash-3-month-plan ?showTeaser=${i}></dash-3-month-plan>`}},{name:"practicing",pattern:`${jsObject.base_url}/practicing`,icon:"zume-practicing",type:"dash-link",translation:jsObject.translations.practicing,data:{makeComponent:i=>o`<dash-practicing></dash-practicing>`}},{name:"my-coach",pattern:`${jsObject.base_url}/my-coach`,parent:"practicing",icon:"zume-coach",type:"dash-link",translation:jsObject.translations.my_coach,explanation:jsObject.translations.my_coach_explanation,data:{makeComponent:i=>o`<dash-coach ?showTeaser=${i}></dash-coach>`}},{name:"my-plans",pattern:`${jsObject.base_url}/my-plans`,parent:"practicing",icon:"zume-plans",type:"dash-link",translation:jsObject.translations.my_plans,explanation:jsObject.translations.my_plans_explanation,data:{makeComponent:i=>o`<dash-plans ?showTeaser=${i}></dash-plans>`}},{name:"my-churches",pattern:`${jsObject.base_url}/my-churches`,parent:"practicing",icon:"zume-churches",type:"dash-link",translation:jsObject.translations.my_churches,explanation:jsObject.translations.my_churches_explanation,data:{makeComponent:i=>o`<dash-churches ?showTeaser=${i}></dash-churches>`}},{name:"my-maps",pattern:`${jsObject.base_url}/my-maps`,parent:"practicing",icon:"zume-maps",type:"dash-link",translation:jsObject.translations.my_maps,explanation:jsObject.translations.my_maps_explanation,data:{makeComponent:i=>o`<dash-maps ?showTeaser=${i}></dash-maps>`}},{name:"not-found",pattern:"*",icon:"",type:"dash-link",data:{makeComponent:i=>o`<dash-not-found></dash-not-found>`}}]}class v extends Dt(b){static get properties(){return{route:{type:String},params:{type:Object},query:{type:Object},menuOffset:{type:Number,attribute:!1},userProfile:{type:Object,attribute:!1},userState:{type:Object,attribute:!1},wizardType:{type:String,attribute:!1},celbrationModalContent:{type:Object,attribute:!1}}}static get routes(){const e={1:"getting-started",2:"training",3:"practicing"},t=jsObject.user_stage.value||1,s=t<4?t:3,n=Ne().find(({name:l})=>l===e[s]),{makeComponent:a}=n.data;return Ne().map(l=>(l.name==="root"&&(l.data={makeComponent:a}),l))}static getRoute(e){return v.routes.find(s=>s.name===e)}static childRoutesOf(e){return v.routes.filter(({parent:s})=>s===e)}constructor(){super(),this.route="",this.params={},this.query={},this.data={},this.menuOffset=0,this.userProfile=jsObject.profile,this.userState=jsObject.user_stage.state,this.wizardType="",this.celebrationModalContent={title:"",content:[]},this.allCtas=[],this.ctas=[],this.userId=jsObject.profile.user_id,this.showingCelebrationModal=!1,this.languageSelectorElements=document.querySelectorAll(".language-selector"),this.updateUserProfile=this.updateUserProfile.bind(this),this.updateWizardType=this.updateWizardType.bind(this),this.refetchState=this.refetchState.bind(this),this.refetchHost=this.refetchHost.bind(this),this.getCtas=this.getCtas.bind(this),this.showCelebrationModal=this.showCelebrationModal.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("user-profile:change",this.updateUserProfile),window.addEventListener("toggle-dashboard-sidebar",this.toggleSidebar),window.addEventListener("open-wizard",this.updateWizardType),window.addEventListener("wizard-finished",this.closeWizard),window.addEventListener("wizard-finished",this.getCtas),window.addEventListener("user-state:change",this.refetchState),window.addEventListener("user-state:change",this.getCtas),window.addEventListener("user-host:change",this.refetchHost),window.addEventListener("load",this.showCelebrationModal),window.addEventListener("ctas:changed",this.showCelebrationModal),this.addEventListener("route",this.updateLanguageSwitcher)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("user-profile:change",this.updateUserProfile),window.removeEventListener("toggle-dashboard-sidebar",this.toggleSidebar),window.removeEventListener("open-wizard",this.updateWizardType),window.removeEventListener("wizard-finished",this.closeWizard),window.removeEventListener("wizard-finished",this.getCtas),window.removeEventListener("user-state:change",this.refetchState),window.removeEventListener("user-state:change",this.getCtas),window.removeEventListener("user-host:change",this.refetchHost),window.removeEventListener("load",this.showCelebrationModal),window.removeEventListener("ctas:changed",this.showCelebrationModal),this.removeEventListener("route",this.updateLanguageSwitcher)}firstUpdated(){this.menuOffset=this.getOffsetTop(".sidebar-wrapper"),this.getCtas();const e=this.renderRoot.querySelector("#celebration-modal");e==null||e.addEventListener("closed.zf.reveal",()=>{this.showingCelebrationModal=!1})}updateWizardType(e){const t=e.detail.type;this.openWizard(t)}router(e,t,s,n){this.route=e,this.params=t,this.query=s,this.data=n,this.dispatchEvent(new CustomEvent("route"))}makeHref(e){return`${jsObject.base_url}/${e}`}makeHrefRoute(e){const s=v.routes.find(({name:n})=>n===e);return s?s.pattern:(console.error("MISSING ROUTE",e),"")}renderRoute(){const{makeComponent:e}=this.data;if(!e)return"";const t=v.getLockedStatus(this.route,this.userState);return e(t)}getOffsetTop(e){return this.querySelector(e).offsetTop}toggleSidebar(){const e=document.querySelector(".dashboard__sidebar"),t=document.querySelector(".sidebar__trigger-close-background"),s="200";e.style.transitionDuration=s,t.style.transitionDuration=s;const n=e.dataset.state;n==="open"&&(e.dataset.state="closed",t.style.opacity=0,setTimeout(()=>{t.style.visibility="hidden"},s)),(!n||n==="closed")&&(e.dataset.state="open",t.style.opacity="initial",t.style.visibility="visible")}updateLanguageSwitcher(){this.languageSelectorElements.forEach(e=>{const t=e.dataset.url,s=t.indexOf("dashboard"),n=t.slice(0,s+10)+this.route;e.dataset.url=n})}updateUserProfile(e){const t=e.detail;this.userProfile=t}createInitials(e){return typeof e!="string"||e.length===0?"":e.split(" ").map(s=>s.length>0?s[0].toUpperCase():"").slice(0,2).join("")}static getCompletedStatus(e,t){return!!(e==="set-profile"&&t.set_profile_location&&t.set_profile_name||e==="get-a-coach"&&t.requested_a_coach||e==="join-a-training"&&(t.plan_created||t.joined_online_training))}static getLockedStatus(e,t){return!!(e==="my-plans"&&!t.made_3_month_plan||["my-churches","my-maps"].includes(e)&&!t.join_community||e==="3-month-plan"&&!t.can_create_3_month_plan||e==="my-training"&&!t.plan_created&&!t.joined_online_training)}getGettingStartedPercentage(){const e=["get-a-coach","set-profile","join-a-training"],t=e.reduce((s,n)=>v.getCompletedStatus(n,this.userState)?s+1:s,0);return Math.round(t/e.length*100)}openWizard(e){const t=document.querySelector("#wizard-modal");jQuery(t).foundation("open"),this.wizardType=e}closeWizard(){this.wizardType="";const e=document.querySelector("#wizard-modal");jQuery(e).foundation("close")}refetchState(){this.getCtas(),makeRequest("GET","user_stage",{},"zume_system/v1").done(e=>{(!e||!e.state)&&console.error("Stage or state data not returned from api"),jsObject.user_stage=e,this.userState=e.state})}refetchHost(){makeRequest("GET","user_host",{},"zume_system/v1").done(e=>{e||console.error("Host not returned from api"),jsObject.host_progress=e})}getCtas(){makeRequest("POST","user_ctas",{user_id:this.userId,language:jsObject.language},"zume_system/v1").done(e=>{const t=Object.values(e);this.allCtas=t;const s=l=>{for(let c=l.length-1;c>0;c--){const h=Math.floor(Math.random()*(c+1));[l[c],l[h]]=[l[h],l[c]]}return l},n=this.allCtas.filter(({content_template:l})=>l==="celebration"),a=this.allCtas.filter(({content_template:l})=>l==="card"),r=[...n,...s(a)];this.allCtas=r,jsObject.allCtas=this.allCtas,this.dispatchEvent(new CustomEvent("ctas:changed",{bubbles:!0}))})}showCelebrationModal(){if(this.showingCelebrationModal)return;const e=this.renderRoot.querySelector("dash-cta"),t=this.allCtas.filter(({content_template:s})=>s==="celebration");if(!e&&t.length>0){this.showingCelebrationModal=!0,t.forEach(({content:{title:a,description:r}})=>{this.celebrationModalContent.title=r,this.celebrationModalContent.content.push(a)}),this.requestUpdate();const s=document.querySelector("#celebration-modal");jQuery(s).foundation("open"),t.forEach(({type:a,subtype:r})=>{makeRequest("POST","log",{type:a,subtype:r},"zume_system/v1")});const n=t.map(({key:a})=>a);jsObject.allCtas=jsObject.allCtas.filter(({key:a})=>!n.includes(a))}}openProfile(){const e=document.querySelector("#profile-modal");jQuery(e).foundation("open")}closeProfile(){const e=document.querySelector("#profile-modal");jQuery(e).foundation("close")}openCommunityModal(e){e.preventDefault();const t=document.querySelector("#community-modal");jQuery(t).foundation("open")}closeCommunityModal(){const e=document.querySelector("#community-modal");jQuery(e).foundation("close")}joinCommunity(){makeRequest("POST","log",{type:"system",subtype:"join_community"},"zume_system/v1/").done(e=>{this.refetchState()})}hasJoinedCommunity(){return!!this.userState.join_community}openResourcesModal(e){e.preventDefault();const t=document.querySelector("#resources-modal");jQuery(t).foundation("open")}closeResourcesModal(){const e=document.querySelector("#resources-modal");jQuery(e).foundation("close")}render(){return o`
            <div class="sidebar__trigger-close-background" @click=${this.toggleSidebar}></div>
            <div class="dashboard">

                <div class="dashboard__sidebar">
                    <div
                        class="sidebar-wrapper"
                        style="top: ${this.menuOffset}px; height: calc( min( 100%, 100vh ) - ${this.menuOffset}px - var(--s0) );"
                    >
                        <button
                            class="ms-auto d-block w-2rem dashboard__sidebar-toggle break-large break-medium"
                            aria-label="Close modal"
                            type="button"
                            @click=${this.toggleSidebar}
                        >
                            <span class="icon zume-close gray-500"></span>
                        </button>
                        <div class="profile-area">
                            <button
                                class="profile-btn"
                                @click=${this.openProfile}
                            >
                                ${this.createInitials(this.userProfile.name)}
                            </button>
                            <span class="profile-name">${this.userProfile.name}</span>
                        </div>
                        <ul
                            class="stack-2 | progress-menu accordion-menu"
                            data-accordion-menu
                            data-submenu-toggle="true"
                        >
                            <li class="menu-section">
                                <nav-link
                                    href=${this.makeHref("getting-started")}
                                    class="menu-section__title menu-btn"
                                    icon="zume-start"
                                    text=${jsObject.translations.getting_started}>
                                </nav-link>
                                <progress-circle percent=${this.getGettingStartedPercentage()} radius="12"></progress-circle>
                                <ul class="nested is-active">
                                    ${v.childRoutesOf("getting-started").map(e=>o`
                                                <li>
                                                    <nav-link
                                                        class="menu-btn"
                                                        href=${this.makeHrefRoute(e.name)}
                                                        icon=${e.icon}
                                                        text=${e.translation}
                                                        ?disableNavigate=${e.type==="handled-link"}
                                                        @click=${e.type==="handled-link"?t=>{v.getCompletedStatus(e.name,this.userState)||e.clickHandler(t,this.dispatchEvent)}:null}
                                                        ?completed=${v.getCompletedStatus(e.name,this.userState)}
                                                    ></nav-link>
                                                    <span class="icon zume-check-mark success"></span>
                                                </li>
                                            `)}
                                </ul>
                            </li>
                            <li class="menu-section">
                                <nav-link
                                    href=${this.makeHref("training")}
                                    class="menu-section__title menu-btn"
                                    icon="zume-training"
                                    text=${jsObject.translations.training}
                                >
                                </nav-link>
                                <ul class="nested is-active">
                                    ${v.childRoutesOf("training").map(e=>o`
                                                <li>
                                                    <nav-link
                                                        class="menu-btn"
                                                        href=${this.makeHrefRoute(e.name)}
                                                        icon=${e.icon}
                                                        text=${e.translation}
                                                        ?locked=${v.getLockedStatus(e.name,this.userState)}
                                                    ></nav-link>
                                                    <span class="icon zume-locked gray-500"></span>
                                                </li>
                                            `)}
                                </ul>
                            </li>
                            <li class="menu-section">
                                <nav-link
                                    href=${this.makeHref("practicing")}
                                    class="menu-section__title menu-btn"
                                    icon="zume-practicing"
                                    text=${jsObject.translations.practicing}
                                ></nav-link>
                                <ul class="nested is-active">
                                    ${v.childRoutesOf("practicing").map(e=>o`
                                                <li>
                                                    <nav-link
                                                        class="menu-btn"
                                                        href=${this.makeHrefRoute(e.name)}
                                                        icon=${e.icon}
                                                        text=${e.translation}
                                                        ?locked=${v.getLockedStatus(e.name,this.userState)}
                                                    ></nav-link>
                                                    <span class="icon zume-locked gray-500"></span>
                                                </li>
                                            `)}
                                </ul>
                            </li>
                        </ul>
                        <div class="footer-links">
                            <nav-link
                                class="menu-btn | f--1"
                                href=''
                                icon='zume-community'
                                text=${this.hasJoinedCommunity()?jsObject.translations.community:jsObject.translations.join_the_community}
                                ?disableNavigate=${!0}
                                @click=${this.openCommunityModal}
                            ></nav-link>
                            <nav-link
                                class="menu-btn | f--1"
                                href=''
                                icon='zume-resources'
                                text=${jsObject.translations.resources}
                                ?disableNavigate=${!0}
                                @click=${this.openResourcesModal}
                            ></nav-link>
                        </div>
                    </div>
                </div>

                ${this.renderRoute()}
            </div>
            <div class="stack | reveal tiny card celebration showing | border-none" id="celebration-modal" data-reveal>
                <button class="ms-auto d-block w-2rem" data-close aria-label="Close modal" type="button" @click=${this.closeProfile}>
                    <span class="icon zume-close gray-500"></span>
                </button>
                <h2 class="h5 text-center bold">${this.celebrationModalContent.title}</h2>
                <div class="d-flex align-items-center justify-content-between">
                    <img class="w-30" src="${jsObject.images_url+"/fireworks-2.svg"}" alt="" />
                    <img class="w-40" src="${jsObject.images_url+"/thumbs-up.svg"}" alt="" />
                    <img class="w-30" src="${jsObject.images_url+"/fireworks-2.svg"}" alt="" />
                </div>
                <div class="stack--3">
                    ${this.celebrationModalContent.content.map(e=>o`
                            <p><span class="icon zume-check-mark"></span> ${e}</p>
                        `)}
                </div>

            </div>
            <div class="reveal full" id="profile-modal" data-reveal>
                <button class="ms-auto d-block w-2rem" data-close aria-label="Close modal" type="button" @click=${this.closeProfile}>
                    <span class="icon zume-close gray-500"></span>
                </button>
                <div class="container-xsm my-0">
                    <h3>${jsObject.translations.edit_profile}</h3>
                    <profile-form .userProfile=${this.userProfile}></profile-form>
                    <a href=${jsObject.urls.logout} class="btn outline">${jsObject.translations.logout}</a>
                </div>
            </div>
            <div class="reveal full" id="wizard-modal" data-reveal>
                <button class="ms-auto d-block w-2rem" data-close aria-label="Close modal" type="button" @click=${this.closeWizard}>
                    <span class="icon zume-close gray-500"></span>
                </button>
                <zume-wizard
                    type=${this.wizardType}
                    .user=${this.userProfile}
                    .translations=${jsObject.wizard_translations}
                    noUrlChange
                ></zume-wizard>
            </div>
            <div class="reveal full" id="resources-modal" data-reveal>
                <button class="ms-auto d-block w-2rem" data-close aria-label="Close modal" type="button" @click=${this.closeResourcesModal}>
                    <span class="icon zume-close gray-500"></span>
                </button>
                <div class="container-xsm">
                    <h1>Resources</h1>
                    <p>All the resources</p>
                    <ul role="list">
                        <li>in a</li>
                        <li>great big</li>
                        <li>list</li>
                    </ul>
                </div>
            </div>
            <div class="reveal full" id="community-modal" data-reveal>
                <button class="ms-auto d-block w-2rem" data-close aria-label="Close modal" type="button" @click=${this.closeCommunityModal}>
                    <span class="icon zume-close gray-500"></span>
                </button>
                <div class="container-xsm">
                    <h1>Practitioner Community</h1>
                    ${this.hasJoinedCommunity()?o`
                            <p>Here is all the community stuff we promised you :)</p>
                        `:o`
                            <p>There are lot's of good reasons to join the community here</p>
                            <button class="btn" @click=${this.joinCommunity}>
                                Join
                            </button>
                        `}
                </div>

            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-board",v);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const De=(i,e,t)=>{const s=new Map;for(let n=e;n<=t;n++)s.set(i[n],n);return s},T=at(class extends rt{constructor(i){if(super(i),i.type!==M.CHILD)throw Error("repeat() can only be used in text expressions")}dt(i,e,t){let s;t===void 0?t=e:e!==void 0&&(s=e);const n=[],a=[];let r=0;for(const l of i)n[r]=s?s(l,r):r,a[r]=t(l,r),r++;return{values:a,keys:n}}render(i,e,t){return this.dt(i,e,t).values}update(i,[e,t,s]){var n;const a=xt(i),{values:r,keys:l}=this.dt(e,t,s);if(!Array.isArray(a))return this.ht=l,r;const c=(n=this.ht)!==null&&n!==void 0?n:this.ht=[],h=[];let g,u,p=0,m=a.length-1,f=0,y=r.length-1;for(;p<=m&&f<=y;)if(a[p]===null)p++;else if(a[m]===null)m--;else if(c[p]===l[f])h[f]=P(a[p],r[f]),p++,f++;else if(c[m]===l[y])h[y]=P(a[m],r[y]),m--,y--;else if(c[p]===l[y])h[y]=P(a[p],r[y]),Z(i,h[y+1],a[p]),p++,y--;else if(c[m]===l[f])h[f]=P(a[m],r[f]),Z(i,a[p],a[m]),m--,f++;else if(g===void 0&&(g=De(l,f,y),u=De(c,p,m)),g.has(c[p]))if(g.has(c[m])){const x=u.get(l[f]),le=x!==void 0?a[x]:null;if(le===null){const Ce=Z(i,a[p]);P(Ce,r[f]),h[f]=Ce}else h[f]=P(le,r[f]),Z(i,a[p],le),a[x]=null;f++}else ve(a[m]),m--;else ve(a[p]),p++;for(;f<=y;){const x=Z(i,h[y+1]);P(x,r[f]),h[f++]=x}for(;p<=m;){const x=a[p++];x!==null&&ve(x)}return this.ht=l,ot(i,h),C}});class O extends b{constructor(){super();const t=document.querySelector("html").dataset.dir;this.isRtl=t==="rtl"}firstUpdated(){this.attachResizeObeserver(),this.updateHeaderStyle()}attachResizeObeserver(){const e=document.querySelector("dash-header-right"),t=new ResizeObserver(s=>{for(let n of s){if(!n.contentRect)return;const a=Math.round(n.contentRect.height),r=Math.round(n.contentRect.width);this.updateHeaderStyle(!1,a,r)}});this.resizeObserver=t,t.observe(e)}updateHeaderStyle(e=!0,t=0,s=window.innerWidth){const n=document.querySelector(".dashboard__header.left");e&&(this.initialOffset=n.offsetTop);let a;s<window.innerWidth/2?a=this.initialOffset:a=this.initialOffset+t,n.style.top=a+"px"}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver&&this.resizeObserver.disconnect()}}class Ft extends O{static get properties(){return{showTeaser:{type:Boolean},loading:{type:Boolean,attribute:!1},commitments:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1}}}constructor(){super(),this.showTeaser=!1,this.loading=!0,this.route=v.getRoute("3-month-plan"),this.filterName="3-month-plan-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.renderListItem=this.renderListItem.bind(this),this.closeCommitmentsModal=this.closeCommitmentsModal.bind(this)}firstUpdated(){super.firstUpdated();const e=this.filterStatus||"";this.fetchCommitments(e)}updated(){jQuery(document).foundation()}fetchCommitments(){const e=this.filterStatus;makeRequest("GET","commitments",{status:e},"zume_system/v1").done(t=>{this.commitments=t}).always(()=>{this.loading=!1})}openCommitmentsModal(){if(this.showTeaser)return;const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("open")}closeCommitmentsModal(){const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("close")}clearCommitmentsModal(){jQuery(".post-training-plan").each(function(e){this.value=""})}addCommitments(){const e=[];return jQuery(".post-training-plan").each(function(t){const s=jQuery(this).val();if(s){const a=jQuery(this).prev().text();console.log("Question: "+a+" Answer: "+s);var n=new Date;n.setDate(n.getDate()+30),this.value="";const r=makeRequest("POST","commitment",{user_id:jsObject.profile.user_id,post_id:jsObject.profile.contact_id,meta_key:"tasks",note:"Question: "+a+" Answer: "+s,question:a,answer:s,date:n,category:"post_training_plan"},"zume_system/v1");e.push(r.promise())}}),console.log(e),Promise.all(e).then(()=>{this.fetchCommitments(),this.closeCommitmentsModal()})}completeCommitment(e){let t={id:e,user_id:jsObject.profile.user_id};makeRequest("PUT","commitment",t,"zume_system/v1").done(s=>{this.fetchCommitments()})}deleteCommitment(e){let t={id:e,user_id:jsObject.profile.user_id};makeRequest("DELETE","commitment",t,"zume_system/v1").done(s=>{this.closeMenu(e),this.fetchCommitments()})}editCommitment(e){console.log(e)}filterCommitments(e){this.filterStatus=e,this.fetchCommitments(e),ZumeStorage.save(this.filterName,e),this.closeFilter()}closeFilter(){const e=this.querySelector("#filter-menu");jQuery(e).foundation("close")}closeMenu(e){const t=this.querySelector(`#kebab-menu-${e}`);jQuery(t).foundation("close")}renderListItem(e){const{question:t,answer:s,id:n,status:a}=e;return o`
            <li class="list__item | switcher | switcher-width-30">
                <span>${t} <b>${s}</b></span>
                <div class="list__secondary | grow-0">
                    <div class="d-flex w-6rem justify-content-center">
                        ${a==="closed"?o`<span class="icon zume-check-mark success"></span>`:o`
                                <button
                                    class="btn light uppercase tight break-anywhere"
                                    @click=${()=>this.completeCommitment(n)}
                                >
                                    ${jsObject.translations.done}
                                </button>
                            `}
                    </div>
                    <button class="icon-btn" data-toggle="kebab-menu-${n}">
                        <span class="icon zume-kebab brand-light"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="kebab-menu-${n}" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li class="hidden"><button class="menu-btn" @click=${()=>this.editCommitment(n)}><span class="icon zume-pencil"></span>${jsObject.translations.edit}</button></li>
                        <li><button class="menu-btn" @click=${()=>this.deleteCommitment(n)}><span class="icon zume-trash"></span>${jsObject.translations.delete}</button></li>
                    </ul>
                </div>
            </li>

        `}unlock3MonthPlan(){makeRequest("POST","log",{type:"training",subtype:"26_heard"},"zume_system/v1/").done(e=>{const t=new CustomEvent("user-state:change",{bubbles:!0});this.dispatchEvent(t);const s=new CustomEvent("user-host:change",{bubbles:!0});this.dispatchEvent(s),this.showTeaser=!1})}render(){return console.log(this.route),o`
            <div class="dashboard__content" data-no-secondary-area>
                <dash-header-right></dash-header-right>
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <div>
                            <dash-sidebar-toggle></dash-sidebar-toggle>
                            <span class="icon ${this.route.icon}"></span>
                            <h1 class="h3">${this.route.translation}</h1>
                        </div>
                        <div class="s0"></div>
                            <button class="icon-btn f-2" data-toggle="filter-menu" ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser?"true":"false"}>
                                <span class="visually-hidden">${jsObject.translations.filter}</span>
                                <span class="icon zume-filter" aria-hidden="true"></span>
                            </button>
                            <button class="icon-btn f-2" @click=${this.openCommitmentsModal} ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser?"true":"false"}>
                                <span class="visually-hidden">${jsObject.translations.add_commitments}</span>
                                <span class="icon zume-plus" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                        <ul>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus==="open"?"selected":""}" @click=${()=>this.filterCommitments("open")}>
                                    <span class="icon zume-sort-todo" aria-hidden="true"></span>
                                    ${jsObject.translations.active}
                                </button>
                            </li>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus==="closed"?"selected":""}" @click=${()=>this.filterCommitments("closed")}>
                                    <span class="icon zume-sort-done" aria-hidden="true"></span>
                                    ${jsObject.translations.completed}
                                </button>
                            </li>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus===""?"selected":""}" @click=${()=>this.filterCommitments("")}>
                                    <span class="icon zume-sort-all" aria-hidden="true"></span>
                                    ${jsObject.translations.all}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="dashboard__main p-2">
                    ${this.showTeaser?o`
                            <div class="container-inline">
                              <div class="dash-menu__list-item" data-locked="false" data-completed="false">
                                <div class="dash-menu__icon-area | stack--5">
                                  <span class="icon zume-progress dash-menu__list-icon"></span>
                                </div>
                                <div class="dash-menu__text-area | switcher | switcher-width-20">
                                  <div>
                                    <h3 class="f-1 bold uppercase">${jsObject.translations.locked_3_month_plan}</h3>
                                    <p>${jsObject.translations.locked_3_month_plan_explanation}</p>
                                  </div>
                                  <button class="dash-menu__view-button btn tight" @click=${this.unlock3MonthPlan}>${jsObject.translations.locked_3_month_plan_button}</button>
                                </div>
                              </div>
                            </div>
                        `:o`
                                <ul class="list">
                                    ${!this.loading&&this.commitments&&this.commitments.length>0?T(this.commitments,e=>e.id,this.renderListItem):""}
                                </ul>
                            `}
                </div>
            </div>
            <div class="reveal large" id="new-commitments-form" data-reveal data-v-offset="20">
                <button class="ms-auto d-block w-2rem" data-close aria-label="Close modal" type="button" @click=${this.clearCommitmentsModal}>
                        <img src=${`${jsObject.images_url}/close-button-01.svg`} alt="close button">
                </button>
                <div id="pieces-content" class="stack">
                    ${jsObject.three_month_plan_questions.forEach(e=>o`
                      <div class="stack--3">
                        <label for="plan_name">${e}</label>
                        <input type="text" class="post-training-plan" />
                      </div>
                    `)}
                    <div class="">
                      <button class="btn d-block ms-auto" @click=${this.addCommitments}>${jsObject.translations.save}</button>
                    </div>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-3-month-plan",Ft);class Bt extends O{static get properties(){return{showTeaser:{type:Boolean},churches:{type:Array,attribute:!1}}}constructor(){super(),this.showTeaser=!1,this.route=v.getRoute("my-churches"),this.churches=[],this.renderChurch=this.renderChurch.bind(this),this.addChurch=this.addChurch.bind(this),this.handleSubmit=this.handleSubmit.bind(this)}firstUpdated(){document.querySelector("#add-church-form").addEventListener("submit",this.handleSubmit)}updated(){jQuery(document).foundation()}joinCommunity(){makeRequest("POST","log",{type:"system",subtype:"join_community"},"zume_system/v1/").done(e=>{const t=new CustomEvent("user-state:change",{bubbles:!0});this.dispatchEvent(t)})}handleSubmit(e){e.preventDefault(),this.addChurch()}addChurch(){const e=this.churches.length+1,t=[{id:e,name:"This is a new church",location:"Birmingham, UK",depth:0},{id:`${e}-1`,name:"Tea Shop 1",location:"Birmingham, UK",parent:e,depth:1},{id:`${e}-2`,name:"Tea Shop 2",location:"Birmingham, UK",parent:e,depth:1},{id:`${e}-2-1`,name:"Tea Shop 2 child",location:"Birmingham, UK",parent:`${e}-2`,depth:2},{id:`${e}-3`,name:"Breakfast Shop",location:"Birmingham, UK",parent:e,depth:1}];this.churches=[...this.churches,...t],this.closeChurchModal()}editChurch(e){console.log("edit church",e)}deleteChurch(e){console.log("delete church",e)}openChurchModal(){if(this.showTeaser)return;const e=document.querySelector("#new-church-form");jQuery(e).foundation("open")}closeChurchModal(){const e=document.querySelector("#new-church-form");jQuery(e).foundation("close"),this.clearChurchModal()}clearChurchModal(){jQuery("#add-church-form input").each(function(e){this.value=""})}renderChurch({id:e,name:t,location:s,depth:n}){return o`
            <li
                class="list__item"
                data-depth=${n}
                style=${`--depth: ${n}`}
            >
                <div class="list__primary f-medium" data-large-gap>
                    <span>${t}</span>
                    <span>${s}</span>
                </div>
                <div class="list__secondary">
                    <button class="icon-btn" data-toggle="kebab-menu-${e}">
                        <span class="icon zume-kebab brand-light"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="kebab-menu-${e}" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li><button class="menu-btn" @click=${()=>this.editChurch(e)}><span class="icon zume-pencil"></span>${jsObject.translations.edit}</button></li>
                        <li><button class="menu-btn" @click=${()=>this.deleteChurch(e)}><span class="icon zume-trash"></span>${jsObject.translations.delete}</button></li>
                    </ul>
                </div>
            </li>
        `}render(){return o`
            <div class="dashboard__content" data-no-secondary-area>
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <div>
                            <dash-sidebar-toggle></dash-sidebar-toggle>
                            <span class="icon ${this.route.icon}"></span>
                            <h1 class="h3">${this.route.translation}</h1>
                        </div>
                        <div class="s0">
                            <button class="icon-btn f-2" data-toggle="filter-menu" ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser?"true":"false"}>
                                <span class="visually-hidden">${jsObject.translations.filter}</span>
                                <span class="icon zume-filter" aria-hidden="true"></span>
                            </button>
                            <button class="icon-btn f-2" @click=${this.openChurchModal} ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser?"true":"false"}>
                                <span class="visually-hidden">${jsObject.translations.add_church}</span>
                                <span class="icon zume-plus" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                        <ul>
                        </ul>
                    </div>
                </div>
                <dash-header-right></dash-header-right>

                <div class="dashboard__main p-2">
                    ${this.showTeaser?o`
                            <div class="container-inline">
                              <div class="dash-menu__list-item" data-locked="false" data-completed="false">
                                <div class="dash-menu__icon-area | stack--5">
                                  <span class="icon zume-locked dash-menu__list-icon"></span>
                                </div>
                                <div class="dash-menu__text-area | switcher | switcher-width-20">
                                  <div>
                                    <h3 class="f-1 bold uppercase">My Churches are Locked</h3>
                                    <p>My Churches tool makes it easy for you to track your simple church and the simple church generations that grow out of your spiritual family.</p>
                                  </div>
                                  <button class="dash-menu__view-button btn tight" @click=${this.joinCommunity}>
                                    ${jsObject.translations.join}
                                  </button>
                                </div>
                              </div>
                            </div>

                        `:o`
                            <ul class="list">
                                ${this.churches.length===0?o`
                                        <li
                                            role="button"
                                            class="list__item bg-brand-light white f-medium"
                                            data-depth=${0}
                                            @click=${this.addChurch}
                                        >
                                            ${jsObject.translations.add_first_church}
                                        </li>
                                    `:T(this.churches,e=>`${e.id}`,this.renderChurch)}
                            </ul>

                        `}
                </div>

            </div>
            <div class="reveal medium" id="new-church-form" data-reveal data-v-offset="20">
                <button class="ms-auto d-block w-2rem" data-close aria-label="Close modal" type="button" @click=${this.clearChurchModal}>
                        <img src=${`${jsObject.images_url}/close-button-01.svg`} alt="close button">
                </button>
                <div class="stack">
                    <h2>${jsObject.translations.my_churches}</h2>
                    <div id="add-church-form">
                        <div>
                            <label for="church-name">${jsObject.translations.church_name}</label>
                            <input id="church-name" name="church-name" type="text" />
                        </div>
                        <div>
                            <label for="number-of-people">${jsObject.translations.number_of_people}</label>
                            <input id="number-of-people" name="number-of-people" type="text" />
                        </div>
                        <div>
                            <label for="church-location">${jsObject.translations.church_location}</label>
                            <input id="church-location" name="church-location" type="text" />
                        </div>
                        <div>
                            <label for="parent-church">${jsObject.translations.parent_church}</label>
                            <input id="parent-church" name="parent-church" type="text" />
                        </div>
                        <div class="cluster">
                            <button class="btn light uppercase" @click=${this.addChurch}>${jsObject.translations.add_new_church}</button>
                            <button class="btn light uppercase outline" type="button" @click=${this.closeChurchModal}>${jsObject.translations.cancel}</button>
                        </div>
                    </div>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-churches",Bt);class Wt extends O{render(){return o`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <dash-sidebar-toggle></dash-sidebar-toggle>
                    <h1 class="h3">${jsObject.translations.my_coach}</h1>
                </div>
                <dash-header-right></dash-header-right>

              <div class="dashboard__main p-2">
                  <div class="container-inline">
                    <div class="dash-menu__list-item" data-locked="false" data-completed="false">
                      <div class="dash-menu__icon-area | stack--5">
                        <span class="icon zume-locked dash-menu__list-icon"></span>
                      </div>
                      <div class="dash-menu__text-area | switcher | switcher-width-20">
                        <div>
                          <h3 class="f-1 bold uppercase">${jsObject.translations.get_a_coach}</h3>
                          <p>${jsObject.translations.get_a_coach_explanation}</p>
                        </div>
                        <button class="dash-menu__view-button btn tight" @click=${this.joinCommunity}>
                          ${jsObject.translations.get_a_coach}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-coach",Wt);const R=class extends b{static get properties(){return{ctas:{type:Array,attribute:!1}}}constructor(){super(),this.allCtas=[],this.ctas=[],this.celebrations=[],this.hiddenCtaKeys=[],this.initialCtaKeys=[],this.removedCtaKeys=[],this.manageCtas=this.manageCtas.bind(this),this.transitionIn=this.transitionIn.bind(this),this.transitionCtas=this.transitionCtas.bind(this),this.renderCta=this.renderCta.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("ctas:changed",this.manageCtas),this.addEventListener("begin-cta-transitions",this.transitionIn),this.addEventListener("cta-transition-in-ended",this.logCelebrationsSeen)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("ctas:changed",this.manageCtas),this.removeEventListener("begin-cta-transitions",this.transitionIn),this.removeEventListener("cta-transition-in-ended",this.logCelebrationsSeen)}firstUpdated(){this.manageCtas()}updated(){this.dispatchEventAfterUpdated&&(this.dispatchEventAfterUpdated=!1,setTimeout(()=>{this.dispatchEvent(new CustomEvent("begin-cta-transitions"))},10))}manageCtas(){const e=this.getCtas(),[t,s,n]=this.diffCtas(e,this.ctas),a=[...t,...s].filter(({content_template:g})=>g==="celebration"),r=[...t,...s].filter(({content_template:g})=>g!=="celebration"),l=[...a,...r],c=this.getCtaKeys(l),h=this.getCtaKeys(n);this.ctas=l,this.celebrations=a,this.hiddenCtaKeys=this.getCtaKeys(t),this.removedCtaKeys=[...h,...c.slice(R.MAX_CTAS)],this.initialCtaKeys=c.slice(0,R.MAX_CTAS),this.ctas.length>1&&(this.dispatchEventAfterUpdated=!0)}getCtas(){return jsObject.allCtas??[]}diffCtas(e,t){const s=e.filter(({key:r})=>t.findIndex(({key:l})=>l===r)===-1),n=t.filter(({key:r})=>e.findIndex(({key:l})=>l===r)===-1),a=t.filter(({key:r})=>e.findIndex(({key:l})=>l===r)>-1);return[s,a,n]}transitionIn(){this.transitionCtas(this.removedCtaKeys,this.initialCtaKeys),setTimeout(()=>{this.dispatchEvent(new CustomEvent("cta-transition-in-ended"))},R.TRANSITION_TIMEOUT)}logCelebrationsSeen(){this.celebrations.forEach(({type:t,subtype:s})=>{makeRequest("POST","log",{type:t,subtype:s},"zume_system/v1")});const e=this.getCtaKeys(this.celebrations);jsObject.allCtas=jsObject.allCtas.filter(({key:t})=>!e.includes(t))}transitionCtas(e,t){(e.length>0?this.getCtaElements(e):[]).forEach(a=>{a&&(a.style.height=a.clientHeight+"px",setTimeout(()=>{a.classList.add("transition-out"),a.style.height=""},10))}),(t.length>0?this.getCtaElements(t):[]).forEach(a=>{a&&(a.classList.remove("hiding"),a.classList.add("showing"))})}getCtaElements(e){return this.renderRoot.querySelectorAll(e.map(t=>`[data-key="${t}"]`).join(","))}getCtaKeys(e){return e.map(({key:t})=>t)}isWizardLink(e){return e.includes("/wizard/")}openWizard(e){const t=e.split("/"),s=t[t.length-1];dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:s}}))}renderCta({content:e,content_template:t,key:s}){const n=this.hiddenCtaKeys.includes(s)?"hiding":"showing";if(t==="card")return o`
                <div class="stack | card cta ${n}" data-key=${s} style="--duration: ${R.TRANSITION_TIMEOUT}ms">
                    <h2 class="h5 text-center">${e.title}</h2>
                    <p>${e.description}</p>
                    ${this.isWizardLink(e.link)?o`
                            <button class="btn light uppercase" @click=${()=>this.openWizard(e.link)}>${e.link_text}</button>
                        `:o`
                            <a href="${e.link}" class="btn light uppercase">${e.link_text}</a>
                        `}

                </div>
            `;if(t==="celebration")return o`
                <div class="stack | card celebration ${n}" data-key=${s} style="--duration: ${R.TRANSITION_TIMEOUT}ms">
                    <h2 class="h5 text-center bold">${e.title}</h2>
                    <div class="d-flex align-items-center justify-content-between">
                        <img src="${jsObject.images_url+"/fireworks-2.svg"}" alt="" />
                        <img src="${e.image_url}" alt="" />
                        <img src="${jsObject.images_url+"/fireworks-2.svg"}" alt="" />
                    </div>
                    <p>${e.description}</p>
                </div>
            `}render(){return o`
            <div class="stack-margin-bottom">
                ${T(this.ctas,e=>e.key,this.renderCta)}
            </div>
        `}createRenderRoot(){return this}};let D=R;k(D,"FADE_TIMEOUT",3e3),k(D,"TRANSITION_TIMEOUT",500),k(D,"MAX_CTAS",3);customElements.define("dash-cta",D);class oe extends O{static get properties(){return{view:{type:String,attribute:!1},userState:{type:Object,attribute:!1}}}constructor(e){super(),this.routeName=e,this.route=v.getRoute(this.routeName),this.routes=v.childRoutesOf(this.routeName),this.view="list",this.userState=jsObject.user_stage.state,this.refetchState=this.refetchState.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("user-state:change",this.refetchState)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("user-state:change",this.refetchState)}switchView(e="list"){this.view=e}refetchState(){makeRequest("GET","user_stage",{},"zume_system/v1").done(e=>{console.log(this,e),(!e||!e.state)&&console.error("Stage or state data not returned from api"),jsObject.user_stage=e,this.userState=e.state})}renderLinks(e){return this.view==="grid"?o`
                <div class="nav-grid">
                    ${this.routes.map(t=>o`
                        <grid-link
                            href=${t.pattern}
                            text=${t.translation||""}
                            icon=${t.icon}
                            ?disableNavigate=${t.type==="handled-link"}
                            @click=${t.type==="handled-link"?s=>{v.getCompletedStatus(t.name,e)||t.clickHandler(s,this.dispatchEvent)}:null}
                            ?completed=${v.getCompletedStatus(t.name,e)}
                            ?locked=${v.getLockedStatus(t.name,e)}
                        >
                        </grid-link>
                        `)}
                </div>
            `:o`
            <div class="stack-3">
                ${this.routes.map(t=>o`
                    <list-link
                        href=${t.pattern}
                        text=${t.translation}
                        explanation=${t.explanation}
                        icon=${t.icon}
                        ?disableNavigate=${t.type==="handled-link"}
                        @click=${t.type==="handled-link"?s=>{v.getCompletedStatus(t.name,e)||t.clickHandler(s,this.dispatchEvent)}:null}
                        ?completed=${v.getCompletedStatus(t.name,e)}
                        ?locked=${v.getLockedStatus(t.name,e)}
                    >
                    </list-link>
                `)}
            </div>
        `}render(){return o`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <dash-sidebar-toggle></dash-sidebar-toggle>
                        <span class="icon ${this.route.icon}"></span>
                        <h1 class="h3">${this.route.translation}</h1>
                    </div>
                    <div class="icon-btn-group">
                        <button class="${this.view==="list"?"selected":""}" title=${jsObject.translations.list} @click=${()=>this.switchView("list")}>
                            <span class="icon zume-list" aria-hidden="true"></span>
                        </button>
                        <button class="${this.view==="grid"?"selected":""}" title=${jsObject.translations.grid} @click=${()=>this.switchView("grid")}>
                            <span class="icon zume-grid" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main p-2">
                    ${this.renderLinks(this.userState)}
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-top-level",oe);class Qt extends oe{constructor(){super("getting-started")}createRenderRoot(){return this}}customElements.define("dash-getting-started",Qt);class Zt extends O{static get properties(){return{showTeaser:{type:Boolean}}}constructor(){super(),this.showTeaser=!1}joinCommunity(){makeRequest("POST","log",{type:"system",subtype:"join_community"},"zume_system/v1/").done(e=>{const t=new CustomEvent("user-state:change",{bubbles:!0});this.dispatchEvent(t)})}render(){return o`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <dash-sidebar-toggle></dash-sidebar-toggle>
                    <h1 class="h3">${jsObject.translations.my_maps}</h1>
                </div>
                <dash-header-right></dash-header-right>

                <div class="dashboard__main p-2">
                    ${this.showTeaser?o`
                            <div class="container-inline">
                              <div class="dash-menu__list-item" data-locked="false" data-completed="false">
                                <div class="dash-menu__icon-area | stack--5">
                                  <span class="icon zume-locked dash-menu__list-icon"></span>
                                </div>
                                <div class="dash-menu__text-area | switcher | switcher-width-20">
                                  <div>
                                    <h3 class="f-1 bold uppercase">${jsObject.translations.my_maps_locked}</h3>
                                    <p>${jsObject.translations.my_maps_explanation}</p>
                                  </div>
                                  <button class="dash-menu__view-button btn tight" @click=${this.joinCommunity}>
                                    ${jsObject.translations.join_the_community}
                                  </button>
                                </div>
                              </div>
                            </div>
                        `:o`
                            <p>You can now see your vision maps here. (If you imagine them hard enough)</p>
                        `}
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-maps",Zt);class Kt extends O{render(){return o`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <dash-sidebar-toggle></dash-sidebar-toggle>
                    <h1 class="h3">Not Found</h1>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main">
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-not-found",Kt);class Vt extends O{static get properties(){return{showTeaser:{type:Boolean},loading:{type:Boolean,attribute:!1},commitments:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1}}}constructor(){super(),this.showTeaser=!1,this.loading=!0,this.route=v.getRoute("my-plans"),this.filterName="my-plans-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.renderListItem=this.renderListItem.bind(this),this.closeCommitmentsModal=this.closeCommitmentsModal.bind(this)}firstUpdated(){super.firstUpdated();const e=this.filterStatus||"";this.fetchCommitments(e)}updated(){jQuery(document).foundation()}fetchCommitments(){const e=this.filterStatus;makeRequest("GET","commitments",{status:e},"zume_system/v1").done(t=>{this.commitments=t}).always(()=>{this.loading=!1})}openCommitmentsModal(){if(this.showTeaser)return;const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("open")}closeCommitmentsModal(){const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("close")}clearCommitmentsModal(){jQuery(".post-training-plan").each(function(e){this.value=""})}addCommitments(){const e=[];return jQuery(".post-training-plan").each(function(t){const s=jQuery(this).val();if(s){const a=jQuery(this).prev().text();console.log("Question: "+a+" Answer: "+s);var n=new Date;n.setDate(n.getDate()+30),this.value="";const r=makeRequest("POST","commitment",{user_id:jsObject.profile.user_id,post_id:jsObject.profile.contact_id,meta_key:"tasks",note:"Question: "+a+" Answer: "+s,question:a,answer:s,date:n,category:"post_training_plan"},"zume_system/v1");e.push(r.promise())}}),console.log(e),Promise.all(e).then(()=>{this.fetchCommitments(),this.closeCommitmentsModal()})}completeCommitment(e){let t={id:e,user_id:jsObject.profile.user_id};makeRequest("PUT","commitment",t,"zume_system/v1").done(s=>{this.fetchCommitments()})}deleteCommitment(e){let t={id:e,user_id:jsObject.profile.user_id};makeRequest("DELETE","commitment",t,"zume_system/v1").done(s=>{this.closeMenu(e),this.fetchCommitments()})}editCommitment(e){console.log(e)}filterCommitments(e){this.filterStatus=e,this.fetchCommitments(e),ZumeStorage.save(this.filterName,e),this.closeFilter()}closeFilter(){const e=this.querySelector("#filter-menu");jQuery(e).foundation("close")}closeMenu(e){const t=this.querySelector(`#kebab-menu-${e}`);jQuery(t).foundation("close")}renderListItem(e){const{question:t,answer:s,id:n,status:a}=e;return o`
            <li class="list__item | switcher | switcher-width-30">
                <span>${t} <b>${s}</b></span>
                <div class="list__secondary | grow-0">
                    <div class="d-flex w-6rem justify-content-center">
                        ${a==="closed"?o`<span class="icon zume-check-mark success"></span>`:o`
                                <button
                                    class="btn light uppercase tight break-anywhere"
                                    @click=${()=>this.completeCommitment(n)}
                                >
                                    ${jsObject.translations.done}
                                </button>
                            `}
                    </div>
                    <button class="icon-btn" data-toggle="kebab-menu-${n}">
                        <span class="icon zume-kebab brand-light"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="kebab-menu-${n}" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li class="hidden"><button class="menu-btn" @click=${()=>this.editCommitment(n)}><span class="icon zume-pencil"></span>${jsObject.translations.edit}</button></li>
                        <li><button class="menu-btn" @click=${()=>this.deleteCommitment(n)}><span class="icon zume-trash"></span>${jsObject.translations.delete}</button></li>
                    </ul>
                </div>
            </li>

        `}render(){return o`
            <div class="dashboard__content" data-no-secondary-area>
                <dash-header-right></dash-header-right>
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <div>
                            <dash-sidebar-toggle></dash-sidebar-toggle>
                            <span class="icon ${this.route.icon}"></span>
                            <h1 class="h3">${this.route.translation}</h1>
                        </div>
                        <div class="s0">
                            <button class="icon-btn f-2" data-toggle="filter-menu" ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser?"true":"false"}>
                                <span class="visually-hidden">${jsObject.translations.filter}</span>
                                <span class="icon zume-filter" aria-hidden="true"></span>
                            </button>
                            <button class="icon-btn f-2" @click=${this.openCommitmentsModal} ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser?"true":"false"}>
                                <span class="visually-hidden">${jsObject.translations.add_commitments}</span>
                                <span class="icon zume-plus" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                        <ul>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus==="open"?"selected":""}" @click=${()=>this.filterCommitments("open")}>
                                    <span class="icon zume-sort-todo" aria-hidden="true"></span>
                                    ${jsObject.translations.active}
                                </button>
                            </li>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus==="closed"?"selected":""}" @click=${()=>this.filterCommitments("closed")}>
                                    <span class="icon zume-sort-done" aria-hidden="true"></span>
                                    ${jsObject.translations.completed}
                                </button>
                            </li>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus===""?"selected":""}" @click=${()=>this.filterCommitments("")}>
                                    <span class="icon zume-sort-all" aria-hidden="true"></span>
                                    ${jsObject.translations.all}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="dashboard__main p-2">
                    ${this.showTeaser?o`
                          <div class="container-inline">
                            <div class="dash-menu__list-item" data-locked="false" data-completed="false">
                              <div class="dash-menu__icon-area | stack--5">
                                <span class="icon zume-locked dash-menu__list-icon"></span>
                              </div>
                              <div class="dash-menu__text-area | switcher | switcher-width-20">
                                <div>
                                  <h3 class="f-1 bold uppercase">${jsObject.translations.my_plans_locked}</h3>
                                  <p>${jsObject.translations.my_plans_locked_explanation}</p>
                                </div>
                                <button class="dash-menu__view-button btn tight" @click=${this.joinCommunity}>
                                  ${jsObject.translations.create_3_month_plan}
                                </button>
                              </div>
                            </div>
                          </div>
                        `:o`
                                <ul class="list">
                                  ${!this.loading&&this.commitments&&this.commitments.length>0?T(this.commitments,e=>e.id,this.renderListItem):""}
                                </ul>
                            `}
                </div>
            </div>
            <div class="reveal large" id="new-commitments-form" data-reveal data-v-offset="20">
                <button class="ms-auto d-block w-2rem" data-close aria-label="Close modal" type="button" @click=${this.clearCommitmentsModal}>
                        <img src=${`${jsObject.images_url}/close-button-01.svg`} alt="close button">
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
                    <div class="">
                      <button class="btn d-block ms-auto" @click=${this.addCommitments}>Save</button>
                    </div>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-plans",Vt);class Jt extends oe{constructor(){super("practicing")}createRenderRoot(){return this}}customElements.define("dash-practicing",Jt);class Gt extends O{static get properties(){return{loading:{type:Boolean,attribute:!1},filteredItems:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1},hostProgress:{type:Object,attribute:!1}}}constructor(){super(),this.loading=!1,this.route=v.getRoute("my-progress"),this.trainingItems=Object.values(jsObject.training_items),this.hostProgress=jsObject.host_progress,this.filterName="my-progress-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.filteredItems=this.filterItems(this.filterStatus),this.openStates={},this.trainingItems.forEach(e=>{this.openStates[e.key]=!1}),this.renderListItem=this.renderListItem.bind(this),this.closeInfoModal=this.closeInfoModal.bind(this)}updated(){jQuery(document).foundation()}openInfoModal(){const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("open")}closeInfoModal(){const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("close")}filterProgress(e){this.filterStatus=e,this.filteredItems=this.filterItems(e),console.log(this.filteredItems),ZumeStorage.save(this.filterName,e),this.closeFilter()}filterItems(e){switch(e){case"heard":return this.trainingItems.filter(t=>{const s=t.host[0].key;return!!(this.hostProgress.list[s]||!1)});case"not-heard":return this.trainingItems.filter(t=>{const s=t.host[0].key;return!(this.hostProgress.list[s]||!1)});default:return[...this.trainingItems]}}closeFilter(){const e=this.querySelector("#filter-menu");jQuery(e).foundation("close")}toggleHost(e,t){t.stopImmediatePropagation();const{type:s,subtype:n,key:a}=e,r=this.hostProgress.list[a];r===!1&&makeRequest("POST","host",{type:s,subtype:n,user_id:jsObject.profile.user_id},"zume_system/v1").done(l=>{Array.isArray(l)&&(this.hostProgress.list[a]=!0),this.loadHostStatus()}),r===!0&&makeRequest("DELETE","host",{type:s,subtype:n,user_id:jsObject.profile.user_id},"zume_system/v1").done(l=>{Array.isArray(l)&&(this.hostProgress.list[a]=!1),this.loadHostStatus()})}loadHostStatus(){makeRequest("GET","host",{user_id:jsObject.profile.user_id},"zume_system/v1").done(e=>{this.hostProgress=e})}toggleDetails(e){const t=this.querySelector(`#details-${e}`),s=this.openStates[e],n=t.scrollHeight,a="200";s===!1?(t.style.height=n+"px",t.style.transitionDuration=a+"ms",t.dataset.state="opening",this.openStates[e]=!0,setTimeout(()=>{t.style.height="auto",t.dataset.state="open"},a)):(t.style.height=n+"px",t.dataset.state="closing",this.openStates[e]=!1,setTimeout(()=>{t.style.height="0"},10),setTimeout(()=>{t.dataset.state="closed"},a))}renderListItem(e){const{title:t,description:s,host:n,slug:a,key:r}=e;let l=[jsObject.site_url,jsObject.language,a].join("/");return jsObject.language==="en"&&(l=[jsObject.site_url,a].join("/")),o`
            <li class="switcher | switcher-width-30 list__item tight" @click=${()=>this.toggleDetails(r)} role="button">
                <div>
                    <h2 class="h5 bold m0">${t}</h2>
                    <div class="collapse" id="details-${r}" data-state="closed">
                        <div class="stack--2 mt--2">
                            <p class="f--1 gray-700">${s}</p>
                            <div class="cluster">
                                <share-links url=${l} title=${t} .t=${jsObject.share_translations}></share-links>

                                ${jsObject.has_pieces_pages?o`
                                        <a class="btn light uppercase" href=${l} @click=${c=>c.stopImmediatePropagation()}>${jsObject.translations.view}</a>
                                    `:""}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list__secondary grow-0" data-align-start>
                    <div class="training-progress">
                        <button
                            data-subtype=${n[0].subtype}
                            class=${this.hostProgress.list[n[0].key]?"active":""}
                            @click=${c=>this.toggleHost(n[0],c)}
                        >
                            <span class="icon zume-heard-concept"></span>
                        </button>
                        <button
                            data-subtype=${n[1].subtype}
                            class=${this.hostProgress.list[n[1].key]?"active":""}
                            @click=${c=>this.toggleHost(n[1],c)}
                        >
                            <span class="icon zume-obey-concept"></span>
                        </button>
                        <button
                            data-subtype=${n[2].subtype}
                            class=${this.hostProgress.list[n[2].key]?"active":""}
                            @click=${c=>this.toggleHost(n[2],c)}
                        >
                            <span class="icon zume-share-concept"></span>
                        </button>
                        <button
                            data-subtype=${n[3].subtype}
                            class=${this.hostProgress.list[n[3].key]?"active":""}
                            @click=${c=>this.toggleHost(n[3],c)}
                        >
                            <span class="icon zume-train-concept"></span>
                        </button>
                    </div>
                </div>
            </li>
        `}render(){var e,t,s,n,a,r,l,c;return o`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <dash-sidebar-toggle></dash-sidebar-toggle>
                        <span class="icon ${this.route.icon}"></span>
                        <h1 class="h3">${this.route.translation}</h1>
                        <div class="s0">
                            <button class="icon-btn f-2" data-toggle="filter-menu">
                                <span class="visually-hidden">${jsObject.translations.filter}</span>
                                <span class="icon zume-filter brand-light" aria-hidden="true"></span>
                            </button>
                            <button class="icon-btn f-2" @click=${this.openInfoModal}>
                                <span class="visually-hidden">${jsObject.translations.progress_info}</span>
                                <span class="icon zume-info brand-light" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                        <ul>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus==="heard"?"selected":""}" @click=${()=>this.filterProgress("heard")}>
                                    ${jsObject.translations.heard}
                                </button>
                                <button class="menu-btn w-100 ${this.filterStatus==="not-heard"?"selected":""}" @click=${()=>this.filterProgress("not-heard")}>
                                    ${jsObject.translations.not_heard}
                                </button>
                                <button class="menu-btn w-100 ${this.filterStatus==="all"?"selected":""}" @click=${()=>this.filterProgress("all")}>
                                    ${jsObject.translations.all}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main">
                    ${o`
                            <ul class="list">
                                ${T(this.filteredItems,h=>h.key,this.renderListItem)}
                            </ul>
                        `}
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
            <div class="reveal large" id="new-commitments-form" data-reveal data-v-offset="20">
                <button class="ms-auto d-block w-2rem" data-close aria-label="Close modal" type="button">
                        <img src=${`${jsObject.images_url}/close-button-01.svg`} alt="close button">
                </button>
                <div class="stack-2 host-info mx-2">
                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="heard" percent=${((t=(e=this.hostProgress)==null?void 0:e.percent)==null?void 0:t.h)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.heard}</h3>
                            <p class="italic">${jsObject.translations.heard_explanation}</p>
                        </div>
                    </div>
                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="obeyed" percent=${((n=(s=this.hostProgress)==null?void 0:s.percent)==null?void 0:n.o)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.obeyed}</h3>
                            <p class="italic">${jsObject.translations.obeyed_explanation}</p>
                        </div>
                    </div>
                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="shared" percent=${((r=(a=this.hostProgress)==null?void 0:a.percent)==null?void 0:r.s)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.shared}</h3>
                            <p class="italic">${jsObject.translations.shared_explanation}</p>
                        </div>
                    </div>

                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="trained" percent=${((c=(l=this.hostProgress)==null?void 0:l.percent)==null?void 0:c.t)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.trained}</h3>
                            <p class="italic">${jsObject.translations.trained_explanation}</p>
                        </div>
                    </div>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-progress",Gt);class Yt extends oe{constructor(){super("training")}createRenderRoot(){return this}}customElements.define("dash-training",Yt);class Xt extends O{static get properties(){return{showTeaser:{type:Boolean},loading:{type:Boolean,attribute:!1},sessions:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1}}}constructor(){super(),this.showTeaser=!1,this.loading=!1,this.route=v.getRoute("my-training"),this.currentSession="set_a_06",this.sessions=[{id:"set_a_01",name:"Session 1",datetime:1712077989881,completed:!0},{id:"set_a_02",name:"Session 2",datetime:1712077989881,completed:!0},{id:"set_a_03",name:"Session 3",datetime:1712077989881,completed:!0},{id:"set_a_04",name:"Session 4",datetime:1712077989881,completed:!0},{id:"set_a_05",name:"Session 5",datetime:1712077989881,completed:!0},{id:"set_a_06",name:"Session 6",datetime:1712077989881,completed:!1},{id:"set_a_07",name:"Session 7",datetime:1712077989881,completed:!1},{id:"set_a_08",name:"Session 8",datetime:1712077989881,completed:!1},{id:"set_a_09",name:"Session 9",datetime:1712077989881,completed:!1},{id:"set_a_10",name:"Session 10",datetime:1712077989881,completed:!1}],this.groupMembers=[{id:1,name:"Billy Bob"},{id:2,name:"Sandy Lou"},{id:3,name:"Willy Joe"},{id:4,name:"Bonnie Sue"}],this.renderListItem=this.renderListItem.bind(this)}firstUpdated(){super.firstUpdated()}editSession(e){}updated(){jQuery(document).foundation()}renderListItem(e){const{id:t,name:s,datetime:n,completed:a}=e;return o`
            <li class="list__item | switcher | switcher-width-20">
                <div class="list__primary">
                    ${this.currentSession===t?o`
                            <button class="icon-btn">
                                <span class="icon zume-play brand-light"></span>
                            </button>
                        `:o`
                            <span class="icon zume-check-mark success ${a?"":"invisible"} p--2"></span>
                        `}
                    <span class="f-medium">${s}</span>
                </div>
                <div class="list__secondary | grow-0">
                    <div class="d-flex w-6rem justify-content-center">
                        ${moment(n).format("MMM Do YY")}
                    </div>
                    <button class="icon-btn" data-toggle="kebab-menu-${t}">
                        <span class="icon zume-kebab brand-light"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="kebab-menu-${t}" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li><button class="menu-btn" @click=${()=>this.editSession(t)}><span class="icon zume-pencil"></span>${jsObject.translations.edit_time}</button></li>
                    </ul>
                </div>
            </li>

        `}renderMemberItem(e){console.log(e);const{name:t}=e;return o`
            <li>
                ${t}
            </li>
        `}render(){return o`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <dash-sidebar-toggle></dash-sidebar-toggle>
                        <span class="icon ${this.route.icon}"></span>
                        <h1 class="h3">${this.route.translation}</h1>
                    </div>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main p-2">
                    ${this.showTeaser?o`
                            <div class="container-inline">
                              <div class="dash-menu__list-item" data-locked="false" data-completed="false">
                                <div class="dash-menu__icon-area | stack--5">
                                  <span class="icon zume-locked dash-menu__list-icon"></span>
                                </div>
                                <div class="dash-menu__text-area | switcher | switcher-width-20">
                                  <div>
                                    <h3 class="f-1 bold uppercase">${jsObject.translations.my_training_locked}</h3>
                                    <p>${jsObject.translations.plan_a_training_explanation}</p>
                                  </div>
                                  <button class="dash-menu__view-button btn tight" @click=${this.joinCommunity}>
                                    ${jsObject.translations.plan_a_training}
                                  </button>
                                </div>
                              </div>
                            </div>
                        `:o`
                            <ul class="list">
                                ${!this.loading&&this.sessions&&this.sessions.length>0?T(this.sessions,e=>e.id,this.renderListItem):""}
                            </ul>
                        `}
                </div>
                <div class="dashboard__secondary stack">
                    <dash-cta></dash-cta>
                    <div class="card | group-members | grow-0">
                        <button class="f-0 f-medium d-flex align-items-center gap--2 black">
                            <span class="icon zume-group brand-light"></span> ${jsObject.translations.group_members} (${this.groupMembers.length})
                        </button>
                        <div class="collapse" data-state="open">
                            <!-- The functionality of the .collapse class needs to be refactored from dash-progress.js toggleDetails function to be re-used here -->
                            ${!this.loading&&this.groupMembers&&this.groupMembers.length>0?o`
                                    <ol class="ps-1">
                                        ${T(this.groupMembers,e=>e.id,this.renderMemberItem)}
                                    </ol>
                                `:""}
                        </div>
                        <button class="btn brand tight light mt--2">
                            ${jsObject.translations.invite_friends}
                        </button>
                    </div>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-trainings",Xt);class es extends b{firstUpdated(){const e=this.offsetTop;this.style.top=e+"px"}render(){return o`
            <div class="dashboard__header right">
                <dash-sidebar-toggle displayOn="medium"></dash-sidebar-toggle>
                <launch-course></launch-course>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-header-right",es);class ts extends b{static get properties(){return{displayOn:{type:String}}}constructor(){super(),this.displayOn="large"}toggleSidebar(){const e=new CustomEvent("toggle-dashboard-sidebar",{bubbles:!0});this.dispatchEvent(e)}render(){return o`
            <button class="btn f-0 light tight dashboard__sidebar-toggle break-${this.displayOn}" @click=${this.toggleSidebar}>${jsObject.translations.menu}</button>
        `}createRenderRoot(){return this}}customElements.define("dash-sidebar-toggle",ts);class je extends Ht(b){static get properties(){return{href:{type:String},class:{type:String},locked:{type:Boolean},completed:{type:Boolean},disableNavigate:{type:Boolean},icon:{type:String},text:{type:String},explanation:{type:String}}}constructor(){super(),this.href="",this.class="",this.icon="",this.text="",this.explanation="",this.locked=!1,this.completed=!1,this.disableNavigate=!1}handleClick(e){this.disableNavigate||(e.preventDefault(),this.navigate(this.href))}printBool(e){return e?"true":"false"}render(){return o`
            <a
                href=${this.href}
                class=${this.class}
                @click=${this.handleClick}
                aria-disabled=${this.printBool(this.completed)}
                data-completed=${this.printBool(this.completed)}
                data-locked=${this.printBool(this.locked)}
            >
                <span class="icon ${this.icon} brand-light"></span>
                <span>${this.text}</span>
            </a>
        `}createRenderRoot(){return this}}customElements.define("nav-link",je);class ss extends je{constructor(){super()}renderText(){return this.text.split(" ").map(e=>o`
            <span>${e}</span>
        `)}getIcon(){return this.locked?this.icon+"-locked":this.icon}render(){return o`
            <a
                href=${this.href}
                class="card-btn grid-link"
                role="button"
                @click=${this.handleClick}
                aria-disabled=${this.printBool(this.locked)}
                data-locked=${this.printBool(this.locked)}
                data-completed=${this.printBool(this.completed)}
            >
                <span class="icon ${this.getIcon()} brand-light"></span>
                ${this.renderText()}
            </a>
        `}}customElements.define("grid-link",ss);class is extends je{constructor(){super()}renderText(){return this.text.split(" ").map(e=>o`
            <span>${e}</span>
        `)}getIcon(){return this.locked?this.icon+"-locked":this.icon}render(){return o`
            <div class="container-inline">
                <div
                    class="dash-menu__list-item"
                    data-locked=${this.printBool(this.locked)}
                    data-completed=${this.printBool(this.completed)}
                >
                    <div class="dash-menu__icon-area | stack--5">
                        <span class="icon ${this.getIcon()} dash-menu__list-icon"></span>
                    </div>
                    <div class="dash-menu__text-area | switcher | switcher-width-20">
                        <div>
                            <h3 class="f-1 bold uppercase">${this.text}</h3>
                            <p>${this.explanation}</p>
                        </div>
                        ${this.completed?o`
                                <div class="grow-0"><span class="icon zume-check-mark grow-0 | dash-menu__list-success"></span></div>
                            `:o`
                                <a
                                    href=${this.href}
                                    class="dash-menu__view-button btn ${this.locked?"locked":"light"} tight"
                                    role="button"
                                    @click=${this.handleClick}
                                >
                                    ${this.locked?jsObject.translations.preview:this.disableNavigate?this.text:jsObject.translations.view_now}
                                </a>
                            `}
                    </div>
                </div>
            </div>
        `}}customElements.define("list-link",is);class ns extends b{static get properties(){return{translations:{type:Object},urls:{type:Object},position:{type:String},asLink:{type:Boolean}}}constructor(){super(),typeof jsObject<"u"&&(this.translations=jsObject.translations,this.urls=jsObject.urls),this.position="bottom";const t=document.querySelector("html").dataset.dir;this.isRtl=t==="rtl"}updated(){jQuery(document).foundation()}render(){return o`
            <button class="${this.asLink?"btn dark tight":" btn uppercase light tight"}" data-toggle="launch-course-panel">
                ${this.translations.launch_course}
            </button>
            <div
                class="dropdown-pane"
                id="launch-course-panel"
                data-dropdown
                data-auto-focus="true"
                data-close-on-click="true"
                data-position=${this.position}
                data-alignment=${this.isRtl?"right":"left"}
            >
                <ul>
                    <li><a class="menu-btn" href="${this.urls.launch_ten_session_course}"><span class="icon zume-course"></span>${this.translations.ten_session_course}</a></li>
                    <li><a class="menu-btn" href="${this.urls.launch_twenty_session_course}"><span class="icon zume-course"></span>${this.translations.twenty_session_course}</a></li>
                    <li><a class="menu-btn" href="${this.urls.launch_intensive_session_course}"><span class="icon zume-course"></span>${this.translations.three_day_intensive_course}</a></li>
                </ul>
            </div>
        `}createRenderRoot(){return this}}customElements.define("launch-course",ns);class as extends b{constructor(){super();k(this,"addressCallback",t=>{t.features.length<1?this.locations=-1:this.locations=t.features});k(this,"processLocation",debounce(getAddressSuggestions(this.addressCallback,jsObject.map_key)));this.userProfile={},this.locations=[]}static get properties(){return{userProfile:{type:Object},loading:{type:Boolean,attribute:!1},locations:{type:Array,attribute:!1}}}firstUpdated(){this.nameInput=this.renderRoot.querySelector("#full_name"),this.phoneInput=this.renderRoot.querySelector("#phone"),this.emailInput=this.renderRoot.querySelector("#email"),this.preferredEmailInput=this.renderRoot.querySelector("#communications_email"),this.cityInput=this.renderRoot.querySelector("#city"),this.prefferedLanguageInput=this.renderRoot.querySelector("#preferred_language"),this.addressResultsContainer=this.renderRoot.querySelector("#address_results")}submitProfileForm(t){t.preventDefault();const s=this.nameInput.value,n=this.emailInput.value,a=this.preferredEmailInput.value,r=this.phoneInput.value,l=this.prefferedLanguageInput.value,c={name:s,phone:r,email:n,communications_email:a,preferred_language:l};c.location_grid_meta=getLocationGridFromMapbox(this.mapboxSelectedId,this.userProfile.location),this.loading=!0,fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(c),headers:{"X-WP-Nonce":jsObject.nonce}}).then(h=>h.json()).then(h=>{const g=new CustomEvent("user-profile:change",{bubbles:!0,detail:h});this.dispatchEvent(g);const u=new CustomEvent("user-state:change",{bubbles:!0});this.dispatchEvent(u)}).catch(h=>{console.error(h)}).finally(()=>{this.loading=!1})}selectAddress(t){const s=t.target.id,n=t.target.dataset.placeName;this.cityInput.value=n,this.mapboxSelectedId=s,this.locations=[]}render(){var t;return o`
            <form action="" id="profile-form" @submit=${this.submitProfileForm}>

                <div class="">
                    <label for="full_name">${jsObject.translations.name}</label>
                    <input class="input" required type="text" id="full_name" name="full_name" value=${this.userProfile.name}>
                </div>
                <div class="">
                    <label for="phone">${jsObject.translations.phone}</label>
                    <input class="input" type="tel" id="phone" name="phone" value=${this.userProfile.phone}>
                </div>
                <div class="">
                    <label for="email">${jsObject.translations.email}</label>
                    <input class="input" type="email" id="email" name="email" value=${this.userProfile.email}>
                </div>
                <div class="">
                    <label for="communications_email">${jsObject.translations.communications_email}</label>
                    <input class="input" type="email" id="communications_email" name="communications_email" value=${this.userProfile.communications_email}>
                </div>
                <div class="">
                    <label for="city">${jsObject.translations.city}</label>
                    <input class="input" type="text" id="city" name="city" value=${((t=this.userProfile.location)==null?void 0:t.label)??""} @input=${this.processLocation}>
                </div>
                    ${Array.isArray(this.locations)?"":o`
                            ${jsObject.translations.no_locations}
                        `}
                    ${Array.isArray(this.locations)&&this.locations.length>0?o`
                            <div id="address_results" class="stack my-0">
                                ${this.locations.map(s=>o`
                                    <div
                                        class="card-btn | text-center"
                                        role="button"
                                        id="${s.id}"
                                        data-place-name="${s.place_name}"
                                        @click=${this.selectAddress}
                                    >
                                        ${s.place_name}
                                    </div>
                                `)}
                            </div>
                        `:""}
                </div>

                <div>
                    <label for="preferred_language">${jsObject.translations.language}</label>
                    <select class="input" name="preferred_language" id="preferred_language">

                    ${Object.values(jsObject.languages).map(s=>o`
                            <option value=${s.code} ?selected=${this.userProfile.preferred_language===s.code}>
                                ${s.nativeName} - ${s.enDisplayName}
                            </option>
                        `)}

                    </select>
                </div>

                <button class="btn my-0" id="submit-profile" ?disabled=${this.loading}>${jsObject.translations.save}</button>
                <span class="loading-spinner ${this.loading?"active":""}"></span>

            </form>
        `}createRenderRoot(){return this}}customElements.define("profile-form",as);class w extends b{static get properties(){return{slide:{type:Object},id:{type:String}}}constructor(){super(),this.maxPercentage=80,this.resizeCallback=this.resizeCallback.bind(this)}connectedCallback(){super.connectedCallback(),this.dir=document.querySelector("html").dir,window.addEventListener("resize",this.resizeCallback)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.resizeCallback)}firstUpdated(){this.resizeSlide(window),this.fitContentToSlide(".activity-card"),this.fitContentToSlide(".content-area__text")}resizeCallback(e){this.resizeSlide(e.currentTarget)}fitContentToSlide(e){const t=this.renderRoot.querySelector(e),s=this.renderRoot.querySelector(".slides-card");if(!t||!s)return;const n=t.getBoundingClientRect().height,a=t.parentElement.getBoundingClientRect().top,r=s.getBoundingClientRect().top,c=s.getBoundingClientRect().height-(a-r),h=n/c*100;if(h>this.maxPercentage){const u=2*this.maxPercentage/h;t.style.fontSize=`calc( var(--slide-unit) * ${u} )`}}resizeSlide(e){const t=document.querySelectorAll(".slides-card"),s=document.querySelectorAll(".video-slide"),n=[...t,s],{innerWidth:a,innerHeight:r}=e,l=n[0].getBoundingClientRect().width,c=a/r>16/9,h=c?16/9*r/100:l/100,g=c?r:9/16*l;this.slideUnit=h,this.slideHeight=g,n.forEach(u=>{u.style=`
                --slide-unit: ${h}px;
                --slide-height: ${g}px;
            `})}renderProgressBar(){let e=[],t=[];for(let s=0;s<this.slide.progress_bar.length;s++){const n=this.slide.progress_bar[s];if(n===!1){e.push(t),e.push(!1),t=[];continue}t.push(n)}return e.push(t),o`
            <div class="stage ${this.slide.key}-bar">
                <div class="progress-bar-wrapper">
                    ${e.map(s=>s?o`
                            <div class="progress-bar-stage">
                                ${s.map(n=>o`
                                    <div class="progress-bar-item ${this.slide.key===n?"active":""}"></div>
                                `)}
                            </div>
                        `:o`<div class="progress-bar-divider"></div>`)}
                </div>
            </div>
        `}renderContent(e=[],t=!1,s=!1){return e.map((n,a)=>t&&a===0?o`<p><strong>${n}</strong></p>`:Array.isArray(n)?o`
                    <ul class="bullets">
                        ${n.map(r=>o`<li>${r}</li>`)}
                    </ul>
                `:s?o`<p><strong>${n}</strong></p>`:o`<p>${n}</p>`)}render(){return o`
            <div class="slides-card">
                <div class="center"></div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-slide",w);class rs extends w{static get properties(){return{slide:{type:Object},id:{type:String},offCanvasId:{type:String,attribute:!1}}}firstUpdated(){jQuery(document).foundation(),this.offCanvasId="activityOffCanvas"+this.id,this.offCanvasSelector="#"+this.offCanvasId,super.firstUpdated()}openMenu(){const e=document.querySelector(this.offCanvasSelector);console.log(e,this.offCanvasSelector),jQuery(e).foundation("open")}closeMenu(){const e=document.querySelector(this.offCanvasSelector);jQuery(e).foundation("close")}render(){return o`
            <div class="slides-card activity-slide | position-relative">
                ${this.renderProgressBar()}
                <div class="cover-slide">
                    <button
                        type="button"
                        class="btn icon-btn absolute top ${this.dir==="rtl"?"left":"right"} z-1 m-0 f-3 bypass-nav-click"
                        @click=${this.openMenu}
                    >
                        <span class="icon zume-info"></span>
                    </button>
                    <h2 class="title text-center" data-small>${this.slide.center[0]} ${this.slide.length}</h2>
                    <div class="two-column right">
                        <div>
                            <div class="activity-card | stack--2" data-expanded-padding>
                                ${this.renderContent(this.slide.left,!0)}
                            </div>
                        </div>
                        <div class="content-area">
                            <div class="stack center | text-center">
                                <div class="qr-code"><a href="${this.slide.right[0]}" target="_blank" class="bypass-nav-click"><img src="${this.slide.right[1]}" /></a></div>
                                <p>${this.slide.right[2]}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="bg-white | activity-flyout bypass-nav-click off-canvas ${this.dir==="rtl"?"position-left":"position-right"}"
                    id=${this.offCanvasId||"activityOffCanvas"}
                    data-off-canvas
                    data-transition="overlap"
                >
                    <button class="close-button" aria-label="Close menu" type="button" data-close>
                      <span aria-hidden="true">&times;</span>
                    </button>

                    <iframe
                        src=${this.slide.right[0]||""}
                        frameborder="0"
                        width="100%"
                    >
                    </iframe>
                </div>
            </div>
        `}}customElements.define("activity-slide",rs);class os extends w{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="cover-slide">
                    <div class="grow-1 d-flex align-items-center">
                        <div class="center activity-card stack--2" data-large>
                            <span>${this.slide.center[0]}</span>
                            ${this.slide.center[1]?o`<span>${this.slide.center[1]}</span>`:""}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("break-slide",os);class ls extends w{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="cover-slide">
                    <h2 class="title text-center">${this.slide.center[0]??""} ${this.slide.length??""}</h2>
                    <div class="center w-70 grow-1 justify-content-center">
                        <div class="stack--2 activity-card">
                            ${this.renderContent(this.slide.left,!0)}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("center-slide",ls);class cs extends w{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon"><span class="icon zume-phone"></span></div>
                            <h2 class="title">${this.slide.left[0]}</h2>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack">
                            <p>${this.slide.right[0]}</p>
                            <div class="qr-code"><a href="${this.slide.right[1]}" target="_blank"><img src="${this.slide.right[2]}" /></a></div>
                            <p>${this.slide.right[3]} <span style="font-weight:bold;">${this.slide.right[4]}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("checkin-slide",cs);class ds extends w{render(){return o`
            <div class="slides-card">
                <div class="cover-page container">
                    <div>
                        <div class="center activity-card" data-large>
                            <p>${this.slide.center[0]}</p>
                        </div>
                        <div class="center">
                          <p><img src="${this.slide.center[1]??""}" /></p>
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("congratulations-slide",ds);class hs extends w{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon zume-discuss"></span>
                            </div>
                            <div class="stack">
                                <h2 class="title">${this.slide.left[0]}</h2>
                                <span class="subtitle">${this.slide.length??""}</span>
                            </div>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack content-area__text">
                            ${this.renderContent(this.slide.right)}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("discuss-slide",hs);class us extends w{render(){return o`
            <div class="slides-card">
                <div class="cover-page">
                    <div class="center stack | text-center w-50">
                        <div class="w-30"><img src="${this.slide.center[0]}" /></div>
                        <p>${this.slide.center[1]}</p>
                        <div class="w-30"><img src="${this.slide.center[2]}" /></div>
                        <p>${this.slide.center[3]}</p>
                    </div>
                </div>
            </div>
        `}}customElements.define("final-slide",us);class ps extends w{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column right">
                    <div>
                        <div class="cover-slide center text-center">
                            <p><strong>${this.slide.left[0]}</strong></p>
                            <div class="mw-60"><img src="${this.slide.left[1]}" /></div>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack center | text-center">
                            <div class="qr-code"><a href="${this.slide.right[0]}" target="_blank"><img src="${this.slide.right[1]}" /></a></div>
                            <p>${this.slide.right[2]}</p>
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("left-image-slide",ps);class ms extends w{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="cover-slide">
                    <h2 class="title text-center" data-small>${this.slide.center[0]}</h2>
                    <div class="two-column middle" data-align-start>
                        <div>
                            <div class="stack align-items-center">
                                <p><strong>${this.slide.left[0]}</strong></p>
                                <div class="qr-code"><a href="${this.slide.left[1]}" target="_blank"><img src="${this.slide.left[2]}" /></a></div>
                                <p>${this.slide.left[3]}</p>
                            </div>
                        </div>
                        <div>
                            <div class="stack align-items-center">
                                <p><strong>${this.slide.right[0]}</strong></p>
                                <div class="qr-code"><a href="${this.slide.right[1]}" target="_blank"><img src="${this.slide.right[2]}" /></a></div>
                                <p>${this.slide.right[3]}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("next-steps-slide",ms);class gs extends w{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="obey-slide">
                    <div class="two-column left">
                        <div>
                            <div class="title-area">
                                <div class="title-icon">
                                    <span class="icon zume-obey-concept"></span>
                                </div>
                                <h2 class="title">${this.slide.left[0]}</h2>
                            </div>
                        </div>
                        <div class="content-area">
                            <p>${this.slide.right[0]}</p>
                        </div>
                    </div>
                    <div class="two-column left">
                        <div>
                            <div class="title-area">
                                <div class="title-icon">
                                    <span class="icon zume-share-concept"></span>
                                </div>
                                <h2 class="title">${this.slide.left[1]}</h2>
                            </div>
                        </div>
                        <div class="content-area">
                            <p>${this.slide.right[1]}</p>
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("obey-slide",gs);class bs extends w{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon zume-overview"></span>
                            </div>
                            <h2 class="title">${this.slide.left[0]}</h2>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack content-area__text">
                            ${this.renderContent(this.slide.right,!1,!0)}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("overview-slide",bs);class vs extends w{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon zume-pray"></span>
                            </div>
                            <div class="stack">
                                <h2 class="title">${this.slide.left[0]}</h2>
                                <span class="subtitle">${this.slide.length}</span>
                            </div>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="activity-card stack--2" expanded-padding>
                            ${this.renderContent(this.slide.right)}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("pray-slide",vs);class fs extends w{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon zume-review"></span>
                            </div>
                            <h2 class="title">${this.slide.left[0]}</h2>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack content-area__text">
                            ${this.renderContent(this.slide.right,!1,!0)}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("review-slide",fs);class $s extends w{render(){return o`
            <div>
                <div class="slides-card">
                    ${this.renderProgressBar()}
                    <div class="cover-slide | title-slide | text-center">
                        <div class="stack-1 | w-100 grow-1 justify-content-center">
                            <div class="center | w-40"><img src=${this.slide.center[0]} /></div>
                            <h2>${this.slide.center[1]}</h2>
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("title-slide",$s);class ys extends w{static get properties(){return{slide:{type:Object},showButtons:{type:Boolean},id:{type:String},scriptUrl:{type:String,attribute:!1},offCanvasId:{type:String,attribute:!1}}}firstUpdated(){jQuery(document).foundation(),this.offCanvasId="informationOffCanvas"+this.id,this.offCanvasSelector="#"+this.offCanvasId,this.loadScriptIntoFrame()}openMenu(){const e=document.querySelector(this.offCanvasSelector);console.log(this.offCanvasId,e),jQuery(e).foundation("open")}closeMenu(){const e=document.querySelector(this.offCanvasSelector);jQuery(e).foundation("close")}loadScriptIntoFrame(){const e=this.slide.script_id,t=jsObject.language,s=new URL(location.href),n=new URL(s.origin);n.pathname=[t,"zume_app","script"].join("/"),n.searchParams.append("s",e),this.scriptUrl=n.href}render(){return o`
            <div class="video-slide">

                <button
                    type="button"
                    class="btn icon-btn absolute top ${this.dir==="rtl"?"left":"right"} z-1 m-0 f-3 bypass-nav-click"
                    @click=${this.openMenu}
                >
                    <span class="icon zume-info"></span>
                </button>

                <div class="widescreen flex-video">
                    <iframe src="${this.slide.center[0]}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                            frameborder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                    >
                    </iframe>
                </div>

                ${this.showButtons===!0?o`
                     <!-- These buttons have no click handlers. They essentially give a space to allow the
                mouse click to trigger the click left/right side of screen event -->
                    <button
                        type="button"
                        class="btn icon-btn absolute middle left mx-0"
                    >
                        <img
                            src="${jsObject.images_url}/chevron.svg"
                            alt=${jsObject.translations.previous_slide}
                            class="svg white rotate-90 w-1rem h-1rem"
                        />
                    </button>
                    <button
                        type="button"
                        class="btn icon-btn absolute middle right mx-0"
                    >
                        <img
                            src="${jsObject.images_url}/chevron.svg"
                            alt=${jsObject.translations.next_slide}
                            class="svg white rotate--90 w-1rem h-1rem"
                        />
                    </button>
                `:""}
            </div>
            <div
                class="bg-white | information-flyout bypass-nav-click off-canvas ${this.dir==="rtl"?"position-left":"position-right"}"
                id=${this.offCanvasId||"informationOffCanvas"}
                data-off-canvas
                data-transition="overlap"
            >
                <button class="close-button" aria-label="Close menu" type="button" data-close>
                  <span aria-hidden="true">&times;</span>
                </button>

                <iframe
                    src=${this.scriptUrl||""}
                    frameborder="0"
                    width="100%"
                >
                </iframe>
            </div>
        `}}customElements.define("video-slide",ys);class _s extends w{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon zume-watch"></span>
                            </div>
                            <div class="stack">
                                <h2 class="title">${this.slide.left[0]}</h2>
                                <span class="subtitle">${this.slide.length??""}</span>
                            </div>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack content-area__text">
                            ${this.renderContent(this.slide.right,!0)}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("watch-slide",_s);class ws extends w{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon"><img src="https://placehold.co/60x60/png" /></div>
                            <div class="stack">
                                <h2 class="title">${this.slide.left[0]}</h2>
                                <span class="subtitle">${this.slide.length}</span>
                            </div>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="activity-card | stack--2" expanded-padding>
                            ${this.renderContent(this.slide.right)}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("look-back-slide",ws);const He=["slideshow","guide"];class ks extends b{static get properties(){return{languageCode:{type:String},homeUrl:{type:String},assetsPath:{type:String},zumeSessions:{attribute:!1},menu:{attribute:!1},lessonIndex:{attribute:!1},sessionKey:{attribute:!1},view:{attribute:!1},linkNodes:{attribute:!1},showIndex:{attribute:!1}}}constructor(){super(),this.handleSessionLink=this.handleSessionLink.bind(this),this.handleHistoryPopState=this.handleHistoryPopState.bind(this)}connectedCallback(){super.connectedCallback();const e=new URL(window.location.href),{sessions:t,menu:s}=this.getZumeSessions(e);this.zumeSessions=t,this.menu=s;const n=this.getLessonIndex(e);this.lessonIndex=n,this.sessionKey="",this.view=this.getView(e),this.changeSession(n,!1,t),window.addEventListener("popstate",this.handleHistoryPopState)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handleHistoryPopState)}firstUpdated(){document.querySelectorAll(".language-selector").forEach(function(t){t.addEventListener("click",()=>{const s=t.dataset.value,n=new URL(location.href),a=n.pathname.substring(1).split("/");let r="";a.length>0&&jsObject.zume_languages.includes(a[0])?r=a.slice(1).join("/"):r=a.join("/"),s!=="en"?r="/"+s+"/"+r:r="/"+r,r+=n.search,location.href=r})})}getView(e){if(e.searchParams.has("view")){const t=e.searchParams.get("view");if(He.includes(t))return t}else return"slideshow"}getLessonIndex(e){if(e.searchParams.has("session")){const t=e.searchParams.get("session");if(t==="index")return"index";const s=Number(t);return Number.isInteger(s)?s-1:0}else return 0}getZumeSessions(e){const t=e.searchParams.get("type")||"10";this.type=t;let s,n;switch(t){case"10":s=zume10Sessions,n=zume10SessionsMenu;break;case"20":s=zume20Sessions,n=zume20SessionsMenu;break;case"intensive":s=zumeIntensiveSessions,n=zumeIntensiveSessionsMenu;break;default:s=zume10Sessions,n=zume10SessionsMenu;break}return{sessions:s,menu:n}}handleSessionLink(e){const t=e.target,s=Number(t.dataset.sessionNumber);this.lessonIndex=s,this.showIndex===!0&&(this.showIndex=!1),this.changeSession(this.lessonIndex),this.closeMenu()}handleSubSectionLink(e,t){this.lessonIndex=e,this.showIndex===!0&&(this.showIndex=!1),this.changeSession(this.lessonIndex),this.sessionKey=t,this.closeMenu()}getNextSession(){this.lessonIndex+=1,this.changeSession(this.lessonIndex)}getPreviousSession(){this.lessonIndex-=1,this.changeSession(this.lessonIndex)}changeSession(e,t=!0,s=null){if(e==="index"){this.showIndex=!0;return}else this.showIndex=!1;const n=s||this.zumeSessions;let a=e;e<0&&(a=0),e>n.length-1&&(a=n.length-1),this.lessonIndex=a,this.session=n[a],t&&this.pushHistory()}pushHistory(){const e=this.lessonIndex,t=this.view,s=new URL(window.location.href);e!==null&&Number.isInteger(e)&&s.searchParams.set("session",e+1),t&&s.searchParams.set("view",t),window.history.pushState(null,null,s.href)}handleHistoryPopState(){var n;const e=new URL(location.href),t=e.searchParams.has("session")?e.searchParams.get("session"):null,s=e.searchParams.get("view");(n=document.querySelector(".js-off-canvas-overlay"))==null||n.classList.remove("is-visible"),Number.isInteger(Number(t))&&(this.lessonIndex=t-1,this.changeSession(this.lessonIndex,!1)),t==="index"&&(this.lessonIndex="index",this.changeSession("index",!1)),s&&He.includes(s)&&(this.view=s)}getSessionSections(){return this.session?this.session:[]}switchViews(e=!0){this.view==="guide"?this.view="slideshow":this.view="guide",e===!0&&this.pushHistory()}openMenu(){const e=this.querySelector("#offCanvas");jQuery(e).foundation("open")}closeMenu(){const e=this.querySelector("#offCanvas");jQuery(e).foundation("close")}render(){this.showIndex;const e=this.type==="intensive"?"container-xsm":"container-sm";return o`
            ${this.showIndex?o`
                    <div class="course-index | bg-brand-gradient">
                        <img src="${jsObject.images_url}/zume-training-logo-white.svg" alt="Zume Logo" class="mx-auto w-70 py-1" />
                        <div class="${e}" data-max-width="750">
                            <div class="grid | grid-min-8rem gutter0">
                                ${this.zumeSessions.map((t,s)=>o`
                                    <button
                                        class="card-btn | bg-white black m--2 gap--3 aspect-1 justify-content-evenly"
                                        data-session-number=${s}
                                        @click=${this.handleSessionLink}
                                    >
                                        <h2 class="f-0 bold">${jsObject.translations.session}</h2>
                                        <p class="f-3 bold lh-sm">${s+1}</p>
                                        <span class="icon zume-course brand-light f-3"></span>
                                    </button>
                                `)}
                            </div>
                        </div>
                    </div>
                `:""}

            <nav class="stack | bg-white px-0 text-center | presenter-menu off-canvas ${this.dir==="rtl"?"position-right":"position-left"} justify-content-between py-1" id="offCanvas" data-off-canvas data-transition="overlap">
                <div class="stack">
                    <!-- Close button -->
                    <button class="close-button" aria-label="Close menu" type="button" data-close>
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <!-- Menu -->

                    <ul class="vertical menu accordion-menu" data-accordion-menu data-submenu-toggle="true" data-multi-open="false">
                        ${Object.values(this.menu).map(({title:t,submenu:s},n)=>o`
                            <li>
                                <a
                                    class="session-link"
                                    data-session-number="${n}"
                                    @click=${this.handleSessionLink}
                                >
                                    ${t}
                                </a>
                                <ul class="menu vertical nested ${this.lessonIndex===n?"is-active":""}">
                                    ${s.map(({key:a,title:r,length:l})=>o`
                                            <a
                                                class="session-link"
                                                data-subitem
                                                href=${`#${a}`}
                                                @click=${()=>this.handleSubSectionLink(n,a)}
                                            >
                                                <span>${r}</span> <span>${l}</span>
                                            </a>
                                        `)}

                                </ul>
                            </li>
                        `)}
                    </ul>
                </div>

                <div class="">

                    <div class="cluster">
                        <a class="btn light uppercase tight" href="${this.homeUrl}">${jsObject.translations.home}</a>
                        <button class="btn d-flex align-items-center justify-content-center gap--4 light tight" data-open="language-menu-reveal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" class="ionicon" viewBox="0 0 512 512"><path d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M256 48c-58.07 0-112.67 93.13-112.67 208S197.93 464 256 464s112.67-93.13 112.67-208S314.07 48 256 48z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M117.33 117.33c38.24 27.15 86.38 43.34 138.67 43.34s100.43-16.19 138.67-43.34M394.67 394.67c-38.24-27.15-86.38-43.34-138.67-43.34s-100.43 16.19-138.67 43.34" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M256 48v416M464 256H48"/></svg>
                            ${this.languageCode}
                        </button>
                        <button class="btn light tight outline" @click=${()=>this.switchViews()}>${jsObject.translations.switch_views}</button>
                    </div>
                </div>
            </nav>

            <span class="p-1 d-block fixed top z-2">
                <button id="hamburger-menu" class="nav-toggle show ${this.showIndex?"invert":""}" @click=${this.openMenu}>
                    <span class="hamburger"></span>
                </button>
            </span>

            <div class="">
                ${this.view==="guide"?o`<course-guide .sections=${this.getSessionSections()}></course-guide>`:o`<course-slideshow .sections=${this.getSessionSections()} startSlideKey=${this.sessionKey}></course-slideshow>`}
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-presenter",ks);class Ss extends b{static get properties(){return{sections:{type:Array}}}render(){return o`
            <div class="course-guide">
                <div class="stack | py-4 snap-content" data-outline-slides>
                    ${this.sections.map((e,t)=>o`
                            <div class="container | slide-switcher">
                                <slide-switcher
                                    .slide=${e}
                                ></slide-switcher>
                            </div>
                        `)}

                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-guide",Ss);class js extends b{static get properties(){return{sections:{type:Array},startSlideKey:{type:String},sectionIndex:{attribute:!1},currentSlide:{attribute:!1},index:{attribute:!1}}}constructor(){super(),this.reset(),this.sections=[],this.startSlideKey="",this.listenForKeyboard=this.listenForKeyboard.bind(this),this.listenForMouseClick=this.listenForMouseClick.bind(this)}reset(){this.sectionIndex=-1,this.currentSlide=null}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.listenForKeyboard),document.addEventListener("mousedown",this.listenForMouseClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.listenForKeyboard),document.removeEventListener("mousedown",this.listenForMouseClick)}update(e){if(e.has("sections")&&this.reset(),e.has("startSlideKey")&&this.startSlideKey!==""){const t=this.sections.findIndex(({key:s})=>s===this.startSlideKey);this.setSlide(t)}super.update(e)}nextSlide(){if(this.sectionIndex>=this.sections.length-1){this.sectionIndex=this.sections.length-1;return}this.setSlide(this.sectionIndex+1)}previousSlide(){this.sectionIndex<0&&(this.sectionIndex=0),this.setSlide(this.sectionIndex-1)}leftSlide(){document.querySelector("html").dir==="rtl"?this.nextSlide():this.previousSlide()}rightSlide(){document.querySelector("html").dir==="rtl"?this.previousSlide():this.nextSlide()}listenForKeyboard(e){["ArrowRight"].includes(e.code)&&this.rightSlide(),["Space"].includes(e.code)&&this.nextSlide(),["ArrowLeft"].includes(e.code)&&this.leftSlide(),["Backspace"].includes(e.code)&&this.previousSlide()}listenForMouseClick(e){if(e.target.id==="hamburger-menu")return;const t=c=>c.id==="offCanvas"||c.classList.contains("js-off-canvas-overlay")||c.classList.contains("bypass-nav-click");if(this.hasParent(e.target,t))return;const{x:s,type:n,which:a}=e;if(n!=="mousedown"||a!==1)return;const{innerWidth:r}=window,l=1/2*r;s<l&&this.leftSlide(),s>r-l&&this.rightSlide()}hasParent(e,t){let s=e;const n=50;let a=0;for(;s;){if(t(s))return!0;if(s=s.parentElement,a=a+1,a>n)return!1}return!1}setSlide(e){this.sectionIndex=e;const t=this.sections[e];this.currentSlide=t}render(){return this.sectionIndex<0&&this.setSlide(0),o`
            <div class="cover-page">
                <div>
                    <slide-switcher .slide=${this.currentSlide} showControls></slide-switcher>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-slideshow",js);class Cs extends b{static get properties(){return{slide:{type:Object},showControls:{type:Boolean}}}render(){if(this.slide)switch(this.slide.type){case"title":return o`<title-slide .slide=${this.slide} id=${this.slide.key}></title-slide>`;case"checkin":return o`<checkin-slide .slide=${this.slide} id=${this.slide.key}></checkin-slide>`;case"pray":return o`<pray-slide .slide=${this.slide} id=${this.slide.key}></pray-slide>`;case"review":return o`<review-slide .slide=${this.slide} id=${this.slide.key}></review-slide>`;case"overview":return o`<overview-slide .slide=${this.slide} id=${this.slide.key}></overview-slide>`;case"challenge":case"center":return o`<center-slide .slide=${this.slide} id=${this.slide.key}></center-slide>`;case"watch":return o`<watch-slide .slide=${this.slide} id=${this.slide.key}></watch-slide>`;case"video":return o`<video-slide .slide=${this.slide} id=${this.slide.key} ?showButtons=${this.showControls}></video-slide>`;case"look_back":return o`<look-back-slide .slide=${this.slide} id=${this.slide.key}></look-back-slide>`;case"discuss":return o`<discuss-slide .slide=${this.slide} id=${this.slide.key}></discuss-slide>`;case"left_content":case"activity":return o`<activity-slide .slide=${this.slide} id=${this.slide.key}></activity-slide>`;case"obey":return o`<obey-slide .slide=${this.slide} id=${this.slide.key}></obey-slide>`;case"left_image":return o`<left-image-slide .slide=${this.slide} id=${this.slide.key}></left-image-slide>`;case"next_steps":return o`<next-steps-slide .slide=${this.slide} id=${this.slide.key}></next-steps-slide>`;case"break":return o`<break-slide .slide=${this.slide} id=${this.slide.key}></break-slide>`;case"congratulations":return o`<congratulations-slide .slide=${this.slide} id=${this.slide.key}></congratulations-slide>`;case"final":return o`<final-slide .slide=${this.slide} id=${this.slide.key}></final-slide>`;default:return o`<course-slide .slide=${this.slide} id=${this.slide.key}></course-slide>`}}createRenderRoot(){return this}}customElements.define("slide-switcher",Cs);class lt extends b{constructor(){super()}render(){return o`
            <div class="container">
                <div class="circle">
                    <div class="triangle"></div>
                </div>
            </div>
        `}}k(lt,"styles",bt`
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
    `);window.customElements.define("play-button",lt);class xs extends b{constructor(){super();k(this,"webShareSupported",!!window.navigator.share);k(this,"clipboardSupported",!!window.navigator.clipboard);this.shareFeedback="",this.copyFeedback=""}static get properties(){return{url:{type:String},title:{type:String},t:{type:Object},shareFeedback:{attribute:!1},copyFeedback:{attribute:!1}}}share(){navigator.share({title:this.title,url:this.url,text:title}).then(()=>{this.shareFeedback=this.t.share_feedback,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(t=>console.error("Error sharing",t))}copyLink(t){t.stopImmediatePropagation(),navigator.clipboard.writeText(this.url).then(()=>{this.copyFeedback=this.t.copy_feedback,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(s=>console.error(s))}noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported}render(){return o`
            <div id="share" tabindex="-1" class="stack--2">
              ${this.noOptionsAvailable()?o`
                  <div class="stack--2">
                    <p>${this.t.copy_and_share_text}</p>
                    <p class=""><code>${this.url}</code></p>
                  </div>
              `:o`
                  <div :class="cluster gap--1">
                    ${this.webShareSupported?o`
                        <div class="position-relative">
                          <button class="btn light uppercase" @click=${this.share}>
                            <!-- Share icon -->
                            <span>${this.t.share}</span>
                          </button>
                          <p role="alert" aria-live="polite" id="shareFeedback" class="context-alert" data-state=${this.shareFeedback.length?"":"empty"}>${this.shareFeedback}</p>
                        </div>
                    `:""}
                    ${this.clipboardSupported?o`
                        <div class="position-relative">
                          <button class="btn light uppercase" data-theme="ghost" @click=${this.copyLink}>
                            <!-- Link icon -->
                            <span>${this.t.copy_link}</span>
                          </button>
                          <p role="alert" aria-live="polite" id="copyFeedback" class="context-alert" data-state=${this.copyFeedback.length?"":"empty"}>${this.copyFeedback}</p>
                        </div>
                    `:""}
                  </div>
              `}


            </div>
        `}createRenderRoot(){return this}}customElements.define("share-links",xs);class Es extends b{constructor(){super();k(this,"sortAlphabetically",(t,s)=>t.page_title<s.page_title?-1:1);k(this,"sortByKey",(t,s)=>Number(t.key)<Number(s.key)?-1:1);this.items=zumeShare.share_items,this.filterType="all"}static get properties(){return{items:{type:Array,attribute:!1},filterType:{type:String,attribute:!1},isSortedAlphabetically:{type:Boolean,attribute:!1}}}filterItems(t){this.filterType=t,this.items=this.sortItems(zumeShare.share_items.filter(({type:s})=>t==="all"?!0:s===t))}toggleSorting(){this.isSortedAlphabetically=!this.isSortedAlphabetically,this.items=this.sortItems(this.items)}sortItems(t){return t.sort((s,n)=>this.isSortedAlphabetically?this.sortAlphabetically(s,n):this.sortByKey(s,n))}renderListItem({page_url:t,page_title:s,type:n,description:a}){return o`
            <li class="share-cards" data-type=${n}>
                <div class="stack | share card">
                    <a class="f-1 bold mt-0" href=${t}>
                        ${s}
                    </a>
                    <p class="f--1 show-for-large">
                        ${a}
                    </p>
                    <div class="fit-content ms-auto">
                        <share-links
                            url=${t}
                            title=${s}
                            .t=${zumeShare.translations}>
                        </share-links>
                    </div>
                </div>
            </li>
        `}render(){return o`
            <div class="container-xsm">
                <div class="filter-area d-flex align-items-center justify-flex-end">
                    <button
                        class="icon-btn f-2 ${this.isSortedAlphabetically?"bg-brand-fade":""}"
                        @click=${this.toggleSorting}
                    >
                        <span class="visually-hidden">${zumeShare.translations.sort}</span>
                        <svg class="w-2rem brand-light" focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12.93 2.65c-.2-.2-.51-.2-.71 0l-2.01 2.01h4.72zm-.7 18.7c.2.2.51.2.71 0l1.98-1.98h-4.66zm-1.25-3.62c.6 0 1.01-.6.79-1.16L8.04 7.03c-.18-.46-.63-.76-1.12-.76-.49 0-.94.3-1.12.76l-3.74 9.53c-.22.56.19 1.16.79 1.16.35 0 .67-.22.8-.55l.71-1.9h5.11l.71 1.9c.13.34.45.56.8.56m-6.01-4.09 1.94-5.18 1.94 5.18zm16.08 2.5h-5.33l5.72-8.29c.46-.66-.02-1.57-.82-1.57h-6.48c-.44 0-.79.36-.79.8v.01c0 .44.36.8.79.8h5.09l-5.73 8.28c-.46.66.02 1.57.82 1.57h6.72c.44 0 .79-.36.79-.79.02-.45-.34-.81-.78-.81"></path></svg>
                    </button>
                    <button class="icon-btn f-2" data-toggle="filter-menu">
                        <span class="visually-hidden">${zumeShare.translations.filter}</span>
                        <span class="icon zume-filter brand-light" aria-hidden="true"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment="center" data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li>
                            <button
                                class="menu-btn w-100 filter-button ${this.filterType==="all"?"selected":""}"
                                @click=${()=>this.filterItems("all")}
                            >
                                ${zumeShare.translations.all}
                            </button>
                            <button
                                class="menu-btn w-100 filter-button ${this.filterType==="tool"?"selected":""}"
                                @click=${()=>this.filterItems("tool")}
                            >
                                ${zumeShare.translations.tools}
                            </button>
                            <button
                                class="menu-btn w-100 filter-button ${this.filterType==="concept"?"selected":""}"
                                @click=${()=>this.filterItems("concept")}
                            >
                                ${zumeShare.translations.concepts}
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="share-list__wrapper">
                    <ul class="stack  | mt-0">
                        ${T(this.items,t=>t.key,this.renderListItem)}
                    </ul>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("share-list",Es);class Os extends b{static get properties(){return{t:{type:Object},joinLink:{type:String},loading:{attribute:!1},posts:{attribute:!1}}}constructor(){super(),this.loading=!0,this.plans=[],this.getTrainings(),this.renderRow=this.renderRow.bind(this)}getTrainings(){makeRequest("POST","public_plans",{},"zume_system/v1").then(e=>{this.plans=e}).catch(e=>{console.log(e)}).always(()=>{this.loading=!1})}render(){return this.loading?o`<span class="loading-spinner active"></span>`:o`
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
        `}renderRow({join_key:e,language_note:t,post_title:s,time_of_day_note:n,timezone_note:a,...r}){const l=r.set_a_01?"a":"b",c=l==="a"?10:20,h=`set_${l}_`,g=Date.now()/1e3;let u="";for(let m=1;m<c+1;m++){const f=m<10?`0${m}`:`${m}`,y=r[h+f];if(u=y.timestamp,g<y.timestamp)break}const p=moment(u*1e3).format("MMM Do 'YY");return o`
            <tr>
                <td data-label="${this.t.name}">${s}</td>
                <td data-label="${this.t.next_date}">${p}</td>
                <td data-label="${this.t.start_time}">${n}</td>
                <td data-label="${this.t.timezone}">${a}</td>
                <td data-label="${this.t.language}">${t}</td>
                <td><button class="btn" data-code=${e} @click=${this._handleJoinTraining}>${this.t.join}</button></td>
            </tr>
        `}_handleJoinTraining(e){console.log(e);const t=e.target.dataset.code,s=new CustomEvent("chosen-training",{bubbles:!0,detail:{code:t}});this.dispatchEvent(s)}createRenderRoot(){return this}}customElements.define("public-trainings",Os);class ct extends b{static get properties(){return{radius:{type:Number},lineWidth:{type:Number},percent:{type:Number}}}constructor(){super(),this.radius=100,this.lineWidth=10,this.percent=30}width(){return this.radius*2+this.lineWidth}widthPx(){return this.appendPx(this.width())}center(){return this.width()/2}circumference(){return this.radius*2*Math.PI}circumferencePx(){return this.appendPx(this.circumference())}appendPx(e){return`${e}px`}rotate(e){return`rotate(${e}, ${this.center()}, ${this.center()})`}render(){return o`
            <div
                class="progress-circle"
                style="--percent: ${this.percent}; --width: ${this.widthPx()}; --circ: ${this.circumferencePx()}"
            >
                <svg class="svg-wrapper">
                    <circle
                        cx="${this.center()}"
                        cy="${this.center()}"
                        r="${this.radius}"
                    >
                    </circle>
                    <circle
                        class="bar"
                        cx="${this.center()}"
                        cy="${this.center()}"
                        r="${this.radius}"
                        transform="${this.rotate(-90)}"
                    >
                    </circle>
                </svg>
            </div>
        `}createRenderRoot(){return this}}customElements.define("progress-circle",ct);class zs extends ct{static get properties(){return{percent:{type:Number},type:{type:String}}}constructor(){super(),this.radius=50,this.lineWidth=15,this.percent=0,this.borderWidth=3,this.type="heard"}width(){return(this.radius+this.lineWidth)*2}getIconSvg(){switch(this.type){case"heard":return X`
                    <path d="M13.204,14.843c.157-3.465,2.622-6.151,6.05-6.593,3.602-.464,7.067,2.224,7.528,5.84.019.151.028.303.051.453.084.543.565.919,1.079.849.531-.073.901-.535.85-1.079-.09-.964-.299-1.902-.71-2.782-1.357-2.904-3.602-4.681-6.783-5.149-4.548-.67-8.841,2.255-9.775,6.729-.695,3.33-.03,6.397,2.327,8.963.781.85,1.668,1.601,2.472,2.43.534.551,1.049,1.131,1.495,1.754.496.692.669,1.505.631,2.364-.121,2.78,2.078,5.075,4.868,5.091,2.087.012,4.017-1.407,4.624-3.399.169-.553-.083-1.062-.614-1.24-.505-.169-1.018.085-1.21.625-.375,1.054-1.082,1.745-2.179,2.001-1.829.426-3.631-1.042-3.551-2.908.071-1.673-.427-3.158-1.526-4.394-.867-.975-1.835-1.861-2.774-2.772-1.174-1.139-2.156-2.394-2.584-4.011-.24-.909-.31-1.835-.271-2.771Z" stroke-width="0"></path>
                    <path d="M22.416,16.825c-1.639.344-2.761,1.916-2.613,3.472.179,1.88,1.39,3.263,3.162,3.601.237.045.486.086.722.059.502-.056.865-.512.837-.996-.029-.509-.412-.882-.953-.927-.921-.078-1.624-.699-1.795-1.587-.226-1.172.702-1.837,1.898-1.848.737-.007,1.224-.331,1.128-1.091-.055-.433-.488-1.081-2.385-.684Z" stroke-width="0"></path>
                `;case"obeyed":return X`
                    <path d="M21.57,18.138c-.204,1.02-.396,1.984-.589,2.948-.06.299-.116.599-.179.898-.012.057-.047.109-.087.195.117.163.256.361.4.556.397.536.795,1.072,1.194,1.606.743.993,1.239,2.082,1.465,3.316.261,1.422.608,2.829.922,4.241.183.825-.274,1.597-1.058,1.778-.783.18-1.554-.308-1.742-1.125-.279-1.212-.56-2.424-.804-3.643-.204-1.021-.594-1.958-1.176-2.812-.781-1.144-1.585-2.272-2.374-3.411-.254-.367-.481-.753-.74-1.117-.501-.703-.591-1.47-.421-2.296.247-1.201.478-2.406.716-3.609.003-.016.003-.033.006-.074-.05.04-.089.066-.123.097-.598.545-1.197,1.088-1.789,1.639-.062.057-.11.158-.115.242-.087,1.326-.165,2.653-.248,3.979-.041.641-.554,1.087-1.186,1.04-.6-.045-1.035-.574-.995-1.196.09-1.411.176-2.822.261-4.233.03-.498.222-.916.592-1.253,1.221-1.112,2.44-2.226,3.66-3.339.129-.118.246-.252.385-.356.381-.287.817-.384,1.283-.297.717.134,1.431.278,2.145.426.596.124,1.038.46,1.25,1.033.148.401.244.822.346,1.239.243.995.654,1.924,1.094,2.842.143.297.376.491.691.613.959.373,1.91.764,2.864,1.149.068.027.136.055.203.087.583.277.825.859.591,1.42-.224.536-.856.795-1.439.577-.392-.146-.777-.31-1.165-.465-.829-.332-1.655-.671-2.488-.994-.314-.122-.566-.312-.739-.594-.174-.284-.325-.582-.486-.874-.035-.063-.069-.126-.126-.232Z" stroke-width="0"></path>
                    <path d="M15.828,22.191c.259.402.497.772.735,1.142.48.747.962,1.492,1.437,2.242.041.065.066.158.057.233-.038.303-.09.604-.143.904-.098.559-.309,1.069-.618,1.547-.923,1.43-1.831,2.869-2.752,4.3-.552.858-1.767.912-2.364.114-.368-.492-.375-1.17-.015-1.736.694-1.093,1.366-2.201,2.093-3.272.688-1.014,1.054-2.129,1.231-3.324.098-.66.201-1.319.303-1.978.007-.044.018-.087.037-.174Z" stroke-width="0"></path>
                    <path d="M21.246,11.553c-1.455,0-2.629-1.176-2.629-2.635,0-1.455,1.178-2.631,2.634-2.631,1.456,0,2.636,1.174,2.64,2.628.004,1.46-1.176,2.637-2.645,2.638Z" stroke-width="0"></path>
                `;case"shared":return X`
                    <path d="M12.845,18.138c-.204,1.02-.396,1.984-.589,2.948-.06.299-.116.599-.179.898-.012.057-.047.109-.087.195.117.163.256.361.4.556.397.536.795,1.072,1.194,1.606.743.993,1.239,2.082,1.465,3.316.261,1.422.608,2.829.922,4.241.183.825-.274,1.597-1.058,1.778-.783.18-1.554-.308-1.742-1.125-.279-1.212-.56-2.424-.804-3.643-.204-1.021-.594-1.958-1.176-2.812-.781-1.144-1.585-2.272-2.374-3.411-.254-.367-.481-.753-.74-1.117-.501-.703-.591-1.47-.421-2.296.247-1.201.478-2.406.716-3.609.003-.016.003-.033.006-.074-.05.04-.089.066-.123.097-.598.545-1.197,1.088-1.789,1.639-.062.057-.11.158-.115.242-.087,1.326-.165,2.653-.248,3.979-.041.641-.554,1.087-1.186,1.04-.6-.045-1.035-.574-.995-1.196.09-1.411.176-2.822.261-4.233.03-.498.222-.916.592-1.253,1.221-1.112,2.44-2.226,3.66-3.339.129-.118.246-.252.385-.356.381-.287.817-.384,1.283-.297.717.134,1.431.278,2.145.426.596.124,1.038.46,1.25,1.033.148.401.244.822.346,1.239.243.995.654,1.924,1.094,2.842.143.297.376.491.691.613.959.373,1.91.764,2.864,1.149.068.027.136.055.203.087.583.277.825.859.591,1.42-.224.536-.856.795-1.439.577-.392-.146-.777-.31-1.165-.465-.829-.332-1.655-.671-2.488-.994-.314-.122-.566-.312-.739-.594-.174-.284-.325-.582-.486-.874-.035-.063-.069-.126-.126-.232Z" stroke-width="0"></path>
                    <path d="M7.102,22.191c.259.402.497.772.735,1.142.48.747.962,1.492,1.437,2.242.041.065.066.158.057.233-.038.303-.09.604-.143.904-.098.559-.309,1.069-.618,1.547-.923,1.43-1.831,2.869-2.752,4.3-.552.858-1.767.912-2.364.114-.368-.492-.375-1.17-.015-1.736.694-1.093,1.366-2.201,2.093-3.272.688-1.014,1.054-2.129,1.231-3.324.098-.66.201-1.319.303-1.978.007-.044.018-.087.037-.174Z" stroke-width="0"></path>
                    <path d="M12.521,11.553c-1.455,0-2.629-1.176-2.629-2.635,0-1.455,1.178-2.631,2.634-2.631,1.456,0,2.636,1.174,2.64,2.628.004,1.46-1.176,2.637-2.645,2.638Z" stroke-width="0"></path>
                    <path d="M27.155,18.138c.204,1.02.396,1.984.589,2.948.06.299.116.599.179.898.012.057.047.109.087.195-.117.163-.256.361-.4.556-.397.536-.795,1.072-1.194,1.606-.743.993-1.239,2.082-1.465,3.316-.261,1.422-.608,2.829-.922,4.241-.183.825.274,1.597,1.058,1.778.783.18,1.554-.308,1.742-1.125.279-1.212.56-2.424.804-3.643.204-1.021.594-1.958,1.176-2.812.781-1.144,1.585-2.272,2.374-3.411.254-.367.481-.753.74-1.117.501-.703.591-1.47.421-2.296-.247-1.201-.478-2.406-.716-3.609-.003-.016-.003-.033-.006-.074.05.04.089.066.123.097.598.545,1.197,1.088,1.789,1.639.062.057.11.158.115.242.087,1.326.165,2.653.248,3.979.041.641.554,1.087,1.186,1.04.6-.045,1.035-.574.995-1.196-.09-1.411-.176-2.822-.261-4.233-.03-.498-.222-.916-.592-1.253-1.221-1.112-2.44-2.226-3.66-3.339-.129-.118-.246-.252-.385-.356-.381-.287-.817-.384-1.283-.297-.717.134-1.431.278-2.145.426-.596.124-1.038.46-1.25,1.033-.148.401-.244.822-.346,1.239-.243.995-.654,1.924-1.094,2.842-.143.297-.376.491-.691.613-.959.373-1.91.764-2.864,1.149-.068.027-.136.055-.203.087-.583.277-.825.859-.591,1.42.224.536.856.795,1.439.577.392-.146.777-.31,1.165-.465.829-.332,1.655-.671,2.488-.994.314-.122.566-.312.739-.594.174-.284.325-.582.486-.874.035-.063.069-.126.126-.232Z" stroke-width="0"></path>
                    <path d="M32.898,22.191c-.259.402-.497.772-.735,1.142-.48.747-.962,1.492-1.437,2.242-.041.065-.066.158-.057.233.038.303.09.604.143.904.098.559.309,1.069.618,1.547.923,1.43,1.831,2.869,2.752,4.3.552.858,1.767.912,2.364.114.368-.492.375-1.17.015-1.736-.694-1.093-1.366-2.201-2.093-3.272-.688-1.014-1.054-2.129-1.231-3.324-.098-.66-.201-1.319-.303-1.978-.007-.044-.018-.087-.037-.174Z" stroke-width="0"></path>
                    <path d="M27.479,11.553c1.455,0,2.629-1.176,2.629-2.635,0-1.455-1.178-2.631-2.634-2.631-1.456,0-2.636,1.174-2.64,2.628-.004,1.46,1.176,2.637,2.645,2.638Z" stroke-width="0"></path>
                `;case"trained":return X`
                    <path d="M21.796,16.477c-.172.859-.334,1.671-.496,2.484-.05.252-.098.505-.151.757-.01.048-.04.091-.073.164.099.137.216.304.337.468.334.452.67.903,1.006,1.354.626.837,1.044,1.754,1.235,2.794.22,1.198.513,2.383.777,3.574.154.695-.231,1.346-.892,1.498-.659.152-1.31-.259-1.468-.948-.235-1.021-.472-2.042-.677-3.069-.172-.86-.5-1.649-.991-2.369-.658-.964-1.335-1.915-2-2.874-.214-.309-.405-.635-.624-.941-.422-.592-.498-1.238-.355-1.934.208-1.012.403-2.027.603-3.041.003-.014.003-.028.005-.063-.043.033-.075.056-.103.082-.504.459-1.009.917-1.508,1.381-.052.048-.092.133-.097.204-.074,1.117-.139,2.235-.209,3.353-.034.54-.467.916-.999.876-.506-.038-.872-.483-.838-1.008.076-1.189.148-2.378.22-3.567.025-.42.187-.772.499-1.056,1.029-.937,2.056-1.875,3.084-2.814.109-.099.207-.212.325-.3.321-.242.688-.324,1.081-.25.604.113,1.206.234,1.808.359.502.104.874.388,1.053.871.125.338.206.693.291,1.044.205.838.551,1.621.922,2.395.12.25.317.414.582.517.808.314,1.609.644,2.413.968.057.023.115.047.171.073.491.233.695.724.498,1.196-.188.452-.722.669-1.213.486-.33-.123-.655-.261-.982-.392-.698-.28-1.395-.565-2.096-.837-.265-.103-.477-.263-.623-.501-.147-.239-.274-.49-.409-.736-.029-.053-.058-.106-.107-.195Z" stroke-width="0"></path>
                    <path d="M16.958,19.892c.218.339.419.65.619.962.404.629.81,1.258,1.211,1.889.035.055.056.133.048.196-.032.255-.076.509-.12.762-.083.471-.261.901-.521,1.304-.778,1.205-1.543,2.417-2.319,3.623-.465.723-1.489.769-1.992.096-.31-.414-.316-.986-.013-1.462.585-.921,1.151-1.855,1.763-2.757.579-.854.888-1.794,1.037-2.8.082-.556.169-1.111.255-1.667.006-.037.016-.073.031-.147Z" stroke-width="0"></path>
                    <path d="M21.524,10.929c-1.226,0-2.215-.991-2.215-2.22,0-1.226.992-2.217,2.219-2.217,1.227,0,2.221.99,2.224,2.215.003,1.23-.991,2.222-2.229,2.222Z" stroke-width="0"></path>
                    <path d="M10.472,22.851c-.139.698-.271,1.357-.403,2.017-.041.205-.079.41-.122.614-.008.039-.032.074-.059.133.08.112.175.247.274.38.272.367.544.734.817,1.099.508.68.848,1.425,1.003,2.269.178.973.416,1.936.631,2.902.125.564-.187,1.093-.724,1.216-.536.123-1.063-.211-1.192-.77-.191-.829-.383-1.658-.55-2.492-.14-.699-.406-1.34-.805-1.924-.534-.783-1.084-1.555-1.624-2.334-.174-.251-.329-.515-.506-.764-.343-.481-.404-1.006-.288-1.571.169-.822.327-1.646.49-2.47.002-.011.002-.023.004-.051-.035.027-.061.045-.084.066-.409.373-.819.744-1.224,1.121-.042.039-.075.108-.079.166-.06.907-.113,1.815-.17,2.723-.028.439-.379.744-.812.711-.411-.031-.708-.393-.681-.818.062-.965.12-1.931.178-2.897.02-.341.152-.627.405-.857.835-.761,1.67-1.523,2.504-2.285.088-.081.168-.172.264-.244.261-.197.559-.263.878-.203.49.092.979.19,1.468.291.408.085.71.315.855.707.102.274.167.563.237.848.167.681.447,1.317.749,1.945.098.203.257.336.472.42.656.255,1.307.523,1.959.786.047.019.093.038.139.059.399.189.565.588.404.971-.153.367-.586.544-.985.395-.268-.1-.532-.212-.797-.318-.567-.227-1.133-.459-1.702-.68-.215-.084-.387-.214-.506-.407-.119-.194-.222-.398-.332-.598-.024-.043-.047-.086-.087-.159Z" stroke-width="0"></path>
                    <path d="M6.543,25.624c.177.275.34.528.503.782.328.511.658,1.021.983,1.534.028.044.045.108.039.159-.026.207-.062.413-.098.619-.067.382-.212.732-.423,1.059-.631.978-1.253,1.963-1.883,2.942-.378.587-1.209.624-1.618.078-.252-.336-.257-.8-.011-1.188.475-.748.935-1.506,1.432-2.239.471-.694.721-1.457.843-2.274.067-.451.138-.902.207-1.353.005-.03.013-.06.025-.119Z" stroke-width="0"></path>
                    <path d="M10.251,18.345c-.996,0-1.799-.804-1.799-1.803,0-.995.806-1.8,1.802-1.801.996,0,1.804.804,1.806,1.798.003.999-.805,1.804-1.81,1.805Z" stroke-width="0"></path>
                    <path d="M31.677,22.851c-.139.698-.271,1.357-.403,2.017-.041.205-.079.41-.122.614-.008.039-.032.074-.059.133.08.112.175.247.274.38.272.367.544.734.817,1.099.508.68.848,1.425,1.003,2.269.178.973.416,1.936.631,2.902.125.564-.187,1.093-.724,1.216-.536.123-1.063-.211-1.192-.77-.191-.829-.383-1.658-.55-2.492-.14-.699-.406-1.34-.805-1.924-.534-.783-1.084-1.555-1.624-2.334-.174-.251-.329-.515-.506-.764-.343-.481-.404-1.006-.288-1.571.169-.822.327-1.646.49-2.47.002-.011.002-.023.004-.051-.035.027-.061.045-.084.066-.409.373-.819.744-1.224,1.121-.042.039-.075.108-.079.166-.06.907-.113,1.815-.17,2.723-.028.439-.379.744-.812.711-.411-.031-.708-.393-.681-.818.062-.965.12-1.931.178-2.897.02-.341.152-.627.405-.857.835-.761,1.67-1.523,2.504-2.285.088-.081.168-.172.264-.244.261-.197.559-.263.878-.203.49.092.979.19,1.468.291.408.085.71.315.855.707.102.274.167.563.237.848.167.681.447,1.317.749,1.945.098.203.257.336.472.42.656.255,1.307.523,1.959.786.047.019.093.038.139.059.399.189.565.588.404.971-.153.367-.586.544-.985.395-.268-.1-.532-.212-.797-.318-.567-.227-1.133-.459-1.702-.68-.215-.084-.387-.214-.506-.407-.119-.194-.222-.398-.332-.598-.024-.043-.047-.086-.087-.159Z" stroke-width="0"></path>
                    <path d="M27.747,25.624c.177.275.34.528.503.782.328.511.658,1.021.983,1.534.028.044.045.108.039.159-.026.207-.062.413-.098.619-.067.382-.212.732-.423,1.059-.631.978-1.253,1.963-1.883,2.942-.378.587-1.209.624-1.618.078-.252-.336-.257-.8-.011-1.188.475-.748.935-1.506,1.432-2.239.471-.694.721-1.457.843-2.274.067-.451.138-.902.207-1.353.005-.03.013-.06.025-.119Z" stroke-width="0"></path>
                    <path d="M31.455,18.345c-.996,0-1.799-.804-1.799-1.803,0-.995.806-1.8,1.802-1.801.996,0,1.804.804,1.806,1.798.003.999-.805,1.804-1.81,1.805Z" stroke-width="0"></path>
                `}}iconSize(){return this.width()/2}iconPosition(){const e=(this.width()-this.iconSize())/2;return[e,e]}render(){const e=this.iconSize(),[t,s]=this.iconPosition();return o`
            <div
                class="progress-circle"
                style="--percent: ${this.percent}; --width: ${this.widthPx()}; --circ: ${this.circumferencePx()}; --border-width: ${this.borderWidth}"
                data-border
            >
                <svg class="svg-wrapper">
                    <circle
                        class="border"
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
                    <circle
                        class="bar"
                        cx="${this.center()}"
                        cy="${this.center()}"
                        r="${this.radius}"
                        transform="${this.rotate(-90)}"
                    >
                    </circle>
                    <svg
                        class="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width=${e}
                        height=${e}
                        x=${t}
                        y=${s}
                        viewBox="0 0 40 40"
                    >
                        ${this.getIconSvg()}
                    </svg>
                </svg>
            </div>
        `}createRenderRoot(){return this}}customElements.define("host-progress-circle",zs);
//# sourceMappingURL=main-bundle.js.map
