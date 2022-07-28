<template>
  <div>
    <div class="bodylist" v-for="item in matchLists" :key="item.id">
      <div class="bodylistone">
        <img :src="imagesValue + item.thumb" alt="" />
      </div>
      <div class="bodylistone_title">
        <div class="bodylistone_title_1">
          {{ item.title }}
        </div>
        <div class="bodylistone_title_2">
          评审结束至{{ fulltime(item.voto_end_time) }}
        </div>
      </div>
      <div class="bodylistone_title_time">
        <img src="@/assets/imgers/评审.png" alt="" />
        <div class="matchoverztime">
          评审倒计时{{ fullendtime(item.voto_end_time) }}
        </div>
      </div>
    </div>
    <div style="padding-top:20px">
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
        voto_time: 1,
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
        console.log(res);
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
        this.matchptlist = res.list;
        this.match.totalResult = res.count;
      });
    },
  },
};
</script>


<style lang="less" scoped>
@import url("./Solicitcontributions.less");
</style>