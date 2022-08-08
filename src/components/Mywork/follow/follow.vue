<template>
  <div>
    <div class="midbox">
      <el-tabs v-model="category">
        <el-tab-pane label="我的收藏" name="1"></el-tab-pane>
        <el-tab-pane label="我的关注" name="2"></el-tab-pane>
        <el-tab-pane label="我的粉丝" name="3"></el-tab-pane>
      </el-tabs>
    </div>
    <div v-if="category == 1">
      <collection />
    </div>
    <div v-if="category == 2">
      <follow />
    </div>
    <div  v-if="category == 3">
        <fans />
    </div>
  </div>
</template>

<script>
import fans from "./Three/fans.vue"
import Collection from "./Three/collection.vue";
import follow from "./Three/follow.vue"
export default {
  components: { Collection,follow,fans },
  data() {
    return {
      category: "2",
    };
  },
};
</script>


<style lang="less" scoped>
.midbox {
  width: 1580px;
  height: 80px;
  margin: 20px auto;
  padding-left: 30px;
  padding-top: 20px;
  background-color: #fff;

  /deep/.el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    z-index: 1;
    background-color: white;
  }

  /deep/.el-tabs__active-bar {
    position: absolute;
    bottom: 0;
    left: 15px;
    width: 29px !important;
    height: 2px;
    background-color: #ffdc00;
    z-index: 1;
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    list-style: none;
    width: 6px;
    height: 4px;
    border-radius: 2px 2px 2px 2px;
  }

  /deep/.el-tabs__item {
    padding: 0 20px;
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    position: relative;
    font-size: 14px;
    font-weight: 400;
    color: #999999;
  }

  /deep/.is-active {
    color: #0c032e;
    font-weight: bold;
  }
}
</style>
