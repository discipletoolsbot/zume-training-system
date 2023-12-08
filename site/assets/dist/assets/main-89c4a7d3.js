var be=Object.defineProperty;var _e=(i,e,t)=>e in i?be(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var T=(i,e,t)=>(_e(i,typeof e!="symbol"?e+"":e,t),t);import{createApp as ye}from"https://unpkg.com/petite-vue?module";class ue{constructor(e){T(this,"WIZARD_STATE","zume_wizard_state");this.moduleName=e}init(){return{module:this.moduleName,data:{}}}exists(){return!!localStorage.getItem(this.WIZARD_STATE)}get(){return JSON.parse(localStorage.getItem(this.WIZARD_STATE))}add(e,t){const s=this.exists()?this.get():this.init();s.data[e]=t,localStorage.setItem(this.WIZARD_STATE,JSON.stringify(s))}clear(){localStorage.removeItem(this.WIZARD_STATE)}}const _={makeAPlan:"getting-started",getACoach:"get-a-coach",joinAPlan:"join-a-training",connectWithFriend:"connect-with-friend",joinFriendsPlan:"join-friends-training"},m={completeProfile:"completeProfile",makePlan:"makePlan",inviteFriends:"inviteFriends",getACoach:"getACoach",joinTraining:"joinTraining",connectFriend:"connectFriend",joinFriendsTraining:"joinFriendsTraining"},l={updateName:"update-your-name",updateLocation:"update-your-location",updatePhone:"update-your-phone",inviteFriends:"invite-friends",contactPreferences:"contact-preferences",languagePreferences:"language-preferences",howCanWeServe:"how-can-we-serve",connectingToCoach:"connecting-to-coach",joinTraining:"join-training",connectToFriend:"connect-friend",joinFriendsPlan:"join-friends-training"},Se={[l.updateName]:{field:"name",testExistance:()=>!1},[l.updateLocation]:{field:"location",testExistance:i=>!(i.source&&i.source==="ip")},[l.updatePhone]:{field:"phone",testExistance:i=>!!i}};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L=window,Y=L.ShadowRoot&&(L.ShadyCSS===void 0||L.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol(),X=new WeakMap;let pe=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==G)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Y&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=X.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&X.set(t,e))}return e}toString(){return this.cssText}};const we=i=>new pe(typeof i=="string"?i:i+"",void 0,G),ke=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((s,n,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[r+1],i[0]);return new pe(t,i,G)},Ee=(i,e)=>{Y?i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const s=document.createElement("style"),n=L.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=t.cssText,i.appendChild(s)})},Q=Y?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return we(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var U;const z=window,ee=z.trustedTypes,xe=ee?ee.emptyScript:"",te=z.reactiveElementPolyfillSupport,Z={toAttribute(i,e){switch(e){case Boolean:i=i?xe:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},ge=(i,e)=>e!==i&&(e==e||i==i),W={attribute:!0,type:String,converter:Z,reflect:!1,hasChanged:ge};let E=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,s)=>{const n=this._$Ep(s,t);n!==void 0&&(this._$Ev.set(n,s),e.push(n))}),e}static createProperty(e,t=W){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const s=typeof e=="symbol"?Symbol():"__"+e,n=this.getPropertyDescriptor(e,s,t);n!==void 0&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(n){const r=this[e];this[t]=n,this.requestUpdate(e,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||W}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,s=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const n of s)this.createProperty(n,t[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const n of s)t.unshift(Q(n))}else e!==void 0&&t.push(Q(e));return t}static _$Ep(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,s;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((s=e.hostConnected)===null||s===void 0||s.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Ee(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var s;return(s=t.hostConnected)===null||s===void 0?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var s;return(s=t.hostDisconnected)===null||s===void 0?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$EO(e,t,s=W){var n;const r=this.constructor._$Ep(e,s);if(r!==void 0&&s.reflect===!0){const o=(((n=s.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?s.converter:Z).toAttribute(t,s.type);this._$El=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$El=null}}_$AK(e,t){var s;const n=this.constructor,r=n._$Ev.get(e);if(r!==void 0&&this._$El!==r){const o=n.getPropertyOptions(r),d=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?o.converter:Z;this._$El=r,this[r]=d.fromAttribute(t,o.type),this._$El=null}}requestUpdate(e,t,s){let n=!0;e!==void 0&&(((s=s||this.constructor.getPropertyOptions(e)).hasChanged||ge)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),s.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,s))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((n,r)=>this[r]=n),this._$Ei=void 0);let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),(e=this._$ES)===null||e===void 0||e.forEach(n=>{var r;return(r=n.hostUpdate)===null||r===void 0?void 0:r.call(n)}),this.update(s)):this._$Ek()}catch(n){throw t=!1,this._$Ek(),n}t&&this._$AE(s)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(s=>{var n;return(n=s.hostUpdated)===null||n===void 0?void 0:n.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,s)=>this._$EO(s,this[s],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};E.finalized=!0,E.elementProperties=new Map,E.elementStyles=[],E.shadowRootOptions={mode:"open"},te==null||te({ReactiveElement:E}),((U=z.reactiveElementVersions)!==null&&U!==void 0?U:z.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var B;const H=window,A=H.trustedTypes,se=A?A.createPolicy("lit-html",{createHTML:i=>i}):void 0,K="$lit$",y=`lit$${(Math.random()+"").slice(9)}$`,fe="?"+y,Ae=`<${fe}>`,C=document,M=()=>C.createComment(""),D=i=>i===null||typeof i!="object"&&typeof i!="function",me=Array.isArray,Ce=i=>me(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",q=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ie=/-->/g,ne=/>/g,S=RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ae=/'/g,re=/"/g,ve=/^(?:script|style|textarea|title)$/i,Pe=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),a=Pe(1),$=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),oe=new WeakMap,x=C.createTreeWalker(C,129,null,!1),Te=(i,e)=>{const t=i.length-1,s=[];let n,r=e===2?"<svg>":"",o=R;for(let c=0;c<t;c++){const h=i[c];let b,u,g=-1,v=0;for(;v<h.length&&(o.lastIndex=v,u=o.exec(h),u!==null);)v=o.lastIndex,o===R?u[1]==="!--"?o=ie:u[1]!==void 0?o=ne:u[2]!==void 0?(ve.test(u[2])&&(n=RegExp("</"+u[2],"g")),o=S):u[3]!==void 0&&(o=S):o===S?u[0]===">"?(o=n??R,g=-1):u[1]===void 0?g=-2:(g=o.lastIndex-u[2].length,b=u[1],o=u[3]===void 0?S:u[3]==='"'?re:ae):o===re||o===ae?o=S:o===ie||o===ne?o=R:(o=S,n=void 0);const j=o===S&&i[c+1].startsWith("/>")?" ":"";r+=o===R?h+Ae:g>=0?(s.push(b),h.slice(0,g)+K+h.slice(g)+y+j):h+y+(g===-2?(s.push(void 0),c):j)}const d=r+(i[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return[se!==void 0?se.createHTML(d):d,s]};class O{constructor({strings:e,_$litType$:t},s){let n;this.parts=[];let r=0,o=0;const d=e.length-1,c=this.parts,[h,b]=Te(e,t);if(this.el=O.createElement(h,s),x.currentNode=this.el.content,t===2){const u=this.el.content,g=u.firstChild;g.remove(),u.append(...g.childNodes)}for(;(n=x.nextNode())!==null&&c.length<d;){if(n.nodeType===1){if(n.hasAttributes()){const u=[];for(const g of n.getAttributeNames())if(g.endsWith(K)||g.startsWith(y)){const v=b[o++];if(u.push(g),v!==void 0){const j=n.getAttribute(v.toLowerCase()+K).split(y),N=/([.?@])?(.*)/.exec(v);c.push({type:1,index:r,name:N[2],strings:j,ctor:N[1]==="."?Me:N[1]==="?"?Oe:N[1]==="@"?Ie:F})}else c.push({type:6,index:r})}for(const g of u)n.removeAttribute(g)}if(ve.test(n.tagName)){const u=n.textContent.split(y),g=u.length-1;if(g>0){n.textContent=A?A.emptyScript:"";for(let v=0;v<g;v++)n.append(u[v],M()),x.nextNode(),c.push({type:2,index:++r});n.append(u[g],M())}}}else if(n.nodeType===8)if(n.data===fe)c.push({type:2,index:r});else{let u=-1;for(;(u=n.data.indexOf(y,u+1))!==-1;)c.push({type:7,index:r}),u+=y.length-1}r++}}static createElement(e,t){const s=C.createElement("template");return s.innerHTML=e,s}}function P(i,e,t=i,s){var n,r,o,d;if(e===$)return e;let c=s!==void 0?(n=t._$Co)===null||n===void 0?void 0:n[s]:t._$Cl;const h=D(e)?void 0:e._$litDirective$;return(c==null?void 0:c.constructor)!==h&&((r=c==null?void 0:c._$AO)===null||r===void 0||r.call(c,!1),h===void 0?c=void 0:(c=new h(i),c._$AT(i,t,s)),s!==void 0?((o=(d=t)._$Co)!==null&&o!==void 0?o:d._$Co=[])[s]=c:t._$Cl=c),c!==void 0&&(e=P(i,c._$AS(i,e.values),c,s)),e}class Re{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:s},parts:n}=this._$AD,r=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:C).importNode(s,!0);x.currentNode=r;let o=x.nextNode(),d=0,c=0,h=n[0];for(;h!==void 0;){if(d===h.index){let b;h.type===2?b=new I(o,o.nextSibling,this,e):h.type===1?b=new h.ctor(o,h.name,h.strings,this,e):h.type===6&&(b=new je(o,this,e)),this._$AV.push(b),h=n[++c]}d!==(h==null?void 0:h.index)&&(o=x.nextNode(),d++)}return r}v(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class I{constructor(e,t,s,n){var r;this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=n,this._$Cp=(r=n==null?void 0:n.isConnected)===null||r===void 0||r}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=P(this,e,t),D(e)?e===f||e==null||e===""?(this._$AH!==f&&this._$AR(),this._$AH=f):e!==this._$AH&&e!==$&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):Ce(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==f&&D(this._$AH)?this._$AA.nextSibling.data=e:this.$(C.createTextNode(e)),this._$AH=e}g(e){var t;const{values:s,_$litType$:n}=e,r=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=O.createElement(n.h,this.options)),n);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===r)this._$AH.v(s);else{const o=new Re(r,this),d=o.u(this.options);o.v(s),this.$(d),this._$AH=o}}_$AC(e){let t=oe.get(e.strings);return t===void 0&&oe.set(e.strings,t=new O(e)),t}T(e){me(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,n=0;for(const r of e)n===t.length?t.push(s=new I(this.k(M()),this.k(M()),this,this.options)):s=t[n],s._$AI(r),n++;n<t.length&&(this._$AR(s&&s._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,t);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class F{constructor(e,t,s,n,r){this.type=1,this._$AH=f,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=f}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,s,n){const r=this.strings;let o=!1;if(r===void 0)e=P(this,e,t,0),o=!D(e)||e!==this._$AH&&e!==$,o&&(this._$AH=e);else{const d=e;let c,h;for(e=r[0],c=0;c<r.length-1;c++)h=P(this,d[s+c],t,c),h===$&&(h=this._$AH[c]),o||(o=!D(h)||h!==this._$AH[c]),h===f?e=f:e!==f&&(e+=(h??"")+r[c+1]),this._$AH[c]=h}o&&!n&&this.j(e)}j(e){e===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Me extends F{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===f?void 0:e}}const De=A?A.emptyScript:"";class Oe extends F{constructor(){super(...arguments),this.type=4}j(e){e&&e!==f?this.element.setAttribute(this.name,De):this.element.removeAttribute(this.name)}}class Ie extends F{constructor(e,t,s,n,r){super(e,t,s,n,r),this.type=5}_$AI(e,t=this){var s;if((e=(s=P(this,e,t,0))!==null&&s!==void 0?s:f)===$)return;const n=this._$AH,r=e===f&&n!==f||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==f&&(n===f||r);r&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,s;typeof this._$AH=="function"?this._$AH.call((s=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&s!==void 0?s:this.element,e):this._$AH.handleEvent(e)}}class je{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){P(this,e)}}const le=H.litHtmlPolyfillSupport;le==null||le(O,I),((B=H.litHtmlVersions)!==null&&B!==void 0?B:H.litHtmlVersions=[]).push("2.7.3");const Ne=(i,e,t)=>{var s,n;const r=(s=t==null?void 0:t.renderBefore)!==null&&s!==void 0?s:e;let o=r._$litPart$;if(o===void 0){const d=(n=t==null?void 0:t.renderBefore)!==null&&n!==void 0?n:null;r._$litPart$=o=new I(e.insertBefore(M(),d),d,void 0,t??{})}return o._$AI(i),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var V,J;let p=class extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const s=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=s.firstChild),s}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ne(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return $}};p.finalized=!0,p._$litElement$=!0,(V=globalThis.litElementHydrateSupport)===null||V===void 0||V.call(globalThis,{LitElement:p});const ce=globalThis.litElementPolyfillSupport;ce==null||ce({LitElement:p});((J=globalThis.litElementVersions)!==null&&J!==void 0?J:globalThis.litElementVersions=[]).push("3.3.2");class Le extends p{static get properties(){return{type:{type:String},finishUrl:{type:String},user:{type:Object},step:{attribute:!1}}}constructor(){super(),this.stepIndex=0,this.steps=[],this.modules={},this.step={},this.t=window.SHAREDFUNCTIONS.escapeObject(jsObject.translations),this._handleHistoryPopState=this._handleHistoryPopState.bind(this),window.addEventListener("popstate",this._handleHistoryPopState),this.stateManager=new ue,this.stateManager.clear()}render(){return this.isWizardLoaded()||(this.loadWizard(),this._handleHistoryPopState(!0)),this.steps.length===0?a`
            <div class="cover-page">
                <div class="stack center | text-center">
                    <h1 class="brand">${this.t.bad_wizard}</h1>
                    <p>${this.t.found_bad_wizard}</p>
                    <div class="center"><img class="w-50" src="https://imgs.search.brave.com/3f3MurVApxsoxJlmqxLF0fs5-WlAk6sEu9IV3sICb_k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWR2ZXJ0aXNlY2Fz/dC5jb20vcG9kY2Fz/dC9pbWFnZS9WZXJ5/QmFkV2l6YXJkcw.jpeg" alt="bad wizards" /></div>
                    <a class="btn" href="/">${this.t.home}</a>
                </div>
            </div>`:a`
        <div class="container center">

            <header class="ms-auto p-2">
                ${this.skipButton()}
            </header>

            <div>
                ${this.currentStep()}
            </div>

            <div class="stack-1 | fixed bottom left right p-2">
                ${this.footer()}
            </div>

        </div>
        `}currentStep(){const e=this.steps[this.stepIndex];return e.component(e,this.t)}skipButton(){const{skippable:e}=this.step,t=this.stepIndex===this.steps.length-1;return e&&!t?a`<button @click=${this._onSkip} class="brand">${this.t.skip}</button>`:""}finishButton(){return a`
            <div class="text-center d-flex justify-content-between">
                <div class="cluster ms-auto">
                    <button @click=${this._onFinish} class="btn">${this.t.finish}</button>
                </div>
            </div>
        `}footer(){return this.stepIndex===this.steps.length-1?this.finishButton():a`
        <div class="center">
            <div class="cluster">
                ${this.steps.map((t,s)=>{const n=s<=this.stepIndex;return a`<div class="step-circle ${n?"complete":""}"></div>`})}
            </div>
        </div>

        `}_onBack(){if(this.stepIndex>0){const e=this.stepIndex-1;this._gotoStep(e)}}_onNext(){if(this.stepIndex+1<this.steps.length){const e=this.stepIndex+1;this._gotoStep(e)}else this._onFinish()}_onSkip(){const e=this.step.module;for(let t=this.stepIndex+1;t<this.steps.length;t++)if(this.steps[t].module!==e){this._gotoStep(t);return}this._onFinish()}_onFinish(){this.stateManager.clear(),this.finishUrl||(window.location.href="/");const e=new URL(this.finishUrl);e.searchParams.set("completed",this.type),window.location.href=e}_gotoStep(e,t=!0){if(this.steps.length!==0&&(this.stepIndex=this.clampSteps(e),this.step=this.steps[this.stepIndex],t)){const s=new URL(window.location.href),n=s.pathname.split("/"),r=n[n.length-1];let o="";Object.values(_).includes(r)?o=n.join("/")+"/"+this.step.slug+s.search:o=n.slice(0,-1).join("/")+"/"+this.step.slug+s.search,window.history.pushState(null,null,o)}}clampSteps(e){let t=e;return e>this.steps.length-1&&(t=this.steps.length-1),e<0&&(t=0),t}_handleHistoryPopState(e=!1){const s=new URL(window.location.href).pathname.split("/"),n=s[s.length-1];Object.values(_).includes(n)&&this._gotoStep(0,!1);let r="s",o=0;this.steps.forEach(({slug:d,module:c},h)=>{if(r!==c&&(r=c,o=h),n===d){if(e===!0){this._gotoStep(o,!1);return}this._gotoStep(h,!1)}})}makeModule(e=[],t=!1){const s={steps:[],skippable:t};return e.forEach(n=>{Object.keys(w).includes(n)&&s.steps.push(w[n])}),s}getModule(e,t=!1){const s={[m.completeProfile]:{steps:[w[l.updateName],w[l.updateLocation]],skippable:t},[m.makePlan]:{steps:[{slug:"make-a-plan",component:r=>a`
                            <h1>Make a plan</h1>
                            <p>We would like to help you succeed with this training.</p>
                            <p>Making a plan can help you with success.</p>
                            <p>Answering the following questions will help us make you a plan.</p>
                            <p>Or you can skip if you prefer</p>
                            <button class="btn" @click=${r.doneHandler}>OK</button>
                        `},{slug:"how-many-sessions",component:r=>a`
                            <h1>Will you do 1 or 2 hour training sessions?</h1>
                            <div class="stack">
                                <button class="btn" @click=${r.doneHandler}>1 hour (20 sessions)</button>
                                <button class="btn" @click=${r.doneHandler}>2 hour (10 sessions)</button>
                            </div>
                        `},{slug:"what-time-of-day",component:r=>a`
                            <h1>What time of day?</h1>
                            <div class="stack">
                                <button class="btn" @click=${r.doneHandler}>Morning</button>
                                <button class="btn" @click=${r.doneHandler}>Afternoon</button>
                                <button class="btn" @click=${r.doneHandler}>Evening</button>
                            </div>
                        `},{slug:"what-time-interval",component:r=>a`
                            <h1>How often will you meet?</h1>
                            <div class="stack">
                                <button class="btn" @click=${r.doneHandler}>Every day</button>
                                <button class="btn" @click=${r.doneHandler}>Once a week</button>
                                <button class="btn" @click=${r.doneHandler}>Twice a month</button>
                                <button class="btn" @click=${r.doneHandler}>Once a month</button>
                            </div>
                        `},{slug:"when-will-you-start",component:r=>a`
                            <h1>When do you plan to start?</h1>
                            <input type="date">
                            <button class="btn" @click=${r.doneHandler}>Done</button>
                        `}],skippable:t},[m.inviteFriends]:{steps:[w[l.inviteFriends]],skippable:t},[m.joinTraining]:{steps:[w[l.joinTraining]]}};return Object.keys(s).includes(e)?s[e]:s[m.completeProfile]}isWizardLoaded(){return Object.keys(this.modules).length!==0}loadWizard(){const e=this.getWizard();this.modules=e,this.steps=[],Object.entries(this.modules).forEach(([t,{steps:s,skippable:n}])=>{s.forEach(({component:r,slug:o})=>{const d=Se[o];let c=null;if(d&&this.user){if(d.testExistance(this.user[d.field]))return;c=this.user[d.field]}const h={component:r,slug:o,module:t,skippable:n,doneHandler:this._onNext};c!==null&&(h.value=c),this.steps.push(h)})})}isWizardTypeValid(){return!!Object.values(_).includes(this.type)}getWizard(){return this.isWizardTypeValid()?{[_.makeAPlan]:{[m.completeProfile]:this.makeModule([l.updateName,l.updateLocation],!0),[m.makePlan]:this.getModule(m.makePlan,!0),[m.inviteFriends]:this.makeModule([l.inviteFriends],!0)},[_.getACoach]:{[m.completeProfile]:this.makeModule([l.updateName,l.updateLocation,l.updatePhone]),[m.getACoach]:this.makeModule([l.contactPreferences,l.languagePreferences,l.howCanWeServe,l.connectingToCoach],!0)},[_.joinAPlan]:{[m.completeProfile]:this.makeModule([l.updateName,l.updateLocation,l.updatePhone]),[m.joinTraining]:this.getModule(m.joinTraining)},[_.connectWithFriend]:{[m.completeProfile]:this.makeModule([l.updateName,l.updateLocation],!0),[m.connectFriend]:this.makeModule([l.connectToFriend])},[_.joinFriendsPlan]:{[m.completeProfile]:this.makeModule([l.updateName,l.updateLocation],!0),[m.joinFriendsTraining]:this.makeModule([l.joinFriendsPlan])}}[this.type]:{}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._handleHistoryPopState)}createRenderRoot(){return this}}window.customElements.define("zume-wizard",Le);const w={[l.updateName]:{slug:l.updateName,component:(i,e)=>a`
            <complete-profile
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                t="${JSON.stringify(e.complete_profile)}"
                variant=${l.updateName}
                @done-step=${i.doneHandler}
                value=${JSON.stringify(i.value)}
            ></complete-profile>
        `},[l.updateLocation]:{slug:l.updateLocation,component:(i,e)=>a`
            <complete-profile
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                t="${JSON.stringify(e.complete_profile)}"
                variant=${l.updateLocation}
                @done-step=${i.doneHandler}
                value=${JSON.stringify(i.value)}
            ></complete-profile>
        `},[l.updatePhone]:{slug:l.updatePhone,component:(i,e)=>a`
            <complete-profile
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                t="${JSON.stringify(e.complete_profile)}"
                variant=${l.updatePhone}
                @done-step=${i.doneHandler}
                value=${JSON.stringify(i.value)}
            ></complete-profile>
        `},[l.contactPreferences]:{slug:l.contactPreferences,component:(i,e)=>a`
            <get-coach
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                t="${JSON.stringify(e.get_a_coach)}"
                variant=${l.contactPreferences}
                @done-step=${i.doneHandler}
            ></get-coach>
        `},[l.languagePreferences]:{slug:l.languagePreferences,component:(i,e)=>a`
            <get-coach
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                t="${JSON.stringify(e.get_a_coach)}"
                variant=${l.languagePreferences}
                @done-step=${i.doneHandler}
            ></get-coach>
        `},[l.howCanWeServe]:{slug:l.howCanWeServe,component:(i,e)=>a`
            <get-coach
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                t="${JSON.stringify(e.get_a_coach)}"
                variant=${l.howCanWeServe}
                @done-step=${i.doneHandler}
            ></get-coach>
        `},[l.connectingToCoach]:{slug:l.connectingToCoach,component:(i,e)=>a`
            <get-coach
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                t="${JSON.stringify(e.get_a_coach)}"
                variant=${l.connectingToCoach}
                @done-step=${i.doneHandler}
            ></get-coach>
        `},[l.inviteFriends]:{slug:l.inviteFriends,component:(i,e)=>a`
            <invite-friends
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.share}
            ></invite-friends>
        `},[l.joinTraining]:{slug:l.joinTraining,component:(i,e)=>a`
            <join-training
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.join_training}
                @done-step=${i.doneHandler}
            ></join-training>
        `},[l.joinFriendsPlan]:{slug:l.joinFriendsPlan,component:(i,e)=>a`
            <join-friends-plan
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.join_training}
                @done-step=${i.doneHandler}
            ></join-friends-plan>
        `},[l.connectToFriend]:{slug:l.connectToFriend,component:(i,e)=>a`
            <connect-friend
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${e.connect_friend}
                @done-step=${i.doneHandler}
            ></connect-friend>
        `}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const k={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ze=i=>(...e)=>({_$litDirective$:i,values:e});class He{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Fe=i=>i.strings===void 0,Ue={},We=(i,e=Ue)=>i._$AH=e;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Be=ze(class extends He{constructor(i){if(super(i),i.type!==k.PROPERTY&&i.type!==k.ATTRIBUTE&&i.type!==k.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Fe(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[e]){if(e===$||e===f)return e;const t=i.element,s=i.name;if(i.type===k.PROPERTY){if(e===t[s])return $}else if(i.type===k.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(s))return $}else if(i.type===k.ATTRIBUTE&&t.getAttribute(s)===e+"")return $;return We(i),e}});class qe extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},value:{type:String},locations:{attribute:!1},locationError:{attribute:!1},phoneError:{attribute:!1},city:{attribute:!1},loading:{attribute:!1},state:{attribute:!1},localValue:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.locations=[],this.locationError="",this.city="",this.loading=!1,this.localValue="",this.phoneError="",this._clearLocations=this._clearLocations.bind(this),this._handleSuggestions=this._handleSuggestions.bind(this),this._debounceCityChange=debounce(getAddressSuggestions(this._handleSuggestions,zumeProfile.map_key)).bind(this),this._handleCityInputChange=this._handleCityInputChange.bind(this)}firstUpdated(){this.renderRoot.querySelector(".inputs input").focus(),this.value!==""&&(this.localValue=JSON.parse(this.value))}render(){var e;return a`
        <form class="inputs stack" @submit=${this._handleDone}>
            ${this.variant===l.updateName?a`
                <h2 class="f-1">${this.t.name_question}</h2>
                <div class="">
                    <label for="name">${this.t.name}</label>
                    <input class="input" type="text" id="name" name="name" value=${this.localValue} ?required=${!this.skippable}>
                </div>
            `:""}

            ${this.variant===l.updatePhone?a`
                <h2 class="f-1">${this.t.phone_question}</h2>
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
                <h2 class="f-1">${this.t.location_question}</h2>
                <div class="form-group">
                    <label class="input-label" for="city">${this.t.city}</label>
                    <input
                        class="input"
                        type="text"
                        id="city"
                        name="city"
                        .value="${this.city?Be(this.city):(e=this.localValue)==null?void 0:e.label}"
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
                <div class="cluster">
                    <button type="button" class="btn" ?disabled=${this.loading} @click=${this.handleSubmitLocation}>${this.t.done}</button>
                    <span class="loading-spinner ${this.loading?"active":""}"></span>
                </div>
            `:""}
            ${[l.updatePhone,l.updateName].includes(this.variant)?a`
                <div class="cluster">
                    <button type="submit" class="btn" ?disabled=${this.loading}>${this.t.done}</button>
                    <span class="loading-spinner ${this.loading?"active":""}"></span>
                </div>
            `:""}
        </form>
        `}_handleInput(e){this.phoneError=""}_handleInvalid(e){e.preventDefault(),this.phoneError=this.t.phone_error}_handleDone(e){e&&e.preventDefault();const t=e.target[0];if(t.type==="submit")return;let{name:s,value:n}=t;t.type==="tel"&&(n=t.value.replace(/[\(\)\-\s]/g,"")),this._updateProfile(s,n,()=>{this._sendDoneStepEvent()})}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleCityChange(e){this._handleCityInputChange(e),this._debounceCityChange(e)}_handleCityInputChange(e){this.city=e.target.value}_handleSuggestions(e){e.features.length<1&&(this.locationError=this.t.no_locations_found),this.locations=e.features}_handleLocationSelection(e){this.city=e.target.dataset.placeName;const t=getLocationGridFromMapbox(e.target.id,zumeProfile.profile.location);this.localValue=t,this._clearLocations()}handleSubmitLocation(){if(this.localValue.source==="ip"){const{label:e,level:t,lat:s,lng:n}=this.localValue;this.localValue={source:"user",grid_id:!1,label:e,level:t,lat:Number(s),lng:Number(n)}}this._updateProfile("location_grid_meta",this.localValue,()=>{this._sendDoneStepEvent()})}_updateProfile(e,t,s=()=>{}){this.loading=!0;const n={[e]:t};fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(n),headers:{"X-WP-Nonce":jsObject.nonce}}).then(()=>{s()}).catch(r=>{console.error(r)}).finally(()=>{this.loading=!1})}_clearLocations(){this.locations=[]}createRenderRoot(){return this}}window.customElements.define("complete-profile",qe);class Ve extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},inviteCode:{type:String}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.t={},this.inviteCode="123456",this.url=`https://zume5.test/zume_app/plan_invite${this.inviteCode!==""?"?code="+this.inviteCode:""}`}render(){return a`
            <div class="center stack">
                <h1>Invite your friends to join your training</h1>
                <p>Share the link below with your friends so that they can join your training.</p>
                <share-links url=${this.url} title="Join my zume plan" .t=${this.t}></share-links>
                <p>Alternatively your friends can scan this QR code in order to join.</p>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${this.url}" alt="" />
            </div>
        `}createRenderRoot(){return this}}window.customElements.define("invite-friends",Ve);class Je extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},errorMessage:{attribute:!1},doneText:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.state={},this.errorMessage="",this.doneText="",this.loading=!1}firstUpdated(){if(this.wizardStateManager=new ue(this.module),this.doneText=this.t.connect_success,this.variant===l.connectingToCoach){this.loading=!0;const e=(t=>{this.loading=!1,t===!1&&(this.doneText=this.t.connect_fail,this.errorMessage=this.t.error_connecting),t.coach_request&&t.coach_request.errors&&Object.keys(t.coach_request.errors).length!==0&&Object.keys(t.coach_request.errors)[0]==="already_has_coach"&&(this.doneText=this.t.already_coached,this.errorMessage=this.t.error_connecting),this.errorMessage!==""&&this.hideErorrMessage()}).bind(this);makeRequest("POST","get_a_coach",{},"zume_system/v1/").done(e).fail(t=>{console.log(t)})}}hideErorrMessage(){setTimeout(()=>{this.errorMessage=""},3e3)}render(){return a`
        <form class="inputs stack-2" @submit=${this._handleDone}>
            ${this.variant===l.contactPreferences?a`
                <h2 class="f-1">${this.t.contact_preference_question}</h2>
                <div class="stack">
                    <div>
                        <input type="checkbox" name="contact-preference" id="email" value="email" @change=${this._handleChange}/>
                        <label for="email">${this.t.email}</label>
                    </div>
                    <div>
                        <input type="checkbox" name="contact-preference" id="text" value="text" @change=${this._handleChange}/>
                        <label for="text">${this.t.text}</label>
                    </div>
                    <div>
                        <input type="checkbox" name="contact-preference" id="phone" value="phone" @change=${this._handleChange}/>
                        <label for="phone">${this.t.phone}</label>
                    </div>
                    <div>
                        <input type="checkbox" name="contact-preference" id="whatsapp" value="whatsapp" @change=${this._handleChange}/>
                        <label for="whatsapp">${this.t.whatsapp}</label>
                    </div>
                </div>
            `:""}

            ${this.variant===l.languagePreferences?a`
                <h2 class="f-1">${this.t.language_preference_question}</h2>
                <div class="stack">
                    <label for="language">${this.t.language_preference}</label>
                    <input type="text" name="language-preference" id="language" @change=${this._handleChange}/>
                </div>
            `:""}

            ${this.variant===l.howCanWeServe?a`
                <h2 class="f-1">${this.t.how_can_we_serve}</h2>
                <div class="stack">
                    <div>
                        <input type="checkbox" name="contact-preference" id="coaching" value="coaching" @change=${this._handleChange}/>
                        <label for="coaching">${this.t.coaching}</label>
                    </div>
                    <div>
                        <input type="checkbox" name="contact-preference" id="technical" value="technical" @change=${this._handleChange}/>
                        <label for="technical">${this.t.technical_assistance}</label>
                    </div>
                    <div>
                        <input type="checkbox" name="contact-preference" id="implementation" value="implementation" @change=${this._handleChange}/>
                        <label for="implementation">${this.t.question_implementation}</label>
                    </div>
                    <div>
                        <input type="checkbox" name="contact-preference" id="content" value="content" @change=${this._handleChange}/>
                        <label for="content">${this.t.question_content}</label>
                    </div>
                    <div>
                        <input type="checkbox" name="contact-preference" id="group-started" value="group-started" @change=${this._handleChange}/>
                        <label for="group-started">${this.t.help_with_group}</label>
                    </div>
                </div>
            `:""}
            ${this.variant===l.connectingToCoach?a`

                <h1>${this.t.connecting_coach_title}</h1>
                <div class="stack">
                    ${this.loading===!0?a`<p>${this.t.please_wait} <span class="loading-spinner active"></span></p>`:a`<p>${this.doneText}</p>`}
                </div>
            `:""}
            ${this.variant!==l.connectingToCoach?a`
                    <div class="cluster">
                        <button type="submit" class="btn" ?disabled=${this.loading}>${this.t.done}</button>
                        <span class="loading-spinner ${this.loading?"active":""}"></span>
                    </div>
                `:""}
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        </form>
        `}_handleDone(e){if(e&&e.preventDefault(),Object.keys(this.state).length===0){this.errorMessage=this.t.missing_response,this.hideErorrMessage();return}this.wizardStateManager.add(this.variant,this.state);const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)}_handleChange(e){e.target.type==="checkbox"&&(this.state[e.target.value]=e.target.checked),e.target.type==="text"&&(this.state.value=e.target.value)}clearErrorMessage(){this.errorMessage=""}createRenderRoot(){return this}}customElements.define("get-coach",Je);class Ze extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.link_broken),this._sendDoneStepEvent(),this.loading=!1;return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","connect/public-plan",{code:t},"zume_system/v1").then(s=>{console.log(s),this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_plan_code"?this.setErrorMessage(this.t.link_broken):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return a`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("join-training",Ze);class Ke extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.link_broken),this._sendDoneStepEvent(),this.loading=!1;return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","connect/plan",{code:t},"zume_system/v1").then(s=>{console.log(s),this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_plan_code"?this.setErrorMessage(this.t.link_broken):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return a`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("join-friends-plan",Ke);class Ye extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1;return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","connect/friend",{code:t},"zume_system/v1").then(s=>{console.log(s),this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_friend_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return a`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("connect-friend",Ye);class Ge extends p{static get properties(){return{title:{type:String},sections:{type:Array}}}render(){return a`
            <div class="container">
                <h1>${this.title}</h1>
                ${this.sections.map((e,t)=>a`
                        <course-section .section=${e}></course-section>
                    `)}
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-guide",Ge);const he=["slideshow","guide"];class Xe extends p{static get properties(){return{languageCode:{type:String},homeUrl:{type:String},assetsPath:{type:String},translations:{type:Object},lessonIndex:{attribute:!1},view:{attribute:!1},linkNodes:{attribute:!1}}}constructor(){super();const e=new URL(window.location.href);if(e.searchParams.has("session")){const s=Number(e.searchParams.get("session"));Number.isInteger(s)?this.lessonIndex=s-1:this.lessonIndex=0}else this.lessonIndex=0;if(this.changeSession(this.lessonIndex,!1),e.searchParams.has("view")){const s=e.searchParams.get("view");he.includes(s)&&(this.view=s)}else this.view="slideshow";this.handleSessionLink=this.handleSessionLink.bind(this),this.handleHistoryPopState=this.handleHistoryPopState.bind(this),window.addEventListener("popstate",this.handleHistoryPopState),document.querySelectorAll(".language-selector").forEach(function(s){s.addEventListener("click",()=>{const n=s.dataset.value,r=new URL(location.href),o=r.pathname.substring(1).split("/");let d="";o.length>0&&jsObject.zume_languages.includes(o[0])?d=o.slice(1).join("/"):d=o.join("/"),n!=="en"?d="/"+n+"/"+d:d="/"+d,d+=r.search,location.href=d})})}handleSessionLink(e){const t=e.target,s=Number(t.dataset.sessionNumber);this.lessonIndex=s,this.changeSession(this.lessonIndex)}getNextSession(){this.lessonIndex+=1,this.changeSession(this.lessonIndex)}getPreviousSession(){this.lessonIndex-=1,this.changeSession(this.lessonIndex)}changeSession(e,t=!0){let s=e;e<0&&(s=0),e>zumeSessions.length-1&&(s=zumeSessions.length-1),this.lessonIndex=s,this.session=zumeSessions[s],t&&this.pushHistory()}pushHistory(){const e=this.lessonIndex,t=this.view,s=new URL(window.location.href);e!==null&&Number.isInteger(e)&&s.searchParams.set("session",e+1),t&&s.searchParams.set("view",t),window.history.pushState(null,null,s.href)}handleHistoryPopState(){const e=new URL(location.href),t=e.searchParams.has("session")?Number(e.searchParams.get("session")):null,s=e.searchParams.get("view");Number.isInteger(t)&&(this.lessonIndex=t-1,this.changeSession(this.lessonIndex,!1)),s&&he.includes(s)&&(this.view=s)}getSessionTitle(){return!this.session||!this.session.t?"":this.session.t}getSessionSections(){return!this.session||!this.session.sections?[]:this.session.sections}switchViews(e=!0){this.view==="guide"?this.view="slideshow":this.view="guide",e===!0&&this.pushHistory({view:this.view})}render(){return a`
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
                        ${zumeSessions.map((e,t)=>a`
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
                <button id="hamburger-menu" class="nav-toggle show">
                    <span class="hamburger brand"></span>
                </button>
            </span>

            <div class="container"></div>
            ${this.view==="guide"?a`<course-guide title="${this.getSessionTitle()}" .sections=${this.getSessionSections()}></course-guide>`:a`<course-slideshow title="${this.getSessionTitle()}" .sections=${this.getSessionSections()}></course-slideshow>`}

        `}createRenderRoot(){return this}}customElements.define("course-presenter",Xe);class Qe extends p{static get properties(){return{section:{type:Object}}}constructor(){super()}render(){return this.title=this.section.t??null,this.description=this.section.d??null,this.info=this.section.info??null,this.duration=this.section.duration??null,this.parts=this.section.parts??[],a`
            ${this.title!==null?a`<h1>${this.title}</h1>`:""}
            ${this.description!==null?a`<p>${this.description}</p>`:""}
            ${this.info!==null?a`<p>${this.info}</p>`:""}
            ${this.duration!==null?a`<p>${this.duration}</p>`:""}

            ${this.parts.map(e=>a`<part-switcher .partData=${e}></part-switcher>`)}

        `}createRenderRoot(){return this}}customElements.define("course-section",Qe);class et extends p{static get properties(){return{title:{type:String},sections:{type:Array},sectionIndex:{attribute:!1},partIndex:{attribute:!1},currentSlide:{attribute:!1},index:{attribute:!1}}}constructor(){super(),this.reset(),this.listenForKeyboard=this.listenForKeyboard.bind(this),this.listenForMouseClick=this.listenForMouseClick.bind(this)}reset(){this.sectionIndex=-1,this.partIndex=-1,this.currentSlide=null,this.index=[]}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.listenForKeyboard),document.addEventListener("mousedown",this.listenForMouseClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.listenForKeyboard),document.removeEventListener("mousedown",this.listenForMouseClick)}attributeChangedCallback(e,t,s){super.attributeChangedCallback(e,t,s),e==="title"&&t!==s&&this.reset()}setupIndex(){this.sections&&(this.index=this.sections.map(e=>e.parts?e.parts.length:0))}nextSlide(){if(this.sectionIndex>this.sections.length-1&&(this.sectionIndex=this.sections.length-1),this.index[this.sectionIndex]===0||this.index[this.sectionIndex]===this.partIndex+1){if(this.sectionIndex===this.sections.length-1)return;this.setSlide(this.sectionIndex+1,-1);return}if(this.index[this.sectionIndex]>0){this.setSlide(this.sectionIndex,this.partIndex+1);return}}previousSlide(){if(this.sectionIndex<0&&(this.sectionIndex=0),this.index[this.sectionIndex]===0||this.partIndex===-1){if(this.sectionIndex===0)return;const e=this.index[this.sectionIndex-1]-1;this.setSlide(this.sectionIndex-1,e);return}this.setSlide(this.sectionIndex,this.partIndex-1)}listenForKeyboard(e){["Space","ArrowRight"].includes(e.code)&&this.nextSlide(),["Backspace","ArrowLeft"].includes(e.code)&&this.previousSlide()}listenForMouseClick(e){const{x:t}=e,{innerWidth:s}=window,n=10/100*s+80;t<n&&(this.querySelector(".clickable-area.back").classList.add("visible"),this.previousSlide()),t>s-n&&(this.querySelector(".clickable-area.forward").classList.add("visible"),this.nextSlide())}setSlide(e,t){if(this.sectionIndex=e,this.partIndex=t,t<0){const s=this.sections[e];this.currentSlide=a`<section-part .partData=${s}></section-part>`}else{const s=this.sections[e].parts[t];this.currentSlide=a`<part-switcher .partData=${s}></part-switcher>`}}render(){return this.index.length===0&&this.setupIndex(),this.sectionIndex<0&&this.setSlide(0,-1),a`
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

        `}createRenderRoot(){return this}}customElements.define("course-slideshow",et);class tt extends p{static get properties(){return{partData:{type:Object}}}render(){switch(this.partData.type){case"section":return a`<section-part .partData=${this.partData}></section-part>`;case"watch":return a`<watch-part .partData=${this.partData}></watch-part>`;case"discuss":return a`<discuss-part .partData=${this.partData}></discuss-part>`;case"read":return a`<read-part .partData=${this.partData}></read-part>`;case"see":return a`<see-part .partData=${this.partData}></see-part>`;case"share":return a`<share-part .partData=${this.partData}></share-part>`;case"listen":return a`<listen-part .partData=${this.partData}></listen-part>`;case"form":return a`<form-part .partData=${this.partData}></form-part>`;case"checkin":return a`<checkin-part .partData=${this.partData}></checkin-part>`;case"cta":default:return a`<basic-part .partData=${this.partData}></basic-part>`}}createRenderRoot(){return this}}customElements.define("part-switcher",tt);class st extends p{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("basic-part",st);class it extends p{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}

            <div><img class="mx-auto" src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&amp;color=323a68&amp;data=https://zume5.training/zume_app/checkin/?code=5678" width="300px" alt="QR Code"></div>
            <p>
                or <br>
                zume.training/checkin and use code <strong class="text-lightblue"><a href="https://zume5.training/zume_app/checkin/?code=5678" target="_blank">5678</a></strong>
            </p>
        `}createRenderRoot(){return this}}customElements.define("checkin-part",it);class nt extends p{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("discuss-part",nt);class at extends p{static get properties(){return{partData:{type:Object}}}render(){return this.partData.t,this.partData.d,this.partData.info,a`
            ${this.title!==null?a`<h2>${this.title}</h2>`:""}
            ${this.description!==null?a`<p>${this.description}</p>`:""}
            ${this.info!==null?a`<p>${this.info}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("form-part",at);class rt extends p{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            <h2 class="brand">LISTEN</h2>
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("listen-part",rt);class ot extends p{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            <h2 class="brand">READ</h2>
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("read-part",ot);class lt extends p{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            ${e!==null?a`<h2>${e}</h2>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("section-part",lt);class ct extends p{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            <h2 class="brand">SEE</h2>
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("see-part",ct);class ht extends p{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("share-part",ht);class dt extends p{static get properties(){return{partData:{type:Object}}}render(){const e=this.partData.t??null,t=this.partData.d??null,s=this.partData.info??null;return a`
            ${e!==null?a`<h3>${e}</h3>`:""}
            ${t!==null?a`<p>${t}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("watch-part",dt);class $e extends p{constructor(){super()}render(){return a`
            <div class="container">
                <div class="circle">
                    <div class="triangle"></div>
                </div>
            </div>
        `}}T($e,"styles",ke`
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
    `);window.customElements.define("play-button",$e);class ut extends p{constructor(){super();T(this,"webShareSupported",!!window.navigator.share);T(this,"clipboardSupported",!!window.navigator.clipboard);this.shareFeedback="",this.copyFeedback=""}static get properties(){return{url:{type:String},title:{type:String},t:{type:Object},shareFeedback:{attribute:!1},copyFeedback:{attribute:!1}}}share(){navigator.share({title:this.title,url:this.url,text:title}).then(()=>{this.shareFeedback=this.t.share_feedback,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(t=>console.error("Error sharing",t))}copyLink(){navigator.clipboard.writeText(this.url).then(()=>{this.copyFeedback=this.t.copy_feedback,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(t=>console.error(t))}noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported}render(){return a`
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
        `}createRenderRoot(){return this}}customElements.define("share-links",ut);const de=document.querySelector(".nav-toggle"),pt=document.querySelector("#nav");de&&de.addEventListener("click",i=>{pt.classList.toggle("nav--visible")});const gt=({title:i,url:e,copyFeedback:t,shareFeedback:s})=>({title:i,url:e,webShareSupported:navigator.share,clipboardSupported:navigator.clipboard,shareFeedback:"",copyFeedback:"",noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported},share(){navigator.share({title:i,url:e,text:i}).then(()=>{this.shareFeedback=s,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(n=>console.error("Error sharing",n))},copyLink(){navigator.clipboard.writeText(e).then(()=>{this.copyFeedback=t,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(n=>console.error(n))}});window.zumeInitShareLinks=()=>{ye({share:gt}).mount()};
//# sourceMappingURL=main-89c4a7d3.js.map
