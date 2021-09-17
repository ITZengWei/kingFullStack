const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	title: { type: String },
	/* ref 关联的模型  下次我们找它的时候 可以把父级分类找到  */
	categories: [ { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' } ],
	body: { type: String }
}, {
	timestamps: true
})


module.exports = mongoose.model('Article', schema)