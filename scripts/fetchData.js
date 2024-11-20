// scripts/fetchData.js
const axios = require('axios');
const fs = require('fs');

async function fetchElectionData() {
    const url = 'https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-ohio.json';
    const response = await axios.get(url);
    const data = response.data;

    const counties = data.counties;
    const tableData = counties.map(county => ({
        county: county.name,
        votes: county.votes,
        candidate: county.candidate,
        party: county.party
    }));

    const csvHeader = 'County,Votes,Candidate,Party\n';
    const csvRows = tableData.map(row => `${row.county},${row.votes},${row.candidate},${row.party}`).join('\n');
    const csvContent = csvHeader + csvRows;

    fs.writeFileSync('../data/ohio_county_votes.csv', csvContent);
}

fetchElectionData().catch(console.error);