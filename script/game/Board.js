class Board {

    static UNFILLED = 0;

    constructor(shape) {
        this.width = shape.width;
        this.height = shape.height;
        this.board = this.createEmptyBoard();
    }

    createEmptyBoard() {
        let board = [];
        for(let i = 0; i < this.height; i++) {
            board[i] = this.getEmptyArray();
        }
        return board;
    }

    fill(row, col, color) {
        this.setValue(row, col, color)
    }

    unfill(row, col) {
        this.setValue(row, col, Board.UNFILLED)
    }

    clear() {
        this.board.forEach((row, rowIndex) => row.forEach((cellValue, colIndex) => {
            this.unfill(rowIndex, colIndex);
        }))
    }

    setValue(row, col, value) {
        if (row >= 0 && col >= 0 && row < this.height && col < this.width) {
            this.board[row][col] = value;
        }
    }

    getBoard() {
        return this.board;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    removeRow(row) {
        this.board.splice(row, 1);
        this.board.unshift(this.getEmptyArray());
    }

    getEmptyArray() {
        return new Array(this.width).fill(Board.UNFILLED);
    }
}

export default Board;
