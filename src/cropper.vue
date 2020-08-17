<template>
  <div class="upbtn">
    <input
      v-if="!hideInput"
      style="opacity: 0;"
      class="upbtn"
      type="file"
      accept="image/*"
      @change="upphoto($event)"
      ref="headinput"
    />
    <div class="bg" v-if="img!=''">
      <div class="btndiv" v-if="config.ceilbutton">
        <div class="btn" @click="canceltailor" :style="`backgroundColor:${config.cancelButtonBackgroundColor};color:${config.cancelButtonTextColor}`">{{config.cancelButtonText}}</div>
        <div class="img" @click="rotating"></div>
        <div class="btn" @click="tailoring" :style="`backgroundColor:${config.confirmButtonBackgroundColor};color:${config.confirmButtonTextColor}`">{{config.confirmButtonText}}</div>
      </div>
      <div class="wrapper">
        <vueCropper
          id="cropper"
          ref="cropper"
          :img="img"
          :outputSize="config.outputSize"
          :outputType="config.outputType"
          :info="config.info"
          :canScale="config.canScale"
          :autoCrop="config.autoCrop"
          :autoCropWidth="config.autoCropWidth"
          :autoCropHeight="config.autoCropHeight"
          :fixed="config.fixed"
          :fixedNumber="config.fixedNumber"
          :full="config.full"
          :fixedBox="config.fixedBox"
          :canMove="config.canMove"
          :canMoveBox="config.canMoveBox"
          :original="config.original"
          :centerBox="config.centerBox"
          :high="config.high"
          :infoTrue="config.infoTrue"
          :maxImgSize="config.maxImgSize"
          :enlarge="config.enlarge"
          :mode="config.mode"
          @cropMoving="moving($event)"
          @imgMoving="moving($event)"
        ></vueCropper>
      </div>
      <div class="btndiv" v-if="!config.ceilbutton">
        <div class="btn" @click="canceltailor" :style="`backgroundColor:${config.cancelButtonBackgroundColor};color:${config.cancelButtonTextColor}`">{{config.cancelButtonText}}</div>
        <div class="img" @click="rotating"></div>
        <div class="btn" @click="tailoring" :style="`backgroundColor:${config.confirmButtonBackgroundColor};color:${config.confirmButtonTextColor}`">{{config.confirmButtonText}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { VueCropper } from "vue-cropper";
export default {
  name: "H5Cropper",
  components: { VueCropper },
  props: {
    hideInput: {
      type: Boolean,
      default: false
    },
    option: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      img: "",
      config: {}
    };
  },
  watch: {
    option: {
      handler: function() {
        //do something
        delete this.option.autoCrop; // TODO: 不开放权限
        if (
          typeof this.option.outputType === "string" &&
          ["jpeg", "png", "webp"].indexOf(this.option.outputType) === -1
        ) {
          console.warn("Option.outputType is not [jpeg, png, webp]");
          delete this.option.outputType; // TODO: 改回默认属性不影响调用
        }
        this.config = Object.assign(this.config, this.option);
      },
      deep: true
    }
  },
  created() {
    // Event getFile 需要明确 MIME 类型
    delete this.option.autoCrop; // TODO: 不开放权限
    if (
      typeof this.option.outputType === "string" &&
      ["jpeg", "png", "webp"].indexOf(this.option.outputType) === -1
    ) {
      console.warn("Option.outputType is not [jpeg, png, webp]");
      delete this.option.outputType; // TODO: 改回默认属性不影响调用
    }

    this.config = Object.assign(
      {
        ceilbutton: false, //顶部按钮，默认底部
        outputSize: 1, //裁剪生成图片的质量
        outputType: "png", //裁剪生成图片的格式,默认png
        info: false, //裁剪框的大小信息
        canScale: true, //图片是否允许滚轮缩放
        autoCrop: false, //是否默认生成截图框
        autoCropWidth: 0, //默认生成截图框宽度
        autoCropHeight: 0, //默认生成截图框高度
        fixed: true, //是否开启截图框宽高固定比例
        fixedNumber: [1, 1], //截图框的宽高比例
        full: false, //是否输出原图比例的截图
        fixedBox: true, //固定截图框大小 不允许改变
        canMove: true, //上传图片是否可以移动
        canMoveBox: false, //截图框能否拖动
        original: false, //上传图片按照原始比例渲染
        centerBox: true, //截图框是否被限制在图片里面
        high: true, //是否按照设备的dpr 输出等比例图片
        infoTrue: false, //true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        maxImgSize: 2000, //限制图片最大宽度和高度
        enlarge: 1, //图片根据截图框输出比例倍数
        mode: "100%", //图片默认渲染方式
        cancelButtonText:"取消",//取消按钮文本
        confirmButtonText:"确定",//确定按钮文本
        cancelButtonBackgroundColor:"#606266",//取消按钮背景色
        confirmButtonBackgroundColor:"#ed594c",//确定按钮背景色
        cancelButtonTextColor:"#ffffff",//取消按钮字体色
        confirmButtonTextColor:"#ffffff",//确定按钮字体色
      },
      this.option
    );
  },
  methods: {
    //取消裁剪
    canceltailor(){
      this.img = ""
      this.$emit("canceltailor")
    },
    //选择照片
    async upphoto(e) {
      let photourl = e.target.files[0];
      this.$refs.headinput.value = null;
      if (photourl != undefined) {
        this.$emit("imgorigoinf", photourl);
        this.img = await this.onloadimg(photourl);
        this.config.autoCrop = true;
        setTimeout(() => {
          this.addsolide();
        }, 10);
      }
    },
    //异步onload图片
    onloadimg(photourl) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        reader.readAsDataURL(photourl);
        reader.onload = e => {
          resolve(e.target["result"]);
        };
      });
    },
    //确定裁剪
    tailoring() {
      // 获取截图的base64数据
      this.$refs.cropper.getCropData(data => {
        this.$emit("getbase64Data", data);
        this.$emit("getbase64", data);
        this.img = "";
        this.config.autoCrop = false;
      });
      // 获取截图的blob数据
      this.$refs.cropper.getCropBlob(data => {
        this.$emit("getblobData", data);
        this.$emit("getblob", data);

        // Blob 转 File
        const suffix = {
          jpeg: "jpg",
          png: "png",
          webp: "webp"
        }[this.config.outputType];
        const time = new Date().getTime();
        const file = new File([data], `${time}.${suffix}`, {
          type: `image/${this.config.outputType}`
        });

        this.$emit("getFile", file);
        this.$emit("get-file", file);

        this.img = "";
        this.config.autoCrop = false;
      });
    },
    //旋转照片
    rotating() {
      this.$refs.cropper.rotateRight();
      document.getElementsByClassName("cropper-modal")[0].style =
        "background-color: rgba(0,0,0,0.5);transition: 0.88s";
    },
    //裁剪框移动
    moving(e) {
      //   console.log(e);
      if (e.moving) {
        document.getElementsByClassName("cropper-modal")[0].style =
          "background-color: rgba(0,0,0,0.5);transition: 0.88s";
      } else {
        document.getElementsByClassName("cropper-modal")[0].style =
          "background-color: rgba(0,0,0,0.8);transition: 0.88s";
      }
    },
    //添加网格线
    addsolide() {
      if (document.getElementById("vertical") == null) {
        let box = document.getElementsByClassName("cropper-crop-box")[0];
        //左网格线
        let verticalLeft = document.createElement("div");
        verticalLeft.id = "vertical";
        verticalLeft.style.width = "1px";
        verticalLeft.style.height = "100%";
        verticalLeft.style.top = "0px";
        verticalLeft.style.left = "33%";
        verticalLeft.style.position = "absolute";
        verticalLeft.style.backgroundColor = "#fff";
        verticalLeft.style.zIndex = "522";
        verticalLeft.style.opacity = "0.5";
        //右网格线
        let verticalRight = document.createElement("div");
        verticalRight.style.width = "1px";
        verticalRight.style.height = "100%";
        verticalRight.style.top = "0px";
        verticalRight.style.right = "33%";
        verticalRight.style.position = "absolute";
        verticalRight.style.backgroundColor = "#fff";
        verticalRight.style.zIndex = "522";
        verticalRight.style.opacity = "0.5";
        //上网格线
        let verticalTop = document.createElement("div");
        verticalTop.style.width = "100%";
        verticalTop.style.height = "1px";
        verticalTop.style.top = "33%";
        verticalTop.style.left = "0px";
        verticalTop.style.position = "absolute";
        verticalTop.style.backgroundColor = "#fff";
        verticalTop.style.zIndex = "522";
        verticalTop.style.opacity = "0.5";
        //下网格线
        let verticalBottom = document.createElement("div");
        verticalBottom.style.width = "100%";
        verticalBottom.style.height = "1px";
        verticalBottom.style.bottom = "33%";
        verticalBottom.style.left = "0px";
        verticalBottom.style.position = "absolute";
        verticalBottom.style.backgroundColor = "#fff";
        verticalBottom.style.zIndex = "522";
        verticalBottom.style.opacity = "0.5";
        //左上边线
        let LeftTopSide = document.createElement("div");
        LeftTopSide.style.width = "30px";
        LeftTopSide.style.height = "4px";
        LeftTopSide.style.top = "-4px";
        LeftTopSide.style.left = "-4px";
        LeftTopSide.style.position = "absolute";
        LeftTopSide.style.backgroundColor = "#fff";
        LeftTopSide.style.zIndex = "522";
        LeftTopSide.style.opacity = "1";
        //上左边线
        let TopListSide = document.createElement("div");
        TopListSide.style.width = "4px";
        TopListSide.style.height = "30px";
        TopListSide.style.top = "-4px";
        TopListSide.style.left = "-4px";
        TopListSide.style.position = "absolute";
        TopListSide.style.backgroundColor = "#fff";
        TopListSide.style.zIndex = "522";
        TopListSide.style.opacity = "1";
        //右上边线
        let RightTopSide = document.createElement("div");
        RightTopSide.style.width = "30px";
        RightTopSide.style.height = "4px";
        RightTopSide.style.top = "-4px";
        RightTopSide.style.right = "-4px";
        RightTopSide.style.position = "absolute";
        RightTopSide.style.backgroundColor = "#fff";
        RightTopSide.style.zIndex = "522";
        RightTopSide.style.opacity = "1";
        //上右边线
        let TopRightSide = document.createElement("div");
        TopRightSide.style.width = "4px";
        TopRightSide.style.height = "30px";
        TopRightSide.style.top = "-4px";
        TopRightSide.style.right = "-4px";
        TopRightSide.style.position = "absolute";
        TopRightSide.style.backgroundColor = "#fff";
        TopRightSide.style.zIndex = "522";
        TopRightSide.style.opacity = "1";
        //左下边线
        let LeftBottomSide = document.createElement("div");
        LeftBottomSide.style.width = "30px";
        LeftBottomSide.style.height = "4px";
        LeftBottomSide.style.bottom = "-4px";
        LeftBottomSide.style.left = "-4px";
        LeftBottomSide.style.position = "absolute";
        LeftBottomSide.style.backgroundColor = "#fff";
        LeftBottomSide.style.zIndex = "522";
        LeftBottomSide.style.opacity = "1";
        //下左边线
        let BottomListSide = document.createElement("div");
        BottomListSide.style.width = "4px";
        BottomListSide.style.height = "30px";
        BottomListSide.style.bottom = "-4px";
        BottomListSide.style.left = "-4px";
        BottomListSide.style.position = "absolute";
        BottomListSide.style.backgroundColor = "#fff";
        BottomListSide.style.zIndex = "522";
        BottomListSide.style.opacity = "1";
        //右下边线
        let RightBottomSide = document.createElement("div");
        RightBottomSide.style.width = "30px";
        RightBottomSide.style.height = "4px";
        RightBottomSide.style.bottom = "-4px";
        RightBottomSide.style.right = "-4px";
        RightBottomSide.style.position = "absolute";
        RightBottomSide.style.backgroundColor = "#fff";
        RightBottomSide.style.zIndex = "522";
        RightBottomSide.style.opacity = "1";
        //下右边线
        let BottomRightSide = document.createElement("div");
        BottomRightSide.style.width = "4px";
        BottomRightSide.style.height = "30px";
        BottomRightSide.style.bottom = "-4px";
        BottomRightSide.style.right = "-4px";
        BottomRightSide.style.position = "absolute";
        BottomRightSide.style.backgroundColor = "#fff";
        BottomRightSide.style.zIndex = "522";
        BottomRightSide.style.opacity = "1";
        //一起生成
        box.appendChild(verticalLeft);
        box.appendChild(verticalRight);
        box.appendChild(verticalTop);
        box.appendChild(verticalBottom);
        box.appendChild(LeftTopSide);
        box.appendChild(TopListSide);
        box.appendChild(RightTopSide);
        box.appendChild(TopRightSide);
        box.appendChild(LeftBottomSide);
        box.appendChild(BottomListSide);
        box.appendChild(RightBottomSide);
        box.appendChild(BottomRightSide);
      }
    },

    // Violet_ice紫冰 <violetice@aliyun.com>
    /**
     * 载入文件
     * template:
     *    <h5-cropper hide-input ref="cropper">
     *
     * javascript:
     *    this.$refs.cropper.loadFile()
     *
     * @param file
     */
    loadFile(file) {
      if (file instanceof File) {
        this.onloadimg(file).then(base64 => {
          this.img = base64;
          setTimeout(() => {
            this.config.autoCrop = true;
            this.addsolide();
          }, 10);
        });
      } else {
        throw new Error("Arguments file is not File");
      }
    },
    /**
     *
     * @param base64
     */
    loadBase64(base64) {
      if (typeof base64 !== "string") {
        throw new Error("Arguments base64 is not string");
      }
      const base = base64.split(",");
      if (!/^data:image\/(.*?);base64$/.test(base[0])) {
        throw new Error("Arguments base64 MIME is not image/*");
      }

      // Base64 Regex @see https://learnku.com/articles/42295
      if (
        !/^[\/]?([\da-zA-Z]+[\/+]+)*[\da-zA-Z]+([+=]{1,2}|[\/])?$/.test(base[1])
      ) {
        throw new Error("Not standard base64");
      }

      this.img = base64;
      setTimeout(() => {
        this.config.autoCrop = true;
        this.addsolide();
      }, 10);
    }
  }
};
</script>
<style scoped>
.upbtn {
  width: 100%;
  height: 100%;
}
.bg {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100%;
  background-color: #000;
  left: 0;
  z-index: 521;
}
.btn {
  height: 8vw;
  padding: 0;
  line-height: 8vw;
  font-size: 4vw;
  padding: 0 3.5vw;
  /* width: 16vw; */
  border-radius: 1.333vw;
  text-align: center;
  /* background-color: #ed594c; */
  /* margin-top: 2.667vw; */
}
.btn1 {
  height: 8vw;
  line-height: 8vw;
  font-size: 4vw;
  padding: 0 4vw;
  /* width: 16vw; */
  border-radius: 1.333vw;
  text-align: center;
  background-color: #5b6e96;
  /* margin-top: 2.667vw; */
}
.img {
  height: 8vw;
  width: 8vw;
  position: absolute;
  left: calc(50% - 4vw);
  /* top: 2.667vw; */
  background-image: url("data:image/png;base64,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");
  background-size: 100% 100%;
}
.btndiv {
  height: 13.333vw;
  color: #fff;
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding: 0 4vw;
  line-height: 13.333vw;
  font-size: 4vw;
  position: relative;
}
.wrapper /deep/ .crop-point {
  opacity: 0;
  z-index: 523;
}
.wrapper /deep/ .cropper-view-box {
  outline: 1px solid #fff;
  border: 1px solid #fff;
}
.wrapper /deep/ .vue-cropper {
  background-color: #000;
  background-image: none;
}
.wrapper {
  height: calc(100vh - 21.333vw);
  padding: 4vw;
}
</style>
