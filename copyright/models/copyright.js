var mongoose = require('mongoose')
var CopyrightSchema = require('../schemas/copyright')
//编译生成模型
var Copyright = mongoose.model('Copyright', CopyrightSchema)

module.exports = Copyright
