var mt=Object.defineProperty;var gt=(i,t,e)=>t in i?mt(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var Q=(i,t,e)=>(gt(i,typeof t!="symbol"?t+"":t,e),e);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const j=window,Y=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol(),G=new WeakMap;let dt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==X)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Y&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=G.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&G.set(e,t))}return t}toString(){return this.cssText}};const yt=i=>new dt(typeof i=="string"?i:i+"",void 0,X),_t=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,n,r)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[r+1],i[0]);return new dt(e,i,X)},bt=(i,t)=>{Y?i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const s=document.createElement("style"),n=j.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)})},K=Y?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return yt(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var W;const H=window,tt=H.trustedTypes,St=tt?tt.emptyScript:"",et=H.reactiveElementPolyfillSupport,J={toAttribute(i,t){switch(t){case Boolean:i=i?St:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},ut=(i,t)=>t!==i&&(t==t||i==i),B={attribute:!0,type:String,converter:J,reflect:!1,hasChanged:ut};let w=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const n=this._$Ep(s,e);n!==void 0&&(this._$Ev.set(n,s),t.push(n))}),t}static createProperty(t,e=B){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s=typeof t=="symbol"?Symbol():"__"+t,n=this.getPropertyDescriptor(t,s,e);n!==void 0&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(n){const r=this[t];this[e]=n,this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||B}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const n of s)this.createProperty(n,e[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const n of s)e.unshift(K(n))}else t!==void 0&&e.push(K(t));return e}static _$Ep(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return bt(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=B){var n;const r=this.constructor._$Ep(t,s);if(r!==void 0&&s.reflect===!0){const a=(((n=s.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?s.converter:J).toAttribute(e,s.type);this._$El=t,a==null?this.removeAttribute(r):this.setAttribute(r,a),this._$El=null}}_$AK(t,e){var s;const n=this.constructor,r=n._$Ev.get(t);if(r!==void 0&&this._$El!==r){const a=n.getPropertyOptions(r),d=typeof a.converter=="function"?{fromAttribute:a.converter}:((s=a.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?a.converter:J;this._$El=r,this[r]=d.fromAttribute(e,a.type),this._$El=null}}requestUpdate(t,e,s){let n=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||ut)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((n,r)=>this[r]=n),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach(n=>{var r;return(r=n.hostUpdate)===null||r===void 0?void 0:r.call(n)}),this.update(s)):this._$Ek()}catch(n){throw e=!1,this._$Ek(),n}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var n;return(n=s.hostUpdated)===null||n===void 0?void 0:n.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$EO(s,this[s],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};w.finalized=!0,w.elementProperties=new Map,w.elementStyles=[],w.shadowRootOptions={mode:"open"},et==null||et({ReactiveElement:w}),((W=H.reactiveElementVersions)!==null&&W!==void 0?W:H.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var V;const L=window,x=L.trustedTypes,st=x?x.createPolicy("lit-html",{createHTML:i=>i}):void 0,Z="$lit$",_=`lit$${(Math.random()+"").slice(9)}$`,pt="?"+_,wt=`<${pt}>`,E=document,R=()=>E.createComment(""),I=i=>i===null||typeof i!="object"&&typeof i!="function",$t=Array.isArray,At=i=>$t(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",D=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,it=/-->/g,nt=/>/g,b=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ot=/'/g,rt=/"/g,ft=/^(?:script|style|textarea|title)$/i,xt=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),o=xt(1),g=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),at=new WeakMap,A=E.createTreeWalker(E,129,null,!1),Et=(i,t)=>{const e=i.length-1,s=[];let n,r=t===2?"<svg>":"",a=P;for(let l=0;l<e;l++){const h=i[l];let y,c,p=-1,m=0;for(;m<h.length&&(a.lastIndex=m,c=a.exec(h),c!==null);)m=a.lastIndex,a===P?c[1]==="!--"?a=it:c[1]!==void 0?a=nt:c[2]!==void 0?(ft.test(c[2])&&(n=RegExp("</"+c[2],"g")),a=b):c[3]!==void 0&&(a=b):a===b?c[0]===">"?(a=n??P,p=-1):c[1]===void 0?p=-2:(p=a.lastIndex-c[2].length,y=c[1],a=c[3]===void 0?b:c[3]==='"'?rt:ot):a===rt||a===ot?a=b:a===it||a===nt?a=P:(a=b,n=void 0);const z=a===b&&i[l+1].startsWith("/>")?" ":"";r+=a===P?h+wt:p>=0?(s.push(y),h.slice(0,p)+Z+h.slice(p)+_+z):h+_+(p===-2?(s.push(void 0),l):z)}const d=r+(i[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return[st!==void 0?st.createHTML(d):d,s]};class T{constructor({strings:t,_$litType$:e},s){let n;this.parts=[];let r=0,a=0;const d=t.length-1,l=this.parts,[h,y]=Et(t,e);if(this.el=T.createElement(h,s),A.currentNode=this.el.content,e===2){const c=this.el.content,p=c.firstChild;p.remove(),c.append(...p.childNodes)}for(;(n=A.nextNode())!==null&&l.length<d;){if(n.nodeType===1){if(n.hasAttributes()){const c=[];for(const p of n.getAttributeNames())if(p.endsWith(Z)||p.startsWith(_)){const m=y[a++];if(c.push(p),m!==void 0){const z=n.getAttribute(m.toLowerCase()+Z).split(_),N=/([.?@])?(.*)/.exec(m);l.push({type:1,index:r,name:N[2],strings:z,ctor:N[1]==="."?Pt:N[1]==="?"?Rt:N[1]==="@"?It:M})}else l.push({type:6,index:r})}for(const p of c)n.removeAttribute(p)}if(ft.test(n.tagName)){const c=n.textContent.split(_),p=c.length-1;if(p>0){n.textContent=x?x.emptyScript:"";for(let m=0;m<p;m++)n.append(c[m],R()),A.nextNode(),l.push({type:2,index:++r});n.append(c[p],R())}}}else if(n.nodeType===8)if(n.data===pt)l.push({type:2,index:r});else{let c=-1;for(;(c=n.data.indexOf(_,c+1))!==-1;)l.push({type:7,index:r}),c+=_.length-1}r++}}static createElement(t,e){const s=E.createElement("template");return s.innerHTML=t,s}}function C(i,t,e=i,s){var n,r,a,d;if(t===g)return t;let l=s!==void 0?(n=e._$Co)===null||n===void 0?void 0:n[s]:e._$Cl;const h=I(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==h&&((r=l==null?void 0:l._$AO)===null||r===void 0||r.call(l,!1),h===void 0?l=void 0:(l=new h(i),l._$AT(i,e,s)),s!==void 0?((a=(d=e)._$Co)!==null&&a!==void 0?a:d._$Co=[])[s]=l:e._$Cl=l),l!==void 0&&(t=C(i,l._$AS(i,t.values),l,s)),t}class Ct{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:n}=this._$AD,r=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:E).importNode(s,!0);A.currentNode=r;let a=A.nextNode(),d=0,l=0,h=n[0];for(;h!==void 0;){if(d===h.index){let y;h.type===2?y=new O(a,a.nextSibling,this,t):h.type===1?y=new h.ctor(a,h.name,h.strings,this,t):h.type===6&&(y=new Tt(a,this,t)),this._$AV.push(y),h=n[++l]}d!==(h==null?void 0:h.index)&&(a=A.nextNode(),d++)}return r}v(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class O{constructor(t,e,s,n){var r;this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=n,this._$Cp=(r=n==null?void 0:n.isConnected)===null||r===void 0||r}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),I(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==g&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):At(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==$&&I(this._$AH)?this._$AA.nextSibling.data=t:this.$(E.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:n}=t,r=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=T.createElement(n.h,this.options)),n);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===r)this._$AH.v(s);else{const a=new Ct(r,this),d=a.u(this.options);a.v(s),this.$(d),this._$AH=a}}_$AC(t){let e=at.get(t.strings);return e===void 0&&at.set(t.strings,e=new T(t)),e}T(t){$t(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,n=0;for(const r of t)n===e.length?e.push(s=new O(this.k(R()),this.k(R()),this,this.options)):s=e[n],s._$AI(r),n++;n<e.length&&(this._$AR(s&&s._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){const n=t.nextSibling;t.remove(),t=n}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class M{constructor(t,e,s,n,r){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=$}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,n){const r=this.strings;let a=!1;if(r===void 0)t=C(this,t,e,0),a=!I(t)||t!==this._$AH&&t!==g,a&&(this._$AH=t);else{const d=t;let l,h;for(t=r[0],l=0;l<r.length-1;l++)h=C(this,d[s+l],e,l),h===g&&(h=this._$AH[l]),a||(a=!I(h)||h!==this._$AH[l]),h===$?t=$:t!==$&&(t+=(h??"")+r[l+1]),this._$AH[l]=h}a&&!n&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Pt extends M{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}}const kt=x?x.emptyScript:"";class Rt extends M{constructor(){super(...arguments),this.type=4}j(t){t&&t!==$?this.element.setAttribute(this.name,kt):this.element.removeAttribute(this.name)}}class It extends M{constructor(t,e,s,n,r){super(t,e,s,n,r),this.type=5}_$AI(t,e=this){var s;if((t=(s=C(this,t,e,0))!==null&&s!==void 0?s:$)===g)return;const n=this._$AH,r=t===$&&n!==$||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,a=t!==$&&(n===$||r);r&&this.element.removeEventListener(this.name,this,n),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class Tt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}}const lt=L.litHtmlPolyfillSupport;lt==null||lt(T,O),((V=L.litHtmlVersions)!==null&&V!==void 0?V:L.litHtmlVersions=[]).push("2.7.3");const Ot=(i,t,e)=>{var s,n;const r=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:t;let a=r._$litPart$;if(a===void 0){const d=(n=e==null?void 0:e.renderBefore)!==null&&n!==void 0?n:null;r._$litPart$=a=new O(t.insertBefore(R(),d),d,void 0,e??{})}return a._$AI(i),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var F,q;let u=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ot(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return g}};u.finalized=!0,u._$litElement$=!0,(F=globalThis.litElementHydrateSupport)===null||F===void 0||F.call(globalThis,{LitElement:u});const ht=globalThis.litElementPolyfillSupport;ht==null||ht({LitElement:u});((q=globalThis.litElementVersions)!==null&&q!==void 0?q:globalThis.litElementVersions=[]).push("3.3.2");const k={makeAPlan:"getting-started",connectToCoach:"connect-to-coach"},f={completeProfile:"completeProfile",makePlan:"makePlan",inviteFriends:"inviteFriends",connectToCoach:"connectToCoach"},v={updateName:"update-your-name",updateLocation:"update-your-location",updatePhone:"update-your-phone"},U={[v.updateName]:{slug:v.updateName,component:(i,t)=>o`
                            <complete-profile
                                name=${i.slug}
                                module=${i.module}
                                t="${JSON.stringify(t.complete_profile)}"
                                variant="name"
                            ></complete-profile>
                        `},[v.updateLocation]:{slug:v.updateLocation,component:(i,t)=>o`
                            <complete-profile
                                name=${i.slug}
                                module=${i.module}
                                t="${JSON.stringify(t.complete_profile)}"
                                variant="location"
                            ></complete-profile>
                        `},[v.updatePhone]:{slug:v.updatePhone,component:(i,t)=>o`
                            <complete-profile
                                name=${i.slug}
                                module=${i.module}
                                t="${JSON.stringify(t.complete_profile)}"
                                variant="phone"
                            ></complete-profile>
                        `}};class zt extends u{static get properties(){return{type:{type:String},finishUrl:{type:String},step:{attribute:!1}}}constructor(){super(),this.stepIndex=0,this.steps=[],this.modules={},this.step={},this.t=window.SHAREDFUNCTIONS.escapeObject(jsObject.translations),this._handleHistoryPopState=this._handleHistoryPopState.bind(this),window.addEventListener("popstate",this._handleHistoryPopState)}render(){return this.isWizardLoaded()||(this.loadWizard(),this._handleHistoryPopState()),this.steps.length===0?o`
            <div class="cover">
                <h1 class="brand">${this.t.bad_wizard}</h1>
                <p>${this.t.found_bad_wizard}</p>
                <div class="center"><img class="w-20" src="https://imgs.search.brave.com/3f3MurVApxsoxJlmqxLF0fs5-WlAk6sEu9IV3sICb_k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWR2ZXJ0aXNlY2Fz/dC5jb20vcG9kY2Fz/dC9pbWFnZS9WZXJ5/QmFkV2l6YXJkcw.jpeg" alt="bad wizards" /></div>
                <a href="/">${this.t.home}</a>
            </div>`:o`
        <div class="cover container center">

            ${this.currentStep()}

            <div class="stack-1 | fixed bottom left right p-2">
                ${this.navigationButtons()}
                ${this.stepCounter()}
            </div>

        </div>
        `}currentStep(){const t=this.steps[this.stepIndex];return t.component(t,this.t)}navigationButtons(){const{skippable:t}=this.step,e=this.stepIndex===0,s=this.stepIndex===this.steps.length-1;return o`
        <div class="text-center d-flex justify-content-between">
            ${e?"":o`<button @click=${this._onBack} class="btn outline ">${this.t.back}</button>`}
            <div class="cluster ms-auto">
                ${t&&!s?o`<button @click=${this._onSkip} class="brand">${this.t.skip}</button>`:""}
                ${s?"":o`<button @click=${this._onNext} class="btn">${this.t.next}</button>`}
                ${s?o`<button @click=${this._onFinish} class="btn">${this.t.finish}</button>`:""}
            </div>
        </div>
        `}stepCounter(){return o`
        <div class="center">
            <div class="cluster">
                ${this.steps.map((t,e)=>{const s=e<=this.stepIndex;return o`<div class="step-circle ${s?"complete":""}"></div>`})}
            </div>
        </div>
        <div class="text-center">
            ${this.stepIndex+1} / ${this.steps.length}
        </div>
        `}_onBack(){if(this.stepIndex>0){const t=this.stepIndex-1;this._gotoStep(t)}}_onNext(){if(this.stepIndex+1<this.steps.length){const t=this.stepIndex+1;this._gotoStep(t)}}_onSkip(){const t=this.step.module;for(let e=this.stepIndex+1;e<this.steps.length-1;e++)if(this.steps[e].module!==t){this._gotoStep(e);return}this._onFinish()}_onFinish(){this.finishUrl||(window.location.href="/"),window.location.href=this.finishUrl}_gotoStep(t,e=!0){if(this.steps.length!==0&&(this.stepIndex=this.clampSteps(t),this.step=this.steps[this.stepIndex],e)){const s=new URL(window.location.href),n=s.pathname.split("/"),r=n[n.length-1];let a="";Object.values(k).includes(r)?a=n.join("/")+"/"+this.step.slug+s.search:a=n.slice(0,-1).join("/")+"/"+this.step.slug+s.search,window.history.pushState(null,null,a)}}clampSteps(t){let e=t;return t>this.steps.length-1&&(e=this.steps.length-1),t<0&&(e=0),e}_handleHistoryPopState(){const e=new URL(window.location.href).pathname.split("/"),s=e[e.length-1];Object.values(k).includes(s)&&this._gotoStep(0,!1),this.steps.forEach(({slug:n},r)=>{s===n&&this._gotoStep(r,!1)})}makeModule(t=[],e=!1){const s={steps:[],skippable:e};return t.forEach(n=>{Object.keys(U).includes(n)&&s.steps.push(U[n])}),s}getModule(t,e=!1){const s={[f.completeProfile]:{steps:[U[v.updateName],U[v.updateLocation]],skippable:e},[f.makePlan]:{steps:[{slug:"make-a-plan",component:r=>o`
                            <h1>Make a plan</h1>
                            <p>We would like to help you succeed with this training.</p>
                            <p>Making a plan can help you with success.</p>
                            <p>Answering the following questions will help us make you a plan.</p>
                            <p>Or you can skip if you prefer</p>
                        `},{slug:"how-many-sessions",component:r=>o`
                            <h1>Will you do 1 or 2 hour training sessions?</h1>
                            <div class="stack">
                                <button class="btn">1 hour (20 sessions)</button>
                                <button class="btn">2 hour (10 sessions)</button>
                            </div>
                        `},{slug:"what-time-of-day",component:r=>o`
                            <h1>What time of day?</h1>
                            <div class="stack">
                                <button class="btn">Morning</button>
                                <button class="btn">Afternoon</button>
                                <button class="btn">Evening</button>
                            </div>
                        `},{slug:"what-time-interval",component:r=>o`
                            <h1>How often will you meet?</h1>
                            <div class="stack">
                                <button class="btn">Every day</button>
                                <button class="btn">Once a week</button>
                                <button class="btn">Twice a month</button>
                                <button class="btn">Once a month</button>
                            </div>
                        `},{slug:"when-will-you-start",component:r=>o`
                            <h1>When do you plan to start?</h1>
                            <input type="date">
                        `}],skippable:e},[f.inviteFriends]:{steps:[{slug:"invite-your-friends",component:r=>o`
                            <h1>Invite your friends to join your training</h1>
                            <p>Share the link below with your friends so that they can join your training.</p>
                            <p><a href="https://zume.training/zume_app/friend-invite?123456">https://zume.training/zume_app/friend-invite?123456</a></p>
                            <p>Alternatively your friends can scan this QR code in order to join.</p>
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://zume5.training/zume_app/friend_invite?code=123456" alt="" />
                        `}],skippable:e},[f.connectToCoach]:{steps:[{slug:"contact-preference",component:r=>o`
                            <h1>What is your contact preference?</h1>
                            <label for="email">Email</label>
                            <input type="checkbox" name="contact-preference" id="email" value="email" />
                            <label for="text">Text</label>
                            <input type="checkbox" name="contact-preference" id="text" value="text" />
                            <label for="phone">Phone</label>
                            <input type="checkbox" name="contact-preference" id="phone" value="phone" />
                            <label for="whatsapp">Whatsapp</label>
                            <input type="checkbox" name="contact-preference" id="whatsapp" value="whatsapp" />
                        `},{slug:"language-preference",component:r=>o`
                            <h1>What is your language preference?</h1>
                            <label for="language">Language Preference</label>
                            <input type="text" name="language-preference" id="language"/>
                        `},{slug:"how-can-we-serve",component:r=>o`
                            <h1>How can we serve you?</h1>
                            <label for="coaching">Coaching</label>
                            <input type="checkbox" name="contact-preference" id="coaching" value="coaching" />
                            <label for="technical">Technical Assistance</label>
                            <input type="checkbox" name="contact-preference" id="technical" value="technical" />
                            <label for="implementation">Question about implementing the training</label>
                            <input type="checkbox" name="contact-preference" id="implementation" value="implementation" />
                            <label for="content">Question about the content</label>
                            <input type="checkbox" name="contact-preference" id="content" value="content" />
                            <label for="group-started">Help with what to do after starting a group</label>
                            <input type="checkbox" name="contact-preference" id="group-started" value="group-started" />
                        `},{slug:"connected-to-coach",component:r=>o`
                            <h1>Connecting you to a Coach</h1>
                            <p>Please wait while we connect you <span class="loading-spinner active"></span></p>
                            <p>Successfully connected you. One of our team will contact you in the next 24-48 hours</p>
                        `}],skippable:e}};return Object.keys(s).includes(t)?s[t]:s[f.completeProfile]}isWizardLoaded(){return Object.keys(this.modules).length!==0}loadWizard(){const t=this.getWizard();this.modules=t,this.steps=[],Object.entries(this.modules).forEach(([e,{steps:s,skippable:n}])=>{s.forEach(({component:r,slug:a})=>{const d={component:r,slug:a,module:e,skippable:n};this.steps.push(d)})})}isWizardTypeValid(){return!!Object.values(k).includes(this.type)}getWizard(){return this.isWizardTypeValid()?{[k.makeAPlan]:{[f.completeProfile]:this.makeModule([v.updateName,v.updateLocation],!0),[f.makePlan]:this.getModule(f.makePlan,!0),[f.inviteFriends]:this.getModule(f.inviteFriends,!0)},[k.connectToCoach]:{[f.completeProfile]:this.makeModule([v.updateName,v.updateLocation,v.updatePhone]),[f.connectToCoach]:this.getModule(f.connectToCoach)}}[this.type]:{}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._handleHistoryPopState)}createRenderRoot(){return this}}window.customElements.define("zume-wizard",zt);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const S={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Nt=i=>(...t)=>({_$litDirective$:i,values:t});class Ut{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const jt=i=>i.strings===void 0,Ht={},Lt=(i,t=Ht)=>i._$AH=t;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mt=Nt(class extends Ut{constructor(i){if(super(i),i.type!==S.PROPERTY&&i.type!==S.ATTRIBUTE&&i.type!==S.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!jt(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===g||t===$)return t;const e=i.element,s=i.name;if(i.type===S.PROPERTY){if(t===e[s])return g}else if(i.type===S.BOOLEAN_ATTRIBUTE){if(!!t===e.hasAttribute(s))return g}else if(i.type===S.ATTRIBUTE&&e.getAttribute(s)===t+"")return g;return Lt(i),t}});class Wt extends u{static get properties(){return{name:{type:String},module:{type:String},t:{type:Object},variant:{type:String},locations:{attribute:!1},locationError:{attribute:!1},city:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.variant="",this.t={},this.locations=[],this.locationError="",this.city="",this._handleLocationsChange=this._handleLocationsChange.bind(this),this._clearLocations=this._clearLocations.bind(this),this._handleSuggestions=this._handleSuggestions.bind(this),this._debounceCityChange=debounce(getAddressSuggestions(this._handleSuggestions,zumeProfile.map_key)).bind(this),this._handleCityInputChange=this._handleCityInputChange.bind(this)}firstUpdated(){this.renderRoot.querySelector(".inputs input").focus()}render(){return o`
        <div class="inputs">
            ${this.variant==="name"?o`
                <h2 class="f-1">What's your name?</h2>
                <div class="">
                    <label for="name">${this.t.name}</label>
                    <input type="text" id="name" name="name" value="" @change=${this._handleNameChange}>
                </div>
            `:""}

            ${this.variant==="phone"?o`
                <h2 class="f-1">What's your phone number?</h2>
                <div class="">
                    <label for="phone">${this.t.phone}</label>
                    <input type="tel" id="phone" name="phone" value="" @change=${this._handlePhoneChange}>
                </div>
            `:""}

            ${this.variant==="location"?o`
                <h2 class="f-1">What city do you live in?</h2>
                <div class="">
                    <label for="city">${this.t.city}</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        .value="${Mt(this.city)}"
                        @input=${this._handleCityChange}
                    >
                </div>
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
            `:""}
        </div>
        `}_handleNameChange(t){t.stopPropagation();const e={[t.target.name]:t.target.value};this._updateProfile(e)}_handlePhoneChange(t){t.stopPropagation();const e={[t.target.name]:t.target.value};this._updateProfile(e)}_handleCityChange(t){this._handleCityInputChange(t),this._debounceCityChange(t)}_handleCityInputChange(t){}_handleSuggestions(t){t.features.length<1&&(this.locationError=this.t.no_locations_found),this.locations=t.features}_handleLocationsChange(t){this.locations=t}_handleLocationSelection(t){this.city=t.target.dataset.placeName;const e={location_grid_meta:getLocationGridFromMapbox(t.target.id,zumeProfile.profile.location)};this._updateProfile(e),this._clearLocations()}_updateProfile(t){fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(t),headers:{"X-WP-Nonce":jsObject.nonce}}).then(()=>{console.log("success")}).catch(e=>{console.error(e)}).finally(()=>{})}_clearLocations(){this.locations=[]}createRenderRoot(){return this}}window.customElements.define("complete-profile",Wt);class Bt extends u{static get properties(){return{part:{type:Object}}}render(){const t=this.part.t??null,e=this.part.d??null,s=this.part.info??null;return o`
            ${t!==null?o`<h3>${t}</h3>`:""}
            ${e!==null?o`<p>${e}</p>`:""}
            ${s!==null?o`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("basic-part",Bt);class Vt extends u{static get properties(){return{title:{type:String},sections:{type:Array}}}render(){return o`
            <div class="container">
                <h1>${this.title}</h1>
                ${this.sections.map((t,e)=>o`
                        <course-section .section=${t}></course-section>
                    `)}
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-guide",Vt);class Dt extends u{static get properties(){return{lessonIndex:{attribute:!1},view:{attribute:!1}}}constructor(){super(),this.lessonIndex=0,this.changeSession(this.lessonIndex),this.view="slideshow"}getNextSession(){this.lessonIndex+=1,this.changeSession(this.lessonIndex)}getPreviousSession(){this.lessonIndex-=1,this.changeSession(this.lessonIndex)}changeSession(t){if(t<0){this.lessonIndex=0,this.session=zumeSessions[0];return}if(t>zumeSessions.length-1){this.lessonIndex=zumeSessions.length-1,this.session=zumeSessions[zumeSessions.length-1];return}this.session=zumeSessions[t]}getSessionTitle(){return!this.session||!this.session.t?"":this.session.t}getSessionSections(){return!this.session||!this.session.sections?[]:this.session.sections}switchViews(){this.view==="guide"?this.view="slideshow":this.view="guide"}render(){return o`
            <div class="container"><button class="btn" @click=${this.switchViews}>Switch Views</button></div>
            ${this.view==="guide"?o`<course-guide title="${this.getSessionTitle()}" .sections=${this.getSessionSections()}></course-guide>`:o`<course-slideshow title="${this.getSessionTitle()}" .sections=${this.getSessionSections()}></course-slideshow>`}

            <div class="container-md | d-flex justify-content-between py-2">
                <button class="btn outline" @click=${this.getPreviousSession}>Back</button>
                <button class="btn" @click=${this.getNextSession}>Next</button>
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-presenter",Dt);class Ft extends u{static get properties(){return{section:{type:Object}}}constructor(){super()}render(){return this.title=this.section.t??null,this.description=this.section.d??null,this.info=this.section.info??null,this.duration=this.section.duration??null,this.parts=this.section.parts??[],o`
            ${this.title!==null?o`<h1>${this.title}</h1>`:""}
            ${this.description!==null?o`<p>${this.description}</p>`:""}
            ${this.info!==null?o`<p>${this.info}</p>`:""}
            ${this.duration!==null?o`<p>${this.duration}</p>`:""}

            ${this.parts.map(t=>o`<part-switcher .part=${t}></part-switcher>`)}

        `}createRenderRoot(){return this}}customElements.define("course-section",Ft);class qt extends u{static get properties(){return{title:{type:String},sections:{type:Array},sectionIndex:{attribute:!1},partIndex:{attribute:!1},currentSlide:{attribute:!1},index:{attribute:!1}}}constructor(){super(),this.sectionIndex=-1,this.partIndex=-1,this.currentSlide=null,this.index=[]}setupIndex(){this.sections&&(this.index=this.sections.map(t=>t.parts?t.parts.length:0))}nextSlide(){if(this.sectionIndex>this.sections.length-1&&(this.sectionIndex=this.sections.length-1),this.index[this.sectionIndex]===0||this.index[this.sectionIndex]===this.partIndex+1){if(this.sectionIndex===this.sections.length-1)return;this.setSlide(this.sectionIndex+1,-1);return}if(this.index[this.sectionIndex]>0){this.setSlide(this.sectionIndex,this.partIndex+1);return}}previousSlide(){if(this.sectionIndex<0&&(this.sectionIndex=0),this.index[this.sectionIndex]===0||this.partIndex===-1){if(this.sectionIndex===0)return;const t=this.index[this.sectionIndex-1]-1;this.setSlide(this.sectionIndex-1,t)}this.setSlide(this.sectionIndex,this.partIndex-1)}setSlide(t,e){if(this.sectionIndex=t,this.partIndex=e,console.log(this.sections[t]),e<0){const s=this.sections[t];this.currentSlide=o`<section-part .part=${s}></section-part>`}else{const s=this.sections[t].parts[e];this.currentSlide=o`<part-switcher .part=${s}></part-switcher>`}}render(){return this.index.length===0&&this.setupIndex(),this.sectionIndex<0&&this.setSlide(0,-1),o`
            <div class="">
                <div class="container">
                    <h2>${this.title}</h2>
                    <p>${this.sectionIndex}</p>
                    <p>${this.partIndex}</p>
                    ${this.currentSlide}
                    <div class="container-md | d-flex justify-content-between py-2">
                        <button class="btn outline light" @click=${this.previousSlide}>Retreat</button>
                        <button class="btn  light" @click=${this.nextSlide}>Onwards</button>
                    </div>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-slideshow",qt);class Jt extends u{static get properties(){return{part:{type:Object}}}render(){const t=this.part.t??null,e=this.part.d??null,s=this.part.info??null;return o`
            ${t!==null?o`<h3>${t}</h3>`:""}
            ${e!==null?o`<p>${e}</p>`:""}
            ${s!==null?o`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("discuss-part",Jt);class Zt extends u{static get properties(){return{part:{type:Object}}}render(){return this.part.t,this.part.d,this.part.info,o`
            ${this.title!==null?o`<h2>${this.title}</h2>`:""}
            ${this.description!==null?o`<p>${this.description}</p>`:""}
            ${this.info!==null?o`<p>${this.info}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("form-part",Zt);class Yt extends u{static get properties(){return{part:{type:Object}}}render(){const t=this.part.t??null,e=this.part.d??null,s=this.part.info??null;return o`
            <h2 class="brand">LISTEN</h2>
            ${t!==null?o`<h3>${t}</h3>`:""}
            ${e!==null?o`<p>${e}</p>`:""}
            ${s!==null?o`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("listen-part",Yt);class Xt extends u{static get properties(){return{part:{type:Object}}}render(){const t=this.part.t??null,e=this.part.d??null,s=this.part.info??null;return o`
            <h2 class="brand">READ</h2>
            ${t!==null?o`<h3>${t}</h3>`:""}
            ${e!==null?o`<p>${e}</p>`:""}
            ${s!==null?o`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("read-part",Xt);class Qt extends u{static get properties(){return{part:{type:Object}}}render(){switch(this.part.type){case"section":return o`<section-part .part=${this.part}></section-part>`;case"watch":return o`<watch-part .part=${this.part}></watch-part>`;case"discuss":return o`<discuss-part .part=${this.part}></discuss-part>`;case"read":return o`<read-part .part=${this.part}></read-part>`;case"see":return o`<see-part .part=${this.part}></see-part>`;case"share":return o`<share-part .part=${this.part}></share-part>`;case"listen":return o`<listen-part .part=${this.part}></listen-part>`;case"form":return o`<form-part .part=${this.part}></form-part>`;case"cta":default:return o`<basic-part .part=${this.part}></basic-part>`}}createRenderRoot(){return this}}customElements.define("part-switcher",Qt);class Gt extends u{static get properties(){return{part:{type:Object}}}render(){const t=this.part.t??null,e=this.part.d??null,s=this.part.info??null;return o`
            ${t!==null?o`<h2>${t}</h2>`:""}
            ${e!==null?o`<p>${e}</p>`:""}
            ${s!==null?o`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("section-part",Gt);class Kt extends u{static get properties(){return{part:{type:Object}}}render(){const t=this.part.t??null,e=this.part.d??null,s=this.part.info??null;return o`
            <h2 class="brand">SEE</h2>
            ${t!==null?o`<h3>${t}</h3>`:""}
            ${e!==null?o`<p>${e}</p>`:""}
            ${s!==null?o`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("see-part",Kt);class te extends u{static get properties(){return{part:{type:Object}}}render(){const t=this.part.t??null,e=this.part.d??null,s=this.part.info??null;return o`
            ${t!==null?o`<h3>${t}</h3>`:""}
            ${e!==null?o`<p>${e}</p>`:""}
            ${s!==null?o`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("share-part",te);class ee extends u{static get properties(){return{part:{type:Object}}}render(){const t=this.part.t??null,e=this.part.d??null,s=this.part.info??null;return o`
            ${t!==null?o`<h3>${t}</h3>`:""}
            ${e!==null?o`<p>${e}</p>`:""}
            ${s!==null?o`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("watch-part",ee);class vt extends u{constructor(){super()}render(){return o`
            <div class="container">
                <div class="circle">
                    <div class="triangle"></div>
                </div>
            </div>
        `}}Q(vt,"styles",_t`
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
    `);window.customElements.define("play-button",vt);const ct=document.querySelector(".nav-toggle"),se=document.querySelector("#nav");ct&&ct.addEventListener("click",i=>{se.classList.toggle("nav--visible")});
//# sourceMappingURL=main-e44a3150.js.map
