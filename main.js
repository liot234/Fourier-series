const width = 4000;
const height =  2000;

let slider;
let sel;
function setup() {
    createCanvas(width, height);

    slider = createSlider(1,200,1)
    slider.style('width', '1000px')
    slider.style('height', '1000px')

    sel = createSelect();
    sel.style('width', '1000px')
    sel.style('height', '100px')
    sel.style('font-size', '100px')
    sel.position(1200, 2450);
    sel.option('sawtooth');
    sel.option('triangle');
    sel.option('square');
  
    
    //sel.changed(mySelectEvent);
}


let t = 0;
let waveVals = [];  



function draw() {
    //console.log(sel.value())
    background(0);
    translate(1000,1000)

    let x=0;
    let y=0;

    for (let i = 0; i < slider.value(); i++) {

        let prevx = x;
        let prevy = y;
        let radius =0;
        let n = 0; 
        if(sel.value()=='square'){
            n = (i *2)+1
            radius = 30 * (4/n*PI)
        }
        else if(sel.value()=='triangle'){
            n = (i *2)+1
            radius = 500*((8*(Math.pow(-1,(n-1)/2)))/(Math.pow(PI,2)*Math.pow(n,2)))
        }
        else if(sel.value()=='sawtooth'){
            n=i+1
            //console.log(n)
            radius = 1500*((PI-2)/((2*PI)*n))
        }
           
        x += cos(n*t) * radius
        y += sin(n*t) * radius

        //MAIN CIRCLE 
        stroke(255,100)
        strokeWeight(3);
        noFill();
        
        ellipse(prevx,prevy,radius*2);

        //LINE 
        stroke(255);
        strokeWeight(4);
        line(prevx,prevy,x,y);
        fill(255);
        ellipse(x,y,10)

        beginShape();
        noFill();
                 
        vertex(i,waveVals[i]);        
    
        endShape();
    
        //console.log(y)
       
    }

    
    
    waveVals.unshift([x,y]) 
    
    beginShape();
    noFill();
    for(let i =0; i<waveVals.length; i++){             
        vertex(waveVals[i][0],waveVals[i][1]);        
    }
    endShape();
    

    //POINT 
    translate(1500,0)
    line(x-1500,y,0,y)
    beginShape();
    noFill();
    for(let i =0; i<waveVals.length; i++){             
        vertex(i,waveVals[i][1]);        
    }
    endShape();
    
    //console.log(waveVals)
    if(waveVals.length > 400){
        waveVals.pop()
    }
    t+=0.04;
} 