<template>
  <div>
    <div class="line1">
      <div class="line1left">
        <div class="line1_left">证件类型</div>
        <div class="line1_right">身份证</div>
      </div>
      <div class="line1left">
        <div class="line1_left">真实姓名</div>
        <div class="line1_right">{{ informationValue.name }}</div>
      </div>
      <div class="line1left">
        <div class="line1_left">证件号码</div>
        <div class="line1_right">{{ informationValue.card_no }}</div>
      </div>
      <div class="line1lefts">
        <div class="line1_left">
          <img :src="imagesValue + informationValue.card_z" alt="" />
        </div>
        <div class="line1_right">
          <img :src="imagesValue + informationValue.card_f" alt="" />
        </div>
      </div>
      <div class="line1left" v-if="informationValue.style ==2 ">
        <div class="line1_left">营业执照</div>
      </div>
      <div v-if="informationValue.style ==2 " class="line1lefts">
          <div>
              <img :src="imagesValue+informationValue.license" alt="">
          </div>
      </div>
      <div class="line1left">
        <div class="line1_left">证件有效期</div>
        <div class="line1_right">
          {{ informationValue.card_start_time }} -
          {{ informationValue.card_end_time }}
        </div>
      </div>
      <div class="line1left">
        <div class="line1_left">手机号码</div>
        <div class="line1_right">{{ informationValue.tel }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuthApi, myCenterApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle.js";
export default {
  data() {
    return {
      informationValue: [],
      imagesValue: "",

    };
  },
  created() {
    this.information();
    this.imagesValue = imgUrl();
  },
  methods: {
    information() {
      postD(getAuthApi()).then((res) => {
          console.log(res);
        this.informationValue = res.data;
      });
    },
  },
};
</script>


<style lang="less" scoped>
@import url("./authentication.less");
</style>