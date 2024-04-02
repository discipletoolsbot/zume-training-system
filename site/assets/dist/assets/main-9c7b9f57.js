var lt=Object.defineProperty;var ct=(i,e,t)=>e in i?lt(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var S=(i,e,t)=>(ct(i,typeof e!="symbol"?e+"":e,t),t),oe=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)};var P=(i,e,t)=>(oe(i,e,"read from private field"),t?t.call(i):e.get(i)),M=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},le=(i,e,t,s)=>(oe(i,e,"write to private field"),s?s.call(i,t):e.set(i,t),t);var I=(i,e,t)=>(oe(i,e,"access private method"),t);const je=document.querySelector(".nav-toggle"),dt=document.querySelector("#nav");je&&je.addEventListener("click",i=>{dt.classList.toggle("nav--visible")});var be;let ht=(be=class{static save(e,t){localStorage.setItem(this.createKey(e),JSON.stringify(t))}static load(e){const t=localStorage.getItem(this.createKey(e));try{return JSON.parse(t)}catch{return t}}static createKey(e){return this.prefix+e}},S(be,"prefix","Z5_"),be);window.ZumeStorage=ht;var j,se,Ue,ie,Fe,ne,Be,V,fe;class He{constructor(e){M(this,se);M(this,ie);M(this,ne);M(this,V);S(this,"WIZARD_STATE_NAME","zume_wizard_state");S(this,"STALE_LIFESPAN",10*60*1e3);S(this,"MAX_LIFESPAN",60*60*1e3);M(this,j,void 0);this.moduleName=e,le(this,j,I(this,se,Ue).call(this))}empty(){return Object.keys(P(this,j).data).length===0}isDataStale(){return I(this,V,fe).call(this,P(this,j),this.STALE_LIFESPAN)}get(e){return P(this,j).data[e]}getAll(){return P(this,j).data}add(e,t){P(this,j).data[e]=t,I(this,ne,Be).call(this),localStorage.setItem(this.WIZARD_STATE_NAME,JSON.stringify(P(this,j)))}clear(){le(this,j,null),localStorage.removeItem(this.WIZARD_STATE_NAME)}}j=new WeakMap,se=new WeakSet,Ue=function(){const e=I(this,ie,Fe).call(this);return e&&!I(this,V,fe).call(this,e,this.MAX_LIFESPAN)?e:{module:this.moduleName,data:{},timestamp:Date.now()}},ie=new WeakSet,Fe=function(){return JSON.parse(localStorage.getItem(this.WIZARD_STATE_NAME))},ne=new WeakSet,Be=function(){P(this,j).timestamp=Date.now()},V=new WeakSet,fe=function(e,t){return Date.now()-e.timestamp>t};const k={gettingStarted:"getting-started",makeAGroup:"make-a-group",getACoach:"get-a-coach",joinATraining:"join-a-training",connectWithFriend:"connect-with-friend",joinFriendsPlan:"join-friends-training",checkin:"checkin",setProfile:"set-profile"},$={completeProfile:"completeProfile",makePlan:"makePlan",inviteFriends:"inviteFriends",getACoach:"getACoach",joinTraining:"joinTraining",connectFriend:"connectFriend",joinFriendsTraining:"joinFriendsTraining",checkin:"checkin",planDecision:"planDecision"},ut={howManySessions:"how-many-sessions",whatTimeOfDay:"what-time-of-day",howOften:"how-often",startDate:"what-start-date"},c={updateName:"update-your-name",updateLocation:"update-your-location",updatePhone:"update-your-phone",inviteFriends:"invite-friends",contactPreferences:"contact-preferences",languagePreferences:"preferred-language",howCanWeServe:"how-can-we-serve",connectingToCoach:"connecting-to-coach",joinTraining:"join-training",connectToFriend:"connect-friend",joinFriendsPlan:"join-friends-training",checkinSubmit:"checkin-submit",...ut},pt={[c.updateName]:{field:"name",testExistance:(i,e)=>e.has_set_name},[c.updateLocation]:{field:"location",testExistance:i=>!(i.source&&i.source==="ip")},[c.updatePhone]:{field:"phone",testExistance:i=>!!i}};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Y=window,ye=Y.ShadowRoot&&(Y.ShadyCSS===void 0||Y.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,_e=Symbol(),xe=new WeakMap;let We=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==_e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(ye&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=xe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&xe.set(t,e))}return e}toString(){return this.cssText}};const mt=i=>new We(typeof i=="string"?i:i+"",void 0,_e),gt=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((s,n,r)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[r+1],i[0]);return new We(t,i,_e)},vt=(i,e)=>{ye?i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const s=document.createElement("style"),n=Y.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=t.cssText,i.appendChild(s)})},Ee=ye?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return mt(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ce;const X=window,Ce=X.trustedTypes,bt=Ce?Ce.emptyScript:"",Oe=X.reactiveElementPolyfillSupport,$e={toAttribute(i,e){switch(e){case Boolean:i=i?bt:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},Ze=(i,e)=>e!==i&&(e==e||i==i),de={attribute:!0,type:String,converter:$e,reflect:!1,hasChanged:Ze};let D=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,s)=>{const n=this._$Ep(s,t);n!==void 0&&(this._$Ev.set(n,s),e.push(n))}),e}static createProperty(e,t=de){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const s=typeof e=="symbol"?Symbol():"__"+e,n=this.getPropertyDescriptor(e,s,t);n!==void 0&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(n){const r=this[e];this[t]=n,this.requestUpdate(e,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||de}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,s=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const n of s)this.createProperty(n,t[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const n of s)t.unshift(Ee(n))}else e!==void 0&&t.push(Ee(e));return t}static _$Ep(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,s;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((s=e.hostConnected)===null||s===void 0||s.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return vt(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var s;return(s=t.hostConnected)===null||s===void 0?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var s;return(s=t.hostDisconnected)===null||s===void 0?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$EO(e,t,s=de){var n;const r=this.constructor._$Ep(e,s);if(r!==void 0&&s.reflect===!0){const a=(((n=s.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?s.converter:$e).toAttribute(t,s.type);this._$El=e,a==null?this.removeAttribute(r):this.setAttribute(r,a),this._$El=null}}_$AK(e,t){var s;const n=this.constructor,r=n._$Ev.get(e);if(r!==void 0&&this._$El!==r){const a=n.getPropertyOptions(r),h=typeof a.converter=="function"?{fromAttribute:a.converter}:((s=a.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?a.converter:$e;this._$El=r,this[r]=h.fromAttribute(t,a.type),this._$El=null}}requestUpdate(e,t,s){let n=!0;e!==void 0&&(((s=s||this.constructor.getPropertyOptions(e)).hasChanged||Ze)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),s.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,s))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((n,r)=>this[r]=n),this._$Ei=void 0);let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),(e=this._$ES)===null||e===void 0||e.forEach(n=>{var r;return(r=n.hostUpdate)===null||r===void 0?void 0:r.call(n)}),this.update(s)):this._$Ek()}catch(n){throw t=!1,this._$Ek(),n}t&&this._$AE(s)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(s=>{var n;return(n=s.hostUpdated)===null||n===void 0?void 0:n.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,s)=>this._$EO(s,this[s],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};D.finalized=!0,D.elementProperties=new Map,D.elementStyles=[],D.shadowRootOptions={mode:"open"},Oe==null||Oe({ReactiveElement:D}),((ce=X.reactiveElementVersions)!==null&&ce!==void 0?ce:X.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var he;const ee=window,q=ee.trustedTypes,Pe=q?q.createPolicy("lit-html",{createHTML:i=>i}):void 0,te="$lit$",O=`lit$${(Math.random()+"").slice(9)}$`,we="?"+O,ft=`<${we}>`,H=document,W=()=>H.createComment(""),Z=i=>i===null||typeof i!="object"&&typeof i!="function",Qe=Array.isArray,Ve=i=>Qe(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",ue=`[ 	
\f\r]`,F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ae=/-->/g,Te=/>/g,A=RegExp(`>|${ue}(?:([^\\s"'>=/]+)(${ue}*=${ue}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ze=/'/g,Re=/"/g,Ge=/^(?:script|style|textarea|title)$/i,Je=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),o=Je(1),K=Je(2),x=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),Me=new WeakMap,N=H.createTreeWalker(H,129,null,!1),Ke=(i,e)=>{const t=i.length-1,s=[];let n,r=e===2?"<svg>":"",a=F;for(let l=0;l<t;l++){const d=i[l];let f,p,u=-1,m=0;for(;m<d.length&&(a.lastIndex=m,p=a.exec(d),p!==null);)m=a.lastIndex,a===F?p[1]==="!--"?a=Ae:p[1]!==void 0?a=Te:p[2]!==void 0?(Ge.test(p[2])&&(n=RegExp("</"+p[2],"g")),a=A):p[3]!==void 0&&(a=A):a===A?p[0]===">"?(a=n??F,u=-1):p[1]===void 0?u=-2:(u=a.lastIndex-p[2].length,f=p[1],a=p[3]===void 0?A:p[3]==='"'?Re:ze):a===Re||a===ze?a=A:a===Ae||a===Te?a=F:(a=A,n=void 0);const v=a===A&&i[l+1].startsWith("/>")?" ":"";r+=a===F?d+ft:u>=0?(s.push(f),d.slice(0,u)+te+d.slice(u)+O+v):d+O+(u===-2?(s.push(void 0),l):v)}const h=r+(i[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return[Pe!==void 0?Pe.createHTML(h):h,s]};class Q{constructor({strings:e,_$litType$:t},s){let n;this.parts=[];let r=0,a=0;const h=e.length-1,l=this.parts,[d,f]=Ke(e,t);if(this.el=Q.createElement(d,s),N.currentNode=this.el.content,t===2){const p=this.el.content,u=p.firstChild;u.remove(),p.append(...u.childNodes)}for(;(n=N.nextNode())!==null&&l.length<h;){if(n.nodeType===1){if(n.hasAttributes()){const p=[];for(const u of n.getAttributeNames())if(u.endsWith(te)||u.startsWith(O)){const m=f[a++];if(p.push(u),m!==void 0){const v=n.getAttribute(m.toLowerCase()+te).split(O),y=/([.?@])?(.*)/.exec(m);l.push({type:1,index:r,name:y[2],strings:v,ctor:y[1]==="."?Xe:y[1]==="?"?et:y[1]==="@"?tt:G})}else l.push({type:6,index:r})}for(const u of p)n.removeAttribute(u)}if(Ge.test(n.tagName)){const p=n.textContent.split(O),u=p.length-1;if(u>0){n.textContent=q?q.emptyScript:"";for(let m=0;m<u;m++)n.append(p[m],W()),N.nextNode(),l.push({type:2,index:++r});n.append(p[u],W())}}}else if(n.nodeType===8)if(n.data===we)l.push({type:2,index:r});else{let p=-1;for(;(p=n.data.indexOf(O,p+1))!==-1;)l.push({type:7,index:r}),p+=O.length-1}r++}}static createElement(e,t){const s=H.createElement("template");return s.innerHTML=e,s}}function R(i,e,t=i,s){var n,r,a,h;if(e===x)return e;let l=s!==void 0?(n=t._$Co)===null||n===void 0?void 0:n[s]:t._$Cl;const d=Z(e)?void 0:e._$litDirective$;return(l==null?void 0:l.constructor)!==d&&((r=l==null?void 0:l._$AO)===null||r===void 0||r.call(l,!1),d===void 0?l=void 0:(l=new d(i),l._$AT(i,t,s)),s!==void 0?((a=(h=t)._$Co)!==null&&a!==void 0?a:h._$Co=[])[s]=l:t._$Cl=l),l!==void 0&&(e=R(i,l._$AS(i,e.values),l,s)),e}class Ye{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:s},parts:n}=this._$AD,r=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:H).importNode(s,!0);N.currentNode=r;let a=N.nextNode(),h=0,l=0,d=n[0];for(;d!==void 0;){if(h===d.index){let f;d.type===2?f=new U(a,a.nextSibling,this,e):d.type===1?f=new d.ctor(a,d.name,d.strings,this,e):d.type===6&&(f=new st(a,this,e)),this._$AV.push(f),d=n[++l]}h!==(d==null?void 0:d.index)&&(a=N.nextNode(),h++)}return r}v(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class U{constructor(e,t,s,n){var r;this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=n,this._$Cp=(r=n==null?void 0:n.isConnected)===null||r===void 0||r}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=R(this,e,t),Z(e)?e===_||e==null||e===""?(this._$AH!==_&&this._$AR(),this._$AH=_):e!==this._$AH&&e!==x&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):Ve(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==_&&Z(this._$AH)?this._$AA.nextSibling.data=e:this.$(H.createTextNode(e)),this._$AH=e}g(e){var t;const{values:s,_$litType$:n}=e,r=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Q.createElement(n.h,this.options)),n);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===r)this._$AH.v(s);else{const a=new Ye(r,this),h=a.u(this.options);a.v(s),this.$(h),this._$AH=a}}_$AC(e){let t=Me.get(e.strings);return t===void 0&&Me.set(e.strings,t=new Q(e)),t}T(e){Qe(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,n=0;for(const r of e)n===t.length?t.push(s=new U(this.k(W()),this.k(W()),this,this.options)):s=t[n],s._$AI(r),n++;n<t.length&&(this._$AR(s&&s._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,t);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class G{constructor(e,t,s,n,r){this.type=1,this._$AH=_,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=_}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,s,n){const r=this.strings;let a=!1;if(r===void 0)e=R(this,e,t,0),a=!Z(e)||e!==this._$AH&&e!==x,a&&(this._$AH=e);else{const h=e;let l,d;for(e=r[0],l=0;l<r.length-1;l++)d=R(this,h[s+l],t,l),d===x&&(d=this._$AH[l]),a||(a=!Z(d)||d!==this._$AH[l]),d===_?e=_:e!==_&&(e+=(d??"")+r[l+1]),this._$AH[l]=d}a&&!n&&this.j(e)}j(e){e===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Xe extends G{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===_?void 0:e}}const $t=q?q.emptyScript:"";class et extends G{constructor(){super(...arguments),this.type=4}j(e){e&&e!==_?this.element.setAttribute(this.name,$t):this.element.removeAttribute(this.name)}}class tt extends G{constructor(e,t,s,n,r){super(e,t,s,n,r),this.type=5}_$AI(e,t=this){var s;if((e=(s=R(this,e,t,0))!==null&&s!==void 0?s:_)===x)return;const n=this._$AH,r=e===_&&n!==_||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,a=e!==_&&(n===_||r);r&&this.element.removeEventListener(this.name,this,n),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,s;typeof this._$AH=="function"?this._$AH.call((s=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&s!==void 0?s:this.element,e):this._$AH.handleEvent(e)}}class st{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){R(this,e)}}const yt={O:te,P:O,A:we,C:1,M:Ke,L:Ye,D:Ve,R,I:U,V:G,H:et,N:tt,U:Xe,F:st},Ie=ee.litHtmlPolyfillSupport;Ie==null||Ie(Q,U),((he=ee.litHtmlVersions)!==null&&he!==void 0?he:ee.litHtmlVersions=[]).push("2.7.3");const _t=(i,e,t)=>{var s,n;const r=(s=t==null?void 0:t.renderBefore)!==null&&s!==void 0?s:e;let a=r._$litPart$;if(a===void 0){const h=(n=t==null?void 0:t.renderBefore)!==null&&n!==void 0?n:null;r._$litPart$=a=new U(e.insertBefore(W(),h),h,void 0,t??{})}return a._$AI(i),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pe,me;let g=class extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const s=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=s.firstChild),s}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=_t(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return x}};g.finalized=!0,g._$litElement$=!0,(pe=globalThis.litElementHydrateSupport)===null||pe===void 0||pe.call(globalThis,{LitElement:g});const Le=globalThis.litElementPolyfillSupport;Le==null||Le({LitElement:g});((me=globalThis.litElementVersions)!==null&&me!==void 0?me:globalThis.litElementVersions=[]).push("3.3.2");class wt extends g{static get properties(){return{type:{type:String},finishUrl:{type:String},user:{type:Object},translations:{type:Object},noUrlChange:{type:Boolean},step:{attribute:!1},steps:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.stepIndex=0,this.steps=[],this.modules={},this.step={},this.t=window.SHAREDFUNCTIONS.escapeObject(jsObject.translations),this._handleHistoryPopState=this._handleHistoryPopState.bind(this),window.addEventListener("popstate",this._handleHistoryPopState),this.stateManager=new He}resetWizard(){this.modules={}}firstUpdated(){this.translations&&(this.t=window.SHAREDFUNCTIONS.escapeObject(this.translations))}willUpdate(e){e.has("type")&&this.type===""&&this.resetWizard()}render(){if(!this.isWizardLoaded()){const e=this.getWizard(this.type);this.loadWizard(e),this._handleHistoryPopState(!0)}return this.steps.length===0?o`
            <div class="cover-page">
                <div class="stack center | text-center">
                    <h1 class="brand">${this.t.bad_wizard}</h1>
                    <p>${this.t.found_bad_wizard}</p>
                    <div class="center"><img class="w-50" src="https://imgs.search.brave.com/3f3MurVApxsoxJlmqxLF0fs5-WlAk6sEu9IV3sICb_k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWR2ZXJ0aXNlY2Fz/dC5jb20vcG9kY2Fz/dC9pbWFnZS9WZXJ5/QmFkV2l6YXJkcw.jpeg" alt="bad wizards" /></div>
                    <a class="btn" href="/">${this.t.home}</a>
                </div>
            </div>`:o`
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
        `}containerSize(){const e=this.steps[this.stepIndex];return(e.slug=c.joinTraining)?"container-md":"container-xsm"}currentStep(){const e=this.steps[this.stepIndex];return e.component(e,this.t,"w-100")}headerButtons(){const{skippable:e}=this.step,t=this.stepIndex===this.steps.length-1;return o`
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
                    <button @click=${this._onFinish} ?disabled=${this.loading} class="btn ${this.loading?"disabled":""}">${this.t.finish}</button>
                </div>
            </div>
        `}stepCounter(){return o`
            <div class="cluster">
                ${this.steps.map((e,t)=>{const s=t<=this.stepIndex;return o`<div class="step-circle ${s?"complete":""}"></div>`})}
            </div>
        `}footer(){return this.stepIndex===this.steps.length-1?this.finishButton():""}_onBack(){if(this.stepIndex>0){const e=this.stepIndex-1;this._gotoStep(e)}}_onNext(){if(this.stepIndex+1<this.steps.length){const e=this.stepIndex+1;this._gotoStep(e)}else this._onFinish()}_onSkip(){const e=this.step.module;for(let t=this.stepIndex+1;t<this.steps.length;t++)if(this.steps[t].module!==e){this._gotoStep(t);return}this._onFinish()}_onQuit(){this._onFinish(!0)}_onFinish(e=!1){if(this.stateManager.clear(),this.resetWizard(),!this.finishUrl){this.dispatchEvent(new CustomEvent("user-state:change",{bubbles:!0})),this.dispatchEvent(new CustomEvent("wizard-finished",{bubbles:!0}));return}const t=new URL(this.finishUrl);e||(this.type===k.checkin?t.searchParams.set("completed",this.type):t.searchParams.set("completed",this.type)),window.location.href=t}_gotoStep(e,t=!0){if(this.steps.length!==0&&(this.stepIndex=this.clampSteps(e),this.step=this.steps[this.stepIndex],t&&!this.noUrlChange)){const s=new URL(window.location.href),n=s.pathname.split("/"),r=n[n.length-1];let a="";Object.values(k).includes(r)?a=n.join("/")+"/"+this.step.slug+s.search:a=n.slice(0,-1).join("/")+"/"+this.step.slug+s.search,window.history.pushState(null,null,a)}}clampSteps(e){let t=e;return e>this.steps.length-1&&(t=this.steps.length-1),e<0&&(t=0),t}_handleHistoryPopState(e=!1){const s=new URL(window.location.href).pathname.split("/"),n=s[s.length-1];Object.values(k).includes(n)&&this._gotoStep(0,!1);let r="",a=0;this.steps.forEach(({slug:h,module:l},d)=>{if(r!==l&&(r=l,a=d),n===h){if(e===!0&&this.stateManager.isDataStale()){this._gotoStep(a);return}this._gotoStep(d,!1)}})}_handlePlanDecision(e){switch(e.target.dataset.decision){case"make":this.updateWizard(k.makeAGroup);break;case"join":this.updateWizard(k.joinATraining);break;case"skip":default:this._onSkip();break}}_handleLoading(e){const{loading:t}=e.detail;this.loading=t}makeModule(e=[],t=!1){const s={steps:[],skippable:t};return e.forEach(n=>{Object.keys(L).includes(n)&&s.steps.push(L[n])}),s}getModule(e,t=!1){const s={[$.completeProfile]:{steps:[L[c.updateName],L[c.updateLocation]],skippable:t},[$.planDecision]:{steps:[{slug:"plan-decision",component:(r,a,h)=>o`
                            <div class=${`stack ${h}`}>
                                <h2>${a.join_or_start_a_training}</h2>
                                <button class="btn" data-decision="make" @click=${this._handlePlanDecision}>${a.start_a_training}</button>
                                <button class="btn" data-decision="join" @click=${this._handlePlanDecision}>${a.join_a_public_training}</button>
                                <button class="btn outline" data-decision="skip" @click=${this._handlePlanDecision}>${a.skip_for_now}</button>
                            </div>
                        `}],skippable:t},[$.makePlan]:this.makeModule([c.howManySessions,c.whatTimeOfDay,c.howOften,c.startDate,c.inviteFriends],t),[$.inviteFriends]:{steps:[L[c.inviteFriends]],skippable:t},[$.joinTraining]:{steps:[L[c.joinTraining]]}};return Object.keys(s).includes(e)?s[e]:s[$.completeProfile]}isWizardLoaded(){return Object.keys(this.modules).length!==0}loadWizard(e,t=!1){this.modules=e,t===!1&&(this.steps=[],this.stepIndex=0),Object.entries(this.modules).forEach(([s,{steps:n,skippable:r}])=>{const a=jsObject.profile;n.forEach(({component:h,slug:l})=>{const d=pt[l];let f=null;if(d&&a){if(d.testExistance(a[d.field],a))return;f=a[d.field]}const p={component:h,slug:l,module:s,skippable:r,doneHandler:this._onNext,handleLoading:this._handleLoading};f!==null&&(p.value=f),this.steps.push(p)})}),t===!1&&this._gotoStep(0)}updateWizard(e){const t=this.getWizard(e);Object.keys(t).length!==0&&this.loadWizard(t)}isWizardTypeValid(e){return!!Object.values(k).includes(e)}getWizard(e){return this.isWizardTypeValid(e)?{[k.gettingStarted]:{[$.completeProfile]:this.makeModule([c.updateName,c.updateLocation],!0),[$.planDecision]:this.getModule($.planDecision)},[k.setProfile]:{[$.completeProfile]:this.makeModule([c.updateName,c.updateLocation],!0)},[k.makeAGroup]:{[$.makePlan]:this.getModule($.makePlan)},[k.getACoach]:{[$.completeProfile]:this.makeModule([c.updateName,c.updateLocation,c.updatePhone]),[$.getACoach]:this.makeModule([c.contactPreferences,c.languagePreferences,c.howCanWeServe,c.connectingToCoach])},[k.joinATraining]:{[$.completeProfile]:this.makeModule([c.updateName,c.updateLocation,c.updatePhone]),[$.joinTraining]:this.getModule($.joinTraining)},[k.connectWithFriend]:{[$.completeProfile]:this.makeModule([c.updateName,c.updateLocation],!0),[$.connectFriend]:this.makeModule([c.connectToFriend])},[k.joinFriendsPlan]:{[$.completeProfile]:this.makeModule([c.updateName,c.updateLocation],!0),[$.joinFriendsTraining]:this.makeModule([c.joinFriendsPlan])},[k.checkin]:{[$.checkin]:this.makeModule([c.checkinSubmit])}}[e]:{}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._handleHistoryPopState)}createRenderRoot(){return this}}window.customElements.define("zume-wizard",wt);const L={[c.updateName]:{slug:c.updateName,component:(i,e,t)=>o`
            <complete-profile
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.complete_profile}"
                variant=${c.updateName}
                @done-step=${i.doneHandler}
                value=${JSON.stringify(i.value)}
            ></complete-profile>
        `},[c.updateLocation]:{slug:c.updateLocation,component:(i,e,t)=>o`
            <complete-profile
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.complete_profile}"
                variant=${c.updateLocation}
                @done-step=${i.doneHandler}
                value=${JSON.stringify(i.value)}
            ></complete-profile>
        `},[c.updatePhone]:{slug:c.updatePhone,component:(i,e,t)=>o`
            <complete-profile
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.complete_profile}"
                variant=${c.updatePhone}
                @done-step=${i.doneHandler}
                value=${JSON.stringify(i.value)}
            ></complete-profile>
        `},[c.contactPreferences]:{slug:c.contactPreferences,component:(i,e,t)=>o`
            <request-coach
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.get_a_coach}"
                variant=${c.contactPreferences}
                @done-step=${i.doneHandler}
            ></request-coach>
        `},[c.languagePreferences]:{slug:c.languagePreferences,component:(i,e,t)=>o`
            <request-coach
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.get_a_coach}"
                variant=${c.languagePreferences}
                @done-step=${i.doneHandler}
            ></request-coach>
        `},[c.howCanWeServe]:{slug:c.howCanWeServe,component:(i,e,t)=>o`
            <request-coach
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.get_a_coach}"
                variant=${c.howCanWeServe}
                @done-step=${i.doneHandler}
            ></request-coach>
        `},[c.connectingToCoach]:{slug:c.connectingToCoach,component:(i,e,t)=>o`
            <request-coach
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.get_a_coach}"
                variant=${c.connectingToCoach}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></request-coach>
        `},[c.inviteFriends]:{slug:c.inviteFriends,component:(i,e,t)=>o`
            <invite-friends
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.share}
            ></invite-friends>
        `},[c.joinTraining]:{slug:c.joinTraining,component:(i,e,t)=>o`
            <join-training
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.join_training}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></join-training>
        `},[c.joinFriendsPlan]:{slug:c.joinFriendsPlan,component:(i,e,t)=>o`
            <join-friends-training
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.join_training}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></join-friends-training>
        `},[c.connectToFriend]:{slug:c.connectToFriend,component:(i,e,t)=>o`
            <connect-friend
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.connect_friend}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></connect-friend>
        `},[c.checkinSubmit]:{slug:c.checkinSubmit,component:(i,e,t)=>o`
            <session-checkin
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.checkin}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></session-checkin>
        `},[c.howManySessions]:{slug:c.howManySessions,component:(i,e,t)=>o`
            <make-group
                class=${t}
                name=${i.slug}
                module=${i.module}
                variant=${c.howManySessions}
                ?skippable=${i.skippable}
                .t=${e.checkin}
                @done-step=${i.doneHandler}
            ></make-group>
        `},[c.whatTimeOfDay]:{slug:c.whatTimeOfDay,component:(i,e,t)=>o`
            <make-group
                class=${t}
                name=${i.slug}
                module=${i.module}
                variant=${c.whatTimeOfDay}
                ?skippable=${i.skippable}
                .t=${e.checkin}
                @done-step=${i.doneHandler}
            ></make-group>
        `},[c.howOften]:{slug:c.howOften,component:(i,e,t)=>o`
            <make-group
                class=${t}
                name=${i.slug}
                module=${i.module}
                variant=${c.howOften}
                ?skippable=${i.skippable}
                .t=${e.checkin}
                @done-step=${i.doneHandler}
            ></make-group>
        `},[c.startDate]:{slug:c.startDate,component:(i,e,t)=>o`
            <make-group
                class=${t}
                name=${i.slug}
                module=${i.module}
                variant=${c.startDate}
                ?skippable=${i.skippable}
                .t=${e.checkin}
                @done-step=${i.doneHandler}
            ></make-group>
        `}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},it=i=>(...e)=>({_$litDirective$:i,values:e});class nt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:kt}=yt,St=i=>i.strings===void 0,De=()=>document.createComment(""),B=(i,e,t)=>{var s;const n=i._$AA.parentNode,r=e===void 0?i._$AB:e._$AA;if(t===void 0){const a=n.insertBefore(De(),r),h=n.insertBefore(De(),r);t=new kt(a,h,i,i.options)}else{const a=t._$AB.nextSibling,h=t._$AM,l=h!==i;if(l){let d;(s=t._$AQ)===null||s===void 0||s.call(t,i),t._$AM=i,t._$AP!==void 0&&(d=i._$AU)!==h._$AU&&t._$AP(d)}if(a!==r||l){let d=t._$AA;for(;d!==a;){const f=d.nextSibling;n.insertBefore(d,r),d=f}}}return t},T=(i,e,t=i)=>(i._$AI(e,t),i),jt={},at=(i,e=jt)=>i._$AH=e,xt=i=>i._$AH,ge=i=>{var e;(e=i._$AP)===null||e===void 0||e.call(i,!1,!0);let t=i._$AA;const s=i._$AB.nextSibling;for(;t!==s;){const n=t.nextSibling;t.remove(),t=n}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Et=it(class extends nt{constructor(i){if(super(i),i.type!==z.PROPERTY&&i.type!==z.ATTRIBUTE&&i.type!==z.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!St(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[e]){if(e===x||e===_)return e;const t=i.element,s=i.name;if(i.type===z.PROPERTY){if(e===t[s])return x}else if(i.type===z.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(s))return x}else if(i.type===z.ATTRIBUTE&&t.getAttribute(s)===e+"")return x;return at(i),e}});class Ct extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},value:{type:String},locations:{attribute:!1},locationError:{attribute:!1},phoneError:{attribute:!1},city:{attribute:!1},loading:{attribute:!1},state:{attribute:!1},localValue:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.locations=[],this.locationError="",this.city="",this.loading=!1,this.localValue="",this.phoneError="",this._clearLocations=this._clearLocations.bind(this),this._handleSuggestions=this._handleSuggestions.bind(this),this._debounceCityChange=debounce(getAddressSuggestions(this._handleSuggestions,jsObject.map_key)).bind(this),this._handleCityInputChange=this._handleCityInputChange.bind(this)}firstUpdated(){this.renderRoot.querySelector(".inputs input").focus(),this.value!==""&&(this.localValue=JSON.parse(this.value))}render(){var e;return o`
        <form class="inputs stack" @submit=${this._handleSubmit}>
            ${this.variant===c.updateName?o`
                <h2>${this.t.name_question}</h2>
                <div class="">
                    <label for="name">${this.t.name}</label>
                    <input class="input" type="text" id="name" name="name" value=${this.localValue} ?required=${!this.skippable}>
                </div>
            `:""}

            ${this.variant===c.updatePhone?o`
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

            ${this.variant===c.updateLocation?o`
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
            ${[c.updatePhone,c.updateName].includes(this.variant)?o`
                <div class="cluster | mx-auto">
                    <button type="submit" class="btn" ?disabled=${this.loading}>${this.t.next}</button>
                    <span class="loading-spinner ${this.loading?"active":""}"></span>
                </div>
            `:""}
        </form>
        `}_handleInput(e){this.phoneError=""}_handleInvalid(e){e.preventDefault(),this.phoneError=this.t.phone_error}_handleSubmit(e){e.preventDefault(),e.srcElement.querySelector("#city")?this._handleSubmitLocation():this._handleDone(e)}_handleDone(e){e&&e.preventDefault();const t=e.target[0];if(t.type==="submit")return;let{name:s,value:n}=t;t.type==="tel"&&(n=t.value.replace(/[\(\)\-\s]/g,"")),this._updateProfile(s,n,()=>{this._sendDoneStepEvent()})}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleCityChange(e){this._handleCityInputChange(e),this._debounceCityChange(e)}_handleCityInputChange(e){this.city=e.target.value}_handleSuggestions(e){e.features.length<1&&(this.locationError=this.t.no_locations_found),this.locations=e.features}_handleLocationSelection(e){this.city=e.target.dataset.placeName;const t=getLocationGridFromMapbox(e.target.id,jsObject.profile.location);this.localValue=t,this._clearLocations()}_handleSubmitLocation(){if(this.localValue.source==="ip"){const{label:e,level:t,lat:s,lng:n}=this.localValue;this.localValue={source:"user",grid_id:!1,label:e,level:t,lat:Number(s),lng:Number(n)}}this._updateProfile("location_grid_meta",this.localValue,()=>{this._sendDoneStepEvent()})}_updateProfile(e,t,s=()=>{}){this.loading=!0;const n={[e]:t};fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(n),headers:{"X-WP-Nonce":jsObject.nonce}}).then(r=>r.json()).then(r=>{jsObject.profile=r,s()}).catch(r=>{console.error(r)}).finally(()=>{this.loading=!1})}_clearLocations(){this.locations=[]}createRenderRoot(){return this}}window.customElements.define("complete-profile",Ct);class Ot extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},inviteCode:{type:String}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.t={},this.inviteCode="123456",this.url=`https://zume5.test/zume_app/plan_invite${this.inviteCode!==""?"?code="+this.inviteCode:""}`}render(){return o`
            <div class="center stack">
                <h2>${this.t.title}</h2>
                <p>${this.t.share_with_friends}</p>
                <share-links url=${this.url} title="${this.t.join_my_plan}" .t=${this.t}></share-links>
            </div>
        `}createRenderRoot(){return this}}window.customElements.define("invite-friends",Ot);class Pt extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},errorMessage:{attribute:!1},message:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.state={},this.errorMessage="",this.message="",this.loading=!1,this.contactPreferences=["email","text","phone","whatsapp","signal","telegram","messenger"]}firstUpdated(){this.message=this.t.connect_success;const e=this.stateManager.getAll();if(this.variant===c.connectingToCoach){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));const t=(n=>{n===!1&&(this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting)),n.coach_request&&n.coach_request.errors&&Object.keys(n.coach_request.errors).length!==0&&Object.keys(n.coach_request.errors)[0]==="already_has_coach"&&(this.message=this.t.already_coached,this.setErrorMessage(this.t.error_connecting)),this._handleFinish()}).bind(this),s=(()=>{this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting),this._handleFinish()}).bind(this);makeRequest("POST","get_a_coach",{data:e},"zume_system/v1/").done(t).fail(s).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return this.stateManager||(this.stateManager=new He(this.module),this.state=this.stateManager.get(this.variant)||{},this.variant===c.languagePreferences&&!this.state.value&&(this.state.value=jsObject.profile.preferred_language||"en",this.stateManager.add(this.variant,this.state)),this.variant===c.contactPreferences&&Object.keys(this.state).length===0&&(this.state=Object.fromEntries(jsObject.profile.contact_preference.map(e=>[e,"true"])))),o`
        <form class="inputs stack-2" @submit=${this._handleDone}>
            ${this.variant===c.contactPreferences?o`
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

            ${this.variant===c.languagePreferences?o`
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

            ${this.variant===c.howCanWeServe?o`
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
            ${this.variant===c.connectingToCoach?o`

                <h1>${this.t.connecting_coach_title}</h1>
                <p>${this.message}</p>
                <span class="loading-spinner ${this.loading?"active":""}"></span>
            `:""}
            ${this.variant!==c.connectingToCoach?o`
                    <div class="cluster | mx-auto">
                        <span class="loading-spinner ${this.loading?"active":""}"></span>
                        <button type="submit" class="btn" ?disabled=${this.loading}>${this.t.next}</button>
                    </div>
                `:""}
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        </form>
        `}_handleDone(e){if(e&&e.preventDefault(),Object.keys(this.state).length===0){this.setErrorMessage(this.t.missing_response);return}this._sendDoneStepEvent()}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleFinish(){setTimeout(()=>{this._sendDoneStepEvent()},3e3)}_handleChange(e){e.target.type==="checkbox"&&(this.state[e.target.value]=e.target.checked),e.target.type==="text"&&(this.state.value=e.target.value),e.target.type==="select-one"&&(this.state.value=e.target.value),this.stateManager.add(this.variant,this.state)}createRenderRoot(){return this}}customElements.define("request-coach",Pt);class At extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.showTrainings=!1,this.loading=!1}firstUpdated(){const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.loading=!1,this.showTrainings=!0;return}const t=e.searchParams.get("code");this.connectToPlan(t)}connectToPlan(e){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait,this.code=e,makeRequest("POST","connect/public-plan",{code:e},"zume_system/v1").then(t=>{console.log(t),this.message=this.t.success.replace("%s",t.name),this._sendDoneStepEvent()}).fail(({responseJSON:t})=>{console.log(t),this.message="",t.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}_handleChosenTraining(e){console.log(e);const{code:t}=e.detail;this.showTrainings=!1,this.connectToPlan(t)}render(){return o`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            ${this.showTrainings?o`
                <public-trainings .t=${this.t} @chosen-training=${this._handleChosenTraining}></public-trainings>
            `:""}
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("join-training",At);class Tt extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1;return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","connect/plan",{code:t},"zume_system/v1").then(s=>{console.log(s),this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return o`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("join-friends-training",Tt);class zt extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","connect/friend",{code:t},"zume_system/v1").then(s=>{console.log(s),this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_friend_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return o`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("connect-friend",zt);class Rt extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","checkin",{code:t},"zume_system/v1").then(s=>{this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_checkin_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){console.log(e),this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return o`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("session-checkin",Rt);class Mt extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},errorMessage:{attribute:!1},message:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.state={},this.errorMessage="",this.message="",this.loading=!1}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return o`
            ${this.variant===c.howManySessions?o`
                <h2>Will you do 1 or 2 hour training sessions?</h2>
                <div class="stack">
                    <button class="btn" @click=${this._handleDone}>1 hour (20 sessions)</button>
                    <button class="btn" @click=${this._handleDone}>2 hour (10 sessions)</button>
                </div>
            `:""}
            ${this.variant===c.whatTimeOfDay?o`
                <h2>What time of day?</h2>
                <div class="stack">
                    <button class="btn" @click=${this._handleDone}>Morning</button>
                    <button class="btn" @click=${this._handleDone}>Afternoon</button>
                    <button class="btn" @click=${this._handleDone}>Evening</button>
                </div>
            `:""}
            ${this.variant===c.howOften?o`
                <h2>How often will you meet?</h2>
                <div class="stack">
                    <button class="btn" @click=${this._handleDone}>Every day</button>
                    <button class="btn" @click=${this._handleDone}>Once a week</button>
                    <button class="btn" @click=${this._handleDone}>Twice a month</button>
                    <button class="btn" @click=${this._handleDone}>Once a month</button>
                </div>
            `:""}
            ${this.variant===c.startDate?o`
                <h2>When do you plan to start?</h2>
                <input type="date">
                <button class="btn" @click=${this._handleDone}>Done</button>
            `:""}

        `}_handleDone(e){e&&e.preventDefault(),this._sendDoneStepEvent()}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleFinish(){setTimeout(()=>{this._sendDoneStepEvent()},3e3)}createRenderRoot(){return this}}customElements.define("make-group",Mt);function It(i){return i?JSON.parse('{"'+i.substring(1).replace(/&/g,'","').replace(/=/g,'":"')+'"}'):{}}function Lt(i,e){let t={};const s=i.split("/").filter(r=>r!=""),n=e.split("/").filter(r=>r!="");return s.map((r,a)=>{/^:/.test(r)&&(t[r.substring(1)]=n[a])}),t}function Dt(i){return i?new RegExp("^(|/)"+i.replace(/:[^\s/]+/g,"([\\wÀ-ÖØ-öø-ÿ-]+)")+"(|/)$"):new RegExp("(^$|^/$)")}function Nt(i,e){if(Dt(e).test(i))return!0}function qt(i){return class extends i{static get properties(){return{route:{type:String,reflect:!0,attribute:"route"},canceled:{type:Boolean}}}constructor(...e){super(...e),this.route="",this.canceled=!1}connectedCallback(...e){super.connectedCallback(...e),this.routing(this.constructor.routes,(...t)=>this.router(...t)),window.addEventListener("route",()=>{this.routing(this.constructor.routes,(...t)=>this.router(...t))}),window.onpopstate=()=>{window.dispatchEvent(new CustomEvent("route"))}}routed(e,t,s,n,r,a){a&&a(e,t,s,n),r(e,t,s,n)}routing(e,t){this.canceled=!0;const s=decodeURI(window.location.pathname),n=decodeURI(window.location.search);let r=e.filter(l=>l.pattern==="*")[0],a=e.filter(l=>l.pattern!=="*"&&Nt(s,l.pattern))[0],h=It(n);a?(a.params=Lt(a.pattern,s),a.data=a.data||{},a.authentication&&a.authentication.authenticate&&typeof a.authentication.authenticate=="function"?(this.canceled=!1,Promise.resolve(a.authentication.authenticate.bind(this).call()).then(l=>{this.canceled||(l?a.authorization&&a.authorization.authorize&&typeof a.authorization.authorize=="function"?(this.canceled=!1,Promise.resolve(a.authorization.authorize.bind(this).call()).then(d=>{this.canceled||(d?this.routed(a.name,a.params,h,a.data,t,a.callback):this.routed(a.authorization.unauthorized.name,a.params,h,a.data,t,a.callback))})):this.routed(a.name,a.params,h,a.data,t,a.callback):this.routed(a.authentication.unauthenticated.name,a.params,h,a.data,t,a.callback))})):a.authorization&&a.authorization.authorize&&typeof a.authorization.authorize=="function"?(this.canceled=!1,Promise.resolve(a.authorization.authorize.bind(this).call()).then(l=>{this.canceled||(l?this.routed(a.name,a.params,h,a.data,t,a.callback):this.routed(a.authorization.unauthorized.name,a.params,h,a.data,t,a.callback))})):this.routed(a.name,a.params,h,a.data,t,a.callback)):r&&(r.data=r.data||{},this.routed(r.name,{},h,r.data,t,r.callback))}}}function Ht(i){return class extends i{navigate(e){window.history.pushState({},null,e),window.dispatchEvent(new CustomEvent("route"))}}}function ve(i){return(e,t)=>{e.preventDefault(),t(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:i}}))}}function Ut(){return[{name:"root",pattern:`${jsObject.base_url}`,icon:"",type:"dash-link",translation:"",data:{component:""}},{name:"getting-started",pattern:`${jsObject.base_url}/getting-started`,icon:"zume-start",type:"dash-link",translation:jsObject.translations.getting_started,data:{component:"dash-getting-started"}},{name:"set-profile",pattern:"#",parent:"getting-started",icon:"zume-profile",type:"handled-link",clickHandler:ve("set-profile"),translation:jsObject.translations.set_profile,explanation:jsObject.translations.set_profile_explanation,data:{component:""}},{name:"join-a-training",pattern:"#",parent:"getting-started",icon:"zume-start",type:"handled-link",clickHandler:ve("getting-started"),translation:jsObject.translations.plan_a_training,explanation:jsObject.translations.plan_a_training_explanation,data:{component:""}},{name:"get-a-coach",pattern:"#",parent:"getting-started",icon:"zume-coach",type:"handled-link",clickHandler:ve("get-a-coach"),translation:jsObject.translations.get_a_coach,explanation:jsObject.translations.get_a_coach_explanation,data:{component:""}},{name:"training",pattern:`${jsObject.base_url}/training`,icon:"zume-training",type:"dash-link",translation:jsObject.translations.training,data:{component:"dash-training"}},{name:"my-training",pattern:`${jsObject.base_url}/my-training`,parent:"training",icon:"zume-group",type:"dash-link",translation:jsObject.translations.my_training,explanation:jsObject.translations.my_training_explanation,data:{component:"dash-trainings"}},{name:"my-progress",pattern:`${jsObject.base_url}/my-progress`,parent:"training",icon:"zume-progress",type:"dash-link",translation:jsObject.translations.my_progress,explanation:jsObject.translations.my_progress_explanation,data:{component:"dash-progress"}},{name:"3-month-plan",pattern:`${jsObject.base_url}/3-month-plan`,parent:"training",icon:"zume-plans",type:"dash-link",translation:jsObject.translations["3_month_plan"],explanation:jsObject.translations["3_month_plan_explanation"],data:{component:"dash-3-month-plan"}},{name:"practicing",pattern:`${jsObject.base_url}/practicing`,icon:"zume-practicing",type:"dash-link",translation:jsObject.translations.practicing,data:{component:"dash-practicing"}},{name:"my-coach",pattern:`${jsObject.base_url}/my-coach`,parent:"practicing",icon:"zume-coach",type:"dash-link",translation:jsObject.translations.my_coach,explanation:jsObject.translations.my_coach_explanation,data:{component:"dash-coach"}},{name:"my-tools",pattern:`${jsObject.base_url}/my-tools`,parent:"practicing",icon:"zume-tools",type:"dash-link",translation:jsObject.translations.my_tools,explanation:jsObject.translations.my_tools_explanation,data:{component:"dash-tools"}},{name:"my-plans",pattern:`${jsObject.base_url}/my-plans`,parent:"practicing",icon:"zume-plans",type:"dash-link",translation:jsObject.translations.my_plans,explanation:jsObject.translations.my_plans_explanation,data:{component:"dash-plans"}},{name:"my-churches",pattern:`${jsObject.base_url}/my-churches`,parent:"practicing",icon:"zume-churches",type:"dash-link",translation:jsObject.translations.my_churches,explanation:jsObject.translations.my_churches_explanation,data:{component:"dash-churches"}},{name:"my-maps",pattern:`${jsObject.base_url}/my-maps`,parent:"practicing",icon:"zume-maps",type:"dash-link",translation:jsObject.translations.my_maps,explanation:jsObject.translations.my_maps_explanation,data:{component:"dash-maps"}},{name:"not-found",pattern:"*",icon:"",type:"dash-link",data:{component:"dash-not-found"}}]}class b extends qt(g){static get properties(){return{route:{type:String},params:{type:Object},query:{type:Object},menuOffset:{type:Number,attribute:!1},userProfile:{type:Object,attribute:!1},userState:{type:Object,attribute:!1},wizardType:{type:String,attribute:!1}}}static get routes(){const e={1:"dash-getting-started",2:"dash-training",3:"dash-practicing"},t=jsObject.user_stage.value||1,s=t<4?t:3;return Ut().map(r=>(r.name==="root"&&(r.data.component=e[s]),r))}static getRoute(e){return b.routes.find(s=>s.name===e)}static childRoutesOf(e){return b.routes.filter(({parent:s})=>s===e)}constructor(){super(),this.route="",this.params={},this.query={},this.data={},this.menuOffset=0,this.userProfile=jsObject.profile,this.userState=jsObject.user_stage.state,this.wizardType="",this.updateUserProfile=this.updateUserProfile.bind(this),this.updateWizardType=this.updateWizardType.bind(this),this.refetchState=this.refetchState.bind(this),this.refetchHost=this.refetchHost.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("user-profile:change",this.updateUserProfile),window.addEventListener("toggle-dashboard-sidebar",this.toggleSidebar),window.addEventListener("open-wizard",this.updateWizardType),window.addEventListener("wizard-finished",this.closeWizard),window.addEventListener("user-state:change",this.refetchState),window.addEventListener("user-host:change",this.refetchHost)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("user-profile:change",this.updateUserProfile),window.removeEventListener("toggle-dashboard-sidebar",this.toggleSidebar),window.removeEventListener("open-wizard",this.updateWizardType),window.removeEventListener("wizard-finished",this.closeWizard),window.removeEventListener("user-host:change",this.refetchHost)}firstUpdated(){this.menuOffset=this.getOffsetTop(".sidebar-wrapper")}updateWizardType(e){const t=e.detail.type;this.openWizard(t)}router(e,t,s,n){this.route=e,this.params=t,this.query=s,this.data=n}makeHref(e){return`${jsObject.base_url}/${e}`}makeHrefRoute(e){const s=b.routes.find(({name:n})=>n===e);return s?s.pattern:(console.error("MISSING ROUTE",e),"")}renderRoute(){const{component:e}=this.data,t=b.getLockedStatus(this.route,this.userState);if(!e)return"";const s=document.createElement(e);return t&&s.setAttribute("showTeaser",t),s}getOffsetTop(e){return this.querySelector(e).offsetTop}toggleSidebar(){const e=document.querySelector(".dashboard__sidebar"),t=document.querySelector(".sidebar__trigger-close-background"),s="200";e.style.transitionDuration=s,t.style.transitionDuration=s;const n=e.dataset.state;n==="open"&&(e.dataset.state="closed",t.style.opacity=0,setTimeout(()=>{t.style.visibility="hidden"},s)),(!n||n==="closed")&&(e.dataset.state="open",t.style.opacity="initial",t.style.visibility="visible")}updateUserProfile(e){const t=e.detail;this.userProfile=t}createInitials(e){return typeof e!="string"||e.length===0?"":e.split(" ").map(s=>s.length>0?s[0].toUpperCase():"").slice(0,2).join("")}static getCompletedStatus(e,t){return!!(e==="set-profile"&&t.set_profile_location&&t.set_profile_name||e==="get-a-coach"&&t.requested_a_coach||e==="join-a-training"&&(t.plan_created||t.joined_online_training))}static getLockedStatus(e,t){return!!(e==="my-plans"&&!t.made_3_month_plan||["my-churches","my-maps"].includes(e)&&!t.join_community||e==="3-month-plan"&&!t.can_create_3_month_plan||e==="my-training"&&!t.plan_created&&!t.joined_online_training)}getGettingStartedPercentage(){const e=["get-a-coach","set-profile","join-a-training"],t=e.reduce((s,n)=>b.getCompletedStatus(n,this.userState)?s+1:s,0);return Math.round(t/e.length*100)}openWizard(e){const t=document.querySelector("#wizard-modal");jQuery(t).foundation("open"),this.wizardType=e}closeWizard(){this.wizardType="";const e=document.querySelector("#wizard-modal");jQuery(e).foundation("close")}refetchState(){console.log("refetching state"),makeRequest("GET","user_stage",{},"zume_system/v1").done(e=>{(!e||!e.state)&&console.error("Stage or state data not returned from api"),jsObject.user_stage=e,this.userState=e.state})}refetchHost(){console.log("refetching host"),makeRequest("GET","user_host",{},"zume_system/v1").done(e=>{e||console.error("Host not returned from api"),jsObject.host_progress=e})}openProfile(){const e=document.querySelector("#profile-modal");jQuery(e).foundation("open")}closeProfile(){const e=document.querySelector("#profile-modal");jQuery(e).foundation("close")}openCommunityModal(e){e.preventDefault();const t=document.querySelector("#community-modal");jQuery(t).foundation("open")}closeCommunityModal(){const e=document.querySelector("#community-modal");jQuery(e).foundation("close")}joinCommunity(){makeRequest("POST","log",{type:"system",subtype:"join_community"},"zume_system/v1/").done(e=>{this.refetchState()})}hasJoinedCommunity(){return!!this.userState.join_community}openResourcesModal(e){e.preventDefault();const t=document.querySelector("#resources-modal");jQuery(t).foundation("open")}closeResourcesModal(){const e=document.querySelector("#resources-modal");jQuery(e).foundation("close")}render(){return o`
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
                                    ${b.childRoutesOf("getting-started").map(e=>o`
                                                <li>
                                                    <nav-link
                                                        class="menu-btn"
                                                        href=${this.makeHrefRoute(e.name)}
                                                        icon=${e.icon}
                                                        text=${e.translation}
                                                        ?disableNavigate=${e.type==="handled-link"}
                                                        @click=${e.type==="handled-link"?t=>{b.getCompletedStatus(e.name,this.userState)||e.clickHandler(t,this.dispatchEvent)}:null}
                                                        ?completed=${b.getCompletedStatus(e.name,this.userState)}
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
                                    ${b.childRoutesOf("training").map(e=>o`
                                                <li>
                                                    <nav-link
                                                        class="menu-btn"
                                                        href=${this.makeHrefRoute(e.name)}
                                                        icon=${e.icon}
                                                        text=${e.translation}
                                                        ?locked=${b.getLockedStatus(e.name,this.userState)}
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
                                    ${b.childRoutesOf("practicing").map(e=>o`
                                                <li>
                                                    <nav-link
                                                        class="menu-btn"
                                                        href=${this.makeHrefRoute(e.name)}
                                                        icon=${e.icon}
                                                        text=${e.translation}
                                                        ?locked=${b.getLockedStatus(e.name,this.userState)}
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
        `}createRenderRoot(){return this}}customElements.define("dash-board",b);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ne=(i,e,t)=>{const s=new Map;for(let n=e;n<=t;n++)s.set(i[n],n);return s},J=it(class extends nt{constructor(i){if(super(i),i.type!==z.CHILD)throw Error("repeat() can only be used in text expressions")}dt(i,e,t){let s;t===void 0?t=e:e!==void 0&&(s=e);const n=[],r=[];let a=0;for(const h of i)n[a]=s?s(h,a):a,r[a]=t(h,a),a++;return{values:r,keys:n}}render(i,e,t){return this.dt(i,e,t).values}update(i,[e,t,s]){var n;const r=xt(i),{values:a,keys:h}=this.dt(e,t,s);if(!Array.isArray(r))return this.ht=h,a;const l=(n=this.ht)!==null&&n!==void 0?n:this.ht=[],d=[];let f,p,u=0,m=r.length-1,v=0,y=a.length-1;for(;u<=m&&v<=y;)if(r[u]===null)u++;else if(r[m]===null)m--;else if(l[u]===h[v])d[v]=T(r[u],a[v]),u++,v++;else if(l[m]===h[y])d[y]=T(r[m],a[y]),m--,y--;else if(l[u]===h[y])d[y]=T(r[u],a[y]),B(i,d[y+1],r[u]),u++,y--;else if(l[m]===h[v])d[v]=T(r[m],a[v]),B(i,r[u],r[m]),m--,v++;else if(f===void 0&&(f=Ne(h,v,y),p=Ne(l,u,m)),f.has(l[u]))if(f.has(l[m])){const C=p.get(h[v]),re=C!==void 0?r[C]:null;if(re===null){const Se=B(i,r[u]);T(Se,a[v]),d[v]=Se}else d[v]=T(re,a[v]),B(i,r[u],re),r[C]=null;v++}else ge(r[m]),m--;else ge(r[u]),u++;for(;v<=y;){const C=B(i,d[y+1]);T(C,a[v]),d[v++]=C}for(;u<=m;){const C=r[u++];C!==null&&ge(C)}return this.ht=h,at(i,d),x}});class E extends g{constructor(){super();const t=document.querySelector("html").dataset.dir;this.isRtl=t==="rtl"}firstUpdated(){this.attachResizeObeserver(),this.updateHeaderStyle()}attachResizeObeserver(){const e=document.querySelector("dash-header-right"),t=new ResizeObserver(s=>{for(let n of s){if(!n.contentRect)return;const r=Math.round(n.contentRect.height),a=Math.round(n.contentRect.width);this.updateHeaderStyle(!1,r,a)}});this.resizeObserver=t,t.observe(e)}updateHeaderStyle(e=!0,t=0,s=window.innerWidth){const n=document.querySelector(".dashboard__header.left");e&&(this.initialOffset=n.offsetTop);let r;s<window.innerWidth/2?r=this.initialOffset:r=this.initialOffset+t,n.style.top=r+"px"}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver&&this.resizeObserver.disconnect()}}class Ft extends E{static get properties(){return{showTeaser:{type:Boolean},loading:{type:Boolean,attribute:!1},commitments:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1}}}constructor(){super(),this.showTeaser=!1,this.loading=!0,this.route=b.getRoute("3-month-plan"),this.filterName="3-month-plan-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.renderListItem=this.renderListItem.bind(this),this.closeCommitmentsModal=this.closeCommitmentsModal.bind(this)}firstUpdated(){super.firstUpdated();const e=this.filterStatus||"";this.fetchCommitments(e)}updated(){jQuery(document).foundation()}fetchCommitments(){const e=this.filterStatus;makeRequest("GET","commitments",{status:e},"zume_system/v1").done(t=>{this.commitments=t}).always(()=>{this.loading=!1})}openCommitmentsModal(){if(this.showTeaser)return;const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("open")}closeCommitmentsModal(){const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("close")}clearCommitmentsModal(){jQuery(".post-training-plan").each(function(e){this.value=""})}addCommitments(){const e=[];return jQuery(".post-training-plan").each(function(t){const s=jQuery(this).val();if(s){const r=jQuery(this).prev().text();console.log("Question: "+r+" Answer: "+s);var n=new Date;n.setDate(n.getDate()+30),this.value="";const a=makeRequest("POST","commitment",{user_id:jsObject.profile.user_id,post_id:jsObject.profile.contact_id,meta_key:"tasks",note:"Question: "+r+" Answer: "+s,question:r,answer:s,date:n,category:"post_training_plan"},"zume_system/v1");e.push(a.promise())}}),console.log(e),Promise.all(e).then(()=>{this.fetchCommitments(),this.closeCommitmentsModal()})}completeCommitment(e){let t={id:e,user_id:jsObject.profile.user_id};makeRequest("PUT","commitment",t,"zume_system/v1").done(s=>{this.fetchCommitments()})}deleteCommitment(e){let t={id:e,user_id:jsObject.profile.user_id};makeRequest("DELETE","commitment",t,"zume_system/v1").done(s=>{this.closeMenu(e),this.fetchCommitments()})}editCommitment(e){console.log(e)}filterCommitments(e){this.filterStatus=e,this.fetchCommitments(e),ZumeStorage.save(this.filterName,e),this.closeFilter()}closeFilter(){const e=this.querySelector("#filter-menu");jQuery(e).foundation("close")}closeMenu(e){const t=this.querySelector(`#kebab-menu-${e}`);jQuery(t).foundation("close")}renderListItem(e){const{question:t,answer:s,id:n,status:r}=e;return o`
            <li class="list__item | switcher | switcher-width-30">
                <span>${t} <b>${s}</b></span>
                <div class="list__secondary | grow-0">
                    <div class="d-flex w-6rem justify-content-center">
                        ${r==="closed"?o`<span class="icon zume-check-mark success"></span>`:o`
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
                <div class="dashboard__main">
                    ${this.showTeaser?o`
                            <p>Here lies the teaser area for this page</p>
                            <p>Once you have done the 3 month plan section of the training this area will unlock</p>
                            <button class="btn" @click=${this.unlock3MonthPlan}>Unlock now</button>
                        `:""}
                    ${this.loading&&!this.showTeaser?o`<span class="loading-spinner active"></span>`:o`
                                <ul class="list">
                                    ${!this.loading&&this.commitments&&this.commitments.length>0?J(this.commitments,e=>e.id,this.renderListItem):""}
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
        `}createRenderRoot(){return this}}customElements.define("dash-3-month-plan",Ft);class Bt extends E{static get properties(){return{showTeaser:{type:Boolean}}}constructor(){super(),this.showTeaser=!1}joinCommunity(){makeRequest("POST","log",{type:"system",subtype:"join_community"},"zume_system/v1/").done(e=>{const t=new CustomEvent("user-state:change",{bubbles:!0});this.dispatchEvent(t)})}render(){return o`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <dash-sidebar-toggle></dash-sidebar-toggle>
                    <h1 class="h3">Churches</h1>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main">
                    ${this.showTeaser?o`
                            <p>Join the community to get access to the churches area</p>
                            <button class="btn" @click=${this.joinCommunity}>
                                Join
                            </button>
                        `:o`
                            <p>You can now add churches you have started here</p>
                        `}
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-churches",Bt);class Wt extends E{render(){return o`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <dash-sidebar-toggle></dash-sidebar-toggle>
                    <h1 class="h3">Coach</h1>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main">
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-coach",Wt);class Zt extends g{static get properties(){return{ctas:{type:Array,attribute:!1}}}constructor(){super(),this.allCtas=[],this.ctas=[],this.userId=jsObject.profile.user_id}firstUpdated(){this.getCtas()}getCtas(){makeRequest("POST","user_ctas",{user_id:this.userId},"zume_system/v1").done(e=>{const t=Object.values(e);this.allCtas=t,this.ctas=this.shuffleArray(t).slice(0,3)})}shuffleArray(e){for(let t=e.length-1;t>0;t--){const s=Math.floor(Math.random()*(t+1));[e[t],e[s]]=[e[s],e[t]]}return e}renderCta({content:e,content_template:t}){if(t==="card")return o`
                <div class="stack | card cta">
                    <h2 class="h5 text-center">${e.title}</h2>
                    <p>${e.description}</p>
                    <a href="${e.link}" class="btn light uppercase">${e.link_text}</a>
                </div>
            `}render(){return o`
            <div class="stack">
                ${J(this.ctas,e=>e.key,this.renderCta)}
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-cta",Zt);class ae extends E{static get properties(){return{view:{type:String,attribute:!1},userState:{type:Object,attribute:!1}}}constructor(e){super(),this.routeName=e,this.route=b.getRoute(this.routeName),this.routes=b.childRoutesOf(this.routeName),this.view="list",this.userState=jsObject.user_stage.state,this.refetchState=this.refetchState.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("user-state:change",this.refetchState)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("user-state:change",this.refetchState)}switchView(e="list"){this.view=e}refetchState(){makeRequest("GET","user_stage",{},"zume_system/v1").done(e=>{console.log(this,e),(!e||!e.state)&&console.error("Stage or state data not returned from api"),jsObject.user_stage=e,this.userState=e.state})}renderLinks(e){return this.view==="grid"?o`
                <div class="nav-grid">
                    ${this.routes.map(t=>o`
                        <grid-link
                            href=${t.pattern}
                            text=${t.translation||""}
                            icon=${t.icon}
                            ?disableNavigate=${t.type==="handled-link"}
                            @click=${t.type==="handled-link"?s=>{b.getCompletedStatus(t.name,e)||t.clickHandler(s,this.dispatchEvent)}:null}
                            ?completed=${b.getCompletedStatus(t.name,e)}
                            ?locked=${b.getLockedStatus(t.name,e)}
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
                        @click=${t.type==="handled-link"?s=>{b.getCompletedStatus(t.name,e)||t.clickHandler(s,this.dispatchEvent)}:null}
                        ?completed=${b.getCompletedStatus(t.name,e)}
                        ?locked=${b.getLockedStatus(t.name,e)}
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
        `}createRenderRoot(){return this}}customElements.define("dash-top-level",ae);class Qt extends ae{constructor(){super("getting-started")}createRenderRoot(){return this}}customElements.define("dash-getting-started",Qt);class Vt extends E{static get properties(){return{showTeaser:{type:Boolean}}}constructor(){super(),this.showTeaser=!1}joinCommunity(){makeRequest("POST","log",{type:"system",subtype:"join_community"},"zume_system/v1/").done(e=>{const t=new CustomEvent("user-state:change",{bubbles:!0});this.dispatchEvent(t)})}render(){return o`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <dash-sidebar-toggle></dash-sidebar-toggle>
                    <h1 class="h3">Maps</h1>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main">
                    ${this.showTeaser?o`
                            <p>Join the community to get access to the maps area</p>
                            <button class="btn" @click=${this.joinCommunity}>
                                Join
                            </button>
                        `:o`
                            <p>You can now see your vision maps here. (If you imagine them hard enough)</p>
                        `}
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-maps",Vt);class Gt extends E{render(){return o`
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
        `}createRenderRoot(){return this}}customElements.define("dash-not-found",Gt);class Jt extends E{static get properties(){return{showTeaser:{type:Boolean},loading:{type:Boolean,attribute:!1},commitments:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1}}}constructor(){super(),this.showTeaser=!1,this.loading=!0,this.route=b.getRoute("my-plans"),this.filterName="my-plans-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.renderListItem=this.renderListItem.bind(this),this.closeCommitmentsModal=this.closeCommitmentsModal.bind(this)}firstUpdated(){super.firstUpdated();const e=this.filterStatus||"";this.fetchCommitments(e)}updated(){jQuery(document).foundation()}fetchCommitments(){const e=this.filterStatus;makeRequest("GET","commitments",{status:e},"zume_system/v1").done(t=>{this.commitments=t}).always(()=>{this.loading=!1})}openCommitmentsModal(){if(this.showTeaser)return;const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("open")}closeCommitmentsModal(){const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("close")}clearCommitmentsModal(){jQuery(".post-training-plan").each(function(e){this.value=""})}addCommitments(){const e=[];return jQuery(".post-training-plan").each(function(t){const s=jQuery(this).val();if(s){const r=jQuery(this).prev().text();console.log("Question: "+r+" Answer: "+s);var n=new Date;n.setDate(n.getDate()+30),this.value="";const a=makeRequest("POST","commitment",{user_id:jsObject.profile.user_id,post_id:jsObject.profile.contact_id,meta_key:"tasks",note:"Question: "+r+" Answer: "+s,question:r,answer:s,date:n,category:"post_training_plan"},"zume_system/v1");e.push(a.promise())}}),console.log(e),Promise.all(e).then(()=>{this.fetchCommitments(),this.closeCommitmentsModal()})}completeCommitment(e){let t={id:e,user_id:jsObject.profile.user_id};makeRequest("PUT","commitment",t,"zume_system/v1").done(s=>{this.fetchCommitments()})}deleteCommitment(e){let t={id:e,user_id:jsObject.profile.user_id};makeRequest("DELETE","commitment",t,"zume_system/v1").done(s=>{this.closeMenu(e),this.fetchCommitments()})}editCommitment(e){console.log(e)}filterCommitments(e){this.filterStatus=e,this.fetchCommitments(e),ZumeStorage.save(this.filterName,e),this.closeFilter()}closeFilter(){const e=this.querySelector("#filter-menu");jQuery(e).foundation("close")}closeMenu(e){const t=this.querySelector(`#kebab-menu-${e}`);jQuery(t).foundation("close")}renderListItem(e){const{question:t,answer:s,id:n,status:r}=e;return o`
            <li class="list__item | switcher | switcher-width-30">
                <span>${t} <b>${s}</b></span>
                <div class="list__secondary | grow-0">
                    <div class="d-flex w-6rem justify-content-center">
                        ${r==="closed"?o`<span class="icon zume-check-mark success"></span>`:o`
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
                <div class="dashboard__main">
                    ${this.showTeaser?o`
                            <p>Here lies the teaser area for this page</p>
                            <p>Once you have created your 3 month plan. You can manage and complete it here</p>
                        `:""}
                    ${this.loading&&!this.showTeaser?o`<span class="loading-spinner active"></span>`:o`
                                <ul class="list">
                                    ${!this.loading&&this.commitments&&this.commitments.length>0?J(this.commitments,e=>e.id,this.renderListItem):""}
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
        `}createRenderRoot(){return this}}customElements.define("dash-plans",Jt);class Kt extends ae{constructor(){super("practicing")}createRenderRoot(){return this}}customElements.define("dash-practicing",Kt);class Yt extends E{static get properties(){return{loading:{type:Boolean,attribute:!1},filteredItems:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1},hostProgress:{type:Object,attribute:!1}}}constructor(){super(),this.loading=!1,this.route=b.getRoute("my-progress"),this.trainingItems=jsObject.training_items,this.hostProgress=jsObject.host_progress,this.filterName="my-progress-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.filteredItems=this.filterItems(this.filterStatus),this.openStates={},this.trainingItems.forEach(e=>{this.openStates[e.key]=!1}),this.renderListItem=this.renderListItem.bind(this),this.closeInfoModal=this.closeInfoModal.bind(this)}updated(){jQuery(document).foundation()}openInfoModal(){const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("open")}closeInfoModal(){const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("close")}filterProgress(e){this.filterStatus=e,this.filteredItems=this.filterItems(e),console.log(this.filteredItems),ZumeStorage.save(this.filterName,e),this.closeFilter()}filterItems(e){switch(e){case"heard":return this.trainingItems.filter(t=>{const s=t.host[0].key;return!!(this.hostProgress.list[s]||!1)});case"not-heard":return this.trainingItems.filter(t=>{const s=t.host[0].key;return!(this.hostProgress.list[s]||!1)});default:return[...this.trainingItems]}}closeFilter(){const e=this.querySelector("#filter-menu");jQuery(e).foundation("close")}toggleHost(e,t){t.stopImmediatePropagation();const{type:s,subtype:n,key:r}=e,a=this.hostProgress.list[r];a===!1&&makeRequest("POST","host",{type:s,subtype:n,user_id:jsObject.profile.user_id},"zume_system/v1").done(h=>{Array.isArray(h)&&(this.hostProgress.list[r]=!0),this.loadHostStatus()}),a===!0&&makeRequest("DELETE","host",{type:s,subtype:n,user_id:jsObject.profile.user_id},"zume_system/v1").done(h=>{Array.isArray(h)&&(this.hostProgress.list[r]=!1),this.loadHostStatus()})}loadHostStatus(){makeRequest("GET","host",{user_id:jsObject.profile.user_id},"zume_system/v1").done(e=>{this.hostProgress=e})}toggleDetails(e){const t=this.querySelector(`#details-${e}`),s=this.openStates[e],n=t.scrollHeight,r="200";s===!1?(t.style.height=n+"px",t.style.transitionDuration=r+"ms",t.dataset.state="opening",this.openStates[e]=!0,setTimeout(()=>{t.style.height="auto",t.dataset.state="open"},r)):(t.style.height=n+"px",t.dataset.state="closing",this.openStates[e]=!1,setTimeout(()=>{t.style.height="0"},10),setTimeout(()=>{t.dataset.state="closed"},r))}renderListItem(e){const{title:t,description:s,host:n,slug:r,key:a}=e;let h=[jsObject.site_url,jsObject.language,r].join("/");return jsObject.language==="en"&&(h=[jsObject.site_url,r].join("/")),o`
            <li class="switcher | switcher-width-30 list__item tight" @click=${()=>this.toggleDetails(a)} role="button">
                <div>
                    <h2 class="h5 bold m0">${t}</h2>
                    <div class="collapse" id="details-${a}" data-state="closed">
                        <div class="stack--2 mt--2">
                            <p class="f--1 gray-700">${s}</p>
                            <div class="cluster">
                                <share-links url=${h} title=${t} .t=${jsObject.share_translations}></share-links>

                                ${jsObject.has_pieces_pages?o`
                                        <a class="btn light uppercase" href=${h} @click=${l=>l.stopImmediatePropagation()}>${jsObject.translations.view}</a>
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
                            @click=${l=>this.toggleHost(n[0],l)}
                        >
                            <span class="icon zume-heard-concept"></span>
                        </button>
                        <button
                            data-subtype=${n[1].subtype}
                            class=${this.hostProgress.list[n[1].key]?"active":""}
                            @click=${l=>this.toggleHost(n[1],l)}
                        >
                            <span class="icon zume-obey-concept"></span>
                        </button>
                        <button
                            data-subtype=${n[2].subtype}
                            class=${this.hostProgress.list[n[2].key]?"active":""}
                            @click=${l=>this.toggleHost(n[2],l)}
                        >
                            <span class="icon zume-share-concept"></span>
                        </button>
                        <button
                            data-subtype=${n[3].subtype}
                            class=${this.hostProgress.list[n[3].key]?"active":""}
                            @click=${l=>this.toggleHost(n[3],l)}
                        >
                            <span class="icon zume-train-concept"></span>
                        </button>
                    </div>
                </div>
            </li>
        `}render(){var e,t,s,n,r,a,h,l;return o`
            <div class="dashboard__content" data-no-secondary-area>
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
                                ${J(this.filteredItems,d=>d.key,this.renderListItem)}
                            </ul>
                        `}
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
                        <host-progress-circle class="grow-0" type="shared" percent=${((a=(r=this.hostProgress)==null?void 0:r.percent)==null?void 0:a.s)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.shared}</h3>
                            <p class="italic">${jsObject.translations.shared_explanation}</p>
                        </div>
                    </div>

                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="trained" percent=${((l=(h=this.hostProgress)==null?void 0:h.percent)==null?void 0:l.t)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.trained}</h3>
                            <p class="italic">${jsObject.translations.trained_explanation}</p>
                        </div>
                    </div>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-progress",Yt);class Xt extends E{render(){return o`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <dash-sidebar-toggle></dash-sidebar-toggle>
                    <h1 class="h3">Tools</h1>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main">
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-tools",Xt);class es extends ae{constructor(){super("training")}createRenderRoot(){return this}}customElements.define("dash-training",es);class ts extends E{static get properties(){return{showTeaser:{type:Boolean},loading:{type:Boolean,attribute:!1},commitments:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1}}}constructor(){super(),this.showTeaser=!1,this.loading=!0,this.route=b.getRoute("my-training")}firstUpdated(){super.firstUpdated()}updated(){jQuery(document).foundation()}render(){return o`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <div class="d-flex gap-0">
                        <h1 class="h3">${this.route.translation}</h1>
                    </div>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main">
                    ${this.showTeaser?o`
                            <p>Start or join a training to get access to your trainings here</p>
                        `:o`
                            <p>This is where the information for the user's training will be.</p>
                        `}
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-trainings",ts);class ss extends g{firstUpdated(){const e=this.offsetTop;this.style.top=e+"px"}render(){return o`
            <div class="dashboard__header right">
                <dash-sidebar-toggle displayOn="medium"></dash-sidebar-toggle>
                <launch-course></launch-course>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-header-right",ss);class is extends g{static get properties(){return{displayOn:{type:String}}}constructor(){super(),this.displayOn="large"}toggleSidebar(){const e=new CustomEvent("toggle-dashboard-sidebar",{bubbles:!0});this.dispatchEvent(e)}render(){return o`
            <button class="btn f-0 light tight dashboard__sidebar-toggle break-${this.displayOn}" @click=${this.toggleSidebar}>${jsObject.translations.menu}</button>
        `}createRenderRoot(){return this}}customElements.define("dash-sidebar-toggle",is);class ke extends Ht(g){static get properties(){return{href:{type:String},class:{type:String},locked:{type:Boolean},completed:{type:Boolean},disableNavigate:{type:Boolean},icon:{type:String},text:{type:String},explanation:{type:String}}}constructor(){super(),this.href="",this.class="",this.icon="",this.text="",this.explanation="",this.locked=!1,this.completed=!1,this.disableNavigate=!1}handleClick(e){this.disableNavigate||(e.preventDefault(),this.navigate(this.href))}printBool(e){return e?"true":"false"}render(){return o`
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
        `}createRenderRoot(){return this}}customElements.define("nav-link",ke);class ns extends ke{constructor(){super()}renderText(){return this.text.split(" ").map(e=>o`
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
        `}}customElements.define("grid-link",ns);class as extends ke{constructor(){super()}renderText(){return this.text.split(" ").map(e=>o`
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
        `}}customElements.define("list-link",as);class rs extends g{constructor(){super();const t=document.querySelector("html").dataset.dir;this.isRtl=t==="rtl"}updated(){jQuery(document).foundation()}render(){return o`
            <button class="btn uppercase light tight" data-toggle="launch-course-panel">
                ${jsObject.translations.launch_course}
            </button>
            <div
                class="dropdown-pane"
                id="launch-course-panel"
                data-dropdown
                data-auto-focus="true"
                data-close-on-click="true"
                data-position="bottom"
                data-alignment=${this.isRtl?"right":"left"}
            >
                <ul>
                    <li><a class="menu-btn" href="${jsObject.urls.launch_ten_session_course}"><span class="icon zume-course"></span>${jsObject.translations.ten_session_course}</a></li>
                    <li><a class="menu-btn" href="${jsObject.urls.launch_twenty_session_course}"><span class="icon zume-course"></span>${jsObject.translations.twenty_session_course}</a></li>
                    <li><a class="menu-btn" href="${jsObject.urls.launch_intensive_session_course}"><span class="icon zume-course"></span>${jsObject.translations.three_day_intensive_course}</a></li>
                </ul>
            </div>
        `}createRenderRoot(){return this}}customElements.define("launch-course",rs);class os extends g{constructor(){super();S(this,"addressCallback",t=>{t.features.length<1?this.locations=-1:this.locations=t.features});S(this,"processLocation",debounce(getAddressSuggestions(this.addressCallback,jsObject.map_key)));this.userProfile={},this.locations=[]}static get properties(){return{userProfile:{type:Object},loading:{type:Boolean,attribute:!1},locations:{type:Array,attribute:!1}}}firstUpdated(){this.nameInput=this.renderRoot.querySelector("#full_name"),this.phoneInput=this.renderRoot.querySelector("#phone"),this.emailInput=this.renderRoot.querySelector("#email"),this.cityInput=this.renderRoot.querySelector("#city"),this.prefferedLanguageInput=this.renderRoot.querySelector("#preferred-language"),this.addressResultsContainer=this.renderRoot.querySelector("#address_results")}submitProfileForm(t){t.preventDefault();const s=this.nameInput.value,n=this.emailInput.value,r=this.phoneInput.value,a=this.prefferedLanguageInput.value,h={name:s,phone:r,email:n,preferred_language:a};h.location_grid_meta=getLocationGridFromMapbox(this.mapboxSelectedId,this.userProfile.location),this.loading=!0,fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(h),headers:{"X-WP-Nonce":jsObject.nonce}}).then(l=>l.json()).then(l=>{const d=new CustomEvent("user-profile:change",{bubbles:!0,detail:l});this.dispatchEvent(d);const f=new CustomEvent("user-state:change",{bubbles:!0});this.dispatchEvent(f)}).catch(l=>{console.error(l)}).finally(()=>{this.loading=!1})}selectAddress(t){const s=t.target.id,n=t.target.dataset.placeName;this.cityInput.value=n,this.mapboxSelectedId=s,this.locations=[]}render(){var t;return o`
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
                    <label for="preferred-language">${jsObject.translations.language}</label>
                    <select class="input" name="preferred-language" id="preferred-language">

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
        `}createRenderRoot(){return this}}customElements.define("profile-form",os);class w extends g{static get properties(){return{slide:{type:Object}}}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.resizeCallback)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.resizeCallback)}firstUpdated(){this.resizeCallback(null,window)}resizeCallback(e,t=null){const s=document.querySelectorAll(".slides-card"),n=document.querySelectorAll(".video-slide"),r=[...s,n],a=t||e.currentTarget,{innerWidth:h,innerHeight:l}=a;h/l>16/9?r.forEach(d=>{d.style=`--slide-unit: ${16/9*l/100}px`}):r.forEach(d=>{d.style=`--slide-unit: ${h/100}px`})}renderProgressBar(){let e=[],t=[];for(let s=0;s<this.slide.progress_bar.length;s++){const n=this.slide.progress_bar[s];if(!n){e.push(t),e.push(!1),t=[];continue}t.push(n)}return e.push(t),o`
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
        `}renderContent(e=[],t=!1,s=!1){return e.map((n,r)=>t&&r===0?o`<p><strong>${n}</strong></p>`:Array.isArray(n)?o`
                    <ul role="list">
                        ${n.map(a=>o`<li>${a}</li>`)}
                    </ul>
                `:s?o`<p><strong>${n}</strong></p>`:o`<p>${n}</p>`)}render(){return o`
            <div class="slides-card">
                <div class="center"></div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-slide",w);class ls extends w{render(){return o`
            <div class="slides-card activity-slide">
                ${this.renderProgressBar()}
                <div class="cover">
                    <h2 class="title text-center" data-small>${this.slide.center[0]} ${this.slide.length}</h2>
                    <div class="two-column right">
                        <div>
                            <div class="activity-card" data-expanded-padding>
                                ${this.renderContent(this.slide.left,!0)}
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
            </div>
        `}}customElements.define("activity-slide",ls);class cs extends w{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="cover">
                    <div class="center activity-card" data-large>
                        <p>${this.slide.center[0]}</p>
                        <p>${this.slide.center[1]??""}</p>
                    </div>
                </div>
            </div>
        `}}customElements.define("break-slide",cs);class ds extends w{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="cover">
                    <h2 class="title text-center">${this.slide.center[0]??""} ${this.slide.length??""}</h2>
                    <div class="center w-70">
                        <div class="stack activity-card">
                            ${this.renderContent(this.slide.left,!0)}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("center-slide",ds);class hs extends w{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon"><img src="https://placehold.co/60x60/png" /></div>
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
        `}}customElements.define("checkin-slide",hs);class us extends w{render(){return o`
            <div class="slides-card">
                <div class="cover">
                    <div class="center activity-card" data-large>
                        <p>${this.slide.center[0]}</p>
                    </div>
                    <div class="center">
                      <p><img src="${this.slide.center[1]??""}" /></p>
                    </div>
                </div>
            </div>
        `}}customElements.define("congratulations-slide",us);class ps extends w{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <img src="https://placehold.co/60x60/png" />
                            </div>
                            <div class="stack">
                                <h2 class="title">${this.slide.left[0]}</h2>
                                <span class="subtitle">${this.slide.length??""}</span>
                            </div>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack">
                            ${this.renderContent(this.slide.right)}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("discuss-slide",ps);class ms extends w{render(){return o`
            <div class="slides-card">
                <div class="cover">
                    <div class="center stack | text-center w-50">
                        <div class="w-30"><img src="${this.slide.center[0]}" /></div>
                        <p>${this.slide.center[1]}</p>
                        <div class="w-30"><img src="${this.slide.center[2]}" /></div>
                        <p>${this.slide.center[3]}</p>
                    </div>
                </div>
            </div>
        `}}customElements.define("final-slide",ms);class gs extends w{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column right">
                    <div>
                        <div class="cover center text-center">
                            <p><strong>${this.slide.left[0]}</strong></p>
                            <div class="mw-80"><img src="${this.slide.left[1]}" /></div>
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
        `}}customElements.define("left-image-slide",gs);class vs extends w{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="cover">
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
        `}}customElements.define("next-steps-slide",vs);class bs extends w{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="obey-slide">
                    <div class="two-column left">
                        <div>
                            <div class="title-area">
                                <div class="title-icon">
                                    <img src="https://placehold.co/60x60/png" />
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
                                    <img src="https://placehold.co/60x60/png" />
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
        `}}customElements.define("obey-slide",bs);class fs extends w{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <img src="https://placehold.co/60x60/png" />
                            </div>
                            <h2 class="title">${this.slide.left[0]}</h2>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack">
                            ${this.renderContent(this.slide.right,!1,!0)}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("overview-slide",fs);class $s extends w{render(){return o`
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
                        <div class="activity-card" expanded-padding>
                            ${this.renderContent(this.slide.right)}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("pray-slide",$s);class ys extends w{render(){return o`
            <div>
                <div class="slides-card">
                    ${this.renderProgressBar()}
                    <div class="cover | title-slide | text-center">
                        <div class="stack-1 | w-100">
                            <div class="center | w-40"><img src=${this.slide.center[0]} /></div>
                            <h2>${this.slide.center[1]}</h2>
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("title-slide",ys);class _s extends w{static get properties(){return{slide:{type:Object},showButtons:{type:Boolean}}}constructor(){super()}render(){return o`
            <div class="video-slide">
                <div>
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
        `}}customElements.define("video-slide",_s);class ws extends w{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <img src="https://placehold.co/60x60/png" />
                            </div>
                            <div class="stack">
                                <h2 class="title">${this.slide.left[0]}</h2>
                                <span class="subtitle">${this.slide.length??""}</span>
                            </div>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack">
                            ${this.renderContent(this.slide.right,!0)}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("watch-slide",ws);class ks extends w{render(){return o`
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
                        <div class="activity-card" expanded-padding>
                            ${this.renderContent(this.slide.right)}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("look-back-slide",ks);const qe=["slideshow","guide"];class Ss extends g{static get properties(){return{languageCode:{type:String},homeUrl:{type:String},assetsPath:{type:String},zumeSessions:{attribute:!1},lessonIndex:{attribute:!1},view:{attribute:!1},linkNodes:{attribute:!1},showIndex:{attribute:!1}}}constructor(){super(),this.dir=document.querySelector("html").dir;const e=new URL(window.location.href),t=this.getZumeSessions(e);this.zumeSessions=t;const s=this.getLessonIndex(e);this.lessonIndex=s,this.view=this.getView(e),this.changeSession(s,!1,t),this.handleSessionLink=this.handleSessionLink.bind(this),this.handleHistoryPopState=this.handleHistoryPopState.bind(this),window.addEventListener("popstate",this.handleHistoryPopState),document.querySelectorAll(".language-selector").forEach(function(r){r.addEventListener("click",()=>{const a=r.dataset.value,h=new URL(location.href),l=h.pathname.substring(1).split("/");let d="";l.length>0&&jsObject.zume_languages.includes(l[0])?d=l.slice(1).join("/"):d=l.join("/"),a!=="en"?d="/"+a+"/"+d:d="/"+d,d+=h.search,location.href=d})})}getView(e){if(e.searchParams.has("view")){const t=e.searchParams.get("view");if(qe.includes(t))return t}else return"slideshow"}getLessonIndex(e){if(e.searchParams.has("session")){const t=e.searchParams.get("session");if(t==="index")return"index";const s=Number(t);return Number.isInteger(s)?s-1:0}else return 0}getZumeSessions(e){const t=e.searchParams.get("type")||"10";this.type=t;let s;switch(t){case"10":s=zume10Sessions;break;case"20":s=zume20Sessions;break;case"intensive":s=zumeIntensiveSessions;break;default:s=zume10Sessions;break}return s}handleSessionLink(e){const t=e.target,s=Number(t.dataset.sessionNumber);this.lessonIndex=s,this.showIndex===!0&&(this.showIndex=!1),this.changeSession(this.lessonIndex),this.closeMenu()}handleSubSectionLink(e){const t=e.target,s=Number(t.dataset.sessionNumber);Number(t.dataset.subsectionNumber),this.lessonIndex=s,this.showIndex===!0&&(this.showIndex=!1),this.changeSession(this.lessonIndex),this.closeMenu()}getNextSession(){this.lessonIndex+=1,this.changeSession(this.lessonIndex)}getPreviousSession(){this.lessonIndex-=1,this.changeSession(this.lessonIndex)}changeSession(e,t=!0,s=null){if(e==="index"){this.showIndex=!0;return}else this.showIndex=!1;const n=s||this.zumeSessions;let r=e;e<0&&(r=0),e>n.length-1&&(r=n.length-1),this.lessonIndex=r,this.session=n[r],t&&this.pushHistory()}pushHistory(){const e=this.lessonIndex,t=this.view,s=new URL(window.location.href);e!==null&&Number.isInteger(e)&&s.searchParams.set("session",e+1),t&&s.searchParams.set("view",t),window.history.pushState(null,null,s.href)}handleHistoryPopState(){var n;const e=new URL(location.href),t=e.searchParams.has("session")?e.searchParams.get("session"):null,s=e.searchParams.get("view");(n=document.querySelector(".js-off-canvas-overlay"))==null||n.classList.remove("is-visible"),Number.isInteger(Number(t))&&(this.lessonIndex=t-1,this.changeSession(this.lessonIndex,!1)),t==="index"&&(this.lessonIndex="index",this.changeSession("index",!1)),s&&qe.includes(s)&&(this.view=s)}getSessionTitle(e){return`Session ${e+1}`}getSessionSections(){return this.session?this.session:[]}switchViews(e=!0){this.view==="guide"?this.view="slideshow":this.view="guide",e===!0&&this.pushHistory()}openMenu(){const e=this.querySelector("#offCanvas");jQuery(e).foundation("open")}closeMenu(){const e=this.querySelector("#offCanvas");jQuery(e).foundation("close")}render(){this.showIndex;const e=this.type==="intensive"?"container-xsm":"container-sm";return o`
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
                                        <h2 class="f-0 bold">Session</h2>
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
                        ${this.zumeSessions.map((t,s)=>o`
                            <li>
                                <a
                                    class="session-link"
                                    data-session-number="${s}"
                                    @click=${this.handleSessionLink}
                                >
                                    ${this.getSessionTitle(s)}
                                </a>
                                <ul class="menu vertical nested ${this.lessonIndex===s?"is-active":""}">
                                    <a
                                        class="session-link"
                                        data-subitem
                                        data-session-number=${s}
                                        data-subsection-number=${0}
                                        @click=${this.handleSubSectionLink}
                                    >
                                        Sub menu 1
                                    </a>
                                    <a
                                        class="session-link"
                                        data-subitem
                                        data-session-number=${s}
                                        data-subsection-number=${1}
                                        @click=${this.handleSubSectionLink}
                                    >
                                        Sub menu 2
                                    </a>
                                    <a
                                        class="session-link"
                                        data-subitem
                                        data-session-number=${s}
                                        data-subsection-number=${2}
                                        @click=${this.handleSubSectionLink}
                                    >
                                        Sub menu 3
                                    </a>
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

            <span class="p-1 d-block fixed top z-1">
                <button id="hamburger-menu" class="nav-toggle show" @click=${this.openMenu}>
                    <span class="hamburger brand"></span>
                </button>
            </span>

            <div class="">
                ${this.view==="guide"?o`<course-guide .sections=${this.getSessionSections()}></course-guide>`:o`<course-slideshow .sections=${this.getSessionSections()}></course-slideshow>`}
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-presenter",Ss);class js extends g{static get properties(){return{sections:{type:Array}}}render(){return o`
            <div class="container">
                <div class="stack | my-4" data-outline-slides>
                    ${this.sections.map((e,t)=>o`
                            <slide-switcher .slide=${e}></slide-switcher>
                        `)}
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-guide",js);class xs extends g{static get properties(){return{sections:{type:Array},sectionIndex:{attribute:!1},currentSlide:{attribute:!1},index:{attribute:!1}}}constructor(){super(),this.reset(),this.listenForKeyboard=this.listenForKeyboard.bind(this),this.listenForMouseClick=this.listenForMouseClick.bind(this)}reset(){this.sectionIndex=-1,this.currentSlide=null}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.listenForKeyboard),document.addEventListener("mousedown",this.listenForMouseClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.listenForKeyboard),document.removeEventListener("mousedown",this.listenForMouseClick)}update(e){e.has("sections")&&this.reset(),super.update(e)}nextSlide(){if(this.sectionIndex>=this.sections.length-1){this.sectionIndex=this.sections.length-1;return}this.setSlide(this.sectionIndex+1)}previousSlide(){this.sectionIndex<0&&(this.sectionIndex=0),this.setSlide(this.sectionIndex-1)}leftSlide(){document.querySelector("html").dir==="rtl"?this.nextSlide():this.previousSlide()}rightSlide(){document.querySelector("html").dir==="rtl"?this.previousSlide():this.nextSlide()}listenForKeyboard(e){["ArrowRight"].includes(e.code)&&this.rightSlide(),["Space"].includes(e.code)&&this.nextSlide(),["ArrowLeft"].includes(e.code)&&this.leftSlide(),["Backspace"].includes(e.code)&&this.previousSlide()}listenForMouseClick(e){if(e.target.id==="hamburger-menu")return;const t=l=>l.id==="offCanvas"||l.classList.contains("js-off-canvas-overlay");if(this.hasParent(e.target,t))return;const{x:s,type:n,which:r}=e;if(n!=="mousedown"||r!==1)return;const{innerWidth:a}=window,h=1/2*a;s<h&&this.leftSlide(),s>a-h&&this.rightSlide()}hasParent(e,t){let s=e;const n=50;let r=0;for(;s;){if(t(s))return!0;if(s=s.parentElement,r=r+1,r>n)return!1}return!1}setSlide(e){this.sectionIndex=e;const t=this.sections[e];this.currentSlide=t}render(){return this.sectionIndex<0&&this.setSlide(0),o`
            <div class="cover-page">
                <div>
                    <slide-switcher .slide=${this.currentSlide} showControls></slide-switcher>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-slideshow",xs);class Es extends g{static get properties(){return{slide:{type:Object},showControls:{type:Boolean}}}render(){if(this.slide)switch(this.slide.type){case"title":return o`<title-slide .slide=${this.slide}></title-slide>`;case"checkin":return o`<checkin-slide .slide=${this.slide}></checkin-slide>`;case"pray":return o`<pray-slide .slide=${this.slide}></pray-slide>`;case"review":case"overview":return o`<overview-slide .slide=${this.slide}></overview-slide>`;case"challenge":case"center":return o`<center-slide .slide=${this.slide}></center-slide>`;case"watch":return o`<watch-slide .slide=${this.slide}></watch-slide>`;case"video":return o`<video-slide .slide=${this.slide} ?showButtons=${this.showControls}></video-slide>`;case"look_back":return o`<look-back-slide .slide=${this.slide}></look-back-slide>`;case"discuss":return o`<discuss-slide .slide=${this.slide}></discuss-slide>`;case"left_content":case"activity":return o`<activity-slide .slide=${this.slide}></activity-slide>`;case"obey":return o`<obey-slide .slide=${this.slide}></obey-slide>`;case"left_image":return o`<left-image-slide .slide=${this.slide}></left-image-slide>`;case"next_steps":return o`<next-steps-slide .slide=${this.slide}></next-steps-slide>`;case"break":return o`<break-slide .slide=${this.slide}></break-slide>`;case"congratulations":return o`<congratulations-slide .slide=${this.slide}></congratulations-slide>`;case"final":return o`<final-slide .slide=${this.slide}></final-slide>`;default:return o`<course-slide .slide=${this.slide}></course-slide>`}}createRenderRoot(){return this}}customElements.define("slide-switcher",Es);class rt extends g{constructor(){super()}render(){return o`
            <div class="container">
                <div class="circle">
                    <div class="triangle"></div>
                </div>
            </div>
        `}}S(rt,"styles",gt`
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
    `);window.customElements.define("play-button",rt);class Cs extends g{constructor(){super();S(this,"webShareSupported",!!window.navigator.share);S(this,"clipboardSupported",!!window.navigator.clipboard);this.shareFeedback="",this.copyFeedback=""}static get properties(){return{url:{type:String},title:{type:String},t:{type:Object},shareFeedback:{attribute:!1},copyFeedback:{attribute:!1}}}share(){navigator.share({title:this.title,url:this.url,text:title}).then(()=>{this.shareFeedback=this.t.share_feedback,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(t=>console.error("Error sharing",t))}copyLink(t){t.stopImmediatePropagation(),navigator.clipboard.writeText(this.url).then(()=>{this.copyFeedback=this.t.copy_feedback,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(s=>console.error(s))}noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported}render(){return o`
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
        `}createRenderRoot(){return this}}customElements.define("share-links",Cs);class Os extends g{constructor(){super();S(this,"sortAlphabetically",(t,s)=>t.page_title<s.page_title?-1:1);S(this,"sortByKey",(t,s)=>Number(t.key)<Number(s.key)?-1:1);this.items=zumeShare.share_items,this.filterType="all"}static get properties(){return{items:{type:Array,attribute:!1},filterType:{type:String,attribute:!1},isSortedAlphabetically:{type:Boolean,attribute:!1}}}filterItems(t){this.filterType=t,this.items=this.sortItems(zumeShare.share_items.filter(({type:s})=>t==="all"?!0:s===t))}toggleSorting(){this.isSortedAlphabetically=!this.isSortedAlphabetically,this.items=this.sortItems(this.items)}sortItems(t){return t.sort((s,n)=>this.isSortedAlphabetically?this.sortAlphabetically(s,n):this.sortByKey(s,n))}renderListItem({page_url:t,page_title:s,type:n,description:r}){return o`
            <li class="share-cards" data-type=${n}>
                <div class="stack | share card">
                    <a class="f-1 bold mt-0" href=${t}>
                        ${s}
                    </a>
                    <p class="f--1 show-for-large">
                        ${r}
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
                        ${J(this.items,t=>t.key,this.renderListItem)}
                    </ul>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("share-list",Os);class Ps extends g{static get properties(){return{t:{type:Object},joinLink:{type:String},loading:{attribute:!1},posts:{attribute:!1}}}constructor(){super(),this.loading=!0,this.plans=[],this.getTrainings(),this.renderRow=this.renderRow.bind(this)}getTrainings(){makeRequest("POST","public_plans",{},"zume_system/v1").then(e=>{this.plans=e}).catch(e=>{console.log(e)}).always(()=>{this.loading=!1})}render(){return this.loading?o`<span class="loading-spinner active"></span>`:o`
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
        `}renderRow({join_key:e,language_note:t,post_title:s,time_of_day_note:n,timezone_note:r,...a}){const h=a.set_a_01?"a":"b",l=h==="a"?10:20,d=`set_${h}_`,f=Date.now()/1e3;let p="";for(let m=1;m<l+1;m++){const v=m<10?`0${m}`:`${m}`,y=a[d+v];if(p=y.timestamp,f<y.timestamp)break}const u=moment(p*1e3).format("MMM Do 'YY");return o`
            <tr>
                <td data-label="${this.t.name}">${s}</td>
                <td data-label="${this.t.next_date}">${u}</td>
                <td data-label="${this.t.start_time}">${n}</td>
                <td data-label="${this.t.timezone}">${r}</td>
                <td data-label="${this.t.language}">${t}</td>
                <td><button class="btn" data-code=${e} @click=${this._handleJoinTraining}>${this.t.join}</button></td>
            </tr>
        `}_handleJoinTraining(e){console.log(e);const t=e.target.dataset.code,s=new CustomEvent("chosen-training",{bubbles:!0,detail:{code:t}});this.dispatchEvent(s)}createRenderRoot(){return this}}customElements.define("public-trainings",Ps);class ot extends g{static get properties(){return{radius:{type:Number},lineWidth:{type:Number},percent:{type:Number}}}constructor(){super(),this.radius=100,this.lineWidth=10,this.percent=30}width(){return this.radius*2+this.lineWidth}widthPx(){return this.appendPx(this.width())}center(){return this.width()/2}circumference(){return this.radius*2*Math.PI}circumferencePx(){return this.appendPx(this.circumference())}appendPx(e){return`${e}px`}rotate(e){return`rotate(${e}, ${this.center()}, ${this.center()})`}render(){return o`
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
        `}createRenderRoot(){return this}}customElements.define("progress-circle",ot);class As extends ot{static get properties(){return{percent:{type:Number},type:{type:String}}}constructor(){super(),this.radius=50,this.lineWidth=15,this.percent=0,this.borderWidth=3,this.type="heard"}width(){return(this.radius+this.lineWidth)*2}getIconSvg(){switch(this.type){case"heard":return K`
                    <path d="M13.204,14.843c.157-3.465,2.622-6.151,6.05-6.593,3.602-.464,7.067,2.224,7.528,5.84.019.151.028.303.051.453.084.543.565.919,1.079.849.531-.073.901-.535.85-1.079-.09-.964-.299-1.902-.71-2.782-1.357-2.904-3.602-4.681-6.783-5.149-4.548-.67-8.841,2.255-9.775,6.729-.695,3.33-.03,6.397,2.327,8.963.781.85,1.668,1.601,2.472,2.43.534.551,1.049,1.131,1.495,1.754.496.692.669,1.505.631,2.364-.121,2.78,2.078,5.075,4.868,5.091,2.087.012,4.017-1.407,4.624-3.399.169-.553-.083-1.062-.614-1.24-.505-.169-1.018.085-1.21.625-.375,1.054-1.082,1.745-2.179,2.001-1.829.426-3.631-1.042-3.551-2.908.071-1.673-.427-3.158-1.526-4.394-.867-.975-1.835-1.861-2.774-2.772-1.174-1.139-2.156-2.394-2.584-4.011-.24-.909-.31-1.835-.271-2.771Z" stroke-width="0"></path>
                    <path d="M22.416,16.825c-1.639.344-2.761,1.916-2.613,3.472.179,1.88,1.39,3.263,3.162,3.601.237.045.486.086.722.059.502-.056.865-.512.837-.996-.029-.509-.412-.882-.953-.927-.921-.078-1.624-.699-1.795-1.587-.226-1.172.702-1.837,1.898-1.848.737-.007,1.224-.331,1.128-1.091-.055-.433-.488-1.081-2.385-.684Z" stroke-width="0"></path>
                `;case"obeyed":return K`
                    <path d="M21.57,18.138c-.204,1.02-.396,1.984-.589,2.948-.06.299-.116.599-.179.898-.012.057-.047.109-.087.195.117.163.256.361.4.556.397.536.795,1.072,1.194,1.606.743.993,1.239,2.082,1.465,3.316.261,1.422.608,2.829.922,4.241.183.825-.274,1.597-1.058,1.778-.783.18-1.554-.308-1.742-1.125-.279-1.212-.56-2.424-.804-3.643-.204-1.021-.594-1.958-1.176-2.812-.781-1.144-1.585-2.272-2.374-3.411-.254-.367-.481-.753-.74-1.117-.501-.703-.591-1.47-.421-2.296.247-1.201.478-2.406.716-3.609.003-.016.003-.033.006-.074-.05.04-.089.066-.123.097-.598.545-1.197,1.088-1.789,1.639-.062.057-.11.158-.115.242-.087,1.326-.165,2.653-.248,3.979-.041.641-.554,1.087-1.186,1.04-.6-.045-1.035-.574-.995-1.196.09-1.411.176-2.822.261-4.233.03-.498.222-.916.592-1.253,1.221-1.112,2.44-2.226,3.66-3.339.129-.118.246-.252.385-.356.381-.287.817-.384,1.283-.297.717.134,1.431.278,2.145.426.596.124,1.038.46,1.25,1.033.148.401.244.822.346,1.239.243.995.654,1.924,1.094,2.842.143.297.376.491.691.613.959.373,1.91.764,2.864,1.149.068.027.136.055.203.087.583.277.825.859.591,1.42-.224.536-.856.795-1.439.577-.392-.146-.777-.31-1.165-.465-.829-.332-1.655-.671-2.488-.994-.314-.122-.566-.312-.739-.594-.174-.284-.325-.582-.486-.874-.035-.063-.069-.126-.126-.232Z" stroke-width="0"></path>
                    <path d="M15.828,22.191c.259.402.497.772.735,1.142.48.747.962,1.492,1.437,2.242.041.065.066.158.057.233-.038.303-.09.604-.143.904-.098.559-.309,1.069-.618,1.547-.923,1.43-1.831,2.869-2.752,4.3-.552.858-1.767.912-2.364.114-.368-.492-.375-1.17-.015-1.736.694-1.093,1.366-2.201,2.093-3.272.688-1.014,1.054-2.129,1.231-3.324.098-.66.201-1.319.303-1.978.007-.044.018-.087.037-.174Z" stroke-width="0"></path>
                    <path d="M21.246,11.553c-1.455,0-2.629-1.176-2.629-2.635,0-1.455,1.178-2.631,2.634-2.631,1.456,0,2.636,1.174,2.64,2.628.004,1.46-1.176,2.637-2.645,2.638Z" stroke-width="0"></path>
                `;case"shared":return K`
                    <path d="M12.845,18.138c-.204,1.02-.396,1.984-.589,2.948-.06.299-.116.599-.179.898-.012.057-.047.109-.087.195.117.163.256.361.4.556.397.536.795,1.072,1.194,1.606.743.993,1.239,2.082,1.465,3.316.261,1.422.608,2.829.922,4.241.183.825-.274,1.597-1.058,1.778-.783.18-1.554-.308-1.742-1.125-.279-1.212-.56-2.424-.804-3.643-.204-1.021-.594-1.958-1.176-2.812-.781-1.144-1.585-2.272-2.374-3.411-.254-.367-.481-.753-.74-1.117-.501-.703-.591-1.47-.421-2.296.247-1.201.478-2.406.716-3.609.003-.016.003-.033.006-.074-.05.04-.089.066-.123.097-.598.545-1.197,1.088-1.789,1.639-.062.057-.11.158-.115.242-.087,1.326-.165,2.653-.248,3.979-.041.641-.554,1.087-1.186,1.04-.6-.045-1.035-.574-.995-1.196.09-1.411.176-2.822.261-4.233.03-.498.222-.916.592-1.253,1.221-1.112,2.44-2.226,3.66-3.339.129-.118.246-.252.385-.356.381-.287.817-.384,1.283-.297.717.134,1.431.278,2.145.426.596.124,1.038.46,1.25,1.033.148.401.244.822.346,1.239.243.995.654,1.924,1.094,2.842.143.297.376.491.691.613.959.373,1.91.764,2.864,1.149.068.027.136.055.203.087.583.277.825.859.591,1.42-.224.536-.856.795-1.439.577-.392-.146-.777-.31-1.165-.465-.829-.332-1.655-.671-2.488-.994-.314-.122-.566-.312-.739-.594-.174-.284-.325-.582-.486-.874-.035-.063-.069-.126-.126-.232Z" stroke-width="0"></path>
                    <path d="M7.102,22.191c.259.402.497.772.735,1.142.48.747.962,1.492,1.437,2.242.041.065.066.158.057.233-.038.303-.09.604-.143.904-.098.559-.309,1.069-.618,1.547-.923,1.43-1.831,2.869-2.752,4.3-.552.858-1.767.912-2.364.114-.368-.492-.375-1.17-.015-1.736.694-1.093,1.366-2.201,2.093-3.272.688-1.014,1.054-2.129,1.231-3.324.098-.66.201-1.319.303-1.978.007-.044.018-.087.037-.174Z" stroke-width="0"></path>
                    <path d="M12.521,11.553c-1.455,0-2.629-1.176-2.629-2.635,0-1.455,1.178-2.631,2.634-2.631,1.456,0,2.636,1.174,2.64,2.628.004,1.46-1.176,2.637-2.645,2.638Z" stroke-width="0"></path>
                    <path d="M27.155,18.138c.204,1.02.396,1.984.589,2.948.06.299.116.599.179.898.012.057.047.109.087.195-.117.163-.256.361-.4.556-.397.536-.795,1.072-1.194,1.606-.743.993-1.239,2.082-1.465,3.316-.261,1.422-.608,2.829-.922,4.241-.183.825.274,1.597,1.058,1.778.783.18,1.554-.308,1.742-1.125.279-1.212.56-2.424.804-3.643.204-1.021.594-1.958,1.176-2.812.781-1.144,1.585-2.272,2.374-3.411.254-.367.481-.753.74-1.117.501-.703.591-1.47.421-2.296-.247-1.201-.478-2.406-.716-3.609-.003-.016-.003-.033-.006-.074.05.04.089.066.123.097.598.545,1.197,1.088,1.789,1.639.062.057.11.158.115.242.087,1.326.165,2.653.248,3.979.041.641.554,1.087,1.186,1.04.6-.045,1.035-.574.995-1.196-.09-1.411-.176-2.822-.261-4.233-.03-.498-.222-.916-.592-1.253-1.221-1.112-2.44-2.226-3.66-3.339-.129-.118-.246-.252-.385-.356-.381-.287-.817-.384-1.283-.297-.717.134-1.431.278-2.145.426-.596.124-1.038.46-1.25,1.033-.148.401-.244.822-.346,1.239-.243.995-.654,1.924-1.094,2.842-.143.297-.376.491-.691.613-.959.373-1.91.764-2.864,1.149-.068.027-.136.055-.203.087-.583.277-.825.859-.591,1.42.224.536.856.795,1.439.577.392-.146.777-.31,1.165-.465.829-.332,1.655-.671,2.488-.994.314-.122.566-.312.739-.594.174-.284.325-.582.486-.874.035-.063.069-.126.126-.232Z" stroke-width="0"></path>
                    <path d="M32.898,22.191c-.259.402-.497.772-.735,1.142-.48.747-.962,1.492-1.437,2.242-.041.065-.066.158-.057.233.038.303.09.604.143.904.098.559.309,1.069.618,1.547.923,1.43,1.831,2.869,2.752,4.3.552.858,1.767.912,2.364.114.368-.492.375-1.17.015-1.736-.694-1.093-1.366-2.201-2.093-3.272-.688-1.014-1.054-2.129-1.231-3.324-.098-.66-.201-1.319-.303-1.978-.007-.044-.018-.087-.037-.174Z" stroke-width="0"></path>
                    <path d="M27.479,11.553c1.455,0,2.629-1.176,2.629-2.635,0-1.455-1.178-2.631-2.634-2.631-1.456,0-2.636,1.174-2.64,2.628-.004,1.46,1.176,2.637,2.645,2.638Z" stroke-width="0"></path>
                `;case"trained":return K`
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
        `}createRenderRoot(){return this}}customElements.define("host-progress-circle",As);
//# sourceMappingURL=main-9c7b9f57.js.map
