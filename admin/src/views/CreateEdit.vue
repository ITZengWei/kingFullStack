<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item  label="上级分类">
        <el-select v-model="model.parent" placeholder="请选择上级分类">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          />
        </el-select>

      </el-form-item>
      <el-form-item  label="名称">
        <el-input v-model="model.name" />
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
	        res = await this.$http.put('rest/categories/'+ this.id, this.model)
        } else {
	        res = await this.$http.post('rest/categories', this.model)
        }


        this.$router.push('/categories/list')
        this.$message({
          type: 'success',
          message: '保存成功了'
        })
      },
      async fetchParams() {
	      let { data } = await this.$http.get(`rest/categories`)
	    	this.parents = data
      },
      async fetch() {
	      let { data } = await this.$http.get(`rest/categories/${ this.id }`)
        console.log(data)
        this.model = data
      }
    },
    created() {
  		this.fetchParams()
	    this.id && this.fetch()
    },
    props: {
	    id: {}
    }
  }
</script>