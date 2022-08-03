<template>
  <div>
        <whole />
  </div>
</template>

<script>
import whole from "./wholelist/whole.vue"
export default {
  components: { whole },
  data() {
    return {
      topicClass: ["全部", "热门", "最新", "精华"],
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
.line1 {
  width: 1280px;
  height: 80px;
  margin: 0 auto;
  background-color: white;
  display: flex;
  padding-top: 30px;
  // padding-left: 20px;
  position: relative;

  .zxc {
    width: 160px;
    height: 60px;
    cursor: pointer;
    padding-top: 18px;
    font-size: 16px;
    font-weight: 400;
    color: #333333;
  }
  .zxc.active {
    width: 160px;
    height: 60px;
    background: #f5f5f5;
    border-radius: 6px 6px 0px 0px;
  }
}

</style>