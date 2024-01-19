var Re=Object.defineProperty;var Oe=(i,e,t)=>e in i?Re(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var E=(i,e,t)=>(Oe(i,typeof e!="symbol"?e+"":e,t),t),Y=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)};var S=(i,e,t)=>(Y(i,e,"read from private field"),t?t.call(i):e.get(i)),C=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},G=(i,e,t,s)=>(Y(i,e,"write to private field"),s?s.call(i,t):e.set(i,t),t);var P=(i,e,t)=>(Y(i,e,"access private method"),t);import{createApp as je}from"https://unpkg.com/petite-vue?module";var _,V,we,J,Ee,Z,xe,U,ne;class ke{constructor(e){C(this,V);C(this,J);C(this,Z);C(this,U);E(this,"WIZARD_STATE_NAME","zume_wizard_state");E(this,"STALE_LIFESPAN",10*60*1e3);E(this,"MAX_LIFESPAN",60*60*1e3);C(this,_,void 0);this.moduleName=e,G(this,_,P(this,V,we).call(this))}empty(){return Object.keys(S(this,_).data).length===0}isDataStale(){return P(this,U,ne).call(this,S(this,_),this.STALE_LIFESPAN)}get(e){return S(this,_).data[e]}getAll(){return S(this,_).data}add(e,t){S(this,_).data[e]=t,P(this,Z,xe).call(this),localStorage.setItem(this.WIZARD_STATE_NAME,JSON.stringify(S(this,_)))}clear(){G(this,_,null),localStorage.removeItem(this.WIZARD_STATE_NAME)}}_=new WeakMap,V=new WeakSet,we=function(){const e=P(this,J,Ee).call(this);return e&&!P(this,U,ne).call(this,e,this.MAX_LIFESPAN)?e:{module:this.moduleName,data:{},timestamp:Date.now()}},J=new WeakSet,Ee=function(){return JSON.parse(localStorage.getItem(this.WIZARD_STATE_NAME))},Z=new WeakSet,xe=function(){S(this,_).timestamp=Date.now()},U=new WeakSet,ne=function(e,t){return Date.now()-e.timestamp>t};const v={gettingStarted:"getting-started",makeAGroup:"make-a-group",getACoach:"get-a-coach",joinAPlan:"join-a-training",connectWithFriend:"connect-with-friend",joinFriendsPlan:"join-friends-training",checkin:"checkin"},m={completeProfile:"completeProfile",makePlan:"makePlan",inviteFriends:"inviteFriends",getACoach:"getACoach",joinTraining:"joinTraining",connectFriend:"connectFriend",joinFriendsTraining:"joinFriendsTraining",checkin:"checkin",planDecision:"planDecision"},Ie={howManySessions:"how-many-sessions",whatTimeOfDay:"what-time-of-day",howOften:"how-often",startDate:"what-start-date"},r={updateName:"update-your-name",updateLocation:"update-your-location",updatePhone:"update-your-phone",inviteFriends:"invite-friends",contactPreferences:"contact-preferences",languagePreferences:"preferred-language",howCanWeServe:"how-can-we-serve",connectingToCoach:"connecting-to-coach",joinTraining:"join-training",connectToFriend:"connect-friend",joinFriendsPlan:"join-friends-training",checkinSubmit:"checkin-submit",...Ie},Le={[r.updateName]:{field:"name",testExistance:(i,e)=>e.has_set_name},[r.updateLocation]:{field:"location",testExistance:i=>!(i.source&&i.source==="ip")},[r.updatePhone]:{field:"phone",testExistance:i=>!!i}};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const q=window,oe=q.ShadowRoot&&(q.ShadyCSS===void 0||q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,le=Symbol(),he=new WeakMap;let Ae=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==le)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(oe&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=he.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&he.set(t,e))}return e}toString(){return this.cssText}};const ze=i=>new Ae(typeof i=="string"?i:i+"",void 0,le),Ne=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((s,n,o)=>s+(l=>{if(l._$cssResult$===!0)return l.cssText;if(typeof l=="number")return l;throw Error("Value passed to 'css' function must be a 'css' function result: "+l+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[o+1],i[0]);return new Ae(t,i,le)},Fe=(i,e)=>{oe?i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const s=document.createElement("style"),n=q.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=t.cssText,i.appendChild(s)})},ce=oe?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return ze(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var X;const W=window,de=W.trustedTypes,Ue=de?de.emptyScript:"",ue=W.reactiveElementPolyfillSupport,ae={toAttribute(i,e){switch(e){case Boolean:i=i?Ue:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},Ce=(i,e)=>e!==i&&(e==e||i==i),Q={attribute:!0,type:String,converter:ae,reflect:!1,hasChanged:Ce};let M=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,s)=>{const n=this._$Ep(s,t);n!==void 0&&(this._$Ev.set(n,s),e.push(n))}),e}static createProperty(e,t=Q){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const s=typeof e=="symbol"?Symbol():"__"+e,n=this.getPropertyDescriptor(e,s,t);n!==void 0&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(n){const o=this[e];this[t]=n,this.requestUpdate(e,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Q}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,s=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const n of s)this.createProperty(n,t[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const n of s)t.unshift(ce(n))}else e!==void 0&&t.push(ce(e));return t}static _$Ep(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,s;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((s=e.hostConnected)===null||s===void 0||s.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Fe(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var s;return(s=t.hostConnected)===null||s===void 0?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var s;return(s=t.hostDisconnected)===null||s===void 0?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$EO(e,t,s=Q){var n;const o=this.constructor._$Ep(e,s);if(o!==void 0&&s.reflect===!0){const l=(((n=s.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?s.converter:ae).toAttribute(t,s.type);this._$El=e,l==null?this.removeAttribute(o):this.setAttribute(o,l),this._$El=null}}_$AK(e,t){var s;const n=this.constructor,o=n._$Ev.get(e);if(o!==void 0&&this._$El!==o){const l=n.getPropertyOptions(o),u=typeof l.converter=="function"?{fromAttribute:l.converter}:((s=l.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?l.converter:ae;this._$El=o,this[o]=u.fromAttribute(t,l.type),this._$El=null}}requestUpdate(e,t,s){let n=!0;e!==void 0&&(((s=s||this.constructor.getPropertyOptions(e)).hasChanged||Ce)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),s.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,s))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((n,o)=>this[o]=n),this._$Ei=void 0);let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),(e=this._$ES)===null||e===void 0||e.forEach(n=>{var o;return(o=n.hostUpdate)===null||o===void 0?void 0:o.call(n)}),this.update(s)):this._$Ek()}catch(n){throw t=!1,this._$Ek(),n}t&&this._$AE(s)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(s=>{var n;return(n=s.hostUpdated)===null||n===void 0?void 0:n.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,s)=>this._$EO(s,this[s],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};M.finalized=!0,M.elementProperties=new Map,M.elementStyles=[],M.shadowRootOptions={mode:"open"},ue==null||ue({ReactiveElement:M}),((X=W.reactiveElementVersions)!==null&&X!==void 0?X:W.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ee;const B=window,O=B.trustedTypes,pe=O?O.createPolicy("lit-html",{createHTML:i=>i}):void 0,re="$lit$",k=`lit$${(Math.random()+"").slice(9)}$`,Pe="?"+k,He=`<${Pe}>`,j=document,z=()=>j.createComment(""),N=i=>i===null||typeof i!="object"&&typeof i!="function",De=Array.isArray,qe=i=>De(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",te=`[ 	
\f\r]`,L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ge=/-->/g,me=/>/g,x=RegExp(`>|${te}(?:([^\\s"'>=/]+)(${te}*=${te}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),$e=/'/g,be=/"/g,Te=/^(?:script|style|textarea|title)$/i,We=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),a=We(1),y=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),fe=new WeakMap,R=j.createTreeWalker(j,129,null,!1),Be=(i,e)=>{const t=i.length-1,s=[];let n,o=e===2?"<svg>":"",l=L;for(let c=0;c<t;c++){const h=i[c];let f,d,g=-1,b=0;for(;b<h.length&&(l.lastIndex=b,d=l.exec(h),d!==null);)b=l.lastIndex,l===L?d[1]==="!--"?l=ge:d[1]!==void 0?l=me:d[2]!==void 0?(Te.test(d[2])&&(n=RegExp("</"+d[2],"g")),l=x):d[3]!==void 0&&(l=x):l===x?d[0]===">"?(l=n??L,g=-1):d[1]===void 0?g=-2:(g=l.lastIndex-d[2].length,f=d[1],l=d[3]===void 0?x:d[3]==='"'?be:$e):l===be||l===$e?l=x:l===ge||l===me?l=L:(l=x,n=void 0);const A=l===x&&i[c+1].startsWith("/>")?" ":"";o+=l===L?h+He:g>=0?(s.push(f),h.slice(0,g)+re+h.slice(g)+k+A):h+k+(g===-2?(s.push(void 0),c):A)}const u=o+(i[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return[pe!==void 0?pe.createHTML(u):u,s]};class F{constructor({strings:e,_$litType$:t},s){let n;this.parts=[];let o=0,l=0;const u=e.length-1,c=this.parts,[h,f]=Be(e,t);if(this.el=F.createElement(h,s),R.currentNode=this.el.content,t===2){const d=this.el.content,g=d.firstChild;g.remove(),d.append(...g.childNodes)}for(;(n=R.nextNode())!==null&&c.length<u;){if(n.nodeType===1){if(n.hasAttributes()){const d=[];for(const g of n.getAttributeNames())if(g.endsWith(re)||g.startsWith(k)){const b=f[l++];if(d.push(g),b!==void 0){const A=n.getAttribute(b.toLowerCase()+re).split(k),w=/([.?@])?(.*)/.exec(b);c.push({type:1,index:o,name:w[2],strings:A,ctor:w[1]==="."?Je:w[1]==="?"?Ke:w[1]==="@"?Ye:K})}else c.push({type:6,index:o})}for(const g of d)n.removeAttribute(g)}if(Te.test(n.tagName)){const d=n.textContent.split(k),g=d.length-1;if(g>0){n.textContent=O?O.emptyScript:"";for(let b=0;b<g;b++)n.append(d[b],z()),R.nextNode(),c.push({type:2,index:++o});n.append(d[g],z())}}}else if(n.nodeType===8)if(n.data===Pe)c.push({type:2,index:o});else{let d=-1;for(;(d=n.data.indexOf(k,d+1))!==-1;)c.push({type:7,index:o}),d+=k.length-1}o++}}static createElement(e,t){const s=j.createElement("template");return s.innerHTML=e,s}}function I(i,e,t=i,s){var n,o,l,u;if(e===y)return e;let c=s!==void 0?(n=t._$Co)===null||n===void 0?void 0:n[s]:t._$Cl;const h=N(e)?void 0:e._$litDirective$;return(c==null?void 0:c.constructor)!==h&&((o=c==null?void 0:c._$AO)===null||o===void 0||o.call(c,!1),h===void 0?c=void 0:(c=new h(i),c._$AT(i,t,s)),s!==void 0?((l=(u=t)._$Co)!==null&&l!==void 0?l:u._$Co=[])[s]=c:t._$Cl=c),c!==void 0&&(e=I(i,c._$AS(i,e.values),c,s)),e}class Ve{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:s},parts:n}=this._$AD,o=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:j).importNode(s,!0);R.currentNode=o;let l=R.nextNode(),u=0,c=0,h=n[0];for(;h!==void 0;){if(u===h.index){let f;h.type===2?f=new H(l,l.nextSibling,this,e):h.type===1?f=new h.ctor(l,h.name,h.strings,this,e):h.type===6&&(f=new Ge(l,this,e)),this._$AV.push(f),h=n[++c]}u!==(h==null?void 0:h.index)&&(l=R.nextNode(),u++)}return o}v(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class H{constructor(e,t,s,n){var o;this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=n,this._$Cp=(o=n==null?void 0:n.isConnected)===null||o===void 0||o}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=I(this,e,t),N(e)?e===$||e==null||e===""?(this._$AH!==$&&this._$AR(),this._$AH=$):e!==this._$AH&&e!==y&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):qe(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==$&&N(this._$AH)?this._$AA.nextSibling.data=e:this.$(j.createTextNode(e)),this._$AH=e}g(e){var t;const{values:s,_$litType$:n}=e,o=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=F.createElement(n.h,this.options)),n);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===o)this._$AH.v(s);else{const l=new Ve(o,this),u=l.u(this.options);l.v(s),this.$(u),this._$AH=l}}_$AC(e){let t=fe.get(e.strings);return t===void 0&&fe.set(e.strings,t=new F(e)),t}T(e){De(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,n=0;for(const o of e)n===t.length?t.push(s=new H(this.k(z()),this.k(z()),this,this.options)):s=t[n],s._$AI(o),n++;n<t.length&&(this._$AR(s&&s._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,t);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class K{constructor(e,t,s,n,o){this.type=1,this._$AH=$,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=$}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,s,n){const o=this.strings;let l=!1;if(o===void 0)e=I(this,e,t,0),l=!N(e)||e!==this._$AH&&e!==y,l&&(this._$AH=e);else{const u=e;let c,h;for(e=o[0],c=0;c<o.length-1;c++)h=I(this,u[s+c],t,c),h===y&&(h=this._$AH[c]),l||(l=!N(h)||h!==this._$AH[c]),h===$?e=$:e!==$&&(e+=(h??"")+o[c+1]),this._$AH[c]=h}l&&!n&&this.j(e)}j(e){e===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Je extends K{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===$?void 0:e}}const Ze=O?O.emptyScript:"";class Ke extends K{constructor(){super(...arguments),this.type=4}j(e){e&&e!==$?this.element.setAttribute(this.name,Ze):this.element.removeAttribute(this.name)}}class Ye extends K{constructor(e,t,s,n,o){super(e,t,s,n,o),this.type=5}_$AI(e,t=this){var s;if((e=(s=I(this,e,t,0))!==null&&s!==void 0?s:$)===y)return;const n=this._$AH,o=e===$&&n!==$||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,l=e!==$&&(n===$||o);o&&this.element.removeEventListener(this.name,this,n),l&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,s;typeof this._$AH=="function"?this._$AH.call((s=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&s!==void 0?s:this.element,e):this._$AH.handleEvent(e)}}class Ge{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){I(this,e)}}const ve=B.litHtmlPolyfillSupport;ve==null||ve(F,H),((ee=B.litHtmlVersions)!==null&&ee!==void 0?ee:B.litHtmlVersions=[]).push("2.7.3");const Xe=(i,e,t)=>{var s,n;const o=(s=t==null?void 0:t.renderBefore)!==null&&s!==void 0?s:e;let l=o._$litPart$;if(l===void 0){const u=(n=t==null?void 0:t.renderBefore)!==null&&n!==void 0?n:null;o._$litPart$=l=new H(e.insertBefore(z(),u),u,void 0,t??{})}return l._$AI(i),l};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var se,ie;let p=class extends M{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const s=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=s.firstChild),s}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Xe(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return y}};p.finalized=!0,p._$litElement$=!0,(se=globalThis.litElementHydrateSupport)===null||se===void 0||se.call(globalThis,{LitElement:p});const _e=globalThis.litElementPolyfillSupport;_e==null||_e({LitElement:p});((ie=globalThis.litElementVersions)!==null&&ie!==void 0?ie:globalThis.litElementVersions=[]).push("3.3.2");class Qe extends p{static get properties(){return{type:{type:String},finishUrl:{type:String},user:{type:Object},step:{attribute:!1},steps:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.stepIndex=0,this.steps=[],this.modules={},this.step={},this.t=window.SHAREDFUNCTIONS.escapeObject(jsObject.translations),this._handleHistoryPopState=this._handleHistoryPopState.bind(this),window.addEventListener("popstate",this._handleHistoryPopState),this.stateManager=new ke}render(){if(!this.isWizardLoaded()){const e=this.getWizard(this.type);this.loadWizard(e),this._handleHistoryPopState(!0)}return this.steps.length===0?a`
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
        `}containerSize(){const e=this.steps[this.stepIndex];return(e.slug=r.joinTraining)?"container-md":"container-xsm"}currentStep(){const e=this.steps[this.stepIndex];return e.component(e,this.t,"w-100")}headerButtons(){const{skippable:e}=this.step,t=this.stepIndex===this.steps.length-1;return a`
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
        `}footer(){return this.stepIndex===this.steps.length-1?this.finishButton():""}_onBack(){if(this.stepIndex>0){const e=this.stepIndex-1;this._gotoStep(e)}}_onNext(){if(this.stepIndex+1<this.steps.length){const e=this.stepIndex+1;this._gotoStep(e)}else this._onFinish()}_onSkip(){const e=this.step.module;for(let t=this.stepIndex+1;t<this.steps.length;t++)if(this.steps[t].module!==e){this._gotoStep(t);return}this._onFinish()}_onQuit(){this._onFinish(!0)}_onFinish(e=!1){this.stateManager.clear(),this.finishUrl||(window.location.href="/");const t=new URL(this.finishUrl);e||(this.type===v.checkin?t.searchParams.set("completed",this.type):t.searchParams.set("completed",this.type)),window.location.href=t}_gotoStep(e,t=!0){if(this.steps.length!==0&&(this.stepIndex=this.clampSteps(e),this.step=this.steps[this.stepIndex],t)){const s=new URL(window.location.href),n=s.pathname.split("/"),o=n[n.length-1];let l="";Object.values(v).includes(o)?l=n.join("/")+"/"+this.step.slug+s.search:l=n.slice(0,-1).join("/")+"/"+this.step.slug+s.search,window.history.pushState(null,null,l)}}clampSteps(e){let t=e;return e>this.steps.length-1&&(t=this.steps.length-1),e<0&&(t=0),t}_handleHistoryPopState(e=!1){const s=new URL(window.location.href).pathname.split("/"),n=s[s.length-1];Object.values(v).includes(n)&&this._gotoStep(0,!1);let o="",l=0;this.steps.forEach(({slug:u,module:c},h)=>{if(o!==c&&(o=c,l=h),n===u){if(e===!0&&this.stateManager.isDataStale()){this._gotoStep(l);return}this._gotoStep(h,!1)}})}_handlePlanDecision(e){switch(e.target.dataset.decision){case"make":this.updateWizard(v.makeAGroup);break;case"join":this.updateWizard(v.joinAPlan);break;case"skip":default:this._onSkip();break}}_handleLoading(e){const{loading:t}=e.detail;this.loading=t}makeModule(e=[],t=!1){const s={steps:[],skippable:t};return e.forEach(n=>{Object.keys(D).includes(n)&&s.steps.push(D[n])}),s}getModule(e,t=!1){const s={[m.completeProfile]:{steps:[D[r.updateName],D[r.updateLocation]],skippable:t},[m.planDecision]:{steps:[{slug:"plan-decision",component:(o,l,u)=>a`
                            <div class=${`stack ${u}`}>
                                <h2>Join or start a training</h2>
                                <button class="btn" data-decision="make" @click=${this._handlePlanDecision}>Start a training</button>
                                <button class="btn" data-decision="join" @click=${this._handlePlanDecision}>Join a public training</button>
                                <button class="btn outline" data-decision="skip" @click=${this._handlePlanDecision}>Skip for now</button>
                            </div>
                        `}],skippable:t},[m.makePlan]:this.makeModule([r.howManySessions,r.whatTimeOfDay,r.howOften,r.startDate,r.inviteFriends],t),[m.inviteFriends]:{steps:[D[r.inviteFriends]],skippable:t},[m.joinTraining]:{steps:[D[r.joinTraining]]}};return Object.keys(s).includes(e)?s[e]:s[m.completeProfile]}isWizardLoaded(){return Object.keys(this.modules).length!==0}loadWizard(e,t=!1){this.modules=e,t===!1&&(this.steps=[],this.stepIndex=0),Object.entries(this.modules).forEach(([s,{steps:n,skippable:o}])=>{const l=zumeProfile.profile;n.forEach(({component:u,slug:c})=>{const h=Le[c];let f=null;if(h&&l){if(h.testExistance(l[h.field],l))return;f=l[h.field]}const d={component:u,slug:c,module:s,skippable:o,doneHandler:this._onNext,handleLoading:this._handleLoading};f!==null&&(d.value=f),this.steps.push(d)})}),t===!1&&this._gotoStep(0)}updateWizard(e){const t=this.getWizard(e);Object.keys(t).length!==0&&this.loadWizard(t)}isWizardTypeValid(e){return!!Object.values(v).includes(e)}getWizard(e){return this.isWizardTypeValid(e)?{[v.gettingStarted]:{[m.completeProfile]:this.makeModule([r.updateName,r.updateLocation],!0),[m.planDecision]:this.getModule(m.planDecision)},[v.makeAGroup]:{[m.makePlan]:this.getModule(m.makePlan)},[v.getACoach]:{[m.completeProfile]:this.makeModule([r.updateName,r.updateLocation,r.updatePhone]),[m.getACoach]:this.makeModule([r.contactPreferences,r.languagePreferences,r.howCanWeServe,r.connectingToCoach])},[v.joinAPlan]:{[m.completeProfile]:this.makeModule([r.updateName,r.updateLocation,r.updatePhone]),[m.joinTraining]:this.getModule(m.joinTraining)},[v.connectWithFriend]:{[m.completeProfile]:this.makeModule([r.updateName,r.updateLocation],!0),[m.connectFriend]:this.makeModule([r.connectToFriend])},[v.joinFriendsPlan]:{[m.completeProfile]:this.makeModule([r.updateName,r.updateLocation],!0),[m.joinFriendsTraining]:this.makeModule([r.joinFriendsPlan])},[v.checkin]:{[m.checkin]:this.makeModule([r.checkinSubmit])}}[e]:{}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._handleHistoryPopState)}createRenderRoot(){return this}}window.customElements.define("zume-wizard",Qe);const D={[r.updateName]:{slug:r.updateName,component:(i,e,t)=>a`
            <complete-profile
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.complete_profile}"
                variant=${r.updateName}
                @done-step=${i.doneHandler}
                value=${JSON.stringify(i.value)}
            ></complete-profile>
        `},[r.updateLocation]:{slug:r.updateLocation,component:(i,e,t)=>a`
            <complete-profile
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.complete_profile}"
                variant=${r.updateLocation}
                @done-step=${i.doneHandler}
                value=${JSON.stringify(i.value)}
            ></complete-profile>
        `},[r.updatePhone]:{slug:r.updatePhone,component:(i,e,t)=>a`
            <complete-profile
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.complete_profile}"
                variant=${r.updatePhone}
                @done-step=${i.doneHandler}
                value=${JSON.stringify(i.value)}
            ></complete-profile>
        `},[r.contactPreferences]:{slug:r.contactPreferences,component:(i,e,t)=>a`
            <request-coach
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.get_a_coach}"
                variant=${r.contactPreferences}
                @done-step=${i.doneHandler}
            ></request-coach>
        `},[r.languagePreferences]:{slug:r.languagePreferences,component:(i,e,t)=>a`
            <request-coach
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.get_a_coach}"
                variant=${r.languagePreferences}
                @done-step=${i.doneHandler}
            ></request-coach>
        `},[r.howCanWeServe]:{slug:r.howCanWeServe,component:(i,e,t)=>a`
            <request-coach
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.get_a_coach}"
                variant=${r.howCanWeServe}
                @done-step=${i.doneHandler}
            ></request-coach>
        `},[r.connectingToCoach]:{slug:r.connectingToCoach,component:(i,e,t)=>a`
            <request-coach
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${e.get_a_coach}"
                variant=${r.connectingToCoach}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></request-coach>
        `},[r.inviteFriends]:{slug:r.inviteFriends,component:(i,e,t)=>a`
            <invite-friends
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.share}
            ></invite-friends>
        `},[r.joinTraining]:{slug:r.joinTraining,component:(i,e,t)=>a`
            <join-training
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.join_training}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></join-training>
        `},[r.joinFriendsPlan]:{slug:r.joinFriendsPlan,component:(i,e,t)=>a`
            <join-friends-training
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.join_training}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></join-friends-training>
        `},[r.connectToFriend]:{slug:r.connectToFriend,component:(i,e,t)=>a`
            <connect-friend
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.connect_friend}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></connect-friend>
        `},[r.checkinSubmit]:{slug:r.checkinSubmit,component:(i,e,t)=>a`
            <session-checkin
                class=${t}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.checkin}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></session-checkin>
        `},[r.howManySessions]:{slug:r.howManySessions,component:(i,e,t)=>a`
            <make-group
                class=${t}
                name=${i.slug}
                module=${i.module}
                variant=${r.howManySessions}
                ?skippable=${i.skippable}
                .t=${e.checkin}
                @done-step=${i.doneHandler}
            ></make-group>
        `},[r.whatTimeOfDay]:{slug:r.whatTimeOfDay,component:(i,e,t)=>a`
            <make-group
                class=${t}
                name=${i.slug}
                module=${i.module}
                variant=${r.whatTimeOfDay}
                ?skippable=${i.skippable}
                .t=${e.checkin}
                @done-step=${i.doneHandler}
            ></make-group>
        `},[r.howOften]:{slug:r.howOften,component:(i,e,t)=>a`
            <make-group
                class=${t}
                name=${i.slug}
                module=${i.module}
                variant=${r.howOften}
                ?skippable=${i.skippable}
                .t=${e.checkin}
                @done-step=${i.doneHandler}
            ></make-group>
        `},[r.startDate]:{slug:r.startDate,component:(i,e,t)=>a`
            <make-group
                class=${t}
                name=${i.slug}
                module=${i.module}
                variant=${r.startDate}
                ?skippable=${i.skippable}
                .t=${e.checkin}
                @done-step=${i.doneHandler}
            ></make-group>
        `}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},et=i=>(...e)=>({_$litDirective$:i,values:e});class tt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const st=i=>i.strings===void 0,it={},nt=(i,e=it)=>i._$AH=e;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const at=et(class extends tt{constructor(i){if(super(i),i.type!==T.PROPERTY&&i.type!==T.ATTRIBUTE&&i.type!==T.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!st(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[e]){if(e===y||e===$)return e;const t=i.element,s=i.name;if(i.type===T.PROPERTY){if(e===t[s])return y}else if(i.type===T.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(s))return y}else if(i.type===T.ATTRIBUTE&&t.getAttribute(s)===e+"")return y;return nt(i),e}});class rt extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},value:{type:String},locations:{attribute:!1},locationError:{attribute:!1},phoneError:{attribute:!1},city:{attribute:!1},loading:{attribute:!1},state:{attribute:!1},localValue:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.locations=[],this.locationError="",this.city="",this.loading=!1,this.localValue="",this.phoneError="",this._clearLocations=this._clearLocations.bind(this),this._handleSuggestions=this._handleSuggestions.bind(this),this._debounceCityChange=debounce(getAddressSuggestions(this._handleSuggestions,zumeProfile.map_key)).bind(this),this._handleCityInputChange=this._handleCityInputChange.bind(this)}firstUpdated(){this.renderRoot.querySelector(".inputs input").focus(),this.value!==""&&(this.localValue=JSON.parse(this.value))}render(){var e;return a`
        <form class="inputs stack" @submit=${this._handleSubmit}>
            ${this.variant===r.updateName?a`
                <h2>${this.t.name_question}</h2>
                <div class="">
                    <label for="name">${this.t.name}</label>
                    <input class="input" type="text" id="name" name="name" value=${this.localValue} ?required=${!this.skippable}>
                </div>
            `:""}

            ${this.variant===r.updatePhone?a`
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

            ${this.variant===r.updateLocation?a`
                <h2>${this.t.location_question}</h2>
                <div class="form-group">
                    <label class="input-label" for="city">${this.t.city}</label>
                    <input
                        class="input"
                        type="text"
                        id="city"
                        name="city"
                        .value="${this.city?at(this.city):(e=this.localValue)==null?void 0:e.label}"
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
            ${[r.updatePhone,r.updateName].includes(this.variant)?a`
                <div class="cluster | mx-auto">
                    <button type="submit" class="btn" ?disabled=${this.loading}>${this.t.next}</button>
                    <span class="loading-spinner ${this.loading?"active":""}"></span>
                </div>
            `:""}
        </form>
        `}_handleInput(e){this.phoneError=""}_handleInvalid(e){e.preventDefault(),this.phoneError=this.t.phone_error}_handleSubmit(e){e.preventDefault(),e.srcElement.querySelector("#city")?this._handleSubmitLocation():this._handleDone(e)}_handleDone(e){e&&e.preventDefault();const t=e.target[0];if(t.type==="submit")return;let{name:s,value:n}=t;t.type==="tel"&&(n=t.value.replace(/[\(\)\-\s]/g,"")),this._updateProfile(s,n,()=>{this._sendDoneStepEvent()})}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleCityChange(e){this._handleCityInputChange(e),this._debounceCityChange(e)}_handleCityInputChange(e){this.city=e.target.value}_handleSuggestions(e){e.features.length<1&&(this.locationError=this.t.no_locations_found),this.locations=e.features}_handleLocationSelection(e){this.city=e.target.dataset.placeName;const t=getLocationGridFromMapbox(e.target.id,zumeProfile.profile.location);this.localValue=t,this._clearLocations()}_handleSubmitLocation(){if(this.localValue.source==="ip"){const{label:e,level:t,lat:s,lng:n}=this.localValue;this.localValue={source:"user",grid_id:!1,label:e,level:t,lat:Number(s),lng:Number(n)}}this._updateProfile("location_grid_meta",this.localValue,()=>{this._sendDoneStepEvent()})}_updateProfile(e,t,s=()=>{}){this.loading=!0;const n={[e]:t};fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(n),headers:{"X-WP-Nonce":jsObject.nonce}}).then(o=>o.json()).then(o=>{zumeProfile.profile=o,s()}).catch(o=>{console.error(o)}).finally(()=>{this.loading=!1})}_clearLocations(){this.locations=[]}createRenderRoot(){return this}}window.customElements.define("complete-profile",rt);class ot extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},inviteCode:{type:String}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.t={},this.inviteCode="123456",this.url=`https://zume5.test/zume_app/plan_invite${this.inviteCode!==""?"?code="+this.inviteCode:""}`}render(){return a`
            <div class="center stack">
                <h2>${this.t.title}</h2>
                <p>${this.t.share_with_friends}</p>
                <share-links url=${this.url} title="${this.t.join_my_plan}" .t=${this.t}></share-links>
            </div>
        `}createRenderRoot(){return this}}window.customElements.define("invite-friends",ot);class lt extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},errorMessage:{attribute:!1},message:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.state={},this.errorMessage="",this.message="",this.loading=!1,this.contactPreferences=["email","text","phone","whatsapp","signal","telegram","messenger"]}firstUpdated(){this.message=this.t.connect_success;const e=this.stateManager.getAll();if(this.variant===r.connectingToCoach){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));const t=(n=>{n===!1&&(this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting)),n.coach_request&&n.coach_request.errors&&Object.keys(n.coach_request.errors).length!==0&&Object.keys(n.coach_request.errors)[0]==="already_has_coach"&&(this.message=this.t.already_coached,this.setErrorMessage(this.t.error_connecting)),this._handleFinish()}).bind(this),s=(()=>{this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting),this._handleFinish()}).bind(this);makeRequest("POST","get_a_coach",{data:e},"zume_system/v1/").done(t).fail(s).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return this.stateManager||(this.stateManager=new ke(this.module),this.state=this.stateManager.get(this.variant)||{},this.variant===r.languagePreferences&&!this.state.value&&(this.state.value=zumeProfile.profile.preferred_language||"en",this.stateManager.add(this.variant,this.state)),this.variant===r.contactPreferences&&Object.keys(this.state).length===0&&(this.state=Object.fromEntries(zumeProfile.profile.contact_preference.map(e=>[e,"true"])))),a`
        <form class="inputs stack-2" @submit=${this._handleDone}>
            ${this.variant===r.contactPreferences?a`
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

            ${this.variant===r.languagePreferences?a`
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

            ${this.variant===r.howCanWeServe?a`
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
            ${this.variant===r.connectingToCoach?a`

                <h1>${this.t.connecting_coach_title}</h1>
                <p>${this.message}</p>
                <span class="loading-spinner ${this.loading?"active":""}"></span>
            `:""}
            ${this.variant!==r.connectingToCoach?a`
                    <div class="cluster | mx-auto">
                        <span class="loading-spinner ${this.loading?"active":""}"></span>
                        <button type="submit" class="btn" ?disabled=${this.loading}>${this.t.next}</button>
                    </div>
                `:""}
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        </form>
        `}_handleDone(e){if(e&&e.preventDefault(),Object.keys(this.state).length===0){this.setErrorMessage(this.t.missing_response);return}this._sendDoneStepEvent()}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleFinish(){setTimeout(()=>{this._sendDoneStepEvent()},3e3)}_handleChange(e){e.target.type==="checkbox"&&(this.state[e.target.value]=e.target.checked),e.target.type==="text"&&(this.state.value=e.target.value),e.target.type==="select-one"&&(this.state.value=e.target.value),this.stateManager.add(this.variant,this.state)}createRenderRoot(){return this}}customElements.define("request-coach",lt);class ht extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.showTrainings=!1,this.loading=!1}firstUpdated(){const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.loading=!1,this.showTrainings=!0;return}const t=e.searchParams.get("code");this.connectToPlan(t)}connectToPlan(e){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait,this.code=e,makeRequest("POST","connect/public-plan",{code:e},"zume_system/v1").then(t=>{console.log(t),this.message=this.t.success.replace("%s",t.name),this._sendDoneStepEvent()}).fail(({responseJSON:t})=>{console.log(t),this.message="",t.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}_handleChosenTraining(e){console.log(e);const{code:t}=e.detail;this.showTrainings=!1,this.connectToPlan(t)}render(){return a`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            ${this.showTrainings?a`
                <public-trainings .t=${this.t} @chosen-training=${this._handleChosenTraining}></public-trainings>
            `:""}
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("join-training",ht);class ct extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1;return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","connect/plan",{code:t},"zume_system/v1").then(s=>{console.log(s),this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return a`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("join-friends-training",ct);class dt extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","connect/friend",{code:t},"zume_system/v1").then(s=>{console.log(s),this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_friend_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return a`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("connect-friend",dt);class ut extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","checkin",{code:t},"zume_system/v1").then(s=>{this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_checkin_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){console.log(e),this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return a`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("session-checkin",ut);class pt extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},errorMessage:{attribute:!1},message:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.state={},this.errorMessage="",this.message="",this.loading=!1}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return a`
            ${this.variant===r.howManySessions?a`
                <h2>Will you do 1 or 2 hour training sessions?</h2>
                <div class="stack">
                    <button class="btn" @click=${this._handleDone}>1 hour (20 sessions)</button>
                    <button class="btn" @click=${this._handleDone}>2 hour (10 sessions)</button>
                </div>
            `:""}
            ${this.variant===r.whatTimeOfDay?a`
                <h2>What time of day?</h2>
                <div class="stack">
                    <button class="btn" @click=${this._handleDone}>Morning</button>
                    <button class="btn" @click=${this._handleDone}>Afternoon</button>
                    <button class="btn" @click=${this._handleDone}>Evening</button>
                </div>
            `:""}
            ${this.variant===r.howOften?a`
                <h2>How often will you meet?</h2>
                <div class="stack">
                    <button class="btn" @click=${this._handleDone}>Every day</button>
                    <button class="btn" @click=${this._handleDone}>Once a week</button>
                    <button class="btn" @click=${this._handleDone}>Twice a month</button>
                    <button class="btn" @click=${this._handleDone}>Once a month</button>
                </div>
            `:""}
            ${this.variant===r.startDate?a`
                <h2>When do you plan to start?</h2>
                <input type="date">
                <button class="btn" @click=${this._handleDone}>Done</button>
            `:""}

        `}_handleDone(e){e&&e.preventDefault(),this._sendDoneStepEvent()}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleFinish(){setTimeout(()=>{this._sendDoneStepEvent()},3e3)}createRenderRoot(){return this}}customElements.define("make-group",pt);class gt extends p{static get properties(){return{title:{type:String},sections:{type:Array}}}render(){return a`
            <div class="container">
                <h1 class="text-center">${this.title}</h1>
                ${this.sections.map((e,t)=>a`
                        <course-section .section=${e}></course-section>
                    `)}
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-guide",gt);const ye=["slideshow","guide"];class mt extends p{static get properties(){return{languageCode:{type:String},homeUrl:{type:String},assetsPath:{type:String},translations:{type:Object},zumeSessions:{attribute:!1},lessonIndex:{attribute:!1},view:{attribute:!1},linkNodes:{attribute:!1},showIndex:{attribute:!1}}}constructor(){super();const e=new URL(window.location.href),t=this.getZumeSessions(e);this.zumeSessions=t;const s=this.getLessonIndex(e);this.lessonIndex=s,this.view=this.getView(e),this.changeSession(s,!1,t),this.handleSessionLink=this.handleSessionLink.bind(this),this.handleHistoryPopState=this.handleHistoryPopState.bind(this),window.addEventListener("popstate",this.handleHistoryPopState),document.querySelectorAll(".language-selector").forEach(function(o){o.addEventListener("click",()=>{const l=o.dataset.value,u=new URL(location.href),c=u.pathname.substring(1).split("/");let h="";c.length>0&&jsObject.zume_languages.includes(c[0])?h=c.slice(1).join("/"):h=c.join("/"),l!=="en"?h="/"+l+"/"+h:h="/"+h,h+=u.search,location.href=h})})}getView(e){if(e.searchParams.has("view")){const t=e.searchParams.get("view");if(ye.includes(t))return t}else return"slideshow"}getLessonIndex(e){if(e.searchParams.has("session")){const t=e.searchParams.get("session");if(t==="index")return"index";const s=Number(t);return Number.isInteger(s)?s-1:0}else return 0}getZumeSessions(e){const t=e.searchParams.get("type")||"10";this.type=t;let s;switch(t){case"10":s=zume10Sessions;break;case"20":s=zume20Sessions;break;case"intensive":s=zumeIntensiveSessions;break;default:s=zume10Sessions;break}return s}handleSessionLink(e){const t=e.target,s=Number(t.dataset.sessionNumber);this.lessonIndex=s,this.showIndex===!0&&(this.showIndex=!1),this.changeSession(this.lessonIndex)}getNextSession(){this.lessonIndex+=1,this.changeSession(this.lessonIndex)}getPreviousSession(){this.lessonIndex-=1,this.changeSession(this.lessonIndex)}changeSession(e,t=!0,s=null){if(e==="index"){this.showIndex=!0;return}else this.showIndex=!1;const n=s||this.zumeSessions;let o=e;e<0&&(o=0),e>n.length-1&&(o=n.length-1),this.lessonIndex=o,this.session=n[o],t&&this.pushHistory()}pushHistory(){const e=this.lessonIndex,t=this.view,s=new URL(window.location.href);e!==null&&Number.isInteger(e)&&s.searchParams.set("session",e+1),t&&s.searchParams.set("view",t),window.history.pushState(null,null,s.href)}handleHistoryPopState(){var n;const e=new URL(location.href),t=e.searchParams.has("session")?e.searchParams.get("session"):null,s=e.searchParams.get("view");(n=document.querySelector(".js-off-canvas-overlay"))==null||n.classList.remove("is-visible"),Number.isInteger(Number(t))&&(this.lessonIndex=t-1,this.changeSession(this.lessonIndex,!1)),t==="index"&&(this.lessonIndex="index",this.changeSession("index",!1)),s&&ye.includes(s)&&(this.view=s)}getSessionTitle(){return!this.session||!this.session.t?"":this.session.t}getSessionSections(){return!this.session||!this.session.sections?[]:this.session.sections}switchViews(e=!0){this.view==="guide"?this.view="slideshow":this.view="guide",e===!0&&this.pushHistory({view:this.view})}openMenu(){const e=this.querySelector("#offCanvas");jQuery(e).foundation("open")}render(){if(this.showIndex){const e=this.type==="intensive"?"container-xsm":"container-sm";return a`
                <div class="course-index | bg-brand-gradient">
                    <img src="${jsObject.images_url}/zume-training-logo-white.svg" alt="Zume Logo" class="mx-auto w-70 py-1" />
                    <div class="${e}" data-max-width="750">
                        <div class="grid | grid-min-8rem gutter0">
                            ${this.zumeSessions.map((t,s)=>a`
                                <button
                                    class="card-btn | bg-white black m--2 gap--3"
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
            `}return a`
            <nav class="stack | bg-white px-0 text-center | off-canvas position-left justify-content-between py-1" id="offCanvas" data-off-canvas data-transition="overlap">
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
                        ${this.zumeSessions.map((e,t)=>a`
                            <button
                                class="link session-link"
                                data-session-number="${t}"
                                @click=${this.handleSessionLink}
                            >
                                ${e.t}
                            </button>
                        `)}
                    </div>
                </div>

                <div class="stack">
                    <button class="btn outline" @click=${this.getPreviousSession}>Back</button>
                    <button class="btn" @click=${this.getNextSession}>Next</button>
                </div>
            </nav>

            <span class="p-1 d-block position-relative z-1">
                <button id="hamburger-menu" class="nav-toggle show" @click=${this.openMenu}>
                    <span class="hamburger brand"></span>
                </button>
            </span>

            <div class="container"></div>
                ${this.view==="guide"?a`<course-guide title="${this.getSessionTitle()}" .sections=${this.getSessionSections()}></course-guide>`:a`<course-slideshow title="${this.getSessionTitle()}" .sections=${this.getSessionSections()}></course-slideshow>`}
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-presenter",mt);class $t extends p{static get properties(){return{section:{type:Object}}}constructor(){super()}render(){return this.title=this.section.t??null,this.description=this.section.d??null,this.info=this.section.info??null,this.duration=this.section.duration??null,this.parts=this.section.parts??[],a`
            ${this.title!==null?a`<h1>${this.title}</h1>`:""}
            ${this.description!==null?a`<p>${this.description}</p>`:""}
            ${this.info!==null?a`<p>${this.info}</p>`:""}
            ${this.duration!==null?a`<p>${this.duration}</p>`:""}

            ${this.parts.map(e=>a`<part-switcher .partData=${e}></part-switcher>`)}

        `}createRenderRoot(){return this}}customElements.define("course-section",$t);class bt extends p{static get properties(){return{title:{type:String},sections:{type:Array},sectionIndex:{attribute:!1},partIndex:{attribute:!1},currentSlide:{attribute:!1},index:{attribute:!1}}}constructor(){super(),this.reset(),this.listenForKeyboard=this.listenForKeyboard.bind(this),this.listenForMouseClick=this.listenForMouseClick.bind(this)}reset(){this.sectionIndex=-1,this.partIndex=-1,this.currentSlide=null,this.index=[]}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.listenForKeyboard),document.addEventListener("mousedown",this.listenForMouseClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.listenForKeyboard),document.removeEventListener("mousedown",this.listenForMouseClick)}attributeChangedCallback(e,t,s){super.attributeChangedCallback(e,t,s),e==="title"&&t!==s&&this.reset()}setupIndex(){this.sections&&(this.index=this.sections.map(e=>e.parts?e.parts.length:0))}nextSlide(){if(this.sectionIndex>this.sections.length-1&&(this.sectionIndex=this.sections.length-1),this.index[this.sectionIndex]===0||this.index[this.sectionIndex]===this.partIndex+1){if(this.sectionIndex===this.sections.length-1)return;this.setSlide(this.sectionIndex+1,-1);return}if(this.index[this.sectionIndex]>0){this.setSlide(this.sectionIndex,this.partIndex+1);return}}previousSlide(){if(this.sectionIndex<0&&(this.sectionIndex=0),this.index[this.sectionIndex]===0||this.partIndex===-1){if(this.sectionIndex===0)return;const e=this.index[this.sectionIndex-1]-1;this.setSlide(this.sectionIndex-1,e);return}this.setSlide(this.sectionIndex,this.partIndex-1)}listenForKeyboard(e){["Space","ArrowRight"].includes(e.code)&&this.nextSlide(),["Backspace","ArrowLeft"].includes(e.code)&&this.previousSlide()}listenForMouseClick(e){const{x:t}=e,{innerWidth:s}=window,n=10/100*s+80;t<n&&(this.querySelector(".clickable-area.back").classList.add("visible"),this.previousSlide()),t>s-n&&(this.querySelector(".clickable-area.forward").classList.add("visible"),this.nextSlide())}setSlide(e,t){if(this.sectionIndex=e,this.partIndex=t,t<0){const s=this.sections[e];this.currentSlide=a`<section-part .partData=${s}></section-part>`}else{const s=this.sections[e].parts[t];this.currentSlide=a`<part-switcher .partData=${s}></part-switcher>`}}render(){return this.index.length===0&&this.setupIndex(),this.sectionIndex<0&&this.setSlide(0,-1),a`
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

        `}createRenderRoot(){return this}}customElements.define("course-slideshow",bt);class ft extends p{static get properties(){return{partData:{type:Object}}}render(){switch(this.partData.type){case"section":return a`<section-part .partData=${this.partData}></section-part>`;case"watch":return a`<watch-part .partData=${this.partData}></watch-part>`;case"discuss":return a`<discuss-part .partData=${this.partData}></discuss-part>`;case"read":return a`<read-part .partData=${this.partData}></read-part>`;case"see":return a`<see-part .partData=${this.partData}></see-part>`;case"share":return a`<share-part .partData=${this.partData}></share-part>`;case"listen":return a`<listen-part .partData=${this.partData}></listen-part>`;case"form":return a`<form-part .partData=${this.partData}></form-part>`;case"checkin":return a`<checkin-part .partData=${this.partData}></checkin-part>`;case"cta":default:return a`<basic-part .partData=${this.partData}></basic-part>`}}createRenderRoot(){return this}}customElements.define("part-switcher",ft);class vt extends p{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("basic-part",vt);class _t extends p{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}

            <div><img class="mx-auto" src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&amp;color=323a68&amp;data=https://zume5.training/zume_app/checkin/?code=5678" width="300px" alt="QR Code"></div>
            <p>
                or <br>
                zume.training/checkin and use code <strong class="text-lightblue"><a href="https://zume5.training/zume_app/checkin/?code=5678" target="_blank">5678</a></strong>
            </p>
        `}createRenderRoot(){return this}}customElements.define("checkin-part",_t);class yt extends p{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("discuss-part",yt);class St extends p{static get properties(){return{partData:{type:Object}}}render(){return this.partData.t,this.partData.d,this.partData.info,a`
            ${this.title!==null?a`<h2>${this.title}</h2>`:""}
            ${this.description!==null?a`<p>${this.description}</p>`:""}
            ${this.info!==null?a`<p>${this.info}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("form-part",St);class kt extends p{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            <h2 class="brand">LISTEN</h2>
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("listen-part",kt);class wt extends p{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            <h2 class="brand">READ</h2>
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("read-part",wt);class Et extends p{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            ${e!==null?a`<h2>${e}</h2>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("section-part",Et);class xt extends p{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            <h2 class="brand">SEE</h2>
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("see-part",xt);class At extends p{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("share-part",At);class Ct extends p{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("watch-part",Ct);class Me extends p{constructor(){super()}render(){return a`
            <div class="container">
                <div class="circle">
                    <div class="triangle"></div>
                </div>
            </div>
        `}}E(Me,"styles",Ne`
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
    `);window.customElements.define("play-button",Me);class Pt extends p{constructor(){super();E(this,"webShareSupported",!!window.navigator.share);E(this,"clipboardSupported",!!window.navigator.clipboard);this.shareFeedback="",this.copyFeedback=""}static get properties(){return{url:{type:String},title:{type:String},t:{type:Object},shareFeedback:{attribute:!1},copyFeedback:{attribute:!1}}}share(){navigator.share({title:this.title,url:this.url,text:title}).then(()=>{this.shareFeedback=this.t.share_feedback,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(t=>console.error("Error sharing",t))}copyLink(){navigator.clipboard.writeText(this.url).then(()=>{this.copyFeedback=this.t.copy_feedback,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(t=>console.error(t))}noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported}render(){return a`
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
        `}createRenderRoot(){return this}}customElements.define("share-links",Pt);class Dt extends p{static get properties(){return{t:{type:Object},joinLink:{type:String},loading:{attribute:!1},posts:{attribute:!1}}}constructor(){super(),this.loading=!0,this.plans=[],this.getTrainings(),this.renderRow=this.renderRow.bind(this)}getTrainings(){makeRequest("POST","public_plans",{},"zume_system/v1").then(e=>{this.plans=e}).catch(e=>{console.log(e)}).always(()=>{this.loading=!1})}render(){return this.loading?a`<span class="loading-spinner active"></span>`:a`
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
        `}renderRow({join_key:e,language_note:t,post_title:s,time_of_day_note:n,timezone_note:o,...l}){const u=l.set_a_01?"a":"b",c=u==="a"?10:20,h=`set_${u}_`,f=Date.now()/1e3;let d="";for(let b=1;b<c+1;b++){const A=b<10?`0${b}`:`${b}`,w=l[h+A];if(d=w.timestamp,f<w.timestamp)break}const g=moment(d*1e3).format("MMM Do 'YY");return a`
            <tr>
                <td data-label="${this.t.name}">${s}</td>
                <td data-label="${this.t.next_date}">${g}</td>
                <td data-label="${this.t.start_time}">${n}</td>
                <td data-label="${this.t.timezone}">${o}</td>
                <td data-label="${this.t.language}">${t}</td>
                <td><button class="btn" data-code=${e} @click=${this._handleJoinTraining}>${this.t.join}</button></td>
            </tr>
        `}_handleJoinTraining(e){console.log(e);const t=e.target.dataset.code,s=new CustomEvent("chosen-training",{bubbles:!0,detail:{code:t}});this.dispatchEvent(s)}createRenderRoot(){return this}}customElements.define("public-trainings",Dt);const Se=document.querySelector(".nav-toggle"),Tt=document.querySelector("#nav");Se&&Se.addEventListener("click",i=>{Tt.classList.toggle("nav--visible")});const Mt=({title:i,url:e,copyFeedback:t,shareFeedback:s})=>({title:i,url:e,webShareSupported:navigator.share,clipboardSupported:navigator.clipboard,shareFeedback:"",copyFeedback:"",noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported},share(){navigator.share({title:i,url:e,text:i}).then(()=>{this.shareFeedback=s,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(n=>console.error("Error sharing",n))},copyLink(){navigator.clipboard.writeText(e).then(()=>{this.copyFeedback=t,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(n=>console.error(n))}});window.zumeInitShareLinks=()=>{je({share:Mt}).mount()};
//# sourceMappingURL=main-d5b9c4b2.js.map
