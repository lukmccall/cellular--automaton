let gol;

let slider;

function setup() {
  let cc = createCanvas(windowWidth, windowHeight);
  cc.style("display", "block");

  slider = createSlider(1, 60, 22);
  slider.position(10, 10);
  slider.style("width", "80px");

  background(color(BG));
  gol = new GameOfLife(windowWidth, windowHeight);
}

function draw() {
  background(255);

  gol.generate();
  gol.display();
}

function mousePressed() {
  frameRate(slider.value());
  gol.init();
}
