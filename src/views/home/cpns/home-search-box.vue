<template>
  <div class="search-box">
    <!-- 选择位置 -->
    <div class="location bottom-gray-line">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>
    <!-- 选择日期 -->
    <div class="section bottom-gray-line date-range" @click="selectDate = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDateStr }}</span>
        </div>
        <div class="stay">共{{ stayCount }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDateStr }}</span>
        </div>
      </div>
    </div>
    <!-- 日历 -->
    <van-calendar
      v-model:show="selectDate"
      type="range"
      @confirm="onConfirm"
      color="#ff9854"
      :show-confirm="false"
    />

    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

    <!-- 热门推荐 -->
    <div class="section hotSuggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <span class="sug">{{ item.tagText.text }}</span>
      </template>
    </div>

    <!-- 搜索按钮 -->
    <div class="section search-btn">
      <div class="btn" @click="searchClick">开始搜索</div>
    </div>
  </div>
</template>

<script setup>
import useCityStore from "@/stores/modules/city";
import useHomeStore from "@/stores/modules/home";
import useMainStore from "@/stores/modules/main";
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { formatMonthDay, getDiffDays } from "@/utils/format-date";

const router = useRouter();
const cityStore = useCityStore();
const homeStore = useHomeStore();
const mainStore = useMainStore();

const { currentCity } = storeToRefs(cityStore);

const { hotSuggests } = storeToRefs(homeStore);
// console.log(hotSuggests);

const cityClick = () => {
  router.push("/city");
};

// 日期切换
const { startDate, endDate } = storeToRefs(mainStore);

// const nowDate = new Date();
// const newDate = new Date();
// newDate.setDate(nowDate.getDate() + 1);

// const startDate = ref(formatMonthDay(nowDate));
// const endDate = ref(formatMonthDay(newDate));
// const stayCount = ref(getDiffDays(nowDate, newDate));

const startDateStr = computed(() => formatMonthDay(startDate.value));
const endDateStr = computed(() => formatMonthDay(endDate.value));
const stayCount = ref(getDiffDays(startDate.value, endDate.value));

const selectDate = ref(false);
function onConfirm(dates) {
  const start = dates[0];
  const end = dates[1];
  // console.log(formatMonthDay(start), formatMonthDay(end));
  mainStore.startDate = start;
  mainStore.endDate = end;
  stayCount.value = getDiffDays(start, end);

  selectDate.value = false;
}

// 跳转到搜索页面
function searchClick() {
  router.push({
    path: "/search",
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName,
    },
  });
}
</script>

<style lang="less" scoped>
.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;

  .city {
    flex: 1;
    color: #333;
    font-size: 15px;
  }

  .position {
    width: 75px;
    display: flex;
    align-items: center;

    .text {
      position: relative;
      top: 1px;
      font-size: 13px;
      color: #666;
    }

    img {
      margin-left: 5px;
      width: 18px;
    }
  }
}

.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
    .stay {
      flex: 1;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}
.date-range {
  height: 44px;
}

.price-counter {
  .start {
    border-right: 1px solid var(--line-color);
  }
}

.hotSuggests {
  height: 100%;
  .sug {
    padding: 2px 4px;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    text-align: center;
    background-color: #f6f6f6;
    margin: 6px 6px;
  }
}

.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}
</style>
