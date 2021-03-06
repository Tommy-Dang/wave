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
var heightBoard = 250;
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
var yTimeSeries = heightTop+heightRect+margin+240;
if (timeSeriesWidth>0){
    svg.append("rect")
        .attr("width", width-heightRect2-margin*3)
        .attr("height", heightBoard+10)
        .attr("x", heightRect2+margin*2)
        .attr("y", yTimeSeries)
        .attr("rx", 8)
        .attr("ry", 8)
        .attr("fill", "#bbb")
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
    //.attr("xlink:href", "images2/WAVE_DPU3.png")
    .attr("xlink:href", "images/WAVE_DPU_cay4.png")
    .attr("x", margin)
    .attr("y", heightTop+heightRect+margin*2)
    .attr("width", heightRect2)
    .attr("height", heightRect2)
    .attr("opacity", 0.5);   

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
var ww= 300;  
var startRect =  heightRect2+margin*2+100;
var startRectY =  heightTop+heightRect+margin*4+130;
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

//************* Forward ******************
svg.append("text")
    .attr("class", "processingTextF1")
    .attr("x", heightRect2+margin*2)
    .attr("y", startRectY)
    .style("fill", "#fff")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "start")
    .style("font-size", "16px")
    .text("FORWARD"); 

svg.append("text")
    .attr("class", "processingTextF2")
    .attr("x", heightRect2+margin*2+ww+104)
    .attr("y", startRectY)
    .style("fill", "#000")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "start")
    .style("font-size", "12px")
    .text("100%"); 

svg.append("rect")
    .attr("class", "rectF")
    .attr("x", startRect)
    .attr("y", startRectY-15)
    .style("fill", "#aaa")
    .style("fill-opacity", 0.5)
    .style("stroke", "#000")
    .attr("height", 20)
    .attr("width", ww);      

svg.append("rect")
    .attr("class", "rectF1")
    .attr("x", startRect+1)
    .attr("y", startRectY-14)
    .style("fill", "#fff")
    .attr("height", 18)
    .attr("width", 0);   

svg.append("line")
    .attr("class", "lineF")
    .attr("x1", startRect)
    .attr("y1", startRectY-14)
    .attr("x2", startRect)
    .attr("y2", startRectY+11)
    .style("stroke", "#000")
    .style("stroke-width", 1.4)
    .style("stroke-dasharray", "2 2");         
svg.append("text")
    .attr("class", "processingTextF3")
    .attr("x", startRect-29)
    .attr("y", startRectY+18)
    .style("fill", "#000")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "start")
    .style("font-size", "12px")
    .text("max = ");

//************* Backward ******************
svg.append("text")
    .attr("class", "processingTextB1")
    .attr("x", heightRect2+margin*2)
    .attr("y", startRectY+45)
    .style("fill", "#000")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "start")
    .style("font-size", "16px")
    .text("BACKWARD"); 

svg.append("text")
    .attr("class", "processingTextF2")
    .attr("x", startRect+ww+4)
    .attr("y", startRectY+45)
    .style("fill", "#000")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "start")
    .style("font-size", "12px")
    .text("100%"); 

svg.append("rect")
    .attr("class", "rectB")
    .attr("x", startRect)
    .attr("y", startRectY+30)
    .style("fill", "#aaa")
    .style("fill-opacity", 0.5)
    .style("stroke", "#000")
    .attr("height", 20)
    .attr("width", ww);      
svg.append("rect")
    .attr("class", "rectB1")
    .attr("x", startRect)
    .attr("y", startRectY+31)
    .style("fill", "#000")
    .style("fill-opacity", 0.5)
    .attr("height", 18)
    .attr("width", 0);                 
svg.append("line")
    .attr("class", "lineB")
    .attr("x1", startRect)
    .attr("y1", startRectY+30)
    .attr("x2", startRect)
    .attr("y2", startRectY+56)
    .style("stroke", "#000")
    .style("stroke-width", 1.4)
    .style("stroke-dasharray", "2 2");         
svg.append("text")
    .attr("class", "processingTextB3")
    .attr("x", startRect-29)
    .attr("y", startRectY+63)
    .style("fill", "#000")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "start")
    .style("font-size", "12px")
    .text("max = 0%");

svg.append("text")
    .attr("class", "processingText5")
    .attr("x", heightRect2+margin*2)
    .attr("y", heightTop+heightRect+margin*4+495)
    .style("fill", "#fff")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "start")
    .style("font-size", "14px")
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
var cellSize = (heightRect2*0.655)/32;
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
var numTries = 50;
function getNumbers(type){
    var a = []
    var nX =n;
    var nY =n;

    if (isForward){
        nX = 6+countF*0.55;
        nY = 6+countF*0.55;
    }
    else{
        nX = 4+(numLayers-countF)*0.65;
    }
    if (type%4==0){  // 4 cell in a row
        var x1 = 4*Math.floor(Math.random()*(nX/4));
        var y1 = Math.floor(Math.random()*nY);
        var index = y1*(n+1) +x1;
        var countWhile = 0;     // Count number of tries
        while (list.indexOf(index)>=0 || list.indexOf(index+1)>=0
            || list.indexOf(index+2)>=0 || list.indexOf(index+3)>=0){
            x1 = 4*Math.floor(Math.random()*(nX/4));
            y1 = Math.floor(Math.random()*nY);
            index = y1*(n+1) +x1;
            countWhile++;
            if (countWhile>=numTries)  // Tries no more than 10 times
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
    else if (type%4==1){  // 4 cell in a column
        if (isForward) {     //**************** BACKWARD ********************
            var y1 = 2*Math.floor(Math.random()*(nY/2));
            var x1 = Math.floor(Math.random()*nX);
            var index = y1*(n+1) +x1;
            var countWhile = 0;     // Count number of tries
            while (list.indexOf(index)>=0 || list.indexOf(index+n+1)>=0){
                y1 = 2*Math.floor(Math.random()*(nY/2));
                x1 = Math.floor(Math.random()*nX);
                index = y1*(n+1) +x1;
                countWhile++;
                if (countWhile>=numTries)  // Tries no more than 10 times
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

            //Add to the existing rect list
            list.push(index);
            list.push(index+1*(n+1));
        
        }
        else{
            var y1 = 4*Math.floor(Math.random()*(nY/4));
            var x1 = Math.floor(Math.random()*nX);
            var index = y1*(n+1) +x1;
            var countWhile = 0;     // Count number of tries
            while (list.indexOf(index)>=0 || list.indexOf(index+n+1)>=0
                || list.indexOf(index+2*(n+1))>=0 || list.indexOf(index+3*(n+1))>=0){
                y1 = 4*Math.floor(Math.random()*(nY/4));
                x1 = Math.floor(Math.random()*nX);
                index = y1*(n+1) +x1;
                countWhile++;
                if (countWhile>=numTries)  // Tries no more than 10 times
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
    }
    else if (type%4==2){  // 4 cell rect
        var x1 = 2*Math.floor(Math.random()*(nX/2));
        var y1 = 2*Math.floor(Math.random()*(nY/2));
        var index = y1*(n+1) +x1;
        var countWhile = 0;     // Count number of tries
        while (list.indexOf(index)>=0 || list.indexOf(index+1)>=0
            || list.indexOf(index+(n+1))>=0 || list.indexOf(index+(n+1)+1)>=0){
            x1 = 2*Math.floor(Math.random()*(nX/2));
            y1 = 2*Math.floor(Math.random()*(nY/2));
            index = y1*(n+1)+x1;
            countWhile++;
            if (countWhile>=numTries)  // Tries no more than 10 times
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
            var x1 = 2*Math.floor(Math.random()*(nX/2));
            var y1 = Math.floor(Math.random()*nY);
            var index = y1*(n+1) +x1;
            var countWhile = 0;     // Count number of tries
            while (list.indexOf(index)>=0 || list.indexOf(index+1)>=0){
                x1 = 2*Math.floor(Math.random()*(nX/2));
                y1 = Math.floor(Math.random()*nY);
                index = y1*(n+1)+x1;
                countWhile++;
                if (countWhile>=numTries)  // Tries no more than 10 times
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
            var x1 = 3*Math.floor(Math.random()*(nX/3));
            var y1 = 2*Math.floor(Math.random()*(nY/2));
            var index = y1*(n+1) +x1;
            var countWhile = 0;     // Count number of tries
            while (list.indexOf(index)>=0 || list.indexOf(index+1)>=0 || list.indexOf(index+2)>=0
                || list.indexOf(index+(n+1))>=0 || list.indexOf(index+(n+1)+1)>=0
                || list.indexOf(index+(n+1)+2)>=0    ){
                x1 = 3*Math.floor(Math.random()*(nX/3));
                y1 = 2*Math.floor(Math.random()*(nY/2));
                index = y1*(n+1)+x1;
                countWhile++;
                svg.selectAll(".processingText5")
                    .text("Number of tries to allocate larger blocks: "+countWhile); 
     
                if (countWhile>=numTries*10)  {// Tries no more than 20 times
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

var cellPadding = 1;
function addCells(color){
    var a = getNumbers(count);
    if (isForward){  // On FORWARD, Skip adding cells in a row to reduce the number of cells
        var b = getNumbers(3);
        for (var i=0; i<b.length; i++){
            a.push(b[i]);
        }
        var c = getNumbers(1);
        for (var i=0; i<c.length; i++){
            a.push(c[i]);
        }
    } 
    else if (!isForward){   //**************** BACKWARD ********************
        var b = getNumbers(3);
        for (var i=0; i<b.length; i++){
            a.push(b[i]);
        }
    }   
    
    for (var i=0; i<a.length; i++){
        var xx = margin+104+cellSize*a[i].x;
        var yy = heightTop+heightRect+margin*2+104+cellSize*a[i].y;
        var index = a[i].y*(n+1)+a[i].x;
        svg.append("rect")
            .attr("class", "cell"+index)
            .attr("width", cellSize-cellPadding)
            .attr("height", cellSize-cellPadding)
            .attr("x", xx-(a[i].x%4)*cellPadding/4)
            .attr("y", yy-(a[i].y%4)*cellPadding/4)
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
var maxUtilizationF =0;
var maxUtilizationB =0;

function sim(){
    // Reset counter after a while
    if (timeArrayForward.length>10*numLayers){
        timeArrayForward =[];
        timeArrayBackward =[];
        count=1;
        countF=1;
        maxUtilizationF =0;
        maxUtilizationB =0;
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
            return "Current layer: "+countF+" / "+numLayers; 
        }); 
    svg.selectAll(".processingText2")
        .text("From start: "+count); 

    var utilization = Math.round((list.length*100)/(n*n))    
    svg.selectAll(".processingText3")
        .text("DPU utilization: "+utilization+"%"); 

    if (isForward){
        if (utilization>maxUtilizationF)
            maxUtilizationF=utilization;
        svg.selectAll(".rectF1")
            .attr("width", (utilization/100)*ww); 
        svg.selectAll(".rectB1")
            .attr("width", 0);
        svg.selectAll(".lineF")
            .attr("x1", startRect+(maxUtilizationF/100)*ww+1)
            .attr("x2", startRect+(maxUtilizationF/100)*ww+1);    
        svg.selectAll(".processingTextF3")
            .attr("x", startRect+(maxUtilizationF/100)*ww-29)
            .text("max = "+maxUtilizationF+"%");          
    }
    else{
        if (utilization>maxUtilizationB)
            maxUtilizationB=utilization;
        svg.selectAll(".rectF1")
            .attr("width", 0); 
        svg.selectAll(".rectB1")
            .attr("width", (utilization/100)*ww);     
        svg.selectAll(".lineB")
            .attr("x1", startRect+(maxUtilizationB/100)*ww+1)
            .attr("x2", startRect+(maxUtilizationB/100)*ww+1);    
        svg.selectAll(".processingTextB3")
            .attr("x", startRect+(maxUtilizationB/100)*ww-29)
            .text("max = "+maxUtilizationB+"%");     
    }    
                     
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
       removeCells(0.0);
    }
   // console.log(count+ " 3  countF="+countF+ " isForward="+isForward);
   //console.log(count+" "+countF+" isForward="+isForward +" "+Math.round(count/numLayers));
}



