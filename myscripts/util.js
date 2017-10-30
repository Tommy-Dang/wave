/* October 2017 
 * Tommy Dang, Assistant professor, iDVL@TTU
 *
 * THIS SOFTWARE IS BEING PROVIDED "AS IS", WITHOUT ANY EXPRESS OR IMPLIED
 * WARRANTY.  IN PARTICULAR, THE AUTHORS MAKE NO REPRESENTATION OR WARRANTY OF ANY KIND CONCERNING THE MERCHANTABILITY
 * OF THIS SOFTWARE OR ITS FITNESS FOR ANY PARTICULAR PURPOSE.
 */
var toggle1 = 0;
var toggle2 = 0;
var linkedByIndex1 = {};
var linkedByIndex2 = {};
    
function redrawImages1(){
  svg.selectAll(".node1").remove();
  node1 = svg.selectAll(".node1").data(nodes1).enter().append("circle").attr("class", "node1")
    .attr("r", radius)
    .style("fill", function(d,i) {    
        return "url(#catpattern"+(d.id+1)+")";    
     })
    .call(force1.drag); 
  node1.append("title")
     .text(function(d) { return "image "+d.id; });

  node1.on('click', connectedNodes1); //Added code 
  //Create an array logging what is connected to what
  for (i = 0; i < nodes1.length; i++) {
      linkedByIndex1[nodes1[i].id + "," + nodes1[i].id] = 1;
  };
  links2.forEach(function (d) {
      linkedByIndex1[d.source.id + "," + d.target.id] = 1;
  });
              
           
}
function redrawImages2(){
  svg.selectAll(".node2").remove();
  node2 = svg.selectAll(".node2").data(nodes2).enter().append("circle").attr("class", "node2")
    .attr("r", radius)
    .style("fill", function(d,i) {    
        return "url(#catpattern"+(d.id+1)+")";    
     })
    .call(force2.drag); 
  node2.append("title")
     .text(function(d) { return "image "+d.id; });

  node2.on('click', connectedNodes2); //Added code 
  //Create an array logging what is connected to what
  for (i = 0; i < nodes2.length; i++) {
      linkedByIndex2[nodes2[i].id + "," + nodes2[i].id] = 1;
  };
  links2.forEach(function (d) {
      linkedByIndex2[d.source.id + "," + d.target.id] = 1;
  });
           
}

//************************************ tick ************************************
function ticked1() {
   link1.attr("x1", function (d) {
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

     node1.attr("cx", function(d) { return d.x = Math.max(radius+margin+1, Math.min(width/2 - radius-margin-1, d.x)); })
    .attr("cy", function(d) { return d.y = Math.max(radius+1, Math.min(heightRect - radius-1, d.y)); });

     node1.each(collide(0.5, nodes1)); //Added to avoid collision
     
}

function ticked2() {
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

     node2.attr("cx", function(d) { return d.x = Math.max(width/2+radius+margin+1, Math.min(width - radius-margin-1, d.x)); })
    .attr("cy", function(d) { return d.y = Math.max(radius+1, Math.min(heightRect - radius-1, d.y)); });

     node2.each(collide(0.5, nodes2)); //Added to avoid collision
}

/*
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
} */

function updateForce1() {
  link1 = link1.data(links1);
  link1.exit().remove();
  link1.enter().insert("line").attr("class", "link1")
      .style("stroke-width", function (d) {
        return linkScale(d.value);
      });;
  node1 = node1.data(nodes1);
  node1.enter().insert("circle").attr("class", "node1")
      .attr("r", radius)
      //.style("stroke", function (d) {
      //  return color(d.group);})
      .style("fill", function(d,i) {       
          return "url(#catpattern"+(d.id+1)+")";    
       })
      .call(force1.drag);
  force1.start();
}

function updateForce2() {
  link2 = link2.data(links2);
  link2.exit().remove();
  link2.enter().insert("line").attr("class", "link2")
      .style("stroke-width", function (d) {
        return linkScale(d.value);
      });;
  node2 = node2.data(nodes2);
  node2.enter().insert("circle").attr("class", "node2")
      .attr("r", radius)
      //.style("stroke", function (d) {
      //  return color(d.group);})
      .style("fill", function(d,i) {       
          return "url(#catpattern"+(d.id+1)+")";    
       })
      .call(force2.drag);
  force2.start();
}

/*
function threshold(thresh) {
  links.splice(0, links.length);
  for (var i = 0; i < links22.length; i++) {
    if (links22[i].value < thresh) {links2.push(links22[i]);}
  }
  updateForce(); // the function above
}*/



function computeDis1(i1, i2){
  var dif = 0;
  for (var step=0; step<numThred;step++){ 
    var sum = 0;
    for (var sc = 0; sc < scagnosticList.length; sc++) {
      var index = step*scagnosticList.length+sc;
      var dif1 = Math.abs(dataH[index]["C"+(i1+1)] - dataH[index]["C"+(i2+1)]);
      var dif2 = Math.abs(dataS[index]["C"+(i1+1)] - dataS[index]["C"+(i2+1)]);
      var dif3 = Math.abs(dataB[index]["C"+(i1+1)] - dataB[index]["C"+(i2+1)]);
      sum += dif1*1.5+dif2+dif3*0.5;
    }
    dif += sum;
  }
  return dif;
}

function computeDis2(i1, i2){
  var dif = 0;
  for (var step=0; step<numThred;step++){ 
    var sum = 0;
    for (var sc = 0; sc < scagnosticList.length; sc++) {
      var index = step*scagnosticList.length+sc;
      var dif1 = Math.abs(dataH[index]["C"+(i1+1)] - dataH[index]["C"+(i2+1)]);
      var dif2 = Math.abs(dataS[index]["C"+(i1+1)] - dataS[index]["C"+(i2+1)]);
      var dif3 = Math.abs(dataB[index]["C"+(i1+1)] - dataB[index]["C"+(i2+1)]);
      sum += dif1+dif2*0.5+dif3*1.5;
    }
    dif += sum;
  }
  return dif;
}



//************************************ fisheye ************************************
var fisheye = d3.fisheye.circular()
      .radius(120);
svg.on("mousemove", function() {
      force1.stop();
      force2.stop();
      fisheye.focus(d3.mouse(this));
      d3.selectAll(".node1").each(function(d) { d.fisheye = fisheye(d); })
          .attr("cx", function(d) { return d.fisheye.x; })
          .attr("cy", function(d) { return d.fisheye.y; })
          .attr("r", function(d) { return d.fisheye.z * 10; });
      if (link1!=undefined){
        link1.attr("x1", function(d) { return d.source.fisheye.x; })
            .attr("y1", function(d) { return d.source.fisheye.y; })
            .attr("x2", function(d) { return d.target.fisheye.x; })
            .attr("y2", function(d) { return d.target.fisheye.y; });
      }
      d3.selectAll(".node2").each(function(d) { d.fisheye = fisheye(d); })
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


var padding = 2; // separation between circles
function collide(alpha,nodes) {
  var quadtree = d3.geom.quadtree(nodes);
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

// ******************************* H for highlightinh ***************************************

//This function looks up whether a pair are neighbours
function neighboring1(a, b) {
    return linkedByIndex1[a.id + "," + b.id];
}
function neighboring2(a, b) {
    return linkedByIndex2[a.id + "," + b.id];
}
function connectedNodes1() {
    if (toggle1 == 0) {
        //Reduce the opacity of all but the neighbouring nodes
        d = d3.select(this).node().__data__;
        node1.style("opacity", function (o) {
            return neighboring1(d, o) | neighboring1(o, d) ? 1 : 0.1;
        });
        link1.style("opacity", function (o) {
            return d.index==o.source.index | d.index==o.target.index ? 1 : 0.1;
        });
        //Reduce the op
        toggle1 = 1;
    } else {
        //Put them back to opacity=1
        node1.style("opacity", 1);
        link1.style("opacity", 1);
        toggle1 = 0;
    }
}
function connectedNodes2() {
    if (toggle2 == 0) {
        //Reduce the opacity of all but the neighbouring nodes
        d = d3.select(this).node().__data__;
        node2.style("opacity", function (o) {
            return neighboring2(d, o) | neighboring2(o, d) ? 1 : 0.1;
        });
        link2.style("opacity", function (o) {
            return d.index==o.source.index | d.index==o.target.index ? 1 : 0.1;
        });
        //Reduce the op
        toggle2 = 1;
    } else {
        //Put them back to opacity=1
        node2.style("opacity", 1);
        link2.style("opacity", 1);
        toggle2 = 0;
    }
}


  