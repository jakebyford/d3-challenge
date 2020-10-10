var svgWidth = 960;
var svgHeight = 500;

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

// Intial Parameters

var chosenXAxis = "obesity";
console.log(chosenXAxis);
//function used for updating x-scale var upon click on axis label
function xScale(demoData, chosenXAxis) {
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(demoData, d => d[chosenXAxis]) * 0.8,
            d3.max(demoData, d => d[chosenXAxis]) * 1.2
        ])
        .range([0, width]);
    return xLinearScale;
}

//function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);
    return xAxis
}

//function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]));
    return circlesGroup;

}

function renderText(textCircle, newXScale, chosenXAxis) {

    textCircle.transition()
        .duration(1000)
        .attr("x", d => newXScale(d[chosenXAxis]));
    return textCircle;

}


// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

    var label;

    if (chosenXAxis === "obesity") {
        label = "Obesity: ";
    }

    else {
        label = "Lacks Healthcare: "
    }

    var tooltip = d3.tip()
        .attr("class", "d3-tip")
        // .offset([80, 60])
        .html(function(d) {
            return (`<h6>${d.state}</h6><hr> ${label}${d[chosenXAxis]}%</strong>`);
        });
    
    // circlesGroup.call(toolTip);
    svg.call(toolTip);

    circlesGroup.on("mousover", function(data) {
        toolTip.style("display", "block"); 
        toolTip.show(data);

    })

    //onmouseout event
    .on("mouseout", function() {
        toolTip.style("display", "none");
    });

return circlesGroup;
}

// Retrieve data from the CSV file and execute everythin below

d3.csv("assets/data/data.csv").then(function(demoData, err) {
    console.log(demoData);

    
})