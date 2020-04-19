class GameOfLife {
  constructor(width, height) {
    this.cell_size = 20;
    this.cols = Math.floor(width / this.cell_size);
    this.rows = Math.floor(height / this.cell_size);

    this.board = new Array(this.cols)
      .fill(0)
      .map(() => new Array(this.rows).fill(0));
    this.init();
  }

  init() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.board[i][j] = new Cell(
          i * this.cell_size,
          j * this.cell_size,
          this.cell_size
        );
      }
    }
  }

  generate() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.board[i][j].savePrevious();
      }
    }

    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        let neighbors = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            neighbors += this.board[(x + i + this.cols) % this.cols][
              (y + j + this.rows) % this.rows
            ].previous;
          }
        }
        neighbors -= this.board[x][y].previous;

        if (this.board[x][y].state == 1 && neighbors < 2) {
          this.board[x][y].newState(0);
        } else if (this.board[x][y].state == 1 && neighbors > 3) {
          this.board[x][y].newState(0);
        } else if (this.board[x][y].state == 0 && neighbors == 3) {
          this.board[x][y].newState(1);
        }
      }
    }
  }

  display() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.board[i][j].display();
      }
    }
  }
}
