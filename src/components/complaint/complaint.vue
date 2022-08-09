<template>
  <div>
    <div class="Complaint_selection">
      <div class="com_text">请选择反馈类别</div>
      <div class="btns flex" style="margin-left: 40px">
        <div
          class="btnstyle"
          v-for="(item, index) in btntitle"
          :key="index"
          :class="{ active: btnindex == index }"
          @click="switchbtn(index, item)"
          style="margin-right: 20px"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="comvalue">
      <div class="com_text">请描述问题</div>
      <div class="com_area">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea"
        >
        </el-input>
      </div>
      <div>
        <div class="com_text">添加图片</div>
        <el-upload
          class="avatar-uploader"
          style="
            display: flex;
            padding: 10px 40px;
            font-size: 16px;
            font-weight: bold;
          "
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
      </div>
    </div>
    <div class="telvalue">
      <div>联系方式</div>
      <div class="telvalue_int">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="addcom">
      <div @click="addCom">确定</div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>


<script>
import { ComplaintApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
export default {
  data() {
    return {
      btntitle: ["投诉反馈", "BUG反馈", "功能建议"],
      btnindex: 0,
      textarea: "",
      imageList2: [],
      dialogImageUrl: "",
      dialogVisible: false,
      fileType: "iamges",
      input: "",
      title: "",
    };
  },
  methods: {
    switchbtn(index, value) {
      this.btnindex = index;

      this.title = value;
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
    addCom() {
      if (this.btnindex == 0) {
        this.title = "投诉反馈";
      }
      let imgs = [];
      this.imageList2.forEach((v) => {
        imgs.push(v.response.url);
      });
      var ts = {
        title: this.title,
        images: imgs.join(","),
        content: this.textarea,
        form: this.input,
      };
      console.log(ts);
      postD(ComplaintApi(), ts).then((res) => {
        if (res.code == 200) {
          this.$message({
            offset: 80,
            type: "error",
            message: "上传成功",
          });
        } else {
          this.$message({
            offset: 80,
            type: "error",
            message: res.msg,
          });
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.btns {
  width: 1580px;
  margin: 0px auto;
  margin-bottom: 20px;
  .btnstyle {
    width: 200px;
    height: 40px;
    background: #eeeeee;
    cursor: pointer;
    line-height: 40px;
    font-size: 14px;
  }
  .active {
    background: linear-gradient(90deg, #52a3fe 0%, #396dfe 100%);
    border: 1px solid #ffff;
    border-radius: 3px 3px 3px 3px;
    border: 1px solid #dddddd;
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    line-height: 40px;
  }
}
.Complaint_selection {
  width: 1280px;
  height: 142px;
  background: #ffffff;
  margin: 20px auto;
}
.com_text {
  display: flex;
  padding: 30px 40px;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}
.comvalue {
  width: 1280px;
  height: 610px;
  background: #ffffff;
  margin: 0 auto;
}
.com_area {
  height: 290px;
  border-bottom: 1px solid #dddddd;
}
/deep/.el-textarea__inner {
  margin: 0 auto;
  width: 1200px;
  height: 260px;
  background: #f5f5f5;
  border-radius: 6px 6px 6px 6px;
}

/deep/.el-dialog {
  height: auto;
}
.telvalue {
  width: 1280px;
  height: 80px;
  margin: 0 auto;
  background: white;
  margin-top: 20px;
  display: flex;
  padding: 30px 40px;
  .telvalue_int {
    margin-left: 20px;
    margin-top: -10px;
    /deep/.el-input__inner {
      width: 540px;
      height: 40px;
      background: #f5f5f5;
      border-radius: 6px 6px 6px 6px;
    }
  }
}
.addcom {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  div {
    width: 200px;
    height: 40px;
    background: turquoise;
    cursor: pointer;
    line-height: 40px;
    border-radius: 20px;
  }
}
</style>