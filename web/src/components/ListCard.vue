<template>
  <div>
    <m-card :title="title" :icon="icon">
      <div class="nav js-between">
        <div
          v-for="(category, categoryIndex) in categories"
          class="nav-item"
          :class="{ 'nav-item--active': categoryIndex === active }"
          @click="$refs.list.swiper.slideTo(categoryIndex)"
        >
          <span  class="nav-link" >{{ category.name }}</span>
        </div>
      </div>
      <swiper ref="list"
      @slide-change="() => active= $refs.list.swiper.realIndex"
       :options="{ autoHeight: true }"
      >
        <swiper-slide v-for="(category, categoryIndex) in categories" :key="categoryIndex" class="pt-4">
          <slot name="items" :category="category">

          </slot>
        </swiper-slide>


      </swiper>
    </m-card>
  </div>
</template>

<script>

  export default {
  	data() {
  		return {
			  active: 0
      }
    },
    props: {
  		title: { type: String, required: true },
  		icon: { type: String, required: true },
      categories: { type: Array, required: true }
    }
  }
</script>