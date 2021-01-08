!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).okLit={})}(this,(function(t){"use strict";const e=new WeakMap,n=t=>"function"==typeof t&&e.has(t),s="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(t,e,n=null,s=null)=>{for(;e!==n;){const n=e.nextSibling;t.insertBefore(e,s),e=n}},r=(t,e,n=null)=>{for(;e!==n;){const n=e.nextSibling;t.removeChild(e),e=n}},o={},a={},l=`{{lit-${String(Math.random()).slice(2)}}}`,c=`\x3c!--${l}--\x3e`,u=new RegExp(`${l}|${c}`),h="$lit$";class d{constructor(t,e){this.parts=[],this.element=e;const n=[],s=[],i=document.createTreeWalker(e.content,133,null,!1);let r=0,o=-1,a=0;const{strings:c,values:{length:d}}=t;for(;a<d;){const t=i.nextNode();if(null!==t){if(o++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:n}=e;let s=0;for(let t=0;t<n;t++)p(e[t].name,h)&&s++;for(;s-- >0;){const e=c[a],n=m.exec(e)[2],s=n.toLowerCase()+h,i=t.getAttribute(s);t.removeAttribute(s);const r=i.split(u);this.parts.push({type:"attribute",index:o,name:n,strings:r}),a+=r.length-1}}"TEMPLATE"===t.tagName&&(s.push(t),i.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(l)>=0){const s=t.parentNode,i=e.split(u),r=i.length-1;for(let e=0;e<r;e++){let n,r=i[e];if(""===r)n=_();else{const t=m.exec(r);null!==t&&p(t[2],h)&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-h.length)+t[3]),n=document.createTextNode(r)}s.insertBefore(n,t),this.parts.push({type:"node",index:++o})}""===i[r]?(s.insertBefore(_(),t),n.push(t)):t.data=i[r],a+=r}}else if(8===t.nodeType)if(t.data===l){const e=t.parentNode;null!==t.previousSibling&&o!==r||(o++,e.insertBefore(_(),t)),r=o,this.parts.push({type:"node",index:o}),null===t.nextSibling?t.data="":(n.push(t),o--),a++}else{let e=-1;for(;-1!==(e=t.data.indexOf(l,e+1));)this.parts.push({type:"node",index:-1}),a++}}else i.currentNode=s.pop()}for(const t of n)t.parentNode.removeChild(t)}}const p=(t,e)=>{const n=t.length-e.length;return n>=0&&t.slice(n)===e},f=t=>-1!==t.index,_=()=>document.createComment(""),m=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class v{constructor(t,e,n){this.__parts=[],this.template=t,this.processor=e,this.options=n}update(t){let e=0;for(const n of this.__parts)void 0!==n&&n.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],n=this.template.parts,i=document.createTreeWalker(t,133,null,!1);let r,o=0,a=0,l=i.nextNode();for(;o<n.length;)if(r=n[o],f(r)){for(;a<r.index;)a++,"TEMPLATE"===l.nodeName&&(e.push(l),i.currentNode=l.content),null===(l=i.nextNode())&&(i.currentNode=e.pop(),l=i.nextNode());if("node"===r.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return s&&(document.adoptNode(t),customElements.upgrade(t)),t}}const g=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),y=` ${l} `;class b{constructor(t,e,n,s){this.strings=t,this.values=e,this.type=n,this.processor=s}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let s=0;s<t;s++){const t=this.strings[s],i=t.lastIndexOf("\x3c!--");n=(i>-1||n)&&-1===t.indexOf("--\x3e",i+1);const r=m.exec(t);e+=null===r?t+(n?y:c):t.substr(0,r.index)+r[1]+r[2]+h+r[3]+l}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==g&&(e=g.createHTML(e)),t.innerHTML=e,t}}class w extends b{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const t=super.getTemplateElement(),e=t.content,n=e.firstChild;return e.removeChild(n),i(e,n.firstChild),t}}const x=t=>null===t||!("object"==typeof t||"function"==typeof t),N=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class E{constructor(t,e,n){this.dirty=!0,this.element=t,this.name=e,this.strings=n,this.parts=[];for(let t=0;t<n.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new R(this)}_getValue(){const t=this.strings,e=t.length-1,n=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=n[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!N(t))return t}let s="";for(let i=0;i<e;i++){s+=t[i];const e=n[i];if(void 0!==e){const t=e.value;if(x(t)||!N(t))s+="string"==typeof t?t:String(t);else for(const e of t)s+="string"==typeof e?e:String(e)}}return s+=t[e],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class R{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===o||x(t)&&t===this.value||(this.value=t,n(t)||(this.committer.dirty=!0))}commit(){for(;n(this.value);){const t=this.value;this.value=o,t(this)}this.value!==o&&this.committer.commit()}}class T{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(_()),this.endNode=t.appendChild(_())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=_()),t.__insert(this.endNode=_())}insertAfterPart(t){t.__insert(this.startNode=_()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;n(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=o,t(this)}const t=this.__pendingValue;t!==o&&(x(t)?t!==this.value&&this.__commitText(t):t instanceof b?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):N(t)?this.__commitIterable(t):t===a?(this.value=a,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,n="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=n:this.__commitNode(document.createTextNode(n)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof v&&this.value.template===e)this.value.update(t.values);else{const n=new v(e,t.processor,this.options),s=n._clone();n.update(t.values),this.__commitNode(s),this.value=n}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let n,s=0;for(const i of t)n=e[s],void 0===n&&(n=new T(this.options),e.push(n),0===s?n.appendIntoPart(this):n.insertAfterPart(e[s-1])),n.setValue(i),n.commit(),s++;s<e.length&&(e.length=s,this.clear(n&&n.endNode))}clear(t=this.startNode){r(this.startNode.parentNode,t.nextSibling,this.endNode)}}class S{constructor(t,e,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=n}setValue(t){this.__pendingValue=t}commit(){for(;n(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=o,t(this)}if(this.__pendingValue===o)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=o}}class A extends E{constructor(t,e,n){super(t,e,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new k(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class k extends R{}let V=!1;(()=>{try{const t={get capture(){return V=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class P{constructor(t,e,n){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=n,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;n(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=o,t(this)}if(this.__pendingValue===o)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=M(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=o}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const M=t=>t&&(V?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);class O{handleAttributeExpressions(t,e,n,s){const i=e[0];if("."===i){return new A(t,e.slice(1),n).parts}if("@"===i)return[new P(t,e.slice(1),s.eventContext)];if("?"===i)return[new S(t,e.slice(1),n)];return new E(t,e,n).parts}handleTextExpression(t){return new T(t)}}const j=new O;function C(t){let e=$.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},$.set(t.type,e));let n=e.stringsArray.get(t.strings);if(void 0!==n)return n;const s=t.strings.join(l);return n=e.keyString.get(s),void 0===n&&(n=new d(t,t.getTemplateElement()),e.keyString.set(s,n)),e.stringsArray.set(t.strings,n),n}const $=new Map,L=new WeakMap,H=(t,e,n)=>{let s=L.get(e);void 0===s&&(r(e,e.firstChild),L.set(e,s=new T(Object.assign({templateFactory:C},n))),s.appendInto(e)),s.setValue(t),s.commit()};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const I={},B=()=>{},W=Object.assign,F=Object.prototype.hasOwnProperty,z=(t,e)=>F.call(t,e),D=Array.isArray,q=t=>"[object Map]"===Y(t),U=t=>"function"==typeof t,K=t=>"symbol"==typeof t,J=t=>null!==t&&"object"==typeof t,G=Object.prototype.toString,Y=t=>G.call(t),Q=t=>"string"==typeof t&&"NaN"!==t&&"-"!==t[0]&&""+parseInt(t,10)===t,X=(t,e)=>t!==e&&(t==t||e==e),Z=new WeakMap,tt=[];let et;const nt=Symbol(""),st=Symbol("");function it(t,e=I){(function(t){return t&&!0===t._isEffect})(t)&&(t=t.raw);const n=function(t,e){const n=function(){if(!n.active)return e.scheduler?void 0:t();if(!tt.includes(n)){ot(n);try{return ut(),tt.push(n),et=n,t()}finally{tt.pop(),ht(),et=tt[tt.length-1]}}};return n.id=rt++,n.allowRecurse=!!e.allowRecurse,n._isEffect=!0,n.active=!0,n.raw=t,n.deps=[],n.options=e,n}(t,e);return e.lazy||n(),n}let rt=0;function ot(t){const{deps:e}=t;if(e.length){for(let n=0;n<e.length;n++)e[n].delete(t);e.length=0}}let at=!0;const lt=[];function ct(){lt.push(at),at=!1}function ut(){lt.push(at),at=!0}function ht(){const t=lt.pop();at=void 0===t||t}function dt(t,e,n){if(!at||void 0===et)return;let s=Z.get(t);s||Z.set(t,s=new Map);let i=s.get(n);i||s.set(n,i=new Set),i.has(et)||(i.add(et),et.deps.push(i))}function pt(t,e,n,s,i,r){const o=Z.get(t);if(!o)return;const a=new Set,l=t=>{t&&t.forEach((t=>{(t!==et||t.allowRecurse)&&a.add(t)}))};if("clear"===e)o.forEach(l);else if("length"===n&&D(t))o.forEach(((t,e)=>{("length"===e||e>=s)&&l(t)}));else switch(void 0!==n&&l(o.get(n)),e){case"add":D(t)?Q(n)&&l(o.get("length")):(l(o.get(nt)),q(t)&&l(o.get(st)));break;case"delete":D(t)||(l(o.get(nt)),q(t)&&l(o.get(st)));break;case"set":q(t)&&l(o.get(nt))}a.forEach((t=>{t.options.scheduler?t.options.scheduler(t):t()}))}const ft=new Set(Object.getOwnPropertyNames(Symbol).map((t=>Symbol[t])).filter(K)),_t=bt(),mt=bt(!1,!0),vt=bt(!0),gt=bt(!0,!0),yt={};function bt(t=!1,e=!1){return function(n,s,i){if("__v_isReactive"===s)return!t;if("__v_isReadonly"===s)return t;if("__v_raw"===s&&i===(t?Jt:Kt).get(n))return n;const r=D(n);if(!t&&r&&z(yt,s))return Reflect.get(yt,s,i);const o=Reflect.get(n,s,i);if(K(s)?ft.has(s):"__proto__"===s||"__v_isRef"===s)return o;if(t||dt(n,0,s),e)return o;if(ie(o)){return!r||!Q(s)?o.value:o}return J(o)?t?Xt(o):Yt(o):o}}["includes","indexOf","lastIndexOf"].forEach((t=>{const e=Array.prototype[t];yt[t]=function(...t){const n=ne(this);for(let t=0,e=this.length;t<e;t++)dt(n,0,t+"");const s=e.apply(n,t);return-1===s||!1===s?e.apply(n,t.map(ne)):s}})),["push","pop","shift","unshift","splice"].forEach((t=>{const e=Array.prototype[t];yt[t]=function(...t){ct();const n=e.apply(this,t);return ht(),n}}));function wt(t=!1){return function(e,n,s,i){const r=e[n];if(!t&&(s=ne(s),!D(e)&&ie(r)&&!ie(s)))return r.value=s,!0;const o=D(e)&&Q(n)?Number(n)<e.length:z(e,n),a=Reflect.set(e,n,s,i);return e===ne(i)&&(o?X(s,r)&&pt(e,"set",n,s):pt(e,"add",n,s)),a}}const xt={get:_t,set:wt(),deleteProperty:function(t,e){const n=z(t,e),s=(t[e],Reflect.deleteProperty(t,e));return s&&n&&pt(t,"delete",e,void 0),s},has:function(t,e){const n=Reflect.has(t,e);return K(e)&&ft.has(e)||dt(t,0,e),n},ownKeys:function(t){return dt(t,0,D(t)?"length":nt),Reflect.ownKeys(t)}},Nt={get:vt,set:(t,e)=>!0,deleteProperty:(t,e)=>!0},Et=W({},xt,{get:mt,set:wt(!0)}),Rt=W({},Nt,{get:gt}),Tt=t=>J(t)?Yt(t):t,St=t=>J(t)?Xt(t):t,At=t=>t,kt=t=>Reflect.getPrototypeOf(t);function Vt(t,e,n=!1,s=!1){const i=ne(t=t.__v_raw),r=ne(e);e!==r&&!n&&dt(i,0,e),!n&&dt(i,0,r);const{has:o}=kt(i),a=n?St:s?At:Tt;return o.call(i,e)?a(t.get(e)):o.call(i,r)?a(t.get(r)):void 0}function Pt(t,e=!1){const n=this.__v_raw,s=ne(n),i=ne(t);return t!==i&&!e&&dt(s,0,t),!e&&dt(s,0,i),t===i?n.has(t):n.has(t)||n.has(i)}function Mt(t,e=!1){return t=t.__v_raw,!e&&dt(ne(t),0,nt),Reflect.get(t,"size",t)}function Ot(t){t=ne(t);const e=ne(this),n=kt(e).has.call(e,t);return e.add(t),n||pt(e,"add",t,t),this}function jt(t,e){e=ne(e);const n=ne(this),{has:s,get:i}=kt(n);let r=s.call(n,t);r||(t=ne(t),r=s.call(n,t));const o=i.call(n,t);return n.set(t,e),r?X(e,o)&&pt(n,"set",t,e):pt(n,"add",t,e),this}function Ct(t){const e=ne(this),{has:n,get:s}=kt(e);let i=n.call(e,t);i||(t=ne(t),i=n.call(e,t));s&&s.call(e,t);const r=e.delete(t);return i&&pt(e,"delete",t,void 0),r}function $t(){const t=ne(this),e=0!==t.size,n=t.clear();return e&&pt(t,"clear",void 0,void 0),n}function Lt(t,e){return function(n,s){const i=this,r=i.__v_raw,o=ne(r),a=t?St:e?At:Tt;return!t&&dt(o,0,nt),r.forEach(((t,e)=>n.call(s,a(t),a(e),i)))}}function Ht(t,e,n){return function(...s){const i=this.__v_raw,r=ne(i),o=q(r),a="entries"===t||t===Symbol.iterator&&o,l="keys"===t&&o,c=i[t](...s),u=e?St:n?At:Tt;return!e&&dt(r,0,l?st:nt),{next(){const{value:t,done:e}=c.next();return e?{value:t,done:e}:{value:a?[u(t[0]),u(t[1])]:u(t),done:e}},[Symbol.iterator](){return this}}}}function It(t){return function(...e){return"delete"!==t&&this}}const Bt={get(t){return Vt(this,t)},get size(){return Mt(this)},has:Pt,add:Ot,set:jt,delete:Ct,clear:$t,forEach:Lt(!1,!1)},Wt={get(t){return Vt(this,t,!1,!0)},get size(){return Mt(this)},has:Pt,add:Ot,set:jt,delete:Ct,clear:$t,forEach:Lt(!1,!0)},Ft={get(t){return Vt(this,t,!0)},get size(){return Mt(this,!0)},has(t){return Pt.call(this,t,!0)},add:It("add"),set:It("set"),delete:It("delete"),clear:It("clear"),forEach:Lt(!0,!1)};function zt(t,e){const n=e?Wt:t?Ft:Bt;return(e,s,i)=>"__v_isReactive"===s?!t:"__v_isReadonly"===s?t:"__v_raw"===s?e:Reflect.get(z(n,s)&&s in e?n:e,s,i)}["keys","values","entries",Symbol.iterator].forEach((t=>{Bt[t]=Ht(t,!1,!1),Ft[t]=Ht(t,!0,!1),Wt[t]=Ht(t,!1,!0)}));const Dt={get:zt(!1,!1)},qt={get:zt(!1,!0)},Ut={get:zt(!0,!1)},Kt=new WeakMap,Jt=new WeakMap;function Gt(t){return t.__v_skip||!Object.isExtensible(t)?0:function(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}((t=>Y(t).slice(8,-1))(t))}function Yt(t){return t&&t.__v_isReadonly?t:Zt(t,!1,xt,Dt)}function Qt(t){return Zt(t,!1,Et,qt)}function Xt(t){return Zt(t,!0,Nt,Ut)}function Zt(t,e,n,s){if(!J(t))return t;if(t.__v_raw&&(!e||!t.__v_isReactive))return t;const i=e?Jt:Kt,r=i.get(t);if(r)return r;const o=Gt(t);if(0===o)return t;const a=new Proxy(t,2===o?s:n);return i.set(t,a),a}function te(t){return ee(t)?te(t.__v_raw):!(!t||!t.__v_isReactive)}function ee(t){return!(!t||!t.__v_isReadonly)}function ne(t){return t&&ne(t.__v_raw)||t}const se=t=>J(t)?Yt(t):t;function ie(t){return Boolean(t&&!0===t.__v_isRef)}class re{constructor(t,e=!1){this._rawValue=t,this._shallow=e,this.__v_isRef=!0,this._value=e?t:se(t)}get value(){return dt(ne(this),0,"value"),this._value}set value(t){X(ne(t),this._rawValue)&&(this._rawValue=t,this._value=this._shallow?t:se(t),pt(ne(this),"set","value",t))}}function oe(t,e=!1){return ie(t)?t:new re(t,e)}function ae(t){return ie(t)?t.value:t}const le={get:(t,e,n)=>ae(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const i=t[e];return ie(i)&&!ie(n)?(i.value=n,!0):Reflect.set(t,e,n,s)}};class ce{constructor(t){this.__v_isRef=!0;const{get:e,set:n}=t((()=>dt(this,0,"value")),(()=>pt(this,"set","value")));this._get=e,this._set=n}get value(){return this._get()}set value(t){this._set(t)}}class ue{constructor(t,e){this._object=t,this._key=e,this.__v_isRef=!0}get value(){return this._object[this._key]}set value(t){this._object[this._key]=t}}function he(t,e){return ie(t[e])?t[e]:new ue(t,e)}class de{constructor(t,e,n){this._setter=e,this._dirty=!0,this.__v_isRef=!0,this.effect=it(t,{lazy:!0,scheduler:()=>{this._dirty||(this._dirty=!0,pt(ne(this),"set","value"))}}),this.__v_isReadonly=n}get value(){return this._dirty&&(this._value=this.effect(),this._dirty=!1),dt(ne(this),0,"value"),this._value}set value(t){this._setter(t)}}const pe=console.error,fe=Object.prototype.toString;function _e(t){return function(e){return typeof e===t}}const me=Array.isArray,ve=_e("function"),ge=_e("string"),ye=_e("number"),be=_e("boolean"),we=_e("object"),xe=(Ne="Object",function(t){return(t=>fe.call(t).slice(8,-1))(t)===Ne});var Ne;function Ee(t){return"false"!==t&&!!t}function Re(t){try{const e=JSON.parse(t);if(we(e))return e}catch{}return!1}function Te(t,e,n){let s=n[t];if(null==s)if(void 0!==e.default)s=function(t){return ve(t.default)&&t.type!==Function?t.default():t.default}(e);else if(e.required)return void pe(`props ${t} is required!`);function i(t,n,i,r){if(!r&&(r=n),e.transform&&(r=e.transform),t!==n)return!1;if(i(s))return!0;{const t=r(s);return(n!==Number||!Number.isNaN(t))&&(s=t,!0)}}function r(n,i,r,o){if(n!==i)return!1;if(r(s))return!0;{const n=(e.transform??Re)(s);return n&&r(n)?(s=n,!0):(o&&pe(`the ${t} is a ${o}, please give the ${o} or JSON string`),!1)}}function o(t){if(t!==Function)return!1;if(ve(s))return!0;try{const t=t=>new Function(`return ${t}`)(),n=(e.transform??t)(s);return ve(n)&&(s=n),!0}catch(t){return pe(t),!1}}if(e.type){const n=me(e.type)?[...new Set(e.type)]:[e.type];let s=!1;for(let t=0;t<n.length;t++){const e=n[t];if(i(e,String,ge)||i(e,Number,ye)||i(e,Boolean,be,Ee)||r(e,Object,xe,"object")||r(e,Array,me)||o(e)){s=!0;break}}s||pe(`the ${t} value does not hit all type rules`)}n[t]=s}let Se;function Ae(t){return e=>{Se&&(Se[t]||(Se[t]=[])).push(e)}}const ke=Ae("_bm"),Ve=Ae("_m"),Pe=Ae("_bu"),Me=Ae("_u"),Oe=Ae("_um");t.AttributeCommitter=E,t.AttributePart=R,t.BooleanAttributePart=S,t.DefaultTemplateProcessor=O,t.EventPart=P,t.ITERATE_KEY=nt,t.NodePart=T,t.PropertyCommitter=A,t.PropertyPart=k,t.SVGTemplateResult=w,t.Template=d,t.TemplateInstance=v,t.TemplateResult=b,t.computed=function(t){let e,n;return U(t)?(e=t,n=B):(e=t.get,n=t.set),new de(e,n,U(t)||!t.set)},t.createMarker=_,t.customRef=function(t){return new ce(t)},t.defaultTemplateProcessor=j,t.defineComponent=function(t,e,n){let s,i=[],r={};ve(e)?s=e:ve(n)&&(s=n,r=e,i=Object.keys(e));const o=class extends HTMLElement{constructor(){super(),this._bm=[],this._bu=[],this._u=[],this._m=[],this._um=[],this.$refs={};const t=this._getProps();Object.keys(t).forEach((e=>Te(e,r[e],t)));const e=this._props=Qt(t);Se=this;const n=s.call(null,e,this);Se=null,this._bm&&this._bm.forEach((t=>t())),this.emit("hook:beforeMount"),this.$el=this.attachShadow({mode:"closed"});let o=!1;it((()=>{o||(this._bu&&this._bu.forEach((t=>t())),this.emit("hook:beforeUpdate")),H(n(),this.$el),o?(this._applyDirective(),this._u&&this._u.forEach((t=>t())),this.emit("hook:updated")):o=!0}));for(const t of i)if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this[t]=e}}static get observedAttributes(){return i}emit(t,e){const n=new CustomEvent(t,{bubbles:!0,detail:e});this.dispatchEvent(n)}_applyDirective(){this._applyVShow(),this._applyRef()}_applyRef(){const t=this.$el.querySelectorAll("[ref]"),e=[];Array.from(t).forEach((t=>{const n=t.getAttribute("ref");e.push(n),this.$refs[n]!==t&&(this.$refs[n]=t)})),Object.keys(this.$refs).forEach((t=>{e.includes(t)||delete this.$refs[t]}))}_applyVShow(){const t=this.$el.querySelectorAll("[v-show]");Array.from(t).forEach((t=>{const e=Ee(t.getAttribute("v-show"));t.__prevShow!==e&&(e?t.style.display=t.__prevDisplay:(t.__prevDisplay=t.style.display||"",t.style.display="none"),t.__prevShow=e)}))}_getProps(){let t={};for(const e of i)t[e]=this.getAttribute(e)||this[e]||void 0;return t}connectedCallback(){this._applyDirective(),this._m&&this._m.forEach((t=>t())),this.emit("hook:mounted")}disconnectedCallback(){this._um&&this._um.forEach((t=>t())),this.emit("hook:unmount")}attributeChangedCallback(t,e,n){this._props[t]=n,Te(t,r[t],this._props)}};for(const t of i)Object.defineProperty(o.prototype,t,{get(){if(this._props)return this._props[t]},set(e){this._props[t]=e,Te(t,r[t],this._props)}});customElements.define(t,o)},t.directive=t=>(...n)=>{const s=t(...n);return e.set(s,!0),s},t.effect=it,t.enableTracking=ut,t.html=(t,...e)=>new b(t,e,"html",j),t.isDirective=n,t.isIterable=N,t.isPrimitive=x,t.isProxy=function(t){return te(t)||ee(t)},t.isReactive=te,t.isReadonly=ee,t.isRef=ie,t.isTemplatePartActive=f,t.markRaw=function(t){return((t,e,n)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:n})})(t,"__v_skip",!0),t},t.noChange=o,t.nothing=a,t.onBeforeMount=ke,t.onBeforeUpdate=Pe,t.onMounted=Ve,t.onUnmounted=Oe,t.onUpdated=Me,t.parts=L,t.pauseTracking=ct,t.proxyRefs=function(t){return te(t)?t:new Proxy(t,le)},t.reactive=Yt,t.readonly=Xt,t.ref=function(t){return oe(t)},t.removeNodes=r,t.render=H,t.reparentNodes=i,t.resetTracking=ht,t.shallowReactive=Qt,t.shallowReadonly=function(t){return Zt(t,!0,Rt,Ut)},t.shallowRef=function(t){return oe(t,!0)},t.stop=function(t){t.active&&(ot(t),t.options.onStop&&t.options.onStop(),t.active=!1)},t.svg=(t,...e)=>new w(t,e,"svg",j),t.templateCaches=$,t.templateFactory=C,t.toRaw=ne,t.toRef=he,t.toRefs=function(t){const e=D(t)?new Array(t.length):{};for(const n in t)e[n]=he(t,n);return e},t.track=dt,t.trigger=pt,t.triggerRef=function(t){pt(ne(t),"set","value",void 0)},t.unref=ae,Object.defineProperty(t,"__esModule",{value:!0})}));
