module.exports = app => {
	const express = require('express')
	const assert = require('http-assert')
	const router = express.Router({
		/* 合并下面的 resource 参数 */
		mergeParams: true
	})
	/* 校验用户是否登录 */
	const authMiddleWare = require('../../MiddleWare/auth')
	/* 公共API 增删改查中间件 */
	const resourceMiddleWare = require('../../MiddleWare/resource')

	/* 加一个 rest 和 别的 接口 区分  */
	app.use('/admin/api/rest/:resource', authMiddleWare(), resourceMiddleWare(), router)


	/* 创建资源 */
	router.post('/', async (req, res, next) => {
		/* 吉奥盐用户是否登录 */
		const token = req.headers.authorization
		console.log(token)
		await next()
	},async (req, res) => {
		// const Model = require(`../../models/Category`)
		const model = await req.Model.create(req.body)
		res.send(model)
	})
	/* 更新资源 */
	router.put('/:id', async (req, res) => {
		const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
		res.send(model)
	})

	/* 查找资源 */
	router.get('/', async (req, res) => {

		const queryOptions = {}
		if (req.Model.modelName === 'Category') {
			queryOptions.populate = 'parent'
		}
		/* 获取关联的所有数据  关联取出 polulate 完整信息 */
		const items = await req.Model.find().setOptions(queryOptions).limit(100)
		res.send(items)
	})
	/* 资源详情 */
	router.get('/:id', async (req, res) => {
		const model = await req.Model.findById(req.params.id)
		res.send(model)
	})

	/* 删除资源 */
	router.delete('/:id', async (req, res) => {
		const model = await req.Model.findByIdAndDelete(req.params.id)

		res.send({
			success: true
		})
	})



	const multer = require('multer')
	console.log(__dirname + '/../../uploads')
	const upload = multer({ dest: __dirname + '/../../uploads' })
	/* 上传图片操作 multer */
	app.post('/admin/api/upload', authMiddleWare(), upload.single('file'), async (req, res) => {
		const file = req.file
		file.url = `http://localhost:3000/uploads/${ file.filename }`
		res.send(file)
	})

	app.post('/admin/api/login', async (req, res) => {
		const { username, password } = req.body
		/* 根据用户名找用户 */
		const AdminUser = require('../../models/AdminUser')
		const user = await AdminUser.findOne({ username, password }).select('+password')
		// if (!user) {
		// 	return res.status(422).send({
		// 		msg: '用户不存在'
		// 	})
		// }
		assert(user, 422, '用户不存在')
	/*	const isValid = require('bcrypt').compareSync(password, user.password)

		if (!isValid) {
			return res.status(422).send({
				msg: '密码错误'
			})
		}*/

		/* 验证密码 */
		/* 返回token */
		/* jsonwebtoken 包*/
		const jwt = require('jsonwebtoken')
		const token = jwt.sign({ id: user._id }, app.get('secret'))

		res.send({
			token, username
		})

	})



	app.use(async (error, req, res, next) => {
		// res.send(err)
		res.status(error.statusCode || 500).send({message: error.message, code: error.statusCode})
	})
}