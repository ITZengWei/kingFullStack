<template>
  <!-- 同一个组件就会造成这个后果 -->
  <router-view :key="$route.path" />
</template>