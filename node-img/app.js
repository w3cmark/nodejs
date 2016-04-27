var fs = require('fs'),
	express = require('express'),
	bodyParser = require('body-parser'),
	path =  require('path'),
	app = express(),
	port = process.env.POTR || 3000,
	gm = require('gm');
 
 app.set('views', './views')
 app.set('view engine', 'jade')
 app.use(bodyParser.urlencoded())
 app.use(express.static(path.join(__dirname, 'public')))
 app.listen(port)

 console.log('start on port '+ port)


// index page
app.get('/', function(req, res){

	res.render('index',{
		title: '首页',
		config: {
			inputdir: ' ',
			outputdir: ' ',
			format: '',
			size: ' ',
			startpoint: ' ',
			space: ' '
		}
	})
	
})

// post
app.get('/crop', function(req, res){
	var config = req.query,
		inputPath = config.inputdir ? config.inputdir : 'img',
		outputPath = config.outputdir ? config.outputdir : 'output',
		format = config.format ? config.format : '',
		size = config.size,
		startpoint = config.startpoint ? config.startpoint : '0, 0',
		space = config.space ? config.space : '0, 0';
	
	readFiles(inputPath, outputPath, format, size, startpoint, space, function(data){
		res.send(config.callback+'('+ JSON.stringify(data) +')');
	});
	// res.send(config.callback+'({success: 1})');
})

// 遍历所有图片
function readFiles(inputPath, outputPath, format, size, startpoint, space, callback){
	fs.readdir(inputPath, function(err, files){
		if(!err){
			var total = 0,
				sucnum = 0,
				errnum = 0;
			for (var i = 0, len = files.length; i < len; i++) {
				var inputfile = inputPath + '/' + files[i],
					outputfile = outputPath + '/' + files[i],
					mess = '';
				console.log('format:'+format)
				if(format){
					outputfile = outputfile.replace(path.extname(files[i]), '.'+format);
				}
				if (!fs.existsSync(outputPath)) {
		            fs.mkdirSync(outputPath);
		            console.log(outputPath + '目录创建成功');
		        }
				gmCrop(inputfile, outputfile, size, startpoint, space, i, function(err, f1, f2){
					total++;
					if (!err){
						sucnum++;
						mess += f1 + ' is crop success! Save as ' + f2 + '!<br/>';
					}else{
						errnum++;
						mess += err+ '<br/>';
					}
					if(total == len){
						callback({success: 1, mess: mess, suc: sucnum, err: errnum});
					}
				})
			};
			
		}else{
			console.log(err);
		}
	})
}


// resize and remove EXIF profile data 
function gmCrop(inputfile, outputfile, size, startpoint, space, cur, callback){

	var w = dismantle(size)[0],
		h = dismantle(size)[1],
		x_space = dismantle(space)[0],
		y_space = dismantle(space)[1],
		x = dismantle(startpoint)[0]*1 + cur*x_space*1,
		y = dismantle(startpoint)[1]*1 + cur*y_space*1;
	// console.log("x:"+x +'|| y:'+y)
	gm(inputfile)
	.crop(w, h, x , y)
	.noProfile()
	.write(outputfile, function(err){
		if(typeof callback == 'function'){
			callback(err, inputfile, outputfile)
		}
	});
}

//dismantle
function dismantle(arr){
	var newArr
	if(arr.indexOf(',') <= -1){
		newArr = [arr, arr];
	}else{
		arr = arr.split(',');
		newArr = [arr[0], arr[1]];
	}
	return newArr;
}

