import Render from './Render.js';
import GameConfig from "./GameConfig.js";
import Game from "./Game.js";

const button = document.getElementById("startButton");

document.addEventListener('DOMContentLoaded', () => {
    const config = new GameConfig();
    const game = new Game(config);
    const render = new Render(game, config);
    render.renderName();
    button.addEventListener("click", game.startGame.bind(game));
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        switch (key) {
            case 'ArrowLeft':
                game.tetrominoController.moveTetrominoLeft();
                break;
            case 'ArrowRight':
                game.tetrominoController.moveTetrominoRight();
                break;
            case 'ArrowDown':
                game.tetrominoController.moveTetrominoDown();
                break;
            case 'ArrowUp':
            case ' ':
                console.log(123);
                game.tetrominoController.rotateTetromino();
                break;
            default:
                break;
        }
    });
});