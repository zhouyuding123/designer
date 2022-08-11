<template>
  <div>
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
          class="cardboxs"
          @click="whole()"
          ref="wholes"
          v-if="vip.style_vip == 1"
          style="heiht:260px"
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
    <div class="wrap" style="margin-top: 20px">
      <div class="flex ju-b">
        <div class="maintitle">支付方式</div>
        <div class="" style="margin-right: 40px">
          <span class="font14 color999 fontw400">应付金额：</span>
          <span style="color: #f20000">¥</span>
          <span
            class="font28"
            style="color: #f20000; font-weight: bold"
            v-if="vip.style_vip == 1"
            >{{
              numtwo(
                Price.vip_designer_price_month *
                  (Price.vip_business_discount / 100)
              )
            }}</span
          >
          <span
            class="font28"
            style="color: #f20000; font-weight: bold"
            v-if="vip.style_vip == 2"
            >{{
              numtwo(
                Price.vip_designer_price_quarter *
                  (Price.vip_business_discount / 100)
              )
            }}</span
          >
          <span
            class="font28"
            style="color: #f20000; font-weight: bold"
            v-if="vip.style_vip == 3"
            >{{
              numtwo(
                Price.vip_designer_price_year *
                  (Price.vip_business_discount / 100)
              )
            }}</span
          >
        </div>
      </div>
      <div class="flex ju-b" style="margin: 0 370px">
        <div class="pay">
          <div class="payborder">
            <img src="@/assets/imgers/二维码.png" alt="" />
          </div>
          <div class="word">支付宝支付</div>
        </div>
        <div class="pay">
          <div class="payborder">
            <img src="@/assets/imgers/二维码.png" alt="" v-if="QRcode == ''" />
            <img :src="imagesValue + QRcode" alt="" v-if="QRcode" />
          </div>
          <div class="word">微信支付</div>
        </div>
      </div>
    </div>

    <div class="font14 paddtb20 xf">
      <el-checkbox v-model="checked" @change="zxc"></el-checkbox>

      <span>我已阅读并同意</span>
      <span style="font-weight: 400; color: #1677ff; text-decoration: underline"
        >会员权益及付费说明</span
      >
    </div>
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
      checked: false,
      vip: {
        style_vip: "1",
      },
      Price: [],
      // 读取订单明细
      orders: {
        order_no: "",
        type: "2",
      },
      pay: {
        order_no: "",
      },
      QRcode: "",
      imagesValue: "",
      times: null,
      paymore: "",
    };
  },
  created() {
    this.getConfigDataApi();
    this.imagesValue = imgUrls();
  },
  methods: {
    getConfigDataApi() {
      postD(getConfigDataApi()).then((res) => {
        this.Price = res.data;
      });
    },
    zxc() {
      if (this.checked == true) {
        postD(addVipApi(), this.vip).then((res) => {
          this.orders.order_no = res.data.order_no;
          this.pay.order_no = res.data.order_no;
          postD(payApi(), this.pay).then((res) => {
            this.QRcode = res.data.substring(10);
            if (this.orders) {
              this.times = setInterval(() => {
                this.dqddmx();
                if (this.paymore == 1 || this.paymore == 3) {
                  this.$message({
                    offset: 80,
                    type: "success",
                    message: "恭喜你成为尊贵的会员",
                  });
                  clearInterval(this.times);
                  this.$router.replace("/UploadWorks");
                }
              }, 1000);
            }
          });
        });
      }
    },
    dqddmx() {
      if (this.checked == true) {
        postD(getOrderStatApi(), this.orders).then((res) => {
          this.paymore = res.data.is_pay;
        });
      } else {
        this.QRcode = "";
        clearInterval(this.times);
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
@import url("./OpenMember.less");
</style>