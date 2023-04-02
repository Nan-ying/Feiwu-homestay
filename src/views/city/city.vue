<template>
  <div class="city top-page">
    <div class="top">
      <!-- 1.搜索框 -->
      <van-search
        v-model="searchValue"
        placeholder="城市/区域/位置"
        shape="round"
        show-action
        @cancel="cancelClick"
      />

      <!-- 2.tab的切换 -->
      <!-- tabActive默认索引 -->
      <van-tabs v-model:active="tabActive" color="#ff9854" line-height="3">
        <template v-for="(value, key, index) in allCities" :key="value.title">
          <van-tab :title="value.title"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(value, key, index) in allCities">
        <city-group
          v-show="tabActive === index"
          :group-data="value"
        ></city-group>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import useCityStore from "@/stores/modules/city";
import { useRouter } from "vue-router";
import cityGroup from "./cpns/city-group.vue";

const router = useRouter();

// 搜索框功能
const searchValue = ref("");
const cancelClick = () => {
  router.back();
};

// 获取city
const cityStore = useCityStore();
cityStore.fetchAllCitiesData();
const { allCities } = storeToRefs(cityStore);

// 切换tab
const tabActive = ref(0);
</script>

<style lang="less" scoped>
.city {
  // --van-tabs-line-height: 30px;

  // top固定定位 .top {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  // }

  // .content {
  //   margin-top: 98px;
  // }

  // .top {
  //   position: relative;
  //   z-index: 9;
  // }

  // 布局滚动
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>
