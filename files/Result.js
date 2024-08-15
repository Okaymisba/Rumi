 const urlParams = new URLSearchParams(window.location.search);
        const repoUrl = urlParams.get('repoUrl');

      (async () => {
          try {
              const response = await fetch('/api/process', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ repoUrl }),
              });

              if (response.ok) {
                  const data = await response.json();
                  plotChart(data);
              } else {
                  console.error('Server returned an error:', await response.text());
              }
          } catch (error) {
              console.error('Fetch failed:', error);
          }
      })();

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
                        reverse: true,
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