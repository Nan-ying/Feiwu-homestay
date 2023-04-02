<template>
  <div class="detail top-page" ref="detailRef">
    <tabControl
      v-if="isShowTab"
      class="tabs"
      :titles="names"
      @tabItemClick="tabClick"
      ref="tabControlRef"
    ></tabControl>
    <van-nav-bar
      title="房屋详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <swipe :swipe-data="mainPart.topModule.housePicture.housePics"></swipe>
      <infos
        name="描述"
        :ref="getSelection"
        :infos-data="mainPart.topModule"
      ></infos>
      <facility
        name="设施"
        :ref="getSelection"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
      ></facility>
      <landlord
        name="房东"
        :ref="getSelection"
        :landlord="mainPart.dynamicModule.landlordModule"
      ></landlord>
      <comment
        name="评论"
        :ref="getSelection"
        :comment="mainPart.dynamicModule.commentModule"
      ></comment>
      <notice
        name="须知"
        :ref="getSelection"
        :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
      ></notice>
      <DetailMap
        name="周边"
        :ref="getSelection"
        :position="mainPart.dynamicModule.positionModule"
      ></DetailMap>
      <intro :price-intro="mainPart.introductionModule"></intro>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import useScroll from "@/hooks/useScroll";

import tabControl from "@/components/tab-control/tab-control.vue";
import swipe from "./cpns/detail_01-swipe.vue";
import infos from "./cpns/detail_02-infos.vue";
import facility from "./cpns/detail_03-facility.vue";
import Landlord from "./cpns/detail_04-landlord.vue";
import Comment from "./cpns/detail_05-comment.vue";
import Notice from "./cpns/detail_06-notice.vue";
import DetailMap from "./cpns/detail_07-map.vue";
import Intro from "./cpns/detail_08-intro.vue";

import { useRoute, useRouter } from "vue-router";
import { getDetailInfos } from "@/services";

const route = useRoute();
const router = useRouter();

// 页面滚动显示tab
const detailRef = ref();

const { scrollTop } = useScroll(detailRef);
const isShowTab = computed(() => {
  return scrollTop.value >= 300;
});

// 返回事件
const onClickLeft = () => {
  router.back();
};

// 获取网络数据
const houseId = route.params.id;

const detailInfos = ref({});
const mainPart = computed(() => detailInfos.value.mainPart);
getDetailInfos(houseId).then((res) => {
  detailInfos.value = res.data;
});

// 获取tab的name
const names = computed(() => {
  return Object.keys(sectionEls.value);
});

const sectionEls = ref({});
const getSelection = (value) => {
  const name = value?.$el.getAttribute("name");
  sectionEls.value[name] = value?.$el;
};

let isClick = false;
let currentDistance = -1;
// 点击tab跳转到对应模块
const tabClick = (index) => {
  const name = Object.keys(sectionEls.value)[index];
  const el = sectionEls.value[name];

  let instance = el.offsetTop;
  if (index != 0) {
    instance = instance - 44;
  }
  isClick = true;
  currentDistance = instance;

  detailRef.value.scrollTo({
    top: instance,
    behavior: "smooth",
  });
};
// 滚动页面，tab跟随匹配对应tab
const tabControlRef = ref();
watch(scrollTop, (newValue) => {
  const els = Object.values(sectionEls.value);
  const values = els.map((el) => el.offsetTop);

  if (currentDistance === newValue) {
    isClick = false;
  }
  if (isClick) return;

  let index = values.length - 1;
  for (let i = 0; i < values.length; i++) {
    if (values[i] > newValue + 44) {
      index = i - 1;
      break;
    }
  }

  tabControlRef.value?.setCurrentIndex(index);
});
</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}
</style>
