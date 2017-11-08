/* November 2017 
 * Tommy Dang, Assistant professor, iDVL@TTU
 *
 * THIS SOFTWARE IS BEING PROVIDED "AS IS", WITHOUT ANY EXPRESS OR IMPLIED
 * WARRANTY.  IN PARTICULAR, THE AUTHORS MAKE NO REPRESENTATION OR WARRANTY OF ANY KIND CONCERNING THE MERCHANTABILITY
 * OF THIS SOFTWARE OR ITS FITNESS FOR ANY PARTICULAR PURPOSE.
 */
 
var width = document.body.clientWidth;
var margin = 12;
var heightTop = 30;
var heightRect = (width-margin*2)*290/1225;
var heightRect2 = 600;
var heightBoard = 0;
var height = heightTop+heightRect+heightRect2+2*margin;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

 svg.append("text")
    .attr("x", width*0.5)
    .attr("y", heightTop*0.75)
    .style("fill", "#fff")
    .style("text-shadow", "1px 1px 0 rgba(0, 0, 0, 0.7")
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .text("Google Inception CNN");   

//*********** Dropdown rectangle format *******************
// filters go in defs element
var defs = svg.append("defs");

// create filter with id #drop-shadow
// height=130% so that the shadow is not clipped
var filter = defs.append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "130%");

// SourceAlpha refers to opacity of graphic that this filter will be applied to
// convolve that with a Gaussian with standard deviation 3 and store result
// in blur
filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 5)
    .attr("result", "blur");

// translate output of Gaussian blur to the right and downwards with 2px
// store result in offsetBlur
filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 5)
    .attr("dy", 5)
    .attr("result", "offsetBlur");

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");
        
svg.append("rect")
    .attr("width", width-margin*2)
    .attr("height", heightRect+margin+5)
    .attr("x", margin)
    .attr("y", heightTop)
    .attr("rx", 8)
    .attr("ry", 8)
    .attr("fill", "#fff")
    .attr("stroke", "#fff")
    .style("filter", "url(#drop-shadow)"); 

 /*svg.append("rect")
    .attr("width", heightRect2)
    .attr("height", heightRect2)
    .attr("x", margin)
    .attr("y", heightTop+heightRect+margin)
    .attr("rx", 8)
    .attr("ry", 8)
    .attr("fill", "#000")
    .attr("stroke", "#000")
    .style("filter", "url(#drop-shadow)");    */

svg.append("a")
    .attr("xlink:href", "http://wavecomp.ai/")
    .append("image")
    .attr("xlink:href", "images/logo.png")
    .attr("x", width*0.75-100)
    .attr("y", heightTop+heightRect+50)
    .attr("width", "180")
    .attr("height", "30");

/*svg.append("image")
    .attr("xlink:href", "images/waveSlide.png")
    .attr("x", width*0.55)
    .attr("y", heightTop+heightRect+40)
    .attr("width", width*0.4)
    .attr("height", width*0.4);   */

svg.append("image")
    .attr("xlink:href", "images2/WAVE_DPU3.png")
    .attr("x", margin)
    .attr("y", heightTop+heightRect+margin*2)
    .attr("width", heightRect2)
    .attr("height", heightRect2)
    .attr("opacity", 0.9);   

svg.append("text")
    .attr("x", heightRect2+(width-heightRect2)*0.5)
    .attr("y", heightTop+heightRect+140)
    .style("fill", "#fff")
    .style("text-shadow", "1px 1px 0 rgba(0, 0, 0, 0.7")
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("WaveFlow Execution");   


//*********************** Images from Jin *********************
svg.append("image")
    .attr("xlink:href", "images2/GoogleInception2.jpg")
    .attr("x",margin)
    .attr("y", heightTop+margin)
    .attr("width", width-margin*2);

var numLayers =41;
var stepX = (width-margin*2-4)/numLayers; //41 is the number of layers
svg.append("rect")
    .attr("class", "rect1")
    .attr("width", stepX)
    .attr("height", heightRect)
    .attr("x", margin+4)
    .attr("y", heightTop+10)
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("fill", "#000")
    .attr("fill-opacity", 0.1)
    .attr("stroke", "#000")
    .style("stroke-dasharray", "2 2"); 

svg.append("rect")
    .attr("class", "rect2")
    .attr("width", 1)
    .attr("height", 1)
    .attr("x", margin)
    .attr("y", heightTop+heightRect+margin*2)
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("fill", "#a00")
    .attr("fill-opacity", 0.5)
    .attr("stroke", "#a00")
    .attr("stroke-opacity", 0.5)
    .style("filter", "url(#drop-shadow)");     

var speed =200;
//*********************** Simulation ***************************************************************
var interval1 = setInterval(function(){
    sim();
} , speed);

var isSimRunning =true;
function stopStart(){
    if (isSimRunning){
        clearInterval(interval1);
        document.getElementById('controlButton').innerHTML = "Restart simulation";
    }
        
    else{
        interval1 = setInterval(function(){
            sim();
        } , speed);
        document.getElementById('controlButton').innerHTML = "Stop simulation";
    }
    isSimRunning = !isSimRunning;
}
//*********************** DPU configuration ***************************************************************
var color0 = "#666666";
var color1 = "#5B83EF"; // blue
var color2 = "#BA3C2F"; // red
var color3 = "#539858"; // green
var color4 = "#E2B326";
var n = 32;
var cellSize = (heightRect2*0.99)/32;
var colorList=[
    [color0],
    [color1],
    [color2],
    [color3],
    [color1],
    [color1],
    [color3],
    [color2],
    [color1,color1,color2],
    [color1,color1,color1,color1],
    [color3],
    [color1,color1,color2],
    [color1,color1,color1,color1],
    [color3],
    [color2],
    [color1,color1,color2],
    [color1,color1,color1,color1],
    [color3],
    [color1,color1,color2,color2],
    [color1,color1,color1,color1,color1],
    [color3,color1],
    [color1,color1,color2,color1],
    [color1,color1,color1,color1,color4],
    [color3,color0],
    [color1,color1,color2],
    [color1,color1,color1,color1],
    [color3],
    [color1,color1,color2,color2],
    [color1,color1,color1,color1,color1],
    [color3,color1],
    [color2,color1],
    [color1,color1,color2,color4],
    [color1,color1,color1,color1,color0],
    [color3],
    [color1,color1,color2],
    [color1,color1,color1,color1],
    [color3],
    [color2],
    [color1],
    [color4],
    [color0],
];

//*********************** DPU configuration ***************************************************************
var count=1;
var countF=1;
var isForward = true;
var list = []; // List of existing rects

function getNumbers(){
    var a = []
    if (count%4==0){  // 4 cell in a row
        var x1 = 4*Math.floor(Math.random()*(n/4));
        var y1 = Math.floor(Math.random()*n);
        var index = y1*(n+1) +x1;
        while (list.indexOf(index)>=0 || list.indexOf(index+1)>=0
            || list.indexOf(index+2)>=0 || list.indexOf(index+3)>=0){
            x1 = 4*Math.floor(Math.random()*(n/4));
            y1 = Math.floor(Math.random()*n);
            index = y1*(n+1) +x1;
        }
        var obj1 ={};
        obj1.x = x1;
        obj1.y = y1;
        a.push(obj1);
        var obj2 ={};
        obj2.x = x1+1;
        obj2.y = y1;
        a.push(obj2);
        var obj3 ={};
        obj3.x = x1+2;
        obj3.y = y1;
        a.push(obj3);
        var obj4 ={};
        obj4.x = x1+3;
        obj4.y = y1;
        a.push(obj4);

        //Add to the existing rect list
        list.push(index);
        list.push(index+1);
        list.push(index+2);
        list.push(index+3);
    }
    else if (count%4==1){  // 4 cell in a row
        var y1 = 4*Math.floor(Math.random()*(n/4));
        var x1 = Math.floor(Math.random()*n);
        var index = y1*(n+1) +x1;
        while (list.indexOf(index)>=0 || list.indexOf(index+n+1)>=0
            || list.indexOf(index+2*(n+1))>=0 || list.indexOf(index+3*(n+1))>=0){
            y1 = 4*Math.floor(Math.random()*(n/4));
            x1 = Math.floor(Math.random()*n);
            index = y1*(n+1) +x1;
        }
        var obj1 ={};
        obj1.x = x1;
        obj1.y = y1;
        a.push(obj1);
        var obj2 ={};
        obj2.x = x1;
        obj2.y = y1+1;
        a.push(obj2);
        var obj3 ={};
        obj3.x = x1;
        obj3.y = y1+2;
        a.push(obj3);
        var obj4 ={};
        obj4.x = x1;
        obj4.y = y1+3;
        a.push(obj4);

        //Add to the existing rect list
        list.push(index);
        list.push(index+1*(n+1));
        list.push(index+2*(n+1));
        list.push(index+3*(n+1));
    }
    else if (count%4==2){  // 4 cell in a row
        var x1 = 2*Math.floor(Math.random()*(n/2));
        var y1 = 2*Math.floor(Math.random()*(n/2));
        var index = y1*(n+1) +x1;
        while (list.indexOf(index)>=0 || list.indexOf(index+1)>=0
            || list.indexOf(index+(n+1))>=0 || list.indexOf(index+(n+1)+1)>=0){
            x1 = 2*Math.floor(Math.random()*(n/2));
            y1 = 2*Math.floor(Math.random()*(n/2));
            index = y1*(n+1)+x1;
        }
        var obj1 ={};
        obj1.x = x1;
        obj1.y = y1;
        a.push(obj1);
        var obj2 ={};
        obj2.x = x1+1;
        obj2.y = y1;
        a.push(obj2);
        var obj3 ={};
        obj3.x = x1;
        obj3.y = y1+1;
        a.push(obj3);
        var obj4 ={};
        obj4.x = x1+1;
        obj4.y = y1+1;
        a.push(obj4);

        //Add to the existing rect list
        list.push(index);
        list.push(index+1);
        list.push(index+(n+1));
        list.push(index+(n+1)+1);
    }
    else {//} if (count%4==2){  // 4 cell in a row
        var x1 = 2*Math.floor(Math.random()*(n/2));
        var y1 = Math.floor(Math.random()*n);
        var index = y1*(n+1) +x1;
        while (list.indexOf(index)>=0 || list.indexOf(index+1)>=0){
            x1 = 2*Math.floor(Math.random()*(n/2));
            y1 = Math.floor(Math.random()*n);
            index = y1*(n+1)+x1;
        }
        var obj1 ={};
        obj1.x = x1;
        obj1.y = y1;
        a.push(obj1);
        var obj2 ={};
        obj2.x = x1+1;
        obj2.y = y1;
        a.push(obj2);
        //Add to the existing rect list
        list.push(index);
        list.push(index+1);
    }
    return a;
}

function addCells(color){
    var a = getNumbers();
    for (var i=0; i<a.length; i++){
        var xx = margin+4.5+cellSize*a[i].x;
        var yy = heightTop+heightRect+margin*2+4.5+cellSize*a[i].y;
        var index = a[i].y*(n+1)+a[i].x;
        svg.append("rect")
            .attr("class", "cell"+index)
            .attr("width", cellSize-3)
            .attr("height", cellSize-3)
            .attr("x", xx)
            .attr("y", yy)
            .attr("rx", 1)
            .attr("ry", 1)
            .attr("fill", color)
            .attr("fill-opacity", 0.75)
            .attr("stroke", color)
            .attr("stroke-opacity", 0.3)
            ;//.style("filter", "url(#drop-shadow)");     
    }    
}

function sim(){
   svg.selectAll(".rect1").transition().duration(speed*0.8)
        .attr("x", margin+4+countF*stepX);
   
   if (isForward){
        //svg.selectAll(".rect2").transition().duration(speed*0.8)
        //    .attr("width", heightRect2*0.6*countF/(numLayers*1.5))
        //    .attr("height", heightRect2*0.6*countF/(numLayers*1.5));
        for (var i=0;i<colorList[countF].length;i++){
            addCells(colorList[countF][i]); 
        }      
   }     
   else{
       svg.selectAll(".rect2")
            .attr("width", heightRect2*0.6*countF/(numLayers*1.5))
            .attr("height", heightRect2*0.6*numLayers/(numLayers));; 
   }

   count++;  
   if (count%(numLayers)==0){
       if (Math.round(count/numLayers)%3==2){
          countF =numLayers;
          isForward=false;
       } 
       else{
         countF =0;
         isForward=true;
       }
    }
    if (isForward){
        countF++;
        if (countF==numLayers+1)
            countF=0;
    }
    else{
        countF--;
        if (countF==-1)
            countF = 0;
    }     
   console.log(count+" "+countF+" isForward="+isForward +" "+Math.round(count/numLayers));
}

