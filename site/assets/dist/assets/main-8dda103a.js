var $t=Object.defineProperty;var _t=(n,t,e)=>t in n?$t(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var Z=(n,t,e)=>(_t(n,typeof t!="symbol"?t+"":t,e),e);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=window,Y=z.ShadowRoot&&(z.ShadyCSS===void 0||z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,q=Symbol(),X=new WeakMap;let ht=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Y&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=X.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&X.set(e,t))}return t}toString(){return this.cssText}};const ft=n=>new ht(typeof n=="string"?n:n+"",void 0,q),gt=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((s,i,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1],n[0]);return new ht(e,n,q)},mt=(n,t)=>{Y?n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const s=document.createElement("style"),i=z.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)})},G=Y?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ft(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var M;const N=window,K=N.trustedTypes,yt=K?K.emptyScript:"",Q=N.reactiveElementPolyfillSupport,V={toAttribute(n,t){switch(t){case Boolean:n=n?yt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},ct=(n,t)=>t!==n&&(t==t||n==n),j={attribute:!0,type:String,converter:V,reflect:!1,hasChanged:ct};let A=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const i=this._$Ep(s,e);i!==void 0&&(this._$Ev.set(i,s),t.push(i))}),t}static createProperty(t,e=j){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s=typeof t=="symbol"?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const o=this[t];this[e]=i,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||j}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of s)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(G(i))}else t!==void 0&&e.push(G(t));return e}static _$Ep(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return mt(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=j){var i;const o=this.constructor._$Ep(t,s);if(o!==void 0&&s.reflect===!0){const r=(((i=s.converter)===null||i===void 0?void 0:i.toAttribute)!==void 0?s.converter:V).toAttribute(e,s.type);this._$El=t,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,o=i._$Ev.get(t);if(o!==void 0&&this._$El!==o){const r=i.getPropertyOptions(o),c=typeof r.converter=="function"?{fromAttribute:r.converter}:((s=r.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?r.converter:V;this._$El=o,this[o]=c.fromAttribute(e,r.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||ct)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((i,o)=>this[o]=i),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach(i=>{var o;return(o=i.hostUpdate)===null||o===void 0?void 0:o.call(i)}),this.update(s)):this._$Ek()}catch(i){throw e=!1,this._$Ek(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var i;return(i=s.hostUpdated)===null||i===void 0?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$EO(s,this[s],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};A.finalized=!0,A.elementProperties=new Map,A.elementStyles=[],A.shadowRootOptions={mode:"open"},Q==null||Q({ReactiveElement:A}),((M=N.reactiveElementVersions)!==null&&M!==void 0?M:N.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var B;const I=window,S=I.trustedTypes,tt=S?S.createPolicy("lit-html",{createHTML:n=>n}):void 0,J="$lit$",g=`lit$${(Math.random()+"").slice(9)}$`,dt="?"+g,bt=`<${dt}>`,w=document,x=()=>w.createComment(""),k=n=>n===null||typeof n!="object"&&typeof n!="function",pt=Array.isArray,At=n=>pt(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",W=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,et=/-->/g,st=/>/g,m=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),it=/'/g,nt=/"/g,ut=/^(?:script|style|textarea|title)$/i,Et=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),p=Et(1),_=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),ot=new WeakMap,E=w.createTreeWalker(w,129,null,!1),St=(n,t)=>{const e=n.length-1,s=[];let i,o=t===2?"<svg>":"",r=T;for(let l=0;l<e;l++){const a=n[l];let f,h,d=-1,$=0;for(;$<a.length&&(r.lastIndex=$,h=r.exec(a),h!==null);)$=r.lastIndex,r===T?h[1]==="!--"?r=et:h[1]!==void 0?r=st:h[2]!==void 0?(ut.test(h[2])&&(i=RegExp("</"+h[2],"g")),r=m):h[3]!==void 0&&(r=m):r===m?h[0]===">"?(r=i??T,d=-1):h[1]===void 0?d=-2:(d=r.lastIndex-h[2].length,f=h[1],r=h[3]===void 0?m:h[3]==='"'?nt:it):r===nt||r===it?r=m:r===et||r===st?r=T:(r=m,i=void 0);const R=r===m&&n[l+1].startsWith("/>")?" ":"";o+=r===T?a+bt:d>=0?(s.push(f),a.slice(0,d)+J+a.slice(d)+g+R):a+g+(d===-2?(s.push(void 0),l):R)}const c=o+(n[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return[tt!==void 0?tt.createHTML(c):c,s]};class U{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0;const c=t.length-1,l=this.parts,[a,f]=St(t,e);if(this.el=U.createElement(a,s),E.currentNode=this.el.content,e===2){const h=this.el.content,d=h.firstChild;d.remove(),h.append(...d.childNodes)}for(;(i=E.nextNode())!==null&&l.length<c;){if(i.nodeType===1){if(i.hasAttributes()){const h=[];for(const d of i.getAttributeNames())if(d.endsWith(J)||d.startsWith(g)){const $=f[r++];if(h.push(d),$!==void 0){const R=i.getAttribute($.toLowerCase()+J).split(g),H=/([.?@])?(.*)/.exec($);l.push({type:1,index:o,name:H[2],strings:R,ctor:H[1]==="."?Ct:H[1]==="?"?Pt:H[1]==="@"?xt:L})}else l.push({type:6,index:o})}for(const d of h)i.removeAttribute(d)}if(ut.test(i.tagName)){const h=i.textContent.split(g),d=h.length-1;if(d>0){i.textContent=S?S.emptyScript:"";for(let $=0;$<d;$++)i.append(h[$],x()),E.nextNode(),l.push({type:2,index:++o});i.append(h[d],x())}}}else if(i.nodeType===8)if(i.data===dt)l.push({type:2,index:o});else{let h=-1;for(;(h=i.data.indexOf(g,h+1))!==-1;)l.push({type:7,index:o}),h+=g.length-1}o++}}static createElement(t,e){const s=w.createElement("template");return s.innerHTML=t,s}}function C(n,t,e=n,s){var i,o,r,c;if(t===_)return t;let l=s!==void 0?(i=e._$Co)===null||i===void 0?void 0:i[s]:e._$Cl;const a=k(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==a&&((o=l==null?void 0:l._$AO)===null||o===void 0||o.call(l,!1),a===void 0?l=void 0:(l=new a(n),l._$AT(n,e,s)),s!==void 0?((r=(c=e)._$Co)!==null&&r!==void 0?r:c._$Co=[])[s]=l:e._$Cl=l),l!==void 0&&(t=C(n,l._$AS(n,t.values),l,s)),t}class wt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:i}=this._$AD,o=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:w).importNode(s,!0);E.currentNode=o;let r=E.nextNode(),c=0,l=0,a=i[0];for(;a!==void 0;){if(c===a.index){let f;a.type===2?f=new O(r,r.nextSibling,this,t):a.type===1?f=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(f=new kt(r,this,t)),this._$AV.push(f),a=i[++l]}c!==(a==null?void 0:a.index)&&(r=E.nextNode(),c++)}return o}v(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class O{constructor(t,e,s,i){var o;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=(o=i==null?void 0:i.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),k(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==_&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):At(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==u&&k(this._$AH)?this._$AA.nextSibling.data=t:this.$(w.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:i}=t,o=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=U.createElement(i.h,this.options)),i);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.v(s);else{const r=new wt(o,this),c=r.u(this.options);r.v(s),this.$(c),this._$AH=r}}_$AC(t){let e=ot.get(t.strings);return e===void 0&&ot.set(t.strings,e=new U(t)),e}T(t){pt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new O(this.k(x()),this.k(x()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class L{constructor(t,e,s,i,o){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const o=this.strings;let r=!1;if(o===void 0)t=C(this,t,e,0),r=!k(t)||t!==this._$AH&&t!==_,r&&(this._$AH=t);else{const c=t;let l,a;for(t=o[0],l=0;l<o.length-1;l++)a=C(this,c[s+l],e,l),a===_&&(a=this._$AH[l]),r||(r=!k(a)||a!==this._$AH[l]),a===u?t=u:t!==u&&(t+=(a??"")+o[l+1]),this._$AH[l]=a}r&&!i&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ct extends L{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}}const Tt=S?S.emptyScript:"";class Pt extends L{constructor(){super(...arguments),this.type=4}j(t){t&&t!==u?this.element.setAttribute(this.name,Tt):this.element.removeAttribute(this.name)}}class xt extends L{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){var s;if((t=(s=C(this,t,e,0))!==null&&s!==void 0?s:u)===_)return;const i=this._$AH,o=t===u&&i!==u||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==u&&(i===u||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class kt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}}const rt=I.litHtmlPolyfillSupport;rt==null||rt(U,O),((B=I.litHtmlVersions)!==null&&B!==void 0?B:I.litHtmlVersions=[]).push("2.7.3");const Ut=(n,t,e)=>{var s,i;const o=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:t;let r=o._$litPart$;if(r===void 0){const c=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:null;o._$litPart$=r=new O(t.insertBefore(x(),c),c,void 0,e??{})}return r._$AI(n),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var D,F;let y=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ut(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return _}};y.finalized=!0,y._$litElement$=!0,(D=globalThis.litElementHydrateSupport)===null||D===void 0||D.call(globalThis,{LitElement:y});const lt=globalThis.litElementPolyfillSupport;lt==null||lt({LitElement:y});((F=globalThis.litElementVersions)!==null&&F!==void 0?F:globalThis.litElementVersions=[]).push("3.3.2");const P={makeAPlan:"make-a-plan",connectToCoach:"connect-to-coach"},v={completeProfile:"completeProfile",makePlan:"makePlan",inviteFriends:"inviteFriends",connectToCoach:"connectToCoach"};class Ot extends y{static get properties(){return{type:{type:String},finishUrl:{type:String},step:{attribute:!1}}}constructor(){super(),this.stepIndex=0,this.steps=[],this.modules={},this.step={},this.t=window.SHAREDFUNCTIONS.escapeObject(jsObject.translations),this._handleHistoryPopState=this._handleHistoryPopState.bind(this),window.addEventListener("popstate",this._handleHistoryPopState)}render(){return this.isWizardLoaded()||(this.loadWizard(),this._handleHistoryPopState()),this.steps.length===0?p`
            <div class="cover">
                <h1 class="brand">${this.t.bad_wizard}</h1>
                <p>${this.t.found_bad_wizard}</p>
                <div class="center"><img class="w-20" src="https://imgs.search.brave.com/3f3MurVApxsoxJlmqxLF0fs5-WlAk6sEu9IV3sICb_k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWR2ZXJ0aXNlY2Fz/dC5jb20vcG9kY2Fz/dC9pbWFnZS9WZXJ5/QmFkV2l6YXJkcw.jpeg" alt="bad wizards" /></div>
                <a href="/">${this.t.home}</a>
            </div>`:p`
        <div class="cover container">

            ${this.currentStep()}
            ${this.navigationButtons()}
            ${this.stepCounter()}

        </div>
        `}currentStep(){const t=this.steps[this.stepIndex];return t.component(t,this.t)}navigationButtons(){const{skippable:t}=this.step,e=this.stepIndex===0,s=this.stepIndex===this.steps.length-1;return p`
        <div class="text-center">
            ${e?"":p`<button @click=${this._onBack} class="btn outline ">${this.t.back}</button>`}
            ${s?"":p`<button @click=${this._onNext} class="btn">${this.t.next}</button>`}
            ${t&&!s?p`<button @click=${this._onSkip} class="btn outline">${this.t.skip}</button>`:""}
            ${s?p`<button @click=${this._onFinish} class="btn">${this.t.finish}</button>`:""}
        </div>
        `}stepCounter(){return p`
        <div class="center">
            <div class="cluster">
                ${this.steps.map((t,e)=>{const s=e<=this.stepIndex;return p`<div class="step-circle ${s?"complete":""}"></div>`})}
            </div>
        </div>
        <div class="text-center">
            ${this.stepIndex+1} / ${this.steps.length}
        </div>
        `}_onBack(){if(this.stepIndex>0){const t=this.stepIndex-1;this._gotoStep(t)}}_onNext(){if(this.stepIndex+1<this.steps.length){const t=this.stepIndex+1;this._gotoStep(t)}}_onSkip(){const t=this.step.module;for(let e=this.stepIndex+1;e<this.steps.length-1;e++)if(this.steps[e].module!==t){this._gotoStep(e);return}this._onFinish()}_onFinish(){this.finishUrl||(window.location.href="/"),window.location.href=this.finishUrl}_gotoStep(t,e=!0){if(this.steps.length!==0&&(this.stepIndex=this.clampSteps(t),this.step=this.steps[this.stepIndex],e)){const s=new URL(window.location.href),i=s.pathname.split("/"),o=i[i.length-1];let r="";Object.values(P).includes(o)?r=i.join("/")+"/"+this.step.slug+s.search:r=i.slice(0,-1).join("/")+"/"+this.step.slug+s.search,window.history.pushState(null,null,r)}}clampSteps(t){let e=t;return t>this.steps.length-1&&(e=this.steps.length-1),t<0&&(e=0),e}_handleHistoryPopState(){const e=new URL(window.location.href).pathname.split("/"),s=e[e.length-1];Object.values(P).includes(s)&&this._gotoStep(0,!1),this.steps.forEach(({slug:i},o)=>{s===i&&this._gotoStep(o,!1)})}_handleCompleteProfileChange(t){console.log(t);const e={[t.detail.id]:t.detail.value};fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(e),headers:{"X-WP-Nonce":jsObject.nonce}}).then(()=>{console.log("success")}).catch(s=>{console.error(s)}).finally(()=>{})}getModule(t,e=!1){const s={[v.completeProfile]:{steps:[{slug:"update-your-profile",component:(o,r)=>p`
                            <complete-profile
                                name=${o.slug}
                                module=${o.module}
                                t="${JSON.stringify(r.complete_profile)}"
                                @profile-change=${this._handleCompleteProfileChange}
                            ></complete-profile>
                        `}],skippable:e},[v.makePlan]:{steps:[{slug:"make-your-plan",component:o=>p`
                            <h1>Make your plan</h1>
                            <p>This is part of ${o.module}</p>
                            <p>This module is ${o.skippable?"":"not "}skippable</p>
                        `},{slug:"what-time-of-day",component:o=>p`
                            <h1>what Time of Day</h1>
                            <p>This is part of ${o.module}</p>
                            <p>This module is ${o.skippable?"":"not "}skippable</p>
                        `},{slug:"how-many-sessions",component:o=>p`
                            <h1>How Many Sessions</h1>
                            <p>This is part of ${o.module}</p>
                            <p>This module is ${o.skippable?"":"not "}skippable</p>
                        `}],skippable:e},[v.inviteFriends]:{steps:[{slug:"invite-your-friends",component:o=>p`
                            <h1>Invite your friends</h1>
                            <p>This is part of ${o.module}</p>
                            <p>This module is ${o.skippable?"":"not "}skippable</p>
                        `},{slug:"via-what-method",component:o=>p`
                            <h1>Use this QR or link or we can email them to you.</h1>
                            <p>This is part of ${o.module}</p>
                            <p>This module is ${o.skippable?"":"not "}skippable</p>
                        `}],skippable:e},[v.connectToCoach]:{steps:[{slug:"connected-to-coach",component:o=>p`
                            <h1>You are now connected to a coach</h1>
                            <p>One of our team will contact you in the next 24-48 hours</p>
                            <p>This is part of ${o.module}</p>
                            <p>This module is ${o.skippable?"":"not "}skippable</p>
                        `}],skippable:e}};return Object.keys(s).includes(t)?s[t]:s[v.completeProfile]}isWizardLoaded(){return Object.keys(this.modules).length!==0}loadWizard(){const t=this.getWizard();this.modules=t,this.steps=[],Object.entries(this.modules).forEach(([e,{steps:s,skippable:i}])=>{s.forEach(({component:o,slug:r})=>{const c={component:o,slug:r,module:e,skippable:i};this.steps.push(c)})})}isWizardTypeValid(){return!!Object.values(P).includes(this.type)}getWizard(){return this.isWizardTypeValid()?{[P.makeAPlan]:{[v.completeProfile]:this.getModule(v.completeProfile,!0),[v.makePlan]:this.getModule(v.makePlan,!0),[v.inviteFriends]:this.getModule(v.inviteFriends,!0)},[P.connectToCoach]:{[v.completeProfile]:this.getModule(v.completeProfile),[v.connectToCoach]:this.getModule(v.connectToCoach)}}[this.type]:{}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._handleHistoryPopState)}createRenderRoot(){return this}}window.customElements.define("zume-wizard",Ot);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Rt=n=>(...t)=>({_$litDirective$:n,values:t});class Ht{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const zt=n=>n.strings===void 0,Nt={},It=(n,t=Nt)=>n._$AH=t;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Lt=Rt(class extends Ht{constructor(n){if(super(n),n.type!==b.PROPERTY&&n.type!==b.ATTRIBUTE&&n.type!==b.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!zt(n))throw Error("`live` bindings can only contain a single expression")}render(n){return n}update(n,[t]){if(t===_||t===u)return t;const e=n.element,s=n.name;if(n.type===b.PROPERTY){if(t===e[s])return _}else if(n.type===b.BOOLEAN_ATTRIBUTE){if(!!t===e.hasAttribute(s))return _}else if(n.type===b.ATTRIBUTE&&e.getAttribute(s)===t+"")return _;return It(n),t}});class Mt extends y{static get properties(){return{name:{type:String},module:{type:String},t:{type:Object},locations:{attribute:!1},locationError:{attribute:!1},city:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.t={},this.locations=[],this.locationError="",this.city="",this._handleLocationsChange=this._handleLocationsChange.bind(this),this._clearLocations=this._clearLocations.bind(this),this._handleSuggestions=this._handleSuggestions.bind(this),this._debounceCityChange=debounce(getAddressSuggestions(this._handleSuggestions,zumeProfile.map_key)).bind(this),this._handleCityInputChange=this._handleCityInputChange.bind(this)}firstUpdated(){this.renderRoot.querySelector("#phone").focus()}render(){return p`
        <h1 class="text-center">${this.t.title}</h1>
        <div>
            <div class="">
                <label for="phone">${this.t.phone}</label>
                <input type="tel" id="phone" name="phone" value="" @change=${this._handlePhoneChange}>
            </div>
            <div class="">
                <label for="city">${this.t.city}</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    .value="${Lt(this.city)}"
                    @input=${this._handleCityChange}
                >
            </div>
            <div id="address_results">
                ${this.locationError}
                ${this.locations.map(t=>p`
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
        </div>
        `}_handlePhoneChange(t){t.stopPropagation();const e=new CustomEvent("profile-change",{detail:{id:t.target.name,value:t.target.value}});this.dispatchEvent(e)}_handleCityChange(t){this._handleCityInputChange(t),this._debounceCityChange(t)}_handleCityInputChange(t){}_handleSuggestions(t){t.features.length<1&&(this.locationError=this.t.no_locations_found),this.locations=t.features}_handleLocationsChange(t){this.locations=t}_handleLocationSelection(t){this.city=t.target.dataset.placeName;const e=new CustomEvent("profile-change",{detail:{id:"location_grid_meta",value:getLocationGridFromMapbox(t.target.id,zumeProfile.profile.location)}});this.dispatchEvent(e),this._clearLocations()}_clearLocations(){this.locations=[]}createRenderRoot(){return this}}window.customElements.define("complete-profile",Mt);class vt extends y{constructor(){super()}render(){return p`
            <div class="container">
                <div class="circle">
                    <div class="triangle"></div>
                </div>
            </div>
        `}}Z(vt,"styles",gt`
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
    `);window.customElements.define("play-button",vt);const at=document.querySelector(".nav-toggle"),jt=document.querySelector("#nav");at&&at.addEventListener("click",n=>{jt.classList.toggle("nav--visible")});
//# sourceMappingURL=main-8dda103a.js.map
