<template>
  <div>
    <div class="wrap">
      <div class="insidewrap">
        <div class="flex al-c">
          <div class="flex">
            <div class="avator">
              <img
                :src="imagesValue + myValue.headimage"
                alt=""
                style="border-radius: 50%"
              />
            </div>
            <div class="personbox">
              <div class="name flex al-c">
                <div>{{ myValue.nickname }}</div>
                <div class="font12 margin-left20 sjs">
                  <img src="@/assets/imgers/设计师等级.png" alt="" />
                </div>
              </div>
              <div class="idnumber">{{ myValue.in_code }}</div>
              <div class="collect">
                <span>
                  <span class="num cur" @click="gofollow">720</span>
                  <span class="word">收藏</span>
                </span>
                <span>
                  <span class="num cur" @click="gofollow">720</span>
                  <span class="word">关注</span>
                </span>
                <span>
                  <span class="num cur" @click="gofollow">720</span>
                  <span class="word">粉丝</span>
                </span>
                <span>
                  <span class="num cur" @click="gofollow">720</span>
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
            @click="gowork(item.id)"
            :key="index"
          >
            <div class="coverimg">
              <img :src="imagesValue + item.thumb" alt="" />
              <!-- <div></div> -->
              <div class="drop">
                <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link">
                    <div class="icon"></div>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="{ id: item.id, title: 'edit' }"
                      >编辑</el-dropdown-item
                    >
                    <el-dropdown-item :command="{ id: item.id, title: 'share' }"
                      >分享</el-dropdown-item
                    >
                    <el-dropdown-item
                      :command="{ index: index, id: item.id, title: 'del' }"
                      >删除</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
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
  </div>
</template>

<script>
import {
  getMyWorksApi,
  delMyWorksApi,
  designerMyCenterApi,
} from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
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
      },
      myworkList: [],
      windowWidth: document.documentElement.clientWidth,
      count: null,
      imagesValue: "",
      myValue: [],
    };
  },
  created() {
    this.getmyworkList();
    this.mywork();
    this.imagesValue = imgUrl();
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
    handleClick(tab, event) {
      console.log(tab, event);
      console.log(this.Works.category);
      this.Works.offset = 1;
      this.myworkList = [];
      this.getmyworkList();
    },
    mywork() {
      var my = {
        username: localStorage.getItem("use"),
      };
      postD(designerMyCenterApi(), my).then((res) => {
        this.myValue = res.data;
      });
    },
    getmyworkList() {
      postD(getMyWorksApi(), this.Works).then((res) => {
        console.log(res.list);
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
        let share_url = "http://192.168.0.116:8080/workDetails" + command.id;
        const url = share_url;
        let oInput = document.createElement("input");
        oInput.value = url;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象;
        document.execCommand("Copy"); // 执行浏览器复制命令
        this.$message({
          message: "复制成功",
          type: "success",
        });
        oInput.remove();
      }
      if (command.title == "del") {
        console.log(command.index);
        postD(delMyWorksApi(), { id: command.id }).then((res) => {
          if (res.code == 200) {
            this.myworkList.splice(command.index, 1);
            this.$message({
              message: res.msg,
              type: "success",
            });

          } else {
            this.$message({
              message: res.msg,
            });
          }
        });
      }
    },
    gowork(val) {
      this.$router.push("/workDetails" + val);
    },
    gofollow() {
      this.$router.push("/follow");
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./Mywork.less");
</style>