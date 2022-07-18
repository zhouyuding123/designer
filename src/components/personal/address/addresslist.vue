<template>
  <div>
    <div class="addline1">
      <el-form
        :model="addruleForm"
        :rules="addrules"
        ref="addruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="收货人" prop="name">
          <el-input v-model="addruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="tel">
          <el-input v-model="addruleForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="所在地区">
          <el-cascader
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
            size="large"
            v-if="province == ''"
          >
          </el-cascader>
          <div class="xg" v-if="province != ''">
            <el-input style="width: 540px" v-model="province"></el-input>
            <div class="addxg" @click="aaddxg">修改</div>
          </div>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="addruleForm.detail"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <div class="bq">
            <div class="bqhome" @click="whole" ref="wholes">
              <span>家</span>
            </div>
            <div class="bqhome" ref="PutOn" @click="onTheShelf">
              <span>公司</span>
            </div>
            <div class="bqhome" ref="Offtheshelf" @click="underShelfx">
              <span>学校</span>
            </div>
          </div>
        </el-form-item>
        <div @click="zxc" class="bc" v-if="addruleForm.id == ''">保存</div>
        <div @click="modify" class="bc" v-if="addruleForm.id != ''">修改</div>
      </el-form>
    </div>
    <div>
      <div class="detailed_list">
        <div class="detailed_list_list">
          <div>收货人</div>
          <div>手机号</div>
          <div>所在地区</div>
          <div>详细地址</div>
          <div>标签</div>
          <div>操作</div>
        </div>
        <div class="list_mun" v-for="item in listAddressList" :key="item.id">
          <div>{{ item.name }}</div>
          <div>{{ item.tel }}</div>
          <div>{{ item.province }}{{ item.city }}{{ item.area }}</div>
          <div>
            {{ item.detail }}
          </div>
          <div>
            {{ item.label }}
          </div>
          <div class="options">
            <div @click="editvalue(item)"><span>修改</span></div>
            <div @click="delvalue(item.id)"><span>删除</span></div>
            <div @click="setdefault(item.id)" v-if="item.is_top == 0">
              <span>设为默认</span>
            </div>
            <div
              @click="setnotdefault(item.id)"
              v-if="item.is_top == 1"
              class="notset"
            >
              <span>默认地址</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="delvalueshow" width="30%">
      <span>这是一段信息</span>
      <div style="padding-top: 70px">
        <span slot="footer" class="dialog-footer">
          <el-button @click="delvalueshow = false">取 消</el-button>
          <el-button type="primary" @click="adddelvalue">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addAddressApi,
  listAddressApi,
  updateAddressApi,
  delAddressApi,
} from "@/urls/wsUrl.js";
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
import { postD } from "../../../api";
export default {
  data() {
    return {
      addruleForm: {
        id: "",
        name: "",
        tel: "",
        province: "",
        city: "",
        area: "",
        label: "",
        detail: "",
      },
      addrules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: "姓名不支持特殊字符",
            trigger: "blur",
          },
        ],
        tel: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,
            message: "请输入合法手机号/电话号",
            trigger: "blur",
          },
        ],
      },
      options: regionData,
      selectedOptions: [],
      selectedOptionss: "",
      address: "",
      listAddressList: [],
      province: "",
      delvalueshow: false,
      delvalueid: {
        id: "",
      },
      is_topid: {
        id: "",
        is_top: "1",
      },
      notis_topid: {
        id: "",
        is_top: "0",
      },
    };
  },
  created() {
    this.listAddress();
  },
  methods: {
    //省市区三级联动事件
    handleChange(value) {
      if (value[1] != null && value[2] != null) {
        var dz =
          CodeToText[value[0]] +
          "/" +
          CodeToText[value[1]] +
          "/" +
          CodeToText[value[2]];
        this.addressid = value[2];
      } else {
        if (value[1] != null) {
          dz = CodeToText[value[0]] + "/" + CodeToText[value[1]];
          this.addressid = value[1];
        } else {
          dz = CodeToText[value[0]];
          this.addressid = value[0];
        }
      }
      this.address = dz;
    },
    whole() {
      this.$refs.wholes.style.backgroundColor = "#FFDC00";
      this.$refs.Offtheshelf.style.backgroundColor = "#ffffff";
      this.$refs.PutOn.style.backgroundColor = "#FFFFFF";
      this.addruleForm.label = "家";
    },
    onTheShelf() {
      this.$refs.wholes.style.backgroundColor = "#ffffff";
      this.$refs.Offtheshelf.style.backgroundColor = "#ffffff";
      this.$refs.PutOn.style.backgroundColor = "#FFDC00";
      this.addruleForm.label = "公司";
    },
    underShelfx() {
      this.$refs.wholes.style.backgroundColor = "#ffffff";
      this.$refs.Offtheshelf.style.backgroundColor = "#FFDC00";
      this.$refs.PutOn.style.backgroundColor = "#ffffff";
      this.addruleForm.label = "学校";
    },
    zxc() {
      this.addruleForm.province = this.address.split("/")[0];
      this.addruleForm.city = this.address.split("/")[1];
      this.addruleForm.area = this.address.split("/")[2];
      this.$refs.addruleForm.validate((v) => {
        if (!v) return;
        postD(addAddressApi(), this.addruleForm).then((res) => {
          if (res.code == "200") {
            this.$message.success("保存成功");
            this.addruleForm.name = "";
            this.addruleForm.tel = "";
            this.addruleForm.province = "";
            this.addruleForm.city = "";
            this.addruleForm.area = "";
            this.addruleForm.label = "";
            this.addruleForm.detail = "";
            this.selectedOptions = "";
            this.address = "";
            this.listAddress();
          } else {
            this.$message.error("保存时出现问题");
          }
        });
      });
    },
    listAddress() {
      postD(listAddressApi()).then((res) => {
        this.listAddressList = res.list;
      });
    },
    editvalue(id) {
      this.addruleForm.id = id.id;
      this.addruleForm.name = id.name;
      this.addruleForm.tel = id.tel;
      this.addruleForm.province = id.province;
      this.addruleForm.city = id.city;
      this.addruleForm.area = id.area;
      this.province = id.province + "/" + id.city + "/" + id.area;
      this.addruleForm.label = id.label;
      this.addruleForm.detail = id.detail;
      if (this.addruleForm.label == "家") {
        this.$refs.wholes.style.backgroundColor = "#FFDC00";
        this.$refs.Offtheshelf.style.backgroundColor = "#ffffff";
        this.$refs.PutOn.style.backgroundColor = "#FFFFFF";
      } else if (this.addruleForm.label == "公司") {
        this.$refs.wholes.style.backgroundColor = "#ffffff";
        this.$refs.Offtheshelf.style.backgroundColor = "#ffffff";
        this.$refs.PutOn.style.backgroundColor = "#FFDC00";
      } else if (this.addruleForm.label == "学校") {
        this.$refs.wholes.style.backgroundColor = "#ffffff";
        this.$refs.Offtheshelf.style.backgroundColor = "#FFDC00";
        this.$refs.PutOn.style.backgroundColor = "#ffffff";
      }
    },
    aaddxg() {
      this.province = "";
    },
    modify() {
      if ((this.province = "")) {
        this.addruleForm.province = this.address.split("/")[0];
        this.addruleForm.city = this.address.split("/")[1];
        this.addruleForm.area = this.address.split("/")[2];
      }
      postD(updateAddressApi(), this.addruleForm).then((res) => {
        if (res.code == "200") {
          this.$message.success("保存成功");
          this.addruleForm.name = "";
          this.addruleForm.tel = "";
          this.addruleForm.province = "";
          this.addruleForm.city = "";
          this.addruleForm.area = "";
          this.addruleForm.label = "";
          this.addruleForm.detail = "";
          this.selectedOptions = "";
          this.address = "";
          this.addruleForm.id = "";
          this.province = "";
          this.listAddress();
        } else {
          this.$message.error("保存时出现问题");
        }
      });
    },
    delvalue(id) {
      this.delvalueshow = true;
      this.delvalueid.id = id;
    },
    adddelvalue() {
      postD(delAddressApi(), this.delvalueid).then((res) => {
        if (res.code == "200") {
          this.$message.success("删除成功");
          this.delvalueshow = false;
          this.listAddress();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    setdefault(id) {
      this.is_topid.id = id;
      postD(updateAddressApi(), this.is_topid).then((res) => {
        if (res.code == "200") {
          this.$message.success("设置默认地址成功");
          this.listAddress();
        } else {
          this.$message.error("设置默认地址失败");
        }
      });
    },
    setnotdefault(id) {
      this.notis_topid.id = id;
      postD(updateAddressApi(), this.notis_topid).then((res) => {
        if (res.code == "200") {
          this.$message.success("取消默认地址成功");
          this.listAddress();
        } else {
          this.$message.error("取消默认地址失败");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./addresslist.less");
</style>