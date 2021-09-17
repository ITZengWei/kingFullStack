const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name: { type: String },
	icon: { type: String }
	/* ref 关联的模型  下次我们找它的时候 可以把父级分类找到  */
	// parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})


module.exports = mongoose.model('Item', schema)