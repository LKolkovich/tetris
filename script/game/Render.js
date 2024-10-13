import LocalStorageManager from "./LocalStorageManager.js";

class Render {
    constructor(game, config) {
        this.game = game;
        this.tetrominoShapes = config.tetrominoShapes;
        this.colors = config.colors;
        this.gameCanvas = config.gameCanvas;
        this.gameCanvasContext = this.gameCanvas.getContext('2d');
        this.nextPieceCanvas = config.nextPieceCanvas;
        this.nextPieceCanvasContext = this.nextPieceCanvas.getContext('2d');
        this.score = config.score;
        this.username = config.username;
        this.localStorageManager = new LocalStorageManager();
        this.game.subcribeEvent('gameOver', this.renderGameOver.bind(this));
        this.game.subcribeEvent('render', this.renderGame.bind(this));
    }

    renderGame() {
        this.gameCanvasContext.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
        this.nextPieceCanvasContext.clearRect(0, 0, this.nextPieceCanvas.width, this.nextPieceCanvas.height);
        this.renderBoard();
        this.renderTetromino();
        this.renderNextTetromino();
        this.fillScore();
    }

    renderName() {
        this.username.innerText = this.localStorageManager.getUserName();
    }

    renderBoard() {
        this.game.getBoard().forEach((row, rowIndex) => row.forEach((cellValue, colIndex) => {
            this.gameCanvasContext.fillStyle = this.colors[cellValue];
            this.gameCanvasContext.fillRect(
                colIndex * (this.gameCanvas.width / this.game.getBoardWidth()),
                rowIndex * (this.gameCanvas.height / this.game.getBoardHeight()),
                (this.gameCanvas.width / this.game.getBoardWidth()) - 1,
                (this.gameCanvas.height / this.game.getBoardHeight()) - 1
            );
        }))
    }

    renderTetromino() {
        this.gameCanvasContext.fillStyle = this.colors[this.game.getCurrentTetrominoName()];
        this.game.getCurrentTetrominoMatrix().forEach((row, rowIndex) => {
            row.forEach((cellValue, colIndex) => {
                if (cellValue) {
                    this.gameCanvasContext.fillRect(
                        (this.game.getCurrentCol() + colIndex) * (this.gameCanvas.width / this.game.getBoardWidth()),
                        (this.game.getCurrentRow() + rowIndex) * (this.gameCanvas.height / this.game.getBoardHeight()),
                        (this.gameCanvas.width / this.game.getBoardWidth()) - 1,
                        (this.gameCanvas.height / this.game.getBoardHeight()) - 1
                    );
                }
        })});
    }

    renderNextTetromino() {
        const additionalOffset = ['I', 'O'].includes(this.game.getNextTetrominoName()) ? 0 : 0.5;
        this.nextPieceCanvasContext.fillStyle = this.colors[this.game.getNextTetrominoName()];
        this.tetrominoShapes[this.game.getNextTetrominoName()].forEach((row, rowIndex) => {
            row.forEach((cellValue, colIndex) => {
                if (cellValue) {
                    this.nextPieceCanvasContext.fillRect(
                        (colIndex + additionalOffset) * (this.nextPieceCanvas.width / row.length),
                        rowIndex * (this.nextPieceCanvas.height / row.length),
                        (this.nextPieceCanvas.width / row.length) - 1,
                        (this.nextPieceCanvas.height / this.tetrominoShapes[this.game.getNextTetrominoName()].length) - 1
                    );
                }
        })});
    }

    fillScore() {
        this.score.innerText = this.game.getScore();
    }

    renderGameOver() {
        this.gameCanvasContext.fillStyle = 'black';
        this.gameCanvasContext.globalAlpha = 0.75;
        this.gameCanvasContext.fillRect(0, this.gameCanvas.height / 2 - 30, this.gameCanvas.width, 60);

        this.gameCanvasContext.globalAlpha = 1;
        this.gameCanvasContext.fillStyle = 'white';
        this.gameCanvasContext.font = '36px monospace';
        this.gameCanvasContext.textAlign = 'center';
        this.gameCanvasContext.textBaseline = 'middle';
        this.gameCanvasContext.fillText('Игра окончена', this.gameCanvas.width / 2, this.gameCanvas.height / 2);
    }
}

export default Render;