<template>
  <div class="detialBody">
    <div class="detialImg">
      <img
        @click="goxqq"
        class="cur"
        :src="imagesValue + detialValueList.poster"
        alt=""
      />
      <div
        class="sxgj"
        @click="goCompete"
        v-if="
          this.types == 1 &&
          Nowtimes < Date.parse(detialValueList.sign_end_time)
        "
      >
        <span>我要参赛</span>
      </div>
      <div
        class="sxgj"
        v-if="
          this.types == 2 &&
          Nowtimes < Date.parse(detialValueList.sign_end_time)
        "
      >
        <span>已参赛</span>
      </div>
      <div
        class="sxgj"
        v-if="
          (Nowtimes > Date.parse(detialValueList.sign_end_time) &&
            Nowtimes < Date.parse(detialValueList.voto_start_time)) 
        "
      >
        <span>已过投稿时间</span>
      </div>
    </div>
    <div
      class="eventbackground"
      v-if="Nowtimes < Date.parse(detialValueList.voto_start_time)||
          xq === true"
    >
      <div class="eventline1">
        <div class="eventline1_div1" @click="eveTheme('aa' + 1)">
          <div><span>赛事主题</span></div>
        </div>
        <div class="eventline1_div2" @click="eveTheme('aa' + 2)">
          <div><span>赛事介绍</span></div>
        </div>
        <div class="eventline1_div2" @click="eveTheme('aa' + 3)">
          <div><span>赛事详情</span></div>
        </div>
      </div>
      <div class="eventline2" :id="'aa' + 1">
        <div class="sssssss"><span>赛事主题</span></div>
        <div class="eventline2kuai">
          <img src="@/assets/imgers/块1.png" alt="" />
        </div>
      </div>
      <div class="eventline3">
        <div class="eventline3Border">
          <div class="eventline3Body">
            <span>
              {{ detialValueList.title }}
            </span>
          </div>
        </div>
      </div>
      <div class="eventline4" :id="'aa' + 2">
        <div class="eventline4U">
          <span> 赛事介绍 </span>
        </div>
        <div class="eventline4kuai">
          <img src="@/assets/imgers/块2.png" alt="" />
        </div>
      </div>
      <div class="eventline3">
        <div class="eventline3Border">
          <div class="eventline3Body">
            <span>
              {{ detialValueList.description }}
            </span>
          </div>
        </div>
      </div>
      <div class="eventline4" :id="'aa' + 3">
        <div class="eventline4U">
          <span> 赛事详情 </span>
        </div>
        <div class="eventline5kuai">
          <img src="@/assets/imgers/块3.png" alt="" />
        </div>
      </div>
      <div class="eventline5">
        <div class="eventline5Value">
          <div class="bonus">
            <div class="bonusImg">
              <img src="@/assets/imgers/花边.png" alt="" /><span>奖金设置</span>
            </div>
            <div class="bonusValue">
              <div
                class="bonusValues"
                v-for="(item, index) in detialValueList.prize"
                :key="index"
              >
                <div class="bonusValuess">
                  <span>{{ item.name }}{{ item.item }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bonus2">
            <div class="bonusImg">
              <img src="@/assets/imgers/花边.png" alt="" /><span>赛事进程</span>
            </div>
            <div class="bonusValue">
              <div class="process">
                <ul>
                  <li><span>征集期</span></li>
                  <li><span>评选期</span></li>
                  <li><span>公示期</span></li>
                </ul>
                <div class="eveTime">
                  <div class="eveTimes">
                    <div
                      class="eveTime1"
                      v-if="detialValueList.sign_start_time"
                    >
                      {{ fullTimes(detialValueList.sign_start_time) }}
                    </div>
                    <div class="eveTime2">|</div>
                    <div class="eveTime3" v-if="detialValueList.sign_end_time">
                      {{ fullTimes(detialValueList.sign_end_time) }}
                    </div>
                  </div>
                  <div class="eveTimes">
                    <div
                      class="eveTime1"
                      v-if="detialValueList.voto_start_time"
                    >
                      {{ fullTimes(detialValueList.voto_start_time) }}
                    </div>
                    <div class="eveTime2">|</div>
                    <div class="eveTime3" v-if="detialValueList.voto_end_time">
                      {{ fullTimes(detialValueList.voto_end_time) }}
                    </div>
                  </div>
                  <div class="eveTimes">
                    <div class="eveTime1" v-if="detialValueList.exh_start_time">
                      {{ fullTimes(detialValueList.exh_start_time) }}
                    </div>
                    <div class="eveTime2">|</div>
                    <div class="eveTime3" v-if="detialValueList.exh_end_time">
                      {{ fullTimes(detialValueList.exh_end_time) }}
                    </div>
                  </div>
                </div>
                <div class="everule">
                  <span>{{ detialValueList.rule }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="explain">
            <div class="explainImg">
              <img src="@/assets/imgers/花边.png" alt="" /><span>设计说明</span>
            </div>
            <div class="explainValue">
              <span>
                {{ detialValueList.explain }}
              </span>
            </div>
          </div>
          <div class="standard">
            <div class="standardImg">
              <img src="@/assets/imgers/花边.png" alt="" /><span>评选标准</span>
            </div>
            <div class="standardValue">
              <div class="standardValueIn">
                <div
                  class="standardValueInDiv"
                  v-for="(item, index) in detialValueList.standard"
                  :key="index"
                >
                  <div class="standardValueInDiv1">{{ item.title }}</div>
                  <div class="standardValueInDiv2">{{ item.description }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="Instructions">
            <div class="InstructionsImg">
              <img src="@/assets/imgers/花边.png" alt="" /><span>参赛须知</span>
            </div>
            <div class="InstructionsValue">
              <span>{{ detialValueList.entry_info }}</span>
            </div>
          </div>
          <div class="notice">
            <div class="noticeImg">
              <img src="@/assets/imgers/花边.png" alt="" /><span>获奖通知</span>
            </div>
            <div class="noticeValue">
              <div class="noticeValueDiv">
                <span>{{ detialValueList.notice }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Sponsor">
        <div class="SponsorDiv" v-if="detialValueList.title">
          <span>{{ detialValueList.title }}</span>
        </div>
      </div>
      <div class="Sponsor" v-if="detialValueList.access">
        <div class="SponsorDiv">
          <span>{{ detialValueList.access.nickname }}</span>
        </div>
      </div>
    </div>
    <div
      v-if="
        Nowtimes > Date.parse(detialValueList.voto_start_time) &&
        Nowtimes < Date.parse(detialValueList.exh_start_time)
      "
    >
      <exh />
    </div>
    <div
      v-if="
        Nowtimes > Date.parse(detialValueList.exh_start_time) &&
        Nowtimes < Date.parse(detialValueList.exh_end_time)
      "
    >
      <publicity />
    </div>
  </div>
</template>

<script>
import { MatchShowApi, verJoinApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
import exh from "./exh/exh.vue";
import publicity from "./publicity/publicity.vue";
export default {
  components: { exh, publicity },
  data() {
    return {
      imagesValue: "",
      matchShowid: {
        id: "",
      },
      detialValueList: [],
      types: "",
      Nowtimes: "",
      xq: false,
    };
  },
  created() {
    this.imagesValue = imgUrl();
    this.Nowtimes = new Date().valueOf();
    this.EventDetailsValue();
    this.joinss();
  },
  methods: {
    EventDetailsValue() {
      this.matchShowid.id = this.$route.params.id;
      postD(MatchShowApi(), this.matchShowid).then((res) => {
        this.detialValueList = res.data;
      });
    },
    fullTimes(val) {
      let newDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(val);
      return newDate[0];
    },
    eveTheme: function (e) {
      document.getElementById(e).scrollIntoView({
        behavior: "smooth", // 平滑过渡
        block: "start", // 上边框与视窗顶部平齐。默认值
      });
    },
    goCompete() {
      this.$router.push("/compete" + this.matchShowid.id);
    },
    joinss() {
      postD(verJoinApi(), this.matchShowid).then((res) => {
        this.types = res.type;
      });
    },
    goxqq() {
      if(this.xq == false){
        this.xq = true;
      }else {
        this.xq = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./EventDetails.less");
</style>