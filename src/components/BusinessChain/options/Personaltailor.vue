<template>
  <div>
    <div class="sadx">
      <div class="screen">
        <el-radio
          v-model="company_mainId"
          :label="0"
          @change="getListApi()"
          border
          >全部</el-radio
        >
        <el-radio
          v-for="item in getList"
          :key="item.id"
          v-model="Listvalue.company_main"
          :label="item.id"
          @change="freelists(item.id)"
          border
          >{{ item.title }}</el-radio
        >
      </div>
    </div>
    <div class="company">
      <div class="companyback">
        <div v-for="(item, index) in valueListE" :key="index" @click="goPersonaltailordetil">
          <div class="brder_line" v-if="index != 0">
            <div class="brder_line_line"></div>
          </div>
          <div class="company_line">
            <div class="company_line_img">
              <img
                v-if="item.headimage"
                :src="imagesValue + item.headimage"
                alt=""
              />
              <img
                v-if="item.headimage == null || item.headimage == ''"
                :src="imagesValue + notimg"
                alt=""
              />
            </div>
            <div>
              <div class="company_linenick">
                <div class="company_linenick_name">{{ item.nickname }}</div>
                <div class="company_linenick_img">
                  <img src="@/assets/imgers/认证.png" alt="" />
                </div>
              </div>
              <div class="dgc">
                <el-rate
                  v-model="value"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                >
                </el-rate>
                <div class="dgcs">
                  <div><span>西服订制</span></div>
                  <div><span>量身定做</span></div>
                </div>
              </div>
              <div class="dzhi">
                {{ item.province }}{{ item.city }}{{ item.area
                }}{{ item.detail }}
              </div>
              <div class="jul">
                <div><img src="@/assets/imgers/距离.png" alt="" /></div>
                <div style="margin-top:2.5px">距离我1.1KM</div>
              </div>
            </div>
            <div class="morelist" >
              <img src="@/assets/imgers/more3.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="total > 10">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="Listvalue.offset"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="Listvalue.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { imgUrl } from "@/assets/js/modifyStyle";
import { getListApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
export default {
  data() {
    return {
      notimg: "images/20220720/165832004615c379d82e26251591b1e85c8e4fdf7e.jpg",
      imagesValue: "",
      getList: [],
      company_mainId: 0,
      Listvalue: {
        limit: 10,
        offset: 1,
        company_main: "",
        city: "",
      },
      valueListE: [
        {
          headimage:
            "images/20220806/1659754744c406d1e49f9bfc5b31a5cf927a9c7769.png",
          nickname: "宇鲨礼服私人订制坊",
          province: "",
          city: "宁波市",
          area: "鄞州区",
          detail: "银泰环球城二层288号",
        },
        {
          headimage:
            "images/20220806/1659754744c406d1e49f9bfc5b31a5cf927a9c7769.png",
          nickname: "宇鲨礼服私人订制坊",
          province: "",
          city: "宁波市",
          area: "鄞州区",
          detail: "银泰环球城二层288号",
        },
        {
          headimage:
            "images/20220806/1659754744c406d1e49f9bfc5b31a5cf927a9c7769.png",
          nickname: "宇鲨礼服私人订制坊",
          province: "",
          city: "宁波市",
          area: "鄞州区",
          detail: "银泰环球城二层288号",
        },
        {
          headimage:
            "images/20220806/1659754744c406d1e49f9bfc5b31a5cf927a9c7769.png",
          nickname: "宇鲨礼服私人订制坊",
          province: "",
          city: "宁波市",
          area: "鄞州区",
          detail: "银泰环球城二层288号",
        },
        {
          headimage:
            "images/20220806/1659754744c406d1e49f9bfc5b31a5cf927a9c7769.png",
          nickname: "宇鲨礼服私人订制坊",
          province: "",
          city: "宁波市",
          area: "鄞州区",
          detail: "银泰环球城二层288号",
        },
      ],
      company_mainId: 0,
      total: 0,
      value: 4,
    };
  },
  created() {
    this.imagesValue = imgUrl();
    this.getListApi();
  },
  methods: {
    getListApi() {
      postD(getListApi()).then((res) => {
        this.getList = res.list;
      });
    },
    freelists(val) {
      this.company_mainId = "";
      this.Listvalue.company_main = val;
    },
    goPersonaltailordetil() {
      this.$router.push('/Personaltailordetil')
    }
  },
};
</script>
<style lang="less" scoped>
.sadx {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
.screen {
  width: 1580px;
  background: #ffffff;
  display: flex;
  justify-content: left;
  padding: 5px 0px 25px 60px;
  cursor: pointer;
  flex-wrap: wrap;

  .el-radio {
    width: 10%;
    background-color: #f5f5f5;
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    margin-top: 20px;
  }
}
/deep/.el-radio__input {
  .el-radio__inner {
    display: none;
  }
}

/deep/.el-radio.is-bordered.is-checked {
  background: linear-gradient(180deg, #0c032e 0%, #5c5673 100%);
  border: none;
}

/deep/.el-radio__input.is-checked + .el-radio__label {
  color: white;
}
.company {
  margin-top: 20px;
  display: flex;
  justify-content: center;

  .companyback {
    background-color: white;

    .company_line {
      width: 1580px;
      background-color: white;
      height: 260px;
      display: flex;
      padding: 30px 40px;
      text-align: left;

      .company_line_img {
        width: 300px;
        height: 200px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 6px 6px 6px 6px;
        }
      }

      .company_linenick {
        display: flex;
        margin-left: 16px;

        .company_linenick_name {
          font-size: 24px;
          font-weight: bold;
          color: #333333;
          margin-top: 23px;
        }

        .company_linenick_img {
          margin-top: 20px;
          margin-left: 13px;
        }
      }

      .dzhi {
        margin-top: 60px;
        margin-left: 16px;
        font-size: 14px;
        font-weight: 400;
        color: #333333;
      }
    }

    .brder_line {
      display: flex;
      justify-content: center;

      .brder_line_line {
        width: 1500px;
        height: 0px;
        opacity: 1;
        border: 1px solid #dddddd;
      }
    }
  }
}
.morelist {
  margin-left: auto;
  padding: 100px 46px 0 0;
  cursor: pointer;
}

.el-pagination {
  padding-top: 20px;
  padding-bottom: 30px;

  /deep/.el-input__inner {
    height: 30px;
  }
}
.dgc {
  display: flex;
  margin-left: 16px;
  margin-top: 12px;
}
.dgcs {
  display: flex;
  margin-left: 16px;
  div {
    padding: 5px 10px 10px 10px;
    max-width: 100%;
    height: 24px;
    background-color: #fdf9dc;
    margin-right: 10px;
    cursor: pointer;
    span {
      width: 28px;
      height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: #f99f3f;
    }
  }
}
.jul {
  display: flex;
  margin-left: 16px;
  margin-top: 10px;
  div {
    margin-right: 10px;
    font-size: 12px;
    font-weight: 400;
    color: #999999;
  }
}
</style>