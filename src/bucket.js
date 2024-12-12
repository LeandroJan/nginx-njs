async function handle(r) {
    var bucket = "test"; // Your MinIO bucket name
    var s3_host = "minio-service:9000"; // MinIO service within OpenShift
    var key = r.uri === "/" ? "index.html" : r.uri.substr(1); // Default to index.html

    // Construct the S3 URL
    var s3_url = `http://${s3_host}/${bucket}/${key}`;
    console.log(s3_url); // Log for debugging

    try {
        // Use fetch to retrieve the object from MinIO
        let response = await fetch(s3_url);

        if (response.ok) {
            let body = await response.text(); // Get response body
            r.headersOut["Content-Type"] = "text/html"; // Set HTML content type
            r.return(200, body); // Serve the file content
        } else {
            r.return(404, `File not found: ${key}`); // Return 404 for missing files
        }
    } catch (err) {
        console.error(`Error fetching from MinIO: ${err.message}`);
        r.return(500, "Internal Server Error"); // Return 500 on fetch failure
    }
}

export default { handle };