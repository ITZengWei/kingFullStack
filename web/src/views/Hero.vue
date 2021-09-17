<template>
  <div class="page-article">
    <div class="topBar d-flex ai-center bg-black px-4  py-2">
      <img src="../assets/logo.png" style="height:30px;">
      <div class="pl-3 d-flex flex-1">
        <h1 class="text-white fs-md m-0 mb-1">王者荣耀</h1>
        <span class="text-white ml-3">攻略站</span>
      </div>
      <router-link to="model" tag="div" class="text-white fs-xs ">更多英雄&nbsp;<strong>&gt;</strong></router-link>
    </div>
    <div v-if="model">
      <div class="top d-flex ai-end" :style="{ 'background-image': `url(${ model.banner })` }">
        <div class="info text-white p-3">
          <div>{{ model.title }}</div>
          <h2 class="py-2">{{ model.name }}</h2>
          <div>{{ model.categories.map(item => item.name).join('/') }}</div>
          <div v-if="model.scores">
            <span>难度{{ model.scores.difficult }}</span>
            <span>技能{{ model.scores.skills }}</span>
            <span>攻击{{ model.scores.attack }}</span>
            <span>生存{{ model.scores.survive }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  export default {
  	data() {
  		return {
			  model: null
      }
    },
  	props: {
  		id: { type: String, required: true }
    },
    watch: {
  		id() {
  		  this.fetch()
      }
    },
    methods: {
  		async fetch() {
  			const { data } = await this.$http.get(`heroes/${ this.id }`)
        this.model = data
        console.log(res)
      }
    },
    created() {
  		this.fetch()
    }
  }
</script>

<style lang="scss">
  .page-article {
    .article__body {

      img, iframe {
        max-width: 100%;
        height: auto;
      }
    }

    .top {
      /*height: 191px;*/
      height: 50vw;
      background: #fff no-repeat top center;
      background-size: cover;
    }
  }
</style>
