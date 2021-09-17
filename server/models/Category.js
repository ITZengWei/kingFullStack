const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name: { type: String },
	/* ref 关联的模型  下次我们找它的时候 可以把父级分类找到  */
	parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

schema.virtual('children', {
	localField: '_id',
	foreignField: 'parent',
	justOne: false,
	ref: 'Category'
})

schema.virtual('newsList', {
	localField: '_id',
	foreignField: 'categories',
	justOne: false,
	ref: 'Article'
})


/* 第三个是集合名字 小写复数形式 */
module.exports = mongoose.model('Category', schema, 'categories')