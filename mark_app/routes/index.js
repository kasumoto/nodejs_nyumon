const { Collection } = require('bookshelf');
var express = require('express');
var router = express.Router();

var markdown = require("markdown").markdown;

var knex = require('knex')({
  dialect: 'sqlite3',
  connection: {
    filename: 'mark_data.sqlite3'
  },
  useNullAsDefault: true
});

var Bookshelf = require('bookshelf')(knex);

Bookshelf.plugin('pagination');

var User = Bookshelf.Model.extend({
  tableName: 'users'
});

var Markdata = Bookshelf.Model.extend({
  tableName: 'markdata',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo(User);
  }
});

router.get('/', function(req,res,next) {
  if(req.session.login == null) {
    res.redirect('/login');
    return;
  }
  new Markdata(['title']).orderBy('created_at','DESC')
  .where('user_id', '=', req.session.login.id)
  .fetchPage({page:1, pageSize:10, withRelated:['user']})
  .then((collection) => {
    var data = {
      title:'Markdown Search',
      login: req.session.login,
      message: '※最近の投稿データ',
      form: {find:''},
      content:collection.toArray()
    };
    res.render('index', data);
  });
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
