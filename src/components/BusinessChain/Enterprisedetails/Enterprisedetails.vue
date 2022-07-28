<template>
  <div>
    <div class="enttop">
      <div class="enttop_left">
        <div class="enttop_left_name">{{ designerEntL.nickname }}</div>
        <div class="enttop_left_line2">
          <el-rate v-model="value1"></el-rate>
          <div class="pfs">4.0分</div>
          <div class="fss">粉丝数{{ designerEntL.follow }}</div>
        </div>
        <div class="enttop_left_line3">
          主营:{{ designerEntL.company_main }}
        </div>
        <div class="enttop_left_line4">
          {{ designerEntL.province }}{{ designerEntL.city
          }}{{ designerEntL.area }}
        </div>
        <div class="enttop_left_line5">{{ designerEntL.detail }}</div>
      </div>
      <div class="enttop_right">
        <div class="enttop_right_subscribe"><span>关注 </span></div>
        <div class="enttop_right_options">
          <div class="enttop_right_options1">
            <div><img src="@/assets/imgers/导航.png" alt="" /></div>
            <div class="enttop_right_options1_title">导航</div>
          </div>
          <div class="enttop_right_options1">
            <div><img src="@/assets/imgers/电话.png" alt="" /></div>
            <div class="enttop_right_options1_title">电话</div>
          </div>
          <div class="enttop_right_options1">
            <div><img src="@/assets/imgers/沟通.png" alt="" /></div>
            <div class="enttop_right_options1_title">沟通</div>
          </div>
        </div>
      </div>
    </div>
    <div class="entphoto">
      <div class="entphoto_value">
        <div class="entphoto_value_photo">企业照片</div>
        <div class="entphoto_value_img">
          <img :src="imageValue + designerEntL.shop_img" alt="" />
        </div>
      </div>
    </div>
    <div class="introduce">
      <div class="introduce_value">
        <div class="introduce_value_introduce">企业介绍</div>
        <div class="introduce_value_title">
          {{ description.introduce }}
        </div>
        <div class="introduce_value_video">
          <video :src="imageValue + description.video" controls></video>
        </div>
      </div>
    </div>
    <div class="entphoto">
      <div class="entphoto_value">
        <div class="entphoto_value_photo">相关资质</div>
        <div class="entphoto_value_img">
          <img :src="imageValue + designerEntL.license" alt="" />
        </div>
      </div>
    </div>
    <div class="entphoto">
      <div class="entphoto_value">
        <div class="entphoto_value_photo">商品展示</div>
        <div class="entphotoimg">
          <div class="leftout" @click="leftthumb">
            <img src="@/assets/imgers/left.png" alt="" />
          </div>
          <div class="allbox">
            <div class="outbox">
              <div class="innerbox">
                <div v-for="(item, index) in brandvalue" :key="index">
                  <img
                    class="cur"
                    :src="imageValue + item.thumb"
                    alt=""
                    @click="bandSeatch(item.id)"
                    style="
                      width: 140px;
                      height: 140px;
                      border: 1px solid #cccccc;
                      border-radius: 6px 6px 6px 6px;
                      margin: 20px 30px 0 20px;
                    "
                  />
                  <div class="titleband" style="margin-top: 10px">
                    {{ item.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="rightout" @click="rightthumb">
            <img src="@/assets/imgers/right.png" alt="" />
          </div>
        </div>
        <div class="paddingshop">
          <div v-for="item in shopValue" :key="item.id" class="shopimg" @click="showwork(item)">
            <img :src="imageValue + fullthumb(item.thumb)" alt="" />
            <div class="itemtitle">
              {{ item.title }}
            </div>
            <div class="item_jg">
              <div class="item_jg_pri">￥{{ item.spec[0].price }}</div>
              <div class="item_count">
                <div>已销{{ item.spec[0].count }}件</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-button:20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="seatchname.offset"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="seatchname.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { showApi, shopListApi, getBrandApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      listName: {
        username: "",
      },
      designerEntL: [],
      value1: null,
      imageValue: "",
      description: "",
      brandvalue: [],
      index: 0,
      shopValue: [],
      seatchname: {
        username: "",
        type: "",
        limit: 1,
        offset: 10,
      },
      page1: {
        username: "",
        limit: 10,
        offset: 1,
      },
      total: 0,
    };
  },
  created() {
    this.listName.username = this.$route.params.name;
    this.seatchname.username = this.$route.params.name;
    this.page1.username = this.$route.params.name;
    this.imageValue = imgUrl();
    this.getList();
    this.shopList();
    this.getBrand();
  },
  methods: {
    getList() {
      postD(showApi(), this.listName).then((res) => {
        this.designerEntL = res.data;
        this.description = JSON.parse(this.designerEntL.description);
      });
    },
    shopList() {
      postD(shopListApi(), this.listName).then((res) => {
        this.shopValue = res.list;
        this.total = res.count;
      });
    },
    getBrand() {
      postD(getBrandApi(), this.listName).then((res) => {
        this.brandvalue = res.list;
      });
    },
    leftthumb() {
      if (this.index == 0) {
        this.index = this.brandvalue.length;
      } else {
        this.index--;
      }
      this.move();
    },
    rightthumb() {
      if (this.index == this.brandvalue.length) {
        this.index = 0;
      } else {
        this.index++;
      }
      this.move();
    },
    move() {
      var innerbox = document.getElementsByClassName("innerbox")[0];
      var img = document
        .getElementsByClassName("innerbox")[0]
        .getElementsByTagName("img");
      innerbox.style.left = -img[0].offsetWidth * this.index + "px";
    },
    fullthumb(val) {
      var adder = JSON.parse(val).thumbList.split(",")[1];
      return adder;
    },
    bandSeatch(val) {
      console.log(val);
      this.seatchname.type = val;
      postD(shopListApi(), this.seatchname).then((res) => {
        console.log(res);
      });
    },
    handleSizeChange(val) {
      if (this.seatchname.type) {
        this.seatchname.limit = val;
        postD(shopListApi(), this.seatchname).then((res) => {
          this.shopValue = res.list;
          this.total = res.count;
        });
      } else {
        this.page1.limit = val;
        postD(shopListApi(), this.page1).then((res) => {
          this.shopValue = res.list;
          this.total = res.count;
        });
      }
    },
    handleCurrentChange(val) {
      if (this.seatchname.type) {
        this.seatchname.offset = val;
        postD(shopListApi(), this.seatchname).then((res) => {
          this.shopValue = res.list;
         this.total = res.count;
        });
      } else {
        this.page1.offset = val;
        postD(shopListApi(), this.page1).then((res) => {
          this.shopValue = res.list;
         this.total = res.count;
        });
      }
    },
    showwork(val) {
      console.log(val);
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./Enterprisedetails.less");
</style>