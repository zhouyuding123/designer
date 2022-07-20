<template>
  <div>
    <div class="sadx">
      <div class="screen">
        <el-radio
          v-model="company_mainId"
          :label="0"
          @change="getListApi()"
          border
          >全部</el-radio
        >
        <el-radio
          v-for="item in getList"
          :key="item.id"
          v-model="Listvalue.company_main"
          :label="item.id"
          @change="freelists(item.id)"
          border
          >{{ item.title }}</el-radio
        >
      </div>
    </div>
    <div class="company">
      <div class="companyback">
        <div v-for="item in valueListE" :key="item.id">
          <div class="company_line">123</div>
          <div class="brder_line">
            <div class="brder_line_line"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getListApi, companyGetListApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
export default {
  data() {
    return {
      getList: [],
      Listvalue: {
        city: "",
        limit: 10,
        offset: 1,
        area: "",
        company_main: "",
      },
      valueListE: [],
      company_mainId: 0
    };
  },
  created() {
    this.getListApi();
    this.enterpriseList();
  },
  methods: {
    getListApi() {
        this.Listvalue.company_main=""
      postD(getListApi()).then((res) => {
        this.getList = res.list;
      });
    },
    freelists(val) {
      console.log(val);
      this.company_mainId =""
    },
    enterpriseList() {
      postD(companyGetListApi()).then((res) => {
        console.log(res);
        this.valueListE = res.list;
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./enterprisezone.less");
</style>