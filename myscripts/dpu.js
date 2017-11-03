/* November 2017 
 * Tommy Dang, Assistant professor, iDVL@TTU
 *
 * THIS SOFTWARE IS BEING PROVIDED "AS IS", WITHOUT ANY EXPRESS OR IMPLIED
 * WARRANTY.  IN PARTICULAR, THE AUTHORS MAKE NO REPRESENTATION OR WARRANTY OF ANY KIND CONCERNING THE MERCHANTABILITY
 * OF THIS SOFTWARE OR ITS FITNESS FOR ANY PARTICULAR PURPOSE.
 */
 
var width = document.body.clientWidth;
var margin = 12;
var heightTop = 40;
var heightRect = 350;
var heightRect2 = width/2;
var heightBoard = 0;
var height = heightTop+heightRect+heightRect2+2*margin;
var color1 = "#fff";
var color2 = "#fff";

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

 svg.append("text")
    .attr("x", width*0.5)
    .attr("y", heightTop*0.75)
    .style("fill", color1)
    .style("text-shadow", "1px 1px 0 rgba(0, 0, 0, 0.7")
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
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
    .attr("height", heightRect)
    .attr("x", margin)
    .attr("y", heightTop)
    .attr("rx", 8)
    .attr("ry", 8)
    .attr("fill", "#fff")
    .attr("stroke", color1)
    .style("filter", "url(#drop-shadow)"); 

 svg.append("rect")
    .attr("width", heightRect2)
    .attr("height", heightRect2)
    .attr("x", margin)
    .attr("y", heightTop+heightRect+margin)
    .attr("rx", 8)
    .attr("ry", 8)
    .attr("fill", "#000")
    .attr("stroke", "#000")
    .style("filter", "url(#drop-shadow)");    

svg.append("a")
    .attr("xlink:href", "http://wavecomp.ai/")
    .append("image")
    .attr("xlink:href", "images/logo.png")
    .attr("x", width*0.75-100)
    .attr("y", heightTop+heightRect+20)
    .attr("width", "180")
    .attr("height", "30");

svg.append("image")
    .attr("xlink:href", "images/waveSlide.png")
    .attr("x", width*0.55)
    .attr("y", heightTop+heightRect+40)
    .attr("width", width*0.4)
    .attr("height", width*0.4);   

svg.append("image")
    .attr("xlink:href", "images/WAVE_DPU_cay3.png")
    .attr("x", margin)
    .attr("y", heightTop+heightRect)
    .attr("width", heightRect2)
    .attr("height", heightRect2)
    .attr("opacity", 0.5);       


//*********************** Text processing ********************
svg.append("text")
    .attr("class", "processingText1")
    .attr("x", margin+5)
    .attr("y", heightTop+15)
    .style("fill", color1)
    .attr("font-family", "sans-serif")
    .style("text-shadow", "1px 1px 0 rgba(255, 255, 255, 1")
    .attr("text-anchor", "start")
    .style("font-size", "14px")
    .text("0/"+1000); 
svg.append("text")
    .attr("class", "processingText2")
    .attr("x", width-margin-5)
    .attr("y", heightTop+15)
    .style("fill", color2)
    .attr("font-family", "sans-serif")
    .style("text-shadow", "1px 1px 0 rgba(255, 255, 255, 1")
    .attr("text-anchor", "end")
    .style("font-size", "14px")
    .text("0/"+1000);     
//*********************** Images from Jin *********************
svg.append("image")
    .attr("xlink:href", "images/GoogleInception2.jpg")
    .attr("x",margin)
    .attr("y", heightTop+10)
    .attr("width", width-margin*2);

var numLayers =41;
var stepX = (width-margin*2-30)/numLayers; //41 is the number of layers
svg.append("rect")
    .attr("class", "rect1")
    .attr("width", stepX)
    .attr("height", heightRect-20)
    .attr("x", margin+15)
    .attr("y", heightTop+10)
    .attr("rx", 8)
    .attr("ry", 8)
    .attr("fill", "#000")
    .attr("fill-opacity", 0.1)
    .attr("stroke", "#f00"); 

svg.append("rect")
    .attr("class", "rect2")
    .attr("width", 1)
    .attr("height", 1)
    .attr("x", margin+heightRect2*0.21)
    .attr("y", heightTop+heightRect+heightRect2*0.21)
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("fill", "#a00")
    .attr("fill-opacity", 0.5)
    .attr("stroke", "#a00")
    .attr("stroke-opacity", 0.5)
    .style("filter", "url(#drop-shadow)");     

var speed =100;
//*********************** Simulation ***************************************************************
var interval1 = setInterval(function(){
    sim();
} , speed);

var count=0;
var countF=0;
var isForward = true;
function sim(){
   svg.selectAll(".rect1").transition().duration(speed*0.8)
        .attr("x", margin+15+countF*stepX);
   
   if (isForward){
        svg.selectAll(".rect2").transition().duration(speed*0.8)
            .attr("width", heightRect2*0.6*countF/(numLayers*1.5))
            .attr("height", heightRect2*0.6*countF/(numLayers*1.5));;
   }     
   else{
       svg.selectAll(".rect2")
            .attr("width", heightRect2*0.6*countF/(numLayers*1.5))
            .attr("height", heightRect2*0.6*numLayers/(numLayers));; 
   }

   count++;  
   
   if (count%(numLayers)==numLayers-1){
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

