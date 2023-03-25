<template>
  <div class="search-box">
    <div class="location">
      <div class="city">广州</div>
      <div class="position">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
</style>
