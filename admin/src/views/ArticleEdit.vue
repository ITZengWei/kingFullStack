<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item  label="所属分类">

        <el-select v-model="model.categories" placeholder="请选择上级文章" multiple>
          <el-option
                  v-for="item in categories"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
          />
        </el-select>

      </el-form-item>
      <el-form-item  label="标题">
        <el-input v-model="model.title" />
      </el-form-item>
      <el-form-item  label="详情">
        <vue-editor v-model="model.body"  id="editor" useCustomImageHandler @image-added="handleImageAdded" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">{{  id ? '编辑' : '保存'  }}</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  export default  {
  	data() {
  		return {
			  model: {
				  categories: ''
        },
			  categories: [],
        parents: [],
        parent: '',
      }
    },
    methods: {
	    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {

		    const formData = new FormData();
		    formData.append("file", file);

		    const { data } = await this.$http.post('/upload', formData)
		    let url = data.url; // Get url from response
		    Editor.insertEmbed(cursorLocation, "image", url);
		    resetUploader();
	    },
	    async save() {
        let res = null
        if (this.id) {
	        res = await this.$http.put('rest/articles/'+ this.id, this.model)
        } else {
	        res = await this.$http.post('rest/articles', this.model)
        }


        this.$router.push('/articles/list')
        this.$message({
          type: 'success',
          message: '保存成功了'
        })
      },
      async fetchCategories() {
	      let { data } = await this.$http.get(`rest/categories`)
	    	this.categories = data
      },
      async fetch() {
	      let { data } = await this.$http.get(`rest/articles/${ this.id }`)
        console.log(data)
        this.model = data
      }
    },
    created() {
  		this.fetchCategories()
	    this.id && this.fetch()
    },
    props: {
	    id: {}
    },
    components: {
	    VueEditor
    }
  }
</script>