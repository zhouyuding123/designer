<template>
  <div>
    <el-form
      :model="listValue"
      :rules="myvaluerules"
      ref="myvalueruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="line1Div">
        <div class="line1Value">
          <div class="textEdit"><span>圈子头像</span></div>
          <div class="imageDiv">
            <el-form-item prop="headimg">
              <el-upload
                action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :data="{ fileType: this.fileType }"
              >
                <img :src="imageValue + listValue.headimg" class="avatar" />
              </el-upload>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="line2Div">
        <div class="line2Value">
          <div class="linedetails1">
            <div class="mc"><span>圈子名称</span></div>
            <div class="lineBorder">
              <el-form-item prop="title">
                <el-input
                  v-model="listValue.title"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="linedetails3">
            <div class="mc"><span>圈子标签</span></div>
            <div class="lineBorder">
              <el-form-item prop="label">
                <el-input
                  v-model="listValue.label"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <div class="line3Div">
      <div class="line3Value">
        <div class="CircleMembers"><span>圈子成员</span></div>
        <div class="goMember" @click="zxc">
          <span>共{{ memberNum }}个成员</span
          ><i class="el-icon-caret-right"></i>
        </div>
      </div>
    </div>
    <div class="line4Div">
      <div class="qx" @click="Circledel"><span>解散圈子</span></div>
      <div class="kint" @click="editCir">保存</div>
    </div>
  </div>
</template>

<script>
import {
  CircleGetCircleShowApi,
  editCircleApi,
  CircledelApi,
} from "@/urls/wsUrl.js";
import { imgUrl } from "@/assets/js/modifyStyle";
import { postD } from "@/api";
export default {
  data() {
    return {
      paramsId: {
        id: "",
      },
      imageValue: "",
      listValue: {
        headimg: "",
        title: "",
        label: "",
        id: "",
      },
      fileType: "images",
      // 成员
      memberNum: "",
      myvalue: {},
      myvaluerules: {
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
      },
    };
  },
  created() {
    this.paramsId.id = this.$route.params;
    this.imageValue = imgUrl();
    this.listCircleValue();
  },
  methods: {
    listCircleValue() {
      postD(CircleGetCircleShowApi(), this.paramsId).then((res) => {
        this.listValue.headimg = res.data.circle.headimg;
        this.listValue.title = res.data.circle.title;
        this.listValue.label = res.data.circle.label;
        this.listValue.id = res.data.circle.id;
        this.memberNum = res.data.member_count;
      });
    },
    handleAvatarSuccess(res, file) {
      this.listValue.headimg = res.url;
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
    zxc() {
      this.$router.push("/getMember" + this.$route.params.id);
    },
    editCir() {
      this.$refs.myvalueruleForm.validate((v) => {
        if (!v) return;
        postD(editCircleApi(), this.listValue).then((res) => {
          if (res.code == "200") {
            this.$message({
              offset: 80,
              type: "success",
              message: "保存成功",
            });
            this.listCircleValue();
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
    Circledel() {
        var jsid={
            circle_id: this.$route.params.id
        }
      postD(CircledelApi(), jsid).then((res) => {
        if (res.code == "200") {
          this.$message({
            offset: 80,
            type: "success",
            message: "解散成功",
          });
          this.$router.push("/Circle")
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.line1Div {
  padding: 20px 180px;
  .line1Value {
    background-color: white;
    height: 140px;
    display: flex;
    .textEdit {
      margin: 46px 60px;
      span {
        font-size: 20px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 0px;
      }
    }
    .imageDiv {
      margin-left: auto;
      position: relative;
      padding: 30px 30px 0 0;
      .el-image {
        cursor: pointer;
        width: 100px;
        height: 100px;
        background: #ffffff;
        border-radius: 6px 6px 6px 6px;
        margin-right: 100px;
      }
      i {
        cursor: pointer;
        position: absolute;
        margin-top: 45px;
        right: 0;
        margin-right: 40px;
      }
    }
  }
}
.line2Div {
  padding-left: 180px;
  padding-right: 180px;
  .line2Value {
    background-color: white;
    height: 200px;
    text-align: left;
    .linedetails1 {
      padding: 30px 60px 20px 60px;
      display: flex;
      .mc {
        width: 85px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 35px;
          margin-right: 20px;
        }
      }
      .lineBorder {
        cursor: pointer;
        width: 100%;
        height: 40px;
        border-radius: 6px 6px 6px 6px;
        span {
          cursor: pointer;
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 40px;
          margin-left: 20px;
        }
      }
    }
    .linedetails2 {
      cursor: pointer;
      padding: 0px 60px;
      display: flex;
      .mc {
        width: 85px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 35px;
          margin-right: 20px;
        }
      }
      .lineBorder {
        width: 100%;
        height: 40px;
        border-radius: 6px 6px 6px 6px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 40px;
          margin-left: 20px;
        }
      }
    }
    .linedetails3 {
      padding: 20px 60px;
      display: flex;
      .mc {
        width: 85px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 35px;
          margin-right: 20px;
        }
      }
      .lineBorder {
        width: 100%;
        height: 40px;
        background: #f5f5f5;
        border-radius: 6px 6px 6px 6px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 40px;
          margin-left: 20px;
        }
      }
    }
    .linedetails4 {
      padding: 0px 60px;
      display: flex;
      .mc {
        width: 85px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 35px;
          margin-right: 20px;
        }
      }
      .lineBorder {
        width: 100%;
        height: 40px;
        border-radius: 6px 6px 6px 6px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 40px;
          margin-left: 20px;
        }
      }
    }
    .linedetails5 {
      padding: 20px 60px;
      display: flex;
      .mc {
        width: 85px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 35px;
          margin-right: 20px;
        }
      }
      .lineBorder {
        width: 100%;
        height: 40px;
        border-radius: 6px 6px 6px 6px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 40px;
          margin-left: 20px;
        }
      }
    }
  }
}
.line3Div {
  padding-left: 180px;
  padding-top: 20px;
  padding-right: 180px;
  .line3Value {
    padding: 30px 40px;
    background-color: white;
    display: flex;
    .CircleMembers {
      span {
        font-size: 24px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 0px;
      }
    }
    .goMember {
      cursor: pointer;
      margin-left: auto;
      span {
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 0px;
      }
    }
  }
}
.line4Div {
  margin-top: 20px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  .bc {
    cursor: pointer;
    width: 120px;
    height: 40px;
    background: linear-gradient(180deg, #0c032e 0%, #5c5673 100%);
    border-radius: 3px 3px 3px 3px;
    span {
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 40px;
    }
  }
  .qx {
    cursor: pointer;
    margin-left: 20px;
    width: 120px;
    height: 40px;
    background: #ffffff;
    border-radius: 3px 3px 3px 3px;
    border: 1px solid #0c032e;
    margin-right: 40px;
    span {
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 40px;
    }
  }
  .kint {
    width: 120px;
    height: 40px;
    background: #1677ff;
    border-radius: 4px 4px 4px 4px;
    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
    line-height: 40px;
    cursor: pointer;
  }
}
/deep/.el-upload {
  width: 100%;
}
/deep/.avatar-uploader {
  width: 100%;
}
.avatar {
  width: 100px;
  height: 100px;
  background: #ffffff;
  border-radius: 6px 6px 6px 6px;
  margin-right: 30px;
}
/deep/.el-input__inner {
  width: 100%;
  background-color: #f5f5f5;
}
/deep/.line2Div .line2Value .linedetails1 .lineBorder {
  background: none;
}
/deep/.line2Div .line2Value .linedetails3 .lineBorder {
  background: none;
}
</style>