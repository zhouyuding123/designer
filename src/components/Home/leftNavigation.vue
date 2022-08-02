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
            active-text-color="#ffd04b"
          >
            <el-menu-item index="0" class="kzt" @click="goConsole"
              >控制台</el-menu-item
            >
            <el-submenu index="1">
              <template slot="title">首页</template>
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
              <template slot="title">赛事专区</template>
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
              <template slot="title">需求大厅</template>
              <div class="syitem">
                <el-menu-item index="3-1">赛事列表</el-menu-item>
                <el-menu-item index="3-2">我参与的赛事</el-menu-item>
              </div>
            </el-submenu>
            <el-menu-item index="4" class="kzt"> 潮圈 </el-menu-item>
            <el-menu-item index="5" class="kzt" @click="goBusinessChain">
              商链
            </el-menu-item>
            <el-submenu index="6">
              <template slot="title">榜单</template>
              <div class="syitem">
                <el-menu-item index="6-1">设计师榜</el-menu-item>
                <el-menu-item index="6-2">作品榜</el-menu-item>
                <el-menu-item index="6-3">团体榜</el-menu-item>
              </div>
            </el-submenu>
            <el-menu-item index="7" class="kzt" @click="goMyAdministration">
              我的管理
            </el-menu-item>
            <div class="zxc">
              <div class="ss" @click="seatcher">
                <img src="@/assets/imgers/搜索.png" alt="" />
              </div>
              <div class="sc" @click="uploadWork">
                <img src="@/assets/imgers/上传.png" alt="" />
              </div>
              <div class="tz">
                <img src="@/assets/imgers/通知.png" alt="" />
              </div>
              <div class="tx">
                <el-submenu index="8">
                  <template slot="title"
                    ><img
                      :src="imagesValue + imagescxk"
                      alt=""
                      style="width: 35px; height: 35px; border-radius: 50%"
                  /></template>
                  <div class="syitem">
                    <el-menu-item index="8-1" @click="goAccountSettings"
                      >我的作品</el-menu-item
                    >
                    <el-menu-item index="8-2" @click="gopersonal"
                      >账号设置</el-menu-item
                    >
                    <el-menu-item index="8-3" @click="goLogin"
                      >退出登录</el-menu-item
                    >
                  </div>
                </el-submenu>
              </div>
              <div class="hy" @click="startUpVip"><span>开通会员</span></div>
            </div>
          </el-menu>
        </div>
        <div></div>
      </el-header>
      <el-main style="padding-top:60px">
        <keep-alive>
          <router-view
            v-if="$route.meta.keepAlive"
            :key="$route.fullPath"
          ></router-view>
        </keep-alive>
        <router-view
          v-if="!$route.meta.keepAlive"
          :key="$route.fullPath"
        ></router-view>
      </el-main>
    </el-container>
    <div class="seatchers" v-show="seatchShow">
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
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <div class="goauth">
        需要认证
      </div>
      <div style="padding-top:80px">
        <span>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addGoauth"
            >确 定</el-button
          >
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
    };
  },
  created() {
    this.imagesValue = imgUrl();
    var valueser = localStorage.data;
    var valser = JSON.parse(valueser);
    this.imagescxk = valser.headimage;
    this.name.username = localStorage.getItem("use");
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
      console.log(123);
    },
    uploadWork() {
      postD(designerMyCenterApi(), this.name).then((res) => {
        if (res.data.auth === 2) {
          this.$router.push("/UploadWorks");
        } else {
          this.dialogVisible = true;
        }
      })
    },
    goBusinessChain() {
       postD(designerMyCenterApi(), this.name).then((res) => {
        if (res.data.auth === 2) {
          this.$router.push("/BusinessChain");
        } else {
          this.dialogVisible = true;
        }
      })
    },
    goMatch() {
      postD(designerMyCenterApi(), this.name).then((res) => {
        if (res.data.auth === 2) {
          this.$router.push("/match");
        } else {
          this.dialogVisible = true;
        }
      })
    },
    gomyMatch() {
      postD(designerMyCenterApi(), this.name).then((res) => {
        if (res.data.auth === 2) {
          this.$router.push("/matchattended");
        } else {
          this.dialogVisible = true;
        }
      })
    },
    goMywork() {
      postD(designerMyCenterApi(), this.name).then((res) => {
        if (res.data.auth === 2) {
          this.$router.push("/Mywork");
        } else {
          this.dialogVisible = true;
        }
      });
    },
    startUpVip() {
      postD(designerMyCenterApi(), this.name).then((res) => {
        if (res.data.auth === 2) {
          this.$router.push("/openVip");
        } else {
          this.dialogVisible = true;
        }
      });
    },
    addGoauth() {
      this.$router.push("/users_designer/editInfo")
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./leftNavigation.less");
</style>


