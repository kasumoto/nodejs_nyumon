const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');

const index_page = fs.readFileSync('./index.ejs', 'utf-8');//同期処理でファイルを読み込み
const other_page = fs.readFileSync('./other.ejs', 'utf-8');
const style_css = fs.readFileSync('./style.css', 'utf-8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server Start!');

//メインプログラムを上でまとめる

function getFromClient(request, response) {
    var url_parts = url.parse(request.url);

    switch (url_parts.pathname) {
        case '/':
            var content = ejs.render(index_page, {
                title: "Indexページ",
                content: "これはテンプレートを使ったサンプルページです。"
            });

            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
            break;
        
            case '/other':
                var content = ejs.render(other_page, {
                    title: "Other Page",
                    content: "これは新しく用意したページです"
                });
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(content);
                response.end();
                break;

        case '/style.css':
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(style_css);
            response.end();
            break;

        default:
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end('no page');
            break;

    }
}
