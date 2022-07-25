<template>
    <div>
        
        <div class="">
<el-form ref="form" :model="form" :rules="rules" label-width="100px">
    <div class="wrap">
  <el-form-item label="作品标题" prop="title">
    <el-input v-model="form.title" ></el-input>
  </el-form-item>
    <el-form-item label="作品首页图" prop="thumb">
                 <el-upload
                  class="avatar-uploader"
                action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                :show-file-list="false"
                :data="{ fileType: this.fileType }"
                :on-success="handleAvatarSuccesser"
                :before-upload="beforeAvatarUpload"
              >
              
              <img v-if="form.thumb" style="width:150px" :src="imagesValue + form.thumb" >

            <i v-else class="el-icon-picture-outline avatar-uploader-icon" style="background-color:#f5f5f5"></i>
              </el-upload>
  </el-form-item>
    <el-form-item label="风格标签" prop="label">
    <el-input v-model="form.label" placeholder="请用逗号隔开"></el-input>
  </el-form-item>
    <el-form-item label="作品类别" prop="product_type_id">
          <el-select v-model="form.product_type_id" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.title"
      :value="item.id">
    </el-option>
  </el-select>
    

  </el-form-item>
    <el-form-item label="众筹版权费" prop="crowd_price">
    <el-input type="number" v-model="form.crowd_price" style="width:200px;" ></el-input>
      元
  </el-form-item>
     <el-form-item label="私人定制费" prop="personal_price">
      <el-input  type="number" v-model="form.personal_price" style="width:200px;" ></el-input>
        元
  </el-form-item>
     <el-form-item label="版权购买费" class="" prop="copyright_price">
     <el-input type="number" v-model="form.copyright_price" style="width:200px;" ></el-input>
     元
  </el-form-item>
</div>

<div class="wrap">
<div style="text-align:left" class="font20 fontw " >
    图文介绍
</div>
     <el-form-item>
     <el-input type="textarea" v-model="introduction" rows="10"></el-input>
    
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
            <i  class="el-icon-picture-outline " style="background-color:#f5f5f5"></i>
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
</div>

    <div class="wrap">
        <el-form-item label="设计理念" class="" prop="description">
        <el-input v-model="form.description" type="textarea" rows="4"></el-input>
    </el-form-item>
    </div>

    <div class="wrap">

        <el-form-item label="权限设置" prop="category" class="">
        <el-radio-group v-model="form.category" >
      <el-radio label="2" >公开，所有人可见</el-radio>
      <el-radio label="1">私密，仅自己可见</el-radio>
      <el-radio label="3">收费，他人需付费可见</el-radio>
    </el-radio-group>
    </el-form-item>

        <el-form-item label="收费金额" class="">
        <el-input type="number" v-model="form.money" :disabled="form.category!=3" style="width:200px"></el-input>
        元
    </el-form-item>

    </div>


    <el-button type="primary" @click="submitForm('form')" style="width:200px">发布</el-button>
    <el-button  style="width:200px">取消</el-button>

</el-form>
    </div>

<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
<el-dialog
  title="提示"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  <span>需要注意的是内容是默认不居中的</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

    </div>
</template>

<script>
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
import { getListApi, addWorksApi, showBankApi } from "@/urls/wsUrl";
import EleUploadVideo from "./EleUploadVideo.vue";
export default {
  data() {
    return {
      imageList: [],
      centerDialogVisible: true,
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
      },
      rules: {
        title: [
          { required: true, message: "请输入作品标题", trigger: "blur" },
          { min: 4, message: "长度在4个字符以上", trigger: "blur" },
        ],
        label: [{ required: true, message: "请输入风格标签", trigger: "blur" }],
        thumb: [{ required: true, message: "请添加封面图", trigger: "blur" }],
        description: [
          { required: true, message: "请输入设计理念", trigger: "blur" },
        ],
        product_type_id: [
          { required: true, message: "请选择作品分类", trigger: "change" },
        ],
        crowd_price: [
          { required: true, message: "请输入众筹版权费", trigger: "blur" },
        ],
        personal_price: [
          { required: true, message: "请输入私人定制费", trigger: "blur" },
        ],
        copyright_price: [
          { required: true, message: "请输入版权购买费", trigger: "blur" },
        ],
        category: [
          { required: true, message: "请选择权限", trigger: "change" },
        ],
      },
      fileType: "image",
      fileType1: "moves",
      introduction: "", //图文介绍标题
      options: [],

      imageUrl: "",
      imagesValue: "",
      dialogImageUrl: "",
      dialogVisible: false,
      videosrc: "",
      videosrc1: "",
    };
  },
  components: {
    EleUploadVideo,
  },
  created() {
    this.imagesValue = imgUrl();
    this.getListApibox();
  },
  methods: {
    //点击确定按钮
    submitForm(form) {
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

        this.form.content = JSON.stringify(content);
        if (valid) {
          if (form.category == 3) {
            var params = {
              title: this.form.title,
              thumb: this.form.thumb,
              description: this.form.description,
              label: this.form.label,
              product_type_id: this.form.product_type_id,
              content: this.form.content,
              category: 3,
              crowd_price: this.form.crowd_price,
              personal_price: this.form.personal_price,
              copyright_price: this.form.copyright_price,
              money: this.form.money,
            };
          } else {
            var params = {
              title: this.form.title,
              thumb: this.form.thumb,
              description: this.form.description,
              label: this.form.label,
              product_type_id: this.form.product_type_id,
              content: this.form.content,
              category: this.form.category,
              crowd_price: this.form.crowd_price,
              personal_price: this.form.personal_price,
              copyright_price: this.form.copyright_price,
            };
          }
          postD(addWorksApi(), params).then((res) => {
            if (res.code == 200) {
              // console.log(res.data);
              this.$router.push("/SpecialArea");
            } else {
              this.$message(res.msg);
            }
          });
        } else {
          console.log("error submit!!");

          return false;
        }
      });
    },
    handleAvatarSuccesser(res, file) {
      console.log(res);
      this.form.thumb = res.url;
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
        this.$message.error("上传封面图只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传封面图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccesser1(res, file, fileList) {
      console.log(fileList);
      this.imageList = fileList;
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
        this.$message.error("上传封面图只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传封面图片大小不能超过 2MB!");
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
          this.$message(res.msg);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
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
</style>