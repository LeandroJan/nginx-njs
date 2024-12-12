function get(r) {
    var http = require('http');

    var options = {
        host: 'minio-service', // Substitua pelo nome do serviço MinIO no OpenShift
        port: 9000, // Porta do MinIO
        path: '/test/sample.html', // Substitua pelo nome do bucket e chave do objeto
        method: 'GET'
    };

    var req = http.request(options, function(res) {
        var body = '';

        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
            r.return(res.statusCode, body);
        });
    });

    req.on('error', function(e) {
        r.return(500, 'Error: ' + e.message);
    });

    req.end();
}

export default {get};