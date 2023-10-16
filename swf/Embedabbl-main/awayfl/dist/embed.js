!function(){"use strict";class t extends HTMLElement{constructor(){super(),this._runConfig={},this.onError=this.onError.bind(this),this._root=this.attachShadow({mode:"closed"})}static get observedAttributes(){return["src","width","height"]}get player(){return this._player}get runConfig(){return this._runConfig}get src(){return this.getAttribute("src")}set src(t){this.setAttribute("src",t)}set width(t){this.setAttribute("width",t)}get width(){return this.getAttribute("width")}set height(t){this.setAttribute("height",t)}get height(){return this.getAttribute("height")}_getRuntimeUrl(){const t=this._runConfig.runtimebaseurl;return{loader:t+"/loader.js",runtime:t+"/runtime.js",baseUrl:t}}_dropPlayer(){this._gameFrame&&(this._gameFrame.remove(),this._player=null)}onError(t){const e=this._runConfig.onerror&&self[this._runConfig.onerror];"function"==typeof e&&e(t),this.dispatchEvent(new ErrorEvent("error",{error:new Error("Awayfl runtime error"),message:(null==t?void 0:t.message)||t}))}_attachRuntimeEvents(){const t=this._gameFrame.contentWindow;t.addEventListener("awayfl-player-init",(({detail:t})=>{this._player=t}),{once:!0}),t.addEventListener("awayfl-player-load",(()=>{const t=this._runConfig.onload&&self[this._runConfig.onload];"function"==typeof t&&t(),this.dispatchEvent(new CustomEvent("load")),this._gameFrame.style.display=""}),{once:!0}),t.addEventListener("awayfl-player-progress",(({detail:t})=>{const e=this._runConfig.onprogress&&self[this._runConfig.onprogress];"function"==typeof e&&e(t),this.dispatchEvent(new CustomEvent("progress",{detail:t}))}))}_buildTemplate(t){const e='<!DOCTYPE html>\r\n<head>\r\n\t<meta name="viewport"\r\n\t\tcontent="height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui" />\r\n\t<title>AWAYFL EMBEDED PLAYER 0.0.33</title>\r\n\t<style>\r\n\t\t* {\r\n\t\t\tmargin: 0;\r\n\t\t\tpadding: 0;\r\n\t\t}\r\n\t\tcanvas {\r\n\t\t\toutline: none\r\n\t\t}\r\n\t\thtml, body {\r\n\t\t\tmargin: 0;\r\n\t\t\toverflow: hidden;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 100%;\r\n\t\t\tbackground-color: white;\r\n\t\t}\r\n\t</style>\r\n\t<script src="__LOADER_URL__"><\/script>\r\n</head>\r\n\r\n<body>\r\n\t<script>\r\n\t\twindow.addEventListener("load", () => {\r\n\r\n\t\t\tconst config = JSON.parse(__GAME_CONFIG__);\r\n\r\n\t\t\tAWAYFL.LegacyLoader.init(config);\r\n\t\t\tAWAYFL.LegacyLoader.runGame((fill) => {\r\n\t\t\t\twindow.dispatchEvent(new CustomEvent(\'awayfl-player-progress\', {detail: fill}));\r\n\t\t\t}, (config, hideLoader) => {\r\n\t\t\t\tconst player = new AWAYFL.Player(document, config);\r\n\t\t\t\twindow.dispatchEvent(new CustomEvent(\'awayfl-player-init\', {detail: player}));\r\n\t\t\t\tplayer\r\n\t\t\t\t\t.loadAndPlay()\r\n\t\t\t\t\t.then((_, hide) => {\r\n\t\t\t\t\t\twindow.dispatchEvent(new CustomEvent(\'awayfl-player-load\'));\r\n\t\t\t\t\t\thide && hide();\r\n\t\t\t\t\t});\t\t\t\t\r\n\t\t\t})\r\n\t\t});\r\n\t<\/script>\r\n</body>',r=this._getRuntimeUrl(),n={width:t.clientWidth,height:t.clientHeight,progress:{},runtime:[r.runtime],binary:[{path:this._runConfig.src,resourceType:"GAME",name:"Game",meta:{}}],baseUrl:r.baseUrl,maxStageScale:+this._runConfig.maxstagescale,runtimeFlags:{defaultSmoothBitmap:!!this._runConfig.smoothbitmapdefault}};return e.replace(/__LOADER_URL__/,r.loader).replace(/__GAME_CONFIG__/,JSON.stringify(JSON.stringify(n)))}_constructPlayer(){const t=this._root,e=document.createElement("iframe");e.style.border="none",e.style.display=this._runConfig.hidebeforeload?"none":"",e.width=""+this._runConfig.width,e.height=""+this._runConfig.height,this._gameFrame=e,t.appendChild(e),e.addEventListener("load",this._attachRuntimeEvents.bind(this),{once:!0}),e.addEventListener("error",this.onError),e.srcdoc=this._buildTemplate(e)}_mapAttrs(){const e=this.querySelectorAll("param"),r=this.getAttributeNames(),n=t.BINDING_CONFIG,i={};e.forEach((t=>{t.name in n&&(i[t.name]=t.value)})),r.forEach((t=>{t in n&&(i[t]=this.getAttribute(t))}));for(const t in n){if(n[t].required&&void 0===i[t])throw`Parameter ${t} is required!`;void 0===i[t]&&(i[t]=n[t].default)}this._runConfig=i}connectedCallback(){setTimeout((()=>{this._loaderHolder=this.querySelector("div.awayfl__loader"),this._mapAttrs(),this._constructPlayer();const t=document.createElement("style");t.textContent=`\n            :host {\n                display: block;\n                contain: content;\n                width: ${this._runConfig.width};\n                height: ${this._runConfig.height};\n            }\n            `,this._root.appendChild(t)}))}disconnectedCallback(){this._dropPlayer()}attributeChangedCallback(t,e,r){if(this.isConnected)return"src"===t&&this._player?(this._dropPlayer(),this._runConfig.src=r,void this._constructPlayer()):void("width"!==t&&"height"!==t||this._root.styleSheets[0].insertRule(`:host { ${t}: ${r};}`))}}t.BINDING_CONFIG={version:{required:!1,default:"latest"},runtimebaseurl:{required:!0},src:{required:!0},avm1:{required:!1,default:!1},width:{required:!1,default:550},height:{required:!1,default:400},onload:{required:!1},onprogress:{required:!1},onerror:{required:!1},scaleMode:{required:!1,default:"all"},autoplay:{required:!1,default:!0},hidebeforeload:{required:!1,default:!0},maxstagescale:{required:!1,default:void 0},smoothbitmapdefault:{required:!1,default:!1}},customElements.define("awayfl-player",t);const e=t=>console.warn("AwayFL loader not support "+t),r=window;let n;r.swfObject&&console.warn("Replace `swfObject` to AwayFl loader!"),document.addEventListener("load",(()=>{}));const i={registerObject:()=>e("registerObject"),getObjectById:()=>e("getObjectById"),switchOffAutoHideShow:()=>e("switchOffAutoHideShow"),enableUriEncoding:()=>e("enableUriEncoding"),getFlashPlayerVersion:()=>e("getFlashPlayerVersion"),createSWF:()=>e("createSWF"),showExpressInstall:()=>e("showExpressInstall"),createCSS:()=>e("createCSS"),getQueryParamValue:()=>e("getQueryParamValue"),get ua(){return e("ua")},embedSWF:function(e,i,s,a,o,l,d,h,u,c){const g="string"==typeof i?document.getElementById(i):i,m=function(e,i,s,a){if(n=r.AWAY_EMBED_CFG,!n)throw"AwayFL configuration not found, insert define a `AWAY_AMBED_CFG` as in wiki";if(!n.loaderUrl)throw"AwayFL loader not defined! Runtime will not load correctly!";const o=n.loaderUrl;let l=n.baseUrl,d=n.runtimeUrl;if(!l){const t=d||o;l=o.substring(0,t.lastIndexOf("/"))}d||(console.warn("AwayFL Runtime Url not defined, will be used url of base or loader!"),d=l+"/runtime.js");const h=new t;h.setAttribute("src",e),h.setAttribute("width",s),h.setAttribute("height",a),h.setAttribute("runtimebaseurl",l);const u=i.id,c=i.className,g=i.parentElement;return i.id=null,i.className="",h.id=u,h.className=c,g.replaceChild(h,i),h}(e,g,s,a);m.onload=()=>{c&&c({success:!0,ref:m,id:g.id})}}};r.swfObject=i}();
//# sourceMappingURL=embed.js.map
