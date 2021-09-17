<template>
  <el-form
          ref="loginForm"
          label-width="60px"
          autocomplete="off"
          :rules="rules"
          class="login"
          status-icon
          :model="form"
  >
    <h2>管理员登录</h2>
    <el-form-item label="账号" prop="username">
      <el-input type="text" v-z-focus v-model="form.username" placeholder="用户名或者邮箱" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" placeholder="请输入密码" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm" @keyup.enter="submitForm">登录</el-button>
      <el-button type="success" @click="$router.push('/register')">注册</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
  export default {
	  data() {
		  return {
			  form: {
				  username: '',
				  password: '',
			  },
			  rules: {
				  username: [
					  {required: true, message: '请输入账号', trigger: 'blur'},
					  {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
				  ],
				  password: [
					  {required: true, message: '请输入密码', trigger: 'blur'},
					  {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
				  ],
			  }
		  }
	  },
	  methods: {
		  /* 处理提交 */
		  submitForm() {
			  this.$refs['loginForm'].validate(async (valid) => {
				  if (valid) {
            console.log(this)
            let { username, password } = this.form

					  const { data } = await this.$http.post('/login', { username, password })
					  window.sessionStorage.setItem('demo_token', data.token)

				  }
			  });
		  }
	  }
  }
</script>

<style scoped lang="less">
  .login {

    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -100%);
    padding: 30px 20px 20px 10px;
    border-radius: 10px;
    width: 400px;
    box-shadow: 2px -1px 5px rgba(0,0,0, .2);
    border: 1px solid rgba(0,0,0, .2);
    background-color: #fff;
    h2 {
      text-align: center;
      margin-bottom: 10px;
      opacity: .6;
    }

  }
</style>