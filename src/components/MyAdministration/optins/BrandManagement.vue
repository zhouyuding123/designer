<template>
  <div class="bandpadding">
    <div class="band_body">
      <div class="band_seatch">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <div class="band_seatchss">
          <img src="" alt="" />
          <span>搜索</span>
        </div>
      </div>
      <div class="add_band">
        <span>添加品牌</span>
      </div>
      <div class="add_band">
        <span>批量删除 </span>
      </div>
      <div class="refresh">
        <span>刷新 </span>
      </div>
    </div>
    <div style="margin-top: 20px">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {designerGetBrandApi} from "@/urls/wsUrl.js"
import { postD } from '@/api';
export default {
  data() {
    return {
      input: "",
      tableData: [],
    };
  },
  created() {
    this.designerGetBrand()
  },
  methods: {
designerGetBrand() {
  postD(designerGetBrandApi()).then(res=> {
    console.log(res);
  })
}
  }
};
</script>

<style lang="less" scoped>
@import url("./BrandManagement.less");
</style>