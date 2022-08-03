<template>
  <div>
    <div class="line1body">
      <div class="seatch">
        <el-input
          placeholder="请输入内容"
          v-model="paramsId.username"
        ></el-input>

        <div class="MemberEvents">
          <div class="delValue" @click="addInvitation">
            <span>确认邀请</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postD } from "@/api";
import {CircleInvitationApi} from "@/urls/wsUrl.js"
export default {
  data() {
    return {
      paramsId: {
        circle_id: "",
        username: "",
      },
    };
  },
  created() {
      this.paramsId.circle_id = this.$route.params.id;
  },
  methods: {
    async addInvitation() {
      const addInvitations = await this.$confirm(
        "此操作将邀请该成员, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (addInvitations !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (addInvitations === "confirm") {
        
        postD(CircleInvitationApi(),this.paramsId).then(res=>{
          if (res.code == "200") {
            this.$message({
              offset: 80,
              type: "success",
              message: "邀请成功",
            });
            this.getMemberList()
          } else {
            this.$message({
              offset: 80,
              type: "error",
              message: res.msg,
            });
          }
        })
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-input__inner {
  width: 400px;
  height: 40px;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px solid #dfdfdf;
}
.line1body {
  padding: 20px 180px;
  .seatch {
    height: 40px;
    display: flex;
    .el-input {
      width: 400px;
    }
    .Isseatch {
      cursor: pointer;
      width: 80px;
      height: 40px;
      background: #dfdfdf;
      border-radius: 4px 4px 4px 4px;
      i {
        font-size: 14px;
        line-height: 40px;
        color: white;
      }
      span {
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 19px;
        margin-left: 5px;
      }
    }
    .MemberEvents {
      margin-left: auto;
      display: flex;
      .delValue {
        cursor: pointer;
        width: 120px;
        height: 40px;
        background: linear-gradient(180deg, #0c032e 0%, #5c5673 100%);
        border-radius: 3px 3px 3px 3px;
        margin-left: 20px;
        span {
          font-size: 16px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 40px;
        }
      }
    }
  }
}
</style>