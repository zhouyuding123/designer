<template>
  <div>
    <div class="worksBody">
      <div class="worksDiv">
        <div class="headimagephoto" @click="goMyDetil(WorksShowData.username)">
          <el-image
            :src="imagesValue + WorksShowData.headimage"
            alt=""
            class="headStyle"
          />
        </div>
        <div class="nicknameValue">
          <div class="name_nickname" @click="goMyDetil(WorksShowData.username)">
            <div class="nickname_span">
              <span>{{ WorksShowData.nickname }}</span>
            </div>
            <div class="top">
              <span>一级设计师</span>
            </div>
          </div>
          <div class="fans_num">
            <span>粉丝数 123</span>
          </div>
        </div>
        <div class="buttons">
          <div class="button_follow" @click="gocrowd" v-if="WorksShowData.username ==myname">
            <span>发起众筹</span>
          </div>
          <div class="button_follows" @click="gocrowds" v-if="WorksShowData.username ==myname">
            <span>修改作品</span>
          </div>
          <div class="button_follows" @click="gocrowds" v-if="WorksShowData.username !==myname">
            <span>关注</span>
          </div>

        </div>
      </div>
      <!-- <div class="shaped" style="height:20px"></div> -->
      <div class="worksDiv2" style="margin-top: 20px">
        <div class="worksDiv2line1">
          <div class="line1_value">
            <p>{{ WorksShowData.title }}</p>
            <span>{{ WorksShowData.create_time }}</span>
          </div>
          <div class="line1_Collection">
            <div>
              <img
                src="@/assets/imgers/icon/ic_favorite_border_48px@2x.png"
                style="width: 32px; height: 32px"
                alt=""
              />
              <p>123</p>
            </div>
            <div>
              <img
                src="@/assets/imgers/icon/ic_chat_bubble_outline_48px@2x.png"
                style="width: 32px; height: 32px"
                alt=""
              />
              <p>123</p>
            </div>
            <div>
              <img
                src="@/assets/imgers/icon/ic_star_border_24px@2x.png"
                style="width: 32px; height: 32px"
                alt=""
              />
              <p>123</p>
            </div>
          </div>
        </div>

        <div class="worksDiv2line2">
          <span>{{ WorksShowData.description }}</span>
        </div>
        <div v-for="item in imgs" :key="item.item" class="imgs">
          <video v-if="item.split('/')[0] == 'moves' && item != ''" controls>
            <source :src="imagesValue + item" type="video/mp4" />
            <source :src="imagesValue + item" type="video/ogg" />
          </video>
          <img
            :src="imagesValue + item"
            alt=""
            v-if="item.split('/')[0] == 'images' && item != ''"
          />
        </div>
        <div v-for="(item, index) in imgsList" :key="index">
          <el-image
            style="max-width: 1200px; margin-bottom: 20px"
            :src="imagesValue + item"
            :preview-src-list="showimgsList"
          >
          </el-image>
        </div>
      </div>
      <div class="worksDiv3">
        <div class="worksDiv3line1">
          <span>作品信息</span>
        </div>
        <div class="worksDiv3line2">
          <div>
            <span class="worksline1">作品类别</span
            ><span class="worksline1Value">{{
              WorksShowData.prodtuc_type
            }}</span>
          </div>
          <div>
            <span class="worksline1">上传时间</span>
            <span class="worksline1Value">{{ WorksShowData.create_time }}</span>
          </div>
          <div>
            <span class="worksline1">作品版权</span
            ><span class="worksline1Value" v-if="WorksShowData.cert == ''"
              >此作品还未进行版权认证</span
            >
            <span class="worksline1Value" v-else
              >此作品已在深圳数字作品备案中心备案，可
              <el-image
                :src="imagesValue + djimg"
                style="width: 33px; height: 16px; margin-top: 3px"
                :preview-src-list="srcList"
              >
              </el-image>
              查看证书详情</span
            >
          </div>
          <div class="lastDiv">
            <span class="worksline1">作品标签</span>
            <span class="worksline1Values"
              ><el-tag type="info" v-for="items in labels" :key="items.item"
                ><span>{{ items }}</span></el-tag
              >
            </span>
          </div>
        </div>
        <div class="shaped"></div>
        <div class="bottomValue">
          <div class="statement">
            声明：本站内用户发表的所有内容及言论仅代表其本人，并不反映本站意见及观点。
          </div>
          <div class="operation" @click="gojsshowtrue">
            <div class="complaint">
              <img
                src="@/assets/imgers/icon/12819@2x.png"
                style="width: 20px; height: 20px"
                alt=""
              />
            </div>
            <span>举报</span>
          </div>
        </div>
        <div class="shaped"></div>
        <div class="worksDiv3">
          <div class="worksDiv3line1">
            <span>相关作品</span>
          </div>
          <div class="myWorkWidth">
            <div
              v-for="item in relevantList"
              :key="item.id"
              class="myWorkBody"
              @click="relevant(item.id)"
            >
              <img :src="imagesValue + item.thumb" alt="" />
              <div>{{ item.title }}</div>
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
                <!-- <img src="@/assets/imgers/爱心.png" alt="" /> -->
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
      </div>
    </div>
    <el-dialog title="举报" :visible.sync="dialogVisible" width="30%">
      <div v-if="jbshow === 1">
        <el-radio v-model="radio" label="1">侵权</el-radio>
        <el-radio v-model="radio" label="2">政治有害</el-radio>
        <el-radio v-model="radio" label="2">低俗色情</el-radio>
        <el-radio v-model="radio" label="2">暴力恐怖</el-radio>
        <el-radio v-model="radio" label="2">诈骗</el-radio>
        <el-radio v-model="radio" label="2">侮辱、恶意及辱骂行为</el-radio>
      </div>
      <div v-if="jbshow == 2" class="zxcssss">
        <el-radio v-model="radios" label="1"
          >我是版权费/原作者，该内容侵犯了我的权益</el-radio
        >
        <el-radio v-model="radios" label="2"
          >我的热心网友，该内容侵犯了他人的权益</el-radio
        >
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea"
        >
        </el-input>
      </div>
      <div style="padding: 30px" v-if="jbshow === 1">
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="gojbshow">确 定</el-button>
        </span>
      </div>
      <div style="padding: 30px" v-if="jbshow == 2">
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </div>
    </el-dialog>
    <el-dialog title="选择众筹对象" :visible.sync="zhongchouShow" width="420px">
      <div>
        <el-radio v-model="radiozhongchou" label="1">不限制</el-radio>
      </div>
      <div>
        <el-radio v-model="radiozhongchou" label="2">加盟/联盟</el-radio>
      </div>
      <div style="padding: 20px">
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="gozhongchou">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getMyWorksshowApi,
  designerWorkscomment,
  designerWorksApi,
  MatchworkShowApi
} from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle.js";
import { timestampToTime } from "@/assets/js/time.js";
export default {
  data() {
    return {
      radiozhongchou: "",
      zhongchouShow: false,
      textarea: "",
      jbshow: 1,
      radio: "",
      radios: "",
      WorksShowData: [],
      imagesValue: "",
      imgs: "",
      labels: "",
      comment_list: [],
      commentValue: {
        works_id: "",
        pid: "0",
        content: "",
        fid: "0",
        placehoder: "评论",
      },
      commentValueser: {
        works_id: "",
        pid: "",
        content: "",
        fid: "",
        placehoder: "评论",
      },
      showInput: 0,
      WorksShowDataContent: "",
      imagesthb: [],
      myworkListId: {
        status: 1,
        category: 2,
      },
      relevantList: [],
      imgsList: [],
      showimgsList: [],
      srcList: [],
      djimg: "images/20220809/1660039929693dca3d7cefdf9a5a78c19d03237a55.jpg",
      dialogVisible: false,
      myname:""
    };
  },
  created() {
    this.WorkDetailsList();
    this.mywokList();
   this.myname =  localStorage.getItem('use')
  },
  methods: {
    mywokList() {
      postD(designerWorksApi(), this.myworkListId).then((res) => {
        this.relevantList = res.list.slice(0, 5);
      });
    },
    WorkDetailsList() {
      postD(MatchworkShowApi(), this.$route.params).then((res) => {
        this.WorksShowData = res.data;
        this.imgsList = res.data.imgs.split(",");
        this.imagesValue = imgUrl();
        this.imagesthb = [res.data.thumb];
        var ss = JSON.parse(res.data.content);
        var arr = ss.images.split(",");
        this.imgs = arr;
        if (this.WorksShowData.label.indexOf("，") == -1) {
          var arrs = this.WorksShowData.label.split(",");
          this.labels = arrs;
        } else {
          var arrs = this.WorksShowData.label.split("，");
          this.labels = arrs;
        }

        this.WorksShowDataContent = ss;
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
        this.imgsList.forEach((v) => {
          this.showimgsList.push(this.imagesValue + v);
        });
        res.data.cert.split(",").forEach((v) => {
          this.srcList.push(this.imagesValue + v);
        });
      });
    },
    fullTime(val) {
      let newDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(timestampToTime(val));
      return newDate[0];
    },
    CommentValues() {
      this.commentValue.works_id = this.$route.params.id;
      postD(designerWorkscomment(), this.commentValue).then((res) => {
        if (res.code == "200") {
          this.$message.success("已成功评论");
          this.WorkDetailsList();
          this.commentValue.content = "";
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
    comment(e) {
      this.commentValueser.content = "";
      this.showInput = e.id;
      if (e.pid == 0) {
        this.commentValueser.works_id = this.$route.params.id;
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
    zxc() {
      this.commentValueser.works_id = this.$route.params.id;
      postD(designerWorkscomment(), this.commentValueser).then((res) => {
        if (res.code == "200") {
          this.$message.success("已成功评论");
          this.WorkDetailsList();
          this.commentValueser.content = "";
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
    goMyDetil(val) {
      this.$router.push("/DesignerHomepage" + val);
    },
    gofreelist() {
      this.$router.push("/designer_works/getListMF");
    },
    relevant(val) {
      this.$router.replace("/workDetails" + val);
      this.WorkDetailsList();
    },
    gojsshowtrue() {
      this.dialogVisible = true;
    },
    gojbshow() {
      this.jbshow = 2;
    },
    gocrowd() {
      this.zhongchouShow = true;
    },
    gocrowds() {
      let command = {
        id: this.$route.params.id,
      };
      this.$router.push({ path: "/UploadWorks", query: { id: command.id } });
    },

    gozhongchou() {
      this.$router.push("/crowd" + this.$route.params.id);
      this.zhongchouShow = false;
    },
  },
};
</script>

<style>
 .el-image-viewer__close {
  margin-top: 30px !important;
}
</style>

<style lang="less" scoped>
/deep/.el-radio__label {
  font-weight: bold;
  color: #999999;
  margin-top: 3px;
}

/deep/.el-radio__input.is-checked + .el-radio__label {
  font-weight: bold;
  color: #333333;
}
/deep/.el-radio__input.is-checked .el-radio__inner {
  color: #00b567;
  background-color: #00b567;
}
/deep/.el-radio__inner {
  width: 20px;
  height: 20px;
}
/deep/.el-radio__inner::after {
  width: 20px;
  height: 20px;
  background-image: url("@/assets/imgers/单选.png");
}
@import url("./screeningDetial.less");
</style>