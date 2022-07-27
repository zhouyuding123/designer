<template>
  <div style="padding: 20px 170px">
    <div class="titleline1">
      <div class="countSstyle">
        <div class="numbervalue">
          <span>{{ workvalues.accept_count }}</span>
        </div>
        <div class="numbervalue2"><span>参与选手</span></div>
      </div>
      <div class="vertical"></div>
      <div class="countSstyle">
        <div class="numbervalue">
          <span>{{ workvalues.voto_count }}</span>
        </div>
        <div class="numbervalue2"><span>积累投票</span></div>
      </div>
      <div class="vertical"></div>
      <div class="countSstyle">
        <div class="numbervalue">
          <span>{{ workvalues.browse }}</span>
        </div>
        <div class="numbervalue2"><span>访问量</span></div>
      </div>
    </div>
    <div class="titleline2">
      <div class="listPadding">
        <div class="seatch_list">
          <i
            class="el-icon-search"
            style="position: absolute; margin: 12px 0 0 20px; color: #dddddd"
          ></i>
          <el-input
            v-model="seatcher.keyword"
            placeholder="请输入内容"
          ></el-input>
          <div class="buttom_seatch" @click="seatchvalue">
            <span> 搜索 </span>
          </div>
        </div>
      </div>
    </div>
    <div class="myworks">
      <div class="myworksbody">
        <div v-for="(item, index) in myworks" :key="index">
          <div class="workid">
            <span>{{ item.accept_id }}</span>
            <div class="myworkimg">
              <img
                :src="imagesValue + item.thumb"
                alt=""
                @click="goWorkShow(item)"
              />
            </div>
            <div class="dis" style="position: relative;">
              <div>
                <div class="myworktitle">
                  {{ item.title }}
                </div>
                <div class="dis" style="padding: 10px 20px">
                  <div class="myhead">
                    <img :src="imagesValue + item.headimage" alt="" />
                  </div>
                  <div class="mynik">{{ item.nickname }}</div>
                </div>
              </div>
              <div class="invitation" @click="fs">邀人助力</div>
              <div v-if="vsh == true" class="share_post">
                  <img src="" alt="">
                  <!-- <vshare :vshareConfig="vshareConfig"> </vshare> -->
                  <div class="social-share"></div>
              </div>
            </div>
            <div class="disp">
              <div class="bodywith">
                <div class="voto_num">100</div>
                <div class="bodywithbon">当前排名</div>
              </div>
              <div class="bodywith">
                <div class="voto_num">100</div>
                <div class="bodywithbon">当前票数</div>
              </div>
              <div class="bodywith">
                <div class="voto_num">100</div>
                <div class="bodywithbon">距前一名</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="titleline3">
      <div class="titlevoto" v-for="items in workvalue" :key="items.accept_id">
        <div class="titleimg">
          <span>{{ items.accept_id }}</span>
          <img
            :src="imagesValue + items.thumb"
            alt=""
            @click="goWorkShow(items)"
          />
        </div>
        <div class="titleTitle">
          <div class="titleValues">
            <span>{{ items.title }}</span>
          </div>
          <div class="hsadimg">
            <div class="imghead">
              <el-image
                :src="imagesValue + items.headimage"
                style="border-radius: 50%; width: 42px; height: 42px"
              ></el-image>
            </div>
            <div class="imgname">
              <span>{{ items.nickname }}</span>
            </div>
          </div>
          <div
            class="votonum"
            id="votonumvo"
            v-if="items.is_voto === 1"
            @click="votonums(items)"
          >
            <span>投TA一票</span>
          </div>
          <div class="votonumser" v-if="items.is_voto === 2">
            <span>您已投票</span>
          </div>
        </div>
      </div>
    </div>
    <div class="pagers">
      <vxe-pager
        :current-page="detialId.offset"
        :page-size="detialId.limit"
        :total="detialId.totalResult"
        :layouts="[
          'PrevPage',
          'JumpNumber',
          'NextPage',
          'FullJump',
          'Sizes',
          'Total',
        ]"
        align="center"
        @page-change="handlePageChangeActivity"
      ></vxe-pager>
    </div>
  </div>
</template>

<script>
import { votoWorksApi, myWorksApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      imagesValue: "",
      detialId: {
        id: "",
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      seatcher: {
        keyword: "",
        id: "",
      },
      workvalues: [],
      workvalue: [],
      myworks: [],
      vsh:false,
      vshareConfig: {
        shareList: [
          // 此处放分享列表（ID）
          "mshare",
          "qzone",
          "tsina",
          "sqq"
        ],
        common: {
          //此处放置通用设置
        },
        share: [
          {
            //此处放置分享按钮设置
          },
        ],
        slide: [
          //此处放置浮窗分享设置
        ],
        image: [
          //此处放置图片分享设置
          
        ],
        selectShare: [
          //此处放置划词分享设置
        ],
      },
    };
  },
  created() {
    this.detialId.id = this.$route.params.id;
    this.seatcher.id = this.$route.params.id;
    this.imagesValue = imgUrl();
    this.worksValue();
    this.mywork();
  },
  methods: {
    mywork() {
      var works = {
        id: this.$route.params.id,
      };
      postD(myWorksApi(), works).then((res) => {
        console.log(res);
        this.myworks = res.list;
      });
    },
    worksValue() {
      postD(votoWorksApi(), this.detialId).then((res) => {
        this.workvalues = res;
        this.workvalue = res.list.reverse();
        this.detialId.totalResult = res.accept_count;
      });
    },
    seatchvalue() {
      postD(votoWorksApi(), this.seatcher).then((res) => {
        this.workvalue = res.list.reverse();
        this.detialId.totalResult = res.accept_count;
      });
    },
    handlePageChangeActivity() {},
    fs() {
        if(this.vsh == false){
            this.vsh = true
        }else {
            this.vsh = false
        }
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./exh.less");
</style>