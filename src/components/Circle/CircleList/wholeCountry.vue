<template>
  <div>
    <div class="btns flex">
      <div
        class="btnstyle"
        v-for="(item, index) in btntitle"
        :key="index"
        :class="{ active: btnindex == index }"
        @click="switchbtn(index)"
        style="margin-right: 20px"
      >
        {{ item }}
      </div>
    </div>
    <div class="contentBox" v-if="btnindex === 0">
      <div style="width: 1280px; margin-right: 20px">
        <fabu
          :is_circle="is_circle"
          :circle_id="circle_id"
          @remenlist="getremen"
          :styless="2"
        ></fabu>
        <div style="width: 1280px; margin: 0 auto">
          <div
            class="tabline"
            v-for="item in strollList"
            :key="item.id"
            @click="strollDetial(item.id)"
          >
            <div class="tablineValue">
              <div class="tabline1" v-if="item.is_top == 1">
                <span>置顶</span>
              </div>
              <div class="tabline2" v-if="item.is_ess == 1">
                <span>精华</span>
              </div>
              <div class="tabline3">
                <span>{{ item.title }}</span>
              </div>
            </div>
            <div class="tablineValue2">{{ item.description }}</div>
            <div
              class="tablineValue3"
              v-if="item.theme !== '' && item.theme !== null"
            >
              <span>#{{ item.theme }}</span>
            </div>
            <div v-if="item.thumb" class="tablineValue4">
              <div
                v-for="items in item.thumb.split(',').slice(0, 3)"
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
            <div class="tablineValue5">
              <div>
                <img
                  :src="imagesValue + item.headimage"
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
                <span>{{ item.username }}</span>
              </div>
              <div class="strollTime">
                <span>{{ funTime(item.create_time) }}</span>
              </div>
              <div class="strollOption">
                <div class="strollOptionUp">
                  <div class="strollOptionUpImg">
                    <img src="@/assets/imgers/cr爱心.png" alt="" />
                  </div>
                  <div class="strollOptionUpSpan">
                    <span>123</span>
                  </div>
                </div>
                <div class="strollOptionUp">
                  <div>
                    <img src="@/assets/imgers/cr评论.png" alt="" />
                  </div>
                  <div class="strollOptionUpSpan">
                    <span>123</span>
                  </div>
                </div>
                <div class="strollOptionUp">
                  <div>
                    <img src="@/assets/imgers/cr收藏.png" alt="" />
                  </div>
                  <div class="strollOptionUpSpan">
                    <span>123</span>
                  </div>
                </div>
                <div class="strollOptionUp">
                  <div>
                    <img src="@/assets/imgers/cr转发.png" alt="" />
                  </div>
                  <div class="strollOptionUpSpan">
                    <span>123</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            @page-change="handlePageChangeActivitys"
            style="margin-top: 20px"
          ></vxe-pager>
        </div>
      </div>
      <div class="rightBox" v-if="remenlist.length">
        <div
          class="huatibox"
          v-for="(item, index) in remenlist"
          :key="index"
          @click="todetail(item.id)"
        >
          <div class="flex al-c">
            <div>
              <img
                src="@/assets/imgers/icon/14756@2x.png"
                style="margin-right: 9px; height: 20px; width: 20px"
                alt=""
              />
            </div>
            <div class="maintitle">{{ item.title }}</div>
          </div>
          <div class="flex al-c ju-c" style="margin-top: 15px">
            <div class="maincontent coloccc font12">{{ item.count }}篇内容</div>
            <div class="line"></div>
            <div class="coloccc font12">{{ item.browse }}次浏览</div>
          </div>
        </div>
        <!-- v-if="remenlist.length>=7" -->
        <div class="lookmore" @click="lookmore">查看更多话题</div>
      </div>
    </div>
    <div class="contentBox" v-if="btnindex === 1">
      <div style="width: 1280px; margin-right: 20px">
        <fabu
          :is_circle="is_circle"
          :circle_id="circle_id"
          @remenlist="getremen"
          :styless="2"
        ></fabu>
        <div>
          <div class="bodyTextline">
            <div class="bodyTextlineValue">
              <el-input
                placeholder="请输入内容"
                v-model="page2.keyword"
              ></el-input>
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
              <el-button @click="canDels">批量删除</el-button>
            </div>
          </div>
          <div class="margin-tab">
            <vxe-table
              :data="tableData"
              @checkbox-change="checkboxChangeEvent"
              @checkbox-all="checkboxChangeEvent"
            >
              <vxe-column
                align="center"
                type="checkbox"
                width="50"
              ></vxe-column>
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
                      v-if="
                        scoped.row.theme !== '' && scoped.row.theme !== null
                      "
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
      <div class="rightBox" v-if="remenlist.length">
        <div
          class="huatibox"
          v-for="(item, index) in remenlist"
          :key="index"
          @click="todetail(item.id)"
        >
          <div class="flex al-c">
            <div>
              <img
                src="@/assets/imgers/icon/14756@2x.png"
                style="margin-right: 9px; height: 20px; width: 20px"
                alt=""
              />
            </div>
            <div class="maintitle">{{ item.title }}</div>
          </div>
          <div class="flex al-c ju-c" style="margin-top: 15px">
            <div class="maincontent coloccc font12">{{ item.count }}篇内容</div>
            <div class="line"></div>
            <div class="coloccc font12">{{ item.browse }}次浏览</div>
          </div>
        </div>
        <!-- v-if="remenlist.length>=7" -->
        <div class="lookmore" @click="lookmore">查看更多话题</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ForumListForumApi, ForumDelForumApi } from "@/urls/wsUrl.js";
import fabu from "@/components/Circle/CircleList/details/fabu/fabu.vue";
import { timestampToTime } from "@/assets/js/time.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  components: {
    fabu,
  },
  data() {
    return {
      Circles: {
        category: "1",
      },
      btntitle: ["逛逛圈子", "我的帖子"],
      btnindex: 0,
      circle_id: null,
      is_circle: 0,
      imagesValue: "",
      remenlist: [],
      strollList: [],
      page1: {
        style: "2",
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      page2: {
        style: "2",
        own: "1",
        keyword: "",
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      page2totalResult: 0,
      // 删除
      DeletePostValue: {
        id: "",
      },
      isIndeterminate: true,
      checkAll: false,
      checkedCities: [],
      ids: [],
      dels: {
        id: "",
      },
      //批量删除选中时将对象保存到arrs中
      arrs: [],
    };
  },
  created() {
    this.imagesValue = imgUrl();
    this.strollValue();
    this.Mystroll();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getremen(list) {
      // console.log(list)
      this.remenlist = list.slice(0, 8);
    },
    switchbtn(index) {
      this.btnindex = index;
    },
    lookmore() {
      this.$router.push("/hotTopic");
    },
    todetail(id) {
      this.$router.push({
        path: "/hotTopicdetail",
        query: {
          id: id,
        },
      });
    },
    strollValue() {
      postD(ForumListForumApi(), this.page1).then((res) => {
        this.strollList = res.list;
        this.imagesValue = imgUrl();
        this.page1.totalResult = res.count;
      });
    },
    funTime(val) {
      return timestampToTime(val);
    },
    handlePageChangeActivitys({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(ForumListForumApi(), this.page1).then((res) => {
        this.strollList = res.list;
        this.page1.totalResult = res.count;
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
    // 搜索
    seatchInput() {
      postD(ForumListForumApi(), this.page2).then((res) => {
        this.tableData = res.list;
        this.page2.totalResult = res.count;
      });
    },
    Mystroll() {
      postD(ForumListForumApi(), this.page2).then((res) => {
        this.tableData = res.list;
        this.page2.totalResult = res.count;
      });
    },
    Refresh() {
      this.page2.keyword = "";
      (this.page2.offset = 1), (this.page2.limit = 10), this.Mystroll();
    },
    checkboxChangeEvent(val) {
      this.arrs = val.records;
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
    strollDetial(val) {
      this.$router.push("/Forum/showForum" + val);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./wholeCountry.less");
</style>