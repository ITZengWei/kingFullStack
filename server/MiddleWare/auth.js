module.exports = options => {
	const assert = require('http-assert')

	return async (req, res, next) => {
		/* 登录校验中间件 */

		const token = String(req.headers.authorization || '').split(' ').pop()
		assert(token, 401, '请提供 jwt token')
		// console.log(token, req.headers.authorization)
		// const tokenData = require('jsonwebtoken').decode(token) // 不推荐
		const { id } = require('jsonwebtoken').verify(token, req.app.get('secret'))
		/* 查找成员 */
		assert(id, 401, '无效的token')
		/* 挂载到req */
		const adminUser = require('../models/AdminUser')
		req.userInfo = await adminUser.findById(id)
		assert(req.userInfo, 401, '请先登录')

		await next()
	}
}