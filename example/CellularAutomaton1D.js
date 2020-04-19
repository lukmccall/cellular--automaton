const BG = "#EE6C4D";
const FG = "#E0FBFC";

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class CellularAutomaton1D {
  constructor(r, windowWidth, windowHeight) {
    this.windowWidth = windowWidth;
    this.windowHeight = windowHeight;
    this.gen = 0;
    this.cell_size = 14;
    this.ruleset = r;
    this.cells = Array(Math.floor(this.windowWidth / this.cell_size)).fill(0);
    this.restart();
  }

  randomize() {
    for (let i = 0; i < 8; i++) {
      this.ruleset[i] = getRndInteger(0, 1);
    }
  }

  restart() {
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i] = 0;
    }
    this.cells[Math.floor(this.cells.length / 2)] = 1;
    this.gen = 0;
  }

  step() {
    const nextgen = Array(this.cells.length).fill(0);
    for (let i = 1; i < this.cells.length - 1; i++) {
      const left = this.cells[i - 1];
      const me = this.cells[i];
      const right = this.cells[i + 1];
      nextgen[i] = this.rules(left, me, right);
    }

    this.cells = nextgen;
    this.gen++;
  }

  show() {
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i] == 1) {
        fill(color(BG));
      } else {
        fill(color(FG));
      }

      noStroke();
      rect(
        i * this.cell_size,
        this.gen * this.cell_size,
        this.cell_size,
        this.cell_size
      );
    }
  }

  rules(a, b, c) {
    if (a == 1 && b == 1 && c == 1) return this.ruleset[0];
    if (a == 1 && b == 1 && c == 0) return this.ruleset[1];
    if (a == 1 && b == 0 && c == 1) return this.ruleset[2];
    if (a == 1 && b == 0 && c == 0) return this.ruleset[3];
    if (a == 0 && b == 1 && c == 1) return this.ruleset[4];
    if (a == 0 && b == 1 && c == 0) return this.ruleset[5];
    if (a == 0 && b == 0 && c == 1) return this.ruleset[6];
    if (a == 0 && b == 0 && c == 0) return this.ruleset[7];
    return 0;
  }

  finished() {
    return this.gen > this.windowHeight / this.cell_size;
  }
}
