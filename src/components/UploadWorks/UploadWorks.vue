<template>
  <div>
    <div class="">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        hide-required-asterisk
      >
        <div class="wrap" style="min-height: 600px">
          <el-form-item label="作品标题" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <!--  -->
          <div>
            <el-form-item label="上传图片" prop="iamgs">
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
          </div>
          <!--  -->
          <el-form-item label="上传视频">
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

          <el-form-item label="作品说明" class="" prop="description">
            <el-input
              v-model="form.description"
              type="textarea"
              rows="4"
            ></el-input>
          </el-form-item>
        </div>

        <!-- <div class="wrap">
          <div style="text-align: left" class="font20 fontw">图文介绍</div>
          <el-form-item>
            <el-input
              type="textarea"
              v-model="introduction"
              rows="10"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="flex">
              <el-upload
                class="avatar-uploader"
                action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                :data="{ fileType: this.fileType }"
                multiple
                list-type="picture-card"
                :limit="9"
                :on-success="handleAvatarSuccesser1"
                :file-list="imageList"
                :on-preview="handlePictureCardPreview"
                :before-upload="beforeAvatarUpload1"
                :on-remove="fileRemove"
              >
                <i
                  class="el-icon-picture-outline"
                  style="background-color: #f5f5f5"
                ></i>
              </el-upload>
              <div class="margin-right12"></div>
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
        </div> -->

        <div class="wrap">
          <el-form-item label="作品首页图" prop="thumb">
            <el-upload
              class="avatar-uploader"
              action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
              list-type="picture-card"
              :limit="1"
              :file-list="imageList1"
              :on-preview="handlePictureCardPreview"
              :data="{ fileType: this.fileType }"
              :on-success="handleAvatarSuccesser"
              :before-upload="beforeAvatarUpload"
              :on-remove="fileRemove1"
            >
              <!-- <img v-if="form.thumb" style="width:150px;height:150px" :src="imagesValue + form.thumb" > -->

              <i
                class="el-icon-picture-outline"
                style="background-color: #f5f5f5"
              ></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="风格标签" prop="label">
            <el-input
              v-model="form.label"
              placeholder="请用逗号隔开"
            ></el-input>
          </el-form-item>
          <el-form-item label="作品类别" prop="product_type_id">
            <el-select v-model="form.product_type_id" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="众筹版权费" prop="crowd_price">
            <el-input
              v-model="form.crowd_price"
              style="width: 200px"
            ></el-input>
            元
          </el-form-item>
          <el-form-item label="私人定制费" prop="personal_price">
            <el-input
              v-model="form.personal_price"
              style="width: 200px"
            ></el-input>
            元
          </el-form-item>
          <el-form-item label="版权购买费" class="" prop="copyright_price">
            <el-input
              v-model="form.copyright_price"
              style="width: 200px"
            ></el-input>
            元
          </el-form-item>
        </div>

        <div class="wrap">
          <el-form-item label="权限设置" prop="category" class="">
            <el-radio-group v-model="form.category">
              <el-radio label="2">公开，所有人可见</el-radio>
              <el-radio label="1">私密，仅自己可见</el-radio>
              <el-radio label="3">收费，他人需付费可见</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="收费金额" class="">
            <el-input
              type="number"
              v-model="form.money"
              :disabled="form.category != 3"
              style="width: 200px"
            ></el-input>
            元
          </el-form-item>
        </div>
        <div class="wrap">
          <el-form-item label="备案证书" prop="bazs">
            <el-upload
              class="avatar-uploader"
              action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
              :data="{ fileType: this.fileType }"
              multiple
              list-type="picture-card"
              :limit="100"
              :on-success="handleAvatarSuccesser3"
              :file-list="imageList3"
              :on-preview="handlePictureCardPreview"
              :before-upload="beforeAvatarUpload1"
              :on-remove="fileRemove3"
            >
              <i
                class="el-icon-picture-outline"
                style="background-color: #f5f5f5"
              ></i>
            </el-upload>
            若此作品还未备案，可点击
            <a href="http://www.333cn.com/beian/"
              >http://www.333cn.com/beian/</a
            >
            前往备案
          </el-form-item>
        </div>

        <el-button
          type="primary"
          @click="submitForm('form')"
          style="width: 200px"
          v-if="!id"
          >发布</el-button
        >
        <el-button
          type="primary"
          @click="submitForm('form')"
          style="width: 200px"
          v-else
          >修改</el-button
        >
        <el-button style="width: 200px" @click="quxiao">取消</el-button>
      </el-form>
    </div>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <el-dialog :visible.sync="centerDialogVisible" width="30%" center>
      <div class="bgpic">
        <img src="@/assets/imgers/15805@2x.png" class="opennumber" alt="" />
        <div class="text cur" @click="gomember">立即开通</div>
        <div class="cel" @click="centerDialogVisible = false">
          <img src="@/assets/imgers/icon/12191@2x.png" alt="" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
import {
  getListApi,
  addWorksApi,
  getMyWorksshowApi,
  editMyWorksApi,
} from "@/urls/wsUrl";
import EleUploadVideo from "./EleUploadVideo.vue";
export default {
  data() {
    var asd = (rule, value, callback) => {
      let isVal = value.toString(); //先转换成字符串类型
      let regnumDot = /[^\d.]/g;
      if (isVal === "") {
        callback(new Error("请输入金额"));
      } else if (isVal.indexOf(".") === 0) {
        callback(new Error(".不能放首位"));
      } else if (isVal.indexOf(".") < 0 && isVal != "" && isVal == Number) {
        this.form.money = parseFloat(isVal); //如果没有小数点，首位不能为类似于 01、02的金额
        callback(new Error("0不能放首位"));
      } else if (regnumDot.test(isVal)) {
        this.form.money = isVal.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
        callback(new Error("只能输入“数字”和“.”的字符"));
      } else if (isVal.split(".").length - 1 > 1) {
        this.form.money = isVal.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        callback(new Error("只能输入两个小数"));
      } else if (isVal.indexOf(".") > 1) {
        this.form.money = isVal.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
        callback(new Error("只能输入两个小数"));
      }
      return callback();
    };
    var asds = (rule, value, callback) => {
      let isVal = value.toString(); //先转换成字符串类型
      let regnumDot = /[^\d.]/g;
      if (isVal === "") {
        callback(new Error("请输入金额"));
      } else if (isVal.indexOf(".") === 0) {
        callback(new Error(".不能放首位"));
      } else if (isVal.indexOf(".") < 0 && isVal != "" && isVal == Number) {
        this.form.money = parseFloat(isVal); //如果没有小数点，首位不能为类似于 01、02的金额
        callback(new Error("0不能放首位"));
      } else if (regnumDot.test(isVal)) {
        this.form.money = isVal.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
        callback(new Error("只能输入“数字”和“.”的字符"));
      } else if (isVal.split(".").length - 1 > 1) {
        this.form.money = isVal.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        callback(new Error("只能输入两个小数"));
      } else if (isVal.indexOf(".") > 1) {
        this.form.money = isVal.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
        callback(new Error("只能输入两个小数"));
      }
      return callback();
    };
    var asder = (rule, value, callback) => {
      let isVal = value.toString(); //先转换成字符串类型
      let regnumDot = /[^\d.]/g;
      if (isVal === "") {
        callback(new Error("请输入金额"));
      } else if (isVal.indexOf(".") === 0) {
        callback(new Error(".不能放首位"));
      } else if (isVal.indexOf(".") < 0 && isVal != "" && isVal == Number) {
        this.form.money = parseFloat(isVal); //如果没有小数点，首位不能为类似于 01、02的金额
        callback(new Error("0不能放首位"));
      } else if (regnumDot.test(isVal)) {
        this.form.money = isVal.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
        callback(new Error("只能输入“数字”和“.”的字符"));
      } else if (isVal.split(".").length - 1 > 1) {
        this.form.money = isVal.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        callback(new Error("只能输入两个小数"));
      } else if (isVal.indexOf(".") > 1) {
        this.form.money = isVal.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
        callback(new Error("只能输入两个小数"));
      }
      return callback();
    };
    var imagesert = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请上传图片"));
      }
      return callback();
    };
    return {
      imageList: [],
      centerDialogVisible: false,
      id: undefined,
      form: {
        title: "",
        thumb: "", //封面图
        description: "", //设计理念
        label: "", //风格标签
        product_type_id: "", //作品类别id
        content: "", //图文介绍
        category: "", //权限设置
        money: "", //收费金额
        crowd_price: "",
        personal_price: "",
        copyright_price: "",
        imgs: "",
        cert: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入作品标题", trigger: "blur" },
          { min: 4, message: "长度在4个字符以上", trigger: "blur" },
        ],
        label: [{ required: true, message: "请输入风格标签", trigger: "blur" }],
        description: [
          { required: true, message: "请输入作品说明", trigger: "blur" },
        ],
        iamgs: [{ validator: imagesert, trigger: "blur" }],
        product_type_id: [
          { required: true, message: "请选择作品分类", trigger: "change" },
        ],
        crowd_price: [{ validator: asd, trigger: "blur" }],
        personal_price: [{ validator: asds, trigger: "blur" }],
        copyright_price: [{ validator: asder, trigger: "blur" }],
        category: [
          { required: true, message: "请选择权限", trigger: "change" },
        ],
        bazs: [{ validator: imagesert, trigger: "blur" }],
      },
      fileType: "images",
      fileType1: "moves",
      introduction: "", //图文介绍标题
      options: [],

      imageUrl: "",
      imagesValue: "",
      dialogImageUrl: "",
      dialogVisible: false,
      videosrc: "",
      videosrc1: "",
      is_vip: undefined,
      imageList1: [],
      imageList2: [],
      imageList3: [],
    };
  },
  components: {
    EleUploadVideo,
  },
  created() {
    this.imagesValue = imgUrl();
    this.getListApibox();
    let is_vip = JSON.parse(localStorage.getItem("data")).is_vip;
    this.is_vip = is_vip;
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.getmyinfo();
    }
  },
  mounted() {
    console.log(this.videosrc);
  },
  methods: {
    quxiao() {
      this.$router.go("-1");
    },
    //根据id获取作品信息
    getmyinfo() {
      postD(getMyWorksshowApi(), { id: this.$route.query.id }).then((res) => {
        console.log(res.data);
        let info = res.data;
        (this.form.title = info.title || ""),
          (this.form.description = info.description || ""),
          (this.form.label = info.label || ""),
          (this.form.product_type_id = info.product_type_id || ""),
          // this.form.thumb=info.thumb||''
          (this.imageList1 =
            [
              {
                response: {
                  url: info.thumb,
                },
                url: this.imagesValue + info.thumb,
              },
            ] || ""),
          (this.form.crowd_price = info.crowd_price || ""),
          (this.form.personal_price = info.personal_price || ""),
          (this.form.copyright_price = info.copyright_price || ""),
          (this.form.money = info.money || ""),
          (this.form.category = String(info.category) || "");
        let cc = JSON.parse(info.content);
        this.introduction = cc.text;

        if (info.imgs != "" && info.imgs != null) {
          info.imgs.split(",").forEach((item, i) => {
            if (info.imgs.split(",").indexOf(",") > -1) {
              this.imageList2.push({
                response: {
                  url: item,
                },
                url: this.imagesValue + item,
              });
            } else {
              this.imageList2.push({
                response: {
                  url: item,
                },
                url: this.imagesValue + item,
              });
            }
          });
        }

        let szimg = info.cert;
        if (szimg != "" && szimg != null) {
          szimg.split(",").forEach((item, i) => {
            if (szimg.split(",").indexOf(",") > -1) {
              this.imageList3.push({
                response: {
                  url: item,
                },
                url: this.imagesValue + item,
              });
            } else {
              this.imageList3.push({
                response: {
                  url: item,
                },
                url: this.imagesValue + item,
              });
            }
          });
        }

        let image = cc.images;
        if (image != "") {
          if (image.indexOf(",") > -1) {
            image.split(",").forEach((item, i) => {
              if (item.indexOf("images") > -1) {
                this.imageList.push({
                  response: {
                    url: item,
                  },
                  url: this.imagesValue + item,
                });
                console.log(this.imageList);
              }
              if (item.indexOf("moves") > -1) {
                this.videosrc = this.imagesValue + item;
                this.videosrc1 = item;
              }
            });
          } else {
            if (image.indexOf("images") > -1) {
              this.imageList.push({
                response: {
                  url: image,
                },
                url: this.imagesValue + image,
              });
            } else {
              this.videosrc = this.imagesValue + image;
              this.videosrc1 = image;
            }
          }
        }
      });
    },

    //点击确定按钮
    submitForm(form) {
      console.log(this.form);
      this.$refs[form].validate((valid) => {
        console.log(this.videosrc1);
        var tmp = [];
        if (this.videosrc1 != "") {
          tmp.push(this.videosrc1);
        }
        this.imageList.forEach((item, i) => {
          tmp.push(item.response.url);
        });
        var content = {
          text: this.introduction,
          images: tmp.join(","),
        };
        let zsvalue = [];
        this.imageList3.forEach((item, i) => {
          zsvalue.push(item.response.url);
        });

        this.form.content = JSON.stringify(content);
        var imgslist = [];
        this.imageList2.forEach((item, i) => {
          imgslist.push(item.response.url);
        });
        if (valid) {
          if (form.category == 3) {
            var params = {
              id: this.id || "",
              title: this.form.title,
              thumb: this.imageList1[0].response.url,
              description: this.form.description,
              label: this.form.label,
              product_type_id: this.form.product_type_id,
              content: this.form.content,
              category: 3,
              imgs: imgslist.join(","),
              crowd_price: this.form.crowd_price,
              personal_price: this.form.personal_price,
              copyright_price: this.form.copyright_price,
              money: this.form.money,
              cert: zsvalue.join(","),
            };
          } else {
            var params = {
              id: this.id || "",
              title: this.form.title,
              imgs: imgslist.join(","),
              thumb: this.imageList1[0].response.url,
              description: this.form.description,
              label: this.form.label,
              product_type_id: this.form.product_type_id,
              content: this.form.content,
              category: this.form.category,
              crowd_price: this.form.crowd_price,
              personal_price: this.form.personal_price,
              copyright_price: this.form.copyright_price,
              cert: zsvalue.join(","),
            };
          }
          if (this.form.category != 2) {
            // 验证是否为vip
            if (this.is_vip == 0) {
              this.centerDialogVisible = true;
              return false;
            }
          }
          if (this.$route.query.id) {
            postD(editMyWorksApi(), params).then((res) => {
              // this.$router.push('/SpecialArea')
              if (res.code == 200) {
                // console.log(res.data);
                this.$message({ offset: 80, message: res.msg });
                this.$router.push("/Mywork");
              } else {
                this.$message({ offset: 80, message: res.msg });
              }
            });
          } else {
            postD(addWorksApi(), params).then((res) => {
              if (res.code == 200) {
                // console.log(res.data);
                setTimeout(() => {
                  this.$message({ offset: 80, message: res.msg });
                  this.$router.push("/SpecialArea");
                }, 2000);
              } else {
                this.$message({ offset: 80, message: res.msg });
              }
            });
          }
        } else {
          //    if(form.category!=1){
          //   this.centerDialogVisible=true
          // }
          console.log("error submit!!");

          return false;
        }
      });
    },
    //点击立即开通
    gomember() {
      this.$router.push("/OpenMember");
    },
    handleAvatarSuccesser(res, file) {
      console.log(res);
      this.imageList1 = [];
      this.imageList1 = [
        {
          response: {
            url: res.url,
          },
          url: this.imagesValue + res.url,
        },
      ];
    },
    //图片上传前
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
    handleAvatarSuccesser1(res, file, fileList) {
      console.log(fileList);
      this.imageList = fileList;
    },
    handleAvatarSuccesser2(res, file, fileList) {
      console.log(fileList);
      this.imageList2 = fileList;
    },
    handleAvatarSuccesser3(res, file, fileList) {
      this.imageList3 = fileList;
    },
    fileRemove(file, fileList) {
      this.imageList = fileList;
      console.log(this.imageList);
      // const list = []
      // this.imageList.forEach(item => {
      //       list.push({
      //         id:item.id,
      //         imageType:0
      //       })
      //   })
      //   this.form.listUploadId = list
    },
    fileRemove1(file, fileList) {
      this.imageList1 = fileList;
      console.log(this.imageList1);
      // const list = []
      // this.imageList.forEach(item => {
      //       list.push({
      //         id:item.id,
      //         imageType:0
      //       })
      //   })
      //   this.form.listUploadId = list
    },
    fileRemove2(file, fileList) {
      this.imageList2 = fileList;

      console.log(this.imageList1);
      // const list = []
      // this.imageList.forEach(item => {
      //       list.push({
      //         id:item.id,
      //         imageType:0
      //       })
      //   })
      //   this.form.listUploadId = list
    },
    fileRemove3(file, fileList) {
      this.imageList3 = fileList;
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
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleUploadError(error) {
      console.log("error", error);
    },
    handleResponse(response, file) {
      this.videosrc = response.url;
      this.videosrc1 = response.url;
      return URL.createObjectURL(file.raw);
    },
    delete1() {
      this.videosrc = "";
      this.videosrc1 = "";
    },
    //获取分类列表
    getListApibox() {
      postD(getListApi()).then((res) => {
        if (res.code == 200) {
          this.options = res.list;
        } else {
          this.$message({ offset: 80, message: res.msg });
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
// @import url("./Designerzone.less");
.wrap {
  width: 1580px;
  margin: 20px auto;
  background-color: #ffffff;
  padding: 20px 60px 10px 46px;
  /deep/.el-form-item__content {
    text-align: left;
    // background-color: #f5f5f5;
    .el-input__inner {
      background-color: #f5f5f5;
      height: 40px;
    }
    .el-textarea__inner {
      background-color: #f5f5f5;
    }
    .el-upload-dragger {
      width: 148px;
      height: 148px;
      .el-upload__text {
        display: none;
      }
    }
  }
}
.bgpic {
  position: relative;
  .opennumber {
    width: 600px;
    height: 406px;
  }
  .text {
    position: absolute;
    top: 360px;
    left: 200px;
    width: 200px;
    height: 40px;
    background: linear-gradient(270deg, #dfab7c 0%, #ffecd4 100%);
    box-shadow: 0px 4px 0px 1px rgba(193, 133, 68, 0.36);
    border-radius: 20px 20px 20px 20px;
    opacity: 1;
    font-size: 18px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #84460e;
    text-align: center;
    line-height: 40px;
  }
  .cel {
    width: 32px;
    height: 32px;
    position: absolute;
    top: 420px;
    left: 284px;
    img {
      width: 32px;
      height: 32px;
    }
  }
}

/deep/.el-dialog {
  background: none;
  border: none;
  border-radius: 0;
  box-shadow: 0 0 0 0;
}
</style>