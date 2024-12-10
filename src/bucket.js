// Importing necessary modules
function handle(r) {
    var bucket = "test"; // Replace with your MinIO bucket name
    var s3_host = "minio-service:9000"; // MinIO service in OpenShift
    var key = r.uri.substr(1); // Strip leading "/"

    // Construct the S3 URL
    var s3_url = `http://${s3_host}/${bucket}/${key}`;

    r.headersOut["Host"] = s3_host; // MinIO expects Host headers
    r.return(302, s3_url); // Redirect client to S3 URL
}

export default { handle };