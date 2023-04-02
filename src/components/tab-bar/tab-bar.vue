<template>
  <div class="tab-bar">
    <van-tabbar
      v-model="currentIndex"
      active-color="var(--primary-color)"
      route
    >
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon>
            <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" />
            <img v-else :src="getAssetURL(item.imageActive)" alt="" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";
import { getAssetURL } from "@/utils/load_assets.js";
import tabbarData from "@/assets/data/tabbar";
import { useRoute } from "vue-router";

const router = useRoute();
const currentIndex = ref(0);
watch(router, (newValue) => {
  const index = tabbarData.findIndex((item) => item.path === newValue.path);
  currentIndex.value = index;
});
</script>

<style lang="less" scoped>
.tab-bar {
  :deep(.van-tabbar-item__icon) {
    font-size: 50px !important;
  }

  img {
    height: 26px;
  }
}
</style>
