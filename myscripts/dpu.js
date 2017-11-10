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
var heightBoard = 300;
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

// ********************************************* Time series *********************************************
var timeSeriesWidth = width>heightRect2+margin*3;
if (timeSeriesWidth>0){
    svg.append("rect")
        .attr("width", width-heightRect2-margin*3)
        .attr("height", heightBoard)
        .attr("x", heightRect2+margin*2)
        .attr("y", heightTop+heightRect+margin+150)
        .attr("rx", 8)
        .attr("ry", 8)
        .attr("fill", "#ddd")
        .attr("stroke", "#000")
        .style("filter", "url(#drop-shadow)");    
}
else
    timeSeriesWidth=0;

svg.append("a")
    .attr("xlink:href", "http://wavecomp.ai/")
    .append("image")
    .attr("xlink:href", "images/logo.png")
    .attr("x", heightRect2+margin*2)
    .attr("y", heightTop+heightRect+margin*2)
    .attr("width", "180")
    .attr("height", "30");

svg.append("text")
    .attr("x", heightRect2+margin*2)
    .attr("y", heightTop+heightRect+margin*4+30)
    .style("fill", "#000")
    .style("text-shadow", "1px 1px 0 rgba(0, 0, 0, 0.7")
    .attr("text-anchor", "start")
    .style("font-size", "20px")
    .text("WaveFlow Execution");   

svg.append("image")
    .attr("xlink:href", "images2/WAVE_DPU3.png")
    .attr("x", margin)
    .attr("y", heightTop+heightRect+margin*2)
    .attr("width", heightRect2)
    .attr("height", heightRect2)
    .attr("opacity", 0.9);   

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

//*********************** Text processing ********************
svg.append("text")
    .attr("class", "processingText1")
    .attr("x", heightRect2+margin*2)
    .attr("y", heightTop+heightRect+margin*4+60)
    .style("fill", "#fff")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "start")
    .style("font-size", "16px")
    .text("Current layer: 0 / "+numLayers); 
svg.append("text")
    .attr("class", "processingText2")
    .attr("x", heightRect2+margin*2)
    .attr("y", heightTop+heightRect+margin*4+80)
    .style("fill", "#fff")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "start")
    .style("font-size", "16px")
    .text("From start: 0");   

svg.append("text")
    .attr("class", "processingText3")
    .attr("x", heightRect2+margin*2)
    .attr("y", heightTop+heightRect+margin*4+100)
    .style("fill", "#fff")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "start")
    .style("font-size", "16px")
    .text("DPU ultilization: 0%");         

svg.append("text")
    .attr("class", "processingText4")
    .attr("x", heightRect2+margin*2)
    .attr("y", heightTop+heightRect+margin*4+150)
    .style("fill", "#fff")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "start")
    .style("font-size", "16px")
    .text("Processing");         

svg.append("text")
    .attr("class", "processingText5")
    .attr("x", heightRect2+margin*2)
    .attr("y", heightTop+heightRect+margin*4+170)
    .style("fill", "#fff")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "start")
    .style("font-size", "16px")
    .text("Processing");         

var speed =100;
//*********************** Simulation ***************************************************************
var interval1 = setInterval(function(){
    sim();
} , speed);

var isSimRunning =true;
document.getElementById('controlButton').style.backgroundColor = "#F88";
function stopStart(){
    if (isSimRunning){
        clearInterval(interval1);
        document.getElementById('controlButton').innerHTML = "Restart simulation";
        document.getElementById('controlButton').style.backgroundColor = "#8F8";
    }
        
    else{
        interval1 = setInterval(function(){
            sim();
        } , speed);
        document.getElementById('controlButton').innerHTML = "Stop simulation";
        document.getElementById('controlButton').style.backgroundColor = "#F88";
    }
    isSimRunning = !isSimRunning;
}
//*********************** DPU configuration ***************************************************************
var color0 = "#333";
//var color1 = "#5B83EF"; // blue
var color1 = "#35C"; // blue
//var color2 = "#BA3C2F"; // red
var color2 = "#900"; // red
//var color3 = "#539858"; // green
var color3 = "#006f00"; // green
//var color4 = "#E2B326";
var color4 = "#B80";
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

function getNumbers(count){
    var a = []
    if (count%4==0){  // 4 cell in a row
        var x1 = 4*Math.floor(Math.random()*(n/4));
        var y1 = Math.floor(Math.random()*n);
        var index = y1*(n+1) +x1;
        var countWhile = 0;     // Count number of tries
        while (list.indexOf(index)>=0 || list.indexOf(index+1)>=0
            || list.indexOf(index+2)>=0 || list.indexOf(index+3)>=0){
            x1 = 4*Math.floor(Math.random()*(n/4));
            y1 = Math.floor(Math.random()*n);
            index = y1*(n+1) +x1;
            countWhile++;
            if (countWhile>=20)  // Tries no more than 10 times
                return [];
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
    else if (count%4==1){  // 4 cell in a column
        var y1 = 4*Math.floor(Math.random()*(n/4));
        var x1 = Math.floor(Math.random()*n);
        var index = y1*(n+1) +x1;
        var countWhile = 0;     // Count number of tries
        while (list.indexOf(index)>=0 || list.indexOf(index+n+1)>=0
            || list.indexOf(index+2*(n+1))>=0 || list.indexOf(index+3*(n+1))>=0){
            y1 = 4*Math.floor(Math.random()*(n/4));
            x1 = Math.floor(Math.random()*n);
            index = y1*(n+1) +x1;
            countWhile++;
            if (countWhile>=20)  // Tries no more than 10 times
                return [];
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
        if (!isForward) {     //**************** BACKWARD ********************
            var obj4 ={};
            obj4.x = x1;
            obj4.y = y1+3;
            a.push(obj4);
        }

        //Add to the existing rect list
        list.push(index);
        list.push(index+1*(n+1));
        list.push(index+2*(n+1));
        if (!isForward)      //**************** BACKWARD ********************
            list.push(index+3*(n+1));     
    }
    else if (count%4==2){  // 4 cell rect
        var x1 = 2*Math.floor(Math.random()*(n/2));
        var y1 = 2*Math.floor(Math.random()*(n/2));
        var index = y1*(n+1) +x1;
        var countWhile = 0;     // Count number of tries
        while (list.indexOf(index)>=0 || list.indexOf(index+1)>=0
            || list.indexOf(index+(n+1))>=0 || list.indexOf(index+(n+1)+1)>=0){
            x1 = 2*Math.floor(Math.random()*(n/2));
            y1 = 2*Math.floor(Math.random()*(n/2));
            index = y1*(n+1)+x1;
            countWhile++;
            if (countWhile>=20)  // Tries no more than 10 times
                return [];
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
    else {//}  // 2 cell in a row
        if (isForward){
            var x1 = 2*Math.floor(Math.random()*(n/2));
            var y1 = Math.floor(Math.random()*n);
            var index = y1*(n+1) +x1;
            var countWhile = 0;     // Count number of tries
            while (list.indexOf(index)>=0 || list.indexOf(index+1)>=0){
                x1 = 2*Math.floor(Math.random()*(n/2));
                y1 = Math.floor(Math.random()*n);
                index = y1*(n+1)+x1;
                countWhile++;
                if (countWhile>=10)  // Tries no more than 10 times
                    return [];
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
        else{   //**************** BACKWARD ********************
                // Add 6 cells: 2 rows 3 columns    
            var x1 = 3*Math.floor(Math.random()*((n-3)/3));
            var y1 = 2*Math.floor(Math.random()*(n/2));
            var index = y1*(n+1) +x1;
            var countWhile = 0;     // Count number of tries
            while (list.indexOf(index)>=0 || list.indexOf(index+1)>=0 || list.indexOf(index+2)>=0
                || list.indexOf(index+(n+1))>=0 || list.indexOf(index+(n+1)+1)>=0
                || list.indexOf(index+(n+1)+2)>=0    ){
                x1 = 3*Math.floor(Math.random()*((n-3)/3));
                y1 = 2*Math.floor(Math.random()*(n/2));
                index = y1*(n+1)+x1;
                countWhile++;
                svg.selectAll(".processingText5")
                    .text("countWhile: "+countWhile); 
     
                if (countWhile>=1000)  {// Tries no more than 20 times
                    return [];
                }    
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
            obj4.x = x1;
            obj4.y = y1+1;
            a.push(obj4);
            var obj5 ={};
            obj5.x = x1+1;
            obj5.y = y1+1;
            a.push(obj5);
            var obj6 ={};
            obj6.x = x1+2;
            obj6.y = y1+1;
            a.push(obj6);

            //Add to the existing rect list
            list.push(index);
            list.push(index+1);
            list.push(index+2);
            list.push(index+(n+1));
            list.push(index+(n+1)+1);
            list.push(index+(n+1)+2);
        }
    }
    return a;
}

var cellPadding = 2.7;
function addCells(color){
    var a = getNumbers(count);
    if (isForward && (count+1)%4!=0){  // On FORWARD, Skip adding cells in a row to reduce the number of cells
        var b = getNumbers(count+1);
        for (var i=0; i<b.length; i++){
            a.push(b[i]);
        }
    } 
    else if (!isForward && (count+1)%4!=0){   //**************** BACKWARD ********************
        var b = getNumbers(count+1);
        for (var i=0; i<b.length; i++){
            a.push(b[i]);
        }
    }   
    
    for (var i=0; i<a.length; i++){
        var xx = margin+5.5+cellSize*a[i].x;
        var yy = heightTop+heightRect+margin*2+5.5+cellSize*a[i].y;
        var index = a[i].y*(n+1)+a[i].x;
        svg.append("rect")
            .attr("class", "cell"+index)
            .attr("width", cellSize-cellPadding)
            .attr("height", cellSize-cellPadding)
            .attr("x", xx-(a[i].x%4)*cellPadding/3)
            .attr("y", yy-(a[i].y%4)*cellPadding/3)
            .attr("rx", 1)
            .attr("ry", 1)
            .attr("fill", color)
            .attr("fill-opacity", 0.8)
            .attr("stroke", color)
            .attr("stroke-opacity", 0.4)
            ;//.style("filter", "url(#drop-shadow)");     
    }    
}

// remove percentage of cells from the array
function removeCells(percent){
    while (list.length>percent*n*n){
        var index = list[list.length-1];
        svg.selectAll(".cell"+index).remove();
        list.splice(list.length-1, 1);
      //  console.log("list.length"+list.length);
    }
}

var timeArrayForward = [];
var timeArrayBackward = [];
var firstTime = true;
function sim(){
    // Reset counter after a while
    if (timeArrayForward.length>6*numLayers){
        timeArrayForward =[];
        timeArrayBackward =[];
        count=1;
        countF=1;
    }


    svg.selectAll(".rect1").transition().duration(speed*0.8)
        .attr("x", margin+4+countF*stepX)
        .attr("height", function (d){
            if (countF<29)
                return heightRect;
            else
                return heightRect-(countF-29)*(heightRect/22);
        });
    svg.selectAll(".processingText1")
        .text(function(){
            if (isForward)
                return "Current layer: "+countF+" / "+numLayers + " , processing FORWARD"; 
            else
                return "Current layer: "+countF+" / "+numLayers + " , processing BACKWARD"; 
        }); 
    svg.selectAll(".processingText2")
        .text("From start: "+count); 

    var utilization = Math.round((list.length*100)/(n*n))    
    svg.selectAll(".processingText3")
        .text("DPU utilization: "+utilization+"%"); 

    svg.selectAll(".processingText4")
        .text("isForward: "+isForward); 
                     
    for (var i=0;i<colorList[countF].length;i++){
        addCells(colorList[countF][i]); 
    }   
    
        
    var obj1 ={};
    obj1.count = count;
    obj1.utilization = utilization;
    var obj2 ={};
    obj2.count = count;
    obj2.utilization = 0;
    if (isForward){
        timeArrayForward.push(obj1);
        timeArrayBackward.push(obj2);   
    }
    else{
        timeArrayForward.push(obj2);
        timeArrayBackward.push(obj1);
    }
        
   
   //******************************** Time series ************************************ 
   if (firstTime){
        drawTimeSeries();
        firstTime = false;
    }
    else {
        updateTimeSeries();
    }

   count++;  
   //console.log(count+ " 1  countF="+countF+ " isForward="+isForward);
    if (isForward){
        countF++;
        if (countF==numLayers)
            countF=0;
    }
    else{
        countF--;
        if (countF==-1)
            countF = 0;
    }    
    //console.log(count+ " 2  countF="+countF+ " isForward="+isForward);
    if (count%(numLayers)==0){
       if (Math.floor(count/numLayers)%3==2){
          countF =numLayers-1;
          isForward=false;
       } 
       else{
         countF =0;
         isForward=true;
       }
       removeCells(0.05);
    }
   // console.log(count+ " 3  countF="+countF+ " isForward="+isForward);
   //console.log(count+" "+countF+" isForward="+isForward +" "+Math.round(count/numLayers));
}



