<template>
  <div>
    <div class="kuang">
      <div class="kuang_top">
        <div class="cur">
          <img src="@/assets/imgers/聊天返回.png" alt="" />
        </div>
        <div class="top_zx">{{ name.username }}</div>
      </div>
      <div class="kuang_value" ref="zxcssss">
        <div v-for="(item, index) in chatsmg" :key="index">
          <div class="right" v-if="item.fromNick == myname">
            <div class="right_text">{{ item.body }}</div>
            <img :src="imagesValue + myheader" alt="" />
          </div>
          <div v-else class="left">
            <img :src="imagesValue + PtwoId.headimage" alt="" />
            <div class="left_text">{{ item.body }}</div>
          </div>
        </div>
      </div>
      <div class="addtext">
        <div>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea"
          >
          </el-input>
        </div>
        <div class="dis addinp">
          <div class="dis bq">
            <div>
              <img src="@/assets/imgers/添加表情.png" alt="" />
            </div>
            <div class="addbq">添加表情</div>
          </div>
          <div class="dis bq">
            <div>
              <img src="@/assets/imgers/添加图片.png" alt="" />
            </div>
            <div class="addbq">添加图片</div>
          </div>
          <div class="fs" @click="fs">发送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NIM from "nim-web-sdk-ng";
import { createAccidApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  inject: ["reload"],
  data() {
    return {
      textarea: "",
      asdsads: "",
      appkey: "1e392e0d4ff675f4be13d40b45890a0c",
      nima: "",
      myname: localStorage.getItem("use"),
      myheader: JSON.parse(localStorage.getItem("data")).headimage,
      imagesValue: "",
      chatsmg: [],
      name: {
        username: "",
      },
      PtwoId: {
        headimage: "",
        accid: "",
      },
    };
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.zxcssss.scrollTop = this.$refs.zxcssss.scrollHeight;
    });
  },
  created() {
    this.accid();
    this.imagesValue = imgUrl();
    this.desValue();
  },
  methods: {
    desValue() {
      this.name.username = this.$route.params.name;
      postD(createAccidApi(), this.name).then((res) => {
        this.PtwoId.accid = res.data.accid;
        this.PtwoId.headimage = res.data.headimage;
      });
    },
    accid() {
      let use = {
        username: localStorage.getItem("use"),
      };
      postD(createAccidApi(), use).then((res) => {
        const nim = new NIM({
          debugLevel: "debug",
          appkey: "1e392e0d4ff675f4be13d40b45890a0c",
          account: res.data.accid.toString(),
          token: res.data.token,
        });
        this.init(nim);
        this.nima = nim;
        this.collect(nim);
      });
    },
    async init(nim) {
      await nim.connect();
      this.record(nim);
    },
    async fs() {
      await this.nima.msg.sendTextMsg({
        scene: "p2p",
        to: this.PtwoId.accid.toString(),
        body: this.textarea,
        type: "text",
        onSendBefore: function (msg) {
          console.log("Get msg before send", msg);
        },
      });
      this.textarea = "";
      this.reload();
    },
    record(nim) {
      const msgs = nim.msgLog.getHistoryMsgs({
        scene: "p2p",
        to: this.PtwoId.accid.toString(),
        limit: 100,
      });
      msgs.then((res) => {
        this.chatsmg = res.reverse();
      });
    },
    async collect(nim) {
      var that = this;
      nim.on("msg", function (msg) {
        that.chatsmg.push(msg);
      });
    },
  },
};
</script>

<style>
.el-textarea__inner {
  resize: none;
}
</style>
  
  <style lang="less" scoped>
@import url("./chat.less");
</style>