/* October 2017 
 * Tommy Dang, Assistant professor, iDVL@TTU
 *
 * THIS SOFTWARE IS BEING PROVIDED "AS IS", WITHOUT ANY EXPRESS OR IMPLIED
 * WARRANTY.  IN PARTICULAR, THE AUTHORS MAKE NO REPRESENTATION OR WARRANTY OF ANY KIND CONCERNING THE MERCHANTABILITY
 * OF THIS SOFTWARE OR ITS FITNESS FOR ANY PARTICULAR PURPOSE.
 */


var gauge = iopctrl.arcslider()
                .radius(100)
                .bands(5)
          .events(false)
          .indicator(iopctrl.defaultGaugeIndicator);
var segDisplay = iopctrl.segdisplay()
          .width(60)
          .digitCount(2)
          .negative(false)
          .decimals(0);
var yMeter = heightTop+120;  
function drawSpeedometer(){
  gauge.axis().orient("in")
          .normalize(true)
          .ticks(10)
          .tickSubdivide(3)
          .tickSize(10, 5, 10)
          .tickPadding(5)
          .scale(d3.scale.linear()
                  .domain([0, 20])
                  .range([-2.5*Math.PI/4, 2.5*Math.PI/4]));

  
  var svg2 = d3.select("#speedometer")
                .append("svg:svg")
                .attr("width", 252)
                .attr("height", 214);

  
  svg2.append("rect")
    .attr("width", 88)
    .attr("height", 43)
    .attr("x", 107)
    .attr("y", yMeter-1)
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("fill", "#ddd")
    .attr("fill-opacity", 0.9)
    .attr("stroke", "#000")
    .attr("stroke-width", 0.5);             
  
  svg2.append("text")
    .attr("x", 167)
    .attr("y", heightTop+158)
    .attr("fill", "#00f")
    .style("font-family",  "sans-serif")
    .style("font-size", "40px")
    .text("x");
  

  svg2.append("g")
          .attr("class", "segdisplay")
          .attr("transform", "translate(108,"+yMeter+")")
          .call(segDisplay);

  svg2.append("g")
          .attr("class", "gauge")
          .call(gauge);
  gauge.value(0);
  segDisplay.value(0);
    
}

