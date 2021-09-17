<template>
  <div class="card mt-3 p-3 bg-white">
    <div class="card__header pb-4 d-flex ai-center fs-center">
      <i class="iconfont" :class="`icon-${ icon }`"></i>
      <div class="fs-xl flex-1 px-2">新闻资讯</div>
      <i class="iconfont icon-other-options-icon fs-sm"></i>
    </div>
    <div class="card__body pt-3">
        <slot></slot>
     </div>
  </div>
</template>

<script>

  export default {
  	data() {
  		return {}
    },
    props: {
  		title: { type: String, required: true },
  		icon: { type: String, required: true },
    }
  }
</script>
<style lang="scss">
  @import "../Sass/variables";
  .card {
    .card__header {
      border-bottom: 1px solid $border-color;
    }
    border-bottom: 1px solid $border-color;
  }
</style>