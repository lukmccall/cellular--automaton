const BG = "#EE6C4D";
const FG = "#E0FBFC";

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Cell {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;

    this.state = getRndInteger(0, 1);
    this.previous = this.state;
  }

  savePrevious() {
    this.previous = this.state;
  }

  newState(s) {
    this.state = s;
  }

  display() {
    if (this.previous == 0 && this.state == 1) {
      fill(0, 0, 255);
    } else if (this.state == 1) {
      fill(0);
    } else if (this.previous == 1 && this.state == 0) {
      fill(255, 0, 0);
    } else {
      fill(255);
    }
    stroke(0);
    rect(this.x, this.y, this.w, this.w);
  }
}
