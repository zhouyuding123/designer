<template>
  <div>
    <div class="line">
      <div class="midbox" v-if="crowddetilShow == false">
        <el-tabs v-model="activeName">
          <el-tab-pane label="我发起的众筹" name="1"></el-tab-pane>
          <el-tab-pane label="被众筹的作品" name="2"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div v-if="activeName == 1 && crowddetilShow == false">
      <div class="line dis">
        <div>
          <el-select v-model="crowd.pingpaixuanze" placeholder="请选择">
            <el-option
              v-for="item in product"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="dis shurukuang" style="margin-left: 20px">
          <div>
            <el-input
              v-model="crowd.keyword"
              placeholder="请输入内容"
            ></el-input>
          </div>
          <div class="sseatch cur">搜索</div>
        </div>
        <div class="dis" style="margin-left: 230px">
          <div
            class="zxc"
            v-for="(item, index) in topicClass"
            :key="index"
            :class="selectedIndex == index ? 'active' : ''"
            @click="getTopic(index, item.topicClassId)"
          >
            {{ item }}
          </div>
        </div>
        <div style="margin-left: auto" class="shuax cur">刷新</div>
      </div>
      <div class="line">
        <div class="dis divcrowdst">
          <div v-for="(item, index) in divcrowd" :key="index">{{ item }}</div>
        </div>
        <div>
          <div
            class="crowdlist"
            v-for="(item, index) in crowdList"
            :key="index"
          >
            <div class="crowdlistshop">
              <div class="crowdlistshop_img">
                <img :src="imagesValue + item.thumb" alt="" />
              </div>
              <div class="crowdlistshop_title">
                {{ item.title }}
              </div>
            </div>
            <div class="crowdlistshopjg">
              {{ item.price_unit }}
            </div>
            <div class="crowdlistshoptiems">
              {{ fulltime(item.create_time, item.prepar_time) }}
            </div>
            <div class="jdt">
              <div class="jdt_jdt">
                <div style="width: 200px">
                  <el-progress
                    :percentage="percentageing(item)"
                    :color="customColor(item)"
                  ></el-progress>
                </div>
              </div>
              <div class="jdtvalue">
                已筹{{ item.sale_count }}件/{{ item.max_count }}件
              </div>
            </div>
            <div class="ztxs">
              <div
                v-if="
                  item.sale_count / item.max_count <
                    item.min_count / item.max_count &&
                  new Date().getTime() <= new Date(item.prepar_time).getTime()
                "
              >
                众筹中
              </div>
              <div
                v-if="
                  item.sale_count / item.max_count >=
                    item.min_count / item.max_count &&
                  new Date().getTime() <= new Date(item.prepar_time).getTime()
                "
              >
                众筹完成
              </div>
              <!-- <div>已交货</div> -->
              <div
                v-if="
                  item.sale_count / item.max_count <
                    item.min_count / item.max_count &&
                  new Date().getTime() >= new Date(item.prepar_time).getTime()
                "
              >
                众筹失败
              </div>
            </div>
            <div style="margin-left: auto; margin-right: 20px" class="xq">
              <!-- <div>开始生产</div>
            <div>生产中</div>
            <div>生产完成</div>
            <div>生产完成</div> -->
              <!-- <div class="cur ">发货</div> -->
              <!-- <div>发货中</div> -->
              <div class="cur" @click="goxq(item)">查看详情</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="crowddetilShow == true">
      <crowddetil />
    </div>
    <div v-if="activeName == 2 && crowddetilShow == false">
      <mycrowd-funding />
    </div>
  </div>
</template>

<script>
import { getListApi, PreparGetListApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
import crowddetil from "./crowd/crowddetil.vue";
import MycrowdFunding from "./mycrowd-funding.vue";
export default {
  components: { crowddetil, MycrowdFunding },
  data() {
    return {
      imagesValue: "",
      activeName: "1",
      product: [],
      crowd: {
        pingpaixuanze: "",
        keyword: "",
        status: 1,
        offset: 1,
        limit: 10,
      },
      topicClass: ["全部", "众筹中", "众筹完成", "已交货", "众筹失败"],
      selectedIndex: "0",
      divcrowd: ["众筹商品", "众筹价", "距离结束时间", "进度", "状态", "操作"],
      crowdList: [],
      percentage: Number(),
      crowddetilShow: false,
      prepar_id: "",
    };
  },
  created() {
    this.imagesValue = imgUrl();
    this.getList();
    this.mycrowd();
  },
  methods: {
    getList() {
      postD(getListApi()).then((res) => {
        if(res.code == "-201") {
          this.$router.push("/about")
        }
        this.product = res.list;
      });
    },
    mycrowd() {
      postD(PreparGetListApi(), this.crowd).then((res) => {
        this.crowdList = res.list;
      });
    },
    getTopic(index, id) {
      this.selectedIndex = index;
    },
    percentageing(val) {
      return Number(((val.sale_count / val.max_count) * 100).toFixed());
    },
    customColor(val) {
      if (val.sale_count / val.max_count >= val.min_count / val.max_count) {
        return "#00B567";
      } else {
        return "#FF0000";
      }
    },
    fulltime(v, b) {
      console.log(v, b);
      let arr = v + "," + b;
      arr = arr.split(",");
      let arr1 = new Date(arr[0]).getTime();
      let arr2 = new Date(arr[1]).getTime();
      let dateDiff = arr2 - arr1;
      var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
      var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
      //计算相差分钟数
      var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
      //计算相差秒数
      var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
      var seconds = Math.round(leave3 / 1000);
      var timesString = "";
      if (dayDiff != 0 && dateDiff>0) {
        timesString = dayDiff + "天";
      }else if(hours!=0 && hours >0){
        timesString = hours + "小时";
      } 
      else {
        timesString = "结束";
      }
      return timesString;
    },
    goxq(v) {
      localStorage.setItem("ybt",JSON.stringify(v))
      localStorage.setItem("parid", v.id);
      this.crowddetilShow = true;
    },
  },
};
</script>


<style lang="less" scoped>
@import url("./crowd-funding.less");
</style>