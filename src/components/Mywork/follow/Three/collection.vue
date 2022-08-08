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
              <!-- <div class="drop">
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
                    <el-dropdown-item :command="{ id: item.id, title: 'del' }"
                      >删除</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </div> -->
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
import waterfall from "@/components/Designerzone/pul.vue";
export default {
  data() {
    return {
      windowWidth: document.documentElement.clientWidth,
      imagesValue: "",
      myworkList: [],
    };
  },
   created() {
    this.getmyworkList();
    // this.mywork();
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
    getmyworkList() {
      postD(getMyWorksApi(), this.Works).then((res) => {
        // console.log(res.list)
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
    handleCommand(command) {
      // console.log(command)
      // console.log(id)
      if (command.title == "edit") {
        this.$router.push({ path: "/UploadWorks", query: { id: command.id } });
      }
      if (command.title == "share") {
        let share_url =
        "http://192.168.0.116:8080/workDetails" + command.id;
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
        postD(delMyWorksApi(), { id: command.id }).then((res) => {
          console.log(res);
        });
      }
    },
    gowork(val) {
      this.$router.push("/workDetails"+val)
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
    background: #FFFFFF;
    border-radius: 6px 6px 6px 6px;
    margin-bottom: 20px;

    .coverimg {
        background-color: #000000;
        opacity: 1;
        position: relative;
        z-index: 10;
        cursor: pointer;

        .drop {
            position: absolute;
            top: 0;
            right: 0px;

            .icon {
                background: url('@/assets/imgers/icon/14692@2x.png');
                z-index: 9999;
                width: 40px;
                height: 24px;
                background-size: cover;
            }

            /deep/.el-dropdown-menu__item:focus,
            .el-dropdown-menu__item:hover {
                color: #FFDC00;
            }
        }

        img {
            max-width: 300px;
        }

        .img1 {
            position: absolute;
            top: calc(50% - 40px);
            left: calc(50% - 35px);
            z-index: 9;
        }
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
                color: #06121E;
                font-family: PingFang SC-Bold, PingFang SC;
                font-weight: bold;
                color: #06121E;
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
                    background: #EEEEEE;
                    text-align: center;
                    border-radius: 10px 10px 10px 10px;
                    font-size: 12px;
                    line-height: 0px;
                    font-family: PingFang SC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #CCCCCC;
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

.payimg {
    width: 300px;

    background: rgba(0, 0, 0, 1);
    overflow: hidden;

    img {
        filter: blur(25px);
        opacity: 0.5;
        z-index: 1;

    }
}
.sjs {
    background: url();
}
</style>