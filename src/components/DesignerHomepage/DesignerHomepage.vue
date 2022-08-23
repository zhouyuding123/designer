<template>
  <div>
    <div class="wrap">
      <div class="insidewrap">
        <div class="flex al-c">
          <div class="flex">
            <div class="avator">
              <img src="@/assets/imgers/头像.png" alt="" />
            </div>
            <div class="personbox">
              <div class="name flex al-c">
                <div>{{ myValue.nickname }}</div>
                <div class="font12 margin-left20">一星设计师</div>
              </div>
              <div class="idnumber">{{ myValue.in_code }}</div>
              <div class="collect">
                <span>
                  <span class="num">720</span>
                  <span class="word">收藏</span>
                </span>
                <span>
                  <span class="num">720</span>
                  <span class="word">关注</span>
                </span>
                <span>
                  <span class="num">720</span>
                  <span class="word">粉丝</span>
                </span>
                <span>
                  <span class="num">720</span>
                  <span class="word">帖子</span>
                </span>
              </div>
            </div>
          </div>
          <div class="PublishWorks" @click="toUploadWorks">发布作品</div>
        </div>
        <div class="Psignature">个性签名：{{ myValue.label }}</div>
      </div>
    </div>
    <div class="midbox">
      <el-tabs v-model="Works.category" @tab-click="handleClick">
        <el-tab-pane label="公开作品" name="2"></el-tab-pane>
        <el-tab-pane label="付费作品" name="3"></el-tab-pane>
        <el-tab-pane label="私密作品" name="1"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="list_free">
      <div class="list_free_list">
        <waterfall
          :cols="
            Math.floor(windowWidth / 300) >= 5
              ? 5
              : Math.floor(windowWidth / 300)
          "
          :dataList="myworkList"
          @loadmore="loadmore"
          @scroll="scroll"
        >
          <div
            class="masonry"
            v-for="(item, index) in myworkList"
            :key="index"
            @click="gowork(item)"
          >
            <div class="coverimg" v-if="Works.category == 2">
              <img :src="imagesValue + item.thumb" alt="" />
            </div>
            <div class="coverimg" v-else>
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
                  <div
                    v-for="(tag, i) in item.label.split(',') ||
                    item.label.split('，')"
                    :key="i"
                  >
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
                <img :src="imagesValue + item.headimage" alt="" />
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
              <div class="payworkline1title1">{{ payshowvalue.title }}</div>
              <div class="payworkline1titlename">
                {{ payshowvalue.nickname }}
              </div>
            </div>
          </div>
          <div class="payworkline2">
            <!-- <div>< img src="@/assets/myimger/感叹号.png" alt="" /></div> -->
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
          <!-- < img src="@/assets/myimger/small微信.png" alt="" /> -->
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
import { getListWorksApi, myCenterApi } from "@/urls/wsUrl.js";
import {
  ordersAddWorksApi,
  getOrderStatApi,
  payApi,
} from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl, imgUrls } from "@/assets/js/modifyStyle";
import waterfall from "../Designerzone/pul.vue";
export default {
  data() {
    return {
      activeName: "1",
      Works: {
        category: "2",
        status: 1,
        limit: "10",
        offset: "1",
        username: this.$route.params.id,
      },
      myworkList: [],
      windowWidth: document.documentElement.clientWidth,
      count: null,
      imagesValue: "",
      myValue: [],
      myusername: localStorage.getItem("use"),
      payshow: false,
      payshows: 1,
      payshowvalue: {},
      paymodel: "2",
      code: "",
      timer: null,
      payOver: {
        type:4,
        order_no:""
      },
      payorder_no: {
        order_no:""
      },
      paymore: "",
    };
  },
  created() {
    this.Works.username = this.$route.params.id;
    this.getmyworkList();
    this.myCenter();
    this.imagesValue = imgUrl();
    this.imagesValues = imgUrls();
  },
  components: {
    waterfall,
  },
  watch: {
    windowWidth(val) {
      let that = this;
      console.log("实时屏幕宽度：", val, that.windowHeight);
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
    myCenter() {
      var name = {
        username: this.$route.params.id,
      };
      postD(myCenterApi(), name).then((res) => {
        console.log(res);
        this.myValue = res.data;
      });
    },
    handleClick(tab, event) {
      this.Works.offset = 1;
      this.myworkList = [];
      this.getmyworkList();
    },
    getmyworkList() {
      postD(getListWorksApi(), this.Works).then((res) => {
        if(res.code == "-201") {
          this.$router.push("/about")
        }
        this.count = res.count;
        this.myworkList = [...this.myworkList, ...res.list];
      });
    },
    loadmore() {
      if (this.count != this.myworkList.length) {
        this.Works.offset++;
        this.getmyworkList();
      }
      // this.Works.offset=2
      // this.Listshow()
    },
    scroll() {},
    //跳转到发布作品
    toUploadWorks() {
      this.$router.push("/UploadWorks");
    },
    handleCommand(command) {
      // console.log(command)
      // console.log(id)
      if (command.title == "edit") {
        this.$router.push({ path: "/UploadWorks", query: { id: command.id } });
      }
      if (command.title == "share") {
        console.log(2);
      }
      if (command.title == "del") {
        // postD(delMyWorksApi(),{id:command.id}).then(res=>{

        // })
        console.log(123);
      }
    },
    gowork(val) {
      console.log(val);
      // this.$router.push("/workDetails"+val)
      if (val.category === 3) {
        if (val.username == localStorage.getItem("use") || val.is_pay == 1) {
          this.$router.push("/workDetails" + val.id);
        } else {
          this.payshow = true;
          this.payshowvalue = val;
        }
      }else {
        this.$router.push("/workDetails" + val.id);
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
                  this.$router.push("/workDetails"+ this.payshowvalue.id);
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
          console.log(res);
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
  },
};
</script>

<style lang="less" scoped>
@import url("./DesignerHomepage.less");
</style>