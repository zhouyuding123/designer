<template>
  <div>
    <div class="croline1">
      <div class="bodylist">
        <div class="works_img">
          <img :src="imagesValue + workList.thumb" alt="" />
        </div>
        <div class="works_title">
          <div class="works_title_text">{{ workList.title }}</div>
          <div class="works_my">
            <div class="works_myhead">
              <img :src="imagesValue + header" alt="" />
            </div>
            <div class="works_myname">{{ workList.username }}</div>
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
            <el-input v-model="corruleForm.price_unit"></el-input>
          </el-form-item>
          <el-form-item label="零售指导价">
            <el-input v-model="corruleForm.price"></el-input>
          </el-form-item>
          <el-form-item label="众筹时效">
            <el-date-picker
              type="date"
              placeholder="时间"
              v-model="corruleForm.prepar_time"
              style="width: 100%"
              @change="gstTime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="众筹最大数量">
            <el-input v-model="corruleForm.max_count"></el-input>
          </el-form-item>
          <el-form-item label="众筹最小数量">
            <el-input v-model="corruleForm.min_count"></el-input>
          </el-form-item>
          <el-form-item label="交货日期">
            <el-date-picker
              type="date"
              placeholder="交货时间"
              v-model="corruleForm.deliver_time"
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
              v-for="(item, i) in btntitle"
              :key="i"
              :class="{ active: index == i }"
              @click="switchbtn(i)"
              style="margin-right: 20px"
            >
              <p class="delspec" @click="delspeccolor(i)">x</p>
              {{ item.city }}
            </div>
            <div>
              <el-input
                placeholder="请输入"
                v-model="colorinput"
                @blur="losecolor"
                clearable
              >
              </el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="尺寸">
          <div class="btns flex">
            <div
              class="btnstyle"
              v-for="(item, i) in btntitlecc"
              :key="i"
              :class="{ active: indexs == i }"
              @click="switchbtns(i)"
              style="margin-right: 20px"
            >
              <p class="delspec" @click="delspecsize(i)">x</p>
              {{ item.city }}
            </div>
            <div>
              <el-input
                placeholder="请输入"
                v-model="sizeinpuit"
                @blur="losesize"
                clearable
              >
              </el-input>
            </div>
          </div>
        </el-form-item>
      </div>
      <div class="addValues">
        <div @click="addInputHandle">
          <span>新增规格</span>
        </div>
      </div>
      <div style="padding: 40px">
        <div class="list3">
          <div><span>颜色</span></div>
          <div><span>尺寸</span></div>
        </div>
        <div class="list3list" v-for="(item, index) in spec" :key="index">
          <div class="delspecs">
            <p @click="delspec(index)">x</p>
          </div>

          <div>
            <span>{{ item.color }}</span>
          </div>
          <div>
            <span>{{ item.size }}</span>
          </div>
        </div>
      </div>
      <div class="croline5">
        <div class="croline3_tit">材质</div>
        <el-form-item>
          <el-input type="textarea" :rows="1" v-model="corruleForm.material">
          </el-input>
        </el-form-item>
      </div>
      <div class="croline5">
        <div class="croline3_tit">详细描述</div>
        <el-form-item>
          <el-input type="textarea" :rows="1" v-model="corruleForm.content">
          </el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="croline6">
      <div class="cur" @click="addzc">提交众筹</div>
    </div>
  </div>
</template>


<script>
import { imgUrl } from "@/assets/js/modifyStyle";
import { timestampToTime } from "@/assets/js/time.js";
import EleUploadVideo from "@/components/UploadWorks/EleUploadVideo.vue";
import { postD } from "@/api";
import { workShowApi, PreparAddApi } from "@/urls/wsUrl.js";
export default {
  components: {
    EleUploadVideo,
  },
  data() {
    return {
      header:JSON.parse(localStorage.getItem('data')).headimage,
      workList: [],
      corruleForm: {
        work_id: "",
        title: "",
        thumb: "",
        price_unit: "",
        max_count: "",
        min_count: "",
        price: "",
        prepar_time: "",
        deliver_time: "",
        thumb_model: "",
        spec: [],
        material: "",
        content: "",
      },
      corrules: {},
      fileType: "images",
      fileType1: "moves",
      imageList2: [],
      dialogImageUrl: "",
      dialogVisible: false,
      videosrc: "",
      videosrc1: "",
      btntitle: [
        { city: "红色", bOn: false },
        { city: "城色", bOn: false },
        { city: "黄色", bOn: false },
        { city: "绿色", bOn: false },
        { city: "青色", bOn: false },
        { city: "蓝色", bOn: false },
        { city: "紫色", bOn: false },
      ],
      colorinput: "",
      sizeinpuit: "",
      btntitlecc: [
        { city: "s", bOn: false },
        { city: "m", bOn: false },
        { city: "x", bOn: false },
        { city: "l", bOn: false },
        { city: "xl", bOn: false },
        { city: "xll", bOn: false },
        { city: "xlll", bOn: false },
        { city: "xllll", bOn: false },
      ],
      btnindex: null,
      btnindexs: null,
      textarea: "",
      addsp: [],
      addcl: [],
      spec: [],
      index: null,
      indexs: null,
    };
  },
  created() {
    this.imagesValue = imgUrl();
    this.mydet();
  },
  methods: {
    mydet() {
      var id = {
        id: this.$route.params.id,
      };
      postD(workShowApi(), id).then((res) => {
        if(res.code == "-201") {
          this.$router.push("/about")
        }
        this.corruleForm.work_id = res.data.id;
        this.corruleForm.title = res.data.title;
        this.corruleForm.thumb = res.data.thumb;
        this.workList = res.data;
      });
    },
    nummore(val) {
      if (String(val).length >= 4) {
        return val.substring(0, String(val).length - 4) + "万";
      } else {
        return val;
      }
    },
    gstTime(date) {
      let card_start_time = date;
      this.corruleForm.prepar_time = timestampToTime(card_start_time / 1000);
    },
    getTime(date) {
      let card_start_time = date;
      this.corruleForm.deliver_time = timestampToTime(card_start_time / 1000);
    },
    handleAvatarSuccesser2(res, file, fileList) {
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
    switchbtn(i) {
      this.index = i;
      this.addsp.push(this.btntitle[i].city);
    },
    switchbtns(i) {
      this.indexs = i;
      this.addcl.push(this.btntitlecc[i].city);
    },
    losecolor() {
      if (this.colorinput !== "") {
        this.btntitle.push({ city: this.colorinput, bOn: false });
      }
      this.colorinput = "";
    },
    losesize() {
      if (this.sizeinpuit !== "") {
        if (this.btntitlecc.indexOf(this.sizeinpuit) != -1) {
          this.sizeinpuit = null;
        }
        this.btntitlecc.push({ city: this.sizeinpuit, bOn: false });
      }
      this.sizeinpuit = "";
    },
    delspeccolor(index) {
      this.btntitle.splice(index, 1);
    },
    delspecsize(index) {
      this.btntitlecc.splice(index, 1);
    },
    addInputHandle() {
      let sp = this.addsp.slice(-1);
      let cl = this.addcl.slice(-1);
      console.log(sp);
      this.spec.push({
        color: sp[0],
        spec: cl[0],
      });
    },
    delspec(index) {
      this.spec.splice(index, 1);
      this.speccolior.splice(index, 1);
    },
    addzc() {
      let imglist = [];
      this.imageList2.forEach((item, i) => {
        imglist.push(item.response.url);
      });
      this.corruleForm.thumb_model = imglist.join(",");
      this.corruleForm.spec = JSON.stringify(this.spec);
      postD(PreparAddApi(), this.corruleForm).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success("发布众筹成功");
          this.$router.push("/workDetails" + this.corruleForm.work_id);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./crowd-funding.less");
</style>