module.exports = app => {
	const mongoose = require('mongoose')
	mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
		userNewUrlParser: true
	})

	/* 读取所有文件 */
	require('require-all')(__dirname + '/../models')
}