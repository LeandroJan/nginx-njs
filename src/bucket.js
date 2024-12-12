async function handle(r) {
    var bucket = "test"; // Replace with your MinIO bucket name
    var s3_host = "minio-service:9000"; // MinIO service within OpenShift
    var key = r.uri === "/" ? "index.html" : r.uri.substr(1); // Serve index.html by default

    // Construct the S3 URL
    var s3_url = `http://${s3_host}/${bucket}/${key}`;
    print(s3_url);

    // Fetch the object from MinIO
    r.subrequest(s3_url, function (res) {
        if (res.status === 200) {
            r.headersOut["Content-Type"] = "text/html"; // Set HTML content type
            r.return(res.status, res.responseBody);
        } else {
            r.return(404, "File not found inside the bucket"); // Return a 404 if the object is missing
        }
    });
}

export default { handle };