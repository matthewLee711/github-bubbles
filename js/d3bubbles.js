function run(){
	console.log("in run");
	var circle = d3.selectAll("circle");
	circle.style("fill", "steelblue");
	//reassign attributes
	circle.attr("r", 30);
	//can append data to circle
	circle.data([32, 57, 112]);

	//passing data from circle into function
	circle.attr("r", function(d){return Math.sqrt(d); });
	//circles randomly placed
	circle.attr("cx", function() { return Math.random() * 720; });
}

//Moves circle to another position
function updateBubble() {
	
	circle.transition().attr("cx", Math.random() * 720);
}
function randomBubble() {
	
	circle.transition().attr("cx", function(d) { return Math.random(d) * 720; });
}