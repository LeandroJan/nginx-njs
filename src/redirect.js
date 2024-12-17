function handle(r) {
    var bucket = "test"; // MinIO bucket name
    var s3_host = "minio-service:9000"; // Internal MinIO service
    var key = r.uri === "/" ? "index.html" : r.uri.substr(1); // Default to index.html

    // Construct the internal MinIO URL
    var s3_url = `http://${s3_host}/${bucket}/${key}`;

    // Fetch the content from MinIO
    ngx.fetch(s3_url)
        .then(response => {
            if (response.ok) {
                return response.text(); // Get the response body as text
            } else {
                throw new Error(`Failed to fetch from MinIO: ${response.status}`);
            }
        })
        .then(data => {
            // Serve the fetched content as the response
            r.headersOut['Content-Type'] = 'text/html'; // Adjust content type if necessary
            r.return(200, data);
        })
        .catch(error => {
            // Handle errors (e.g., MinIO unreachable or file not found)
            r.return(502, `Error: ${error.message}`);
        });
}

export default { handle };