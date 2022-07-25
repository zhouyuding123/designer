<template>
  <div>
    <div class="enttop">
      <div class="enttop_left">
        <div class="enttop_left_name">
          <div class="enttop_left_img">
            <img :src="imageValue + showDetil.thumb" alt="" />
          </div>
          <div class="enttop_left_title">
            <div class="enttop_left_title_title">{{ showDetil.title }}</div>

            <div class="enttop_left_title_zy">
              品牌类型:
              <div v-for="item in showDetil.style" :key="item.id">
                {{ item.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="entphoto">
      <div class="entphoto_value">
        <div class="entphoto_value_photo">品牌说明</div>
        <div class="entphoto_value_img">
          {{ showDetil.content }}
        </div>
      </div>
    </div>
    <div class="entphoto">
      <div class="entphoto_value">
        <div class="entphoto_value_photo">相关资料</div>
        <div class="entphoto_value_img">
          <img
            style="
              width: 280px;
              height: 200px;
              border-radius: 0px 0px 0px 0px;
              border: 1px solid #cccccc;
            "
            :src="imageValue + showDetil.qualification"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { showbrandApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      valueId: {
        id: "",
      },
      imageValue: "",
      showDetil: [],
    };
  },
  created() {
    this.valueId.id = this.$route.params.id;
    this.showvalue();
    this.imageValue = imgUrl();
  },
  methods: {
    showvalue() {
      postD(showbrandApi(), this.valueId).then((res) => {
        console.log(res);
        this.showDetil = res.data;
      });
    },
  },
};
</script>


<style lang="less" scoped>
@import url("./goBand.less");
</style>