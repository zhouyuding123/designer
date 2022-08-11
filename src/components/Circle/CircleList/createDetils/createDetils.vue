<template>
  <div>
    <div class="detilBody">
      <div class="detilnr">
        <div class="firstLine">
          <el-image :src="imagesValue + detilsValues.headimage"></el-image>
          <span>{{ detilsValues.nickname }}</span>
          <div class="times">
            <span>{{ detilsValues.update_time }}</span>
          </div>
        </div>
        <div class="SecondLine">
          <span>{{ detilsValues.title }}</span>
        </div>
        <div
          class="ThirdLine"
          v-if="detilsValues.theme !== '' && detilsValues.theme !== null"
        >
          <div>
            <span> #{{ detilsValues.theme }} </span>
          </div>
        </div>
        <div class="FourthLine">
          <div>
            <span>{{ detilsValues.description }}</span>
          </div>
        </div>
        <div
          class="fifthLine"
          v-if="
            detilsValues.thumb !== '' &&
            detilsValues.thumb !== null &&
            detilsValues.thumb
          "
        >
          <div v-for="item in detilsValues.thumb.split(',')" :key="item.id">
            <el-image :src="imagesValue + item"></el-image>
          </div>
        </div>
        <div class="fifthLine" v-if="detilsValues.is_voto == 1">
          <div class="isVoto">
            <div class="isVotoBody">
              <div class="isVotoline1"><span>选哪个</span></div>
              <div class="isVotoline2">
                <span>{{ votoCountnum }}人参与</span>
              </div>
              <div class="placeOrder" v-if="votoImages == 1">
                <div class="isVotoline3">
                  <el-checkbox-group
                    v-model="checkedCities"
                    :min="1"
                    :max="detilsValues.method"
                    @change="changelabel"
                  >
                    <el-checkbox
                      v-for="item in detilsValues.voto"
                      :label="item.id"
                      :key="item.id"
                      class="radioDiv"
                    >
                      <el-image :src="imagesValue + item.item"></el-image>
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
              <div class="textBody" v-if="votoImages == 0">
                <div class="textpadding">
                  <el-checkbox-group
                    v-model="checkedCities"
                    :min="1"
                    :max="detilsValues.method"
                    @change="changelabel"
                  >
                    <el-checkbox
                      v-for="item in detilsValues.voto"
                      :label="item"
                      :key="item.id"
                      class="checkboxText"
                    >
                      {{ item.item }}
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
              <div class="votoTpLi">
                <div v-if="codeValue == 200">
                  <div class="votoTs" @click="voteCur">
                    <span>投票</span>
                  </div>
                </div>
                <div v-if="codeValue == -200">
                  <div class="votoTser" @click="voteCur">
                    <span>投票</span>
                  </div>
                </div>
                <div class="votoTspan">
                  <span>单选，投票后可查看结果</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Line6">
          <span>
            {{ detilsValues.content }}
          </span>
        </div>
        <div class="Line7">
          <div class="Line7Border">
            <span class="c_count"
              >共{{ detilsValues.comment_count }}条回复</span
            >
            <div class="dianzshouc">
              <img src="@/assets/imgers/cr爱心.png" alt="" class="imglove" /><i
                >12</i
              >
              <img
                src="@/assets/imgers/cr收藏.png"
                alt=""
                class="imgCollection"
              /><i>12</i>
              <div></div>
            </div>
          </div>
        </div>
        <div class="comment">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="commentValue.content"
          >
          </el-input>
          <div class="Comments">
            <div class="Comment" @click="CommentValues">
              <span>发表评论</span>
            </div>
          </div>
          <div
            class="CommentList"
            v-for="items in comment_list"
            :key="items.id"
          >
            <div>
              <img
                :src="imagesValue + items.headimage"
                alt=""
                style="
                  width: 60px;
                  height: 60px;
                  background: #e3e;
                  border-radius: 50%;
                "
              />
            </div>
            <div class="CommentListTitle">
              <div class="CommentListTitles">
                <div class="CommentListTitleNickname">
                  <span>{{ items.nickname }}</span>
                </div>
                <div class="CommentListTitletime">
                  <span>{{ fullTime(items.create_time) }}</span>
                </div>
              </div>
              <div class="CommentListTitleContent">
                <span>{{ items.content }}</span>
              </div>
              <div class="CommentListTitleax">
                <img src="@/assets/imgers/爱心.png" alt="" />
                <span>123</span>
                <p @click="comment(items)">回复</p>
              </div>
              <div v-if="showInput == items.id">
                <el-input
                  v-model="commentValueser.content"
                  :placeholder="'回复@' + items.nickname + ':'"
                ></el-input>
                <div style="width: 100%">
                  <div @click="zxc" class="commentStyle"><span>发布</span></div>
                </div>
              </div>
              <div class="CommentListTitleComment" v-if="items.chridren === ''">
                <div v-for="(item, index) in items.chridren" :key="index">
                  <div>{{ item.nickname }}:{{ item.content }}</div>
                  <div
                    @click="comment(item)"
                    style="text-align: right"
                    class="reply"
                  >
                    <span>回复</span>
                  </div>
                </div>
              </div>
              <div class="CommentListTitleComment" v-if="items.chridren != ''">
                <div
                  v-for="(item, index) in items.chridren"
                  :key="index"
                  style="margin-top: 10px"
                >
                  <div>
                    {{ item.nickname }} {{ item.type }} {{ item.people }}:{{
                      item.content
                    }}
                  </div>
                  <div
                    @click="comment(item)"
                    style="text-align: right"
                    class="reply"
                  >
                    <span>回复</span>
                  </div>
                  <div v-if="showInput == item.id">
                    <el-input
                      v-model="commentValueser.content"
                      :placeholder="'回复@' + item.nickname + ':'"
                    ></el-input>
                    <div>
                      <div @click="zxc" class="commentStyle">
                        <span>发布</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="Line8">
          <div class="Line8Input">
            <el-input
              v-model="Line8InputValue"
              placeholder="留下你想说的话吧"
              type="textarea"
              resize="none"
            ></el-input>
          </div>
          <div class="Line8InputButton">
            <div class="Line8InputButtonValue">
              <p @click="CommentValue"><span>发表评论</span></p>
            </div>
          </div>
        </div>
        <div class="line9">
          <div
            v-for="(item, index) in contentValue"
            :key="item.id"
            v-show="index < num"
          >
            <div class="line9Value">
              <el-image :src="imagesValue + detilsValues.headimage"></el-image>
              <span>{{ detilsValues.nickname }}</span>
              <div class="pltimes">
                <span>{{ item.update_time }}</span>
              </div>
            </div>
            <div class="line9content">
              <span>{{ item.content }}</span>
            </div>
            <div class="line9Love">
              <img src="@/assets/imgers/cr爱心.png" alt="" />
            </div>
          </div>
        </div>
        <div class="bottonStyle">
          <span @click="morecomment">{{ txt }}</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { postD } from "@/api/index.js";
import { imgUrl } from "@/assets/js/modifyStyle.js";
import { timestampToTime } from "@/assets/js/time.js";
import {
  ForumShowForumApi,
  ForumCommentApi,
  ForumSeteVotoApi,
  ForumVotoApi,
} from "@/urls/wsUrl.js";
export default {
  data() {
    return {
      detilsId: {
        id: "",
      },
      detilsValues: [],
      imagesValue: "",
      Line8InputValue: "",
      Comment: {
        forum_id: "",
        pid: "",
        content: "",
      },
      contentValue: [],
      num: 3,
      isShow: true,
      txt: "点击查看更多评论",
      // 是否投票
      votoValue: {
        id: "",
      },
      votoCount: [],
      votoCountnum: "",
      votoImages: [],
      checkedCities: [],
      arr: [],
      arrs: [],
      checkedId: {
        id: "",
        voto_id: "",
      },
      imagesShow: false,
      imagesShows: false,
      codeValue: "",
      imgList: [],
      commentValue: {
        forum_id: "",
        pid: "0",
        content: "",
        fid: "0",
        placehoder: "评论",
      },
      commentValueser: {
        forum_id: "",
        pid: "",
        content: "",
        fid: "",
        placehoder: "评论",
      },
      comment_list: [],
      showInput: 0,
    };
  },
  created() {
    this.detilsId.id = this.$route.params.id;
    this.Comment.forum_id = this.$route.params.id;
    this.checkedId.id = this.$route.params.id;
    this.detilsValue();
    this.votoState();
  },
  methods: {
    detilsValue() {
      postD(ForumShowForumApi(), this.detilsId).then((res) => {
        var tmp = [];
        res.data.comment_list.forEach((item, i) => {
          if (item.fid == 0) {
            tmp.push({
              content: item.content,
              create_time: item.create_time,
              fid: item.fid,
              headimage: item.headimage,
              id: item.id,
              nickname: item.nickname,
              pid: item.pid,
              username: item.username,
              chridren: [],
            });
          }
        });
        tmp.forEach((item, i) => {
          res.data.comment_list.forEach((list, j) => {
            if (item.id == list.fid) {
              item.chridren.push(list);
            }
          });
        });
        tmp.forEach((item, i) => {
          item.chridren.forEach((list, j) => {
            list.type = "";
            list.people = "";
            res.data.comment_list.forEach((jk, k) => {
              if (jk.pid != 0) {
                if (list.pid == jk.id) {
                  (list.type = "回复"), (list.people = jk.nickname);
                }
              }
            });
          });
        });
        this.comment_list = tmp;
        this.detilsValues = res.data;
        this.imagesValue = imgUrl();
        this.contentValue = res.data.comment_list;
        // this.imgList = this.detilsValues.thumb.split(",");
        // 投票数据
        this.votoValue = res.data.voto;
        this.votoValue.forEach((v) => {
          this.votoCount.push(v.count);
          this.votoImages = v.is_img;
          this.votoCountnum = eval(Object.values(this.votoCount).join("+"));
        });
      });
    },
    votoState() {
      postD(ForumSeteVotoApi(), this.detilsId).then((res) => {
        this.codeValue = res.code;
      });
    },
    // 评论
    CommentValue() {
      this.Comment.content = this.Line8InputValue;
      postD(ForumCommentApi(), this.Comment).then((res) => {
        if (res.code == "200") {
          // this.$message.success("状态修改成功");
          this.$message({
            offset: 80,
            type: "success",
            message: "状态修改成功",
          });
          this.detilsValue();
        } else if (res.code == "-200") {
          this.$message.error("参数错误，或暂无数据");
        } else if (res.code == "-201") {
          this.$message.error("未登陆");
        } else if (res.code == "-203") {
          this.$message.error("对不起，你没有此操作权限");
        } else {
          this.$message.error("注册失败，账号已存在");
        }
      });
    },
    // 更多
    morecomment() {
      this.isShow = !this.isShow;
      this.num = this.isShow ? 3 : this.contentValue.length;
      this.txt = this.isShow ? "点击查看更多评论" : "收起";
    },
    // 投票wenzzi
    voteCur() {
      this.arr.forEach((v) => {
        this.arrs.push(v.id);
      });
      this.checkedId.voto_id = this.arrs.toString();
      postD(ForumVotoApi(), this.checkedId).then((res) => {
        if (res.code == "200") {
          this.$message({
            offset: 80,
            type: "success",
            message: "投票成功",
          });
          this.detilsValue();
        } else {
          this.$message({
            offset: 80,
            type: "error",
            message: res.msg,
          });
        }
      });
    },
    voteCurs() {
      this.arr.forEach((v) => {
        this.arrs.push(v);
      });
      this.checkedId.voto_id = this.arrs.toString();
      postD(ForumVotoApi(), this.checkedId).then((res) => {
        if (res.code == "200") {
            this.$message({
              offset: 80,
              type: "success",
              message: "投票成功",
            });
            this.detilsValue();
          } else {
            this.$message({
              offset: 80,
              type: "error",
              message: res.msg,
            });
          }
      });
    },
    changelabel(val) {
      this.arr = val;
    },
    CommentValues() {
      this.commentValue.forum_id = this.$route.params.id;
      postD(ForumCommentApi(), this.commentValue).then((res) => {
        if (res.code == "200") {
          this.$message({
            offset: 80,
            type: "success",
            message: "已成功评论",
          });
          this.detilsValue();
        } else {
          this.$message({
            offset: 80,
            type: "error",
            message: res.msg,
          });
        }
      });
    },
    comment(e) {
      this.showInput = e.id;
      if (e.pid == 0) {
        this.commentValueser.forum_id = this.$route.params.id;
        this.commentValueser.pid = e.id;
        this.commentValueser.content = "";
        this.commentValueser.fid = e.id;
        this.placehoder = "评论" + e.nickname;
      } else {
        this.commentValueser.pid = e.id;
        this.commentValueser.fid = e.fid;
        this.placehoder = "回复" + e.nickname;
      }
    },
    fullTime(val) {
      let newDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(timestampToTime(val));
      return newDate[0];
    },
    zxc() {
      postD(ForumCommentApi(), this.commentValueser).then((res) => {
         if (res.code == "200") {
          this.$message({
            offset: 80,
            type: "success",
            message: "已成功评论",
          });
          this.detilsValue();
           this.commentValueser.content = "";
        } else {
          this.$message({
            offset: 80,
            type: "error",
            message: res.msg,
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.detilBody {
  margin: 20px auto ;
  width: 1580px;
  .detilnr {
    width: 100%;
    height: 100%;
    background-color: white;
  }
}
.firstLine {
  text-align: left;
  padding: 30px 30px 35px 30px;
  display: flex;
  .el-image {
    width: 60px;
    height: 60px;
    background: #e3e8ef;
    border-radius: 50%;
  }
  span {
    line-height: 60px;
    padding-left: 20px;
    font-size: 14px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #333333;
  }
  .times {
    flex: 1;
    text-align: right;
    line-height: 60px;
    span {
      font-size: 12px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 0px;
    }
  }
}
.SecondLine {
  text-align: left;
  padding: 0px 30px 30px 30px;
  span {
    font-size: 25px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 0px;
  }
}
.ThirdLine {
  text-align: left;
  padding: 0px 30px 30px 30px;
  div {
    width: 120px;
    height: 20px;
    background: #eeeeee;
    border-radius: 10px 10px 10px 10px;
    text-align: center;
    line-height: 20px;
    span {
      font-size: 12px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #cccccc;
      line-height: 0px;
    }
  }
}
.FourthLine {
  text-align: left;
  padding: 0px 30px 30px 35px;
  div {
    span {
      font-size: 18px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 40px;
    }
  }
}
.fifthLine {
  padding: 0px 30px 30px 30px;
  .el-image {
    width: 600px;
  }
}
.Line6 {
  padding: 0px 30px 60px 30px;
  span {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
  }
}
.Line7 {
  .Line7Border {
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    height: 80px;
    display: flex;
    position: relative;
    .c_count {
      padding-left: 37px;
      line-height: 80px;
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
    }
    .dianzshouc {
      border-top: 1px solid white;
      padding-right: 40px;
      margin-top: 20px;
      position: absolute;
      display: flex;
      top: 0;
      right: 0;
      .imglove {
        width: 32px;
        height: 32px;
      }
      i {
        font-style: normal;
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        margin: 10px;
      }
      .imgCollection {
        margin-left: 80px;
        width: 32px;
        height: 32px;
      }
    }
  }
}
.Line8 {
  padding: 30px 40px;
  .Line8Input {
    background: #f5f5f5;
    border-radius: 6px 6px 6px 6px;
    /deep/.el-textarea {
      .el-textarea__inner {
        height: 160px;
      }
    }
  }
  .Line8InputButton {
    padding-top: 20px;
    display: flex;
    .Line8InputButtonValue {
      margin-left: auto;
      p {
        cursor: pointer;
        width: 160px;
        height: 40px;
        background: #ffffff;
        border-radius: 6px 6px 6px 6px;
        border: 1px solid #0c032e;
        line-height: 40px;
        span {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 0px;
        }
      }
    }
  }
}
.line9 {
  text-align: left;
  padding: 30px 30px 35px 30px;
  .line9Value {
    border-top: 1px solid #dddddd;
    display: flex;
    .el-image {
      margin-top: 20px;
      width: 60px;
      height: 60px;
      background: #e3e8ef;
      border-radius: 50%;
    }
    span {
      margin-top: 20px;
      line-height: 60px;
      padding-left: 20px;
      font-size: 14px;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #333333;
    }
    .pltimes {
      margin-top: 20px;
      flex: 1;
      text-align: right;
      line-height: 60px;
      span {
        font-size: 12px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 0px;
      }
    }
  }
  .line9content {
    padding-left: 130px;
    span {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 0px;
    }
  }
  .line9Love {
    img {
      width: 16px;
      height: 16px;
      margin: 20px 130px;
    }
  }
}
.bottonStyle {
  border-top: 1px solid #dddddd;
  height: 60px;
  span {
    cursor: pointer;
    font-size: 20px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 60px;
  }
}
.isVoto {
  padding: 30px 80px;
  .isVotoBody {
    background-color: #f5f5f5;
    width: 100%;
    height: 380px;
    .isVotoline1 {
      text-align: left;
      padding: 20px 40px 6px;
      span {
        font-size: 20px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 0px;
      }
    }
    .isVotoline2 {
      text-align: left;
      padding-left: 40px;
      padding-top: 6px;
      span {
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 0px;
      }
    }
  }
}
.placeOrder {
  justify-content: center;
  /deep/.el-radio.is-bordered.is-checked::before {
    content: "";
    width: 11px;
    height: 12px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .radioDiv {
    margin-left: 15px;
    margin-top: 10px;
    width: 150px;
    height: 210px;
    background: #ffffff;
    border-radius: 6px 6px 6px 6px;
    opacity: 1;
    box-shadow: 1px 1px 50px rgb(0 21 41 / 18%);
  }
  /deep/.el-radio.is-bordered {
    padding: 0 150px;
  }
  /deep/.el-radio__label {
    padding-left: 0;
  }
  /deep/.el-radio {
    margin-top: 10px;
    width: 140;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-image {
    width: 150px;
    height: 160px;
    background: #f5f5f5;
    border-radius: 6px 6px 0px 0px;
  }
}
.el-radio-group {
  display: flex;
  justify-content: center;
}
.diemPost {
  position: absolute;
  left: 38%;
  top: -30px;
  color: #eeeeee;
}
/deep/.el-checkbox__input {
  position: absolute;
  left: 0;
  bottom: 0;
  margin-left: 45%;
  margin-bottom: 10%;
  .el-checkbox__inner {
    border: 1px solid #00b567;
    border-radius: 50%;
    background-color: #00b567;
  }
}
.votoTpLi {
  position: relative;
  .votoTs {
    cursor: pointer;
    width: 315px;
    height: 40px;
    background: #ffdc00;
    border-radius: 6px 6px 6px 6px;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    margin: 25px auto;
    span {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #0c032e;
      line-height: 40px;
    }
  }
  .votoTser {
    cursor: pointer;
    width: 315px;
    height: 40px;
    background: #999999;
    border-radius: 6px 6px 6px 6px;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    margin: 25px auto;
    text-align: center;
    span {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #0c032e;
      line-height: 40px;
    }
  }
  .votoTspan {
    position: absolute;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    margin: 70px auto;
    span {
      font-size: 10px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 0px;
    }
  }
}
/deep/.el-checkbox__label {
  padding-left: 0;
}
.textBody {
  text-align: left;
  padding-top: 20px;
  padding-left: 40px;
  .el-checkbox {
    display: block;
    margin-right: 0;
  }
  .checkboxText {
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #dddddd;
    /deep/.el-checkbox__input {
      position: absolute;
      margin-left: 0%;
      margin-bottom: 10px;
    }
    /deep/.el-checkbox__label {
      margin-left: 40px;
    }
  }
}
.comment {
  padding: 30px 40px;
}

/deep/.el-textarea__inner {
  resize: none;
  background: #f5f5f5;
  border-radius: 6px 6px 6px 6px;
  height: 160px;
}

.Comments {
  display: flex;
  padding: 20px 0px;
}

.Comment {
  margin-left: auto;
  width: 160px;
  height: 40px;
  background: #ffffff;
  border-radius: 6px 6px 6px 6px;
  border: 1px solid #0c032e;

  span {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 40px;
  }
}

.CommentList {
  padding: 40px;
  border-top: 1px solid #dddddd;
  display: flex;
}

.CommentListTitle {
  padding-left: 30px;
  padding-top: 20px;
  width: 100%;

  .CommentListTitles {
    display: flex;

    .CommentListTitleNickname {
      span {
        font-size: 16px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #333333;
      }
    }

    .CommentListTitletime {
      margin-left: auto;

      span {
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
      }
    }
  }

  .CommentListTitleContent {
    padding-top: 20px;
    text-align: left;

    span {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
    }
  }

  .CommentListTitleax {
    text-align: left;
    padding-top: 23px;
    cursor: pointer;

    img {
      width: 16px;
      height: 16px;
    }

    span {
      font-size: 10px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
    }

    p {
      text-align: right;
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #0177d5;
    }
  }

  .CommentListTitleComment {
    height: auto;
    background-color: #f5f5f5;
    border-radius: 5px 5px 5px 5px;
    text-align: left;
    padding: 10px;
    margin-top: 20px;
  }
}

.commentStyle {
  width: 120px;
  height: 40px;
  background: #1677ff;
  border-radius: 4px 4px 4px 4px;
  margin-left: auto;
  margin-top: 10px;
  text-align: center;

  span {
    font-size: 16px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 40px;
  }
}

.reply {
  cursor: pointer;

  span {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #0177d5;
  }
}
.golist {
  position: absolute;
  width: 100px;
  height: 50px;
  cursor: pointer;
  background: yellow;
  line-height: 50px;
}
</style>
