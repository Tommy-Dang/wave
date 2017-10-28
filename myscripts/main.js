
var color = d3.scale.category10();

var dataS, dataH, dataB;
var CONNECTED = 0,  DENSE = 1, CONVEX = 2, SKINNY = 3, COUNT = 4, VERSYMMETRY = 5,  HORSYMMETRY = 6,  MSTLENGTH = 7,  NUMALPHA = 8, UNIFORMALPHA = 9;
var scagnosticList = ["CONNECTED","DENSE","CONVEX","SKINNY","COUNT","VERSYMMETRY","HORSYMMETRY","MSTLENGTH","NUMALPHA","UNIFORMALPHA"];  

var numThred = 5;
var numImg =1000;
var numIntialNodes = 10;
var cut = 15;


var nodes = [];
var links = [];
var links2 = [];


var radius =6;
var link, node;

var force = d3.layout.force()
    .charge(-40)
    .gravity(0.2)
    .linkDistance(20)
    .linkStrength(function(l){
      return linkScale(l.value);
    })
    .size([width*1.5, height]);

var linkScale = d3.scale.linear()
                    .range([1,0.1])
                    .domain([10, 40]);  

d3.tsv("data/ScagnosticS.txt", function(errorS, dataS_) {
  if (errorS) throw errorS;
  dataS = dataS_;
  d3.tsv("data/ScagnosticH.txt", function(errorH, dataH_) {
    if (errorH) throw errorH;
    dataH = dataH_;
    d3.tsv("data/ScagnosticB.txt", function(errorB, dataB_) {
      if (errorB) throw errorB;
      dataB = dataB_;

      dissAllStep = new Array(numImg);
      
      // get nodes;
      for (var i1 = 0; i1 < numIntialNodes; i1++) {
        var nod = {};
        nod.id = i1;
        nod.group = i1%10;
        nodes.push(nod);
      }  
      // get links;
      for (var i1 = 0; i1 < numIntialNodes-1; i1++) {
        var minIndex2 = -1;
        var minDif = 1000;
        var countLink = 0;
        for (var i2 = i1+1; i2 < numIntialNodes; i2++) {
          var dif = computeDis(i1,i2);
         // console.log(dif+" "+cut);
          if (dif<cut){
            var lin = {};
            lin.source = nodes[i1];
            lin.target = nodes[i2];
            lin.value = dif;
            links.push(lin);
            links2.push(lin);  
            countLink++; // keep track of how many neighbors of i1
          } 
          // max index
          if (dif<minDif){
            minDif = dif;
            minIndex2 = i2;
          }
        }
        // Check if i1 has no neighbor
        if (countLink==0){
          var lin = {};
          lin.source = nodes[i1];
          lin.target = nodes[minIndex2];
          lin.value = minDif;
          links.push(lin);   // this is the only neighbor of i1
          links2.push(lin);  
        }
      }

        force.nodes(nodes)
          .links(links)
          .start();


          link = svg.selectAll(".link")
                .data(links)
                .enter().append("line")
                .attr("class", "link")
                .style("stroke-width", function (d) {
                  return linkScale(d.value);
                });
          node = svg.selectAll(".node")
                .data(nodes)
                    .enter().append("circle")
                    .attr("class", "node")
                    .attr("r", radius)
                    .style("stroke", function (d) {
                    return color(d.group);
                })
        .call(force.drag);   

        setInterval(update, 1);
    });
  });
});  

force.on("tick", function () {
    link.attr("x1", function (d) {
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

     node.attr("cx", function(d) { return d.x = Math.max(width/2+radius+margin, Math.min(width - radius-margin, d.x)); })
    .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius-margin, d.y)); });
});


var count =numIntialNodes;
function update() {
  if (count>=numImg) {
    console.log("Finish processing "+numImg +" images");
    return; // finish the dataset
  }
  var nod = {};
  nod.id = count;
  nod.x = width/2+20;
  nod.y = 50;
  nod.group = count%10;
  nodes.push(nod);
  
  // Compute links to existing network
  for (var i = 0; i < nodes.length-1; i++) {
    var dif = computeDis(i,count);
    // console.log(dif+" "+cut);
    if (dif<cut){
      var lin = {};
      lin.source = nodes[i];
      lin.target = nodes[count];
      lin.value = dif;
      links.push(lin);
      links2.push(lin);  
    } 
  }  

  updateForce();
  count++;
  
}


function updateForce() {
  link = link.data(links);
  link.exit().remove();
  link.enter().insert("line").attr("class", "link")
      .style("stroke-width", function (d) {
        return linkScale(d.value);
      });;
  node = node.data(nodes);
  node.enter().insert("circle", ".cursor").attr("class", "node")
      .attr("r", radius)
      .style("stroke", function (d) {
        return color(d.group);})
      .call(force.drag);
  force.start();
}

function threshold(thresh) {
  links.splice(0, links.length);
  for (var i = 0; i < links2.length; i++) {
    if (links2[i].value < thresh) {links.push(links2[i]);}
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

function ticked() {
  var q = d3.geom.quadtree(nodes),
      i = 0,
      n = nodes.length;

  while (++i < n) q.visit(collide(nodes[i]));


  link.attr("x1", function(d) { //console.log("x1="+d.source.x); 
    return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x = Math.max(width/2+radius+margin, Math.min(width - radius-margin, d.x)); })
    .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius-margin, d.y)); });

}

function collide(node) {
  var r = node.radius + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
  return function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius;
      if (l < r) {
        l = (l - r) / l * .5;
        node.x -= x *= l;
        node.y -= y *= l;
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
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