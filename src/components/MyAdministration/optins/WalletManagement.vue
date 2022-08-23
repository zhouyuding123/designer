<template>
  <div>
    <div v-if="cordshow == 0" class="linebody">
      <div class="line1">
        <div class="money_1">
          <div class="money_1_ye">
            <div class="money_1_ye_1">余额（元）</div>
            <div class="money_1_ye_num">88888.02</div>
          </div>
          <div class="money_2_jlj">
            <div class="money_2_jlj_1">奖励金（元）</div>
            <div class="money_2_jlj_num">88888.02</div>
          </div>
        </div>
        <div class="operation">
          <div class="Withdrawal">
            <span>提现</span>
          </div>
          <div class="Withdrawal">
            <span>充值</span>
          </div>
        </div>
        <div class="borderstyle"></div>
        <div class="bank_card">
          <div class="bank_card_left" @click="goAddcord">
            <div><img src="@/assets/imgers/点.png" alt="" /></div>
            <div class="yhk">银行卡</div>
            <div class="yhk_num">3</div>
            <div class="yhk_more">
              <img src="@/assets/imgers/more.png" alt="" />
            </div>
          </div>
          <div class="shu"></div>
          <div class="bank_card_right">
            <div><img src="@/assets/imgers/点.png" alt="" /></div>
            <div class="yhk">红包</div>
            <div class="yhk_num">5</div>
            <div class="yhk_more">
              <img src="@/assets/imgers/more.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="zjbd">
        <div class="zj_title">资金变动明细</div>
        <div class="zj_more" @click="gomoneyMore">
          <div>更多</div>
          <img src="@/assets/imgers/more2.png" alt="" />
        </div>
      </div>
      <div>
        <div class="detailed_list">
          <div class="detailed_list_list">
            <div>账务类型</div>
            <div>时间</div>
            <div>收支金额</div>
            <div>账户余额</div>
          </div>
          <div class="list_mun">
            <div>余额提现</div>
            <div>2022-08-04 19:43:23</div>
            <div>-500.00</div>
            <div>0.00</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="cordshow == 1" class="linebody2">
      <div class="line2">
        <el-tabs v-model="activeName">
          <el-tab-pane label="银行卡" name="1"></el-tab-pane>
          <el-tab-pane label="钱包" name="2"></el-tab-pane>
        </el-tabs>
        <div class="out cur" @click="outfitst">返回</div>
      </div>
      <div v-if="activeName == 1" class="paddingline2">
        <go-addcord />
      </div>
    </div>
    <div v-if="cordshow == 2">
      <income />
    </div>
  </div>
</template>

<script>
import { listBankApi } from "@/urls/wsUrl.js";
import { postD } from "../../../api";
import goAddcord from "./goAddcord/goAddcord.vue";
import income from "./goAddcord/income.vue";
export default {
  components: { goAddcord, income },
  data() {
    return {
      cordshow: 0,
      activeName: "1",
    };
  },
  created() {
    this.listBank();
  },
  methods: {
    listBank() {
      postD(listBankApi()).then((res) => {
        if(res.code == "-201") {
          this.$router.push("/about")
        }
      });
    },
    goAddcord() {
      this.cordshow = 1;
    },
    gomoneyMore() {
      console.log(213);
      this.cordshow = 2;
    },
    outfitst() {
      this.cordshow = 0;
    },
  },
};
</script>


<style lang="less" scoped>
@import url("./WalletManagement.less");
</style>