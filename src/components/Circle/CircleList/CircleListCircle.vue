<template>
  <div>
    <div class="btns flex">
      <div
        class="btnstyle"
        v-for="(item, index) in btntitle"
        :class="{ active: btnindex == index }"
        @click="switchbtn(index)"
        style="margin-right: 20px"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
    <div
      v-if="btnindex == 0"
      class="disp"
      style="width: 1580px; margin: 0 auto"
    >
      <div
        v-for="item in circleList"
        :key="item.id"
        class="list_body dis"
        @click="gocrDet(item.id)"
      >
        <div class="cr_headimg">
          <img :src="imagesValue + item.headimg" alt="" />
        </div>
        <div class="cr_title">{{ item.title }}</div>
        <div class="cr_more">
          <img src="@/assets/imgers/圈子更多.png" alt="" />
        </div>
      </div>
    </div>
    <el-dialog title="创建圈子" :visible.sync="dialogVisible" width="800px">
      <el-form :model="Circle" :rules="Circlerules" ref="CircleruleForm">
        <el-form-item label="圈子名称" prop="title">
          <el-input v-model="Circle.title"></el-input>
        </el-form-item>
        <el-form-item
          label="圈子标签"
          placeholder="标签 数组字符串，每个标签用英文逗号隔开"
          prop="label"
        >
          <el-input v-model="Circle.label"></el-input>
        </el-form-item>
        <el-form-item label="圈子简介" prop="description">
          <el-input v-model="Circle.description"></el-input>
        </el-form-item>
        <el-form-item label="圈子头像" prop="headimg" required>
          <el-upload
            class="avatar-uploader"
            action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :data="{ fileType: this.fileType }"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-picture-outline avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="圈子背景" prop="thumb" required>
          <el-upload
            class="avatar-uploader"
            action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccesse"
            :before-upload="beforeAvatarUpload"
            :data="{ fileType: this.fileType }"
          >
            <img v-if="imageUrls" :src="imageUrls" class="avatar" />
            <i v-else class="el-icon-picture-outline avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addCircle">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createCircleApi, listCircleApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      imagesValue: "",
      fileType: "images",
      btntitle: ["我创建的圈子", "我加入的圈子", "创建圈子"],
      btnindex: 0,
      dialogVisible: false,
      Circle: {
        title: "",
        label: "",
        headimg: "",
        thumb: "",
        description: "",
      },
      Circlerules: {
        description: [
          { required: true, message: "请输入圈子简介", trigger: "blur" },
          { min: 5, message: "长度在 5 个以上", trigger: "blur" },
        ],
        title: [
          { required: true, message: "请输入圈子名称", trigger: "blur" },
          { min: 5, message: "长度在 5 个以上", trigger: "blur" },
        ],
        label: [{ required: true, message: "请输入圈子标签", trigger: "blur" }],
        headimg: [
          { required: true, message: "请输入圈子头像", trigger: "blur" },
        ],
        thumb: [{ required: true, message: "请输入圈子背景", trigger: "blur" }],
      },
      imageUrl: "",
      imageUrls: "",
      circleList: [],
    };
  },
  created() {
    this.myList();
    this.imagesValue = imgUrl();
  },
  methods: {
    myList() {
      postD(listCircleApi()).then((res) => {
        console.log(res);
        this.circleList = res.list;
      });
    },
    switchbtn(index) {
      this.btnindex = index;
      if (this.btnindex == 2) {
        this.dialogVisible = true;
      }
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
      this.Circle.headimg = res.url;
    },
    handleAvatarSuccesse(res, file) {
      this.imageUrls = URL.createObjectURL(file.raw);
      this.Circle.thumb = res.url;
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
          message: "这是一条消息提示",
        });
      }
      return isJPG && isLt2M;
    },
    addCircle() {
      this.$refs.CircleruleForm.validate((v) => {
        if (!v) return;
        console.log(this.Circle);
        postD(createCircleApi(), this.Circle).then((res) => {
          if (res.code == "200") {
            this.$message({
              offset: 80,
              type: "success",
              message: "创建圈子成功",
            });
            this.dialogVisible = false;
            this.Circle = "";
            this.imageUrl = "";
            this.imageUrls = "";
            this.myList();
          } else {
            this.$message({
              offset: 80,
              type: "error",
              message: res.msg,
            });
          }
        });
      });
    },
    gocrDet(val) {
      console.log(val);
      this.$router.push("/crDetails" + val);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./CircleListCircle.less");
</style>