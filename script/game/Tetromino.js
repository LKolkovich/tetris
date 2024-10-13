class Tetromino {
    constructor(name, matrix) {
        this.name = name;
        this.matrix = matrix;
    }

    rotate() {
        const n = this.matrix.length - 1;
        return this.matrix.map((row, i) => row.map((val, j) => this.matrix[n - j][i]));
    }

    setMatrix(matrix) {
        this.matrix = matrix;
    }

    getMatrix() {
        return this.matrix;
    }

    getName() {
        return this.name;
    }
}

export default Tetromino;
