<template>
  <div>
    <div class="syimg">
      <img src="@/assets/imgers/首页.png" alt="" />
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
        <div class="masonry" v-for="item in workList" :key="item.id" lazy>
             <img :src="imagesValue + item.thumb" alt="" />
             <div class="list_title">
                  <div class="list_title_title"> 
                      <div class="list_title_title_title">{{item.title}}</div>
                      <div></div>
                      <div></div>
                  </div>
                  <div class="list_title_img">
                      <img :src="imagesValue + item.headimage" alt="">
                  </div>
              </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { getListWorksApi, getListApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      freeShow: true,
      getList: [],
      Works: {
        category: "2",
        product_type_id: 1,
        limit:"",
        offset:"1"
      },
      workList: [],
      imagesValue: "",
    };
  },
  created() {
    this.Listshow();
    this.getListApi();
    this.imagesValue = imgUrl();
  },
  methods: {
    Listshow() {
      postD(getListWorksApi(), this.Works).then((res) => {
        console.log(res);
        this.workList = res.list;
        this.limit = res.count
        this.$refs.freelist.style.backgroundColor = "#FFDC00";
        this.$refs.freelistspan.style.color = "#333333";
        this.$refs.paylist.style.backgroundColor = "#F5F5F5";
        this.$refs.paylistspan.style.color = "#999999";
      });
    },
    free() {
      this.$refs.freelist.style.backgroundColor = "#FFDC00";
      this.$refs.freelistspan.style.color = "#333333";
      this.$refs.paylist.style.backgroundColor = "#F5F5F5";
      this.$refs.paylistspan.style.color = "#999999";
    },
    pay() {
      this.$refs.freelist.style.backgroundColor = "#F5F5F5";
      this.$refs.freelistspan.style.color = "#999999";
      this.$refs.paylist.style.backgroundColor = "#FFDC00";
      this.$refs.paylistspan.style.color = "#333333";
    },
    getListApi() {
      postD(getListApi()).then((res) => {
        this.getList = res.list;
      });
    },
    freelists(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./Designerzone.less");
</style>