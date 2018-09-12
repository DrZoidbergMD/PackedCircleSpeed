// Copied from a) https://www.openprocessing.org/sketch/584896
// to                 b) https://editor.p5js.org/Cephalopodium/sketches/S1TovCNO7
// and to          c) https://codepen.io/Cephalopodium/pen/bxLPaj
//
// The same code in a) just ran 200 times faster than b)
// The c) version was fast but failed - no circles drawn
// Using a Samsung Galaxy Tab 8.4 SM-T705 16Gb 
// Security patched Android 6.0.1 patched October 2016
// -----------
// Daniel Shiffman modified by me 6/9/18 
// Code for: https://youtu.be/XATr_jdh-44
// Modified to reduce circle radius and change
// circle colour at each shrink op.
var circles = []; 
var rad=62;
const maxCircles=200;
const maxOverlaps=9000;
var oCount=0; 
var text, t2, t3;
var protection = 0;
var maxProt = 1000000;
var overlapping = false;
var clrr, clrg, clrb;
var radDecr=1;
var radMin=3;
var cnv;
var m;

function setup() { 
  m=millis();
	cnv=createCanvas(400, 300); //	cnv.z-index('999');
	// Pink	clrr = 255; clrg = 0; clrb = 75;
	clrr = random(255); clrg = random(255); clrb = random(255);
	t2=createP('xxxx');
  t2.position(10,20);
  t2.style('font-size','13pt');
	t2.style("background-color","#00550066");//  
	t2.style("color", "#FF00FF");
  t2.style("padding", "5px");
	t2.style('z-index','099'); // 
	
  t3=createP('xxxx');
	t3.style('z-index','199');

  // Try to get to maxCircles
  while (circles.length < maxCircles) {
		// Pick a random candidate circle
    var circle = {
			x: random(width),
			y: random(height), // r: random(3, 36) //
			r: rad,
			cr: clrr,
			cg: clrg,
			cb: clrb
		};
		// Does this circle overlap any already drawn  circles?
		overlapping = false;
		
		for (var j = 0; j < circles.length; j++) { 
			var other = circles[j];
			var d = dist(circle.x, circle.y, other.x, other.y);
			if (d < circle.r + other.r) { // overlap
				overlapping = true; 
				break;
			}	
		}			
		if (!overlapping) {
			// Add this circle to drawn circles array
			circles.push(circle);
			// reset overlap count
			oCount=0;
		} else {
			oCount+=1; // save consecutive overlaps count
			if (oCount >= maxOverlaps) {
				rad=max(int(rad-radDecr),radMin);
				clrr = random(255);
				clrg = random(255);
				clrb = random(255);
				// reset overlap counter
        oCount=0;
			}
		}
		// Lets make sure we don't get stuck in infinite loop
    protection++;
		if (protection > maxProt) {
			break;
		}
	} // end WHILE	
	showDebug(); //	noStroke();
	// Draw all the circles
	for (var i = 0; i < circles.length; i++) { 	
		fill(circles[i].cr, circles[i].cg, circles[i].cb,100);		
		ellipse(circles[i].x, circles[i].y, circles[i].r * 2, circles[i].r * 2);
	} 
}

function draw(){
	strokeWeight(2);
	noFill();
	rect(0,0,width,height);
	// noLoop();
}

function showDebug(){
	t2.style('font-size','16pt'); 
	t2.style('color','#ffffff');
	t2.html('c.len='+circles.length+' oC='+oCount+' Runtime secs='+int(millis()-m)/1000);
	t2.html(' ov='+overlapping+' mOvr='+maxOverlaps+' prot='+protection,true);
  dummy(circles.length);
}

function dummy(vin){
	this.vin=vin;
	t3.position(10,70);
	t3.style('font-size','12pt'); 
	t3.style('color','#00f899');
	t3.style('background-color','#00008877');
	t3.style('padding','8pt');
	t3.html('c.length='+this.vin); 
	//	for (var i=0;i<min(360,this.vin-1);i++){ 	
	for (var i=0;i<(this.vin-1);i++){			
			if(circles[i].r!=circles[i+1].r) {
			 t3.html(' '+i+'='+circles[i].r,true); 
		 }
	}
}

function mousePressed() {
	// noLoop(); //
	var t=createP('Exit pressed');
	t.position(10,90);
	t.style('font-size','21pt'); 
  t.style('z-index','099'); 	
	let z=setTimeout(endit,5000); 
  clearTimeout(z);
}

function endit(){ 
	//	cnv.hide();	cnv.remove();
	exit();
}
