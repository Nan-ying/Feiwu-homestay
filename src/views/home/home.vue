<template>
  <div class="home">
    <homeNavBar></homeNavBar>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <homeSearchBox></homeSearchBox>
    <homeCategories></homeCategories>
    <div class="search-bar" v-if="isShowSearchBar">
      <searchBar></searchBar>
    </div>
    <homeContent></homeContent>
  </div>
</template>

<script setup>
import homeNavBar from "./cpns/home-nav-bar.vue";
import homeSearchBox from "./cpns/home-search-box.vue";
import homeCategories from "./cpns/home-categories.vue";
import homeContent from "./cpns/home-content.vue";
import searchBar from "@/components/search-bar/search-bar.vue";

import useHomeStore from "@/stores/modules/home";
import useScroll from "@/hooks/useScroll";
import { watch, computed } from "vue";

const homeStore = useHomeStore();
homeStore.fetchHotSuggestsData();
homeStore.fetchCategories();
homeStore.fetchHouseList();

const { isReachBottom, scrollTop } = useScroll();
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouseList().then(() => {
      isReachBottom.value = false;
    });
  }
});

const isShowSearchBar = computed(() => {
  return scrollTop.value >= 360;
});
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 100px;
}
.banner {
  img {
    width: 100%;
  }
}

.search-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
  z-index: 9;
}
</style>
