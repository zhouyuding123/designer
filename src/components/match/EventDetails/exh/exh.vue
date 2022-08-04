<template>
  <div style="padding: 20px 170px">
    <div class="titleline1">
      <div class="countSstyle">
        <div class="numbervalue">
          <span>{{ workvalues.accept_count }}</span>
        </div>
        <div class="numbervalue2"><span>参与选手</span></div>
      </div>
      <div class="vertical"></div>
      <div class="countSstyle">
        <div class="numbervalue">
          <span>{{ workvalues.voto_count }}</span>
        </div>
        <div class="numbervalue2"><span>积累投票</span></div>
      </div>
      <div class="vertical"></div>
      <div class="countSstyle">
        <div class="numbervalue">
          <span>{{ workvalues.browse }}</span>
        </div>
        <div class="numbervalue2"><span>访问量</span></div>
      </div>
    </div>
    <div class="titleline2">
      <div class="listPadding">
        <div class="seatch_list">
          <i
            class="el-icon-search"
            style="position: absolute; margin: 12px 0 0 20px; color: #dddddd"
          ></i>
          <el-input
            v-model="seatcher.keyword"
            placeholder="请输入内容"
          ></el-input>
          <div class="buttom_seatch" @click="seatchvalue">
            <span> 搜索 </span>
          </div>
        </div>
      </div>
    </div>
    <div class="myworks" v-if="token && myworks != ''">
      <div class="myworksbody">
        <div v-for="(item, index) in myworks" :key="index">
          <div class="workid">
            <span>{{ item.accept_id }}</span>
            <div class="myworkimg">
              <img
                :src="imagesValue + item.thumb"
                alt=""
                @click="goWorkShow(item)"
              />
            </div>
            <div class="dis" style="position: relative">
              <div>
                <div class="myworktitle">
                  {{ item.title }}
                </div>
                <div class="dis" style="padding: 10px 20px">
                  <div class="myhead">
                    <img :src="imagesValue + item.headimage" alt="" />
                  </div>
                  <div class="mynik">{{ item.nickname }}</div>
                </div>
              </div>
              <div class="invitation" @click="fs">邀人助力</div>
              <div v-if="vsh == true" class="share_post">
                <div class="disp">
                  <div
                    @click="shareToQQ()"
                    class="cur"
                    style="margin-right: 30px; margin-left: 30px"
                  >
                    <div><img src="@/assets/imgers/分享微信.png" alt="" /></div>
                    <div style="margin-top: 10px">微信</div>
                  </div>
                  <div
                    @click="shareToQQ()"
                    class="cur"
                    style="margin-right: 30px"
                  >
                    <div><img src="@/assets/imgers/分享qq.png" alt="" /></div>
                    <div class="fxtitle" style="margin-top: 10px">QQ</div>
                  </div>
                  <div
                    @click="shareToRoom()"
                    class="cur"
                    style="margin-right: 30px"
                  >
                    <div><img src="@/assets/imgers/分享空间.png" alt="" /></div>
                    <div class="fxtitle" style="margin-top: 10px">QQ空间</div>
                  </div>
                  <div
                    @click="shareToMicroblog()"
                    class="cur"
                    style="margin-right: 30px"
                  >
                    <div><img src="@/assets/imgers/分享微博.png" alt="" /></div>
                    <div class="fxtitle" style="margin-top: 10px">微博</div>
                  </div>
                </div>
                <div class="dis input__inner">
                  <div>
                    <el-input
                      v-model="input"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div class="fzlj cur" @click="shareToQQ">复制链接</div>
                </div>
              </div>
            </div>
            <div class="disp">
              <div class="bodywith">
                <div class="voto_num">{{ item.ranking }}</div>
                <div class="bodywithbon">当前排名</div>
              </div>
              <div class="bodywith">
                <div class="voto_num">{{item.voto_count}}</div>
                <div class="bodywithbon">当前票数</div>
              </div>
              <div class="bodywith">
                <div class="voto_num">{{ item.ranking_remark }}</div>
                <div class="bodywithbon">距前一名</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="titleline3">
      <div class="titlevoto" v-for="items in workvalue" :key="items.accept_id">
        <div class="titleimg">
          <span>{{ items.accept_id }}</span>
          <img
            :src="imagesValue + items.thumb"
            alt=""
            @click="goWorkShow(items)"
          />
        </div>
        <div class="titleTitle">
          <div class="titleValues">
            <span>{{ items.title }}</span>
          </div>
          <div class="hsadimg">
            <div class="imghead">
              <el-image
                :src="imagesValue + items.headimage"
                style="border-radius: 50%; width: 42px; height: 42px"
              ></el-image>
            </div>
            <div class="imgname">
              <span>{{ items.nickname }}</span>
            </div>
          </div>
          <div
            class="votonum"
            id="votonumvo"
            v-if="items.is_voto === 1"
            @click="votonums(items)"
          >
            <span>投TA一票</span>
          </div>
          <div class="votonumser" v-if="items.is_voto === 2">
            <span>您已投票</span>
          </div>
        </div>
      </div>
    </div>
    <div class="pagers">
      <vxe-pager
        :current-page="detialId.offset"
        :page-size="detialId.limit"
        :total="detialId.totalResult"
        :layouts="[
          'PrevPage',
          'JumpNumber',
          'NextPage',
          'FullJump',
          'Sizes',
          'Total',
        ]"
        align="center"
        @page-change="handlePageChangeActivity"
      ></vxe-pager>
    </div>
    <el-dialog title="提示" :visible.sync="votoShow" width="30%">
      <div class="votoOK">
        <div><img src="@/assets/imgers/投票.png" alt="" /></div>
        <div class="okvoto">
          <span
            >当前赛事可投票{{ votocountvalue }}次，且每个作品只可投票一次</span
          >
        </div>
        <div style="padding-top: 20px">
          <span>您确定要对该作品进行投票吗？</span>
        </div>
        <div style="padding-top: 48px">
          <el-button type="primary" @click="vote">确 定</el-button>
        </div>
        <div class="jxyl" @click="votoShow = false">
          <span>继续浏览</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  votoWorksApi,
  myWorksApi,
  verVotoApi,
  votoCountApi,
  setVotoApi,
} from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      imagesValue: "",
      detialId: {
        id: "",
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      seatcher: {
        keyword: "",
        id: "",
      },
      workvalues: [],
      workvalue: [],
      myworks: [],
      vsh: false,
      input: "http://192.168.0.114:8091/#/pages/index/gamedetail/gamedetail",
      token: "",
      votoid: {
        accept_id: "",
      },
      votocount: {
        match_id: "",
      },
      votocountvalue: "",
      votoShow: false,
    };
  },
  created() {
    this.token = localStorage.getItem("token");
    this.detialId.id = this.$route.params.id;
    this.seatcher.id = this.$route.params.id;
    this.imagesValue = imgUrl();
    this.worksValue();
    this.mywork();
  },
  methods: {
    mywork() {
      var works = {
        id: this.$route.params.id,
      };
      postD(myWorksApi(), works).then((res) => {
        this.myworks = res.list;
        console.log(this.myworks);
      });
    },
    worksValue() {
      postD(votoWorksApi(), this.detialId).then((res) => {
        this.workvalues = res;
        this.workvalue = res.list.reverse();
        this.detialId.totalResult = res.accept_count;
      });
    },
    seatchvalue() {
      postD(votoWorksApi(), this.seatcher).then((res) => {
        this.workvalue = res.list.reverse();
        this.detialId.totalResult = res.accept_count;
      });
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.detialId.offset = currentPage;
      this.detialId.limit = pageSize;
      postD(votoWorksApi(), this.detialId).then((res) => {
        this.workvalues = res;
        this.workvalue = res.list.reverse();
        this.detialId.totalResult = res.accept_count;
      });
    },
    fs() {
      if (this.vsh == false) {
        this.vsh = true;
      } else {
        this.vsh = false;
      }
    },
    shareToQQ() {
      let share_url =
        "http://192.168.0.114:8091/#/pages/index/gamedetail/gamedetail";
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
    },
    shareToRoom() {
      //自定义内容
      const share = {
        title: this.myworks[0].title,
        desc: this.myworks[0].description,
        image_url: this.imagesValue + this.myworks[0].thumb,
        share_url:
          "http://192.168.0.114:8091/#/pages/index/gamedetail/gamedetail",
      };
      //  跳转地址
      location.replace(
        "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" +
          encodeURIComponent(share.share_url) +
          "&title=" +
          share.title +
          "&pics=" +
          share.image_url +
          "&summary=" +
          share.desc
      );
    },
    shareToMicroblog() {
      //自定义内容
      const share = {
        title: this.myworks[0].title,
        desc: this.myworks[0].description,
        image_url: this.imagesValue + this.myworks[0].thumb,
        share_url:
          "http://192.168.0.114:8091/#/pages/index/gamedetail/gamedetail",
      };
      //跳转地址
      location.replace(
        "https://service.weibo.com/share/share.php?url=" +
          encodeURIComponent(share.share_url) +
          "&title=" +
          share.title +
          "&pic=" +
          share.image_url +
          "&searchPic=true"
      );
    },
    votonums(val) {
      this.votoid.accept_id = val.accept_id;
      this.votocount.match_id = val.match_id;
      postD(verVotoApi(), this.votoid).then((res) => {
        if (res.code == 200) {
          this.votoShow = true;
          postD(votoCountApi(), this.votocount).then((res) => {
            console.log(res);
            this.votocountvalue = res.count;
          });
        } else {
          this.$message({
              offset: 80,
              type: "error",
              message: "您已投票或投票失败",
            });
        }
      });
    },
    vote() {
      postD(setVotoApi(), this.votoid).then((res) => {
        if (res.code == "200") {
            this.$message({
              offset: 80,
              type: "success",
              message: "投票成功",
            });
            this.worksValue();
          this.mywork();
          this.votoShow = false;
          } else {
            this.$message({
              offset: 80,
              type: "error",
              message: res.msg,
            });
          }
      });
    },
    goWorkShow(val) {
      var works_id = val.works_id
      var match_id = val.match_id
       this.$router.push({
        name: "matchworksShow",
        params: {
          works_id: works_id,
          id: match_id,
        },
      });
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./exh.less");
</style>