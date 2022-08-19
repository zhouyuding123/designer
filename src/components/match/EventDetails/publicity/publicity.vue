<template>
  <div style="margin: 20px auto; width: 1580px">
    <div class="titleline1">
      <div class="countSstyle">
        <div class="numbervalue">
          <span>{{ workvalues.accept_count }}</span>
        </div>
        <div class="numbervalue2"><span>参与选手</span></div>
      </div>
      <div class="vertical"></div>
      <div class="countSstyle">
        <div class="numbervalue">
          <span>{{ workvalues.voto_count }}</span>
        </div>
        <div class="numbervalue2"><span>积累投票</span></div>
      </div>
      <div class="vertical"></div>
      <div class="countSstyle">
        <div class="numbervalue">
          <span>{{ workvalues.browse }}</span>
        </div>
        <div class="numbervalue2"><span>访问量</span></div>
      </div>
    </div>
    <div class="titleline2">
      <div class="listPadding">
        <div class="seatch_list">
          <i
            class="el-icon-search"
            style="position: absolute; margin: 12px 0 0 20px; color: #dddddd"
          ></i>
          <el-input
            v-model="seatcher.keyword"
            placeholder="请输入内容"
          ></el-input>
          <div class="buttom_seatch" @click="seatchvalue">
            <span> 搜索 </span>
          </div>
        </div>
      </div>
    </div>
    <div class="disc" style="width: 100%">
      <div class="ext">
        <div
          class="extList"
          v-for="(item, index) in publicityValueList[0]"
          :key="index"
        >
          <div class="RankStyle" v-if="item.name == '第一名'">
            <img src="@/assets/imgers/第一名.png" alt="" />
          </div>
          <div class="RankStyle" v-if="item.name == '第二名'">
            <img src="@/assets/imgers/第二名.png" alt="" />
          </div>
          <div class="RankStyle" v-if="item.name == '第三名'">
            <img src="@/assets/imgers/第三名.png" alt="" />
          </div>
          <div class="pubimg" @click="goWorkShow(item)">
            <img :src="imagesValue + item.thumb" alt="" />
          </div>
          <div class="pubtitle">
            <div class="pubtitle1">
              <div>{{ item.title }}</div>
              <div class="pubtitle1line1">
                <div class="pubtitle1line1img">
                  <img :src="imagesValue + item.headimage" alt="" />
                </div>
                <div class="pubtitle1line1name">
                  <span>{{ item.nickname }}</span>
                </div>
              </div>
            </div>
            <div class="pubtitle2">
              <div>
                <span>{{ item.voto_count }}票</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { worksListApi, MatchShowApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      publicityValueList: [],
      imagesValue: "",
      prices: [],
      detialId: {
        id: "",
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      seatcher: {
        keyword: "",
        id: "",
      },
      workvalues: [],
      workvalue: [],
      pricelist: [],
    };
  },

  created() {
    this.detialId.id = this.$route.params.id;
    this.seatcher.id = this.$route.params.id;
    this.imagesValue = imgUrl();
    // this.worksValue();
    this.detialValue();
  },
  methods: {
    worksValue() {
      postD(worksListApi(), this.detialId).then((res) => {
        this.workvalues = res;
        this.workvalue = res.list;
        var arr1 = this.prices
        var arr2 = res.list;
        var newArr = [];
        for (var i = 0; i < arr1.length; i++) {
          var num = arr1[i].amount;
          var cutarr = arr2.slice(0, num);
          cutarr.forEach((item, index) => {
            item.name = arr1[i].name;
          });
          newArr.push(cutarr);
          arr2.splice(0, num);
          newArr.concat(arr2);
        }
        newArr = newArr.reduce(function (a, b) {
          return a.concat(b);
        });
        this.publicityValueList.push(newArr);
        console.log(this.publicityValueList);
      });
    },
    seatchvalue() {
      postD(worksListApi(), this.seatcher).then((res) => {
        this.workvalue = res.list.reverse();
        this.detialId.totalResult = res.accept_count;
      });
    },
    detialValue() {
      this.detialId.id = this.$route.params.id;
      postD(MatchShowApi(), this.detialId).then((res) => {
        this.prices = res.data.prize
        this.worksValue();
      });
    },
    goWorkShow(val) {
      var works_id = val.works_id;
      var match_id = val.match_id;
      this.$router.push({
        name: "matchworksShow",
        params: {
          works_id: works_id,
          id: match_id,
        },
      });
    },
    delayer(action, delay = 600) {
      let timer = -1;
      return (nv) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          action(nv);
        }, delay);
      };
    },
  },
  watch: {
    // prices(newval) {
    //   var mapva = [];
    //   newval.forEach((item, i) => {
    //     mapva.push(...this.publicityValueList.splice(0, item.amount));
    //   });
    //   this.pricelist = mapva;
    //   console.log(this.pricelist);
    // },
    //     prices(newval) {
    //       if(this.time == 1){
    //           setInterval(() => {
    //         var mapva = [];
    //         this.time = 0;
    //         newval.forEach((item, i) => {
    //           mapva.push(...this.publicityValueList.splice(0, item.amount));
    //         });
    //         return (this.pricelist = mapva), console.log(mapva),console.log(this.time);;
    //       }, 3000);
    //       }
    //     },
  },
};
</script>

<style lang="less" scoped>
@import url("./publicity.less");
</style>