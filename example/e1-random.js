let ca;

let delay = 0;
function setup() {
  let cc = createCanvas(windowWidth, windowHeight);
  cc.style("display", "block");

  background(color(BG));
  ruleset = [0, 1, 0, 1, 1, 0, 1, 0];
  ca = new CellularAutomaton1D(ruleset, windowWidth, windowHeight);
  frameRate(22);
}

function draw() {
  ca.show();
  ca.step();

  if (ca.finished()) {
    delay++;
    if (delay > 30) {
      background(color(BG));
      ca.randomize();
      ca.restart();
      delay = 0;
    }
  }
}

function mousePressed() {
  background(color(BG));
  ca.randomize();
  ca.restart();
}
