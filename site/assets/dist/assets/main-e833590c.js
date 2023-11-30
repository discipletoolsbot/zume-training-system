var mt=Object.defineProperty;var bt=(i,t,e)=>t in i?mt(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var P=(i,t,e)=>(bt(i,typeof t!="symbol"?t+"":t,e),e);import{createApp as yt}from"https://unpkg.com/petite-vue?module";class _t{constructor(t){P(this,"WIZARD_STATE","zume_wizard_state");this.moduleName=t}init(){return{module:this.moduleName,data:{}}}exists(){return!!localStorage.getItem(this.WIZARD_STATE)}get(){return JSON.parse(localStorage.getItem(this.WIZARD_STATE))}add(t,e){const s=this.exists()?this.get():this.init();s.data[t]=e,localStorage.setItem(this.WIZARD_STATE,JSON.stringify(s))}clear(){localStorage.removeItem(this.WIZARD_STATE)}}const S={makeAPlan:"getting-started",getACoach:"get-a-coach",joinAPlan:"join-a-training"},$={completeProfile:"completeProfile",makePlan:"makePlan",inviteFriends:"inviteFriends",getACoach:"getACoach",joinPlan:"joinPlan"},l={updateName:"update-your-name",updateLocation:"update-your-location",updatePhone:"update-your-phone",inviteFriends:"invite-friends",contactPreferences:"contact-preferences",languagePreferences:"language-preferences",howCanWeServe:"how-can-we-serve",connectingToCoach:"connecting-to-coach"};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const j=window,Y=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol(),X=new WeakMap;let ut=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==G)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Y&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=X.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&X.set(e,t))}return t}toString(){return this.cssText}};const St=i=>new ut(typeof i=="string"?i:i+"",void 0,G),wt=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,n,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[r+1],i[0]);return new ut(e,i,G)},kt=(i,t)=>{Y?i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const s=document.createElement("style"),n=j.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)})},Q=Y?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return St(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var F;const z=window,tt=z.trustedTypes,xt=tt?tt.emptyScript:"",et=z.reactiveElementPolyfillSupport,Z={toAttribute(i,t){switch(t){case Boolean:i=i?xt:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},pt=(i,t)=>t!==i&&(t==t||i==i),W={attribute:!0,type:String,converter:Z,reflect:!1,hasChanged:pt};let k=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const n=this._$Ep(s,e);n!==void 0&&(this._$Ev.set(n,s),t.push(n))}),t}static createProperty(t,e=W){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s=typeof t=="symbol"?Symbol():"__"+t,n=this.getPropertyDescriptor(t,s,e);n!==void 0&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(n){const r=this[t];this[e]=n,this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||W}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const n of s)this.createProperty(n,e[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const n of s)e.unshift(Q(n))}else t!==void 0&&e.push(Q(t));return e}static _$Ep(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return kt(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=W){var n;const r=this.constructor._$Ep(t,s);if(r!==void 0&&s.reflect===!0){const o=(((n=s.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?s.converter:Z).toAttribute(e,s.type);this._$El=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$El=null}}_$AK(t,e){var s;const n=this.constructor,r=n._$Ev.get(t);if(r!==void 0&&this._$El!==r){const o=n.getPropertyOptions(r),d=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?o.converter:Z;this._$El=r,this[r]=d.fromAttribute(e,o.type),this._$El=null}}requestUpdate(t,e,s){let n=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||pt)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((n,r)=>this[r]=n),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach(n=>{var r;return(r=n.hostUpdate)===null||r===void 0?void 0:r.call(n)}),this.update(s)):this._$Ek()}catch(n){throw e=!1,this._$Ek(),n}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var n;return(n=s.hostUpdated)===null||n===void 0?void 0:n.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$EO(s,this[s],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};k.finalized=!0,k.elementProperties=new Map,k.elementStyles=[],k.shadowRootOptions={mode:"open"},et==null||et({ReactiveElement:k}),((F=z.reactiveElementVersions)!==null&&F!==void 0?F:z.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var B;const M=window,A=M.trustedTypes,st=A?A.createPolicy("lit-html",{createHTML:i=>i}):void 0,K="$lit$",y=`lit$${(Math.random()+"").slice(9)}$`,gt="?"+y,At=`<${gt}>`,E=document,D=()=>E.createComment(""),O=i=>i===null||typeof i!="object"&&typeof i!="function",vt=Array.isArray,Et=i=>vt(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",q=`[ 	
\f\r]`,I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,it=/-->/g,nt=/>/g,_=RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),at=/'/g,rt=/"/g,$t=/^(?:script|style|textarea|title)$/i,Ct=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),a=Ct(1),m=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),ot=new WeakMap,x=E.createTreeWalker(E,129,null,!1),Pt=(i,t)=>{const e=i.length-1,s=[];let n,r=t===2?"<svg>":"",o=I;for(let c=0;c<e;c++){const h=i[c];let b,u,g=-1,f=0;for(;f<h.length&&(o.lastIndex=f,u=o.exec(h),u!==null);)f=o.lastIndex,o===I?u[1]==="!--"?o=it:u[1]!==void 0?o=nt:u[2]!==void 0?($t.test(u[2])&&(n=RegExp("</"+u[2],"g")),o=_):u[3]!==void 0&&(o=_):o===_?u[0]===">"?(o=n??I,g=-1):u[1]===void 0?g=-2:(g=o.lastIndex-u[2].length,b=u[1],o=u[3]===void 0?_:u[3]==='"'?rt:at):o===rt||o===at?o=_:o===it||o===nt?o=I:(o=_,n=void 0);const L=o===_&&i[c+1].startsWith("/>")?" ":"";r+=o===I?h+At:g>=0?(s.push(b),h.slice(0,g)+K+h.slice(g)+y+L):h+y+(g===-2?(s.push(void 0),c):L)}const d=r+(i[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return[st!==void 0?st.createHTML(d):d,s]};class T{constructor({strings:t,_$litType$:e},s){let n;this.parts=[];let r=0,o=0;const d=t.length-1,c=this.parts,[h,b]=Pt(t,e);if(this.el=T.createElement(h,s),x.currentNode=this.el.content,e===2){const u=this.el.content,g=u.firstChild;g.remove(),u.append(...g.childNodes)}for(;(n=x.nextNode())!==null&&c.length<d;){if(n.nodeType===1){if(n.hasAttributes()){const u=[];for(const g of n.getAttributeNames())if(g.endsWith(K)||g.startsWith(y)){const f=b[o++];if(u.push(g),f!==void 0){const L=n.getAttribute(f.toLowerCase()+K).split(y),H=/([.?@])?(.*)/.exec(f);c.push({type:1,index:r,name:H[2],strings:L,ctor:H[1]==="."?Rt:H[1]==="?"?Ot:H[1]==="@"?Tt:U})}else c.push({type:6,index:r})}for(const g of u)n.removeAttribute(g)}if($t.test(n.tagName)){const u=n.textContent.split(y),g=u.length-1;if(g>0){n.textContent=A?A.emptyScript:"";for(let f=0;f<g;f++)n.append(u[f],D()),x.nextNode(),c.push({type:2,index:++r});n.append(u[g],D())}}}else if(n.nodeType===8)if(n.data===gt)c.push({type:2,index:r});else{let u=-1;for(;(u=n.data.indexOf(y,u+1))!==-1;)c.push({type:7,index:r}),u+=y.length-1}r++}}static createElement(t,e){const s=E.createElement("template");return s.innerHTML=t,s}}function C(i,t,e=i,s){var n,r,o,d;if(t===m)return t;let c=s!==void 0?(n=e._$Co)===null||n===void 0?void 0:n[s]:e._$Cl;const h=O(t)?void 0:t._$litDirective$;return(c==null?void 0:c.constructor)!==h&&((r=c==null?void 0:c._$AO)===null||r===void 0||r.call(c,!1),h===void 0?c=void 0:(c=new h(i),c._$AT(i,e,s)),s!==void 0?((o=(d=e)._$Co)!==null&&o!==void 0?o:d._$Co=[])[s]=c:e._$Cl=c),c!==void 0&&(t=C(i,c._$AS(i,t.values),c,s)),t}class It{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:n}=this._$AD,r=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:E).importNode(s,!0);x.currentNode=r;let o=x.nextNode(),d=0,c=0,h=n[0];for(;h!==void 0;){if(d===h.index){let b;h.type===2?b=new N(o,o.nextSibling,this,t):h.type===1?b=new h.ctor(o,h.name,h.strings,this,t):h.type===6&&(b=new Nt(o,this,t)),this._$AV.push(b),h=n[++c]}d!==(h==null?void 0:h.index)&&(o=x.nextNode(),d++)}return r}v(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class N{constructor(t,e,s,n){var r;this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=n,this._$Cp=(r=n==null?void 0:n.isConnected)===null||r===void 0||r}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),O(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==m&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):Et(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==v&&O(this._$AH)?this._$AA.nextSibling.data=t:this.$(E.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:n}=t,r=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=T.createElement(n.h,this.options)),n);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===r)this._$AH.v(s);else{const o=new It(r,this),d=o.u(this.options);o.v(s),this.$(d),this._$AH=o}}_$AC(t){let e=ot.get(t.strings);return e===void 0&&ot.set(t.strings,e=new T(t)),e}T(t){vt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,n=0;for(const r of t)n===e.length?e.push(s=new N(this.k(D()),this.k(D()),this,this.options)):s=e[n],s._$AI(r),n++;n<e.length&&(this._$AR(s&&s._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){const n=t.nextSibling;t.remove(),t=n}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class U{constructor(t,e,s,n,r){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=v}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,n){const r=this.strings;let o=!1;if(r===void 0)t=C(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==m,o&&(this._$AH=t);else{const d=t;let c,h;for(t=r[0],c=0;c<r.length-1;c++)h=C(this,d[s+c],e,c),h===m&&(h=this._$AH[c]),o||(o=!O(h)||h!==this._$AH[c]),h===v?t=v:t!==v&&(t+=(h??"")+r[c+1]),this._$AH[c]=h}o&&!n&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Rt extends U{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}}const Dt=A?A.emptyScript:"";class Ot extends U{constructor(){super(...arguments),this.type=4}j(t){t&&t!==v?this.element.setAttribute(this.name,Dt):this.element.removeAttribute(this.name)}}class Tt extends U{constructor(t,e,s,n,r){super(t,e,s,n,r),this.type=5}_$AI(t,e=this){var s;if((t=(s=C(this,t,e,0))!==null&&s!==void 0?s:v)===m)return;const n=this._$AH,r=t===v&&n!==v||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==v&&(n===v||r);r&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class Nt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}}const lt=M.litHtmlPolyfillSupport;lt==null||lt(T,N),((B=M.litHtmlVersions)!==null&&B!==void 0?B:M.litHtmlVersions=[]).push("2.7.3");const Lt=(i,t,e)=>{var s,n;const r=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:t;let o=r._$litPart$;if(o===void 0){const d=(n=e==null?void 0:e.renderBefore)!==null&&n!==void 0?n:null;r._$litPart$=o=new N(t.insertBefore(D(),d),d,void 0,e??{})}return o._$AI(i),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var J,V;let p=class extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Lt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return m}};p.finalized=!0,p._$litElement$=!0,(J=globalThis.litElementHydrateSupport)===null||J===void 0||J.call(globalThis,{LitElement:p});const ct=globalThis.litElementPolyfillSupport;ct==null||ct({LitElement:p});((V=globalThis.litElementVersions)!==null&&V!==void 0?V:globalThis.litElementVersions=[]).push("3.3.2");const R={[l.updateName]:{slug:l.updateName,component:(i,t)=>a`
            <complete-profile
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                t="${JSON.stringify(t.complete_profile)}"
                variant=${l.updateName}
                @done-step=${i.doneHandler}
            ></complete-profile>
        `},[l.updateLocation]:{slug:l.updateLocation,component:(i,t)=>a`
            <complete-profile
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                t="${JSON.stringify(t.complete_profile)}"
                variant=${l.updateLocation}
                @done-step=${i.doneHandler}
            ></complete-profile>
        `},[l.updatePhone]:{slug:l.updatePhone,component:(i,t)=>a`
            <complete-profile
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                t="${JSON.stringify(t.complete_profile)}"
                variant=${l.updatePhone}
                @done-step=${i.doneHandler}
            ></complete-profile>
        `},[l.contactPreferences]:{slug:l.contactPreferences,component:(i,t)=>a`
            <get-coach
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                t="${JSON.stringify(t.get_a_coach)}"
                variant=${l.contactPreferences}
                @done-step=${i.doneHandler}
            ></get-coach>
        `},[l.languagePreferences]:{slug:l.languagePreferences,component:(i,t)=>a`
            <get-coach
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                t="${JSON.stringify(t.get_a_coach)}"
                variant=${l.languagePreferences}
                @done-step=${i.doneHandler}
            ></get-coach>
        `},[l.howCanWeServe]:{slug:l.howCanWeServe,component:(i,t)=>a`
            <get-coach
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                t="${JSON.stringify(t.get_a_coach)}"
                variant=${l.howCanWeServe}
                @done-step=${i.doneHandler}
            ></get-coach>
        `},[l.connectingToCoach]:{slug:l.connectingToCoach,component:(i,t)=>a`
            <get-coach
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                t="${JSON.stringify(t.get_a_coach)}"
                variant=${l.connectingToCoach}
                @done-step=${i.doneHandler}
            ></get-coach>
        `},[l.inviteFriends]:{slug:l.inviteFriends,component:(i,t)=>a`
            <invite-friends
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${t.share}
            ></invite-friends>
        `}};class Ht extends p{static get properties(){return{type:{type:String},finishUrl:{type:String},step:{attribute:!1}}}constructor(){super(),this.stepIndex=0,this.steps=[],this.modules={},this.step={},this.t=window.SHAREDFUNCTIONS.escapeObject(jsObject.translations),this._handleHistoryPopState=this._handleHistoryPopState.bind(this),window.addEventListener("popstate",this._handleHistoryPopState)}render(){return this.isWizardLoaded()||(this.loadWizard(),this._handleHistoryPopState()),this.steps.length===0?a`
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
        `}currentStep(){const t=this.steps[this.stepIndex];return t.component(t,this.t)}skipButton(){const{skippable:t}=this.step,e=this.stepIndex===this.steps.length-1;return t&&!e?a`<button @click=${this._onSkip} class="brand">${this.t.skip}</button>`:""}finishButton(){return a`
            <div class="text-center d-flex justify-content-between">
                <div class="cluster ms-auto">
                    <button @click=${this._onFinish} class="btn">${this.t.finish}</button>
                </div>
            </div>
        `}footer(){return this.stepIndex===this.steps.length-1?this.finishButton():a`
        <div class="center">
            <div class="cluster">
                ${this.steps.map((e,s)=>{const n=s<=this.stepIndex;return a`<div class="step-circle ${n?"complete":""}"></div>`})}
            </div>
        </div>

        `}_onBack(){if(this.stepIndex>0){const t=this.stepIndex-1;this._gotoStep(t)}}_onNext(){if(this.stepIndex+1<this.steps.length){const t=this.stepIndex+1;this._gotoStep(t)}}_onSkip(){const t=this.step.module;for(let e=this.stepIndex+1;e<this.steps.length-1;e++)if(this.steps[e].module!==t){this._gotoStep(e);return}this._onFinish()}_onFinish(){this.finishUrl||(window.location.href="/"),window.location.href=this.finishUrl}_gotoStep(t,e=!0){if(this.steps.length!==0&&(this.stepIndex=this.clampSteps(t),this.step=this.steps[this.stepIndex],e)){const s=new URL(window.location.href),n=s.pathname.split("/"),r=n[n.length-1];let o="";Object.values(S).includes(r)?o=n.join("/")+"/"+this.step.slug+s.search:o=n.slice(0,-1).join("/")+"/"+this.step.slug+s.search,window.history.pushState(null,null,o)}}clampSteps(t){let e=t;return t>this.steps.length-1&&(e=this.steps.length-1),t<0&&(e=0),e}_handleHistoryPopState(){const e=new URL(window.location.href).pathname.split("/"),s=e[e.length-1];Object.values(S).includes(s)&&this._gotoStep(0,!1),this.steps.forEach(({slug:n},r)=>{s===n&&this._gotoStep(r,!1)})}makeModule(t=[],e=!1){const s={steps:[],skippable:e};return t.forEach(n=>{Object.keys(R).includes(n)&&s.steps.push(R[n])}),s}getModule(t,e=!1){const s={[$.completeProfile]:{steps:[R[l.updateName],R[l.updateLocation]],skippable:e},[$.makePlan]:{steps:[{slug:"make-a-plan",component:r=>a`
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
                        `}],skippable:e},[$.inviteFriends]:{steps:[R[l.inviteFriends]],skippable:e},[$.joinPlan]:{steps:[{slug:"joined-training",component:r=>a`
                            <h1>Joining Plan</h1>
                            <p>Please wait while we connect you <span class="loading-spinner active"></span></p>
                            <p>Successfully joined plan</p>
                        `}]}};return Object.keys(s).includes(t)?s[t]:s[$.completeProfile]}isWizardLoaded(){return Object.keys(this.modules).length!==0}loadWizard(){const t=this.getWizard();this.modules=t,this.steps=[],Object.entries(this.modules).forEach(([e,{steps:s,skippable:n}])=>{s.forEach(({component:r,slug:o})=>{const d={component:r,slug:o,module:e,skippable:n,doneHandler:this._onNext};this.steps.push(d)})})}isWizardTypeValid(){return!!Object.values(S).includes(this.type)}getWizard(){return this.isWizardTypeValid()?{[S.makeAPlan]:{[$.completeProfile]:this.makeModule([l.updateName,l.updateLocation],!0),[$.makePlan]:this.getModule($.makePlan,!0),[$.inviteFriends]:this.makeModule([l.inviteFriends],!0)},[S.getACoach]:{[$.completeProfile]:this.makeModule([l.updateName,l.updateLocation,l.updatePhone]),[$.getACoach]:this.makeModule([l.contactPreferences,l.languagePreferences,l.howCanWeServe,l.connectingToCoach],!0)},[S.joinAPlan]:{[$.completeProfile]:this.makeModule([l.updateName,l.updateLocation,l.updatePhone]),[$.joinPlan]:this.getModule($.joinPlan)}}[this.type]:{}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._handleHistoryPopState)}createRenderRoot(){return this}}window.customElements.define("zume-wizard",Ht);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const w={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},jt=i=>(...t)=>({_$litDirective$:i,values:t});class zt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mt=i=>i.strings===void 0,Ut={},Ft=(i,t=Ut)=>i._$AH=t;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wt=jt(class extends zt{constructor(i){if(super(i),i.type!==w.PROPERTY&&i.type!==w.ATTRIBUTE&&i.type!==w.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Mt(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===m||t===v)return t;const e=i.element,s=i.name;if(i.type===w.PROPERTY){if(t===e[s])return m}else if(i.type===w.BOOLEAN_ATTRIBUTE){if(!!t===e.hasAttribute(s))return m}else if(i.type===w.ATTRIBUTE&&e.getAttribute(s)===t+"")return m;return Ft(i),t}});class Bt extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},locations:{attribute:!1},locationError:{attribute:!1},city:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.locations=[],this.locationError="",this.city="",this.loading=!1,this._clearLocations=this._clearLocations.bind(this),this._handleSuggestions=this._handleSuggestions.bind(this),this._debounceCityChange=debounce(getAddressSuggestions(this._handleSuggestions,zumeProfile.map_key)).bind(this),this._handleCityInputChange=this._handleCityInputChange.bind(this)}firstUpdated(){this.renderRoot.querySelector(".inputs input").focus()}render(){return a`
        <form class="inputs" @submit=${this._handleDone}>
            ${this.variant===l.updateName?a`
                <h2 class="f-1">${this.t.name_question}</h2>
                <div class="">
                    <label for="name">${this.t.name}</label>
                    <input type="text" id="name" name="name" value="" @change=${this._handleNameChange} ?required=${!this.skippable}>
                </div>
            `:""}

            ${this.variant===l.updatePhone?a`
                <h2 class="f-1">${this.t.phone_question}</h2>
                <div class="">
                    <label for="phone">${this.t.phone}</label>
                    <input type="tel" id="phone" name="phone" value="" @change=${this._handlePhoneChange} ?required=${!this.skippable}>
                </div>
            `:""}

            ${this.variant===l.updateLocation?a`
                <h2 class="f-1">${this.t.location_question}</h2>
                <div class="">
                    <label for="city">${this.t.city}</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        .value="${Wt(this.city)}"
                        @input=${this._handleCityChange}
                    >
                </div>
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
            `:""}
            ${[l.updatePhone,l.updateName].includes(this.variant)?a`
                <div class="cluster">
                    <button type="submit" class="btn" ?disabled=${this.loading}>${this.t.done}</button>
                    <span class="loading-spinner ${this.loading?"active":""}"></span>
                </div>
            `:""}
        </form>
        `}_handleDone(t){t&&t.preventDefault(),console.log(this.state);const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleNameChange(t){t.stopPropagation();const e={[t.target.name]:t.target.value};this._updateProfile(e)}_handlePhoneChange(t){t.stopPropagation();const e={[t.target.name]:t.target.value};this._updateProfile(e)}_handleCityChange(t){this._handleCityInputChange(t),this._debounceCityChange(t)}_handleCityInputChange(t){this.city=t.target.value}_handleSuggestions(t){t.features.length<1&&(this.locationError=this.t.no_locations_found),this.locations=t.features}_handleLocationSelection(t){this.city=t.target.dataset.placeName;const e={location_grid_meta:getLocationGridFromMapbox(t.target.id,zumeProfile.profile.location)};this._updateProfile(e,()=>{this._clearLocations(),this._handleDone()})}_updateProfile(t,e){this.loading=!0,fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(t),headers:{"X-WP-Nonce":jsObject.nonce}}).then(()=>{console.log("success"),e()}).catch(s=>{console.error(s)}).finally(()=>{this.loading=!1})}_clearLocations(){this.locations=[]}createRenderRoot(){return this}}window.customElements.define("complete-profile",Bt);class qt extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},inviteCode:{type:String}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.t={},this.inviteCode="123456",this.url=`https://zume5.test/zume_app/plan_invite${this.inviteCode!==""?"?code="+this.inviteCode:""}`}render(){return a`
            <div class="center stack">
                <h1>Invite your friends to join your training</h1>
                <p>Share the link below with your friends so that they can join your training.</p>
                <share-links url=${this.url} title="Join my zume plan" .t=${this.t}></share-links>
                <p>Alternatively your friends can scan this QR code in order to join.</p>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${this.url}" alt="" />
            </div>
        `}createRenderRoot(){return this}}window.customElements.define("invite-friends",qt);class Jt extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},errorMessage:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.state={},this.errorMessage=""}firstUpdated(){this.wizardStateManager=new _t(this.module)}render(){return a`
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

                <h1>Connecting you to a Coach</h1>
                <div class="stack">
                    <p>Please wait while we connect you <span class="loading-spinner active"></span></p>
                    <p>Successfully connected you. One of our team will contact you in the next 24-48 hours</p>
                </div>
            `:""}
            <div class="cluster">
                <button type="submit" class="btn" ?disabled=${this.loading}>${this.t.done}</button>
                <span class="loading-spinner ${this.loading?"active":""}"></span>
            </div>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        </form>
        `}_handleDone(t){if(t&&t.preventDefault(),Object.keys(this.state).length===0){console.log(this.state),this.errorMessage=this.t.missing_response,setTimeout(()=>{this.errorMessage=""},3e3);return}this.wizardStateManager.add(this.variant,this.state);const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleChange(t){t.target.type==="checkbox"&&(this.state[t.target.value]=t.target.checked),t.target.type==="text"&&(this.state.value=t.target.value)}clearErrorMessage(){this.errorMessage=""}createRenderRoot(){return this}}customElements.define("get-coach",Jt);class Vt extends p{static get properties(){return{title:{type:String},sections:{type:Array}}}render(){return a`
            <div class="container">
                <h1>${this.title}</h1>
                ${this.sections.map((t,e)=>a`
                        <course-section .section=${t}></course-section>
                    `)}
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-guide",Vt);const ht=["slideshow","guide"];class Zt extends p{static get properties(){return{languageCode:{type:String},homeUrl:{type:String},assetsPath:{type:String},translations:{type:Object},lessonIndex:{attribute:!1},view:{attribute:!1},linkNodes:{attribute:!1}}}constructor(){super();const t=new URL(window.location.href);if(t.searchParams.has("session")){const s=Number(t.searchParams.get("session"));Number.isInteger(s)?this.lessonIndex=s-1:this.lessonIndex=0}else this.lessonIndex=0;if(this.changeSession(this.lessonIndex,!1),t.searchParams.has("view")){const s=t.searchParams.get("view");ht.includes(s)&&(this.view=s)}else this.view="slideshow";this.handleSessionLink=this.handleSessionLink.bind(this),this.handleHistoryPopState=this.handleHistoryPopState.bind(this),window.addEventListener("popstate",this.handleHistoryPopState),document.querySelectorAll(".language-selector").forEach(function(s){s.addEventListener("click",()=>{const n=s.dataset.value,r=new URL(location.href),o=r.pathname.substring(1).split("/");let d="";o.length>0&&jsObject.zume_languages.includes(o[0])?d=o.slice(1).join("/"):d=o.join("/"),n!=="en"?d="/"+n+"/"+d:d="/"+d,d+=r.search,location.href=d})})}handleSessionLink(t){const e=t.target,s=Number(e.dataset.sessionNumber);this.lessonIndex=s,this.changeSession(this.lessonIndex)}getNextSession(){this.lessonIndex+=1,this.changeSession(this.lessonIndex)}getPreviousSession(){this.lessonIndex-=1,this.changeSession(this.lessonIndex)}changeSession(t,e=!0){let s=t;t<0&&(s=0),t>zumeSessions.length-1&&(s=zumeSessions.length-1),this.lessonIndex=s,this.session=zumeSessions[s],e&&this.pushHistory()}pushHistory(){const t=this.lessonIndex,e=this.view,s=new URL(window.location.href);t!==null&&Number.isInteger(t)&&s.searchParams.set("session",t+1),e&&s.searchParams.set("view",e),window.history.pushState(null,null,s.href)}handleHistoryPopState(){const t=new URL(location.href),e=t.searchParams.has("session")?Number(t.searchParams.get("session")):null,s=t.searchParams.get("view");Number.isInteger(e)&&(this.lessonIndex=e-1,this.changeSession(this.lessonIndex,!1)),s&&ht.includes(s)&&(this.view=s)}getSessionTitle(){return!this.session||!this.session.t?"":this.session.t}getSessionSections(){return!this.session||!this.session.sections?[]:this.session.sections}switchViews(t=!0){this.view==="guide"?this.view="slideshow":this.view="guide",t===!0&&this.pushHistory({view:this.view})}render(){return a`
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
                        ${zumeSessions.map((t,e)=>a`
                            <button
                                class="link session-link"
                                data-session-number="${e}"
                                @click=${this.handleSessionLink}
                            >
                                ${t.t}
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

        `}createRenderRoot(){return this}}customElements.define("course-presenter",Zt);class Kt extends p{static get properties(){return{section:{type:Object}}}constructor(){super()}render(){return this.title=this.section.t??null,this.description=this.section.d??null,this.info=this.section.info??null,this.duration=this.section.duration??null,this.parts=this.section.parts??[],a`
            ${this.title!==null?a`<h1>${this.title}</h1>`:""}
            ${this.description!==null?a`<p>${this.description}</p>`:""}
            ${this.info!==null?a`<p>${this.info}</p>`:""}
            ${this.duration!==null?a`<p>${this.duration}</p>`:""}

            ${this.parts.map(t=>a`<part-switcher .partData=${t}></part-switcher>`)}

        `}createRenderRoot(){return this}}customElements.define("course-section",Kt);class Yt extends p{static get properties(){return{title:{type:String},sections:{type:Array},sectionIndex:{attribute:!1},partIndex:{attribute:!1},currentSlide:{attribute:!1},index:{attribute:!1}}}constructor(){super(),this.reset(),this.listenForKeyboard=this.listenForKeyboard.bind(this),this.listenForMouseClick=this.listenForMouseClick.bind(this)}reset(){this.sectionIndex=-1,this.partIndex=-1,this.currentSlide=null,this.index=[]}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.listenForKeyboard),document.addEventListener("mousedown",this.listenForMouseClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.listenForKeyboard),document.removeEventListener("mousedown",this.listenForMouseClick)}attributeChangedCallback(t,e,s){super.attributeChangedCallback(t,e,s),t==="title"&&e!==s&&this.reset()}setupIndex(){this.sections&&(this.index=this.sections.map(t=>t.parts?t.parts.length:0))}nextSlide(){if(this.sectionIndex>this.sections.length-1&&(this.sectionIndex=this.sections.length-1),this.index[this.sectionIndex]===0||this.index[this.sectionIndex]===this.partIndex+1){if(this.sectionIndex===this.sections.length-1)return;this.setSlide(this.sectionIndex+1,-1);return}if(this.index[this.sectionIndex]>0){this.setSlide(this.sectionIndex,this.partIndex+1);return}}previousSlide(){if(this.sectionIndex<0&&(this.sectionIndex=0),this.index[this.sectionIndex]===0||this.partIndex===-1){if(this.sectionIndex===0)return;const t=this.index[this.sectionIndex-1]-1;this.setSlide(this.sectionIndex-1,t);return}this.setSlide(this.sectionIndex,this.partIndex-1)}listenForKeyboard(t){["Space","ArrowRight"].includes(t.code)&&this.nextSlide(),["Backspace","ArrowLeft"].includes(t.code)&&this.previousSlide()}listenForMouseClick(t){const{x:e}=t,{innerWidth:s}=window,n=10/100*s+80;e<n&&(this.querySelector(".clickable-area.back").classList.add("visible"),this.previousSlide()),e>s-n&&(this.querySelector(".clickable-area.forward").classList.add("visible"),this.nextSlide())}setSlide(t,e){if(this.sectionIndex=t,this.partIndex=e,e<0){const s=this.sections[t];this.currentSlide=a`<section-part .partData=${s}></section-part>`}else{const s=this.sections[t].parts[e];this.currentSlide=a`<part-switcher .partData=${s}></part-switcher>`}}render(){return this.index.length===0&&this.setupIndex(),this.sectionIndex<0&&this.setSlide(0,-1),a`
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

        `}createRenderRoot(){return this}}customElements.define("course-slideshow",Yt);class Gt extends p{static get properties(){return{partData:{type:Object}}}render(){switch(this.partData.type){case"section":return a`<section-part .partData=${this.partData}></section-part>`;case"watch":return a`<watch-part .partData=${this.partData}></watch-part>`;case"discuss":return a`<discuss-part .partData=${this.partData}></discuss-part>`;case"read":return a`<read-part .partData=${this.partData}></read-part>`;case"see":return a`<see-part .partData=${this.partData}></see-part>`;case"share":return a`<share-part .partData=${this.partData}></share-part>`;case"listen":return a`<listen-part .partData=${this.partData}></listen-part>`;case"form":return a`<form-part .partData=${this.partData}></form-part>`;case"checkin":return a`<checkin-part .partData=${this.partData}></checkin-part>`;case"cta":default:return a`<basic-part .partData=${this.partData}></basic-part>`}}createRenderRoot(){return this}}customElements.define("part-switcher",Gt);class Xt extends p{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return a`
            ${t!==null?a`<h3>${t}</h3>`:""}
            ${e!==null?a`<p>${e}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("basic-part",Xt);class Qt extends p{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return a`
            ${t!==null?a`<h3>${t}</h3>`:""}
            ${e!==null?a`<p>${e}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}

            <div><img class="mx-auto" src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&amp;color=323a68&amp;data=https://zume5.training/zume_app/checkin/?code=5678" width="300px" alt="QR Code"></div>
            <p>
                or <br>
                zume.training/checkin and use code <strong class="text-lightblue"><a href="https://zume5.training/zume_app/checkin/?code=5678" target="_blank">5678</a></strong>
            </p>
        `}createRenderRoot(){return this}}customElements.define("checkin-part",Qt);class te extends p{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return a`
            ${t!==null?a`<h3>${t}</h3>`:""}
            ${e!==null?a`<p>${e}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("discuss-part",te);class ee extends p{static get properties(){return{partData:{type:Object}}}render(){return this.partData.t,this.partData.d,this.partData.info,a`
            ${this.title!==null?a`<h2>${this.title}</h2>`:""}
            ${this.description!==null?a`<p>${this.description}</p>`:""}
            ${this.info!==null?a`<p>${this.info}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("form-part",ee);class se extends p{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return a`
            <h2 class="brand">LISTEN</h2>
            ${t!==null?a`<h3>${t}</h3>`:""}
            ${e!==null?a`<p>${e}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("listen-part",se);class ie extends p{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return a`
            <h2 class="brand">READ</h2>
            ${t!==null?a`<h3>${t}</h3>`:""}
            ${e!==null?a`<p>${e}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("read-part",ie);class ne extends p{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return a`
            ${t!==null?a`<h2>${t}</h2>`:""}
            ${e!==null?a`<p>${e}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("section-part",ne);class ae extends p{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return a`
            <h2 class="brand">SEE</h2>
            ${t!==null?a`<h3>${t}</h3>`:""}
            ${e!==null?a`<p>${e}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("see-part",ae);class re extends p{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return a`
            ${t!==null?a`<h3>${t}</h3>`:""}
            ${e!==null?a`<p>${e}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("share-part",re);class oe extends p{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return a`
            ${t!==null?a`<h3>${t}</h3>`:""}
            ${e!==null?a`<p>${e}</p>`:""}
            ${s!==null?a`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("watch-part",oe);class ft extends p{constructor(){super()}render(){return a`
            <div class="container">
                <div class="circle">
                    <div class="triangle"></div>
                </div>
            </div>
        `}}P(ft,"styles",wt`
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
    `);window.customElements.define("play-button",ft);class le extends p{constructor(){super();P(this,"webShareSupported",!!window.navigator.share);P(this,"clipboardSupported",!!window.navigator.clipboard);this.shareFeedback="",this.copyFeedback=""}static get properties(){return{url:{type:String},title:{type:String},t:{type:Object},shareFeedback:{attribute:!1},copyFeedback:{attribute:!1}}}share(){navigator.share({title:this.title,url:this.url,text:title}).then(()=>{this.shareFeedback=this.t.share_feedback,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(e=>console.error("Error sharing",e))}copyLink(){navigator.clipboard.writeText(this.url).then(()=>{this.copyFeedback=this.t.copy_feedback,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(e=>console.error(e))}noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported}render(){return a`
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
        `}createRenderRoot(){return this}}customElements.define("share-links",le);const dt=document.querySelector(".nav-toggle"),ce=document.querySelector("#nav");dt&&dt.addEventListener("click",i=>{ce.classList.toggle("nav--visible")});const he=({title:i,url:t,copyFeedback:e,shareFeedback:s})=>({title:i,url:t,webShareSupported:navigator.share,clipboardSupported:navigator.clipboard,shareFeedback:"",copyFeedback:"",noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported},share(){navigator.share({title:i,url:t,text:i}).then(()=>{this.shareFeedback=s,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(n=>console.error("Error sharing",n))},copyLink(){navigator.clipboard.writeText(t).then(()=>{this.copyFeedback=e,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(n=>console.error(n))}});window.zumeInitShareLinks=()=>{yt({share:he}).mount()};
//# sourceMappingURL=main-e833590c.js.map
