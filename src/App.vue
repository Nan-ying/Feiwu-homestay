<template>
  <div class="app">
    <RouterView v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </RouterView>
    <tabBar></tabBar>
    <loading></loading>
  </div>
</template>

<script setup>
import tabBar from "./components/tab-bar/tab-bar.vue";
import loading from "./components/loading/loading.vue";
</script>

<style scoped></style>
