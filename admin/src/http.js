import axios from 'axios'
import router from './router'

const http = axios.create({
	baseURL: process.env.Vue_APP_API_URL || '/admin/api'
})

// 添加请求拦截器
http.interceptors.request.use(config => {
	// 在发送请求之前做些什么
	// config = Object.assign({}, config )
	if (window.sessionStorage.getItem('demo_token')) config.headers.Authorization = 'Bearer ' + window.sessionStorage.getItem('demo_token')

	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

http.interceptors.response.use(res => {
	return res
}, err => {
	console.log(err.response)
	if (err.response.data.msg) {
		Vue.$message({
			type: 'error',
			message: err.response.data.msg
		})
	}
	if (err.response.status === 401) {
		router.push('/login')
	}

	return Promise.reject(err)
})
export default http