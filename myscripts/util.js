/* October 2017 
 * Tommy Dang, Assistant professor, iDVL@TTU
 *
 * THIS SOFTWARE IS BEING PROVIDED "AS IS", WITHOUT ANY EXPRESS OR IMPLIED
 * WARRANTY.  IN PARTICULAR, THE AUTHORS MAKE NO REPRESENTATION OR WARRANTY OF ANY KIND CONCERNING THE MERCHANTABILITY
 * OF THIS SOFTWARE OR ITS FITNESS FOR ANY PARTICULAR PURPOSE.
 */

function redrawImages(){
  svg.selectAll(".node").remove();
  node = svg.selectAll(".node").data(nodes2).enter().append("circle", ".cursor").attr("class", "node")
    .attr("r", radius)
    .style("fill", function(d,i) {    
        return "url(#catpattern"+(d.id+1)+")";    
     })
    .call(force2.drag); 
  node.append("title")
     .text(function(d) { return "image "+d.id; });
           
}

//************************************ tick ************************************
function ticked() {
   link2.attr("x1", function (d) {
        return d.source.x;
    })
        .attr("y1", function (d) {
        return d.source.y;
    })
        .attr("x2", function (d) {
        return d.target.x;
    })
        .attr("y2", function (d) {
        return d.target.y;
    });

     node2.attr("cx", function(d) { return d.x = Math.max(width/2+radius+margin, Math.min(width - radius-margin, d.x)); })
    .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius-margin, d.y)); });

     node2.each(collide(0.5)); //Added to avoid collision
}
function getDisconnectedNodes() {
  var arr =[];
  for (var i = 0; i < links.length; i++) {
    var id1 = links[i].source.id;
    var id2 = links[i].target.id;
    if (arr.indexOf(id1)<0){
      arr.push(id1);
    }
    if (arr.indexOf(id2)<0){
      arr.push(id2);
    }
  }  

  var removeList =[];
  for (var i = 0; i < nodes.length; i++) {
    if (arr.indexOf(nodes[i].id)<0){
      removeList.push(nodes[i].id);
    }
  }  
  console.log("arr=["+arr); 
  console.log("removeList=["+removeList); 
} 


function updateForce() {
  link2 = link2.data(links2);
  link2.exit().remove();
  link2.enter().insert("line").attr("class", "link")
      .style("stroke-width", function (d) {
        return linkScale(d.value);
      });;
  node2 = node2.data(nodes2);
  node2.enter().insert("circle", ".cursor").attr("class", "node")
      .attr("r", radius)
      //.style("stroke", function (d) {
      //  return color(d.group);})
      .style("fill", function(d,i) {       
          return "url(#catpattern"+(d.id+1)+")";    
       })
      .call(force2.drag);
  force2.start();
}

function threshold(thresh) {
  links.splice(0, links.length);
  for (var i = 0; i < links22.length; i++) {
    if (links22[i].value < thresh) {links2.push(links22[i]);}
  }
  updateForce(); // the function above
}



function computeDis(i1, i2){
  var dif = 0;
  for (var step=0; step<numThred;step++){ 
    var sum = 0;
    for (var sc = 0; sc < scagnosticList.length; sc++) {
      var index = step*scagnosticList.length+sc;
      var dif1 = Math.abs(dataH[index]["C"+(i1+1)] - dataH[index]["C"+(i2+1)]);
      var dif2 = Math.abs(dataS[index]["C"+(i1+1)] - dataS[index]["C"+(i2+1)]);
      var dif3 = Math.abs(dataB[index]["C"+(i1+1)] - dataB[index]["C"+(i2+1)]);
      sum += dif1+dif2+dif3;
    }
    dif += sum;
  }
  return dif;
}



//************************************ fisheye ************************************
var fisheye = d3.fisheye.circular()
      .radius(120);
svg.on("mousemove", function() {
      force2.stop();
      fisheye.focus(d3.mouse(this));
      d3.selectAll("circle").each(function(d) { d.fisheye = fisheye(d); })
          .attr("cx", function(d) { return d.fisheye.x; })
          .attr("cy", function(d) { return d.fisheye.y; })
          .attr("r", function(d) { return d.fisheye.z * 10; });
          if (link2!=undefined){
            link2.attr("x1", function(d) { return d.source.fisheye.x; })
                .attr("y1", function(d) { return d.source.fisheye.y; })
                .attr("x2", function(d) { return d.target.fisheye.x; })
                .attr("y2", function(d) { return d.target.fisheye.y; });
          }
    });


var padding = 1; // separation between circles
function collide(alpha) {
  var quadtree = d3.geom.quadtree(nodes2);
  return function(d) {
    var rb = 2*radius + padding,
        nx1 = d.x - rb,
        nx2 = d.x + rb,
        ny1 = d.y - rb,
        ny2 = d.y + rb;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y);
          if (l < rb) {
          l = (l - rb) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
}
  
function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}