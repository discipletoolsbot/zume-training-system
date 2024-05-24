var Qn=Object.defineProperty;var Xn=(i,e,t)=>e in i?Qn(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var C=(i,e,t)=>(Xn(i,typeof e!="symbol"?e+"":e,t),t),At=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)};var R=(i,e,t)=>(At(i,e,"read from private field"),t?t.call(i):e.get(i)),U=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},ie=(i,e,t,s)=>(At(i,e,"write to private field"),s?s.call(i,t):e.set(i,t),t);var W=(i,e,t)=>(At(i,e,"access private method"),t);class ea{constructor(e,t,s){this.root=e,this.base=t,this.nonce=s}fetch(e,t,s={}){let n=this.base;!this.base.endsWith("/")&&!t.startsWith("/")&&(n+="/");let a=`${this.root}${n}${t}`;if(e==="GET"&&Object.keys(s).length>0){const r=new URLSearchParams(s);a+="?"+r.toString()}return fetch(a,{method:e,headers:{"Content-Type":"application/json; charset=utf-8","X-WP-Nonce":this.nonce},body:e==="GET"?null:JSON.stringify(s)}).then(r=>{if(!r.ok)throw new Error(`Request rejected with status ${r.status}`);return r}).then(r=>r.json())}get(e,t={}){return this.fetch("GET",e,t)}post(e,t={}){return this.fetch("POST",e,t)}put(e,t={}){return this.fetch("PUT",e,t)}update(e,t={}){return this.fetch("UPDATE",e,t)}delete(e,t={}){return this.fetch("DELETE",e,t)}}const Nt=new ea(window.wpApiShare.root,"zume_system/v1",window.wpApiShare.nonce);var Qt;let ta=(Qt=class{static save(e,t){localStorage.setItem(this.createKey(e),JSON.stringify(t))}static load(e){const t=localStorage.getItem(this.createKey(e));try{return JSON.parse(t)}catch{return t}}static createKey(e){return this.prefix+e}},C(Qt,"prefix","Z5_"),Qt);window.ZumeStorage=ta;var P,kt,wi,Je,Xt,_t,$i,Ke,es,St,ki,Qe,ts;class cs{constructor(e){U(this,kt);U(this,Je);U(this,_t);U(this,Ke);U(this,St);U(this,Qe);C(this,"WIZARD_STATE_NAME","zume_wizard_state");C(this,"STALE_LIFESPAN",10*60*1e3);C(this,"MAX_LIFESPAN",60*60*1e3);U(this,P,void 0);C(this,"moduleName");this.moduleName=e,ie(this,P,W(this,kt,wi).call(this))}isEmpty(){return Object.keys(R(this,P).data).length===0}isDataStale(){return W(this,Qe,ts).call(this,R(this,P),this.STALE_LIFESPAN)}has(e){return Object.prototype.hasOwnProperty.call(R(this,P).data,e)}get(e){return R(this,P).data[e]}getAll(){return R(this,P).data}add(e,t){R(this,P).data[e]=t,W(this,Ke,es).call(this)}remove(e){delete R(this,P).data[e],W(this,Ke,es).call(this)}clear(){ie(this,P,W(this,Je,Xt).call(this)),localStorage.removeItem(this.WIZARD_STATE_NAME)}}P=new WeakMap,kt=new WeakSet,wi=function(){const e=W(this,_t,$i).call(this);return e&&!W(this,Qe,ts).call(this,e,this.MAX_LIFESPAN)&&e.module===this.moduleName?e:W(this,Je,Xt).call(this)},Je=new WeakSet,Xt=function(){return{module:this.moduleName,data:{},timestamp:Date.now()}},_t=new WeakSet,$i=function(){return JSON.parse(localStorage.getItem(this.WIZARD_STATE_NAME))},Ke=new WeakSet,es=function(){W(this,St,ki).call(this),localStorage.setItem(this.WIZARD_STATE_NAME,JSON.stringify(R(this,P)))},St=new WeakSet,ki=function(){R(this,P).timestamp=Date.now()},Qe=new WeakSet,ts=function(e,t){return Date.now()-e.timestamp>t};const w={gettingStarted:"getting-started",makeAGroup:"make-a-group",makeFirstGroup:"make-first-group",makeMoreGroups:"make-more-groups",getACoach:"get-a-coach",joinATraining:"join-a-training",connectWithFriend:"connect-with-friend",joinFriendsPlan:"join-friends-training",checkin:"checkin",setProfile:"set-profile",joinCommunity:"join-the-community",inviteFriends:"invite"},z={completeProfile:"completeProfile",makePlan:"makePlan",inviteFriends:"inviteFriends",getACoach:"getACoach",joinTraining:"joinTraining",connectFriend:"connectFriend",joinFriendsTraining:"joinFriendsTraining",checkin:"checkin",planDecision:"planDecision",joinCommunity:"joinCommunity"},sa={planDecision:"plan-decision",howManySessions:"how-many-sessions",scheduleDecision:"schedule-decision",howOften:"how-often",startDate:"what-start-date",location:"what-location",review:"review-steps",name:"group-name"},h={updateName:"update-your-name",updateLocation:"update-your-location",updatePhone:"update-your-phone",inviteFriends:"invite-friends",contactPreferences:"contact-preferences",languagePreferences:"preferred-language",howCanWeServe:"how-can-we-serve",connectingToCoach:"connecting-to-coach",joinTraining:"join-training",connectToFriend:"connect-friend",joinFriendsPlan:"join-training",checkinSubmit:"checkin-submit",joinCommunity:"join-community",...sa},ia={[h.updateName]:{field:"name",testExistance:(i,e)=>e.has_set_name},[h.updateLocation]:{field:"location",testExistance:i=>!(i.source&&i.source==="ip")},[h.updatePhone]:{field:"phone",testExistance:i=>!!i}},na={[w.gettingStarted]:{[z.completeProfile]:A([h.updateName,h.updateLocation],!1),[z.planDecision]:A([h.planDecision],!1)},[w.setProfile]:{[z.completeProfile]:A([h.updateName,h.updateLocation],!0)},[w.makeFirstGroup]:{[z.makePlan]:A([h.howManySessions,h.scheduleDecision,h.howOften,h.startDate,h.location,h.review],!0)},[w.makeMoreGroups]:{[z.makePlan]:A([h.howManySessions,h.scheduleDecision,h.howOften,h.startDate,h.location,h.name,h.review],!0)},[w.inviteFriends]:{[z.inviteFriends]:A([h.inviteFriends],!0)},[w.getACoach]:{[z.completeProfile]:A([h.updateName,h.updateLocation,h.updatePhone]),[z.getACoach]:A([h.contactPreferences,h.languagePreferences,h.howCanWeServe,h.connectingToCoach],!0)},[w.joinATraining]:{[z.completeProfile]:A([h.updateName,h.updateLocation,h.updatePhone]),[z.joinTraining]:A([h.joinTraining],!0)},[w.connectWithFriend]:{[z.completeProfile]:A([h.updateName,h.updateLocation],!0),[z.connectFriend]:A([h.connectToFriend])},[w.joinFriendsPlan]:{[z.completeProfile]:A([h.updateName,h.updateLocation],!0),[z.joinFriendsTraining]:A([h.joinFriendsPlan])},[w.joinCommunity]:{[z.joinCommunity]:A([h.joinCommunity],!0)},[w.checkin]:{[z.checkin]:A([h.checkinSubmit],!0)}};function A(i=[],e=!1){const t={steps:[],skippable:e};return i.forEach(s=>{Object.values(h).includes(s)&&t.steps.push(s)}),t}var ce,be,Ot,_i,jt,Si,Et,Oi;class aa{constructor(e){U(this,Ot);U(this,jt);U(this,Et);U(this,ce,void 0);U(this,be,void 0);C(this,"profile");ie(this,ce,{}),ie(this,be,[]),this.profile=e}reset(){ie(this,ce,{})}isTypeValid(e){return!!Object.values(w).includes(e)}isLoaded(){return Object.keys(R(this,ce)).length!==0}getSteps(e){return W(this,jt,Si).call(this,e),R(this,be)}}ce=new WeakMap,be=new WeakMap,Ot=new WeakSet,_i=function(e){return this.isTypeValid(e)?na[e]:{}},jt=new WeakSet,Si=function(e){const t=W(this,Ot,_i).call(this,e);Object.keys(t).length!==0&&W(this,Et,Oi).call(this,t)},Et=new WeakSet,Oi=function(e){ie(this,ce,e),ie(this,be,[]),Object.entries(R(this,ce)).forEach(([t,{steps:s,skippable:n}])=>{s.forEach(a=>{const r=ia[a];let o=null;if(r&&this.profile){if(r.testExistance(this.profile[r.field],this.profile))return;o=this.profile[r.field]}const l={slug:a,module:t,skippable:n};o!==null&&(l.value=o),R(this,be).push(l)})})};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ut=window,ds=ut.ShadowRoot&&(ut.ShadyCSS===void 0||ut.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,hs=Symbol(),Os=new WeakMap;let ji=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==hs)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(ds&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=Os.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&Os.set(t,e))}return e}toString(){return this.cssText}};const ra=i=>new ji(typeof i=="string"?i:i+"",void 0,hs),us=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((s,n,a)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[a+1],i[0]);return new ji(t,i,hs)},oa=(i,e)=>{ds?i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const s=document.createElement("style"),n=ut.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=t.cssText,i.appendChild(s)})},js=ds?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return ra(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Lt;const ft=window,Es=ft.trustedTypes,la=Es?Es.emptyScript:"",Cs=ft.reactiveElementPolyfillSupport,ss={toAttribute(i,e){switch(e){case Boolean:i=i?la:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},Ei=(i,e)=>e!==i&&(e==e||i==i),Rt={attribute:!0,type:String,converter:ss,reflect:!1,hasChanged:Ei};let Se=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,s)=>{const n=this._$Ep(s,t);n!==void 0&&(this._$Ev.set(n,s),e.push(n))}),e}static createProperty(e,t=Rt){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const s=typeof e=="symbol"?Symbol():"__"+e,n=this.getPropertyDescriptor(e,s,t);n!==void 0&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(n){const a=this[e];this[t]=n,this.requestUpdate(e,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Rt}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,s=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const n of s)this.createProperty(n,t[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const n of s)t.unshift(js(n))}else e!==void 0&&t.push(js(e));return t}static _$Ep(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,s;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((s=e.hostConnected)===null||s===void 0||s.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return oa(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var s;return(s=t.hostConnected)===null||s===void 0?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var s;return(s=t.hostDisconnected)===null||s===void 0?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$EO(e,t,s=Rt){var n;const a=this.constructor._$Ep(e,s);if(a!==void 0&&s.reflect===!0){const r=(((n=s.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?s.converter:ss).toAttribute(t,s.type);this._$El=e,r==null?this.removeAttribute(a):this.setAttribute(a,r),this._$El=null}}_$AK(e,t){var s;const n=this.constructor,a=n._$Ev.get(e);if(a!==void 0&&this._$El!==a){const r=n.getPropertyOptions(a),o=typeof r.converter=="function"?{fromAttribute:r.converter}:((s=r.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?r.converter:ss;this._$El=a,this[a]=o.fromAttribute(t,r.type),this._$El=null}}requestUpdate(e,t,s){let n=!0;e!==void 0&&(((s=s||this.constructor.getPropertyOptions(e)).hasChanged||Ei)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),s.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,s))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((n,a)=>this[a]=n),this._$Ei=void 0);let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),(e=this._$ES)===null||e===void 0||e.forEach(n=>{var a;return(a=n.hostUpdate)===null||a===void 0?void 0:a.call(n)}),this.update(s)):this._$Ek()}catch(n){throw t=!1,this._$Ek(),n}t&&this._$AE(s)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(s=>{var n;return(n=s.hostUpdated)===null||n===void 0?void 0:n.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,s)=>this._$EO(s,this[s],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};Se.finalized=!0,Se.elementProperties=new Map,Se.elementStyles=[],Se.shadowRootOptions={mode:"open"},Cs==null||Cs({ReactiveElement:Se}),((Lt=ft.reactiveElementVersions)!==null&&Lt!==void 0?Lt:ft.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Pt;const gt=window,Te=gt.trustedTypes,xs=Te?Te.createPolicy("lit-html",{createHTML:i=>i}):void 0,vt="$lit$",X=`lit$${(Math.random()+"").slice(9)}$`,ps="?"+X,ca=`<${ps}>`,Me=document,Ze=()=>Me.createComment(""),Be=i=>i===null||typeof i!="object"&&typeof i!="function",Ci=Array.isArray,xi=i=>Ci(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",Ft=`[ 	
\f\r]`,Pe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ts=/-->/g,Ms=/>/g,he=RegExp(`>|${Ft}(?:([^\\s"'>=/]+)(${Ft}*=${Ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Is=/'/g,Ds=/"/g,Ti=/^(?:script|style|textarea|title)$/i,Mi=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),c=Mi(1),nt=Mi(2),Y=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),zs=new WeakMap,Ee=Me.createTreeWalker(Me,129,null,!1),Ii=(i,e)=>{const t=i.length-1,s=[];let n,a=e===2?"<svg>":"",r=Pe;for(let l=0;l<t;l++){const d=i[l];let u,p,g=-1,m=0;for(;m<d.length&&(r.lastIndex=m,p=r.exec(d),p!==null);)m=r.lastIndex,r===Pe?p[1]==="!--"?r=Ts:p[1]!==void 0?r=Ms:p[2]!==void 0?(Ti.test(p[2])&&(n=RegExp("</"+p[2],"g")),r=he):p[3]!==void 0&&(r=he):r===he?p[0]===">"?(r=n??Pe,g=-1):p[1]===void 0?g=-2:(g=r.lastIndex-p[2].length,u=p[1],r=p[3]===void 0?he:p[3]==='"'?Ds:Is):r===Ds||r===Is?r=he:r===Ts||r===Ms?r=Pe:(r=he,n=void 0);const b=r===he&&i[l+1].startsWith("/>")?" ":"";a+=r===Pe?d+ca:g>=0?(s.push(u),d.slice(0,g)+vt+d.slice(g)+X+b):d+X+(g===-2?(s.push(void 0),l):b)}const o=a+(i[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return[xs!==void 0?xs.createHTML(o):o,s]};class Ge{constructor({strings:e,_$litType$:t},s){let n;this.parts=[];let a=0,r=0;const o=e.length-1,l=this.parts,[d,u]=Ii(e,t);if(this.el=Ge.createElement(d,s),Ee.currentNode=this.el.content,t===2){const p=this.el.content,g=p.firstChild;g.remove(),p.append(...g.childNodes)}for(;(n=Ee.nextNode())!==null&&l.length<o;){if(n.nodeType===1){if(n.hasAttributes()){const p=[];for(const g of n.getAttributeNames())if(g.endsWith(vt)||g.startsWith(X)){const m=u[r++];if(p.push(g),m!==void 0){const b=n.getAttribute(m.toLowerCase()+vt).split(X),O=/([.?@])?(.*)/.exec(m);l.push({type:1,index:a,name:O[2],strings:b,ctor:O[1]==="."?zi:O[1]==="?"?Ai:O[1]==="@"?Ni:Xe})}else l.push({type:6,index:a})}for(const g of p)n.removeAttribute(g)}if(Ti.test(n.tagName)){const p=n.textContent.split(X),g=p.length-1;if(g>0){n.textContent=Te?Te.emptyScript:"";for(let m=0;m<g;m++)n.append(p[m],Ze()),Ee.nextNode(),l.push({type:2,index:++a});n.append(p[g],Ze())}}}else if(n.nodeType===8)if(n.data===ps)l.push({type:2,index:a});else{let p=-1;for(;(p=n.data.indexOf(X,p+1))!==-1;)l.push({type:7,index:a}),p+=X.length-1}a++}}static createElement(e,t){const s=Me.createElement("template");return s.innerHTML=e,s}}function we(i,e,t=i,s){var n,a,r,o;if(e===Y)return e;let l=s!==void 0?(n=t._$Co)===null||n===void 0?void 0:n[s]:t._$Cl;const d=Be(e)?void 0:e._$litDirective$;return(l==null?void 0:l.constructor)!==d&&((a=l==null?void 0:l._$AO)===null||a===void 0||a.call(l,!1),d===void 0?l=void 0:(l=new d(i),l._$AT(i,t,s)),s!==void 0?((r=(o=t)._$Co)!==null&&r!==void 0?r:o._$Co=[])[s]=l:t._$Cl=l),l!==void 0&&(e=we(i,l._$AS(i,e.values),l,s)),e}class Di{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:s},parts:n}=this._$AD,a=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:Me).importNode(s,!0);Ee.currentNode=a;let r=Ee.nextNode(),o=0,l=0,d=n[0];for(;d!==void 0;){if(o===d.index){let u;d.type===2?u=new De(r,r.nextSibling,this,e):d.type===1?u=new d.ctor(r,d.name,d.strings,this,e):d.type===6&&(u=new Li(r,this,e)),this._$AV.push(u),d=n[++l]}o!==(d==null?void 0:d.index)&&(r=Ee.nextNode(),o++)}return a}v(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class De{constructor(e,t,s,n){var a;this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=n,this._$Cp=(a=n==null?void 0:n.isConnected)===null||a===void 0||a}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=we(this,e,t),Be(e)?e===I||e==null||e===""?(this._$AH!==I&&this._$AR(),this._$AH=I):e!==this._$AH&&e!==Y&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):xi(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==I&&Be(this._$AH)?this._$AA.nextSibling.data=e:this.$(Me.createTextNode(e)),this._$AH=e}g(e){var t;const{values:s,_$litType$:n}=e,a=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Ge.createElement(n.h,this.options)),n);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===a)this._$AH.v(s);else{const r=new Di(a,this),o=r.u(this.options);r.v(s),this.$(o),this._$AH=r}}_$AC(e){let t=zs.get(e.strings);return t===void 0&&zs.set(e.strings,t=new Ge(e)),t}T(e){Ci(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,n=0;for(const a of e)n===t.length?t.push(s=new De(this.k(Ze()),this.k(Ze()),this,this.options)):s=t[n],s._$AI(a),n++;n<t.length&&(this._$AR(s&&s._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,t);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class Xe{constructor(e,t,s,n,a){this.type=1,this._$AH=I,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=a,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=I}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,s,n){const a=this.strings;let r=!1;if(a===void 0)e=we(this,e,t,0),r=!Be(e)||e!==this._$AH&&e!==Y,r&&(this._$AH=e);else{const o=e;let l,d;for(e=a[0],l=0;l<a.length-1;l++)d=we(this,o[s+l],t,l),d===Y&&(d=this._$AH[l]),r||(r=!Be(d)||d!==this._$AH[l]),d===I?e=I:e!==I&&(e+=(d??"")+a[l+1]),this._$AH[l]=d}r&&!n&&this.j(e)}j(e){e===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class zi extends Xe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===I?void 0:e}}const da=Te?Te.emptyScript:"";class Ai extends Xe{constructor(){super(...arguments),this.type=4}j(e){e&&e!==I?this.element.setAttribute(this.name,da):this.element.removeAttribute(this.name)}}class Ni extends Xe{constructor(e,t,s,n,a){super(e,t,s,n,a),this.type=5}_$AI(e,t=this){var s;if((e=(s=we(this,e,t,0))!==null&&s!==void 0?s:I)===Y)return;const n=this._$AH,a=e===I&&n!==I||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==I&&(n===I||a);a&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,s;typeof this._$AH=="function"?this._$AH.call((s=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&s!==void 0?s:this.element,e):this._$AH.handleEvent(e)}}class Li{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){we(this,e)}}const ha={O:vt,P:X,A:ps,C:1,M:Ii,L:Di,D:xi,R:we,I:De,V:Xe,H:Ai,N:Ni,U:zi,F:Li},As=gt.litHtmlPolyfillSupport;As==null||As(Ge,De),((Pt=gt.litHtmlVersions)!==null&&Pt!==void 0?Pt:gt.litHtmlVersions=[]).push("2.7.3");const ua=(i,e,t)=>{var s,n;const a=(s=t==null?void 0:t.renderBefore)!==null&&s!==void 0?s:e;let r=a._$litPart$;if(r===void 0){const o=(n=t==null?void 0:t.renderBefore)!==null&&n!==void 0?n:null;a._$litPart$=r=new De(e.insertBefore(Ze(),o),o,void 0,t??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ut,Wt;let $=class extends Se{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const s=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=s.firstChild),s}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ua(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return Y}};$.finalized=!0,$._$litElement$=!0,(Ut=globalThis.litElementHydrateSupport)===null||Ut===void 0||Ut.call(globalThis,{LitElement:$});const Ns=globalThis.litElementPolyfillSupport;Ns==null||Ns({LitElement:$});((Wt=globalThis.litElementVersions)!==null&&Wt!==void 0?Wt:globalThis.litElementVersions=[]).push("3.3.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fe={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ri=i=>(...e)=>({_$litDirective$:i,values:e});let Pi=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:pa}=ha,ma=i=>i.strings===void 0,Ls=()=>document.createComment(""),Fe=(i,e,t)=>{var s;const n=i._$AA.parentNode,a=e===void 0?i._$AB:e._$AA;if(t===void 0){const r=n.insertBefore(Ls(),a),o=n.insertBefore(Ls(),a);t=new pa(r,o,i,i.options)}else{const r=t._$AB.nextSibling,o=t._$AM,l=o!==i;if(l){let d;(s=t._$AQ)===null||s===void 0||s.call(t,i),t._$AM=i,t._$AP!==void 0&&(d=i._$AU)!==o._$AU&&t._$AP(d)}if(r!==a||l){let d=t._$AA;for(;d!==r;){const u=d.nextSibling;n.insertBefore(d,a),d=u}}}return t},ue=(i,e,t=i)=>(i._$AI(e,t),i),fa={},Fi=(i,e=fa)=>i._$AH=e,ga=i=>i._$AH,qt=i=>{var e;(e=i._$AP)===null||e===void 0||e.call(i,!1,!0);let t=i._$AA;const s=i._$AB.nextSibling;for(;t!==s;){const n=t.nextSibling;t.remove(),t=n}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const va=Ri(class extends Pi{constructor(i){if(super(i),i.type!==fe.PROPERTY&&i.type!==fe.ATTRIBUTE&&i.type!==fe.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ma(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[e]){if(e===Y||e===I)return e;const t=i.element,s=i.name;if(i.type===fe.PROPERTY){if(e===t[s])return Y}else if(i.type===fe.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(s))return Y}else if(i.type===fe.ATTRIBUTE&&t.getAttribute(s)===e+"")return Y;return Fi(i),e}});class ba extends ${static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},value:{type:String},locations:{attribute:!1},locationError:{attribute:!1},phoneError:{attribute:!1},city:{attribute:!1},loading:{attribute:!1},state:{attribute:!1},localValue:{attribute:!1},isInfoOpen:{type:Boolean,attribute:!1},infoText:{type:String,attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.locations=[],this.locationError="",this.city="",this.loading=!1,this.localValue="",this.phoneError="",this.isInfoOpen=!1,this.infoText="",this._clearLocations=this._clearLocations.bind(this),this._handleSuggestions=this._handleSuggestions.bind(this),this._debounceCityChange=debounce(getAddressSuggestions(this._handleSuggestions,jsObject.map_key)).bind(this),this._handleCityInputChange=this._handleCityInputChange.bind(this)}updated(e){e.has("variant")&&(this.renderRoot.querySelector(".inputs input").focus(),this.isInfoOpen=!1)}willUpdate(e){e.has("value")&&this.value!==""&&(this.localValue=JSON.parse(this.value))}render(){var e;return c`
        <form class="inputs stack" @submit=${this._handleSubmit}>
            ${this.variant===h.updateName?c`
                <h2>${this.t.name_question}</h2>
                <div class="d-flex align-items-center">
                    <label for="name" class="visually-hidden">${this.t.name}</label>
                    <input class="input" type="text" id="name" name="name" value=${this.localValue} ?required=${!this.skippable} placeholder=${this.t.name}>
                    <button type="button" class="icon-btn f-1" @click=${()=>this._toggleInfo("name")}>
                        <span class="icon z-icon-info brand-light"></span>
                    </button>
                </div>
            `:""}

            ${this.variant===h.updatePhone?c`
                <h2>${this.t.phone_question}</h2>
                <div class="d-flex align-items-center">
                    <label for="phone" class="visually-hidden">${this.t.phone}</label>
                    <input
                        class="input"
                        type="tel"
                        id="phone"
                        name="phone"
                        pattern="\\(?\\+?[\\(\\)\\-\\s0-9]*"
                        value=""
                        placeholder=${this.t.phone}
                        ?required=${!this.skippable}
                        @input=${this._handleInput}
                        @invalid=${this._handleInvalid}
                    >
                    <button type="button" class="icon-btn f-1" @click=${()=>this._toggleInfo("phone")}>
                        <span class="icon z-icon-info brand-light"></span>
                    </button>
                    <div class="input-error" data-state="${this.phoneError.length?"":"empty"}" >${this.phoneError}</div>
                </div>
            `:""}

            ${this.variant===h.updateLocation?c`
                <h2>${this.t.location_question}</h2>
                <div class="form-group stack--4">
                    <div class="d-flex align-items-center">
                        <label class="input-label visually-hidden" for="city">${this.t.city}</label>
                        <input
                            class="input"
                            type="text"
                            id="city"
                            name="city"
                            placeholder=${this.t.city}
                            .value="${this.city?va(this.city):(e=this.localValue)==null?void 0:e.label}"
                            @input=${this._handleCityChange}
                        >
                        <button type="button" class="icon-btn f-1" @click=${()=>this._toggleInfo("location")}>
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                    </div>
                    <span class="loading-spinner ${this.loading?"active":""}"></span>
                    <p class="input-subtext">${this.t.approximate_location}</p>
                </div>
                <div id="address_results">
                    ${this.locationError}
                    ${this.locations.map(t=>c`
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
            <div class="info-area collapse" data-state=${this.isInfoOpen?"open":"closed"}>
                <div class="card mw-50ch mx-auto">
                    <p>${this.infoText}</p>
                    <a class="f--1 gray-500" href=${jsObject.privacy_url+"#personal-information"} target="_blank">${this.t.privacy_page}</a>
                </div>
            </div>
            <div class="cluster | mx-auto">
                <button type="submit" class="btn tight light" ?disabled=${this.loading}>${this.t.next}</button>
                ${[h.updatePhone,h.updateName].includes(this.variant)?c`
                    <span class="loading-spinner ${this.loading?"active":""}"></span>
                `:""}
            </div>
        </form>

        `}_handleInput(e){this.phoneError=""}_handleInvalid(e){e.preventDefault(),this.phoneError=this.t.phone_error}_handleSubmit(e){e.preventDefault(),e.srcElement.querySelector("#city")?this._handleSubmitLocation():this._handleDone(e)}_handleDone(e){e&&e.preventDefault();const t=e.target[0];if(t.type==="submit")return;let{name:s,value:n}=t;t.type==="tel"&&(n=t.value.replace(/[\(\)\-\s]/g,"")),this._updateProfile(s,n,()=>{this._sendDoneStepEvent()})}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleCityChange(e){this._handleCityInputChange(e),this._debounceCityChange(e)}_handleCityInputChange(e){this.city=e.target.value}_handleSuggestions(e){e.features.length<1&&(this.locationError=this.t.no_locations_found),this.locations=e.features}_handleLocationSelection(e){this.city=e.target.dataset.placeName;const t=getLocationGridFromMapbox(e.target.id,jsObject.profile.location);this.localValue=t,this._clearLocations()}_handleSubmitLocation(){if(this.localValue.source==="ip"){const{label:e,level:t,lat:s,lng:n}=this.localValue;this.localValue={source:"user",grid_id:!1,label:e,level:t,lat:Number(s),lng:Number(n)}}this._updateProfile("location_grid_meta",this.localValue,()=>{this._sendDoneStepEvent()})}_updateProfile(e,t,s=()=>{}){this.loading=!0;const n={[e]:t};fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(n),headers:{"X-WP-Nonce":jsObject.nonce}}).then(a=>a.json()).then(a=>{jsObject.profile=a,s()}).catch(a=>{console.error(a)}).finally(()=>{this.loading=!1})}_clearLocations(){this.locations=[]}_toggleInfo(e){this.isInfoOpen?this.isInfoOpen=!1:this._openInfo(e)}_openInfo(e){switch(this.isInfoOpen=!0,e){case"name":this.infoText=this.t.user_name_disclaimer;break;case"phone":this.infoText=this.t.user_phone_disclaimer;break;case"location":this.infoText=this.t.user_city_disclaimer;break}}createRenderRoot(){return this}}window.customElements.define("complete-profile",ba);class ya extends ${static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","connect/friend",{code:t},"zume_system/v1").then(s=>{console.log(s),this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_friend_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return c`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("connect-friend",ya);class $e extends Error{}class wa extends $e{constructor(e){super(`Invalid DateTime: ${e.toMessage()}`)}}class $a extends $e{constructor(e){super(`Invalid Interval: ${e.toMessage()}`)}}class ka extends $e{constructor(e){super(`Invalid Duration: ${e.toMessage()}`)}}class je extends $e{}class Ui extends $e{constructor(e){super(`Invalid unit ${e}`)}}class F extends $e{}class ne extends $e{constructor(){super("Zone is an abstract class")}}const f="numeric",K="short",q="long",bt={year:f,month:f,day:f},Wi={year:f,month:K,day:f},_a={year:f,month:K,day:f,weekday:K},qi={year:f,month:q,day:f},Vi={year:f,month:q,day:f,weekday:q},Hi={hour:f,minute:f},Zi={hour:f,minute:f,second:f},Bi={hour:f,minute:f,second:f,timeZoneName:K},Gi={hour:f,minute:f,second:f,timeZoneName:q},Yi={hour:f,minute:f,hourCycle:"h23"},Ji={hour:f,minute:f,second:f,hourCycle:"h23"},Ki={hour:f,minute:f,second:f,hourCycle:"h23",timeZoneName:K},Qi={hour:f,minute:f,second:f,hourCycle:"h23",timeZoneName:q},Xi={year:f,month:f,day:f,hour:f,minute:f},en={year:f,month:f,day:f,hour:f,minute:f,second:f},tn={year:f,month:K,day:f,hour:f,minute:f},sn={year:f,month:K,day:f,hour:f,minute:f,second:f},Sa={year:f,month:K,day:f,weekday:K,hour:f,minute:f},nn={year:f,month:q,day:f,hour:f,minute:f,timeZoneName:K},an={year:f,month:q,day:f,hour:f,minute:f,second:f,timeZoneName:K},rn={year:f,month:q,day:f,weekday:q,hour:f,minute:f,timeZoneName:q},on={year:f,month:q,day:f,weekday:q,hour:f,minute:f,second:f,timeZoneName:q};class et{get type(){throw new ne}get name(){throw new ne}get ianaName(){return this.name}get isUniversal(){throw new ne}offsetName(e,t){throw new ne}formatOffset(e,t){throw new ne}offset(e){throw new ne}equals(e){throw new ne}get isValid(){throw new ne}}let Vt=null;class Ct extends et{static get instance(){return Vt===null&&(Vt=new Ct),Vt}get type(){return"system"}get name(){return new Intl.DateTimeFormat().resolvedOptions().timeZone}get isUniversal(){return!1}offsetName(e,{format:t,locale:s}){return gn(e,t,s)}formatOffset(e,t){return He(this.offset(e),t)}offset(e){return-new Date(e).getTimezoneOffset()}equals(e){return e.type==="system"}get isValid(){return!0}}let pt={};function Oa(i){return pt[i]||(pt[i]=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:i,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",era:"short"})),pt[i]}const ja={year:0,month:1,day:2,era:3,hour:4,minute:5,second:6};function Ea(i,e){const t=i.format(e).replace(/\u200E/g,""),s=/(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(t),[,n,a,r,o,l,d,u]=s;return[r,n,a,o,l,d,u]}function Ca(i,e){const t=i.formatToParts(e),s=[];for(let n=0;n<t.length;n++){const{type:a,value:r}=t[n],o=ja[a];a==="era"?s[o]=r:y(o)||(s[o]=parseInt(r,10))}return s}let at={};class ee extends et{static create(e){return at[e]||(at[e]=new ee(e)),at[e]}static resetCache(){at={},pt={}}static isValidSpecifier(e){return this.isValidZone(e)}static isValidZone(e){if(!e)return!1;try{return new Intl.DateTimeFormat("en-US",{timeZone:e}).format(),!0}catch{return!1}}constructor(e){super(),this.zoneName=e,this.valid=ee.isValidZone(e)}get type(){return"iana"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(e,{format:t,locale:s}){return gn(e,t,s,this.name)}formatOffset(e,t){return He(this.offset(e),t)}offset(e){const t=new Date(e);if(isNaN(t))return NaN;const s=Oa(this.name);let[n,a,r,o,l,d,u]=s.formatToParts?Ca(s,t):Ea(s,t);o==="BC"&&(n=-Math.abs(n)+1);const g=Tt({year:n,month:a,day:r,hour:l===24?0:l,minute:d,second:u,millisecond:0});let m=+t;const b=m%1e3;return m-=b>=0?b:1e3+b,(g-m)/(60*1e3)}equals(e){return e.type==="iana"&&e.name===this.name}get isValid(){return this.valid}}let Rs={};function xa(i,e={}){const t=JSON.stringify([i,e]);let s=Rs[t];return s||(s=new Intl.ListFormat(i,e),Rs[t]=s),s}let is={};function ns(i,e={}){const t=JSON.stringify([i,e]);let s=is[t];return s||(s=new Intl.DateTimeFormat(i,e),is[t]=s),s}let as={};function Ta(i,e={}){const t=JSON.stringify([i,e]);let s=as[t];return s||(s=new Intl.NumberFormat(i,e),as[t]=s),s}let rs={};function Ma(i,e={}){const{base:t,...s}=e,n=JSON.stringify([i,s]);let a=rs[n];return a||(a=new Intl.RelativeTimeFormat(i,e),rs[n]=a),a}let Ve=null;function Ia(){return Ve||(Ve=new Intl.DateTimeFormat().resolvedOptions().locale,Ve)}let Ps={};function Da(i){let e=Ps[i];if(!e){const t=new Intl.Locale(i);e="getWeekInfo"in t?t.getWeekInfo():t.weekInfo,Ps[i]=e}return e}function za(i){const e=i.indexOf("-x-");e!==-1&&(i=i.substring(0,e));const t=i.indexOf("-u-");if(t===-1)return[i];{let s,n;try{s=ns(i).resolvedOptions(),n=i}catch{const l=i.substring(0,t);s=ns(l).resolvedOptions(),n=l}const{numberingSystem:a,calendar:r}=s;return[n,a,r]}}function Aa(i,e,t){return(t||e)&&(i.includes("-u-")||(i+="-u"),t&&(i+=`-ca-${t}`),e&&(i+=`-nu-${e}`)),i}function Na(i){const e=[];for(let t=1;t<=12;t++){const s=v.utc(2009,t,1);e.push(i(s))}return e}function La(i){const e=[];for(let t=1;t<=7;t++){const s=v.utc(2016,11,13+t);e.push(i(s))}return e}function rt(i,e,t,s){const n=i.listingMode();return n==="error"?null:n==="en"?t(e):s(e)}function Ra(i){return i.numberingSystem&&i.numberingSystem!=="latn"?!1:i.numberingSystem==="latn"||!i.locale||i.locale.startsWith("en")||new Intl.DateTimeFormat(i.intl).resolvedOptions().numberingSystem==="latn"}class Pa{constructor(e,t,s){this.padTo=s.padTo||0,this.floor=s.floor||!1;const{padTo:n,floor:a,...r}=s;if(!t||Object.keys(r).length>0){const o={useGrouping:!1,...s};s.padTo>0&&(o.minimumIntegerDigits=s.padTo),this.inf=Ta(e,o)}}format(e){if(this.inf){const t=this.floor?Math.floor(e):e;return this.inf.format(t)}else{const t=this.floor?Math.floor(e):vs(e,3);return M(t,this.padTo)}}}class Fa{constructor(e,t,s){this.opts=s,this.originalZone=void 0;let n;if(this.opts.timeZone)this.dt=e;else if(e.zone.type==="fixed"){const r=-1*(e.offset/60),o=r>=0?`Etc/GMT+${r}`:`Etc/GMT${r}`;e.offset!==0&&ee.create(o).valid?(n=o,this.dt=e):(n="UTC",this.dt=e.offset===0?e:e.setZone("UTC").plus({minutes:e.offset}),this.originalZone=e.zone)}else e.zone.type==="system"?this.dt=e:e.zone.type==="iana"?(this.dt=e,n=e.zone.name):(n="UTC",this.dt=e.setZone("UTC").plus({minutes:e.offset}),this.originalZone=e.zone);const a={...this.opts};a.timeZone=a.timeZone||n,this.dtf=ns(t,a)}format(){return this.originalZone?this.formatToParts().map(({value:e})=>e).join(""):this.dtf.format(this.dt.toJSDate())}formatToParts(){const e=this.dtf.formatToParts(this.dt.toJSDate());return this.originalZone?e.map(t=>{if(t.type==="timeZoneName"){const s=this.originalZone.offsetName(this.dt.ts,{locale:this.dt.locale,format:this.opts.timeZoneName});return{...t,value:s}}else return t}):e}resolvedOptions(){return this.dtf.resolvedOptions()}}class Ua{constructor(e,t,s){this.opts={style:"long",...s},!t&&mn()&&(this.rtf=Ma(e,s))}format(e,t){return this.rtf?this.rtf.format(e,t):or(t,e,this.opts.numeric,this.opts.style!=="long")}formatToParts(e,t){return this.rtf?this.rtf.formatToParts(e,t):[]}}const Wa={firstDay:1,minimalDays:4,weekend:[6,7]};class j{static fromOpts(e){return j.create(e.locale,e.numberingSystem,e.outputCalendar,e.weekSettings,e.defaultToEN)}static create(e,t,s,n,a=!1){const r=e||x.defaultLocale,o=r||(a?"en-US":Ia()),l=t||x.defaultNumberingSystem,d=s||x.defaultOutputCalendar,u=os(n)||x.defaultWeekSettings;return new j(o,l,d,u,r)}static resetCache(){Ve=null,is={},as={},rs={}}static fromObject({locale:e,numberingSystem:t,outputCalendar:s,weekSettings:n}={}){return j.create(e,t,s,n)}constructor(e,t,s,n,a){const[r,o,l]=za(e);this.locale=r,this.numberingSystem=t||o||null,this.outputCalendar=s||l||null,this.weekSettings=n,this.intl=Aa(this.locale,this.numberingSystem,this.outputCalendar),this.weekdaysCache={format:{},standalone:{}},this.monthsCache={format:{},standalone:{}},this.meridiemCache=null,this.eraCache={},this.specifiedLocale=a,this.fastNumbersCached=null}get fastNumbers(){return this.fastNumbersCached==null&&(this.fastNumbersCached=Ra(this)),this.fastNumbersCached}listingMode(){const e=this.isEnglish(),t=(this.numberingSystem===null||this.numberingSystem==="latn")&&(this.outputCalendar===null||this.outputCalendar==="gregory");return e&&t?"en":"intl"}clone(e){return!e||Object.getOwnPropertyNames(e).length===0?this:j.create(e.locale||this.specifiedLocale,e.numberingSystem||this.numberingSystem,e.outputCalendar||this.outputCalendar,os(e.weekSettings)||this.weekSettings,e.defaultToEN||!1)}redefaultToEN(e={}){return this.clone({...e,defaultToEN:!0})}redefaultToSystem(e={}){return this.clone({...e,defaultToEN:!1})}months(e,t=!1){return rt(this,e,yn,()=>{const s=t?{month:e,day:"numeric"}:{month:e},n=t?"format":"standalone";return this.monthsCache[n][e]||(this.monthsCache[n][e]=Na(a=>this.extract(a,s,"month"))),this.monthsCache[n][e]})}weekdays(e,t=!1){return rt(this,e,kn,()=>{const s=t?{weekday:e,year:"numeric",month:"long",day:"numeric"}:{weekday:e},n=t?"format":"standalone";return this.weekdaysCache[n][e]||(this.weekdaysCache[n][e]=La(a=>this.extract(a,s,"weekday"))),this.weekdaysCache[n][e]})}meridiems(){return rt(this,void 0,()=>_n,()=>{if(!this.meridiemCache){const e={hour:"numeric",hourCycle:"h12"};this.meridiemCache=[v.utc(2016,11,13,9),v.utc(2016,11,13,19)].map(t=>this.extract(t,e,"dayperiod"))}return this.meridiemCache})}eras(e){return rt(this,e,Sn,()=>{const t={era:e};return this.eraCache[e]||(this.eraCache[e]=[v.utc(-40,1,1),v.utc(2017,1,1)].map(s=>this.extract(s,t,"era"))),this.eraCache[e]})}extract(e,t,s){const n=this.dtFormatter(e,t),a=n.formatToParts(),r=a.find(o=>o.type.toLowerCase()===s);return r?r.value:null}numberFormatter(e={}){return new Pa(this.intl,e.forceSimple||this.fastNumbers,e)}dtFormatter(e,t={}){return new Fa(e,this.intl,t)}relFormatter(e={}){return new Ua(this.intl,this.isEnglish(),e)}listFormatter(e={}){return xa(this.intl,e)}isEnglish(){return this.locale==="en"||this.locale.toLowerCase()==="en-us"||new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us")}getWeekSettings(){return this.weekSettings?this.weekSettings:fn()?Da(this.locale):Wa}getStartOfWeek(){return this.getWeekSettings().firstDay}getMinDaysInFirstWeek(){return this.getWeekSettings().minimalDays}getWeekendDays(){return this.getWeekSettings().weekend}equals(e){return this.locale===e.locale&&this.numberingSystem===e.numberingSystem&&this.outputCalendar===e.outputCalendar}}let Ht=null;class L extends et{static get utcInstance(){return Ht===null&&(Ht=new L(0)),Ht}static instance(e){return e===0?L.utcInstance:new L(e)}static parseSpecifier(e){if(e){const t=e.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);if(t)return new L(Mt(t[1],t[2]))}return null}constructor(e){super(),this.fixed=e}get type(){return"fixed"}get name(){return this.fixed===0?"UTC":`UTC${He(this.fixed,"narrow")}`}get ianaName(){return this.fixed===0?"Etc/UTC":`Etc/GMT${He(-this.fixed,"narrow")}`}offsetName(){return this.name}formatOffset(e,t){return He(this.fixed,t)}get isUniversal(){return!0}offset(){return this.fixed}equals(e){return e.type==="fixed"&&e.fixed===this.fixed}get isValid(){return!0}}class qa extends et{constructor(e){super(),this.zoneName=e}get type(){return"invalid"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(){return null}formatOffset(){return""}offset(){return NaN}equals(){return!1}get isValid(){return!1}}function le(i,e){if(y(i)||i===null)return e;if(i instanceof et)return i;if(Za(i)){const t=i.toLowerCase();return t==="default"?e:t==="local"||t==="system"?Ct.instance:t==="utc"||t==="gmt"?L.utcInstance:L.parseSpecifier(t)||ee.create(i)}else return ye(i)?L.instance(i):typeof i=="object"&&"offset"in i&&typeof i.offset=="function"?i:new qa(i)}let Fs=()=>Date.now(),Us="system",Ws=null,qs=null,Vs=null,Hs=60,Zs,Bs=null;class x{static get now(){return Fs}static set now(e){Fs=e}static set defaultZone(e){Us=e}static get defaultZone(){return le(Us,Ct.instance)}static get defaultLocale(){return Ws}static set defaultLocale(e){Ws=e}static get defaultNumberingSystem(){return qs}static set defaultNumberingSystem(e){qs=e}static get defaultOutputCalendar(){return Vs}static set defaultOutputCalendar(e){Vs=e}static get defaultWeekSettings(){return Bs}static set defaultWeekSettings(e){Bs=os(e)}static get twoDigitCutoffYear(){return Hs}static set twoDigitCutoffYear(e){Hs=e%100}static get throwOnInvalid(){return Zs}static set throwOnInvalid(e){Zs=e}static resetCaches(){j.resetCache(),ee.resetCache()}}class J{constructor(e,t){this.reason=e,this.explanation=t}toMessage(){return this.explanation?`${this.reason}: ${this.explanation}`:this.reason}}const ln=[0,31,59,90,120,151,181,212,243,273,304,334],cn=[0,31,60,91,121,152,182,213,244,274,305,335];function H(i,e){return new J("unit out of range",`you specified ${e} (of type ${typeof e}) as a ${i}, which is invalid`)}function ms(i,e,t){const s=new Date(Date.UTC(i,e-1,t));i<100&&i>=0&&s.setUTCFullYear(s.getUTCFullYear()-1900);const n=s.getUTCDay();return n===0?7:n}function dn(i,e,t){return t+(tt(i)?cn:ln)[e-1]}function hn(i,e){const t=tt(i)?cn:ln,s=t.findIndex(a=>a<e),n=e-t[s];return{month:s+1,day:n}}function fs(i,e){return(i-e+7)%7+1}function yt(i,e=4,t=1){const{year:s,month:n,day:a}=i,r=dn(s,n,a),o=fs(ms(s,n,a),t);let l=Math.floor((r-o+14-e)/7),d;return l<1?(d=s-1,l=Ye(d,e,t)):l>Ye(s,e,t)?(d=s+1,l=1):d=s,{weekYear:d,weekNumber:l,weekday:o,...It(i)}}function Gs(i,e=4,t=1){const{weekYear:s,weekNumber:n,weekday:a}=i,r=fs(ms(s,1,e),t),o=Ce(s);let l=n*7+a-r-7+e,d;l<1?(d=s-1,l+=Ce(d)):l>o?(d=s+1,l-=Ce(s)):d=s;const{month:u,day:p}=hn(d,l);return{year:d,month:u,day:p,...It(i)}}function Zt(i){const{year:e,month:t,day:s}=i,n=dn(e,t,s);return{year:e,ordinal:n,...It(i)}}function Ys(i){const{year:e,ordinal:t}=i,{month:s,day:n}=hn(e,t);return{year:e,month:s,day:n,...It(i)}}function Js(i,e){if(!y(i.localWeekday)||!y(i.localWeekNumber)||!y(i.localWeekYear)){if(!y(i.weekday)||!y(i.weekNumber)||!y(i.weekYear))throw new je("Cannot mix locale-based week fields with ISO-based week fields");return y(i.localWeekday)||(i.weekday=i.localWeekday),y(i.localWeekNumber)||(i.weekNumber=i.localWeekNumber),y(i.localWeekYear)||(i.weekYear=i.localWeekYear),delete i.localWeekday,delete i.localWeekNumber,delete i.localWeekYear,{minDaysInFirstWeek:e.getMinDaysInFirstWeek(),startOfWeek:e.getStartOfWeek()}}else return{minDaysInFirstWeek:4,startOfWeek:1}}function Va(i,e=4,t=1){const s=xt(i.weekYear),n=Z(i.weekNumber,1,Ye(i.weekYear,e,t)),a=Z(i.weekday,1,7);return s?n?a?!1:H("weekday",i.weekday):H("week",i.weekNumber):H("weekYear",i.weekYear)}function Ha(i){const e=xt(i.year),t=Z(i.ordinal,1,Ce(i.year));return e?t?!1:H("ordinal",i.ordinal):H("year",i.year)}function un(i){const e=xt(i.year),t=Z(i.month,1,12),s=Z(i.day,1,wt(i.year,i.month));return e?t?s?!1:H("day",i.day):H("month",i.month):H("year",i.year)}function pn(i){const{hour:e,minute:t,second:s,millisecond:n}=i,a=Z(e,0,23)||e===24&&t===0&&s===0&&n===0,r=Z(t,0,59),o=Z(s,0,59),l=Z(n,0,999);return a?r?o?l?!1:H("millisecond",n):H("second",s):H("minute",t):H("hour",e)}function y(i){return typeof i>"u"}function ye(i){return typeof i=="number"}function xt(i){return typeof i=="number"&&i%1===0}function Za(i){return typeof i=="string"}function Ba(i){return Object.prototype.toString.call(i)==="[object Date]"}function mn(){try{return typeof Intl<"u"&&!!Intl.RelativeTimeFormat}catch{return!1}}function fn(){try{return typeof Intl<"u"&&!!Intl.Locale&&("weekInfo"in Intl.Locale.prototype||"getWeekInfo"in Intl.Locale.prototype)}catch{return!1}}function Ga(i){return Array.isArray(i)?i:[i]}function Ks(i,e,t){if(i.length!==0)return i.reduce((s,n)=>{const a=[e(n),n];return s&&t(s[0],a[0])===s[0]?s:a},null)[1]}function Ya(i,e){return e.reduce((t,s)=>(t[s]=i[s],t),{})}function Ie(i,e){return Object.prototype.hasOwnProperty.call(i,e)}function os(i){if(i==null)return null;if(typeof i!="object")throw new F("Week settings must be an object");if(!Z(i.firstDay,1,7)||!Z(i.minimalDays,1,7)||!Array.isArray(i.weekend)||i.weekend.some(e=>!Z(e,1,7)))throw new F("Invalid week settings");return{firstDay:i.firstDay,minimalDays:i.minimalDays,weekend:Array.from(i.weekend)}}function Z(i,e,t){return xt(i)&&i>=e&&i<=t}function Ja(i,e){return i-e*Math.floor(i/e)}function M(i,e=2){const t=i<0;let s;return t?s="-"+(""+-i).padStart(e,"0"):s=(""+i).padStart(e,"0"),s}function oe(i){if(!(y(i)||i===null||i===""))return parseInt(i,10)}function pe(i){if(!(y(i)||i===null||i===""))return parseFloat(i)}function gs(i){if(!(y(i)||i===null||i==="")){const e=parseFloat("0."+i)*1e3;return Math.floor(e)}}function vs(i,e,t=!1){const s=10**e;return(t?Math.trunc:Math.round)(i*s)/s}function tt(i){return i%4===0&&(i%100!==0||i%400===0)}function Ce(i){return tt(i)?366:365}function wt(i,e){const t=Ja(e-1,12)+1,s=i+(e-t)/12;return t===2?tt(s)?29:28:[31,null,31,30,31,30,31,31,30,31,30,31][t-1]}function Tt(i){let e=Date.UTC(i.year,i.month-1,i.day,i.hour,i.minute,i.second,i.millisecond);return i.year<100&&i.year>=0&&(e=new Date(e),e.setUTCFullYear(i.year,i.month-1,i.day)),+e}function Qs(i,e,t){return-fs(ms(i,1,e),t)+e-1}function Ye(i,e=4,t=1){const s=Qs(i,e,t),n=Qs(i+1,e,t);return(Ce(i)-s+n)/7}function ls(i){return i>99?i:i>x.twoDigitCutoffYear?1900+i:2e3+i}function gn(i,e,t,s=null){const n=new Date(i),a={hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"};s&&(a.timeZone=s);const r={timeZoneName:e,...a},o=new Intl.DateTimeFormat(t,r).formatToParts(n).find(l=>l.type.toLowerCase()==="timezonename");return o?o.value:null}function Mt(i,e){let t=parseInt(i,10);Number.isNaN(t)&&(t=0);const s=parseInt(e,10)||0,n=t<0||Object.is(t,-0)?-s:s;return t*60+n}function vn(i){const e=Number(i);if(typeof i=="boolean"||i===""||Number.isNaN(e))throw new F(`Invalid unit value ${i}`);return e}function $t(i,e){const t={};for(const s in i)if(Ie(i,s)){const n=i[s];if(n==null)continue;t[e(s)]=vn(n)}return t}function He(i,e){const t=Math.trunc(Math.abs(i/60)),s=Math.trunc(Math.abs(i%60)),n=i>=0?"+":"-";switch(e){case"short":return`${n}${M(t,2)}:${M(s,2)}`;case"narrow":return`${n}${t}${s>0?`:${s}`:""}`;case"techie":return`${n}${M(t,2)}${M(s,2)}`;default:throw new RangeError(`Value format ${e} is out of range for property format`)}}function It(i){return Ya(i,["hour","minute","second","millisecond"])}const Ka=["January","February","March","April","May","June","July","August","September","October","November","December"],bn=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Qa=["J","F","M","A","M","J","J","A","S","O","N","D"];function yn(i){switch(i){case"narrow":return[...Qa];case"short":return[...bn];case"long":return[...Ka];case"numeric":return["1","2","3","4","5","6","7","8","9","10","11","12"];case"2-digit":return["01","02","03","04","05","06","07","08","09","10","11","12"];default:return null}}const wn=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],$n=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],Xa=["M","T","W","T","F","S","S"];function kn(i){switch(i){case"narrow":return[...Xa];case"short":return[...$n];case"long":return[...wn];case"numeric":return["1","2","3","4","5","6","7"];default:return null}}const _n=["AM","PM"],er=["Before Christ","Anno Domini"],tr=["BC","AD"],sr=["B","A"];function Sn(i){switch(i){case"narrow":return[...sr];case"short":return[...tr];case"long":return[...er];default:return null}}function ir(i){return _n[i.hour<12?0:1]}function nr(i,e){return kn(e)[i.weekday-1]}function ar(i,e){return yn(e)[i.month-1]}function rr(i,e){return Sn(e)[i.year<0?0:1]}function or(i,e,t="always",s=!1){const n={years:["year","yr."],quarters:["quarter","qtr."],months:["month","mo."],weeks:["week","wk."],days:["day","day","days"],hours:["hour","hr."],minutes:["minute","min."],seconds:["second","sec."]},a=["hours","minutes","seconds"].indexOf(i)===-1;if(t==="auto"&&a){const p=i==="days";switch(e){case 1:return p?"tomorrow":`next ${n[i][0]}`;case-1:return p?"yesterday":`last ${n[i][0]}`;case 0:return p?"today":`this ${n[i][0]}`}}const r=Object.is(e,-0)||e<0,o=Math.abs(e),l=o===1,d=n[i],u=s?l?d[1]:d[2]||d[1]:l?n[i][0]:i;return r?`${o} ${u} ago`:`in ${o} ${u}`}function Xs(i,e){let t="";for(const s of i)s.literal?t+=s.val:t+=e(s.val);return t}const lr={D:bt,DD:Wi,DDD:qi,DDDD:Vi,t:Hi,tt:Zi,ttt:Bi,tttt:Gi,T:Yi,TT:Ji,TTT:Ki,TTTT:Qi,f:Xi,ff:tn,fff:nn,ffff:rn,F:en,FF:sn,FFF:an,FFFF:on};class N{static create(e,t={}){return new N(e,t)}static parseFormat(e){let t=null,s="",n=!1;const a=[];for(let r=0;r<e.length;r++){const o=e.charAt(r);o==="'"?(s.length>0&&a.push({literal:n||/^\s+$/.test(s),val:s}),t=null,s="",n=!n):n||o===t?s+=o:(s.length>0&&a.push({literal:/^\s+$/.test(s),val:s}),s=o,t=o)}return s.length>0&&a.push({literal:n||/^\s+$/.test(s),val:s}),a}static macroTokenToFormatOpts(e){return lr[e]}constructor(e,t){this.opts=t,this.loc=e,this.systemLoc=null}formatWithSystemDefault(e,t){return this.systemLoc===null&&(this.systemLoc=this.loc.redefaultToSystem()),this.systemLoc.dtFormatter(e,{...this.opts,...t}).format()}dtFormatter(e,t={}){return this.loc.dtFormatter(e,{...this.opts,...t})}formatDateTime(e,t){return this.dtFormatter(e,t).format()}formatDateTimeParts(e,t){return this.dtFormatter(e,t).formatToParts()}formatInterval(e,t){return this.dtFormatter(e.start,t).dtf.formatRange(e.start.toJSDate(),e.end.toJSDate())}resolvedOptions(e,t){return this.dtFormatter(e,t).resolvedOptions()}num(e,t=0){if(this.opts.forceSimple)return M(e,t);const s={...this.opts};return t>0&&(s.padTo=t),this.loc.numberFormatter(s).format(e)}formatDateTimeFromString(e,t){const s=this.loc.listingMode()==="en",n=this.loc.outputCalendar&&this.loc.outputCalendar!=="gregory",a=(m,b)=>this.loc.extract(e,m,b),r=m=>e.isOffsetFixed&&e.offset===0&&m.allowZ?"Z":e.isValid?e.zone.formatOffset(e.ts,m.format):"",o=()=>s?ir(e):a({hour:"numeric",hourCycle:"h12"},"dayperiod"),l=(m,b)=>s?ar(e,m):a(b?{month:m}:{month:m,day:"numeric"},"month"),d=(m,b)=>s?nr(e,m):a(b?{weekday:m}:{weekday:m,month:"long",day:"numeric"},"weekday"),u=m=>{const b=N.macroTokenToFormatOpts(m);return b?this.formatWithSystemDefault(e,b):m},p=m=>s?rr(e,m):a({era:m},"era"),g=m=>{switch(m){case"S":return this.num(e.millisecond);case"u":case"SSS":return this.num(e.millisecond,3);case"s":return this.num(e.second);case"ss":return this.num(e.second,2);case"uu":return this.num(Math.floor(e.millisecond/10),2);case"uuu":return this.num(Math.floor(e.millisecond/100));case"m":return this.num(e.minute);case"mm":return this.num(e.minute,2);case"h":return this.num(e.hour%12===0?12:e.hour%12);case"hh":return this.num(e.hour%12===0?12:e.hour%12,2);case"H":return this.num(e.hour);case"HH":return this.num(e.hour,2);case"Z":return r({format:"narrow",allowZ:this.opts.allowZ});case"ZZ":return r({format:"short",allowZ:this.opts.allowZ});case"ZZZ":return r({format:"techie",allowZ:this.opts.allowZ});case"ZZZZ":return e.zone.offsetName(e.ts,{format:"short",locale:this.loc.locale});case"ZZZZZ":return e.zone.offsetName(e.ts,{format:"long",locale:this.loc.locale});case"z":return e.zoneName;case"a":return o();case"d":return n?a({day:"numeric"},"day"):this.num(e.day);case"dd":return n?a({day:"2-digit"},"day"):this.num(e.day,2);case"c":return this.num(e.weekday);case"ccc":return d("short",!0);case"cccc":return d("long",!0);case"ccccc":return d("narrow",!0);case"E":return this.num(e.weekday);case"EEE":return d("short",!1);case"EEEE":return d("long",!1);case"EEEEE":return d("narrow",!1);case"L":return n?a({month:"numeric",day:"numeric"},"month"):this.num(e.month);case"LL":return n?a({month:"2-digit",day:"numeric"},"month"):this.num(e.month,2);case"LLL":return l("short",!0);case"LLLL":return l("long",!0);case"LLLLL":return l("narrow",!0);case"M":return n?a({month:"numeric"},"month"):this.num(e.month);case"MM":return n?a({month:"2-digit"},"month"):this.num(e.month,2);case"MMM":return l("short",!1);case"MMMM":return l("long",!1);case"MMMMM":return l("narrow",!1);case"y":return n?a({year:"numeric"},"year"):this.num(e.year);case"yy":return n?a({year:"2-digit"},"year"):this.num(e.year.toString().slice(-2),2);case"yyyy":return n?a({year:"numeric"},"year"):this.num(e.year,4);case"yyyyyy":return n?a({year:"numeric"},"year"):this.num(e.year,6);case"G":return p("short");case"GG":return p("long");case"GGGGG":return p("narrow");case"kk":return this.num(e.weekYear.toString().slice(-2),2);case"kkkk":return this.num(e.weekYear,4);case"W":return this.num(e.weekNumber);case"WW":return this.num(e.weekNumber,2);case"n":return this.num(e.localWeekNumber);case"nn":return this.num(e.localWeekNumber,2);case"ii":return this.num(e.localWeekYear.toString().slice(-2),2);case"iiii":return this.num(e.localWeekYear,4);case"o":return this.num(e.ordinal);case"ooo":return this.num(e.ordinal,3);case"q":return this.num(e.quarter);case"qq":return this.num(e.quarter,2);case"X":return this.num(Math.floor(e.ts/1e3));case"x":return this.num(e.ts);default:return u(m)}};return Xs(N.parseFormat(t),g)}formatDurationFromString(e,t){const s=l=>{switch(l[0]){case"S":return"millisecond";case"s":return"second";case"m":return"minute";case"h":return"hour";case"d":return"day";case"w":return"week";case"M":return"month";case"y":return"year";default:return null}},n=l=>d=>{const u=s(d);return u?this.num(l.get(u),d.length):d},a=N.parseFormat(t),r=a.reduce((l,{literal:d,val:u})=>d?l:l.concat(u),[]),o=e.shiftTo(...r.map(s).filter(l=>l));return Xs(a,n(o))}}const On=/[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;function ze(...i){const e=i.reduce((t,s)=>t+s.source,"");return RegExp(`^${e}$`)}function Ae(...i){return e=>i.reduce(([t,s,n],a)=>{const[r,o,l]=a(e,n);return[{...t,...r},o||s,l]},[{},null,1]).slice(0,2)}function Ne(i,...e){if(i==null)return[null,null];for(const[t,s]of e){const n=t.exec(i);if(n)return s(n)}return[null,null]}function jn(...i){return(e,t)=>{const s={};let n;for(n=0;n<i.length;n++)s[i[n]]=oe(e[t+n]);return[s,null,t+n]}}const En=/(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,cr=`(?:${En.source}?(?:\\[(${On.source})\\])?)?`,bs=/(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,Cn=RegExp(`${bs.source}${cr}`),ys=RegExp(`(?:T${Cn.source})?`),dr=/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,hr=/(\d{4})-?W(\d\d)(?:-?(\d))?/,ur=/(\d{4})-?(\d{3})/,pr=jn("weekYear","weekNumber","weekDay"),mr=jn("year","ordinal"),fr=/(\d{4})-(\d\d)-(\d\d)/,xn=RegExp(`${bs.source} ?(?:${En.source}|(${On.source}))?`),gr=RegExp(`(?: ${xn.source})?`);function xe(i,e,t){const s=i[e];return y(s)?t:oe(s)}function vr(i,e){return[{year:xe(i,e),month:xe(i,e+1,1),day:xe(i,e+2,1)},null,e+3]}function Le(i,e){return[{hours:xe(i,e,0),minutes:xe(i,e+1,0),seconds:xe(i,e+2,0),milliseconds:gs(i[e+3])},null,e+4]}function st(i,e){const t=!i[e]&&!i[e+1],s=Mt(i[e+1],i[e+2]),n=t?null:L.instance(s);return[{},n,e+3]}function it(i,e){const t=i[e]?ee.create(i[e]):null;return[{},t,e+1]}const br=RegExp(`^T?${bs.source}$`),yr=/^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;function wr(i){const[e,t,s,n,a,r,o,l,d]=i,u=e[0]==="-",p=l&&l[0]==="-",g=(m,b=!1)=>m!==void 0&&(b||m&&u)?-m:m;return[{years:g(pe(t)),months:g(pe(s)),weeks:g(pe(n)),days:g(pe(a)),hours:g(pe(r)),minutes:g(pe(o)),seconds:g(pe(l),l==="-0"),milliseconds:g(gs(d),p)}]}const $r={GMT:0,EDT:-4*60,EST:-5*60,CDT:-5*60,CST:-6*60,MDT:-6*60,MST:-7*60,PDT:-7*60,PST:-8*60};function ws(i,e,t,s,n,a,r){const o={year:e.length===2?ls(oe(e)):oe(e),month:bn.indexOf(t)+1,day:oe(s),hour:oe(n),minute:oe(a)};return r&&(o.second=oe(r)),i&&(o.weekday=i.length>3?wn.indexOf(i)+1:$n.indexOf(i)+1),o}const kr=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;function _r(i){const[,e,t,s,n,a,r,o,l,d,u,p]=i,g=ws(e,n,s,t,a,r,o);let m;return l?m=$r[l]:d?m=0:m=Mt(u,p),[g,new L(m)]}function Sr(i){return i.replace(/\([^()]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").trim()}const Or=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,jr=/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,Er=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;function ei(i){const[,e,t,s,n,a,r,o]=i;return[ws(e,n,s,t,a,r,o),L.utcInstance]}function Cr(i){const[,e,t,s,n,a,r,o]=i;return[ws(e,o,t,s,n,a,r),L.utcInstance]}const xr=ze(dr,ys),Tr=ze(hr,ys),Mr=ze(ur,ys),Ir=ze(Cn),Tn=Ae(vr,Le,st,it),Dr=Ae(pr,Le,st,it),zr=Ae(mr,Le,st,it),Ar=Ae(Le,st,it);function Nr(i){return Ne(i,[xr,Tn],[Tr,Dr],[Mr,zr],[Ir,Ar])}function Lr(i){return Ne(Sr(i),[kr,_r])}function Rr(i){return Ne(i,[Or,ei],[jr,ei],[Er,Cr])}function Pr(i){return Ne(i,[yr,wr])}const Fr=Ae(Le);function Ur(i){return Ne(i,[br,Fr])}const Wr=ze(fr,gr),qr=ze(xn),Vr=Ae(Le,st,it);function Hr(i){return Ne(i,[Wr,Tn],[qr,Vr])}const ti="Invalid Duration",Mn={weeks:{days:7,hours:7*24,minutes:7*24*60,seconds:7*24*60*60,milliseconds:7*24*60*60*1e3},days:{hours:24,minutes:24*60,seconds:24*60*60,milliseconds:24*60*60*1e3},hours:{minutes:60,seconds:60*60,milliseconds:60*60*1e3},minutes:{seconds:60,milliseconds:60*1e3},seconds:{milliseconds:1e3}},Zr={years:{quarters:4,months:12,weeks:52,days:365,hours:365*24,minutes:365*24*60,seconds:365*24*60*60,milliseconds:365*24*60*60*1e3},quarters:{months:3,weeks:13,days:91,hours:91*24,minutes:91*24*60,seconds:91*24*60*60,milliseconds:91*24*60*60*1e3},months:{weeks:4,days:30,hours:30*24,minutes:30*24*60,seconds:30*24*60*60,milliseconds:30*24*60*60*1e3},...Mn},V=146097/400,ke=146097/4800,Br={years:{quarters:4,months:12,weeks:V/7,days:V,hours:V*24,minutes:V*24*60,seconds:V*24*60*60,milliseconds:V*24*60*60*1e3},quarters:{months:3,weeks:V/28,days:V/4,hours:V*24/4,minutes:V*24*60/4,seconds:V*24*60*60/4,milliseconds:V*24*60*60*1e3/4},months:{weeks:ke/7,days:ke,hours:ke*24,minutes:ke*24*60,seconds:ke*24*60*60,milliseconds:ke*24*60*60*1e3},...Mn},ve=["years","quarters","months","weeks","days","hours","minutes","seconds","milliseconds"],Gr=ve.slice(0).reverse();function ae(i,e,t=!1){const s={values:t?e.values:{...i.values,...e.values||{}},loc:i.loc.clone(e.loc),conversionAccuracy:e.conversionAccuracy||i.conversionAccuracy,matrix:e.matrix||i.matrix};return new k(s)}function In(i,e){let t=e.milliseconds??0;for(const s of Gr.slice(1))e[s]&&(t+=e[s]*i[s].milliseconds);return t}function si(i,e){const t=In(i,e)<0?-1:1;ve.reduceRight((s,n)=>{if(y(e[n]))return s;if(s){const a=e[s]*t,r=i[n][s],o=Math.floor(a/r);e[n]+=o*t,e[s]-=o*r*t}return n},null),ve.reduce((s,n)=>{if(y(e[n]))return s;if(s){const a=e[s]%1;e[s]-=a,e[n]+=a*i[s][n]}return n},null)}function Yr(i){const e={};for(const[t,s]of Object.entries(i))s!==0&&(e[t]=s);return e}class k{constructor(e){const t=e.conversionAccuracy==="longterm"||!1;let s=t?Br:Zr;e.matrix&&(s=e.matrix),this.values=e.values,this.loc=e.loc||j.create(),this.conversionAccuracy=t?"longterm":"casual",this.invalid=e.invalid||null,this.matrix=s,this.isLuxonDuration=!0}static fromMillis(e,t){return k.fromObject({milliseconds:e},t)}static fromObject(e,t={}){if(e==null||typeof e!="object")throw new F(`Duration.fromObject: argument expected to be an object, got ${e===null?"null":typeof e}`);return new k({values:$t(e,k.normalizeUnit),loc:j.fromObject(t),conversionAccuracy:t.conversionAccuracy,matrix:t.matrix})}static fromDurationLike(e){if(ye(e))return k.fromMillis(e);if(k.isDuration(e))return e;if(typeof e=="object")return k.fromObject(e);throw new F(`Unknown duration argument ${e} of type ${typeof e}`)}static fromISO(e,t){const[s]=Pr(e);return s?k.fromObject(s,t):k.invalid("unparsable",`the input "${e}" can't be parsed as ISO 8601`)}static fromISOTime(e,t){const[s]=Ur(e);return s?k.fromObject(s,t):k.invalid("unparsable",`the input "${e}" can't be parsed as ISO 8601`)}static invalid(e,t=null){if(!e)throw new F("need to specify a reason the Duration is invalid");const s=e instanceof J?e:new J(e,t);if(x.throwOnInvalid)throw new ka(s);return new k({invalid:s})}static normalizeUnit(e){const t={year:"years",years:"years",quarter:"quarters",quarters:"quarters",month:"months",months:"months",week:"weeks",weeks:"weeks",day:"days",days:"days",hour:"hours",hours:"hours",minute:"minutes",minutes:"minutes",second:"seconds",seconds:"seconds",millisecond:"milliseconds",milliseconds:"milliseconds"}[e&&e.toLowerCase()];if(!t)throw new Ui(e);return t}static isDuration(e){return e&&e.isLuxonDuration||!1}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}toFormat(e,t={}){const s={...t,floor:t.round!==!1&&t.floor!==!1};return this.isValid?N.create(this.loc,s).formatDurationFromString(this,e):ti}toHuman(e={}){if(!this.isValid)return ti;const t=ve.map(s=>{const n=this.values[s];return y(n)?null:this.loc.numberFormatter({style:"unit",unitDisplay:"long",...e,unit:s.slice(0,-1)}).format(n)}).filter(s=>s);return this.loc.listFormatter({type:"conjunction",style:e.listStyle||"narrow",...e}).format(t)}toObject(){return this.isValid?{...this.values}:{}}toISO(){if(!this.isValid)return null;let e="P";return this.years!==0&&(e+=this.years+"Y"),(this.months!==0||this.quarters!==0)&&(e+=this.months+this.quarters*3+"M"),this.weeks!==0&&(e+=this.weeks+"W"),this.days!==0&&(e+=this.days+"D"),(this.hours!==0||this.minutes!==0||this.seconds!==0||this.milliseconds!==0)&&(e+="T"),this.hours!==0&&(e+=this.hours+"H"),this.minutes!==0&&(e+=this.minutes+"M"),(this.seconds!==0||this.milliseconds!==0)&&(e+=vs(this.seconds+this.milliseconds/1e3,3)+"S"),e==="P"&&(e+="T0S"),e}toISOTime(e={}){if(!this.isValid)return null;const t=this.toMillis();return t<0||t>=864e5?null:(e={suppressMilliseconds:!1,suppressSeconds:!1,includePrefix:!1,format:"extended",...e,includeOffset:!1},v.fromMillis(t,{zone:"UTC"}).toISOTime(e))}toJSON(){return this.toISO()}toString(){return this.toISO()}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Duration { values: ${JSON.stringify(this.values)} }`:`Duration { Invalid, reason: ${this.invalidReason} }`}toMillis(){return this.isValid?In(this.matrix,this.values):NaN}valueOf(){return this.toMillis()}plus(e){if(!this.isValid)return this;const t=k.fromDurationLike(e),s={};for(const n of ve)(Ie(t.values,n)||Ie(this.values,n))&&(s[n]=t.get(n)+this.get(n));return ae(this,{values:s},!0)}minus(e){if(!this.isValid)return this;const t=k.fromDurationLike(e);return this.plus(t.negate())}mapUnits(e){if(!this.isValid)return this;const t={};for(const s of Object.keys(this.values))t[s]=vn(e(this.values[s],s));return ae(this,{values:t},!0)}get(e){return this[k.normalizeUnit(e)]}set(e){if(!this.isValid)return this;const t={...this.values,...$t(e,k.normalizeUnit)};return ae(this,{values:t})}reconfigure({locale:e,numberingSystem:t,conversionAccuracy:s,matrix:n}={}){const r={loc:this.loc.clone({locale:e,numberingSystem:t}),matrix:n,conversionAccuracy:s};return ae(this,r)}as(e){return this.isValid?this.shiftTo(e).get(e):NaN}normalize(){if(!this.isValid)return this;const e=this.toObject();return si(this.matrix,e),ae(this,{values:e},!0)}rescale(){if(!this.isValid)return this;const e=Yr(this.normalize().shiftToAll().toObject());return ae(this,{values:e},!0)}shiftTo(...e){if(!this.isValid)return this;if(e.length===0)return this;e=e.map(r=>k.normalizeUnit(r));const t={},s={},n=this.toObject();let a;for(const r of ve)if(e.indexOf(r)>=0){a=r;let o=0;for(const d in s)o+=this.matrix[d][r]*s[d],s[d]=0;ye(n[r])&&(o+=n[r]);const l=Math.trunc(o);t[r]=l,s[r]=(o*1e3-l*1e3)/1e3}else ye(n[r])&&(s[r]=n[r]);for(const r in s)s[r]!==0&&(t[a]+=r===a?s[r]:s[r]/this.matrix[a][r]);return si(this.matrix,t),ae(this,{values:t},!0)}shiftToAll(){return this.isValid?this.shiftTo("years","months","weeks","days","hours","minutes","seconds","milliseconds"):this}negate(){if(!this.isValid)return this;const e={};for(const t of Object.keys(this.values))e[t]=this.values[t]===0?0:-this.values[t];return ae(this,{values:e},!0)}get years(){return this.isValid?this.values.years||0:NaN}get quarters(){return this.isValid?this.values.quarters||0:NaN}get months(){return this.isValid?this.values.months||0:NaN}get weeks(){return this.isValid?this.values.weeks||0:NaN}get days(){return this.isValid?this.values.days||0:NaN}get hours(){return this.isValid?this.values.hours||0:NaN}get minutes(){return this.isValid?this.values.minutes||0:NaN}get seconds(){return this.isValid?this.values.seconds||0:NaN}get milliseconds(){return this.isValid?this.values.milliseconds||0:NaN}get isValid(){return this.invalid===null}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}equals(e){if(!this.isValid||!e.isValid||!this.loc.equals(e.loc))return!1;function t(s,n){return s===void 0||s===0?n===void 0||n===0:s===n}for(const s of ve)if(!t(this.values[s],e.values[s]))return!1;return!0}}const _e="Invalid Interval";function Jr(i,e){return!i||!i.isValid?E.invalid("missing or invalid start"):!e||!e.isValid?E.invalid("missing or invalid end"):e<i?E.invalid("end before start",`The end of an interval must be after its start, but you had start=${i.toISO()} and end=${e.toISO()}`):null}class E{constructor(e){this.s=e.start,this.e=e.end,this.invalid=e.invalid||null,this.isLuxonInterval=!0}static invalid(e,t=null){if(!e)throw new F("need to specify a reason the Interval is invalid");const s=e instanceof J?e:new J(e,t);if(x.throwOnInvalid)throw new $a(s);return new E({invalid:s})}static fromDateTimes(e,t){const s=We(e),n=We(t),a=Jr(s,n);return a??new E({start:s,end:n})}static after(e,t){const s=k.fromDurationLike(t),n=We(e);return E.fromDateTimes(n,n.plus(s))}static before(e,t){const s=k.fromDurationLike(t),n=We(e);return E.fromDateTimes(n.minus(s),n)}static fromISO(e,t){const[s,n]=(e||"").split("/",2);if(s&&n){let a,r;try{a=v.fromISO(s,t),r=a.isValid}catch{r=!1}let o,l;try{o=v.fromISO(n,t),l=o.isValid}catch{l=!1}if(r&&l)return E.fromDateTimes(a,o);if(r){const d=k.fromISO(n,t);if(d.isValid)return E.after(a,d)}else if(l){const d=k.fromISO(s,t);if(d.isValid)return E.before(o,d)}}return E.invalid("unparsable",`the input "${e}" can't be parsed as ISO 8601`)}static isInterval(e){return e&&e.isLuxonInterval||!1}get start(){return this.isValid?this.s:null}get end(){return this.isValid?this.e:null}get isValid(){return this.invalidReason===null}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}length(e="milliseconds"){return this.isValid?this.toDuration(e).get(e):NaN}count(e="milliseconds",t){if(!this.isValid)return NaN;const s=this.start.startOf(e,t);let n;return t!=null&&t.useLocaleWeeks?n=this.end.reconfigure({locale:s.locale}):n=this.end,n=n.startOf(e,t),Math.floor(n.diff(s,e).get(e))+(n.valueOf()!==this.end.valueOf())}hasSame(e){return this.isValid?this.isEmpty()||this.e.minus(1).hasSame(this.s,e):!1}isEmpty(){return this.s.valueOf()===this.e.valueOf()}isAfter(e){return this.isValid?this.s>e:!1}isBefore(e){return this.isValid?this.e<=e:!1}contains(e){return this.isValid?this.s<=e&&this.e>e:!1}set({start:e,end:t}={}){return this.isValid?E.fromDateTimes(e||this.s,t||this.e):this}splitAt(...e){if(!this.isValid)return[];const t=e.map(We).filter(r=>this.contains(r)).sort((r,o)=>r.toMillis()-o.toMillis()),s=[];let{s:n}=this,a=0;for(;n<this.e;){const r=t[a]||this.e,o=+r>+this.e?this.e:r;s.push(E.fromDateTimes(n,o)),n=o,a+=1}return s}splitBy(e){const t=k.fromDurationLike(e);if(!this.isValid||!t.isValid||t.as("milliseconds")===0)return[];let{s}=this,n=1,a;const r=[];for(;s<this.e;){const o=this.start.plus(t.mapUnits(l=>l*n));a=+o>+this.e?this.e:o,r.push(E.fromDateTimes(s,a)),s=a,n+=1}return r}divideEqually(e){return this.isValid?this.splitBy(this.length()/e).slice(0,e):[]}overlaps(e){return this.e>e.s&&this.s<e.e}abutsStart(e){return this.isValid?+this.e==+e.s:!1}abutsEnd(e){return this.isValid?+e.e==+this.s:!1}engulfs(e){return this.isValid?this.s<=e.s&&this.e>=e.e:!1}equals(e){return!this.isValid||!e.isValid?!1:this.s.equals(e.s)&&this.e.equals(e.e)}intersection(e){if(!this.isValid)return this;const t=this.s>e.s?this.s:e.s,s=this.e<e.e?this.e:e.e;return t>=s?null:E.fromDateTimes(t,s)}union(e){if(!this.isValid)return this;const t=this.s<e.s?this.s:e.s,s=this.e>e.e?this.e:e.e;return E.fromDateTimes(t,s)}static merge(e){const[t,s]=e.sort((n,a)=>n.s-a.s).reduce(([n,a],r)=>a?a.overlaps(r)||a.abutsStart(r)?[n,a.union(r)]:[n.concat([a]),r]:[n,r],[[],null]);return s&&t.push(s),t}static xor(e){let t=null,s=0;const n=[],a=e.map(l=>[{time:l.s,type:"s"},{time:l.e,type:"e"}]),r=Array.prototype.concat(...a),o=r.sort((l,d)=>l.time-d.time);for(const l of o)s+=l.type==="s"?1:-1,s===1?t=l.time:(t&&+t!=+l.time&&n.push(E.fromDateTimes(t,l.time)),t=null);return E.merge(n)}difference(...e){return E.xor([this].concat(e)).map(t=>this.intersection(t)).filter(t=>t&&!t.isEmpty())}toString(){return this.isValid?`[${this.s.toISO()} – ${this.e.toISO()})`:_e}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`:`Interval { Invalid, reason: ${this.invalidReason} }`}toLocaleString(e=bt,t={}){return this.isValid?N.create(this.s.loc.clone(t),e).formatInterval(this):_e}toISO(e){return this.isValid?`${this.s.toISO(e)}/${this.e.toISO(e)}`:_e}toISODate(){return this.isValid?`${this.s.toISODate()}/${this.e.toISODate()}`:_e}toISOTime(e){return this.isValid?`${this.s.toISOTime(e)}/${this.e.toISOTime(e)}`:_e}toFormat(e,{separator:t=" – "}={}){return this.isValid?`${this.s.toFormat(e)}${t}${this.e.toFormat(e)}`:_e}toDuration(e,t){return this.isValid?this.e.diff(this.s,e,t):k.invalid(this.invalidReason)}mapEndpoints(e){return E.fromDateTimes(e(this.s),e(this.e))}}class ot{static hasDST(e=x.defaultZone){const t=v.now().setZone(e).set({month:12});return!e.isUniversal&&t.offset!==t.set({month:6}).offset}static isValidIANAZone(e){return ee.isValidZone(e)}static normalizeZone(e){return le(e,x.defaultZone)}static getStartOfWeek({locale:e=null,locObj:t=null}={}){return(t||j.create(e)).getStartOfWeek()}static getMinimumDaysInFirstWeek({locale:e=null,locObj:t=null}={}){return(t||j.create(e)).getMinDaysInFirstWeek()}static getWeekendWeekdays({locale:e=null,locObj:t=null}={}){return(t||j.create(e)).getWeekendDays().slice()}static months(e="long",{locale:t=null,numberingSystem:s=null,locObj:n=null,outputCalendar:a="gregory"}={}){return(n||j.create(t,s,a)).months(e)}static monthsFormat(e="long",{locale:t=null,numberingSystem:s=null,locObj:n=null,outputCalendar:a="gregory"}={}){return(n||j.create(t,s,a)).months(e,!0)}static weekdays(e="long",{locale:t=null,numberingSystem:s=null,locObj:n=null}={}){return(n||j.create(t,s,null)).weekdays(e)}static weekdaysFormat(e="long",{locale:t=null,numberingSystem:s=null,locObj:n=null}={}){return(n||j.create(t,s,null)).weekdays(e,!0)}static meridiems({locale:e=null}={}){return j.create(e).meridiems()}static eras(e="short",{locale:t=null}={}){return j.create(t,null,"gregory").eras(e)}static features(){return{relative:mn(),localeWeek:fn()}}}function ii(i,e){const t=n=>n.toUTC(0,{keepLocalTime:!0}).startOf("day").valueOf(),s=t(e)-t(i);return Math.floor(k.fromMillis(s).as("days"))}function Kr(i,e,t){const s=[["years",(l,d)=>d.year-l.year],["quarters",(l,d)=>d.quarter-l.quarter+(d.year-l.year)*4],["months",(l,d)=>d.month-l.month+(d.year-l.year)*12],["weeks",(l,d)=>{const u=ii(l,d);return(u-u%7)/7}],["days",ii]],n={},a=i;let r,o;for(const[l,d]of s)t.indexOf(l)>=0&&(r=l,n[l]=d(i,e),o=a.plus(n),o>e?(n[l]--,i=a.plus(n),i>e&&(o=i,n[l]--,i=a.plus(n))):i=o);return[i,n,o,r]}function Qr(i,e,t,s){let[n,a,r,o]=Kr(i,e,t);const l=e-n,d=t.filter(p=>["hours","minutes","seconds","milliseconds"].indexOf(p)>=0);d.length===0&&(r<e&&(r=n.plus({[o]:1})),r!==n&&(a[o]=(a[o]||0)+l/(r-n)));const u=k.fromObject(a,s);return d.length>0?k.fromMillis(l,s).shiftTo(...d).plus(u):u}const $s={arab:"[٠-٩]",arabext:"[۰-۹]",bali:"[᭐-᭙]",beng:"[০-৯]",deva:"[०-९]",fullwide:"[０-９]",gujr:"[૦-૯]",hanidec:"[〇|一|二|三|四|五|六|七|八|九]",khmr:"[០-៩]",knda:"[೦-೯]",laoo:"[໐-໙]",limb:"[᥆-᥏]",mlym:"[൦-൯]",mong:"[᠐-᠙]",mymr:"[၀-၉]",orya:"[୦-୯]",tamldec:"[௦-௯]",telu:"[౦-౯]",thai:"[๐-๙]",tibt:"[༠-༩]",latn:"\\d"},ni={arab:[1632,1641],arabext:[1776,1785],bali:[6992,7001],beng:[2534,2543],deva:[2406,2415],fullwide:[65296,65303],gujr:[2790,2799],khmr:[6112,6121],knda:[3302,3311],laoo:[3792,3801],limb:[6470,6479],mlym:[3430,3439],mong:[6160,6169],mymr:[4160,4169],orya:[2918,2927],tamldec:[3046,3055],telu:[3174,3183],thai:[3664,3673],tibt:[3872,3881]},Xr=$s.hanidec.replace(/[\[|\]]/g,"").split("");function eo(i){let e=parseInt(i,10);if(isNaN(e)){e="";for(let t=0;t<i.length;t++){const s=i.charCodeAt(t);if(i[t].search($s.hanidec)!==-1)e+=Xr.indexOf(i[t]);else for(const n in ni){const[a,r]=ni[n];s>=a&&s<=r&&(e+=s-a)}}return parseInt(e,10)}else return e}function B({numberingSystem:i},e=""){return new RegExp(`${$s[i||"latn"]}${e}`)}const to="missing Intl.DateTimeFormat.formatToParts support";function _(i,e=t=>t){return{regex:i,deser:([t])=>e(eo(t))}}const so=String.fromCharCode(160),Dn=`[ ${so}]`,zn=new RegExp(Dn,"g");function io(i){return i.replace(/\./g,"\\.?").replace(zn,Dn)}function ai(i){return i.replace(/\./g,"").replace(zn," ").toLowerCase()}function G(i,e){return i===null?null:{regex:RegExp(i.map(io).join("|")),deser:([t])=>i.findIndex(s=>ai(t)===ai(s))+e}}function ri(i,e){return{regex:i,deser:([,t,s])=>Mt(t,s),groups:e}}function lt(i){return{regex:i,deser:([e])=>e}}function no(i){return i.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function ao(i,e){const t=B(e),s=B(e,"{2}"),n=B(e,"{3}"),a=B(e,"{4}"),r=B(e,"{6}"),o=B(e,"{1,2}"),l=B(e,"{1,3}"),d=B(e,"{1,6}"),u=B(e,"{1,9}"),p=B(e,"{2,4}"),g=B(e,"{4,6}"),m=T=>({regex:RegExp(no(T.val)),deser:([Q])=>Q,literal:!0}),O=(T=>{if(i.literal)return m(T);switch(T.val){case"G":return G(e.eras("short"),0);case"GG":return G(e.eras("long"),0);case"y":return _(d);case"yy":return _(p,ls);case"yyyy":return _(a);case"yyyyy":return _(g);case"yyyyyy":return _(r);case"M":return _(o);case"MM":return _(s);case"MMM":return G(e.months("short",!0),1);case"MMMM":return G(e.months("long",!0),1);case"L":return _(o);case"LL":return _(s);case"LLL":return G(e.months("short",!1),1);case"LLLL":return G(e.months("long",!1),1);case"d":return _(o);case"dd":return _(s);case"o":return _(l);case"ooo":return _(n);case"HH":return _(s);case"H":return _(o);case"hh":return _(s);case"h":return _(o);case"mm":return _(s);case"m":return _(o);case"q":return _(o);case"qq":return _(s);case"s":return _(o);case"ss":return _(s);case"S":return _(l);case"SSS":return _(n);case"u":return lt(u);case"uu":return lt(o);case"uuu":return _(t);case"a":return G(e.meridiems(),0);case"kkkk":return _(a);case"kk":return _(p,ls);case"W":return _(o);case"WW":return _(s);case"E":case"c":return _(t);case"EEE":return G(e.weekdays("short",!1),1);case"EEEE":return G(e.weekdays("long",!1),1);case"ccc":return G(e.weekdays("short",!0),1);case"cccc":return G(e.weekdays("long",!0),1);case"Z":case"ZZ":return ri(new RegExp(`([+-]${o.source})(?::(${s.source}))?`),2);case"ZZZ":return ri(new RegExp(`([+-]${o.source})(${s.source})?`),2);case"z":return lt(/[a-z_+-/]{1,256}?/i);case" ":return lt(/[^\S\n\r]/);default:return m(T)}})(i)||{invalidReason:to};return O.token=i,O}const ro={year:{"2-digit":"yy",numeric:"yyyyy"},month:{numeric:"M","2-digit":"MM",short:"MMM",long:"MMMM"},day:{numeric:"d","2-digit":"dd"},weekday:{short:"EEE",long:"EEEE"},dayperiod:"a",dayPeriod:"a",hour12:{numeric:"h","2-digit":"hh"},hour24:{numeric:"H","2-digit":"HH"},minute:{numeric:"m","2-digit":"mm"},second:{numeric:"s","2-digit":"ss"},timeZoneName:{long:"ZZZZZ",short:"ZZZ"}};function oo(i,e,t){const{type:s,value:n}=i;if(s==="literal"){const l=/^\s+$/.test(n);return{literal:!l,val:l?" ":n}}const a=e[s];let r=s;s==="hour"&&(e.hour12!=null?r=e.hour12?"hour12":"hour24":e.hourCycle!=null?e.hourCycle==="h11"||e.hourCycle==="h12"?r="hour12":r="hour24":r=t.hour12?"hour12":"hour24");let o=ro[r];if(typeof o=="object"&&(o=o[a]),o)return{literal:!1,val:o}}function lo(i){return[`^${i.map(t=>t.regex).reduce((t,s)=>`${t}(${s.source})`,"")}$`,i]}function co(i,e,t){const s=i.match(e);if(s){const n={};let a=1;for(const r in t)if(Ie(t,r)){const o=t[r],l=o.groups?o.groups+1:1;!o.literal&&o.token&&(n[o.token.val[0]]=o.deser(s.slice(a,a+l))),a+=l}return[s,n]}else return[s,{}]}function ho(i){const e=a=>{switch(a){case"S":return"millisecond";case"s":return"second";case"m":return"minute";case"h":case"H":return"hour";case"d":return"day";case"o":return"ordinal";case"L":case"M":return"month";case"y":return"year";case"E":case"c":return"weekday";case"W":return"weekNumber";case"k":return"weekYear";case"q":return"quarter";default:return null}};let t=null,s;return y(i.z)||(t=ee.create(i.z)),y(i.Z)||(t||(t=new L(i.Z)),s=i.Z),y(i.q)||(i.M=(i.q-1)*3+1),y(i.h)||(i.h<12&&i.a===1?i.h+=12:i.h===12&&i.a===0&&(i.h=0)),i.G===0&&i.y&&(i.y=-i.y),y(i.u)||(i.S=gs(i.u)),[Object.keys(i).reduce((a,r)=>{const o=e(r);return o&&(a[o]=i[r]),a},{}),t,s]}let Bt=null;function uo(){return Bt||(Bt=v.fromMillis(1555555555555)),Bt}function po(i,e){if(i.literal)return i;const t=N.macroTokenToFormatOpts(i.val),s=Ln(t,e);return s==null||s.includes(void 0)?i:s}function An(i,e){return Array.prototype.concat(...i.map(t=>po(t,e)))}function Nn(i,e,t){const s=An(N.parseFormat(t),i),n=s.map(r=>ao(r,i)),a=n.find(r=>r.invalidReason);if(a)return{input:e,tokens:s,invalidReason:a.invalidReason};{const[r,o]=lo(n),l=RegExp(r,"i"),[d,u]=co(e,l,o),[p,g,m]=u?ho(u):[null,null,void 0];if(Ie(u,"a")&&Ie(u,"H"))throw new je("Can't include meridiem when specifying 24-hour format");return{input:e,tokens:s,regex:l,rawMatches:d,matches:u,result:p,zone:g,specificOffset:m}}}function mo(i,e,t){const{result:s,zone:n,specificOffset:a,invalidReason:r}=Nn(i,e,t);return[s,n,a,r]}function Ln(i,e){if(!i)return null;const s=N.create(e,i).dtFormatter(uo()),n=s.formatToParts(),a=s.resolvedOptions();return n.map(r=>oo(r,i,a))}const Gt="Invalid DateTime",oi=864e13;function ct(i){return new J("unsupported zone",`the zone "${i.name}" is not supported`)}function Yt(i){return i.weekData===null&&(i.weekData=yt(i.c)),i.weekData}function Jt(i){return i.localWeekData===null&&(i.localWeekData=yt(i.c,i.loc.getMinDaysInFirstWeek(),i.loc.getStartOfWeek())),i.localWeekData}function me(i,e){const t={ts:i.ts,zone:i.zone,c:i.c,o:i.o,loc:i.loc,invalid:i.invalid};return new v({...t,...e,old:t})}function Rn(i,e,t){let s=i-e*60*1e3;const n=t.offset(s);if(e===n)return[s,e];s-=(n-e)*60*1e3;const a=t.offset(s);return n===a?[s,n]:[i-Math.min(n,a)*60*1e3,Math.max(n,a)]}function dt(i,e){i+=e*60*1e3;const t=new Date(i);return{year:t.getUTCFullYear(),month:t.getUTCMonth()+1,day:t.getUTCDate(),hour:t.getUTCHours(),minute:t.getUTCMinutes(),second:t.getUTCSeconds(),millisecond:t.getUTCMilliseconds()}}function mt(i,e,t){return Rn(Tt(i),e,t)}function li(i,e){const t=i.o,s=i.c.year+Math.trunc(e.years),n=i.c.month+Math.trunc(e.months)+Math.trunc(e.quarters)*3,a={...i.c,year:s,month:n,day:Math.min(i.c.day,wt(s,n))+Math.trunc(e.days)+Math.trunc(e.weeks)*7},r=k.fromObject({years:e.years-Math.trunc(e.years),quarters:e.quarters-Math.trunc(e.quarters),months:e.months-Math.trunc(e.months),weeks:e.weeks-Math.trunc(e.weeks),days:e.days-Math.trunc(e.days),hours:e.hours,minutes:e.minutes,seconds:e.seconds,milliseconds:e.milliseconds}).as("milliseconds"),o=Tt(a);let[l,d]=Rn(o,t,i.zone);return r!==0&&(l+=r,d=i.zone.offset(l)),{ts:l,o:d}}function Ue(i,e,t,s,n,a){const{setZone:r,zone:o}=t;if(i&&Object.keys(i).length!==0||e){const l=e||o,d=v.fromObject(i,{...t,zone:l,specificOffset:a});return r?d:d.setZone(o)}else return v.invalid(new J("unparsable",`the input "${n}" can't be parsed as ${s}`))}function ht(i,e,t=!0){return i.isValid?N.create(j.create("en-US"),{allowZ:t,forceSimple:!0}).formatDateTimeFromString(i,e):null}function Kt(i,e){const t=i.c.year>9999||i.c.year<0;let s="";return t&&i.c.year>=0&&(s+="+"),s+=M(i.c.year,t?6:4),e?(s+="-",s+=M(i.c.month),s+="-",s+=M(i.c.day)):(s+=M(i.c.month),s+=M(i.c.day)),s}function ci(i,e,t,s,n,a){let r=M(i.c.hour);return e?(r+=":",r+=M(i.c.minute),(i.c.millisecond!==0||i.c.second!==0||!t)&&(r+=":")):r+=M(i.c.minute),(i.c.millisecond!==0||i.c.second!==0||!t)&&(r+=M(i.c.second),(i.c.millisecond!==0||!s)&&(r+=".",r+=M(i.c.millisecond,3))),n&&(i.isOffsetFixed&&i.offset===0&&!a?r+="Z":i.o<0?(r+="-",r+=M(Math.trunc(-i.o/60)),r+=":",r+=M(Math.trunc(-i.o%60))):(r+="+",r+=M(Math.trunc(i.o/60)),r+=":",r+=M(Math.trunc(i.o%60)))),a&&(r+="["+i.zone.ianaName+"]"),r}const Pn={month:1,day:1,hour:0,minute:0,second:0,millisecond:0},fo={weekNumber:1,weekday:1,hour:0,minute:0,second:0,millisecond:0},go={ordinal:1,hour:0,minute:0,second:0,millisecond:0},Fn=["year","month","day","hour","minute","second","millisecond"],vo=["weekYear","weekNumber","weekday","hour","minute","second","millisecond"],bo=["year","ordinal","hour","minute","second","millisecond"];function yo(i){const e={year:"year",years:"year",month:"month",months:"month",day:"day",days:"day",hour:"hour",hours:"hour",minute:"minute",minutes:"minute",quarter:"quarter",quarters:"quarter",second:"second",seconds:"second",millisecond:"millisecond",milliseconds:"millisecond",weekday:"weekday",weekdays:"weekday",weeknumber:"weekNumber",weeksnumber:"weekNumber",weeknumbers:"weekNumber",weekyear:"weekYear",weekyears:"weekYear",ordinal:"ordinal"}[i.toLowerCase()];if(!e)throw new Ui(i);return e}function di(i){switch(i.toLowerCase()){case"localweekday":case"localweekdays":return"localWeekday";case"localweeknumber":case"localweeknumbers":return"localWeekNumber";case"localweekyear":case"localweekyears":return"localWeekYear";default:return yo(i)}}function hi(i,e){const t=le(e.zone,x.defaultZone),s=j.fromObject(e),n=x.now();let a,r;if(y(i.year))a=n;else{for(const d of Fn)y(i[d])&&(i[d]=Pn[d]);const o=un(i)||pn(i);if(o)return v.invalid(o);const l=t.offset(n);[a,r]=mt(i,l,t)}return new v({ts:a,zone:t,loc:s,o:r})}function ui(i,e,t){const s=y(t.round)?!0:t.round,n=(r,o)=>(r=vs(r,s||t.calendary?0:2,!0),e.loc.clone(t).relFormatter(t).format(r,o)),a=r=>t.calendary?e.hasSame(i,r)?0:e.startOf(r).diff(i.startOf(r),r).get(r):e.diff(i,r).get(r);if(t.unit)return n(a(t.unit),t.unit);for(const r of t.units){const o=a(r);if(Math.abs(o)>=1)return n(o,r)}return n(i>e?-0:0,t.units[t.units.length-1])}function pi(i){let e={},t;return i.length>0&&typeof i[i.length-1]=="object"?(e=i[i.length-1],t=Array.from(i).slice(0,i.length-1)):t=Array.from(i),[e,t]}class v{constructor(e){const t=e.zone||x.defaultZone;let s=e.invalid||(Number.isNaN(e.ts)?new J("invalid input"):null)||(t.isValid?null:ct(t));this.ts=y(e.ts)?x.now():e.ts;let n=null,a=null;if(!s)if(e.old&&e.old.ts===this.ts&&e.old.zone.equals(t))[n,a]=[e.old.c,e.old.o];else{const o=t.offset(this.ts);n=dt(this.ts,o),s=Number.isNaN(n.year)?new J("invalid input"):null,n=s?null:n,a=s?null:o}this._zone=t,this.loc=e.loc||j.create(),this.invalid=s,this.weekData=null,this.localWeekData=null,this.c=n,this.o=a,this.isLuxonDateTime=!0}static now(){return new v({})}static local(){const[e,t]=pi(arguments),[s,n,a,r,o,l,d]=t;return hi({year:s,month:n,day:a,hour:r,minute:o,second:l,millisecond:d},e)}static utc(){const[e,t]=pi(arguments),[s,n,a,r,o,l,d]=t;return e.zone=L.utcInstance,hi({year:s,month:n,day:a,hour:r,minute:o,second:l,millisecond:d},e)}static fromJSDate(e,t={}){const s=Ba(e)?e.valueOf():NaN;if(Number.isNaN(s))return v.invalid("invalid input");const n=le(t.zone,x.defaultZone);return n.isValid?new v({ts:s,zone:n,loc:j.fromObject(t)}):v.invalid(ct(n))}static fromMillis(e,t={}){if(ye(e))return e<-oi||e>oi?v.invalid("Timestamp out of range"):new v({ts:e,zone:le(t.zone,x.defaultZone),loc:j.fromObject(t)});throw new F(`fromMillis requires a numerical input, but received a ${typeof e} with value ${e}`)}static fromSeconds(e,t={}){if(ye(e))return new v({ts:e*1e3,zone:le(t.zone,x.defaultZone),loc:j.fromObject(t)});throw new F("fromSeconds requires a numerical input")}static fromObject(e,t={}){e=e||{};const s=le(t.zone,x.defaultZone);if(!s.isValid)return v.invalid(ct(s));const n=j.fromObject(t),a=$t(e,di),{minDaysInFirstWeek:r,startOfWeek:o}=Js(a,n),l=x.now(),d=y(t.specificOffset)?s.offset(l):t.specificOffset,u=!y(a.ordinal),p=!y(a.year),g=!y(a.month)||!y(a.day),m=p||g,b=a.weekYear||a.weekNumber;if((m||u)&&b)throw new je("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(g&&u)throw new je("Can't mix ordinal dates with month/day");const O=b||a.weekday&&!m;let T,Q,se=dt(l,d);O?(T=vo,Q=fo,se=yt(se,r,o)):u?(T=bo,Q=go,se=Zt(se)):(T=Fn,Q=Pn);let _s=!1;for(const Re of T){const Kn=a[Re];y(Kn)?_s?a[Re]=Q[Re]:a[Re]=se[Re]:_s=!0}const Bn=O?Va(a,r,o):u?Ha(a):un(a),Ss=Bn||pn(a);if(Ss)return v.invalid(Ss);const Gn=O?Gs(a,r,o):u?Ys(a):a,[Yn,Jn]=mt(Gn,d,s),zt=new v({ts:Yn,zone:s,o:Jn,loc:n});return a.weekday&&m&&e.weekday!==zt.weekday?v.invalid("mismatched weekday",`you can't specify both a weekday of ${a.weekday} and a date of ${zt.toISO()}`):zt}static fromISO(e,t={}){const[s,n]=Nr(e);return Ue(s,n,t,"ISO 8601",e)}static fromRFC2822(e,t={}){const[s,n]=Lr(e);return Ue(s,n,t,"RFC 2822",e)}static fromHTTP(e,t={}){const[s,n]=Rr(e);return Ue(s,n,t,"HTTP",t)}static fromFormat(e,t,s={}){if(y(e)||y(t))throw new F("fromFormat requires an input string and a format");const{locale:n=null,numberingSystem:a=null}=s,r=j.fromOpts({locale:n,numberingSystem:a,defaultToEN:!0}),[o,l,d,u]=mo(r,e,t);return u?v.invalid(u):Ue(o,l,s,`format ${t}`,e,d)}static fromString(e,t,s={}){return v.fromFormat(e,t,s)}static fromSQL(e,t={}){const[s,n]=Hr(e);return Ue(s,n,t,"SQL",e)}static invalid(e,t=null){if(!e)throw new F("need to specify a reason the DateTime is invalid");const s=e instanceof J?e:new J(e,t);if(x.throwOnInvalid)throw new wa(s);return new v({invalid:s})}static isDateTime(e){return e&&e.isLuxonDateTime||!1}static parseFormatForOpts(e,t={}){const s=Ln(e,j.fromObject(t));return s?s.map(n=>n?n.val:null).join(""):null}static expandFormat(e,t={}){return An(N.parseFormat(e),j.fromObject(t)).map(n=>n.val).join("")}get(e){return this[e]}get isValid(){return this.invalid===null}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}get outputCalendar(){return this.isValid?this.loc.outputCalendar:null}get zone(){return this._zone}get zoneName(){return this.isValid?this.zone.name:null}get year(){return this.isValid?this.c.year:NaN}get quarter(){return this.isValid?Math.ceil(this.c.month/3):NaN}get month(){return this.isValid?this.c.month:NaN}get day(){return this.isValid?this.c.day:NaN}get hour(){return this.isValid?this.c.hour:NaN}get minute(){return this.isValid?this.c.minute:NaN}get second(){return this.isValid?this.c.second:NaN}get millisecond(){return this.isValid?this.c.millisecond:NaN}get weekYear(){return this.isValid?Yt(this).weekYear:NaN}get weekNumber(){return this.isValid?Yt(this).weekNumber:NaN}get weekday(){return this.isValid?Yt(this).weekday:NaN}get isWeekend(){return this.isValid&&this.loc.getWeekendDays().includes(this.weekday)}get localWeekday(){return this.isValid?Jt(this).weekday:NaN}get localWeekNumber(){return this.isValid?Jt(this).weekNumber:NaN}get localWeekYear(){return this.isValid?Jt(this).weekYear:NaN}get ordinal(){return this.isValid?Zt(this.c).ordinal:NaN}get monthShort(){return this.isValid?ot.months("short",{locObj:this.loc})[this.month-1]:null}get monthLong(){return this.isValid?ot.months("long",{locObj:this.loc})[this.month-1]:null}get weekdayShort(){return this.isValid?ot.weekdays("short",{locObj:this.loc})[this.weekday-1]:null}get weekdayLong(){return this.isValid?ot.weekdays("long",{locObj:this.loc})[this.weekday-1]:null}get offset(){return this.isValid?+this.o:NaN}get offsetNameShort(){return this.isValid?this.zone.offsetName(this.ts,{format:"short",locale:this.locale}):null}get offsetNameLong(){return this.isValid?this.zone.offsetName(this.ts,{format:"long",locale:this.locale}):null}get isOffsetFixed(){return this.isValid?this.zone.isUniversal:null}get isInDST(){return this.isOffsetFixed?!1:this.offset>this.set({month:1,day:1}).offset||this.offset>this.set({month:5}).offset}getPossibleOffsets(){if(!this.isValid||this.isOffsetFixed)return[this];const e=864e5,t=6e4,s=Tt(this.c),n=this.zone.offset(s-e),a=this.zone.offset(s+e),r=this.zone.offset(s-n*t),o=this.zone.offset(s-a*t);if(r===o)return[this];const l=s-r*t,d=s-o*t,u=dt(l,r),p=dt(d,o);return u.hour===p.hour&&u.minute===p.minute&&u.second===p.second&&u.millisecond===p.millisecond?[me(this,{ts:l}),me(this,{ts:d})]:[this]}get isInLeapYear(){return tt(this.year)}get daysInMonth(){return wt(this.year,this.month)}get daysInYear(){return this.isValid?Ce(this.year):NaN}get weeksInWeekYear(){return this.isValid?Ye(this.weekYear):NaN}get weeksInLocalWeekYear(){return this.isValid?Ye(this.localWeekYear,this.loc.getMinDaysInFirstWeek(),this.loc.getStartOfWeek()):NaN}resolvedLocaleOptions(e={}){const{locale:t,numberingSystem:s,calendar:n}=N.create(this.loc.clone(e),e).resolvedOptions(this);return{locale:t,numberingSystem:s,outputCalendar:n}}toUTC(e=0,t={}){return this.setZone(L.instance(e),t)}toLocal(){return this.setZone(x.defaultZone)}setZone(e,{keepLocalTime:t=!1,keepCalendarTime:s=!1}={}){if(e=le(e,x.defaultZone),e.equals(this.zone))return this;if(e.isValid){let n=this.ts;if(t||s){const a=e.offset(this.ts),r=this.toObject();[n]=mt(r,a,e)}return me(this,{ts:n,zone:e})}else return v.invalid(ct(e))}reconfigure({locale:e,numberingSystem:t,outputCalendar:s}={}){const n=this.loc.clone({locale:e,numberingSystem:t,outputCalendar:s});return me(this,{loc:n})}setLocale(e){return this.reconfigure({locale:e})}set(e){if(!this.isValid)return this;const t=$t(e,di),{minDaysInFirstWeek:s,startOfWeek:n}=Js(t,this.loc),a=!y(t.weekYear)||!y(t.weekNumber)||!y(t.weekday),r=!y(t.ordinal),o=!y(t.year),l=!y(t.month)||!y(t.day),d=o||l,u=t.weekYear||t.weekNumber;if((d||r)&&u)throw new je("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(l&&r)throw new je("Can't mix ordinal dates with month/day");let p;a?p=Gs({...yt(this.c,s,n),...t},s,n):y(t.ordinal)?(p={...this.toObject(),...t},y(t.day)&&(p.day=Math.min(wt(p.year,p.month),p.day))):p=Ys({...Zt(this.c),...t});const[g,m]=mt(p,this.o,this.zone);return me(this,{ts:g,o:m})}plus(e){if(!this.isValid)return this;const t=k.fromDurationLike(e);return me(this,li(this,t))}minus(e){if(!this.isValid)return this;const t=k.fromDurationLike(e).negate();return me(this,li(this,t))}startOf(e,{useLocaleWeeks:t=!1}={}){if(!this.isValid)return this;const s={},n=k.normalizeUnit(e);switch(n){case"years":s.month=1;case"quarters":case"months":s.day=1;case"weeks":case"days":s.hour=0;case"hours":s.minute=0;case"minutes":s.second=0;case"seconds":s.millisecond=0;break}if(n==="weeks")if(t){const a=this.loc.getStartOfWeek(),{weekday:r}=this;r<a&&(s.weekNumber=this.weekNumber-1),s.weekday=a}else s.weekday=1;if(n==="quarters"){const a=Math.ceil(this.month/3);s.month=(a-1)*3+1}return this.set(s)}endOf(e,t){return this.isValid?this.plus({[e]:1}).startOf(e,t).minus(1):this}toFormat(e,t={}){return this.isValid?N.create(this.loc.redefaultToEN(t)).formatDateTimeFromString(this,e):Gt}toLocaleString(e=bt,t={}){return this.isValid?N.create(this.loc.clone(t),e).formatDateTime(this):Gt}toLocaleParts(e={}){return this.isValid?N.create(this.loc.clone(e),e).formatDateTimeParts(this):[]}toISO({format:e="extended",suppressSeconds:t=!1,suppressMilliseconds:s=!1,includeOffset:n=!0,extendedZone:a=!1}={}){if(!this.isValid)return null;const r=e==="extended";let o=Kt(this,r);return o+="T",o+=ci(this,r,t,s,n,a),o}toISODate({format:e="extended"}={}){return this.isValid?Kt(this,e==="extended"):null}toISOWeekDate(){return ht(this,"kkkk-'W'WW-c")}toISOTime({suppressMilliseconds:e=!1,suppressSeconds:t=!1,includeOffset:s=!0,includePrefix:n=!1,extendedZone:a=!1,format:r="extended"}={}){return this.isValid?(n?"T":"")+ci(this,r==="extended",t,e,s,a):null}toRFC2822(){return ht(this,"EEE, dd LLL yyyy HH:mm:ss ZZZ",!1)}toHTTP(){return ht(this.toUTC(),"EEE, dd LLL yyyy HH:mm:ss 'GMT'")}toSQLDate(){return this.isValid?Kt(this,!0):null}toSQLTime({includeOffset:e=!0,includeZone:t=!1,includeOffsetSpace:s=!0}={}){let n="HH:mm:ss.SSS";return(t||e)&&(s&&(n+=" "),t?n+="z":e&&(n+="ZZ")),ht(this,n,!0)}toSQL(e={}){return this.isValid?`${this.toSQLDate()} ${this.toSQLTime(e)}`:null}toString(){return this.isValid?this.toISO():Gt}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`:`DateTime { Invalid, reason: ${this.invalidReason} }`}valueOf(){return this.toMillis()}toMillis(){return this.isValid?this.ts:NaN}toSeconds(){return this.isValid?this.ts/1e3:NaN}toUnixInteger(){return this.isValid?Math.floor(this.ts/1e3):NaN}toJSON(){return this.toISO()}toBSON(){return this.toJSDate()}toObject(e={}){if(!this.isValid)return{};const t={...this.c};return e.includeConfig&&(t.outputCalendar=this.outputCalendar,t.numberingSystem=this.loc.numberingSystem,t.locale=this.loc.locale),t}toJSDate(){return new Date(this.isValid?this.ts:NaN)}diff(e,t="milliseconds",s={}){if(!this.isValid||!e.isValid)return k.invalid("created by diffing an invalid DateTime");const n={locale:this.locale,numberingSystem:this.numberingSystem,...s},a=Ga(t).map(k.normalizeUnit),r=e.valueOf()>this.valueOf(),o=r?this:e,l=r?e:this,d=Qr(o,l,a,n);return r?d.negate():d}diffNow(e="milliseconds",t={}){return this.diff(v.now(),e,t)}until(e){return this.isValid?E.fromDateTimes(this,e):this}hasSame(e,t,s){if(!this.isValid)return!1;const n=e.valueOf(),a=this.setZone(e.zone,{keepLocalTime:!0});return a.startOf(t,s)<=n&&n<=a.endOf(t,s)}equals(e){return this.isValid&&e.isValid&&this.valueOf()===e.valueOf()&&this.zone.equals(e.zone)&&this.loc.equals(e.loc)}toRelative(e={}){if(!this.isValid)return null;const t=e.base||v.fromObject({},{zone:this.zone}),s=e.padding?this<t?-e.padding:e.padding:0;let n=["years","months","days","hours","minutes","seconds"],a=e.unit;return Array.isArray(e.unit)&&(n=e.unit,a=void 0),ui(t,this.plus(s),{...e,numeric:"always",units:n,unit:a})}toRelativeCalendar(e={}){return this.isValid?ui(e.base||v.fromObject({},{zone:this.zone}),this,{...e,numeric:"auto",units:["years","months","days"],calendary:!0}):null}static min(...e){if(!e.every(v.isDateTime))throw new F("min requires all arguments be DateTimes");return Ks(e,t=>t.valueOf(),Math.min)}static max(...e){if(!e.every(v.isDateTime))throw new F("max requires all arguments be DateTimes");return Ks(e,t=>t.valueOf(),Math.max)}static fromFormatExplain(e,t,s={}){const{locale:n=null,numberingSystem:a=null}=s,r=j.fromOpts({locale:n,numberingSystem:a,defaultToEN:!0});return Nn(r,e,t)}static fromStringExplain(e,t,s={}){return v.fromFormatExplain(e,t,s)}static get DATE_SHORT(){return bt}static get DATE_MED(){return Wi}static get DATE_MED_WITH_WEEKDAY(){return _a}static get DATE_FULL(){return qi}static get DATE_HUGE(){return Vi}static get TIME_SIMPLE(){return Hi}static get TIME_WITH_SECONDS(){return Zi}static get TIME_WITH_SHORT_OFFSET(){return Bi}static get TIME_WITH_LONG_OFFSET(){return Gi}static get TIME_24_SIMPLE(){return Yi}static get TIME_24_WITH_SECONDS(){return Ji}static get TIME_24_WITH_SHORT_OFFSET(){return Ki}static get TIME_24_WITH_LONG_OFFSET(){return Qi}static get DATETIME_SHORT(){return Xi}static get DATETIME_SHORT_WITH_SECONDS(){return en}static get DATETIME_MED(){return tn}static get DATETIME_MED_WITH_SECONDS(){return sn}static get DATETIME_MED_WITH_WEEKDAY(){return Sa}static get DATETIME_FULL(){return nn}static get DATETIME_FULL_WITH_SECONDS(){return an}static get DATETIME_HUGE(){return rn}static get DATETIME_HUGE_WITH_SECONDS(){return on}}function We(i){if(v.isDateTime(i))return i;if(i&&i.valueOf&&ye(i.valueOf()))return v.fromJSDate(i);if(i&&typeof i=="object")return v.fromObject(i);throw new F(`Unknown datetime argument: ${i}, of type ${typeof i}`)}class wo extends ${static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},invitecode:{type:String},loading:{type:Boolean,attribute:!1},errorMessage:{type:String,attribute:!1},copyFeedback:{type:String,attribute:!1},training:{type:Object,attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.t={},this.training={},this.loading=!1,this.errorMessage="",this.copyFeedback="",this.url=""}connectedCallback(){super.connectedCallback();const e=new URL(location.href);if(!this.invitecode){const t=e.searchParams.get("joinKey");this.invitecode=t}this.url=jsObject.site_url+`/app/plan_invite${this.invitecode!==""?"?code="+this.invitecode:""}`,this.loading=!0,makeRequest("GET",`plan/${this.invitecode}`,{},"zume_system/v1").then(t=>{if(t.error_code){this.errorMessage=this.t.broken_link;return}this.training=t,this.errorMessage=""}).fail(t=>{console.error(t),this.errorMessage=this.t.broken_link}).always(()=>{this.loading=!1})}getNextSession(){if(Object.keys(this.training).length===0)return;const{set_type:e}=this.training,t=this.numberOfSessions(e.key),s=v.now();for(let n=1;n<t+1;n++){const a=n<10?`0${n}`:`${n}`,r=this.training[e.key+"_"+a];if(r&&v.fromSeconds(r.timestamp)>s)return v.fromSeconds(r.timestamp).toISODate()}return""}numberOfSessions(e){switch(e){case"set_a":return 10;case"set_b":return 20;case"set_c":return 5}}getInviteText(){const e=this.getNextSession(),t=this.t.note.replace("%s",this.training.post_author_display_name),s=this.training.location_note,n=this.training.time_of_day_note?`, ${this.training.time_of_day_note}`:"",a=this.training.timezone_note?`, ${this.training.timezone_note}`:"";return`${t}

${this.t.location}: ${s}
${this.t.time}: ${e!==""?v.fromISO(e).toFormat("DDDD")+n+a:""}

${this.t.join_url}
${this.url}

${this.t.join_key}: ${this.training.join_key}
${this.training.zoom_link_note?`
${this.training.zoom_link_note}
`:""}`}copyInvite(){const e=this.getInviteText();navigator.clipboard&&navigator.clipboard.writeText(e).then(()=>{this.copyFeedback=this.t.copy_feedback,setTimeout(()=>{this.copyFeedback=""},3e3)})}render(){const e=this.getInviteText();return c`
            <div class="center stack">
                <span class="z-icon-share brand-light f-7"></span>
                <h2>${this.t.title}</h2>
                <p>${this.t.share_with_friends}</p>

                ${this.loading?c`<span class="loading-spinner active"></span>`:""}
                ${!this.loading&&this.errorMessage!==""?c`<span class="banner warning">${this.errorMessage}</span>`:""}
                ${!this.loading&&this.errorMessage===""?c`
                        <textarea class="input" rows="9">${e}</textarea>
                        ${navigator.clipboard?c`
                                <div class="position-relative">
                                    <button class="btn light uppercase mx-auto fit-content" @click=${this.copyInvite}>${this.t.copy_invite}</button>
                                    <p role="alert" aria-live="polite" id="copyFeedback" class="context-alert" data-state=${this.copyFeedback.length?"":"empty"}>${this.copyFeedback}</p>
                                </div>
                            `:""}

                        <share-links url=${this.url} title="${this.t.join_my_plan}" .t=${this.t} alwaysShow ></share-links>
                    `:""}
            </div>
        `}createRenderRoot(){return this}}window.customElements.define("invite-friends",wo);class $o extends ${static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.showTrainings=!1,this.loading=!1}firstUpdated(){const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.loading=!1,this.showTrainings=!0;return}const t=e.searchParams.get("code");this.connectToPlan(t)}connectToPlan(e){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait,this.code=e,makeRequest("POST","connect/public-plan",{code:e},"zume_system/v1").then(t=>{this.message=this.t.success.replace("%s",t.name);const s=new URL(location.href);s.searchParams.set("joinKey",e),window.history.pushState(null,null,s.href),this._sendDoneStepEvent()}).fail(({responseJSON:t})=>{console.log(t),this.message="",t.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}_handleChosenTraining(e){console.log(e);const{code:t}=e.detail;this.showTrainings=!1,this.connectToPlan(t)}render(){return c`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            ${this.showTrainings?c`
                <public-trainings .t=${this.t} @chosen-training=${this._handleChosenTraining}></public-trainings>
            `:""}
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("join-training",$o);class ko extends ${static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object}}}render(){return c`
            <div class="stack w-100">
                <h2>${this.t.join_community}</h2>
                <p>These are all the things that you get when you join</p> <!-- @todo content for this panel -->
                <ul role="list">
                    <li>lots of good things</li>
                    <li>and more</li>
                </ul>
            </div>
        `}createRenderRoot(){return this}}customElements.define("join-community",ko);class _o extends ${static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1;return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","connect/plan",{code:t},"zume_system/v1").then(s=>{console.log(s),this.message=this.t.success.replace("%s",s.name);const n=new URL(location.href);n.searchParams.set("joinKey",t),window.history.pushState(null,null,n.href),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return c`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("join-friends-training",_o);class So extends ${static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},selectedDays:{type:Array,attribute:!1},completedSteps:{type:Array,attribute:!1},calendarStart:{type:String,attribute:!1},calendarEnd:{type:String,attribute:!1},calendarView:{type:String,attribute:!1},scheduleView:{type:String,attribute:!1},errorMessage:{type:String,attribute:!1},message:{type:String,attribute:!1},loading:{type:Boolean,attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.state={},this.errorMessage="",this.message="",this.loading=!1,this.stateManager=new cs(z.makePlan),this.stateManager.clear(),this.trainingSchedule=[],this.selectedDays=[],this.completedSteps=[],this.calendarStart=v.now().startOf("month").toISODate(),this.calendarEnd=v.now().plus({month:2}).endOf("month").toISODate(),this.calendarView="all",this.scheduleView="calendar"}willUpdate(e){const t={[h.howManySessions]:"10",[h.scheduleDecision]:"yes",[h.howOften]:"weekly",[h.location]:"",[h.startDate]:{date:v.now().toISODate()}};if(e.has("variant")){if(this.state=this.stateManager.get(this.variant)||t[this.variant],this.variant===h.howOften||this.variant===h.startDate){const s=this.stateManager.get(h.scheduleDecision);(this.isIntensive()||s==="no")&&this._sendDoneStepEvent()}this.variant===h.review&&this._buildSelectedDays(),this.variant===h.review&&this.isIntensive()&&(this.scheduleView="list")}}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}_handlePlanDecision(e){const t=e.target.dataset.decision;let s="";switch(t){case"make":s=w.makeAGroup;break;case"join":s=w.joinATraining;break}this._sendLoadWizardEvent(s)}_sendLoadWizardEvent(e,t={}){const s={wizard:e};Object.keys(t).length>0&&(s.queryParams=t),this.dispatchEvent(new CustomEvent("wizard:load",{bubbles:!0,detail:s}))}_handleDone(e){e&&e.preventDefault(),this.completedSteps.includes(this.variant)||(this.completedSteps=[...this.completedSteps,this.variant]),this.variant===h.scheduleDecision&&this.state==="no"&&(this.completedSteps=this.completedSteps.filter(t=>t!==h.howOften&&t!==h.startDate)),this._saveState(),this._sendDoneStepEvent()}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_gotoStep(e){const t=new CustomEvent("wizard:goto-step",{bubbles:!0,detail:{slug:e}});this.dispatchEvent(t)}_handleSelection(e){const t=e.target.dataset.value;this.state=t,this._saveState()}_saveState(){this.stateManager.add(this.variant,this.state)}_handleChange(e){e.target.type==="text"&&(this.state=e.target.value),["date","time"].includes(e.target.type)&&(this.state={...this.state,[e.target.name]:e.target.value}),this.stateManager.add(this.variant,this.state)}_buildSelectedDays(){var n;const e=this.stateManager.get(h.howManySessions),t=this.stateManager.get(h.howOften),s=(n=this.stateManager.get(h.startDate))==null?void 0:n.date;if(!(this.selectedDays.length>0)&&e&&t&&s){let a=0;t==="weekly"&&(a=1),t==="biweekly"&&(a=2),t==="monthly"&&(a=4);const r=[],o=v.fromISO(s);for(let l=1;l<Number(e)+1;l++)r.push({date:o.plus({weeks:a*(l-1)}).toISODate(),id:this.createId()});this.selectedDays=r,this.calendarStart=v.fromISO(o).startOf("month").toISODate(),this.calendarEnd=v.fromISO(r[r.length-1].date).endOf("month").toISODate(),this.calendarView="all"}}_buildSet(e){var l;const t=this.stateManager.get(h.howManySessions),s=(l=this.stateManager.get(h.startDate))==null?void 0:l.time,a={location_note:this.stateManager.get(h.location)||"",time_of_day_note:s||""};let r="";t==="10"&&(r="set_a_"),t==="20"&&(r="set_b_"),t==="5"&&(r="set_c_");const o=e.sort(this.sortDays);for(let d=1;d<Number(t)+1;d++){const u=d<10?`0${d}`:`${d}`;let p;d-1<o.length?p=v.fromISO(o[d-1].date).toSeconds():p="",a[r+u]=p}return a}sortDays(e,t){return e.date===t.date?0:e.date<t.date?-1:1}_handleCreate(){if(this.loading)return;this.loading=!0;const e=this.stateManager.get(h.howManySessions),t=this.stateManager.get(h.scheduleDecision),s=this.stateManager.get(h.name);let n="";switch(e){case"10":n="set_a";break;case"20":n="set_b";break;case"5":n="set_c";break}if(t==="yes"&&this.selectedDays.length!==Number(e)){this.errorMessage=this.t.incorrect_number_of_sessions,setTimeout(()=>{this.errorMessage=""},3e3);return}const a={user_id:jsObject.profile.user_id,contact_id:jsObject.profile.contact_id,title:s||this.t.my_first_training+" - "+jsObject.profile.name,set_type:n,set:this._buildSet(this.selectedDays)};makeRequest("POST","plan",a,"zume_system/v1").then(r=>{this._handleFinish(r.join_key)}).fail(r=>{console.log(r)}).always(()=>{this.loading=!1})}_handleFinish(e){this._sendLoadWizardEvent(w.inviteFriends,{joinKey:e})}isIntensive(){return this.stateManager.get(h.howManySessions)==="5"}toggleView(){this.scheduleView==="calendar"?this.scheduleView="list":this.scheduleView="calendar"}createId(){return sha256(Math.random(0,1e4)).slice(0,6)}addDate(e){const{date:t}=e.detail,s={date:t,id:this.createId()};this.selectedDays=[...this.selectedDays,s]}removeDate(e){const{id:t}=e.detail;console.log(t);const s=this.selectedDays.findIndex(n=>t===n.id);s>-1&&(this.selectedDays=[...this.selectedDays.slice(0,s),...this.selectedDays.slice(s+1)])}updateCalendarEnd(e){const{newEndDate:t}=e.detail;this.calendarEnd=t}_clearCalendar(){this.selectedDays=[]}render(){var a,r;const e=Number(this.stateManager.get(h.howManySessions)),t=this.stateManager.get(h.scheduleDecision);let s="",n="";return this.selectedDays.length<e&&(s=this.t.x_of_total_selected.replace("%1$s",this.selectedDays.length).replace("%2$s",e),n="var(--z-brand-light)"),this.selectedDays.length===e&&(s=this.t.all_selected.replace("%s",e),n="var(--z-success)"),this.selectedDays.length>e&&(s=this.t.too_many_selected.replace("%s",this.selectedDays.length-e),n="var(--z-error-main)"),c`
            <div class="stack-1 position-relative">
                ${this.variant===h.planDecision?c`
                    <div class="stack">
                        <span class="z-icon-start-group brand-light f-7"></span>
                        <h2>${this.t.join_or_start_a_training}</h2>
                        <div class="stack" data-fit-content>
                            <button class="btn tight light" data-decision="make" @click=${this._handlePlanDecision}>${this.t.start_a_training}</button>
                            <button class="btn tight light" data-decision="join" @click=${this._handlePlanDecision}>${this.t.join_a_public_training}</button>
                            <button class="btn tight light outline" data-decision="skip" @click=${this._handlePlanDecision}>${this.t.skip_for_now}</button>
                        </div>
                    </div>
                `:""}
                ${this.variant===h.howManySessions?c`
                    <div class="stack">
                        <span class="z-icon-session-choice brand-light f-7"></span>
                        <h2>${this.t.question_which_session}</h2>
                        <div class="stack" data-fit-content>
                            <button class="btn tight green ${this.state==="20"?"":"outline"}" data-value="20" @click=${this._handleSelection}>${this.t.hour_1_session_20}</button>
                            <button class="btn tight green ${this.state==="10"?"":"outline"}" data-value="10" @click=${this._handleSelection}>${this.t.hour_2_session_10}</button>
                            <button class="btn tight green ${this.state==="5"?"":"outline"}" data-value="5" @click=${this._handleSelection}>${this.t.hour_4_session_5}</button>
                            <button class="btn tight light mt-2" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                `:""}
                ${this.variant===h.scheduleDecision?c`
                    <div class="stack">
                        <span class="z-icon-session-choice brand-light f-7"></span>
                        <h2>${this.t.question_schedule_training}</h2>
                        <div class="stack" data-fit-content>
                            <button class="btn tight green ${this.state==="yes"?"":"outline"}" data-value="yes" @click=${this._handleSelection}>${this.t.yes}</button>
                            <button class="btn tight green ${this.state==="no"?"":"outline"}" data-value="no" @click=${this._handleSelection}>${this.t.no}</button>
                            <button class="btn tight light mt-2" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                `:""}
                ${this.variant===h.howOften?c`
                    <div class="stack">
                        <span class="z-icon-time brand-light f-7"></span>
                        <h2>${this.t.question_how_often}</h2>
                        <div class="stack" data-fit-content>
                            <button class="btn tight green ${this.state==="weekly"?"":"outline"}" data-value="weekly" @click=${this._handleSelection}>${this.t.weekly}</button>
                            <button class="btn tight green ${this.state==="biweekly"?"":"outline"}" data-value="biweekly" @click=${this._handleSelection}>${this.t.biweekly}</button>
                            <button class="btn tight green ${this.state==="other"?"":"outline"}" data-value="other" @click=${this._handleSelection}>${this.t.other}</button>
                            <button class="btn tight light mt-2" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                `:""}
                ${this.variant===h.startDate?c`
                    <div class="stack">
                        <span class="z-icon-start-date brand-light f-7"></span>
                        <h2>${this.t.question_when_will_you_start}</h2>
                        <div class="cluster justify-content-center gapy-0">
                            <input type="date" name="date" class="fit-content m0" @change=${this._handleChange} value=${this.state.date} onclick="this.showPicker()" >
                            ${this.state.date?c`
                                    <input type="time" name="time" class="fit-content m0" @change=${this._handleChange} value=${this.state.time} min="00:00" max="23:55" step="300" onclick="this.showPicker()" />
                                `:""}
                        </div>
                        <div class="stack" data-fit-content>
                            <button class="btn light fit-content mx-auto" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                `:""}
                ${this.variant===h.location?c`
                    <div class="stack">
                        <span class="z-icon-start-date brand-light f-7"></span>
                        <h2>${this.t.question_where_will_you_meet}</h2>
                        <p>${this.t.question_where_will_you_meet_help_text}</p>
                        <input type="text" name="location" placeholder=${this.t.location} @change=${this._handleChange} value=${typeof this.state=="string"?this.state:""} />
                        <div class="stack" data-fit-content>
                            <button class="btn light fit-content mx-auto" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                `:""}
                ${this.variant===h.name?c`
                    <div class="stack">
                        <span class="z-icon-start-date brand-light f-7"></span>
                        <h2>${this.t.question_what_is_the_groups_name}</h2>
                        <input type="text" name="name" placeholder=${this.t.group_name} @change=${this._handleChange} value=${typeof this.state=="string"?this.state:""} />
                        <div class="stack" data-fit-content>
                            <button class="btn light fit-content mx-auto" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                `:""}
                ${this.variant===h.review?c`
                    <div class="stack">
                        <h2><span class="z-icon-overview brand-light"></span> ${this.t.review_training}</h2>

                        ${t==="yes"?c`
                                    <div class="cluster">
                                        <button
                                            class="btn outline red small tight fit-content"
                                            @click=${this._clearCalendar}
                                        >
                                            ${this.t.clear_calendar}
                                        </button>
                                        <button class="btn outline light small tight ms-auto" @click=${this.toggleView}>${this.scheduleView==="calendar"?"list":"calendar"}</button>
                                    </div>
                                `:""}
                        ${this.scheduleView==="calendar"&&t==="yes"?c`
                                    <calendar-select
                                        style='--primary-color: var(--z-brand-light); --hover-color: var(--z-brand-fade)'
                                        startDate=${this.calendarStart}
                                        endDate=${this.calendarEnd}
                                        .selectedDays=${this.selectedDays.sort(this.sortDays)}
                                        view=${this.calendarView}
                                        showToday
                                        @day-added=${this.addDate}
                                        @day-removed=${this.removeDate}
                                        @calendar-extended=${this.updateCalendarEnd}
                                    ></calendar-select>
                                `:""}
                        ${this.scheduleView==="list"&&t==="yes"?c`
                                    <calendar-list
                                        .t=${this.t}
                                        .selectedDays=${this.selectedDays}
                                        @day-added=${this.addDate}
                                        @day-removed=${this.removeDate}
                                    ></calendar-list>
                                `:""}
                        <div class="make-training__save-area stack" ?data-absolute=${t==="no"}>
                            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
                            <div class="d-flex align-items-center gap-0 bg-white py-0">
                                ${t==="yes"?c`
                                        <div class="grow-1">
                                            <span>${s}</span>
                                            <progress-slider
                                                class="grow-1 mt--3"
                                                percentage=${this.selectedDays.length/e*100}
                                                style="--primary-color: ${n}"
                                            ></progress-slider>
                                        </div>
                                    `:c`<span class="grow-1"></span>`}
                                <button
                                    class="btn tight light ms-auto"
                                    @click=${this._handleCreate}
                                >
                                    ${this.t.create}
                                    <span class="loading-spinner ${this.loading?"active":""}"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                `:""}
                ${this.variant!==h.planDecision?c`
                    <review-steps
                        .t=${this.t}
                        name=${this.stateManager.get(h.name)}
                        howManySessions=${this.stateManager.get(h.howManySessions)}
                        scheduleDecision=${this.stateManager.get(h.scheduleDecision)}
                        howOften=${this.stateManager.get(h.howOften)}
                        time=${(a=this.stateManager.get(h.startDate))==null?void 0:a.time}
                        date=${(r=this.stateManager.get(h.startDate))==null?void 0:r.date}
                        whatLocation=${this.stateManager.get(h.location)}
                        .display=${this.completedSteps}
                    ></review-steps>
                `:""}
            </div>
        `}createRenderRoot(){return this}}customElements.define("make-training",So);class Oo extends ${static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},errorMessage:{attribute:!1},message:{attribute:!1},loading:{attribute:!1},requestSent:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.state={},this.errorMessage="",this.message="",this.loading=!1,this.requestSent=!1,this.contactPreferences=["email","text","phone","whatsapp","signal","telegram","messenger"]}updated(){this.message=this.t.connect_success;const e=this.stateManager.getAll();if(this.variant===h.connectingToCoach&&this.requestSent===!1){this.loading=!0,this.requestSent=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));const t=(n=>{n===!1&&(this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting)),n.coach_request&&n.coach_request.errors&&Object.keys(n.coach_request.errors).length!==0&&Object.keys(n.coach_request.errors)[0]==="already_has_coach"&&(this.message=this.t.already_coached,this.setErrorMessage(this.t.error_connecting)),this._handleFinish()}).bind(this),s=(()=>{this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting),this._handleFinish()}).bind(this);makeRequest("POST","get_a_coach",{data:e},"zume_system/v1/").done(t).fail(s).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}}setErrorMessage(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return this.stateManager||(this.stateManager=new cs(this.module),this.state=this.stateManager.get(this.variant)||{},this.variant===h.languagePreferences&&!this.state.value&&(this.state.value=jsObject.profile.preferred_language||"en",this.stateManager.add(this.variant,this.state)),this.variant===h.contactPreferences&&Object.keys(this.state).length===0&&(this.state=Object.fromEntries(jsObject.profile.contact_preference.map(e=>[e,"true"])))),c`
        <form class="inputs stack-2" @submit=${this._handleDone}>
            ${this.variant===h.contactPreferences?c`
                <h2>${this.t.contact_preference_question}</h2>
                <div class="stack center container-sm | align-items-start text-start">
                    ${this.contactPreferences.map(e=>c`
                        <div>
                            <input type="checkbox" name="contact-preference" id=${"prefer_"+e} value=${e} @change=${this._handleChange} ?checked=${!!this.state[e]} />
                            <label for=${"prefer_"+e}>${this.t[e]}</label>
                        </div>
                    `)}
                </div>
            `:""}

            ${this.variant===h.languagePreferences?c`
                <h2>${this.t.language_preference_question}</h2>
                <div class="stack">
                    <label for="preferred-language">${this.t.language_preference}</label>
                    <select name="preferred-language" id="preferred-language" @change=${this._handleChange} >

                        ${Object.values(jsObject.languages).map(e=>c`
                            <option value=${e.code} ?selected=${e.code===this.state.value} >
                                ${e.nativeName} - ${e.enDisplayName}
                            </option>
                        `)}

                    </select>
                </div>
            `:""}

            ${this.variant===h.howCanWeServe?c`
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
            ${this.variant===h.connectingToCoach?c`

                <h1>${this.t.connecting_coach_title}</h1>
                <p>${this.message}</p>
                <span class="loading-spinner ${this.loading?"active":""}"></span>
            `:""}
            ${this.variant!==h.connectingToCoach?c`
                    <div class="cluster | mx-auto">
                        <span class="loading-spinner ${this.loading?"active":""}"></span>
                        <button type="submit" class="btn tight light" ?disabled=${this.loading}>${this.t.next}</button>
                    </div>
                `:""}
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        </form>
        `}_handleDone(e){if(e&&e.preventDefault(),Object.keys(this.state).length===0){this.setErrorMessage(this.t.missing_response);return}this._sendDoneStepEvent()}_sendDoneStepEvent(){const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)}_handleFinish(){setTimeout(()=>{this._sendDoneStepEvent()},3e3)}_handleChange(e){e.target.type==="checkbox"&&(this.state[e.target.value]=e.target.checked),e.target.type==="text"&&(this.state.value=e.target.value),e.target.type==="select-one"&&(this.state.value=e.target.value),this.stateManager.add(this.variant,this.state)}createRenderRoot(){return this}}customElements.define("request-coach",Oo);class jo extends ${constructor(){super();C(this,"module");C(this,"steps");this.t={},this.display=[]}static get properties(){return{t:{type:Object},name:{type:String},howOften:{type:String},howManySessions:{type:String},scheduleDecision:{type:String},whatLocation:{type:String},date:{type:String},time:{type:String},display:{type:Array}}}connectedCallback(){super.connectedCallback(),this.howOfterDict={weekly:this.t.weekly,biweekly:this.t.biweekly,monthly:this.t.monthly,other:this.t.other},this.howManyDict={20:this.t.hour_1_session_20,10:this.t.hour_2_session_10,5:this.t.hour_4_session_5},this.scheduleDecisionDict={yes:this.t.yes,no:this.t.no}}handleChange(t){const s=t.target.dataset.step;this.dispatchEvent(new CustomEvent("wizard:goto-step",{bubbles:!0,detail:{slug:s}})),window.scrollTo(0,0)}shouldDisplay(){return this.display.length>0}renderSummary(t){switch(t){case h.name:return c`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            ${this.name===""?c`<span></span>`:c`<span>${this.name}</span>`}
                            <span class="d-flex justify-flex-end">
                                <button
                                    class="btn small no-outline light tight"
                                    data-step=${h.name}
                                    @click=${this.handleChange}
                                >
                                    ${this.name!==""?this.t.change:this.t.set_group_name}
                                </button>
                            </span>
                        </div>
                    </div>
                `;case h.location:return c`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            ${this.whatLocation===""?c`<span></span>`:c`<span>${this.whatLocation}</span>`}
                            <span class="d-flex justify-flex-end">
                                <button
                                    class="btn small no-outline light tight"
                                    data-step=${h.location}
                                    @click=${this.handleChange}
                                >
                                    ${this.whatLocation!==""?this.t.change:this.t.set_location}
                                </button>
                            </span>
                        </div>
                    </div>
                `;case h.howManySessions:return c`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            <span>${this.howManyDict[this.howManySessions]||this.howManySessions}</span>
                            <span class="d-flex justify-flex-end grow-0">
                                <button
                                    class="btn small no-outline light tight"
                                    data-step=${h.howManySessions}
                                    @click=${this.handleChange}
                                >
                                    ${this.t.change}
                                </button>
                            </span>
                        </div>
                    </div>
                `;case h.scheduleDecision:return c`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            <span>${this.scheduleDecisionDict[this.scheduleDecision]||this.scheduleDecision}</span>
                            <span class="d-flex justify-flex-end grow-0">
                                <button
                                    class="btn small no-outline light tight"
                                    data-step=${h.scheduleDecision}
                                    @click=${this.handleChange}
                                >
                                    ${this.t.change}
                                </button>
                            </span>
                        </div>
                    </div>
                `;case h.howOften:return c`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            <span>${this.howOfterDict[this.howOften]||this.howOften}</span>
                            <span class="d-flex justify-flex-end grow-0">
                                <button
                                    class="btn small no-outline light tight"
                                    data-step=${h.howOften}
                                    @click=${this.handleChange}
                                >
                                    ${this.t.change}
                                </button>
                            </span>
                        </div>
                    </div>
                `;case h.startDate:return c`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            ${this.date===""&&this.time===""?c`<span></span>`:c`
                                    <span>${new Date(`${this.date} ${this.time==="not-set"?"":this.time}`).toLocaleString(navigator.language||"en-US",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}</span>`}
                            <span class="d-flex justify-flex-end">
                                <button
                                    class="btn small no-outline light tight"
                                    data-step=${h.startDate}
                                    @click=${this.handleChange}
                                >
                                    ${this.date!==""||this.time!==""?this.t.change:this.t.set_start_date}
                                </button>
                            </span>
                        </div>
                    </div>
                `;default:return""}}render(){if(this.shouldDisplay())return c`
            <div class="stack mw-50ch mx-auto text-start mt-2">
                <hr />
                <h5 class="gray-700 text-left f-medium mt-2">${this.t.summary}</h5>
                ${this.display.map(t=>this.renderSummary(t))}
            </div>
        `}createRenderRoot(){return this}}customElements.define("review-steps",jo);class Eo extends ${static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const e=new URL(location.href);if(!e.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));return}const t=e.searchParams.get("code");this.code=t,makeRequest("POST","checkin",{code:t},"zume_system/v1").then(s=>{this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_checkin_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const e=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(e)},2e3)}setErrorMessage(e){console.log(e),this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return c`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("session-checkin",Eo);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Un=Symbol.for(""),Co=i=>{if((i==null?void 0:i.r)===Un)return i==null?void 0:i._$litStatic$},re=(i,...e)=>({_$litStatic$:e.reduce((t,s,n)=>t+(a=>{if(a._$litStatic$!==void 0)return a._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${a}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(s)+i[n+1],i[0]),r:Un}),mi=new Map,xo=i=>(e,...t)=>{const s=t.length;let n,a;const r=[],o=[];let l,d=0,u=!1;for(;d<s;){for(l=e[d];d<s&&(a=t[d],(n=Co(a))!==void 0);)l+=n+e[++d],u=!0;d!==s&&o.push(a),r.push(l),d++}if(d===s&&r.push(e[s]),u){const p=r.join("$$lit$$");(e=mi.get(p))===void 0&&(r.raw=r,mi.set(p,e=r)),t=o}return i(e,...t)},To=xo(c);class Mo extends ${static get properties(){return{type:{type:String},params:{type:Object},finishUrl:{type:String},user:{type:Object},translations:{type:Object},noUrlChange:{type:Boolean},step:{attribute:!1},steps:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.stepIndex=0,this.steps=[],this.step={},this.params={},this.t=window.SHAREDFUNCTIONS.escapeObject(jsObject.translations),this._handleHistoryPopState=this._handleHistoryPopState.bind(this),this._handleLoadWizard=this._handleLoadWizard.bind(this),this._handleGotoStep=this._handleGotoStep.bind(this),this.stateManager=new cs}connectedCallback(){super.connectedCallback(),this.wizard=new aa(this.user),window.addEventListener("popstate",this._handleHistoryPopState),window.addEventListener("wizard:load",this._handleLoadWizard),window.addEventListener("wizard:goto-step",this._handleGotoStep)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._handleHistoryPopState),window.removeEventListener("wizard:load",this._handleLoadWizard),window.removeEventListener("wizard:goto-step",this._handleGotoStep)}firstUpdated(){this._handleHistoryPopState(!0),this.translations&&(this.t=window.SHAREDFUNCTIONS.escapeObject(this.translations))}willUpdate(e){if(e.has("type")&&this.type===""){this.resetWizard();return}if(e.has("type")&&this.type!==""){this.loadWizard(this.type,this.params);return}}loadWizard(e,t={}){let s=e;e===w.makeAGroup&&(jsObject.user_stage.state.plan_created?s=w.makeMoreGroups:s=w.makeFirstGroup),Object.values(w).includes(s)?(this.steps=this.wizard.getSteps(s),this._gotoStep(0,!0,t)):this._onSkip()}resetWizard(){this.wizard&&this.wizard.reset(),this.steps=[],this.step={},this.stepIndex=0}render(){if(this.wizard){if(!this.wizard.isTypeValid(this.type))return c`
                <div class="cover-page">
                    <div class="stack center | text-center">
                        <h1 class="brand">${this.t.bad_wizard}</h1>
                        <p>${this.t.found_bad_wizard}</p>
                        <div class="center"><img class="w-50" src="https://imgs.search.brave.com/3f3MurVApxsoxJlmqxLF0fs5-WlAk6sEu9IV3sICb_k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWR2ZXJ0aXNlY2Fz/dC5jb20vcG9kY2Fz/dC9pbWFnZS9WZXJ5/QmFkV2l6YXJkcw.jpeg" alt="bad wizards" /></div>
                        <a class="btn tight light" href="/">${this.t.home}</a>
                    </div>
                </div>
            `;if(this.wizard.isLoaded())return this.steps.length===0?c`
                <div class="cover-page">
                    <div class="stack center | text-center">
                        <h1 class="brand">${this.t.completed_wizard_title}</h1>
                        <p>${this.t.completed_wizard_text}</p>
                        ${this.finishButton()}
                    </div>
                </div>
            `:c`
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
        `}}containerSize(){return{...this.step},h.joinTraining?"container-md":"container-xsm"}currentStep(){const e={...this.step};let t="",s="";switch(e.slug){case h.updateName:case h.updateLocation:case h.updatePhone:t=re`complete-profile`,s=this.t.complete_profile;break;case h.contactPreferences:case h.languagePreferences:case h.howCanWeServe:case h.connectingToCoach:t=re`request-coach`,s=this.t.get_a_coach;break;case h.inviteFriends:t=re`invite-friends`,s=this.t.share;break;case h.joinTraining:t=re`join-training`,s=this.t.join_training;break;case h.joinFriendsPlan:t=re`join-friend-training`,s=this.t.join_training;break;case h.connectToFriend:t=re`connect-friend`,s=this.t.connect_friend;break;case h.checkinSubmit:t=re`session-checkin`,s=this.t.checkin;break;case h.planDecision:case h.howManySessions:case h.scheduleDecision:case h.howOften:case h.startDate:case h.location:case h.name:case h.review:t=re`make-training`,s=this.t.make_training;break}return To`
            <${t}
                class="w-100"
                name=${e.slug}
                module=${e.module}
                variant=${e.slug}
                ?skippable=${e.skippable}
                .t=${s}
                invitecode=${e.joinKey}
                @done-step=${this._onNext}
                @loadingChange=${this._handleLoading}
                value=${JSON.stringify(e==null?void 0:e.value)}
            ></${t}>
        `}headerButtons(){return c`
            <div class="cluster | inline s-3">
                <button
                    class="close-btn"
                    aria-label=${jsObject.translations.close}
                    type="button"
                    @click=${this._onQuit}
                >
                    <span class="icon z-icon-close"></span>
                </button>
            </div>
        `}finishButton(){return c`
            <div class="text-center d-flex justify-content-between">
                <div class="cluster ms-auto">
                    <button @click=${this._handleFinish} ?disabled=${this.loading} class="btn tight light ${this.loading?"disabled":""}">${this.t.finish}</button>
                </div>
            </div>
        `}stepCounter(){const e=this.steps.length<2;return c`
            <div class="cluster">
                ${this.steps.map((t,s)=>{const n=s<=this.stepIndex;return c`<div class="step-circle ${e?"hidden":""} ${n?"complete":""}"></div>`})}
            </div>
        `}footer(){if(this.noUrlChange&&this.stepIndex>0&&this.type!==w.makeAGroup)return c`
                <button
                    @click=${this._onBack}
                    class="btn tight light outline fit-content"
                >
                    ${this.t.back}
                </button>
            `}_onBack(){if(this.stepIndex>0){const e=this.stepIndex-1;this._gotoStep(e)}}_onNext(){if(this.stepIndex+1<this.steps.length){const e=this.stepIndex+1;this._gotoStep(e)}else this._onFinish()}_onSkip(){const e=this.step.module;for(let t=this.stepIndex+1;t<this.steps.length;t++)if(this.steps[t].module!==e){this._gotoStep(t);return}this._onFinish()}_onQuit(){if(this._isLastStep()){this._onFinish();return}this._onFinish(!0)}_handleFinish(){this._onFinish()}_onFinish(e=!1){if(this.stateManager.clear(),this.resetWizard(),!this.finishUrl){this.dispatchEvent(new CustomEvent("user-state:change",{bubbles:!0})),this.dispatchEvent(new CustomEvent("wizard-finished",{bubbles:!0,detail:{type:this.type}}));return}const t=new URL(this.finishUrl);if(e===!1)if(this.type===w.checkin){const n=new URL(location.href).searchParams.get("code");if(n!==null){const a=new URL(jsObject.checkin_dashboard_url);a.searchParams.set("code",n),window.location.href=a.href;return}}else if([w.makeAGroup,w.makeFirstGroup,w.makeMoreGroups,w.joinATraining,w.joinFriendsPlan,w.inviteFriends].includes(this.type)){const n=new URL(location.href).searchParams.get("joinKey");if(n){const a=new URL(jsObject.training_dashboard_url+"/"+n);window.location.href=a.href;return}}else t.searchParams.set("completed",this.type);window.location.href=t.href}_isLastStep(){return this.stepIndex===this.steps.length-1}_gotoStep(e,t=!0,s={}){if(this.steps.length!==0){if(this.stepIndex=this.clampSteps(e),this.step={...this.steps[this.stepIndex]},t&&!this.noUrlChange){const n=new URL(window.location.href),a=n.pathname.split("/"),r=a[a.length-1];Object.keys(s).length>0&&Object.entries(s).forEach(([l,d])=>{n.searchParams.set(l,d)});let o="";Object.values(w).includes(r)?o=a.join("/")+"/"+this.step.slug+n.search:o=a.slice(0,-1).join("/")+"/"+this.step.slug+n.search,window.history.pushState(null,null,o)}this.noUrlChange&&Object.keys(s).length>0&&Object.entries(s).forEach(([n,a])=>{this.step={...this.step,[n]:a}})}}clampSteps(e){let t=e;return e>this.steps.length-1&&(t=this.steps.length-1),e<0&&(t=0),t}_handleHistoryPopState(e=!1){const s=new URL(window.location.href).pathname.split("/"),n=s[s.length-1];Object.values(w).includes(n)&&this._gotoStep(0,!1);let a="",r=0;this.steps.forEach(({slug:o,module:l},d)=>{if(a!==l&&(a=l,r=d),n===o){if(e===!0&&this.stateManager.isDataStale()){this._gotoStep(r);return}this._gotoStep(d,!1)}})}_handleGotoStep(e){const{slug:t}=e.detail,s=this.steps.findIndex(n=>n.slug===t);this._gotoStep(s)}_handleLoadWizard(e){const{wizard:t,queryParams:s}=e.detail;this.loadWizard(t,s)}_handleLoading(e){const{loading:t}=e.detail;this.loading=t}createRenderRoot(){return this}}window.customElements.define("zume-wizard",Mo);function Io(i){return i?JSON.parse('{"'+i.substring(1).replace(/&/g,'","').replace(/=/g,'":"')+'"}'):{}}function Do(i,e){let t={};const s=i.split("/").filter(a=>a!=""),n=e.split("/").filter(a=>a!="");return s.map((a,r)=>{/^:/.test(a)&&(t[a.substring(1)]=n[r])}),t}function zo(i){return i?new RegExp("^(|/)"+i.replace(/:[^\s/]+/g,"([\\wÀ-ÖØ-öø-ÿ-]+)")+"(|/)$"):new RegExp("(^$|^/$)")}function Ao(i,e){if(zo(e).test(i))return!0}function No(i){return class extends i{static get properties(){return{route:{type:String,reflect:!0,attribute:"route"},canceled:{type:Boolean}}}constructor(...e){super(...e),this.route="",this.canceled=!1}connectedCallback(...e){super.connectedCallback(...e),this.routing(this.constructor.routes,(...t)=>this.router(...t)),window.addEventListener("route",()=>{this.routing(this.constructor.routes,(...t)=>this.router(...t))}),window.onpopstate=()=>{window.dispatchEvent(new CustomEvent("route"))}}routed(e,t,s,n,a,r){r&&r(e,t,s,n),a(e,t,s,n)}routing(e,t){this.canceled=!0;const s=decodeURI(window.location.pathname),n=decodeURI(window.location.search);let a=e.filter(l=>l.pattern==="*")[0],r=e.filter(l=>l.pattern!=="*"&&Ao(s,l.pattern))[0],o=Io(n);r?(r.params=Do(r.pattern,s),r.data=r.data||{},r.authentication&&r.authentication.authenticate&&typeof r.authentication.authenticate=="function"?(this.canceled=!1,Promise.resolve(r.authentication.authenticate.bind(this).call()).then(l=>{this.canceled||(l?r.authorization&&r.authorization.authorize&&typeof r.authorization.authorize=="function"?(this.canceled=!1,Promise.resolve(r.authorization.authorize.bind(this).call()).then(d=>{this.canceled||(d?this.routed(r.name,r.params,o,r.data,t,r.callback):this.routed(r.authorization.unauthorized.name,r.params,o,r.data,t,r.callback))})):this.routed(r.name,r.params,o,r.data,t,r.callback):this.routed(r.authentication.unauthenticated.name,r.params,o,r.data,t,r.callback))})):r.authorization&&r.authorization.authorize&&typeof r.authorization.authorize=="function"?(this.canceled=!1,Promise.resolve(r.authorization.authorize.bind(this).call()).then(l=>{this.canceled||(l?this.routed(r.name,r.params,o,r.data,t,r.callback):this.routed(r.authorization.unauthorized.name,r.params,o,r.data,t,r.callback))})):this.routed(r.name,r.params,o,r.data,t,r.callback)):a&&(a.data=a.data||{},this.routed(a.name,{},o,a.data,t,a.callback))}}}function Wn(i){return class extends i{navigate(e){window.history.pushState({},null,e),window.dispatchEvent(new CustomEvent("route"))}}}function qe(i,e){return(t,s)=>{t.preventDefault(),s(new CustomEvent(e,{bubbles:!0,detail:{type:i}}))}}function fi(){return[{name:"root",pattern:`${jsObject.base_url}`,icon:"",type:"dash-link",translation:"",data:{makeComponent:()=>""}},{name:"getting-started",pattern:`${jsObject.base_url}/getting-started`,icon:"z-icon-start",type:"dash-link",translation:jsObject.translations.getting_started,data:{makeComponent:i=>c`<dash-getting-started></dash-getting-started>`}},{name:"set-profile",pattern:"#",parent:"getting-started",icon:"z-icon-profile",type:"handled-link",clickHandler:qe(w.setProfile,"open-wizard"),translation:jsObject.translations.set_profile,explanation:jsObject.translations.set_profile_explanation,data:{makeComponent:()=>""}},{name:"create-a-training",pattern:"#",parent:"getting-started",icon:"z-icon-start",type:"handled-link",clickHandler:qe(w.makeAGroup,"open-wizard"),translation:jsObject.translations.create_training_group,explanation:jsObject.translations.create_training_group_explanation,data:{makeComponent:()=>""}},{name:"join-a-training",pattern:"#",parent:"getting-started",icon:"z-icon-public-training",type:"handled-link",clickHandler:qe(w.joinATraining,"open-wizard"),translation:jsObject.translations.join_training_group,explanation:jsObject.translations.join_training_group_explanation,data:{makeComponent:()=>""}},{name:"get-a-coach",pattern:"#",parent:"getting-started",icon:"z-icon-coach",type:"handled-link",clickHandler:qe(w.getACoach,"open-wizard"),translation:jsObject.translations.get_a_coach,explanation:jsObject.translations.get_a_coach_explanation,data:{makeComponent:()=>""}},{name:"training",pattern:`${jsObject.base_url}/training`,icon:"z-icon-training",type:"dash-link",translation:jsObject.translations.training,data:{makeComponent:i=>c`<dash-training></dash-training>`}},{name:"my-training",pattern:`${jsObject.base_url}/my-training/:code`,parent:"training",icon:"z-icon-my-training",type:"dash-link",translation:jsObject.translations.my_training,explanation:jsObject.translations.my_training_explanation,data:{makeComponent:i=>c`<dash-trainings ?showTeaser=${i==="teaser"} code=${i}></dash-trainings>`}},{name:"my-progress",pattern:`${jsObject.base_url}/my-progress`,parent:"training",icon:"z-icon-progress",type:"dash-link",translation:jsObject.translations.my_progress,explanation:jsObject.translations.my_progress_explanation,data:{makeComponent:i=>c`<dash-progress ?showTeaser=${i}></dash-progress>`}},{name:"3-month-plan",pattern:`${jsObject.base_url}/3-month-plan`,parent:"training",icon:"z-icon-plans",type:"handled-link",clickHandler:qe("3-month-plan","open-3-month-plan"),translation:jsObject.translations.create_3_month_plan,explanation:jsObject.translations["3_month_plan_explanation"],data:{makeComponent:()=>""}},{name:"practicing",pattern:`${jsObject.base_url}/practicing`,icon:"z-icon-practicing",type:"dash-link",translation:jsObject.translations.practicing,data:{makeComponent:i=>c`<dash-practicing></dash-practicing>`}},{name:"my-coach",pattern:`${jsObject.base_url}/my-coach`,parent:"practicing",icon:"z-icon-coach",type:"dash-link",translation:jsObject.translations.my_coach,explanation:jsObject.translations.my_coach_explanation,data:{makeComponent:i=>c`<dash-coach ?showTeaser=${i}></dash-coach>`}},{name:"my-plans",pattern:`${jsObject.base_url}/my-plans`,parent:"practicing",icon:"z-icon-plans",type:"dash-link",translation:jsObject.translations.my_plans,explanation:jsObject.translations.my_plans_explanation,data:{makeComponent:i=>c`<dash-plans ?showTeaser=${i}></dash-plans>`}},{name:"my-maps",pattern:`${jsObject.base_url}/my-maps`,parent:"practicing",icon:"z-icon-maps",type:"dash-link",translation:jsObject.translations.my_maps,explanation:jsObject.translations.my_maps_explanation,data:{makeComponent:i=>c`<dash-maps ?showTeaser=${i}></dash-maps>`}},{name:"not-found",pattern:"*",icon:"",type:"dash-link",data:{makeComponent:i=>c`<dash-not-found></dash-not-found>`}}]}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gi=(i,e,t)=>{const s=new Map;for(let n=e;n<=t;n++)s.set(i[n],n);return s},te=Ri(class extends Pi{constructor(i){if(super(i),i.type!==fe.CHILD)throw Error("repeat() can only be used in text expressions")}dt(i,e,t){let s;t===void 0?t=e:e!==void 0&&(s=e);const n=[],a=[];let r=0;for(const o of i)n[r]=s?s(o,r):r,a[r]=t(o,r),r++;return{values:a,keys:n}}render(i,e,t){return this.dt(i,e,t).values}update(i,[e,t,s]){var n;const a=ga(i),{values:r,keys:o}=this.dt(e,t,s);if(!Array.isArray(a))return this.ht=o,r;const l=(n=this.ht)!==null&&n!==void 0?n:this.ht=[],d=[];let u,p,g=0,m=a.length-1,b=0,O=r.length-1;for(;g<=m&&b<=O;)if(a[g]===null)g++;else if(a[m]===null)m--;else if(l[g]===o[b])d[b]=ue(a[g],r[b]),g++,b++;else if(l[m]===o[O])d[O]=ue(a[m],r[O]),m--,O--;else if(l[g]===o[O])d[O]=ue(a[g],r[O]),Fe(i,d[O+1],a[g]),g++,O--;else if(l[m]===o[b])d[b]=ue(a[m],r[b]),Fe(i,a[g],a[m]),m--,b++;else if(u===void 0&&(u=gi(o,b,O),p=gi(l,g,m)),u.has(l[g]))if(u.has(l[m])){const T=p.get(o[b]),Q=T!==void 0?a[T]:null;if(Q===null){const se=Fe(i,a[g]);ue(se,r[b]),d[b]=se}else d[b]=ue(Q,r[b]),Fe(i,a[g],Q),a[T]=null;b++}else qt(a[m]),m--;else qt(a[g]),g++;for(;b<=O;){const T=Fe(i,d[O+1]);ue(T,r[b]),d[b++]=T}for(;g<=m;){const T=a[g++];T!==null&&qt(T)}return this.ht=o,Fi(i,d),Y}});class S extends Wn(No($)){static get properties(){return{route:{type:String},params:{type:Object},query:{type:Object},menuOffset:{type:Number,attribute:!1},userProfile:{type:Object,attribute:!1},userState:{type:Object,attribute:!1},trainingGroups:{type:Array,attribute:!1},wizardType:{type:String,attribute:!1},celbrationModalContent:{type:Object,attribute:!1}}}static get routes(){const e={1:"getting-started",2:"training",3:"practicing"},t=jsObject.user_stage.value||1,s=t<4?t:3,n=fi().find(({name:o})=>o===e[s]),{makeComponent:a}=n.data;return fi().map(o=>(o.name==="root"&&(o.data={makeComponent:a}),o))}static getRoute(e){return S.routes.find(s=>s.name===e)}static childRoutesOf(e){return S.routes.filter(({parent:s})=>s===e)}constructor(){super(),this.route="",this.params={},this.query={},this.data={},this.menuOffset=0,this.userProfile=jsObject.profile,this.userState=jsObject.user_stage.state??{},this.trainingGroups=jsObject.training_groups,this.wizardType="",this.celebrationModalContent={title:"",content:[]},this.allCtas=[],this.ctas=[],this.userId=jsObject.profile.user_id,this.showingCelebrationModal=!1,this.languageSelectorElements=document.querySelectorAll(".language-selector"),this.updateUserProfile=this.updateUserProfile.bind(this),this.updateWizardType=this.updateWizardType.bind(this),this.closeWizard=this.closeWizard.bind(this),this.refetchState=this.refetchState.bind(this),this.refetchHost=this.refetchHost.bind(this),this.getCtas=this.getCtas.bind(this),this.getTrainingGroups=this.getTrainingGroups.bind(this),this.showCelebrationModal=this.showCelebrationModal.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("user-profile:change",this.updateUserProfile),window.addEventListener("toggle-dashboard-sidebar",this.toggleSidebar),window.addEventListener("open-wizard",this.updateWizardType),window.addEventListener("wizard-finished",this.closeWizard),window.addEventListener("wizard-finished",this.getCtas),window.addEventListener("wizard-finished",this.getTrainingGroups),window.addEventListener("open-3-month-plan",this.open3MonthPlan),window.addEventListener("user-state:change",this.refetchState),window.addEventListener("user-state:change",this.getCtas),window.addEventListener("user-host:change",this.refetchHost),window.addEventListener("load",this.showCelebrationModal),window.addEventListener("ctas:changed",this.showCelebrationModal),this.addEventListener("route",this.updateLanguageSwitcher)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("user-profile:change",this.updateUserProfile),window.removeEventListener("toggle-dashboard-sidebar",this.toggleSidebar),window.removeEventListener("open-wizard",this.updateWizardType),window.removeEventListener("wizard-finished",this.closeWizard),window.removeEventListener("wizard-finished",this.getCtas),window.removeEventListener("wizard-finished",this.getTrainingGroups),window.removeEventListener("open-3-month-plan",this.open3MonthPlan),window.removeEventListener("user-state:change",this.refetchState),window.removeEventListener("user-state:change",this.getCtas),window.removeEventListener("user-host:change",this.refetchHost),window.removeEventListener("load",this.showCelebrationModal),window.removeEventListener("ctas:changed",this.showCelebrationModal),this.removeEventListener("route",this.updateLanguageSwitcher)}firstUpdated(){this.menuOffset=this.getOffsetTop(".sidebar-wrapper"),this.getCtas();const e=this.renderRoot.querySelector("#celebration-modal");e==null||e.addEventListener("closed.zf.reveal",()=>{this.showingCelebrationModal=!1})}updateWizardType(e){const{type:t,params:s}=e.detail;this.openWizard(t,s)}router(e,t,s,n){this.route=e,this.params=t,this.query=s,this.data=n,this.dispatchEvent(new CustomEvent("route"))}makeHref(e){return`${jsObject.base_url}/${e}`}makeHrefRoute(e){const s=S.routes.find(({name:n})=>n===e);if(!s)return console.error("MISSING ROUTE",e),"";if(e==="my-training"){if(S.getLockedStatus(e,this.userState))return s.pattern.replace(":code","teaser");if(this.numberOfGroups()===1){const r=Object.values(this.trainingGroups)[0].join_key;return s.pattern.replace(":code",r)}}return s.pattern}makeTrainingHref(e){return this.makeHrefRoute("my-training").replace(":code",e)}renderRoute(){const{makeComponent:e}=this.data;if(!e)return"";if(this.route==="my-training"){const s=this.params.code;return e(s)}const t=S.getLockedStatus(this.route,this.userState);return e(t)}getOffsetTop(e){return this.querySelector(e).offsetTop}toggleSidebar(){const e=document.querySelector(".dashboard__sidebar"),t=document.querySelector(".sidebar__trigger-close-background"),s="200";e.style.transitionDuration=s,t.style.transitionDuration=s;const n=e.dataset.state;n==="open"&&(e.dataset.state="closed",t.style.opacity=0,setTimeout(()=>{t.style.visibility="hidden"},s)),(!n||n==="closed")&&(e.dataset.state="open",t.style.opacity="initial",t.style.visibility="visible")}updateLanguageSwitcher(){this.languageSelectorElements.forEach(e=>{const t=e.dataset.url,s=t.indexOf("dashboard"),n=t.slice(0,s+10)+this.route;e.dataset.url=n})}updateUserProfile(e){const t=e.detail;this.userProfile=t}createInitials(e){return typeof e!="string"||e.length===0?"":e.split(" ").map(s=>s.length>0?s[0].toUpperCase():"").slice(0,2).join("")}static getCompletedStatus(e,t){return!!(e==="set-profile"&&t.set_profile_location&&t.set_profile_name||e==="get-a-coach"&&t.requested_a_coach||e==="join-a-training"&&(t.plan_created||t.joined_online_training)||e==="create-a-training"&&(t.plan_created||t.joined_online_training)||e==="3-month-plan"&&t.made_post_training_plan)}static getLockedStatus(e,t){return!!(e==="my-plans"&&!t.made_post_training_plan||["my-churches","my-maps"].includes(e)&&!t.join_community||e==="3-month-plan"&&!t.can_create_3_month_plan||e==="my-training"&&!t.plan_created&&!t.joined_online_training)}isGettingStartedActive(){return S.childRoutesOf("getting-started").some(t=>!S.getCompletedStatus(t.name,this.userState))}getGettingStartedPercentage(){const e=["get-a-coach","set-profile","join-a-training"],t=e.reduce((s,n)=>S.getCompletedStatus(n,this.userState)?s+1:s,0);return Math.round(t/e.length*100)}openWizard(e,t){const s=document.querySelector("#wizard-modal");jQuery(s).foundation("open"),this.wizardType=e,this.wizardParams=t}closeWizard(){this.wizardType="",this.wizardParams="";const e=document.querySelector("#wizard-modal");jQuery(e).foundation("close")}open3MonthPlan(){const e=document.querySelector("#activity-3-month-plan-modal");jQuery(e).foundation("_disableScroll"),jQuery(e).foundation("open")}close3MonthPlan(){const e=document.querySelector("#activity-3-month-plan-modal");jQuery(e).foundation("_enableScroll"),jQuery(e).foundation("close")}handleCreated3MonthPlan(){this.dispatchEvent(new CustomEvent("user-state:change",{bubbles:!0})),this.close3MonthPlan(),this.navigate(this.makeHref("my-plans"))}unlock3MonthPlan(){makeRequest("POST","log",{type:"training",subtype:"26_heard"},"zume_system/v1/").done(e=>{const t=new CustomEvent("user-state:change",{bubbles:!0});this.dispatchEvent(t);const s=new CustomEvent("user-host:change",{bubbles:!0});this.dispatchEvent(s)})}refetchState(){this.getCtas(),makeRequest("GET","user_stage",{},"zume_system/v1").done(e=>{(!e||!e.state)&&console.error("Stage or state data not returned from api"),jsObject.user_stage=e,this.userState=e.state})}refetchHost(){makeRequest("GET","user_host",{},"zume_system/v1").done(e=>{e||console.error("Host not returned from api"),jsObject.host_progress=e})}getCtas(){makeRequest("POST","user_ctas",{user_id:this.userId,language:jsObject.language},"zume_system/v1").done(e=>{const t=Object.values(e);this.allCtas=t;const s=o=>{for(let l=o.length-1;l>0;l--){const d=Math.floor(Math.random()*(l+1));[o[l],o[d]]=[o[d],o[l]]}return o},n=this.allCtas.filter(({content_template:o})=>o==="celebration"),a=this.allCtas.filter(({content_template:o})=>o==="card"),r=[...n,...s(a)];this.allCtas=r,jsObject.allCtas=this.allCtas,this.dispatchEvent(new CustomEvent("ctas:changed",{bubbles:!0}))})}showCelebrationModal(){if(this.showingCelebrationModal)return;const e=this.renderRoot.querySelector("dash-cta"),t=this.allCtas.filter(({content_template:s})=>s==="celebration");if(!e&&t.length>0){this.showingCelebrationModal=!0,t.forEach(({content:{title:a,description:r}})=>{this.celebrationModalContent.title=r,this.celebrationModalContent.content.push(a)}),this.requestUpdate();const s=document.querySelector("#celebration-modal");jQuery(s).foundation("open"),t.forEach(({type:a,subtype:r})=>{makeRequest("POST","log",{type:a,subtype:r},"zume_system/v1")});const n=t.map(({key:a})=>a);jsObject.allCtas=jsObject.allCtas.filter(({key:a})=>!n.includes(a))}}openProfile(){const e=document.querySelector("#profile-modal");jQuery(e).foundation("open")}closeProfile(){const e=document.querySelector("#profile-modal");jQuery(e).foundation("close")}openCommunityModal(e){e.preventDefault();const t=document.querySelector("#community-modal");jQuery(t).foundation("open")}closeCommunityModal(){const e=document.querySelector("#community-modal");jQuery(e).foundation("close")}joinCommunity(){makeRequest("POST","log",{type:"system",subtype:"join_community"},"zume_system/v1/").done(e=>{this.refetchState()})}hasJoinedCommunity(){return!!this.userState.join_community}numberOfGroups(){return Object.keys(this.trainingGroups).length}toggleTrainingGroups(){jQuery(document).foundation(),jQuery("#training-menu").foundation("toggle",jQuery("#training-groups-menu"))}getTrainingGroups(e){const{type:t}=e.detail;[w.makeAGroup,w.makeFirstGroup,w.joinATraining,w.joinFriendsPlan].includes(t)&&makeRequest("GET","plans",{},"zume_system/v1").then(s=>{const n={...this.trainingGroups},a=Object.keys(n);this.trainingGroups=s;const r=Object.keys(this.trainingGroups).filter(o=>!a.includes(o));if(r.length===1){const o=this.trainingGroups[r[0]],l=this.makeTrainingHref(o.join_key);this.navigate(l)}})}render(){return c`
            <div class="sidebar__trigger-close-background" @click=${this.toggleSidebar}></div>
            <div class="dashboard">

                <div class="dashboard__sidebar">
                    <div
                        class="sidebar-wrapper"
                        style="top: ${this.menuOffset}px; height: calc( min( 100%, 100vh ) - ${this.menuOffset}px - var(--s0) );"
                    >
                        <button
                            class="close-btn ms-auto dashboard__sidebar-toggle break-large break-medium"
                            aria-label=${jsObject.translations.close}
                            type="button"
                            @click=${this.toggleSidebar}
                        >
                            <span class="icon z-icon-close"></span>
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
                        <div class="stack-2 | progress-menu">
                            <ul class="accordion-menu" data-accordion-menu data-submenu-toggle="true">
                                <li class="menu-section" data-no-toggle>
                                    <nav-link
                                        href=${this.makeHref("getting-started")}
                                        class="menu-section__title menu-btn"
                                        icon="z-icon-start"
                                        text=${jsObject.translations.getting_started}
                                        as="nav"
                                    >
                                    </nav-link>
                                    ${this.isGettingStartedActive()?c`
                                            <progress-circle percent=${this.getGettingStartedPercentage()} radius="12"></progress-circle>
                                        `:c`<span class="z-icon-check-mark success f-2"></span>`}
                                            <ul class="nested ${this.isGettingStartedActive()?"is-active":""}">
                                                ${S.childRoutesOf("getting-started").map(e=>c`
                                                            <li>
                                                                <nav-link
                                                                    class="menu-btn"
                                                                    href=${this.makeHrefRoute(e.name)}
                                                                    icon=${e.icon}
                                                                    text=${e.translation}
                                                                    as=${e.type==="handled-link"?"button":"navs"}
                                                                    @click=${e.type==="handled-link"?t=>{if(S.getCompletedStatus(e.name,this.userState)){t.preventDefault();return}e.clickHandler(t,this.dispatchEvent)}:null}
                                                                    ?completed=${S.getCompletedStatus(e.name,this.userState)}
                                                                ></nav-link>
                                                                <span class="icon z-icon-check-mark success"></span>
                                                            </li>
                                                        `)}
                                    </ul>
                                </li>
                            </ul>
                            <div class="menu-section">
                                <nav-link
                                    href=${this.makeHref("training")}
                                    class="menu-section__title menu-btn"
                                    icon="z-icon-training"
                                    text=${jsObject.translations.training}
                                    as="nav"
                                >
                                </nav-link>
                                <ul id="training-menu" class="nested accordion-menu menu vertical" data-accordion-menu>
                                    ${S.childRoutesOf("training").map(e=>{const t=S.getLockedStatus(e.name,this.userState),s=S.getCompletedStatus(e.name,this.userState),n=e.type==="handled-link";return e.name==="my-training"&&this.numberOfGroups()>1?c`
                                                        <li>
                                                            <nav-link
                                                                class="menu-btn"
                                                                icon=${e.icon}
                                                                text=${jsObject.translations.my_trainings}
                                                                as="button"
                                                                @click=${this.toggleTrainingGroups}
                                                            ></nav-link>
                                                            <ul id="training-groups-menu" class="menu vertical nested">
                                                                ${te(Object.entries(this.trainingGroups),([a])=>a,([a,r])=>c`
                                                                            <li>
                                                                                <nav-link
                                                                                    class="menu-btn"
                                                                                    text=${r.title}
                                                                                    href=${this.makeTrainingHref(r.join_key)}
                                                                                ></nav-link>
                                                                            </li>
                                                                        `)}
                                                            </ul>
                                                        </li>
                                                    `:c`
                                                <li>
                                                    <nav-link
                                                        class="menu-btn"
                                                        href=${this.makeHrefRoute(e.name)}
                                                        icon=${e.icon}
                                                        text=${e.translation}
                                                        ?locked=${t}
                                                        as=${n?"link":"nav"}
                                                        @click=${n?a=>{if(s){a.preventDefault();return}e.clickHandler(a,this.dispatchEvent)}:null}
                                                        ?completed=${s}
                                                    ></nav-link>
                                                    <span class="icon ${t?"z-icon-locked gray-500":"z-icon-check-mark success"}"></span>
                                                </li>
                                            `})}
                                </ul>
                            </div>
                            <li class="menu-section">
                                <nav-link
                                    href=${this.makeHref("practicing")}
                                    class="menu-section__title menu-btn"
                                    icon="z-icon-practicing"
                                    text=${jsObject.translations.practicing}
                                    as="nav"
                                ></nav-link>
                                <ul class="nested">
                                    ${S.childRoutesOf("practicing").map(e=>c`
                                                <li>
                                                    <nav-link
                                                        class="menu-btn"
                                                        href=${this.makeHrefRoute(e.name)}
                                                        icon=${e.icon}
                                                        text=${e.translation}
                                                        ?locked=${S.getLockedStatus(e.name,this.userState)}
                                                        as="nav"
                                                    ></nav-link>
                                                    <span class="icon z-icon-locked gray-500"></span>
                                                </li>
                                            `)}
                                </ul>
                            </li>
                        </div>
                        <div class="footer-links">
                            ${this.hasJoinedCommunity()?"":c`
                                    <nav-link
                                        class="menu-btn | f--1"
                                        href=''
                                        icon='z-icon-community'
                                        text=${this.hasJoinedCommunity()?jsObject.translations.community:jsObject.translations.join_the_community}
                                        as="link"
                                        @click=${this.openCommunityModal}
                                    ></nav-link>
                                `}
                            <nav-link
                                class="menu-btn | f--1"
                                href=${jsObject.urls.resources}
                                icon='z-icon-resources'
                                text=${jsObject.translations.resources}
                                as="link"
                            ></nav-link>
                        </div>
                    </div>
                </div>

                ${this.renderRoute()}
            </div>
            <div class="stack | reveal tiny card celebration showing | border-none" id="celebration-modal" data-reveal>
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.closeProfile}>
                    <span class="icon z-icon-close"></span>
                </button>
                <h2 class="h5 text-center bold">${this.celebrationModalContent.title}</h2>
                <div class="d-flex align-items-center justify-content-between">
                    <img class="w-30" src="${jsObject.images_url+"/fireworks-2.svg"}" alt="" />
                    <img class="w-40" src="${jsObject.images_url+"/thumbs-up.svg"}" alt="" />
                    <img class="w-30" src="${jsObject.images_url+"/fireworks-2.svg"}" alt="" />
                </div>
                <div class="stack--3">
                    ${this.celebrationModalContent.content.map(e=>c`
                            <p><span class="icon z-icon-check-mark"></span> ${e}</p>
                        `)}
                </div>

            </div>
            <div class="reveal full" id="profile-modal" data-reveal>
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.closeProfile}>
                    <span class="icon z-icon-close"></span>
                </button>
                <div class="container-xsm my-0">
                    <h3>${jsObject.translations.edit_profile}</h3>
                    <profile-form .userProfile=${this.userProfile}></profile-form>
                    <a href=${jsObject.urls.logout} class="btn outline light">${jsObject.translations.logout}</a>
                </div>
            </div>
            <div class="reveal full" id="wizard-modal" data-reveal>
                <zume-wizard
                    type=${this.wizardType}
                    .params=${this.wizardParams}
                    .user=${this.userProfile}
                    .translations=${jsObject.wizard_translations}
                    noUrlChange
                ></zume-wizard>
            </div>
            <div class="reveal full" id="activity-3-month-plan-modal" data-reveal>
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.closeWizard}>
                    <span class="icon z-icon-close"></span>
                </button>
                ${S.getLockedStatus("3-month-plan",this.userState)?c`
                            <div class="container-sm">
                              <div class="dash-menu__list-item">
                                <div class="dash-menu__icon-area | stack--5">
                                  <span class="icon z-icon-progress dash-menu__list-icon"></span>
                                </div>
                                <div class="dash-menu__text-area | switcher | switcher-width-20">
                                  <div>
                                    <h3 class="f-1 bold uppercase">${jsObject.translations.locked_3_month_plan}</h3>
                                    <p>${jsObject.translations.locked_3_month_plan_explanation}</p>
                                  </div>
                                  <button class="dash-menu__view-button btn tight" @click=${this.unlock3MonthPlan}>${jsObject.translations.unlock}</button>
                                </div>
                              </div>
                            </div>
                        `:c`
                        <activity-3-month-plan
                            .questions=${jsObject.three_month_plan_questions}
                            .translations=${{save:jsObject.translations.save,cancel:jsObject.translations.cancel}}
                            user_id=${this.userProfile.user_id}
                            contact_id=${this.userProfile.contact_id}
                            @3-month-plan-saved=${this.handleCreated3MonthPlan}
                            @3-month-plan-cancelled=${this.close3MonthPlan}
                            showCancel
                        ></activity-3-month-plan>
                    `}

            </div>
            <div class="reveal full" id="community-modal" data-reveal>
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.closeCommunityModal}>
                    <span class="icon z-icon-close"></span>
                </button>
                <div class="container">
                    ${this.hasJoinedCommunity()?c`
                            <p>Here is all the community stuff we promised you :)</p>
                        `:c`
                            <div class="container-md stack-2 center | py-2">
                              <h1 class="text-center">${jsObject.translations.community_title}</h1>
                              <p>${jsObject.translations.community_description}</p>
                              <div class="switcher | training-path">
                                <div class="stack | card | switcher-width-40">
                                  <h2 class="f-1 text-center">${jsObject.translations.community_peer_title}</h2>
                                  <img class="mx-auto h-6rem" src="/wp-content/plugins/zume-training-system/site/assets/images/Gather-A-Group-01.svg" alt="Peer Mentoring">
                                  <p class="mb-0">
                                    ${jsObject.translations.community_peer_description}
                                  </p>
                                </div>
                                <div class="stack | card | switcher-width-40">
                                  <h2 class="f-1 text-center">${jsObject.translations.community_encouragement_title}</h2>
                                  <img class="mx-auto h-6rem" src="/wp-content/plugins/zume-training-system/site/assets/images/coach-2guys.svg" alt="Free Tools">
                                  <p class="mb-0">
                                    ${jsObject.translations.community_encouragement_description}
                                  </p>
                                </div>
                                <div class="stack | card | switcher-width-40">
                                  <h2 class="f-1 text-center">${jsObject.translations.community_tools_title}</h2>
                                  <img class="mx-auto h-6rem" src="/wp-content/plugins/zume-training-system/site/assets/images/JoinTraining.svg" alt="Encouragement">
                                  <p class="mb-0">
                                    ${jsObject.translations.community_tools_description}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="container-md center">
                              <button class="btn large" style="text-transform:uppercase;" @click=${this.joinCommunity}>
                                ${jsObject.translations.community_join_free}
                              </button>
                            </div>
                        `}
                </div>

            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-board",S);class de extends ${constructor(){super();const t=document.querySelector("html").dataset.dir;this.isRtl=t==="rtl"}firstUpdated(){this.attachResizeObeserver(),this.updateHeaderStyle(),window.scrollTo({top:0,behavior:"instant"})}attachResizeObeserver(){const e=document.querySelector("dash-header-right"),t=new ResizeObserver(s=>{for(let n of s){if(!n.contentRect)return;const a=Math.round(n.contentRect.height),r=Math.round(n.contentRect.width);this.updateHeaderStyle(!1,a,r)}});this.resizeObserver=t,t.observe(e)}updateHeaderStyle(e=!0,t=0,s=window.innerWidth){const n=document.querySelector(".dashboard__header.left");e&&(this.initialOffset=n.offsetTop);let a;s<window.innerWidth/2?a=this.initialOffset:a=this.initialOffset+t,n.style.top=a+"px"}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver&&this.resizeObserver.disconnect()}}class Lo extends de{static get properties(){return{showTeaser:{type:Boolean},churches:{type:Array,attribute:!1}}}constructor(){super(),this.showTeaser=!1,this.route=S.getRoute("my-churches"),this.churches=[],this.renderChurch=this.renderChurch.bind(this),this.addChurch=this.addChurch.bind(this),this.handleSubmit=this.handleSubmit.bind(this)}firstUpdated(){super.firstUpdated(),document.querySelector("#add-church-form").addEventListener("submit",this.handleSubmit)}updated(){jQuery(document).foundation()}joinCommunity(){makeRequest("POST","log",{type:"system",subtype:"join_community"},"zume_system/v1/").done(e=>{const t=new CustomEvent("user-state:change",{bubbles:!0});this.dispatchEvent(t)})}handleSubmit(e){e.preventDefault(),this.addChurch()}addChurch(){const e=this.churches.length+1,t=[{id:e,name:"This is a new church",location:"Birmingham, UK",depth:0},{id:`${e}-1`,name:"Tea Shop 1",location:"Birmingham, UK",parent:e,depth:1},{id:`${e}-2`,name:"Tea Shop 2",location:"Birmingham, UK",parent:e,depth:1},{id:`${e}-2-1`,name:"Tea Shop 2 child",location:"Birmingham, UK",parent:`${e}-2`,depth:2},{id:`${e}-3`,name:"Breakfast Shop",location:"Birmingham, UK",parent:e,depth:1}];this.churches=[...this.churches,...t],this.closeChurchModal()}editChurch(e){console.log("edit church",e)}deleteChurch(e){console.log("delete church",e)}openChurchModal(){if(this.showTeaser)return;const e=document.querySelector("#new-church-form");jQuery(e).foundation("open")}closeChurchModal(){const e=document.querySelector("#new-church-form");jQuery(e).foundation("close"),this.clearChurchModal()}clearChurchModal(){jQuery("#add-church-form input").each(function(e){this.value=""})}renderChurch({id:e,name:t,location:s,depth:n}){return c`
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
                        <span class="icon z-icon-kebab brand-light"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="kebab-menu-${e}" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li><button class="menu-btn" @click=${()=>this.editChurch(e)}><span class="icon z-icon-pencil"></span>${jsObject.translations.edit}</button></li>
                        <li><button class="menu-btn" @click=${()=>this.deleteChurch(e)}><span class="icon z-icon-trash"></span>${jsObject.translations.delete}</button></li>
                    </ul>
                </div>
            </li>
        `}render(){return c`
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
                                <span class="icon z-icon-filter" aria-hidden="true"></span>
                            </button>
                            <button class="icon-btn f-2" @click=${this.openChurchModal} ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser?"true":"false"}>
                                <span class="visually-hidden">${jsObject.translations.add_church}</span>
                                <span class="icon z-icon-plus" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                        <ul>
                        </ul>
                    </div>
                </div>
                <dash-header-right></dash-header-right>

                <div class="dashboard__main content p-2">
                    ${this.showTeaser?c`
                            <div class="dash-menu__list-item">
                                <div class="dash-menu__icon-area | stack--5">
                                  <span class="icon z-icon-locked dash-menu__list-icon"></span>
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

                        `:c`
                            <ul class="list">
                                ${this.churches.length===0?c`
                                        <li
                                            role="button"
                                            class="list__item bg-brand-light white f-medium"
                                            data-depth=${0}
                                            @click=${this.addChurch}
                                        >
                                            ${jsObject.translations.add_first_church}
                                        </li>
                                    `:te(this.churches,e=>`${e.id}`,this.renderChurch)}
                            </ul>

                        `}
                </div>

            </div>
            <div class="reveal medium" id="new-church-form" data-reveal data-v-offset="20">
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.clearChurchModal}>
                        <span class="icon z-icon-close"></span>
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
        `}createRenderRoot(){return this}}customElements.define("dash-churches",Lo);class Ro extends de{static get properties(){return{showTeaser:{type:Boolean}}}getACoach(){this.dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:w.getACoach}}))}render(){return c`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <dash-sidebar-toggle></dash-sidebar-toggle>
                    <h1 class="h3">${jsObject.translations.my_coach}</h1>
                </div>
                <dash-header-right></dash-header-right>

              <div class="dashboard__main content p-2">
                  ${this.showTeaser?c`
                          <div class="dash-menu__list-item">
                            <div class="dash-menu__icon-area | stack--5">
                              <span class="icon z-icon-locked dash-menu__list-icon"></span>
                            </div>
                            <div class="dash-menu__text-area | switcher | switcher-width-20">
                              <div>
                                <h3 class="f-1 bold uppercase">${jsObject.translations.get_a_coach}</h3>
                                <p>${jsObject.translations.get_a_coach_explanation}</p>
                              </div>
                              <button class="dash-menu__view-button btn tight" @click=${this.getACoach}>
                                ${jsObject.translations.get_a_coach}
                              </button>
                            </div>
                          </div>
                      `:c`
                          <p>
                            ${jsObject.translations.connecting_with_coach}
                          </p>
                          <p>
                            ${jsObject.translations.wait_for_coach}
                          </p>
                      `}
                </div>

                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-coach",Ro);const ge=class extends ${static get properties(){return{ctas:{type:Array,attribute:!1}}}constructor(){super(),this.allCtas=[],this.ctas=[],this.celebrations=[],this.hiddenCtaKeys=[],this.initialCtaKeys=[],this.removedCtaKeys=[],this.manageCtas=this.manageCtas.bind(this),this.transitionIn=this.transitionIn.bind(this),this.transitionCtas=this.transitionCtas.bind(this),this.renderCta=this.renderCta.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("ctas:changed",this.manageCtas),this.addEventListener("begin-cta-transitions",this.transitionIn),this.addEventListener("cta-transition-in-ended",this.logCelebrationsSeen)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("ctas:changed",this.manageCtas),this.removeEventListener("begin-cta-transitions",this.transitionIn),this.removeEventListener("cta-transition-in-ended",this.logCelebrationsSeen)}firstUpdated(){this.manageCtas()}updated(){this.dispatchEventAfterUpdated&&(this.dispatchEventAfterUpdated=!1,setTimeout(()=>{this.dispatchEvent(new CustomEvent("begin-cta-transitions"))},10))}manageCtas(){const e=this.getCtas(),[t,s,n]=this.diffCtas(e,this.ctas),a=[...t,...s].filter(({content_template:u})=>u==="celebration"),r=[...t,...s].filter(({content_template:u})=>u!=="celebration"),o=[...a,...r],l=this.getCtaKeys(o),d=this.getCtaKeys(n);this.ctas=o,this.celebrations=a,this.hiddenCtaKeys=this.getCtaKeys(t),this.removedCtaKeys=[...d,...l.slice(ge.MAX_CTAS)],this.initialCtaKeys=l.slice(0,ge.MAX_CTAS),this.ctas.length>0&&(this.dispatchEventAfterUpdated=!0)}getCtas(){return jsObject.allCtas??[]}diffCtas(e,t){const s=e.filter(({key:r})=>t.findIndex(({key:o})=>o===r)===-1),n=t.filter(({key:r})=>e.findIndex(({key:o})=>o===r)===-1),a=t.filter(({key:r})=>e.findIndex(({key:o})=>o===r)>-1);return[s,a,n]}transitionIn(){this.transitionCtas(this.removedCtaKeys,this.initialCtaKeys),setTimeout(()=>{this.dispatchEvent(new CustomEvent("cta-transition-in-ended"))},ge.TRANSITION_TIMEOUT)}logCelebrationsSeen(){this.celebrations.forEach(({type:t,subtype:s})=>{makeRequest("POST","log",{type:t,subtype:s},"zume_system/v1")});const e=this.getCtaKeys(this.celebrations);jsObject.allCtas=jsObject.allCtas.filter(({key:t})=>!e.includes(t))}transitionCtas(e,t){(e.length>0?this.getCtaElements(e):[]).forEach(a=>{a&&(a.style.height=a.clientHeight+"px",setTimeout(()=>{a.classList.add("transition-out"),a.style.height=""},10))}),(t.length>0?this.getCtaElements(t):[]).forEach(a=>{a&&(a.classList.remove("hiding"),a.classList.add("showing"))})}getCtaElements(e){return this.renderRoot.querySelectorAll(e.map(t=>`[data-key="${t}"]`).join(","))}getCtaKeys(e){return e.map(({key:t})=>t)}isWizardLink(e){return e.includes("/wizard/")}openWizard(e){const t=e.split("/"),s=t[t.length-1];dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:s}}))}renderCta({content:e,content_template:t,key:s}){const n=this.hiddenCtaKeys.includes(s)?"hiding":"showing";if(t==="card")return c`
                <div class="stack | card cta ${n}" data-key=${s} style="--duration: ${ge.TRANSITION_TIMEOUT}ms">
                    <h2 class="h5 text-center">${e.title}</h2>
                    <p>${e.description}</p>
                    ${this.isWizardLink(e.link)?c`
                            <button class="btn light uppercase" @click=${()=>this.openWizard(e.link)}>${e.link_text}</button>
                        `:c`
                            <a href="${e.link}" class="btn light uppercase">${e.link_text}</a>
                        `}

                </div>
            `;if(t==="celebration")return c`
                <div class="stack | card celebration ${n}" data-key=${s} style="--duration: ${ge.TRANSITION_TIMEOUT}ms">
                    <h2 class="h5 text-center bold">${e.title}</h2>
                    <div class="d-flex align-items-center justify-content-between">
                        <img src="${jsObject.images_url+"/fireworks-2.svg"}" alt="" />
                        <img src="${e.image_url}" alt="" />
                        <img src="${jsObject.images_url+"/fireworks-2.svg"}" alt="" />
                    </div>
                    <p>${e.description}</p>
                </div>
            `}render(){return c`
            <div class="stack-margin-bottom">
                ${te(this.ctas,e=>e.key,this.renderCta)}
            </div>
        `}createRenderRoot(){return this}};let Oe=ge;C(Oe,"FADE_TIMEOUT",3e3),C(Oe,"TRANSITION_TIMEOUT",500),C(Oe,"MAX_CTAS",3);customElements.define("dash-cta",Oe);class Dt extends de{static get properties(){return{view:{type:String,attribute:!1},userState:{type:Object,attribute:!1}}}constructor(e){super(),this.routeName=e,this.route=S.getRoute(this.routeName),this.routes=S.childRoutesOf(this.routeName),this.view="list",this.userState=jsObject.user_stage.state,this.refetchState=this.refetchState.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("user-state:change",this.refetchState)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("user-state:change",this.refetchState)}switchView(e="list"){this.view=e}refetchState(){makeRequest("GET","user_stage",{},"zume_system/v1").done(e=>{console.log(this,e),(!e||!e.state)&&console.error("Stage or state data not returned from api"),jsObject.user_stage=e,this.userState=e.state})}renderLinks(e){return this.view==="grid"?c`
                <div class="nav-grid">
                    ${this.routes.map(t=>c`
                        <grid-link
                            href=${t.pattern}
                            text=${t.translation||""}
                            icon=${t.icon}
                            ?disableNavigate=${t.type==="handled-link"}
                            @click=${t.type==="handled-link"?s=>{S.getCompletedStatus(t.name,e)||t.clickHandler(s,this.dispatchEvent)}:null}
                            ?completed=${S.getCompletedStatus(t.name,e)}
                            ?locked=${S.getLockedStatus(t.name,e)}
                        >
                        </grid-link>
                        `)}
                </div>
            `:c`
            <div class="stack">
                ${this.routes.map(t=>c`
                    <list-link
                        href=${t.pattern}
                        text=${t.translation}
                        explanation=${t.explanation}
                        icon=${t.icon}
                        ?disableNavigate=${t.type==="handled-link"}
                        @click=${t.type==="handled-link"?s=>{S.getCompletedStatus(t.name,e)||t.clickHandler(s,this.dispatchEvent)}:null}
                        ?completed=${S.getCompletedStatus(t.name,e)}
                        ?locked=${S.getLockedStatus(t.name,e)}
                    >
                    </list-link>
                `)}
            </div>
        `}render(){return c`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <dash-sidebar-toggle></dash-sidebar-toggle>
                        <span class="icon ${this.route.icon}"></span>
                        <h1 class="h3">${this.route.translation}</h1>
                    </div>
                    <div class="icon-btn-group">
                        <button class="${this.view==="list"?"selected":""}" title=${jsObject.translations.list} @click=${()=>this.switchView("list")}>
                            <span class="icon z-icon-list" aria-hidden="true"></span>
                        </button>
                        <button class="${this.view==="grid"?"selected":""}" title=${jsObject.translations.grid} @click=${()=>this.switchView("grid")}>
                            <span class="icon z-icon-grid" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main p-1">
                    ${this.renderLinks(this.userState)}
                </div>
                <div class="dashboard__secondary">
                    ${this.routeName==="getting-started"?"":c`<dash-cta></dash-cta>`}
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-top-level",Dt);class Po extends Dt{constructor(){super("getting-started")}createRenderRoot(){return this}}customElements.define("dash-getting-started",Po);class Fo extends de{static get properties(){return{showTeaser:{type:Boolean},scriptUrl:{type:String,attribute:!1},loading:{type:Boolean,attribute:!1}}}constructor(){super(),this.showTeaser=!1,this.scriptUrl=""}connectedCallback(){super.connectedCallback(),this.openModal=this.openModal.bind(this),this.handleLoad=this.handleLoad.bind(this)}firstUpdated(){jQuery(document).foundation()}joinCommunity(){makeRequest("POST","log",{type:"system",subtype:"join_community"},"zume_system/v1/").done(e=>{const t=new CustomEvent("user-state:change",{bubbles:!0});this.dispatchEvent(t)})}openModal(e){this.loading=!0;let t=e.target.dataset.map;t==="hundred-hour-map"?this.scriptUrl="https://zume.training/coaching/zume_app/last100_hours/":t==="vision-map"?this.scriptUrl="https://zume.training/coaching/zume_app/heatmap_practitioner/":t==="church-map"?this.scriptUrl="https://zume.training/coaching/zume_app/heatmap_churches/":this.scriptUrl="",t="map";const s=document.querySelector("#map-iframe");s.onload=this.handleLoad;const n=document.querySelector(`#${t}-modal`);jQuery(n).foundation("open")}handleLoad(){this.loading=!1}render(){return c`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <dash-sidebar-toggle></dash-sidebar-toggle>
                    <h1 class="h3">${jsObject.translations.my_maps}</h1>
                </div>
                <dash-header-right></dash-header-right>

                <div class="dashboard__main content p-2">
                    ${this.showTeaser?c`
                          <div class="dash-menu__list-item">
                            <div class="dash-menu__icon-area | stack--5">
                              <span class="icon z-icon-locked dash-menu__list-icon"></span>
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
                        `:c`
                            <div class="stack">
                                <button class="btn light uppercase" data-map="hundred-hour-map" @click=${this.openModal}>
                                    ${jsObject.translations.hundred_hour_map}
                                </button>
                                <button class="btn light uppercase" data-map="vision-map" @click=${this.openModal}>
                                    ${jsObject.translations.training_vision_map}
                                </button>
                                <button class="btn light uppercase" data-map="church-map" @click=${this.openModal}>
                                    ${jsObject.translations.simple_church_planting_map}
                                </button>
                            </div>
                        `}
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
            <div
                class="reveal full"
                data-reveal
                id="map-modal"
            >
                <button class="close-btn | ms-auto mb--1" aria-label=${jsObject.translations.close} type="button" data-close>
                    <span class="icon z-icon-close"></span>
                </button>
                ${this.loading?c`<span class="loading-spinner active"></span>`:""}
                <iframe
                    id="map-iframe"
                    class="${this.loading?"opacity-0":""}"
                    src=${this.scriptUrl||""}
                    frameborder="0"
                    width="100%"
                    height="100%"
                >
                </iframe>
            </div>
            <div
                class="reveal full"
                data-reveal
                id="hundred-hour-map-modal"
            >
                <button class="close-btn | ms-auto mb--1" aria-label=${jsObject.translations.close} type="button" data-close>
                    <span class="icon z-icon-close"></span>
                </button>
                <iframe
                    src='https://zume.training/coaching/zume_app/last100_hours/'
                    frameborder="0"
                    width="100%"
                    height="100%"
                >
                </iframe>
            </div>
            <div
                class="reveal full"
                data-reveal
                id="vision-map-modal"
            >
                <button class="close-btn | ms-auto mb--1" aria-label=${jsObject.translations.close} type="button" data-close>
                    <span class="icon z-icon-close"></span>
                </button>
                <iframe
                    src='https://zume.training/coaching/zume_app/heatmap_practitioner/'
                    frameborder="0"
                    width="100%"
                    height="100%"
                >
                </iframe>
            </div>
            <div
                class="reveal full"
                data-reveal
                id="church-map-modal"
            >
                <button class="close-btn | ms-auto mb--1" aria-label=${jsObject.translations.close} type="button" data-close>
                    <span class="icon z-icon-close"></span>
                </button>
                <iframe
                    src='https://zume.training/coaching/zume_app/heatmap_churches/'
                    frameborder="0"
                    width="100%"
                    height="100%"
                >
                </iframe>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-maps",Fo);class Uo extends de{render(){return c`
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
        `}createRenderRoot(){return this}}customElements.define("dash-not-found",Uo);class Wo extends de{static get properties(){return{showTeaser:{type:Boolean},loading:{type:Boolean,attribute:!1},commitments:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1}}}constructor(){super(),this.showTeaser=!1,this.loading=!0,this.route=S.getRoute("my-plans"),this.filterName="my-plans-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.renderListItem=this.renderListItem.bind(this),this.closeCommitmentsModal=this.closeCommitmentsModal.bind(this)}firstUpdated(){super.firstUpdated();const e=this.filterStatus||"";this.fetchCommitments(e)}updated(){jQuery(document).foundation()}fetchCommitments(){const e=this.filterStatus;makeRequest("GET","commitments",{status:e},"zume_system/v1").done(t=>{this.commitments=t}).always(()=>{this.loading=!1})}openCommitmentsModal(){if(this.showTeaser)return;const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("open")}closeCommitmentsModal(){const e=document.querySelector("#new-commitments-form");jQuery(e).foundation("close")}handleAddedCommitments(){this.fetchCommitments(),this.closeCommitmentsModal()}completeCommitment(e){let t={id:e,user_id:jsObject.profile.user_id};makeRequest("PUT","commitment",t,"zume_system/v1").done(s=>{this.fetchCommitments()})}deleteCommitment(e){let t={id:e,user_id:jsObject.profile.user_id};makeRequest("DELETE","commitment",t,"zume_system/v1").done(s=>{this.closeMenu(e),this.fetchCommitments()})}editCommitment(e){console.log(e)}filterCommitments(e){this.filterStatus=e,this.fetchCommitments(e),ZumeStorage.save(this.filterName,e),this.closeFilter()}closeFilter(){const e=this.querySelector("#filter-menu");jQuery(e).foundation("close")}closeMenu(e){const t=this.querySelector(`#kebab-menu-${e}`);jQuery(t).foundation("close")}renderListItem(e){const{question:t,answer:s,id:n,status:a}=e;return c`
            <li class="list__item | switcher | switcher-width-30">
                <span>${t} <b>${s}</b></span>
                <div class="list__secondary | grow-0">
                    <div class="d-flex w-6rem justify-content-center">
                        ${a==="closed"?c`<span class="icon z-icon-check-mark success"></span>`:c`
                                <button
                                    class="btn light uppercase tight break-anywhere"
                                    @click=${()=>this.completeCommitment(n)}
                                >
                                    ${jsObject.translations.done}
                                </button>
                            `}
                    </div>
                    <button class="icon-btn" data-toggle="kebab-menu-${n}">
                        <span class="icon z-icon-kebab brand-light"></span>
                    </button>
                </div>
                <div
                    class="dropdown-pane"
                    id="kebab-menu-${n}"
                    data-dropdown
                    data-auto-focus="true"
                    data-position="bottom"
                    data-alignment=${this.isRtl?"right":"left"}
                    data-close-on-click="true"
                    data-close-on-click-inside="true"
                >
                    <ul>
                        <li class="hidden"><button class="menu-btn" @click=${()=>this.editCommitment(n)}><span class="icon z-icon-pencil"></span>${jsObject.translations.edit}</button></li>
                        <li><button class="menu-btn" @click=${()=>this.deleteCommitment(n)}><span class="icon z-icon-trash"></span>${jsObject.translations.delete}</button></li>
                    </ul>
                </div>
            </li>

        `}render(){return c`
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
                                <span class="icon z-icon-filter" aria-hidden="true"></span>
                            </button>
                            <button class="icon-btn f-2" @click=${this.openCommitmentsModal} ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser?"true":"false"}>
                                <span class="visually-hidden">${jsObject.translations.add_commitments}</span>
                                <span class="icon z-icon-plus" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                        <ul>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus==="open"?"selected":""}" @click=${()=>this.filterCommitments("open")}>
                                    <span class="icon z-icon-sort-todo" aria-hidden="true"></span>
                                    ${jsObject.translations.active}
                                </button>
                            </li>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus==="closed"?"selected":""}" @click=${()=>this.filterCommitments("closed")}>
                                    <span class="icon z-icon-sort-done" aria-hidden="true"></span>
                                    ${jsObject.translations.completed}
                                </button>
                            </li>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus==="all"?"selected":""}" @click=${()=>this.filterCommitments("all")}>
                                    <span class="icon z-icon-sort-all" aria-hidden="true"></span>
                                    ${jsObject.translations.all}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="dashboard__main content">
                    ${this.showTeaser?c`
                          <div class="p-2">
                            <div class="dash-menu__list-item">
                              <div class="dash-menu__icon-area | stack--5">
                                <span class="icon z-icon-locked dash-menu__list-icon"></span>
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
                        `:c`
                                <ul class="list">
                                  ${!this.loading&&this.commitments&&this.commitments.length>0?te(this.commitments,e=>e.id,this.renderListItem):""}
                                </ul>
                            `}
                </div>
            </div>
            <div class="reveal large" id="new-commitments-form" data-reveal data-v-offset="20">
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.clearCommitmentsModal}>
                        <span class="icon z-icon-close"></span>
                </button>
                <activity-3-month-plan
                    .questions=${jsObject.three_month_plan_questions}
                    .translations=${{save:jsObject.translations.save,cancel:jsObject.translations.cancel}}
                    user_id=${jsObject.profile.user_id}
                    contact_id=${jsObject.profile.contact_id}
                    @3-month-plan-saved=${this.handleAddedCommitments}
                    @3-month-plan-cancelled=${this.closeCommitmentsModal}
                    showCancel
                ></activity-3-month-plan>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-plans",Wo);class qo extends Dt{constructor(){super("practicing")}createRenderRoot(){return this}}customElements.define("dash-practicing",qo);class Vo extends de{static get properties(){return{loading:{type:Boolean,attribute:!1},filteredItems:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1},hostProgress:{type:Object,attribute:!1},errorMessage:{type:String,attribute:!1}}}constructor(){super(),this.loading=!1,this.route=S.getRoute("my-progress"),this.trainingItems=Object.values(jsObject.training_items),this.hostProgress=jsObject.host_progress,this.errorMessage="",this.filterName="my-progress-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.filteredItems=this.filterItems(this.filterStatus),this.openStates={},this.trainingItems.forEach(e=>{this.openStates[e.key]=!1}),this.renderListItem=this.renderListItem.bind(this),this.closeInfoModal=this.closeInfoModal.bind(this)}updated(){jQuery(document).foundation()}openInfoModal(){const e=document.querySelector("#progress-modal");jQuery(e).foundation("open")}closeInfoModal(){const e=document.querySelector("#progress-modal");jQuery(e).foundation("close")}filterProgress(e){this.filterStatus=e,this.filteredItems=this.filterItems(e),ZumeStorage.save(this.filterName,e),this.closeFilter()}filterItems(e){switch(e){case"heard":return this.trainingItems.filter(t=>{const s=t.host[0].key;return!!(this.hostProgress.list[s]||!1)});case"not-heard":return this.trainingItems.filter(t=>{const s=t.host[0].key;return!(this.hostProgress.list[s]||!1)});default:return[...this.trainingItems]}}closeFilter(){const e=this.querySelector("#filter-menu");jQuery(e).foundation("close")}toggleHost(e,t){t.stopImmediatePropagation();const{type:s,subtype:n,key:a}=e,r=this.hostProgress.list[a];if(r===!1)return this.changeHost(a,!0),Nt.post("host",{type:s,subtype:n,user_id:jsObject.profile.user_id}).then(o=>{console.log(o)}).catch(o=>{this.changeHost(a,!1),this.displayError(jsObject.translations.error_with_request)}).finally(()=>{this.loadHostStatus()});if(r===!0)return this.changeHost(a,!1),Nt.delete("host",{type:s,subtype:n,user_id:jsObject.profile.user_id}).then(o=>{this.loadHostStatus()}).catch(o=>{this.changeHost(a,!1),this.displayError(jsObject.translations.error_with_request)}).finally(()=>{this.loadHostStatus()})}displayError(e){this.errorMessage=e,setTimeout(()=>{this.errorMessage=""},4e3)}loadHostStatus(){Nt.get("host",{user_id:jsObject.profile.user_id}).then(e=>{this.hostProgress=e}).catch(e=>{this.displayError(jsObject.translations.error_with_request)})}changeHost(e,t){const s={...this.hostProgress};s.list={...this.hostProgress.list},s.list[e]=t,this.hostProgress={...s}}toggleDetails(e){const t=this.querySelector(`#details-${e}`),s=this.openStates[e],n=t.scrollHeight,a="200";s===!1?(t.style.height=n+"px",t.style.transitionDuration=a+"ms",t.dataset.state="opening",this.openStates[e]=!0,setTimeout(()=>{t.style.height="auto",t.dataset.state="open"},a)):(t.style.height=n+"px",t.dataset.state="closing",this.openStates[e]=!1,setTimeout(()=>{t.style.height="0"},10),setTimeout(()=>{t.dataset.state="closed"},a))}renderListItem(e){const{title:t,description:s,host:n,slug:a,key:r}=e;let o=[jsObject.site_url,jsObject.language,a].join("/");return jsObject.language==="en"&&(o=[jsObject.site_url,a].join("/")),c`
            <li class="switcher | switcher-width-30 list__item tight" @click=${()=>this.toggleDetails(r)} role="button">
                <div>
                    <h2 class="h5 bold m0">${t}</h2>
                    <div class="collapse" id="details-${r}" data-state="closed">
                        <div class="stack--2 mt--2">
                            <p class="f--1 gray-700">${s}</p>
                            <div class="cluster">
                                <share-links url=${o} title=${t} .t=${jsObject.share_translations}></share-links>

                                ${jsObject.has_pieces_pages?c`
                                        <a class="btn light uppercase" href=${o} @click=${l=>l.stopImmediatePropagation()}>${jsObject.translations.view}</a>
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
                            <span class="icon z-icon-heard-concept"></span>
                        </button>
                        <button
                            data-subtype=${n[1].subtype}
                            class=${this.hostProgress.list[n[1].key]?"active":""}
                            @click=${l=>this.toggleHost(n[1],l)}
                        >
                            <span class="icon z-icon-obey-concept"></span>
                        </button>
                        <button
                            data-subtype=${n[2].subtype}
                            class=${this.hostProgress.list[n[2].key]?"active":""}
                            @click=${l=>this.toggleHost(n[2],l)}
                        >
                            <span class="icon z-icon-share-concept"></span>
                        </button>
                        <button
                            data-subtype=${n[3].subtype}
                            class=${this.hostProgress.list[n[3].key]?"active":""}
                            @click=${l=>this.toggleHost(n[3],l)}
                        >
                            <span class="icon z-icon-train-concept"></span>
                        </button>
                    </div>
                </div>
            </li>
        `}render(){var e,t,s,n,a,r,o,l;return c`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <dash-sidebar-toggle></dash-sidebar-toggle>
                        <span class="icon ${this.route.icon}"></span>
                        <h1 class="h3">${this.route.translation}</h1>
                        <div class="s0">
                            <button class="icon-btn f-2" data-toggle="filter-menu">
                                <span class="visually-hidden">${jsObject.translations.filter}</span>
                                <span class="icon z-icon-filter brand-light" aria-hidden="true"></span>
                            </button>
                            <button class="icon-btn f-2" @click=${this.openInfoModal}>
                                <span class="visually-hidden">${jsObject.translations.progress_info}</span>
                                <span class="icon z-icon-info brand-light" aria-hidden="true"></span>
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
                <div class="dashboard__main content position-relative">
                    ${c`
                            <ul class="list">
                                ${te(this.filteredItems,d=>d.key,this.renderListItem)}
                            </ul>
                        `}

                    <div class="fixed bottom left right ${this.errorMessage.length?"p-1":""}">
                        <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
                    </div>
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
            <div class="reveal large" id="progress-modal" data-reveal data-v-offset="20">
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button">
                        <span class="icon z-icon-close"></span>
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
                        <host-progress-circle class="grow-0" type="trained" percent=${((l=(o=this.hostProgress)==null?void 0:o.percent)==null?void 0:l.t)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.trained}</h3>
                            <p class="italic">${jsObject.translations.trained_explanation}</p>
                        </div>
                    </div>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-progress",Vo);class Ho extends Dt{constructor(){super("training")}createRenderRoot(){return this}}customElements.define("dash-training",Ho);class Zo extends de{static get properties(){return{showTeaser:{type:Boolean},code:{type:String},loading:{type:Boolean,attribute:!1},error:{type:String,attribute:!1},training:{type:Object,attribute:!1},sessions:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1}}}constructor(){super(),this.showTeaser=!1,this.loading=!1,this.error="",this.route=S.getRoute("my-training"),this.renderListItem=this.renderListItem.bind(this)}connectedCallback(){super.connectedCallback(),this.code!=="teaser"&&this.getTraining()}willUpdate(e){e.has("code")&&this.code!=="teaser"&&this.getTraining()}firstUpdated(){super.firstUpdated()}updated(){jQuery(document).foundation()}getTraining(){return this.loading=!0,makeRequest("GET",`plan/${this.code}`,{},"zume_system/v1").then(e=>{if(e.error_code)throw new Error(e.error_code);this.training=e}).then(()=>{this.refreshSessions(),this.groupMembers=this.getGroupMembers()}).fail(e=>{this.error=e.message}).always(()=>{this.loading=!1})}refreshSessions(e){e&&(this.training.completed_sessions=e),this.sessions=this.getSessions(),this.currentSession=this.getCurrentSession()}getSessions(){const e=this.getTrainingType(),t=this.getNumberOfSessions(),s=[];for(let n=1;n<t+1;n++){const a=n<10?`0${n}`:`${n}`,r=e+"_"+a,o=this.training[r];s.push({id:r,name:jsObject.translations.session_x.replace("%d",n),datetime:o?Number(o.timestamp)*1e3:0,completed:this.training.completed_sessions.includes(r)})}return s}getGroupMembers(){if(!this.training.participants||!Array.isArray(this.training.participants))return[];const e=[];return this.training.participants.forEach(t=>{e.push({id:t.ID,name:t.post_title})}),e}getTrainingType(){return this.training.set_type.key}getSessionNumber(e){const t=this.getTrainingType()+"_";return e.slice(t.length)}getSessionUrl(e){const t=this.getTrainingType(),s=this.getSessionNumber(e);let n="";t==="set_a"&&(n=jsObject.urls.launch_ten_session_course),t==="set_b"&&(n=jsObject.urls.launch_twenty_session_course),t==="set_c"&&(n=jsObject.urls.launch_intensive_session_course);const a=new URL(n);return a.searchParams.set("session",s),a.href}getNumberOfSessions(){switch(this.training.set_type.key){case"set_a":return 10;case"set_b":return 20;case"set_c":return 5}}getCurrentSession(){for(let e=0;e<this.sessions.length;e++){const t=this.sessions[e];if(!t.completed)return t.id}return""}createTraining(){this.dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:w.makeAGroup}}))}inviteFriends(){this.dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:w.inviteFriends,params:{joinKey:this.code}}}))}startSession(e){const t=this.getSessionUrl(e);location.href=t}editSession(e){}markSessionCompleted(e){makeRequest("POST","plan/complete-session",{key:this.training.join_key,session_id:e},"zume_system/v1").then(t=>{this.refreshSessions(t)})}renderListItem(e){const{id:t,name:s,datetime:n,completed:a}=e;return c`
            <li class="list__item | switcher | switcher-width-20 gapy0">
                <div class="list__primary">
                    ${this.currentSession===t?c`
                            <button class="icon-btn" @click=${()=>this.startSession(t)} aria-label=${jsObject.translations.start_session}>
                                <span class="icon z-icon-play brand-light"></span>
                            </button>
                        `:c`
                            <span class="icon z-icon-check-mark success ${a?"":"invisible"} p--2"></span>
                        `}
                    <span class="f-medium">${s}</span>
                </div>
                <div class="list__secondary">
                    <div class="d-flex justify-content-center">
                        ${n>0?moment(n).format("MMM Do YY"):jsObject.translations.not_scheduled}
                    </div>
                    <button class="icon-btn" data-toggle="kebab-menu-${t}">
                        <span class="icon z-icon-kebab brand-light"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="kebab-menu-${t}" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li><button class="menu-btn" @click=${()=>this.editSession(t)}><span class="icon z-icon-pencil"></span>${jsObject.translations.edit_time}</button></li>
                        <li><button class="menu-btn" @click=${()=>this.markSessionCompleted(t)}><span class="icon z-icon-pencil"></span>${jsObject.translations.mark_completed}</button></li>
                        <li><button class="menu-btn" @click=${()=>this.startSession(t)}><span class="icon z-icon-play"></span>${jsObject.translations.start_session}</button></li>
                    </ul>
                </div>
            </li>

        `}renderMemberItem(e){const{name:t}=e;return c`
            <li>
                ${t}
            </li>
        `}render(){return c`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <dash-sidebar-toggle></dash-sidebar-toggle>
                        <span class="icon ${this.route.icon}"></span>
                        <h1 class="h3">${this.route.translation}</h1>
                    </div>
                    <button
                        class="icon-btn f-2 brand-light"
                        aria-label=${jsObject.translations.create_training_group}
                        @click=${this.createTraining}
                    >
                        <span class="icon z-icon-plus"></span>
                    </button>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main content">
                    ${this.loading?c`<div class="p-1"><span class="loading-spinner active"></span></div>`:""}
                    ${!this.loading&&this.error?c`
                        <div class="p-1">
                            <h3 class="f-1 bold uppercase">${jsObject.translations.error}</h3>
                            ${this.error==="bad-plan-code"?c`
                                    <p>${jsObject.translations.bad_code}</p>
                                    <p>${jsObject.translations.join_key}: ${this.code}</p>
                                `:""}
                            ${this.error==="not-authorized"?c`
                                    <p>${jsObject.translations.not_authorized}</p>
                                `:""}
                        </div>
                        `:""}
                    ${this.showTeaser&&!this.loading&&!this.error?c`
                            <div class="p-1">
                              <div class="dash-menu__list-item">
                                <div class="dash-menu__icon-area | stack--5">
                                  <span class="icon z-icon-locked dash-menu__list-icon"></span>
                                </div>
                                <div class="dash-menu__text-area | switcher | switcher-width-20">
                                  <div>
                                    <h3 class="f-1 bold uppercase">${jsObject.translations.my_training_locked}</h3>
                                    <p>${jsObject.translations.plan_a_training_explanation}</p>
                                  </div>
                                  <button class="dash-menu__view-button btn tight" @click=${this.createTraining}>
                                    ${jsObject.translations.unlock}
                                  </button>
                                </div>
                              </div>
                            </div>
                        `:c`
                            <ul class="list">
                                ${!this.loading&&this.sessions&&this.sessions.length>0?te(this.sessions,e=>e.id,this.renderListItem):""}
                            </ul>
                        `}
                </div>
                <div class="dashboard__secondary stack">
                    ${this.loading&&!this.error?c`<span class="loading-spinner active"></span>`:""}
                    ${!this.loading&&!this.error&&this.code!=="teaser"?c`
                                <div class="card | group-members | grow-0">
                                    <button class="f-0 f-medium d-flex align-items-center gap--2 black">
                                        <span class="icon z-icon-group brand-light"></span> ${jsObject.translations.group_members} (${this.groupMembers.length})
                                    </button>
                                    <div class="collapse" data-state="open">
                                        <!-- The functionality of the .collapse class needs to be refactored from dash-progress.js toggleDetails function to be re-used here -->
                                        ${!this.loading&&this.groupMembers&&this.groupMembers.length>0?c`
                                                <ol class="ps-1">
                                                    ${te(this.groupMembers,e=>e.id,this.renderMemberItem)}
                                                </ol>
                                            `:""}
                                    </div>
                                    <button
                                        @click=${this.inviteFriends}
                                        class="btn brand tight light mt--2"
                                    >
                                        ${jsObject.translations.invite_friends}
                                    </button>
                                </div>
                            `:""}
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-trainings",Zo);class Bo extends ${firstUpdated(){const e=this.offsetTop;this.style.top=e+"px"}render(){return c`
            <div class="dashboard__header right">
                <dash-sidebar-toggle displayOn="medium"></dash-sidebar-toggle>
                <launch-course></launch-course>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-header-right",Bo);class Go extends ${static get properties(){return{displayOn:{type:String}}}constructor(){super(),this.displayOn="large"}toggleSidebar(){const e=new CustomEvent("toggle-dashboard-sidebar",{bubbles:!0});this.dispatchEvent(e)}render(){return c`
            <button class="btn f-0 light tight dashboard__sidebar-toggle break-${this.displayOn}" @click=${this.toggleSidebar}>${jsObject.translations.menu}</button>
        `}createRenderRoot(){return this}}customElements.define("dash-sidebar-toggle",Go);class ks extends Wn($){static get properties(){return{href:{type:String},class:{type:String},as:{type:String},locked:{type:Boolean},completed:{type:Boolean},disableNavigate:{type:Boolean},icon:{type:String},text:{type:String},explanation:{type:String}}}constructor(){super(),this.href="",this.class="",this.as="",this.icon="",this.text="",this.explanation="",this.locked=!1,this.completed=!1,this.disableNavigate=!1}handleClick(e){this.as==="nav"&&(e.preventDefault(),this.navigate(this.href)),this.as!=="link"&&this.as==="button"&&e.preventDefault()}printBool(e){return e?"true":"false"}render(){return c`
            <a
                href=${this.href}
                class=${this.class}
                @click=${this.handleClick}
                aria-disabled=${this.completed}
                ?data-completed=${this.completed}
                ?data-locked=${this.locked}
            >
                <span class="icon ${this.icon} brand-light"></span>
                <span>${this.text}</span>
            </a>
        `}createRenderRoot(){return this}}customElements.define("nav-link",ks);class Yo extends ks{constructor(){super()}renderText(){return this.text.split(" ").map(e=>c`
            <span>${e}</span>
        `)}getIcon(){return this.locked?this.icon+"-locked":this.icon}render(){return c`
            <a
                href=${this.href}
                class="card-btn grid-link"
                role="button"
                @click=${this.handleClick}
                aria-disabled=${this.printBool(this.locked)}
                ?data-locked=${this.locked}
                ?data-completed=${this.completed}
            >
                <span class="icon ${this.getIcon()} brand-light"></span>
                ${this.renderText()}
            </a>
        `}}customElements.define("grid-link",Yo);class Jo extends ks{constructor(){super()}renderText(){return this.text.split(" ").map(e=>c`
            <span>${e}</span>
        `)}getIcon(){return this.locked?this.icon+"-locked":this.icon}render(){return c`
            <div
                class="dash-menu__list-item"
                ?data-locked=${this.locked}
                ?data-completed=${this.completed}
                ?data-button=${this.disableNavigate}
                role="button"
                @click=${this.handleClick}
            >
                <div class="dash-menu__icon-area | stack--5">
                    <span class="icon ${this.getIcon()} dash-menu__list-icon"></span>
                </div>
                <div class="dash-menu__text-area | switcher | switcher-width-20">
                    <div>
                        <h3 class="f-1 bold uppercase">${this.text}</h3>
                        <p>${this.explanation}</p>
                    </div>
                    ${this.completed?c`
                            <div class="grow-0"><span class="icon z-icon-check-mark grow-0 | dash-menu__list-success"></span></div>
                        `:""}
                </div>
            </div>
        `}}customElements.define("list-link",Jo);class Ko extends ${static get properties(){return{translations:{type:Object},urls:{type:Object},position:{type:String},asLink:{type:Boolean}}}constructor(){super(),typeof jsObject<"u"&&(this.translations=jsObject.translations,this.urls=jsObject.urls),this.position="bottom";const t=document.querySelector("html").dataset.dir;this.isRtl=t==="rtl"}updated(){jQuery(document).foundation()}render(){return c`
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
                    <li><a class="menu-btn no-wrap" href="${this.urls.launch_ten_session_course}"><span class="icon z-icon-course"></span>${this.translations.ten_session_course}</a></li>
                    <li><a class="menu-btn no-wrap" href="${this.urls.launch_twenty_session_course}"><span class="icon z-icon-course"></span>${this.translations.twenty_session_course}</a></li>
                    <li><a class="menu-btn no-wrap" href="${this.urls.launch_intensive_session_course}"><span class="icon z-icon-course"></span>${this.translations.three_day_intensive_course}</a></li>
                </ul>
            </div>
        `}createRenderRoot(){return this}}customElements.define("launch-course",Ko);class Qo extends ${constructor(){super();C(this,"addressCallback",t=>{t.features.length<1?this.locations=-1:this.locations=t.features});C(this,"processLocation",debounce(getAddressSuggestions(this.addressCallback,jsObject.map_key)));this.userProfile={},this.locations=[]}static get properties(){return{userProfile:{type:Object},loading:{type:Boolean,attribute:!1},locations:{type:Array,attribute:!1}}}firstUpdated(){this.nameInput=this.renderRoot.querySelector("#full_name"),this.phoneInput=this.renderRoot.querySelector("#phone"),this.emailInput=this.renderRoot.querySelector("#email"),this.preferredEmailInput=this.renderRoot.querySelector("#communications_email"),this.cityInput=this.renderRoot.querySelector("#city"),this.prefferedLanguageInput=this.renderRoot.querySelector("#preferred_language"),this.addressResultsContainer=this.renderRoot.querySelector("#address_results")}submitProfileForm(t){t.preventDefault();const s=this.nameInput.value,n=this.emailInput.value,a=this.preferredEmailInput.value,r=this.phoneInput.value,o=this.prefferedLanguageInput.value,l={name:s,phone:r,email:n,communications_email:a,preferred_language:o};l.location_grid_meta=getLocationGridFromMapbox(this.mapboxSelectedId,this.userProfile.location),this.loading=!0,fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(l),headers:{"X-WP-Nonce":jsObject.nonce}}).then(d=>d.json()).then(d=>{const u=new CustomEvent("user-profile:change",{bubbles:!0,detail:d});this.dispatchEvent(u);const p=new CustomEvent("user-state:change",{bubbles:!0});this.dispatchEvent(p)}).catch(d=>{console.error(d)}).finally(()=>{this.loading=!1})}selectAddress(t){const s=t.target.id,n=t.target.dataset.placeName;this.cityInput.value=n,this.mapboxSelectedId=s,this.locations=[]}render(){var t;return c`
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
                    ${Array.isArray(this.locations)?"":c`
                            ${jsObject.translations.no_locations}
                        `}
                    ${Array.isArray(this.locations)&&this.locations.length>0?c`
                            <div id="address_results" class="stack my-0">
                                ${this.locations.map(s=>c`
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

                    ${Object.values(jsObject.languages).map(s=>c`
                            <option value=${s.code} ?selected=${this.userProfile.preferred_language===s.code}>
                                ${s.nativeName} - ${s.enDisplayName}
                            </option>
                        `)}

                    </select>
                </div>

                <button class="btn my-0" id="submit-profile" ?disabled=${this.loading}>${jsObject.translations.save}</button>
                <span class="loading-spinner ${this.loading?"active":""}"></span>

            </form>
        `}createRenderRoot(){return this}}customElements.define("profile-form",Qo);class D extends ${static get properties(){return{slide:{type:Object},id:{type:String}}}constructor(){super(),this.maxPercentage=80,this.resizeCallback=this.resizeCallback.bind(this)}connectedCallback(){super.connectedCallback(),this.dir=document.querySelector("html").dir,window.addEventListener("resize",this.resizeCallback)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.resizeCallback)}firstUpdated(){this.resizeSlide(window),this.fitContentToSlide(".activity-card"),this.fitContentToSlide(".content-area__text")}resizeCallback(e){this.resizeSlide(e.currentTarget)}fitContentToSlide(e){const t=this.renderRoot.querySelector(e),s=this.renderRoot.querySelector(".slides-card");if(!t||!s)return;const n=t.getBoundingClientRect().height,a=t.parentElement.getBoundingClientRect().top,r=s.getBoundingClientRect().top,l=s.getBoundingClientRect().height-(a-r),d=n/l*100;if(d>this.maxPercentage){const p=2*this.maxPercentage/d;t.style.fontSize=`calc( var(--slide-unit) * ${p} )`}}resizeSlide(e){const t=document.querySelectorAll(".slides-card"),s=document.querySelectorAll(".video-slide"),n=[...t,s],{innerWidth:a,innerHeight:r}=e,o=n[0].getBoundingClientRect().width,l=a/r>16/9,d=l?16/9*r/100:o/100,u=l?r:9/16*o;this.slideUnit=d,this.slideHeight=u,n.forEach(p=>{p.style=`
                --slide-unit: ${d}px;
                --slide-height: ${u}px;
            `})}renderProgressBar(){let e=[],t=[];for(let s=0;s<this.slide.progress_bar.length;s++){const n=this.slide.progress_bar[s];if(n===!1){e.push(t),e.push(!1),t=[];continue}t.push(n)}return e.push(t),c`
            <div class="stage ${this.slide.key}-bar">
                <div class="progress-bar-wrapper">
                    ${e.map(s=>s?c`
                            <div class="progress-bar-stage">
                                ${s.map(n=>c`
                                    <div class="progress-bar-item ${this.slide.key===n?"active":""}"></div>
                                `)}
                            </div>
                        `:c`<div class="progress-bar-divider"></div>`)}
                </div>
            </div>
        `}renderContent(e=[],t=!1,s=!1){return e.map((n,a)=>t&&a===0?c`<p><strong>${n}</strong></p>`:Array.isArray(n)?c`
                    <ul class="bullets">
                        ${n.map(r=>c`<li>${r}</li>`)}
                    </ul>
                `:s?c`<p><strong>${n}</strong></p>`:c`<p>${n}</p>`)}render(){return c`
            <div class="slides-card">
                <div class="center"></div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-slide",D);class Xo extends D{static get properties(){return{slide:{type:Object},id:{type:String},offCanvasId:{type:String,attribute:!1}}}firstUpdated(){jQuery(document).foundation(),this.offCanvasId="activityOffCanvas"+this.id,this.offCanvasSelector="#"+this.offCanvasId,super.firstUpdated()}openMenu(){const e=document.querySelector(this.offCanvasSelector);console.log(e,this.offCanvasSelector),jQuery(e).foundation("open")}closeMenu(){const e=document.querySelector(this.offCanvasSelector);jQuery(e).foundation("close")}render(){return c`
            <div class="slides-card activity-slide | position-relative">
                ${this.renderProgressBar()}
                <div class="cover-slide">
                    <button
                        type="button"
                        class="btn icon-btn absolute top ${this.dir==="rtl"?"left":"right"} z-1 m-0 f-3 bypass-nav-click"
                        @click=${this.openMenu}
                    >
                        <span class="icon z-icon-info"></span>
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
                    <button class="close-btn | ms-auto absolute ${this.dir==="rtl"?"left":"right"} top my--2 mx-1 f-0 invert" aria-label=${jsObject.translations.close} type="button" data-close>
                        <span class="icon z-icon-close"></span>
                    </button>

                    <iframe
                        src=${this.slide.right[0]||""}
                        frameborder="0"
                        width="100%"
                    >
                    </iframe>
                </div>
            </div>
        `}}customElements.define("activity-slide",Xo);class el extends D{render(){return c`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="cover-slide">
                    <div class="grow-1 d-flex align-items-center">
                        <div class="center activity-card stack--2" data-large>
                            <span>${this.slide.center[0]}</span>
                            ${this.slide.center[1]?c`<span>${this.slide.center[1]}</span>`:""}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("break-slide",el);class tl extends D{render(){return c`
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
        `}}customElements.define("center-slide",tl);class sl extends D{render(){return c`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon"><span class="icon z-icon-phone"></span></div>
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
        `}}customElements.define("checkin-slide",sl);class il extends D{render(){return c`
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
        `}}customElements.define("congratulations-slide",il);class nl extends D{render(){return c`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon z-icon-discuss"></span>
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
        `}}customElements.define("discuss-slide",nl);class al extends D{render(){return c`
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
        `}}customElements.define("final-slide",al);class rl extends D{render(){return c`
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
        `}}customElements.define("left-image-slide",rl);class ol extends D{render(){return c`
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
        `}}customElements.define("next-steps-slide",ol);class ll extends D{render(){return c`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="obey-slide">
                    <div class="two-column left">
                        <div>
                            <div class="title-area">
                                <div class="title-icon">
                                    <span class="icon z-icon-obey-concept"></span>
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
                                    <span class="icon z-icon-share-concept"></span>
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
        `}}customElements.define("obey-slide",ll);class cl extends D{render(){return c`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon z-icon-overview"></span>
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
        `}}customElements.define("overview-slide",cl);class dl extends D{render(){return c`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon z-icon-pray"></span>
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
        `}}customElements.define("pray-slide",dl);class hl extends D{render(){return c`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon z-icon-review"></span>
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
        `}}customElements.define("review-slide",hl);class ul extends D{render(){return c`
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
        `}}customElements.define("title-slide",ul);class pl extends D{static get properties(){return{slide:{type:Object},showButtons:{type:Boolean},id:{type:String},scriptUrl:{type:String,attribute:!1},offCanvasId:{type:String,attribute:!1}}}firstUpdated(){jQuery(document).foundation(),this.offCanvasId="informationOffCanvas"+this.id,this.offCanvasSelector="#"+this.offCanvasId,this.loadScriptIntoFrame()}openMenu(){const e=document.querySelector(this.offCanvasSelector);jQuery(e).foundation("open")}closeMenu(){const e=document.querySelector(this.offCanvasSelector);jQuery(e).foundation("close")}loadScriptIntoFrame(){const e=this.slide.script_id,t=jsObject.language,s=new URL(location.href),n=new URL(s.origin);n.pathname=[t,"app","script"].join("/"),n.searchParams.append("s",e),this.scriptUrl=n.href}render(){return c`
            <div class="video-slide">

                <button
                    type="button"
                    class="btn icon-btn absolute top ${this.dir==="rtl"?"left":"right"} z-1 m-0 f-3 bypass-nav-click"
                    @click=${this.openMenu}
                >
                    <span class="icon z-icon-info"></span>
                </button>

                <div class="widescreen flex-video">
                    <iframe src="${this.slide.center[0]}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                            frameborder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                    >
                    </iframe>
                </div>

                ${""}
            </div>
            <div
                class="bg-white | information-flyout bypass-nav-click off-canvas ${this.dir==="rtl"?"position-left":"position-right"}"
                id=${this.offCanvasId||"informationOffCanvas"}
                data-off-canvas
                data-transition="overlap"
            >
                <button class="close-btn | ms-auto m--1" aria-label=${jsObject.translations.close} type="button" data-close>
                    <span class="icon z-icon-close"></span>
                </button>

                <iframe
                    src=${this.scriptUrl||""}
                    frameborder="0"
                    width="100%"
                >
                </iframe>
            </div>
        `}}customElements.define("video-slide",pl);class ml extends D{render(){return c`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon z-icon-watch"></span>
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
        `}}customElements.define("watch-slide",ml);class fl extends D{render(){return c`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon z-icon-look-back"></span>
                            </div>
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
        `}}customElements.define("look-back-slide",fl);const vi=["slideshow","guide"];class gl extends ${static get properties(){return{languageCode:{type:String},homeUrl:{type:String},assetsPath:{type:String},zumeSessions:{attribute:!1},menu:{attribute:!1},lessonIndex:{attribute:!1},sessionKey:{attribute:!1},view:{attribute:!1},linkNodes:{attribute:!1},showIndex:{attribute:!1}}}constructor(){super(),this.handleSessionLink=this.handleSessionLink.bind(this),this.handleHistoryPopState=this.handleHistoryPopState.bind(this)}connectedCallback(){super.connectedCallback();const e=new URL(window.location.href),{sessions:t,menu:s}=this.getZumeSessions(e);this.zumeSessions=t,this.menu=s;const n=this.getLessonIndex(e);this.lessonIndex=n,this.sessionKey="",this.view=this.getView(e),this.changeSession(n,!1,t),window.addEventListener("popstate",this.handleHistoryPopState)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handleHistoryPopState)}firstUpdated(){document.querySelectorAll(".language-selector").forEach(function(t){t.addEventListener("click",()=>{const s=t.dataset.value,n=new URL(location.href),a=n.pathname.substring(1).split("/");let r="";a.length>0&&jsObject.zume_languages.includes(a[0])?r=a.slice(1).join("/"):r=a.join("/"),s!=="en"?r="/"+s+"/"+r:r="/"+r,r+=n.search,location.href=r})})}getView(e){if(e.searchParams.has("view")){const t=e.searchParams.get("view");if(vi.includes(t))return t}else return"slideshow"}getLessonIndex(e){if(e.searchParams.has("session")){const t=e.searchParams.get("session");if(t==="index")return"index";const s=Number(t);return Number.isInteger(s)?s-1:0}else return 0}getZumeSessions(e){const t=e.searchParams.get("type")||"10";this.type=t;let s,n;switch(t){case"10":s=zume10Sessions,n=zume10SessionsMenu;break;case"20":s=zume20Sessions,n=zume20SessionsMenu;break;case"intensive":s=zumeIntensiveSessions,n=zumeIntensiveSessionsMenu;break;default:s=zume10Sessions,n=zume10SessionsMenu;break}return{sessions:s,menu:n}}handleSessionLink(e){const t=e.target,s=Number(t.dataset.sessionNumber);this.lessonIndex=s,this.showIndex===!0&&(this.showIndex=!1),this.changeSession(this.lessonIndex),this.closeMenu()}handleSubSectionLink(e,t){this.lessonIndex=e,this.showIndex===!0&&(this.showIndex=!1),this.changeSession(this.lessonIndex),this.sessionKey=t,this.closeMenu()}getNextSession(){this.lessonIndex+=1,this.changeSession(this.lessonIndex)}getPreviousSession(){this.lessonIndex-=1,this.changeSession(this.lessonIndex)}changeSession(e,t=!0,s=null){if(e==="index"){this.showIndex=!0;return}else this.showIndex=!1;const n=s||this.zumeSessions;let a=e;e<0&&(a=0),e>n.length-1&&(a=n.length-1),this.lessonIndex=a,this.session=n[a],t&&this.pushHistory()}pushHistory(){const e=this.lessonIndex,t=this.view,s=new URL(window.location.href);e!==null&&Number.isInteger(e)&&s.searchParams.set("session",e+1),t&&s.searchParams.set("view",t),window.history.pushState(null,null,s.href)}handleHistoryPopState(){var n;const e=new URL(location.href),t=e.searchParams.has("session")?e.searchParams.get("session"):null,s=e.searchParams.get("view");(n=document.querySelector(".js-off-canvas-overlay"))==null||n.classList.remove("is-visible"),Number.isInteger(Number(t))&&(this.lessonIndex=t-1,this.changeSession(this.lessonIndex,!1)),t==="index"&&(this.lessonIndex="index",this.changeSession("index",!1)),s&&vi.includes(s)&&(this.view=s)}getSessionSections(){return this.session?this.session:[]}switchViews(e=!0){this.view==="guide"?this.view="slideshow":this.view="guide",e===!0&&this.pushHistory()}openMenu(){const e=this.querySelector("#offCanvas");jQuery(e).foundation("open")}closeMenu(){const e=this.querySelector("#offCanvas");jQuery(e).foundation("close")}render(){this.showIndex;const e=this.type==="intensive"?"container-xsm":"container-sm";return c`
            ${this.showIndex?c`
                    <div class="course-index | bg-brand-gradient">
                        <img src="${jsObject.images_url}/zume-training-logo-white.svg" alt="Zume Logo" class="mx-auto w-70 py-1" />
                        <div class="${e}" data-max-width="750">
                            <div class="grid | grid-min-8rem gutter0">
                                ${this.zumeSessions.map((t,s)=>c`
                                    <button
                                        class="card-btn | bg-white black m--2 gap--3 aspect-1 justify-content-evenly"
                                        data-session-number=${s}
                                        @click=${this.handleSessionLink}
                                    >
                                        <h2 class="f-0 bold">${jsObject.translations.session}</h2>
                                        <p class="f-3 bold lh-sm">${s+1}</p>
                                        <span class="icon z-icon-course brand-light f-3"></span>
                                    </button>
                                `)}
                            </div>
                        </div>
                    </div>
                `:""}

            <nav class="bg-white px-0 text-center | presenter-menu off-canvas ${this.dir==="rtl"?"position-right":"position-left"} justify-content-between py-1" id="offCanvas" data-off-canvas data-transition="overlap">
                <button class="ms-auto close-btn mb-0" aria-label=${jsObject.translations.close} type="button" data-close>
                    <span class="icon z-icon-close"></span>
                </button>
                <div class="stack">
                    <div class="stack">
                        <!-- Close button -->

                        <!-- Menu -->
                        <ul class="vertical menu accordion-menu" data-accordion-menu data-submenu-toggle="true" data-multi-open="false">
                            ${Object.values(this.menu).map(({title:t,submenu:s},n)=>c`
                                <li>
                                    <a
                                        class="session-link"
                                        data-session-number="${n}"
                                        @click=${this.handleSessionLink}
                                    >
                                        ${t}
                                    </a>
                                    <ul class="menu vertical nested ${this.lessonIndex===n?"is-active":""}">
                                        ${s.map(({key:a,title:r,length:o})=>c`
                                                <a
                                                    class="session-link"
                                                    data-subitem
                                                    href=${`#${a}`}
                                                    @click=${()=>this.handleSubSectionLink(n,a)}
                                                >
                                                    <span>${r}</span> <span>${o}</span>
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
                </div>
            </nav>

            <span class="p-1 d-block fixed top z-2">
                <button id="hamburger-menu" class="nav-toggle show ${this.showIndex?"invert":""}" @click=${this.openMenu}>
                    <span class="hamburger"></span>
                </button>
            </span>

            <div class="">
                ${this.view==="guide"?c`<course-guide .sections=${this.getSessionSections()}></course-guide>`:c`<course-slideshow .sections=${this.getSessionSections()} startSlideKey=${this.sessionKey}></course-slideshow>`}
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-presenter",gl);class vl extends ${static get properties(){return{sections:{type:Array}}}render(){return c`
            <div class="course-guide">
                <div class="stack | py-4 snap-content" data-outline-slides>
                    ${this.sections.map((e,t)=>c`
                            <div class="container | slide-switcher">
                                <slide-switcher
                                    .slide=${e}
                                ></slide-switcher>
                            </div>
                        `)}

                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-guide",vl);class bl extends ${static get properties(){return{sections:{type:Array},startSlideKey:{type:String},sectionIndex:{attribute:!1},currentSlide:{attribute:!1},index:{attribute:!1}}}constructor(){super(),this.reset(),this.sections=[],this.startSlideKey="",this.listenForKeyboard=this.listenForKeyboard.bind(this),this.listenForMouseClick=this.listenForMouseClick.bind(this)}reset(){this.sectionIndex=-1,this.currentSlide=null}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.listenForKeyboard),document.addEventListener("mousedown",this.listenForMouseClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.listenForKeyboard),document.removeEventListener("mousedown",this.listenForMouseClick)}update(e){if(e.has("sections")&&this.reset(),e.has("startSlideKey")&&this.startSlideKey!==""){const t=this.sections.findIndex(({key:s})=>s===this.startSlideKey);this.setSlide(t)}super.update(e)}nextSlide(){if(this.sectionIndex>=this.sections.length-1){this.sectionIndex=this.sections.length-1;return}this.setSlide(this.sectionIndex+1)}previousSlide(){this.sectionIndex<0&&(this.sectionIndex=0),this.setSlide(this.sectionIndex-1)}leftSlide(){document.querySelector("html").dir==="rtl"?this.nextSlide():this.previousSlide()}rightSlide(){document.querySelector("html").dir==="rtl"?this.previousSlide():this.nextSlide()}listenForKeyboard(e){["ArrowRight"].includes(e.code)&&this.rightSlide(),["Space"].includes(e.code)&&this.nextSlide(),["ArrowLeft"].includes(e.code)&&this.leftSlide(),["Backspace"].includes(e.code)&&this.previousSlide()}listenForMouseClick(e){if(e.target.id==="hamburger-menu")return;const t=l=>l.id==="offCanvas"||l.classList.contains("js-off-canvas-overlay")||l.classList.contains("bypass-nav-click");if(this.hasParent(e.target,t))return;const{x:s,type:n,which:a}=e;if(n!=="mousedown"||a!==1)return;const{innerWidth:r}=window,o=1/2*r;s<o&&this.leftSlide(),s>r-o&&this.rightSlide()}hasParent(e,t){let s=e;const n=50;let a=0;for(;s;){if(t(s))return!0;if(s=s.parentElement,a=a+1,a>n)return!1}return!1}setSlide(e){this.sectionIndex=e;const t=this.sections[e];this.currentSlide=t}render(){return this.sectionIndex<0&&this.setSlide(0),c`
            <div class="cover-page course-slideshow">
                <div>
                    <slide-switcher .slide=${this.currentSlide} showControls></slide-switcher>
                </div>
                <div class="visual-indicator left"></div>
                <div class="visual-indicator right"></div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-slideshow",bl);class yl extends ${static get properties(){return{slide:{type:Object},showControls:{type:Boolean}}}render(){if(this.slide)switch(this.slide.type){case"title":return c`<title-slide .slide=${this.slide} id=${this.slide.key}></title-slide>`;case"checkin":return c`<checkin-slide .slide=${this.slide} id=${this.slide.key}></checkin-slide>`;case"pray":return c`<pray-slide .slide=${this.slide} id=${this.slide.key}></pray-slide>`;case"review":return c`<review-slide .slide=${this.slide} id=${this.slide.key}></review-slide>`;case"overview":return c`<overview-slide .slide=${this.slide} id=${this.slide.key}></overview-slide>`;case"challenge":case"center":return c`<center-slide .slide=${this.slide} id=${this.slide.key}></center-slide>`;case"watch":return c`<watch-slide .slide=${this.slide} id=${this.slide.key}></watch-slide>`;case"video":return c`<video-slide .slide=${this.slide} id=${this.slide.key} ?showButtons=${this.showControls}></video-slide>`;case"look_back":return c`<look-back-slide .slide=${this.slide} id=${this.slide.key}></look-back-slide>`;case"discuss":return c`<discuss-slide .slide=${this.slide} id=${this.slide.key}></discuss-slide>`;case"left_content":case"activity":return c`<activity-slide .slide=${this.slide} id=${this.slide.key}></activity-slide>`;case"obey":return c`<obey-slide .slide=${this.slide} id=${this.slide.key}></obey-slide>`;case"left_image":return c`<left-image-slide .slide=${this.slide} id=${this.slide.key}></left-image-slide>`;case"next_steps":return c`<next-steps-slide .slide=${this.slide} id=${this.slide.key}></next-steps-slide>`;case"break":return c`<break-slide .slide=${this.slide} id=${this.slide.key}></break-slide>`;case"congratulations":return c`<congratulations-slide .slide=${this.slide} id=${this.slide.key}></congratulations-slide>`;case"final":return c`<final-slide .slide=${this.slide} id=${this.slide.key}></final-slide>`;default:return c`<course-slide .slide=${this.slide} id=${this.slide.key}></course-slide>`}}createRenderRoot(){return this}}customElements.define("slide-switcher",yl);class wl extends ${static get properties(){return{questions:{type:Array},translations:{type:Object},contact_id:{type:String},user_id:{type:String},showCancel:{type:Boolean},answers:{type:Array,attribue:!1},error:{type:Boolean,attribute:!1},loading:{type:Boolean,attribute:!1}}}constructor(){super(),this.questions=[],this.answers=[],this.translations=[],this.contact_id="",this.user_id="",this.error=!1,this.loading=!1}handleInputChange(e){const t=e.target.dataset.i;this.answers[t]=e.target.value,this.update()}handleCancel(){this.clearAnswers(),this.dispatchEvent(new CustomEvent("3-month-plan-cancelled",{bubbles:!0}))}handleSave(){this.loading=!0;const e=[];if(this.answers.length===0){this.loading=!1;return}return this.answers.forEach((t,s)=>{if(t){const a=this.questions[s];var n=new Date;n.setDate(n.getDate()+30);const r=makeRequest("POST","commitment",{user_id:this.user_id,post_id:this.contact_id,meta_key:"tasks",note:"Question: "+a+" Answer: "+t,question:a,answer:t,date:n,category:"post_training_plan"},"zume_system/v1");e.push(r.promise())}}),Promise.all(e).then(()=>{this.loading=!1,this.clearAnswers(),this.dispatchEvent(new CustomEvent("3-month-plan-saved",{bubbles:!0}))}).catch(t=>{console.error(t),this.error=!0,this.loading=!1})}clearAnswers(){this.renderRoot.querySelectorAll(".post-training-plan").forEach(e=>{e.value=""})}render(){const e=this.loading||this.answers.length===0;return c`
            <div id="pieces-content" class="stack">
                ${this.questions.map((t,s)=>{const n=`question-${s}`;return c`
                        <div class="stack--3">
                            <label for=${n}>${t}</label>
                            <textarea
                                id=${n}
                                data-i=${s}
                                type="text"
                                class="input post-training-plan"
                                rows="1"
                                @input=${this.handleInputChange}
                            ></textarea>
                        </div>
                `})}
                <div class="cluster justify-flex-end">
                    ${this.showCancel?c`
                            <button
                                class="btn light outline uppercase"
                                @click=${this.handleCancel}
                            >
                                ${this.translations.cancel}
                            </button>
                            `:""}
                    <button
                        ?disabled=${e}
                        aria-disabled=${e?"true":"false"}
                        class="btn light uppercase"
                        @click=${this.handleSave}
                    >
                        ${this.translations.save}
                        <span class="loading-spinner ${this.loading?"active":""}"></span>
                    </button>

                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("activity-3-month-plan",wl);class qn extends ${constructor(){super()}render(){return c`
            <div class="container">
                <div class="circle">
                    <div class="triangle"></div>
                </div>
            </div>
        `}}C(qn,"styles",us`
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
    `);window.customElements.define("play-button",qn);class $l extends ${constructor(){super();C(this,"webShareSupported",!!window.navigator.share);C(this,"clipboardSupported",!!window.navigator.clipboard);this.shareFeedback="",this.copyFeedback=""}static get properties(){return{url:{type:String},title:{type:String},t:{type:Object},alwaysShow:{type:Boolean},shareFeedback:{attribute:!1},copyFeedback:{attribute:!1}}}share(){navigator.share({title:this.title,url:this.url,text:title}).then(()=>{this.shareFeedback=this.t.share_feedback,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(t=>console.error("Error sharing",t))}copyLink(t){t.stopImmediatePropagation(),navigator.clipboard.writeText(this.url).then(()=>{this.copyFeedback=this.t.copy_feedback,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(s=>console.error(s))}noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported}render(){return c`
            <div id="share" tabindex="-1" class="stack--2">
              ${this.noOptionsAvailable()?c`
                  <div class="stack--2">
                    <p>${this.t.copy_and_share_text}</p>
                    <p><code>${this.url}</code></p>
                  </div>
              `:c`
                  <div :class="cluster gap--1">
                    ${this.webShareSupported?c`
                        <div class="position-relative">
                          <button class="btn light uppercase" @click=${this.share}>
                            <!-- Share icon -->
                            <span>${this.t.share}</span>
                          </button>
                          <p role="alert" aria-live="polite" id="shareFeedback" class="context-alert" data-state=${this.shareFeedback.length?"":"empty"}>${this.shareFeedback}</p>
                        </div>
                    `:""}
                    ${this.clipboardSupported?c`
                        <div class="stack--2">
                          ${this.alwaysShow?c`<p><code>${this.url}</code></p>`:""}
                          <div class="position-relative fit-content mx-auto">
                            <button class="btn light uppercase fit-content mx-auto" @click=${this.copyLink}>
                              <!-- Link icon -->
                              <span>${this.t.copy_link}</span>
                            </button>
                            <p role="alert" aria-live="polite" id="copyFeedback" class="context-alert" data-state=${this.copyFeedback.length?"":"empty"}>${this.copyFeedback}</p>
                          </div>
                        </div>
                    `:""}
                  </div>
              `}


            </div>
        `}createRenderRoot(){return this}}customElements.define("share-links",$l);class kl extends ${constructor(){super();C(this,"sortAlphabetically",(t,s)=>t.page_title<s.page_title?-1:1);C(this,"sortByKey",(t,s)=>Number(t.key)<Number(s.key)?-1:1);this.items=[],this.itemsToDisplay=[],this.filterType="all"}static get properties(){return{items:{type:Array},itemsToDisplay:{type:Array,attribute:!1},filterType:{type:String,attribute:!1},isSortedAlphabetically:{type:Boolean,attribute:!1}}}connectedCallback(){super.connectedCallback(),this.itemsToDisplay=[...this.items]}filterItems(t){this.filterType=t,this.itemsToDisplay=this.sortItems(this.items.filter(({type:s})=>t==="all"?!0:s===t))}toggleSorting(){this.isSortedAlphabetically=!this.isSortedAlphabetically,this.itemsToDisplay=this.sortItems(this.itemsToDisplay)}sortItems(t){return t.sort((s,n)=>this.isSortedAlphabetically?this.sortAlphabetically(s,n):this.sortByKey(s,n))}renderListItem({page_url:t,page_title:s,type:n,description:a}){return c`
            <li class="share-cards" data-type=${n}>
                <div class="share card">
                    <div class="switcher | switcher-width-25 align-items-center gapx--4">
                        <div class="stack grow-2">
                            <a class="f-1 bold mt-0" href=${t}>
                                ${s}
                            </a>
                            <p class="f--1 show-for-large">
                                ${a}
                            </p>
                        </div>
                        <div class="fit-content ms-auto">
                            <share-links
                                url=${t}
                                title=${s}
                                .t=${zumeShare.translations}>
                            </share-links>
                        </div>
                    </div>
                </div>
            </li>
        `}render(){return c`
            <div class="container-xsm">
                <div class="filter-area d-flex align-items-center justify-flex-end">
                    <span class="f--1 gray-700 lh-sm">${zumeShare.translations.items}: ${this.itemsToDisplay.length}</span>
                    <button
                        class="icon-btn f-2 ${this.isSortedAlphabetically?"bg-gray-300":""}"
                        @click=${this.toggleSorting}
                    >
                        <span class="visually-hidden">${zumeShare.translations.sort}</span>
                        <svg class="w-2rem brand-light" focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12.93 2.65c-.2-.2-.51-.2-.71 0l-2.01 2.01h4.72zm-.7 18.7c.2.2.51.2.71 0l1.98-1.98h-4.66zm-1.25-3.62c.6 0 1.01-.6.79-1.16L8.04 7.03c-.18-.46-.63-.76-1.12-.76-.49 0-.94.3-1.12.76l-3.74 9.53c-.22.56.19 1.16.79 1.16.35 0 .67-.22.8-.55l.71-1.9h5.11l.71 1.9c.13.34.45.56.8.56m-6.01-4.09 1.94-5.18 1.94 5.18zm16.08 2.5h-5.33l5.72-8.29c.46-.66-.02-1.57-.82-1.57h-6.48c-.44 0-.79.36-.79.8v.01c0 .44.36.8.79.8h5.09l-5.73 8.28c-.46.66.02 1.57.82 1.57h6.72c.44 0 .79-.36.79-.79.02-.45-.34-.81-.78-.81"></path></svg>
                    </button>
                    <button class="icon-btn f-2" data-toggle="filter-menu">
                        <span class="visually-hidden">${zumeShare.translations.filter}</span>
                        <span class="icon z-icon-filter brand-light" aria-hidden="true"></span>
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
                        ${te(this.itemsToDisplay,t=>t.key,this.renderListItem)}
                    </ul>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("share-list",kl);class _l extends ${static get properties(){return{t:{type:Object},joinLink:{type:String},loading:{attribute:!1},posts:{attribute:!1}}}constructor(){super(),this.loading=!0,this.plans=[],this.getTrainings(),this.renderRow=this.renderRow.bind(this)}getTrainings(){makeRequest("POST","public_plans",{},"zume_system/v1").then(e=>{this.plans=e}).catch(e=>{console.log(e)}).always(()=>{this.loading=!1})}render(){return this.loading?c`<span class="loading-spinner active"></span>`:this.plans.length===0?c`
                <p>${this.t.no_plans}</p>
            `:c`
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
                    ${this.plans.map(this.renderRow)}
               </tbody>
            </table>
        `}renderRow({join_key:e,language_note:t,post_title:s,time_of_day_note:n,timezone_note:a,...r}){const o=r.set_a_01?"a":"b",l=o==="a"?10:20,d=`set_${o}_`,u=Date.now()/1e3;let p="";for(let m=1;m<l+1;m++){const b=m<10?`0${m}`:`${m}`,O=r[d+b];if(p=O.timestamp,u<O.timestamp)break}const g=moment(p*1e3).format("MMM Do 'YY");return c`
            <tr>
                <td data-label="${this.t.name}">${s}</td>
                <td data-label="${this.t.next_date}">${g}</td>
                <td data-label="${this.t.start_time}">${n}</td>
                <td data-label="${this.t.timezone}">${a}</td>
                <td data-label="${this.t.language}">${t}</td>
                <td><button class="btn" data-code=${e} @click=${this._handleJoinTraining}>${this.t.join}</button></td>
            </tr>
        `}_handleJoinTraining(e){console.log(e);const t=e.target.dataset.code,s=new CustomEvent("chosen-training",{bubbles:!0,detail:{code:t}});this.dispatchEvent(s)}createRenderRoot(){return this}}customElements.define("public-trainings",_l);class Vn extends ${static get properties(){return{radius:{type:Number},lineWidth:{type:Number},percent:{type:Number}}}constructor(){super(),this.radius=100,this.lineWidth=10,this.percent=30}width(){return this.radius*2+this.lineWidth}widthPx(){return this.appendPx(this.width())}center(){return this.width()/2}circumference(){return this.radius*2*Math.PI}circumferencePx(){return this.appendPx(this.circumference())}appendPx(e){return`${e}px`}rotate(e){return`rotate(${e}, ${this.center()}, ${this.center()})`}render(){return c`
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
        `}createRenderRoot(){return this}}customElements.define("progress-circle",Vn);class Sl extends Vn{static get properties(){return{percent:{type:Number},type:{type:String}}}constructor(){super(),this.radius=50,this.lineWidth=15,this.percent=0,this.borderWidth=3,this.type="heard"}width(){return(this.radius+this.lineWidth)*2}getIconSvg(){switch(this.type){case"heard":return nt`
                    <path d="M13.204,14.843c.157-3.465,2.622-6.151,6.05-6.593,3.602-.464,7.067,2.224,7.528,5.84.019.151.028.303.051.453.084.543.565.919,1.079.849.531-.073.901-.535.85-1.079-.09-.964-.299-1.902-.71-2.782-1.357-2.904-3.602-4.681-6.783-5.149-4.548-.67-8.841,2.255-9.775,6.729-.695,3.33-.03,6.397,2.327,8.963.781.85,1.668,1.601,2.472,2.43.534.551,1.049,1.131,1.495,1.754.496.692.669,1.505.631,2.364-.121,2.78,2.078,5.075,4.868,5.091,2.087.012,4.017-1.407,4.624-3.399.169-.553-.083-1.062-.614-1.24-.505-.169-1.018.085-1.21.625-.375,1.054-1.082,1.745-2.179,2.001-1.829.426-3.631-1.042-3.551-2.908.071-1.673-.427-3.158-1.526-4.394-.867-.975-1.835-1.861-2.774-2.772-1.174-1.139-2.156-2.394-2.584-4.011-.24-.909-.31-1.835-.271-2.771Z" stroke-width="0"></path>
                    <path d="M22.416,16.825c-1.639.344-2.761,1.916-2.613,3.472.179,1.88,1.39,3.263,3.162,3.601.237.045.486.086.722.059.502-.056.865-.512.837-.996-.029-.509-.412-.882-.953-.927-.921-.078-1.624-.699-1.795-1.587-.226-1.172.702-1.837,1.898-1.848.737-.007,1.224-.331,1.128-1.091-.055-.433-.488-1.081-2.385-.684Z" stroke-width="0"></path>
                `;case"obeyed":return nt`
                    <path d="M21.57,18.138c-.204,1.02-.396,1.984-.589,2.948-.06.299-.116.599-.179.898-.012.057-.047.109-.087.195.117.163.256.361.4.556.397.536.795,1.072,1.194,1.606.743.993,1.239,2.082,1.465,3.316.261,1.422.608,2.829.922,4.241.183.825-.274,1.597-1.058,1.778-.783.18-1.554-.308-1.742-1.125-.279-1.212-.56-2.424-.804-3.643-.204-1.021-.594-1.958-1.176-2.812-.781-1.144-1.585-2.272-2.374-3.411-.254-.367-.481-.753-.74-1.117-.501-.703-.591-1.47-.421-2.296.247-1.201.478-2.406.716-3.609.003-.016.003-.033.006-.074-.05.04-.089.066-.123.097-.598.545-1.197,1.088-1.789,1.639-.062.057-.11.158-.115.242-.087,1.326-.165,2.653-.248,3.979-.041.641-.554,1.087-1.186,1.04-.6-.045-1.035-.574-.995-1.196.09-1.411.176-2.822.261-4.233.03-.498.222-.916.592-1.253,1.221-1.112,2.44-2.226,3.66-3.339.129-.118.246-.252.385-.356.381-.287.817-.384,1.283-.297.717.134,1.431.278,2.145.426.596.124,1.038.46,1.25,1.033.148.401.244.822.346,1.239.243.995.654,1.924,1.094,2.842.143.297.376.491.691.613.959.373,1.91.764,2.864,1.149.068.027.136.055.203.087.583.277.825.859.591,1.42-.224.536-.856.795-1.439.577-.392-.146-.777-.31-1.165-.465-.829-.332-1.655-.671-2.488-.994-.314-.122-.566-.312-.739-.594-.174-.284-.325-.582-.486-.874-.035-.063-.069-.126-.126-.232Z" stroke-width="0"></path>
                    <path d="M15.828,22.191c.259.402.497.772.735,1.142.48.747.962,1.492,1.437,2.242.041.065.066.158.057.233-.038.303-.09.604-.143.904-.098.559-.309,1.069-.618,1.547-.923,1.43-1.831,2.869-2.752,4.3-.552.858-1.767.912-2.364.114-.368-.492-.375-1.17-.015-1.736.694-1.093,1.366-2.201,2.093-3.272.688-1.014,1.054-2.129,1.231-3.324.098-.66.201-1.319.303-1.978.007-.044.018-.087.037-.174Z" stroke-width="0"></path>
                    <path d="M21.246,11.553c-1.455,0-2.629-1.176-2.629-2.635,0-1.455,1.178-2.631,2.634-2.631,1.456,0,2.636,1.174,2.64,2.628.004,1.46-1.176,2.637-2.645,2.638Z" stroke-width="0"></path>
                `;case"shared":return nt`
                    <path d="M12.845,18.138c-.204,1.02-.396,1.984-.589,2.948-.06.299-.116.599-.179.898-.012.057-.047.109-.087.195.117.163.256.361.4.556.397.536.795,1.072,1.194,1.606.743.993,1.239,2.082,1.465,3.316.261,1.422.608,2.829.922,4.241.183.825-.274,1.597-1.058,1.778-.783.18-1.554-.308-1.742-1.125-.279-1.212-.56-2.424-.804-3.643-.204-1.021-.594-1.958-1.176-2.812-.781-1.144-1.585-2.272-2.374-3.411-.254-.367-.481-.753-.74-1.117-.501-.703-.591-1.47-.421-2.296.247-1.201.478-2.406.716-3.609.003-.016.003-.033.006-.074-.05.04-.089.066-.123.097-.598.545-1.197,1.088-1.789,1.639-.062.057-.11.158-.115.242-.087,1.326-.165,2.653-.248,3.979-.041.641-.554,1.087-1.186,1.04-.6-.045-1.035-.574-.995-1.196.09-1.411.176-2.822.261-4.233.03-.498.222-.916.592-1.253,1.221-1.112,2.44-2.226,3.66-3.339.129-.118.246-.252.385-.356.381-.287.817-.384,1.283-.297.717.134,1.431.278,2.145.426.596.124,1.038.46,1.25,1.033.148.401.244.822.346,1.239.243.995.654,1.924,1.094,2.842.143.297.376.491.691.613.959.373,1.91.764,2.864,1.149.068.027.136.055.203.087.583.277.825.859.591,1.42-.224.536-.856.795-1.439.577-.392-.146-.777-.31-1.165-.465-.829-.332-1.655-.671-2.488-.994-.314-.122-.566-.312-.739-.594-.174-.284-.325-.582-.486-.874-.035-.063-.069-.126-.126-.232Z" stroke-width="0"></path>
                    <path d="M7.102,22.191c.259.402.497.772.735,1.142.48.747.962,1.492,1.437,2.242.041.065.066.158.057.233-.038.303-.09.604-.143.904-.098.559-.309,1.069-.618,1.547-.923,1.43-1.831,2.869-2.752,4.3-.552.858-1.767.912-2.364.114-.368-.492-.375-1.17-.015-1.736.694-1.093,1.366-2.201,2.093-3.272.688-1.014,1.054-2.129,1.231-3.324.098-.66.201-1.319.303-1.978.007-.044.018-.087.037-.174Z" stroke-width="0"></path>
                    <path d="M12.521,11.553c-1.455,0-2.629-1.176-2.629-2.635,0-1.455,1.178-2.631,2.634-2.631,1.456,0,2.636,1.174,2.64,2.628.004,1.46-1.176,2.637-2.645,2.638Z" stroke-width="0"></path>
                    <path d="M27.155,18.138c.204,1.02.396,1.984.589,2.948.06.299.116.599.179.898.012.057.047.109.087.195-.117.163-.256.361-.4.556-.397.536-.795,1.072-1.194,1.606-.743.993-1.239,2.082-1.465,3.316-.261,1.422-.608,2.829-.922,4.241-.183.825.274,1.597,1.058,1.778.783.18,1.554-.308,1.742-1.125.279-1.212.56-2.424.804-3.643.204-1.021.594-1.958,1.176-2.812.781-1.144,1.585-2.272,2.374-3.411.254-.367.481-.753.74-1.117.501-.703.591-1.47.421-2.296-.247-1.201-.478-2.406-.716-3.609-.003-.016-.003-.033-.006-.074.05.04.089.066.123.097.598.545,1.197,1.088,1.789,1.639.062.057.11.158.115.242.087,1.326.165,2.653.248,3.979.041.641.554,1.087,1.186,1.04.6-.045,1.035-.574.995-1.196-.09-1.411-.176-2.822-.261-4.233-.03-.498-.222-.916-.592-1.253-1.221-1.112-2.44-2.226-3.66-3.339-.129-.118-.246-.252-.385-.356-.381-.287-.817-.384-1.283-.297-.717.134-1.431.278-2.145.426-.596.124-1.038.46-1.25,1.033-.148.401-.244.822-.346,1.239-.243.995-.654,1.924-1.094,2.842-.143.297-.376.491-.691.613-.959.373-1.91.764-2.864,1.149-.068.027-.136.055-.203.087-.583.277-.825.859-.591,1.42.224.536.856.795,1.439.577.392-.146.777-.31,1.165-.465.829-.332,1.655-.671,2.488-.994.314-.122.566-.312.739-.594.174-.284.325-.582.486-.874.035-.063.069-.126.126-.232Z" stroke-width="0"></path>
                    <path d="M32.898,22.191c-.259.402-.497.772-.735,1.142-.48.747-.962,1.492-1.437,2.242-.041.065-.066.158-.057.233.038.303.09.604.143.904.098.559.309,1.069.618,1.547.923,1.43,1.831,2.869,2.752,4.3.552.858,1.767.912,2.364.114.368-.492.375-1.17.015-1.736-.694-1.093-1.366-2.201-2.093-3.272-.688-1.014-1.054-2.129-1.231-3.324-.098-.66-.201-1.319-.303-1.978-.007-.044-.018-.087-.037-.174Z" stroke-width="0"></path>
                    <path d="M27.479,11.553c1.455,0,2.629-1.176,2.629-2.635,0-1.455-1.178-2.631-2.634-2.631-1.456,0-2.636,1.174-2.64,2.628-.004,1.46,1.176,2.637,2.645,2.638Z" stroke-width="0"></path>
                `;case"trained":return nt`
                    <path d="M21.796,16.477c-.172.859-.334,1.671-.496,2.484-.05.252-.098.505-.151.757-.01.048-.04.091-.073.164.099.137.216.304.337.468.334.452.67.903,1.006,1.354.626.837,1.044,1.754,1.235,2.794.22,1.198.513,2.383.777,3.574.154.695-.231,1.346-.892,1.498-.659.152-1.31-.259-1.468-.948-.235-1.021-.472-2.042-.677-3.069-.172-.86-.5-1.649-.991-2.369-.658-.964-1.335-1.915-2-2.874-.214-.309-.405-.635-.624-.941-.422-.592-.498-1.238-.355-1.934.208-1.012.403-2.027.603-3.041.003-.014.003-.028.005-.063-.043.033-.075.056-.103.082-.504.459-1.009.917-1.508,1.381-.052.048-.092.133-.097.204-.074,1.117-.139,2.235-.209,3.353-.034.54-.467.916-.999.876-.506-.038-.872-.483-.838-1.008.076-1.189.148-2.378.22-3.567.025-.42.187-.772.499-1.056,1.029-.937,2.056-1.875,3.084-2.814.109-.099.207-.212.325-.3.321-.242.688-.324,1.081-.25.604.113,1.206.234,1.808.359.502.104.874.388,1.053.871.125.338.206.693.291,1.044.205.838.551,1.621.922,2.395.12.25.317.414.582.517.808.314,1.609.644,2.413.968.057.023.115.047.171.073.491.233.695.724.498,1.196-.188.452-.722.669-1.213.486-.33-.123-.655-.261-.982-.392-.698-.28-1.395-.565-2.096-.837-.265-.103-.477-.263-.623-.501-.147-.239-.274-.49-.409-.736-.029-.053-.058-.106-.107-.195Z" stroke-width="0"></path>
                    <path d="M16.958,19.892c.218.339.419.65.619.962.404.629.81,1.258,1.211,1.889.035.055.056.133.048.196-.032.255-.076.509-.12.762-.083.471-.261.901-.521,1.304-.778,1.205-1.543,2.417-2.319,3.623-.465.723-1.489.769-1.992.096-.31-.414-.316-.986-.013-1.462.585-.921,1.151-1.855,1.763-2.757.579-.854.888-1.794,1.037-2.8.082-.556.169-1.111.255-1.667.006-.037.016-.073.031-.147Z" stroke-width="0"></path>
                    <path d="M21.524,10.929c-1.226,0-2.215-.991-2.215-2.22,0-1.226.992-2.217,2.219-2.217,1.227,0,2.221.99,2.224,2.215.003,1.23-.991,2.222-2.229,2.222Z" stroke-width="0"></path>
                    <path d="M10.472,22.851c-.139.698-.271,1.357-.403,2.017-.041.205-.079.41-.122.614-.008.039-.032.074-.059.133.08.112.175.247.274.38.272.367.544.734.817,1.099.508.68.848,1.425,1.003,2.269.178.973.416,1.936.631,2.902.125.564-.187,1.093-.724,1.216-.536.123-1.063-.211-1.192-.77-.191-.829-.383-1.658-.55-2.492-.14-.699-.406-1.34-.805-1.924-.534-.783-1.084-1.555-1.624-2.334-.174-.251-.329-.515-.506-.764-.343-.481-.404-1.006-.288-1.571.169-.822.327-1.646.49-2.47.002-.011.002-.023.004-.051-.035.027-.061.045-.084.066-.409.373-.819.744-1.224,1.121-.042.039-.075.108-.079.166-.06.907-.113,1.815-.17,2.723-.028.439-.379.744-.812.711-.411-.031-.708-.393-.681-.818.062-.965.12-1.931.178-2.897.02-.341.152-.627.405-.857.835-.761,1.67-1.523,2.504-2.285.088-.081.168-.172.264-.244.261-.197.559-.263.878-.203.49.092.979.19,1.468.291.408.085.71.315.855.707.102.274.167.563.237.848.167.681.447,1.317.749,1.945.098.203.257.336.472.42.656.255,1.307.523,1.959.786.047.019.093.038.139.059.399.189.565.588.404.971-.153.367-.586.544-.985.395-.268-.1-.532-.212-.797-.318-.567-.227-1.133-.459-1.702-.68-.215-.084-.387-.214-.506-.407-.119-.194-.222-.398-.332-.598-.024-.043-.047-.086-.087-.159Z" stroke-width="0"></path>
                    <path d="M6.543,25.624c.177.275.34.528.503.782.328.511.658,1.021.983,1.534.028.044.045.108.039.159-.026.207-.062.413-.098.619-.067.382-.212.732-.423,1.059-.631.978-1.253,1.963-1.883,2.942-.378.587-1.209.624-1.618.078-.252-.336-.257-.8-.011-1.188.475-.748.935-1.506,1.432-2.239.471-.694.721-1.457.843-2.274.067-.451.138-.902.207-1.353.005-.03.013-.06.025-.119Z" stroke-width="0"></path>
                    <path d="M10.251,18.345c-.996,0-1.799-.804-1.799-1.803,0-.995.806-1.8,1.802-1.801.996,0,1.804.804,1.806,1.798.003.999-.805,1.804-1.81,1.805Z" stroke-width="0"></path>
                    <path d="M31.677,22.851c-.139.698-.271,1.357-.403,2.017-.041.205-.079.41-.122.614-.008.039-.032.074-.059.133.08.112.175.247.274.38.272.367.544.734.817,1.099.508.68.848,1.425,1.003,2.269.178.973.416,1.936.631,2.902.125.564-.187,1.093-.724,1.216-.536.123-1.063-.211-1.192-.77-.191-.829-.383-1.658-.55-2.492-.14-.699-.406-1.34-.805-1.924-.534-.783-1.084-1.555-1.624-2.334-.174-.251-.329-.515-.506-.764-.343-.481-.404-1.006-.288-1.571.169-.822.327-1.646.49-2.47.002-.011.002-.023.004-.051-.035.027-.061.045-.084.066-.409.373-.819.744-1.224,1.121-.042.039-.075.108-.079.166-.06.907-.113,1.815-.17,2.723-.028.439-.379.744-.812.711-.411-.031-.708-.393-.681-.818.062-.965.12-1.931.178-2.897.02-.341.152-.627.405-.857.835-.761,1.67-1.523,2.504-2.285.088-.081.168-.172.264-.244.261-.197.559-.263.878-.203.49.092.979.19,1.468.291.408.085.71.315.855.707.102.274.167.563.237.848.167.681.447,1.317.749,1.945.098.203.257.336.472.42.656.255,1.307.523,1.959.786.047.019.093.038.139.059.399.189.565.588.404.971-.153.367-.586.544-.985.395-.268-.1-.532-.212-.797-.318-.567-.227-1.133-.459-1.702-.68-.215-.084-.387-.214-.506-.407-.119-.194-.222-.398-.332-.598-.024-.043-.047-.086-.087-.159Z" stroke-width="0"></path>
                    <path d="M27.747,25.624c.177.275.34.528.503.782.328.511.658,1.021.983,1.534.028.044.045.108.039.159-.026.207-.062.413-.098.619-.067.382-.212.732-.423,1.059-.631.978-1.253,1.963-1.883,2.942-.378.587-1.209.624-1.618.078-.252-.336-.257-.8-.011-1.188.475-.748.935-1.506,1.432-2.239.471-.694.721-1.457.843-2.274.067-.451.138-.902.207-1.353.005-.03.013-.06.025-.119Z" stroke-width="0"></path>
                    <path d="M31.455,18.345c-.996,0-1.799-.804-1.799-1.803,0-.995.806-1.8,1.802-1.801.996,0,1.804.804,1.806,1.798.003.999-.805,1.804-1.81,1.805Z" stroke-width="0"></path>
                `}}iconSize(){return this.width()/2}iconPosition(){const e=(this.width()-this.iconSize())/2;return[e,e]}render(){const e=this.iconSize(),[t,s]=this.iconPosition();return c`
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
        `}createRenderRoot(){return this}}customElements.define("host-progress-circle",Sl);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*bi(i,e,t=1){const s=e===void 0?0:i;e!=null||(e=i);for(let n=s;t>0?n<e:e<n;n+=t)yield n}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*yi(i,e){if(i!==void 0){let t=0;for(const s of i)yield e(s,t++)}}class Hn extends ${static get properties(){return{startDate:{type:String},endDate:{type:String},selectedDays:{type:Array},view:{type:String},showToday:{type:Boolean},monthToShow:{attribute:!1}}}constructor(){super(),this.monthToShow=null,this.startDate="",this.endDate="",this.selectedDays=[],this.showToday=!1,this.today=v.now().toISODate(),this.view="slider"}nextView(e){this.shadowRoot.querySelectorAll(".selected-time").forEach(t=>t.classList.remove("selected-time")),this.monthToShow=e}selectDay(e,t){const s=this.selectedDays.filter(n=>n.date===t);s.length===0?this.dispatchEvent(new CustomEvent("day-added",{detail:{date:t}})):s.forEach(({id:n})=>{this.dispatchEvent(new CustomEvent("day-removed",{detail:{id:n}}))}),this.shadowRoot.querySelectorAll(".selected-time").forEach(n=>n.classList.remove("selected-time")),e.target.classList.add("selected-time")}getDaysOfTheWeekInitials(e="en-US",t="long"){const s=new Date,n=864e5,a=new Intl.DateTimeFormat(e,{weekday:t}).format;return[...Array(7).keys()].map(r=>a(new Date().getTime()-(s.getDay()-r)*n))}buildCalendarDays(e="en-US",t){const s=t.startOf("month").startOf("day"),n=[],a=new Intl.DateTimeFormat(e,{day:"numeric"}).format;for(let r=0;r<t.daysInMonth;r++){const o=s.plus({days:r}),l=o.plus({days:1}),d=this.endDate&&o>v.fromISO(this.endDate)||l<=v.fromISO(this.startDate),u={key:o.toISODate(),formatted:a(o.toMillis()),disabled:d};n.push(u)}return n}addMonth(){const e=v.fromISO(this.endDate).plus({months:1}).endOf("month").toISODate();this.dispatchEvent(new CustomEvent("calendar-extended",{detail:{newEndDate:e}})),this.endDate=e}isSelected(e){return!!this.selectedDays.find(s=>s.date===e)}renderCalendar(e){const t=this.getDaysOfTheWeekInitials(navigator.language,"narrow"),s=e.startOf("month").weekday,n=this.buildCalendarDays(navigator.language,e);return c`
            ${t.map(a=>c`
                    <div class="cell week-day">
                        ${a}
                    </div>
                `)}
            ${yi(bi(s%7),a=>c`
                    <div class="cell"></div>
                `)}
            ${n.map(a=>c`
                    <div
                        class="cell day ${a.disabled?"disabled":""} ${this.isSelected(a.key)?"selected-day":""} ${this.showToday&&a.key===this.today?"today":""}"
                        data-day=${a.key}
                        @click=${r=>!a.disabled&&this.selectDay(r,a.key)}
                    >
                        ${a.formatted}
                    </div>
                `)}
        `}renderSlider(){const e=v.now({locale:navigator.language}),t=this.monthToShow||v.max(e,v.fromISO(this.startDate)),s=t.startOf("month"),n=t.minus({months:1}),a=s.plus({months:1});return c`

            <div class="calendar-wrapper">
                <div class="calendar">
                    <button
                        class="month-next"
                        ?disabled=${s<e}
                        @click=${()=>this.nextView(n)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <path d="M15 6L8 12L15 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <h3 class="month-title">
                        ${t.toFormat("LLLL y")}
                    </h3>
                    <button
                        class="month-next"
                        ?disabled=${a>v.fromISO(this.endDate)}
                        @click=${()=>this.nextView(a)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <path d="M10 6L17 12L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    ${this.renderCalendar(t)}
                </div>
            </div>
        `}render(){if(this.view==="all"){const t=v.fromISO(this.startDate).startOf("month");let s=0;for(;t.plus({months:s})<v.fromISO(this.endDate);)s=s+1;return c`
                <div class="calendar-wrapper">
                    ${yi(bi(s),n=>{const a=t.plus({months:n});return c`
                                <div class="calendar">
                                    <h3 class="month-title full-width">
                                        ${a.toFormat("LLLL y")}
                                    </h3>
                                    ${this.renderCalendar(a)}
                                </div>
                            `})}
                    ${this.view!=="slider"?c`
                            <div class="add-month-button" role="button" @click=${this.addMonth}>
                                <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" color="currentColor" width="40" height="40" viewBox="0 0 40 40">
                                    <path d="M32.104,18.262h-10.365V7.896c0-.96-.777-1.738-1.738-1.738s-1.738.778-1.738,1.738v10.366H7.896c-.961,0-1.738.778-1.738,1.738s.777,1.738,1.738,1.738h10.367v10.367c0,.96.777,1.738,1.738,1.738s1.738-.778,1.738-1.738v-10.367h10.365c.961,0,1.738-.778,1.738-1.738s-.777-1.738-1.738-1.738Z" stroke-width="0"/>
                                </svg>
                            </div>
                        `:""}
                </div>
            `}else return this.renderSlider()}}C(Hn,"styles",[us`
          :host {
            display: block;
            container-type: inline-size;
            container-name: calendar;
          }
          .calendar-wrapper {
            --cp-color: var(--primary-color, #489bfa);
            --cp-color-darker: var(--primary-darker, #387cc9);
            --cp-hover-color: var(--hover-color, #4676fa1a);
            --cp-grid-min-size: var(--grid-min-size, 190px);

            display: grid;
            grid-gap: 1rem;
            grid-auto-rows: 1fr;
          }
          @supports (width: min(250px, 100%)) {
            .calendar-wrapper {
              grid-template-columns: repeat(auto-fit, minmax(min(var(--cp-grid-min-size), 100%), 1fr));
            }
          }
          .calendar {
            display: grid;
            grid-template-columns: repeat(7, 14.2%);
            row-gap: 4px;
            justify-items: center;
          }
          .cell {
            display: flex;
            align-items: center;
            justify-content: center;
            aspect-ratio: 1;
            max-width: 40px;
            border-radius: 50%;
            border-width: 2px;
            border-style: solid;
            border-color: transparent;
            transition: background-color 50ms linear;
            width: 100%;
          }
          .day.cell:hover {
            background-color: var(--cp-hover-color);
            cursor: pointer;
          }
          .day.cell.disabled  {
            color:lightgrey;
            cursor: default;
          }
          .day.cell.disabled:hover {
            background-color: transparent;
          }
          .week-day {
            font-weight: 600;
            font-size:clamp(0.75em, 0.65rem + 2cqi, 1em);
          }
          .selected-time {
            color: black;
            border-color: var(--cp-color);
            background-color: var(--cp-hover-color);
          }
          .selected-day {
            color: white;
            background-color: var(--cp-color);
          }
          .today {
            border-color: black;
          }
          .day.cell.selected-day:hover {
            color: white;
            background-color: var(--cp-color-darker);
          }
          .month-title {
            display: flex;
            justify-content: space-between;
            font-size: 1.2rem;
            font-weight: 600;
            grid-column: 2 / 7;
            margin-block: 0;
          }
          .month-title.full-width {
            grid-column: 1 / 8;
          }
          .month-next {
            padding: 0.2rem 0.25rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .month-next svg {
            width: 1.5rem;
          }
          button {
            padding: 0.25rem 0.5rem;
            color: rgb(254, 254, 254);
            font-size: 1rem;
            border-radius: 5px;
            border: 1px solid transparent;
            font-weight: normal;
            padding: 0.85rem 1rem;
            cursor: pointer;
            background-color: var(--cp-color);
            line-height: 1;
            transition: all 50ms linear;
          }
          button:not([disabled]):hover {
            background-color: transparent;
            border-color: var(--cp-color);
            color: var(--cp-color);
          }
          button[disabled] {
            opacity: 0.25;
            cursor: default;
          }
          .add-month-button {
            display: flex;
            align-items: center;
            justify-content: center;
            fill: var(--cp-color);
            background-color: var(--cp-hover-color);
            margin-inline: 10%;
            margin-block: auto;
            aspect-ratio: 3 / 4;
            border-radius: 10%;
            transition: all 50ms linear;
            cursor: pointer;
          }
          .add-month-button:hover svg,
          .add-month-button:active svg,
          .add-month-button:focus svg {
            transform: scale(1.2);
          }
          .add-month-button svg {
            transition: transform 100ms linear;
            width: 30%;
          }
        `]);customElements.define("calendar-select",Hn);class Ol extends ${static get properties(){return{t:{type:Object},selectedDays:{type:Array},date:{type:String,attribute:!1}}}connectedCallback(){super.connectedCallback(),this.renderDate=this.renderDate.bind(this)}onChange(e){this.date=e.target.value}addDate(){this.date&&this.dispatchEvent(new CustomEvent("day-added",{detail:{date:this.date}}))}removeDate(e){this.dispatchEvent(new CustomEvent("day-removed",{detail:{id:e}}))}renderDate({date:e,id:t},s){return c`
            <li>
                <div class="d-flex align-items-center justify-content-between">
                    <span class="mx-0">${v.fromISO(e).toFormat("DDDD")}</span>
                    <button class="close-btn" @click=${()=>this.removeDate(t)}>
                        <span class="icon z-icon-close"></span>
                    </button>
                </div>
            </li>
        `}sortDays(e,t){return e.date===t.date?0:e.date<t.date?-1:1}render(){return c`
            <div class="stack">
                <ol class="stack">
                ${this.selectedDays.length===0?c`
                        <span>${this.t.no_days_selected}</span>
                    `:c`
                        ${te(this.selectedDays.sort(this.sortDays),e=>e.id,this.renderDate)}
                    `}
                </ol>

                <div class="d-flex align-items-center gap-0 mx-auto">
                    <input class="input fit-content" type="date" @change=${this.onChange} value=${this.date} />
                    <button class="btn light tight" @click=${this.addDate}>
                        ${this.t.add}
                    </button>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("calendar-list",Ol);class Zn extends ${static get properties(){return{percentage:{type:Number}}}render(){return c`
            <div class="progress-bar">
                <div class="progress-bar__slider" style="--percentage:${Number(this.percentage)>100?"100":this.percentage}%"></div>
            </div>
        `}}C(Zn,"styles",[us`
            :host {
                display: block;
                --ps-primary-color: var(--primary-color, #7cb8fc);
                --ps-secondary-color: var(--secondary-color, #C1C1C1);
            }
            .progress-bar {
                height: 20px;
                width: 100%;
                border-radius: 100px;
                border: none;
                background-color: var(--ps-secondary-color);
            }
            .progress-bar__slider {
                height: 100%;
                width: var(--percentage);
                border-radius: 100px;
                background-color: var(--ps-primary-color);
                transition: width 100ms linear;
            }
        `]);customElements.define("progress-slider",Zn);
//# sourceMappingURL=main-bundle.js.map
