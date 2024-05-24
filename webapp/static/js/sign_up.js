<script>
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('signUpForm').addEventListener('submit', function(event) {
            event.preventDefault();

            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            var confirmPassword = document.getElementById('confirm_password').value;

            // 檢查密碼和確認密碼是否相符
            if (password !== confirmPassword) {
                alert('密碼與確認密碼不相符');
                return;
            }

            var formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);

            fetch('/sign_up', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                alert(data); // 在這裡顯示服務器返回的響應消息
                document.getElementById('signUpForm').reset();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        })
    })
</script>
