<template>
  <div>
    <div class="paddingmatch">
      <div class="matchtitle">
        <div class="matchtitle_left">官方赛事</div>
        <div class="matchtitle_right" @click="gogfevent">
          更多<img src="@/assets/imgers/matchmore.png" alt="" />
        </div>
      </div>
      <div class="paddingmatch2">
        <div
          class="matchlist"
          v-for="item in matchptlist"
          :key="item.id"
          @click="Eventdetails(item.id)"
        >
          <img :src="imagevalue + item.thumb" alt="" />
          <div class="match_title">
            {{ item.title }}
          </div>
          <div class="times">
            <div class="end_time">
              投稿截止至{{ fulltime(item.sign_end_time) }}
            </div>
            <div class="end_time2">{{ item.voto_count }}人已投票</div>
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
            <div
              class="matchoverzg"
              v-if="
                Date.parse(item.voto_end_time) > Nowtimes &&
                Nowtimes > Date.parse(item.sign_end_time)
              "
            >
              <img
                src="@/assets/imgers/评审.png"
                alt=""
                style="width: 180px; height: 40px; background-color: white"
              />
              <div class="matchoverztime">
                评审倒计时{{ fullendtime(item.voto_end_time) }}
              </div>
            </div>
            <div
              class="matchoverzg"
              v-if="
                Date.parse(item.exh_end_time) > Nowtimes &&
                Nowtimes > Date.parse(item.exh_start_time)
              "
            >
              <img
                src="@/assets/imgers/公式中.png"
                alt=""
                style="width: 180px; height: 40px; background-color: white"
              />
            </div>
            <div class="matchLook">
              <div class="look">
                <img
                  src="@/assets/imgers/眼睛.png"
                  style="width: 16px; height: 16px; background-color: white"
                  alt=""
                />
                <div>{{ item.browse }}</div>
              </div>
              <div class="look">
                <img
                  src="@/assets/imgers/人.png"
                  style="width: 16px; height: 16px; background-color: white"
                  alt=""
                />
                <div>{{ item.part_num }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="matchtitle" style="padding-top: 20px">
        <div class="matchtitle_left">企业赛事</div>
        <div class="matchtitle_right" @click="goentevent">
          更多<img src="@/assets/imgers/matchmore.png" alt="" />
        </div>
      </div>
      <div class="paddingmatch2">
        <div class="entmatch" v-for="item in entmatchptlist" :key="item.id" @click="Eventdetails(item.id)">
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
      entmatchptlist: [],
    };
  },
  created() {
    this.matchlist();
    this.entmatchlist();
    this.imagevalue = imgUrl();
    this.Nowtimes = new Date().valueOf();
  },
  methods: {
    matchlist() {
      postD(MatchGetListApi(), this.matchValue).then((res) => {
        this.matchptlist = res.list.slice(0, 2);
      });
    },
    entmatchlist() {
      this.matchValue.is_platform = 2;
      postD(MatchGetListApi(), this.matchValue).then((res) => {
        this.entmatchptlist = res.list.slice(0, 4);
        console.log(this.entmatchptlist);
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
    gogfevent() {
      this.$router.push("/ptmatch");
    },
    goentevent() {
      this.$router.push("/entmatch");
    },
    Eventdetails(val) {
      this.$router.push("/EventDetails" + val);
    },
  },
};
</script>


<style lang="less" scoped>
@import url("./match.less");
</style>
