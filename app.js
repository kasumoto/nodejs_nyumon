const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf-8');//同期処理でファイルを読み込み
const other_page = fs.readFileSync('./other.ejs', 'utf-8');
const style_css = fs.readFileSync('./style.css', 'utf-8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server Start!');

//メインプログラムを上でまとめる

function getFromClient(request, response) {
    var url_parts = url.parse(request.url, true);

    switch (url_parts.pathname) {

        case '/':
            response_index(request, response);
            break;
        /* 
       
        break; */

        case '/other':
            response_other(request, response);
            break;
        /*
        break; */

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

var data = { msg: 'no messaga...' };
//indexのアクセス処理
function response_index(request, response) {

    //POST時のアクセス処理
    if (request.method == 'POST') {
        var body = '';

        //データ受信時のイベント処理
        request.on('data', (data) => {
            body += data;
        });

        //データ受信終了のイベント処理
        request.on('end', () => {
            data = qs.parse(body);
            //クッキーの保存
            setCookie('msg', data.msg, response);
            write_index(request, response);
        });
    } else {
        write_index(request, response);
    }
}

//indexページ作成
function write_index(request, response) {
    var msg = '※伝言板を表示します';
    var cookie_data = getCookie('msg', request);
    var content = ejs.render(index_page, {
        title: "Index",
        content: msg,
        data: data,
        cookie_data:cookie_data,
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}

//クッキーの値を設定
function setCookie(key, value, response) {
    var cookie = escape(value);
    response.setHeader('Set-Cookie', [key + '=' + cookie]);
}

//クッキーの値を取得
function getCookie(key, request) {
    var rhCookie = request.headers.cookie;
    var cookie_data = 
    rhCookie != undefined?　rhCookie : ``; //クッキーがundefindeなら空のテキストを取出す
    var data = cookie_data.split(';');//配列にする
    for(var i in data){
        if (data[i].trim().startsWith(key + '=')) {//前後の空白消すkey=で始まるかチェック
            var result = data[i].trim().substring(key.length + 1);
            return unescape(result);//クッキーの普通のテキストに戻す
        }
    }
    return '';
}
//Otherのアクセス処理
var data2 = {
    'Taro': ['taro@yamada.com', '09-0999-333', 'Tokyo'],
    'Hanako': ['Hanako@miyashita.com', '09-09990-453', 'Sapporo'],
    'Maruto': ['Maruto@sawada.com', '09-099-8888', 'NewYork'],
    'Katuro': ['Katuro@isono.com', '09-0923-555', 'Hukushima']
};

function response_other(request, response) {
    var msg = 'これはOtherページです。';

    //POSTアクセス時の処理
    if (request.method == 'POST') {
        var body = '';

        //データ受信のイベント処理
        request.on('data', (data) => { //引数には受けとった(入力された)データが入ってる
            body += data;
        });

        //データ受信終了のイベント処理
        request.on('end', () => {
            var post_data = qs.parse(body); //データのパース
            msg += 'あなたは、「' + post_data.message + '」と書きました。';
            var content = ejs.render(other_page, {
                title: 'Other',
                content: msg,
                data: data2,
                filename: 'data_item'
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
        })
    } else {
        var msg = 'ページはありません';
        var content = ejs.render(other_page, {
            title: 'Other',
            content: msg,
        });
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(content);
        response.end();
    }
}