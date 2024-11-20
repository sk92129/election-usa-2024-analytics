// scripts/analyzeData.js
const fs = require('fs');

function analyzeData() {
    const data = JSON.parse(fs.readFileSync('../data/preprocessed_election_data_2024.json'));
    // Add analysis steps here
    // Example: Calculate total votes
    const totalVotes = data.reduce((acc, row) => acc + parseInt(row.popular_vote, 10), 0);
    console.log(`Total Votes: ${totalVotes}`);
}

analyzeData();