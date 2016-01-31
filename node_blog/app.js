var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'jade');
app.listen(port);
console.log('w3cmark started on port '+ port);

// idnex page

app.get('/',function(req, res){
    res.render('index',{
    	title: '博客首页'
    })
})