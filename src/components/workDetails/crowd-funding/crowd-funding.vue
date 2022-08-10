<template>
  <div>
    <div class="croline1">
      <div class="bodylist" v-for="(item, index) in workList" :key="index">
        <div class="works_img">
          <img :src="imagesValue + item.img" alt="" />
        </div>
        <div class="works_title">
          <div class="works_title_text">{{ item.title }}</div>
          <div class="works_my">
            <div class="works_myhead">
              <img :src="imagesValue + item.headerimages" alt="" />
            </div>
            <div class="works_myname">{{ item.name }}</div>
            <div class="works_mydj">
              <img src="@/assets/imgers/list.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-form
      :model="corruleForm"
      :rules="corrules"
      ref="corruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="croline2">
        <div class="croline2_body">
          <el-form-item label="众筹价格">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="零售指导价">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="众筹时效">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="众筹数量">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="交货日期">
            <el-date-picker
              type="date"
              placeholder="交货时间"
              v-model="corruleForm.cortimes"
              style="width: 100%"
              @change="getTime"
            ></el-date-picker>
          </el-form-item>
        </div>
      </div>
      <div class="croline3">
        <div class="croline3_tit">样衣图</div>
        <div class="dis">
          <el-form-item>
            <el-upload
              class="avatar-uploader"
              action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
              :data="{ fileType: this.fileType }"
              multiple
              list-type="picture-card"
              :limit="100"
              :on-success="handleAvatarSuccesser2"
              :file-list="imageList2"
              :on-preview="handlePictureCardPreview"
              :before-upload="beforeAvatarUpload1"
              :on-remove="fileRemove2"
            >
              <i
                class="el-icon-picture-outline"
                style="background-color: #f5f5f5"
              ></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <div class="flex">
              <ele-upload-video
                :data="{ fileType: this.fileType1 }"
                @error="handleUploadError"
                :responseFn="handleResponse"
                action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                v-model="videosrc"
                @delete="delete1"
              />
            </div>
          </el-form-item>
        </div>
      </div>
      <div class="croline4">
        <el-form-item label="颜色">
          <div class="btns flex">
            <div
              class="btnstyle"
              v-for="(item, index) in btntitle"
              :key="index"
              :class="{ active: btnindex == index }"
              @click="switchbtn(index)"
              style="margin-right: 20px"
            >
              {{ item }}
            </div>
          </div>
        </el-form-item>
        <el-form-item label="尺寸">
          <div class="btns flex">
            <div
              class="btnstyle"
              v-for="(item, index) in btntitlecc"
              :key="index"
              :class="{ active: btnindexs == index }"
              @click="switchbtns(index)"
              style="margin-right: 20px"
            >
              {{ item }}
            </div>
          </div>
        </el-form-item>
      </div>
      <div class="croline5">
        <div class="croline3_tit">材质</div>
        <el-form-item>
          <el-input type="textarea" :rows="1" v-model="textarea"> </el-input>
        </el-form-item>
      </div>
      <div class="croline5">
        <div class="croline3_tit">详细描述</div>
        <el-form-item>
          <el-input type="textarea" :rows="1" v-model="textarea"> </el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="croline6">
      <div class="cur">提交众筹</div>
    </div>
    <header>众筹功能暂未开放</header>
  </div>
</template>


<script>
import { imgUrl } from "@/assets/js/modifyStyle";
import { timestampToTime } from "@/assets/js/time.js";
import EleUploadVideo from "@/components/UploadWorks/EleUploadVideo.vue";
export default {
  components: {
    EleUploadVideo,
  },
  data() {
    return {
      workList: [
        {
          headerimages:
            "images/20220806/16597489830107a2677f091b40a49b4364f5403e46.png",
          title: "暗夜的黑天鹅-高贵与优雅只为取悦自己",
          name: "设计师昵称",
          img: "images/20220806/1659754744c406d1e49f9bfc5b31a5cf927a9c7769.png",
          time: "2022-05-17",
          aixing: "999999",
        },
      ],
      corruleForm: { cortimes: "" },
      corrules: {},
      fileType: "images",
      fileType1: "moves",
      imageList2: [],
      dialogImageUrl: "",
      dialogVisible: false,
      videosrc: "",
      videosrc1: "",
      btntitle: [
        "红色",
        "蓝色",
        "蓝色",
        "蓝色",
        "蓝色",
        "蓝色",
        "蓝色",
        "蓝色",
      ],
      btntitlecc: ["x", "x", "x", "x", "x", "x", "x", "x", "x"],
      btnindex: null,
      btnindexs: null,
      textarea: "",
    };
  },
  created() {
    this.imagesValue = imgUrl();
  },
  methods: {
    nummore(val) {
      if (String(val).length >= 4) {
        return val.substring(0, String(val).length - 4) + "万";
      } else {
        return val;
      }
    },
    getTime(date) {
      let card_start_time = date;
      this.corruleForm.cortimes = timestampToTime(card_start_time / 1000);
    },
    handleAvatarSuccesser2(res, file, fileList) {
      console.log(fileList);
      this.imageList2 = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //图片上传前
    beforeAvatarUpload1(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/gif" ||
        file.type === "image/jpg" ||
        file.type === "image/x-pn" ||
        file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message({
          offset: 80,
          type: "error",
          message: "上传头像图片只能是 图片 格式!",
        });
      }
      if (!isLt2M) {
        this.$message({
          offset: 80,
          type: "error",
          message: "上传封面图片大小不能超过 2MB!",
        });
      }
      return isJPG && isLt2M;
    },
    fileRemove2(file, fileList) {
      this.imageList2 = fileList;
    },
    handleResponse(response, file) {
      this.videosrc = response.url;
      this.videosrc1 = response.url;
      return URL.createObjectURL(file.raw);
    },
    handleUploadError(error) {
      console.log("error", error);
    },
    delete1() {
      this.videosrc = "";
      this.videosrc1 = "";
    },
    switchbtn(index) {
      this.btnindex = index;
    },
    switchbtns(index) {
      this.btnindexs = index;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./crowd-funding.less");
</style>