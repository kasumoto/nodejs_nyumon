const http = require('http');

var server = http.createServer(
    (request,response) =>{
        response.setHeader('Content-Type', 'text/html');
        response.write('<!DOCUTYPE html><html lang=ja>');
        response.write('<head><meta charset="utf-8">');
        response.write('<title>Hello</title></head>');
        response.write('<body><h1>Hello Node.js!</h1></body>');
        response.write('<p>This is Node.js sample page.</p>');
        response.write('<p>これは、Node.jsのサンプルページです</p>','utf-8');
        response.write('</body></html>');



        //response→サーバからクライアントへの返信
        //endはそれを終了
        response.end();
    }
);
server.listen(3000);
console.log('Server Start!');