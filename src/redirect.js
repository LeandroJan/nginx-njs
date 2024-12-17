function handle(r) {
    var key = r.uri === "/" ? "index.html" : r.uri.substr(1);

    // Perform an internal redirect to the named location
    r.internalRedirect(`@minio_proxy/${key}`);
}

export default { handle };