<template>
  <div>
    <div class="worksBody">
      <div class="worksDiv">
        <div class="headimagephoto">
          <el-image
            :src="imagesValue + WorksShowData.headimage"
            alt=""
            class="headStyle"
          />
        </div>
        <div class="nicknameValue">
          <div class="name_nickname">
            <span class="nickname_span">{{ WorksShowData.nickname }}</span>
            <div class="top">
              <span>一级设计师</span>
            </div>
          </div>
          <div class="fans_num">
            <span>粉丝数 123</span>
          </div>
        </div>
        <div class="buttons">
          <div class="button_Shop"><span>购买版权</span></div>
          <div class="button_to"><span>发起众筹</span></div>
          <div class="button_follow"><span>关注</span></div>
        </div>
      </div>
      <div class="worksDiv2">
        <div class="worksDiv2line1">
          <div class="line1_value">
            <p>{{ WorksShowData.title }}</p>
            <span>{{ WorksShowData.create_time }}</span>
          </div>
          <div class="line1_Collection">
            <div>
              <img src="@/assets/imgers/爱心.png" alt="" />
              <p>123</p>
            </div>
            <div>
              <img
                src="@/assets/imgers/ic_chat_bubble_outline_48px.png"
                alt=""
              />
              <p>123</p>
            </div>
            <div>
              <img src="@/assets/imgers/ic_star_border_24px.png" alt="" />
              <p>123</p>
            </div>
          </div>
        </div>
        <div class="worksDiv2line2">
          {{ WorksShowDataContent.text }}
        </div>
        <div v-for="item in imgs" :key="item.item" class="imgs">
          <img
            :src="imagesValue + item"
            alt=""
            v-if="item.split('/')[0] == 'images'"
          />
          <video
            v-if="item.split('/')[0] == 'moves'"
            controls
            style="width: 100%"
          >
            <source :src="imagesValue + item" type="video/mp4" />
            <source :src="imagesValue + item" type="video/ogg" />
          </video>
        </div>
      </div>
      <div class="worksDiv3">
        <div class="worksDiv3line1">
          <span>作品信息</span>
        </div>
        <div class="worksDiv3line2">
          <div>
            <span class="worksline1">原创作品</span
            ><span class="worksline1Value">服装设计 成人卫衣</span>
          </div>
          <div>
            <span class="worksline1">上传时间</span
            ><span class="worksline1Value">{{
              WorksShowData.create_time
            }}</span>
          </div>
          <div>
            <span class="worksline1">作品版权</span
            ><span class="worksline1Value">服装设计 成人卫衣</span>
          </div>
          <div class="lastDiv">
            <span class="worksline1">作品标签</span>
            <span class="worksline1Values"
              ><el-tag type="info" v-for="items in labels" :key="items.item"
                ><span>{{ items }}</span></el-tag
              >
            </span>
          </div>
        </div>
        <div class="shaped"></div>
        <div class="bottomValue">
          <div class="statement">
            声明：本站内用户发表的所有内容及言论仅代表其本人，并不反映本站意见及观点。
          </div>
          <div class="operation">
            <div class="complaint" @click="zxc">
              <img src="@/assets/imgers/转发.png" alt="" />
            </div>
            <span @click="zxc">举报</span>
            <div class="fgx"></div>
            <div class="forward">
              <img src="@/assets/imgers/转发.png" alt="" />
            </div>
            <span>转发</span>
          </div>
        </div>
      </div>
    </div>
    <div class="outone cur" @click="goOut">
        <div>
          返回
        </div>
    </div>
  </div>
</template>

<script>
import { postD } from "@/api";
import { MatchworkShowApi } from "@/urls/wsUrl.js";
import { imgUrl } from "@/assets/js/modifyStyle.js";
export default {
  data() {
    return {
      routeId: {
        id:""
      },
      WorksShowData: [],
      imagesValue: "",
      imgs: [],
      labels: "",
      WorksShowDataContent: "",
    };
  },
  created() {
    this.WorkDetailsList();
  },
  methods: {
    WorkDetailsList() {
      this.routeId.id = this.$route.params.works_id;
      console.log(this.routeId.id);
      postD(MatchworkShowApi(), this.routeId).then((res) => {
        console.log(res);
        this.WorksShowData = res.data;
        this.imagesValue = imgUrl();
        var ss = JSON.parse(res.data.content);
        this.WorksShowDataContent = ss;
        this.imgs = this.WorksShowDataContent.images.split(",");
      });
    },
    zxc() {
      console.log(123);
    },
    goOut() {
      this.$router.push("/EventDetails"+this.$route.params.id)
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./screeningDetial.less");
</style>