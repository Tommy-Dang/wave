/* October 2017 
 * Tommy Dang, Assistant professor, iDVL@TTU
 *
 * THIS SOFTWARE IS BEING PROVIDED "AS IS", WITHOUT ANY EXPRESS OR IMPLIED
 * WARRANTY.  IN PARTICULAR, THE AUTHORS MAKE NO REPRESENTATION OR WARRANTY OF ANY KIND CONCERNING THE MERCHANTABILITY
 * OF THIS SOFTWARE OR ITS FITNESS FOR ANY PARTICULAR PURPOSE.
 */

var yTimeSeries = heightTop+width/2+heightBoard-margin;
var color10 = d3.scale.category10();


var x = d3.scale.linear()
        .range([margin*2,width*0.9])
        .domain([0, numImg]); 

var y = d3.scale.linear()
        .range([yTimeSeries,yTimeSeries-heightBoard])
        .domain([0, 1000]); 
        
var area = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) { return x(d.id); })
    .y0(yTimeSeries)
    .y1(function(d) { return y(d.time); });

function drawTimeSeries() {
  //x.domain(d3.extent(data, function(d) { return d.date; }));
  //y.domain([0, d3.max(data, function(d) { return d.close; })]);
  //area.y0(y(0));
  
  svg.append("path")
      .datum(nodes1)
      .attr("class", "path1")
      .attr("stroke", "#800")
      .attr("fill", color1)
      .attr("fill-opacity", 0.25)
      .attr("d", area);

  svg.append("path")
      .datum(nodes2)
      .attr("class", "path2")
      .attr("fill", color2)
      .attr("fill-opacity", 0.5)
      .attr("d", area);    

  /*g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");*/
}

function updateTimeSeries() {
  if(nodes1.length>0 && nodes2.length>0){
    var maxTime = Math.max(nodes1[nodes1.length-1].timeMax, nodes2[nodes2.length-1].timeMax);
    y.domain([0,maxTime]);
  }
    
  svg.selectAll(".path1")
      .datum(nodes1)
      .attr("fill", color1)
      .attr("fill-opacity", 0.25)
      .attr("d", area);

  svg.selectAll(".path2")
      .datum(nodes2)
      .attr("fill", color2)
      .attr("fill-opacity", 0.5)
      .attr("d", area);    
}



var w=70, h=100; 
scagScale = d3.scale.linear().rangeRound([w, 0])
                    .domain([0, 1]);
var a = []; 
function drawScagHistogram(id,indexImage, x_, y_){
  // Get scagnostics
  for (var i=0; i<scagnosticList.length;i++){
    var obj ={};
    obj.name = scagnosticList[i];
    obj.valueS = dataS[i+20]["C"+(indexImage+1)];
    obj.valueH = dataH[i+20]["C"+(indexImage+1)];
    obj.valueB = dataB[i+20]["C"+(indexImage+1)];
    a.push(obj);
  }

  var y1 = d3.scale.ordinal().rangeRoundBands([0, h]);
  y1.domain(scagnosticList);

  var lineHeight = h/scagnosticList.length;
  
  //svg.selectAll(".gridLine"+id).remove();
  svg.selectAll(".gridLineH"+id)
      .data(a)
    .enter().append("line")
      .attr("class", "gridLineH"+id)
      .style("stroke", function(d){ return color10(d.name);})
      .style("stroke-opacity",0.3) 
      .attr("x1", function(d,i) { return x_+scagScale(d.valueH);})
      .attr("y1", function(d,i) {return lineHeight*(i%scagnosticList.length);})
      .attr("x2", function(d,i) { return x_+scagScale(d.valueH); })
      .attr("y2", function(d,i) {return lineHeight*(i%scagnosticList.length)+lineHeight-1;})

  svg.selectAll(".gridLineS"+id)
      .data(a)
    .enter().append("line")
      .attr("class", "gridLineS"+id)
      .style("stroke", function(d){ return color10(d.name);})
      .style("stroke-opacity",0.3) 
      .attr("x1", function(d,i) { return x_+w*2+scagScale(d.valueS);})
      .attr("y1", function(d,i) {return lineHeight*(i%scagnosticList.length);})
      .attr("x2", function(d,i) { return x_+w*2+scagScale(d.valueS); })
      .attr("y2", function(d,i) {return lineHeight*(i%scagnosticList.length)+lineHeight-1;})    
    
  svg.selectAll(".gridLineB"+id)
      .data(a)
    .enter().append("line")
      .attr("class", "gridLineB"+id)
      .style("stroke", function(d){ return color10(d.name);})
      .style("stroke-opacity",0.3) 
      .attr("x1", function(d,i) { return x_+w*4+scagScale(d.valueB);})
      .attr("y1", function(d,i) {return lineHeight*(i%scagnosticList.length);})
      .attr("x2", function(d,i) { return x_+w*4+scagScale(d.valueB); })
      .attr("y2", function(d,i) {return lineHeight*(i%scagnosticList.length)+lineHeight-1;})

}       


