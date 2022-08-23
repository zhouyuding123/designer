<template>
  <div>
    <div class="bond_body">
      <div class="bond_tit">平台保证金</div>
      <div class="Paid">实付金额</div>
      <div class="money">￥2500</div>
      <div class="flex ju-b" style="margin: 40px 350px">
        <div class="pay">
          <div class="payborder">
            <img src="@/assets/imgers/二维码.png" alt="" />
          </div>
          <div class="word">支付宝支付</div>
        </div>
        <div class="pay">
          <div class="payborder">
            <img
              :src="imagesValue + QRcode"
              alt=""
              v-if="QRcode"
              style="width: 200px; height: 200px"
            />
          </div>
          <div class="words">微信支付</div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="480px">
      <div class="bandw">
        <div class="bondshow">
          <div style="padding-top: 80px">
            <img src="@/assets/imgers/bond成功.png" alt="" />
          </div>
          <div class="ok_tit">支付成功</div>
          <div class="ok_tit_2">权益将在5分钟内生效</div>
          <div class="gofirst" @click="goFirst">返回首页</div>
        </div>
        <div class="boFback"></div>
        <div style="padding: 23px 40px">
          <div
            class="dis"
            style="font-size: 16px; font-weight: 400; color: #333333"
          >
            <div>实付金额：￥</div>
            <div>88.00</div>
          </div>
          <div
            class="dis"
            style="
              margin-top: 10px;
              font-size: 16px;
              font-weight: 400;
              color: #333333;
            "
          >
            购买明细：平台保证金
          </div>
        </div>
        <div class="footbond">
          您已成功开通平台会员，第一时间获取平台最新消息。
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { bondApi, payApi, getOrderStatApi } from "@/urls/wsUrl.js";
import { imgUrls } from "@/assets/js/modifyStyle";
import { postD } from "@/api";
export default {
  data() {
    return {
      QRcode: "",
      // 读取订单明细
      orders: {
        order_no: "",
        type: "5",
      },
      pay: {
        order_no: "",
      },
      imagesValue: "",
      times: null,
      paymore: "",
      dialogVisible: false,
    };
  },
  created() {
    this.imagesValue = imgUrls();
    this.bond();
  },
  methods: {
    bond() {
      postD(bondApi()).then((res) => {
        if(res.code == "-201") {
          this.$router.push("/about")
        }
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
                  message: "缴纳成功",
                });
                clearInterval(this.times);
                this.dialogVisible = true;
              }
            }, 1000);
          }
        });
      });
    },
    dqddmx() {
      console.log(this.paymore);
      if (this.QRcode) {
        postD(getOrderStatApi(), this.orders).then((res) => {
          this.paymore = res.data.is_pay;
        });
      } else {
        this.QRcode = "";
        clearInterval(this.times);
      }
    },
    goFirst() {
      this.$router.push("/SpecialArea");
    },
  },
};
</script>

<style lang="less" scoped>
.footbond {
  height: 70px;
  width: 480px;
  background: #f5f5f5;
  font-size: 14px;
  font-weight: 400;
  color: #999999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.boFback {
  height: 10px;
  width: 100%;
  background: #f5f5f5;
  margin-top: 40px;
}
.gofirst {
  font-size: 14px;
  font-weight: 400;
  padding-top: 80px;
  color: #f2f2f2;
  cursor: pointer;
}
.ok_tit_2 {
  font-size: 14px;
  font-weight: 400;
  color: #1677ff;
  padding-top: 10px;
}
.ok_tit {
  font-size: 20px;
  font-weight: 400;
  color: #ffffff;
  padding-top: 20px;
}
.bandw {
  width: 480px;
  height: auto;
  background: white;
}
/deep/.el-dialog__body {
  padding: 0;
}
.bondshow {
  background: url("@/assets/imgers/bond背景.png");
  width: 480px;
  height: 400px;
}
/deep/.el-dialog {
  height: auto;
}
/deep/.el-dialog__header {
  padding: 0;
}
/deep/.el-icon-close {
  display: none;
}
.payborder {
  border: 1px solid greenyellow;
}
.words {
  width: 200px;
  height: 40px;
  background: greenyellow;
  border-radius: 3px 3px 3px 3px;
  font-size: 24px;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  line-height: 40px;
  margin-top: 10px;
}
.word {
  width: 200px;
  height: 40px;
  background: #25abee;
  border-radius: 3px 3px 3px 3px;
  font-size: 24px;
  font-weight: 400;
  margin-top: 10px;
  color: #ffffff;
  text-align: center;
  line-height: 40px;
}
.bond_body {
  width: 1400px;
  height: 550px;
  background: #ffffff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: left;
  padding: 30px 60px;
  .bond_tit {
    font-size: 24px;
    font-weight: bold;
    color: #333333;
  }
  .Paid {
    margin-top: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    color: #999999;
  }
  .money {
    margin-top: 30px;
    font-size: 60px;
    font-weight: 800;
    color: #333333;
    text-align: center;
  }
}
</style>