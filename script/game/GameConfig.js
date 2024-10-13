class GameConfig {
    constructor() {
        this.tetrominoShapes = {
            I: [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            O: [
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0]
            ],
            T: [
                [0, 0, 0, 0],
                [0, 1, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0]
            ],
            S: [
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0]
            ],
            Z: [
                [0, 0, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0]
            ],
            J: [
                [0, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0]
            ],
            L: [
                [0, 0, 0, 0],
                [0, 0, 1, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0]
            ]
        };

        this.colors = {
            I: 'cyan',
            O: 'yellow',
            T: 'purple',
            S: 'green',
            Z: 'red',
            J: 'blue',
            L: 'orange',
            0: '#151515'
        };

        this.boardShape = { width: 10, height: 20 };
        this.gameCanvas = document.getElementById('gameCanvas');
        this.nextPieceCanvas = document.getElementById('nextCanvas');
        this.score = document.getElementById('score');
        this.bestResult = document.getElementById('best');
        this.minFrames = 15;
        this.maxFrames= 75;
        this.username = document.getElementById('username');
    }
}

export default GameConfig;