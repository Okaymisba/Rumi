document.getElementById('repoForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const repoUrl = document.getElementById('repoUrl').value;

        window.location.href = `Result.html?repoUrl=${encodeURIComponent(repoUrl)}`;
        });
