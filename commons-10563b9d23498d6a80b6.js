(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"4Jet":function(e,t,n){},"8+s/":function(e,t,n){"use strict";var r,a=n("q1tI"),o=(r=a)&&"object"==typeof r&&"default"in r?r.default:r;function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(e,t,n){if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(r){if("function"!=typeof r)throw new Error("Expected WrappedComponent to be a React component.");var s,u=[];function l(){s=e(u.map((function(e){return e.props}))),f.canUseDOM?t(s):n&&(s=n(s))}var f=function(e){var t,n;function a(){return e.apply(this,arguments)||this}n=e,(t=a).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,a.peek=function(){return s},a.rewind=function(){if(a.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=s;return s=void 0,u=[],e};var i=a.prototype;return i.UNSAFE_componentWillMount=function(){u.push(this),l()},i.componentDidUpdate=function(){l()},i.componentWillUnmount=function(){var e=u.indexOf(this);u.splice(e,1),l()},i.render=function(){return o.createElement(r,this.props)},a}(a.PureComponent);return i(f,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(r)+")"),i(f,"canUseDOM",c),f}}},Bl7J:function(e,t,n){"use strict";var r=n("q1tI"),a=n.n(r),o=n("Wbzz"),i=(n("pfZt"),n("Cw6G")),c=function(e){var t=e.siteTitle,n=e.page,c=Object(r.useState)(!1),s=c[0],u=c[1];return a.a.createElement("div",{className:"header-wrapper"},a.a.createElement("header",{className:"header"},a.a.createElement("div",{className:"header-title-wrapper"},a.a.createElement("h1",{className:"header-title"},a.a.createElement(o.Link,{to:"/"},t)),"Home"!==n?a.a.createElement("button",{className:"header-nav-item",onClick:function(e){u(!s)}},"Characters"):"")),"Home"!==n?a.a.createElement("div",{className:"header-dropdown "+(s?"header-dropdown-active":"")},a.a.createElement("div",{className:"header-dropdown-wrapper"},a.a.createElement(i.a,null))):"")};c.defaultProps={siteTitle:""};var s=c;n("wmEu"),n("4Jet"),t.a=function(e){var t,n=e.children,r=e.page,i=Object(o.useStaticQuery)("2870710199");return a.a.createElement(a.a.Fragment,null,a.a.createElement(s,{siteTitle:(null===(t=i.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",page:r}),a.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"1.45rem 0"}},a.a.createElement("main",{className:"troy-skills"},n)),a.a.createElement("footer",{className:"footer"},a.a.createElement("div",null,a.a.createElement("p",null,"Game content, images and materials are trademarks and copyrights of"," ",a.a.createElement("a",{href:"https://www.creative-assembly.com/"},"Creative Assembly"),", creators of the awesome"," ",a.a.createElement("a",{href:"https://www.totalwar.com/"},"Total War")," games.")),a.a.createElement("div",null,a.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://github.com/mklabs/troy-skills",title:"Last commit: "+i.gitCommit.hash},a.a.createElement("svg",{stroke:"currentColor",fill:"currentColor",strokeWidth:"0",viewBox:"0 0 496 512",height:"1em",width:"1em",xmlns:"http://www.w3.org/2000/svg"},a.a.createElement("path",{d:"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"}))," ","Github"))))}},Cw6G:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n("q1tI"),a=n.n(r),o=n("Wbzz"),i=(n("HXn2"),function(e){var t=e.epicHeroes,n=e.heroClasses,r=e.agents,i=e.getOnScreenName;return a.a.createElement("div",{className:"skill-trees-list"},a.a.createElement("h2",null,"Epic Heroes"),a.a.createElement("div",{className:"skill-trees-list-section"},Object.keys(t).map((function(e){return a.a.createElement("div",{className:"skill-trees-list-epic-heroes",key:e},a.a.createElement("h4",null,e),t[e].map((function(e){var t=e.key,n=e.fields,r=e.agent_subtype_key;e.subculture;return a.a.createElement("p",{key:t},a.a.createElement("em",null,a.a.createElement(o.Link,{to:n.slug},i(r))))})))}))),a.a.createElement("h2",null,"Hero Classes"),a.a.createElement("div",{className:"skill-trees-list-section"},Object.keys(n).map((function(e){return a.a.createElement("div",{className:"skill-trees-list-heroes",key:e},a.a.createElement("h4",null,e),n[e].map((function(e){var t=e.key,n=e.fields,r=e.agent_subtype_key;e.subculture;return a.a.createElement("p",{key:t},a.a.createElement("em",null,a.a.createElement(o.Link,{to:n.slug},i(r))))})))}))),a.a.createElement("h2",null,"Agents"),a.a.createElement("div",{className:"skill-trees-list-section"},Object.keys(r).reverse().map((function(e){return a.a.createElement("div",{className:"skill-trees-list-agents",key:e},a.a.createElement("h4",null,e),r[e].map((function(e){var t=e.key,n=e.fields,r=e.agent_subtype_key;e.subculture;return a.a.createElement("p",{key:t},a.a.createElement("em",null,a.a.createElement(o.Link,{to:n.slug},i(r))))})))}))))}),c=(n("jumU"),function(e){var t=e.epicHeroes,n=e.heroClasses,r=e.agents,i=e.getOnScreenName;return a.a.createElement("div",{className:"skill-trees-list-dropdown"},a.a.createElement("div",{className:"dropdown-section"},a.a.createElement("h2",null,"Epic Heroes"),a.a.createElement("div",{className:"dropdown-section-list dropdown-section-epic-heroes"},Object.keys(t).map((function(e){return a.a.createElement("div",{className:"dropdown-list list-epic-heroes",key:e},a.a.createElement("h3",null,e),a.a.createElement("ul",null,t[e].map((function(e){var t=e.key,n=e.fields,r=e.agent_subtype_key;e.subculture;return a.a.createElement("li",{key:t},a.a.createElement(o.Link,{to:n.slug},i(r)))}))))})))),a.a.createElement("div",{className:"dropdown-section"},a.a.createElement("h2",null,"Hero Classes"),a.a.createElement("div",{className:"dropdown-section-list dropdown-section-heroes"},Object.keys(n).map((function(e){return a.a.createElement("div",{className:"dropdown-list list-heroes",key:e},a.a.createElement("h3",null,e),a.a.createElement("ul",null,n[e].map((function(e){var t=e.key,n=e.fields,r=e.agent_subtype_key;e.subculture;return a.a.createElement("li",{key:t},a.a.createElement(o.Link,{to:n.slug},i(r)))}))))})))),a.a.createElement("div",{className:"dropdown-section"},a.a.createElement("h2",null,"Agents"),a.a.createElement("div",{className:"dropdown-section-list dropdown-section-agents"},Object.keys(r).reverse().map((function(e){return a.a.createElement("div",{className:"dropdown-list list-agents",key:e},a.a.createElement("h3",null,e),a.a.createElement("ul",null,r[e].map((function(e){var t=e.key,n=e.fields,r=e.agent_subtype_key;e.subculture;return a.a.createElement("li",{key:t},a.a.createElement(o.Link,{to:n.slug},i(r)))}))))})))))});function s(e){var t=e.size,n=Object(o.useStaticQuery)("2827797577"),r=n.nodesets,s=n.locAgentSubtypes,u=n.allLandUnitsLocTsv,l=n.allAgentsSubtypesTablesTsv,f=n.allCharacterSkillNodesTablesTsv,p=n.allCulturesSubculturesLocTsv,d=n.allFactionAgentPermittedSubtypesTablesTsv,m=n.allFactionsLocTsv,y=function(e){return s.nodes.find((function(t){return t.key==="agent_subtypes_onscreen_name_override_"+e}))},h=function(e){if(1!==new Set(d.nodes.filter((function(t){return t.subtype===e})).map((function(e){return e.faction}))).size)return"";var t=function(e){return d.nodes.find((function(t){return t.subtype===e}))}(e);return t?function(e){var t=m.nodes.find((function(t){return t.key==="factions_screen_name_"+e.faction}));return t?t.text:""}(t):""},v=[],b=r.nodes.filter((function(e){var t=e.key,n=f.nodes.filter((function(e){return e.character_skill_node_set_key===t&&"true"===e.visible_in_ui})).sort((function(e,t){return e.character_skill_key<t.character_skill_key?-1:e.character_skill_key>t.character_skill_key?1:0}));if(!n.length)return!1;var r=n.map((function(e){return e.character_skill_key})).join(",");return!v.includes(r)&&(v.push(r),!0)})),g={},w={},E={},T=["champion","dignitary","spy"],k={troy_achilles:"Danaans",troy_aeneas:"Trojans",troy_agamemnon:"Danaans",troy_hector:"Trojans",troy_hippolyta:"Amazons",troy_menelaus:"Danaans",troy_odysseus:"Danaans",troy_paris:"Trojans",troy_penthesilea:"Amazons",troy_sarpedon:"Trojans"};b.forEach((function(e){var t,n;if("Epic Hero"===y(e.agent_subtype_key).text){var r=k[e.agent_subtype_key];w[r]=w[r]||[],w[r].push(e)}else if(T.includes(e.agent_key)){var a=(t=e.subculture,(n=p.nodes.find((function(e){return e.key==="cultures_subcultures_name_"+t})))?n.text:""),o="Achaeans"===a?"Common":a;g[o]=g[o]||[],g[o].push(e)}else{var i=h(e.agent_subtype_key)||"Common";E[i]=E[i]||[],E[i].push(e)}}));var C="page"===t?i:c;return a.a.createElement(C,{epicHeroes:w,heroClasses:E,agents:g,getOnScreenName:function(e){var t=y(e),n=l.nodes.find((function(t){return t.key===e}));if(!t||!n)return"";var r=t.text;"Epic Hero"===t.text&&(r=u.nodes.find((function(e){return e.key==="land_units_onscreen_name_"+n.associated_unit_override})).text);return r}})}},HXn2:function(e,t,n){},ZhWT:function(e,t){var n="undefined"!=typeof Element,r="function"==typeof Map,a="function"==typeof Set,o="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;e.exports=function(e,t){try{return function e(t,i){if(t===i)return!0;if(t&&i&&"object"==typeof t&&"object"==typeof i){if(t.constructor!==i.constructor)return!1;var c,s,u,l;if(Array.isArray(t)){if((c=t.length)!=i.length)return!1;for(s=c;0!=s--;)if(!e(t[s],i[s]))return!1;return!0}if(r&&t instanceof Map&&i instanceof Map){if(t.size!==i.size)return!1;for(l=t.entries();!(s=l.next()).done;)if(!i.has(s.value[0]))return!1;for(l=t.entries();!(s=l.next()).done;)if(!e(s.value[1],i.get(s.value[0])))return!1;return!0}if(a&&t instanceof Set&&i instanceof Set){if(t.size!==i.size)return!1;for(l=t.entries();!(s=l.next()).done;)if(!i.has(s.value[0]))return!1;return!0}if(o&&ArrayBuffer.isView(t)&&ArrayBuffer.isView(i)){if((c=t.length)!=i.length)return!1;for(s=c;0!=s--;)if(t[s]!==i[s])return!1;return!0}if(t.constructor===RegExp)return t.source===i.source&&t.flags===i.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===i.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===i.toString();if((c=(u=Object.keys(t)).length)!==Object.keys(i).length)return!1;for(s=c;0!=s--;)if(!Object.prototype.hasOwnProperty.call(i,u[s]))return!1;if(n&&t instanceof Element)return!1;for(s=c;0!=s--;)if(("_owner"!==u[s]&&"__v"!==u[s]&&"__o"!==u[s]||!t.$$typeof)&&!e(t[u[s]],i[u[s]]))return!1;return!0}return t!=t&&i!=i}(e,t)}catch(i){if((i.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw i}}},jumU:function(e,t,n){},pfZt:function(e,t,n){},qhky:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return ye}));var r,a,o,i,c=n("17x9"),s=n.n(c),u=n("8+s/"),l=n.n(u),f=n("ZhWT"),p=n.n(f),d=n("q1tI"),m=n.n(d),y=n("YVoz"),h=n.n(y),v="bodyAttributes",b="htmlAttributes",g="titleAttributes",w={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},E=(Object.keys(w).map((function(e){return w[e]})),"charset"),T="cssText",k="href",C="http-equiv",A="innerHTML",O="itemprop",_="name",S="property",j="rel",N="src",L="target",x={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},P="defaultTitle",I="defer",M="encodeSpecialCharacters",H="onChangeClientState",z="titleTemplate",R=Object.keys(x).reduce((function(e,t){return e[x[t]]=t,e}),{}),q=[w.NOSCRIPT,w.SCRIPT,w.STYLE],D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},B=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},F=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),U=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Y=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},W=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},K=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},J=function(e){var t=X(e,w.TITLE),n=X(e,z);if(n&&t)return n.replace(/%s/g,(function(){return Array.isArray(t)?t.join(""):t}));var r=X(e,P);return t||r||void 0},G=function(e){return X(e,H)||function(){}},V=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return U({},e,t)}),{})},Z=function(e,t){return t.filter((function(e){return void 0!==e[w.BASE]})).map((function(e){return e[w.BASE]})).reverse().reduce((function(t,n){if(!t.length)for(var r=Object.keys(n),a=0;a<r.length;a++){var o=r[a].toLowerCase();if(-1!==e.indexOf(o)&&n[o])return t.concat(n)}return t}),[])},Q=function(e,t,n){var r={};return n.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&re("Helmet: "+e+' should be of type "Array". Instead found type "'+D(t[e])+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,n){var a={};n.filter((function(e){for(var n=void 0,o=Object.keys(e),i=0;i<o.length;i++){var c=o[i],s=c.toLowerCase();-1===t.indexOf(s)||n===j&&"canonical"===e[n].toLowerCase()||s===j&&"stylesheet"===e[s].toLowerCase()||(n=s),-1===t.indexOf(c)||c!==A&&c!==T&&c!==O||(n=c)}if(!n||!e[n])return!1;var u=e[n].toLowerCase();return r[n]||(r[n]={}),a[n]||(a[n]={}),!r[n][u]&&(a[n][u]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var o=Object.keys(a),i=0;i<o.length;i++){var c=o[i],s=h()({},r[c],a[c]);r[c]=s}return e}),[]).reverse()},X=function(e,t){for(var n=e.length-1;n>=0;n--){var r=e[n];if(r.hasOwnProperty(t))return r[t]}return null},$=(r=Date.now(),function(e){var t=Date.now();t-r>16?(r=t,e(t)):setTimeout((function(){$(e)}),0)}),ee=function(e){return clearTimeout(e)},te="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||$:e.requestAnimationFrame||$,ne="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||ee:e.cancelAnimationFrame||ee,re=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},ae=null,oe=function(e,t){var n=e.baseTag,r=e.bodyAttributes,a=e.htmlAttributes,o=e.linkTags,i=e.metaTags,c=e.noscriptTags,s=e.onChangeClientState,u=e.scriptTags,l=e.styleTags,f=e.title,p=e.titleAttributes;se(w.BODY,r),se(w.HTML,a),ce(f,p);var d={baseTag:ue(w.BASE,n),linkTags:ue(w.LINK,o),metaTags:ue(w.META,i),noscriptTags:ue(w.NOSCRIPT,c),scriptTags:ue(w.SCRIPT,u),styleTags:ue(w.STYLE,l)},m={},y={};Object.keys(d).forEach((function(e){var t=d[e],n=t.newTags,r=t.oldTags;n.length&&(m[e]=n),r.length&&(y[e]=d[e].oldTags)})),t&&t(),s(e,m,y)},ie=function(e){return Array.isArray(e)?e.join(""):e},ce=function(e,t){void 0!==e&&document.title!==e&&(document.title=ie(e)),se(w.TITLE,t)},se=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var r=n.getAttribute("data-react-helmet"),a=r?r.split(","):[],o=[].concat(a),i=Object.keys(t),c=0;c<i.length;c++){var s=i[c],u=t[s]||"";n.getAttribute(s)!==u&&n.setAttribute(s,u),-1===a.indexOf(s)&&a.push(s);var l=o.indexOf(s);-1!==l&&o.splice(l,1)}for(var f=o.length-1;f>=0;f--)n.removeAttribute(o[f]);a.length===o.length?n.removeAttribute("data-react-helmet"):n.getAttribute("data-react-helmet")!==i.join(",")&&n.setAttribute("data-react-helmet",i.join(","))}},ue=function(e,t){var n=document.head||document.querySelector(w.HEAD),r=n.querySelectorAll(e+"[data-react-helmet]"),a=Array.prototype.slice.call(r),o=[],i=void 0;return t&&t.length&&t.forEach((function(t){var n=document.createElement(e);for(var r in t)if(t.hasOwnProperty(r))if(r===A)n.innerHTML=t.innerHTML;else if(r===T)n.styleSheet?n.styleSheet.cssText=t.cssText:n.appendChild(document.createTextNode(t.cssText));else{var c=void 0===t[r]?"":t[r];n.setAttribute(r,c)}n.setAttribute("data-react-helmet","true"),a.some((function(e,t){return i=t,n.isEqualNode(e)}))?a.splice(i,1):o.push(n)})),a.forEach((function(e){return e.parentNode.removeChild(e)})),o.forEach((function(e){return n.appendChild(e)})),{oldTags:a,newTags:o}},le=function(e){return Object.keys(e).reduce((function(t,n){var r=void 0!==e[n]?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r}),"")},fe=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[x[n]||n]=e[n],t}),t)},pe=function(e,t,n){switch(e){case w.TITLE:return{toComponent:function(){return e=t.title,n=t.titleAttributes,(r={key:e})["data-react-helmet"]=!0,a=fe(n,r),[m.a.createElement(w.TITLE,a,e)];var e,n,r,a},toString:function(){return function(e,t,n,r){var a=le(n),o=ie(t);return a?"<"+e+' data-react-helmet="true" '+a+">"+K(o,r)+"</"+e+">":"<"+e+' data-react-helmet="true">'+K(o,r)+"</"+e+">"}(e,t.title,t.titleAttributes,n)}};case v:case b:return{toComponent:function(){return fe(t)},toString:function(){return le(t)}};default:return{toComponent:function(){return function(e,t){return t.map((function(t,n){var r,a=((r={key:n})["data-react-helmet"]=!0,r);return Object.keys(t).forEach((function(e){var n=x[e]||e;if(n===A||n===T){var r=t.innerHTML||t.cssText;a.dangerouslySetInnerHTML={__html:r}}else a[n]=t[e]})),m.a.createElement(e,a)}))}(e,t)},toString:function(){return function(e,t,n){return t.reduce((function(t,r){var a=Object.keys(r).filter((function(e){return!(e===A||e===T)})).reduce((function(e,t){var a=void 0===r[t]?t:t+'="'+K(r[t],n)+'"';return e?e+" "+a:a}),""),o=r.innerHTML||r.cssText||"",i=-1===q.indexOf(e);return t+"<"+e+' data-react-helmet="true" '+a+(i?"/>":">"+o+"</"+e+">")}),"")}(e,t,n)}}}},de=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,a=e.htmlAttributes,o=e.linkTags,i=e.metaTags,c=e.noscriptTags,s=e.scriptTags,u=e.styleTags,l=e.title,f=void 0===l?"":l,p=e.titleAttributes;return{base:pe(w.BASE,t,r),bodyAttributes:pe(v,n,r),htmlAttributes:pe(b,a,r),link:pe(w.LINK,o,r),meta:pe(w.META,i,r),noscript:pe(w.NOSCRIPT,c,r),script:pe(w.SCRIPT,s,r),style:pe(w.STYLE,u,r),title:pe(w.TITLE,{title:f,titleAttributes:p},r)}},me=l()((function(e){return{baseTag:Z([k,L],e),bodyAttributes:V(v,e),defer:X(e,I),encode:X(e,M),htmlAttributes:V(b,e),linkTags:Q(w.LINK,[j,k],e),metaTags:Q(w.META,[_,E,C,S,O],e),noscriptTags:Q(w.NOSCRIPT,[A],e),onChangeClientState:G(e),scriptTags:Q(w.SCRIPT,[N,A],e),styleTags:Q(w.STYLE,[T],e),title:J(e),titleAttributes:V(g,e)}}),(function(e){ae&&ne(ae),e.defer?ae=te((function(){oe(e,(function(){ae=null}))})):(oe(e),ae=null)}),de)((function(){return null})),ye=(a=me,i=o=function(e){function t(){return B(this,t),W(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.shouldComponentUpdate=function(e){return!p()(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case w.SCRIPT:case w.NOSCRIPT:return{innerHTML:t};case w.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,n=e.child,r=e.arrayTypeChildren,a=e.newChildProps,o=e.nestedChildren;return U({},r,((t={})[n.type]=[].concat(r[n.type]||[],[U({},a,this.mapNestedChildrenToProps(n,o))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,n,r=e.child,a=e.newProps,o=e.newChildProps,i=e.nestedChildren;switch(r.type){case w.TITLE:return U({},a,((t={})[r.type]=i,t.titleAttributes=U({},o),t));case w.BODY:return U({},a,{bodyAttributes:U({},o)});case w.HTML:return U({},a,{htmlAttributes:U({},o)})}return U({},a,((n={})[r.type]=U({},o),n))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var n=U({},t);return Object.keys(e).forEach((function(t){var r;n=U({},n,((r={})[t]=e[t],r))})),n},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var n=this,r={};return m.a.Children.forEach(e,(function(e){if(e&&e.props){var a=e.props,o=a.children,i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[R[n]||n]=e[n],t}),t)}(Y(a,["children"]));switch(n.warnOnInvalidChildren(e,o),e.type){case w.LINK:case w.META:case w.NOSCRIPT:case w.SCRIPT:case w.STYLE:r=n.flattenArrayTypeChildren({child:e,arrayTypeChildren:r,newChildProps:i,nestedChildren:o});break;default:t=n.mapObjectTypeChildren({child:e,newProps:t,newChildProps:i,nestedChildren:o})}}})),t=this.mapArrayTypeChildrenToProps(r,t)},t.prototype.render=function(){var e=this.props,t=e.children,n=Y(e,["children"]),r=U({},n);return t&&(r=this.mapChildrenToProps(t,r)),m.a.createElement(a,r)},F(t,null,[{key:"canUseDOM",set:function(e){a.canUseDOM=e}}]),t}(m.a.Component),o.propTypes={base:s.a.object,bodyAttributes:s.a.object,children:s.a.oneOfType([s.a.arrayOf(s.a.node),s.a.node]),defaultTitle:s.a.string,defer:s.a.bool,encodeSpecialCharacters:s.a.bool,htmlAttributes:s.a.object,link:s.a.arrayOf(s.a.object),meta:s.a.arrayOf(s.a.object),noscript:s.a.arrayOf(s.a.object),onChangeClientState:s.a.func,script:s.a.arrayOf(s.a.object),style:s.a.arrayOf(s.a.object),title:s.a.string,titleAttributes:s.a.object,titleTemplate:s.a.string},o.defaultProps={defer:!0,encodeSpecialCharacters:!0},o.peek=a.peek,o.rewind=function(){var e=a.rewind();return e||(e=de({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},i);ye.renderStatic=ye.rewind}).call(this,n("yLpj"))},vrFN:function(e,t,n){"use strict";var r=n("q1tI"),a=n.n(r),o=n("qhky"),i=n("Wbzz");function c(e){var t,n,r=e.description,c=e.lang,s=e.meta,u=e.title,l=Object(i.useStaticQuery)("63159454").site,f=r||l.siteMetadata.description,p=null===(t=l.siteMetadata)||void 0===t?void 0:t.title;return a.a.createElement(o.a,{htmlAttributes:{lang:c},title:u,titleTemplate:p?"%s | "+p:null,meta:[{name:"description",content:f},{property:"og:title",content:u},{property:"og:description",content:f},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:(null===(n=l.siteMetadata)||void 0===n?void 0:n.author)||""},{name:"twitter:title",content:u},{name:"twitter:description",content:f}].concat(s)})}c.defaultProps={lang:"en",meta:[],description:""},t.a=c},wmEu:function(e,t,n){},yLpj:function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(r){"object"==typeof window&&(n=window)}e.exports=n}}]);
//# sourceMappingURL=commons-10563b9d23498d6a80b6.js.map