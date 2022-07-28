<template>
  <div>
    <div class="paddingmatch">
      <div class="matchtitle">
        <div class="matchtitle_left">官方赛事</div>
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
        <div class="matchlist" v-for="item in matchptlist" :key="item.id"  @click="Eventdetails(item.id)">
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
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle.js";
export default {
  data() {
    return {
      imagevalue: "",
      match: {
        is_platform: "1",
        limit: 10,
        offset: 1,
        totalResult: 0,
      },
      matchptlist: [],
      Nowtimes: "",
    };
  },
  created() {
    this.imagevalue = imgUrl();
    this.Nowtimes = new Date().valueOf();
    this.gfmatchList();
  },
  methods: {
    gfmatchList() {
      postD(MatchGetListApi(), this.match).then((res) => {
        this.matchptlist = res.list;
        this.match.totalResult = res.count
      });
    },
    returnone() {
      this.$router.push("/match");
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
    Eventdetails(val) {
      this.$router.push("/EventDetails" + val);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./ptmatch.less");
</style>
