<template>
  <div>
    <div class="bodyTextline">
      <div class="bodyTextlineValue">
        <el-input placeholder="请输入内容"></el-input>
        <div class="IsSeatch">
          <i class="el-icon-search"></i>
          <span>搜索</span>
        </div>
        <div class="plsc" @click="canDels">批量删除</div>
        <div class="Refresh">
          <i class="el-icon-refresh-right"></i>
          <span>刷新</span>
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
                    <span
                      @click="strollDetial(scoped.row.id)"
                      class="details"
                      >{{ scoped.row.title }}</span
                    >
                  </div>
                  <div class="postiongs">
                    <div class="Topping" @click="DeletePost(scoped.row.id)">
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
                    v-for="items in scoped.row.thumb.split(',').slice(1, 4)"
                    :key="items"
                    class="imgadde"
                  >
                    <img
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
          :current-page="page2.offset"
          :page-size="page2.limit"
          :total="page2.totalResult"
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
  </div>
</template>

<script>
import { ForumListForumApi, ForumDelForumApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
import { timestampToTime } from "@/assets/js/time.js";
export default {
  data() {
    return {
      tableData: [],
      ids: [],
      dels: {
        id: "",
      },
      //批量删除选中时将对象保存到arrs中
      arrs: [],
      page2: {
        own: "1",
        keyword: "",
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      imagesValue: "",
      // 删除
      DeletePostValue: {
        id: "",
      },
    };
  },
  created() {
    this.imagesValue = imgUrl();
    this.Mystroll();
  },
  methods: {
    Mystroll() {
      postD(ForumListForumApi(), this.page2).then((res) => {
        this.tableData = res.list;
        this.page2.totalResult = res.count;
      });
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page2.offset = currentPage;
      this.page2.limit = pageSize;
      postD(ForumListForumApi(), this.page2).then((res) => {
        this.tableData = res.list;
        this.page2.totalResult = res.count;
      });
    },
    funTime(val) {
      return timestampToTime(val);
    },
    checkboxChangeEvent(val) {
      this.arrs = val.records;
    },
    async canDels() {
      const delsValues = await this.$confirm(
        "此操作将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (delsValues !== "confirm") {
        return this.$message({
          offset: 80,
          type: "info",
          message: "取消删除",
        });
      }
      if (delsValues === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.dels.id = this.ids.toString();
        postD(ForumDelForumApi(), this.dels).then((res) => {
          if (res.code == "200") {
            this.$message({
              offset: 80,
              type: "success",
              message: "删除成功",
            });
            this.Mystroll();
            this.arrs = "";
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
        this.DeletePostValue.id = data;
        postD(ForumDelForumApi(), this.DeletePostValue).then((res) => {
          if (res.code == "200") {
            this.$message({
              offset: 80,
              type: "success",
              message: "删除成功",
            });
            this.Mystroll();
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
  },
};
</script>

<style lang="less" scoped>
.bodyTextline {
  width: 1280px;
  margin: 10px auto 0 auto;

  .bodyTextlineValue {
    display: flex;

    .el-input {
      width: 400px;
    }

    .IsSeatch {
      cursor: pointer;
      width: 80px;
      height: 40px;
      background: #dfdfdf;
      border-radius: 4px 4px 4px 4px;
      text-align: center;

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

    .Refresh {
      cursor: pointer;
      margin-left: auto;
      width: 80px;
      height: 40px;
      background: #00b567;
      border-radius: 4px 4px 4px 4px;
      text-align: center;

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
      }
    }
  }
}
@import url("./post.less");
</style>