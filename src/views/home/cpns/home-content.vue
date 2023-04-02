<template>
  <div class="content">
    <h3 class="title">热门搜索</h3>
    <div class="list">
      <template v-for="(item, index) in houselist" :key="item.data.houseId">
        <!-- <div>{{ item.data.houseName }}</div> -->
        <houseItemV9
          v-if="item.discoveryContentType === 9"
          :itemData="item.data"
          @click="itemClick(item.data)"
        />
        <houseItemV3
          v-else-if="item.discoveryContentType === 3"
          :itemData="item.data"
          @click="itemClick(item.data)"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import useHomeStore from "@/stores/modules/home";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import houseItemV3 from "@/components/house-item-v3/house-item-v3.vue";
import houseItemV9 from "@/components/house-item-v9/house-item-v9.vue";

const homeStore = useHomeStore();
const { houselist } = storeToRefs(homeStore);

const router = useRouter();

const itemClick = (item) => {
  router.push("/detail/" + item.houseId);
};
</script>

<style lang="less" scoped>
.content {
  .title {
    margin: 0 20px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
