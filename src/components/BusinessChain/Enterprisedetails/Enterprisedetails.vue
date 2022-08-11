<template>
  <div>
    <div class="enttop">
      <div class="enttop_left">
        <div class="enttop_left_name">{{ designerEntL.nickname }}</div>
        <div class="enttop_left_line2">
          <el-rate
            v-model="value1"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          >
          </el-rate>
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
          <div
            v-for="item in shopValue"
            :key="item.id"
            class="shopimg"
            @click="showwork(item)"
          >
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
    <div style="margin-button: 20px">
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
    <el-dialog title="提示" :visible.sync="dialogVisible" width="750px">
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
              <div class="priceValue">¥{{ this.previewspec.price }}</div>
              <div class="Sold">已售123</div>
            </div>
            <div class="line1two">
              <span>{{ previewValueList.title }}</span>
            </div>
            <div class="line1treen">
              <div><span>满400减50</span></div>
              <div><span>满200减20</span></div>
            </div>
            <div class="line1four">
              <div class="line1fourValue">
                <div>
                  <img src="@/assets/imgers/正品.png" alt="" /><span>
                    100%正品
                  </span>
                </div>
                <div>
                  <img src="@/assets/imgers/七天.png" alt="" /><span
                    >7天无理由退换</span
                  >
                </div>
                <div>
                  <img src="@/assets/imgers/包邮.png" alt="" /><span>包邮</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="libn">
          <div class="linbn1">
            <div class="linbn1_xz">选择</div>
            <div class="linbn1_x2">请选择型号</div>
          </div>
          <div class="linbn1">
            <div class="linbn1_xz">配送</div>
            <div class="linbn1_x2">鄞州区奥克斯大厦</div>
          </div>
          <div class="linbn1">
            <div class="linbn1_xz">定位</div>
            <div class="linbn1_x2">中国浙江省宁波市鄞州区南部商务区...</div>
          </div>
          <div class="linbn2">
            <div class="linbn1_xz">商家服务</div>
            <div class="serveday">七天无理由</div>
            <div class="serveday">免配送</div>
          </div>
        </div>
        <div class="borders"></div>
        <div class="line2">
          <div class="details"><span>商品详情</span></div>
          <div class="htmlValue">
            <div>{{ contentsText }}</div>
          </div>
          <div v-for="(item, index) in contentsImg" :key="index">
            <img
              :src="imageValue + item"
              alt=""
              style="width: 100%; margin-top: 30px"
            />
          </div>
        </div>
      </div>
      <div class="bottoms dis">
        <div class="disleft">
          <div class="disleftimg">
            <img src="@/assets/imgers/购物车.png" alt="" />
          </div>
          <div class="disleftgwc">购物车</div>
        </div>
        <div class="dis discon">
          <div class="disrmb">￥</div>
          <div class="disrmb_num">49.99</div>
        </div>
        <div class="fq">
          <div @click="goapp">立即结算</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  showApi,
  shopListApi,
  getBrandApi,
  showProductApi,
} from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      listName: {
        username: "",
      },
      designerEntL: [],
      value1: 2,
      imageValue: "",
      description: "",
      brandvalue: [],
      index: 0,
      shopValue: [],
      seatchname: {
        username: "",
        type: "",
        limit: 10,
        offset: 1,
      },
      page1: {
        username: "",
        limit: 10,
        offset: 1,
      },
      total: 0,
      dialogVisible: false,
      previewspec: [],
      thumbs: [],
      previewValueList: [],
      contentsText: "",
      imagesValue: "",
      contentsImg: [],
    };
  },
  created() {
    this.listName.username = this.$route.params.name;
    this.seatchname.username = this.$route.params.name;
    this.page1.username = this.$route.params.name;
    this.imageValue = imgUrl();
    this.imagesValue = imgUrl();
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
      var ids = {
        id: val.id,
      };
      postD(showProductApi(), ids).then((res) => {
        this.dialogVisible = true;
        this.previewValueList = res.data;
        this.thumbs = JSON.parse(res.data.thumb).thumbList.split(",");
        this.previewspec = res.data.spec[0];
        var textimg = JSON.parse(res.data.content);
        this.contentsText = textimg.text;
        this.contentsImg = textimg.images.split(",").slice(1);
        console.log(this.contentsImg);
      });
    },
    goapp() {
      this.$router.push("/download");
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./Enterprisedetails.less");
</style>