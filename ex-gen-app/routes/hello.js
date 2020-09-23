var express = require('express');
var router = express.Router();

router.get('/',(req, res, next) => {
    var data = {
        title: 'Hello! Page',
        content: 'Hello,Express',        
    };
    res.render('hello',data);
});

module.exports = router;