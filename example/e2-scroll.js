let ca;

let delay = 0;
let slider;
let input;
let button;

function setup() {
  let cc = createCanvas(windowWidth, windowHeight);
  cc.style("display", "block");

  background(color(BG));
  ruleset = [0, 1, 0, 1, 1, 0, 1, 0];
  ca = new CellularAutomaton1DScroll(ruleset, windowWidth, windowHeight);

  slider = createSlider(1, 60, 14);
  slider.position(10, 10);
  slider.style("width", "80px");

  input = createInput();
  input.position(slider.x + slider.width + 10, 10);

  button = createButton("submit");
  button.position(input.x + input.width + 10, 10);
  button.mousePressed(reset);
}

function draw() {
  frameRate(slider.value());
  background(color(BG));
  ca.show();
  ca.step();
}

function reset() {
  background(color(BG));
  ca.setRulsetFromDec(parseInt(input.value()));
  ca.restart();
}
