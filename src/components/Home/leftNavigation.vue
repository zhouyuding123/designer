<template>
  <div style="background-color: #F5F5F5;">
    <el-container>
      <el-header>
        <div style="display: flex;">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            text-color="#333"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="0" class="kzt" @click="goConsole">控制台</el-menu-item>
            <el-submenu index="1">
              <template slot="title">首页</template>
              <div class="syitem">
                <el-menu-item index="1-1">设计师专区</el-menu-item>
                <el-menu-item index="1-2">我的首页</el-menu-item>
              </div>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">赛事专区</template>
              <div class="syitem">
                <el-menu-item index="2-1">赛事列表</el-menu-item>
                <el-menu-item index="2-2">我参与的赛事</el-menu-item>
              </div>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">需求大厅</template>
              <div class="syitem">
                <el-menu-item index="3-1">赛事列表</el-menu-item>
                <el-menu-item index="3-2">我参与的赛事</el-menu-item>
              </div>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">潮圈</template>
              <div class="syitem">
                <el-menu-item index="4-1">赛事列表</el-menu-item>
                <el-menu-item index="4-2">我参与的赛事</el-menu-item>
              </div>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">商链</template>
              <div class="syitem">
                <el-menu-item index="5-1">赛事列表</el-menu-item>
                <el-menu-item index="5-2">我参与的赛事</el-menu-item>
              </div>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">榜单</template>
              <div class="syitem">
                <el-menu-item index="6-1">赛事列表</el-menu-item>
                <el-menu-item index="6-2">我参与的赛事</el-menu-item>
              </div>
            </el-submenu>
            <el-menu-item index="7" class="kzt" @click="goMyAdministration">
              我的管理
            </el-menu-item>
            <div class="zxc">
              <div class="ss"><img src="@/assets/imgers/搜索.png" alt="" /></div>
              <div class="sc"><img src="@/assets/imgers/上传.png" alt="" /></div>
              <div class="tz"><img src="@/assets/imgers/通知.png" alt="" /></div>
              <div class="tx">
                <el-submenu index="8">
                  <template slot="title"
                    ><img
                      src="@/assets/imgers/头像.png"
                      alt=""
                      style="width: 35px; height: 35px"
                  /></template>
                  <div class="syitem">
                    <el-menu-item index="8-1" @click="goAccountSettings">我的首页</el-menu-item>
                    <el-menu-item index="8-2" @click="gopersonal">账号设置</el-menu-item>
                    <el-menu-item index="8-3" @click="goLogin">退出登录</el-menu-item>
                  </div>
                </el-submenu>
              </div>
              <div class="hy"><span>开通会员</span></div>
            </div>
          </el-menu>
        </div>
      </el-header>
      <el-main><router-view to="'/'+value.name" /></el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
    };
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
      this.$router.push("/home");
    },
    goConsole() {
      this.$router.push("/pageHome")
    },
    gopersonal() {
      this.$router.push("/users_designer/editInfo")
    },
    goMyAdministration() {
      this.$router.push("/MyAdministration")
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./leftNavigation.less");
</style>


