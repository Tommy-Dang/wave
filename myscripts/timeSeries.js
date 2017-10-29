/* October 2017 
 * Tommy Dang, Assistant professor, iDVL@TTU
 *
 * THIS SOFTWARE IS BEING PROVIDED "AS IS", WITHOUT ANY EXPRESS OR IMPLIED
 * WARRANTY.  IN PARTICULAR, THE AUTHORS MAKE NO REPRESENTATION OR WARRANTY OF ANY KIND CONCERNING THE MERCHANTABILITY
 * OF THIS SOFTWARE OR ITS FITNESS FOR ANY PARTICULAR PURPOSE.
 */


var yTimeSeries = width/2+heightBoard-margin;
var x = d3.scale.linear()
        .range([margin*2,width*0.9])
        .domain([0, 5]); 

var y = d3.scale.linear()
        .range([yTimeSeries,yTimeSeries-heightBoard])
        .domain([0, 1000]); 


var area = d3.svg.area()
    .x(function(d) { return x(d.date); })
    .y0(yTimeSeries)
    .y1(function(d) { return y(d.rate); });

function drawTimeSeries() {
  //x.domain(d3.extent(data, function(d) { return d.date; }));
  //y.domain([0, d3.max(data, function(d) { return d.close; })]);
  //area.y0(y(0));

  var data1 =[{date: 0, rate: 400}, {date: 2, rate: 600}, {date: 3, rate: 800}, {date: 4, rate: 700}, {date: 5, rate: 500}];

  var data2 =[{date: 0, rate: 300}, {date: 2, rate: 200}, {date: 3, rate: 300}, {date: 4, rate: 100}, {date: 5, rate: 200}];

  svg.append("path")
      .datum(data1)
      .attr("fill", color1)
      .attr("fill-opacity", 0.25)
      .attr("d", area);

  svg.append("path")
      .datum(data2)
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
