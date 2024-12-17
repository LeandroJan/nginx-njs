function handle(r) {
    var bucket = "test"; // MinIO bucket name
    var s3_host = "minio-service:9000"; // Service name with port
    var key = r.uri === "/" ? "index.html" : r.uri.substr(1);

    var s3_url = `http://${s3_host}/${bucket}/${key}`;

    ngx.fetch(s3_url)
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error(`Failed to fetch from MinIO: ${response.status}`);
            }
        })
        .then(data => {
            r.headersOut['Content-Type'] = 'text/html';
            r.return(200, data);
        })
        .catch(error => {
            r.return(502, `Error: ${error.message}`);
        });
}

export default { handle };