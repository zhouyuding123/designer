<template>
  <div>
    <div class="bodyTextline">
      <div class="bodyTextlineValue">
        <el-input placeholder="请输入内容" v-model="page1.keyword"></el-input>
        <div class="IsSeatch" @click="seatchInput">
          <i class="el-icon-search"></i>
          <span>搜索</span>
        </div>
        <div class="Refresh" @click="Refresh">
          <i class="el-icon-refresh-right"></i>
          <span>刷新</span>
        </div>
      </div>
    </div>
    <div class="listRight_mar">
      <div class="listRight">
        <el-button @click="SetAsTopS">设为置顶</el-button>
        <el-button @click="SetAsEssence">设为精华</el-button>
        <el-button @click="cancelSetAsTopS">取消置顶</el-button>
        <el-button @click="cancelSetAsEssence">取消精华</el-button>
        <el-button @click="canDels">删除帖子</el-button>
      </div>
    </div>
    <div class="margin-tab">
      <vxe-table
        :data="tableData"
        @checkbox-change="checkboxChangeEvent"
        @checkbox-all="checkboxChangeEvent"
      >
        <vxe-column align="center" type="checkbox" width="50"></vxe-column>
        <vxe-column field="title">
          <template v-slot="scoped">
            <div>
              <div class="topStyle">
                <div>
                  <span v-if="scoped.row.is_top == 1" class="ToppingSpan"
                    >置顶</span
                  >
                </div>
                <div>
                  <span class="EssenceSpan" v-if="scoped.row.is_ess == 1"
                    >精华</span
                  >
                </div>
                <div>
                  <span @click="detailsValue(scoped.row.id)" class="details">{{
                    scoped.row.title
                  }}</span>
                </div>
                <div class="postiongs">
                  <div
                    class="Topping"
                    @click="SetAsTop(scoped.row)"
                    v-if="scoped.row.is_top != 1"
                  >
                    <span>置顶</span>
                  </div>
                  <div
                    class="Topping"
                    @click="SetAsTop(scoped.row)"
                    v-if="scoped.row.is_top != 0"
                  >
                    <span>取消置顶</span>
                  </div>
                  <div
                    class="Topping"
                    @click="SetAsEssencer(scoped.row)"
                    v-if="scoped.row.is_ess != 1"
                  >
                    <span>精华</span>
                  </div>
                  <div
                    class="Topping"
                    @click="SetAsEssencer(scoped.row)"
                    v-if="scoped.row.is_ess != 0"
                  >
                    <span>取消精华</span>
                  </div>
                  <div class="Topping" @click="DeletePost(scoped.row)">
                    <span>删除帖子</span>
                  </div>
                </div>
              </div>
              <div class="Postdescription">
                {{ scoped.row.description }}
              </div>
              <div
                class="tablineValue3"
                v-if="scoped.row.theme !== '' && scoped.row.theme !== null"
              >
                <span>#{{ scoped.row.theme }}</span>
              </div>
              <div v-if="scoped.row.thumb" class="tablineValue4">
                <div
                  v-for="items in scoped.row.thumb.split(',').slice(0, 3)"
                  :key="items"
                  class="imgadde"
                >
                  <div v-if="items.split('/')[0] == 'moves'"></div>
                  <img
                    v-if="items.split('/')[0] == 'images'"
                    :src="imagesValue + items"
                    alt=""
                    style="width: 106px; height: 106px"
                  />
                </div>
              </div>
            </div>
            <div class="tablineValuestablineO">
              <div>
                <img
                  :src="imagesValue + scoped.row.headimage"
                  alt=""
                  style="
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    margin-top: 20px;
                  "
                />
              </div>
              <div class="strollName">
                <span>{{ scoped.row.username }}</span>
              </div>
              <div class="tablineTime">
                <span>{{ funTime(scoped.row.create_time) }}</span>
              </div>
              <div class="tablineoptions">
                <div class="tablineoptionsValue">
                  <div class="tablineoptionsimg">
                    <div>
                      <img src="@/assets/imgers/cr爱心.png" alt="" />
                    </div>
                    <div class="ImgSpan"><span>123</span></div>
                  </div>
                  <div class="tablineoptionsimg">
                    <div>
                      <img src="@/assets/imgers/cr评论.png" alt="" />
                    </div>
                    <div class="ImgSpan"><span>123</span></div>
                  </div>
                  <div class="tablineoptionsimg">
                    <div>
                      <img src="@/assets/imgers/cr收藏.png" alt="" />
                    </div>
                    <div class="ImgSpan"><span>123</span></div>
                  </div>
                  <div class="tablineoptionsimg">
                    <div>
                      <img src="@/assets/imgers/cr转发.png" alt="" />
                    </div>
                    <div class="ImgSpan"><span>123</span></div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </vxe-column>
      </vxe-table>
      <vxe-pager
        :current-page="page1.offset"
        :page-size="page1.limit"
        :total="page1.totalResult"
        :layouts="[
          'PrevPage',
          'JumpNumber',
          'NextPage',
          'FullJump',
          'Sizes',
          'Total',
        ]"
        @page-change="handlePageChangeActivity"
      ></vxe-pager>
    </div>
  </div>
</template>

<script>
import {
  CircleGetCircleForumApi,
  ForumSetTopApi,
  ForumSetEssApi,
  ForumDelForumApi,
} from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
import { timestampToTime } from "@/assets/js/time.js";
export default {
  data() {
    return {
      tableData: [],
      page1: {
        circle_id: "",
        keyword: "",
        offset: 1,
        limit: 10,
        totalResult: 0,
        own: 1,
      },
      imagesValue: "",
      // 删除
      DeletePostValue: {
        id: "",
      },
      Deletes: [],
      DeleteValue: [],
      delids: {
        id: "",
      },
      //置顶
      Topids: [],
      TopidsL: {
        forum_id: "",
        is_top: "1",
      },
      TopidsL1: {
        forum_id: "",
        is_top: "0",
      },
      //选中时将对象保存到arrs中
      Toparrs: [],
      ToparrsValue: [],
      Top: {
        forum_id: "",
        is_top: "1",
      },
      Topone: {
        forum_id: "",
        is_top: "0",
      },
      //精华
      Essids: [],
      EssidsL: {
        forum_id: "",
        is_ess: "1",
      },
      EssidsL1: {
        forum_id: "",
        is_ess: "0",
      },
      //选中时将对象保存到arrs中
      EssarrsValue: [],
      Ess: {
        forum_id: "",
        is_ess: "1",
      },
      EssOne: {
        forum_id: "",
        is_ess: "0",
      },
    };
  },
  created() {
    this.imagesValue = imgUrl();
    this.releaseValue();
  },
  methods: {
    Refresh() {
      this.page1.keyword = "";
      this.page1.offset = 1;
      this.page1.limit = 10;
      this.releaseValue();
    },
    releaseValue() {
      this.page1.circle_id = this.$route.params.id;
      postD(CircleGetCircleForumApi(), this.page1).then((res) => {
        console.log(res);
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    // 获取批量
    checkboxChangeEvent(data) {
      this.ToparrsValue = data.records;
      this.EssarrsValue = data.records;
      this.DeleteValue = data.records;
    },
    funTime(val) {
      return timestampToTime(val);
    },
    // 批量置顶
    async SetAsTopS() {
      const SetAsTopSValue = await this.$confirm(
        "此操作将批量置顶, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (SetAsTopSValue !== "confirm") {
        return this.$message({
          offset: 80,
          type: "info",
          message: "取消置顶",
        });
      }
      if (SetAsTopSValue === "confirm") {
        this.ToparrsValue.forEach((v) => {
          this.Topids.push(v.id);
        });
        this.TopidsL.forum_id = this.Topids.toString();
        postD(ForumSetTopApi(), this.TopidsL).then((res) => {
          if (res.code == "200") {
            this.$message({
              offset: 80,
              type: "success",
              message: "状态修改成功",
            });
            this.releaseValue();
            this.TopidsL.forum_id = "";
            this.Topids = [];
            this.ToparrsValue = [];
          } else {
            this.$message({
              offset: 80,
              type: "error",
              message: res.msg,
            });
          }
        });
      }
    },
    // 批量取消置顶
    async cancelSetAsTopS() {
      const cancelSetAsTopSValue = await this.$confirm(
        "此操作将批量取消置顶, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (cancelSetAsTopSValue !== "confirm") {
        return this.$message({
          offset: 80,
          type: "info",
          message: "取消置顶",
        });
      }
      if (cancelSetAsTopSValue === "confirm") {
        this.ToparrsValue.forEach((v) => {
          this.Topids.push(v.id);
        });
        this.TopidsL1.forum_id = this.Topids.toString();
        postD(ForumSetTopApi(), this.TopidsL1).then((res) => {
          if (res.code == "200") {
            this.$message({
              offset: 80,
              type: "success",
              message: "状态修改成功",
            });
            this.releaseValue();
            this.TopidsL1.forum_id = "";
            this.Topids = [];
            this.ToparrsValue = [];
          } else {
            this.$message({
              offset: 80,
              type: "error",
              message: res.msg,
            });
          }
        });
      }
    },
    // 单个置顶
    async SetAsTop(data) {
      const SetAsTopValue = await this.$confirm(
        "此操作将此条内容设为置顶, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (SetAsTopValue !== "confirm") {
        return this.$message({
          offset: 80,
          type: "info",
          message: "取消置顶",
        });
      }
      if (SetAsTopValue === "confirm") {
        if (data.is_top !== 1) {
          this.Top.forum_id = data.id.toString();
          postD(ForumSetTopApi(), this.Top).then((res) => {
            if (res.code == "200") {
              this.$message({
                offset: 80,
                type: "success",
                message: "置顶成功",
              });
              this.releaseValue();
            } else {
              this.$message({
                offset: 80,
                type: "error",
                message: res.msg,
              });
            }
          });
        } else {
          this.Topone.forum_id = data.id.toString();
          postD(ForumSetTopApi(), this.Topone).then((res) => {
            if (res.code == "200") {
              this.$message({
                offset: 80,
                type: "success",
                message: "取消成功",
              });
              this.releaseValue();
            } else {
              this.$message({
                offset: 80,
                type: "error",
                message: res.msg,
              });
            }
          });
        }
      }
    },
    // 单精华
    async SetAsEssencer(data) {
      const SetAsEssenceOne = await this.$confirm(
        "此操作将选中内容设为精华, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (SetAsEssenceOne !== "confirm") {
        return this.$message({
          offset: 80,
          type: "info",
          message: "取消精华",
        });
      }
      if (SetAsEssenceOne === "confirm") {
        if (data.is_ess !== 1) {
          this.Ess.forum_id = data.id.toString();
          postD(ForumSetEssApi(), this.Ess).then((res) => {
            if (res.code == "200") {
              this.$message({
                offset: 80,
                type: "success",
                message: "精华成功",
              });
              this.releaseValue();
            } else {
              this.$message({
                offset: 80,
                type: "error",
                message: res.msg,
              });
            }
          });
        } else {
          this.EssOne.forum_id = data.id.toString();
          postD(ForumSetEssApi(), this.EssOne).then((res) => {
            if (res.code == "200") {
              this.$message({
                offset: 80,
                type: "success",
                message: "取消精华成功",
              });
              this.releaseValue();
            } else {
              this.$message({
                offset: 80,
                type: "error",
                message: res.msg,
              });
            }
          });
        }
      }
    },
    // 批量精华
    async SetAsEssence() {
      const SetAsEssenceValue = await this.$confirm(
        "此操作将选中内容设为精华, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (SetAsEssenceValue !== "confirm") {
        return this.$message({
          offset: 80,
          type: "info",
          message: "取消精华",
        });
      }
      if (SetAsEssenceValue === "confirm") {
        this.EssarrsValue.forEach((v) => {
          this.Essids.push(v.id);
        });
        this.EssidsL.forum_id = this.Essids.toString();
        postD(ForumSetEssApi(), this.EssidsL).then((res) => {
          if (res.code == "200") {
            this.$message({
              offset: 80,
              type: "success",
              message: "批量成功",
            });
            this.releaseValue();
            this.EssidsL1.forum_id = "";
            this.Essids = [];
            this.EssarrsValue = [];
          } else {
            this.$message({
              offset: 80,
              type: "error",
              message: res.msg,
            });
          }
        });
      }
    },
    // 批量取消精华
    async cancelSetAsEssence() {
      const cancelSetAsEssenceValue = await this.$confirm(
        "此操作将选中内容批量取消精华, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (cancelSetAsEssenceValue !== "confirm") {
        return this.$message({
          offset: 80,
          type: "info",
          message: "取消精华",
        });
      }
      if (cancelSetAsEssenceValue === "confirm") {
        this.EssarrsValue.forEach((v) => {
          this.Essids.push(v.id);
        });
        this.EssidsL1.forum_id = this.Essids.toString();
        postD(ForumSetEssApi(), this.EssidsL1).then((res) => {
          if (res.code == "200") {
            this.$message({
              offset: 80,
              type: "success",
              message: "批量成功",
            });
            this.releaseValue();
            this.EssidsL1.forum_id = "";
            this.Essids = [];
            this.EssarrsValue = [];
          } else {
            this.$message({
              offset: 80,
              type: "error",
              message: res.msg,
            });
          }
        });
      }
    },
    // 批量删除
    async canDels() {
      const canDelsValue = await this.$confirm(
        "此操作将选中内容批量删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (canDelsValue !== "confirm") {
        return this.$message({
          offset: 80,
          type: "info",
          message: "取消删除",
        });
      }
      if (canDelsValue === "confirm") {
        this.DeleteValue.forEach((v) => {
          this.Deletes.push(v.id);
        });
        this.delids.id = this.Deletes.toString();
        postD(ForumDelForumApi(), this.delids).then((res) => {
          if (res.code == "200") {
            this.$message({
              offset: 80,
              type: "success",
              message: "批量成功",
            });
            this.releaseValue();
          } else {
            this.$message({
              offset: 80,
              type: "error",
              message: res.msg,
            });
          }
        });
      }
    },
    // 删除
    async DeletePost(data) {
      const DeletePosts = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (DeletePosts !== "confirm") {
        return this.$message({
          offset: 80,
          type: "info",
          message: "取消删除",
        });
      }
      if (DeletePosts === "confirm") {
        this.DeletePostValue.id = data.id;
        postD(ForumDelForumApi(), this.DeletePostValue).then((res) => {
          if (res.code == "200") {
            this.$message({
              offset: 80,
              type: "success",
              message: "删除成功",
            });
            this.releaseValue();
          } else {
            this.$message({
              offset: 80,
              type: "error",
              message: res.msg,
            });
          }
        });
      }
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      this.page1.circle_id = this.circle.circle_id;
      postD(CircleGetCircleForumApi(), this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    // 搜索
    seatchInput() {
      this.page1.circle_id = this.circle.circle_id;
      postD(CircleGetCircleForumApi(), this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    detailsValue(val) {
      this.$router.push("/Forum/showForum" + val);
    },
  },
};
</script>


<style lang="less" scoped>
@import url("./whole.less");
</style>