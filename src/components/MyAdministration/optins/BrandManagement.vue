<template>
  <div class="bandpadding">
    <div class="band_body">
      <div class="band_seatch">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <div class="band_seatchss">
          <img src="" alt="" />
          <span>搜索</span>
        </div>
      </div>
      <div class="add_band" @click="addband">
        <span>添加品牌</span>
      </div>
      <div class="refresh">
        <span>刷新 </span>
      </div>
    </div>
    <div style="margin-top: 20px">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="thumb" label="品牌LOGO" align="center">
          <template v-slot="scoped">
            <div class="thumbstyle">
              <img :src="imagesValue + scoped.row.thumb" alt="" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="名牌名称 " align="center">
        </el-table-column>
        <el-table-column prop="style" label="品牌类型 " align="center">
          <template v-slot="scoped">
            <div v-for="(item, index) in scoped.row.style" :key="index">
              {{ item.title }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="审核状态" align="center">
          <template v-slot="scoped">
            <div>
              {{ fullstatus(scoped.row.status) }}
              <div
                v-if="scoped.row.status == 2"
                style="cursor: pointer; color: #0177d5"
                @click="lookReject(scoped.row.description)"
              >
                查看驳回理由
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scoped">
            <div class="cz">
              <div @click="goDetails(scoped.row.id)">详情</div>
              <div @click="delone(scoped.row.id)">删除</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加品牌" :visible.sync="dialogVisible" width="800px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="品牌名称" prop="title">
          <el-input v-model="ruleForm.title" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="品牌类型" prop="style">
          <el-select v-model="ruleForm.style" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌说明" prop="content">
          <el-input v-model="ruleForm.content" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="上传logo" prop="thumb">
          <el-upload
            class="avatar-uploader"
            action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            :show-file-list="false"
            :data="{ fileType: this.fileType }"
            :on-success="handleAvatarSuccesser"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="ruleForm.thumb"
              style="width: 178px; height: 178px"
              :src="imagesValue + ruleForm.thumb"
            />
            <i
              v-else
              class="el-icon-picture-outline avatar-uploader-icon"
              style="background-color: #f5f5f5"
            ></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="相关资料" prop="qualification">
          <el-upload
            class="avatar-uploader"
            action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            :show-file-list="false"
            :data="{ fileType: this.fileType }"
            :on-success="handleAvatarSuccessers"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="ruleForm.qualification"
              style="width: 178px; height: 178px"
              :src="imagesValue + ruleForm.qualification"
            />
            <i
              v-else
              class="el-icon-picture-outline avatar-uploader-icon"
              style="background-color: #f5f5f5"
            ></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div style="padding-top: 30px">
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addBand">添加品牌</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog title="驳回原因" :visible.sync="loogreject" width="30%">
      <div>{{ description }}</div>
    </el-dialog>
  </div>
</template>

<script>
import { brandGetListApi, getListApi, addApi, delApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      imagesValue: "",
      input: "",
      tableData: [],
      name: {
        username: "",
      },
      dialogVisible: false,
      ruleForm: {
        title: "",
        thumb: "",
        qualification: "",
        content: "",
        style: "",
      },
      rules: {
        title: [{ required: true, message: "请输入品牌名称", trigger: "blur" }],
        style: [{ required: true, message: "请选择品牌类型", trigger: "blur" }],
        content: [
          { required: true, message: "请输入品牌说明", trigger: "blur" },
        ],
        thumb: [{ required: true, message: "请上传品牌logo", trigger: "blur" }],
        qualification: [
          { required: true, message: "请上传品牌资质", trigger: "blur" },
        ],
      },
      options: [],
      fileType: "images",
      loogreject: false,
      description: "",
      delonebandId: {
        id: "",
      },
    };
  },
  created() {
    this.designerGetBrand();
    this.imagesValue = imgUrl();
  },
  methods: {
    designerGetBrand() {
      this.name.username = localStorage.getItem("use");
      postD(brandGetListApi(), this.name).then((res) => {
        console.log(res);
        this.tableData = res.list;
      });
      postD(getListApi()).then((res) => {
        this.options = res.list;
      });
    },
    addband() {
      this.dialogVisible = true;
    },
    handleAvatarSuccesser(res, file) {
      this.ruleForm.thumb = res.url;
    },
    handleAvatarSuccessers(res, file) {
      this.ruleForm.qualification = res.url;
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
    addBand() {
      this.ruleForm.style = this.ruleForm.style.join(",");
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return;
        postD(addApi(), this.ruleForm).then((res) => {
          if (res.code == "200") {
            this.$message({
              offset: 80,
              type: "success",
              message: "品牌添加成功",
            });
            this.dialogVisible = false;
            this.designerGetBrand();
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
    fullstatus(val) {
      if (val == 0) {
        return "待审核";
      }
      if (val == 1) {
        return "审核通过";
      }
      if (val == 2) {
        return "驳回";
      }
    },
    lookReject(val) {
      this.loogreject = true;
      this.description = val;
    },
    async delone(val) {
      const deloneband = await this.$confirm(
        "此操作将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (deloneband !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (deloneband === "confirm") {
        this.delonebandId.id = val;
        postD(delApi(), this.delonebandId).then((res) => {
          if (res.code == "200") {
            this.$message({
              offset: 80,
              type: "success",
              message: "删除成功",
            });
            this.designerGetBrand();
          } else {
            this.$message({
              offset: 80,
              type: "error",
              message: res.msg,
            });
          }
        });
      }
    },
    goDetails(val) {
      this.$router.push("brandDetails" + val);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-dialog {
  height: auto;
}
@import url("./BrandManagement.less");
</style>