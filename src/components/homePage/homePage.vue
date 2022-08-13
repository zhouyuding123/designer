<template>
  <div>
    <div>
      <img
        :src="
          imagesValue +
          'images/20220812/1660294464f3ccdd27d2000e3f9255a7e3e2c48800.jpg'
        "
        alt=""
      />
    </div>
  </div>
</template>
<script>
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      imagesValue
    }
  },
  created() {
    this.imagesValue = imgUrl();
  }
}
</script>