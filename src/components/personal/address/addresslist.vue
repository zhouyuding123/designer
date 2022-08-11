<template>
  <div>
    <div class="addline1">
      <el-form
        :model="addruleForm"
        :rules="addrules"
        ref="addruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="收货人" prop="name">
          <el-input v-model="addruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="tel">
          <el-input v-model="addruleForm.tel"></el-input>
        </el-form-item>

        <div
          style="padding-left: 40px; padding-right: 40px; padding-bottom: 40px"
        >
          <div class="map-search_wrapper" id="bmapSearch">
            <div class="header">
              <div style="width: 100px">地址：</div>
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
              <div style="margin-left: 10px; width: 100px">经纬：</div>
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
        <el-form-item label="标签">
          <div class="bq">
            <div class="bqhome" @click="whole" ref="wholes">
              <span>家</span>
            </div>
            <div class="bqhome" ref="PutOn" @click="onTheShelf">
              <span>公司</span>
            </div>
            <div class="bqhome" ref="Offtheshelf" @click="underShelfx">
              <span>学校</span>
            </div>
          </div>
        </el-form-item>
        <div @click="zxc" class="bc" v-if="addruleForm.id == ''">保存</div>
        <div @click="modify" class="bc" v-if="addruleForm.id != ''">修改</div>
      </el-form>
    </div>
    <div>
      <div class="detailed_list">
        <div class="detailed_list_list">
          <div>收货人</div>
          <div>手机号</div>
          <div>所在地区</div>
          <div>详细地址</div>
          <div>标签</div>
          <div>操作</div>
        </div>
        <div class="list_mun" v-for="item in listAddressList" :key="item.id">
          <div>{{ item.name }}</div>
          <div>{{ item.tel }}</div>
          <div>{{ item.province }}{{ item.city }}{{ item.area }}</div>
          <div>
            {{ item.detail }}
          </div>
          <div>
            {{ item.label }}
          </div>
          <div class="options">
            <div @click="editvalue(item)"><span>修改</span></div>
            <div @click="delvalue(item.id)"><span>删除</span></div>
            <div @click="setdefault(item.id)" v-if="item.is_top == 0">
              <span>设为默认</span>
            </div>
            <div
              @click="setnotdefault(item.id)"
              v-if="item.is_top == 1"
              class="notset"
            >
              <span>默认地址</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="delvalueshow" width="30%">
      <span>您确定要删除该地址吗?</span>
      <div style="padding-top: 70px">
        <span slot="footer" class="dialog-footer">
          <el-button @click="delvalueshow = false">取 消</el-button>
          <el-button type="primary" @click="adddelvalue">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { asyncJS } from "@/assets/js/modifyStyle.js";
import {
  addAddressApi,
  listAddressApi,
  updateAddressApi,
  delAddressApi,
} from "@/urls/wsUrl.js";
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
import { postD } from "../../../api";
export default {
  data() {
    return {
      addruleForm: {
        id:"",
        name: "",
        tel: "",
        province: "",
        city: "",
        area: "",
        label: "",
        detail: "",
        lng: "",
        lat: "",
      },
      addrules: {
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
        tel: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,
            message: "请输入合法手机号/电话号",
            trigger: "blur",
          },
        ],
      },
      options: regionData,
      selectedOptions: [],
      selectedOptionss: "",
      address: "",
      listAddressList: [],
      province: "",
      delvalueshow: false,
      delvalueid: {
        id: "",
      },
      is_topid: {
        id: "",
        is_top: "1",
      },
      notis_topid: {
        id: "",
        is_top: "0",
      },
      keyWord: "",
      longAndLat: "",
      map: null,
      mapMark: null,
      localSearch: "",
      textTip: "",
      isshowTip: false,
    };
  },

  created() {
    this.listAddress();
  },
  mounted() {
    window.onLoadMap = () => {
      var thiser = this
      thiser.ready();
    };
    // key 值需要去高德地图去申请才可以
    asyncJS(
      "https://webapi.amap.com/maps?v=1.4.15&key=4809a108fd29d9ff15029338f2e1f49a&callback=onLoadMap"
    );
  },
  methods: {
    //省市区三级联动事件
    handleChange(value) {
      if (value[1] != null && value[2] != null) {
        var dz =
          CodeToText[value[0]] +
          "/" +
          CodeToText[value[1]] +
          "/" +
          CodeToText[value[2]];
        this.addressid = value[2];
      } else {
        if (value[1] != null) {
          dz = CodeToText[value[0]] + "/" + CodeToText[value[1]];
          this.addressid = value[1];
        } else {
          dz = CodeToText[value[0]];
          this.addressid = value[0];
        }
      }
      this.address = dz;
    },
    whole() {
      this.$refs.wholes.style.backgroundColor = "#FFDC00";
      this.$refs.Offtheshelf.style.backgroundColor = "#ffffff";
      this.$refs.PutOn.style.backgroundColor = "#FFFFFF";
      this.addruleForm.label = "家";
    },
    onTheShelf() {
      this.$refs.wholes.style.backgroundColor = "#ffffff";
      this.$refs.Offtheshelf.style.backgroundColor = "#ffffff";
      this.$refs.PutOn.style.backgroundColor = "#FFDC00";
      this.addruleForm.label = "公司";
    },
    underShelfx() {
      this.$refs.wholes.style.backgroundColor = "#ffffff";
      this.$refs.Offtheshelf.style.backgroundColor = "#FFDC00";
      this.$refs.PutOn.style.backgroundColor = "#ffffff";
      this.addruleForm.label = "学校";
    },
    zxc() {
      console.log(this.addruleForm);
      // this.addruleForm.province = this.address.split("/")[0];
      // this.addruleForm.city = this.address.split("/")[1];
      // this.addruleForm.area = this.address.split("/")[2];
      this.$refs.addruleForm.validate((v) => {
        if (!v) return;
        postD(addAddressApi(), this.addruleForm).then((res) => {
          if (res.code == "200") {
            this.$message({
              offset: 80,
              type: "success",
              message: "保存成功",
            });
            this.addruleForm = "";
            this.listAddress();
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
    listAddress() {
      postD(listAddressApi()).then((res) => {
        this.listAddressList = res.list;
      });
    },
    editvalue(id) {
      this.addruleForm.id = id.id;
      this.addruleForm.name = id.name;
      this.addruleForm.tel = id.tel;
      this.addruleForm.province = id.province;
      this.addruleForm.city = id.city;
      this.addruleForm.area = id.area;
      this.province = id.province + "/" + id.city + "/" + id.area;
      this.addruleForm.label = id.label;
      this.addruleForm.detail = id.detail;
      this.addruleForm.lat = id.lat;
      this.addruleForm.lng = id.lng;
      this.addruleForm.province = id.province;
      this.addruleForm.area = id.area;
      this.addruleForm.detail = id.detail;
      this.addruleForm.city = id.city;

      this.keyWord =
        this.addruleForm.province +
        this.addruleForm.city +
        this.addruleForm.area +
        this.addruleForm.detail;
      this.longAndLat =
        this.addruleForm.lng + "," + this.addruleForm.lat;
      if (this.addruleForm.label == "家") {
        this.$refs.wholes.style.backgroundColor = "#FFDC00";
        this.$refs.Offtheshelf.style.backgroundColor = "#ffffff";
        this.$refs.PutOn.style.backgroundColor = "#FFFFFF";
      } else if (this.addruleForm.label == "公司") {
        this.$refs.wholes.style.backgroundColor = "#ffffff";
        this.$refs.Offtheshelf.style.backgroundColor = "#ffffff";
        this.$refs.PutOn.style.backgroundColor = "#FFDC00";
      } else if (this.addruleForm.label == "学校") {
        this.$refs.wholes.style.backgroundColor = "#ffffff";
        this.$refs.Offtheshelf.style.backgroundColor = "#FFDC00";
        this.$refs.PutOn.style.backgroundColor = "#ffffff";
      }
            this.search()
    },
    aaddxg() {
      this.province = "";
    },
    modify() {
      // if ((this.province = "")) {
      //   this.addruleForm.province = this.address.split("/")[0];
      //   this.addruleForm.city = this.address.split("/")[1];
      //   this.addruleForm.area = this.address.split("/")[2];
      // }
      console.log(this.addruleForm);
      postD(updateAddressApi(), this.addruleForm).then((res) => {
        if (res.code == "200") {
          this.$message({
            offset: 80,
            type: "success",
            message: "保存成功",
          });
          this.addruleForm.name = "";
          this.addruleForm.tel = "";
          this.addruleForm.province = "";
          this.addruleForm.city = "";
          this.addruleForm.area = "";
          this.addruleForm.label = "";
          this.addruleForm.detail = "";
          this.selectedOptions = "";
          this.address = "";
          this.addruleForm.id = "";
          this.province = "";
          this.listAddress();
        } else {
          this.$message({
            offset: 80,
            type: "error",
            message: res.msg,
          });
        }
      });
    },
    delvalue(id) {
      this.delvalueshow = true;
      this.delvalueid.id = id;
    },
    adddelvalue() {
      postD(delAddressApi(), this.delvalueid).then((res) => {
        if (res.code == "200") {
          this.$message({
            offset: 80,
            type: "success",
            message: "删除成功",
          });
          this.delvalueshow = false;
          this.listAddress();
        } else {
          this.$message({
            offset: 80,
            type: "error",
            message: res.msg,
          });
        }
      });
    },
    setdefault(id) {
      this.is_topid.id = id;
      postD(updateAddressApi(), this.is_topid).then((res) => {
        if (res.code == "200") {
          this.$message({
            offset: 80,
            type: "success",
            message: "设置默认地址成功",
          });
          this.listAddress();
        } else {
          this.$message({
            offset: 80,
            type: "error",
            message: res.msg,
          });
        }
      });
    },
    setnotdefault(id) {
      this.notis_topid.id = id;
      postD(updateAddressApi(), this.notis_topid).then((res) => {
        if (res.code == "200") {
          this.$message({
            offset: 80,
            type: "success",
            message: "取消默认地址成功",
          });
          this.listAddress();
        } else {
          this.$message({
            offset: 80,
            type: "error",
            message: res.msg,
          });
        }
      });
    },
    closeBmap() {
      this.$emit("closeBmap");
    },
    comfirmBmap() {
      this.$emit("comfirmBmap", this.longAndLat);
    },
    ready() {
      this.map = new window.AMap.Map("container", {
        resizeEnable: true,
        zoom: 15, //级别
        center: [116.397428, 39.90923], //中心点坐标
        viewMode: "3D", //使用3D视图
      });
      
      let _this = this;
      // 为地图注册click事件获取鼠标点击出的经纬度坐标
      this.map.on("click", function (e) {
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
          console.log(result);
          var asd = result.regeocode.formattedAddress;
          that.province = asd;
          that.keyWord = asd;
          that.addruleForm.province =
            result.regeocode.addressComponent.province;
          that.addruleForm.city = result.regeocode.addressComponent.city;
          that.addruleForm.area = result.regeocode.addressComponent.district;
          that.addruleForm.detail = result.regeocode.addressComponent.township+result.regeocode.aois[0].name;
          that.addruleForm.lng = lnglatXY[0];
          that.addruleForm.lat = lnglatXY[1];
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
@import url("./addresslist.less");
.map-search_wrapper {
  z-index: 500;
  border-radius: 5px;
  width: 100%;
  min-height: 50%;
  min-width: 300px;

  background: #050742;
  color: #000000;
  .header {
    width: 100%;
    height: 60px;
    top: 0;
    left: 0;
    line-height: 4.5;
    font-size: 14px;
    color: #fff;
    display: flex;
    margin-left: 20px;
  }
  /deep/.el-button--primary {
    margin-top: 13px;
  }
  #container {
    width: 100%;
    height: 88vh;
    background-color: #ffffff;
  }
}
/deep/.map-search_wrapper[data-v-c25aea90] .el-button--primary {
  margin-left: -30px;
}
/deep/.el-input__inner {
  width: 455px !important;
}
</style>