let palette;
let graphics;

function setup() {
	createCanvas(windowWidth, windowHeight);
	// colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	graphics = createGraphics(windowWidth, windowHeight);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	graphics.noStroke();

	for (let i = 0; i < (width * height * 10) / 100; i++) {
		graphics.fill(0, 0, 100, 5);
		let x = random(width);
		let y = random(height);
		let w = random(3);
		let h = random(3);
		graphics.ellipse(x, y, w, h);
	}
	noLoop();
}

function draw() {
	let rs = random(10000);
	clear();
	background(240);
	palette = shuffle(chromotome.get().colors);

	let angle = int(random(12)) * 360 / 12;
	let iMax = palette.length;
	for (let i = 0; i < iMax; i++) {
		let g = createGraphics(width, height);
		g.angleMode(DEGREES);
		let c1 = palette[i % palette.length];
		let c2 = palette[(i + 1) % palette.length];
		let c3 = palette[(i + 2) % palette.length];
		let r = sqrt(sq(width) + sq(height)) / 2;
		let x1 = width / 2 + cos(angle) * r;
		let y1 = height / 2 + sin(angle) * r;
		let x2 = width / 2 + cos(angle + 180) * r;
		let y2 = height / 2 + sin(angle + 180) * r;
		let arr = shuffle([c1, c2, c3]);
		let nStep = 1 / int(random(3, 10));

		let gradient = g.drawingContext.createLinearGradient(x1, y1, x2, y2);
		let m = 0;
		for (let n = 0; n < 1; n += nStep) {
			gradient.addColorStop(n, arr[m++ % arr.length]);
		}
		g.drawingContext.fillStyle = gradient;
		g.noStroke();

		let offset = 0;
		let x = offset;
		let y = offset;
		let w = width - offset * 2;
		let h = width - offset * 2;

		g.rectMode(CORNER);
		g.rect(x, y, w, h);

		if (i != 0) {
			randomSeed(rs);
			let cells = int(random(2, 10));
			let off = width / 35;
			let margin = 0;
			let d = int((width - off * 2 - margin * (cells - 1)) / cells);
			let dw = d * sqrt(2) + d / 5 / 2;
			let dh = d / 5;

			g.push();
			g.erase(255, 255);
			g.noStroke();
			for (let k = 0; k < cells; k++) {
				for (let j = 0; j < cells; j++) {
					let shape_num = int(random(2));
					let dx = int(off + j * (d + margin) + d / 2);
					let dy = int(off + k * (d + margin) + d / 2);
					g.push();
					g.translate(dx, dy);

					g.rotate((int(random(4)) * 360) / 4);
					switch (shape_num) {
						case 0:
							g.translate(-d / 2, -d / 2);
							g.scale(i / (iMax - 1));
							g.arc(0, 0, d * 2, d * 2, 0, 90);
							break;
						case 1:
							g.translate(-d / 2, -d / 2);
							g.scale(i / (iMax - 1));
							g.triangle(0, 0, d, 0, d, d);
							break;
						case 2:
							g.rectMode(CORNER);
							g.translate(-d / 2, -d / 2);
							g.scale(i / (iMax - 1));
							g.rect(0, 0, d, d);
							break;
						case 3:
							g.rectMode(CENTER);
							g.scale(i / (iMax - 1));
							g.rect(0, 0, d, d);
							break;
						case 4:
							g.rectMode(CORNER);
							g.translate(-d / 2, -d / 2);
							g.scale(i / (iMax - 1), 1);
							g.rect(0, 0, d, d);
							break;
					}

					g.pop();
				}
			}
			g.noErase();
			g.pop();
		}
		blendMode(MULTIPLY);
		drawingContext.shadowColor = color(0, 0, 0, 33);
		drawingContext.shadowBlur = width / 10;
		image(g, 0, 0);
	}
	blendMode(ADD);
	image(graphics, 0, 0);
	blendMode(SCREEN);
}

/*
PERLIN NOISE, THIS IS COOL

var particles_a = [];
var particles_b = [];
var particles_c = [];
var nums = 10;
var noiseScale = 2222;

function setup(){
	createCanvas(windowWidth, 250);
	background(0, 1, 2);
	for(var i = 0; i < nums; i++){
		particles_a[i] = new Particle(random(0, width),random(0,height));
		particles_b[i] = new Particle(random(0, width),random(0,height));
		particles_c[i] = new Particle(random(0, width),random(0,height));
	}
}

function draw(){
	noStroke();
	smooth();
		for(var i = 0; i < nums; i++){
		var radius = map(i,0,nums,1,2.5);
		var alpha = map(i,0,nums,0,250);

		// fill(69,33,124,alpha);
		fill(24,165,88,alpha)
		particles_a[i].move();
		particles_a[i].display(radius);
		particles_a[i].checkEdge();

		fill(163,235,177,alpha);
		particles_b[i].move();
		particles_b[i].display(radius);
		particles_b[i].checkEdge();

		fill(33,182,168,alpha);
		particles_c[i].move();
		particles_c[i].display(radius);
		particles_c[i].checkEdge();
	}
}


function Particle(x, y){
	this.dir = createVector(0, 0);
	this.vel = createVector(0, 0);
	this.pos = createVector(x, y);
	this.speed = 0.45;

	this.move = function(){
		var angle = noise(this.pos.x/noiseScale, this.pos.y/noiseScale)*TWO_PI*noiseScale;
		this.dir.x = cos(angle);
		this.dir.y = sin(angle);
		this.vel = this.dir.copy();
		this.vel.mult(this.speed);
		this.pos.add(this.vel);
	}

	this.checkEdge = function(){
		if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
			this.pos.x = random(50, width);
			this.pos.y = random(50, height);
		}
	}

	this.display = function(r){
		ellipse(this.pos.x, this.pos.y, r, r);
	}
}
*/
