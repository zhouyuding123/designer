<template>
  <div style="padding: 30px 170px">
    <div class="padding_body">
      <div class="city_list">
        <div class="city_choose block">
          按省份选择
          <el-cascader
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
            size="large"
            popper-class="citylesss"
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
      <div class="vorder"></div>
      <div class="hot_citys">
        热门城市：
        <div
          v-for="(item, index) in hotCity"
          :key="index"
          class="city_font"
          @click="ressBus(item)"
        >
          <span>{{ item }}</span>
        </div>
      </div>
      <div class="vorder"></div>
      <div class="hot_city">
        按拼音首字母选择:
        <div
          v-for="(item, index) in letters"
          :key="index"
          class="city_font"
          @click="eveTheme('aa' + index)"
        >
          <span>{{ item }}</span>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">A</div>
        <div class="citypad">
          <div
            v-for="(item, index) in azcity[0].data"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 0"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">B</div>
        <div class="citypad">
          <div
            v-for="(item, index) in azcity[1].data"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 1"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">C</div>
        <div class="citypad">
          <div
            v-for="(item, index) in azcity[2].data"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 2"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">D</div>
        <div class="citypad">
          <div
            v-for="(item, index) in azcity[3].data"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 3"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">E</div>
        <div class="citypad">
          <div
            v-for="(item, index) in azcity[4].data"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 4"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">F</div>
        <div class="citypad">
          <div
            v-for="(item, index) in azcity[5].data"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 5"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">G</div>
        <div class="citypad">
          <div
            v-for="(item, index) in azcity[6].data"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 6"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">H</div>
        <div class="citypad">
          <div
            v-for="(item, index) in azcity[7].data"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 7"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">J</div>
        <div class="citypad">
          <div
            v-for="(item, index) in azcity[8].data"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 8"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">K</div>
        <div class="citypad">
          <div
            v-for="(item, index) in azcity[9].data"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 9"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">L</div>
        <div class="citypad">
          <div
            v-for="(item, index) in azcity[10].data"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 10"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">M</div>
        <div class="citypad">
          <div
            v-for="(item, index) in azcity[11].data"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 11"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">N</div>
        <div class="citypad">
          <div
            v-for="(item, index) in azcity[12].data"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 12"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">P</div>
        <div class="citypad">
          <div
            v-for="(item, index) in azcity[13].data"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 13"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">Q</div>
        <div class="citypad">
          <div
            v-for="(item, index) in azcity[14].data"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 14"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">R</div>
        <div class="citypad">
          <div
            v-for="(item, index) in Rcity"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 15"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">S</div>
        <div class="citypad">
          <div
            v-for="(item, index) in Scity"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 16"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">T</div>
        <div class="citypad">
          <div
            v-for="(item, index) in azcity[16].data"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 17"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">W</div>
        <div class="citypad">
          <div
            v-for="(item, index) in azcity[17].data"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 19"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">X</div>
        <div class="citypad">
          <div
            v-for="(item, index) in azcity[18].data"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 20"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">Y</div>
        <div class="citypad">
          <div
            v-for="(item, index) in azcity[19].data"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 21"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hot_city">
        <div class="azstyle">Z</div>
        <div class="citypad">
          <div
            v-for="(item, index) in azcity[20].data"
            :key="index"
            class="cityleft"
            @click="ressBus(item)"
            :id="'aa' + 22"
          >
            {{ item }}
          </div>
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
      hotCity: [
        "北京市",
        "上海市",
        "广州市",
        "深圳市",
        "天津市",
        "西安市",
        "重庆市",
        "杭州市",
        "南京市",
        "武汉市",
        "成都市",
      ],
      azcity: [],
      Rcity: [
        "日照",
        "瑞安",
        "荣成",
        "乳山",
        "如皋",
        "汝州",
        "如东",
        "仁怀",
        "瑞金",
        "荣昌区",
        "仁寿",
        "任丘",
        "汝阳",
        "瑞丽",
        "任泽区",
        "汝城县",
        "容县",
        "瑞昌",
        "日喀则",
      ],
      Scity: [],
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
    this.yp(city);
  },
  methods: {
    //省市区三级联动事件
    handleChange(value) {
      console.log(value);
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
      if (this.addressid == "110100") {
        this.addressid = "110000";
      } else if (this.addressid == "120100") {
        this.addressid = "120000";
      } else if (this.addressid == "310100") {
        this.addressid = "310000";
      } else if (this.addressid == "500100" || this.addressid == "500200") {
        this.addressid = "500000";
      }
      this.address = dz;
      this.setCookie(CodeToText[this.addressid], 700);
      this.$router.push("/BusinessChain");
    },
    setCookie(c_ress, exdate) {
      //账号，密码 ，过期的天数
      var exdate = new Date();
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdate); //保存的天数
      document.cookie =
        "ress=" + c_ress + ";path=/;expires=" + exdate.toLocaleString();
    },
    yp(arr, empty) {
      var letters = "ABCDEFGHJKLMNPQRSTUWXYZ".split("");
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
      var arr = result[15].data.slice(1);
      return (this.azcity = result), (this.Scity = arr);
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
      cb(results);
    },
    handleSelect() {
      this.setCookie(this.state, 700);
      this.$router.push("/BusinessChain");
    },
    createFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    ressBus(val) {
      this.setCookie(val, 700);
      this.$router.push("/BusinessChain");
    },
    eveTheme: function (e) {
      document.getElementById(e).scrollIntoView({
        behavior: "smooth", // 平滑过渡
        block: "center", // 上边框与视窗顶部平齐。默认值
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./address.less");
</style>