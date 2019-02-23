(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(t,e,s){t.exports=s(21)},16:function(t,e,s){},19:function(t,e,s){},21:function(t,e,s){"use strict";s.r(e);var a=s(0),i=s.n(a),n=s(8),o=s.n(n),l=(s(16),s(9)),r=s(2),c=s(3),h=s(5),d=s(4),p=s(6),u=s(1),y=s.n(u),f=function(t){function e(t){var s;return Object(r.a)(this,e),(s=Object(h.a)(this,Object(d.a)(e).call(this,t))).setSvg=function(){var t=window.innerWidth,e=window.innerHeight,a=y()(s.state.svg,{w:{$set:t},h:{$set:e},box:{$set:[0,0,t,e].join(" ")},size:{$set:Math.sqrt(t*t+e*e)}});s.setState({svg:a})},s.setCell=function(){var t=.8*s.state.svg.w,e=.8*s.state.svg.h,a=y()(s.state.cell,{w:{$set:t},h:{$set:e},x:{$set:(s.state.svg.w-t)/2},y:{$set:(s.state.svg.h-e)/2},size:{$set:.8}});s.setState({cell:a})},s.setPaddles=function(){var t=s.state.svg,e=s.state.cell,a=t.size/100,i=y()(s.state.paddles,{depth:{$set:a},x:{length:{$set:t.w*(1/9)},top:{y:{$set:e.y}},bottom:{y:{$set:e.y+e.h-a}}},y:{length:{$set:t.h*(1/9)},left:{x:{$set:e.x}},right:{x:{$set:e.x+e.w-a}}}});s.setState({paddles:i})},s.makeKey=function(t,e){e=void 0===e?t:e;for(var a=[],i=0;i<4;i++)a.push(Math.round(Math.random()));var n=a.reduce(function(t,e){return t+e});return t<=n&&n<=e?a:s.makeKey(t,e)},s.pickPaddles=function(t){void 0===t&&(t=s.state.score<1?[0,1,0,0]:s.state.score<5?s.makeKey(1):s.state.score<6?s.makeKey(2):s.state.score<7?s.makeKey(1,2):s.state.score<15?s.makeKey(2,3):s.makeKey(3,4));var e=y()(s.state.paddles,{x:{top:{display:{$set:t[0]}},bottom:{display:{$set:t[1]}}},y:{left:{display:{$set:t[2]}},right:{display:{$set:t[3]}}}});s.setState({paddles:e})},s.setBall=function(){var t=s.state.svg,e=y()(s.state.ball,{x:{$set:t.w/2},y:{$set:t.h/2},r:{$set:t.size/100}});s.setState({ball:e})},s.setInitialVelocity=function(){var t=s.state.svg,e=y()(s.state.ball,{dx:{$set:t.size/500},dy:{$set:t.size/500}});s.setState({ball:e})},s.moveBall=function(){var t=s.state.svg,e=s.state.cell,a=s.state.ball,i=s.state.paddles,n=t.w/2,o=t.h/2,l=a.dx,r=a.dy,c=a.x,h=a.y,d=s.state.score;a.x+a.dx<0||a.x+a.dx>t.w?(c=a.x<0?t.w:0,h=a.y+2*(o-a.y)):a.y+a.dy<0||a.y+a.dy>t.h?(c=a.x+2*(n-a.x),h=a.y<0?t.h:0):a.x+l-a.r<e.x||a.x+a.dx+a.r>e.x+e.w?l*=-1:a.y+r-a.r<e.y||a.y+a.r+a.dy>e.y+e.h?r*=-1:a.y-a.r+r<=e.y+i.depth&&i.x.top.display>0||a.y+a.r+r>=e.y+e.h-i.depth&&i.x.bottom.display>0?i.x.x<=a.x+a.r+l&&a.x-a.r+l<=i.x.x+i.x.length?(r*=-1,d+=1,s.props.score(d),s.pickPaddles()):(r=0,d=":(",s.props.score(d)):(a.x-a.r+l<=e.x+i.depth&&i.y.left.display>0||a.x+a.r+l>=e.x+e.w-i.depth&&i.y.right.display>0)&&(i.y.y<=a.y+a.r+l&&a.y-a.r+r<=i.y.y+i.y.length?(l*=-1,d+=1,s.props.score(d),s.pickPaddles()):(l=0,d=":(",s.props.score(d)));var p=y()(a,{dx:{$set:l},dy:{$set:r}}),u=y()(p,{x:{$set:c+a.dx},y:{$set:h+a.dy}});s.setState({ball:u,score:d})},s.movePaddles=function(){var t=s.state.cell,e=s.state.paddles,a=e.x.length/2,i=e.y.length/2,n=t.x+t.w-a,o=t.y+t.h-i,l=s.props.x,r=s.props.y;l=l<t.x+a?t.x:l>n?n-a:l-a,r=r<t.y+i?t.y:r>o?o-i:r-i;var c=y()(e,{x:{x:{$set:l}},y:{y:{$set:r}}});s.setState({paddles:c})},s.setGame=function(){s.props.score("hit the ball"),s.setState({score:0}),s.sizeGame(),setTimeout(s.setInitialVelocity,1)},s.sizeGame=function(){s.setSvg(),setTimeout(s.setCell),setTimeout(s.setBall),setTimeout(s.setPaddles,1)},s.animate=function(){s.movePaddles(),s.moveBall()},s.state={svg:{},cell:{},paddles:{x:{top:{display:0},bottom:{display:0}},y:{left:{display:0},right:{display:0}}},ball:{}},s}return Object(p.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){this.setGame(),window.addEventListener("resize",this.sizeGame),window.setInterval(this.animate,10)}},{key:"shouldComponentUpdate",value:function(t,e){return this.state!==e}},{key:"componentDidUpdate",value:function(){1===this.props.stage?(this.pickPaddles(),this.props.nextStage()):2!==this.props.stage||":("!==this.state.score&&":)"!==this.state.score?4===this.props.stage?(":)"===this.state.score&&this.pickPaddles([0,0,0,0]),this.props.nextStage(0),this.setGame()):!0===this.props.shuffling&&(this.pickPaddles(),this.props.shuffle()):(":("===this.state.score&&this.pickPaddles([0,0,0,0]),this.props.nextStage())}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.sizeGame),window.clearInterval(window.setInterval(this.animate,10))}},{key:"render",value:function(){var t=this.state,e=this.state.paddles;return i.a.createElement("svg",{width:t.svg.w,height:t.svg.h,viewBox:t.svg.box,onClick:this.handleClick},i.a.createElement("rect",{id:"cell",width:t.cell.w,height:t.cell.h,x:t.cell.x,y:t.cell.y,fillOpacity:1}),i.a.createElement("circle",{id:"ball",cx:t.ball.x,cy:t.ball.y,r:t.ball.r,fill:this.props.fill}),i.a.createElement("rect",{id:"paddleXT",width:e.x.length,height:e.depth,x:e.x.x,y:e.x.top.y,fill:this.props.fill,fillOpacity:e.x.top.display}),i.a.createElement("rect",{id:"paddleXB",width:e.x.length,height:e.depth,x:e.x.x,y:e.x.bottom.y,fill:this.props.fill,fillOpacity:e.x.bottom.display}),i.a.createElement("rect",{id:"paddleYL",width:e.depth,height:e.y.length,x:e.y.left.x,y:e.y.y,fill:this.props.fill,fillOpacity:e.y.left.display}),i.a.createElement("rect",{id:"paddleYR",width:e.depth,height:e.y.length,x:e.y.right.x,y:e.y.y,fill:this.props.fill,fillOpacity:e.y.right.display}))}}]),e}(a.Component),x=(s(19),function(t){function e(t){var s;return Object(r.a)(this,e),(s=Object(h.a)(this,Object(d.a)(e).call(this,t))).getScore=function(t){s.setState({score:t})},s.getPosition=function(t,e){s.setState({x:t,y:e})},s.nextStage=function(t){void 0===t&&(t=s.state.stage+1),s.setState({stage:t})},s.shuffle=function(){var t=!s.state.shuffle;s.setState({shuffle:t})},s.state={stage:0,shuffle:!1,cursor:{cursor:"default"}},s}return Object(p.a)(e,t),Object(c.a)(e,[{key:"componentDidUpdate",value:function(){1===this.state.stage&&"default"===this.state.cursor.cursor?this.setState({cursor:{cursor:"none"}}):":("!==this.state.score&&":)"!==this.state.score||"none"!==this.state.cursor.cursor||this.setState({cursor:{cursor:"default"}})}},{key:"render",value:function(){return i.a.createElement("span",{id:"view",style:this.state.cursor},i.a.createElement(g,{pos:this.getPosition,score:this.state.score,shuffle:this.shuffle,stage:this.state.stage,nextStage:this.nextStage}),i.a.createElement(f,{fill:"#eeeeee",score:this.getScore,stage:this.state.stage,nextStage:this.nextStage,x:this.state.x,y:this.state.y,shuffle:this.shuffle,shuffling:this.state.shuffle}),i.a.createElement(v,{score:this.state.score}))}}]),e}(a.Component)),g=function(t){function e(t){var s;return Object(r.a)(this,e),(s=Object(h.a)(this,Object(d.a)(e).call(this,t))).changePos=function(t){var e="mousemove"===t.type?[t.clientX,t.clientY]:[t.touches[0].clientX,t.touches[0].clientY],a=Object(l.a)(e,2),i=a[0],n=a[1];return s.props.pos(i,n),!1},s.handleClick=function(t){return 0===s.props.stage||3===s.props.stage?s.props.nextStage():s.props.shuffle(),!1},s.state={},s}return Object(p.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){return i.a.createElement("span",{style:m.input,onClick:this.handleClick,onMouseMove:this.changePos,onTouchMove:this.changePos})}}]),e}(a.Component),v=function(t){function e(t){var s;return Object(r.a)(this,e),(s=Object(h.a)(this,Object(d.a)(e).call(this,t))).state={score:0},s}return Object(p.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){return i.a.createElement("span",{id:"score",style:m.score},this.props.score)}}]),e}(a.Component),m={score:{fontSize:"6vh",color:"#eee",textAlign:"center",zIndex:3,position:"absolute"},input:{width:"100%",height:"100%",position:"absolute",backgroundColor:"cyan",opacity:0,zIndex:5}};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[10,2,1]]]);
//# sourceMappingURL=main.ebe97808.chunk.js.map