<template>
  <div class="disps">
    <div class="vipbody" v-for="(item, index) in list1" :key="index">
      <div class="already" v-if="isVip == 1">已开通</div>
      <div class="vip_name">{{ item.name }}</div>
      <div class="vip_privilege">
        <div class="margin-right20">
          <img src="@/assets/imgers/vipLeft.png" alt="" />
        </div>
        <div>{{ item.privilege }}</div>
        <div class="margin-left20">
          <img src="@/assets/imgers/vipright.png" alt="" />
        </div>
      </div>
      <div class="text_1">{{ item.text1 }}</div>
      <div class="text_2">{{ item.text2 }}</div>
      <div class="go_pay" @click="activateNow"><div>立即开通</div></div>
    </div>
    <div class="vipbody" v-for="(item, index) in viplist" :key="index">
      <div class="already" v-if="isVip == 1">已开通</div>
      <div class="vip_name">{{ item.name }}</div>
      <div class="vip_privilege">
        <div class="margin-right20">
          <img src="@/assets/imgers/vipLeft.png" alt="" />
        </div>
        <div>{{ item.privilege }}</div>
        <div class="margin-left20">
          <img src="@/assets/imgers/vipright.png" alt="" />
        </div>
      </div>
      <div class="text_1">{{ item.text1 }}</div>
      <div class="text_2">{{ item.text2 }}</div>
      <div class="go_pay" @click="activateNow"><div>立即开通</div></div>
    </div>
    <div class="vipbody" v-for="(item, index) in bzjlist" :key="index">
      <div class="already" v-if="isbond == 1">已开通</div>
      <div class="vip_name">{{ item.name }}</div>
      <div class="vip_privilege">
        <div class="margin-right20">
          <img src="@/assets/imgers/vipLeft.png" alt="" />
        </div>
        <div>{{ item.privilege }}</div>
        <div class="margin-left20">
          <img src="@/assets/imgers/vipright.png" alt="" />
        </div>
      </div>
      <div class="text_1">{{ item.text1 }}</div>
      <div class="text_2">{{ item.text2 }}</div>
      <div class="go_pay" @click="gobond" v-if="isbond != 1"><div>立即开通</div></div>
      <div class="go_pay" v-if="isbond == 1"><div>已支付</div></div>
    </div>
  </div>
</template>

<script>
import { designerMyCenterApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
export default {
  data() {
    return {
      isVip: "",
      isbond:"",
      list1: [
        {
          name: "查看付费作品放大镜",
          privilege: "放大镜特权",
          text1: "会员权益，会员权益会员权益会员权益会员",
          text2: "会员权益，会员权益会员权益会员权益",
        },
      ],
      viplist: [
        {
          name: "发布非公开作品VIP",
          privilege: "VIP特权",
          text1: "付费作品、私密作品，发布无限制",
          text2: "会员权益，会员权益会员权益会员权益",
        },
      ],
      bzjlist: [
        {
          name: "平台保证金",
          privilege: "保证金特权",
          text1: "会员权益，会员权益会员权益会员权益会员",
          text2: "会员权益，会员权益会员权益会员权益",
        },
      ],
    };
  },
  created() {
    this.vipShow();
  },
  methods: {
    vipShow() {
      var name = {
        username: localStorage.use,
      };
      postD(designerMyCenterApi(), name).then((res) => {
        console.log(res);
        this.isVip = res.data.is_vip;
        this.isbond = res.data.is_bond
      });
    },
    activateNow() {
      this.$router.push("/vipMember");
    },
    gobond() {
      this.$router.push("/bond")
    }
  },
};
</script>


<style lang="less" scoped>
@import url("./openVip.less");
</style>