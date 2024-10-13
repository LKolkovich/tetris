class TetrominoController {

    static MOVE_LEFT = -1;
    static MOVE_RIGHT = 1;

    constructor(tetrominoInfo, board, eventEmitter) {
        this.parseTetrominoInfo(tetrominoInfo);
        this.board = board;
        this.eventEmitter = eventEmitter;
    }

    setTetromino(tetrominoInfo) {
        this.parseTetrominoInfo(tetrominoInfo);
    }

    parseTetrominoInfo(tetrominoInfo) {
        this.tetromino = tetrominoInfo.tetromino;
        this.row = tetrominoInfo.row;
        this.col = tetrominoInfo.col;
    }

    rotateTetromino() {
        const temp = this.tetromino.rotate();
        if (this.isCorrectMove(temp, this.row, this.col)) {
            this.tetromino.setMatrix(temp);
        }
    }

    isCorrectMove(matrix, currentRow, currentCol) {
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col] && (
                    currentRow + row < 0 || currentRow + row >= this.board.height ||
                    currentCol + col < 0 || currentCol + col >= this.board.width ||
                    this.board.getBoard()[currentRow + row][currentCol + col])
                ) {
                    return false;
                }
            }
        }
        return true;
    }

    moveTetromino(offset) {
        const newCol = this.col + offset;
        if(this.isCorrectMove(this.tetromino.getMatrix(), this.row, newCol)) {
            this.col = newCol;
        }
    }

    moveTetrominoLeft() {
        this.moveTetromino(TetrominoController.MOVE_LEFT);
    }

    moveTetrominoRight() {
        this.moveTetromino(TetrominoController.MOVE_RIGHT);
    }

    moveTetrominoDown() {
        const newRow = this.row + 1;
        if(this.isCorrectMove(this.tetromino.getMatrix(), newRow, this.col)) {
            this.row = newRow;
        } else {
            this.putTetromino();
        }
    }

    putTetromino() {
        this.tetromino.getMatrix().forEach((row, rowIndex) => {row.forEach((val, colIndex) => {
            if (val) {
                this.board.fill(this.row + rowIndex, this.col + colIndex, this.tetromino.getName());
            }
        })})
       let rowFilled = this.handleFilledRow();
        if (rowFilled > 0) {
            this.eventEmitter.dispatch('rowFilled', rowFilled);
        }
        this.eventEmitter.dispatch('tetrominoPlaced');

        if (!this.isCorrectMove(this.tetromino.getMatrix(), this.row, this.col)) {
            this.eventEmitter.dispatch('gameOver');
        }
    }

    handleFilledRow() {
        let rowFilled = 0;
        for(let row = this.board.height - 1; row >= 0;) {
            if (this.board.getBoard()[row].every(cell => cell !== 0)) {
                this.#clearRow(row);
                rowFilled++;
            } else {
                row--;
            }
        }
        return rowFilled;
    }

    #clearRow(row) {
        this.board.removeRow(row);
    }

    getTetrominoName() {
        return this.tetromino.name;
    }

    getCurrentRow() {
        return this.row;
    }

    getCurrentCol() {
        return this.col;
    }
}

export default TetrominoController;