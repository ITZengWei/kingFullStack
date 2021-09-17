<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!--<el-form-item  label="上级分类">-->
        <!--<el-select v-model="model.parent" placeholder="请选择上级分类">-->
          <!--<el-option-->
                  <!--v-for="item in parents"-->
                  <!--:key="item._id"-->
                  <!--:label="item.name"-->
                  <!--:value="item._id"-->
          <!--/>-->
        <!--</el-select>-->

      <!--</el-form-item>-->
      <el-form-item  label="名称">
        <el-input v-model="model.name" />
      </el-form-item>

      <el-form-item  label="图标">
        <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">{{  id ? '编辑' : '保存'  }}</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
	export default  {
		data() {
			return {
				model: {},
				parents: [],
				parent: '',
			}
		},
		methods: {
			async save() {
				let res = null
				if (this.id) {
					res = await this.$http.put('rest/items/'+ this.id, this.model)
				} else {
					res = await this.$http.post('rest/items', this.model)
				}


				this.$router.push('/items/list')
				this.$message({
					type: 'success',
					message: '保存成功了'
				})
			},
			async fetchParams() {
				let { data } = await this.$http.get(`rest/items`)
				this.parents = data
			},
			async fetch() {
				let { data } = await this.$http.get(`rest/items/${ this.id }`)
				console.log(data)
				this.model = data
			},
			handleAvatarSuccess(file) {
        this.$set(this.model, 'icon', file.url)
			},
		},

		created() {
			// this.fetchParams()
			this.id && this.fetch()
		},
		props: {
			id: {}
		}
	}
</script>


<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
