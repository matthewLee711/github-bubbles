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
	var circle = d3.selectAll("circle");
	circle.transition().attr("cx", Math.random() * 720);
}
//sends bubbles all over the place
function randomBubble() {
	var circle = d3.selectAll("circle");
	circle.transition().attr("cx", function(d) { return Math.random(d) * 720; });
}
d3.json("../temp.json", function(error, data) {
	console.log(data);
});
d3.json("bubbles.json", function(error, data) {
	if (error) throw error;
	console.log(data);
	//grab all circle objects
	var circle = d3.selectAll("circle");
	//find proportions to circle
	var total = 0;

	//find proportions to size cicles
	for(var i = 0; i < data.length; i++) {
		total = total + Number(data[i].repositories);
	}
	// for(var i = 0; i < data.length; i++) {
	// 	circle.data([i]).append(Number(data[i].repositories)/total);
	// }

	//proportionally assign each circle size
	circle.data([Number(data[0].repositories)/total * 4000, 
			Number(data[1].repositories)/total * 4000,
			Number(data[2].repositories)/total * 4000,
			Number(data[3].repositories)/total * 4000,
			Number(data[4].repositories)/total * 4000,
			Number(data[5].repositories)/total * 4000,
			Number(data[6].repositories)/total * 4000,
			Number(data[7].repositories)/total * 4000,
			Number(data[8].repositories)/total * 4000]);
	//generates random color
	var color = d3.scale.category20();
	//passing data from circle into function
	circle.attr("r", function(d){return Math.sqrt(d); });
	//circles randomly placed
	circle.attr("cx", function() { return Math.random() * 720; });
	//circles given the generated random color
	circle.style("fill", function(d, i) { return color(i); });
	//click on circle reveals more information
	circle.on("click", function(d, i){
		d3.select("h6").selectAll("p").remove();
		d3.select("h6").append("p")
			.text("That bubble you clicked is.. " + data[i].name +"!");
		d3.select("h6").append("p")	
			.text("and it has " + data[i].repositories + " repositories");
	});

});

//create class for circle
//loop through array for languages -- for each language, grab information
//store information into json
//instantiate circle object and put information into bubble from json
//each bubble is proportionally sized based on information
//location is checked to see if bubble can be placed there

// var circleClass = function() {
// 	var circle = d3.selectAll("circle");
// }

