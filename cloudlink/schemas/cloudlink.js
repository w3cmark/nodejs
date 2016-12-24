var mongoose = require('mongoose')

// 声明数据库模式
var CloudlinkSchema = new mongoose.Schema({
	link: String,
	createAt: {
		type: Date,
		default: Date.now()
	}
})

// 存储方法
CloudlinkSchema.pre('save', function(next){

	next()
})

// 静态方法
CloudlinkSchema.statics = {
	fetch: function(cb){//查询所有数据
		return this
			.find({})
			.limit(15)
			.sort({'_id': -1})
			// .sort('meta.updateAt')
			.exec(cb)

	},
	findById: function(id, cb){//查询单条数据
		return this
			.findOne({_id: id})
			.exec(cb)
	}
}

module.exports = CloudlinkSchema