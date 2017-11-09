/* October 2017 
 * Tommy Dang, Assistant professor, iDVL@TTU
 *
 * THIS SOFTWARE IS BEING PROVIDED "AS IS", WITHOUT ANY EXPRESS OR IMPLIED
 * WARRANTY.  IN PARTICULAR, THE AUTHORS MAKE NO REPRESENTATION OR WARRANTY OF ANY KIND CONCERNING THE MERCHANTABILITY
 * OF THIS SOFTWARE OR ITS FITNESS FOR ANY PARTICULAR PURPOSE.
 */

var heightBoard =200;
var yTimeSeries = heightTop+heightRect+heightBoard*2+30;
var color10 = d3.scale.category10();


var x = d3.scale.linear()
        .range([heightRect2+margin*2+30,heightRect2+(width-heightRect2-margin*3)])
        .domain([0, 1000]); 

var y = d3.scale.linear()
        .range([yTimeSeries,yTimeSeries-heightBoard*0.85])
        .domain([0, 100]); 
var xAxis, yAxis;

var timeRatio =2000;

var area = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) { return x(d.count); })
    .y0(yTimeSeries)
    .y1(function(d) { return y(d.utilization); });


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
      .attr("x", heightRect2+margin*2+35)
      .attr("y", yTimeSeries-heightBoard+27)
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "start")
      .style("font-size", "12px")
      .text("DPU utilization (%)");        

 yAxis = d3.svg.axis()
    .scale(y)
    .ticks(4)
    .innerTickSize(-(width-heightRect2-60))
    .outerTickSize(0)
    .orient("left");

  
  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (heightRect2+margin*2+30)+ ","+0+")")
      .style("stroke-dasharray", "1 2")
      .call(yAxis);


  svg.append("path")
      .datum(timeArray)
      .attr("class", "path1")
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .attr("fill", "#fff")
      .attr("fill-opacity", 0.92)
      .attr("d", area);
}

function updateTimeSeries() {
  x.domain([0,count]);  
  svg.selectAll("g.x.axis")
        .call(xAxis);        
  
  svg.selectAll(".path1")
      .datum(timeArray)
      .attr("d", area);

  /*if(nodes1.length>0 && nodes2.length>0){
    var maxTime = Math.max(nodes1[nodes1.length-1].timeMax, nodes2[nodes2.length-1].timeMax);
    y.domain([0,maxTime/timeRatio]);    
    svg.selectAll("g.y.axis")
        .call(yAxis);
    svg.selectAll("g.x.axis")
        .call(xAxis);      
  }
    
  

  svg.selectAll(".path2")
      .datum(nodes2)
      .attr("d", area);   */ 
}


