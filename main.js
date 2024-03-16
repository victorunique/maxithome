document.getElementById('fetchBtn').addEventListener('click', function() {
    const targetURL = document.getElementById('targetURL').value;
    fetch(`/.netlify/functions/fetchURL?url=${encodeURIComponent(targetURL)}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('displayFrame').contentWindow.document.open();
            document.getElementById('displayFrame').contentWindow.document.write(data);
            document.getElementById('displayFrame').contentWindow.document.close();
        })
        .catch(error => console.error('Error fetching the URL:', error));
});
