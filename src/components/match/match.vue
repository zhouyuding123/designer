<template>
  <div>
    <div class="paddingmatch">
      <div class="matchtitle">
        <div class="matchtitle_left">官方赛事</div>
        <div class="matchtitle_right">
          更多<img src="@/assets/imgers/matchmore.png" alt="" />
        </div>
      </div>
      <div class="paddingmatch2">
        <div class="matchlist" v-for="item in matchptlist" :key="item.id">
          <img :src="imagevalue + item.thumb" alt="" />
          <div class="match_title">
            {{ item.title }}
          </div>
          <div class="times">
            <div class="end_time">
              投稿截止至{{ fulltime(item.sign_end_time) }}
            </div>
            <div class="end_time2">{{ item.part_num }}人已投票</div>
          </div>
          <div class="borderstyle">
            <div></div>
          </div>
          <div class="matchover">
            <div
              class="matchoverzg"
              v-if="Nowtimes < Date.parse(item.sign_end_time)"
            >
              <img
                src="@/assets/imgers/征稿.png"
                alt=""
                style="width: 180px; height: 40px; background-color: white"
              />
              <div class="matchoverztime">
                征稿倒计时{{ fullendtime(item.sign_end_time) }}
              </div>
            </div>
            <div class="matchLook">
              <div class="look">
                <img
                  src="@/assets/imgers/眼睛.png"
                  style="width: 16px; height: 16px; background-color: white"
                  alt=""
                />
                <div>{{item.browse}}</div>
              </div>
              <div class="look">
                <img
                  src="@/assets/imgers/人.png"
                  style="width: 16px; height: 16px; background-color: white"
                  alt=""
                />
                <div>{{item.part_num}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MatchGetListApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      imagevalue: "",
      matchValue: {
        is_platform: "1",
      },
      matchptlist: [],
      Nowtimes: "",
    };
  },
  created() {
    this.matchlist();
    this.imagevalue = imgUrl();
    this.Nowtimes = new Date().valueOf();
  },
  methods: {
    matchlist() {
      postD(MatchGetListApi(), this.matchValue).then((res) => {
          console.log(res);
        this.matchptlist = res.list.slice(0, 2);
      });
    },
    fulltime(val) {
      return val.substring(0, 10);
    },
    fullendtime(val) {
      var daa = new Date(val);
      var date = new Date();
      var restsec = daa.getTime() - date.getTime();
      var hour = parseInt((restsec / (60 * 60 * 1000)));
      var str = hour + "小时";
      return str;
    },
  },
};
</script>


<style lang="less" scoped>
@import url("./match.less");
</style>
