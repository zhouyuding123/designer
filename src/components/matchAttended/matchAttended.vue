<template>
  <div>
    <div style="padding: 20px 170px">
      <div class="midbox">
        <el-tabs v-model="activeName">
          <el-tab-pane label="征稿中" name="1"></el-tab-pane>
          <el-tab-pane label="评审中" name="2"></el-tab-pane>
          <el-tab-pane label="已结束" name="3"></el-tab-pane>
        </el-tabs>
      </div>
      <div v-if="activeName == 1">
        <solicitcontributions />
      </div>
      <div v-if="activeName == 2">
        <selection />
      </div>
      <div v-if="activeName == 3">
        <publicity />
      </div>
    </div>
  </div>
</template>

<script>
import Solicitcontributions from './matchtime/Solicitcontributions.vue';
import Selection from './matchtime/Selection.vue';
import Publicity from "./matchtime/publicity.vue"
export default {
  components: { Solicitcontributions, Selection, Publicity },
  data() {
    return {
      activeName: "1",
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang="less" scoped>
@import url("./matchattended.less");
</style>