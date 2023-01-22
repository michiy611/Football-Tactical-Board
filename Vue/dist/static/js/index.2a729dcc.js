(function(){"use strict";var t={6208:function(t,e,i){var n=i(9963),s=i(6252);const o={id:"app"};function r(t,e,i,n,r,a){const c=(0,s.up)("TitleHeader"),h=(0,s.up)("CreateImage"),l=(0,s.up)("CanvasField");return(0,s.wg)(),(0,s.iD)("div",o,[(0,s.Wm)(c),(0,s.Wm)(h,{onMyClick:a.emitData},null,8,["onMyClick"]),(0,s.Wm)(l,{results:r.results},null,8,["results"])])}var a=i(3577);const c=t=>((0,s.dD)("data-v-33cfcf35"),t=t(),(0,s.Cn)(),t),h={class:"input-area",for:"input-video"},l={key:0,controls:"",id:"video"},d=["src"],u=c((()=>(0,s._)("span",null,"Capture this moment!!!",-1))),f=[u],v=c((()=>(0,s._)("h3",{class:"wait"},"Wait about 5 seconds...",-1)));function p(t,e,i,n,o,r){return(0,s.wg)(),(0,s.iD)("div",null,[(0,s._)("label",h,(0,a.zw)(o.isLoading?"Loading...":"Upload Video"),1),(0,s._)("input",{id:"input-video",type:"file",accept:"video/mp4,video/x-m4v",onChange:e[0]||(e[0]=(...t)=>r.handleFileSelect&&r.handleFileSelect(...t))},null,32),o.src?((0,s.wg)(),(0,s.iD)("video",l,[(0,s._)("source",{src:o.src,type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'},null,8,d)])):(0,s.kq)("",!0),(0,s._)("a",{class:"btn uploadbtn",onClick:e[1]||(e[1]=t=>r.onUploadImage())},f),v])}i(7658);var g=i(8945);const x="http://127.0.0.1:5000";var m={data(){return{src:null,image:[],uploadedImage:"",results:[],time:0,isLoading:!1}},methods:{handleFileSelect(t){this.src=null,this.selected=0;const e=t.target.files[0];if(!e||!e.type.match("video/*"))return;const i=new FileReader;i.onload=t=>{this.src=t.target.result,this.isLoading=!1},i.readAsDataURL(e),this.isLoading=!0},onUploadImage(){let t=this;this.image=[];const e=document.createElement("canvas"),i=e.getContext("2d"),n=document.getElementById("video");e.width=n.videoWidth,e.height=n.videoHeight,this.time=n.currentTime,n.pause(),i.drawImage(n,0,0,n.videoWidth,n.videoHeight),this.image.push(e.toDataURL("image/png"));var s=new FormData;s.append("image",this.image),g.Z.post(`${x}/detect`,s).then((function(e){t.results=e.data.results;for(const i of t.results)console.log(i);t.$emit("my-click",t.results)}))}}},b=i(3744);const w=(0,b.Z)(m,[["render",p],["__scopeId","data-v-33cfcf35"]]);var k=w;const y={class:"title"},M=(0,s._)("h1",{class:"title-txt"},"Tactical Board Generater",-1),_=(0,s._)("div",{class:"desc"},[(0,s._)("h2",null,"試合映像からシーンを切り取り、作戦ボードに表示させます。")],-1),C=[M,_];function I(t,e){return(0,s.wg)(),(0,s.iD)("div",y,C)}const F={},S=(0,b.Z)(F,[["render",I]]);var W=S;const D={class:"container"},B={id:"tool-area"};function O(t,e,i,n,o,r){return(0,s.wg)(),(0,s.iD)("div",D,[(0,s._)("canvas",{id:"myCanvas",class:(0,a.C_)({eraser:"eraser"===o.canvasMode}),ref:"myCanvas",onMousedown:e[0]||(e[0]=(...t)=>r.dragStart&&r.dragStart(...t)),onMouseup:e[1]||(e[1]=(...t)=>r.dragEnd&&r.dragEnd(...t)),onMouseout:e[2]||(e[2]=(...t)=>r.dragEnd&&r.dragEnd(...t)),onMousemove:e[3]||(e[3]=(...t)=>r.draw&&r.draw(...t))},null,34),(0,s._)("div",B,[(0,s._)("button",{id:"move-arc-button",onClick:e[4]||(e[4]=(...t)=>r.moveArc&&r.moveArc(...t))},"矢印"),(0,s._)("button",{id:"pen-black-button",onClick:e[5]||(e[5]=(...t)=>r.penBlack&&r.penBlack(...t))},"ペン（黒）"),(0,s._)("button",{id:"pen-red-button",onClick:e[6]||(e[6]=(...t)=>r.penRed&&r.penRed(...t))},"ペン（赤）"),(0,s._)("button",{id:"pen-blue-button",onClick:e[7]||(e[7]=(...t)=>r.penBlue&&r.penBlue(...t))},"ペン（青）"),(0,s._)("button",{id:"eraser-button",onClick:e[8]||(e[8]=(...t)=>r.eraser&&r.eraser(...t))},"消しゴム"),(0,s._)("button",{id:"clear-button",onClick:e[9]||(e[9]=(...t)=>r.clear&&r.clear(...t))},"クリア")])])}var E={props:["results"],data(){return{ratio:1,dx:0,dy:0,isMove:!1,beforeMouseX:null,beforeMouseY:null,coords:[],selectIdx:0,radius:window.innerWidth/150,field_w:.6*window.innerWidth,field_h:.39*window.innerWidth,weightNum:5,stroke:"black",canvas:null,context:null,canvasMode:"penBlack"}},watch:{results:function(){this.coords=this.results,this.canvasMode="drag",this.context.clearRect(0,0,this.canvas.width,this.canvas.height)},coords:function(){for(let t=0;t<this.coords.length;t++)this.context.beginPath(),this.context.arc(parseInt(this.coords[t].x*this.field_w/115),parseInt(this.coords[t].y*this.field_h/75),this.radius,0,2*Math.PI),this.context.fillStyle=this.coords[t].color,this.context.fill(),this.context.lineWidth=2,this.context.strokeStyle=this.stroke,this.context.stroke()}},mounted(){this.canvas=document.querySelector("#myCanvas"),this.context=this.canvas.getContext("2d"),this.context.lineCap="round",this.context.lineCap="round",this.canvas.width=this.field_w,this.canvas.height=this.field_h,this.context.lineWidth=this.weightNum,this.context.strokeStyle=this.stroke,console.log("field-width : ",this.field_w),console.log("field-height : ",this.field_h)},methods:{draw:function(t){let e=t.offsetX,i=t.offsetY;if(this.isDrag)if("drag"==this.canvasMode){if(this.context.clearRect(0,0,this.canvas.width,this.canvas.height),!this.isMove)return;var n=e*this.ratio+this.dx,s=i*this.ratio+this.dy,o=0,r=0;this.beforeMouseX&&this.beforeMouseY&&(o=n-this.beforeMouseX,r=s-this.beforeMouseY),this.beforeMouseX=n,this.beforeMouseY=s;var a=o/this.field_w*115+Number(this.coords[this.selectIdx].x),c=r/this.field_h*75+Number(this.coords[this.selectIdx].y);a>0&&(this.coords[this.selectIdx].x=a),c>0&&(this.coords[this.selectIdx].y=c);for(let t=0;t<this.coords.length;t++)this.context.beginPath(),this.context.arc(parseInt(this.coords[t].x*this.field_w/115),parseInt(this.coords[t].y*this.field_h/75),this.radius,0,2*Math.PI),this.context.fillStyle=this.coords[t].color,this.context.fill(),this.context.lineWidth=2,this.context.strokeStyle=this.stroke,this.context.stroke()}else this.context.lineTo(e,i),this.context.stroke()},dragStart:function(t){if("drag"==this.canvasMode){this.isMove=!0;for(var e,i=1e3,n=0;n<this.coords.length;n++){var s=parseInt(this.coords[n].x*this.field_w/115),o=parseInt(this.coords[n].y*this.field_h/75),r=t.offsetX,a=t.offsetY,c=Math.sqrt(Math.pow(r-s,2)+Math.pow(a-o,2));c<i&&(i=c,e=n)}console.log("Selected index : ",e),this.selectIdx=e}else{let e=t.offsetX,i=t.offsetY;this.context.beginPath(),this.context.lineTo(e,i),this.context.stroke()}this.isDrag=!0},dragEnd:function(){"drag"==this.canvasMode&&(this.isMove=!1,this.beforeMouseX=null,this.beforeMouseY=null),this.isDrag=!1},clear:function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)},moveArc:function(){this.canvasMode="drag",this.context.strokeStyle="#00000000"},penBlack:function(){this.canvasMode="penBlack",this.context.lineCap="round",this.context.lineJoin="round",this.context.lineWidth=5,this.context.strokeStyle="#000000"},penRed:function(){this.canvasMode="penRed",this.context.lineCap="round",this.context.lineJoin="round",this.context.lineWidth=5,this.context.strokeStyle="#FF0000"},penBlue:function(){this.canvasMode="penBlue",this.context.lineCap="round",this.context.lineJoin="round",this.context.lineWidth=5,this.context.strokeStyle="#0000FF"},eraser:function(){this.canvasMode="eraser",this.context.lineCap="square",this.context.lineJoin="square",this.context.lineWidth=30,this.context.strokeStyle="#FFFFFF"}}};const R=(0,b.Z)(E,[["render",O],["__scopeId","data-v-fee21b58"]]);var T=R,X={name:"App",components:{TitleHeader:W,CreateImage:k,CanvasField:T},data(){return{results:[]}},methods:{emitData(t){this.results=t}}};const Y=(0,b.Z)(X,[["render",r]]);var L=Y;(0,n.ri)(L).mount("#app")}},e={};function i(n){var s=e[n];if(void 0!==s)return s.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,i),o.exports}i.m=t,function(){var t=[];i.O=function(e,n,s,o){if(!n){var r=1/0;for(l=0;l<t.length;l++){n=t[l][0],s=t[l][1],o=t[l][2];for(var a=!0,c=0;c<n.length;c++)(!1&o||r>=o)&&Object.keys(i.O).every((function(t){return i.O[t](n[c])}))?n.splice(c--,1):(a=!1,o<r&&(r=o));if(a){t.splice(l--,1);var h=s();void 0!==h&&(e=h)}}return e}o=o||0;for(var l=t.length;l>0&&t[l-1][2]>o;l--)t[l]=t[l-1];t[l]=[n,s,o]}}(),function(){i.d=function(t,e){for(var n in e)i.o(e,n)&&!i.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={826:0};i.O.j=function(e){return 0===t[e]};var e=function(e,n){var s,o,r=n[0],a=n[1],c=n[2],h=0;if(r.some((function(e){return 0!==t[e]}))){for(s in a)i.o(a,s)&&(i.m[s]=a[s]);if(c)var l=c(i)}for(e&&e(n);h<r.length;h++)o=r[h],i.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return i.O(l)},n=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var n=i.O(void 0,[998],(function(){return i(6208)}));n=i.O(n)})();
//# sourceMappingURL=index.2a729dcc.js.map