<template>
  <div>
    <div class="crbody" v-if="shopDetial == false">
      <div class="crbody_t">
        <div class="crbody_t_img">
          <img :src="imagesValue + kezhanshishuju.thumb" alt="" />
        </div>
        <div class="crbody_t_title">
          <div class="crbody_t_title_top">{{ kezhanshishuju.title }}</div>
          <div class="crbody_t_title_sjs dis">
            <div class="headimgs">
              <img :src="imagesValue + headerImg" alt="" />
            </div>
            <div class="headname">
              {{ kezhanshishuju.nickname }}
            </div>
            <div style="margin: 8px">
              <img src="@/assets/imgers/设计师等级.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="crbody_yy">
        <div class="crbody_yy_title">样衣图</div>
        <div class="crbody_yy_photo">
          <div v-for="(item, index) in imgslist" :key="index">
            <img :src="imagesValue + item" alt="" />
          </div>
        </div>
      </div>
      <div class="crbody_jg">
        <div class="dis crbody_jg_jg">
          <div>众筹价格：</div>
          <div>{{ kezhanshishuju.price_unit }}</div>
        </div>
        <div class="dis crbody_jg_jg">
          <div>建议零售价：</div>
          <div>{{ kezhanshishuju.price }}</div>
        </div>
      </div>
      <div class="crbody_lb">
        <div class="crbody_lb_t">
          <div class="crbody_lb_t_1">众筹详情 总数{{ num }}件</div>
          <div @click="zxc" class="crbody_lb_t_3 cur">Excel导出</div>
          <div class="crbody_lb_t_2 cur" @click="goddxx" v-if="crowdList != ''">
            查看众筹订单
          </div>
          <div v-else></div>
        </div>
        <div class="crbody_lb_list">
          <div class="dis crbody_lb_lists">
            <div>颜色</div>
            <div>尺寸</div>
            <div>众筹数量</div>
          </div>
          <div
            class="dis crbody_lb_listss"
            v-for="(item, index) in speclist"
            :key="index"
            ref="xtea"
          >
            <div>{{ item.color }}</div>
            <div>{{ item.spec || item.size }}</div>
            <div>{{ item.count }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="shopDetial == true">
      <corwdfh />
    </div>
  </div>
</template>

<script>
import { imgUrl } from "@/assets/js/modifyStyle";
import corwdfh from "./crowdfh.vue";
import { postD } from "@/api";
import { PgetOrderListApi, getOrderSpecCountApi } from "@/urls/wsUrl.js";
export default {
  components: { corwdfh },
  data() {
    return {
      imagesValue: "",
      headerImg: "",
      crowdList: "",
      listCrowd: [],
      shopDetial: false,
      imgslist: "",
      speclist: "",
      kezhanshishuju: [],
      num: 0,
    };
  },
  created() {
    this.imagesValue = imgUrl();
    this.headerImg = JSON.parse(localStorage.getItem("data")).headimage;
    this.getOrder();
  },
  methods: {
    getOrder() {
      var sss = {
        prepar_id: localStorage.getItem("parid"),
      };
      postD(PgetOrderListApi(), sss).then((res) => {
        if(res.code == "-201") {
          this.$router.push("/about")
        }
        this.crowdList = res.list;
        var imgs = JSON.parse(localStorage.getItem("ybt")).thumb_model;
        if (imgs.indexOf(",") != -1) {
          this.imgslist = JSON.parse(localStorage.getItem("ybt")).thumb_model;
        } else {
          this.imgslist = JSON.parse(
            localStorage.getItem("ybt")
          ).thumb_model.split(",");
        }

        this.kezhanshishuju = JSON.parse(localStorage.getItem("ybt"));
        postD(getOrderSpecCountApi(), sss).then((res) => {
          this.speclist = res.list;
          res.list.forEach((v) => {
            this.num += v.count;
          });
        });
      });
    },
    goddxx() {
      this.shopDetial = true;
    },
    zxc() {
      // 要导出的json数据
      const jsonData = this.speclist;
      let str = `颜色,尺码,件数\n`;
      // 增加\t为了不让表格显示科学计数法或者其他格式
      for (let i = 0; i < jsonData.length; i++) {
        for (const key in jsonData[i]) {
          str += `${jsonData[i][key] + "\t"},`;
        }
        str += "\n";
      }
      // encodeURIComponent解决中文乱码
      const uri =
        "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(str);
      // 通过创建a标签实现
      const link = document.createElement("a");
      link.href = uri;
      // 对下载的文件命名
      link.download = this.crowdList[0].title;
      link.click();
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./crowddetil.less");
</style>