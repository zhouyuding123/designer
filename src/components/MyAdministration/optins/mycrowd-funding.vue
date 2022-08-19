<template>
  <div>
    <div class="line dis">
      <div class="dis shurukuang">
        <div>
          <el-input
            v-model="crowd.shurukuang"
            placeholder="请输入内容"
          ></el-input>
        </div>
        <div class="sseatch cur">搜索</div>
      </div>
      <div class="dis" style="margin-left: 470px">
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
      <div class="dis divcrowdsts">
        <div v-for="(item, index) in divcrowd" :key="index">{{ item }}</div>
      </div>
      <div>
        <div class="crowdlist" v-for="(item, index) in crowdList" :key="index">
          <div class="crowdlistshop">
            <div class="crowdlistshop_img">
              <img :src="imagesValue + item.tupian" alt="" />
            </div>
            <div class="crowdlistshop_title">
              {{ item.shangpingtitle }}
            </div>
          </div>
          <div class="crowdlistshopjgs">
            {{ item.zhongchoujiage }}
          </div>
          <div class="crowdlistshoplsj">
            {{ item.zhongchoujiage }}
          </div>
          <div class="crowdlistshopl_num">
            {{ item.zhongchoujiage }}
          </div>
          <div style="margin-left: auto; margin-right: 100px" class="xq">
            <div class="okcro">
              <img src="@/assets/imgers/众筹成功.png" alt="" />
            </div>
            <!-- <div class="nocro">查看详情</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      imagesValue: "",
      crowd: {
        pingpaixuanze: "",
        shurukuang: "",
      },
      topicClass: ["全部", "众筹中", "众筹完成", "已交货", "众筹失败"],
      selectedIndex: 0,
      divcrowd: [
        "众筹商品",
        "众筹版权费",
        "零售指导价",
        "众筹数量",
        "众筹结果",
      ],
      crowdList: [
        {
          tupian:
            "images/20220815/1660550535102aa33ae2b2c86837a584c502d8cfea.png",
          //   商品图片
          shangpingtitle: "成人卫衣原创H.O追梦独树一帜连帽衫五六七八情侣装",
          // 商品名称
          zhongchoujiage: 2000,
          // 商品价格
          yichou: 2800,
          // 已筹2800件
          zhongzhongchoushuliang: 5000,
          // 总众筹数量
          zuishaozhongchongshuliang: 3000,
          //   最少众筹数量
          times: "18",
        },
        {
          tupian:
            "images/20220815/1660550535102aa33ae2b2c86837a584c502d8cfea.png",
          //   商品图片
          shangpingtitle: "成人卫衣原创H.O追梦独树一帜连帽衫五六七八情侣装",
          // 商品名称
          zhongchoujiage: 2000,
          // 商品价格
          yichou: 3000,
          // 已筹2800件
          zhongzhongchoushuliang: 5000,
          // 总众筹数量
          zuishaozhongchongshuliang: 3000,
          //   最少众筹数量
          times: "剩余18天",
        },
      ],
    };
  },
  created() {
    this.imagesValue = imgUrl();
  },
  methods: {
    getTopic(index, id) {
      this.selectedIndex = index;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./crowd-funding.less");
</style>