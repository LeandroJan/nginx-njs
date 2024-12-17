function handle(r) {
    var bucket = "test"; // Your MinIO bucket name
    var s3_host = "minio-service:9000"; // MinIO service internal name
    var key = r.uri === "/" ? "index.html" : r.uri.substr(1); // Default to index.html

    // Construct the MinIO URL
    var s3_url = `http://${s3_host}/${bucket}/${key}`;

    console.log(`Redirecting to: ${s3_url}`); // Log for debugging

    // Perform an HTTP 302 redirect
    r.return(302, s3_url);
}

export default { handle };