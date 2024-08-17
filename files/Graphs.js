const urlParams = new URLSearchParams(window.location.search);
        const repoUrl = urlParams.get('repoUrl');

      (async () => {
          try {
          document.getElementById('loading').style.display = 'block';
              const response = await fetch('/lineCounter', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ repoUrl }),
              });

              document.getElementById('loading').style.display = 'none';

              if (response.ok) {
                  const data = await response.json();
                  console.log(data);
                  populateTable(data);
                  plotChartForAdd(data);
                  plotChartForRemove(data);
              } else {
                  console.error('Server returned an error:', await response.text());
              }
          } catch (error) {
          document.getElementById('loading').style.display = 'none';
              console.error('Fetch failed:', error);
          }
      })();

    function plotChartForAdd(data) {
        const ctx = document.getElementById('lineChartForAdd').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.date,
                datasets: [{
                    label: 'Number of Lines Added',
                    data: data.linesAdded,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                }]
            },
            options: {
            layout:{
                   padding: {
                   right: 40
                   }
                 },
            responsive: true,
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

    function plotChartForRemove(data) {
        const ctx = document.getElementById('lineChartForRemove').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.date,
                datasets: [{
                    label: 'Number of Lines Removed',
                    data: data.linesRemoved,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                }]
            },
            options: {
            layout:{
                   padding: {
                   right: 40
                   }
                 },
            responsive: true,
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

    function populateTable(data) {

            let html = `
          <table>
            <thead>
              <tr>
                <th><strong>Extension</strong></th>
                <th><strong>Number Of Lines</strong></th>
              </tr>
            </thead>
            <tbody>
        `;

            for (const [extension , lines ] of Object.entries(data.extensionLineCounts)) {
                 html += `
              <tr>
                <td>${extension}</td>
                <td>${lines}</td>
              </tr>
            `;
            }

            html += `
            <tr>
              <td style = "background-color: #333; color: white;"><strong>Total Lines</strong></td>
              <td style = "background-color: #333; color: white;"><strong></strong>${data.totalLines}</td>
            </tr>
          </tbody>
        </table>
      `;
            document.getElementById('table-container').innerHTML = html;
         }