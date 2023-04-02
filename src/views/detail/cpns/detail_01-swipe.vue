<template>
  <div class="swipe">
    <van-swipe class="swipe-list" autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swipeData" :key="index">
        <van-swipe-item>
          <img :src="item.url" alt="" />
        </van-swipe-item>
      </template>

      <template #indicator="{ active, total }">
        <!-- <div class="indicator">{{ active + 1 }}/{{ total }}</div> -->
        <div class="indicator">
          <template v-for="(value, key, index) in swipeGroup" :key="index">
            <span
              class="item"
              :class="{
                active: key == swipeData[active]?.enumPictureCategory,
              }"
            >
              <span class="text">{{ getName(value[0].title) }}</span>
              <span
                class="count"
                v-if="swipeData[active]?.enumPictureCategory == key"
                >{{ getCategoryIndex(swipeData[active]) }}/{{
                  value.length
                }}</span
              >
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
const props = defineProps({
  swipeData: {
    type: Array,
    default: () => [],
  },
});

const swipeGroup = {};
for (const item of props.swipeData) {
  let valueGroup = swipeGroup[item.enumPictureCategory];
  if (!valueGroup) {
    valueGroup = [];
    swipeGroup[item.enumPictureCategory] = valueGroup;
  }
  valueGroup.push(item);
}
// for (const item of props.swipeData) {
//   swipeGroup[item.enumPictureCategory] = [];
// }
// for (const item of props.swipeData) {
//   swipeGroup[item.enumPictureCategory].push(item);
// }

const nameReg = /【(.+?)】/i;
const getName = (name) => {
  const results = nameReg.exec(name);
  return results[1];
};

const getCategoryIndex = (item) => {
  const valueArray = swipeGroup[item.enumPictureCategory];
  return valueArray.findIndex((data) => data === item) + 1;
};
</script>

<style lang="less" scoped>
.swipe {
  .swipe-list {
    img {
      width: 100%;
    }

    .indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      display: flex;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.8);

      .item {
        margin: 0 3px;

        &.active {
          padding: 0 3px;
          border-radius: 5px;
          background-color: #fff;
          color: #333;
        }
      }
    }
  }
}
</style>
