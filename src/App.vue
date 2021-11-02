<template>
  <div class="dome">
    <div class="cropper">
      <img :src="img" class="img" />
      <!-- option是配置，格式是对象，getbase64Data是组件的一个方法获取裁剪完的头像 2.14新增一个获取getblobData的方法 -->
      <H5Cropper @getbase64="getbase64" :option="option"></H5Cropper>
      <!-- <vueCropper ref="cropper" :img="img"></vueCropper> -->
    </div>
    <div class="info">
      <div>作者：居里栈栈</div>
      <div>Wechat：812936565</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import H5Cropper from "./components/H5Cropper.vue";

export default defineComponent({
  name: "App",
  components: {
    H5Cropper,
  },
  setup() {
    const img = ref("http://www.yi-school.top/logo.jpg");
    function getbase64(base64: any) {
      img.value = base64;
    }
    const option = {
      ceilbutton: true,
    };
    return {
      img,
      option,
      getbase64,
    };
  },
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
img {
  content: normal !important;
}
.dome {
  display: flex;
  justify-content: space-between;
  padding-left: 22px;
}
.cropper {
  width: 80px;
  height: 80px;
  line-height: 80px;
  /* 切记position: relative一定要有 */
  position: relative;
  border-radius: 80px;
  overflow: hidden;
  text-align: center;
}
.img {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.info {
  font-size: 18px;
  height: 40px;
  line-height: 40px;
  margin-left: 30px;
  flex: 1;
  text-align: left;
}
</style>
