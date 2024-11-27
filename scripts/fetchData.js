// scripts/fetchData.js
const axios = require('axios');
const fs = require('fs');

const stateUrls = [
    ["Alabama", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-alabama.json"],
    ["Alaska", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-alaska.json"],
    ["Arizona", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-arizona.json"],
    ["Arkansas", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-arkansas.json"],
    ["California", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-california.json"],
    ["Colorado", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-colorado.json"],
    ["Connecticut", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-connecticut.json"],
    ["Delaware", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-delaware.json"],
    ["Florida", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-florida.json"],
    ["Georgia", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-georgia.json"],
    ["Hawaii", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-hawaii.json"],
    ["Idaho", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-idaho.json"],
    ["Illinois", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-illinois.json"],
    ["Indiana", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-indiana.json"],
    ["Iowa", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-iowa.json"],
    ["Kansas", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-kansas.json"],
    ["Kentucky", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-kentucky.json"],
    ["Louisiana", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-louisiana.json"],
    ["Maine", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-maine.json"],
    ["Maryland", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-maryland.json"],
    ["Massachusetts", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-massachusetts.json"],
    ["Michigan", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-michigan.json"],
    ["Minnesota", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-minnesota.json"],
    ["Mississippi", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-mississippi.json"],
    ["Missouri", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-missouri.json"],
    ["Montana", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-montana.json"],
    ["Nebraska", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-nebraska.json"],
    ["Nevada", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-nevada.json"],
    ["New Hampshire", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-new-hampshire.json"],
    ["New Jersey", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-new-jersey.json"],
    ["New Mexico", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-new-mexico.json"],
    ["New York", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-new-york.json"],
    ["North Carolina", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-north-carolina.json"],
    ["North Dakota", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-north-dakota.json"],
    ["Ohio", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-ohio.json"],
    ["Oklahoma", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-oklahoma.json"],
    ["Oregon", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-oregon.json"],
    ["Pennsylvania", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-pennsylvania.json"],
    ["Rhode Island", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-rhode-island.json"],
    ["South Carolina", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-south-carolina.json"],
    ["South Dakota", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-south-dakota.json"],
    ["Tennessee", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-tennessee.json"],
    ["Texas", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-texas.json"],
    ["Utah", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-utah.json"],
    ["Vermont", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-vermont.json"],
    ["Virginia", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-virginia.json"],
    ["Washington", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-washington.json"],
    ["West Virginia", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-west-virginia.json"],
    ["Wisconsin", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-wisconsin.json"],
    ["Wyoming", "https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-wyoming.json"]
];



async function fetchElectionData(urlTarget, stateName) {
    const url = urlTarget;
    const response = await axios.get(url);
    const data = response.data;

    const races = data.races;
    const tableData = races.map(race => ({
        office: race.office,
        won: race.outcome.won,
        votes: race.outcome.electorial_votes,
    }));

    const csvHeader = 'office,won,votes\n';
    const csvRows = tableData.map(row => `${row.office},${row.won},${row.votes}}`).join('\n');
    const csvContent = csvHeader + csvRows;

    fs.writeFileSync("data/"+stateName+'_votes.json', JSON.stringify(data, null, 2));
    fs.writeFileSync("data/"+stateName+'_votes.csv', csvContent);
}



async function fetchAllStatesData() {
    for (const [stateName, url] of stateUrls) {
        await fetchElectionData(url, stateName);
    }
}

fetchAllStatesData().catch(console.error);

