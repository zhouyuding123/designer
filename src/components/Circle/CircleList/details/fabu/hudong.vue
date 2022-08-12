<template>
  <div>
    <el-dialog title="发布活动" :visible.sync="dialogVisible" width="1280px">
      <div>
        <div class="hd_rad">
          <el-radio v-model="radio" label="1">普通活动</el-radio>
          <el-radio v-model="radio" label="2">评选活动</el-radio>
          <el-radio v-model="radio" label="3">抽奖活动</el-radio>
        </div>
        <el-form
          :model="hdruleForm"
          :rules="hdrules"
          ref="hdruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="btlong">
            <el-form-item label="活动标题" prop="title">
              <el-input v-model="hdruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="活动时间" required>
              <el-col :span="11">
                <el-form-item prop="start_time">
                  <el-date-picker
                    type="datetime"
                    placeholder="选择报名时间"
                    v-model="start_time"
                    style="width: 100%"
                    @change="getTime"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="end_time">
                  <el-date-picker
                    type="datetime"
                    placeholder="选择结束时间"
                    v-model="end_time"
                    style="width: 100%"
                    @change="gitTime"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
              <el-form-item label="投票时间" required v-if="radio ==2">
              <el-col :span="11">
                <el-form-item prop="start_time">
                  <el-date-picker
                    type="datetime"
                    placeholder="选择投票时间"
                    v-model="votostart_time"
                    style="width: 100%"
                    @change="votogetTime"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="end_time">
                  <el-date-picker
                    type="datetime"
                    placeholder="选择投票时间"
                    v-model="votoend_time"
                    style="width: 100%"
                    @change="votogitTime"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="发布对象" prop="style">
              <el-select v-model="hdruleForm.style" placeholder="请选择">
                <el-option
                  v-for="item in styleOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <div class="xzqz">
              <el-form-item label="选择圈子">
                <el-select
                  v-model="hdruleForm.circle_id"
                  placeholder="请选择"
                  multiple
                >
                  <el-option
                    v-for="item in listCircleOptions"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="btlong">
            <el-form-item label="活动内容" prop="content">
              <el-input type="textarea" v-model="hdruleForm.content"></el-input>
            </el-form-item>
            <el-form-item label="活动规则" prop="rule">
              <el-input type="textarea" v-model="hdruleForm.rule"></el-input>
            </el-form-item>
          </div>
          <div class="btlong">
            <el-form-item label="活动奖品:" style="width: 100%">
              <div v-for="(item, index) in hdruleForm.prize" :key="index">
                <div class="prizesS">
                  <el-input
                    v-model="item.name"
                    style="width: 350px"
                    placeholder="名次"
                  ></el-input>

                  <el-input
                    v-model="item.amount"
                    style="width: 350px"
                    placeholder="数量"
                  ></el-input>

                  <el-input
                    v-model="item.item"
                    style="width: 350px"
                    placeholder="奖励"
                  ></el-input>
                  <div
                    class="cur"
                    style="margin-top: 5px"
                    @click="delInputHandle(index)"
                  >
                    <img src="@/assets/imgers/hd删除.png" alt="" />
                  </div>
                </div>
              </div>
              <div
                class="dis"
                style="margin-left: 30px; color: #fe9110"
                @click="addInputHandle"
              >
                <img
                  src="@/assets/imgers/hd添加.png"
                  style="width: 16px; height: 16px"
                  alt=""
                />
                <div style="margin-top: -10px">
                  <span>添加</span>
                </div>
              </div>
            </el-form-item>
          </div>
          <div class="btlong">
            <div>
              <el-form-item label="活动封面" prop="thumb">
                <el-upload
                  class="avatar-uploader"
                  action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :data="{ fileType: this.fileType }"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="活动海报" prop="poster">
                <el-upload
                  class="avatar-uploader"
                  action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccessline2"
                  :before-upload="beforeAvatarUploadline2"
                  :data="{ fileType: this.fileType }"
                >
                  <img v-if="imageUrls" :src="imageUrls" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class="dis scont">
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addhd">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listCircleApi, releaseApi } from "@/urls/wsUrl.js";
import { timestampToTime } from "@/assets/js/time.js";
import { postD } from "@/api";
export default {
  props: ["hudongShow"],
  data() {
    return {
      radio: "1",
      dialogVisible: false,
      hdruleForm: {
        title: "",
        start_time: "",
        end_time: "",
        style: "",
        circle_id: "",
        content: "",
        rule: "",
        prize: [
          {
            name: "",
            amount: "",
            item: "",
          },
        ],
        thumb: "",
        poster: "",
        category: "",
        voto_start_time: "",
        voto_end_time: "",
      },
      start_time: "",
      end_time: "",
      votostart_time: "",
      votoend_time: "",
      hdrules: {},
      styleOptions: [
        {
          value: "1",
          label: "同城可见",
        },
        {
          value: "2",
          label: "全国可见",
        },
      ],

      listCircleOptions: [],
      fileType: "images",
      imageUrl: "",
      imageUrls: "",
    };
  },
  watch: {
    hudongShow: {
      handler: function (val) {
        if (val === 2) {
          this.dialogVisible = true;
        } else {
          this.dialogVisible = false;
        }
      },
    },
  },
  created() {
    this.CircleListId();
  },
  methods: {
    CircleListId() {
      postD(listCircleApi()).then((res) => {
        this.listCircleOptions = res.list;
      });
    },
    getTime(date) {
      this.start_time = date;
      this.hdruleForm.start_time = timestampToTime(this.start_time / 1000);
    },
    gitTime(date) {
      this.end_time = date;
      this.hdruleForm.end_time = timestampToTime(this.end_time / 1000);
    },
    votogetTime(date) {
      this.votostart_time = date;
      this.hdruleForm.voto_start_time = timestampToTime(this.votostart_time / 1000);
    },
    votogitTime(date) {
      this.votoend_time = date;
      this.hdruleForm.voto_end_time = timestampToTime(this.votoend_time / 1000);
    },
    // 奖励
    addInputHandle() {
      let b = [];
      for (var a in this.hdruleForm.prize) {
        b.push(this.hdruleForm.prize[a]);
      }

      if (
        this.hdruleForm.prize[a].name !== "" &&
        a < 4 &&
        this.hdruleForm.prize[a].amount !== "" &&
        a < 4 &&
        this.hdruleForm.prize[a].item !== "" &&
        a < 4
      ) {
        this.hdruleForm.prize.push({ name: "", amount: "", item: "" });
      }
    },
    delInputHandle(index) {
      this.hdruleForm.prize.splice(index, 1);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.hdruleForm.thumb = res.url;
    },
    handleAvatarSuccessline2(res, file) {
      this.imageUrls = URL.createObjectURL(file.raw);
      this.hdruleForm.poster = res.url;
    },
    beforeAvatarUpload(file) {
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
    beforeAvatarUploadline2(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/gif" ||
        file.type === "image/jpg" ||
        file.type === "image/x-pn" ||
        file.type === "image/png";
      const isLt2M = file.size / 1280 / 1024 < 2;
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
    addhd() {
      if (this.radio == 1) {
        this.hdruleForm.category = 1;
      }
      postD(releaseApi(), this.hdruleForm).then((res) => {
         if (res.code == 200) {
          this.$message(res.msg);
          this.dialogVisible=false
        } else {
          this.$message(res.msg);
        }
      });
    },
  },
  // created() {
  //     console.log(this.hudongShow);
  // }
};
</script>

<style lang="less" scoped>
@import url("./huodong.less");
</style>