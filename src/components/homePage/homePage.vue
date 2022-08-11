<template>
  <div class="map-search_wrapper" id="bmapSearch" style="margin-top: 200px">
    <div class="header">
      需要查询的地址：
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
          top="-140px"
          placeholder="请输入内容"
          @focus="editText"
          v-model="keyWord"
          @keyup.native.13="search"
          clearable
          class="search-input"
        >
        </el-input>
      </el-tooltip>
      <el-button type="primary" size="medium" @click="search">查询</el-button>
      &nbsp;&nbsp;&nbsp;查询结果(经纬度)：
      <el-input
        type="text"
        v-model="longAndLat"
        ref="long"
        class="search-input"
      >
      </el-input>
      <el-button type="primary" size="medium" @click="comfirmBmap"
        >填入</el-button
      >
      <el-button type="warning" size="medium" @click="closeBmap"
        >关闭</el-button
      >
    </div>
    <div id="container" style="overflow: hidden"></div>
  </div>
</template>
<script>
// import { collide } from '../../utils/utils';
import { asyncJS } from "@/assets/js/modifyStyle.js";
export default {
  data() {
    return {
      keyWord: "",
      longAndLat: "",
      map: null,
      mapMark: null,
      localSearch: "",
      textTip: "",
      isshowTip: false,
      address:""
    };
  },
  mounted() {
    window.onLoadMap = () => {
      this.ready();
    };
    // key 值需要去高德地图去申请才可以
    asyncJS(
      "https://webapi.amap.com/maps?v=1.4.15&key=fe1bc0089a662131d7fc17ebde09cba9&callback=onLoadMap"
    );
  },
  created() {},
  beforeDestroy() {},
  methods: {
    closeBmap() {
      this.$emit("closeBmap");
    },
    comfirmBmap() {
      this.$emit("comfirmBmap", this.longAndLat);
    },
    ready() {
      this.map = new window.AMap.Map("container", {
        resizeEnable: true,
        zoom: 11, //级别
        center: [116.397428, 39.90923], //中心点坐标
        viewMode: "3D", //使用3D视图
      });
      let _this = this;
      // 为地图注册click事件获取鼠标点击出的经纬度坐标
      this.map.on("click", function (e) {
        let lng = e.lnglat.getLng();
        let lat = e.lnglat.getLat();
        console.log(e);
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
      // 先清除原来的标记
      // this.clearMarker();
      // 清除所有标记
      this.map.clearMap();
      let _this = this;
      this.mapMark = new window.AMap.Marker({
        position: [lng, lat],
        map: _this.map,
      });
      this.mapMark.setMap(this.map);
      let lnglatXY = [lng, lat]

      AMap.plugin('AMap.Geocoder', function () {
        var that = this

        var geocoder = new AMap.Geocoder({

          radius: 1000,

          extensions: "all"

        });

        geocoder.getAddress(lnglatXY, function (status, result) {
          result.regeocode.formattedAddress = province

          // if (status === 'complete' && result.info === 'OK') {

          //   var address = result.regeocode.formattedAddress;

          //   that.address = address  //兑换地址

          //   that.$emit('getaddress', that.address, lnglatXY)

          // } else {

          //   ElMessage.error('无地址，请重新选择');

          // }

        });

        // 清除所有标记

        that.map.clearMap();

        var marker = new AMap.Marker();

        that.map.add(marker);

        marker.setPosition(lnglatXY);

      })
    },
    editText() {
      this.isshowTip = false;
    },
  },
};
</script>
<style lang="less">
.map-search_wrapper {
  .el-input__inner {
    border: 1px solid #96a0a9;
  }
}
</style>
<style lang="less" scoped>
.map-search_wrapper {
  position: absolute;
  top: -140px;
  left: 0;
  z-index: 9999;
  border-radius: 5px;
  width: 100%;
  min-height: 95%;
  min-width: 950px;
  overflow-x: auto;
  padding: 65px 30px 20px 30px;
  background: #050742;
  color: #000000;
  .header {
    width: 100%;
    height: 60px;
    padding-left: 30px;
    position: absolute;
    top: 0;
    left: 0;
    line-height: 4.5;
    font-size: 14px;
    color: #fff;
    .search-input {
      display: inline-block;
      width: 28%;
    }
  }
  #container {
    width: 100%;
    height: 88vh;
    background-color: #ffffff;
  }
}
</style>