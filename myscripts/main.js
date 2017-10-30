/* October 2017 
 * Tommy Dang, Assistant professor, iDVL@TTU
 *
 * THIS SOFTWARE IS BEING PROVIDED "AS IS", WITHOUT ANY EXPRESS OR IMPLIED
 * WARRANTY.  IN PARTICULAR, THE AUTHORS MAKE NO REPRESENTATION OR WARRANTY OF ANY KIND CONCERNING THE MERCHANTABILITY
 * OF THIS SOFTWARE OR ITS FITNESS FOR ANY PARTICULAR PURPOSE.
 */

var color = d3.scale.category10();

var dataS, dataH, dataB;
var CONNECTED = 0,  DENSE = 1, CONVEX = 2, SKINNY = 3, COUNT = 4, VERSYMMETRY = 5,  HORSYMMETRY = 6,  MSTLENGTH = 7,  NUMALPHA = 8, UNIFORMALPHA = 9;
var scagnosticList = ["Connected","Dense","Convex","Skinny","Count","Vertical Sym","Horizontal Sym","MST length","Num Alpha","Uniform Alpha"];  

var numThred = 5;
var numImg =1000;
var numIntialNodes = 0;
var count1 =numIntialNodes;
var count2 =numIntialNodes;

var cut = 16;
var radius = 10;

var nodes2 = [];
var links2 = [];
var links22 = [];

var nodes1 = [];
var links1 = [];
var links11 = [];

var link1, node1, link2, node2;

var force1 = d3.layout.force()
    .charge(-radius*4)
    .gravity(0.15)
    .linkDistance(radius*2+2)
    .linkStrength(function(l){
      return linkScale(l.value)/2;
    })
    .size([width*0.5, heightRect]);

var force2 = d3.layout.force()
    .charge(-radius*4)
    .gravity(0.15)
    .linkDistance(radius*2+2)
    .linkStrength(function(l){
      return linkScale(l.value)/2;
    })
    .size([width*1.5, heightRect]);    

var linkScale = d3.scale.linear()
                    .range([2,0.3])
                    .domain([0, cut]);  
var interval1, interval2;

var startTime = (new Date()).getTime();

d3.tsv("data/ScagnosticS.txt", function(errorS, dataS_) {
  if (errorS) throw errorS;
  dataS = dataS_;
  d3.tsv("data/ScagnosticH.txt", function(errorH, dataH_) {
    if (errorH) throw errorH;
    dataH = dataH_;
    d3.tsv("data/ScagnosticB.txt", function(errorB, dataB_) {
      if (errorB) throw errorB;
      dataB = dataB_;

        force1.nodes(nodes1)
          .links(links1)
          .start()
          .on("tick", ticked1);

        force2.nodes(nodes2)
          .links(links2)
          .start()
          .on("tick", ticked2);  
  

          link1 = svg.selectAll(".link1")
                .data(links1)
                .enter().append("line")
                .attr("class", "link")
                .style("stroke-width", function (d) {
                  return linkScale(d.value);
                });
          node1 = svg.selectAll(".node1")
                .data(nodes1)
                    .enter().append("circle")
                    .attr("class", "node")
                    .attr("r", radius)
                    .style("stroke", function (d) {
                    return color(d.group);
                })
                .call(force1.drag);   

          link2 = svg.selectAll(".link")
                .data(links2)
                .enter().append("line")
                .attr("class", "link")
                .style("stroke-width", function (d) {
                  return linkScale(d.value);
                });
          node2 = svg.selectAll(".node")
                .data(nodes2)
                    .enter().append("circle")
                    .attr("class", "node")
                    .attr("r", radius)
                    .style("stroke", function (d) {
                    return color(d.group);
                })
                .call(force2.drag);          

          interval1 = setInterval(function(){
            update2(count1,nodes1, links1, links11, interval1,computeDis1,updateForce1,redrawImages1)
          } , 200);

          interval2 = setInterval(function(){
            update2(count2,nodes2, links2, links22, interval2,computeDis2,updateForce2,redrawImages2)
          } , 1);
          
          // **********Time series
          drawTimeSeries();

          

    });
  });
});  


//var removeList=[3,6,8,16,26,29,33,37,43,52,55,57,61,63,68,73,76,79,84,90,99];
//var removeList=[6,14,16,26,37,43,51,52,55,63,64,68,72,73,99,100,110,120,121,123,139,143,151,154,163,167,169,174,175,186,194,195,197,198,202,215,218,245,254,260,286,306,363,379,483,562,582,620,628,631,642,643,650,655,658,659,661,701,762,782,788,791,797,807,809,814,819,821,827,831,841,849,852,854,855,859,874,876,881,886,894,905,912,914,932,943,944,966,971];

var removeList12=[4,6,8,14,15,16,17,20,21,26,28,29,30,31,33,34,37,43,48,49,51,52,55,56,60,61,62,63,64,66,68,72,73,75,76,77,79,80,84,86,89,90,93,99,100,107,108,110,111,115,120,121,122,123,124,126,130,131,137,139,141,143,144,149,151,154,158,163,167,169,174,175,176,178,182,186,194,195,196,197,198,200,202,205,214,215,217,218,220,224,226,228,229,237,243,244,245,250,251,253,254,257,258,260,267,273,274,277,278,279,283,285,286,291,292,293,298,303,304,306,311,317,320,322,324,325,326,329,347,348,363,370,372,379,416,452,454,459,464,481,482,483,510,516,521,526,535,560,562,564,566,572,575,576,578,582,585,591,599,600,605,607,610,611,612,615,616,618,619,620,622,623,626,628,631,642,643,644,645,646,650,651,652,653,654,655,658,659,661,664,665,666,668,672,691,701,712,744,762,782,783,785,788,791,793,795,797,798,803,807,808,809,810,814,815,818,819,821,822,825,826,827,831,832,838,841,843,849,852,854,855,858,859,862,873,874,875,876,879,881,885,886,887,892,893,894,895,899,901,903,905,908,912,914,916,922,925,927,932,942,943,944,945,948,955,958,962,966,970,971,976,978,979,981,982,985,994,995,996,997];
var removeList11=[7,9,11,12,18,22,23,25,32,40,46,54,57,58,69,70,71,74,78,81,82,83,88,96,97,103,109,114,125,129,134,136,140,150,157,170,171,180,181,183,187,188,189,201,204,213,222,223,232,268,269,280,296,316,319,332,334,434,448,455,468,469,473,475,477,484,492,500,501,533,550,556,561,563,565,580,583,588,589,608,632,633,649,657,663,667,685,690,692,717,723,733,734,781,792,796,800,802,811,820,823,839,840,842,844,847,851,853,864,870,871,878,880,890,904,936,938,946,951,957,961,965,972,980,989,991,993];
var removeList=[309];

function update2(count,nodes, links, linksTemp, interval,computeDis,updateForce,redrawImages) {  
  if (removeList11.indexOf(count)>=0 || removeList12.indexOf(count)>=0 
    || removeList.indexOf(count)>=0) {
    if (interval==interval1)
      count1++;
    else
      count2++;
    return;  // Skip not connected nodes
  }
  if (count>=numImg/5) {
    clearInterval(interval);
    //getDisconnectedNodes();
    redrawImages();  //  to make sure images stay on top of the network
    console.log("Finish processing "+numImg +" images");
    return; // finish the dataset
  }
  var nod = {};
  nod.id = count;
  nod.x = width/2+margin;
  nod.y = 0;
  nod.milliseconds = (new Date()).getTime();
  if (nodes.length>0){
    nod.time = nod.milliseconds-nodes[nodes.length-1].milliseconds;
    nod.timeMax = Math.max(nod.time,nodes[nodes.length-1].timeMax);
  }  
  else{
    nod.time = nod.milliseconds-startTime;
    nod.timeMax = 1000;
  }  
  nod.group = count%10;
  nodes.push(nod);
  
  // Create the image patter when there is not available
  if (svg.selectAll("#catpattern"+(nod.id+1))==""){
    var defs = svg.append("defs").attr("id", "imgdefs")
    var catpattern = defs.append("pattern")
                          .attr("id", "catpattern"+(nod.id+1))
                          .attr("height", 1)
                          .attr("width", 1)
                          .attr("x", "0")
                          .attr("y", "0")                   
    catpattern.append("image")
         .attr("x", 0)
         .attr("y", 0)
         .attr("height", radius*4)
         .attr("width", radius*4)
         .attr("xlink:href", "data/TuanImage40x40/img"+(nod.id+1)+".jpg")
  }
  // Compute links to existing network
  var linkList =[]
  for (var i = 0; i < nodes.length-1; i++) {
    var dif = computeDis(nodes[i].id,nod.id);
    // console.log(dif+" "+cut);
    if (dif<cut){
      var lin = {};
      lin.source = nodes[i];
      lin.target = nod;
      lin.value = dif;
      linkList.push(lin);
    } 
  } 
  linkList.sort(function (a, b) {
      if (a.value < b.value) {
          return -1;   // acending order
      }
      if (a.value > b.value) {
          return 1;
      }
      return 0;
  });

  var maxNeighbor = 3;
  for (var i = 0; i < linkList.length; i++) {
    if (i>=maxNeighbor) break;
    links.push(linkList[i]);
    linksTemp.push(linkList[i]);
  }
  updateForce();
  if (interval==interval1){
    updateTimeSeries();
    drawScagHistogram(1,count1, 100,100);
    count1++;
  } 
  else{
    drawScagHistogram(1,count1, width/2+20,100);
    count2++;
  }   
}

