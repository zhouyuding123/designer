<template>
  <div style="padding: 20px 320px">
    <div class="line1">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="1"></el-tab-pane>
        <el-tab-pane label="账号与安全" name="2"></el-tab-pane>
        <el-tab-pane label="收货地址" name="3"></el-tab-pane>
      </el-tabs>
    </div>
    <div v-if="activeName == 1 && authenticationshow == 1">
      <div class="line2">
        <div class="lineongpadding">
          <el-form
            :model="personalruleForm"
            :rules="personalrules"
            ref="personalruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="头像">
              <el-upload
                action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                :show-file-list="false"
                :data="{ fileType: this.fileType }"
                multiple
                :on-success="handleAvatarSuccesser"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="
                    valueData.headimage == '' || valueData.headimage == null
                  "
                  src="@/assets/imgers/头像2.png"
                  class="avatar"
                />
                <img
                  v-else
                  :src="imagesValue + valueData.headimage"
                  class="avatar"
                />
              </el-upload>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="valueData.nickname"></el-input>
            </el-form-item>
            <el-form-item label="个性签名">
              <el-input v-model="valueData.description"></el-input>
            </el-form-item>
            <el-form-item label="实名认证">
              <div
                style="
                  margin-left: 20px;
                  font-size: 14px;
                  font-weight: 400;
                  color: #0177d5;
                  cursor: pointer;
                "
                v-if="valueData.auth == 0"
                @click="authentication"
              >
                立即认证
              </div>
              <div v-if="valueData.auth == 2" style="display: flex">
                <div
                  style="
                    margin-left: 20px;
                    font-size: 14px;
                    font-weight: 400;
                    color: #0177d5;
                    cursor: pointer;
                  "
                >
                  认证成功
                </div>
                <div class="okren_z" @click="gosee">
                  <span>查看认证信息</span>
                </div>
              </div>
              <div v-if="valueData.auth == 2"></div>
              <div
                style="
                  margin-left: 20px;
                  font-size: 14px;
                  font-weight: 400;
                  color: #0177d5;
                  cursor: pointer;
                "
                v-if="valueData.auth == 3"
                @click="authentication"
              >
                认证失败
              </div>
              <div
                style="
                  margin-left: 20px;
                  font-size: 14px;
                  font-weight: 400;
                  color: #0177d5;
                  cursor: pointer;
                "
                v-if="valueData.auth == 1"
                @click="authentication"
              >
                审核中
              </div>
            </el-form-item>
            <el-form-item label="设计师等级">
              <div
                style="
                  margin-left: 20px;
                  font-size: 14px;
                  font-weight: 400;
                  color: #333333;
                "
              >
                一星设计师
              </div>
            </el-form-item>
            <el-form-item label="擅长风格">
              <el-input v-model="valueData.label"></el-input>
            </el-form-item>
            <el-form-item label="私人订制">
              <el-switch
                style="margin-left: 20px"
                v-model="valueData.is_cust"
                active-color="#13ce66"
                inactive-color="#CCCCCC"
              >
              </el-switch>
            </el-form-item>
            <el-form-item label="推送消息">
              <el-switch
                style="margin-left: 20px"
                v-model="valueData.is_receive"
                active-color="#13ce66"
                inactive-color="#CCCCCC"
              >
              </el-switch>
            </el-form-item>
            <el-form-item label="微信账号">
              <div style="margin-left: 20px">
                <img src="@/assets/imgers/个人微信.png" alt="" />
              </div>
              <div class="ljbd">立即绑定</div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="line3">
        <div @click="preservation">保存</div>
      </div>
    </div>
    <div v-if="activeName == 1 && authenticationshow == 2">
      <div class="line2">
        <div class="lineongpadding">
          <el-form
            :model="authenticationruleForm"
            :rules="authenticationrules"
            ref="authenticationruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="证件类型">
              <div class="sfz">身份证</div>
            </el-form-item>
            <el-form-item label="真实姓名" prop="name">
              <el-input v-model="authenticationruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="证件号码" prop="card_no">
              <el-input
                v-model="authenticationruleForm.card_no"
                @input="inputChange"
              ></el-input>
            </el-form-item>
            <el-form-item label="证件图" required>
              <div style="margin-left: 20px; display: flex">
                <div>
                  <el-form-item prop="card_z">
                    <el-upload
                      class="avatar-uploader"
                      action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                      :show-file-list="false"
                      :data="{ fileType: this.fileType }"
                      multiple
                      :on-success="handleAvatarSuccessercard_z"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img
                        v-if="imageUrlcard_z"
                        :src="imageUrlcard_z"
                        class="avatars"
                      />
                      <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                      <div v-else class="ffzz">
                        <img src="@/assets/imgers/相册.png" alt="" />
                        <div>请上传正面</div>
                      </div>
                    </el-upload>
                  </el-form-item>
                </div>
                <div style="margin-left: 60px">
                  <el-form-item prop="card_f">
                    <el-upload
                      class="avatar-uploader"
                      action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                      :show-file-list="false"
                      :data="{ fileType: this.fileType }"
                      multiple
                      :on-success="handleAvatarSuccessercard_f"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img
                        v-if="imageUrlcard_f"
                        :src="imageUrlcard_f"
                        class="avatars"
                      />
                      <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                      <div v-else class="ffzz">
                        <img src="@/assets/imgers/相册.png" alt="" />
                        <div>请上传反面</div>
                      </div>
                    </el-upload>
                  </el-form-item>
                </div>
              </div>
            </el-form-item>
            <el-form-item
              label="营业执照"
              prop="license"
              v-if="authenticationruleForm.style == 2"
            >
              <el-upload
                style="margin-left: 20px"
                class="avatar-uploader"
                action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                :show-file-list="false"
                :data="{ fileType: this.fileType }"
                multiple
                :on-success="handleAvatarSuccesserlicense"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="imageUrllicense"
                  :src="imageUrllicense"
                  class="avatars"
                />
                <div v-else>
                  <img src="@/assets/imgers/营业执照.png" alt="" />
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="证件有效期" required>
              <div class="cardtime">
                <div>
                  <el-form-item prop="card_start_time">
                    <el-date-picker
                      type="datetime"
                      placeholder="选择开始时间"
                      v-model="card_start_time"
                      style="width: 100%"
                      @change="getTime"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div style="margin-left: 20px">-</div>
                <div>
                  <el-form-item prop="card_end_time">
                    <el-date-picker
                      type="datetime"
                      placeholder="选择结束时间"
                      v-model="card_end_time"
                      style="width: 100%"
                      @change="gitTime"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="手机号码" prop="tel">
              <el-input v-model="authenticationruleForm.tel"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="okadd">
        <div @click="zxc"><span>确认并提交</span></div>
      </div>
    </div>
    <div v-if="activeName == 1 && authenticationshow == 3">
      <authentication />
      <div class="out_previous">
        <div @click="outauth">
          <span>返回</span>
        </div>
      </div>
    </div>
    <div v-if="activeName == 3">
      <addresslist />
    </div>
  </div>
</template>


<script>
import { timestampToTime } from "@/assets/js/time.js";
import { imgUrl } from "@/assets/js/modifyStyle";
import { postD } from "../../api";
import { editInfoApi, setAuthApi } from "@/urls/wsUrl.js";
import Addresslist from "./address/addresslist.vue";
import authentication from "./address/authentication.vue";
export default {
  components: { Addresslist, authentication },
  data() {
    return {
      imagesValue: "",
      activeName: "1",
      personalruleForm: {},
      personalrules: {},
      fileType: "images",
      valueData: {
        headimage: "",
        nickname: "",
        description: "",
        auth: "",
        is_cust: "",
        is_receive: "",
        label: "",
        style: "",
      },
      authenticationshow: "1",
      authenticationruleForm: {
        name: "",
        card_z: "",
        card_f: "",
        card_start_time: "",
        card_end_time: "",
        tel: "",
        sex: "",
        license: "",
      },
      imageUrlcard_z: "",
      imageUrlcard_f: "",
      imageUrllicense: "",
      card_start_time: "",
      card_end_time: "",
      authenticationrules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: "姓名不支持特殊字符",
            trigger: "blur",
          },
        ],
        card_z: [
          { required: true, message: "请上传身份证正面", trigger: "blur" },
        ],
        card_f: [
          { required: true, message: "请上传身份证反面", trigger: "blur" },
        ],
        card_no: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          {
            pattern:
              /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "请输入合法身份证号",
            trigger: "blur",
          },
        ],
        card_start_time: [
          { required: true, message: "请选择身份证开始时间", trigger: "blur" },
        ],
        card_end_time: [
          { required: true, message: "请选择身份证结束时间", trigger: "blur" },
        ],
        tel: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,
            message: "请输入合法手机号/电话号",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.imagesValue = imgUrl();
    var valueser = localStorage.data;
    var valser = JSON.parse(valueser);
    this.valueData.headimage = valser.headimage;
    this.valueData.nickname = valser.nickname;
    this.valueData.description = valser.description;
    this.valueData.auth = valser.auth;
    this.valueData.is_cust = valser.is_cust;
    this.valueData.label = valser.label;
    this.valueData.is_receive = valser.is_receive;
    this.authenticationruleForm.tel = valser.tel;
    this.authenticationruleForm.style = valser.style;
    this.authenticationruleForm.license = valser.license;
    console.log(valser);
  },
  methods: {
    handleAvatarSuccesser(res, file) {
      this.valueData.headimage = res.url;
    },
    handleAvatarSuccessercard_z(res, file) {
      this.authenticationruleForm.card_z = res.url;
      this.imageUrlcard_z = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccessercard_f(res, file) {
      this.authenticationruleForm.card_f = res.url;
      this.imageUrlcard_f = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccesserlicense(res, file) {
      this.authenticationruleForm.license = res.url;
      this.imageUrllicense = URL.createObjectURL(file.raw);
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
        this.$message.error("上传头像图片只能是 图片 格式!");
      }
      if (!isLt2M) {
        this.$message.error("这是一条消息提示");
      }
      return isJPG && isLt2M;
    },
    preservation() {
      this.$refs.personalruleForm.validate((v) => {
        if (!v) return;
        this.personalruleForm = this.valueData;
        postD(editInfoApi(), this.personalruleForm).then((res) => {
          if (res.code == "200") {
            this.$message.success("保存成功");
            this.authenticationshow = 1;
          } else {
            this.$message.error("保存时出现问题");
          }
        });
      });
    },
    authentication() {
      this.authenticationshow = 2;
    },
    getTime(date) {
      this.card_start_time = date;
      this.authenticationruleForm.card_start_time = timestampToTime(
        this.card_start_time / 1000
      );
    },
    gitTime(date) {
      this.card_end_time = date;
      this.authenticationruleForm.card_end_time = timestampToTime(
        this.card_end_time / 1000
      );
    },
    zxc() {
      this.$refs.authenticationruleForm.validate((v) => {
        if (!v) return;
        postD(setAuthApi(), this.authenticationruleForm).then((res) => {
          if (res.code == "200") {
            this.$message.success("上传认证成功请耐心等待审核");
            this.authenticationshow = 1;
          } else {
            this.$message.error("上传时出现错误");
          }
        });
      });
    },
    inputChange() {
      var org_gender = this.authenticationruleForm.card_no.substring(16, 17);
      var sex = org_gender % 2 == 1 ? "1" : "2";
      this.authenticationruleForm.sex = sex;
    },
    gosee() {
      this.authenticationshow = 3;
    },
    outauth() {
      this.authenticationshow = 1;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./personal.less");
</style>