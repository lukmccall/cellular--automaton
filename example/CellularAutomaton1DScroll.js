const BG = "#EE6C4D";
const FG = "#E0FBFC";

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class CellularAutomaton1DScroll {
  constructor(r, windowWidth, windowHeight) {
    this.windowWidth = windowWidth;
    this.windowHeight = windowHeight;
    this.gen = 0;
    this.cell_size = 14;
    this.ruleset = r;
    this.cols = Math.floor(windowWidth / this.cell_size);
    this.rows = Math.floor(windowHeight / this.cell_size);
    this.matrix = new Array(this.cols)
      .fill(0)
      .map(() => new Array(this.rows).fill(0));
    this.restart();
  }

  setRulsetFromDec(dec) {
    const bin = dec.toString(2);
    this.ruleset = new Array(8).fill(0);
    for (let i = 0; i < bin.length; i++) {
      this.ruleset[this.ruleset.length - bin.length + i] = parseInt(bin[i]);
    }
  }

  randomize() {
    for (let i = 0; i < 8; i++) {
      this.ruleset[i] = getRndInteger(0, 1);
    }
  }

  restart() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.matrix[i][j] = 0;
      }
    }
    this.matrix[Math.floor(this.cols / 2)][0] = 1;
    this.generation = 0;
  }

  step() {
    for (let i = 0; i < this.cols; i++) {
      const left = this.matrix[(i + this.cols - 1) % this.cols][
        this.generation % this.rows
      ];
      const me = this.matrix[i][this.generation % this.rows];
      const right = this.matrix[(i + 1) % this.cols][
        this.generation % this.rows
      ];
      this.matrix[i][(this.generation + 1) % this.rows] = this.rules(
        left,
        me,
        right
      );
    }
    this.generation++;
  }

  show() {
    const offset = this.generation % this.rows;

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        let y = j - offset;
        if (y <= 0) {
          y = this.rows + y;
        }
        if (this.matrix[i][j] == 1) {
          fill(color(FG));
          noStroke();
          rect(
            i * this.cell_size,
            (y - 1) * this.cell_size,
            this.cell_size,
            this.cell_size
          );
        } else {
          fill(color(BG));
        }
      }
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
