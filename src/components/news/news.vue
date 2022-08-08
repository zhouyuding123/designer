<template>
  <div>
    <div class="midbox">
      <el-tabs v-model="activeName">
        <el-tab-pane label="系统" name="1"></el-tab-pane>
        <el-tab-pane label="收藏" name="2"></el-tab-pane>
        <el-tab-pane label="关注" name="3"></el-tab-pane>
        <el-tab-pane label="评论" name="4"></el-tab-pane>
        <el-tab-pane label="私信" name="5"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="line2" v-if="activeName == 1">
      <div v-for="(item, index) in newsValuext" :key="index" class="line2List">
        <div class="line2Listimg">
          <img :src="imagesValue + item.wuimg" alt="" />
        </div>
        <div class="line2Listnema">
          <div>{{ item.name }}</div>
          <div>{{ item.text }}</div>
          <div>{{ item.text2 }}</div>
        </div>
        <div class="line2Listtext">
          {{ item.time }}
        </div>
      </div>
    </div>
    <div class="line2" v-if="activeName == 2">
      <div v-for="(item, index) in newsValuesc" :key="index" class="line2List">
        <div class="line2Listimg">
          <img :src="imagesValue + item.wuimg" alt="" />
        </div>
        <div class="line2Listnema">
          <div>{{ item.name }}</div>
          <div>{{ item.text }}</div>
        </div>
        <div class="line2Listtext">
          {{ item.time }}
        </div>
      </div>
    </div>
    <div class="line2" v-if="activeName == 3">
      <div v-for="(item, index) in newsValuegz" :key="index" class="line2List">
        <div class="line2Listimg">
          <img :src="imagesValue + item.wuimg" alt="" />
        </div>
        <div class="line2Listnema">
          <div>{{ item.name }}</div>
          <div>{{ item.text }}</div>
        </div>
        <div class="line2Listtext">
          {{ item.time }}
        </div>
      </div>
    </div>
    <div class="line2" v-if="activeName == 4">
      <div v-for="(item, index) in newsValuepl" :key="index" class="line2List">
        <div class="line2Listimg dis">
          <div><img :src="imagesValue + item.wuimg" alt="" /></div>
        </div>
        <div class="line2Listnema">
          <div class="dis">
            <div>{{ item.name }}</div>
            <div style="margin-left: 20px">
              评论了你的作品《作品名称》<span class="cur" style="color: #0177d5"
                >查看详情</span
              >
            </div>
          </div>
          <div>{{ item.text }}</div>
        </div>
        <div class="line2Listtext">
          {{ item.time }}
        </div>
      </div>
    </div>
    <div class="line2" v-if="activeName == 5">
      <div v-for="(item, index) in newsValuepl" :key="index" class="line2List">
        <div class="line2Listimg dis">
          <div><img :src="imagesValue + item.wuimg" alt="" /></div>
        </div>
        <div class="line2Listnema">
          <div class="dis">
            <div>{{ item.name }}</div>
            <div style="margin-left: 20px">
              发起请求
            </div>
          </div>
          <div>{{ item.text }}</div>
        </div>
        <div class="line2Listtext">
          {{ item.time }}
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
      activeName: "1",
      imagesValue: "",
      newsValuext: [
        {
          wuimg:
            "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "系统消息",
          text: "你发布的作品《作品标题》已通过",
          text2: "快速查看作品：http://www.kdsfjo.con",
          time: "1000000000",
        },
        {
          wuimg:
            "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "系统消息",
          text: "你发布的作品《作品标题》已通过",
          text2: "快速查看作品：http://www.kdsfjo.con",
          time: "1000000000",
        },
        {
          wuimg:
            "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "系统消息",
          text: "你发布的作品《作品标题》已通过",
          text2: "快速查看作品：http://www.kdsfjo.con",
          time: "1000000000",
        },
        {
          wuimg:
            "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "系统消息",
          text: "你发布的作品《作品标题》已通过",
          text2: "快速查看作品：http://www.kdsfjo.con",
          time: "1000000000",
        },
        {
          wuimg:
            "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "系统消息",
          text: "你发布的作品《作品标题》已通过",
          text2: "快速查看作品：http://www.kdsfjo.con",
          time: "1000000000",
        },
      ],
      newsValuesc: [
        {
          wuimg:
            "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "吐泡泡的鱼",
          text: "收藏了你的原创作品《作品名称》",
          time: "1000000",
        },
        {
          wuimg:
            "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "吐泡泡的鱼",
          text: "收藏了你的原创作品《作品名称》",
          time: "1000000",
        },
        {
          wuimg:
            "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "吐泡泡的鱼",
          text: "收藏了你的原创作品《作品名称》",
          time: "1000000",
        },
        {
          wuimg:
            "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "吐泡泡的鱼",
          text: "收藏了你的原创作品《作品名称》",
          time: "1000000",
        },
        {
          wuimg:
            "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "吐泡泡的鱼",
          text: "收藏了你的原创作品《作品名称》",
          time: "1000000",
        },
      ],
      newsValuegz: [
        {
          wuimg:
            "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "吐泡泡的鱼",
          time: "1000000",
          text: "关注了你",
        },
      ],
      newsValuepl: [
        {
          wuimg:
            "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "吐泡泡的鱼",
          time: "1000000",
          text: "我好喜欢",
        },
      ],
      newsValuesx:[
          {
          wuimg:
            "images/20220808/1659924390102aa33ae2b2c86837a584c502d8cfea.png",
          name: "吐泡泡的鱼",
          time: "1000000",
          text: "我好喜欢",
        },
      ]
    };
  },
  created() {
    this.imagesValue = imgUrl();
  },
};
</script>


<style lang="less" scoped>
.line2 {
  margin: 0 auto;
  width: 1580px;
  background-color: white;
  margin-top: 20px;

  .line2List {
    height: 140px;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    padding: 32px 60px;
    .line2Listimg {
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .line2Listnema {
      margin-left: 20px;
      text-align: left;
      div {
        font-size: 14px;
        font-weight: 400;
        color: #999999;
      }
      div:nth-child(1) {
        font-size: 14px;
        font-weight: bold;
        color: #3d444d;
        margin-bottom: 15px;
      }
    }
    .line2Listtext {
      margin-left: auto;
      font-size: 12px;
      font-weight: 400;
      color: #999999;
    }
  }
}
.midbox {
  width: 1580px;
  height: 80px;
  margin: 20px auto;
  padding-left: 30px;
  padding-top: 20px;
  background-color: #fff;

  /deep/.el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    z-index: 1;
    background-color: white;
  }

  /deep/.el-tabs__active-bar {
    position: absolute;
    bottom: 0;
    left: 0px;
    width: 29px !important;
    height: 2px;
    background-color: #ffdc00;
    z-index: 1;
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    list-style: none;
    width: 6px;
    height: 4px;
    border-radius: 2px 2px 2px 2px;
  }

  /deep/.el-tabs__item {
    padding: 0 20px;
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    position: relative;
    font-size: 14px;
    font-weight: 400;
    color: #999999;
  }
  /deep/.is-active {
    color: #0c032e;
    font-weight: bold;
  }
}
</style>