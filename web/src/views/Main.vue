<template>
 <div>
   <div class="topBar d-flex ai-center bg-black px-4  py-2">
     <img src="../assets/logo.png" style="height:30px;">
     <div class="pl-3  flex-1">
       <h1 class="text-white fs-md m-0 mb-1">王者荣耀</h1>
       <p class="text-grey-1 fs-sm m-0">团队成就更多</p>
     </div>
     <button class="btn download bg-primary text-black fs-xxs ">立即下载</button>
   </div>
   <div class="py-2 bg-primary">
     <nav class="nav nav-inverse py-1 js-around">
       <div class="nav-item nav-item--active">
         <router-link class="nav-link" tag="span" to="/home">首页</router-link>
       </div>
       <div class="nav-item">
         <router-link class="nav-link" tag="span" to="/home">攻略中心</router-link>
       </div>
       <div class="nav-item">
         <router-link class="nav-link" tag="span" to="/home">赛事中心</router-link>
       </div>
     </nav>
   </div>
   <router-view></router-view>
 </div>
</template>


<style>
  .topBar {
    /* 吸顶效果 */
    position: sticky;
    top: 0;
    z-index: 999;
  }
</style>