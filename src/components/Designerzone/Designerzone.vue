<template>
  <div>
    <div class="syimg">
      <el-carousel height="560px">
        <el-carousel-item v-for="item in advertisementImg" :key="item.id">
          <img
            :src="imagesValue + item.thumb"
            style="height: 560px; max-wdith: 100%"
            alt=""
            @click="goad(item)"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="area">
      <div @click="free()" ref="freelist">
        <span ref="freelistspan">免费专区</span>
      </div>
      <div @click="pay()" ref="paylist">
        <span ref="paylistspan">付费专区</span>
      </div>
    </div>
    <div v-if="freeShow == true" class="sadx">
      <div class="screen">
        <el-radio
          v-for="item in getList"
          :key="item.id"
          v-model="Works.product_type_id"
          :label="item.id"
          @change="freelists(item.id)"
          border
          >{{ item.title }}</el-radio
        >
      </div>
    </div>

    <div class="list_free">
      <div class="list_free_list">
        <waterfall
          v-if="Works.category == 2"
          :cols="
            Math.floor(windowWidth / 300) >= 5
              ? 5
              : Math.floor(windowWidth / 300)
          "
          :dataList="workList"
          @loadmore="loadmore"
          @scroll="scroll"
        >
          <div class="masonry" v-for="(item, index) in workList" :key="index">
            <div class="coverimg">
              <img
                :src="imagesValue + item.thumb"
                @click="todetails(item.id)"
                alt=""
              />
            </div>
            <div class="list_title">
              <div class="list_title_title">
                <div class="list_title_title_title">{{ item.title }}</div>
                <div class="list_title_title_title_tag flex">
                  <div v-for="(tag, i) in item.label.split(',')" :key="i">
                    #{{ tag }}
                  </div>
                  <!-- <div>礼服</div> -->
                </div>
                <div class="flex icon al-c">
                  <div class="flex al-c coloccc font12 margin-right8">
                    <img
                      src="@/assets/imgers/icon/15228@2x.png"
                      class="margin-right4"
                      alt=""
                    />
                    999
                  </div>
                  <div
                    class="flex al-c coloccc font12 margin-right8 cur"
                    @click="gochat(item.username)"
                  >
                    <img
                      src="@/assets/imgers/icon/15225@2x.png"
                      class="margin-right4"
                      alt=""
                    />
                    999
                  </div>
                  <div class="flex al-c coloccc font12 margin-right8">
                    <img
                      src="@/assets/imgers/icon/15229@2x.png"
                      class="margin-right4"
                      alt=""
                    />
                    999
                  </div>
                  <div class="flex al-c coloccc font12 margin-right8">
                    <img
                      src="@/assets/imgers/icon/15227@2x.png"
                      class="margin-right4"
                      alt=""
                    />
                    999
                  </div>
                </div>
              </div>
              <div
                class="list_title_img"
                @click.stop="topersonalinfo(item.username)"
              >
                <img
                  v-if="item.headimage == null"
                  :src="imagesValue + wuimg"
                  alt=""
                />
                <img v-else :src="imagesValue + item.headimage" alt="" />
              </div>
            </div>
          </div>
        </waterfall>
        <waterfall
          v-if="Works.category == 3"
          :cols="
            Math.floor(windowWidth / 300) >= 5
              ? 5
              : Math.floor(windowWidth / 300)
          "
          :dataList="workList"
          @loadmore="loadmore"
          @scroll="scroll"
        >
          <div
            class="masonry"
            v-for="(item, index) in workList"
            :key="index"
            @click="payit(item)"
          >
            <div class="coverimg">
              <div class="payimg">
                <img
                  :src="imagesValue + item.thumb"
                  :class="{
                    zhezhao: !(item.is_pay == 1 || item.username == myusername),
                  }"
                  alt=""
                />
              </div>
              <img
                src="@/assets/imgers/12574@2x.png"
                v-if="!(item.is_pay == 1 || item.username == myusername)"
                class="img1"
                alt=""
              />
            </div>
            <div class="list_title">
              <div class="list_title_title">
                <div class="list_title_title_title">{{ item.title }}</div>
                <div class="list_title_title_title_tag flex">
                  <div v-for="(tag, i) in item.label.split(',')" :key="i">
                    #{{ tag }}
                  </div>
                  <!-- <div>礼服</div> -->
                </div>
                <div class="flex icon al-c">
                  <div class="flex al-c coloccc font12 margin-right8">
                    <img
                      src="@/assets/imgers/icon/15228@2x.png"
                      class="margin-right4"
                      alt=""
                    />
                    999
                  </div>
                  <div class="flex al-c coloccc font12 margin-right8">
                    <img
                      src="@/assets/imgers/icon/15225@2x.png"
                      class="margin-right4"
                      alt=""
                    />
                    999
                  </div>
                  <div class="flex al-c coloccc font12 margin-right8">
                    <img
                      src="@/assets/imgers/icon/15229@2x.png"
                      class="margin-right4"
                      alt=""
                    />
                    999
                  </div>
                  <div class="flex al-c coloccc font12 margin-right8">
                    <img
                      src="@/assets/imgers/icon/15227@2x.png"
                      class="margin-right4"
                      alt=""
                    />
                    999
                  </div>
                </div>
              </div>
              <div class="list_title_img">
                <img
                  v-if="item.headimage == null"
                  :src="imagesValue + wuimg"
                  alt=""
                />
                <img v-else :src="imagesValue + item.headimage" alt="" />
              </div>
            </div>
          </div>
        </waterfall>
      </div>
    </div>
    <el-dialog :visible.sync="payshow" width="600px">
      <div v-if="payshows == 1">
        <div class="paywork">
          <div class="payworkline1">
            <div class="payworkline1img">
              <img :src="imagesValue + payshowvalue.thumb" alt="" />
            </div>
            <div class="payworkline1title">
              <div class="payworkline1title1 cc">{{ payshowvalue.title }}</div>
              <div class="payworkline1titlename">
                {{ payshowvalue.nickname }}
              </div>
            </div>
          </div>
          <div class="payworkline2">
            <!-- <div><img src="@/assets/myimger/感叹号.png" alt="" /></div> -->
            <div class="payworkline2tit">
              因该作品为私密作品，付费后可永久查看
            </div>
          </div>
          <div class="payworkline3">
            <div class="payworkline3zf">支付金额：</div>
            <div class="payworkline3zfmo">￥{{ payshowvalue.money }}</div>
          </div>
          <div class="payworkline4">
            <div class="payworkline4bor"></div>
            <div class="payworkline4ye">
              <el-radio v-model="paymodel" label="1">余额</el-radio>
            </div>
            <div class="payworkline4bor"></div>
            <div class="payworkline4dsf">
              <el-radio v-model="paymodel" label="2">第三方支付</el-radio>
            </div>
            <div class="payworkline4bor"></div>
          </div>
        </div>

        <div style="padding-top: 30px">
          <el-button type="primary" @click="addpay"
            ><span>立即购买</span></el-button
          >
        </div>
      </div>
      <div v-if="payshows == 2">
        <div class="smalls">
          <!-- <img src="@/assets/myimger/small微信.png" alt="" /> -->
          <div>使用微信扫一扫支付</div>
        </div>
        <img :src="imagesValues + code" alt="" style="margin-top: 42px" />
        <div style="padding-top: 30px">
          <span slot="footer" class="dialog-footer">
            <el-button @click="payshow = false">取 消</el-button>
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import {
  getListWorksApi,
  getListApi,
  AdApi,
  ordersAddWorksApi,
  getOrderStatApi,
  payApi,
} from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrls, imgUrl } from "@/assets/js/modifyStyle";
import waterfall from "./pul.vue";

export default {
  inject: ["reload"],
  data() {
    return {
      wuimg: "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
      freeShow: true,
      getList: [],
      Works: {
        category: "2",
        product_type_id: undefined,
        limit: "10",
        offset: "1",
      },
      workList: [],
      imagesValue: "",
      imagesValues: "",
      windowWidth: document.documentElement.clientWidth,
      tid: {
        tid: 10,
      },
      advertisementImg: [],
      myusername: "",
      payshow: false,
      payshows: 1,
      payshowvalue: {},
      paymodel: "2",
      code: "",
      times: 60,
      payOver: {
        type: 4,
        order_no: "",
      },
      payorder_no: {
        order_no: "",
      },
      paymore: "",
    };
  },
  components: {
    waterfall,
  },
  created() {
    this.Listshow();
    this.getListApi();
    this.imagesValue = imgUrl();
    this.advertisement();
    this.myusername = localStorage.getItem("use");
    this.imagesValues = imgUrls();
  },
  watch: {
    windowWidth(val) {
      let that = this;
    },
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        // this.windowHeight = window.fullHeight;  // 高
        this.windowWidth = window.fullWidth; // 宽
      })();
    };
  },
  methods: {
    advertisement() {
      postD(AdApi(), this.tid).then((res) => {
        this.advertisementImg = res.list;
      });
    },
    Listshow() {
      postD(getListWorksApi(), this.Works).then((res) => {
        this.workList = [...this.workList, ...res.list];
        this.count = res.count;
        if (res.code == "-201") {
          this.$router.push("/about");
        }
      });
    },
    free() {
      this.$refs.freelist.style.backgroundColor = "#FFDC00";
      this.$refs.freelistspan.style.color = "#333333";
      this.$refs.paylist.style.backgroundColor = "#F5F5F5";
      this.$refs.paylistspan.style.color = "#999999";
      this.Works.category = "2";
      this.Works.offset = "1";
      this.workList = [];
      this.Listshow();
    },
    pay() {
      this.$refs.freelist.style.backgroundColor = "#F5F5F5";
      this.$refs.freelistspan.style.color = "#999999";
      this.$refs.paylist.style.backgroundColor = "#FFDC00";
      this.$refs.paylistspan.style.color = "#333333";
      this.Works.category = "3";
      this.Works.offset = "1";
      this.workList = [];
      this.Listshow();
    },
    getListApi() {
      postD(getListApi()).then((res) => {
        if (res.code == "-201") {
          this.$router.push("/about");
        }
        this.getList = res.list;
      });
    },
    freelists(val) {
      this.Works.product_type_id = val;
      this.Works.offset = "1";
      this.workList = [];
      this.Listshow();
    },
    loadmore() {
      if (this.count != this.workList.length) {
        this.Works.offset++;
        this.Listshow();
      }
      // this.Works.offset=2
      // this.Listshow()
    },
    scroll() {},
    //点击设计师头像
    topersonalinfo(name) {
      this.$router.push("/DesignerHomepage" + name);
    },
    todetails(id) {
      this.$router.push("/workDetails" + id);
    },
    goad(val) {
      this.$router.push(val.url);
    },
    //付费作品跳转
    payit(obj) {
      if (obj.username == localStorage.getItem("use") || obj.is_pay == 1) {
        this.$router.push("/workDetails" + obj.id);
      } else {
        this.payshow = true;
        this.payshowvalue = obj;
      }
    },
    addpay() {
      postD(ordersAddWorksApi(), { works_id: this.payshowvalue.id }).then(
        (res) => {
          this.payshows = 2;
          this.payorder_no.order_no = res.data.order_no;
          this.payOver.order_no = res.data.order_no;
          postD(payApi(), this.payorder_no).then((res) => {
            if (res.code == 200) {
              this.code = res.data.substring(10);
              if (this.payOver.order_no != "") {
                this.timer = setInterval(() => {
                  this.OneSecond();
                  if (this.paymore == 1 || this.paymore == 3) {
                    this.$message({
                      offset: 80,
                      type: "success",
                      message: "恭喜付费成功",
                    });
                    clearInterval(this.timer);
                    this.$router.push("/workDetails" + this.payshowvalue.id);
                  }
                }, 1000);
              }
            }
          });
        }
      );
    },
    OneSecond() {
      if (this.payshow == true) {
        postD(getOrderStatApi(), this.payOver).then((res) => {
          this.paymore = res.data.is_pay;
        });
      } else {
        this.code = "";
        this.payorder_no.order_no = "";
        this.payOver.order_no = "";
        this.payshows = 1;
        clearInterval(this.timer);
      }
    },
    gochat(val) {
      var name = localStorage.getItem("use");
      if (name !== val) {
        this.$router.push("/chat" + val);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./Designerzone.less");
</style>