<template>
  <div style="width:1280px;margin:20px auto;">
    <div class="myimg"><img :src="imagesValue + mydet.thumb" alt="" /></div>
    <div class="muval">
      <div class="muvalmar">
        <div class="myva_img">
          <img :src="imagesValue + mydet.headimg" alt="" />
        </div>
        <div class="my_title">
          <div>{{ mydet.title }}</div>
          <div class="dis laber_iti">
            <div v-for="item in laberpull" :key="item">{{ item }}</div>
          </div>
        </div>
        <div class="dis numberse">
          <div class="num_tit">{{ mylist.member_count }}</div>
          <div
            style="
              font-size: 12px;
              font-weight: 400;
              color: #333333;
              line-height: 15px;
            "
          >
            成员
          </div>
        </div>
        <div class="dis numbers">
          <div class="num_tit">{{ mylist.forum_count }}</div>
          <div
            style="
              font-size: 12px;
              font-weight: 400;
              color: #333333;
              line-height: 15px;
            "
          >
            篇帖子
          </div>
        </div>
        <div class="qzgl" @click="goMymgt" v-if="mydet.username == myname">
          圈子管理
        </div>
        <div class="qzgl" @click="outgo" v-if="mydet.username != myname">
          退出圈子
        </div>
      </div>
    </div>
    <div class="Notice">
      <div class="dis">
        <div class="not_title">圈子公告</div>
        <div class="not_more" @click="goNotice()">更多></div>
      </div>
      <div style="height: 40px; margin-top: 22px">
        <vue-seamless-scroll class="seamless-warp" :data="NoticeValue">
          <ul class="item">
            <li
              v-for="item in NoticeValue"
              :key="item.id"
              style="padding-bottom: 20px"
            >
              <span
                class="title"
                v-text="item.description"
                @click="thisTitle(item.id)"
              >
              </span>
            </li>
          </ul>
        </vue-seamless-scroll>
      </div>
    </div>
      <div class="asd">
        <fabu :is_circle="is_circle" :circle_id="circle_id"></fabu>
      </div>
    <div>
      <cr-detailsvalue />
    </div>
    <el-dialog title="公告详情" :visible.sync="detilsShow" width="30%">
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
      <div class="zxcssad">
        <span>
          <el-button @click="detilsShow = false">返 回</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="outShow" width="30%">
      <div style="margin-bottom: 50px;">确定？</div>
      <div class="zxcssads">
        <span>
          <el-button @click="okout">确定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import fabu from "./fabu/fabu.vue"
import CrDetailsvalue from "./crDetailsvalue/crDetailsvalue.vue"
import vueSeamlessScroll from "vue-seamless-scroll";
import {
  getCircleShowApi,
  circle_noticeGetListApi,
  CircleGetCircleShowApi,
  circle_noticeGetShowApi,
  CircleOutApi,
} from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  components: { vueSeamlessScroll,CrDetailsvalue,fabu },
  data() {
    return {
      myId: {
        id: "",
      },
      mydet: [],
      imagesValue: "",
      laberpull: [],
      mylist: [],
      NoticeValue: [],
      notId: {
        circle_id: "",
      },
      step: 500000000,
      // 公告详情
      detilsIdQ: {
        id: "",
      },
      detilsId: {
        circle_id: "",
        notice_id: "",
      },
      detilsShow: false,
      detilsValue: [],
      ruleFormdetils: [],
      myname: localStorage.getItem("use"),
      outShow: false,
      is_circle:1,
      circle_id:this.$route.params.id
    };
  },
  created() {
    this.detailsValue();
    this.notValue();
    this.imagesValue = imgUrl();
  },
  methods: {
    notValue() {
      this.notId.circle_id = this.$route.params.id;
      postD(circle_noticeGetListApi(), this.notId).then((res) => {
        this.NoticeValue = res.list;
      });
    },
    detailsValue() {
      this.myId.id = this.$route.params.id;
      postD(getCircleShowApi(), this.myId).then((res) => {
        this.mydet = res.data.circle;
        this.mylist = res.data;
        this.laberpull = res.data.circle.label.replace(/,/g, "|");
      });
    },
    goNotice() {
      this.$router.push("/Notice" + this.myId.id);
    },
    // 公告
    thisTitle(val) {
      this.detilsShow = true;
      this.detilsId.circle_id = this.$route.params.id;
      this.detilsId.notice_id = val;
      this.detilsIdQ.id = this.$route.params.id;
      postD(CircleGetCircleShowApi(), this.detilsIdQ).then((res) => {
        this.detilsValue = res.data.circle;
        this.imagesValue = imgUrl();
      });
      postD(circle_noticeGetShowApi(), this.detilsId).then((res) => {
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
    goMymgt() {
      this.$router.push("/MyMgt" + this.myId.id);
    },
    outgo() {
      this.outShow = true;
    },
    okout() {
      var out = {
        circle_id: this.myId,
      };
      postD(CircleOutApi(), out).then((res) => {
        if (res.code == "200") {
          this.$message({
            offset: 80,
            type: "success",
            message: "已退出圈子",
          });
          this.$router.push("/Circle");
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
@import url("./crDetails.less");
/deep/.el-dialog {
  height: auto;
}
.zxcssad {
  position: absolute;
  left: 35%;
  top: 93%;
}
.zxcssads {
  position: absolute;
  left: 35%;
  top: 90%;
}
.asd {
  width: 1280px;
  margin:  0 auto;
}
</style>