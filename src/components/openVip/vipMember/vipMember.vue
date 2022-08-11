<template>
  <div class="addpadding">
    <div class="wrap">
      <div class="maintitle">套餐选择</div>
      <div class="flex ju-a">
        <div
          class="cardbox"
          @click="whole()"
          ref="wholes"
          v-if="vip.style_vip != 1"
        >
          <div class="title" ref="wholes">月卡会员</div>
          <div class="nowprice" ref="wholess">
            <span class="font24 margin-right4">¥</span
            >{{
              numtwo(
                Price.vip_designer_price_month *
                  (Price.vip_business_discount / 100)
              )
            }}
          </div>
          <div class="price">¥{{ Price.vip_designer_price_month }}</div>
          <div class="describe">每天仅需30元</div>
        </div>
        <div
          class="cardbox"
          @click="whole()"
          ref="wholes"
          v-if="vip.style_vip == 1"
        >
          <div class="title" ref="wholes">月卡会员</div>
          <div class="nowprice" ref="wholess">
            <span class="font24 margin-right4">¥</span
            >{{
              numtwo(
                Price.vip_designer_price_month *
                  (Price.vip_business_discount / 100)
              )
            }}
          </div>
          <div class="price">¥{{ Price.vip_designer_price_month }}</div>
          <div class="describe">每天仅需30元</div>
        </div>
        <div class="cardbox" @click="onTheShelf()" ref="PutOn">
          <div class="title" ref="PutOn">季卡会员</div>
          <div class="nowprice" ref="PutOns">
            <span class="font24 margin-right4">¥</span
            >{{
              numtwo(
                Price.vip_designer_price_quarter *
                  (Price.vip_business_discount / 100)
              )
            }}
          </div>
          <div class="price">¥{{ Price.vip_designer_price_quarter }}</div>
          <div class="describe">每天仅需30元</div>
        </div>
        <div class="cardbox" @click="underShelfx()" ref="Offtheshelf">
          <div class="title" ref="Offtheshelf">年卡会员</div>
          <div class="nowprice" ref="Offtheshelfs">
            <span class="font24 margin-right4">¥</span
            >{{
              numtwo(
                Price.vip_designer_price_year *
                  (Price.vip_business_discount / 100)
              )
            }}
          </div>
          <div class="price">¥{{ Price.vip_designer_price_year }}</div>
          <div class="describe">每天仅需30元</div>
        </div>
      </div>
    </div>
    <div class="addline2">
      <div v-if="vip.style_vip == 1">
        <div class="addline2yj">
          <div class="addline2yj1">原价</div>
          <div class="addline2yj2">￥{{ Price.vip_designer_price_month }}</div>
        </div>
        <div class="addborder"></div>
        <div class="addline2yj" style="margin-top: 20px">
          <div class="addline2yj1">限时特惠</div>
          <div class="addred">
            ￥{{
              numtwo(
                Price.vip_designer_price_month *
                  (Price.vip_business_discount / 100)
              )
            }}
          </div>
        </div>
      </div>
      <div v-if="vip.style_vip == 2">
        <div class="addline2yj">
          <div class="addline2yj1">原价</div>
          <div class="addline2yj2">￥{{ Price.vip_designer_price_month }}</div>
        </div>
        <div class="addborder"></div>
        <div class="addline2yj" style="margin-top: 20px">
          <div class="addline2yj1">限时特惠</div>
          <div class="addred">
            ￥{{
              numtwo(
                Price.vip_designer_price_quarter *
                  (Price.vip_business_discount / 100)
              )
            }}
          </div>
        </div>
      </div>
      <div v-if="vip.style_vip == 3">
        <div class="addline2yj">
          <div class="addline2yj1">原价</div>
          <div class="addline2yj2">
            ￥{{ Price.vip_designer_price_quarter }}
          </div>
        </div>
        <div class="addborder"></div>
        <div class="addline2yj" style="margin-top: 20px">
          <div class="addline2yj1">限时特惠</div>
          <div class="addred">
            ￥{{
              numtwo(
                Price.vip_designer_price_year *
                  (Price.vip_business_discount / 100)
              )
            }}
          </div>
        </div>
      </div>
    </div>
    <div class="addline3">
      <div class="xzadd">支付方式</div>
      <div class="addfzxx">
        <div>
          <el-radio label="1" v-model="radio1" border fill="#00B567">
            <img src="@/assets/imgers/支付宝.png" alt="" class="addimg" />
            <div class="zffs">支付宝支付</div>
          </el-radio>
          <el-radio v-model="radio1" label="2" border fill="#00B567">
            <img src="@/assets/imgers/微信.png" alt="" class="addimg" />
            <div class="zffs">微信支付</div>
          </el-radio>
          <el-radio label="3" v-model="radio1" border fill="#00B567">
            <img src="@/assets/imgers/银行卡.png" alt="" class="addimg" />
            <div class="zffs">银行卡支付</div>
          </el-radio>
        </div>
      </div>
    </div>
    <div class="addline4">
      <div class="xzadd">会员权益</div>
      <div class="line3text">
        <div class="line3textimg">
          <img src="@/assets/imgers/会员权益.png" alt="" />
        </div>
        <div class="line3text_text">
          <div class="line3text_text1">发布作品不设权限</div>
          <div class="line3text_text2">
            会员有效期内，会员用户可以任意发布付费作品和私密作品
          </div>
        </div>
      </div>
    </div>
    <div class="xf">
      <el-checkbox v-model="checked" @change="zxc"
        >到期后自动续费（可随时取消）</el-checkbox
      >
    </div>
    <div class="addok">
      <div @click="goPayment">
        <span>立即开通</span>
      </div>
    </div>
    <el-dialog title="微信支付" :visible.sync="dialogVisible" width="30%">
      <div class="smalls">
        <img src="@/assets/imgers/small微信.png" alt="" />
        <div>使用微信扫一扫支付</div>
      </div>
      <img :src="imagesValue + code" alt="" style="margin-top: 42px" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getConfigDataApi,
  addVipApi,
  getOrderStatApi,
  payApi,
} from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrls } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      imagesValue: "",
      checked: false,
      vip: {
        style_vip: "1",
      },
      Price: [],
      radio1: "2",
      checked: false,
      vipvalue: {
        order_no: "",
      },
      dialogVisible: false,
      code: "",
      payOver: {
        order_no: "",
        type: "2",
      },
      times: null,
      paymore: "",
    };
  },
  created() {
    this.imagesValue = imgUrls();
    this.getConfigDataApi();
  },
  methods: {
    zxc() {
      if (this.checked == true) {
        this.vip.style_vip = 4;
      }
    },
    getConfigDataApi() {
      postD(getConfigDataApi()).then((res) => {
        this.Price = res.data;
      });
    },
    goPayment() {
      if (this.vip.style_vip != "") {
        this.dialogVisible = true;
        postD(addVipApi(), this.vip).then((res) => {
          this.vipvalue.order_no = res.data.order_no;
          this.payOver.order_no = res.data.order_no;
          postD(payApi(), this.vipvalue).then((res) => {
            this.code = res.data.substring(10);
            if (this.payOver.order_no != "") {
              this.timer = setInterval(() => {
                this.OneSecond();
                if (this.paymore == 1 || this.paymore == 3) {
                  this.$message({
                    offset: 80,
                    type: "success",
                    message: "恭喜你成为尊贵的会员",
                  });
                  clearInterval(this.timer);
                  this.$router.replace("/openVip");
                }
              }, 1000);
            }
          });
        });
      }
    },
    OneSecond() {
      if (this.dialogVisible == true) {
        postD(getOrderStatApi(), this.payOver).then((res) => {
          this.paymore = res.data.is_pay;
        });
      } else {
        this.code = "";
        clearInterval(this.timer);
      }
    },
    whole() {
      this.$refs.wholes.style.backgroundColor = "#FDFBED";
      this.$refs.wholes.style.color = "#905F12";
      this.$refs.wholess.style.color = "#905F12";
      this.$refs.PutOn.style.backgroundColor = "";
      this.$refs.PutOn.style.color = "";
      this.$refs.PutOns.style.color = "";
      this.$refs.Offtheshelf.style.backgroundColor = "";
      this.$refs.Offtheshelf.style.color = "";
      this.$refs.Offtheshelfs.style.color = "";
      this.vip.style_vip = 1;
    },
    onTheShelf() {
      this.$refs.wholes.style.backgroundColor = "";
      this.$refs.wholes.style.color = "";
      this.$refs.wholess.style.color = "";
      this.$refs.PutOn.style.backgroundColor = "#FDFBED";
      this.$refs.PutOn.style.color = "#905F12";
      this.$refs.PutOns.style.color = "#905F12";
      this.$refs.Offtheshelf.style.backgroundColor = "";
      this.$refs.Offtheshelf.style.color = "";
      this.$refs.Offtheshelfs.style.color = "";
      this.vip.style_vip = 2;
    },
    underShelfx() {
      this.$refs.wholes.style.backgroundColor = "";
      this.$refs.wholes.style.color = "";
      this.$refs.wholess.style.color = "";
      this.$refs.PutOn.style.backgroundColor = "";
      this.$refs.PutOn.style.color = "";
      this.$refs.PutOns.style.color = "";
      this.$refs.Offtheshelf.style.backgroundColor = "#FDFBED";
      this.$refs.Offtheshelf.style.color = "#905F12";
      this.$refs.Offtheshelfs.style.color = "#905F12";
      this.vip.style_vip = 3;
    },
    numtwo(val) {
      return val.toFixed(2);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./vipMember.less");
</style>