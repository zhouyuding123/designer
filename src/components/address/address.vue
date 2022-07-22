<template>
  <div style="padding: 20px 170px">
    <div class="padding_body">
      <div class="city_list">
        <div class="city_choose">
          按省份选择
          <el-cascader
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
            size="large"
            style="margin-left: 26px"
          >
          </el-cascader>
        </div>
        <div class="seatcher">
          直接搜索
          <el-autocomplete
            class="inline-input"
            v-model="state"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
      </div>
      <div class="vorder">

      </div>
      <div class="hot_city">
          热门城市：
          <div v-for="(item,index) in hotCity" :key="index" class="city_font">
              <span>{{item}}</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  CodeToText,
  TextToCode,
  provinceAndCityData,
} from "element-china-area-data";
export default {
  data() {
    return {
      options: provinceAndCityData,
      selectedOptions: [],
      city: [],
      letters: [],
      state: "",
      citys: [],
      ary: [],
      hotCity:["北京","上海","广州","深圳","天津","西安","重庆","杭州","南京","武汉","成都"]
    };
  },
  created() {
    let city = [];
    this.options.forEach((v) => {
      v.children.forEach((s) => {
        city.push(s.label);
      });
    });
    let ary = [];
    city.forEach((item) => {
      ary.push({ value: item });
    });

    this.citys = city;
    this.ary = ary;
    console.log(ary);
    this.yp(city);
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
    yp(arr, empty) {
      var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      this.letters = letters;
      var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split("");
      var arrList = [];

      for (var m = 0; m < arr.length; m++) {
        if (arrList.indexOf(arr[m]) === -1) {
          arrList.push(arr[m]);
        }
      }
      var result = [];
      var curr;
      for (var i = 0; i < letters.length; i++) {
        curr = { letter: letters[i], data: [] };

        if (i != 26) {
          for (var j = 0; j < arrList.length; j++) {
            var initial = arrList[j].charAt(0); //截取第一个字符

            if (
              arrList[j].charAt(0) == letters[i] ||
              arrList[j].charAt(0) == letters[i].toLowerCase()
            ) {
              //首字符是英文的

              curr.data.push(arrList[j]);
            } else if (zh[i] != "*" && this.isChinese(initial)) {
              //判断是否是无汉字,是否是中文

              if (
                initial.localeCompare(zh[i]) >= 0 &&
                (!zh[i + 1] || initial.localeCompare(zh[i + 1]) < 0)
              ) {
                //判断中文字符在哪一个类别

                curr.data.push(arrList[j]);
              }
            }
          }
        } else {
          for (var k = 0; k < arrList.length; k++) {
            var ini = arrList[k].charAt(0); //截取第一个字符

            if (!this.isChar(ini) && !this.isChinese(ini)) {
              curr.data.push(arrList[k]);
            }
          }
        }

        if (empty || curr.data.length) {
          result.push(curr);
        }
      }

      return (this.city = result);
    },
    isChinese: function (temp) {
      var re = /[^\u4E00-\u9FA5]/;

      if (re.test(temp)) {
        return false;
      }

      return true;
    },
    isChar: function (char) {
      var reg = /[A-Za-z]/;

      if (!reg.test(char)) {
        return false;
      }

      return true;
    },
    querySearch(queryString, cb) {
      var restaurants = this.ary;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect() {
      console.log(this.state);
    },
    createFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./address.less");
</style>