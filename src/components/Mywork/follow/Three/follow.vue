<template>
  <div>
    <div class="bodywidth">
      <div
        class="divSt"
        v-for="(item, index) in itemser"
        :key="index"
        @click="getTopic(index, item)"
      >
        {{ item }}
      </div>
    </div>
    <div v-if="selectedIndex == 0">
        <designer />
    </div>
    <div v-if="selectedIndex == 1">
        <oem />
    </div>
    <div v-if="selectedIndex == 2">
        <supplier />
    </div>
    <div v-if="selectedIndex == 3">
        <enterprise />
    </div>
  </div>
</template>

<script>
import Oem from './fol/oem.vue';
import designer from './fol/designer.vue';
import Supplier from './fol/supplier.vue';
import Enterprise from './fol/enterprise.vue';
export default {
  components: { designer, Oem, Supplier, Enterprise },
  data() {
    return {
      itemser: ["设计师", "代加工", "供应商", "企业"],
      selectedIndex: "0",
    };
  },
  methods: {
    getTopic(index, id) {
      this.selectedIndex = index;
    },
  },
};
</script>


<style lang="less" scoped>
.bodywidth {
  width: 1580px;
  margin: 0 auto;
  display: flex;
}
.divSt {
  width: 120px;
  height: 30px;
  background: #ffdc00;
  border-radius: 3px 3px 3px 3px;
  line-height: 30px;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  margin-right: 20px;
  cursor: pointer;
}
</style>