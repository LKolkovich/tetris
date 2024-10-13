import LocalStorageManager from "../game/LocalStorageManager.js";

function loadLeaderboard() {
    let localStorageManager = new LocalStorageManager();
    let leadersArray = localStorageManager.getBestResultsTable();
    const leaderboardTable = document.getElementById('leaderboard').getElementsByTagName('tbody')[0];
    leaderboardTable.innerHTML = '';
    leadersArray.forEach((leader, index) => {
        let row = leaderboardTable.insertRow();
        let rankCell = row.insertCell(0);
        let usernameCell = row.insertCell(1);
        let scoreCell = row.insertCell(2);
        rankCell.textContent = index + 1;
        usernameCell.textContent = leader.username;
        scoreCell.textContent = leader.score;
    })
    console.log(leadersArray);
}

window.onload = loadLeaderboard;
