<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item  label="名称">
        <el-input v-model="model.name" />
      </el-form-item>

      <el-form-item  label="广告位列表">
        <el-button @click="model.items.push({})" type="text"><i class="el-icon-plus" />添加图片</el-button>
        <el-row type="flex" style="flex-wrap: wrap;">
          <el-col :md="12"  v-for="(item, imageIndex) in model.items" :key="imageIndex">
            <el-form-item  label="图标">
              <el-upload
                      class="avatar-uploader"
                      :action="uploadUrl"
                      :headers="getAuthHeaders()"
                      :show-file-list="false"

                      :on-success="res => { $set(item, 'image', res.url) }"
              >
                <img v-if="item.image" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
            <el-form-item label="跳转地址">
              <el-input type="text" v-model="item.url"></el-input>
            </el-form-item>

            <el-form-item label="">
              <el-button size="small" type="danger"
                         @click="model.items.splice(imageIndex, 1)"
              >删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
			  model: {
				  items: []
        },
        parents: [],
        parent: '',
      }
    },
    methods: {
	    async save() {
        let res = null
        if (this.id) {
	        res = await this.$http.put('rest/ads/'+ this.id, this.model)
        } else {
	        res = await this.$http.post('rest/ads', this.model)
        }


        this.$router.push('/ads/list')
        this.$message({
          type: 'success',
          message: '保存成功了'
        })
      },
      async fetchParams() {
	      let { data } = await this.$http.get(`rest/ads`)
	    	this.parents = data
      },
      async fetch() {
	      let { data } = await this.$http.get(`rest/ads/${ this.id }`)
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