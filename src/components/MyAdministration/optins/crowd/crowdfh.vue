<template>
  <div>
    <div class="line dis">
      <div class="dis shurukuang">
        <div>
          <el-input
            v-model="crowd.shurukuang"
            placeholder="请输入内容"
          ></el-input>
        </div>
        <div class="sseatch cur">搜索</div>
      </div>
      <div class="dis" style="margin-left: 560px">
        <div
          class="zxc"
          v-for="(item, index) in topicClass"
          :key="index"
          :class="selectedIndex == index ? 'active' : ''"
          @click="getTopic(index, item.topicClassId)"
        >
          {{ item }}
        </div>
      </div>
      <div style="margin-left: auto" class="shuax cur">刷新</div>
    </div>
    <div class="cr_list">
      <div class="dis cr_lists" style="flex-wrap: wrap">
        <div>商品信息</div>
        <div>众筹价格</div>
        <div>颜色</div>
        <div>尺寸</div>
        <div>数量</div>
        <div>实际付款</div>
        <div>订单状态</div>
        <div>操作</div>
      </div>
    </div>
    <div
      v-for="(item, index) in crowdList"
      :key="index"
      style="margin-bottom: 10px"
    >
      <div class="cr_lists_value">
        <div class="cr_lists_value_top">
          <div>{{ item.pay_time }}</div>
          <div>订单号：{{ item.order_no }}</div>
          <div>下单用户：{{ item.name }}</div>
        </div>
        <div class="dis" style="justify-content: center; align-items: center">
          <div style="padding: 10px 20px">
            <div class="crowdList_img">
              <div><img :src="imagesValue + item.thumb" alt="" /></div>
              <div class="crowdlistshop_title">
                {{ item.title }}
              </div>
            </div>
          </div>
          <div style="width: 460px; margin: 10px auto; margin-top: 10px">
            <div
              v-for="(items, index) in JSON.parse(item.spec)"
              :key="index"
              class="juster"
            >
              <div class="dis juster">
                <div class="crowdList_jg">￥{{ item.price_unit }}</div>
                <div class="crowdList_color">{{ items.color }}</div>
                <div class="crowdList_color">{{ items.size }}</div>
                <div class="crowdList_num">{{ items.count }}</div>
                <div class="crowdList_mon">￥{{ item.price_actual }}</div>
              </div>
            </div>
          </div>
          <div class="crowdList_dfh">待发货</div>
          <div
            class="cur crowdList_fh"
            @click="deliverGoodsShow(item.order_no)"
          >
            发货
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="1280px">
      <div>
        <el-form
          :model="deliveryVa"
          :rules="deliveryVarules"
          ref="deliveryVaruleForm"
          class="demo-ruleForm"
        >
          <el-form-item label="快递公司" prop="logistics">
            <el-select v-model="deliveryVa.logistics" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.title"
                :value="item.title"
                @click.native="zxcssss(item.no)"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发货人名字" prop="name">
            <el-input v-model="deliveryVa.name"></el-input>
          </el-form-item>
          <el-form-item label="发货人电话" prop="tel">
            <el-input v-model="deliveryVa.tel"></el-input>
          </el-form-item>
          <div>
            <div class="map-search_wrapper" id="bmapSearch">
              <div class="header">
                <el-form-item label="发货地址" prop="pro">
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
                </el-form-item>

                <el-button
                  type="primary"
                  style="display: none"
                  size="medium"
                  @click="search"
                  >查询</el-button
                >
              </div>
              <div id="container"></div>
            </div>
          </div>
        </el-form>
      </div>
      <div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="delivery">立即发货</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { imgUrl } from "@/assets/js/modifyStyle";
import { PgetOrderListApi, LogisticsApi,PreparApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { asyncJS } from "@/assets/js/modifyStyle.js";
export default {
  data() {
    var telV = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入企业电话"));
      }
      callback();
    };
    var prO = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输选择地图上的地址作为发货地址"));
      }
      callback();
    };
    return {
      dialogVisible: false,
      imagesValue: "",
      crowd: {
        keyword: "",
        prepar_id: localStorage.getItem("parid"),
      },
      topicClass: ["全部", "待发货", "待签收", "订单完成"],
      selectedIndex: 0,
      crowdList: [],
      deliveryVarules: {
        tel: [
          {
            validator: telV,
            trigger: "blur",
          },
          {
            min: 11,
            max: 11,
            message: "长度为11位的号码",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入发货人姓名", trigger: "blur" },
          {
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: "姓名不支持特殊字符",
            trigger: "blur",
          },
        ],
        pro: [{ validator: prO, trigger: "blur" }],
        logistics: [
          { required: true, message: "请选择快递公司", trigger: "blur" },
        ],
      },
      options: [],
      value: "",
      spec: "",
      keyWord: "",
      longAndLat: "",
      map: null,
      mapMark: null,
      localSearch: "",
      textTip: "",
      isshowTip: false,
      deliveryVa: {
        order_no: "",
        shipper_code: "",
        logistics: "",
        province: "",
        city: "",
        area: "",
        detail: "",
        name: "",
        tel: "",
      },
    };
  },
  created() {
    this.imagesValue = imgUrl();
    this.PgetOrderList();
  },
  methods: {
    PgetOrderList() {
      postD(PgetOrderListApi(), this.crowd).then((res) => {
        if(res.code == "-201") {
          this.$router.push("/about")
        }
        this.crowdList = res.list;
      });
    },
    getTopic(index, id) {
      this.selectedIndex = index;
    },
    deliverGoodsShow(val) {
      this.dialogVisible = true;
      this.deliveryVa.order_no = val;
      postD(LogisticsApi()).then((res) => {
        this.options = res.list;
      });
      window.onLoadMap = () => {
        var thiser = this;
        thiser.ready();
      };
      // key 值需要去高德地图去申请才可以
      asyncJS(
        "https://webapi.amap.com/maps?v=1.4.15&key=4809a108fd29d9ff15029338f2e1f49a&callback=onLoadMap"
      );
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
        center: [121.548989, 29.809106], //中心点坐标
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
          var asd = result.regeocode.formattedAddress;
          that.province = asd;
          that.keyWord = asd;
          that.deliveryVa.province = result.regeocode.addressComponent.province;
          that.deliveryVa.city = result.regeocode.addressComponent.city;
          that.deliveryVa.area = result.regeocode.addressComponent.district;
          that.deliveryVa.detail =
            result.regeocode.addressComponent.township +
            result.regeocode.aois[0].name;
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
    zxcssss(val) {
      this.deliveryVa.shipper_code = val;
    },
    delivery() {
      this.$refs.deliveryVaruleForm.validate((v) => {
        if (!v) return;
        postD(PreparApi(),this.deliveryVa).then(res=> {
          if(res.Reason=="该订单号已下单成功"){
             this.deliveryVa =""
            this.dialogVisible =true
            this.$message({
              offset: 80,
              type: "success",
              message: "该订单号已下单成功",
            });
          }else {
            this.$message({
              offset: 80,
              type: "error",
              message: res.Reason,
            });
          }
        })
      });
    },
  },
};
</script>


<style lang="less" scoped>
@import url("./crowdfh.less");
#container {
  width: 100%;
  height: 88vh;
  background-color: #ffffff;
}
</style>