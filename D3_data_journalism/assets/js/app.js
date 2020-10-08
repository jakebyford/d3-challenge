// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 600;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left left and top margins
var svg = d3.select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);


    var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data 
d3.csv("assets/data/data.csv").then(function(demoData) {
    console.log(demoData);
});

// Step 1: Parse Data from strings to numbers

  demoData.forEach(function(data) {
      data.income = +data.income;
      data.obesity = +data.obesity;
  });

// Step 2: Create Scale functions

  var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(demoData, d => d.income)])
      .range([0, width]);
  
  var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(demoData, d => d.obesity)])
      .range([height, 0]);