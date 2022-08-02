<template>
  <div>
    <div class="syimg">
      <el-carousel height="600px" >
        <el-carousel-item v-for="item in advertisementImg" :key="item.id" >
          <img :src="imagesValue+item.thumb" alt="" @click="goad(item)" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="area">
      <div @click="free()" ref="freelist">
        <span ref="freelistspan">免费专区</span>
      </div>
      <div @click="pay()" ref="paylist">
        <span ref="paylistspan">付费专区</span>
      </div>
    </div>
    <div v-if="freeShow == true" class="sadx">
      <div class="screen">
        <el-radio
          v-for="item in getList"
          :key="item.id"
          v-model="Works.product_type_id"
          :label="item.id"
          @change="freelists(item.id)"
          border
          >{{ item.title }}</el-radio
        >
      </div>
    </div>

    <div class="list_free">
      <div class="list_free_list">
        <waterfall
          v-if="Works.category == 2"
          :cols="
            Math.floor(windowWidth / 300) >= 5
              ? 5
              : Math.floor(windowWidth / 300)
          "
          :dataList="workList"
          @loadmore="loadmore"
          @scroll="scroll"
        >
          <div
            class="masonry"
            v-for="(item, index) in workList"
            :key="index"
            @click="todetails(item.id)"
          >
            <div class="coverimg">
              <img :src="imagesValue + item.thumb" alt="" />
            </div>
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
              <div
                class="list_title_img"
                @click.stop="topersonalinfo(item.username)"
              >
                <img :src="imagesValue + item.headimage" alt="" />
              </div>
            </div>
          </div>
        </waterfall>
        <waterfall
          v-if="Works.category == 3"
          :cols="
            Math.floor(windowWidth / 300) >= 5
              ? 5
              : Math.floor(windowWidth / 300)
          "
          :dataList="workList"
          @loadmore="loadmore"
          @scroll="scroll"
        >
          <div
            class="masonry"
            v-for="(item, index) in workList"
            :key="index"
            @click="todetails(item.id)"
          >
            <div class="coverimg">
              <div class="payimg">
                <img :src="imagesValue + item.thumb" alt="" />
              </div>
              <img src="@/assets/imgers/12574@2x.png" class="img1" alt="" />
            </div>
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
          </div>
        </waterfall>
      </div>
    </div>
  </div>
</template>


<script>
import { getListWorksApi, getListApi, AdApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
import waterfall from "./pul.vue";

export default {
  data() {
    return {
      freeShow: true,
      getList: [],
      Works: {
        category: "2",
        product_type_id: undefined,
        limit: "10",
        offset: "1",
      },
      workList: [],
      imagesValue: "",
      windowWidth: document.documentElement.clientWidth,
      tid: {
        tid: 10,
      },
      advertisementImg: [],
    };
  },
  components: {
    waterfall,
  },
  created() {
    this.Listshow();
    this.getListApi();
    this.imagesValue = imgUrl();
    this.advertisement();
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
    advertisement() {
      postD(AdApi(), this.tid).then((res) => {
        console.log(res);
        this.advertisementImg = res.list;
      });
    },
    Listshow() {
      postD(getListWorksApi(), this.Works).then((res) => {
        console.log(res);
        this.workList = [...this.workList, ...res.list];
        // console.log(this.workList[9].label.split(','))
        this.count = res.count;
        // this.$refs.freelist.style.backgroundColor = "#FFDC00";
        // this.$refs.freelistspan.style.color = "#333333";
        // this.$refs.paylist.style.backgroundColor = "#F5F5F5";
        // this.$refs.paylistspan.style.color = "#999999";
      });
    },
    free() {
      this.$refs.freelist.style.backgroundColor = "#FFDC00";
      this.$refs.freelistspan.style.color = "#333333";
      this.$refs.paylist.style.backgroundColor = "#F5F5F5";
      this.$refs.paylistspan.style.color = "#999999";
      this.Works.category = "2";
      this.Works.offset = "1";
      this.workList = [];
      this.Listshow();
    },
    pay() {
      this.$refs.freelist.style.backgroundColor = "#F5F5F5";
      this.$refs.freelistspan.style.color = "#999999";
      this.$refs.paylist.style.backgroundColor = "#FFDC00";
      this.$refs.paylistspan.style.color = "#333333";
      this.Works.category = "3";
      this.Works.offset = "1";
      this.workList = [];
      this.Listshow();
    },
    getListApi() {
      postD(getListApi()).then((res) => {
        this.getList = res.list;
      });
    },
    freelists(val) {
      this.Works.product_type_id = val;
      this.Works.offset = "1";
      this.workList = [];
      this.Listshow();
    },
    loadmore() {
      if (this.count != this.workList.length) {
        this.Works.offset++;
        this.Listshow();
      }
      // this.Works.offset=2
      // this.Listshow()
    },
    scroll() {},
    //点击设计师头像
    topersonalinfo(name) {
      this.$router.push({
        path: "/DesignerHomepage",
        query: { username: name },
      });
    },
    todetails(id) {
      this.$router.push("/workDetails" + id);
    },
    goad(val) {
      this.$router.push(val.url)
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./Designerzone.less");
</style>