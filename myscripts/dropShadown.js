/* October 2017 
 * Tommy Dang, Assistant professor, iDVL@TTU
 *
 * THIS SOFTWARE IS BEING PROVIDED "AS IS", WITHOUT ANY EXPRESS OR IMPLIED
 * WARRANTY.  IN PARTICULAR, THE AUTHORS MAKE NO REPRESENTATION OR WARRANTY OF ANY KIND CONCERNING THE MERCHANTABILITY
 * OF THIS SOFTWARE OR ITS FITNESS FOR ANY PARTICULAR PURPOSE.
 */
 
var width = document.body.clientWidth;
var margin = 12;
var heightTop = 60;
var heightRect = width/2-2*margin;
var heightBoard = 200;
var height = heightTop+heightRect+3*margin+heightBoard;
var color1 = "#800";
var color2 = "#088";

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("a")
    .attr("xlink:href", "http://wavecomp.ai/")
    .append("image")
    .attr("xlink:href", "images/logo.png")
    .attr("x", width*0.75-100)
    .attr("y", "-16px")
    .attr("width", "200")
    .attr("height", "100");

 svg.append("text")
    .attr("x", width*0.25)
    .attr("y", heightTop*0.75)
    .style("fill", color1)
    .style("text-shadow", "1px 1px 0 rgba(0, 0, 0, 0.7")
    .attr("text-anchor", "middle")
    .style("font-size", "23px")
    .text("GPU");   


//*********** Dropdown rectangle format *******************
// filters go in defs element
var defs = svg.append("defs");

// create filter with id #drop-shadow
// height=130% so that the shadow is not clipped
var filter = defs.append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "130%");

// SourceAlpha refers to opacity of graphic that this filter will be applied to
// convolve that with a Gaussian with standard deviation 3 and store result
// in blur
filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 5)
    .attr("result", "blur");

// translate output of Gaussian blur to the right and downwards with 2px
// store result in offsetBlur
filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 5)
    .attr("dy", 5)
    .attr("result", "offsetBlur");

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");
        
svg.append("rect")
    .attr("width", width/2-margin*2)
    .attr("height", heightRect)
    .attr("x", margin)
    .attr("y", heightTop)
    .attr("rx", 8)
    .attr("ry", 8)
    .attr("fill", "#fee")
    .attr("stroke", color1)
    .style("filter", "url(#drop-shadow)"); 

svg.append("rect")
    .attr("width", width/2-margin*2)
    .attr("height", heightRect)
    .attr("x", width/2+margin)
    .attr("y", heightTop)
    .attr("rx", 8)
    .attr("ry", 8)
    .attr("fill", "#eff")
    .attr("stroke", color2)
    .style("filter", "url(#drop-shadow)"); 

// Time series
svg.append("rect")
    .attr("width", width-margin*2)
    .attr("height", heightBoard)
    .attr("x", margin)
    .attr("y", heightTop+heightRect+1.5*margin)
    .attr("rx", 8)
    .attr("ry", 8)
    .attr("fill", "#bbb")
    .style("filter", "url(#drop-shadow)");     


