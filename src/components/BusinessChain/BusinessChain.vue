<template>
  <div>
    <div class="line1">
      <div class="line1img">
        <img src="@/assets/imgers/地址.png" alt="" />
        <div class="line1imgtitle" v-if="city">{{ city }}</div>
        <div class="line1imgtitle" v-else>请选择城市</div>
        <div @click="address">[更换]</div>
      </div>
      <div
        class="zxc"
        v-for="(item, index) in topicClass"
        :key="index"
        :class="selectedIndex == index ? 'active' : ''"
        @click="getTopic(index, item.topicClassId)"
      >
        {{ item }}
      </div>
    </div>
    <div v-if="selectedIndex == 0">
      <enterprisezone />
    </div>
  </div>
</template>

<script>
import Enterprisezone from "./options/enterprisezone.vue";
export default {
  components: { Enterprisezone },
  data() {
    return {
      topicClass: ["企业专区", "代工厂", "私人订制", "原材料供应商", "打版师"],
      selectedIndex: "0",
      city: "",
    };
  },
  created() {
    this.account(); //获取cookie的方法
  },
  methods: {
    account() {
      this.city = this.getCookie("ress");
    },
    getCookie(name) {
      var arr = document.cookie.split(";");
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        if (arr2[0].trim() == name) {
          return arr2[1];
        }
      }
    },
    getTopic(index, id) {
      this.selectedIndex = index;
    },
    address() {
      this.$router.push("/address");
    },
  },
};
</script>
<style lang="less" scoped>
.line1 {
  width: 100%;
  height: 80px;
  background-color: white;
  display: flex;
  justify-content: center;
  padding-top: 30px;
  position: relative;

  .zxc {
    width: 160px;
    height: 60px;
    cursor: pointer;
    padding-top: 18px;
    font-size: 16px;
    font-weight: 400;
    color: #333333;
  }
  .zxc.active {
    width: 160px;
    height: 60px;
    background: #f5f5f5;
    border-radius: 6px 6px 0px 0px;
  }
}
.line1img {
  display: flex;
  position: absolute;
  left: 210px;
  top: 32px;
  cursor: pointer;
  img {
    width: 16px;
    height: 16px;
  }
  .line1imgtitle {
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>