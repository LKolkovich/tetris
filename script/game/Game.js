import Board from './Board.js';
import ScoreManager from './ScoreManager.js';
import TetrominoController from './TetrominoController.js'
import EventEmitter from "./EventEmitter.js";
import Tetromino from "./Tetromino.js";

class Game {

    constructor(config) {
        this.tetrominoShapes = config.tetrominoShapes;
        this.boardShape = config.boardShape;
        this.board = new Board(this.boardShape);
        this.eventEmitter = new EventEmitter();
        this.scoreManager = new ScoreManager(this.eventEmitter);
        this.isGameOver = false;
        this.animationFrame = null;
        this.frameCount = 0;
        this.minFrames = config.minFrames;
        this.maxFrames = config.maxFrames;
        this.currentFrames = this.maxFrames;
        this.reloadGame();
        this.eventEmitter.subscribe('gameOver', this.scoreManager.saveScore.bind(this.scoreManager));
        this.eventEmitter.dispatch('startGame');
    }

    gameOver() {
        this.isGameOver = true;
        cancelAnimationFrame(this.animationFrame);
        this.eventEmitter.dispatch('gameOver');
        this.eventEmitter.unsubscribe('tetrominoPlaced', this.placeTetromino.bind(this));
        this.eventEmitter.unsubscribe('tetrominoPlaced', this.updateSpeed.bind(this));
    }

    reloadGame() {
        this.isGameOver = false;
        this.board.clear();
        cancelAnimationFrame(this.animationFrame);
        this.nextTetrominoInfo = this.createNextTetromino();
        this.tetrominoController = new TetrominoController(this.createNextTetromino(), this.board, this.eventEmitter);
        this.scoreManager.reload();
        this.updateSpeed();
    }

    createNextTetromino() {
        const tetrominoKeys = Object.keys(this.tetrominoShapes);
        const randomKey = Math.floor(Math.random() * tetrominoKeys.length);
        const tetrominoType = tetrominoKeys[randomKey];
        const col = this.board.width / 2 - Math.ceil(this.tetrominoShapes[tetrominoType][0].length / 2);
        const row = name === 'I' ? 0 : -1;
        const tetromino = new Tetromino(tetrominoType, this.tetrominoShapes[tetrominoType]);
        return {tetromino, row, col};
    }

    startGame() {
        this.reloadGame()
        this.eventEmitter.subscribe('gameOver', this.gameOver.bind(this));
        this.eventEmitter.subscribe('tetrominoPlaced', this.placeTetromino.bind(this));
        this.eventEmitter.subscribe('tetrominoPlaced', this.updateSpeed.bind(this));

        const gameLoop = () => {
            this.animationFrame = requestAnimationFrame(gameLoop);
            this.eventEmitter.dispatch('render');

            if(++this.frameCount >= this.currentFrames) {
                this.tetrominoController.moveTetrominoDown();
                this.frameCount = 0;
            }
        }
        this.animationFrame = requestAnimationFrame(gameLoop);
    }

    updateSpeed() {
        this.currentFrames = Math.max(this.maxFrames - (this.scoreManager.getScore()) / 30, this.minFrames);
    }

    placeTetromino() {
        this.tetrominoController.setTetromino(this.nextTetrominoInfo);
        this.nextTetrominoInfo = this.createNextTetromino();
        console.log(this.nextTetrominoInfo.tetromino.name);
    }

    subcribeEvent(eventName, listener) {
        this.eventEmitter.subscribe(eventName, listener);
    }

    getBoardWidth() {
        return this.board.getWidth();
    }

    getBoardHeight() {
        return this.board.getHeight();
    }

    getCurrentRow() {
        return this.tetrominoController.getCurrentRow();
    }

    getCurrentCol() {
        return this.tetrominoController.getCurrentCol();
    }

    getCurrentTetrominoName() {
        return this.tetrominoController.getTetrominoName();
    }

    getNextTetrominoName() {
        return this.nextTetrominoInfo.tetromino.name;
    }

    getBoard() {
        return this.board.getBoard();
    }

    getCurrentTetrominoMatrix() {
        return this.tetrominoController.tetromino.getMatrix();
    }

    getScore() {
        return this.scoreManager.getScore();
    }
}

export default Game;
