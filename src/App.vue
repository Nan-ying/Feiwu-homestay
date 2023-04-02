<template>
  <div class="app">
    <RouterView></RouterView>
    <tabBar></tabBar>
    <loading></loading>
  </div>
</template>

<script setup>
import tabBar from "./components/tab-bar/tab-bar.vue";
import loading from "./components/loading/loading.vue";
</script>

<style scoped></style>
