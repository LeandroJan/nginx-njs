function handle(r) {
    var key = r.uri === "/" ? "index.html" : r.uri.substr(1);

    // Redirect to the /s3/ location, appending the key
    r.internalRedirect(`/s3/${key}`);
}

export default { handle };