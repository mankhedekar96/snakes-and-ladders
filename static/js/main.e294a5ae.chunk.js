(this["webpackJsonpsnakes-and-ladders"]=this["webpackJsonpsnakes-and-ladders"]||[]).push([[0],[,,,,,function(e,t,a){e.exports=a.p+"static/media/location.ea573223.svg"},,,function(e,t,a){e.exports=a.p+"static/media/snakes-ladders-board.0cf046b3.png"},function(e,t,a){e.exports=a(18)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),c=a(7),r=a.n(c),i=(a(14),a(1)),s=a(2),u=a(4),l=a(3),m=a(8),f=a.n(m),d=a(5),p=a.n(d),h=(a(15),a(16),function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).faces=["front","back","right","left","top","bottom"],n.changeDice=function(){var e=n.getRandomInt(1,6);n.setState({cubeFaceClass:"rotate-cube"}),setTimeout((function(){return n.setState({cubeFaceClass:"show-"+n.faces[e-1]})}),800),n.props.onClick(e)},n.getRandomInt=function(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e},n.state={cubeFaceClass:""},n}return Object(s.a)(a,[{key:"componentDidMount",value:function(){this.setState({cubeFaceClass:"show-"+this.faces[0]})}},{key:"render",value:function(){var e=this.state.cubeFaceClass;return o.a.createElement("div",{className:"scene"},o.a.createElement("div",{className:"cube "+e,onClick:this.changeDice},o.a.createElement("div",{className:"cube__face cube__face--front"},"1"),o.a.createElement("div",{className:"cube__face cube__face--back"},"2"),o.a.createElement("div",{className:"cube__face cube__face--right"},"3"),o.a.createElement("div",{className:"cube__face cube__face--left"},"4"),o.a.createElement("div",{className:"cube__face cube__face--top"},"5"),o.a.createElement("div",{className:"cube__face cube__face--bottom"},"6")))}}]),a}(n.Component)),v=(a(17),function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).handlePositionChange=function(e){n.setState({inputCurrentPosition:e.target.value})},n.handleDiceChange=function(e){n.setState({diceOutcome:e.target.value})},n.handleSubmit=function(){var e=parseInt(n.state.inputCurrentPosition),t=parseInt(n.state.diceOutcome);e>=1&&e<=100?t>=1&&t<=6?n.props.onFormSubmit(e,t):alert("Please enter valid dice outcome"):alert("Please enter valid Current Position")},n.state={diceOutcome:"",inputCurrentPosition:""},n}return Object(s.a)(a,[{key:"render",value:function(){var e=this.state,t=e.inputCurrentPosition,a=e.diceOutcome,n=this.props,c=n.onDiceTossed,r=n.resetApp;return o.a.createElement("section",{className:"form"},o.a.createElement("div",{className:"input-area"},o.a.createElement("div",null,o.a.createElement("label",null,"Current Position:",o.a.createElement("input",{type:"text",value:t,onChange:this.handlePositionChange}))),o.a.createElement("div",null,o.a.createElement("label",null,"Dice Outcome:",o.a.createElement("input",{type:"text",value:a,onChange:this.handleDiceChange}))),o.a.createElement("div",null,o.a.createElement("input",{className:"submit-btn",type:"button",value:"Submit",onClick:this.handleSubmit}),o.a.createElement("input",{className:"reset-btn",type:"button",value:"Reset",onClick:r}))),o.a.createElement("div",{className:"dice-container"},o.a.createElement(h,{onClick:c})))}}]),a}(n.Component)),b=[{top:33,foot:7},{top:85,foot:37},{top:72,foot:51},{top:99,foot:63}],g=[{head:36,tail:19},{head:65,tail:35},{head:87,tail:32},{head:97,tail:21}],E=function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).startGame=function(){n.setState((function(e){return{startGame:!0,currentPosition:0,currentLeft:e.currentLeft-10}}))},n.onDiceTossed=function(e){if(n.state.currentPosition+e<=100){for(var t=1;t<=e;)setTimeout((function(){n.setState((function(e){return{currentPosition:e.currentPosition+1}})),n.moveLocationIcon()}),500*t),t++;setTimeout((function(){n.checkForSnakes(),n.checkForLadders(),console.log("New position:",n.state.currentPosition),n.setState((function(e){return{output:"".concat(e.output," \n New position: ").concat(n.state.currentPosition)}}))}),500*e+500)}},n.moveLocationIcon=function(){var e=n.state.currentPosition;if(e<=100)switch(e){case 21:case 41:case 61:case 81:n.setState({move:"right"}),n.moveVertical();break;case 11:case 31:case 51:case 71:case 91:n.setState({move:"left"}),n.moveVertical();break;default:n.moveHorizontal()}},n.moveHorizontal=function(){"right"===n.state.move?n.setState((function(e){return{currentLeft:e.currentLeft+10}})):n.setState((function(e){return{currentLeft:e.currentLeft-10}}))},n.moveVertical=function(){n.setState((function(e){return{currentBottom:e.currentBottom+10}}))},n.checkForSnakes=function(){var e=n.state.currentPosition;g.forEach((function(t){t.head===e&&n.goToPosition(t.tail)}))},n.checkForLadders=function(){var e=n.state.currentPosition;b.forEach((function(t){t.foot===e&&n.goToPosition(t.top)}))},n.goToPosition=function(e){var t=parseInt(e/10),a=e%10;t-=0===a?1:0,n.setState({currentPosition:e,currentBottom:10*t}),[0,2,4,6,8].includes(t)?n.setState({move:"right",currentLeft:10*(0===a?9:a-1)}):n.setState({move:"left",currentLeft:10*(0===a?0:10-a)})},n.onFormSubmit=function(e,t){e+t<=100?(n.goToPosition(e),n.onDiceTossed(t),console.log("Current position: ",e),console.log("Dice Outcome: ",t),n.setState({output:"Current position: ".concat(e," \n Dice Outcome: ").concat(t)})):(n.goToPosition(e),console.log("Current position: ",e),console.log("Dice Outcome: ",t),n.setState({output:"Current position: ".concat(e," \n Dice Outcome: ").concat(t," \n New position: ").concat(e)}))},n.resetApp=function(){n.setState({startGame:!1,currentPosition:0,currentBottom:0,currentLeft:0,move:"right",output:""})},n.state={startGame:!1,currentPosition:0,currentBottom:0,currentLeft:0,move:"right",output:""},n}return Object(s.a)(a,[{key:"render",value:function(){var e=this.state,t=e.startGame,a=e.currentBottom,n=e.currentLeft,c=e.output;return o.a.createElement("div",{className:"container"},o.a.createElement("header",{className:"header"},o.a.createElement("p",null,"Snakes and Ladders")),o.a.createElement("div",{className:"play-board"},o.a.createElement("img",{src:f.a,className:"play-board-img",alt:"play-board"}),t&&o.a.createElement("img",{src:p.a,className:"play-location-img",style:{bottom:3+a+"%",left:4+n+"%"},alt:"location"}),o.a.createElement("div",{className:"initial-box-container"},o.a.createElement("div",{className:"initial-box"},"00"))),o.a.createElement("div",{className:"input-board"},!t&&o.a.createElement("div",{className:"start-btn",onClick:this.startGame},o.a.createElement("p",null,"START ",o.a.createElement("img",{src:p.a,className:"location-img",alt:"location"})," ")),t&&o.a.createElement(v,{onFormSubmit:this.onFormSubmit,onDiceTossed:this.onDiceTossed,resetApp:this.resetApp})),o.a.createElement("div",{className:"output-board"},o.a.createElement("p",null,c)))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[9,1,2]]]);
//# sourceMappingURL=main.e294a5ae.chunk.js.map