<template>
  <div>
    <div class="enttop">
      <div class="imgtuo">
        <img
          :src="imageValue + designerEntL.license"
          style="
            width: 160px;
            height: 160px;
            background: #ffffff;
            border-radius: 6px 6px 6px 6px;
          "
          alt=""
        />
      </div>
      <div class="enttop_left">
        <div class="enttop_left_name">{{ designerEntL.nickname }}</div>
        <div class="enttop_left_line2">
          <el-rate
            v-model="value1"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          >
          </el-rate>
          <div class="fss">粉丝数{{ designerEntL.follow }}</div>
        </div>
        <div class="enttop_left_line3">
          主营:{{ designerEntL.company_main }}
        </div>
        <div class="enttop_left_line4">
          {{ designerEntL.province }}{{ designerEntL.city
          }}{{ designerEntL.area }}
        </div>
        <div class="enttop_left_line5">{{ designerEntL.detail }}</div>
      </div>
      <div class="enttop_right">
        <div class="enttop_right_subscribe"><span>关注 </span></div>
        <div class="ent_num dis">
          <div class="ent_num_left">
            <div>137</div>
            <div>服务订单数</div>
          </div>
          <div class="ent_num_left">
            <div>96%</div>
            <div>打板完成率</div>
          </div>
          <div class="ent_num_left">
            <div>72</div>
            <div>服务雇主数</div>
          </div>
        </div>
        <div class="enttop_right_options">
          <div class="enttop_right_options1">
            <div><img src="@/assets/imgers/导航.png" alt="" /></div>
            <div class="enttop_right_options1_title">导航</div>
          </div>
          <div class="enttop_right_options1">
            <div><img src="@/assets/imgers/电话.png" alt="" /></div>
            <div class="enttop_right_options1_title">电话</div>
          </div>
          <div class="enttop_right_options1">
            <div><img src="@/assets/imgers/沟通.png" alt="" /></div>
            <div class="enttop_right_options1_title">沟通</div>
          </div>
        </div>
      </div>
    </div>
    <div class="gywm">
      <div class="gywm_title">关于我们</div>
      <div class="gywm_title2">
        在很多人眼里，私人订制服装象征品味与地位，这是因为它会根据消费者自身的气质形象以及个人的要求进行量身的定制，从某种程度来说，它并不会出现雷同化的现象，而较之于成品衣服而言，它更能彰显消费者的气质，现在很多人在购买衣服时，无不是将合身、时尚放在选择的标准首要位置，由此可见，私人定制服装表现好，开店也是很不错的。
      </div>
    </div>
    <div class="entphoto">
      <div class="entphoto_value">
        <div class="entphoto_value_photo">照片</div>
        <div class="entphoto_value_img">
          <img :src="imageValue + designerEntL.shop_img" alt="" />
        </div>
      </div>
    </div>
    <div class="gywm">
      <div class="gywm_title">擅长领域</div>
      <div class="gywm_title2">礼服订制；西装订制</div>
    </div>
    <div class="introduce">
      <div class="introduce_value">
        <div class="introduce_value_introduce">介绍</div>
        <div class="introduce_value_title">
          {{ description.introduce }}
        </div>
        <div class="introduce_value_video">
          <video :src="imageValue + description.video" controls></video>
        </div>
      </div>
    </div>
    <div class="entphoto">
      <div class="entphoto_value">
        <div class="entphoto_value_photo">相关资质</div>
        <div class="entphoto_value_img">
          <img :src="imageValue + designerEntL.license" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      imageValue: "",
      designerEntL: {
        nickname: "随便取个名字代加工厂",
        follow: "568",
        company_main: "手机",
        province: "浙江省",
        city: "宁波市",
        area: "奉化区",
        detail: "南部商务区地铁口A出口处",
        shop_img:
          "iamges/20220811/1660215974ed48cf1d7a785127b813dc5db62b5594.png",
        license:
          "iamges/20220811/1660215974ed48cf1d7a785127b813dc5db62b5594.png",
      },
      description: {
        introduce:
          "  申洲国际主要生产针织休闲服装，近年来大力发展运动类服装。发展了如NIKE、ADIDAS、PUMA等国际知名运动名牌客户。产品市场也从日本市场  ",
        video: "moves/20220811/16602161728ec0fc8a7c4994a23308b9ef0992bc4e.mp4",
      },

      value1: 2,
    };
  },
  created() {
    this.imageValue = imgUrl();
  },
};
</script>

<style lang="less" scoped>
.ent_num {
  width: 360px;
  position: absolute;
  right: 0;
  top: 70px;
  .ent_num_left {
    margin-left: 60px;
    div:nth-child(1) {
      font-size: 28px;
      font-weight: bold;
      color: #333333;
    }
    div:nth-child(2) {
      height: 17px;
      font-size: 12px;
      font-weight: 400;
      color: #999999;
      margin-top: 15px;
    }
  }
}
.imgtuo {
  position: absolute;
  left: 360px;
}
.enttop {
  width: 100%;
  background: #ffffff;
  display: flex;
  padding: 40px 360px;
  position: relative;
  height: 300px;

  .enttop_left {
    text-align: left;
    margin-left: 180px;

    .enttop_left_name {
      font-size: 28px;
      font-weight: bold;
      color: #333333;
    }

    .enttop_left_line2 {
      display: flex;
      margin-top: 16px;

      .pfs {
        font-size: 14px;
        font-weight: 400;
        color: #ea9518;
        margin-left: 10px;
        margin-top: 3px;
      }

      .fss {
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        margin-left: 10px;
        margin-top: 3px;
      }
    }

    .enttop_left_line3 {
      margin-top: 15px;
      font-size: 14px;
      font-weight: bold;
      color: #333333;
    }

    .enttop_left_line4 {
      margin-top: 100px;
      font-size: 14px;
      font-weight: 400;
      color: #333333;
      margin-left: -175px;
    }

    .enttop_left_line5 {
      margin-top: 10px;
      font-size: 12px;
      font-weight: 400;
      color: #999999;
      margin-left: -175px;
    }
  }

  .enttop_right {
    margin-left: auto;
    position: relative;

    .enttop_right_subscribe {
      position: absolute;
      top: 0;
      right: 0;
      width: 80px;
      height: 30px;
      background: linear-gradient(90deg, #ff8f0f 0%, #feb32c 100%);
      border-radius: 4px 4px 4px 4px;
      cursor: pointer;

      span {
        font-size: 14px;
        font-weight: 400;
        color: #ffffff;
        line-height: 30px;
      }
    }

    .enttop_right_options {
      margin-top: 175px;
      display: flex;

      .enttop_right_options1 {
        margin-left: 40px;
        cursor: pointer;

        .enttop_right_options1_title {
          font-size: 14px;
          font-weight: 400;
          margin-top: 10px;
          color: #999999;
        }
      }
    }
  }
}
.entphoto {
  padding: 20px 170px;

  .entphoto_value {
    width: 100%;
    background: #ffffff;
    padding: 40px 20px 20px 40px;

    .entphoto_value_photo {
      text-align: left;
      font-size: 24px;
      font-weight: bold;
      color: #333333;
    }

    .entphoto_value_img {
      margin-top: 20px;
      width: 280px;
      height: 200px;

      img {
        width: 280px;
        height: 200px;
      }
    }
  }
}
.introduce {
  padding: 20px 170px;

  .introduce_value {
    width: 100%;
    background-color: white;
    text-align: left;
    padding: 40px 40px 0 40px;

    .introduce_value_introduce {
      font-size: 24px;
      font-weight: bold;
      color: #333333;
    }

    .introduce_value_title {
      margin-top: 20px;
      font-size: 14px;
      font-weight: 400;
      color: #999999;
      line-height: 30px;
    }

    .introduce_value_video {
      margin-top: 80px;
      padding-bottom: 40px;

      video {
        width: 100%;
        height: 300px;
      }
    }
  }
}
.gywm {
  width: 1580px;
  height: auto;
  background: #ffffff;
  margin-top: 20px;
  margin: 20px auto;
  padding-bottom: 20px;
  .gywm_title {
    display: flex;
    font-size: 24px;
    font-weight: bold;
    color: #333333;
    padding: 30px 40px;
  }
  .gywm_title2 {
    width: 1500px;
    height: 50px;
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    text-align: left;
    margin: 0 auto;
  }
}
</style>