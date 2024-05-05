document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(this);

    fetch('submit.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('response').innerHTML = data;
        document.getElementById('feedbackForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
