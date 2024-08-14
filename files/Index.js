document.getElementById('repoForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const repoUrl = document.getElementById('repoUrl').value;
        const response = await fetch('/api/process', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ repoUrl }),
        });

        if (response.ok) {
            const data = await response.json();
            plotChart(data);
        } else {
            console.error('Error fetching data');
        }
    });

    function plotChart(data) {
        const ctx = document.getElementById('lineChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Number of Lines Added/Removed',
                    data: data.values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Number of Lines'
                        }
                    }
                }
            }
        });
    }