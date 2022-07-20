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
        <div v-for="(item,index) in valueListE" :key="index">
        <div class="brder_line" v-if="index != 0">
            <div class="brder_line_line"></div>
          </div>
          <div class="company_line">
            <div class="company_line_img">
              <img
                v-if="item.headimage"
                :src="imagesValue + item.headimage"
                alt=""
              />
              <img
                v-if="item.headimage == null || item.headimage == ''"
                :src="imagesValue + notimg"
                alt=""
              />
            </div>
            <div>
              <div class="company_linenick">
                <div class="company_linenick_name">{{ item.nickname }}</div>
                <div class="company_linenick_img">
                  <img src="@/assets/imgers/认证.png" alt="" />
                </div>
              </div>
              <div v-if="item.province" class="dzhi">
                {{ item.province }}{{ item.city }}{{ item.area
                }}{{ item.detail }}
              </div>
              <div v-else class="dzhi">外太空</div>
            </div>
            <div></div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getListApi, companyGetListApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      notimg: "images/20220720/165832004615c379d82e26251591b1e85c8e4fdf7e.jpg",
      imagesValue: "",
      getList: [],
      Listvalue: {
        city: "",
        limit: 10,
        offset: 1,
        area: "",
        company_main: "",
      },
      valueListE: [],
      company_mainId: 0,
    };
  },
  created() {
    this.getListApi();
    this.enterpriseList();
    this.imagesValue = imgUrl();
  },
  methods: {
    getListApi() {
      this.Listvalue.company_main = "";
      postD(getListApi()).then((res) => {
        this.getList = res.list;
      });
    },
    freelists(val) {
      console.log(val);
      this.company_mainId = "";
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