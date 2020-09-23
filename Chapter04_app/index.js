var express = require('express');
var ejs = require('ejs');

var app = express();
app.engine('ejs', ejs.renderFile);
app.use(express.static('public'));

var bodyParser = require('body-parser'); 
//以下URLエンコードされたボディを返す
//フォームの内容が変換されて取り出される
app.use(bodyParser.urlencoded({extended: false}));

var data = {
    'Taro':'taro@yamada',
    'Hanako':'hanako@flower',
    'Sachiko':'sachiko@happy',
    'Ichiro':'ichiro@baseball'
};

app.get('/', (req, res) => {
    var msg = 'This is Index Page<br>'
        + 'メッセージを送信してください';

    //index.ejsをレンダリングする
    res.render('index.ejs',
        {
            title: 'Index',
            content: msg,
            data: data,
        });
});

//POST送信の処理
app.post('/',(req,res) => {
    var msg = 'This is Posted Page!<br>' + 
    'あなたは「<b>' + req.body.message +
    '</b>と送信しました。';
    res.render('index.ejs',
    {
        title: 'Posted Page',
        content: msg,
    });
});

//※Otherページ
app.get("/other",(req,res) => {
    var name = req.query.name;
    var pass = req.query.pass;
    var msg ='あなたの名前は「'+ name + '」<br>パスワードは「'+ pass + '」です。';
    res.render('index.ejs',
    {
        title: 'other',
        content:msg,
        link:{href:'/', text:'※トップに戻る'}
    });
})

var server = app.listen(3000, () => {
    console.log('Server is running');
});

