
var color = d3.scale.category10();

var dataS, dataH, dataB;
var CONNECTED = 0,  DENSE = 1, CONVEX = 2, SKINNY = 3, COUNT = 4, VERSYMMETRY = 5,  HORSYMMETRY = 6,  MSTLENGTH = 7,  NUMALPHA = 8, UNIFORMALPHA = 9;
var scagnosticList = ["CONNECTED","DENSE","CONVEX","SKINNY","COUNT","VERSYMMETRY","HORSYMMETRY","MSTLENGTH","NUMALPHA","UNIFORMALPHA"];  
var numImg =1000;
var numThred = 5;
var dissAllStep;

var nodes = [];
var links = [];
var links2 = [];


var radius =6;
var link, node;

var force = d3.layout.force()
    .charge(-40)
    .linkDistance(20)
    .size([width*1.5, height]);


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
      
      var numIntialNodes = 100;
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
          if (dif<3){
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
                return Math.sqrt(d.value/2);
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

        setInterval(update, 1000);
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


var count =200;
function update() {
    var nod = {};
    nod.id = count;
    nod.x = width/2;
    nod.y = 0;
    nod.group = count%10;
    nodes.push(nod);
    count++;
    updateForce();
}


function updateForce() {
  link = link.data(links);
  link.exit().remove();
  link.enter().insert("line", ".node").attr("class", "link");
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
    if (links2[i].value > thresh) {links.push(links2[i]);}
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
  return dif/(numThred);
}

function ticked() {
  link.attr("x1", function(d) { //console.log("x1="+d.source.x); 
    return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x = Math.max(width/2+radius+margin, Math.min(width - radius-margin, d.x)); })
    .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius-margin, d.y)); });

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