<template>
  <div style="background-color: #f5f5f5">
    <el-container>
      <el-header>
        <div style="display: flex">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            text-color="#333"
            active-text-color="#1A0761"
          >
            <!-- <el-menu-item index="0" class="kzt" @click="goConsole"
              >控制台</el-menu-item
            > -->
            <el-submenu index="1">
              <template slot="title"
                >首页
                <div class="borderyel" v-if="showindex[0] == 1"></div>
              </template>
              <div class="syitem">
                <el-menu-item index="1-1" @click="goDesignerZone"
                  >设计师专区</el-menu-item
                >
                <el-menu-item index="1-2" @click="goMywork"
                  >我的作品</el-menu-item
                >
              </div>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"
                >赛事专区
                <div class="borderyel" v-if="showindex[0] == 2"></div>
              </template>
              <div class="syitem">
                <el-menu-item index="2-1" @click="goMatch()"
                  >赛事列表</el-menu-item
                >
                <el-menu-item index="2-2" @click="gomyMatch()"
                  >我参与的赛事</el-menu-item
                >
              </div>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"
                >需求大厅
                <div class="borderyel" v-if="showindex[0] == 3"></div>
              </template>
              <div class="syitem">
                <el-menu-item index="3-1">赛事列表</el-menu-item>
                <el-menu-item index="3-2">我参与的赛事</el-menu-item>
              </div>
            </el-submenu>
            <el-menu-item index="4" class="kzt" @click="goCircle">
              潮圈
              <div class="borderyels" v-if="showindex[0] == 4"></div>
            </el-menu-item>
            <el-menu-item index="5" class="kzt" @click="goBusinessChain">
              <div class="borderyels" v-if="showindex[0] == 5"></div>
              商链
            </el-menu-item>
            <el-submenu index="6">
              <template slot="title"
                >榜单
                <div class="borderyel" v-if="showindex[0] == 6"></div>
              </template>
              <div class="syitem">
                <el-menu-item index="6-1" @click="goDesignerList"
                  >设计师榜</el-menu-item
                >
                <el-menu-item index="6-2" @click="goworkList"
                  >作品榜</el-menu-item
                >
                <el-menu-item index="6-3" @click="goteam">团体榜</el-menu-item>
              </div>
            </el-submenu>
            <el-menu-item index="7" class="kzt" @click="goMyAdministration">
              我的管理
              <div class="borderyel" v-if="showindex[0] == 7"></div>
            </el-menu-item>
            <div class="zxc">
              <div class="ss" @click="seatcher">
                <img src="@/assets/imgers/搜索.png" alt="" />
              </div>
              <div class="sc" @click="uploadWork">
                <img src="@/assets/imgers/上传.png" alt="" />
              </div>
              <div class="tz" slot="reference">
                <el-popover
                  placement="bottom"
                  width="280"
                  trigger="click"
                  popper-class="popperStyle"
                >
                  <div class="tz_value">
                    <div class="dis line1top">
                      <div class="line1topleft">消息</div>
                      <div class="line1topright">清空</div>
                    </div>
                    <div
                      class="news_value"
                      v-for="(item, index) in news"
                      :key="index"
                    >
                      <div class="news_valueimg">
                        <img :src="imagesValue + item.wuimg" alt="" />
                      </div>
                      <div class="news_title">
                        <div>{{ item.name }}</div>
                        <div>{{ item.text }}</div>
                      </div>
                    </div>
                    <div class="more cur" @click="gonews">查看更多</div>
                  </div>
                  <img src="@/assets/imgers/通知.png" alt="" slot="reference" />
                </el-popover>
              </div>
              <div class="tx">
                <el-submenu index="8">
                  <template slot="title">
                    <img
                      v-if="!imagescxk"
                      :src="imagesValue + wuimg"
                      alt=""
                      style="width: 35px; height: 35px; border-radius: 50%" />
                    <img
                      v-else
                      :src="imagesValue + imagescxk"
                      alt=""
                      style="width: 35px; height: 35px; border-radius: 50%"
                  /></template>
                  <div class="syitem">
                    <!-- <el-menu-item index="8-1" @click="goAccountSettings"
                      >我的作品</el-menu-item
                    > -->
                    <el-menu-item index="8-2" @click="gopersonal"
                      >账号设置</el-menu-item
                    >
                    <el-menu-item index="8-3" @click="goTS"
                      >投诉建议</el-menu-item
                    >
                    <el-menu-item index="8-4" @click="goLogin"
                      >退出登录</el-menu-item
                    >
                  </div>
                </el-submenu>
              </div>
              <div
                class="hy"
                @click="startUpVip"
                @mousemove="touchstart"
                @mouseout="touchmove"
              >
                <span>开通会员</span>
              </div>
            </div>
          </el-menu>
        </div>
        <div></div>
      </el-header>
      <el-main style="padding-top: 60px; padding-bottom: 20px">
        <div @click="outs">
          <keep-alive>
            <router-view
              @click="outs"
              v-if="$route.meta.keepAlive"
              :key="$route.fullPath"
            ></router-view>
          </keep-alive>
          <router-view
            @click="outs"
            v-if="!$route.meta.keepAlive"
            :key="$route.fullPath"
          ></router-view>
        </div>
      </el-main>
    </el-container>
    <div class="seatchersback" v-show="seatchShow" id="ss">
      <div class="seatchers">
        <div class="seatch_list">
          <i
            class="el-icon-search"
            style="position: absolute; margin: 18px 0 0 20px; color: #dddddd"
          ></i>
          <el-input placeholder="请输入内容"></el-input>
          <div class="buttom_seatch">
            <span> 搜索 </span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <div class="goauth">需要认证</div>
      <div style="padding-top: 80px">
        <span>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addGoauth">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { designerMyCenterApi } from "@/urls/wsUrl.js";
import { imgUrl } from "@/assets/js/modifyStyle";
import { postD } from "@/api";
export default {
  inject: ["reload"],
  provide() {
    return {
      imgslost: this.imgslost,
    };
  },
  data() {
    return {
      activeIndex: "1",
      imagesValue: "",
      imagescxk: "",
      seatchShow: false,
      name: {
        username: "",
      },
      authentication: "",
      dialogVisible: false,
      wuimg: "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
      news: [
        {
          wuimg:
            "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "系统消息",
          text: "你发布的作品《作品标题》已通过",
        },
        {
          wuimg:
            "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "系统消息",
          text: "你发布的作品《作品标题》已通过",
        },
        {
          wuimg:
            "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "系统消息",
          text: "你发布的作品《作品标题》已通过",
        },
        {
          wuimg:
            "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "系统消息",
          text: "你发布的作品《作品标题》已通过",
        },
      ],
      newsshow: false,
      showindex: "",
    };
  },
  created() {
    this.imagesValue = imgUrl();
    this.imgslost();
    this.name.username = localStorage.getItem("use");
  },
  methods: {
    imgslost() {
      var valueser = localStorage.data;
      var valser = JSON.parse(valueser);
      this.imagescxk = valser.headimage;
      postD(designerMyCenterApi(), this.name).then((res) => {
        if (res.code == "-201") {
          this.$router.push("/about");
        }
      });
    },
    outs() {
      this.seatchShow = false;
    },
    newsShow() {
      if (this.newsshow == false) {
        this.newsshow = true;
      } else {
        this.newsshow = false;
      }
    },
    handleSelect(key, keyPath) {
      this.showindex = keyPath;
      console.log(this.showindex);
    },
    goLogin() {
      localStorage.clear();
      this.$router.push("/login");
    },
    goAccountSettings() {
      this.$router.push("/Mywork");
    },
    goConsole() {
      this.$router.push("/pageHome");
    },
    gopersonal() {
      this.$router.push("/users_designer/editInfo");
    },
    goMyAdministration() {
      this.$router.push("/MyAdministration");
    },
    goDesignerZone() {
      this.$router.push("/SpecialArea");
    },
    seatcher() {
      if (this.seatchShow == true) {
        this.seatchShow = false;
      } else {
        this.seatchShow = true;
      }
    },
    uploadWork() {
      postD(designerMyCenterApi(), this.name).then((res) => {
        if (res.code == "-201") {
          this.$router.push("/about");
        }
        if (res.data.auth === 2) {
          this.$router.push("/UploadWorks");
          this.reload();
        } else {
          this.dialogVisible = true;
        }
      });
    },
    goBusinessChain() {
      postD(designerMyCenterApi(), this.name).then((res) => {
        if (res.code == "-201") {
          this.$router.push("/about");
        }
        if (res.data.auth === 2) {
          this.$router.push("/BusinessChain");
        } else {
          this.dialogVisible = true;
        }
      });
    },
    goMatch() {
      postD(designerMyCenterApi(), this.name).then((res) => {
        if (res.code == "-201") {
          this.$router.push("/about");
        }
        if (res.data.auth === 2) {
          this.$router.push("/match");
        } else {
          this.dialogVisible = true;
        }
      });
    },
    gomyMatch() {
      postD(designerMyCenterApi(), this.name).then((res) => {
        if (res.code == "-201") {
          this.$router.push("/about");
        }
        if (res.data.auth === 2) {
          this.$router.push("/matchattended");
        } else {
          this.dialogVisible = true;
        }
      });
    },
    goMywork() {
      postD(designerMyCenterApi(), this.name).then((res) => {
        if (res.code == "-201") {
          this.$router.push("/about");
        }
        if (res.data.auth === 2) {
          this.$router.push("/Mywork");
        } else {
          this.dialogVisible = true;
        }
      });
    },
    startUpVip() {
      postD(designerMyCenterApi(), this.name).then((res) => {
        if (res.code == "-201") {
          this.$router.push("/about");
        }
        if (res.data.auth === 2) {
          this.$router.push("/openVip");
        } else {
          this.dialogVisible = true;
        }
      });
    },
    addGoauth() {
      this.$router.push("/users_designer/editInfo");
      this.dialogVisible = false;
    },
    goCircle() {
      this.$router.push("/Circle");
    },
    goDesignerList() {
      this.$router.push("/DesignerList");
    },
    goteam() {
      this.$router.push("/team");
    },
    goworkList() {
      this.$router.push("/worksList");
    },
    gonews() {
      this.$router.push("/news");
    },
    goTS() {
      this.$router.push("/complaint");
    },
    touchstart() {
      const addxx1 = document.querySelector(".hy");
      addxx1.style.transform = "scale(1.1)";
    },
    touchmove() {
      const addxx1 = document.querySelector(".hy");
      addxx1.style.transform = "scale(1)";
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./leftNavigation.less");
</style>


<style>
.popperStyle {
  width: 280px;
  height: 350px;
  border-radius: 10px 10px 10px 10px;
  padding: 0;
}
</style>


