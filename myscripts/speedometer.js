/* October 2017 
 * Tommy Dang, Assistant professor, iDVL@TTU
 *
 * THIS SOFTWARE IS BEING PROVIDED "AS IS", WITHOUT ANY EXPRESS OR IMPLIED
 * WARRANTY.  IN PARTICULAR, THE AUTHORS MAKE NO REPRESENTATION OR WARRANTY OF ANY KIND CONCERNING THE MERCHANTABILITY
 * OF THIS SOFTWARE OR ITS FITNESS FOR ANY PARTICULAR PURPOSE.
 */

var maxDial = 99;
var gauge = iopctrl.arcslider()
                .radius(50)
                .bands(2)
          .events(false)
          .indicator(iopctrl.defaultGaugeIndicator);
var segDisplay = iopctrl.segdisplay()
          .width(16)
          .digitCount(2)
          .negative(false)
          .decimals(0);
var yMeter = heightTop+60;  
function drawSpeedometer(){
  gauge.axis().orient("in")
          .normalize(true)
          .ticks(5)
          .tickSubdivide(3)
          .tickSize(6, 3, 6)
          .tickPadding(0)
          .scale(d3.scale.linear()
                  .domain([0, maxDial])
                  .range([-2.1*Math.PI/4, 2.1*Math.PI/4]));

  
  var svg2 = d3.select("#speedometer")
                .append("svg:svg")
                .attr("width", 152)
                .attr("height", 128);

  
  svg2.append("rect")
    .attr("width", 27)
    .attr("height", 17)
    .attr("x", 86)
    .attr("y", yMeter-2)
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("fill", "#ddd")
    .attr("fill-opacity", 0.9)
    .attr("stroke", "#000")
    .attr("stroke-width", 0.5);             
  
  svg2.append("text")
    .attr("x", 105)
    .attr("y", heightTop+70)
    .attr("fill", "#00f")
    .style("font-family",  "sans-serif")
    .style("font-size", "10px")
    .text("x");
  

  svg2.append("g")
          .attr("class", "segdisplay")
          .attr("transform", "translate(90,"+yMeter+")")
          .call(segDisplay);

  svg2.append("g")
          .attr("class", "gauge")
          .call(gauge);
  gauge.value(0);
  segDisplay.value(0);
    
}

