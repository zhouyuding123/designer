<template>
  <div>
    <div class="paddingmatch">
      <div class="matchtitle">
        <div class="matchtitle_left">企业赛事</div>
        <div class="matchtitle_right" @click="returnone">
          <div>
            <img
              src="@/assets/imgers/返回.png"
              alt=""
              style="width: 16px; height: 16px"
            />
          </div>
          <div>返回</div>
        </div>
      </div>
      <div class="paddingmatch2">
        <div class="entmatch" v-for="item in entmatchptlist" :key="item.id">
          <img :src="imagevalue + item.thumb" alt="" />
          <div class="match_title">
            <div>{{ item.title }}</div>
            <div
              style="
                font-size: 14px;
                font-weight: 400;
                color: #999999;
                margin-top: 50px;
              "
            >
              投稿截止至{{ fulltime(item.sign_end_time) }}
            </div>
          </div>
          <div class="notice" v-if="Nowtimes < Date.parse(item.sign_end_time)">
            <img
              src="@/assets/imgers/企业征稿.png"
              alt=""
              style="width: 180px; height: 40px; background-color: white"
            />
            <div class="matchoverztime">
              征稿倒计时{{ fullendtime(item.sign_end_time) }}
            </div>
          </div>
          <div
            class="notice"
            v-if="
              Date.parse(item.voto_end_time) > Nowtimes &&
              Nowtimes > Date.parse(item.sign_end_time)
            "
          >
            <img
              src="@/assets/imgers/企业评审.png"
              alt=""
              style="width: 180px; height: 40px; background-color: white"
            />
            <div class="matchoverztime">
              评审倒计时{{ fullendtime(item.voto_end_time) }}
            </div>
          </div>
          <div
            class="notice"
            v-if="
              Date.parse(item.exh_end_time) > Nowtimes &&
              Nowtimes > Date.parse(item.exh_start_time)
            "
          >
            <img
              src="@/assets/imgers/企业公示.png"
              alt=""
              style="width: 180px; height: 40px; background-color: white"
            />
          </div>
        </div>
      </div>
      <div>
        <vxe-pager
          :current-page="match.offset"
          :page-size="match.limit"
          :total="match.totalResult"
          :layouts="[
            'PrevPage',
            'JumpNumber',
            'NextPage',
            'FullJump',
            'Sizes',
            'Total',
          ]"
          @page-change="handlePageChange"
        ></vxe-pager>
      </div>
    </div>
  </div>
</template>

<script>
import { MatchGetListApi } from "@/urls/wsUrl.js";
import { imgUrl } from "@/assets/js/modifyStyle";
import { postD } from "@/api";
export default {
  data() {
    return {
      match: {
        is_platform: "2",
        limit: 10,
        offset: 1,
        totalResult: 0,
      },
      Nowtimes: "",
      imagevalue: "",
      entmatchptlist: [],
    };
  },
  created() {
    this.imagevalue = imgUrl();
    this.Nowtimes = new Date().valueOf();
    this.entmatchlist();
  },
  methods: {
    returnone() {
      this.$router.push("/match");
    },
    entmatchlist() {
      postD(MatchGetListApi(), this.match).then((res) => {
        this.entmatchptlist = res.list;
        this.match.totalResult = res.count
      });
    },
    fulltime(val) {
      return val.substring(0, 10);
    },
    fullendtime(val) {
      var daa = new Date(val);
      var date = new Date();
      var restsec = daa.getTime() - date.getTime();
      var hour = parseInt(restsec / (60 * 60 * 1000));
      var str = hour + "小时";
      return str;
    },
     handlePageChange({ currentPage, pageSize }) {
      this.match.offset = currentPage;
      this.match.limit = pageSize;
      postD(MatchGetListApi(), this.match).then((res) => {
        this.matchptlist = res.list;
        this.match.totalResult = res.count
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./entmatch.less");
</style>