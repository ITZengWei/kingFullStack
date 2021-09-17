const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name: { type: String },
	title: { type: String },
	avatar: { type: String },
	banner: { type: String },
	categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
	scores: {
		/* 难度*/
		difficult: { type: Number },
		/* 技能 */
		skills: { type: Number },
		/* 攻击 */
		attack: { type: Number },
		/* 生存 */
		survive: { type: Number },
	},
	skills: [
		{ icon: { type: String }, name: { type: String }, description: { type: String }, tips: { type: String } },
	],
	/* 顺风装备 */
	items1: [
		{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' },
	],
	/* 逆风 */
	items2: [
		{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' },
	],
	/* 使用技巧 */
	usageTips: { type: String },
	/* 对抗技巧 */
	battleTips: { type: String },
	/* 团战思路 */
	teamTips: { type: String },
	/* 搭档 */
	partners: [
		{ hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' }, description: { type: String } },
	]
})


module.exports = mongoose.model('Hero', schema, 'heroes')