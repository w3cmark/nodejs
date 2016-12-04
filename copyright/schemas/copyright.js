var mongoose = require('mongoose')

// 声明数据库模式
var CopyrightSchema = new mongoose.Schema({
	domainName: String,
	logo: {
		href: String,
		blackSrc: String,
		whiteSrc: String
	},
	nav: {
		txt: String,
		href: String
	},
	company: String,
	reportCenter: {
		txt: String,
		href: String
	},
	guardianship: {
		txt: String,
		href: String
	},
	tempCopyrightHtml: String,
	agePermision: String,
	suggestion: String,
	reportInfoHtml: String,
	record: {
		txt: String,
		href: String
	},
	otherHtml: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

// 存储方法
CopyrightSchema.pre('save', function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}

	next()
})

// 静态方法
CopyrightSchema.statics = {
	fetch: function(cb){//查询所有数据
		return this
			.find({})
			.exec(cb)
	},
	findById: function(id, cb){//查询单条数据
		return this
			.findOne({_id: id})
			.exec(cb)
	},
	findByDomain: function(domain, cb){//查询单条数据
		return this
			.findOne({domainName: domain})
			.exec(cb)
	}
}

module.exports = CopyrightSchema