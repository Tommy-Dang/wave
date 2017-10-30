/* October 2017 
 * Tommy Dang, Assistant professor, iDVL@TTU
 *
 * THIS SOFTWARE IS BEING PROVIDED "AS IS", WITHOUT ANY EXPRESS OR IMPLIED
 * WARRANTY.  IN PARTICULAR, THE AUTHORS MAKE NO REPRESENTATION OR WARRANTY OF ANY KIND CONCERNING THE MERCHANTABILITY
 * OF THIS SOFTWARE OR ITS FITNESS FOR ANY PARTICULAR PURPOSE.
 */

function drawSpeedometer(){
  var gauge = iopctrl.arcslider()
                .radius(120)
          .events(false)
          .indicator(iopctrl.defaultGaugeIndicator);
  gauge.axis().orient("in")
          .normalize(true)
          .ticks(10)
          .tickSubdivide(3)
          .tickSize(10, 5, 10)
          .tickPadding(5)
          .scale(d3.scale.linear()
                  .domain([0, 16])
                  .range([-3*Math.PI/4, 3*Math.PI/4]));

  var segDisplay = iopctrl.segdisplay()
          .width(80)
          .digitCount(6)
          .negative(false)
          .decimals(0);

  svg.append("g")
          .attr("class", "segdisplay")
          .attr("transform", "translate("+width+", 100)")
          .call(segDisplay);

  svg.append("g")
          .attr("class", "gauge")
          .call(gauge);

  segDisplay.value(12);
  gauge.value(92);
    
}

