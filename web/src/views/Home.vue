<template>
  <div class="home">
    <swiper :options="swiperOption">
      <swiper-slide >
        <img  class="w-100" height="165" src="../assets/images/banner_1.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img  class="w-100" height="165" src="../assets/images/banner_1.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img  class="w-100" height="165" src="../assets/images/banner_1.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img  class="w-100" height="165" src="../assets/images/banner_1.jpeg">
      </swiper-slide>
      <div class="swiper-pagination swiper-pagination--home text-right mr-4 mb-2" slot="pagination" />
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white my-3 ">
      <div class="wra d-flex flex-wrap text-center">
        <div v-for="n in 10" class="nav-item my-3 py-2 d-flex flex-column js-center ai-center" :key="n">
          <i class="sprite sprite-news mb-3" />
          <span>爆料站</span>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm  d-flex ai-center js-center">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->

    <!--<m-card title="新闻资讯" icon="menu">-->
      <!--<div class="nav js-between">-->
        <!--<div class="nav-item nav-item&#45;&#45;active">-->
          <!--<router-link class="nav-link" tag="span" to="hot">热门</router-link>-->
        <!--</div>-->
        <!--<div class="nav-item">-->
          <!--<router-link class="nav-link" tag="span" to="hot">新闻</router-link>-->
        <!--</div>-->
        <!--<div class="nav-item">-->
          <!--<router-link class="nav-link" tag="span" to="hot">公告</router-link>-->
        <!--</div>-->
        <!--<div class="nav-item">-->
          <!--<router-link class="nav-link" tag="span" to="hot">活动</router-link>-->
        <!--</div>-->
        <!--<div class="nav-item">-->
          <!--<router-link class="nav-link" tag="span" to="hot">赛事</router-link>-->
        <!--</div>-->
      <!--</div>-->
      <!--<swiper>-->
        <!--<swiper-slide v-for="n in 5" :key="n" class="pt-4">-->
          <!--<div v-for="n in 5" :key="n" class="pb-2 d-flex ai-center js-between">-->
            <!--<span class="category">[热门]</span>-->
            <!--<div class="flex-1">-->
              <!--<span class="split">|</span>-->
              <!--<span class="title">嬴政小头像不显示问题说明</span>-->
            <!--</div>-->
            <!--<span class="time">01/16</span>-->
          <!--</div>-->
        <!--</swiper-slide>-->
      <!--</swiper>-->
    <!--</m-card>-->

    <m-list-card title="新闻资讯" icon="menu" :categories="newsCats">
      <template #items="{ category }">
        <router-link
          v-for="item in category.newsList"
          :to="`/article/${ item._id }`"
          tag="div"
          class="pb-2 d-flex ai-center js-between"
        >
          <span class="category">[{{ item.categoryName }}]</span>
          <span class="split">|</span>
          <span class="title text-ellipsis flex-1 px-2">{{ item.title }}</span>

          <span class="time">{{ item.createdAt | day }}</span>
        </router-link>
      </template>

    </m-list-card>

    <m-list-card title="英雄列表" icon="menu" :categories="heroList">
      <template #items="{ category }">
        <div
          class="d-flex flex-wrap"
          style="margin: 0 -0.5rem;"
        >
          <router-link
           v-for="item in category.heroList"
           tag="div"
           :to="`/heroes/${ item._id }`"
           style="width: 20%;"
           class="p-2 d-flex flex-column ai-center js-between"
          >
            <img class="w-100" :src="item.avatar" alt="">
            <p class="my-1">{{ item.name }}</p>
          </router-link>
        </div>

      </template>

    </m-list-card>
  </div>
</template>

<script>
  import dayjs from 'dayjs'


export default {
	data() {
		return {
			swiperOption: {
				pagination: {
					el: '.swiper-pagination--home'
				}
			},
			newsCats: [

      ],
      heroList: []
		}
	},
  methods: {
		async fetchNewsCats() {
			const { data } = await this.$http.get('news/list')
			this.newsCats = data
    },
    async fetchHeroCats() {
	    const { data } = await this.$http.get('heroes/list')
	    this.heroList = data
    },
  },
  async created() {
		this.fetchNewsCats()
		this.fetchHeroCats()
  },
  filters: {
		day(val){
			return dayjs(val).format('MM/DD')
    }
  }
}
</script>

<style lang="scss">
  @import "../Sass/variables";
  .swiper-pagination--home {
    .swiper-pagination-bullet {
      opacity: 1 !important;
      border-radius: 0.1538rem !important;
      background-color: map_get($colors, 'white');
      &-active {
        background-color: map_get($colors, 'info');
      }
    }
  }
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right-color: transparent;
    }
  }
}
</style>
