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
    <div>
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
    <el-dialog title="预览" :visible.sync="dialogVisible" width="750px">
      <div class="PreviewBody">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in thumbs" :key="item">
            <div v-if="item.split('/')[0] == 'moves'">
              <video style="width: 750px; height: 300px" controls>
                <source :src="imagesValue + item" type="video/mp4" />
                <source :src="imagesValue + item" type="video/ogg" />
              </video>
            </div>
            <div v-if="item.split('/')[0] == 'images'">
              <el-image
                :src="imagesValue + item"
                alt=""
                :preview-src-list="[imagesValue + item]"
                style="width: 750px; height: 300px"
              />
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="line1">
          <div class="line1Value">
            <div class="line1one">
              <div class="priceValue">¥{{ previewspec.price }}</div>
            </div>
            <div class="line1two">
              <span>{{ previewValueList.title }}</span>
            </div>
            <div class="line1treen">
              <div><img src="@/assets/myimger/拇指.png" alt=""></div>
              <div><span>最近有39人收藏过此服务</span></div>
              <div><span>1547条评论 ></span></div>
            </div>
            <div class="line1four">
              <div class="line1fourValue">
                <div>
                  <span>
                    服务
                  </span>
                </div>
                <div>
                 <span
                    >免配送费丨损坏包赔</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="borderline2"></div>
        <div class="lein3">
          <div class="details"><span>服务内容</span></div>
          <div class="detailss">改衣件数<span>2件</span></div>
          <div class="detailss">衣物种类<span>支持所有衣服裤子类型</span></div>
          <div class="detailss">衣物材质<span>全材料可改衣</span></div>
          <div class="detailss">改衣时效<span>5-8天</span></div>
          <div class="detailss">补价说明<span>奢侈品/羊绒类/真丝类改衣需额外沟通</span></div>
          <div class="detailss">更多说明<span>由于疫情原因快递运输可能会有延期</span></div>
        </div>
        <div class="borderline2"></div>
        <div class="line2">
          <div class="details"><span>商品详情</span></div>
          <div class="htmlValue">
            <div>
              <p style="padding-bottom:50px">{{ contentsText }}</p>
              <p v-for="item in contentsImgs" :key="item">
                <video
                  style="width: 550px; height: 300px"
                  controls
                  v-if="item.split('/')[0] == 'video'"
                >
                  <source :src="imagesValue + item" type="video/mp4" />
                  <source :src="imagesValue + item" type="video/ogg" />
                </video>
                <img
                  v-if="item.split('/')[0] == 'images'"
                  :src="imagesValue + item"
                  alt=""
                  :preview-src-list="[imagesValue + item]"
                  style="width: 550px; height: 300px"
                />
              </p>
            </div>
          </div>
        </div>
        <div class="borderline2"></div>
      </div>
      <div style="padding-top: 15px">
        <span>
          <el-button @click="dialogVisible = false">返 回</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getListApi, companyGetListApi,showProductApi } from "@/urls/wsUrl.js";
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