<template>
    <div class="line">
        <div class="line2">
        <el-tabs v-model="activeName">
          <el-tab-pane label="全部" name="1"></el-tab-pane>
          <el-tab-pane label="收入" name="2"></el-tab-pane>
          <el-tab-pane label="支出" name="3"></el-tab-pane>
          <el-tab-pane label="提现" name="4"></el-tab-pane>
        </el-tabs>                       
      </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName:"1"
        }
    }
}
</script>

<style lang="less" scoped>
@import url("./income.less");
</style>