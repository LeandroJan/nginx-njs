function handle(r) {
    var key = r.uri === "/" ? "index.html" : r.uri.substr(1);

    // Redirect to the named location with the path dynamically appended
    r.internalRedirect(`@minio_proxy/test/${key}`);
}

export default { handle };