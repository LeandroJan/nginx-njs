function hello(r) {
    r.headersOut['Content-Type'] = 'text/plain';
    r.return(200, "Hello, NJS!\n");
}

export default { hello };