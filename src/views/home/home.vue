<template>
  <div class="home" ref="homeRef">
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

<script>
export default { name: "home" };
</script>
<script setup>
import homeNavBar from "./cpns/home-nav-bar.vue";
import homeSearchBox from "./cpns/home-search-box.vue";
import homeCategories from "./cpns/home-categories.vue";
import homeContent from "./cpns/home-content.vue";
import searchBar from "@/components/search-bar/search-bar.vue";

import useHomeStore from "@/stores/modules/home";
import useScroll from "@/hooks/useScroll";
import { ref, watch, computed, onActivated } from "vue";

const homeStore = useHomeStore();
homeStore.fetchHotSuggestsData();
homeStore.fetchCategories();
homeStore.fetchHouseList();

const homeRef = ref();
const { isReachBottom, scrollTop } = useScroll(homeRef);
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

// 返回首页时保留位置记录
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value,
  });
});
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 60px;

  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
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
