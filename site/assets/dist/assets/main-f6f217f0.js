var gt=Object.defineProperty;var bt=(i,t,e)=>t in i?gt(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var j=(i,t,e)=>(bt(i,typeof t!="symbol"?t+"":t,e),e);import{createApp as yt}from"https://unpkg.com/petite-vue?module";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const N=window,Y=N.ShadowRoot&&(N.ShadyCSS===void 0||N.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol(),X=new WeakMap;let ut=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Y&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=X.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&X.set(e,t))}return t}toString(){return this.cssText}};const _t=i=>new ut(typeof i=="string"?i:i+"",void 0,Q),wt=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,n,r)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[r+1],i[0]);return new ut(e,i,Q)},St=(i,t)=>{Y?i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const s=document.createElement("style"),n=N.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)})},G=Y?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return _t(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var F;const z=window,tt=z.trustedTypes,kt=tt?tt.emptyScript:"",et=z.reactiveElementPolyfillSupport,Z={toAttribute(i,t){switch(t){case Boolean:i=i?kt:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},pt=(i,t)=>t!==i&&(t==t||i==i),B={attribute:!0,type:String,converter:Z,reflect:!1,hasChanged:pt};let k=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const n=this._$Ep(s,e);n!==void 0&&(this._$Ev.set(n,s),t.push(n))}),t}static createProperty(t,e=B){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s=typeof t=="symbol"?Symbol():"__"+t,n=this.getPropertyDescriptor(t,s,e);n!==void 0&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(n){const r=this[t];this[e]=n,this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||B}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const n of s)this.createProperty(n,e[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const n of s)e.unshift(G(n))}else t!==void 0&&e.push(G(t));return e}static _$Ep(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return St(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=B){var n;const r=this.constructor._$Ep(t,s);if(r!==void 0&&s.reflect===!0){const a=(((n=s.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?s.converter:Z).toAttribute(e,s.type);this._$El=t,a==null?this.removeAttribute(r):this.setAttribute(r,a),this._$El=null}}_$AK(t,e){var s;const n=this.constructor,r=n._$Ev.get(t);if(r!==void 0&&this._$El!==r){const a=n.getPropertyOptions(r),h=typeof a.converter=="function"?{fromAttribute:a.converter}:((s=a.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?a.converter:Z;this._$El=r,this[r]=h.fromAttribute(e,a.type),this._$El=null}}requestUpdate(t,e,s){let n=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||pt)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((n,r)=>this[r]=n),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach(n=>{var r;return(r=n.hostUpdate)===null||r===void 0?void 0:r.call(n)}),this.update(s)):this._$Ek()}catch(n){throw e=!1,this._$Ek(),n}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var n;return(n=s.hostUpdated)===null||n===void 0?void 0:n.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$EO(s,this[s],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};k.finalized=!0,k.elementProperties=new Map,k.elementStyles=[],k.shadowRootOptions={mode:"open"},et==null||et({ReactiveElement:k}),((F=z.reactiveElementVersions)!==null&&F!==void 0?F:z.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var W;const U=window,A=U.trustedTypes,st=A?A.createPolicy("lit-html",{createHTML:i=>i}):void 0,K="$lit$",y=`lit$${(Math.random()+"").slice(9)}$`,ft="?"+y,xt=`<${ft}>`,E=document,R=()=>E.createComment(""),D=i=>i===null||typeof i!="object"&&typeof i!="function",vt=Array.isArray,At=i=>vt(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",q=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,it=/-->/g,nt=/>/g,_=RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ot=/'/g,rt=/"/g,$t=/^(?:script|style|textarea|title)$/i,Et=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),o=Et(1),g=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),at=new WeakMap,x=E.createTreeWalker(E,129,null,!1),Ct=(i,t)=>{const e=i.length-1,s=[];let n,r=t===2?"<svg>":"",a=P;for(let l=0;l<e;l++){const c=i[l];let b,d,p=-1,m=0;for(;m<c.length&&(a.lastIndex=m,d=a.exec(c),d!==null);)m=a.lastIndex,a===P?d[1]==="!--"?a=it:d[1]!==void 0?a=nt:d[2]!==void 0?($t.test(d[2])&&(n=RegExp("</"+d[2],"g")),a=_):d[3]!==void 0&&(a=_):a===_?d[0]===">"?(a=n??P,p=-1):d[1]===void 0?p=-2:(p=a.lastIndex-d[2].length,b=d[1],a=d[3]===void 0?_:d[3]==='"'?rt:ot):a===rt||a===ot?a=_:a===it||a===nt?a=P:(a=_,n=void 0);const H=a===_&&i[l+1].startsWith("/>")?" ":"";r+=a===P?c+xt:p>=0?(s.push(b),c.slice(0,p)+K+c.slice(p)+y+H):c+y+(p===-2?(s.push(void 0),l):H)}const h=r+(i[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return[st!==void 0?st.createHTML(h):h,s]};class O{constructor({strings:t,_$litType$:e},s){let n;this.parts=[];let r=0,a=0;const h=t.length-1,l=this.parts,[c,b]=Ct(t,e);if(this.el=O.createElement(c,s),x.currentNode=this.el.content,e===2){const d=this.el.content,p=d.firstChild;p.remove(),d.append(...p.childNodes)}for(;(n=x.nextNode())!==null&&l.length<h;){if(n.nodeType===1){if(n.hasAttributes()){const d=[];for(const p of n.getAttributeNames())if(p.endsWith(K)||p.startsWith(y)){const m=b[a++];if(d.push(p),m!==void 0){const H=n.getAttribute(m.toLowerCase()+K).split(y),L=/([.?@])?(.*)/.exec(m);l.push({type:1,index:r,name:L[2],strings:H,ctor:L[1]==="."?It:L[1]==="?"?Dt:L[1]==="@"?Ot:M})}else l.push({type:6,index:r})}for(const p of d)n.removeAttribute(p)}if($t.test(n.tagName)){const d=n.textContent.split(y),p=d.length-1;if(p>0){n.textContent=A?A.emptyScript:"";for(let m=0;m<p;m++)n.append(d[m],R()),x.nextNode(),l.push({type:2,index:++r});n.append(d[p],R())}}}else if(n.nodeType===8)if(n.data===ft)l.push({type:2,index:r});else{let d=-1;for(;(d=n.data.indexOf(y,d+1))!==-1;)l.push({type:7,index:r}),d+=y.length-1}r++}}static createElement(t,e){const s=E.createElement("template");return s.innerHTML=t,s}}function C(i,t,e=i,s){var n,r,a,h;if(t===g)return t;let l=s!==void 0?(n=e._$Co)===null||n===void 0?void 0:n[s]:e._$Cl;const c=D(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==c&&((r=l==null?void 0:l._$AO)===null||r===void 0||r.call(l,!1),c===void 0?l=void 0:(l=new c(i),l._$AT(i,e,s)),s!==void 0?((a=(h=e)._$Co)!==null&&a!==void 0?a:h._$Co=[])[s]=l:e._$Cl=l),l!==void 0&&(t=C(i,l._$AS(i,t.values),l,s)),t}class Pt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:n}=this._$AD,r=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:E).importNode(s,!0);x.currentNode=r;let a=x.nextNode(),h=0,l=0,c=n[0];for(;c!==void 0;){if(h===c.index){let b;c.type===2?b=new T(a,a.nextSibling,this,t):c.type===1?b=new c.ctor(a,c.name,c.strings,this,t):c.type===6&&(b=new Tt(a,this,t)),this._$AV.push(b),c=n[++l]}h!==(c==null?void 0:c.index)&&(a=x.nextNode(),h++)}return r}v(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class T{constructor(t,e,s,n){var r;this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=n,this._$Cp=(r=n==null?void 0:n.isConnected)===null||r===void 0||r}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),D(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==g&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):At(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==v&&D(this._$AH)?this._$AA.nextSibling.data=t:this.$(E.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:n}=t,r=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=O.createElement(n.h,this.options)),n);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===r)this._$AH.v(s);else{const a=new Pt(r,this),h=a.u(this.options);a.v(s),this.$(h),this._$AH=a}}_$AC(t){let e=at.get(t.strings);return e===void 0&&at.set(t.strings,e=new O(t)),e}T(t){vt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,n=0;for(const r of t)n===e.length?e.push(s=new T(this.k(R()),this.k(R()),this,this.options)):s=e[n],s._$AI(r),n++;n<e.length&&(this._$AR(s&&s._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){const n=t.nextSibling;t.remove(),t=n}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class M{constructor(t,e,s,n,r){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=v}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,n){const r=this.strings;let a=!1;if(r===void 0)t=C(this,t,e,0),a=!D(t)||t!==this._$AH&&t!==g,a&&(this._$AH=t);else{const h=t;let l,c;for(t=r[0],l=0;l<r.length-1;l++)c=C(this,h[s+l],e,l),c===g&&(c=this._$AH[l]),a||(a=!D(c)||c!==this._$AH[l]),c===v?t=v:t!==v&&(t+=(c??"")+r[l+1]),this._$AH[l]=c}a&&!n&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class It extends M{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}}const Rt=A?A.emptyScript:"";class Dt extends M{constructor(){super(...arguments),this.type=4}j(t){t&&t!==v?this.element.setAttribute(this.name,Rt):this.element.removeAttribute(this.name)}}class Ot extends M{constructor(t,e,s,n,r){super(t,e,s,n,r),this.type=5}_$AI(t,e=this){var s;if((t=(s=C(this,t,e,0))!==null&&s!==void 0?s:v)===g)return;const n=this._$AH,r=t===v&&n!==v||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,a=t!==v&&(n===v||r);r&&this.element.removeEventListener(this.name,this,n),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class Tt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}}const lt=U.litHtmlPolyfillSupport;lt==null||lt(O,T),((W=U.litHtmlVersions)!==null&&W!==void 0?W:U.litHtmlVersions=[]).push("2.7.3");const Ht=(i,t,e)=>{var s,n;const r=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:t;let a=r._$litPart$;if(a===void 0){const h=(n=e==null?void 0:e.renderBefore)!==null&&n!==void 0?n:null;r._$litPart$=a=new T(t.insertBefore(R(),h),h,void 0,e??{})}return a._$AI(i),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var V,J;let u=class extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ht(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return g}};u.finalized=!0,u._$litElement$=!0,(V=globalThis.litElementHydrateSupport)===null||V===void 0||V.call(globalThis,{LitElement:u});const ct=globalThis.litElementPolyfillSupport;ct==null||ct({LitElement:u});((J=globalThis.litElementVersions)!==null&&J!==void 0?J:globalThis.litElementVersions=[]).push("3.3.2");const w={makeAPlan:"getting-started",connectToCoach:"connect-to-coach",joinAPlan:"join-a-training"},$={completeProfile:"completeProfile",makePlan:"makePlan",inviteFriends:"inviteFriends",connectToCoach:"connectToCoach",joinPlan:"joinPlan"},f={updateName:"update-your-name",updateLocation:"update-your-location",updatePhone:"update-your-phone",inviteFriends:"invite-friends"},I={[f.updateName]:{slug:f.updateName,component:(i,t)=>o`
            <complete-profile
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                t="${JSON.stringify(t.complete_profile)}"
                variant="name"
                @done-step=${i.doneHandler}
            ></complete-profile>
        `},[f.updateLocation]:{slug:f.updateLocation,component:(i,t)=>o`
            <complete-profile
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                t="${JSON.stringify(t.complete_profile)}"
                variant="location"
                @done-step=${i.doneHandler}
            ></complete-profile>
        `},[f.updatePhone]:{slug:f.updatePhone,component:(i,t)=>o`
            <complete-profile
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                t="${JSON.stringify(t.complete_profile)}"
                variant="phone"
                @done-step=${i.doneHandler}
            ></complete-profile>
        `},[f.inviteFriends]:{slug:f.inviteFriends,component:(i,t)=>o`
            <invite-friends
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${t.share}
            ></invite-friends>
        `}};class Lt extends u{static get properties(){return{type:{type:String},finishUrl:{type:String},step:{attribute:!1}}}constructor(){super(),this.stepIndex=0,this.steps=[],this.modules={},this.step={},this.t=window.SHAREDFUNCTIONS.escapeObject(jsObject.translations),this._handleHistoryPopState=this._handleHistoryPopState.bind(this),window.addEventListener("popstate",this._handleHistoryPopState)}render(){return this.isWizardLoaded()||(this.loadWizard(),this._handleHistoryPopState()),this.steps.length===0?o`
            <div class="cover">
                <h1 class="brand">${this.t.bad_wizard}</h1>
                <p>${this.t.found_bad_wizard}</p>
                <div class="center"><img class="w-20" src="https://imgs.search.brave.com/3f3MurVApxsoxJlmqxLF0fs5-WlAk6sEu9IV3sICb_k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWR2ZXJ0aXNlY2Fz/dC5jb20vcG9kY2Fz/dC9pbWFnZS9WZXJ5/QmFkV2l6YXJkcw.jpeg" alt="bad wizards" /></div>
                <a href="/">${this.t.home}</a>
            </div>`:o`
        <div class="cover container center">

            <div class="fixed top left right p-2">
                ${this.skipButton()}
            </div>

            ${this.currentStep()}

            <div class="stack-1 | fixed bottom left right p-2">
                ${this.stepCounter()}
                ${this.finishButton()}
            </div>

        </div>
        `}currentStep(){const t=this.steps[this.stepIndex];return t.component(t,this.t)}skipButton(){const{skippable:t}=this.step,e=this.stepIndex===this.steps.length-1;return o`
        <div class="text-center d-flex justify-content-between">
            <div class="cluster ms-auto">
                ${t&&!e?o`<button @click=${this._onSkip} class="btn outline brand">${this.t.skip}</button>`:""}
            </div>
        </div>
        `}finishButton(){const t=this.stepIndex===this.steps.length-1;return o`
        <div class="text-center d-flex justify-content-between">
            <div class="cluster ms-auto">
                ${t?o`<button @click=${this._onFinish} class="btn">${this.t.finish}</button>`:""}
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
        `}_onBack(){if(this.stepIndex>0){const t=this.stepIndex-1;this._gotoStep(t)}}_onNext(){if(this.stepIndex+1<this.steps.length){const t=this.stepIndex+1;this._gotoStep(t)}}_onSkip(){const t=this.step.module;for(let e=this.stepIndex+1;e<this.steps.length-1;e++)if(this.steps[e].module!==t){this._gotoStep(e);return}this._onFinish()}_onFinish(){this.finishUrl||(window.location.href="/"),window.location.href=this.finishUrl}_gotoStep(t,e=!0){if(this.steps.length!==0&&(this.stepIndex=this.clampSteps(t),this.step=this.steps[this.stepIndex],e)){const s=new URL(window.location.href),n=s.pathname.split("/"),r=n[n.length-1];let a="";Object.values(w).includes(r)?a=n.join("/")+"/"+this.step.slug+s.search:a=n.slice(0,-1).join("/")+"/"+this.step.slug+s.search,window.history.pushState(null,null,a)}}clampSteps(t){let e=t;return t>this.steps.length-1&&(e=this.steps.length-1),t<0&&(e=0),e}_handleHistoryPopState(){const e=new URL(window.location.href).pathname.split("/"),s=e[e.length-1];Object.values(w).includes(s)&&this._gotoStep(0,!1),this.steps.forEach(({slug:n},r)=>{s===n&&this._gotoStep(r,!1)})}makeModule(t=[],e=!1){const s={steps:[],skippable:e};return t.forEach(n=>{Object.keys(I).includes(n)&&s.steps.push(I[n])}),s}getModule(t,e=!1){const s={[$.completeProfile]:{steps:[I[f.updateName],I[f.updateLocation]],skippable:e},[$.makePlan]:{steps:[{slug:"make-a-plan",component:r=>o`
                            <h1>Make a plan</h1>
                            <p>We would like to help you succeed with this training.</p>
                            <p>Making a plan can help you with success.</p>
                            <p>Answering the following questions will help us make you a plan.</p>
                            <p>Or you can skip if you prefer</p>
                            <button class="btn" @click=${r.doneHandler}>OK</button>
                        `},{slug:"how-many-sessions",component:r=>o`
                            <h1>Will you do 1 or 2 hour training sessions?</h1>
                            <div class="stack">
                                <button class="btn" @click=${r.doneHandler}>1 hour (20 sessions)</button>
                                <button class="btn" @click=${r.doneHandler}>2 hour (10 sessions)</button>
                            </div>
                        `},{slug:"what-time-of-day",component:r=>o`
                            <h1>What time of day?</h1>
                            <div class="stack">
                                <button class="btn" @click=${r.doneHandler}>Morning</button>
                                <button class="btn" @click=${r.doneHandler}>Afternoon</button>
                                <button class="btn" @click=${r.doneHandler}>Evening</button>
                            </div>
                        `},{slug:"what-time-interval",component:r=>o`
                            <h1>How often will you meet?</h1>
                            <div class="stack">
                                <button class="btn" @click=${r.doneHandler}>Every day</button>
                                <button class="btn" @click=${r.doneHandler}>Once a week</button>
                                <button class="btn" @click=${r.doneHandler}>Twice a month</button>
                                <button class="btn" @click=${r.doneHandler}>Once a month</button>
                            </div>
                        `},{slug:"when-will-you-start",component:r=>o`
                            <h1>When do you plan to start?</h1>
                            <input type="date">
                            <button class="btn" @click=${r.doneHandler}>Done</button>
                        `}],skippable:e},[$.inviteFriends]:{steps:[I[f.inviteFriends]],skippable:e},[$.connectToCoach]:{steps:[{slug:"contact-preference",component:r=>o`
                            <h1>What is your contact preference?</h1>
                            <label for="email">Email</label>
                            <input type="checkbox" name="contact-preference" id="email" value="email" />
                            <label for="text">Text</label>
                            <input type="checkbox" name="contact-preference" id="text" value="text" />
                            <label for="phone">Phone</label>
                            <input type="checkbox" name="contact-preference" id="phone" value="phone" />
                            <label for="whatsapp">Whatsapp</label>
                            <input type="checkbox" name="contact-preference" id="whatsapp" value="whatsapp" />
                            <button class="btn" @click=${r.doneHandler}>Done</button>
                        `},{slug:"language-preference",component:r=>o`
                            <h1>What is your language preference?</h1>
                            <label for="language">Language Preference</label>
                            <input type="text" name="language-preference" id="language"/>
                            <button class="btn" @click=${r.doneHandler}>Done</button>
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
                            <button class="btn" @click=${r.doneHandler}>Done</button>
                        `},{slug:"connected-to-coach",component:r=>o`
                            <h1>Connecting you to a Coach</h1>
                            <p>Please wait while we connect you <span class="loading-spinner active"></span></p>
                            <p>Successfully connected you. One of our team will contact you in the next 24-48 hours</p>
                        `}],skippable:e},[$.joinPlan]:{steps:[{slug:"joined-training",component:r=>o`
                            <h1>Joining Plan</h1>
                            <p>Please wait while we connect you <span class="loading-spinner active"></span></p>
                            <p>Successfully joined plan</p>
                        `}]}};return Object.keys(s).includes(t)?s[t]:s[$.completeProfile]}isWizardLoaded(){return Object.keys(this.modules).length!==0}loadWizard(){const t=this.getWizard();this.modules=t,this.steps=[],Object.entries(this.modules).forEach(([e,{steps:s,skippable:n}])=>{s.forEach(({component:r,slug:a})=>{const h={component:r,slug:a,module:e,skippable:n,doneHandler:this._onNext};this.steps.push(h)})})}isWizardTypeValid(){return!!Object.values(w).includes(this.type)}getWizard(){return this.isWizardTypeValid()?{[w.makeAPlan]:{[$.completeProfile]:this.makeModule([f.updateName,f.updateLocation],!0),[$.makePlan]:this.getModule($.makePlan,!0),[$.inviteFriends]:this.getModule($.inviteFriends,!0)},[w.connectToCoach]:{[$.completeProfile]:this.makeModule([f.updateName,f.updateLocation,f.updatePhone]),[$.connectToCoach]:this.getModule($.connectToCoach)},[w.joinAPlan]:{[$.completeProfile]:this.makeModule([f.updateName,f.updateLocation,f.updatePhone]),[$.joinPlan]:this.getModule($.joinPlan)}}[this.type]:{}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._handleHistoryPopState)}createRenderRoot(){return this}}window.customElements.define("zume-wizard",Lt);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const S={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},jt=i=>(...t)=>({_$litDirective$:i,values:t});class Nt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const zt=i=>i.strings===void 0,Ut={},Mt=(i,t=Ut)=>i._$AH=t;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ft=jt(class extends Nt{constructor(i){if(super(i),i.type!==S.PROPERTY&&i.type!==S.ATTRIBUTE&&i.type!==S.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!zt(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===g||t===v)return t;const e=i.element,s=i.name;if(i.type===S.PROPERTY){if(t===e[s])return g}else if(i.type===S.BOOLEAN_ATTRIBUTE){if(!!t===e.hasAttribute(s))return g}else if(i.type===S.ATTRIBUTE&&e.getAttribute(s)===t+"")return g;return Mt(i),t}});class Bt extends u{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},locations:{attribute:!1},locationError:{attribute:!1},city:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.locations=[],this.locationError="",this.city="",this.loading=!1,this._clearLocations=this._clearLocations.bind(this),this._handleSuggestions=this._handleSuggestions.bind(this),this._debounceCityChange=debounce(getAddressSuggestions(this._handleSuggestions,zumeProfile.map_key)).bind(this),this._handleCityInputChange=this._handleCityInputChange.bind(this)}firstUpdated(){this.renderRoot.querySelector(".inputs input").focus()}render(){return o`
        <form class="inputs" @submit=${this._handleDone}>
            ${this.variant==="name"?o`
                <h2 class="f-1">${this.t.name_question}</h2>
                <div class="">
                    <label for="name">${this.t.name}</label>
                    <input type="text" id="name" name="name" value="" @change=${this._handleNameChange} ?required=${!this.skippable}>
                </div>
            `:""}

            ${this.variant==="phone"?o`
                <h2 class="f-1">${this.t.phone_question}</h2>
                <div class="">
                    <label for="phone">${this.t.phone}</label>
                    <input type="tel" id="phone" name="phone" value="" @change=${this._handlePhoneChange} ?required=${!this.skippable}>
                </div>
            `:""}

            ${this.variant==="location"?o`
                <h2 class="f-1">${this.t.location_question}</h2>
                <div class="">
                    <label for="city">${this.t.city}</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        .value="${Ft(this.city)}"
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
            ${["phone","name"].includes(this.variant)?o`
                <div class="cluster">
                    <button type="submit" class="btn" ?disabled=${this.loading}>${this.t.done}</button>
                    <span class="loading-spinner ${this.loading?"active":""}"></span>
                </div>
            `:""}
        </form>
        `}_handleDone(t){t&&t.preventDefault();const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleNameChange(t){t.stopPropagation();const e={[t.target.name]:t.target.value};this._updateProfile(e)}_handlePhoneChange(t){t.stopPropagation();const e={[t.target.name]:t.target.value};this._updateProfile(e)}_handleCityChange(t){this._handleCityInputChange(t),this._debounceCityChange(t)}_handleCityInputChange(t){this.city=t.target.value}_handleSuggestions(t){t.features.length<1&&(this.locationError=this.t.no_locations_found),this.locations=t.features}_handleLocationSelection(t){this.city=t.target.dataset.placeName;const e={location_grid_meta:getLocationGridFromMapbox(t.target.id,zumeProfile.profile.location)};this._updateProfile(e,()=>{this._clearLocations(),this._handleDone()})}_updateProfile(t,e){this.loading=!0,fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(t),headers:{"X-WP-Nonce":jsObject.nonce}}).then(()=>{console.log("success"),e()}).catch(s=>{console.error(s)}).finally(()=>{this.loading=!1})}_clearLocations(){this.locations=[]}createRenderRoot(){return this}}window.customElements.define("complete-profile",Bt);class Wt extends u{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},url:{type:String}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.t={},this.url="https://zume5.test/zume_app/plan_invite?code=123456"}render(){return o`
            <div class="center stack">
                <h1>Invite your friends to join your training</h1>
                <p>Share the link below with your friends so that they can join your training.</p>
                <share-links url=${this.url} title="Join my zume plan" .t=${this.t}></share-links>
                <p>Alternatively your friends can scan this QR code in order to join.</p>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${this.url}" alt="" />
            </div>
        `}createRenderRoot(){return this}}window.customElements.define("invite-friends",Wt);class qt extends u{static get properties(){return{title:{type:String},sections:{type:Array}}}render(){return o`
            <div class="container">
                <h1>${this.title}</h1>
                ${this.sections.map((t,e)=>o`
                        <course-section .section=${t}></course-section>
                    `)}
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-guide",qt);const ht=["slideshow","guide"];class Vt extends u{static get properties(){return{languageCode:{type:String},homeUrl:{type:String},assetsPath:{type:String},translations:{type:Object},lessonIndex:{attribute:!1},view:{attribute:!1},linkNodes:{attribute:!1}}}constructor(){super();const t=new URL(window.location.href);if(t.searchParams.has("session")){const s=Number(t.searchParams.get("session"));Number.isInteger(s)?this.lessonIndex=s-1:this.lessonIndex=0}else this.lessonIndex=0;if(this.changeSession(this.lessonIndex,!1),t.searchParams.has("view")){const s=t.searchParams.get("view");ht.includes(s)&&(this.view=s)}else this.view="slideshow";this.handleSessionLink=this.handleSessionLink.bind(this),this.handleHistoryPopState=this.handleHistoryPopState.bind(this),window.addEventListener("popstate",this.handleHistoryPopState),document.querySelectorAll(".language-selector").forEach(function(s){s.addEventListener("click",()=>{const n=s.dataset.value,r=new URL(location.href),a=r.pathname.substring(1).split("/");let h="";a.length>0&&jsObject.zume_languages.includes(a[0])?h=a.slice(1).join("/"):h=a.join("/"),n!=="en"?h="/"+n+"/"+h:h="/"+h,h+=r.search,location.href=h})})}handleSessionLink(t){const e=t.target,s=Number(e.dataset.sessionNumber);this.lessonIndex=s,this.changeSession(this.lessonIndex)}getNextSession(){this.lessonIndex+=1,this.changeSession(this.lessonIndex)}getPreviousSession(){this.lessonIndex-=1,this.changeSession(this.lessonIndex)}changeSession(t,e=!0){let s=t;t<0&&(s=0),t>zumeSessions.length-1&&(s=zumeSessions.length-1),this.lessonIndex=s,this.session=zumeSessions[s],e&&this.pushHistory()}pushHistory(){const t=this.lessonIndex,e=this.view,s=new URL(window.location.href);t!==null&&Number.isInteger(t)&&s.searchParams.set("session",t+1),e&&s.searchParams.set("view",e),window.history.pushState(null,null,s.href)}handleHistoryPopState(){const t=new URL(location.href),e=t.searchParams.has("session")?Number(t.searchParams.get("session")):null,s=t.searchParams.get("view");Number.isInteger(e)&&(this.lessonIndex=e-1,this.changeSession(this.lessonIndex,!1)),s&&ht.includes(s)&&(this.view=s)}getSessionTitle(){return!this.session||!this.session.t?"":this.session.t}getSessionSections(){return!this.session||!this.session.sections?[]:this.session.sections}switchViews(t=!0){this.view==="guide"?this.view="slideshow":this.view="guide",t===!0&&this.pushHistory({view:this.view})}render(){return o`
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
                        ${zumeSessions.map((t,e)=>o`
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
            ${this.view==="guide"?o`<course-guide title="${this.getSessionTitle()}" .sections=${this.getSessionSections()}></course-guide>`:o`<course-slideshow title="${this.getSessionTitle()}" .sections=${this.getSessionSections()}></course-slideshow>`}

        `}createRenderRoot(){return this}}customElements.define("course-presenter",Vt);class Jt extends u{static get properties(){return{section:{type:Object}}}constructor(){super()}render(){return this.title=this.section.t??null,this.description=this.section.d??null,this.info=this.section.info??null,this.duration=this.section.duration??null,this.parts=this.section.parts??[],o`
            ${this.title!==null?o`<h1>${this.title}</h1>`:""}
            ${this.description!==null?o`<p>${this.description}</p>`:""}
            ${this.info!==null?o`<p>${this.info}</p>`:""}
            ${this.duration!==null?o`<p>${this.duration}</p>`:""}

            ${this.parts.map(t=>o`<part-switcher .partData=${t}></part-switcher>`)}

        `}createRenderRoot(){return this}}customElements.define("course-section",Jt);class Zt extends u{static get properties(){return{title:{type:String},sections:{type:Array},sectionIndex:{attribute:!1},partIndex:{attribute:!1},currentSlide:{attribute:!1},index:{attribute:!1}}}constructor(){super(),this.reset(),this.listenForKeyboard=this.listenForKeyboard.bind(this),this.listenForMouseClick=this.listenForMouseClick.bind(this)}reset(){this.sectionIndex=-1,this.partIndex=-1,this.currentSlide=null,this.index=[]}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.listenForKeyboard),document.addEventListener("mousedown",this.listenForMouseClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.listenForKeyboard),document.removeEventListener("mousedown",this.listenForMouseClick)}attributeChangedCallback(t,e,s){super.attributeChangedCallback(t,e,s),t==="title"&&e!==s&&this.reset()}setupIndex(){this.sections&&(this.index=this.sections.map(t=>t.parts?t.parts.length:0))}nextSlide(){if(this.sectionIndex>this.sections.length-1&&(this.sectionIndex=this.sections.length-1),this.index[this.sectionIndex]===0||this.index[this.sectionIndex]===this.partIndex+1){if(this.sectionIndex===this.sections.length-1)return;this.setSlide(this.sectionIndex+1,-1);return}if(this.index[this.sectionIndex]>0){this.setSlide(this.sectionIndex,this.partIndex+1);return}}previousSlide(){if(this.sectionIndex<0&&(this.sectionIndex=0),this.index[this.sectionIndex]===0||this.partIndex===-1){if(this.sectionIndex===0)return;const t=this.index[this.sectionIndex-1]-1;this.setSlide(this.sectionIndex-1,t);return}this.setSlide(this.sectionIndex,this.partIndex-1)}listenForKeyboard(t){["Space","ArrowRight"].includes(t.code)&&this.nextSlide(),["Backspace","ArrowLeft"].includes(t.code)&&this.previousSlide()}listenForMouseClick(t){const{x:e}=t,{innerWidth:s}=window,n=10/100*s+80;e<n&&(this.querySelector(".clickable-area.back").classList.add("visible"),this.previousSlide()),e>s-n&&(this.querySelector(".clickable-area.forward").classList.add("visible"),this.nextSlide())}setSlide(t,e){if(this.sectionIndex=t,this.partIndex=e,e<0){const s=this.sections[t];this.currentSlide=o`<section-part .partData=${s}></section-part>`}else{const s=this.sections[t].parts[e];this.currentSlide=o`<part-switcher .partData=${s}></part-switcher>`}}render(){return this.index.length===0&&this.setupIndex(),this.sectionIndex<0&&this.setSlide(0,-1),o`
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

        `}createRenderRoot(){return this}}customElements.define("course-slideshow",Zt);class Kt extends u{static get properties(){return{partData:{type:Object}}}render(){switch(this.partData.type){case"section":return o`<section-part .partData=${this.partData}></section-part>`;case"watch":return o`<watch-part .partData=${this.partData}></watch-part>`;case"discuss":return o`<discuss-part .partData=${this.partData}></discuss-part>`;case"read":return o`<read-part .partData=${this.partData}></read-part>`;case"see":return o`<see-part .partData=${this.partData}></see-part>`;case"share":return o`<share-part .partData=${this.partData}></share-part>`;case"listen":return o`<listen-part .partData=${this.partData}></listen-part>`;case"form":return o`<form-part .partData=${this.partData}></form-part>`;case"checkin":return o`<checkin-part .partData=${this.partData}></checkin-part>`;case"cta":default:return o`<basic-part .partData=${this.partData}></basic-part>`}}createRenderRoot(){return this}}customElements.define("part-switcher",Kt);class Yt extends u{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return o`
            ${t!==null?o`<h3>${t}</h3>`:""}
            ${e!==null?o`<p>${e}</p>`:""}
            ${s!==null?o`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("basic-part",Yt);class Qt extends u{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return o`
            ${t!==null?o`<h3>${t}</h3>`:""}
            ${e!==null?o`<p>${e}</p>`:""}
            ${s!==null?o`<p>${s}</p>`:""}

            <div><img class="mx-auto" src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&amp;color=323a68&amp;data=https://zume5.training/zume_app/checkin/?code=5678" width="300px" alt="QR Code"></div>
            <p>
                or <br>
                zume.training/checkin and use code <strong class="text-lightblue"><a href="https://zume5.training/zume_app/checkin/?code=5678" target="_blank">5678</a></strong>
            </p>
        `}createRenderRoot(){return this}}customElements.define("checkin-part",Qt);class Xt extends u{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return o`
            ${t!==null?o`<h3>${t}</h3>`:""}
            ${e!==null?o`<p>${e}</p>`:""}
            ${s!==null?o`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("discuss-part",Xt);class Gt extends u{static get properties(){return{partData:{type:Object}}}render(){return this.partData.t,this.partData.d,this.partData.info,o`
            ${this.title!==null?o`<h2>${this.title}</h2>`:""}
            ${this.description!==null?o`<p>${this.description}</p>`:""}
            ${this.info!==null?o`<p>${this.info}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("form-part",Gt);class te extends u{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return o`
            <h2 class="brand">LISTEN</h2>
            ${t!==null?o`<h3>${t}</h3>`:""}
            ${e!==null?o`<p>${e}</p>`:""}
            ${s!==null?o`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("listen-part",te);class ee extends u{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return o`
            <h2 class="brand">READ</h2>
            ${t!==null?o`<h3>${t}</h3>`:""}
            ${e!==null?o`<p>${e}</p>`:""}
            ${s!==null?o`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("read-part",ee);class se extends u{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return o`
            ${t!==null?o`<h2>${t}</h2>`:""}
            ${e!==null?o`<p>${e}</p>`:""}
            ${s!==null?o`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("section-part",se);class ie extends u{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return o`
            <h2 class="brand">SEE</h2>
            ${t!==null?o`<h3>${t}</h3>`:""}
            ${e!==null?o`<p>${e}</p>`:""}
            ${s!==null?o`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("see-part",ie);class ne extends u{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return o`
            ${t!==null?o`<h3>${t}</h3>`:""}
            ${e!==null?o`<p>${e}</p>`:""}
            ${s!==null?o`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("share-part",ne);class oe extends u{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return o`
            ${t!==null?o`<h3>${t}</h3>`:""}
            ${e!==null?o`<p>${e}</p>`:""}
            ${s!==null?o`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("watch-part",oe);class mt extends u{constructor(){super()}render(){return o`
            <div class="container">
                <div class="circle">
                    <div class="triangle"></div>
                </div>
            </div>
        `}}j(mt,"styles",wt`
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
    `);window.customElements.define("play-button",mt);class re extends u{constructor(){super();j(this,"webShareSupported",!!window.navigator.share);j(this,"clipboardSupported",!!window.navigator.clipboard);this.shareFeedback="",this.copyFeedback=""}static get properties(){return{url:{type:String},title:{type:String},t:{type:Object},shareFeedback:{attribute:!1},copyFeedback:{attribute:!1}}}share(){navigator.share({title:this.title,url:this.url,text:title}).then(()=>{this.shareFeedback=this.t.share_feedback,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(e=>console.error("Error sharing",e))}copyLink(){navigator.clipboard.writeText(this.url).then(()=>{this.copyFeedback=this.t.copy_feedback,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(e=>console.error(e))}noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported}render(){return o`
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
                          <button class="btn" @click=${this.share}>
                            <!-- Share icon -->
                            <span>${this.t.share}</span>
                          </button>
                          <p role="alert" aria-live="polite" id="shareFeedback" class="context-alert" data-state=${this.shareFeedback.length?"":"empty"}>${this.shareFeedback}</p>
                        </div>
                    `:""}
                    ${this.clipboardSupported?o`
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
        `}createRenderRoot(){return this}}customElements.define("share-links",re);const dt=document.querySelector(".nav-toggle"),ae=document.querySelector("#nav");dt&&dt.addEventListener("click",i=>{ae.classList.toggle("nav--visible")});const le=({title:i,url:t,copyFeedback:e,shareFeedback:s})=>({title:i,url:t,webShareSupported:navigator.share,clipboardSupported:navigator.clipboard,shareFeedback:"",copyFeedback:"",noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported},share(){navigator.share({title:i,url:t,text:i}).then(()=>{this.shareFeedback=s,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(n=>console.error("Error sharing",n))},copyLink(){navigator.clipboard.writeText(t).then(()=>{this.copyFeedback=e,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(n=>console.error(n))}});window.zumeInitShareLinks=()=>{yt({share:le}).mount()};
//# sourceMappingURL=main-f6f217f0.js.map
