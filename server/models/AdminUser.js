const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	username: { type: String },
	password: { type: String },
})
/*
*
* ,
		select: false,
		set(psw){
			/* bcrypt 一般设置 10 - 12 就足够了 比 MD5 还严格 不可逆cnpm  */
// // return require('bcrypt').hashSync(pasw, 10)
// 		return psw
// 		}
// * */

module.exports = mongoose.model('AdminUser', schema)