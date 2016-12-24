var mongoose = require('mongoose')
var CloudlinkSchema = require('../schemas/cloudlink')
//编译生成模型
var Cloudlink = mongoose.model('Cloudlink', CloudlinkSchema)

module.exports = Cloudlink
