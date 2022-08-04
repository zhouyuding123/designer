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
        <div v-for="(item, index) in valueListE" :key="index">
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
              <div class="dzhi">
                {{ item.province }}{{ item.city }}{{ item.area
                }}{{ item.detail }}
              </div>
            </div>
            <div class="morelist" @click="goentDetail(item.username)">
              <img src="@/assets/imgers/more3.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="total > 10">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="Listvalue.offset"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="Listvalue.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
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
        limit: 10,
        offset: 1,
        company_main: "",
        city: "",
      },
      page1: {
        limit: 10,
        offset: 1,
        city: "",
      },
      valueListE: [],
      company_mainId: 0,
      total: 0,
    };
  },
  created() {
    this.account();
    this.getListApi();
    this.enterpriseList();
    this.imagesValue = imgUrl();
  },
  methods: {
    account() {
      this.Listvalue.city = this.getCookie("ress");
      this.page1.city = this.getCookie("ress");
    },
    getCookie(name) {
      var arr = document.cookie.split(";");
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        if (arr2[0].trim() == name) {
          return arr2[1];
        }
      }
    },
    getListApi() {
      this.Listvalue.company_main = "";
      postD(getListApi()).then((res) => {
        this.getList = res.list;
      });
      this.enterpriseList();
    },
    freelists(val) {
      this.company_mainId = "";
      this.Listvalue.company_main = val;
      postD(companyGetListApi(), this.Listvalue).then((res) => {
        this.valueListE = res.list;
        this.total = res.count;
      });
    },
    enterpriseList() {
      postD(companyGetListApi(), this.page1).then((res) => {
        this.valueListE = res.list;
        this.total = res.count;
      });
    },
    goentDetail(val) {
      this.$router.push("/entDetail" + val);
    },
    handleSizeChange(val) {
      if (this.Listvalue.company_main == "") {
        this.page1.limit = val;
        postD(companyGetListApi(), this.page1).then((res) => {
          this.valueListE = res.list;
          this.total = res.count;
        });
      }
      if (this.Listvalue.company_main) {
        this.Listvalue.limit = val;
        postD(companyGetListApi(), this.Listvalue).then((res) => {
          this.valueListE = res.list;
          this.total = res.count;
        });
      }
    },
    handleCurrentChange(val) {
      if (this.Listvalue.company_main == "") {
        this.page1.offset = val;
        postD(companyGetListApi(), this.page1).then((res) => {
          this.valueListE = res.list;
          this.total = res.count;
        });
      }
      if (this.Listvalue.company_main) {
        console.log(this.Listvalue.company_main);
        this.Listvalue.offset = val;
        postD(companyGetListApi(), this.Listvalue).then((res) => {
          this.valueListE = res.list;
          this.total = res.count;
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./enterprisezone.less");
</style>