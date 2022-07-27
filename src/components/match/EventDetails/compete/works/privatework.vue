<template>
  <div>
    <div class="list_free">
      <div class="list_free_list">
        <waterfall
          :cols="
            Math.floor(windowWidth / 300) >= 5
              ? 5
              : Math.floor(windowWidth / 300)
          "
          :dataList="workList"
          @loadmore="loadmore"
          @scroll="scroll"
        >
          <div class="masonry" v-for="(item, index) in workList" :key="index">
            <img v-if="item.thumb" :src="imagesValue + item.thumb" alt="" />
            <img v-else src="@/assets/imgers/首页.png" alt="" />
            <div class="list_title">
              <div class="list_title_title">
                <div class="list_title_title_title">{{ item.title }}</div>
                <div class="list_title_title_title_tag flex">
                  <div v-for="(tag, i) in item.label.split(',')" :key="i">
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
            <div class="compete" @click="gocompete(item.id)">
              <div>点击参赛</div>
            </div>
          </div>
        </waterfall>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <div>
        <div>确定使用该作品参赛吗？</div>
        <div>{{ detilvalue.title }}</div>
        <div>
          <img
            :src="imagesValue + detilvalue.thumb"
            alt=""
            style="
              width: 120px;
              height: 120px;
              background: #e8e8e8;
              border-radius: 6px 6px 6px 6px;
            "
          />
        </div>
      </div>
      <div style="padding-top: 50px">
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm(detilvalue.id)"
            >确 定</el-button
          >
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  designerWorksApi,
  verJoinApi,
  JoinApi,
  workShowApi,
} from "@/urls/wsUrl.js";
import waterfall from "@/components/Designerzone/pul.vue";
import { imgUrl } from "@/assets/js/modifyStyle";
import { postD } from "@/api";
export default {
  components: {
    waterfall,
  },
  data() {
    return {
      windowWidth: document.documentElement.clientWidth,
      Works: {
        category: "0",
        limit: "10",
        offset: "1",
        status: "1",
      },
      workList: [],
      imagesValue: "",
      asdfg: true,
      dialogVisible: false,
      detilvalue: [],
    };
  },
  created() {
    this.imagesValue = imgUrl();
    this.workLists();
  },
  watch: {
    windowWidth(val) {
      let that = this;
      console.log("实时屏幕宽度：", val, that.windowHeight);
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
  },
  methods: {
    workLists() {
      postD(designerWorksApi(), this.Works).then((res) => {
        this.workList = [...this.workList, ...res.list];
      });
    },
    loadmore() {
      if (this.count != this.workList.length) {
        this.Works.offset++;
      }
    },
    scroll() {},
    gocompete(val) {
      var ids = {
        id: this.$route.params.id,
      };
      console.log(val);
      postD(verJoinApi(), ids).then((res) => {
        if (res.code == 200) {
          var Contribution = {
            id: val,
          };
          postD(workShowApi(), Contribution).then((res) => {
            this.dialogVisible = true;
            this.detilvalue = res.data;
          });
        } else {
          this.$message.error("已参加过此赛事");
        }
      });
    },
    confirm(val) {
      var Contribution = {
        id: this.$route.params.id,
        designer_works_id: val,
      };
      postD(JoinApi(), Contribution).then((res) => {
        if (res.code == 200) {
          this.$message.success("成功参与赛事");
          this.$router.push("EventDetails" + Contribution.id);
        } else {
          this.$message.error("参与赛事失败");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.list_free {
  margin-top: 20px;
  // display: flex;
  // justify-content: center;

  .list_free_list {
    max-width: 1580px;
    margin: 0 auto;
    // width: 100%;
    // display: flex;
    // flex-wrap: wrap;
  }
}
.masonry {
  max-width: 300px;
  min-width: 300px;
  width: 100%;
  background: #ffffff;
  border-radius: 6px 6px 6px 6px;
  // margin-left: 20px;
  margin-bottom: 20px;

  img {
    max-width: 300px;
    // height: 215px;
  }

  .list_title {
    // height: 60px;
    display: flex;

    .list_title_title {
      text-align: left;
      width: 222px;
      padding: 7px 11px;

      .list_title_title_title {
        width: 200px;
        // height: 22px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 16px;
        color: #06121e;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #06121e;
      }
      .list_title_title_title_tag {
        margin-bottom: 12px;
        margin-top: 4px;
        flex-wrap: wrap;
        div {
          // width: 50px;
          margin: 5px;
          padding: 10px;
          height: 20px;
          background: #eeeeee;
          text-align: center;
          border-radius: 10px 10px 10px 10px;
          font-size: 12px;
          line-height: 0px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #cccccc;
          margin-right: 3px;
        }
      }
      .icon {
        div {
          img {
            width: 16px;
            height: 16px;
          }
        }
      }
    }

    .list_title_img {
      // margin-left: auto;
      padding-right: 9px;
      padding-top: 20px;
      padding-bottom: 20px;

      img {
        width: 46px;
        height: 46px;
        border-radius: 50%;
      }
    }
  }
}
.compete {
  display: flex;
  justify-content: center;
  div {
    width: 280px;
    height: 40px;
    background: #1677ff;
    border-radius: 4px 4px 4px 4px;
    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
    cursor: pointer;
    line-height: 40px;
  }
}

/deep/.el-dialog {
  border-radius: 10px;
}
.el-button--default {
  width: 160px;
  height: 40px;
  background: #ffffff;
  border-radius: 20px 20px 20px 20px;
  border: 1px solid #0c032e;
  font-size: 16px;
  font-weight: 400;
  color: #333333;
}
.el-button--primary {
  width: 160px;
  height: 40px;
  background: linear-gradient(180deg, #0c032e 0%, #5c5673 100%);
  border-radius: 20px 20px 20px 20px;
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
}
</style>