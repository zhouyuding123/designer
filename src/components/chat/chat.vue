<template>
  <div>
    <div class="kuang">
      <div class="kuang_top">
        <div class="cur">
          <img src="@/assets/imgers/聊天返回.png" alt="" />
        </div>
        <div class="top_zx">在线客服</div>
      </div>
      <div class="kuang_value"></div>
      <div class="addtext">
        <div>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea"
          >
          </el-input>
        </div>
        <div class="dis addinp">
          <div class="dis bq">
            <div>
              <img src="@/assets/imgers/添加表情.png" alt="" />
            </div>
            <div class="addbq">添加表情</div>
          </div>
          <div class="dis bq">
            <div>
              <img src="@/assets/imgers/添加图片.png" alt="" />
            </div>
            <div class="addbq">添加图片</div>
          </div>
          <div class="fs">发送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {authStore} from "@/components/store/store.js"
export default {
  data() {
    return {
      textarea: "",
      asdsads:""
    };
  },
  created() {
    this.asdsads =authStore();
    console.log( this.asdsads);
  }
};
</script>

<style>
.el-textarea__inner {
  resize: none;
}
</style>

<style lang="less" scoped>
.kuang {
  width: 1000px;
  height: 800px;
  background: #ffffff;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  border: 1px solid #dddddd;
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
  .kuang_top {
    width: 100%;
    height: 80px;
    border-bottom: 1px solid #dddddd;
    display: flex;
    padding: 32px 16px;
    .top_zx {
      font-size: 20px;
      font-weight: bold;
      color: #333333;
      margin-left: 425px;
    }
  }
  .kuang_value {
    height: 530px;
    border-bottom: 1px solid #dddddd;
  }
  .addtext {
    padding: 20px;
    /deep/.el-textarea__inner {
      height: 100px;
    }
  }
}
.addinp {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  .bq {
    margin-right: 40px;
    cursor: pointer;
    .addbq {
      margin: 2px 0 0 10px;
    }
  }
}
.fs {
  margin-left: auto;
  width: 200px;
  height: 40px;
  background: #2fcfb9;
  border-radius: 4px 4px 4px 4px;
  line-height: 40px;
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  cursor: pointer;
}
</style>