<template>
  <div>
    <div class="topbox">
      <div class="flex al-c">
        <div>
          <img
            src="@/assets/imgers/icon/14756@2x.png"
            style="margin-right: 9px; height: 40px; width: 40px"
            alt=""
          />
        </div>
        <div class="maintitle">{{listShow.title}}</div>
      </div>

      <div class="number flex">
        <div><span style="font-weight: bold">{{listShow.count}}</span>篇内容</div>
        <div style="margin-left: 40px">
          <span style="font-weight: bold">{{listShow.browse}}</span>次浏览
        </div>
      </div>
      <div style="margin-top: 25px">
        <el-tabs v-model="category" @tab-click="handleClick">
          <el-tab-pane label="热门" name="1"></el-tab-pane>
          <el-tab-pane label="最新" name="2"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="midbox" v-if="category == 1">
      <fabu />
      <div style="width: 1280px; margin: 0 auto">
        <div
          class="tabline"
          v-for="item in strollList"
          :key="item.id"
          @click="strollDetial(item.id)"
        >
          <div class="tablineValue">
            <div class="tabline1" v-if="item.is_top == 1">
              <span>置顶</span>
            </div>
            <div class="tabline2" v-if="item.is_ess == 1">
              <span>精华</span>
            </div>
            <div class="tabline3">
              <span>{{ item.title }}</span>
            </div>
          </div>
          <div class="tablineValue2">{{ item.description }}</div>
          <div
            class="tablineValue3"
            v-if="item.theme !== '' && item.theme !== null"
          >
            <span>#{{ item.theme }}</span>
          </div>
          <div v-if="item.thumb" class="tablineValue4">
            <div
              v-for="items in item.thumb.split(',').slice(0, 3)"
              :key="items"
              class="imgadde"
            >
              <img
                :src="imagesValue + items"
                alt=""
                style="width: 106px; height: 106px"
              />
            </div>
          </div>
          <div class="tablineValue5">
            <div>
              <img
                :src="imagesValue + item.headimage"
                alt=""
                style="
                  width: 32px;
                  height: 32px;
                  border-radius: 50%;
                  margin-top: 20px;
                "
              />
            </div>
            <div class="strollName">
              <span>{{ item.username }}</span>
            </div>
            <div class="strollTime">
              <span>{{ funTime(item.create_time) }}</span>
            </div>
            <div class="strollOption">
              <div class="strollOptionUp">
                <div class="strollOptionUpImg">
                  <img src="@/assets/imgers/cr爱心.png" alt="" />
                </div>
                <div class="strollOptionUpSpan">
                  <span>123</span>
                </div>
              </div>
              <div class="strollOptionUp">
                <div>
                  <img src="@/assets/imgers/cr评论.png" alt="" />
                </div>
                <div class="strollOptionUpSpan">
                  <span>123</span>
                </div>
              </div>
              <div class="strollOptionUp">
                <div>
                  <img src="@/assets/imgers/cr收藏.png" alt="" />
                </div>
                <div class="strollOptionUpSpan">
                  <span>123</span>
                </div>
              </div>
              <div class="strollOptionUp">
                <div>
                  <img src="@/assets/imgers/cr转发.png" alt="" />
                </div>
                <div class="strollOptionUpSpan">
                  <span>123</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <vxe-pager
          :current-page="page1.offset"
          :page-size="page1.limit"
          :total="page1.totalResult"
          :layouts="[
            'PrevPage',
            'JumpNumber',
            'NextPage',
            'FullJump',
            'Sizes',
            'Total',
          ]"
          @page-change="handlePageChangeActivity"
          style="margin-top: 20px"
        ></vxe-pager>
      </div>
    </div>
    <div class="midbox" v-if="category == 2">
      <fabu />
      <div style="width: 1280px; margin: 0 auto">
        <div
          class="tabline"
          v-for="item in strollLists"
          :key="item.id"
          @click="strollDetial(item.id)"
        >
          <div class="tablineValue">
            <div class="tabline1" v-if="item.is_top == 1">
              <span>置顶</span>
            </div>
            <div class="tabline2" v-if="item.is_ess == 1">
              <span>精华</span>
            </div>
            <div class="tabline3">
              <span>{{ item.title }}</span>
            </div>
          </div>
          <div class="tablineValue2">{{ item.description }}</div>
          <div
            class="tablineValue3"
            v-if="item.theme !== '' && item.theme !== null"
          >
            <span>#{{ item.theme }}</span>
          </div>
          <div v-if="item.thumb" class="tablineValue4">
            <div
              v-for="items in item.thumb.split(',').slice(0, 3)"
              :key="items"
              class="imgadde"
            >
              <img
                :src="imagesValue + items"
                alt=""
                style="width: 106px; height: 106px"
              />
            </div>
          </div>
          <div class="tablineValue5">
            <div>
              <img
                :src="imagesValue + item.headimage"
                alt=""
                style="
                  width: 32px;
                  height: 32px;
                  border-radius: 50%;
                  margin-top: 20px;
                "
              />
            </div>
            <div class="strollName">
              <span>{{ item.username }}</span>
            </div>
            <div class="strollTime">
              <span>{{ funTime(item.create_time) }}</span>
            </div>
            <div class="strollOption">
              <div class="strollOptionUp">
                <div class="strollOptionUpImg">
                  <img src="@/assets/imgers/cr爱心.png" alt="" />
                </div>
                <div class="strollOptionUpSpan">
                  <span>123</span>
                </div>
              </div>
              <div class="strollOptionUp">
                <div>
                  <img src="@/assets/imgers/cr评论.png" alt="" />
                </div>
                <div class="strollOptionUpSpan">
                  <span>123</span>
                </div>
              </div>
              <div class="strollOptionUp">
                <div>
                  <img src="@/assets/imgers/cr收藏.png" alt="" />
                </div>
                <div class="strollOptionUpSpan">
                  <span>123</span>
                </div>
              </div>
              <div class="strollOptionUp">
                <div>
                  <img src="@/assets/imgers/cr转发.png" alt="" />
                </div>
                <div class="strollOptionUpSpan">
                  <span>123</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <vxe-pager
          :current-page="page2.offset"
          :page-size="page2.limit"
          :total="page2.totalResult"
          :layouts="[
            'PrevPage',
            'JumpNumber',
            'NextPage',
            'FullJump',
            'Sizes',
            'Total',
          ]"
          @page-change="handlePageChangeActivitys"
          style="margin-top: 20px"
        ></vxe-pager>
      </div>
    </div>
  </div>
</template>

<script>
import { ForumThemeApi } from "@/urls/wsUrl.js";
import fabu from "@/components/Circle/CircleList/details/fabu/fabu.vue";
import { imgUrl } from "@/assets/js/modifyStyle";
import { postD } from "@/api";
import { timestampToTime } from "@/assets/js/time.js";
export default {
  components: {
    fabu,
  },
  data() {
    return {
      imagesValue: "",
      category: "1",
      page1: {
        id: "",
        offset: 1,
        limit: 10,
        totalResult: 0,
        is_hot: 1,
      },
      page2: {
        id: "",
        offset: 1,
        limit: 10,
        totalResult: 0,
        is_hot: 0,
      },
      strollList: [],
      strollLists: [],
      listShow:[]
    };
  },
  created() {
    this.page1.id = this.$route.query.id;
    this.page2.id = this.$route.query.id;
    this.imagesValue = imgUrl();
    this.strollValue();
    this.strollValues();
  },
  methods: {
    handleClick() {},
    funTime(val) {
      return timestampToTime(val);
    },
    strollValue() {
      postD(ForumThemeApi(), this.page1).then((res) => {
        this.strollList = res.list;
        this.listShow = res.show
        this.page1.totalResult = res.count;
      });
    },
    strollValues() {
      postD(ForumThemeApi(), this.page2).then((res) => {
        this.strollLists = res.list;
        this.listShow = res.show
        this.page2.totalResult = res.count;
      });
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(ForumThemeApi(), this.page1).then((res) => {
        this.strollList = res.list;
        this.page1.totalResult = res.count;
      });
    },
    handlePageChangeActivitys({ currentPage, pageSize }) {
      this.page2.offset = currentPage;
      this.page2.limit = pageSize;
      postD(ForumThemeApi(), this.page2).then((res) => {
        this.strollLists = res.list;
        this.page2.totalResult = res.count;
      });
    },
     strollDetial(val) {
      this.$router.push("/Forum/showForum" + val);
    },
  },
};
</script>

<style lang="less" scoped>
.topbox {
  width: 1280px;
  height: 160px;
  background: #ffffff;
  border-radius: 0px 0px 0px 0px;
  margin: 20px auto;
  padding: 0 40px;
  padding-top: 30px;
  /deep/.el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    z-index: 1;
    background-color: white;
  }

  /deep/.el-tabs__active-bar {
    position: absolute;
    bottom: 0;
    left: 0px;
    width: 29px !important;
    height: 2px;
    background-color: #ffdc00;
    z-index: 1;
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    list-style: none;
    width: 6px;
    height: 4px;
    border-radius: 2px 2px 2px 2px;
  }

  /deep/.el-tabs__item {
    padding: 0 20px;
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    position: relative;
    font-size: 14px;
    font-weight: 400;
    color: #999999;
  }

  /deep/.is-active {
    color: #0c032e;
    font-weight: bold;
  }

  .maintitle {
    font-size: 20px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #333333;
  }
  .number {
    width: 200px;
    margin-top: 10px;
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
  }
}
.midbox {
  width: 1280px;
  margin: 0 auto;
}
.tabline {
  background-color: white;
  background: #ffffff;
  border-radius: 6px 6px 6px 6px;
  padding: 20px 40px;
  margin-top: 20px;
}

.tablineValue {
  display: flex;
  cursor: pointer;
  .hoverTitle:hover {
    color: red;
  }
}

.tabline1 {
  width: 40px;
  height: 20px;
  background: #ffdc00;
  border-radius: 4px 4px 4px 4px;

  span {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 19px;
  }
}

.tabline2 {
  width: 40px;
  height: 20px;
  background: #ff2659;
  border-radius: 4px 4px 4px 4px;
  margin-left: 10px;
  margin-right: 10px;

  span {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 19px;
  }
}

.tabline3 {
  span {
    font-size: 20px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #06121e;
  }
}

.tabline4 {
  margin-left: auto;
  margin-right: 50px;
  cursor: pointer;
}

.tablineValue2 {
  margin-top: 20px;
    width: 1205px;
    height: 44px;
    font-size: 14px;
    font-weight: 400;
    color: #999999;
    overflow: hidden;
    /* 溢出部分进行隐藏 */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    /* 盒模型元素从顶部向底部垂直排列子元素 */
    -webkit-line-clamp: 2;
    /* 显示两行 */
    text-overflow: ellipsis;
    text-align: left;
}

.tablineValue3 {
  max-width: 100px;
  height: 20px;
  background: #eeeeee;
  border-radius: 10px 10px 10px 10px;
  margin: 8px 0px 10px 0px;
  text-align: center;

  span {
    font-size: 12px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #cccccc;
  }
}

.tablineValue4 {
  text-align: left;
  margin-top: 10px;
}

.imgadde {
  display: inline;

  img {
    margin-right: 10px;
  }
}

.tablineValue5 {
  display: flex;
}

.strollName {
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d444d;
  margin-top: 30px;
  margin-left: 10px;
}
.strollNames {
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d444d;
  margin-top: 25px;
  margin-left: 10px;
}

.strollTime {
  font-size: 10px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  margin-top: 30px;
  margin-left: 40px;
}

.strollOption {
  margin-top: 30px;
  margin-left: auto;
  display: flex;

  .strollOptionUp {
    cursor: pointer;
    display: flex;
    margin-right: 40px;

    .strollOptionUpSpan {
      font-size: 12px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 20px;
      margin-left: 10px;
    }
  }
}
</style>