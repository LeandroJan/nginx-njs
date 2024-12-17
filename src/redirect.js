function handle(r) {
    var key = r.uri === "/" ? "index.html" : r.uri.substr(1);

    // Perform an internal subrequest to fetch content
    r.internalRedirect(`@minio_proxy${key}`);
}

export default { handle };