<template>
  <div>
    <div class="line1">
      <add-not />
      <div class="line1_ref" @click="Rsh">刷新</div>
    </div>
    <div class="notValueStyle" v-for="item in NoticeValue" :key="item.id">
      <div class="notValueStyleValue">
        <div class="notValueStyleValuePadding">
          <div class="notValueDivStyle">{{ item.title }}</div>
          <span>{{ item.description }}</span>
        </div>
      </div>
      <div class="notBorder"></div>
      <div class="notOptions">
        <div class="notHeader">
          <el-image :src="imagesValue + NotUser.headimg" class="userImg">
          </el-image>
        </div>
        <div class="notTitle">
          <span>{{ NotUser.username }}</span>
        </div>
        <div class="notTime">
          <span>{{ item.create_time }}</span>
        </div>
        <div class="botoptions">
          <template>
            <detils-not :detilsId="item.id" />
            <edit-not :editId="item.id" />
            <div class="botDel" @click="addDel(item.id)"><span>删除</span></div>
          </template>
        </div>
      </div>
    </div>
    <div style="width:1280px;margin:20px auto" v-if="notId.totalResult.length >10">
      <vxe-pager
        :current-page="notId.offset"
        :page-size="notId.limit"
        :total="notId.totalResult"
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
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <div class="ssss">
        <span>确认删除本条圈子公告吗？</span>
      </div>
      <div class="dialog-footer">
        <span>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="delNot">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getListwApi, circle_noticeDelApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import addNot from "./NoticeOption/addNot.vue";
import { imgUrl } from "@/assets/js/modifyStyle";
import editNot from "./NoticeOption/editNot.vue";
import detilsNot from "./NoticeOption/detilsNot.vue";
export default {
  components: { addNot, editNot, detilsNot },
  provide() {
    return {
      notValue: this.notValue,
    };
  },
  data() {
    return {
      notList: [],
      notId: {
        id: "",
        limit: 10,
        offset: 1,
        totalResult:0
      },
      imagesValue: "",
      NotUser: [],
      NoticeValue: [],
      dialogVisible: false,
      DelNotID: {
        id: "",
      },
    };
  },
  created() {
    this.imagesValue = imgUrl();
    this.notValue();
  },
  methods: {
    notValue() {
      this.notId.id = this.$route.params.id;
      postD(getListwApi(), this.notId).then((res) => {
        console.log(res);
        this.NoticeValue = res.data.notice;
        this.NotUser = res.data.circle;
        this.notId.totalResult = res.data.notice.length;
      });
    },
    Rsh() {
      this.notValue();
    },
    addDel(val) {
      this.dialogVisible = true;
      this.DelNotID.id = val;
    },
    delNot() {
      postD(circle_noticeDelApi(), this.DelNotID).then((res) => {
        if (res.code == "200") {
          this.$message.success("公告删除成功");
          this.notValue();
          this.dialogVisible = false;
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
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(getListwApi(), this.notId).then((res) => {
        this.NoticeValue = res.data.notice;
        this.NotUser = res.data.circle;
        this.notId.totalResult = res.data.notice.length;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.line1 {
  width: 1280px;
  margin: 20px auto;
  display: flex;
  .line1_left {
    width: 120px;
    height: 40px;
    background: #1677ff;
    border-radius: 3px 3px 3px 3px;
    line-height: 40px;
    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
    cursor: pointer;
  }
  .line1_ref {
    margin-left: auto;
    width: 80px;
    height: 40px;
    background: #00b567;
    border-radius: 4px 4px 4px 4px;
    line-height: 40px;
    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
    cursor: pointer;
  }
}
.lin2_val {
  margin: 0 auto;
  width: 1280px;
  height: 200px;
  background: #ffffff;
}

.notValueStyle {
  height: 200px;
  background: #ffffff;
  border-radius: 0px 0px 0px 0px;
  width: 1280px;
  margin: 20px auto;

}

.notValueStyleValue {
  text-align: left;
  height: 140px;

  .notValueStyleValuePadding {
    padding: 30px 40px;

    .notValueDivStyle {
      height: 22px;
      font-size: 16px;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #333333;
      line-height: 0px;
    }
  }
}

.notBorder {
  border: 1px solid #dddddd;
}

.notOptions {
  display: flex;
  padding: 20px;
}

.notTitle {
  padding: 0px 0px 0px 10px;

  span {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #3d444d;
    line-height: 0px;
  }
}

.notTime {
  padding-left: 20px;

  span {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 0px;
  }
}

.botoptions {
  margin-left: auto;
  display: flex;

  .botDel {
    cursor: pointer;
    margin-top: -10px;
    width: 80px;
    height: 40px;
    background: #ffffff;
    border-radius: 3px 3px 3px 3px;
    opacity: 1;
    border: 1px solid #0c032e;

    span {
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 40px;
    }
  }
}

.dialog-footer {
  padding-top: 15px;

  .el-button--default {
    width: 160px;
    height: 40px;
    background: #ffffff;
    border-radius: 20px 20px 20px 20px;
    opacity: 1;
    border: 1px solid #0c032e;
  }

  .el-button--primary {
    width: 160px;
    height: 40px;
    background: linear-gradient(180deg, #0c032e 0%, #5c5673 100%);
    border-radius: 20px 20px 20px 20px;
  }
}

.ssss {
  height: 100px;
  position: relative;

  span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.notHeader {
  padding-left: 20px;
}

.userImg {
  width: 32px;
  height: 32px;
  background: #e3e8ef;
  margin-top: -5px;
  border-radius: 50%;
}
</style>