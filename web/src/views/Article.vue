<template>
  <div class="page-article" v-if="model">
    <div class="border-bottom border-top d-flex ai-center fs-sm px-2">
      <span class="fs-md">返回</span>
      <h4 class="text-blur title flex-1 pl-1 pr-3 text-ellipsis">{{ model.title }}</h4>
      <span class="fs-xxs">{{'2019-10-10'}}</span>
    </div>
    <div class="article__body px-3 " v-html="model.body" />
    <div class="article__footer px-3">
      <h3>相关资讯</h3>
      <router-link
        v-for="item in model.related"
        tag="div"
        class="py-2"
        :to="`/article/${ item._id }`"
      >
        {{ item.title }}
      </router-link>
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
  			const { data } = await this.$http.get(`articles/${ this.id }`)
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
  }
</style>
