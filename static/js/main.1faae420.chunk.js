(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,s){},18:function(e,t,s){},20:function(e,t,s){"use strict";s.r(t);var a=s(0),l=s.n(a),i=s(8),n=s.n(i),o=(s(15),s(2)),r=s(3),c=s(5),d=s(4),h=s(6),p=s(1),y=s.n(p),u=(s(18),function(e){function t(e){var s;return Object(o.a)(this,t),(s=Object(c.a)(this,Object(d.a)(t).call(this,e))).getScore=function(e){s.setState({score:e})},s.state={},s}return Object(h.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return l.a.createElement("span",{id:"view"},l.a.createElement(x,{fill:"#eeeeee",score:this.getScore}),l.a.createElement(v,{score:this.state.score}))}}]),t}(a.Component)),x=function(e){function t(e){var s;return Object(o.a)(this,t),(s=Object(c.a)(this,Object(d.a)(t).call(this,e))).setSvg=function(){var e=window.innerWidth,t=window.innerHeight,a=y()(s.state.svg,{w:{$set:e},h:{$set:t},box:{$set:[0,0,e,t].join(" ")},size:{$set:Math.sqrt(e*e+t*t)}});s.setState({svg:a})},s.setCell=function(){var e=.8*s.state.svg.w,t=.8*s.state.svg.h,a=y()(s.state.cell,{w:{$set:e},h:{$set:t},x:{$set:(s.state.svg.w-e)/2},y:{$set:(s.state.svg.h-t)/2}});s.setState({cell:a})},s.setPaddles=function(){var e=s.state.svg,t=s.state.cell,a=e.size/100,l=y()(s.state.paddles,{depth:{$set:a},x:{length:{$set:e.w*(1/9)},top:{y:{$set:t.y}},bottom:{y:{$set:t.y+t.h-a}}},y:{length:{$set:e.h*(1/9)},left:{x:{$set:t.x}},right:{x:{$set:t.x+t.w-a}}}});s.setState({paddles:l})},s.pickPaddles=function(){var e,t=function e(t,s){s=void 0===s?t:s;for(var a=[],l=0;l<4;l++)a.push(Math.round(Math.random()));var i=a.reduce(function(e,t){return e+t});return t<=i&&i<=s?a:e(t,s)};e=":("===s.state.score?[0,0,0,0]:s.state.score<2?[0,1,0,0]:s.state.score<5?t(1):s.state.score<6?t(2):s.state.score<7?t(1,2):s.state.score<15?t(2,3):t(3,4);var a=y()(s.state.paddles,{x:{top:{display:{$set:e[0]?1:0}},bottom:{display:{$set:e[1]?1:0}}},y:{left:{display:{$set:e[2]?1:0}},right:{display:{$set:e[3]?1:0}}}});s.setState({paddles:a})},s.setBall=function(){var e=s.state.svg,t=y()(s.state.ball,{x:{$set:e.w/2},y:{$set:e.h/2},r:{$set:e.size/100},dx:{$set:e.size/500},dy:{$set:e.size/500}});s.setState({ball:t})},s.moveBall=function(){var e,t=s.state.cell,a=s.state.ball,l=s.state.paddles,i=a.dx,n=a.dy,o=s.state.score;a.x+i-a.r<t.x||a.x+a.dx+a.r>t.x+t.w?i*=-1:a.y+n-a.r<t.y||a.y+a.r+a.dy>t.y+t.h?n*=-1:a.y-a.r+n<=t.y+l.depth&&l.x.top.display>0||a.y+a.r+n>=t.y+t.h-l.depth&&l.x.bottom.display>0?l.x.x<=a.x+a.r+i&&a.x-a.r+i<=l.x.x+l.x.length?(n*=-1,o+=1,s.props.score(o),s.pickPaddles()):(n=0,o=":(",s.props.score(o)):(a.x-a.r+i<=t.x+l.depth&&l.y.left.display>0||a.x+a.r+i>=t.x+t.w-l.depth&&l.y.right.display>0)&&(l.y.y<=a.y+a.r+i&&a.y-a.r+n<=l.y.y+l.y.length?(i*=-1,o+=1,s.props.score(o),s.pickPaddles()):(i=0,o=":(",s.props.score(o))),e=y()(a,{dx:{$set:i},dy:{$set:n}});var r=y()(e,{x:{$set:a.x+a.dx},y:{$set:a.y+a.dy}});s.setState({ball:r,score:o})},s.movePaddles=function(e){var t=s.state.cell,a=s.state.paddles,l=a.x.length/2,i=a.y.length/2,n=t.x+t.w-l,o=t.y+t.h-i,r=e.clientX,c=e.clientY;r=r<t.x+l?t.x:r>n?n-l:r-l,c=c<t.y+i?t.y:c>o?o-i:c-i;var d=y()(a,{x:{x:{$set:r}},y:{y:{$set:c}}});return s.setState({paddles:d}),!1},s.touchPaddles=function(e){var t=s.state.cell,a=s.state.paddles,l=a.x.length/2,i=a.y.length/2,n=t.x+t.w-l,o=t.y+t.h-i,r=e.touches.clientX,c=e.touches.clientY;r=r<t.x+l?t.x:r>n?n-l:r-l,c=c<t.y+i?t.y:c>o?o-i:c-i;var d=y()(a,{x:{x:{$set:r}},y:{y:{$set:c}}});return s.setState({paddles:d}),!1},s.setGame=function(){s.props.score("hit the ball"),s.setState({score:0}),s.sizeGame()},s.sizeGame=function(){s.setSvg(),setTimeout(s.setCell),setTimeout(s.setBall),setTimeout(s.setPaddles,1)},s.handleClick=function(){"x"===s.state.score?s.setGame():s.pickPaddles()},s.state={svg:{},cell:{},paddles:{x:{top:{display:0},bottom:{display:0}},y:{left:{display:0},right:{display:0}}},ball:{}},s}return Object(h.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.setGame(),window.addEventListener("resize",this.sizeGame),window.addEventListener("mousemove",this.movePaddles),window.addEventListener("touchmove",this.touchPaddles),window.setInterval(this.moveBall,10)}},{key:"shouldComponentUpdate",value:function(e,t){return this.state!==t}},{key:"componentDidUpdate",value:function(){":("===this.state.score&&(this.pickPaddles(),this.setState({score:"x"}))}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.sizeGame),window.removeEventListener("mousemove",this.movePaddles),window.removeEventListener("touchmove",this.touchPaddles),window.clearInterval(window.setInterval(this.moveBall,10))}},{key:"render",value:function(){var e=this.state,t=this.state.paddles;return l.a.createElement("svg",{width:e.svg.w,height:e.svg.h,viewBox:e.svg.box,onClick:this.handleClick},l.a.createElement("rect",{id:"cell",width:e.cell.w,height:e.cell.h,x:e.cell.x,y:e.cell.y}),l.a.createElement("circle",{id:"ball",cx:e.ball.x,cy:e.ball.y,r:e.ball.r,fill:this.props.fill}),l.a.createElement("rect",{id:"paddleXT",width:t.x.length,height:t.depth,x:t.x.x,y:t.x.top.y,fill:this.props.fill,fillOpacity:t.x.top.display}),l.a.createElement("rect",{id:"paddleXB",width:t.x.length,height:t.depth,x:t.x.x,y:t.x.bottom.y,fill:this.props.fill,fillOpacity:t.x.bottom.display}),l.a.createElement("rect",{id:"paddleYL",width:t.depth,height:t.y.length,x:t.y.left.x,y:t.y.y,fill:this.props.fill,fillOpacity:t.y.left.display}),l.a.createElement("rect",{id:"paddleYR",width:t.depth,height:t.y.length,x:t.y.right.x,y:t.y.y,fill:this.props.fill,fillOpacity:t.y.right.display}))}}]),t}(a.Component),v=function(e){function t(e){var s;return Object(o.a)(this,t),(s=Object(c.a)(this,Object(d.a)(t).call(this,e))).state={score:0},s}return Object(h.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{id:"score",style:m.score},this.props.score)}}]),t}(a.Component),m={score:{fontSize:"6vh",color:"#eee",textAlign:"center",zIndex:3,position:"absolute"}},f=u;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n.a.render(l.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,s){e.exports=s(20)}},[[9,2,1]]]);
//# sourceMappingURL=main.1faae420.chunk.js.map