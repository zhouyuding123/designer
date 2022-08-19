<template>
  <div>
    <div class="crbody" v-if="shopDetial == false">
      <div class="crbody_t">
        <div class="crbody_t_img">
          <img :src="imagesValue + crowdList.tupian" alt="" />
        </div>
        <div class="crbody_t_title">
          <div class="crbody_t_title_top">{{ crowdList.shangpingtitle }}</div>
          <div class="crbody_t_title_sjs dis">
            <div class="headimgs">
              <img :src="imagesValue + crowdList.headimg" alt="" />
            </div>
            <div class="headname">
              {{ crowdList.nik }}
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
          <div v-for="(item, index) in crowdList.photo" :key="index">
            <img :src="imagesValue + item" alt="" />
          </div>
        </div>
      </div>
      <div class="crbody_jg">
        <div class="dis crbody_jg_jg">
          <div>众筹价格：</div>
          <div>2000</div>
        </div>
        <div class="dis crbody_jg_jg">
          <div>建议零售价：</div>
          <div>2000</div>
        </div>
      </div>
      <div class="crbody_lb">
        <div class="crbody_lb_t">
          <div class="crbody_lb_t_1">众筹详情</div>
          <div class="crbody_lb_t_2 cur" @click="goddxx">查看众筹订单</div>
        </div>
        <div class="crbody_lb_list">
          <div class="dis crbody_lb_lists">
            <div>颜色</div>
            <div>尺寸</div>
            <div>众筹数量</div>
          </div>
          <div
            class="dis crbody_lb_listss"
            v-for="(item, index) in listCrowd"
            :key="index"
          >
            <div>{{ item.color }}</div>
            <div>{{ item.size }}</div>
            <div>{{ item.num }}</div>
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
export default {
  components: { corwdfh },
  data() {
    return {
      imagesValue: "",
      crowdList: {
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
        headimg:
          "images/20220815/166055702603a8ae0519be46a768b7eeeb5f0359ce.png",
        nik: "设计师昵称",
        photo: [
          "images/20220815/16605576926208d26fc51ec44ca8342dc6cf13ddd6.png",
          "images/20220815/16605576926208d26fc51ec44ca8342dc6cf13ddd6.png",
          "images/20220815/16605576926208d26fc51ec44ca8342dc6cf13ddd6.png",
        ],
      },
      listCrowd: [
        { color: "黑色", size: "x", num: "100" },
        { color: "黑色", size: "x", num: "100" },
        { color: "黑色", size: "x", num: "100" },
        { color: "黑色", size: "x", num: "100" },
        { color: "黑色", size: "x", num: "100" },
        { color: "黑色", size: "x", num: "100" },
        { color: "黑色", size: "x", num: "100" },
        { color: "黑色", size: "x", num: "100" },
        { color: "黑色", size: "x", num: "100" },
        { color: "黑色", size: "x", num: "100" },
      ],
      shopDetial: false,
    };
  },
  created() {
    this.imagesValue = imgUrl();
  },
  methods: {
    goddxx() {
      this.shopDetial = true;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./crowddetil.less");
</style>