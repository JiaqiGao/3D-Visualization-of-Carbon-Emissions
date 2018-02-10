var width = 670;
var height = 500;

var projection = d3.geoAlbers()
    .scale(70000)
    .rotate( [87.6057,0] )
    .center( [0, 41.826] )
    .translate([width / 2, height / 2]);

var path = d3.geoPath()
    .projection(projection);

var svg = d3.select(".last").append("svg")
    .attr("width", width)
    .attr("height", height);

var color = d3.scaleThreshold()
    .domain([50, 150, 300, 400, 500, 600])
    //.range(["#ffffff","#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);
    .range(["#b2d4e6","#328ebd","#0072ad","#005b8a","#004467","#0c3557","#002d45"]);



var tooltip = d3.select(".last")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text("a simple tooltip");
//year = document.getElementById("radio").value;
//console.log(year)
//
d3.queue()
     .defer(d3.json, "https://raw.githubusercontent.com/uchicagotechteam/chicago-justice-project-project/master/data/chicago_zips_topojson.json") // Load Chicago file
     .defer(d3.tsv, "https://raw.githubusercontent.com/uchicagotechteam/chicago-justice-project-project/master/data/crimes17.tsv" ) // CHANGE HERE -- ie crimes17
     .await(ready); // Run 'ready' when JSONs are loaded

// Ready Function, runs when data is loaded
function ready(error, chicago_zips_topojson, crimes) {
  if (error) throw error;

  var crimeById = {};
  crimes.forEach(function(d){
    crimeById[d.Zipcode] = +d.num;
    //console.log(color(crimeById[d.Zipcode]));
  });
  //console.log(color(crimeById));




  svg.append("g")
      .attr("class", "ChicagoMap")
    .selectAll("path")
      .data(topojson.feature(chicago_zips_topojson, chicago_zips_topojson.objects.Zip_Codes).features) // Bind TopoJSON data elements
    .enter().append("path")
      .attr("d", path)
      .style("fill", function(d){
        var value = crimeById[d.properties.zip];
        if (value) {
          return color(value);
        } else {
          return "#ffffff";
        }
      })
      .on("mouseover", function(){
        return tooltip.style("visibility", "visible");
      })
      .on("mousemove", function(d){
          var value = crimeById[d.properties.zip];
          var coordinates = d3.mouse(this);
          return tooltip.style("top", (coordinates[1]-20)+"px").style("left",(coordinates[0]+20)+"px").style("color", 'white').style("background", 'black').style("padding", "4px").text(value);
      })
      .on("mouseout", function(){
        return tooltip.style("visibility", "hidden");
      })
      .style("stroke", "black");
}


//d3.select("#radioButtons").on("input", function() {
  //  update(+this.value);
//});

// update the fill of each SVG of class "incident" with value
// get list of radio buttons with name 'size'
var clicks = document.getElementById("radios").elements['crime'];
//console.log(clicks)
// loop through list
for (var i=0, len=clicks.length; i<len; i++) {
    clicks[i].onclick = function() { // assign onclick handler function to each
        // put clicked radio button's value in total field
        year=this.value
        console.log(year)

        d3.queue()
             .defer(d3.json, "https://raw.githubusercontent.com/uchicagotechteam/chicago-justice-project-project/master/data/chicago_zips_topojson.json") // Load Chicago file
             .defer(d3.tsv, "https://raw.githubusercontent.com/uchicagotechteam/chicago-justice-project-project/master/data/crimes" + year + ".tsv" ) // CHANGE HERE -- ie crimes17
             .await(ready); // Run 'ready' when JSONs are loaded

        // Ready Function, runs when data is loaded
        function ready(error, chicago_zips_topojson, crimes) { //
          if (error) throw error;

          var crimeById = {};
          crimes.forEach(function(d){
            crimeById[d.Zipcode] = +d.num;
            //console.log(color(crimeById[d.Zipcode]));
          });
          //console.log(color(crimeById));

          svg.append("g")
              .attr("class", "ChicagoMap")
            .selectAll("path")
              .data(topojson.feature(chicago_zips_topojson, chicago_zips_topojson.objects.Zip_Codes).features) // Bind TopoJSON data elements
            .enter().append("path")
              .attr("d", path)
              .style("fill", function(d){
                var value = crimeById[d.properties.zip];

                if (value) {
                  return color(value);
                } else {
                  return "#ffffff";
                }
              })
              .on("mouseover", function(){
                return tooltip.style("visibility", "visible");
              })
	            .on("mousemove", function(d){
                        var value = crimeById[d.properties.zip];
                        var coordinates = d3.mouse(this);
                return tooltip.style("top", (coordinates[1]-20)+"px").style("left",(coordinates[0]+20)+"px").style("color", 'white').style("background", 'black').style("padding", "4px").text(value);
              })
              .on("mouseout", function(){
                return tooltip.style("visibility", "hidden");
              })
              .style("stroke", "black");


        }
        //d3.tsv("https://raw.githubusercontent.com/uchicagotechteam/chicago-justice-project-project/master/data/crimes" + this.value + ".tsv")
    };
}

//var w = 140, h = 400;

		/*	var key = d3.select("body").append("svg").attr("width", width).attr("height", height);

			var legend = key.append("defs").append("svg:linearGradient").attr("id", "gradient").attr("x1", "100%").attr("y1", "0%").attr("x2", "100%").attr("y2", "100%").attr("spreadMethod", "pad");

			legend.append("stop").attr("offset", "0%").attr("stop-color", "#B30000").attr("stop-opacity", 1);

			legend.append("stop").attr("offset", "100%").attr("stop-color", "#FEE8c8").attr("stop-opacity", 1);

			key.append("rect").attr("width", width - 100).attr("height", height - 100).style("fill", "url(#gradient)").attr("transform", "translate(0,10)");

			var y = d3.scaleLinear().range([300, 0]).domain([1, 100]);

			var yAxis = d3.axisRight("y");
*/
			//key.append("g").attr("class", "y axis").attr("transform", "translate(41,10)").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 30).attr("dy", ".71em").style("text-anchor", "end").text("axis title");

////////////////////////////////////////////////////
