var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	// _ = require('underscore'),
	// path =  require('path'),
	Cloudlink = require('./models/cloudlink'),
	app = express(),
	port = process.env.POTR || 3000;
 
// 数据库连接
mongoose.Promise = require('bluebird');
var db = mongoose.connect('mongodb://127.0.0.1/cloudlink')
db.connection.on('error', function (error) { 
	console.log('数据库连接失败：' + error); 
});
db.connection.on('open', function () { 
	console.log('——数据库连接成功！——'); 
});

 // app.set('views', './views')
 // app.set('view engine', 'jade')
 app.use(bodyParser.urlencoded({extended: true}))
 // app.use(express.static(path.join(__dirname, 'public')))
 // app.locals.moment = require('moment')
 app.listen(port)

 console.log('start on port '+ port)


app.get('/addnewlink', function(req, res){
	var config = req.query,
		link = config.link
	var _config

	if(link && link !== ''){
		_config = new Cloudlink({
			link: link
		})
		_config.save(function(err){
			if(err){
				console.log(err)
			}else if(config.callback){
				res.send(config.callback+'({success:true})');
			}else{
				res.send('{success:true}');
			}
		})
	}else{
		if(config.callback){
			res.send(config.callback+'({success:false, msg:"参数不能为空！"})');
		}else{
			res.send('{success:false, msg:"参数不能为空！"}');
		}
	}

})

// get
app.get('/cloudlinks', function(req, res){
	var config = req.query,
		data;

	Cloudlink.fetch(function(err, links){
		if(err){
			console.log(err)
			data = {
				success: false,
				msg:"查询数据库出错！"
			}
		}else if(links){
			// console.log(links)
			data = {
				success: true,
				links:links
			}
		}else{
			console.log(links)
			data = {
				success: false,
				msg:"查询数据库出错！"
			}
		}
		if(config.callback){
			res.send(config.callback+'('+ JSON.stringify(data) +')');
		}else{
			res.send(JSON.stringify(data));
		}

	})
	
})

// delete
app.get('/deletelink', function(req, res){
	var config = req.query,
		id = config.id,
		data
	
	if(id){
		Cloudlink.remove({_id: id},function(err){
			if(err){
				console.log(err)
				data = {
					success: false,
					msg: "删除出错！"
				}
				
			}else{
				data = {
					success: true,
					msg: "删除成功！"
				}
			}
			if(config.callback){
				res.send(config.callback+'('+ JSON.stringify(data) +')');
			}else{
				res.send(JSON.stringify(data));
			}
		})
	}else{
		if(config.callback){
			res.send(config.callback+'({success:false, msg:"删除id不能为空！"})');
		}else{
			res.send('{success:false, msg:"删除id不能为空！"}');
		}
		
	}
})