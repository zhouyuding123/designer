<template>
  <div>
    <div class="notEdit" @click="detilsShow"><span>公告详情</span></div>
    <el-dialog title="公告详情" :visible.sync="dialogVisible" width="30%">
      <div class="detilsBody">
        <div>
          <el-image :src="imagesValue + detilsValue.headimg" class="userImg">
          </el-image>
        </div>
        <div class="notTitle">
          <span>{{ detilsValue.username }}</span>
        </div>
        <div class="detilsTime">
          <span>{{ ruleFormdetils.create_time }}</span>
        </div>
      </div>
      <div class="detilsValues">
        <div class="detilsValuesTitle">{{ ruleFormdetils.title }}</div>
        <div class="detilsValuesContent">{{ ruleFormdetils.content }}</div>
      </div>
      <div style="padding-top: 45px">
        <span>
          <el-button @click="dialogVisible = false">返 回</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { postD } from "@/api";
import {
  circle_noticeGetShowApi,
  CircleGetCircleShowApi,
} from "@/urls/wsUrl.js";
import { imgUrl } from "@/assets/js/modifyStyle.js";
export default {
  props: ["detilsId"],
  data() {
    return {
      dialogVisible: false,
      detilsIds: {
        circle_id: "",
        notice_id: "",
      },
      detilsIdQ: {
        id: "",
      },
      ruleFormdetils: [],
      imagesValue: "",
      detilsValue: [],
    };
  },
  methods: {
    detilsShow() {
      this.dialogVisible = true;
      this.detilsIds.circle_id = this.$route.params.id;
      this.detilsIdQ.id = this.$route.params.id;
      this.detilsIds.notice_id = this.detilsId;

      postD(CircleGetCircleShowApi(), this.detilsIdQ).then((res) => {
        this.detilsValue = res.data.circle;
        this.imagesValue = imgUrl();
      });
      postD(circle_noticeGetShowApi(), this.detilsIds).then((res) => {
        if (res.code == "200") {
          this.$message({
            offset: 80,
            type: "success",
            message: res.msg,
          });
          this.ruleFormdetils = res.data;
        } else {
          this.$message({
            offset: 80,
            type: "error",
            message: res.msg,
          });
        }
      });
    },
  },
};
</script> 

<style lang="less" scoped>
@import url("./addNot.less");
</style>