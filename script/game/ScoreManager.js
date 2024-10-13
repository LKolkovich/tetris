import LocalStorageManager from './LocalStorageManager.js';

class ScoreManager {

    static additionalScore = [0, 100, 300, 700, 1500];
    static currentUserKey = 'currentUser';
    static bestResultKey = 'bestTable';

    constructor(evenEmitter) {
        this.currentScore = 0;
        this.eventEmitter = evenEmitter;
        this.eventEmitter.subscribe('rowFilled', this.addScore.bind(this));
        this.eventEmitter.subscribe('gameOver', this.saveScore.bind(this));
        this.localStorageManager = new LocalStorageManager();
    }

    addScore(rowFilled) {
        this.currentScore += ScoreManager.additionalScore[rowFilled];
    }

    resetScore() {
        this.currentScore = 0;
    }

    saveScore() {
        this.localStorageManager.saveUserBestResult(this.currentScore);
    }

    getScore() {
        return this.currentScore;
    }

    reload() {
        this.saveScore();
        this.resetScore();
    }
}

export default ScoreManager;
