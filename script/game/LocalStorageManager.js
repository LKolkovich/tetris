class LocalStorageManager {

    static currentUserKey = 'currentUser';
    static bestResultKey = 'bestTable';

    constructor() {}

    getUserName() {
        return localStorage.getItem(LocalStorageManager.currentUserKey);
    }

    saveUserName(username) {
        localStorage.setItem('currentUser', username);
    }

    saveUserBestResult(score) {
        let currentUserName = localStorage.getItem(LocalStorageManager.currentUserKey);
        let bestScores = JSON.parse(localStorage.getItem(LocalStorageManager.bestResultKey)) || {};
        if (!bestScores[localStorage.getItem(LocalStorageManager.currentUserKey)] ||
            score > bestScores[LocalStorageManager.currentUserKey]
        ) {
            bestScores[currentUserName] = score;
        }
        localStorage.setItem(LocalStorageManager.bestResultKey, JSON.stringify(bestScores));
    }

    getUserBestResult() {
        let bestScores = JSON.parse(localStorage.getItem(LocalStorageManager.bestResultKey)) || {};
        return bestScores[localStorage.getItem(LocalStorageManager.currentUserKey)];
    }

    getBestResultsTable() {
        let bestScores = JSON.parse(localStorage.getItem('bestTable')) || {};
        let leadersArray = Object.entries(bestScores).map(([username, score]) => ({username, score}));
        leadersArray.sort((a, b) => b.score - a.score);
        return leadersArray;
    }
}

export default LocalStorageManager;