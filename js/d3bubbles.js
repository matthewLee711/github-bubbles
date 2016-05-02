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

//Orders bubbles from largest to smallest
function orderBubble() {
	var circle = d3.selectAll("circle");
	
	d3.json("bubbles.json", function(error, data) {
		//store bubbles to be ordered
		var order = []
		for(var i = 0; i < data.length; i++) {
			order.push(data[i].repositories);
		}
		//order bubbles
		var force = 0;
		var stop = true; 
		var point1 = 0;//point 1 -- start first index
		var point2 = 1;//point 2 -- start second index willl do swaps
		var tempStore = 0;
		while(stop != false) {
			//if number 1 is less than than number 2, swap
			if(Number(order[point1]) < Number(order[point2])) {
				tempStore = order[point1]; // temp store point1
				order[point1] = order[point2]; //move pt2 to pt1 position
				order[point2] = tempStore; // move point 1 down
				//Check if number reach top position
				if(order[point1 - 1] == null) {
					console.log("nope");
				}
				//iterate backwards to keep moving number to top
				else {
					point1 -= 1;
					point2 -= 1;
				}
			}
			//move to next number set if point 1 is greater than point 2
			else if(Number(order[point2]) < Number(order[point1]) && order[point2 + 1] != null) {
				point1 += 1;//move to next number to check
				point2 += 1;
			}
			//end if all numbers are ordered
			else if(order[point2 + 1] == null) {
				break;
			}
			force += 1;
			if(force >= 1000) {
				break;
			}
		}
		console.log("final");
		console.log(order);

		var placement = [10, 40, 70, 110, 140, 170, 200, 230, 260];
		var counter = 0;
		var go = true;
		//Each bubble is ordered
		circle.transition().attr("cx", function(d, i) { 
			counter = 0;
			while(go != false) {
				if(data[i].repositories == order[counter]) {
					return placement[counter];
				}
				else {
					counter += 1;
				}
				if(counter >= 1000) {
					break;
				}
			}
			
		});
	});
	
}

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

function updateBubbles() {
	$.ajax({
         	type: 'GET',
			//contentType: 'application/json',
         	url: "http://localhost:3000/scraper.py",
         	//dataType: "json",
         	success: function(response){
			//alert(response);
			console.log("yay");
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log("fail");
			console.log(jqXHR, textStatus, errorThrown);
		}
	});	
}

