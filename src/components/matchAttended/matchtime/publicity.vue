<template>
  <div>
    <div class="bodylist" v-for="item in matchLists" :key="item.id" @click="gomatch(item.id)">
      <div class="bodylistone">
        <img :src="imagesValue + item.thumb" alt="" />
      </div>
      <div class="bodylistone_title">
        <div class="bodylistone_title_1">
          {{ item.title }}
        </div>
        <div class="bodylistone_title_2">
          公告结束至{{ fulltime(item.exh_end_time) }}
        </div>
      </div>
      <div class="bodylistone_title_time">
        <img src="@/assets/imgers/企业公示.png" alt="" />
      </div>
    </div>
    <div style="padding-top:20px" v-if="match.totalResult>10">
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
</template>

<script>
import { MatchGetListApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle.js";
export default {
  data() {
    return {
      imagesValue: "",
      match: {
        exh_time: 1,
        limit: 10,
        offset: 1,
        totalResult: 0,
      },
      matchLists: [],
    };
  },
  created() {
    this.matchList();
    this.imagesValue = imgUrl();
  },
  methods: {
    matchList() {
      postD(MatchGetListApi(), this.match).then((res) => {
        if(res.code == "-201") {
          this.$router.push("/about")
        }
        this.matchLists = res.list;
        this.match.totalResult = res.count;
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
        this.matchLists = res.list;
        this.match.totalResult = res.count;
      });
    },
    gomatch(val) {
      this.$router.push("/EventDetails"+val)
    },
  },
};
</script>


<style lang="less" scoped>
@import url("./Solicitcontributions.less");
</style>