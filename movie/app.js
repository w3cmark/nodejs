var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var _ = require('underscore')

var Movie = require('./models/movie')
var path =  require('path')
var port = process.env.POTR || 3000
var app = express()

// 数据库连接
var db = mongoose.connect('mongodb://127.0.0.1/data')
db.connection.on('error', function (error) { 
	console.log('数据库连接失败：' + error); 
});
db.connection.on('open', function () { 
	console.log('——数据库连接成功！——'); 
});

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded())
app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment')
app.listen(port)

console.log('movie start on port '+ port)

// index page
app.get('/', function(req, res){
	// 查询数据
	Movie.fetch(function(err, movies){
		if(err){
			console.log(err)
		}
		res.render('index',{
			title: 'movie 首页',
			movies: movies
		})
	})
	
})

// list page
app.get('/admin/list', function(req, res){
	Movie.fetch(function(err, movies){
		if(err){
			console.log(err)
		}
		res.render('list',{
			title: 'movie 列表页',
			movies: movies
		})
	})
})

// detail page
app.get('/movie/:id', function(req, res){
	var id = req.params.id

	Movie.findById(id, function(err, movie){
		if(err){
			console.log(err)
		}

		res.render('detail',{
			title: 'movie '+ movie.title,
			movie: movie
		})
	})
	
})

// admin page
app.get('/admin/movie', function(req, res){

	res.render('admin',{
		title: 'movie 后台录入页',
		movie: {
			flash: ' ',
			title: ' ',
			doctor: ' ',
			contry: ' ',
			language: ' ',
			year: ' ',
			poster: '',
			summary: ''
		}
	})
})

//list delete movie
app.delete('/admin/list', function(req, res){
	var id = req.query.id
	
	if(id){
		Movie.remove({_id: id},function(err, movie){
			if(err){
				console.log(err)
			}else{
				res.json({success: 1})
			}
		})
	}
})

// admin update movie
app.get('/admin/update/:id', function(req, res){
	var id = req.params.id

	if(id){
		Movie.findById(id, function(err, movie){
			res.render('admin', {
				title: 'movie 后台更新页',
				movie: movie
			})
		})
	}
})

// admin post movie
app.post('/admin/movie/new', function(req, res){
	var id = req.body.movie._id
	var movieObj = req.body.movie
	var _movie

	if(id !== 'undefined'){//电影已存在
		Movie.findById(id, function(err, movie){
			if(err){
				console.log(err)
			}

			_movie = _.extend(movie, movieObj)
			_movie.save(function(err, movie){
				if(err){
					console.log(err)
				}
				// 保存成功后重定向到详情页
				res.redirect('/movie/'+ movie._id)
			})
		})
	}else{
		_movie = new Movie({
			doctor: movieObj.doctor,
			contry: movieObj.contry,
			title: movieObj.title,
			language: movieObj.language,
			poster: movieObj.poster,
			year: movieObj.year,
			summary: movieObj.summary,
			flash: movieObj.flash
		})

		_movie.save(function(err, movie){
			if(err){
				console.log(err)
			}
			// 保存成功后重定向到详情页
			res.redirect('/movie/'+ movie._id)
		})
	}
})