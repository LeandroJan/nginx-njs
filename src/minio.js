function get(r) {
    var url = 'http://minio-service:9000/test/sample.html'; // Substitua pelo nome do serviço MinIO, bucket e chave do objeto

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            r.return(200, data);
        })
        .catch(error => {
            r.return(500, 'Error: ' + error.message);
        });
}

export default {get};