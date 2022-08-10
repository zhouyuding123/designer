<template>
  <div>
    <div class="leftBox">
      <div class="postbox">
        <div class="flex ju-b">
          <el-radio-group v-model="radio">
            <el-radio :label="1">发布帖子</el-radio>
            <el-radio :label="2">发布活动</el-radio>
          </el-radio-group>
          <div class="postbtn cur" @click="goForum">发表帖子</div>
        </div>
        <div style="margin-top: 19px">
          <el-input v-model="title" placeholder="输入标题"></el-input>
        </div>
        <div style="margin-top: 19px; display: flex">
          <!-- <el-input v-model="title" placeholder="输入话题"></el-input> -->
          <el-select
            v-model="biaoqianvalue"
            filterable
            allow-create
            default-first-option
            placeholder="请选择或输入话题"
          >
            <el-option
              v-for="item in PopularTranslations"
              :key="item.id"
              :label="item.title"
              :value="item.title"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <div class="picvidbox">
            <div class="picvid flex al-c" @click="openpic = !openpic">
              <div style="margin-right: 10px">
                <img src="@/assets/imgers/icon/12015@2x.png" alt="" />
              </div>
              <div style="font-size: 14px">图片</div>
            </div>
            <div
              class="picvid flex al-c"
              @click="openvideo = !openvideo"
              style="border-left: 0px solid #dddddd"
            >
              <div style="margin-right: 10px">
                <img src="@/assets/imgers/icon/12014@2x.png" alt="" />
              </div>
              <div style="font-size: 14px">视频</div>
            </div>
            <div
              class="picvid flex al-c"
              @click="OpenVotingList"
              style="border-left: 0px solid #dddddd"
            >
              <div style="margin-right: 10px">
                <img src="@/assets/imgers/icon/12013@2x.png" alt="" />
              </div>
              <div style="font-size: 14px">投票</div>
            </div>
            <!-- <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                    <div class="picvid flex al-c" style=" border-left: 0px solid #dddddd;">
                            <div style="margin-right: 10px">
                              <img src="@/assets/imgers/icon/14822@2x.png" alt="" />
                            </div>
                            <div style="font-size: 14px">话题</div>
                          </div>
              </span>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item  v-for="(item,index) in PopularTranslations" :command="{title:item.title,id:item.id}">{{item.title}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
          </div>
          <div class="outborder">
            <div></div>
            <el-input
              :rows="4"
              v-model="content"
              type="textarea"
              placeholder="请输入内容"
            >
            </el-input>
            <div></div>
            <div class="choosewhat flex al-c ju-b" v-if="votetof">
              <div class="flex al-c">
                <div>
                  <img src="@/assets/imgers/icon/12013@2x.png" alt="" />
                </div>
                <div class="fontw700">选哪个</div>
              </div>
              <div>
                <img
                  src="@/assets/imgers/icon/12218@2x.png"
                  alt=""
                  @click="votetof = false"
                />
              </div>
            </div>
            <div style="margin-top: 20px">
              <div class="flex">
                <el-upload
                  v-if="openpic"
                  class="avatar-uploader"
                  action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                  :data="{ fileType: this.fileType }"
                  multiple
                  list-type="picture-card"
                  :limit="9"
                  :on-success="handleAvatarSuccesser1"
                  :file-list="imageList"
                  :on-preview="handlePictureCardPreview"
                  :before-upload="beforeAvatarUpload"
                  :on-remove="fileRemove"
                >
                  <i
                    class="el-icon-picture-outline"
                    style="background-color: #f5f5f5"
                  ></i>
                </el-upload>
                <div class="margin-right12"></div>
                <ele-upload-video
                  v-if="openvideo"
                  :data="{ fileType: this.fileType1 }"
                  :responseFn="handleResponse"
                  action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                  v-model="videosrc"
                  @delete="delete1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="投票"
      :visible.sync="centerDialogVisible"
      width="1000px"
      center
    >
      <div>
        <div class="wordorpic flex">
          <div
            class="word"
            v-for="(item, index) in wordlist"
            :key="index"
            @click="changewordpic(index)"
            :class="{ wordactive: wordindex == index }"
          >
            {{ item }}
          </div>
        </div>
        <div v-if="wordindex == 0">
          <div
            class="wordadd flex al-c"
            v-for="(item, index) in votewordlist"
            :key="index"
          >
            <el-input placeholder="请输入选项" v-model="item.value"></el-input>
            <img
              src="@/assets/imgers/icon/41@2x.png"
              @click="delwordlist(index)"
              alt=""
            />
          </div>

          <div class="addchoose flex al-c" @click="addvotelist">
            <img
              src="@/assets/imgers/icon/46398.png"
              style="margin-right: 5px"
              alt=""
            />
            添加选项
          </div>
        </div>

        <div v-else style="margin-bottom: 20px">
          <el-upload
            class="avatar-uploader"
            action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            :data="{ fileType: this.fileType }"
            multiple
            list-type="picture-card"
            :limit="9"
            :on-success="handleAvatarSuccesser2"
            :file-list="imageList2"
            :on-preview="handlePictureCardPreview"
            :before-upload="beforeAvatarUpload"
            :on-remove="fileRemove2"
          >
            <i
              class="el-icon-picture-outline"
              style="background-color: #f5f5f5"
            ></i>
          </el-upload>
          <div style="margin-top: 20px">一张图片代表一个选项</div>
        </div>
        <div class="chosebox1 flex al-c ju-b">
          <div>选择方式</div>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="chosebox1 flex ju-b al-c" style="border-top: 0">
          <div>结束时间</div>
          <div class="flex al-c">
            <div v-if="tagsindex == 2">
              <el-date-picker
                v-model="datetime3"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </div>
            <div
              class="tags"
              :class="{ tagactive: tagsindex == index }"
              @click="choosetag(index)"
              :key="index"
              v-for="(item, index) in tags"
            >
              {{ item }}
            </div>
          </div>
        </div>

        <div class="flex al-c ju-c" style="margin-top: 20px">
          <img
            src="@/assets/imgers/icon/46400.png"
            style="margin-right: 5px"
            alt=""
          />
          投票一旦保存，不可再修改
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmVote">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import EleUploadVideo from "@/components/UploadWorks/EleUploadVideo.vue";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
import { ForumthemelistApi, ForumReleaseApi } from "@/urls/wsUrl";
import { timestampToTime } from "@/assets/js/time";
export default {
  inject:["reload"],
  props: ["is_circle", "circle_id","styless"],
  components: {
    EleUploadVideo,
  },
  data() {
    return {
      radio: 1,
      imagesValue: "",
      title: "",
      content: "",
      fileType: "images",
      fileType1: "moves",
      PopularTranslations: [], //热门话题
      imageList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      openpic: false,
      openvideo: false,
      videosrc: "",
      videosrc1: "",
      centerDialogVisible: false, //投票
      wordlist: ["文字", "图片"], //投票的切换
      wordindex: 0, //投票的下标
      options: [
        {
          value: "1",
          label: "最多选一项",
        },
        {
          value: "2",
          label: "最多选两项",
        },
        {
          value: "3",
          label: "最多选三项",
        },
      ],
      value: "",
      tags: ["一天", "一周", "自定义"],
      tagsindex: 0,
      imageList2: [],
      datetime3: "",
      biaoqianvalue: "",
      votewordlist: [{ value: "" }],
      votetof: false,
    };
  },
  created() {
    this.imagesValue = imgUrl();
    this.getForumthemelist();
  },
  methods: {
    handleClick(tab, event) {
    },
    switchbtn(index) {
      this.btnindex = index;
    },
    //获取热门话题
    getForumthemelist() {
      postD(ForumthemelistApi()).then((res) => {
        if (res.code == 200) {
          console.log(res.list);
          this.PopularTranslations = res.list;
          this.$emit('remenlist',res.list)
        }
      });
    },
    //图片上传
    handleAvatarSuccesser1(res, file, fileList) {
      this.imageList = fileList;
    },
    //查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //图片上传前
    //图片上传前
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
    //删除图片
    fileRemove(file, fileList) {
      this.imageList = fileList;
    },
    //视频
    handleResponse(response, file) {
      this.videosrc = response.url;
      this.videosrc1 = response.url;
      return URL.createObjectURL(file.raw);
    },
    delete1() {
      this.videosrc = "";
      this.videosrc1 = "";
    },
    changewordpic(index) {
      this.wordindex = index;
      this.imageList2 = [];
    },
    //投票图片上传
    handleAvatarSuccesser2(res, file, fileList) {
      this.imageList2 = fileList;
    },
    //投票删除图片
    fileRemove2(file, fileList) {
      this.imageList2 = fileList;
    },
    choosetag(index) {
      this.tagsindex = index;
    },
    //投票增加文字列表
    addvotelist() {
      this.votewordlist.push({ value: "" });
    },
    delwordlist(index) {
      this.votewordlist.splice(index, 1);
    },
    //话题选择
    handleCommand(command) {
      // this.content='#'+command+'#'+this.content
      // this.content
    },
    //打开投票弹出
    OpenVotingList() {
      if (!this.votetof) {
        this.centerDialogVisible = true;
      }
    },

    //变成话题
    // bianht(e){
    //   var count =0;
    //   for( let i of this.content){
    //     if(i=='#'){
    //       count++
    //     }
    //   }
    //   if(count%2!=0){
    //     // this.content.slice(1)
    //     this.content = this.content.replace(/^\s+|\s+$/g,'');
    //         this.content=this.content.concat('#').concat(" ")
    //     // this.content= this.content.replace(/\r|\n/ig,"")

    //   }
    // },
    //确定投票按钮
    confirmVote() {
      this.centerDialogVisible = false;
      this.votetof = true;
    },

    //发布帖子
    goForum() {
      var tmp = [];
      if (this.videosrc1 != "") {
        tmp.push(this.videosrc1);
      }
      this.imageList.forEach((item, i) => {
        tmp.push(item.response.url);
      });

      const date = new Date();
      // var timeStamp1=Date.parse(date);
      if (this.tagsindex == 0) {
        var enddata = date.getTime() + 86400000;
        enddata = timestampToTime(enddata);
      } else if (this.tagsindex == 1) {
        var enddata = date.getTime() + 604800000;
        enddata = timestampToTime(enddata);
      } else if (this.tagsindex == 2) {
        var enddata = this.datetime3.getTime();
        enddata = timestampToTime(enddata);
      }

      let nowitem = [];
      if (this.wordindex == 0) {
        for (let i of this.votewordlist) {
          let params = { item: i.value, is_img: 0 };
          nowitem.push(params);
        }
      } else {
        for (let i of this.imageList2) {
          let params = { item: i.response.url, is_img: 1 };
          nowitem.push(params);
        }
      }

      var themeid = null;
      var theme = null;
      for (let i of this.PopularTranslations) {
        if (i.title == this.biaoqianvalue) {
          themeid = i.id;
        } else {
          theme = this.biaoqianvalue;
        }
      }

      if (this.votetof) {
        var params = {
          is_circle: this.is_circle == 1 ? 1 : null,
          circle_id: this.circle_id || null,
          title: this.title,
          thumb: tmp.join(",") || "",
          description: this.content,
          is_voto: 1,
          style:this.styless,
          method: this.value, //投票方式
          voto_start_time: timestampToTime(date.getTime()), //投票开始
          voto_end_time: enddata,
          item: nowitem, //投票选择项
          theme_id: themeid, //
          theme: theme, //话题
        };
      } else {
        var params = {
          is_circle: this.is_circle == 1 ? 1 : null,
          circle_id: this.circle_id || null,
          title: this.title,
          style:this.styless,
          thumb: tmp.join(",") || "",
          description: this.content,
          is_voto: 0,
          theme_id: themeid, //
          theme: theme, //话题
        };
      }
      postD(ForumReleaseApi(), params).then((res) => {
        if (res.code == 200) {
          this.$message(res.msg);
          this.reload()
        } else {
          this.$message(res.msg);
        }
      });
    },
  },
};
</script>


<style lang="less" scoped>
.leftBox {
  width: 100%;
  // margin-right: 20px;
  .postbox {
    width: 100%;
    // height: 300px;
    background: #ffffff;
    border-radius: 6px 6px 6px 6px;
    padding: 20px 40px;
    /deep/.el-radio__input.is-checked .el-radio__inner {
      background: #00b567 !important;
    }
    /deep/.el-radio__label {
      color: #999999 !important;
    }
    /deep/.el-radio__input.is-checked + .el-radio__label {
      color: #333333 !important;
    }
    /deep/.el-radio.is-bordered.is-checked {
      border-color: #00b567 !important;
    }
    .postbtn {
      width: 200px;
      height: 40px;
      background: #1677ff;
      border-radius: 4px 4px 4px 4px;
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
    .picvidbox {
      margin-top: 16px;
      margin-bottom: 8px;
      display: flex;
      .picvid {
        padding: 0 20px;
        width: 108px;
        line-height: 10px;
        border-left: 2px solid #dddddd;
        border-right: 2px solid #dddddd;
        img {
          width: 26px;
          height: 26px;
        }
      }
    }
    .choosewhat {
      width: 1120px;
      height: 80px;
      padding-left: 30px;
      margin: 0 auto;
      background: #f5f5f5;
      border-radius: 6px 6px 6px 6px;
      opacity: 1;
      img {
        height: 26px;
        width: 26px;
      }
    }

    /deep/.el-upload-dragger {
      width: 148px !important;
      height: 148px !important;
      background-color: #fbfdff;
    }
  }
}
// 投票
/deep/.el-dialog {
  height: auto !important;
}
.wordorpic {
  margin-left: 20px;
  width: 200px;
  height: 40px;
  background: #ffffff;
  border-radius: 20px 20px 20px 20px;
  opacity: 1;
  border: 1px solid #0c032e;
  line-height: 40px;
  text-align: center;
  margin-bottom: 22px;
  .word {
    width: 99px;
    height: 38px;
    color: #999999;
  }
  .wordactive {
    background: linear-gradient(180deg, #0c032e 0%, #5c5673 100%);
    border-radius: 18px 18px 18px 18px;
    color: #fff;
  }
}
.wordadd {
  // padding-left: 20px;
  margin-top: 10px;
  /deep/.el-input__inner {
    background-color: #f5f5f5;
    // height: 40px;
  }
  img {
    margin-left: 10px;
    height: 20px;
    width: 20px;
  }
}
.addchoose {
  padding-left: 20px;
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #0c032e;
  margin-top: 20px;
  margin-bottom: 40px;
}
.chosebox1 {
  height: 60px;
  padding: 20px;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  .tags {
    width: 60px;
    height: 30px;
    margin-left: 10px;
    background: #eeeeee;
    border-radius: 15px 15px 15px 15px;
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 30px;
    text-align: center;
  }
  .tagactive {
    background: #ffdc00;
  }
}
</style>