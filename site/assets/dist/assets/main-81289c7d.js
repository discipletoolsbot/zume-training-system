var re=Object.defineProperty;var oe=(i,t,e)=>t in i?re(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var z=(i,t,e)=>(oe(i,typeof t!="symbol"?t+"":t,e),e),nt=(i,t,e)=>{if(!t.has(i))throw TypeError("Cannot "+e)};var C=(i,t,e)=>(nt(i,t,"read from private field"),e?e.call(i):t.get(i)),I=(i,t,e)=>{if(t.has(i))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(i):t.set(i,e)},rt=(i,t,e,s)=>(nt(i,t,"write to private field"),s?s.call(i,e):t.set(i,e),e);var T=(i,t,e)=>(nt(i,t,"access private method"),e);import{createApp as le}from"https://unpkg.com/petite-vue?module";const wt=document.querySelector(".nav-toggle"),ce=document.querySelector("#nav");wt&&wt.addEventListener("click",i=>{ce.classList.toggle("nav--visible")});const de=({title:i,url:t,copyFeedback:e,shareFeedback:s})=>({title:i,url:t,webShareSupported:navigator.share,clipboardSupported:navigator.clipboard,shareFeedback:"",copyFeedback:"",noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported},share(){navigator.share({title:i,url:t,text:i}).then(()=>{this.shareFeedback=s,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(a=>console.error("Error sharing",a))},copyLink(){navigator.clipboard.writeText(t).then(()=>{this.copyFeedback=e,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(a=>console.error(a))}});window.zumeInitShareLinks=()=>{le({share:de}).mount()};var mt;let he=(mt=class{static save(t,e){localStorage.setItem(this.createKey(t),JSON.stringify(e))}static load(t){const e=localStorage.getItem(this.createKey(t));try{return JSON.parse(e)}catch{return e}}static createKey(t){return this.prefix+t}},z(mt,"prefix","Z5_"),mt);window.ZumeStorage=he;var k,tt,Ht,et,Ft,st,qt,V,gt;class Nt{constructor(t){I(this,tt);I(this,et);I(this,st);I(this,V);z(this,"WIZARD_STATE_NAME","zume_wizard_state");z(this,"STALE_LIFESPAN",10*60*1e3);z(this,"MAX_LIFESPAN",60*60*1e3);I(this,k,void 0);this.moduleName=t,rt(this,k,T(this,tt,Ht).call(this))}empty(){return Object.keys(C(this,k).data).length===0}isDataStale(){return T(this,V,gt).call(this,C(this,k),this.STALE_LIFESPAN)}get(t){return C(this,k).data[t]}getAll(){return C(this,k).data}add(t,e){C(this,k).data[t]=e,T(this,st,qt).call(this),localStorage.setItem(this.WIZARD_STATE_NAME,JSON.stringify(C(this,k)))}clear(){rt(this,k,null),localStorage.removeItem(this.WIZARD_STATE_NAME)}}k=new WeakMap,tt=new WeakSet,Ht=function(){const t=T(this,et,Ft).call(this);return t&&!T(this,V,gt).call(this,t,this.MAX_LIFESPAN)?t:{module:this.moduleName,data:{},timestamp:Date.now()}},et=new WeakSet,Ft=function(){return JSON.parse(localStorage.getItem(this.WIZARD_STATE_NAME))},st=new WeakSet,qt=function(){C(this,k).timestamp=Date.now()},V=new WeakSet,gt=function(t,e){return Date.now()-t.timestamp>e};const y={gettingStarted:"getting-started",makeAGroup:"make-a-group",getACoach:"get-a-coach",joinAPlan:"join-a-training",connectWithFriend:"connect-with-friend",joinFriendsPlan:"join-friends-training",checkin:"checkin"},$={completeProfile:"completeProfile",makePlan:"makePlan",inviteFriends:"inviteFriends",getACoach:"getACoach",joinTraining:"joinTraining",connectFriend:"connectFriend",joinFriendsTraining:"joinFriendsTraining",checkin:"checkin",planDecision:"planDecision"},ue={howManySessions:"how-many-sessions",whatTimeOfDay:"what-time-of-day",howOften:"how-often",startDate:"what-start-date"},l={updateName:"update-your-name",updateLocation:"update-your-location",updatePhone:"update-your-phone",inviteFriends:"invite-friends",contactPreferences:"contact-preferences",languagePreferences:"preferred-language",howCanWeServe:"how-can-we-serve",connectingToCoach:"connecting-to-coach",joinTraining:"join-training",connectToFriend:"connect-friend",joinFriendsPlan:"join-friends-training",checkinSubmit:"checkin-submit",...ue},pe={[l.updateName]:{field:"name",testExistance:(i,t)=>t.has_set_name},[l.updateLocation]:{field:"location",testExistance:i=>!(i.source&&i.source==="ip")},[l.updatePhone]:{field:"phone",testExistance:i=>!!i}};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const J=window,ft=J.ShadowRoot&&(J.ShadyCSS===void 0||J.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,vt=Symbol(),St=new WeakMap;let Ut=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==vt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(ft&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=St.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&St.set(e,t))}return t}toString(){return this.cssText}};const me=i=>new Ut(typeof i=="string"?i:i+"",void 0,vt),ge=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,a,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+i[o+1],i[0]);return new Ut(e,i,vt)},be=(i,t)=>{ft?i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const s=document.createElement("style"),a=J.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=e.cssText,i.appendChild(s)})},xt=ft?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return me(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ot;const K=window,Et=K.trustedTypes,fe=Et?Et.emptyScript:"",Dt=K.reactiveElementPolyfillSupport,bt={toAttribute(i,t){switch(t){case Boolean:i=i?fe:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Bt=(i,t)=>t!==i&&(t==t||i==i),lt={attribute:!0,type:String,converter:bt,reflect:!1,hasChanged:Bt};let j=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const a=this._$Ep(s,e);a!==void 0&&(this._$Ev.set(a,s),t.push(a))}),t}static createProperty(t,e=lt){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s=typeof t=="symbol"?Symbol():"__"+t,a=this.getPropertyDescriptor(t,s,e);a!==void 0&&Object.defineProperty(this.prototype,t,a)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(a){const o=this[t];this[e]=a,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||lt}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const a of s)this.createProperty(a,e[a])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const a of s)e.unshift(xt(a))}else t!==void 0&&e.push(xt(t));return e}static _$Ep(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return be(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=lt){var a;const o=this.constructor._$Ep(t,s);if(o!==void 0&&s.reflect===!0){const n=(((a=s.converter)===null||a===void 0?void 0:a.toAttribute)!==void 0?s.converter:bt).toAttribute(e,s.type);this._$El=t,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,e){var s;const a=this.constructor,o=a._$Ev.get(t);if(o!==void 0&&this._$El!==o){const n=a.getPropertyOptions(o),h=typeof n.converter=="function"?{fromAttribute:n.converter}:((s=n.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?n.converter:bt;this._$El=o,this[o]=h.fromAttribute(e,n.type),this._$El=null}}requestUpdate(t,e,s){let a=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||Bt)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):a=!1),!this.isUpdatePending&&a&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((a,o)=>this[o]=a),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach(a=>{var o;return(o=a.hostUpdate)===null||o===void 0?void 0:o.call(a)}),this.update(s)):this._$Ek()}catch(a){throw e=!1,this._$Ek(),a}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var a;return(a=s.hostUpdated)===null||a===void 0?void 0:a.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$EO(s,this[s],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};j.finalized=!0,j.elementProperties=new Map,j.elementStyles=[],j.shadowRootOptions={mode:"open"},Dt==null||Dt({ReactiveElement:j}),((ot=K.reactiveElementVersions)!==null&&ot!==void 0?ot:K.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ct;const Y=window,N=Y.trustedTypes,zt=N?N.createPolicy("lit-html",{createHTML:i=>i}):void 0,X="$lit$",E=`lit$${(Math.random()+"").slice(9)}$`,$t="?"+E,ve=`<${$t}>`,H=document,B=()=>H.createComment(""),W=i=>i===null||typeof i!="object"&&typeof i!="function",Wt=Array.isArray,Zt=i=>Wt(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",dt=`[ 	
\f\r]`,q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ct=/-->/g,At=/>/g,A=RegExp(`>|${dt}(?:([^\\s"'>=/]+)(${dt}*=${dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Pt=/'/g,Rt=/"/g,Vt=/^(?:script|style|textarea|title)$/i,Qt=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),r=Qt(1),G=Qt(2),S=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),Mt=new WeakMap,L=H.createTreeWalker(H,129,null,!1),Gt=(i,t)=>{const e=i.length-1,s=[];let a,o=t===2?"<svg>":"",n=q;for(let c=0;c<e;c++){const d=i[c];let f,m,u=-1,g=0;for(;g<d.length&&(n.lastIndex=g,m=n.exec(d),m!==null);)g=n.lastIndex,n===q?m[1]==="!--"?n=Ct:m[1]!==void 0?n=At:m[2]!==void 0?(Vt.test(m[2])&&(a=RegExp("</"+m[2],"g")),n=A):m[3]!==void 0&&(n=A):n===A?m[0]===">"?(n=a??q,u=-1):m[1]===void 0?u=-2:(u=n.lastIndex-m[2].length,f=m[1],n=m[3]===void 0?A:m[3]==='"'?Rt:Pt):n===Rt||n===Pt?n=A:n===Ct||n===At?n=q:(n=A,a=void 0);const b=n===A&&i[c+1].startsWith("/>")?" ":"";o+=n===q?d+ve:u>=0?(s.push(f),d.slice(0,u)+X+d.slice(u)+E+b):d+E+(u===-2?(s.push(void 0),c):b)}const h=o+(i[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return[zt!==void 0?zt.createHTML(h):h,s]};class Z{constructor({strings:t,_$litType$:e},s){let a;this.parts=[];let o=0,n=0;const h=t.length-1,c=this.parts,[d,f]=Gt(t,e);if(this.el=Z.createElement(d,s),L.currentNode=this.el.content,e===2){const m=this.el.content,u=m.firstChild;u.remove(),m.append(...u.childNodes)}for(;(a=L.nextNode())!==null&&c.length<h;){if(a.nodeType===1){if(a.hasAttributes()){const m=[];for(const u of a.getAttributeNames())if(u.endsWith(X)||u.startsWith(E)){const g=f[n++];if(m.push(u),g!==void 0){const b=a.getAttribute(g.toLowerCase()+X).split(E),v=/([.?@])?(.*)/.exec(g);c.push({type:1,index:o,name:v[2],strings:b,ctor:v[1]==="."?Kt:v[1]==="?"?Yt:v[1]==="@"?Xt:Q})}else c.push({type:6,index:o})}for(const u of m)a.removeAttribute(u)}if(Vt.test(a.tagName)){const m=a.textContent.split(E),u=m.length-1;if(u>0){a.textContent=N?N.emptyScript:"";for(let g=0;g<u;g++)a.append(m[g],B()),L.nextNode(),c.push({type:2,index:++o});a.append(m[u],B())}}}else if(a.nodeType===8)if(a.data===$t)c.push({type:2,index:o});else{let m=-1;for(;(m=a.data.indexOf(E,m+1))!==-1;)c.push({type:7,index:o}),m+=E.length-1}o++}}static createElement(t,e){const s=H.createElement("template");return s.innerHTML=t,s}}function M(i,t,e=i,s){var a,o,n,h;if(t===S)return t;let c=s!==void 0?(a=e._$Co)===null||a===void 0?void 0:a[s]:e._$Cl;const d=W(t)?void 0:t._$litDirective$;return(c==null?void 0:c.constructor)!==d&&((o=c==null?void 0:c._$AO)===null||o===void 0||o.call(c,!1),d===void 0?c=void 0:(c=new d(i),c._$AT(i,e,s)),s!==void 0?((n=(h=e)._$Co)!==null&&n!==void 0?n:h._$Co=[])[s]=c:e._$Cl=c),c!==void 0&&(t=M(i,c._$AS(i,t.values),c,s)),t}class Jt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:a}=this._$AD,o=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:H).importNode(s,!0);L.currentNode=o;let n=L.nextNode(),h=0,c=0,d=a[0];for(;d!==void 0;){if(h===d.index){let f;d.type===2?f=new F(n,n.nextSibling,this,t):d.type===1?f=new d.ctor(n,d.name,d.strings,this,t):d.type===6&&(f=new te(n,this,t)),this._$AV.push(f),d=a[++c]}h!==(d==null?void 0:d.index)&&(n=L.nextNode(),h++)}return o}v(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class F{constructor(t,e,s,a){var o;this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=a,this._$Cp=(o=a==null?void 0:a.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=M(this,t,e),W(t)?t===_||t==null||t===""?(this._$AH!==_&&this._$AR(),this._$AH=_):t!==this._$AH&&t!==S&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):Zt(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==_&&W(this._$AH)?this._$AA.nextSibling.data=t:this.$(H.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:a}=t,o=typeof a=="number"?this._$AC(t):(a.el===void 0&&(a.el=Z.createElement(a.h,this.options)),a);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.v(s);else{const n=new Jt(o,this),h=n.u(this.options);n.v(s),this.$(h),this._$AH=n}}_$AC(t){let e=Mt.get(t.strings);return e===void 0&&Mt.set(t.strings,e=new Z(t)),e}T(t){Wt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,a=0;for(const o of t)a===e.length?e.push(s=new F(this.k(B()),this.k(B()),this,this.options)):s=e[a],s._$AI(o),a++;a<e.length&&(this._$AR(s&&s._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){const a=t.nextSibling;t.remove(),t=a}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class Q{constructor(t,e,s,a,o){this.type=1,this._$AH=_,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=_}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,a){const o=this.strings;let n=!1;if(o===void 0)t=M(this,t,e,0),n=!W(t)||t!==this._$AH&&t!==S,n&&(this._$AH=t);else{const h=t;let c,d;for(t=o[0],c=0;c<o.length-1;c++)d=M(this,h[s+c],e,c),d===S&&(d=this._$AH[c]),n||(n=!W(d)||d!==this._$AH[c]),d===_?t=_:t!==_&&(t+=(d??"")+o[c+1]),this._$AH[c]=d}n&&!a&&this.j(t)}j(t){t===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Kt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===_?void 0:t}}const $e=N?N.emptyScript:"";class Yt extends Q{constructor(){super(...arguments),this.type=4}j(t){t&&t!==_?this.element.setAttribute(this.name,$e):this.element.removeAttribute(this.name)}}class Xt extends Q{constructor(t,e,s,a,o){super(t,e,s,a,o),this.type=5}_$AI(t,e=this){var s;if((t=(s=M(this,t,e,0))!==null&&s!==void 0?s:_)===S)return;const a=this._$AH,o=t===_&&a!==_||t.capture!==a.capture||t.once!==a.once||t.passive!==a.passive,n=t!==_&&(a===_||o);o&&this.element.removeEventListener(this.name,this,a),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class te{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}}const _e={O:X,P:E,A:$t,C:1,M:Gt,L:Jt,D:Zt,R:M,I:F,V:Q,H:Yt,N:Xt,U:Kt,F:te},It=Y.litHtmlPolyfillSupport;It==null||It(Z,F),((ct=Y.litHtmlVersions)!==null&&ct!==void 0?ct:Y.litHtmlVersions=[]).push("2.7.3");const ye=(i,t,e)=>{var s,a;const o=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:t;let n=o._$litPart$;if(n===void 0){const h=(a=e==null?void 0:e.renderBefore)!==null&&a!==void 0?a:null;o._$litPart$=n=new F(t.insertBefore(B(),h),h,void 0,e??{})}return n._$AI(i),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ht,ut;let p=class extends j{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ye(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return S}};p.finalized=!0,p._$litElement$=!0,(ht=globalThis.litElementHydrateSupport)===null||ht===void 0||ht.call(globalThis,{LitElement:p});const Tt=globalThis.litElementPolyfillSupport;Tt==null||Tt({LitElement:p});((ut=globalThis.litElementVersions)!==null&&ut!==void 0?ut:globalThis.litElementVersions=[]).push("3.3.2");class ke extends p{static get properties(){return{type:{type:String},finishUrl:{type:String},user:{type:Object},step:{attribute:!1},steps:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.stepIndex=0,this.steps=[],this.modules={},this.step={},this.t=window.SHAREDFUNCTIONS.escapeObject(jsObject.translations),this._handleHistoryPopState=this._handleHistoryPopState.bind(this),window.addEventListener("popstate",this._handleHistoryPopState),this.stateManager=new Nt}render(){if(!this.isWizardLoaded()){const t=this.getWizard(this.type);this.loadWizard(t),this._handleHistoryPopState(!0)}return this.steps.length===0?r`
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
        `}containerSize(){const t=this.steps[this.stepIndex];return(t.slug=l.joinTraining)?"container-md":"container-xsm"}currentStep(){const t=this.steps[this.stepIndex];return t.component(t,this.t,"w-100")}headerButtons(){const{skippable:t}=this.step,e=this.stepIndex===this.steps.length-1;return r`
        <div class="cluster | inline s-3">
            ${t&&!e?r`<button @click=${this._onSkip} class="brand">${this.t.skip}</button>`:""}
            ${!t&&!e?r`
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
                ${this.steps.map((t,e)=>{const s=e<=this.stepIndex;return r`<div class="step-circle ${s?"complete":""}"></div>`})}
            </div>
        `}footer(){return this.stepIndex===this.steps.length-1?this.finishButton():""}_onBack(){if(this.stepIndex>0){const t=this.stepIndex-1;this._gotoStep(t)}}_onNext(){if(this.stepIndex+1<this.steps.length){const t=this.stepIndex+1;this._gotoStep(t)}else this._onFinish()}_onSkip(){const t=this.step.module;for(let e=this.stepIndex+1;e<this.steps.length;e++)if(this.steps[e].module!==t){this._gotoStep(e);return}this._onFinish()}_onQuit(){this._onFinish(!0)}_onFinish(t=!1){this.stateManager.clear(),this.finishUrl||(window.location.href="/");const e=new URL(this.finishUrl);t||(this.type===y.checkin?e.searchParams.set("completed",this.type):e.searchParams.set("completed",this.type)),window.location.href=e}_gotoStep(t,e=!0){if(this.steps.length!==0&&(this.stepIndex=this.clampSteps(t),this.step=this.steps[this.stepIndex],e)){const s=new URL(window.location.href),a=s.pathname.split("/"),o=a[a.length-1];let n="";Object.values(y).includes(o)?n=a.join("/")+"/"+this.step.slug+s.search:n=a.slice(0,-1).join("/")+"/"+this.step.slug+s.search,window.history.pushState(null,null,n)}}clampSteps(t){let e=t;return t>this.steps.length-1&&(e=this.steps.length-1),t<0&&(e=0),e}_handleHistoryPopState(t=!1){const s=new URL(window.location.href).pathname.split("/"),a=s[s.length-1];Object.values(y).includes(a)&&this._gotoStep(0,!1);let o="",n=0;this.steps.forEach(({slug:h,module:c},d)=>{if(o!==c&&(o=c,n=d),a===h){if(t===!0&&this.stateManager.isDataStale()){this._gotoStep(n);return}this._gotoStep(d,!1)}})}_handlePlanDecision(t){switch(t.target.dataset.decision){case"make":this.updateWizard(y.makeAGroup);break;case"join":this.updateWizard(y.joinAPlan);break;case"skip":default:this._onSkip();break}}_handleLoading(t){const{loading:e}=t.detail;this.loading=e}makeModule(t=[],e=!1){const s={steps:[],skippable:e};return t.forEach(a=>{Object.keys(O).includes(a)&&s.steps.push(O[a])}),s}getModule(t,e=!1){const s={[$.completeProfile]:{steps:[O[l.updateName],O[l.updateLocation]],skippable:e},[$.planDecision]:{steps:[{slug:"plan-decision",component:(o,n,h)=>r`
                            <div class=${`stack ${h}`}>
                                <h2>Join or start a training</h2>
                                <button class="btn" data-decision="make" @click=${this._handlePlanDecision}>Start a training</button>
                                <button class="btn" data-decision="join" @click=${this._handlePlanDecision}>Join a public training</button>
                                <button class="btn outline" data-decision="skip" @click=${this._handlePlanDecision}>Skip for now</button>
                            </div>
                        `}],skippable:e},[$.makePlan]:this.makeModule([l.howManySessions,l.whatTimeOfDay,l.howOften,l.startDate,l.inviteFriends],e),[$.inviteFriends]:{steps:[O[l.inviteFriends]],skippable:e},[$.joinTraining]:{steps:[O[l.joinTraining]]}};return Object.keys(s).includes(t)?s[t]:s[$.completeProfile]}isWizardLoaded(){return Object.keys(this.modules).length!==0}loadWizard(t,e=!1){this.modules=t,e===!1&&(this.steps=[],this.stepIndex=0),Object.entries(this.modules).forEach(([s,{steps:a,skippable:o}])=>{const n=zumeProfile.profile;a.forEach(({component:h,slug:c})=>{const d=pe[c];let f=null;if(d&&n){if(d.testExistance(n[d.field],n))return;f=n[d.field]}const m={component:h,slug:c,module:s,skippable:o,doneHandler:this._onNext,handleLoading:this._handleLoading};f!==null&&(m.value=f),this.steps.push(m)})}),e===!1&&this._gotoStep(0)}updateWizard(t){const e=this.getWizard(t);Object.keys(e).length!==0&&this.loadWizard(e)}isWizardTypeValid(t){return!!Object.values(y).includes(t)}getWizard(t){return this.isWizardTypeValid(t)?{[y.gettingStarted]:{[$.completeProfile]:this.makeModule([l.updateName,l.updateLocation],!0),[$.planDecision]:this.getModule($.planDecision)},[y.makeAGroup]:{[$.makePlan]:this.getModule($.makePlan)},[y.getACoach]:{[$.completeProfile]:this.makeModule([l.updateName,l.updateLocation,l.updatePhone]),[$.getACoach]:this.makeModule([l.contactPreferences,l.languagePreferences,l.howCanWeServe,l.connectingToCoach])},[y.joinAPlan]:{[$.completeProfile]:this.makeModule([l.updateName,l.updateLocation,l.updatePhone]),[$.joinTraining]:this.getModule($.joinTraining)},[y.connectWithFriend]:{[$.completeProfile]:this.makeModule([l.updateName,l.updateLocation],!0),[$.connectFriend]:this.makeModule([l.connectToFriend])},[y.joinFriendsPlan]:{[$.completeProfile]:this.makeModule([l.updateName,l.updateLocation],!0),[$.joinFriendsTraining]:this.makeModule([l.joinFriendsPlan])},[y.checkin]:{[$.checkin]:this.makeModule([l.checkinSubmit])}}[t]:{}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._handleHistoryPopState)}createRenderRoot(){return this}}window.customElements.define("zume-wizard",ke);const O={[l.updateName]:{slug:l.updateName,component:(i,t,e)=>r`
            <complete-profile
                class=${e}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${t.complete_profile}"
                variant=${l.updateName}
                @done-step=${i.doneHandler}
                value=${JSON.stringify(i.value)}
            ></complete-profile>
        `},[l.updateLocation]:{slug:l.updateLocation,component:(i,t,e)=>r`
            <complete-profile
                class=${e}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${t.complete_profile}"
                variant=${l.updateLocation}
                @done-step=${i.doneHandler}
                value=${JSON.stringify(i.value)}
            ></complete-profile>
        `},[l.updatePhone]:{slug:l.updatePhone,component:(i,t,e)=>r`
            <complete-profile
                class=${e}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${t.complete_profile}"
                variant=${l.updatePhone}
                @done-step=${i.doneHandler}
                value=${JSON.stringify(i.value)}
            ></complete-profile>
        `},[l.contactPreferences]:{slug:l.contactPreferences,component:(i,t,e)=>r`
            <request-coach
                class=${e}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${t.get_a_coach}"
                variant=${l.contactPreferences}
                @done-step=${i.doneHandler}
            ></request-coach>
        `},[l.languagePreferences]:{slug:l.languagePreferences,component:(i,t,e)=>r`
            <request-coach
                class=${e}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${t.get_a_coach}"
                variant=${l.languagePreferences}
                @done-step=${i.doneHandler}
            ></request-coach>
        `},[l.howCanWeServe]:{slug:l.howCanWeServe,component:(i,t,e)=>r`
            <request-coach
                class=${e}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${t.get_a_coach}"
                variant=${l.howCanWeServe}
                @done-step=${i.doneHandler}
            ></request-coach>
        `},[l.connectingToCoach]:{slug:l.connectingToCoach,component:(i,t,e)=>r`
            <request-coach
                class=${e}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t="${t.get_a_coach}"
                variant=${l.connectingToCoach}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></request-coach>
        `},[l.inviteFriends]:{slug:l.inviteFriends,component:(i,t,e)=>r`
            <invite-friends
                class=${e}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${t.share}
            ></invite-friends>
        `},[l.joinTraining]:{slug:l.joinTraining,component:(i,t,e)=>r`
            <join-training
                class=${e}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${t.join_training}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></join-training>
        `},[l.joinFriendsPlan]:{slug:l.joinFriendsPlan,component:(i,t,e)=>r`
            <join-friends-training
                class=${e}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${t.join_training}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></join-friends-training>
        `},[l.connectToFriend]:{slug:l.connectToFriend,component:(i,t,e)=>r`
            <connect-friend
                class=${e}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${t.connect_friend}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></connect-friend>
        `},[l.checkinSubmit]:{slug:l.checkinSubmit,component:(i,t,e)=>r`
            <session-checkin
                class=${e}
                name=${i.slug}
                module=${i.module}
                ?skippable=${i.skippable}
                .t=${t.checkin}
                @done-step=${i.doneHandler}
                @loadingChange=${i.handleLoading}
            ></session-checkin>
        `},[l.howManySessions]:{slug:l.howManySessions,component:(i,t,e)=>r`
            <make-group
                class=${e}
                name=${i.slug}
                module=${i.module}
                variant=${l.howManySessions}
                ?skippable=${i.skippable}
                .t=${t.checkin}
                @done-step=${i.doneHandler}
            ></make-group>
        `},[l.whatTimeOfDay]:{slug:l.whatTimeOfDay,component:(i,t,e)=>r`
            <make-group
                class=${e}
                name=${i.slug}
                module=${i.module}
                variant=${l.whatTimeOfDay}
                ?skippable=${i.skippable}
                .t=${t.checkin}
                @done-step=${i.doneHandler}
            ></make-group>
        `},[l.howOften]:{slug:l.howOften,component:(i,t,e)=>r`
            <make-group
                class=${e}
                name=${i.slug}
                module=${i.module}
                variant=${l.howOften}
                ?skippable=${i.skippable}
                .t=${t.checkin}
                @done-step=${i.doneHandler}
            ></make-group>
        `},[l.startDate]:{slug:l.startDate,component:(i,t,e)=>r`
            <make-group
                class=${e}
                name=${i.slug}
                module=${i.module}
                variant=${l.startDate}
                ?skippable=${i.skippable}
                .t=${t.checkin}
                @done-step=${i.doneHandler}
            ></make-group>
        `}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const R={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ee=i=>(...t)=>({_$litDirective$:i,values:t});class se{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:we}=_e,Se=i=>i.strings===void 0,Ot=()=>document.createComment(""),U=(i,t,e)=>{var s;const a=i._$AA.parentNode,o=t===void 0?i._$AB:t._$AA;if(e===void 0){const n=a.insertBefore(Ot(),o),h=a.insertBefore(Ot(),o);e=new we(n,h,i,i.options)}else{const n=e._$AB.nextSibling,h=e._$AM,c=h!==i;if(c){let d;(s=e._$AQ)===null||s===void 0||s.call(e,i),e._$AM=i,e._$AP!==void 0&&(d=i._$AU)!==h._$AU&&e._$AP(d)}if(n!==o||c){let d=e._$AA;for(;d!==n;){const f=d.nextSibling;a.insertBefore(d,o),d=f}}}return e},P=(i,t,e=i)=>(i._$AI(t,e),i),xe={},ie=(i,t=xe)=>i._$AH=t,Ee=i=>i._$AH,pt=i=>{var t;(t=i._$AP)===null||t===void 0||t.call(i,!1,!0);let e=i._$AA;const s=i._$AB.nextSibling;for(;e!==s;){const a=e.nextSibling;e.remove(),e=a}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const De=ee(class extends se{constructor(i){if(super(i),i.type!==R.PROPERTY&&i.type!==R.ATTRIBUTE&&i.type!==R.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Se(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===S||t===_)return t;const e=i.element,s=i.name;if(i.type===R.PROPERTY){if(t===e[s])return S}else if(i.type===R.BOOLEAN_ATTRIBUTE){if(!!t===e.hasAttribute(s))return S}else if(i.type===R.ATTRIBUTE&&e.getAttribute(s)===t+"")return S;return ie(i),t}});class ze extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},value:{type:String},locations:{attribute:!1},locationError:{attribute:!1},phoneError:{attribute:!1},city:{attribute:!1},loading:{attribute:!1},state:{attribute:!1},localValue:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.locations=[],this.locationError="",this.city="",this.loading=!1,this.localValue="",this.phoneError="",this._clearLocations=this._clearLocations.bind(this),this._handleSuggestions=this._handleSuggestions.bind(this),this._debounceCityChange=debounce(getAddressSuggestions(this._handleSuggestions,zumeProfile.map_key)).bind(this),this._handleCityInputChange=this._handleCityInputChange.bind(this)}firstUpdated(){this.renderRoot.querySelector(".inputs input").focus(),this.value!==""&&(this.localValue=JSON.parse(this.value))}render(){var t;return r`
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
                        .value="${this.city?De(this.city):(t=this.localValue)==null?void 0:t.label}"
                        @input=${this._handleCityChange}
                    >
                    <span class="loading-spinner ${this.loading?"active":""}"></span>
                    <p class="input-subtext">${this.t.approximate_location}</p>
                </div>
                <button>${this.t.accept}</button>
                <div id="address_results">
                    ${this.locationError}
                    ${this.locations.map(e=>r`
                            <div
                                class="address-result"
                                id="${e.id}"
                                data-place-name=${e.place_name}
                                @click=${this._handleLocationSelection}
                            >
                                ${e.place_name}
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
        `}_handleInput(t){this.phoneError=""}_handleInvalid(t){t.preventDefault(),this.phoneError=this.t.phone_error}_handleSubmit(t){t.preventDefault(),t.srcElement.querySelector("#city")?this._handleSubmitLocation():this._handleDone(t)}_handleDone(t){t&&t.preventDefault();const e=t.target[0];if(e.type==="submit")return;let{name:s,value:a}=e;e.type==="tel"&&(a=e.value.replace(/[\(\)\-\s]/g,"")),this._updateProfile(s,a,()=>{this._sendDoneStepEvent()})}_sendDoneStepEvent(){const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)}_handleCityChange(t){this._handleCityInputChange(t),this._debounceCityChange(t)}_handleCityInputChange(t){this.city=t.target.value}_handleSuggestions(t){t.features.length<1&&(this.locationError=this.t.no_locations_found),this.locations=t.features}_handleLocationSelection(t){this.city=t.target.dataset.placeName;const e=getLocationGridFromMapbox(t.target.id,zumeProfile.profile.location);this.localValue=e,this._clearLocations()}_handleSubmitLocation(){if(this.localValue.source==="ip"){const{label:t,level:e,lat:s,lng:a}=this.localValue;this.localValue={source:"user",grid_id:!1,label:t,level:e,lat:Number(s),lng:Number(a)}}this._updateProfile("location_grid_meta",this.localValue,()=>{this._sendDoneStepEvent()})}_updateProfile(t,e,s=()=>{}){this.loading=!0;const a={[t]:e};fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(a),headers:{"X-WP-Nonce":jsObject.nonce}}).then(o=>o.json()).then(o=>{zumeProfile.profile=o,s()}).catch(o=>{console.error(o)}).finally(()=>{this.loading=!1})}_clearLocations(){this.locations=[]}createRenderRoot(){return this}}window.customElements.define("complete-profile",ze);class Ce extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},inviteCode:{type:String}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.t={},this.inviteCode="123456",this.url=`https://zume5.test/zume_app/plan_invite${this.inviteCode!==""?"?code="+this.inviteCode:""}`}render(){return r`
            <div class="center stack">
                <h2>${this.t.title}</h2>
                <p>${this.t.share_with_friends}</p>
                <share-links url=${this.url} title="${this.t.join_my_plan}" .t=${this.t}></share-links>
            </div>
        `}createRenderRoot(){return this}}window.customElements.define("invite-friends",Ce);class Ae extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},errorMessage:{attribute:!1},message:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.state={},this.errorMessage="",this.message="",this.loading=!1,this.contactPreferences=["email","text","phone","whatsapp","signal","telegram","messenger"]}firstUpdated(){this.message=this.t.connect_success;const t=this.stateManager.getAll();if(this.variant===l.connectingToCoach){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));const e=(a=>{a===!1&&(this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting)),a.coach_request&&a.coach_request.errors&&Object.keys(a.coach_request.errors).length!==0&&Object.keys(a.coach_request.errors)[0]==="already_has_coach"&&(this.message=this.t.already_coached,this.setErrorMessage(this.t.error_connecting)),this._handleFinish()}).bind(this),s=(()=>{this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting),this._handleFinish()}).bind(this);makeRequest("POST","get_a_coach",{data:t},"zume_system/v1/").done(e).fail(s).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}}setErrorMessage(t){this.errorMessage=t,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return this.stateManager||(this.stateManager=new Nt(this.module),this.state=this.stateManager.get(this.variant)||{},this.variant===l.languagePreferences&&!this.state.value&&(this.state.value=zumeProfile.profile.preferred_language||"en",this.stateManager.add(this.variant,this.state)),this.variant===l.contactPreferences&&Object.keys(this.state).length===0&&(this.state=Object.fromEntries(zumeProfile.profile.contact_preference.map(t=>[t,"true"])))),r`
        <form class="inputs stack-2" @submit=${this._handleDone}>
            ${this.variant===l.contactPreferences?r`
                <h2>${this.t.contact_preference_question}</h2>
                <div class="stack center container-sm | align-items-start text-start">
                    ${this.contactPreferences.map(t=>r`
                        <div>
                            <input type="checkbox" name="contact-preference" id=${t} value=${t} @change=${this._handleChange} ?checked=${!!this.state[t]} />
                            <label for=${t}>${this.t[t]}</label>
                        </div>
                    `)}
                </div>
            `:""}

            ${this.variant===l.languagePreferences?r`
                <h2>${this.t.language_preference_question}</h2>
                <div class="stack">
                    <label for="preferred-language">${this.t.language_preference}</label>
                    <select name="preferred-language" id="preferred-language" @change=${this._handleChange} >

                        ${Object.values(jsObject.languages).map(t=>r`
                            <option value=${t.code} ?selected=${t.code===this.state.value} >
                                ${t.nativeName} - ${t.enDisplayName}
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
        `}_handleDone(t){if(t&&t.preventDefault(),Object.keys(this.state).length===0){this.setErrorMessage(this.t.missing_response);return}this._sendDoneStepEvent()}_sendDoneStepEvent(){const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)}_handleFinish(){setTimeout(()=>{this._sendDoneStepEvent()},3e3)}_handleChange(t){t.target.type==="checkbox"&&(this.state[t.target.value]=t.target.checked),t.target.type==="text"&&(this.state.value=t.target.value),t.target.type==="select-one"&&(this.state.value=t.target.value),this.stateManager.add(this.variant,this.state)}createRenderRoot(){return this}}customElements.define("request-coach",Ae);class Pe extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.showTrainings=!1,this.loading=!1}firstUpdated(){const t=new URL(location.href);if(!t.searchParams.has("code")){this.message="",this.loading=!1,this.showTrainings=!0;return}const e=t.searchParams.get("code");this.connectToPlan(e)}connectToPlan(t){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait,this.code=t,makeRequest("POST","connect/public-plan",{code:t},"zume_system/v1").then(e=>{console.log(e),this.message=this.t.success.replace("%s",e.name),this._sendDoneStepEvent()}).fail(({responseJSON:e})=>{console.log(e),this.message="",e.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)},2e3)}setErrorMessage(t){this.errorMessage=t,setTimeout(()=>{this.errorMessage=""},3e3)}_handleChosenTraining(t){console.log(t);const{code:e}=t.detail;this.showTrainings=!1,this.connectToPlan(e)}render(){return r`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            ${this.showTrainings?r`
                <public-trainings .t=${this.t} @chosen-training=${this._handleChosenTraining}></public-trainings>
            `:""}
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("join-training",Pe);class Re extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const t=new URL(location.href);if(!t.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1;return}const e=t.searchParams.get("code");this.code=e,makeRequest("POST","connect/plan",{code:e},"zume_system/v1").then(s=>{console.log(s),this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)},2e3)}setErrorMessage(t){this.errorMessage=t,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return r`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("join-friends-training",Re);class Me extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const t=new URL(location.href);if(!t.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));return}const e=t.searchParams.get("code");this.code=e,makeRequest("POST","connect/friend",{code:e},"zume_system/v1").then(s=>{console.log(s),this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_friend_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)},2e3)}setErrorMessage(t){this.errorMessage=t,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return r`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("connect-friend",Me);class Ie extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const t=new URL(location.href);if(!t.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));return}const e=t.searchParams.get("code");this.code=e,makeRequest("POST","checkin",{code:e},"zume_system/v1").then(s=>{this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_checkin_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)},2e3)}setErrorMessage(t){console.log(t),this.errorMessage=t,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return r`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("session-checkin",Ie);class Te extends p{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},errorMessage:{attribute:!1},message:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.state={},this.errorMessage="",this.message="",this.loading=!1}setErrorMessage(t){this.errorMessage=t,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return r`
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

        `}_handleDone(t){t&&t.preventDefault(),this._sendDoneStepEvent()}_sendDoneStepEvent(){const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)}_handleFinish(){setTimeout(()=>{this._sendDoneStepEvent()},3e3)}createRenderRoot(){return this}}customElements.define("make-group",Te);function Oe(i){return i?JSON.parse('{"'+i.substring(1).replace(/&/g,'","').replace(/=/g,'":"')+'"}'):{}}function je(i,t){let e={};const s=i.split("/").filter(o=>o!=""),a=t.split("/").filter(o=>o!="");return s.map((o,n)=>{/^:/.test(o)&&(e[o.substring(1)]=a[n])}),e}function Le(i){return i?new RegExp("^(|/)"+i.replace(/:[^\s/]+/g,"([\\wÀ-ÖØ-öø-ÿ-]+)")+"(|/)$"):new RegExp("(^$|^/$)")}function Ne(i,t){if(Le(t).test(i))return!0}function He(i){return class extends i{static get properties(){return{route:{type:String,reflect:!0,attribute:"route"},canceled:{type:Boolean}}}constructor(...t){super(...t),this.route="",this.canceled=!1}connectedCallback(...t){super.connectedCallback(...t),this.routing(this.constructor.routes,(...e)=>this.router(...e)),window.addEventListener("route",()=>{this.routing(this.constructor.routes,(...e)=>this.router(...e))}),window.onpopstate=()=>{window.dispatchEvent(new CustomEvent("route"))}}routed(t,e,s,a,o,n){n&&n(t,e,s,a),o(t,e,s,a)}routing(t,e){this.canceled=!0;const s=decodeURI(window.location.pathname),a=decodeURI(window.location.search);let o=t.filter(c=>c.pattern==="*")[0],n=t.filter(c=>c.pattern!=="*"&&Ne(s,c.pattern))[0],h=Oe(a);n?(n.params=je(n.pattern,s),n.data=n.data||{},n.authentication&&n.authentication.authenticate&&typeof n.authentication.authenticate=="function"?(this.canceled=!1,Promise.resolve(n.authentication.authenticate.bind(this).call()).then(c=>{this.canceled||(c?n.authorization&&n.authorization.authorize&&typeof n.authorization.authorize=="function"?(this.canceled=!1,Promise.resolve(n.authorization.authorize.bind(this).call()).then(d=>{this.canceled||(d?this.routed(n.name,n.params,h,n.data,e,n.callback):this.routed(n.authorization.unauthorized.name,n.params,h,n.data,e,n.callback))})):this.routed(n.name,n.params,h,n.data,e,n.callback):this.routed(n.authentication.unauthenticated.name,n.params,h,n.data,e,n.callback))})):n.authorization&&n.authorization.authorize&&typeof n.authorization.authorize=="function"?(this.canceled=!1,Promise.resolve(n.authorization.authorize.bind(this).call()).then(c=>{this.canceled||(c?this.routed(n.name,n.params,h,n.data,e,n.callback):this.routed(n.authorization.unauthorized.name,n.params,h,n.data,e,n.callback))})):this.routed(n.name,n.params,h,n.data,e,n.callback)):o&&(o.data=o.data||{},this.routed(o.name,{},h,o.data,e,o.callback))}}}function Fe(i){return class extends i{navigate(t){window.history.pushState({},null,t),window.dispatchEvent(new CustomEvent("route"))}}}class w extends He(p){static get properties(){return{route:{type:String},params:{type:Object},query:{type:Object},menuOffset:{type:Number,attribute:!1}}}static get routes(){return[{name:"getting-started",pattern:`${zumeDashboard.base_url}/getting-started`,icon:"zume-start",translation:zumeDashboard.translations.getting_started,data:{component:"dash-getting-started"}},{name:"training",pattern:`${zumeDashboard.base_url}/training`,icon:"zume-training",translation:zumeDashboard.translations.training,data:{component:"dash-training"}},{name:"my-training",pattern:`${zumeDashboard.base_url}/my-training`,parent:"training",icon:"zume-group",translation:zumeDashboard.translations.my_training,explanation:zumeDashboard.translations.my_training_explanation,data:{component:"dash-trainings"}},{name:"my-progress",pattern:`${zumeDashboard.base_url}/my-progress`,parent:"training",icon:"zume-progress",translation:zumeDashboard.translations.my_progress,explanation:zumeDashboard.translations.my_progress_explanation,data:{component:"dash-progress"}},{name:"3-month-plan",pattern:`${zumeDashboard.base_url}/3-month-plan`,parent:"training",icon:"zume-plans",translation:zumeDashboard.translations["3_month_plan"],explanation:zumeDashboard.translations["3_month_plan_explanation"],data:{component:"dash-progress"}},{name:"practicing",pattern:`${zumeDashboard.base_url}/practicing`,icon:"zume-practicing",translation:zumeDashboard.translations.practicing,data:{component:"dash-practicing"}},{name:"my-coach",pattern:`${zumeDashboard.base_url}/my-coach`,parent:"practicing",icon:"zume-coach",translation:zumeDashboard.translations.my_coach,explanation:zumeDashboard.translations.my_coach_explanation,data:{component:"dash-coach"}},{name:"my-tools",pattern:`${zumeDashboard.base_url}/my-tools`,parent:"practicing",icon:"zume-tools",translation:zumeDashboard.translations.my_tools,explanation:zumeDashboard.translations.my_tools_explanation,data:{component:"dash-tools"}},{name:"my-plans",pattern:`${zumeDashboard.base_url}/my-plans`,parent:"practicing",icon:"zume-plans",translation:zumeDashboard.translations.my_plans,explanation:zumeDashboard.translations.my_plans_explanation,data:{component:"dash-plans"}},{name:"my-churches",pattern:`${zumeDashboard.base_url}/my-churches`,parent:"practicing",icon:"zume-churches",translation:zumeDashboard.translations.my_churches,explanation:zumeDashboard.translations.my_churches_explanation,data:{component:"dash-churches"}},{name:"my-maps",pattern:`${zumeDashboard.base_url}/my-maps`,parent:"practicing",icon:"zume-maps",translation:zumeDashboard.translations.my_maps,explanation:zumeDashboard.translations.my_maps_explanation,data:{component:"dash-maps"}},{name:"not-found",pattern:"*",icon:"",data:{component:"dash-not-found"}}]}static getRoute(t){return w.routes.find(s=>s.name===t)}static childRoutesOf(t){return w.routes.filter(({parent:s})=>s===t)}constructor(){super(),this.route="",this.params={},this.query={},this.data={},this.menuOffset=0,this.addEventListener("toggle-dashboard-sidebar",()=>{this.toggleSidebar()})}firstUpdated(){this.menuOffset=this.getOffsetTop(".sidebar-wrapper")}router(t,e,s,a){this.route=t,this.params=e,this.query=s,this.data=a}makeHref(t){return`${zumeDashboard.base_url}/${t}`}makeHrefRoute(t){const s=w.routes.find(({name:a})=>a===t);return s?s.pattern:(console.error("MISSING ROUTE",t),"")}renderRoute(){const{component:t}=this.data;return t?document.createElement(t):""}getOffsetTop(t){return this.querySelector(t).offsetTop}toggleSidebar(){const t=document.querySelector(".dashboard__sidebar"),e=document.querySelector(".sidebar__trigger-close-background"),s="200";t.style.transitionDuration=s,e.style.transitionDuration=s;const a=t.dataset.state;a==="open"&&(t.dataset.state="closed",e.style.opacity=0,setTimeout(()=>{e.style.visibility="hidden"},s)),(!a||a==="closed")&&(t.dataset.state="open",e.style.opacity="initial",e.style.visibility="visible")}render(){return r`
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
                                ${w.childRoutesOf("training").map(t=>r`
                                            <li>
                                                <nav-link
                                                    class="menu-btn"
                                                    href=${this.makeHrefRoute(t.name)}
                                                    icon=${t.icon}
                                                    text=${t.translation}
                                                    ?locked=${["3-month-plan"].includes(t.name)}
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
                                ${w.childRoutesOf("practicing").map(t=>r`
                                            <li>
                                                <nav-link
                                                    class="menu-btn"
                                                    href=${this.makeHrefRoute(t.name)}
                                                    icon=${t.icon}
                                                    text=${t.translation}
                                                    ?locked=${["my-plans","my-churches","my-maps"].includes(t.name)}
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
        `}createRenderRoot(){return this}}customElements.define("dash-board",w);class D extends p{constructor(){super();const e=document.querySelector("html").dataset.dir;this.isRtl=e==="rtl"}firstUpdated(){this.attachResizeObeserver(),this.updateHeaderStyle()}attachResizeObeserver(){const t=document.querySelector("dash-header-right"),e=new ResizeObserver(s=>{for(let a of s){if(!a.contentRect)return;const o=Math.round(a.contentRect.height),n=Math.round(a.contentRect.width);this.updateHeaderStyle(!1,o,n)}});this.resizeObserver=e,e.observe(t)}updateHeaderStyle(t=!0,e=0,s=window.innerWidth){const a=document.querySelector(".dashboard__header.left");t&&(this.initialOffset=a.offsetTop);let o;s<window.innerWidth/2?o=this.initialOffset:o=this.initialOffset+e,a.style.top=o+"px"}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.disconnect()}}class qe extends D{render(){return r`
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
        `}createRenderRoot(){return this}}customElements.define("dash-churches",qe);class Ue extends D{render(){return r`
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
        `}createRenderRoot(){return this}}customElements.define("dash-coach",Ue);class Be extends p{render(){return r`
            <div class="stack | card cta">
                <h2 class="h5 text-center">${zumeDashboard.translations.get_a_coach}</h2>
                <p>Don't forget about our free coaching</p>
                <a href="#" class="btn light uppercase">${zumeDashboard.translations.get_a_coach}</a>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-cta",Be);class it extends D{static get properties(){return{view:{type:String,attribute:!1}}}constructor(t){super(),this.routeName=t,this.route=w.getRoute(this.routeName),this.routes=w.childRoutesOf(this.routeName),this.view="list"}switchView(t="list"){this.view=t}renderLinks(){return this.view==="grid"?r`
                <div class="nav-grid">
                    ${this.routes.map(t=>r`
                        <grid-link
                            href=${t.pattern}
                            text=${t.translation||""}
                            icon=${t.icon}
                            ?locked=${["my-plans","my-churches","my-maps"].includes(t.name)}
                        >
                        </grid-link>
                        `)}
                </div>
            `:r`
            <div class="stack-3">
                ${this.routes.map(t=>r`
                    <list-link
                        href=${t.pattern}
                        text=${t.translation}
                        explanation=${t.explanation}
                        icon=${t.icon}
                        ?locked=${["my-plans","my-churches","my-maps"].includes(t.name)}
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
        `}createRenderRoot(){return this}}customElements.define("dash-top-level",it);class We extends it{constructor(){super("getting-started")}createRenderRoot(){return this}}customElements.define("dash-getting-started",We);class Ze extends D{render(){return r`
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
        `}createRenderRoot(){return this}}customElements.define("dash-maps",Ze);class Ve extends D{render(){return r`
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
        `}createRenderRoot(){return this}}customElements.define("dash-not-found",Ve);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const jt=(i,t,e)=>{const s=new Map;for(let a=t;a<=e;a++)s.set(i[a],a);return s},_t=ee(class extends se{constructor(i){if(super(i),i.type!==R.CHILD)throw Error("repeat() can only be used in text expressions")}dt(i,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);const a=[],o=[];let n=0;for(const h of i)a[n]=s?s(h,n):n,o[n]=e(h,n),n++;return{values:o,keys:a}}render(i,t,e){return this.dt(i,t,e).values}update(i,[t,e,s]){var a;const o=Ee(i),{values:n,keys:h}=this.dt(t,e,s);if(!Array.isArray(o))return this.ht=h,n;const c=(a=this.ht)!==null&&a!==void 0?a:this.ht=[],d=[];let f,m,u=0,g=o.length-1,b=0,v=n.length-1;for(;u<=g&&b<=v;)if(o[u]===null)u++;else if(o[g]===null)g--;else if(c[u]===h[b])d[b]=P(o[u],n[b]),u++,b++;else if(c[g]===h[v])d[v]=P(o[g],n[v]),g--,v--;else if(c[u]===h[v])d[v]=P(o[u],n[v]),U(i,d[v+1],o[u]),u++,v--;else if(c[g]===h[b])d[b]=P(o[g],n[b]),U(i,o[u],o[g]),g--,b++;else if(f===void 0&&(f=jt(h,b,v),m=jt(c,u,g)),f.has(c[u]))if(f.has(c[g])){const x=m.get(h[b]),at=x!==void 0?o[x]:null;if(at===null){const kt=U(i,o[u]);P(kt,n[b]),d[b]=kt}else d[b]=P(at,n[b]),U(i,o[u],at),o[x]=null;b++}else pt(o[g]),g--;else pt(o[u]),u++;for(;b<=v;){const x=U(i,d[v+1]);P(x,n[b]),d[b++]=x}for(;u<=g;){const x=o[u++];x!==null&&pt(x)}return this.ht=h,ie(i,d),S}});class Qe extends D{static get properties(){return{loading:{type:Boolean,attribute:!1},commitments:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1}}}constructor(){super(),this.loading=!0,this.route=w.getRoute("my-plans"),this.filterName="my-plans-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.renderListItem=this.renderListItem.bind(this),this.closeCommitmentsModal=this.closeCommitmentsModal.bind(this)}firstUpdated(){super.firstUpdated();const t=this.filterStatus||"";this.fetchCommitments(t)}updated(){jQuery(document).foundation()}fetchCommitments(){const t=this.filterStatus;makeRequest("GET","commitments",{status:t},"zume_system/v1").done(e=>{this.commitments=e}).always(()=>{this.loading=!1})}openCommitmentsModal(){const t=document.querySelector("#new-commitments-form");jQuery(t).foundation("open")}closeCommitmentsModal(){const t=document.querySelector("#new-commitments-form");jQuery(t).foundation("close")}clearCommitmentsModal(){jQuery(".post-training-plan").each(function(t){this.value=""})}addCommitments(){const t=[];return jQuery(".post-training-plan").each(function(e){const s=jQuery(this).val();if(s){const o=jQuery(this).prev().text();console.log("Question: "+o+" Answer: "+s);var a=new Date;a.setDate(a.getDate()+30),this.value="";const n=makeRequest("POST","commitment",{user_id:zumeDashboard.user_profile.user_id,post_id:zumeDashboard.user_profile.contact_id,meta_key:"tasks",note:"Question: "+o+" Answer: "+s,question:o,answer:s,date:a,category:"post_training_plan"},"zume_system/v1");t.push(n.promise())}}),console.log(t),Promise.all(t).then(()=>{this.fetchCommitments(),this.closeCommitmentsModal()})}completeCommitment(t){let e={id:t,user_id:zumeDashboard.user_profile.user_id};makeRequest("PUT","commitment",e,"zume_system/v1").done(s=>{this.fetchCommitments()})}deleteCommitment(t){let e={id:t,user_id:zumeDashboard.user_profile.user_id};makeRequest("DELETE","commitment",e,"zume_system/v1").done(s=>{this.closeMenu(t),this.fetchCommitments()})}editCommitment(t){console.log(t)}filterCommitments(t){this.filterStatus=t,this.fetchCommitments(t),ZumeStorage.save(this.filterName,t),this.closeFilter()}closeFilter(){const t=this.querySelector("#filter-menu");jQuery(t).foundation("close")}closeMenu(t){const e=this.querySelector(`#kebab-menu-${t}`);jQuery(e).foundation("close")}renderListItem(t){const{question:e,answer:s,id:a,status:o}=t;return r`
            <li class="list__item | switcher | switcher-width-30">
                <span>${e} <b>${s}</b></span>
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
                                    ${!this.loading&&this.commitments&&this.commitments.length>0?_t(this.commitments,t=>t.id,this.renderListItem):""}
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
        `}createRenderRoot(){return this}}customElements.define("dash-plans",Qe);class Ge extends it{constructor(){super("practicing")}createRenderRoot(){return this}}customElements.define("dash-practicing",Ge);class Je extends D{static get properties(){return{loading:{type:Boolean,attribute:!1},filteredItems:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1},hostProgress:{type:Object,attribute:!1}}}constructor(){super(),this.loading=!1,this.route=w.getRoute("my-progress"),this.trainingItems=zumeDashboard.training_items,this.hostProgress=zumeDashboard.host_progress,this.filterName="my-progress-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.filteredItems=this.filterItems(this.filterStatus),this.openStates={},this.trainingItems.forEach(t=>{this.openStates[t.key]=!1}),this.renderListItem=this.renderListItem.bind(this),this.closeInfoModal=this.closeInfoModal.bind(this)}updated(){jQuery(document).foundation()}openInfoModal(){const t=document.querySelector("#new-commitments-form");jQuery(t).foundation("open")}closeInfoModal(){const t=document.querySelector("#new-commitments-form");jQuery(t).foundation("close")}filterProgress(t){this.filterStatus=t,this.filteredItems=this.filterItems(t),console.log(this.filteredItems),ZumeStorage.save(this.filterName,t),this.closeFilter()}filterItems(t){switch(t){case"heard":return this.trainingItems.filter(e=>{const s=e.host[0].key;return!!(this.hostProgress.list[s]||!1)});case"not-heard":return this.trainingItems.filter(e=>{const s=e.host[0].key;return!(this.hostProgress.list[s]||!1)});default:return[...this.trainingItems]}}closeFilter(){const t=this.querySelector("#filter-menu");jQuery(t).foundation("close")}toggleHost(t,e){e.stopImmediatePropagation();const{type:s,subtype:a,key:o}=t,n=this.hostProgress.list[o];n===!1&&makeRequest("POST","host",{type:s,subtype:a,user_id:zumeDashboard.user_profile.user_id},"zume_system/v1").done(h=>{Array.isArray(h)&&(this.hostProgress.list[o]=!0),this.loadHostStatus()}),n===!0&&makeRequest("DELETE","host",{type:s,subtype:a,user_id:zumeDashboard.user_profile.user_id},"zume_system/v1").done(h=>{Array.isArray(h)&&(this.hostProgress.list[o]=!1),this.loadHostStatus()})}loadHostStatus(){makeRequest("GET","host",{user_id:zumeDashboard.user_profile.user_id},"zume_system/v1").done(t=>{this.hostProgress=t})}toggleDetails(t){const e=this.querySelector(`#details-${t}`),s=this.openStates[t],a=e.scrollHeight,o="200";s===!1?(e.style.height=a+"px",e.style.transitionDuration=o+"ms",e.dataset.state="opening",this.openStates[t]=!0,setTimeout(()=>{e.style.height="auto",e.dataset.state="open"},o)):(e.style.height=a+"px",e.dataset.state="closing",this.openStates[t]=!1,setTimeout(()=>{e.style.height="0"},10),setTimeout(()=>{e.dataset.state="closed"},o))}renderListItem(t){const{title:e,description:s,host:a,slug:o,key:n}=t;let h=[zumeDashboard.site_url,zumeDashboard.language,o].join("/");return zumeDashboard.language==="en"&&(h=[zumeDashboard.site_url,o].join("/")),r`
            <li class="switcher | switcher-width-30 list__item tight" @click=${()=>this.toggleDetails(n)} role="button">
                <div>
                    <h2 class="h5 bold m0">${e}</h2>
                    <div class="collapse" id="details-${n}" data-state="closed">
                        <div class="stack--2 mt--2">
                            <p class="f--1 gray-700">${s}</p>
                            <div class="cluster">
                                <share-links url=${h} title=${e} .t=${zumeDashboard.share_translations}></share-links>
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
        `}render(){var t,e,s,a,o,n,h,c;return r`
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
                                ${_t(this.filteredItems,d=>d.key,this.renderListItem)}
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
                        <host-progress-circle class="grow-0" type="heard" percent=${((e=(t=this.hostProgress)==null?void 0:t.percent)==null?void 0:e.h)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${zumeDashboard.translations.heard}</h3>
                            <p class="italic">${zumeDashboard.translations.heard_explanation}</p>
                        </div>
                    </div>
                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="obeyed" percent=${((a=(s=this.hostProgress)==null?void 0:s.percent)==null?void 0:a.o)||0}></host-progress-circle>
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
        `}createRenderRoot(){return this}}customElements.define("dash-progress",Je);class Ke extends D{render(){return r`
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
        `}createRenderRoot(){return this}}customElements.define("dash-tools",Ke);class Ye extends it{constructor(){super("training")}createRenderRoot(){return this}}customElements.define("dash-training",Ye);class Xe extends D{static get properties(){return{loading:{type:Boolean,attribute:!1},commitments:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1}}}constructor(){super(),this.loading=!0,this.route=w.getRoute("my-plans"),this.filterName="my-plans-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.renderListItem=this.renderListItem.bind(this),this.closeCommitmentsModal=this.closeCommitmentsModal.bind(this)}firstUpdated(){super.firstUpdated();const t=this.filterStatus||"";this.fetchCommitments(t)}updated(){jQuery(document).foundation()}fetchCommitments(){const t=this.filterStatus;makeRequest("GET","commitments",{status:t},"zume_system/v1").done(e=>{this.commitments=e}).always(()=>{this.loading=!1})}openCommitmentsModal(){const t=document.querySelector("#new-commitments-form");jQuery(t).foundation("open")}closeCommitmentsModal(){const t=document.querySelector("#new-commitments-form");jQuery(t).foundation("close")}clearCommitmentsModal(){jQuery(".post-training-plan").each(function(t){this.value=""})}addCommitments(){const t=[];return jQuery(".post-training-plan").each(function(e){const s=jQuery(this).val();if(s){const o=jQuery(this).prev().text();console.log("Question: "+o+" Answer: "+s);var a=new Date;a.setDate(a.getDate()+30),this.value="";const n=makeRequest("POST","commitment",{user_id:zumeDashboard.user_profile.user_id,post_id:zumeDashboard.user_profile.contact_id,meta_key:"tasks",note:"Question: "+o+" Answer: "+s,question:o,answer:s,date:a,category:"post_training_plan"},"zume_system/v1");t.push(n.promise())}}),console.log(t),Promise.all(t).then(()=>{this.fetchCommitments(),this.closeCommitmentsModal()})}completeCommitment(t){let e={id:t,user_id:zumeDashboard.user_profile.user_id};makeRequest("PUT","commitment",e,"zume_system/v1").done(s=>{this.fetchCommitments()})}deleteCommitment(t){let e={id:t,user_id:zumeDashboard.user_profile.user_id};makeRequest("DELETE","commitment",e,"zume_system/v1").done(s=>{this.closeMenu(t),this.fetchCommitments()})}editCommitment(t){console.log(t)}filterCommitments(t){this.filterStatus=t,this.fetchCommitments(t),ZumeStorage.save(this.filterName,t),this.closeFilter()}closeFilter(){const t=this.querySelector("#filter-menu");jQuery(t).foundation("close")}closeMenu(t){const e=this.querySelector(`#kebab-menu-${t}`);jQuery(e).foundation("close")}renderListItem(t){const{question:e,answer:s,id:a,status:o}=t;return r`
            <li class="list__item">
                <span>${e} <b>${s}</b></span>
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
                                    ${!this.loading&&this.commitments&&this.commitments.length>0?_t(this.commitments,t=>t.id,this.renderListItem):""}
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
        `}createRenderRoot(){return this}}customElements.define("dash-trainings",Xe);class ts extends p{firstUpdated(){const t=this.offsetTop;this.style.top=t+"px"}render(){return r`
            <div class="dashboard__header right">
                <dash-sidebar-toggle displayOn="medium"></dash-sidebar-toggle>
                <launch-course></launch-course>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-header-right",ts);class es extends p{static get properties(){return{displayOn:{type:String}}}constructor(){super(),this.displayOn="large"}toggleSidebar(){const t=new CustomEvent("toggle-dashboard-sidebar",{bubbles:!0});this.dispatchEvent(t)}render(){return r`
            <button class="btn f-0 light tight dashboard__sidebar-toggle break-${this.displayOn}" @click=${this.toggleSidebar}>${zumeDashboard.translations.menu}</button>
        `}createRenderRoot(){return this}}customElements.define("dash-sidebar-toggle",es);class yt extends Fe(p){static get properties(){return{href:{type:String},class:{type:String},locked:{type:Boolean},completed:{type:Boolean},directLink:{type:Boolean},icon:{type:String},text:{type:String},explanation:{type:String}}}constructor(){super(),this.href="",this.class="",this.icon="",this.text="",this.explanation="",this.locked=!1,this.completed=!1,this.directLink=!1}handleClick(t){this.directLink||(t.preventDefault(),this.navigate(this.href))}printBool(t){return t?"true":"false"}render(){return r`
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
        `}createRenderRoot(){return this}}customElements.define("nav-link",yt);class ss extends yt{constructor(){super()}renderText(){return this.text.split(" ").map(t=>r`
            <span>${t}</span>
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
        `}}customElements.define("grid-link",ss);class is extends yt{constructor(){super()}renderText(){return this.text.split(" ").map(t=>r`
            <span>${t}</span>
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
        `}}customElements.define("list-link",is);class as extends p{constructor(){super();const e=document.querySelector("html").dataset.dir;this.isRtl=e==="rtl"}updated(){jQuery(document).foundation()}render(){return r`
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
        `}createRenderRoot(){return this}}customElements.define("launch-course",as);class ns extends p{static get properties(){return{title:{type:String},sections:{type:Array}}}render(){return r`
            <div class="container">
                <h1 class="text-center">${this.title}</h1>
                ${this.sections.map((t,e)=>r`
                        <course-section .section=${t}></course-section>
                    `)}
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-guide",ns);const Lt=["slideshow","guide"];class rs extends p{static get properties(){return{languageCode:{type:String},homeUrl:{type:String},assetsPath:{type:String},translations:{type:Object},zumeSessions:{attribute:!1},lessonIndex:{attribute:!1},view:{attribute:!1},linkNodes:{attribute:!1},showIndex:{attribute:!1}}}constructor(){super();const t=new URL(window.location.href),e=this.getZumeSessions(t);this.zumeSessions=e;const s=this.getLessonIndex(t);this.lessonIndex=s,this.view=this.getView(t),this.changeSession(s,!1,e),this.handleSessionLink=this.handleSessionLink.bind(this),this.handleHistoryPopState=this.handleHistoryPopState.bind(this),window.addEventListener("popstate",this.handleHistoryPopState),document.querySelectorAll(".language-selector").forEach(function(o){o.addEventListener("click",()=>{const n=o.dataset.value,h=new URL(location.href),c=h.pathname.substring(1).split("/");let d="";c.length>0&&jsObject.zume_languages.includes(c[0])?d=c.slice(1).join("/"):d=c.join("/"),n!=="en"?d="/"+n+"/"+d:d="/"+d,d+=h.search,location.href=d})})}getView(t){if(t.searchParams.has("view")){const e=t.searchParams.get("view");if(Lt.includes(e))return e}else return"slideshow"}getLessonIndex(t){if(t.searchParams.has("session")){const e=t.searchParams.get("session");if(e==="index")return"index";const s=Number(e);return Number.isInteger(s)?s-1:0}else return 0}getZumeSessions(t){const e=t.searchParams.get("type")||"10";this.type=e;let s;switch(e){case"10":s=zume10Sessions;break;case"20":s=zume20Sessions;break;case"intensive":s=zumeIntensiveSessions;break;default:s=zume10Sessions;break}return s}handleSessionLink(t){const e=t.target,s=Number(e.dataset.sessionNumber);this.lessonIndex=s,this.showIndex===!0&&(this.showIndex=!1),this.changeSession(this.lessonIndex)}getNextSession(){this.lessonIndex+=1,this.changeSession(this.lessonIndex)}getPreviousSession(){this.lessonIndex-=1,this.changeSession(this.lessonIndex)}changeSession(t,e=!0,s=null){if(t==="index"){this.showIndex=!0;return}else this.showIndex=!1;const a=s||this.zumeSessions;let o=t;t<0&&(o=0),t>a.length-1&&(o=a.length-1),this.lessonIndex=o,this.session=a[o],e&&this.pushHistory()}pushHistory(){const t=this.lessonIndex,e=this.view,s=new URL(window.location.href);t!==null&&Number.isInteger(t)&&s.searchParams.set("session",t+1),e&&s.searchParams.set("view",e),window.history.pushState(null,null,s.href)}handleHistoryPopState(){var a;const t=new URL(location.href),e=t.searchParams.has("session")?t.searchParams.get("session"):null,s=t.searchParams.get("view");(a=document.querySelector(".js-off-canvas-overlay"))==null||a.classList.remove("is-visible"),Number.isInteger(Number(e))&&(this.lessonIndex=e-1,this.changeSession(this.lessonIndex,!1)),e==="index"&&(this.lessonIndex="index",this.changeSession("index",!1)),s&&Lt.includes(s)&&(this.view=s)}getSessionTitle(){return!this.session||!this.session.t?"":this.session.t}getSessionSections(){return!this.session||!this.session.sections?[]:this.session.sections}switchViews(t=!0){this.view==="guide"?this.view="slideshow":this.view="guide",t===!0&&this.pushHistory({view:this.view})}openMenu(){const t=this.querySelector("#offCanvas");jQuery(t).foundation("open")}render(){const t=this.showIndex?"visually-hidden":"",e=this.type==="intensive"?"container-xsm":"container-sm";return r`
            ${this.showIndex?r`
                    <div class="course-index | bg-brand-gradient">
                        <img src="${jsObject.images_url}/zume-training-logo-white.svg" alt="Zume Logo" class="mx-auto w-70 py-1" />
                        <div class="${e}" data-max-width="750">
                            <div class="grid | grid-min-8rem gutter0">
                                ${this.zumeSessions.map((s,a)=>r`
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

            <nav class="${t} stack | bg-white px-0 text-center | off-canvas position-left justify-content-between py-1" id="offCanvas" data-off-canvas data-transition="overlap">
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
                        ${this.zumeSessions.map((s,a)=>r`
                            <button
                                class="link session-link"
                                data-session-number="${a}"
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

            <span class="${t} p-1 d-block position-relative z-1">
                <button id="hamburger-menu" class="nav-toggle show" @click=${this.openMenu}>
                    <span class="hamburger brand"></span>
                </button>
            </span>

            <div class="${t} container">
                ${this.view==="guide"?r`<course-guide title="${this.getSessionTitle()}" .sections=${this.getSessionSections()}></course-guide>`:r`<course-slideshow title="${this.getSessionTitle()}" .sections=${this.getSessionSections()}></course-slideshow>`}
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-presenter",rs);class os extends p{static get properties(){return{section:{type:Object}}}constructor(){super()}render(){return this.title=this.section.t??null,this.description=this.section.d??null,this.info=this.section.info??null,this.duration=this.section.duration??null,this.parts=this.section.parts??[],r`
            ${this.title!==null?r`<h1>${this.title}</h1>`:""}
            ${this.description!==null?r`<p>${this.description}</p>`:""}
            ${this.info!==null?r`<p>${this.info}</p>`:""}
            ${this.duration!==null?r`<p>${this.duration}</p>`:""}

            ${this.parts.map(t=>r`<part-switcher .partData=${t}></part-switcher>`)}

        `}createRenderRoot(){return this}}customElements.define("course-section",os);class ls extends p{static get properties(){return{title:{type:String},sections:{type:Array},sectionIndex:{attribute:!1},partIndex:{attribute:!1},currentSlide:{attribute:!1},index:{attribute:!1}}}constructor(){super(),this.reset(),this.listenForKeyboard=this.listenForKeyboard.bind(this),this.listenForMouseClick=this.listenForMouseClick.bind(this)}reset(){this.sectionIndex=-1,this.partIndex=-1,this.currentSlide=null,this.index=[]}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.listenForKeyboard),document.addEventListener("mousedown",this.listenForMouseClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.listenForKeyboard),document.removeEventListener("mousedown",this.listenForMouseClick)}attributeChangedCallback(t,e,s){super.attributeChangedCallback(t,e,s),t==="title"&&e!==s&&this.reset()}setupIndex(){this.sections&&(this.index=this.sections.map(t=>t.parts?t.parts.length:0))}nextSlide(){if(this.sectionIndex>this.sections.length-1&&(this.sectionIndex=this.sections.length-1),this.index[this.sectionIndex]===0||this.index[this.sectionIndex]===this.partIndex+1){if(this.sectionIndex===this.sections.length-1)return;this.setSlide(this.sectionIndex+1,-1);return}if(this.index[this.sectionIndex]>0){this.setSlide(this.sectionIndex,this.partIndex+1);return}}previousSlide(){if(this.sectionIndex<0&&(this.sectionIndex=0),this.index[this.sectionIndex]===0||this.partIndex===-1){if(this.sectionIndex===0)return;const t=this.index[this.sectionIndex-1]-1;this.setSlide(this.sectionIndex-1,t);return}this.setSlide(this.sectionIndex,this.partIndex-1)}listenForKeyboard(t){["Space","ArrowRight"].includes(t.code)&&this.nextSlide(),["Backspace","ArrowLeft"].includes(t.code)&&this.previousSlide()}listenForMouseClick(t){const{x:e}=t,{innerWidth:s}=window,a=10/100*s+80;e<a&&(this.querySelector(".clickable-area.back").classList.add("visible"),this.previousSlide()),e>s-a&&(this.querySelector(".clickable-area.forward").classList.add("visible"),this.nextSlide())}setSlide(t,e){if(this.sectionIndex=t,this.partIndex=e,e<0){const s=this.sections[t];this.currentSlide=r`<section-part .partData=${s}></section-part>`}else{const s=this.sections[t].parts[e];this.currentSlide=r`<part-switcher .partData=${s}></part-switcher>`}}render(){return this.index.length===0&&this.setupIndex(),this.sectionIndex<0&&this.setSlide(0,-1),r`
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

        `}createRenderRoot(){return this}}customElements.define("course-slideshow",ls);class cs extends p{static get properties(){return{partData:{type:Object}}}render(){switch(this.partData.type){case"section":return r`<section-part .partData=${this.partData}></section-part>`;case"watch":return r`<watch-part .partData=${this.partData}></watch-part>`;case"discuss":return r`<discuss-part .partData=${this.partData}></discuss-part>`;case"read":return r`<read-part .partData=${this.partData}></read-part>`;case"see":return r`<see-part .partData=${this.partData}></see-part>`;case"share":return r`<share-part .partData=${this.partData}></share-part>`;case"listen":return r`<listen-part .partData=${this.partData}></listen-part>`;case"form":return r`<form-part .partData=${this.partData}></form-part>`;case"checkin":return r`<checkin-part .partData=${this.partData}></checkin-part>`;case"cta":default:return r`<basic-part .partData=${this.partData}></basic-part>`}}createRenderRoot(){return this}}customElements.define("part-switcher",cs);class ds extends p{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return r`
            ${t!==null?r`<h3>${t}</h3>`:""}
            ${e!==null?r`<p>${e}</p>`:""}
            ${s!==null?r`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("basic-part",ds);class hs extends p{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return r`
            ${t!==null?r`<h3>${t}</h3>`:""}
            ${e!==null?r`<p>${e}</p>`:""}
            ${s!==null?r`<p>${s}</p>`:""}

            <div><img class="mx-auto" src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&amp;color=323a68&amp;data=https://zume5.training/zume_app/checkin/?code=5678" width="300px" alt="QR Code"></div>
            <p>
                or <br>
                zume.training/checkin and use code <strong class="text-lightblue"><a href="https://zume5.training/zume_app/checkin/?code=5678" target="_blank">5678</a></strong>
            </p>
        `}createRenderRoot(){return this}}customElements.define("checkin-part",hs);class us extends p{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return r`
            ${t!==null?r`<h3>${t}</h3>`:""}
            ${e!==null?r`<p>${e}</p>`:""}
            ${s!==null?r`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("discuss-part",us);class ps extends p{static get properties(){return{partData:{type:Object}}}render(){return this.partData.t,this.partData.d,this.partData.info,r`
            ${this.title!==null?r`<h2>${this.title}</h2>`:""}
            ${this.description!==null?r`<p>${this.description}</p>`:""}
            ${this.info!==null?r`<p>${this.info}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("form-part",ps);class ms extends p{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return r`
            <h2 class="brand">LISTEN</h2>
            ${t!==null?r`<h3>${t}</h3>`:""}
            ${e!==null?r`<p>${e}</p>`:""}
            ${s!==null?r`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("listen-part",ms);class gs extends p{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return r`
            <h2 class="brand">READ</h2>
            ${t!==null?r`<h3>${t}</h3>`:""}
            ${e!==null?r`<p>${e}</p>`:""}
            ${s!==null?r`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("read-part",gs);class bs extends p{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return r`
            ${t!==null?r`<h2>${t}</h2>`:""}
            ${e!==null?r`<p>${e}</p>`:""}
            ${s!==null?r`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("section-part",bs);class fs extends p{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return r`
            <h2 class="brand">SEE</h2>
            ${t!==null?r`<h3>${t}</h3>`:""}
            ${e!==null?r`<p>${e}</p>`:""}
            ${s!==null?r`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("see-part",fs);class vs extends p{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return r`
            ${t!==null?r`<h3>${t}</h3>`:""}
            ${e!==null?r`<p>${e}</p>`:""}
            ${s!==null?r`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("share-part",vs);class $s extends p{static get properties(){return{partData:{type:Object}}}render(){const t=this.partData.t??null,e=this.partData.d??null,s=this.partData.info??null;return r`
            ${t!==null?r`<h3>${t}</h3>`:""}
            ${e!==null?r`<p>${e}</p>`:""}
            ${s!==null?r`<p>${s}</p>`:""}
        `}createRenderRoot(){return this}}customElements.define("watch-part",$s);class ae extends p{constructor(){super()}render(){return r`
            <div class="container">
                <div class="circle">
                    <div class="triangle"></div>
                </div>
            </div>
        `}}z(ae,"styles",ge`
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
    `);window.customElements.define("play-button",ae);class _s extends p{constructor(){super();z(this,"webShareSupported",!!window.navigator.share);z(this,"clipboardSupported",!!window.navigator.clipboard);this.shareFeedback="",this.copyFeedback=""}static get properties(){return{url:{type:String},title:{type:String},t:{type:Object},shareFeedback:{attribute:!1},copyFeedback:{attribute:!1}}}share(){navigator.share({title:this.title,url:this.url,text:title}).then(()=>{this.shareFeedback=this.t.share_feedback,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(e=>console.error("Error sharing",e))}copyLink(e){e.stopImmediatePropagation(),navigator.clipboard.writeText(this.url).then(()=>{this.copyFeedback=this.t.copy_feedback,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(s=>console.error(s))}noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported}render(){return r`
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
        `}createRenderRoot(){return this}}customElements.define("share-links",_s);class ys extends p{static get properties(){return{t:{type:Object},joinLink:{type:String},loading:{attribute:!1},posts:{attribute:!1}}}constructor(){super(),this.loading=!0,this.plans=[],this.getTrainings(),this.renderRow=this.renderRow.bind(this)}getTrainings(){makeRequest("POST","public_plans",{},"zume_system/v1").then(t=>{this.plans=t}).catch(t=>{console.log(t)}).always(()=>{this.loading=!1})}render(){return this.loading?r`<span class="loading-spinner active"></span>`:r`
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
        `}renderRow({join_key:t,language_note:e,post_title:s,time_of_day_note:a,timezone_note:o,...n}){const h=n.set_a_01?"a":"b",c=h==="a"?10:20,d=`set_${h}_`,f=Date.now()/1e3;let m="";for(let g=1;g<c+1;g++){const b=g<10?`0${g}`:`${g}`,v=n[d+b];if(m=v.timestamp,f<v.timestamp)break}const u=moment(m*1e3).format("MMM Do 'YY");return r`
            <tr>
                <td data-label="${this.t.name}">${s}</td>
                <td data-label="${this.t.next_date}">${u}</td>
                <td data-label="${this.t.start_time}">${a}</td>
                <td data-label="${this.t.timezone}">${o}</td>
                <td data-label="${this.t.language}">${e}</td>
                <td><button class="btn" data-code=${t} @click=${this._handleJoinTraining}>${this.t.join}</button></td>
            </tr>
        `}_handleJoinTraining(t){console.log(t);const e=t.target.dataset.code,s=new CustomEvent("chosen-training",{bubbles:!0,detail:{code:e}});this.dispatchEvent(s)}createRenderRoot(){return this}}customElements.define("public-trainings",ys);class ne extends p{static get properties(){return{radius:{type:Number},lineWidth:{type:Number},percent:{type:Number}}}constructor(){super(),this.radius=100,this.lineWidth=10,this.percent=30}width(){return this.radius*2+this.lineWidth}widthPx(){return this.appendPx(this.width())}center(){return this.width()/2}circumference(){return this.radius*2*Math.PI}circumferencePx(){return this.appendPx(this.circumference())}appendPx(t){return`${t}px`}rotate(t){return`rotate(${t}, ${this.center()}, ${this.center()})`}render(){return r`
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
        `}createRenderRoot(){return this}}customElements.define("progress-circle",ne);class ks extends ne{static get properties(){return{percent:{type:Number},type:{type:String}}}constructor(){super(),this.radius=50,this.lineWidth=15,this.percent=0,this.borderWidth=3,this.type="heard"}width(){return(this.radius+this.lineWidth)*2}getIconSvg(){switch(this.type){case"heard":return G`
                    <path d="M13.204,14.843c.157-3.465,2.622-6.151,6.05-6.593,3.602-.464,7.067,2.224,7.528,5.84.019.151.028.303.051.453.084.543.565.919,1.079.849.531-.073.901-.535.85-1.079-.09-.964-.299-1.902-.71-2.782-1.357-2.904-3.602-4.681-6.783-5.149-4.548-.67-8.841,2.255-9.775,6.729-.695,3.33-.03,6.397,2.327,8.963.781.85,1.668,1.601,2.472,2.43.534.551,1.049,1.131,1.495,1.754.496.692.669,1.505.631,2.364-.121,2.78,2.078,5.075,4.868,5.091,2.087.012,4.017-1.407,4.624-3.399.169-.553-.083-1.062-.614-1.24-.505-.169-1.018.085-1.21.625-.375,1.054-1.082,1.745-2.179,2.001-1.829.426-3.631-1.042-3.551-2.908.071-1.673-.427-3.158-1.526-4.394-.867-.975-1.835-1.861-2.774-2.772-1.174-1.139-2.156-2.394-2.584-4.011-.24-.909-.31-1.835-.271-2.771Z" stroke-width="0"></path>
                    <path d="M22.416,16.825c-1.639.344-2.761,1.916-2.613,3.472.179,1.88,1.39,3.263,3.162,3.601.237.045.486.086.722.059.502-.056.865-.512.837-.996-.029-.509-.412-.882-.953-.927-.921-.078-1.624-.699-1.795-1.587-.226-1.172.702-1.837,1.898-1.848.737-.007,1.224-.331,1.128-1.091-.055-.433-.488-1.081-2.385-.684Z" stroke-width="0"></path>
                `;case"obeyed":return G`
                    <path d="M21.57,18.138c-.204,1.02-.396,1.984-.589,2.948-.06.299-.116.599-.179.898-.012.057-.047.109-.087.195.117.163.256.361.4.556.397.536.795,1.072,1.194,1.606.743.993,1.239,2.082,1.465,3.316.261,1.422.608,2.829.922,4.241.183.825-.274,1.597-1.058,1.778-.783.18-1.554-.308-1.742-1.125-.279-1.212-.56-2.424-.804-3.643-.204-1.021-.594-1.958-1.176-2.812-.781-1.144-1.585-2.272-2.374-3.411-.254-.367-.481-.753-.74-1.117-.501-.703-.591-1.47-.421-2.296.247-1.201.478-2.406.716-3.609.003-.016.003-.033.006-.074-.05.04-.089.066-.123.097-.598.545-1.197,1.088-1.789,1.639-.062.057-.11.158-.115.242-.087,1.326-.165,2.653-.248,3.979-.041.641-.554,1.087-1.186,1.04-.6-.045-1.035-.574-.995-1.196.09-1.411.176-2.822.261-4.233.03-.498.222-.916.592-1.253,1.221-1.112,2.44-2.226,3.66-3.339.129-.118.246-.252.385-.356.381-.287.817-.384,1.283-.297.717.134,1.431.278,2.145.426.596.124,1.038.46,1.25,1.033.148.401.244.822.346,1.239.243.995.654,1.924,1.094,2.842.143.297.376.491.691.613.959.373,1.91.764,2.864,1.149.068.027.136.055.203.087.583.277.825.859.591,1.42-.224.536-.856.795-1.439.577-.392-.146-.777-.31-1.165-.465-.829-.332-1.655-.671-2.488-.994-.314-.122-.566-.312-.739-.594-.174-.284-.325-.582-.486-.874-.035-.063-.069-.126-.126-.232Z" stroke-width="0"></path>
                    <path d="M15.828,22.191c.259.402.497.772.735,1.142.48.747.962,1.492,1.437,2.242.041.065.066.158.057.233-.038.303-.09.604-.143.904-.098.559-.309,1.069-.618,1.547-.923,1.43-1.831,2.869-2.752,4.3-.552.858-1.767.912-2.364.114-.368-.492-.375-1.17-.015-1.736.694-1.093,1.366-2.201,2.093-3.272.688-1.014,1.054-2.129,1.231-3.324.098-.66.201-1.319.303-1.978.007-.044.018-.087.037-.174Z" stroke-width="0"></path>
                    <path d="M21.246,11.553c-1.455,0-2.629-1.176-2.629-2.635,0-1.455,1.178-2.631,2.634-2.631,1.456,0,2.636,1.174,2.64,2.628.004,1.46-1.176,2.637-2.645,2.638Z" stroke-width="0"></path>
                `;case"shared":return G`
                    <path d="M12.845,18.138c-.204,1.02-.396,1.984-.589,2.948-.06.299-.116.599-.179.898-.012.057-.047.109-.087.195.117.163.256.361.4.556.397.536.795,1.072,1.194,1.606.743.993,1.239,2.082,1.465,3.316.261,1.422.608,2.829.922,4.241.183.825-.274,1.597-1.058,1.778-.783.18-1.554-.308-1.742-1.125-.279-1.212-.56-2.424-.804-3.643-.204-1.021-.594-1.958-1.176-2.812-.781-1.144-1.585-2.272-2.374-3.411-.254-.367-.481-.753-.74-1.117-.501-.703-.591-1.47-.421-2.296.247-1.201.478-2.406.716-3.609.003-.016.003-.033.006-.074-.05.04-.089.066-.123.097-.598.545-1.197,1.088-1.789,1.639-.062.057-.11.158-.115.242-.087,1.326-.165,2.653-.248,3.979-.041.641-.554,1.087-1.186,1.04-.6-.045-1.035-.574-.995-1.196.09-1.411.176-2.822.261-4.233.03-.498.222-.916.592-1.253,1.221-1.112,2.44-2.226,3.66-3.339.129-.118.246-.252.385-.356.381-.287.817-.384,1.283-.297.717.134,1.431.278,2.145.426.596.124,1.038.46,1.25,1.033.148.401.244.822.346,1.239.243.995.654,1.924,1.094,2.842.143.297.376.491.691.613.959.373,1.91.764,2.864,1.149.068.027.136.055.203.087.583.277.825.859.591,1.42-.224.536-.856.795-1.439.577-.392-.146-.777-.31-1.165-.465-.829-.332-1.655-.671-2.488-.994-.314-.122-.566-.312-.739-.594-.174-.284-.325-.582-.486-.874-.035-.063-.069-.126-.126-.232Z" stroke-width="0"></path>
                    <path d="M7.102,22.191c.259.402.497.772.735,1.142.48.747.962,1.492,1.437,2.242.041.065.066.158.057.233-.038.303-.09.604-.143.904-.098.559-.309,1.069-.618,1.547-.923,1.43-1.831,2.869-2.752,4.3-.552.858-1.767.912-2.364.114-.368-.492-.375-1.17-.015-1.736.694-1.093,1.366-2.201,2.093-3.272.688-1.014,1.054-2.129,1.231-3.324.098-.66.201-1.319.303-1.978.007-.044.018-.087.037-.174Z" stroke-width="0"></path>
                    <path d="M12.521,11.553c-1.455,0-2.629-1.176-2.629-2.635,0-1.455,1.178-2.631,2.634-2.631,1.456,0,2.636,1.174,2.64,2.628.004,1.46-1.176,2.637-2.645,2.638Z" stroke-width="0"></path>
                    <path d="M27.155,18.138c.204,1.02.396,1.984.589,2.948.06.299.116.599.179.898.012.057.047.109.087.195-.117.163-.256.361-.4.556-.397.536-.795,1.072-1.194,1.606-.743.993-1.239,2.082-1.465,3.316-.261,1.422-.608,2.829-.922,4.241-.183.825.274,1.597,1.058,1.778.783.18,1.554-.308,1.742-1.125.279-1.212.56-2.424.804-3.643.204-1.021.594-1.958,1.176-2.812.781-1.144,1.585-2.272,2.374-3.411.254-.367.481-.753.74-1.117.501-.703.591-1.47.421-2.296-.247-1.201-.478-2.406-.716-3.609-.003-.016-.003-.033-.006-.074.05.04.089.066.123.097.598.545,1.197,1.088,1.789,1.639.062.057.11.158.115.242.087,1.326.165,2.653.248,3.979.041.641.554,1.087,1.186,1.04.6-.045,1.035-.574.995-1.196-.09-1.411-.176-2.822-.261-4.233-.03-.498-.222-.916-.592-1.253-1.221-1.112-2.44-2.226-3.66-3.339-.129-.118-.246-.252-.385-.356-.381-.287-.817-.384-1.283-.297-.717.134-1.431.278-2.145.426-.596.124-1.038.46-1.25,1.033-.148.401-.244.822-.346,1.239-.243.995-.654,1.924-1.094,2.842-.143.297-.376.491-.691.613-.959.373-1.91.764-2.864,1.149-.068.027-.136.055-.203.087-.583.277-.825.859-.591,1.42.224.536.856.795,1.439.577.392-.146.777-.31,1.165-.465.829-.332,1.655-.671,2.488-.994.314-.122.566-.312.739-.594.174-.284.325-.582.486-.874.035-.063.069-.126.126-.232Z" stroke-width="0"></path>
                    <path d="M32.898,22.191c-.259.402-.497.772-.735,1.142-.48.747-.962,1.492-1.437,2.242-.041.065-.066.158-.057.233.038.303.09.604.143.904.098.559.309,1.069.618,1.547.923,1.43,1.831,2.869,2.752,4.3.552.858,1.767.912,2.364.114.368-.492.375-1.17.015-1.736-.694-1.093-1.366-2.201-2.093-3.272-.688-1.014-1.054-2.129-1.231-3.324-.098-.66-.201-1.319-.303-1.978-.007-.044-.018-.087-.037-.174Z" stroke-width="0"></path>
                    <path d="M27.479,11.553c1.455,0,2.629-1.176,2.629-2.635,0-1.455-1.178-2.631-2.634-2.631-1.456,0-2.636,1.174-2.64,2.628-.004,1.46,1.176,2.637,2.645,2.638Z" stroke-width="0"></path>
                `;case"trained":return G`
                    <path d="M21.796,16.477c-.172.859-.334,1.671-.496,2.484-.05.252-.098.505-.151.757-.01.048-.04.091-.073.164.099.137.216.304.337.468.334.452.67.903,1.006,1.354.626.837,1.044,1.754,1.235,2.794.22,1.198.513,2.383.777,3.574.154.695-.231,1.346-.892,1.498-.659.152-1.31-.259-1.468-.948-.235-1.021-.472-2.042-.677-3.069-.172-.86-.5-1.649-.991-2.369-.658-.964-1.335-1.915-2-2.874-.214-.309-.405-.635-.624-.941-.422-.592-.498-1.238-.355-1.934.208-1.012.403-2.027.603-3.041.003-.014.003-.028.005-.063-.043.033-.075.056-.103.082-.504.459-1.009.917-1.508,1.381-.052.048-.092.133-.097.204-.074,1.117-.139,2.235-.209,3.353-.034.54-.467.916-.999.876-.506-.038-.872-.483-.838-1.008.076-1.189.148-2.378.22-3.567.025-.42.187-.772.499-1.056,1.029-.937,2.056-1.875,3.084-2.814.109-.099.207-.212.325-.3.321-.242.688-.324,1.081-.25.604.113,1.206.234,1.808.359.502.104.874.388,1.053.871.125.338.206.693.291,1.044.205.838.551,1.621.922,2.395.12.25.317.414.582.517.808.314,1.609.644,2.413.968.057.023.115.047.171.073.491.233.695.724.498,1.196-.188.452-.722.669-1.213.486-.33-.123-.655-.261-.982-.392-.698-.28-1.395-.565-2.096-.837-.265-.103-.477-.263-.623-.501-.147-.239-.274-.49-.409-.736-.029-.053-.058-.106-.107-.195Z" stroke-width="0"></path>
                    <path d="M16.958,19.892c.218.339.419.65.619.962.404.629.81,1.258,1.211,1.889.035.055.056.133.048.196-.032.255-.076.509-.12.762-.083.471-.261.901-.521,1.304-.778,1.205-1.543,2.417-2.319,3.623-.465.723-1.489.769-1.992.096-.31-.414-.316-.986-.013-1.462.585-.921,1.151-1.855,1.763-2.757.579-.854.888-1.794,1.037-2.8.082-.556.169-1.111.255-1.667.006-.037.016-.073.031-.147Z" stroke-width="0"></path>
                    <path d="M21.524,10.929c-1.226,0-2.215-.991-2.215-2.22,0-1.226.992-2.217,2.219-2.217,1.227,0,2.221.99,2.224,2.215.003,1.23-.991,2.222-2.229,2.222Z" stroke-width="0"></path>
                    <path d="M10.472,22.851c-.139.698-.271,1.357-.403,2.017-.041.205-.079.41-.122.614-.008.039-.032.074-.059.133.08.112.175.247.274.38.272.367.544.734.817,1.099.508.68.848,1.425,1.003,2.269.178.973.416,1.936.631,2.902.125.564-.187,1.093-.724,1.216-.536.123-1.063-.211-1.192-.77-.191-.829-.383-1.658-.55-2.492-.14-.699-.406-1.34-.805-1.924-.534-.783-1.084-1.555-1.624-2.334-.174-.251-.329-.515-.506-.764-.343-.481-.404-1.006-.288-1.571.169-.822.327-1.646.49-2.47.002-.011.002-.023.004-.051-.035.027-.061.045-.084.066-.409.373-.819.744-1.224,1.121-.042.039-.075.108-.079.166-.06.907-.113,1.815-.17,2.723-.028.439-.379.744-.812.711-.411-.031-.708-.393-.681-.818.062-.965.12-1.931.178-2.897.02-.341.152-.627.405-.857.835-.761,1.67-1.523,2.504-2.285.088-.081.168-.172.264-.244.261-.197.559-.263.878-.203.49.092.979.19,1.468.291.408.085.71.315.855.707.102.274.167.563.237.848.167.681.447,1.317.749,1.945.098.203.257.336.472.42.656.255,1.307.523,1.959.786.047.019.093.038.139.059.399.189.565.588.404.971-.153.367-.586.544-.985.395-.268-.1-.532-.212-.797-.318-.567-.227-1.133-.459-1.702-.68-.215-.084-.387-.214-.506-.407-.119-.194-.222-.398-.332-.598-.024-.043-.047-.086-.087-.159Z" stroke-width="0"></path>
                    <path d="M6.543,25.624c.177.275.34.528.503.782.328.511.658,1.021.983,1.534.028.044.045.108.039.159-.026.207-.062.413-.098.619-.067.382-.212.732-.423,1.059-.631.978-1.253,1.963-1.883,2.942-.378.587-1.209.624-1.618.078-.252-.336-.257-.8-.011-1.188.475-.748.935-1.506,1.432-2.239.471-.694.721-1.457.843-2.274.067-.451.138-.902.207-1.353.005-.03.013-.06.025-.119Z" stroke-width="0"></path>
                    <path d="M10.251,18.345c-.996,0-1.799-.804-1.799-1.803,0-.995.806-1.8,1.802-1.801.996,0,1.804.804,1.806,1.798.003.999-.805,1.804-1.81,1.805Z" stroke-width="0"></path>
                    <path d="M31.677,22.851c-.139.698-.271,1.357-.403,2.017-.041.205-.079.41-.122.614-.008.039-.032.074-.059.133.08.112.175.247.274.38.272.367.544.734.817,1.099.508.68.848,1.425,1.003,2.269.178.973.416,1.936.631,2.902.125.564-.187,1.093-.724,1.216-.536.123-1.063-.211-1.192-.77-.191-.829-.383-1.658-.55-2.492-.14-.699-.406-1.34-.805-1.924-.534-.783-1.084-1.555-1.624-2.334-.174-.251-.329-.515-.506-.764-.343-.481-.404-1.006-.288-1.571.169-.822.327-1.646.49-2.47.002-.011.002-.023.004-.051-.035.027-.061.045-.084.066-.409.373-.819.744-1.224,1.121-.042.039-.075.108-.079.166-.06.907-.113,1.815-.17,2.723-.028.439-.379.744-.812.711-.411-.031-.708-.393-.681-.818.062-.965.12-1.931.178-2.897.02-.341.152-.627.405-.857.835-.761,1.67-1.523,2.504-2.285.088-.081.168-.172.264-.244.261-.197.559-.263.878-.203.49.092.979.19,1.468.291.408.085.71.315.855.707.102.274.167.563.237.848.167.681.447,1.317.749,1.945.098.203.257.336.472.42.656.255,1.307.523,1.959.786.047.019.093.038.139.059.399.189.565.588.404.971-.153.367-.586.544-.985.395-.268-.1-.532-.212-.797-.318-.567-.227-1.133-.459-1.702-.68-.215-.084-.387-.214-.506-.407-.119-.194-.222-.398-.332-.598-.024-.043-.047-.086-.087-.159Z" stroke-width="0"></path>
                    <path d="M27.747,25.624c.177.275.34.528.503.782.328.511.658,1.021.983,1.534.028.044.045.108.039.159-.026.207-.062.413-.098.619-.067.382-.212.732-.423,1.059-.631.978-1.253,1.963-1.883,2.942-.378.587-1.209.624-1.618.078-.252-.336-.257-.8-.011-1.188.475-.748.935-1.506,1.432-2.239.471-.694.721-1.457.843-2.274.067-.451.138-.902.207-1.353.005-.03.013-.06.025-.119Z" stroke-width="0"></path>
                    <path d="M31.455,18.345c-.996,0-1.799-.804-1.799-1.803,0-.995.806-1.8,1.802-1.801.996,0,1.804.804,1.806,1.798.003.999-.805,1.804-1.81,1.805Z" stroke-width="0"></path>
                `}}iconSize(){return this.width()/2}iconPosition(){const t=(this.width()-this.iconSize())/2;return[t,t]}render(){const t=this.iconSize(),[e,s]=this.iconPosition();return r`
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
                        width=${t}
                        height=${t}
                        x=${e}
                        y=${s}
                        viewBox="0 0 40 40"
                    >
                        ${this.getIconSvg()}
                    </svg>
                </svg>
            </div>
        `}createRenderRoot(){return this}}customElements.define("host-progress-circle",ks);
//# sourceMappingURL=main-81289c7d.js.map
