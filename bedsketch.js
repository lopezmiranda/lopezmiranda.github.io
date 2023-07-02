let angleX = 0;
let angleY = 0;
let angleZ = 0;
let cubeSize = 1;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function genNum(seed) {
	return (map(sin(frameCount * seed), -1, 1, 0, 255));
}

function draw() {
  background(0);
  noFill();
  strokeWeight(2);
  stroke(0);
	
  rotateX(angleX);
  rotateY(angleY);
  rotateZ(angleZ);

	let r = map(sin(frameCount * 0.01), -1, 1, 0, 255);
	let g = map(sin(frameCount * 0.02), -1, 1, 0, 255);
	let b = map(sin(frameCount * 0.03), -1, 1, 0, 255);
	fill(genNum(0.001),genNum(0.005),genNum(0.001), 150);
	

	//push();
	translate(0,0,0);
	
	stroke(r, g, b);
	box(50, 300, 350);

	//push();
	translate(25,0,180);
	stroke(r, g, b);
	box(100, 300, 10);

	//push();
	translate(0,0,-60);
	stroke(r, g, b);
	box(30, 250, 80);

  angleX += 0.01;
  angleY += 0.02;
  angleZ += 0.03;
}

