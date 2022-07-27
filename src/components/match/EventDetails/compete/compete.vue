<template>
  <div>
    <div class="enttop">
      <div class="enttop_left">
        <div class="enttop_left_name">
          <div class="enttop_left_img">
            <img :src="imageValue + mydetil.headimage" alt="" />
          </div>
          <div class="enttop_left_title">
            <div class="enttop_left_title_title">{{ mydetil.nickname }}</div>

            <div class="enttop_left_title_zy">ID：{{ mydetil.in_code }}</div>
            <div class="enttop_left_title_gz">
              <div class="enttop_left_title_gzd">
                <div class="enttop_left_title_gzd_num">100</div>
                <div class="enttop_left_title_gzd_title">关注</div>
              </div>
              <div class="enttop_left_title_gzd">
                <div class="enttop_left_title_gzd_num">100</div>
                <div class="enttop_left_title_gzd_title">粉丝</div>
              </div>
              <div class="enttop_left_title_gzd">
                <div class="enttop_left_title_gzd_num">100</div>
                <div class="enttop_left_title_gzd_title">获赞</div>
              </div>
            </div>
          </div>
          <div class="fbzp" @click="addworks">发布作品</div>
        </div>
      </div>
      <div class="mygx">个性签名：{{ mydetil.description }}</div>
    </div>
    <div style="padding: 20px 170px">
      <div class="line1">
        <el-tabs v-model="activeName">
          <el-tab-pane label="公开作品" name="1"></el-tab-pane>
          <el-tab-pane label="付费作品" name="2"></el-tab-pane>
          <el-tab-pane label="私密作品" name="3"></el-tab-pane>
        </el-tabs>
      </div>
      <div v-if="activeName == 1">
        <openworks />
      </div>
      <div v-if="activeName == 2">
          <payworks />
      </div>
      <div v-if="activeName == 3">
          <provateworks />
      </div>
    </div>
  </div>
</template>

<script>
import { myCenterApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
import openworks from "./works/openworks.vue";
import Payworks from './works/payworks.vue';
import provateworks from "./works/privatework.vue"
export default {
  components: { openworks,Payworks,provateworks },
  data() {
    Payworks
    return {
      imageValue: "",
      use: {
        username: "",
      },
      mydetil: [],
      activeName: "1",
    };
  },
  created() {
    this.myWorkList();
    this.imageValue = imgUrl();
  },
  methods: {
    myWorkList() {
      this.use.username = localStorage.getItem("use");
      postD(myCenterApi(), this.use).then((res) => {
        this.mydetil = res.data;
      });
    },
    addworks() {
        this.$router.push("/UploadWorks")
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./compete.less");
</style>