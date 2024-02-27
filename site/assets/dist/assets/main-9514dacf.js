var rt=Object.defineProperty;var lt=(s,e,t)=>e in s?rt(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var A=(s,e,t)=>(lt(s,typeof e!="symbol"?e+"":e,t),t),oe=(s,e,t)=>{if(!e.has(s))throw TypeError("Cannot "+t)};var D=(s,e,t)=>(oe(s,e,"read from private field"),t?t.call(s):e.get(s)),I=(s,e,t)=>{if(e.has(s))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(s):e.set(s,t)},re=(s,e,t,i)=>(oe(s,e,"write to private field"),i?i.call(s,t):e.set(s,t),t);var O=(s,e,t)=>(oe(s,e,"access private method"),t);import{createApp as ct}from"https://unpkg.com/petite-vue?module";const Se=document.querySelector(".nav-toggle"),dt=document.querySelector("#nav");Se&&Se.addEventListener("click",s=>{dt.classList.toggle("nav--visible")});const ht=({title:s,url:e,copyFeedback:t,shareFeedback:i})=>({title:s,url:e,webShareSupported:navigator.share,clipboardSupported:navigator.clipboard,shareFeedback:"",copyFeedback:"",noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported},share(){navigator.share({title:s,url:e,text:s}).then(()=>{this.shareFeedback=i,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(a=>console.error("Error sharing",a))},copyLink(){navigator.clipboard.writeText(e).then(()=>{this.copyFeedback=t,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(a=>console.error(a))}});window.zumeInitShareLinks=()=>{ct({share:ht}).mount()};var ge;let ut=(ge=class{static save(e,t){localStorage.setItem(this.createKey(e),JSON.stringify(t))}static load(e){const t=localStorage.getItem(this.createKey(e));try{return JSON.parse(t)}catch{return t}}static createKey(e){return this.prefix+e}},A(ge,"prefix","Z5_"),ge);window.ZumeStorage=ut;var k,te,qe,se,Ue,ie,Fe,Q,ve;class He{constructor(e){I(this,te);I(this,se);I(this,ie);I(this,Q);A(this,"WIZARD_STATE_NAME","zume_wizard_state");A(this,"STALE_LIFESPAN",10*60*1e3);A(this,"MAX_LIFESPAN",60*60*1e3);I(this,k,void 0);this.moduleName=e,re(this,k,O(this,te,qe).call(this))}empty(){return Object.keys(D(this,k).data).length===0}isDataStale(){return O(this,Q,ve).call(this,D(this,k),this.STALE_LIFESPAN)}get(e){return D(this,k).data[e]}getAll(){return D(this,k).data}add(e,t){D(this,k).data[e]=t,O(this,ie,Fe).call(this),localStorage.setItem(this.WIZARD_STATE_NAME,JSON.stringify(D(this,k)))}clear(){re(this,k,null),localStorage.removeItem(this.WIZARD_STATE_NAME)}}k=new WeakMap,te=new WeakSet,qe=function(){const e=O(this,se,Ue).call(this);return e&&!O(this,Q,ve).call(this,e,this.MAX_LIFESPAN)?e:{module:this.moduleName,data:{},timestamp:Date.now()}},se=new WeakSet,Ue=function(){return JSON.parse(localStorage.getItem(this.WIZARD_STATE_NAME))},ie=new WeakSet,Fe=function(){D(this,k).timestamp=Date.now()},Q=new WeakSet,ve=function(e,t){return Date.now()-e.timestamp>t};const w={gettingStarted:"getting-started",makeAGroup:"make-a-group",getACoach:"get-a-coach",joinAPlan:"join-a-training",connectWithFriend:"connect-with-friend",joinFriendsPlan:"join-friends-training",checkin:"checkin"},$={completeProfile:"completeProfile",makePlan:"makePlan",inviteFriends:"inviteFriends",getACoach:"getACoach",joinTraining:"joinTraining",connectFriend:"connectFriend",joinFriendsTraining:"joinFriendsTraining",checkin:"checkin",planDecision:"planDecision"},pt={howManySessions:"how-many-sessions",whatTimeOfDay:"what-time-of-day",howOften:"how-often",startDate:"what-start-date"},l={updateName:"update-your-name",updateLocation:"update-your-location",updatePhone:"update-your-phone",inviteFriends:"invite-friends",contactPreferences:"contact-preferences",languagePreferences:"preferred-language",howCanWeServe:"how-can-we-serve",connectingToCoach:"connecting-to-coach",joinTraining:"join-training",connectToFriend:"connect-friend",joinFriendsPlan:"join-friends-training",checkinSubmit:"checkin-submit",...pt},mt={[l.updateName]:{field:"name",testExistance:(s,e)=>e.has_set_name},[l.updateLocation]:{field:"location",testExistance:s=>!(s.source&&s.source==="ip")},[l.updatePhone]:{field:"phone",testExistance:s=>!!s}};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Y=window,fe=Y.ShadowRoot&&(Y.ShadyCSS===void 0||Y.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$e=Symbol(),xe=new WeakMap;let Be=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==$e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(fe&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=xe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&xe.set(t,e))}return e}toString(){return this.cssText}};const gt=s=>new Be(typeof s=="string"?s:s+"",void 0,$e),vt=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((i,a,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+s[o+1],s[0]);return new Be(t,s,$e)},bt=(s,e)=>{fe?s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),a=Y.litNonce;a!==void 0&&i.setAttribute("nonce",a),i.textContent=t.cssText,s.appendChild(i)})},Ee=fe?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return gt(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var le;const K=window,ze=K.trustedTypes,ft=ze?ze.emptyScript:"",Ce=K.reactiveElementPolyfillSupport,be={toAttribute(s,e){switch(e){case Boolean:s=s?ft:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},We=(s,e)=>e!==s&&(e==e||s==s),ce={attribute:!0,type:String,converter:be,reflect:!1,hasChanged:We};let L=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const a=this._$Ep(i,t);a!==void 0&&(this._$Ev.set(a,i),e.push(a))}),e}static createProperty(e,t=ce){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,a=this.getPropertyDescriptor(e,i,t);a!==void 0&&Object.defineProperty(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(a){const o=this[e];this[t]=a,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||ce}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const a of i)this.createProperty(a,t[a])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const a of i)t.unshift(Ee(a))}else e!==void 0&&t.push(Ee(e));return t}static _$Ep(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return bt(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=ce){var a;const o=this.constructor._$Ep(e,i);if(o!==void 0&&i.reflect===!0){const n=(((a=i.converter)===null||a===void 0?void 0:a.toAttribute)!==void 0?i.converter:be).toAttribute(t,i.type);this._$El=e,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(e,t){var i;const a=this.constructor,o=a._$Ev.get(e);if(o!==void 0&&this._$El!==o){const n=a.getPropertyOptions(o),h=typeof n.converter=="function"?{fromAttribute:n.converter}:((i=n.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?n.converter:be;this._$El=o,this[o]=h.fromAttribute(t,n.type),this._$El=null}}requestUpdate(e,t,i){let a=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||We)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):a=!1),!this.isUpdatePending&&a&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((a,o)=>this[o]=a),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach(a=>{var o;return(o=a.hostUpdate)===null||o===void 0?void 0:o.call(a)}),this.update(i)):this._$Ek()}catch(a){throw t=!1,this._$Ek(),a}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(i=>{var a;return(a=i.hostUpdated)===null||a===void 0?void 0:a.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$EO(i,this[i],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};L.finalized=!0,L.elementProperties=new Map,L.elementStyles=[],L.shadowRootOptions={mode:"open"},Ce==null||Ce({ReactiveElement:L}),((le=K.reactiveElementVersions)!==null&&le!==void 0?le:K.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var de;const X=window,H=X.trustedTypes,Ae=H?H.createPolicy("lit-html",{createHTML:s=>s}):void 0,ee="$lit$",z=`lit$${(Math.random()+"").slice(9)}$`,_e="?"+z,$t=`<${_e}>`,q=document,W=()=>q.createComment(""),Z=s=>s===null||typeof s!="object"&&typeof s!="function",Ze=Array.isArray,Ve=s=>Ze(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",he=`[ 	
\f\r]`,F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,De=/-->/g,Pe=/>/g,P=RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Me=/'/g,Re=/"/g,Qe=/^(?:script|style|textarea|title)$/i,Ge=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),r=Ge(1),J=Ge(2),x=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),Te=new WeakMap,N=q.createTreeWalker(q,129,null,!1),Je=(s,e)=>{const t=s.length-1,i=[];let a,o=e===2?"<svg>":"",n=F;for(let c=0;c<t;c++){const d=s[c];let b,p,u=-1,m=0;for(;m<d.length&&(n.lastIndex=m,p=n.exec(d),p!==null);)m=n.lastIndex,n===F?p[1]==="!--"?n=De:p[1]!==void 0?n=Pe:p[2]!==void 0?(Qe.test(p[2])&&(a=RegExp("</"+p[2],"g")),n=P):p[3]!==void 0&&(n=P):n===P?p[0]===">"?(n=a??F,u=-1):p[1]===void 0?u=-2:(u=n.lastIndex-p[2].length,b=p[1],n=p[3]===void 0?P:p[3]==='"'?Re:Me):n===Re||n===Me?n=P:n===De||n===Pe?n=F:(n=P,a=void 0);const v=n===P&&s[c+1].startsWith("/>")?" ":"";o+=n===F?d+$t:u>=0?(i.push(b),d.slice(0,u)+ee+d.slice(u)+z+v):d+z+(u===-2?(i.push(void 0),c):v)}const h=o+(s[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return[Ae!==void 0?Ae.createHTML(h):h,i]};class V{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let o=0,n=0;const h=e.length-1,c=this.parts,[d,b]=Je(e,t);if(this.el=V.createElement(d,i),N.currentNode=this.el.content,t===2){const p=this.el.content,u=p.firstChild;u.remove(),p.append(...u.childNodes)}for(;(a=N.nextNode())!==null&&c.length<h;){if(a.nodeType===1){if(a.hasAttributes()){const p=[];for(const u of a.getAttributeNames())if(u.endsWith(ee)||u.startsWith(z)){const m=b[n++];if(p.push(u),m!==void 0){const v=a.getAttribute(m.toLowerCase()+ee).split(z),f=/([.?@])?(.*)/.exec(m);c.push({type:1,index:o,name:f[2],strings:v,ctor:f[1]==="."?Ke:f[1]==="?"?Xe:f[1]==="@"?et:G})}else c.push({type:6,index:o})}for(const u of p)a.removeAttribute(u)}if(Qe.test(a.tagName)){const p=a.textContent.split(z),u=p.length-1;if(u>0){a.textContent=H?H.emptyScript:"";for(let m=0;m<u;m++)a.append(p[m],W()),N.nextNode(),c.push({type:2,index:++o});a.append(p[u],W())}}}else if(a.nodeType===8)if(a.data===_e)c.push({type:2,index:o});else{let p=-1;for(;(p=a.data.indexOf(z,p+1))!==-1;)c.push({type:7,index:o}),p+=z.length-1}o++}}static createElement(e,t){const i=q.createElement("template");return i.innerHTML=e,i}}function T(s,e,t=s,i){var a,o,n,h;if(e===x)return e;let c=i!==void 0?(a=t._$Co)===null||a===void 0?void 0:a[i]:t._$Cl;const d=Z(e)?void 0:e._$litDirective$;return(c==null?void 0:c.constructor)!==d&&((o=c==null?void 0:c._$AO)===null||o===void 0||o.call(c,!1),d===void 0?c=void 0:(c=new d(s),c._$AT(s,t,i)),i!==void 0?((n=(h=t)._$Co)!==null&&n!==void 0?n:h._$Co=[])[i]=c:t._$Cl=c),c!==void 0&&(e=T(s,c._$AS(s,e.values),c,i)),e}class Ye{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:a}=this._$AD,o=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:q).importNode(i,!0);N.currentNode=o;let n=N.nextNode(),h=0,c=0,d=a[0];for(;d!==void 0;){if(h===d.index){let b;d.type===2?b=new U(n,n.nextSibling,this,e):d.type===1?b=new d.ctor(n,d.name,d.strings,this,e):d.type===6&&(b=new tt(n,this,e)),this._$AV.push(b),d=a[++c]}h!==(d==null?void 0:d.index)&&(n=N.nextNode(),h++)}return o}v(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class U{constructor(e,t,i,a){var o;this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cp=(o=a==null?void 0:a.isConnected)===null||o===void 0||o}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=T(this,e,t),Z(e)?e===_||e==null||e===""?(this._$AH!==_&&this._$AR(),this._$AH=_):e!==this._$AH&&e!==x&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):Ve(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==_&&Z(this._$AH)?this._$AA.nextSibling.data=e:this.$(q.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:a}=e,o=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=V.createElement(a.h,this.options)),a);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===o)this._$AH.v(i);else{const n=new Ye(o,this),h=n.u(this.options);n.v(i),this.$(h),this._$AH=n}}_$AC(e){let t=Te.get(e.strings);return t===void 0&&Te.set(e.strings,t=new V(e)),t}T(e){Ze(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const o of e)a===t.length?t.push(i=new U(this.k(W()),this.k(W()),this,this.options)):i=t[a],i._$AI(o),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const a=e.nextSibling;e.remove(),e=a}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class G{constructor(e,t,i,a,o){this.type=1,this._$AH=_,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=_}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,a){const o=this.strings;let n=!1;if(o===void 0)e=T(this,e,t,0),n=!Z(e)||e!==this._$AH&&e!==x,n&&(this._$AH=e);else{const h=e;let c,d;for(e=o[0],c=0;c<o.length-1;c++)d=T(this,h[i+c],t,c),d===x&&(d=this._$AH[c]),n||(n=!Z(d)||d!==this._$AH[c]),d===_?e=_:e!==_&&(e+=(d??"")+o[c+1]),this._$AH[c]=d}n&&!a&&this.j(e)}j(e){e===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ke extends G{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===_?void 0:e}}const _t=H?H.emptyScript:"";class Xe extends G{constructor(){super(...arguments),this.type=4}j(e){e&&e!==_?this.element.setAttribute(this.name,_t):this.element.removeAttribute(this.name)}}class et extends G{constructor(e,t,i,a,o){super(e,t,i,a,o),this.type=5}_$AI(e,t=this){var i;if((e=(i=T(this,e,t,0))!==null&&i!==void 0?i:_)===x)return;const a=this._$AH,o=e===_&&a!==_||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,n=e!==_&&(a===_||o);o&&this.element.removeEventListener(this.name,this,a),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class tt{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){T(this,e)}}const yt={O:ee,P:z,A:_e,C:1,M:Je,L:Ye,D:Ve,R:T,I:U,V:G,H:Xe,N:et,U:Ke,F:tt},Ie=X.litHtmlPolyfillSupport;Ie==null||Ie(V,U),((de=X.litHtmlVersions)!==null&&de!==void 0?de:X.litHtmlVersions=[]).push("2.7.3");const wt=(s,e,t)=>{var i,a;const o=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let n=o._$litPart$;if(n===void 0){const h=(a=t==null?void 0:t.renderBefore)!==null&&a!==void 0?a:null;o._$litPart$=n=new U(e.insertBefore(W(),h),h,void 0,t??{})}return n._$AI(s),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ue,pe;let g=class extends L{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=wt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return x}};g.finalized=!0,g._$litElement$=!0,(ue=globalThis.litElementHydrateSupport)===null||ue===void 0||ue.call(globalThis,{LitElement:g});const Oe=globalThis.litElementPolyfillSupport;Oe==null||Oe({LitElement:g});((pe=globalThis.litElementVersions)!==null&&pe!==void 0?pe:globalThis.litElementVersions=[]).push("3.3.2");class kt extends g{static get properties(){return{type:{type:String},finishUrl:{type:String},user:{type:Object},step:{attribute:!1},steps:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.stepIndex=0,this.steps=[],this.modules={},this.step={},this.t=window.SHAREDFUNCTIONS.escapeObject(jsObject.translations),this._handleHistoryPopState=this._handleHistoryPopState.bind(this),window.addEventListener("popstate",this._handleHistoryPopState),this.stateManager=new He}render(){if(!this.isWizardLoaded()){const e=this.getWizard(this.type);this.loadWizard(e),this._handleHistoryPopState(!0)}return this.steps.length===0?r`
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
        `}footer(){return this.stepIndex===this.steps.length-1?this.finishButton():""}_onBack(){if(this.stepIndex>0){const e=this.stepIndex-1;this._gotoStep(e)}}_onNext(){if(this.stepIndex+1<this.steps.length){const e=this.stepIndex+1;this._gotoStep(e)}else this._onFinish()}_onSkip(){const e=this.step.module;for(let t=this.stepIndex+1;t<this.steps.length;t++)if(this.steps[t].module!==e){this._gotoStep(t);return}this._onFinish()}_onQuit(){this._onFinish(!0)}_onFinish(e=!1){this.stateManager.clear(),this.finishUrl||(window.location.href="/");const t=new URL(this.finishUrl);e||(this.type===w.checkin?t.searchParams.set("completed",this.type):t.searchParams.set("completed",this.type)),window.location.href=t}_gotoStep(e,t=!0){if(this.steps.length!==0&&(this.stepIndex=this.clampSteps(e),this.step=this.steps[this.stepIndex],t)){const i=new URL(window.location.href),a=i.pathname.split("/"),o=a[a.length-1];let n="";Object.values(w).includes(o)?n=a.join("/")+"/"+this.step.slug+i.search:n=a.slice(0,-1).join("/")+"/"+this.step.slug+i.search,window.history.pushState(null,null,n)}}clampSteps(e){let t=e;return e>this.steps.length-1&&(t=this.steps.length-1),e<0&&(t=0),t}_handleHistoryPopState(e=!1){const i=new URL(window.location.href).pathname.split("/"),a=i[i.length-1];Object.values(w).includes(a)&&this._gotoStep(0,!1);let o="",n=0;this.steps.forEach(({slug:h,module:c},d)=>{if(o!==c&&(o=c,n=d),a===h){if(e===!0&&this.stateManager.isDataStale()){this._gotoStep(n);return}this._gotoStep(d,!1)}})}_handlePlanDecision(e){switch(e.target.dataset.decision){case"make":this.updateWizard(w.makeAGroup);break;case"join":this.updateWizard(w.joinAPlan);break;case"skip":default:this._onSkip();break}}_handleLoading(e){const{loading:t}=e.detail;this.loading=t}makeModule(e=[],t=!1){const i={steps:[],skippable:t};return e.forEach(a=>{Object.keys(j).includes(a)&&i.steps.push(j[a])}),i}getModule(e,t=!1){const i={[$.completeProfile]:{steps:[j[l.updateName],j[l.updateLocation]],skippable:t},[$.planDecision]:{steps:[{slug:"plan-decision",component:(o,n,h)=>r`
                            <div class=${`stack ${h}`}>
                                <h2>Join or start a training</h2>
                                <button class="btn" data-decision="make" @click=${this._handlePlanDecision}>Start a training</button>
                                <button class="btn" data-decision="join" @click=${this._handlePlanDecision}>Join a public training</button>
                                <button class="btn outline" data-decision="skip" @click=${this._handlePlanDecision}>Skip for now</button>
                            </div>
                        `}],skippable:t},[$.makePlan]:this.makeModule([l.howManySessions,l.whatTimeOfDay,l.howOften,l.startDate,l.inviteFriends],t),[$.inviteFriends]:{steps:[j[l.inviteFriends]],skippable:t},[$.joinTraining]:{steps:[j[l.joinTraining]]}};return Object.keys(i).includes(e)?i[e]:i[$.completeProfile]}isWizardLoaded(){return Object.keys(this.modules).length!==0}loadWizard(e,t=!1){this.modules=e,t===!1&&(this.steps=[],this.stepIndex=0),Object.entries(this.modules).forEach(([i,{steps:a,skippable:o}])=>{const n=zumeProfile.profile;a.forEach(({component:h,slug:c})=>{const d=mt[c];let b=null;if(d&&n){if(d.testExistance(n[d.field],n))return;b=n[d.field]}const p={component:h,slug:c,module:i,skippable:o,doneHandler:this._onNext,handleLoading:this._handleLoading};b!==null&&(p.value=b),this.steps.push(p)})}),t===!1&&this._gotoStep(0)}updateWizard(e){const t=this.getWizard(e);Object.keys(t).length!==0&&this.loadWizard(t)}isWizardTypeValid(e){return!!Object.values(w).includes(e)}getWizard(e){return this.isWizardTypeValid(e)?{[w.gettingStarted]:{[$.completeProfile]:this.makeModule([l.updateName,l.updateLocation],!0),[$.planDecision]:this.getModule($.planDecision)},[w.makeAGroup]:{[$.makePlan]:this.getModule($.makePlan)},[w.getACoach]:{[$.completeProfile]:this.makeModule([l.updateName,l.updateLocation,l.updatePhone]),[$.getACoach]:this.makeModule([l.contactPreferences,l.languagePreferences,l.howCanWeServe,l.connectingToCoach])},[w.joinAPlan]:{[$.completeProfile]:this.makeModule([l.updateName,l.updateLocation,l.updatePhone]),[$.joinTraining]:this.getModule($.joinTraining)},[w.connectWithFriend]:{[$.completeProfile]:this.makeModule([l.updateName,l.updateLocation],!0),[$.connectFriend]:this.makeModule([l.connectToFriend])},[w.joinFriendsPlan]:{[$.completeProfile]:this.makeModule([l.updateName,l.updateLocation],!0),[$.joinFriendsTraining]:this.makeModule([l.joinFriendsPlan])},[w.checkin]:{[$.checkin]:this.makeModule([l.checkinSubmit])}}[e]:{}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._handleHistoryPopState)}createRenderRoot(){return this}}window.customElements.define("zume-wizard",kt);const j={[l.updateName]:{slug:l.updateName,component:(s,e,t)=>r`
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
 */const R={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},st=s=>(...e)=>({_$litDirective$:s,values:e});class it{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:St}=yt,xt=s=>s.strings===void 0,je=()=>document.createComment(""),B=(s,e,t)=>{var i;const a=s._$AA.parentNode,o=e===void 0?s._$AB:e._$AA;if(t===void 0){const n=a.insertBefore(je(),o),h=a.insertBefore(je(),o);t=new St(n,h,s,s.options)}else{const n=t._$AB.nextSibling,h=t._$AM,c=h!==s;if(c){let d;(i=t._$AQ)===null||i===void 0||i.call(t,s),t._$AM=s,t._$AP!==void 0&&(d=s._$AU)!==h._$AU&&t._$AP(d)}if(n!==o||c){let d=t._$AA;for(;d!==n;){const b=d.nextSibling;a.insertBefore(d,o),d=b}}}return t},M=(s,e,t=s)=>(s._$AI(e,t),s),Et={},at=(s,e=Et)=>s._$AH=e,zt=s=>s._$AH,me=s=>{var e;(e=s._$AP)===null||e===void 0||e.call(s,!1,!0);let t=s._$AA;const i=s._$AB.nextSibling;for(;t!==i;){const a=t.nextSibling;t.remove(),t=a}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ct=st(class extends it{constructor(s){if(super(s),s.type!==R.PROPERTY&&s.type!==R.ATTRIBUTE&&s.type!==R.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!xt(s))throw Error("`live` bindings can only contain a single expression")}render(s){return s}update(s,[e]){if(e===x||e===_)return e;const t=s.element,i=s.name;if(s.type===R.PROPERTY){if(e===t[i])return x}else if(s.type===R.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(i))return x}else if(s.type===R.ATTRIBUTE&&t.getAttribute(i)===e+"")return x;return at(s),e}});class At extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},value:{type:String},locations:{attribute:!1},locationError:{attribute:!1},phoneError:{attribute:!1},city:{attribute:!1},loading:{attribute:!1},state:{attribute:!1},localValue:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.locations=[],this.locationError="",this.city="",this.loading=!1,this.localValue="",this.phoneError="",this._clearLocations=this._clearLocations.bind(this),this._handleSuggestions=this._handleSuggestions.bind(this),this._debounceCityChange=debounce(getAddressSuggestions(this._handleSuggestions,zumeProfile.map_key)).bind(this),this._handleCityInputChange=this._handleCityInputChange.bind(this)}firstUpdated(){this.renderRoot.querySelector(".inputs input").focus(),this.value!==""&&(this.localValue=JSON.parse(this.value))}render(){var e;return r`
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
                        .value="${this.city?Ct(this.city):(e=this.localValue)==null?void 0:e.label}"
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
        `}_handleInput(e){this.phoneError=""}_handleInvalid(e){e.preventDefault(),this.phoneError=this.t.phone_error}_handleSubmit(e){e.preventDefault(),e.srcElement.querySelector("#city")?this._handleSubmitLocation():this._handleDone(e)}_handleDone(e){e&&e.preventDefault();const t=e.target[0];if(t.type==="submit")return;let{name:i,value:a}=t;t.type==="tel"&&(a=t.value.replace(/[\(\)\-\s]/g,"")),this._updateProfile(i,a,()=>{this._sendDoneStepEvent()})}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleCityChange(e){this._handleCityInputChange(e),this._debounceCityChange(e)}_handleCityInputChange(e){this.city=e.target.value}_handleSuggestions(e){e.features.length<1&&(this.locationError=this.t.no_locations_found),this.locations=e.features}_handleLocationSelection(e){this.city=e.target.dataset.placeName;const t=getLocationGridFromMapbox(e.target.id,zumeProfile.profile.location);this.localValue=t,this._clearLocations()}_handleSubmitLocation(){if(this.localValue.source==="ip"){const{label:e,level:t,lat:i,lng:a}=this.localValue;this.localValue={source:"user",grid_id:!1,label:e,level:t,lat:Number(i),lng:Number(a)}}this._updateProfile("location_grid_meta",this.localValue,()=>{this._sendDoneStepEvent()})}_updateProfile(e,t,i=()=>{}){this.loading=!0;const a={[e]:t};fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(a),headers:{"X-WP-Nonce":jsObject.nonce}}).then(o=>o.json()).then(o=>{zumeProfile.profile=o,i()}).catch(o=>{console.error(o)}).finally(()=>{this.loading=!1})}_clearLocations(){this.locations=[]}createRenderRoot(){return this}}window.customElements.define("complete-profile",At);class Dt extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},inviteCode:{type:String}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.t={},this.inviteCode="123456",this.url=`https://zume5.test/zume_app/plan_invite${this.inviteCode!==""?"?code="+this.inviteCode:""}`}render(){return r`
            <div class="center stack">
                <h2>${this.t.title}</h2>
                <p>${this.t.share_with_friends}</p>
                <share-links url=${this.url} title="${this.t.join_my_plan}" .t=${this.t}></share-links>
            </div>
        `}createRenderRoot(){return this}}window.customElements.define("invite-friends",Dt);class Pt extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},errorMessage:{attribute:!1},message:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.state={},this.errorMessage="",this.message="",this.loading=!1,this.contactPreferences=["email","text","phone","whatsapp","signal","telegram","messenger"]}firstUpdated(){this.message=this.t.connect_success;const e=this.stateManager.getAll();if(this.variant===l.connectingToCoach){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));const t=(a=>{a===!1&&(this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting)),a.coach_request&&a.coach_request.errors&&Object.keys(a.coach_request.errors).length!==0&&Object.keys(a.coach_request.errors)[0]==="already_has_coach"&&(this.message=this.t.already_coached,this.setErrorMessage(this.t.error_connecting)),this._handleFinish()}).bind(this),i=(()=>{this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting),this._handleFinish()}).bind(this);makeRequest("POST","get_a_coach",{data:e},"zume_system/v1/").done(t).fail(i).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return this.stateManager||(this.stateManager=new He(this.module),this.state=this.stateManager.get(this.variant)||{},this.variant===l.languagePreferences&&!this.state.value&&(this.state.value=zumeProfile.profile.preferred_language||"en",this.stateManager.add(this.variant,this.state)),this.variant===l.contactPreferences&&Object.keys(this.state).length===0&&(this.state=Object.fromEntries(zumeProfile.profile.contact_preference.map(e=>[e,"true"])))),r`
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
        `}_handleDone(e){if(e&&e.preventDefault(),Object.keys(this.state).length===0){this.setErrorMessage(this.t.missing_response);return}this._sendDoneStepEvent()}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleFinish(){setTimeout(()=>{this._sendDoneStepEvent()},3e3)}_handleChange(e){e.target.type==="checkbox"&&(this.state[e.target.value]=e.target.checked),e.target.type==="text"&&(this.state.value=e.target.value),e.target.type==="select-one"&&(this.state.value=e.target.value),this.stateManager.add(this.variant,this.state)}createRenderRoot(){return this}}customElements.define("request-coach",Pt);class Mt extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.showTrainings=!1,this.loading=!1}firstUpdated(){const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.loading=!1,this.showTrainings=!0;return}const t=e.searchParams.get("code");this.connectToPlan(t)}connectToPlan(e){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait,this.code=e,makeRequest("POST","connect/public-plan",{code:e},"zume_system/v1").then(t=>{console.log(t),this.message=this.t.success.replace("%s",t.name),this._sendDoneStepEvent()}).fail(({responseJSON:t})=>{console.log(t),this.message="",t.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}_handleChosenTraining(e){console.log(e);const{code:t}=e.detail;this.showTrainings=!1,this.connectToPlan(t)}render(){return r`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            ${this.showTrainings?r`
                <public-trainings .t=${this.t} @chosen-training=${this._handleChosenTraining}></public-trainings>
            `:""}
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("join-training",Mt);class Rt extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1;return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","connect/plan",{code:t},"zume_system/v1").then(i=>{console.log(i),this.message=this.t.success.replace("%s",i.name),this._sendDoneStepEvent()}).fail(({responseJSON:i})=>{console.log(i),this.message="",i.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return r`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("join-friends-training",Rt);class Tt extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","connect/friend",{code:t},"zume_system/v1").then(i=>{console.log(i),this.message=this.t.success.replace("%s",i.name),this._sendDoneStepEvent()}).fail(({responseJSON:i})=>{console.log(i),this.message="",i.code==="bad_friend_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return r`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("connect-friend",Tt);class It extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","checkin",{code:t},"zume_system/v1").then(i=>{this.message=this.t.success.replace("%s",i.name),this._sendDoneStepEvent()}).fail(({responseJSON:i})=>{console.log(i),this.message="",i.code==="bad_checkin_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){console.log(e),this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return r`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("session-checkin",It);class Ot extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},errorMessage:{attribute:!1},message:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.state={},this.errorMessage="",this.message="",this.loading=!1}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return r`
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

        `}_handleDone(e){e&&e.preventDefault(),this._sendDoneStepEvent()}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleFinish(){setTimeout(()=>{this._sendDoneStepEvent()},3e3)}createRenderRoot(){return this}}customElements.define("make-group",Ot);function jt(s){return s?JSON.parse('{"'+s.substring(1).replace(/&/g,'","').replace(/=/g,'":"')+'"}'):{}}function Lt(s,e){let t={};const i=s.split("/").filter(o=>o!=""),a=e.split("/").filter(o=>o!="");return i.map((o,n)=>{/^:/.test(o)&&(t[o.substring(1)]=a[n])}),t}function Nt(s){return s?new RegExp("^(|/)"+s.replace(/:[^\s/]+/g,"([\\wÀ-ÖØ-öø-ÿ-]+)")+"(|/)$"):new RegExp("(^$|^/$)")}function Ht(s,e){if(Nt(e).test(s))return!0}function qt(s){return class extends s{static get properties(){return{route:{type:String,reflect:!0,attribute:"route"},canceled:{type:Boolean}}}constructor(...e){super(...e),this.route="",this.canceled=!1}connectedCallback(...e){super.connectedCallback(...e),this.routing(this.constructor.routes,(...t)=>this.router(...t)),window.addEventListener("route",()=>{this.routing(this.constructor.routes,(...t)=>this.router(...t))}),window.onpopstate=()=>{window.dispatchEvent(new CustomEvent("route"))}}routed(e,t,i,a,o,n){n&&n(e,t,i,a),o(e,t,i,a)}routing(e,t){this.canceled=!0;const i=decodeURI(window.location.pathname),a=decodeURI(window.location.search);let o=e.filter(c=>c.pattern==="*")[0],n=e.filter(c=>c.pattern!=="*"&&Ht(i,c.pattern))[0],h=jt(a);n?(n.params=Lt(n.pattern,i),n.data=n.data||{},n.authentication&&n.authentication.authenticate&&typeof n.authentication.authenticate=="function"?(this.canceled=!1,Promise.resolve(n.authentication.authenticate.bind(this).call()).then(c=>{this.canceled||(c?n.authorization&&n.authorization.authorize&&typeof n.authorization.authorize=="function"?(this.canceled=!1,Promise.resolve(n.authorization.authorize.bind(this).call()).then(d=>{this.canceled||(d?this.routed(n.name,n.params,h,n.data,t,n.callback):this.routed(n.authorization.unauthorized.name,n.params,h,n.data,t,n.callback))})):this.routed(n.name,n.params,h,n.data,t,n.callback):this.routed(n.authentication.unauthenticated.name,n.params,h,n.data,t,n.callback))})):n.authorization&&n.authorization.authorize&&typeof n.authorization.authorize=="function"?(this.canceled=!1,Promise.resolve(n.authorization.authorize.bind(this).call()).then(c=>{this.canceled||(c?this.routed(n.name,n.params,h,n.data,t,n.callback):this.routed(n.authorization.unauthorized.name,n.params,h,n.data,t,n.callback))})):this.routed(n.name,n.params,h,n.data,t,n.callback)):o&&(o.data=o.data||{},this.routed(o.name,{},h,o.data,t,o.callback))}}}function Ut(s){return class extends s{navigate(e){window.history.pushState({},null,e),window.dispatchEvent(new CustomEvent("route"))}}}class S extends qt(g){static get properties(){return{route:{type:String},params:{type:Object},query:{type:Object},menuOffset:{type:Number,attribute:!1}}}static get routes(){return[{name:"getting-started",pattern:`${zumeDashboard.base_url}/getting-started`,icon:"zume-start",translation:zumeDashboard.translations.getting_started,data:{component:"dash-getting-started"}},{name:"training",pattern:`${zumeDashboard.base_url}/training`,icon:"zume-training",translation:zumeDashboard.translations.training,data:{component:"dash-training"}},{name:"my-training",pattern:`${zumeDashboard.base_url}/my-training`,parent:"training",icon:"zume-group",translation:zumeDashboard.translations.my_training,explanation:zumeDashboard.translations.my_training_explanation,data:{component:"dash-trainings"}},{name:"my-progress",pattern:`${zumeDashboard.base_url}/my-progress`,parent:"training",icon:"zume-progress",translation:zumeDashboard.translations.my_progress,explanation:zumeDashboard.translations.my_progress_explanation,data:{component:"dash-progress"}},{name:"3-month-plan",pattern:`${zumeDashboard.base_url}/3-month-plan`,parent:"training",icon:"zume-plans",translation:zumeDashboard.translations["3_month_plan"],explanation:zumeDashboard.translations["3_month_plan_explanation"],data:{component:"dash-progress"}},{name:"practicing",pattern:`${zumeDashboard.base_url}/practicing`,icon:"zume-practicing",translation:zumeDashboard.translations.practicing,data:{component:"dash-practicing"}},{name:"my-coach",pattern:`${zumeDashboard.base_url}/my-coach`,parent:"practicing",icon:"zume-coach",translation:zumeDashboard.translations.my_coach,explanation:zumeDashboard.translations.my_coach_explanation,data:{component:"dash-coach"}},{name:"my-tools",pattern:`${zumeDashboard.base_url}/my-tools`,parent:"practicing",icon:"zume-tools",translation:zumeDashboard.translations.my_tools,explanation:zumeDashboard.translations.my_tools_explanation,data:{component:"dash-tools"}},{name:"my-plans",pattern:`${zumeDashboard.base_url}/my-plans`,parent:"practicing",icon:"zume-plans",translation:zumeDashboard.translations.my_plans,explanation:zumeDashboard.translations.my_plans_explanation,data:{component:"dash-plans"}},{name:"my-churches",pattern:`${zumeDashboard.base_url}/my-churches`,parent:"practicing",icon:"zume-churches",translation:zumeDashboard.translations.my_churches,explanation:zumeDashboard.translations.my_churches_explanation,data:{component:"dash-churches"}},{name:"my-maps",pattern:`${zumeDashboard.base_url}/my-maps`,parent:"practicing",icon:"zume-maps",translation:zumeDashboard.translations.my_maps,explanation:zumeDashboard.translations.my_maps_explanation,data:{component:"dash-maps"}},{name:"not-found",pattern:"*",icon:"",data:{component:"dash-not-found"}}]}static getRoute(e){return S.routes.find(i=>i.name===e)}static childRoutesOf(e){return S.routes.filter(({parent:i})=>i===e)}constructor(){super(),this.route="",this.params={},this.query={},this.data={},this.menuOffset=0,this.addEventListener("toggle-dashboard-sidebar",()=>{this.toggleSidebar()})}firstUpdated(){this.menuOffset=this.getOffsetTop(".sidebar-wrapper")}router(e,t,i,a){this.route=e,this.params=t,this.query=i,this.data=a}makeHref(e){return`${zumeDashboard.base_url}/${e}`}makeHrefRoute(e){const i=S.routes.find(({name:a})=>a===e);return i?i.pattern:(console.error("MISSING ROUTE",e),"")}renderRoute(){const{component:e}=this.data;return e?document.createElement(e):""}getOffsetTop(e){return this.querySelector(e).offsetTop}toggleSidebar(){const e=document.querySelector(".dashboard__sidebar"),t=document.querySelector(".sidebar__trigger-close-background"),i="200";e.style.transitionDuration=i,t.style.transitionDuration=i;const a=e.dataset.state;a==="open"&&(e.dataset.state="closed",t.style.opacity=0,setTimeout(()=>{t.style.visibility="hidden"},i)),(!a||a==="closed")&&(e.dataset.state="open",t.style.opacity="initial",t.style.visibility="visible")}render(){return r`
            <div class="sidebar__trigger-close-background" @click=${this.toggleSidebar}></div>
            <div class="dashboard">

            <div class="dashboard__sidebar">
                <div
                    class="sidebar-wrapper"
                    style="top: ${this.menuOffset}px; height: calc( min( 100%, 100vh ) - ${this.menuOffset}px - var(--s0) );"
                >
                    <button
                        class="ms-auto mb-0 d-block w-2rem dashboard__sidebar-toggle break-large break-medium"
                        aria-label="Close modal"
                        type="button"
                        @click=${this.toggleSidebar}
                    >
                        <img src=${zumeDashboard.images_url+"/close-button-01.svg"} alt="close button">
                    </button>
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
                                text=${zumeDashboard.translations.getting_started}>
                            </nav-link>
                            <progress-circle percent="66" radius="12"></progress-circle>
                            <ul class="nested is-active">
                                <li>
                                    <nav-link
                                        class="menu-btn"
                                        href=${zumeDashboard.urls.set_profile_wizard}
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
                                ${S.childRoutesOf("training").map(e=>r`
                                            <li>
                                                <nav-link
                                                    class="menu-btn"
                                                    href=${this.makeHrefRoute(e.name)}
                                                    icon=${e.icon}
                                                    text=${e.translation}
                                                    ?locked=${["3-month-plan"].includes(e.name)}
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
                                text=${zumeDashboard.translations.practicing}
                            ></nav-link>
                            <ul class="nested is-active">
                                ${S.childRoutesOf("practicing").map(e=>r`
                                            <li>
                                                <nav-link
                                                    class="menu-btn"
                                                    href=${this.makeHrefRoute(e.name)}
                                                    icon=${e.icon}
                                                    text=${e.translation}
                                                    ?locked=${["my-plans","my-churches","my-maps"].includes(e.name)}
                                                ></nav-link>
                                                <span class="icon zume-locked gray-500"></span>
                                            </li>
                                        `)}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            ${this.renderRoute()}
        </div>
        `}createRenderRoot(){return this}}customElements.define("dash-board",S);class C extends g{constructor(){super();const t=document.querySelector("html").dataset.dir;this.isRtl=t==="rtl"}firstUpdated(){this.attachResizeObeserver(),this.updateHeaderStyle()}attachResizeObeserver(){const e=document.querySelector("dash-header-right"),t=new ResizeObserver(i=>{for(let a of i){if(!a.contentRect)return;const o=Math.round(a.contentRect.height),n=Math.round(a.contentRect.width);this.updateHeaderStyle(!1,o,n)}});this.resizeObserver=t,t.observe(e)}updateHeaderStyle(e=!0,t=0,i=window.innerWidth){const a=document.querySelector(".dashboard__header.left");e&&(this.initialOffset=a.offsetTop);let o;i<window.innerWidth/2?o=this.initialOffset:o=this.initialOffset+t,a.style.top=o+"px"}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.disconnect()}}class Ft extends C{render(){return r`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <dash-sidebar-toggle></dash-sidebar-toggle>
                    <h1 class="h3">Churches</h1>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main">
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-churches",Ft);class Bt extends C{render(){return r`
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
        `}createRenderRoot(){return this}}customElements.define("dash-coach",Bt);class Wt extends g{render(){return r`
            <div class="stack | card cta">
                <h2 class="h5 text-center">${zumeDashboard.translations.get_a_coach}</h2>
                <p>Don't forget about our free coaching</p>
                <a href="#" class="btn light uppercase">${zumeDashboard.translations.get_a_coach}</a>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-cta",Wt);class ae extends C{static get properties(){return{view:{type:String,attribute:!1}}}constructor(e){super(),this.routeName=e,this.route=S.getRoute(this.routeName),this.routes=S.childRoutesOf(this.routeName),this.view="list"}switchView(e="list"){this.view=e}renderLinks(){return this.view==="grid"?r`
                <div class="nav-grid">
                    ${this.routes.map(e=>r`
                        <grid-link
                            href=${e.pattern}
                            text=${e.translation||""}
                            icon=${e.icon}
                            ?locked=${["my-plans","my-churches","my-maps"].includes(e.name)}
                        >
                        </grid-link>
                        `)}
                </div>
            `:r`
            <div class="stack-3">
                ${this.routes.map(e=>r`
                    <list-link
                        href=${e.pattern}
                        text=${e.translation}
                        explanation=${e.explanation}
                        icon=${e.icon}
                        ?locked=${["my-plans","my-churches","my-maps"].includes(e.name)}
                    >
                    </list-link>
                `)}
            </div>
        `}render(){return r`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <dash-sidebar-toggle></dash-sidebar-toggle>
                        <span class="icon ${this.route.icon}"></span>
                        <h1 class="h3">${this.route.translation}</h1>
                    </div>
                    <div class="icon-btn-group">
                        <button class="${this.view==="list"?"selected":""}" title=${zumeDashboard.translations.list} @click=${()=>this.switchView("list")}>
                            <span class="icon zume-list" aria-hidden="true"></span>
                        </button>
                        <button class="${this.view==="grid"?"selected":""}" title=${zumeDashboard.translations.grid} @click=${()=>this.switchView("grid")}>
                            <span class="icon zume-grid" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main p-2">
                    ${this.renderLinks()}
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-top-level",ae);class Zt extends ae{constructor(){super("getting-started")}createRenderRoot(){return this}}customElements.define("dash-getting-started",Zt);class Vt extends C{render(){return r`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <dash-sidebar-toggle></dash-sidebar-toggle>
                    <h1 class="h3">Maps</h1>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main">
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-maps",Vt);class Qt extends C{render(){return r`
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
        `}createRenderRoot(){return this}}customElements.define("dash-not-found",Qt);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Le=(s,e,t)=>{const i=new Map;for(let a=e;a<=t;a++)i.set(s[a],a);return i},ye=st(class extends it{constructor(s){if(super(s),s.type!==R.CHILD)throw Error("repeat() can only be used in text expressions")}dt(s,e,t){let i;t===void 0?t=e:e!==void 0&&(i=e);const a=[],o=[];let n=0;for(const h of s)a[n]=i?i(h,n):n,o[n]=t(h,n),n++;return{values:o,keys:a}}render(s,e,t){return this.dt(s,e,t).values}update(s,[e,t,i]){var a;const o=zt(s),{values:n,keys:h}=this.dt(e,t,i);if(!Array.isArray(o))return this.ht=h,n;const c=(a=this.ht)!==null&&a!==void 0?a:this.ht=[],d=[];let b,p,u=0,m=o.length-1,v=0,f=n.length-1;for(;u<=m&&v<=f;)if(o[u]===null)u++;else if(o[m]===null)m--;else if(c[u]===h[v])d[v]=M(o[u],n[v]),u++,v++;else if(c[m]===h[f])d[f]=M(o[m],n[f]),m--,f--;else if(c[u]===h[f])d[f]=M(o[u],n[f]),B(s,d[f+1],o[u]),u++,f--;else if(c[m]===h[v])d[v]=M(o[m],n[v]),B(s,o[u],o[m]),m--,v++;else if(b===void 0&&(b=Le(h,v,f),p=Le(c,u,m)),b.has(c[u]))if(b.has(c[m])){const E=p.get(h[v]),ne=E!==void 0?o[E]:null;if(ne===null){const ke=B(s,o[u]);M(ke,n[v]),d[v]=ke}else d[v]=M(ne,n[v]),B(s,o[u],ne),o[E]=null;v++}else me(o[m]),m--;else me(o[u]),u++;for(;v<=f;){const E=B(s,d[f+1]);M(E,n[v]),d[v++]=E}for(;u<=m;){const E=o[u++];E!==null&&me(E)}return this.ht=h,at(s,d),x}});class Gt extends C{static get properties(){return{loading:{type:Boolean,attribute:!1},commitments:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1}}}constructor(){super(),this.loading=!0,this.route=S.getRoute("my-plans"),this.filterName="my-plans-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.renderListItem=this.renderListItem.bind(this),this.closeCommitmentsModal=this.closeCommitmentsModal.bind(this)}firstUpdated(){super.firstUpdated();const e=this.filterStatus||"";this.fetchCommitments(e)}updated(){jQuery(document).foundation()}fetchCommitments(){const e=this.filterStatus;makeRequest("GET","commitments",{status:e},"zume_system/v1").done(t=>{this.commitments=t}).always(()=>{this.loading=!1})}openCommitmentsModal(){const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("open")}closeCommitmentsModal(){const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("close")}clearCommitmentsModal(){jQuery(".post-training-plan").each(function(e){this.value=""})}addCommitments(){const e=[];return jQuery(".post-training-plan").each(function(t){const i=jQuery(this).val();if(i){const o=jQuery(this).prev().text();console.log("Question: "+o+" Answer: "+i);var a=new Date;a.setDate(a.getDate()+30),this.value="";const n=makeRequest("POST","commitment",{user_id:zumeDashboard.user_profile.user_id,post_id:zumeDashboard.user_profile.contact_id,meta_key:"tasks",note:"Question: "+o+" Answer: "+i,question:o,answer:i,date:a,category:"post_training_plan"},"zume_system/v1");e.push(n.promise())}}),console.log(e),Promise.all(e).then(()=>{this.fetchCommitments(),this.closeCommitmentsModal()})}completeCommitment(e){let t={id:e,user_id:zumeDashboard.user_profile.user_id};makeRequest("PUT","commitment",t,"zume_system/v1").done(i=>{this.fetchCommitments()})}deleteCommitment(e){let t={id:e,user_id:zumeDashboard.user_profile.user_id};makeRequest("DELETE","commitment",t,"zume_system/v1").done(i=>{this.closeMenu(e),this.fetchCommitments()})}editCommitment(e){console.log(e)}filterCommitments(e){this.filterStatus=e,this.fetchCommitments(e),ZumeStorage.save(this.filterName,e),this.closeFilter()}closeFilter(){const e=this.querySelector("#filter-menu");jQuery(e).foundation("close")}closeMenu(e){const t=this.querySelector(`#kebab-menu-${e}`);jQuery(t).foundation("close")}renderListItem(e){const{question:t,answer:i,id:a,status:o}=e;return r`
            <li class="list__item | switcher | switcher-width-30">
                <span>${t} <b>${i}</b></span>
                <div class="list__secondary | grow-0">
                    <div class="d-flex w-6rem justify-content-center">
                        ${o==="closed"?r`<span class="icon zume-check-mark success"></span>`:r`
                                <button
                                    class="btn light uppercase tight break-anywhere"
                                    @click=${()=>this.completeCommitment(a)}
                                >
                                    ${zumeDashboard.translations.done}
                                </button>
                            `}
                    </div>
                    <button class="icon-btn" data-toggle="kebab-menu-${a}">
                        <span class="icon zume-kebab brand-light"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="kebab-menu-${a}" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li class="hidden"><button class="menu-btn" @click=${()=>this.editCommitment(a)}><span class="icon zume-pencil"></span>${zumeDashboard.translations.edit}</button></li>
                        <li><button class="menu-btn" @click=${()=>this.deleteCommitment(a)}><span class="icon zume-trash"></span>${zumeDashboard.translations.delete}</button></li>
                    </ul>
                </div>
            </li>

        `}render(){return r`
            <div class="dashboard__content" data-no-secondary-area>
                <dash-header-right></dash-header-right>
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <div>
                            <dash-sidebar-toggle></dash-sidebar-toggle>
                            <span class="icon ${this.route.icon}"></span>
                            <h1 class="h3">${this.route.translation}</h1>
                        </div>
                        <div class="s--2">
                            <button class="icon-btn f-2" data-toggle="filter-menu">
                                <span class="visually-hidden">${zumeDashboard.translations.filter}</span>
                                <span class="icon zume-filter brand-light" aria-hidden="true"></span>
                            </button>
                            <button class="icon-btn f-2" @click=${this.openCommitmentsModal}>
                                <span class="visually-hidden">${zumeDashboard.translations.add_commitments}</span>
                                <span class="icon zume-plus brand-light" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
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
                                    ${zumeDashboard.translations.all}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="dashboard__main">
                    ${this.loading?r`<span class="loading-spinner active"></span>`:r`
                                <ul class="list">
                                    ${!this.loading&&this.commitments&&this.commitments.length>0?ye(this.commitments,e=>e.id,this.renderListItem):""}
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
                    <div class="">
                      <button class="btn d-block ms-auto" @click=${this.addCommitments}>Save</button>
                    </div>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-plans",Gt);class Jt extends ae{constructor(){super("practicing")}createRenderRoot(){return this}}customElements.define("dash-practicing",Jt);class Yt extends C{static get properties(){return{loading:{type:Boolean,attribute:!1},filteredItems:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1},hostProgress:{type:Object,attribute:!1}}}constructor(){super(),this.loading=!1,this.route=S.getRoute("my-progress"),this.trainingItems=zumeDashboard.training_items,this.hostProgress=zumeDashboard.host_progress,this.filterName="my-progress-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.filteredItems=this.filterItems(this.filterStatus),this.openStates={},this.trainingItems.forEach(e=>{this.openStates[e.key]=!1}),this.renderListItem=this.renderListItem.bind(this),this.closeInfoModal=this.closeInfoModal.bind(this)}updated(){jQuery(document).foundation()}openInfoModal(){const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("open")}closeInfoModal(){const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("close")}filterProgress(e){this.filterStatus=e,this.filteredItems=this.filterItems(e),console.log(this.filteredItems),ZumeStorage.save(this.filterName,e),this.closeFilter()}filterItems(e){switch(e){case"heard":return this.trainingItems.filter(t=>{const i=t.host[0].key;return!!(this.hostProgress.list[i]||!1)});case"not-heard":return this.trainingItems.filter(t=>{const i=t.host[0].key;return!(this.hostProgress.list[i]||!1)});default:return[...this.trainingItems]}}closeFilter(){const e=this.querySelector("#filter-menu");jQuery(e).foundation("close")}toggleHost(e,t){t.stopImmediatePropagation();const{type:i,subtype:a,key:o}=e,n=this.hostProgress.list[o];n===!1&&makeRequest("POST","host",{type:i,subtype:a,user_id:zumeDashboard.user_profile.user_id},"zume_system/v1").done(h=>{Array.isArray(h)&&(this.hostProgress.list[o]=!0),this.loadHostStatus()}),n===!0&&makeRequest("DELETE","host",{type:i,subtype:a,user_id:zumeDashboard.user_profile.user_id},"zume_system/v1").done(h=>{Array.isArray(h)&&(this.hostProgress.list[o]=!1),this.loadHostStatus()})}loadHostStatus(){makeRequest("GET","host",{user_id:zumeDashboard.user_profile.user_id},"zume_system/v1").done(e=>{this.hostProgress=e})}toggleDetails(e){const t=this.querySelector(`#details-${e}`),i=this.openStates[e],a=t.scrollHeight,o="200";i===!1?(t.style.height=a+"px",t.style.transitionDuration=o+"ms",t.dataset.state="opening",this.openStates[e]=!0,setTimeout(()=>{t.style.height="auto",t.dataset.state="open"},o)):(t.style.height=a+"px",t.dataset.state="closing",this.openStates[e]=!1,setTimeout(()=>{t.style.height="0"},10),setTimeout(()=>{t.dataset.state="closed"},o))}renderListItem(e){const{title:t,description:i,host:a,slug:o,key:n}=e;let h=[zumeDashboard.site_url,zumeDashboard.language,o].join("/");return zumeDashboard.language==="en"&&(h=[zumeDashboard.site_url,o].join("/")),r`
            <li class="switcher | switcher-width-30 list__item tight" @click=${()=>this.toggleDetails(n)} role="button">
                <div>
                    <h2 class="h5 bold m0">${t}</h2>
                    <div class="collapse" id="details-${n}" data-state="closed">
                        <div class="stack--2 mt--2">
                            <p class="f--1 gray-700">${i}</p>
                            <div class="cluster">
                                <share-links url=${h} title=${t} .t=${zumeDashboard.share_translations}></share-links>
                                <a class="btn light uppercase" href=${h} @click=${c=>c.stopImmediatePropagation()}>${zumeDashboard.translations.view}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list__secondary grow-0" data-align-start>
                    <div class="training-progress">
                        <button
                            data-subtype=${a[0].subtype}
                            class=${this.hostProgress.list[a[0].key]?"active":""}
                            @click=${c=>this.toggleHost(a[0],c)}
                        >
                            <span class="icon zume-heard-concept"></span>
                        </button>
                        <button
                            data-subtype=${a[1].subtype}
                            class=${this.hostProgress.list[a[1].key]?"active":""}
                            @click=${c=>this.toggleHost(a[1],c)}
                        >
                            <span class="icon zume-obey-concept"></span>
                        </button>
                        <button
                            data-subtype=${a[2].subtype}
                            class=${this.hostProgress.list[a[2].key]?"active":""}
                            @click=${c=>this.toggleHost(a[2],c)}
                        >
                            <span class="icon zume-share-concept"></span>
                        </button>
                        <button
                            data-subtype=${a[3].subtype}
                            class=${this.hostProgress.list[a[3].key]?"active":""}
                            @click=${c=>this.toggleHost(a[3],c)}
                        >
                            <span class="icon zume-train-concept"></span>
                        </button>
                    </div>
                </div>
            </li>
        `}render(){var e,t,i,a,o,n,h,c;return r`
            <div class="dashboard__content" data-no-secondary-area>
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <dash-sidebar-toggle></dash-sidebar-toggle>
                        <span class="icon ${this.route.icon}"></span>
                        <h1 class="h3">${this.route.translation}</h1>
                        <button class="icon-btn f-2" data-toggle="filter-menu">
                            <span class="visually-hidden">${zumeDashboard.translations.filter}</span>
                            <span class="icon zume-filter brand-light" aria-hidden="true"></span>
                        </button>
                        <button class="icon-btn f-2" @click=${this.openInfoModal}>
                            <span class="visually-hidden">${zumeDashboard.translations.progress_info}</span>
                            <span class="icon zume-info brand-light" aria-hidden="true"></span>
                        </button>
                    </div>
                    <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                        <ul>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus==="heard"?"selected":""}" @click=${()=>this.filterProgress("heard")}>
                                    ${zumeDashboard.translations.heard}
                                </button>
                                <button class="menu-btn w-100 ${this.filterStatus==="not-heard"?"selected":""}" @click=${()=>this.filterProgress("not-heard")}>
                                    ${zumeDashboard.translations.not_heard}
                                </button>
                                <button class="menu-btn w-100 ${this.filterStatus==="all"?"selected":""}" @click=${()=>this.filterProgress("all")}>
                                    ${zumeDashboard.translations.all}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main">
                    ${r`
                            <ul class="list">
                                ${ye(this.filteredItems,d=>d.key,this.renderListItem)}
                            </ul>
                        `}
                </div>
            </div>
            <div class="reveal large" id="new-commitments-form" data-reveal data-v-offset="20">
                <button class="ms-auto d-block w-2rem" data-close aria-label="Close modal" type="button">
                        <img src=${`${zumeDashboard.images_url}/close-button-01.svg`} alt="close button">
                </button>
                <div class="stack-2 host-info mx-2">
                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="heard" percent=${((t=(e=this.hostProgress)==null?void 0:e.percent)==null?void 0:t.h)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${zumeDashboard.translations.heard}</h3>
                            <p class="italic">${zumeDashboard.translations.heard_explanation}</p>
                        </div>
                    </div>
                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="obeyed" percent=${((a=(i=this.hostProgress)==null?void 0:i.percent)==null?void 0:a.o)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${zumeDashboard.translations.obeyed}</h3>
                            <p class="italic">${zumeDashboard.translations.obeyed_explanation}</p>
                        </div>
                    </div>
                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="shared" percent=${((n=(o=this.hostProgress)==null?void 0:o.percent)==null?void 0:n.s)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${zumeDashboard.translations.shared}</h3>
                            <p class="italic">${zumeDashboard.translations.shared_explanation}</p>
                        </div>
                    </div>

                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="trained" percent=${((c=(h=this.hostProgress)==null?void 0:h.percent)==null?void 0:c.t)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${zumeDashboard.translations.trained}</h3>
                            <p class="italic">${zumeDashboard.translations.trained_explanation}</p>
                        </div>
                    </div>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-progress",Yt);class Kt extends C{render(){return r`
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
        `}createRenderRoot(){return this}}customElements.define("dash-tools",Kt);class Xt extends ae{constructor(){super("training")}createRenderRoot(){return this}}customElements.define("dash-training",Xt);class es extends C{static get properties(){return{loading:{type:Boolean,attribute:!1},commitments:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1}}}constructor(){super(),this.loading=!0,this.route=S.getRoute("my-plans"),this.filterName="my-plans-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.renderListItem=this.renderListItem.bind(this),this.closeCommitmentsModal=this.closeCommitmentsModal.bind(this)}firstUpdated(){super.firstUpdated();const e=this.filterStatus||"";this.fetchCommitments(e)}updated(){jQuery(document).foundation()}fetchCommitments(){const e=this.filterStatus;makeRequest("GET","commitments",{status:e},"zume_system/v1").done(t=>{this.commitments=t}).always(()=>{this.loading=!1})}openCommitmentsModal(){const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("open")}closeCommitmentsModal(){const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("close")}clearCommitmentsModal(){jQuery(".post-training-plan").each(function(e){this.value=""})}addCommitments(){const e=[];return jQuery(".post-training-plan").each(function(t){const i=jQuery(this).val();if(i){const o=jQuery(this).prev().text();console.log("Question: "+o+" Answer: "+i);var a=new Date;a.setDate(a.getDate()+30),this.value="";const n=makeRequest("POST","commitment",{user_id:zumeDashboard.user_profile.user_id,post_id:zumeDashboard.user_profile.contact_id,meta_key:"tasks",note:"Question: "+o+" Answer: "+i,question:o,answer:i,date:a,category:"post_training_plan"},"zume_system/v1");e.push(n.promise())}}),console.log(e),Promise.all(e).then(()=>{this.fetchCommitments(),this.closeCommitmentsModal()})}completeCommitment(e){let t={id:e,user_id:zumeDashboard.user_profile.user_id};makeRequest("PUT","commitment",t,"zume_system/v1").done(i=>{this.fetchCommitments()})}deleteCommitment(e){let t={id:e,user_id:zumeDashboard.user_profile.user_id};makeRequest("DELETE","commitment",t,"zume_system/v1").done(i=>{this.closeMenu(e),this.fetchCommitments()})}editCommitment(e){console.log(e)}filterCommitments(e){this.filterStatus=e,this.fetchCommitments(e),ZumeStorage.save(this.filterName,e),this.closeFilter()}closeFilter(){const e=this.querySelector("#filter-menu");jQuery(e).foundation("close")}closeMenu(e){const t=this.querySelector(`#kebab-menu-${e}`);jQuery(t).foundation("close")}renderListItem(e){const{question:t,answer:i,id:a,status:o}=e;return r`
            <li class="list__item">
                <span>${t} <b>${i}</b></span>
                <div class="list__secondary">
                    <div class="d-flex w-6rem justify-content-center">
                        ${o==="closed"?r`<span class="icon zume-check-mark success"></span>`:r`
                                <button
                                    class="btn light uppercase tight break-anywhere"
                                    @click=${()=>this.completeCommitment(a)}
                                >
                                    ${zumeDashboard.translations.done}
                                </button>
                            `}
                    </div>
                    <button class="icon-btn" data-toggle="kebab-menu-${a}">
                        <span class="icon zume-kebab brand-light"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="kebab-menu-${a}" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li class="hidden"><button class="menu-btn" @click=${()=>this.editCommitment(a)}><span class="icon zume-pencil"></span>${zumeDashboard.translations.edit}</button></li>
                        <li><button class="menu-btn" @click=${()=>this.deleteCommitment(a)}><span class="icon zume-trash"></span>${zumeDashboard.translations.delete}</button></li>
                    </ul>
                </div>
            </li>

        `}render(){return r`
            <div class="dashboard__content">
                <div class="dashboard__header left">
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
                    <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
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
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main">
                    ${this.loading?r`<span class="loading-spinner active"></span>`:r`
                                <ul class="list">
                                    <li class="list__item">
                                        <h2 class="f-1">I will</h2>
                                    </li>
                                    ${!this.loading&&this.commitments&&this.commitments.length>0?ye(this.commitments,e=>e.id,this.renderListItem):""}
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
                    <div class="">
                      <button class="btn d-block ms-auto" @click=${this.addCommitments}>Save</button>
                    </div>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-trainings",es);class ts extends g{firstUpdated(){const e=this.offsetTop;this.style.top=e+"px"}render(){return r`
            <div class="dashboard__header right">
                <dash-sidebar-toggle displayOn="medium"></dash-sidebar-toggle>
                <launch-course></launch-course>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-header-right",ts);class ss extends g{static get properties(){return{displayOn:{type:String}}}constructor(){super(),this.displayOn="large"}toggleSidebar(){const e=new CustomEvent("toggle-dashboard-sidebar",{bubbles:!0});this.dispatchEvent(e)}render(){return r`
            <button class="btn f-0 light tight dashboard__sidebar-toggle break-${this.displayOn}" @click=${this.toggleSidebar}>${zumeDashboard.translations.menu}</button>
        `}createRenderRoot(){return this}}customElements.define("dash-sidebar-toggle",ss);class we extends Ut(g){static get properties(){return{href:{type:String},class:{type:String},locked:{type:Boolean},completed:{type:Boolean},directLink:{type:Boolean},icon:{type:String},text:{type:String},explanation:{type:String}}}constructor(){super(),this.href="",this.class="",this.icon="",this.text="",this.explanation="",this.locked=!1,this.completed=!1,this.directLink=!1}handleClick(e){this.directLink||(e.preventDefault(),this.navigate(this.href))}printBool(e){return e?"true":"false"}render(){return r`
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
        `}createRenderRoot(){return this}}customElements.define("nav-link",we);class is extends we{constructor(){super()}renderText(){return this.text.split(" ").map(e=>r`
            <span>${e}</span>
        `)}getIcon(){return this.locked?this.icon+"-locked":this.icon}render(){return r`
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
        `}}customElements.define("grid-link",is);class as extends we{constructor(){super()}renderText(){return this.text.split(" ").map(e=>r`
            <span>${e}</span>
        `)}getIcon(){return this.locked?this.icon+"-locked":this.icon}render(){return r`
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
                        <a
                            href=${this.href}
                            class="dash-menu__view-button btn ${this.locked?"locked":"light"} tight"
                            role="button"
                            @click=${this.handleClick}
                        >
                            ${this.locked?zumeDashboard.translations.preview:zumeDashboard.translations.view_now}
                        </a>
                    </div>
                </div>
            </div>
        `}}customElements.define("list-link",as);class ns extends g{constructor(){super();const t=document.querySelector("html").dataset.dir;this.isRtl=t==="rtl"}updated(){jQuery(document).foundation()}render(){return r`
            <button class="btn uppercase light tight" data-toggle="launch-course-panel">
                ${zumeDashboard.translations.launch_course}
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
                    <li><a class="menu-btn" href="${zumeDashboard.urls.launch_ten_session_course}"><span class="icon zume-course"></span>${zumeDashboard.translations.ten_session_course}</a></li>
                    <li><a class="menu-btn" href="${zumeDashboard.urls.launch_twenty_session_course}"><span class="icon zume-course"></span>${zumeDashboard.translations.twenty_session_course}</a></li>
                    <li><a class="menu-btn" href="${zumeDashboard.urls.launch_intensive_session_course}"><span class="icon zume-course"></span>${zumeDashboard.translations.three_day_intensive_course}</a></li>
                </ul>
            </div>
        `}createRenderRoot(){return this}}customElements.define("launch-course",ns);class y extends g{static get properties(){return{slide:{type:Object}}}renderContent(e=[],t=!1,i=!1){return e.map((a,o)=>t&&o===0||i?r`<p><strong>${a}</strong></p>`:Array.isArray(a)?r`
                    <ul role="list">
                        ${a.map(n=>r`<li>${n}</li>`)}
                    </ul>
                `:r`<p>${a}</p>`)}render(){return r`
            <div class="center"></div>
        `}createRenderRoot(){return this}}customElements.define("course-slide",y);class os extends y{render(){return r`
            <div class="cover">
                <h2 class="title text-center" data-small>${this.slide.center[0]} ${this.slide.center[1]}</h2>
                <div class="two-column right">
                    <div>
                        <div class="activity-card" data-expanded-padding>
                            ${this.renderContent(this.slide.left,!0)}
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack center | text-center">
                            <div class="qr-code"><img src="${this.slide.right[0]}" /></div>
                            <p>${this.slide.right[1]}</p>
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("activity-slide",os);class rs extends y{render(){return r`
            <div class="cover">
                <div class="center activity-card" data-large>
                    <p>${this.slide.center[0]}</p>
                    <p>${this.slide.center[1]??""}</p>
                </div>
            </div>
        `}}customElements.define("break-slide",rs);class ls extends y{render(){return r`
            <div class="cover">
                <h2 class="title text-center">${this.slide.center[0]??""} ${this.slide.center[1]??""}</h2>
                <div class="center w-70">
                    <div class="stack activity-card">
                        ${this.renderContent(this.slide.left,!0)}
                    </div>
                </div>
            </div>
        `}}customElements.define("center-slide",ls);class cs extends y{render(){return r`
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
                        <div class="qr-code"><img src="${this.slide.right[1]}" /></div>
                        <p>${this.slide.right[2]} <span style="font-weight:bold;">${this.slide.right[3]}</span></p>
                    </div>
                </div>
            </div>
        `}}customElements.define("checkin-slide",cs);class ds extends y{render(){return r`
            <div class="cover">
                <div class="center activity-card" data-large>
                    <p>${this.slide.center[0]}</p>
                    <p>${this.slide.center[1]??""}</p>
                </div>
            </div>
        `}}customElements.define("congratulations-slide",ds);class hs extends y{render(){return r`
            <div class="two-column left">
                <div>
                    <div class="title-area">
                        <div class="title-icon">
                            <img src="https://placehold.co/60x60/png" />
                        </div>
                        <div class="stack">
                            <h2 class="title">${this.slide.left[0]}</h2>
                            <span class="subtitle">${this.slide.left[1]??""}</span>
                        </div>
                    </div>
                </div>
                <div class="content-area">
                    <div class="stack">
                        ${this.renderContent(this.slide.right)}
                    </div>
                </div>
            </div>
        `}}customElements.define("discuss-slide",hs);class us extends y{render(){return r`
            <div class="cover">
                <div class="center stack | text-center w-50">
                    <div class="w-30"><img src="${this.slide.center[0]}" /></div>
                    <p>${this.slide.center[1]}</p>
                    <div class="w-30"><img src="${this.slide.center[2]}" /></div>
                    <p>${this.slide.center[3]}</p>
                </div>
            </div>
        `}}customElements.define("final-slide",us);class ps extends y{render(){return r`
            <div class="two-column right">
                <div>
                    <div class="cover center text-center">
                        <p><strong>${this.slide.left[0]}</strong></p>
                        <div class="mw-60"><img src="${this.slide.left[1]}" /></div>
                    </div>
                </div>
                <div class="content-area">
                    <div class="stack center | text-center">
                        <div class="qr-code"><img src="${this.slide.right[0]}" /></div>
                        <p>${this.slide.right[1]}</p>
                    </div>
                </div>
            </div>
        `}}customElements.define("left-image-slide",ps);class ms extends y{render(){return r`
            <div class="cover">
                <h2 class="title text-center" data-small>${this.slide.center[0]}</h2>
                <div class="two-column middle">
                    <div>
                        <div class="stack align-items-center">
                            <p><strong>${this.slide.left[0]}</strong></p>
                            <div class="qr-code"><img src="${this.slide.left[2]}" /></div>
                            <p>${this.slide.left[1]}</p>
                        </div>
                    </div>
                    <div>
                        <div class="stack align-items-center">
                            <p><strong>${this.slide.right[0]}</strong></p>
                            <div class="qr-code"><img src="${this.slide.right[2]}" /></div>
                            <p>${this.slide.right[1]}</p>
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("next-steps-slide",ms);class gs extends y{render(){return r`
            <div class="obey-slide"></div>
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
        `}}customElements.define("obey-slide",gs);class vs extends y{render(){return r`
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
        `}}customElements.define("overview-slide",vs);class bs extends y{render(){return r`
            <div class="two-column left">
                <div>
                    <div class="title-area">
                        <div class="title-icon"><img src="https://placehold.co/60x60/png" /></div>
                        <div class="stack">
                            <h2 class="title">${this.slide.left[0]}</h2>
                            <span class="subtitle">${this.slide.left[1]}</span>
                        </div>
                    </div>
                </div>
                <div class="content-area">
                    <div class="activity-card" expanded-padding>
                        ${this.renderContent(this.slide.right)}
                    </div>
                </div>
            </div>
        `}}customElements.define("pray-slide",bs);class fs extends y{render(){return r`
            <div class="cover | title-slide | text-center">
                <div class="stack-1 | w-100">
                    <div class="center | w-40"><img src=${this.slide.center[0]} /></div>
                    <h2>${this.slide.center[1]}</h2>
                </div>
            </div>
        `}}customElements.define("title-slide",fs);class $s extends y{render(){return r`
            <iframe src="${this.slide.center[0]}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                    frameborder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
            >
            </iframe>
        `}}customElements.define("video-slide",$s);class _s extends y{render(){return r`
            <div class="two-column left">
                <div>
                    <div class="title-area">
                        <div class="title-icon">
                            <img src="https://placehold.co/60x60/png" />
                        </div>
                        <div class="stack">
                            <h2 class="title">${this.slide.left[0]}</h2>
                            <span class="subtitle">${this.slide.left[1]??""}</span>
                        </div>
                    </div>
                </div>
                <div class="content-area">
                    <div class="stack">
                        ${this.renderContent(this.slide.right,!0)}
                    </div>
                </div>
            </div>
        `}}customElements.define("watch-slide",_s);const Ne=["slideshow","guide"];class ys extends g{static get properties(){return{languageCode:{type:String},homeUrl:{type:String},assetsPath:{type:String},translations:{type:Object},zumeSessions:{attribute:!1},lessonIndex:{attribute:!1},view:{attribute:!1},linkNodes:{attribute:!1},showIndex:{attribute:!1}}}constructor(){super();const e=new URL(window.location.href),t=this.getZumeSessions(e);this.zumeSessions=t;const i=this.getLessonIndex(e);this.lessonIndex=i,this.view=this.getView(e),this.changeSession(i,!1,t),this.handleSessionLink=this.handleSessionLink.bind(this),this.handleHistoryPopState=this.handleHistoryPopState.bind(this),window.addEventListener("popstate",this.handleHistoryPopState),document.querySelectorAll(".language-selector").forEach(function(o){o.addEventListener("click",()=>{const n=o.dataset.value,h=new URL(location.href),c=h.pathname.substring(1).split("/");let d="";c.length>0&&jsObject.zume_languages.includes(c[0])?d=c.slice(1).join("/"):d=c.join("/"),n!=="en"?d="/"+n+"/"+d:d="/"+d,d+=h.search,location.href=d})})}getView(e){if(e.searchParams.has("view")){const t=e.searchParams.get("view");if(Ne.includes(t))return t}else return"slideshow"}getLessonIndex(e){if(e.searchParams.has("session")){const t=e.searchParams.get("session");if(t==="index")return"index";const i=Number(t);return Number.isInteger(i)?i-1:0}else return 0}getZumeSessions(e){const t=e.searchParams.get("type")||"10";this.type=t;let i;switch(t){case"10":i=zume10Sessions;break;case"20":i=zume20Sessions;break;case"intensive":i=zumeIntensiveSessions;break;default:i=zume10Sessions;break}return i}handleSessionLink(e){const t=e.target,i=Number(t.dataset.sessionNumber);this.lessonIndex=i,this.showIndex===!0&&(this.showIndex=!1),this.changeSession(this.lessonIndex)}getNextSession(){this.lessonIndex+=1,this.changeSession(this.lessonIndex)}getPreviousSession(){this.lessonIndex-=1,this.changeSession(this.lessonIndex)}changeSession(e,t=!0,i=null){if(e==="index"){this.showIndex=!0;return}else this.showIndex=!1;const a=i||this.zumeSessions;let o=e;e<0&&(o=0),e>a.length-1&&(o=a.length-1),this.lessonIndex=o,this.session=a[o],t&&this.pushHistory()}pushHistory(){const e=this.lessonIndex,t=this.view,i=new URL(window.location.href);e!==null&&Number.isInteger(e)&&i.searchParams.set("session",e+1),t&&i.searchParams.set("view",t),window.history.pushState(null,null,i.href)}handleHistoryPopState(){var a;const e=new URL(location.href),t=e.searchParams.has("session")?e.searchParams.get("session"):null,i=e.searchParams.get("view");(a=document.querySelector(".js-off-canvas-overlay"))==null||a.classList.remove("is-visible"),Number.isInteger(Number(t))&&(this.lessonIndex=t-1,this.changeSession(this.lessonIndex,!1)),t==="index"&&(this.lessonIndex="index",this.changeSession("index",!1)),i&&Ne.includes(i)&&(this.view=i)}getSessionTitle(){return!this.session||!this.session.t?"":this.session.t}getSessionSections(){return!this.session||!this.session.sections?[]:this.session.sections}switchViews(e=!0){console.log(this.view),this.view==="guide"?this.view="slideshow":this.view="guide",e===!0&&this.pushHistory({view:this.view})}openMenu(){const e=this.querySelector("#offCanvas");jQuery(e).foundation("open")}render(){const e=this.showIndex?"visually-hidden":"",t=this.type==="intensive"?"container-xsm":"container-sm";return r`
            ${this.showIndex?r`
                    <div class="course-index | bg-brand-gradient">
                        <img src="${jsObject.images_url}/zume-training-logo-white.svg" alt="Zume Logo" class="mx-auto w-70 py-1" />
                        <div class="${t}" data-max-width="750">
                            <div class="grid | grid-min-8rem gutter0">
                                ${this.zumeSessions.map((i,a)=>r`
                                    <button
                                        class="card-btn | bg-white black m--2 gap--3 aspect-1 justify-content-evenly"
                                        data-session-number=${a}
                                        @click=${this.handleSessionLink}
                                    >
                                        <h2 class="f-0 bold">Session</h2>
                                        <p class="f-3 bold lh-sm">${a+1}</p>
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
                        ${this.zumeSessions.map((i,a)=>r`
                            <button
                                class="link session-link"
                                data-session-number="${a}"
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
        `}createRenderRoot(){return this}}customElements.define("course-presenter",ys);class ws extends g{static get properties(){return{title:{type:String},sections:{type:Array}}}render(){return r`
            <div class="container">
                <h1 class="text-center">${this.title}</h1>
                ${this.sections.map((e,t)=>r`
                        <course-section .section=${e}></course-section>
                    `)}
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-guide",ws);class nt extends g{constructor(){super()}render(){return r`
            <div class="container">
                <div class="circle">
                    <div class="triangle"></div>
                </div>
            </div>
        `}}A(nt,"styles",vt`
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
    `);window.customElements.define("play-button",nt);class ks extends g{constructor(){super();A(this,"webShareSupported",!!window.navigator.share);A(this,"clipboardSupported",!!window.navigator.clipboard);this.shareFeedback="",this.copyFeedback=""}static get properties(){return{url:{type:String},title:{type:String},t:{type:Object},shareFeedback:{attribute:!1},copyFeedback:{attribute:!1}}}share(){navigator.share({title:this.title,url:this.url,text:title}).then(()=>{this.shareFeedback=this.t.share_feedback,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(t=>console.error("Error sharing",t))}copyLink(t){t.stopImmediatePropagation(),navigator.clipboard.writeText(this.url).then(()=>{this.copyFeedback=this.t.copy_feedback,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(i=>console.error(i))}noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported}render(){return r`
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
                          <button class="btn light uppercase" @click=${this.share}>
                            <!-- Share icon -->
                            <span>${this.t.share}</span>
                          </button>
                          <p role="alert" aria-live="polite" id="shareFeedback" class="context-alert" data-state=${this.shareFeedback.length?"":"empty"}>${this.shareFeedback}</p>
                        </div>
                    `:""}
                    ${this.clipboardSupported?r`
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
        `}createRenderRoot(){return this}}customElements.define("share-links",ks);class Ss extends g{static get properties(){return{t:{type:Object},joinLink:{type:String},loading:{attribute:!1},posts:{attribute:!1}}}constructor(){super(),this.loading=!0,this.plans=[],this.getTrainings(),this.renderRow=this.renderRow.bind(this)}getTrainings(){makeRequest("POST","public_plans",{},"zume_system/v1").then(e=>{this.plans=e}).catch(e=>{console.log(e)}).always(()=>{this.loading=!1})}render(){return this.loading?r`<span class="loading-spinner active"></span>`:r`
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
        `}renderRow({join_key:e,language_note:t,post_title:i,time_of_day_note:a,timezone_note:o,...n}){const h=n.set_a_01?"a":"b",c=h==="a"?10:20,d=`set_${h}_`,b=Date.now()/1e3;let p="";for(let m=1;m<c+1;m++){const v=m<10?`0${m}`:`${m}`,f=n[d+v];if(p=f.timestamp,b<f.timestamp)break}const u=moment(p*1e3).format("MMM Do 'YY");return r`
            <tr>
                <td data-label="${this.t.name}">${i}</td>
                <td data-label="${this.t.next_date}">${u}</td>
                <td data-label="${this.t.start_time}">${a}</td>
                <td data-label="${this.t.timezone}">${o}</td>
                <td data-label="${this.t.language}">${t}</td>
                <td><button class="btn" data-code=${e} @click=${this._handleJoinTraining}>${this.t.join}</button></td>
            </tr>
        `}_handleJoinTraining(e){console.log(e);const t=e.target.dataset.code,i=new CustomEvent("chosen-training",{bubbles:!0,detail:{code:t}});this.dispatchEvent(i)}createRenderRoot(){return this}}customElements.define("public-trainings",Ss);class ot extends g{static get properties(){return{radius:{type:Number},lineWidth:{type:Number},percent:{type:Number}}}constructor(){super(),this.radius=100,this.lineWidth=10,this.percent=30}width(){return this.radius*2+this.lineWidth}widthPx(){return this.appendPx(this.width())}center(){return this.width()/2}circumference(){return this.radius*2*Math.PI}circumferencePx(){return this.appendPx(this.circumference())}appendPx(e){return`${e}px`}rotate(e){return`rotate(${e}, ${this.center()}, ${this.center()})`}render(){return r`
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
        `}createRenderRoot(){return this}}customElements.define("progress-circle",ot);class xs extends ot{static get properties(){return{percent:{type:Number},type:{type:String}}}constructor(){super(),this.radius=50,this.lineWidth=15,this.percent=0,this.borderWidth=3,this.type="heard"}width(){return(this.radius+this.lineWidth)*2}getIconSvg(){switch(this.type){case"heard":return J`
                    <path d="M13.204,14.843c.157-3.465,2.622-6.151,6.05-6.593,3.602-.464,7.067,2.224,7.528,5.84.019.151.028.303.051.453.084.543.565.919,1.079.849.531-.073.901-.535.85-1.079-.09-.964-.299-1.902-.71-2.782-1.357-2.904-3.602-4.681-6.783-5.149-4.548-.67-8.841,2.255-9.775,6.729-.695,3.33-.03,6.397,2.327,8.963.781.85,1.668,1.601,2.472,2.43.534.551,1.049,1.131,1.495,1.754.496.692.669,1.505.631,2.364-.121,2.78,2.078,5.075,4.868,5.091,2.087.012,4.017-1.407,4.624-3.399.169-.553-.083-1.062-.614-1.24-.505-.169-1.018.085-1.21.625-.375,1.054-1.082,1.745-2.179,2.001-1.829.426-3.631-1.042-3.551-2.908.071-1.673-.427-3.158-1.526-4.394-.867-.975-1.835-1.861-2.774-2.772-1.174-1.139-2.156-2.394-2.584-4.011-.24-.909-.31-1.835-.271-2.771Z" stroke-width="0"></path>
                    <path d="M22.416,16.825c-1.639.344-2.761,1.916-2.613,3.472.179,1.88,1.39,3.263,3.162,3.601.237.045.486.086.722.059.502-.056.865-.512.837-.996-.029-.509-.412-.882-.953-.927-.921-.078-1.624-.699-1.795-1.587-.226-1.172.702-1.837,1.898-1.848.737-.007,1.224-.331,1.128-1.091-.055-.433-.488-1.081-2.385-.684Z" stroke-width="0"></path>
                `;case"obeyed":return J`
                    <path d="M21.57,18.138c-.204,1.02-.396,1.984-.589,2.948-.06.299-.116.599-.179.898-.012.057-.047.109-.087.195.117.163.256.361.4.556.397.536.795,1.072,1.194,1.606.743.993,1.239,2.082,1.465,3.316.261,1.422.608,2.829.922,4.241.183.825-.274,1.597-1.058,1.778-.783.18-1.554-.308-1.742-1.125-.279-1.212-.56-2.424-.804-3.643-.204-1.021-.594-1.958-1.176-2.812-.781-1.144-1.585-2.272-2.374-3.411-.254-.367-.481-.753-.74-1.117-.501-.703-.591-1.47-.421-2.296.247-1.201.478-2.406.716-3.609.003-.016.003-.033.006-.074-.05.04-.089.066-.123.097-.598.545-1.197,1.088-1.789,1.639-.062.057-.11.158-.115.242-.087,1.326-.165,2.653-.248,3.979-.041.641-.554,1.087-1.186,1.04-.6-.045-1.035-.574-.995-1.196.09-1.411.176-2.822.261-4.233.03-.498.222-.916.592-1.253,1.221-1.112,2.44-2.226,3.66-3.339.129-.118.246-.252.385-.356.381-.287.817-.384,1.283-.297.717.134,1.431.278,2.145.426.596.124,1.038.46,1.25,1.033.148.401.244.822.346,1.239.243.995.654,1.924,1.094,2.842.143.297.376.491.691.613.959.373,1.91.764,2.864,1.149.068.027.136.055.203.087.583.277.825.859.591,1.42-.224.536-.856.795-1.439.577-.392-.146-.777-.31-1.165-.465-.829-.332-1.655-.671-2.488-.994-.314-.122-.566-.312-.739-.594-.174-.284-.325-.582-.486-.874-.035-.063-.069-.126-.126-.232Z" stroke-width="0"></path>
                    <path d="M15.828,22.191c.259.402.497.772.735,1.142.48.747.962,1.492,1.437,2.242.041.065.066.158.057.233-.038.303-.09.604-.143.904-.098.559-.309,1.069-.618,1.547-.923,1.43-1.831,2.869-2.752,4.3-.552.858-1.767.912-2.364.114-.368-.492-.375-1.17-.015-1.736.694-1.093,1.366-2.201,2.093-3.272.688-1.014,1.054-2.129,1.231-3.324.098-.66.201-1.319.303-1.978.007-.044.018-.087.037-.174Z" stroke-width="0"></path>
                    <path d="M21.246,11.553c-1.455,0-2.629-1.176-2.629-2.635,0-1.455,1.178-2.631,2.634-2.631,1.456,0,2.636,1.174,2.64,2.628.004,1.46-1.176,2.637-2.645,2.638Z" stroke-width="0"></path>
                `;case"shared":return J`
                    <path d="M12.845,18.138c-.204,1.02-.396,1.984-.589,2.948-.06.299-.116.599-.179.898-.012.057-.047.109-.087.195.117.163.256.361.4.556.397.536.795,1.072,1.194,1.606.743.993,1.239,2.082,1.465,3.316.261,1.422.608,2.829.922,4.241.183.825-.274,1.597-1.058,1.778-.783.18-1.554-.308-1.742-1.125-.279-1.212-.56-2.424-.804-3.643-.204-1.021-.594-1.958-1.176-2.812-.781-1.144-1.585-2.272-2.374-3.411-.254-.367-.481-.753-.74-1.117-.501-.703-.591-1.47-.421-2.296.247-1.201.478-2.406.716-3.609.003-.016.003-.033.006-.074-.05.04-.089.066-.123.097-.598.545-1.197,1.088-1.789,1.639-.062.057-.11.158-.115.242-.087,1.326-.165,2.653-.248,3.979-.041.641-.554,1.087-1.186,1.04-.6-.045-1.035-.574-.995-1.196.09-1.411.176-2.822.261-4.233.03-.498.222-.916.592-1.253,1.221-1.112,2.44-2.226,3.66-3.339.129-.118.246-.252.385-.356.381-.287.817-.384,1.283-.297.717.134,1.431.278,2.145.426.596.124,1.038.46,1.25,1.033.148.401.244.822.346,1.239.243.995.654,1.924,1.094,2.842.143.297.376.491.691.613.959.373,1.91.764,2.864,1.149.068.027.136.055.203.087.583.277.825.859.591,1.42-.224.536-.856.795-1.439.577-.392-.146-.777-.31-1.165-.465-.829-.332-1.655-.671-2.488-.994-.314-.122-.566-.312-.739-.594-.174-.284-.325-.582-.486-.874-.035-.063-.069-.126-.126-.232Z" stroke-width="0"></path>
                    <path d="M7.102,22.191c.259.402.497.772.735,1.142.48.747.962,1.492,1.437,2.242.041.065.066.158.057.233-.038.303-.09.604-.143.904-.098.559-.309,1.069-.618,1.547-.923,1.43-1.831,2.869-2.752,4.3-.552.858-1.767.912-2.364.114-.368-.492-.375-1.17-.015-1.736.694-1.093,1.366-2.201,2.093-3.272.688-1.014,1.054-2.129,1.231-3.324.098-.66.201-1.319.303-1.978.007-.044.018-.087.037-.174Z" stroke-width="0"></path>
                    <path d="M12.521,11.553c-1.455,0-2.629-1.176-2.629-2.635,0-1.455,1.178-2.631,2.634-2.631,1.456,0,2.636,1.174,2.64,2.628.004,1.46-1.176,2.637-2.645,2.638Z" stroke-width="0"></path>
                    <path d="M27.155,18.138c.204,1.02.396,1.984.589,2.948.06.299.116.599.179.898.012.057.047.109.087.195-.117.163-.256.361-.4.556-.397.536-.795,1.072-1.194,1.606-.743.993-1.239,2.082-1.465,3.316-.261,1.422-.608,2.829-.922,4.241-.183.825.274,1.597,1.058,1.778.783.18,1.554-.308,1.742-1.125.279-1.212.56-2.424.804-3.643.204-1.021.594-1.958,1.176-2.812.781-1.144,1.585-2.272,2.374-3.411.254-.367.481-.753.74-1.117.501-.703.591-1.47.421-2.296-.247-1.201-.478-2.406-.716-3.609-.003-.016-.003-.033-.006-.074.05.04.089.066.123.097.598.545,1.197,1.088,1.789,1.639.062.057.11.158.115.242.087,1.326.165,2.653.248,3.979.041.641.554,1.087,1.186,1.04.6-.045,1.035-.574.995-1.196-.09-1.411-.176-2.822-.261-4.233-.03-.498-.222-.916-.592-1.253-1.221-1.112-2.44-2.226-3.66-3.339-.129-.118-.246-.252-.385-.356-.381-.287-.817-.384-1.283-.297-.717.134-1.431.278-2.145.426-.596.124-1.038.46-1.25,1.033-.148.401-.244.822-.346,1.239-.243.995-.654,1.924-1.094,2.842-.143.297-.376.491-.691.613-.959.373-1.91.764-2.864,1.149-.068.027-.136.055-.203.087-.583.277-.825.859-.591,1.42.224.536.856.795,1.439.577.392-.146.777-.31,1.165-.465.829-.332,1.655-.671,2.488-.994.314-.122.566-.312.739-.594.174-.284.325-.582.486-.874.035-.063.069-.126.126-.232Z" stroke-width="0"></path>
                    <path d="M32.898,22.191c-.259.402-.497.772-.735,1.142-.48.747-.962,1.492-1.437,2.242-.041.065-.066.158-.057.233.038.303.09.604.143.904.098.559.309,1.069.618,1.547.923,1.43,1.831,2.869,2.752,4.3.552.858,1.767.912,2.364.114.368-.492.375-1.17.015-1.736-.694-1.093-1.366-2.201-2.093-3.272-.688-1.014-1.054-2.129-1.231-3.324-.098-.66-.201-1.319-.303-1.978-.007-.044-.018-.087-.037-.174Z" stroke-width="0"></path>
                    <path d="M27.479,11.553c1.455,0,2.629-1.176,2.629-2.635,0-1.455-1.178-2.631-2.634-2.631-1.456,0-2.636,1.174-2.64,2.628-.004,1.46,1.176,2.637,2.645,2.638Z" stroke-width="0"></path>
                `;case"trained":return J`
                    <path d="M21.796,16.477c-.172.859-.334,1.671-.496,2.484-.05.252-.098.505-.151.757-.01.048-.04.091-.073.164.099.137.216.304.337.468.334.452.67.903,1.006,1.354.626.837,1.044,1.754,1.235,2.794.22,1.198.513,2.383.777,3.574.154.695-.231,1.346-.892,1.498-.659.152-1.31-.259-1.468-.948-.235-1.021-.472-2.042-.677-3.069-.172-.86-.5-1.649-.991-2.369-.658-.964-1.335-1.915-2-2.874-.214-.309-.405-.635-.624-.941-.422-.592-.498-1.238-.355-1.934.208-1.012.403-2.027.603-3.041.003-.014.003-.028.005-.063-.043.033-.075.056-.103.082-.504.459-1.009.917-1.508,1.381-.052.048-.092.133-.097.204-.074,1.117-.139,2.235-.209,3.353-.034.54-.467.916-.999.876-.506-.038-.872-.483-.838-1.008.076-1.189.148-2.378.22-3.567.025-.42.187-.772.499-1.056,1.029-.937,2.056-1.875,3.084-2.814.109-.099.207-.212.325-.3.321-.242.688-.324,1.081-.25.604.113,1.206.234,1.808.359.502.104.874.388,1.053.871.125.338.206.693.291,1.044.205.838.551,1.621.922,2.395.12.25.317.414.582.517.808.314,1.609.644,2.413.968.057.023.115.047.171.073.491.233.695.724.498,1.196-.188.452-.722.669-1.213.486-.33-.123-.655-.261-.982-.392-.698-.28-1.395-.565-2.096-.837-.265-.103-.477-.263-.623-.501-.147-.239-.274-.49-.409-.736-.029-.053-.058-.106-.107-.195Z" stroke-width="0"></path>
                    <path d="M16.958,19.892c.218.339.419.65.619.962.404.629.81,1.258,1.211,1.889.035.055.056.133.048.196-.032.255-.076.509-.12.762-.083.471-.261.901-.521,1.304-.778,1.205-1.543,2.417-2.319,3.623-.465.723-1.489.769-1.992.096-.31-.414-.316-.986-.013-1.462.585-.921,1.151-1.855,1.763-2.757.579-.854.888-1.794,1.037-2.8.082-.556.169-1.111.255-1.667.006-.037.016-.073.031-.147Z" stroke-width="0"></path>
                    <path d="M21.524,10.929c-1.226,0-2.215-.991-2.215-2.22,0-1.226.992-2.217,2.219-2.217,1.227,0,2.221.99,2.224,2.215.003,1.23-.991,2.222-2.229,2.222Z" stroke-width="0"></path>
                    <path d="M10.472,22.851c-.139.698-.271,1.357-.403,2.017-.041.205-.079.41-.122.614-.008.039-.032.074-.059.133.08.112.175.247.274.38.272.367.544.734.817,1.099.508.68.848,1.425,1.003,2.269.178.973.416,1.936.631,2.902.125.564-.187,1.093-.724,1.216-.536.123-1.063-.211-1.192-.77-.191-.829-.383-1.658-.55-2.492-.14-.699-.406-1.34-.805-1.924-.534-.783-1.084-1.555-1.624-2.334-.174-.251-.329-.515-.506-.764-.343-.481-.404-1.006-.288-1.571.169-.822.327-1.646.49-2.47.002-.011.002-.023.004-.051-.035.027-.061.045-.084.066-.409.373-.819.744-1.224,1.121-.042.039-.075.108-.079.166-.06.907-.113,1.815-.17,2.723-.028.439-.379.744-.812.711-.411-.031-.708-.393-.681-.818.062-.965.12-1.931.178-2.897.02-.341.152-.627.405-.857.835-.761,1.67-1.523,2.504-2.285.088-.081.168-.172.264-.244.261-.197.559-.263.878-.203.49.092.979.19,1.468.291.408.085.71.315.855.707.102.274.167.563.237.848.167.681.447,1.317.749,1.945.098.203.257.336.472.42.656.255,1.307.523,1.959.786.047.019.093.038.139.059.399.189.565.588.404.971-.153.367-.586.544-.985.395-.268-.1-.532-.212-.797-.318-.567-.227-1.133-.459-1.702-.68-.215-.084-.387-.214-.506-.407-.119-.194-.222-.398-.332-.598-.024-.043-.047-.086-.087-.159Z" stroke-width="0"></path>
                    <path d="M6.543,25.624c.177.275.34.528.503.782.328.511.658,1.021.983,1.534.028.044.045.108.039.159-.026.207-.062.413-.098.619-.067.382-.212.732-.423,1.059-.631.978-1.253,1.963-1.883,2.942-.378.587-1.209.624-1.618.078-.252-.336-.257-.8-.011-1.188.475-.748.935-1.506,1.432-2.239.471-.694.721-1.457.843-2.274.067-.451.138-.902.207-1.353.005-.03.013-.06.025-.119Z" stroke-width="0"></path>
                    <path d="M10.251,18.345c-.996,0-1.799-.804-1.799-1.803,0-.995.806-1.8,1.802-1.801.996,0,1.804.804,1.806,1.798.003.999-.805,1.804-1.81,1.805Z" stroke-width="0"></path>
                    <path d="M31.677,22.851c-.139.698-.271,1.357-.403,2.017-.041.205-.079.41-.122.614-.008.039-.032.074-.059.133.08.112.175.247.274.38.272.367.544.734.817,1.099.508.68.848,1.425,1.003,2.269.178.973.416,1.936.631,2.902.125.564-.187,1.093-.724,1.216-.536.123-1.063-.211-1.192-.77-.191-.829-.383-1.658-.55-2.492-.14-.699-.406-1.34-.805-1.924-.534-.783-1.084-1.555-1.624-2.334-.174-.251-.329-.515-.506-.764-.343-.481-.404-1.006-.288-1.571.169-.822.327-1.646.49-2.47.002-.011.002-.023.004-.051-.035.027-.061.045-.084.066-.409.373-.819.744-1.224,1.121-.042.039-.075.108-.079.166-.06.907-.113,1.815-.17,2.723-.028.439-.379.744-.812.711-.411-.031-.708-.393-.681-.818.062-.965.12-1.931.178-2.897.02-.341.152-.627.405-.857.835-.761,1.67-1.523,2.504-2.285.088-.081.168-.172.264-.244.261-.197.559-.263.878-.203.49.092.979.19,1.468.291.408.085.71.315.855.707.102.274.167.563.237.848.167.681.447,1.317.749,1.945.098.203.257.336.472.42.656.255,1.307.523,1.959.786.047.019.093.038.139.059.399.189.565.588.404.971-.153.367-.586.544-.985.395-.268-.1-.532-.212-.797-.318-.567-.227-1.133-.459-1.702-.68-.215-.084-.387-.214-.506-.407-.119-.194-.222-.398-.332-.598-.024-.043-.047-.086-.087-.159Z" stroke-width="0"></path>
                    <path d="M27.747,25.624c.177.275.34.528.503.782.328.511.658,1.021.983,1.534.028.044.045.108.039.159-.026.207-.062.413-.098.619-.067.382-.212.732-.423,1.059-.631.978-1.253,1.963-1.883,2.942-.378.587-1.209.624-1.618.078-.252-.336-.257-.8-.011-1.188.475-.748.935-1.506,1.432-2.239.471-.694.721-1.457.843-2.274.067-.451.138-.902.207-1.353.005-.03.013-.06.025-.119Z" stroke-width="0"></path>
                    <path d="M31.455,18.345c-.996,0-1.799-.804-1.799-1.803,0-.995.806-1.8,1.802-1.801.996,0,1.804.804,1.806,1.798.003.999-.805,1.804-1.81,1.805Z" stroke-width="0"></path>
                `}}iconSize(){return this.width()/2}iconPosition(){const e=(this.width()-this.iconSize())/2;return[e,e]}render(){const e=this.iconSize(),[t,i]=this.iconPosition();return r`
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
                        y=${i}
                        viewBox="0 0 40 40"
                    >
                        ${this.getIconSvg()}
                    </svg>
                </svg>
            </div>
        `}createRenderRoot(){return this}}customElements.define("host-progress-circle",xs);
//# sourceMappingURL=main-9514dacf.js.map
