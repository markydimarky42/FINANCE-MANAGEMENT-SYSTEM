document.querySelector('.nav-link a[href="#profile"]').addEventListener('click', function (e) {
    e.preventDefault();
    fetch('profile.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
        });
});