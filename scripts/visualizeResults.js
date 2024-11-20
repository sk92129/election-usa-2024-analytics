// scripts/visualizeResults.js
const fs = require('fs');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

async function visualizeResults() {
    const data = JSON.parse(fs.readFileSync('../data/preprocessed_election_data_2024.json'));
    // Add visualization steps here
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 800, height: 600 });
    const configuration = {
        type: 'bar',
        data: {
            labels: data.map(row => row.state),
            datasets: [{
                label: 'Popular Vote',
                data: data.map(row => row.popular_vote),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };
    const image = await chartJSNodeCanvas.renderToBuffer(configuration);
    fs.writeFileSync('../data/popular_vote_chart.png', image);
}

visualizeResults();