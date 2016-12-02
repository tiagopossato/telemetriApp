var ws = require("nodejs-websocket")

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// Scream server example: "hi" -> "HI!!!"
var d = 0;
var server = ws.createServer(function (conn) {
	console.log("New connection")
	conn.on("text", function (str) {
	try{
		console.log("Received "+str)
		setInterval(function(){
			conn.sendText("{\"01\":"+getRandomArbitrary(0,50)+"}")			
			},1900);
		setInterval(function(){
			conn.sendText("{\"02\":"+getRandomArbitrary(0,30)+"}")			
			},1800);
		setInterval(function(){
			conn.sendText("{\"03\":"+getRandomArbitrary(0,50)+"}")			
			},1700);
		setInterval(function(){
			conn.sendText("{\"04\":"+d+"}");
			d++;
			},1150);
		setInterval(function(){
			conn.sendText("{\"05\":"+getRandomArbitrary(0,35)+"}")			
			},1750);        
		setInterval(function(){
			conn.sendText("{\"06\":"+getRandomArbitrary(0,43)+"}")			
			},1650);
	}catch(e){
		console.log(e);
	}
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
	})
}).listen(81)
