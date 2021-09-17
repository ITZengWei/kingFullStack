<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="skills">
        <el-tab-pane label="基础信息">

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
          <el-form-item  label="banner">
            <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers="getAuthHeaders()"
                    :on-success="(file) => {  $set(model, 'banner', file.url) }"
            >
              <img v-if="model.banner" :src="model.banner" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item  label="称号">
            <el-input v-model="model.title" />
          </el-form-item>
          <el-form-item  label="类型">
            <el-select v-model="model.categories" placeholder="请选择英雄类型" multiple>
              <el-option
                      v-for="item in categories"
                      :key="item._id"
                      :label="item.name"
                      :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item  label="难度">
            <el-rate show-score :max="9" style="margin-top: 0.6rem;" v-model="model.scores.difficult" />
          </el-form-item>
          <el-form-item  label="技能">
            <el-rate show-score :max="9" style="margin-top: 0.6rem;" v-model="model.scores.skills" />
          </el-form-item>
          <el-form-item  label="攻击">
            <el-rate show-score :max="9" style="margin-top: 0.6rem;" v-model="model.scores.attack" />
          </el-form-item>
          <el-form-item  label="生存">
            <el-rate show-score :max="9" style="margin-top: 0.6rem;" v-model="model.scores.survive" />
          </el-form-item>
          <el-form-item  label="头像">
            <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers="getAuthHeaders()"
                    :on-success="handleAvatarSuccess"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>

          <el-form-item  label="顺风出装">
            <el-select v-model="model.items1" placeholder="请选择顺风出装" multiple>
              <el-option
                      v-for="item in items"
                      :key="item._id"
                      :label="item.name"
                      :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item  label="逆风出装">
            <el-select v-model="model.items2" placeholder="请选择逆风出装" multiple>
              <el-option
                      v-for="item in items"
                      :key="item._id"
                      :label="item.name"
                      :value="item._id"
              />
            </el-select>
          </el-form-item>

          <el-form-item  label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips" />
          </el-form-item>
          <el-form-item  label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips" />
          </el-form-item>
          <el-form-item  label="团战思路">
            <el-input type="textarea" v-model="model.teamTips" />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button @click="model.skills.push({})" type="text"><i class="el-icon-plus" />添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap;">
            <el-col :md="12"  v-for="(skill, skillIndex) in model.skills" :key="skillIndex">
              <!-- 	{ icon: { type: String }, name: { type: String }, description: { type: String }, tips: { type: String } },  -->
              <el-form-item label="名称">
                <el-input v-model="skill.name" />
              </el-form-item>
              <el-form-item  label="图标">
                <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :headers="getAuthHeaders()"
                        :show-file-list="false"

                        :on-success="res => { $set(skill, 'icon', res.url) }"
                >
                  <img v-if="skill.icon" :src="skill.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="skill.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="skill.tips"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-button size="small" type="danger"
                @click="model.skills.splice(skillIndex, 1)"
                >删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="最佳搭档" name="partners">
          <el-button @click="model.partners.push({})" type="text"><i class="el-icon-plus" />选择英雄</el-button>
          <el-row type="flex" style="flex-wrap: wrap;">
            <el-col :md="12"  v-for="(skill, skillIndex) in model.partners" :key="skillIndex">
              <!-- 	{ icon: { type: String }, name: { type: String }, description: { type: String }, tips: { type: String } },  -->
              <el-form-item label="名称">

                <el-select filterable v-model="skill.hero" placeholder="请选择英雄" >
                  <el-option
                          v-for="hero in heroes"
                          :key="hero._id"
                          :label="hero.name"
                          :value="hero._id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="skill.description"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-button size="small" type="danger"
                @click="model.partners.splice(skillIndex, 1)"
                >删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

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
				heroes: [],
				categories: [],
				items: [],
				model: {
					name: '',
					title: '',
          banner: '',
          avatar: '',
					categories: '',
					skills: [],
          partners: [],
					scores: {
						/* 难度*/
						difficult: 0,
						/* 技能 */
						skills: 0,
						/* 攻击 */
						attack: 0,
						/* 生存 */
						survive: 0
          }
        },

			}
		},
		methods: {
			async save() {
				let res = null
				if (this.id) {
					res = await this.$http.put('rest/heroes/'+ this.id, this.model)
				} else {
					res = await this.$http.post('rest/heroes', this.model)
				}


				// this.$router.push('/heroes/list')
				this.$message({
					type: 'success',
					message: '保存成功了'
				})
			},
			async fetchCategories() {
				let { data } = await this.$http.get(`rest/categories`)
				this.categories = data
			},
			async fetchHeroes() {
				let { data } = await this.$http.get(`rest/heroes`)
				this.heroes = data
			},
      async fetchItems() {
				let { data } = await this.$http.get(`rest/items`)
				this.items = data
			},
			async fetch() {
				let { data } = await this.$http.get(`rest/heroes/${ this.id }`)
				console.log(data)
				this.model = Object.assign({}, this.model, data)
			},
			handleAvatarSuccess(file) {
       this.model.avatar = file.url
			},
		},

		created() {
			this.fetchHeroes()
			this.fetchCategories()
			this.fetchItems()
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
    width: 50px;
    height: 50px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
