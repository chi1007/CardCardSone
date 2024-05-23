document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('feedbackForm').addEventListener('submit', function(event) {
        event.preventDefault();

        var formData = new FormData(this);

        fetch('/api_contact/contact', { // 改為 Flask 後端的 URL
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            document.getElementById('mail-response').innerHTML = data;
            document.getElementById('feedbackForm').reset();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
