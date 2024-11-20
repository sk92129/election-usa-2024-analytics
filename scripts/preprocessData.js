// scripts/preprocessData.js
const fs = require('fs');
const csv = require('csv-parser');

function preprocessData() {
    const results = [];
    fs.createReadStream('../data/election_data_2024.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            // Add preprocessing steps here
            fs.writeFileSync('../data/preprocessed_election_data_2024.json', JSON.stringify(results, null, 2));
        });
}

preprocessData();