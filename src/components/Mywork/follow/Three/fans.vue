<template>
  <div class="bodylong">
    <div class="des" v-for="(item, index) in des" :key="index">
      <div class="desimg"><img :src="imagesValue + item.imgs" alt="" /></div>
      <div class="margintext">
        <div class="dis">
          <div class="text_name">{{ item.name }}</div>
          <div style="margin-top: -3px; margin-left: 8px">
            <img src="@/assets/imgers/设计师等级.png" alt="" />
          </div>
        </div>
        <div class="text_text">{{ item.text }}</div>
        <div class="dis nums">
          <div class="dis">
            <div><img src="@/assets/imgers/关注人数.png" alt="" /></div>
            <div class="nums_num">{{ nummore(item.rs) }}</div>
          </div>
          <div class="dis" style="margin-left: 20px">
            <div><img src="@/assets/imgers/关注人数.png" alt="" /></div>
            <div class="nums_num">{{ nummore(item.rs) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      imagesValue: "",
      des: [
        {
          imgs: "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "用户名",
          text: "浙江  女装设计",
          rs: "999",
        },
         {
          imgs: "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "用户名",
          text: "浙江  女装设计",
          rs: "999",
        },
         {
          imgs: "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "用户名",
          text: "浙江  女装设计",
          rs: "999",
        },
         {
          imgs: "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "用户名",
          text: "浙江  女装设计",
          rs: "999",
        },
         {
          imgs: "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "用户名",
          text: "浙江  女装设计",
          rs: "999",
        },
      ],
    };
  },
  created() {
    this.imagesValue = imgUrl();
  },
  methods: {
    nummore(val) {
      if (String(val).length >= 4) {
        return val.substring(0, String(val).length - 4) + "万";
      } else {
        return val;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.bodylong {
  width: 1580px;
  margin: 20px auto;
  background-color: white;
  .des {
    width: 100%;
    height: 100px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    padding: 30px 40px;
    .desimg {
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
}
.margintext {
  margin-left: 20px;
  text-align: left;
  .text_name {
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    margin-top: 2px;
  }
  .text_text {
    font-size: 10px;
    font-weight: 400;
    color: #999999;
    margin-top: 7px;
  }
  .nums {
    margin-top: 5px;
  }
}
.nums_num {
  font-size: 10px;
  font-weight: 400;
  color: #999999;
  margin-top: 2px;
  margin-left: 2px;
}
</style>