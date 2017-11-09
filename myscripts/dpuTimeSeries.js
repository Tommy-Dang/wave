/* October 2017 
 * Tommy Dang, Assistant professor, iDVL@TTU
 *
 * THIS SOFTWARE IS BEING PROVIDED "AS IS", WITHOUT ANY EXPRESS OR IMPLIED
 * WARRANTY.  IN PARTICULAR, THE AUTHORS MAKE NO REPRESENTATION OR WARRANTY OF ANY KIND CONCERNING THE MERCHANTABILITY
 * OF THIS SOFTWARE OR ITS FITNESS FOR ANY PARTICULAR PURPOSE.
 */

var heightBoard =200;
var yTimeSeries = heightTop+heightRect+heightBoard*2+20;
var color10 = d3.scale.category10();


var x = d3.scale.linear()
        .range([heightRect2+margin*2,width-heightRect2/2])
        .domain([0, 1000]); 

var y = d3.scale.linear()
        .range([yTimeSeries,yTimeSeries-heightBoard*0.85])
        .domain([0, 1]); 
var xAxis, yAxis;

var timeRatio =2000;
var area = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) { return x(d.id); })
    .y0(yTimeSeries)
    .y1(function(d) { return y(d.time/timeRatio); });


function drawTimeSeries() {
  //Create the Axis
  xAxis = d3.svg.axis()
    .scale(x)
    .innerTickSize(-4)
    .outerTickSize(-4)
    .orient("bottom");

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + yTimeSeries + ")")
      .call(xAxis);

  svg.append("text")
      .attr("fill", "#000")
      .attr("x", width-margin-5)
      .attr("y", yTimeSeries-margin)
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "end")
      .style("font-size", "12px")
      .text("Passes");

  svg.append("text")
      .attr("fill", "#000")
      .attr("x", heightRect2+margin*2+40)
      .attr("y", yTimeSeries-heightBoard+27)
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "start")
      .style("font-size", "12px")
      .text("DPU utilization");        

 yAxis = d3.svg.axis()
    .scale(y)
    .ticks(4)
    .innerTickSize(-(width-heightRect2-60))
    .outerTickSize(0)
    .orient("left");

  
  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (heightRect2+margin*2+20)+ ","+0+")")
      .style("stroke-dasharray", "1 2")
      .call(yAxis);


  svg.append("path")
      .datum([])
      .attr("class", "path1")
      .attr("stroke", color1)
      .attr("stroke-width", 0.5)
      .attr("fill", "#fdd")
      .attr("fill-opacity", 0.5)
      .attr("d", area);

  svg.append("path")
      .datum([])
      .attr("class", "path2")
      .attr("stroke", color2)
      .attr("stroke-width", 0.5)
      .attr("fill", "#dff")
      .attr("fill-opacity", 0.5)
      .attr("d", area);        
}

function updateTimeSeries() {
  /*if(nodes1.length>0 && nodes2.length>0){
    var maxTime = Math.max(nodes1[nodes1.length-1].timeMax, nodes2[nodes2.length-1].timeMax);
    y.domain([0,maxTime/timeRatio]);    
    svg.selectAll("g.y.axis")
        .call(yAxis);
    svg.selectAll("g.x.axis")
        .call(xAxis);      
  }
    
  svg.selectAll(".path1")
      .datum(nodes1)
      .attr("d", area);

  svg.selectAll(".path2")
      .datum(nodes2)
      .attr("d", area);   */ 
}


