<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="var(--primary-color)">
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
import { ref } from "vue";
import { getAssetURL } from "@/utils/load_assets.js";
import tabbarData from "@/assets/data/tabbar";

const currentIndex = ref(0);
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
