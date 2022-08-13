<template>
  <div>
    <div class="midbox">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="1"></el-tab-pane>
        <el-tab-pane label="账号安全" name="2"></el-tab-pane>
        <el-tab-pane label="收货地址" name="3"></el-tab-pane>
      </el-tabs>
    </div>
    <div></div>
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
            <el-form-item>
              <div class="zsdas">头像</div>
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
            <el-form-item label="ID">
              <div style="margin-left: 20px" class="dis">
                <div>
                  {{ myDenper.username }}
                </div>
                <div style="margin-top: 3px; margin-left: 10px">
                  <img src="@/assets/imgers/放大镜.png" alt="" />
                </div>
                <div
                  style="margin-top: 3px; margin-left: 10px"
                  v-if="NobleVip == 1"
                >
                  <img src="@/assets/imgers/vip.png" alt="" />
                </div>
              </div>
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
                v-if="myDenper.auth == 0"
                @click="authentication"
              >
                立即认证
              </div>
              <div v-if="myDenper.auth == 2" style="display: flex">
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
              <div v-if="myDenper.auth == 2"></div>
              <div
                style="
                  margin-left: 20px;
                  font-size: 14px;
                  font-weight: 400;
                  color: #0177d5;
                  cursor: pointer;
                "
                v-if="myDenper.auth == 3"
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
                v-if="myDenper.auth == 1"
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
            <div>
              <div
                class="mapint"
                style="
                  padding-left: 40px;
                  padding-right: 40px;
                  padding-bottom: 40px;
                "
              >
                <div class="map-search_wrapper" id="bmapSearch">
                  <div class="header">
                    <div style="width: 150px">地址：</div>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="textTip"
                      placement="top"
                      :value="isshowTip"
                      manual
                    >
                      <el-input
                        type="text"
                        placeholder="请输入内容"
                        @focus="editText"
                        v-model="keyWord"
                        @keyup.native.13="search"
                        clearable
                        class="search-input"
                      >
                      </el-input>
                    </el-tooltip>
                    <el-button type="primary" size="medium" @click="search"
                      >查询</el-button
                    >
                    <div style="margin-left: 10px; width: 150px">经纬：</div>
                    <el-input
                      type="text"
                      v-model="longAndLat"
                      ref="long"
                      class="search-input"
                    >
                    </el-input>
                  </div>
                  <div id="container" style="overflow: hidden"></div>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="line3">
        <div @click="preservation">保存</div>
      </div>
    </div>
    <div v-if="activeName == 1 && authenticationshow == 2">
      <!-- <div class="btns flex">
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
      </div> -->

      <div class="linetp">
        <div class="jigo">
          <el-radio v-model="btnindex" label="1">个人认证</el-radio>
          <el-radio v-model="btnindex" label="2">组织机构认证</el-radio>
        </div>
        <div class="lineongpadding">
          <el-form
            :model="authenticationruleForm"
            :rules="authenticationrules"
            ref="authenticationruleForms"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="证件类型">
              <div class="sfz">身份证</div>
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
                      <div v-else class="ffzz">
                        <img src="@/assets/imgers/相册.png" alt="" />
                        <div>请上传反面</div>
                      </div>
                    </el-upload>
                  </el-form-item>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="营业执照" prop="license" v-if="btnindex == 2">
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
                      type="date"
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
                      type="date"
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
            <div class="zxcs">
              <el-form-item label="真实姓名" prop="name">
                <el-input v-model="authenticationruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="证件号码" prop="card_no">
                <el-input
                  v-model="authenticationruleForm.card_no"
                  @input="inputChange"
                ></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <div class="okadd">
        <div @click="outauth">
          <span>返回</span>
        </div>
        <div @click="zxc"><span>确认并提交</span></div>
      </div>
    </div>
    <div v-if="activeName == 1 && authenticationshow == 3">
      <authentication />
      <div class="out_previous">
        <div @click="outauth" class="cur">
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
import { imgUrl, asyncJS } from "@/assets/js/modifyStyle";
import { postD } from "../../api";
import {
  editInfoApi,
  setAuthApi,
  designerMyCenterApi,
  myCenterApi,
} from "@/urls/wsUrl.js";
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
        province: "",
        city: "",
        area: "",
        detail: "",
        lng: "",
        lat: "",
      },
      btntitle: ["个人设计师", "企业设计师"],
      btnindex: "1",
      selectedIndex: 0,
      authenticationshow: 1,
      authenticationruleForm: {
        name: "",
        card_z: "",
        card_f: "",
        card_start_time: "",
        card_end_time: "",
        tel: "",
        sex: "",
        license: "",
        card_no: "",
      },
      card_no: "",
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
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: "姓名不支持特殊字符",
            trigger: "blur",
          },
        ],
        card_z: [
          { required: true, message: "请上传身份证正面", trigger: "blur" },
        ],
        license: [
          { required: true, message: "请上传营业执照", trigger: "blur" },
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
      myDenper: [],
      mynames: {
        username: localStorage.getItem("use"),
      },
      NobleVip: "",
      // 地图
      keyWord: "",
      longAndLat: "",
      map: null,
      mapMark: null,
      localSearch: "",
      textTip: "",
      isshowTip: false,
      jwd: JSON.parse(localStorage.getItem("data")),
    };
  },
  mounted() {
    window.onLoadMap = () => {
      this.ready();
    };
    // key 值需要去高德地图去申请才可以
    asyncJS(
      "https://webapi.amap.com/maps?v=1.4.15&key=4809a108fd29d9ff15029338f2e1f49a&callback=onLoadMap"
    );
  },
  created() {
    this.imagesValue = imgUrl();
    this.mypersonalvalue();
    this.mypersonal();
    if (this.jwd.lat == null && this.jwd.lng == null) {
      this.jwd = {
        lng: 121.547355,
        lat: 29.809097,
      };
    }
  },
  methods: {
    mypersonalvalue() {
      postD(myCenterApi(), this.mynames).then((res) => {
        this.mystyle = res.data.style;
      });
    },
    mypersonal() {
      var myname = {
        username: localStorage.use,
      };
      postD(designerMyCenterApi(), myname).then((res) => {
        this.myDenper = res.data;
        this.valueData.headimage = this.myDenper.headimage;
        this.valueData.nickname = this.myDenper.nickname;
        this.valueData.description = this.myDenper.description;
        this.valueData.auth = this.myDenper.auth;
        this.valueData.is_cust = this.myDenper.is_cust;
        this.valueData.label = this.myDenper.label;
        this.valueData.is_receive = this.myDenper.is_receive;
        this.valueData.lat = this.myDenper.lat||"";
        this.valueData.lng = this.myDenper.lng||"";
        this.valueData.province = this.myDenper.province;
        this.valueData.area = this.myDenper.area;
        this.valueData.detail = this.myDenper.detail;
        this.valueData.city = this.myDenper.city;
        this.authenticationruleForm.tel = this.myDenper.tel;
        this.authenticationruleForm.style = this.myDenper.style;
        this.authenticationruleForm.license = this.myDenper.license;
        this.NobleVip = this.myDenper.is_vip;
        this.keyWord =
          this.valueData.province +
            this.valueData.city +
            this.valueData.area +
            this.valueData.detail || "";
        this.longAndLat = this.valueData.lng + "," + this.valueData.lat;
      });
    },
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
    preservation() {
      var mydata = JSON.parse(localStorage.getItem("data"))
      mydata.lat=this.valueData.lat
      mydata.lng=this.valueData.lng
      mydata.province=this.valueData.province
      mydata.city=this.valueData.city
      mydata.area=this.valueData.area
      mydata.detail=this.valueData.detail
      localStorage.setItem("data", JSON.stringify(mydata));
      this.$refs.personalruleForm.validate((v) => {
        if (!v) return;
        this.personalruleForm = this.valueData;
        postD(editInfoApi(), this.personalruleForm).then((res) => {
          if (res.code == "200") {
            this.$message({
              offset: 80,
              type: "success",
              message: "保存成功",
            });
            this.mypersonal();
            this.authenticationshow = 1;
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
      this.$refs.authenticationruleForms.validate((v) => {
        if (!v) return;
        if (this.btnindex == 0) {
          this.authenticationruleForm.style = 1;
          postD(setAuthApi(), this.authenticationruleForm).then((res) => {
            if (res.code == "200") {
              this.$message.success("上传认证成功请耐心等待审核");
              this.mypersonal();
              this.authenticationshow = 1;
            } else {
              this.$message.error("上传时出现错误");
            }
          });
        } else if (this.btnindex == 1) {
          this.authenticationruleForm.style = 2;
          postD(setAuthApi(), this.authenticationruleForm).then((res) => {
            if (res.code == "200") {
              this.$message.success("上传认证成功请耐心等待审核");
              this.mypersonal();
              this.authenticationshow = 1;
            } else {
              this.$message.error("上传时出现错误");
            }
          });
        }
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
    closeBmap() {
      this.$emit("closeBmap");
    },
    comfirmBmap() {
      this.$emit("comfirmBmap", this.longAndLat);
    },
    ready() {
      // console.log(this.textTip);
      var zxcthis = this;
      zxcthis.map = new window.AMap.Map("container", {
        resizeEnable: true,
        zoom: 50, //级别
        center: [zxcthis.jwd.lng, zxcthis.jwd.lat], //中心点坐标
        viewMode: "3D", //使用3D视图
      });
			
      zxcthis.search();
      let _this = zxcthis;
      // 为地图注册click事件获取鼠标点击出的经纬度坐标
      zxcthis.map.on("click", function (e) {
        let lng = e.lnglat.getLng();
        let lat = e.lnglat.getLat();
        _this.longAndLat = lng + "," + lat;
        // 打新的标记
        _this.addMarker(lng, lat);
      });
    },
    search() {
      let _this = this;
      window.AMap.plugin("AMap.PlaceSearch", function () {
        var autoOptions = {
          city: "全国",
          map: _this.map, // 展现结果的地图实例
          pageSize: 1, // 单页显示结果条数
          pageIndex: 1, // 页码
          autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        };
        var placeSearch = new window.AMap.PlaceSearch(autoOptions);
        placeSearch.search(_this.keyWord, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          if (status == "complete") {
            if (result.poiList.pois.length > 0) {
              let lng = result.poiList.pois[0].location.lng;
              let lat = result.poiList.pois[0].location.lat;
              _this.longAndLat = lng + "," + lat;
              _this.addMarker(lng, lat);
            } else {
              _this.$message({
                message: "没有查询到对应的地址",
                type: "warning",
              });
            }
          } else if (status == "no_data") {
            _this.$message({
              message: "没有查询到对应的地址",
              type: "warning",
            });
          }
        });
      });
    },
    // 清除 marker
    clearMarker() {
      if (this.mapMark) {
        this.mapMark.setMap(null);
        this.mapMark = null;
      }
    },
    // 实例化点标记
    addMarker(lng, lat) {
      let _this = this;
      this.mapMark = new window.AMap.Marker({
        position: [lng, lat],
        map: _this.map,
      });
      this.mapMark.setMap(this.map);
      let lnglatXY = [lng, lat];
      AMap.plugin("AMap.Geocoder", function () {
        var that = _this;

        var geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all",
        });

        geocoder.getAddress(lnglatXY, (status, result) => {
          var asd = result.regeocode.formattedAddress;
          that.keyWord = asd;
          that.valueData.province = result.regeocode.addressComponent.province;
          that.valueData.city = result.regeocode.addressComponent.city;
          that.valueData.area = result.regeocode.addressComponent.district;
          that.valueData.detail =
            result.regeocode.addressComponent.township +
            result.regeocode.aois[0].name;
          that.valueData.lng = lnglatXY[0];
          that.valueData.lat = lnglatXY[1];
        });
        // 清除所有标记

        that.map.clearMap();

        var marker = new AMap.Marker();

        that.map.add(marker);

        marker.setPosition(lnglatXY);
      });
    },
    editText() {
      this.isshowTip = false;
    },
  },
};
</script>
<style lang="less" scoped>
@import url("./personal.less");
</style>