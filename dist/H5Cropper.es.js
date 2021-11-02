var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import { defineComponent, pushScopeId, popScopeId, openBlock, createElementBlock, withDirectives, createElementVNode, normalizeStyle, vShow, createCommentVNode, normalizeClass, toDisplayString, ref, reactive, resolveComponent, createVNode } from "vue";
var index = "";
const u = {};
u.getData = (t) => new Promise((e, i) => {
  let s = {};
  (function(t2) {
    let e2 = null;
    return new Promise((i2, s2) => {
      if (t2.src)
        if (/^data\:/i.test(t2.src))
          e2 = function(t3) {
            t3 = t3.replace(/^data\:([^\;]+)\;base64,/gim, "");
            for (var e3 = atob(t3), i3 = e3.length, s3 = new ArrayBuffer(i3), h2 = new Uint8Array(s3), o2 = 0; o2 < i3; o2++)
              h2[o2] = e3.charCodeAt(o2);
            return s3;
          }(t2.src), i2(e2);
        else if (/^blob\:/i.test(t2.src)) {
          var h = new FileReader();
          h.onload = function(t3) {
            e2 = t3.target.result, i2(e2);
          }, function(t3, e3) {
            var i3 = new XMLHttpRequest();
            i3.open("GET", t3, true), i3.responseType = "blob", i3.onload = function(t4) {
              this.status != 200 && this.status !== 0 || e3(this.response);
            }, i3.send();
          }(t2.src, function(t3) {
            h.readAsArrayBuffer(t3);
          });
        } else {
          var o = new XMLHttpRequest();
          o.onload = function() {
            if (this.status != 200 && this.status !== 0)
              throw "Could not load image";
            e2 = o.response, i2(e2), o = null;
          }, o.open("GET", t2.src, true), o.responseType = "arraybuffer", o.send(null);
        }
      else
        s2("img error");
    });
  })(t).then((t2) => {
    s.arrayBuffer = t2, s.orientation = function(t3) {
      var e2, i2, s2, h, o, r, a, c, n, p = new DataView(t3), l = p.byteLength;
      if (p.getUint8(0) === 255 && p.getUint8(1) === 216)
        for (c = 2; c < l; ) {
          if (p.getUint8(c) === 255 && p.getUint8(c + 1) === 225) {
            r = c;
            break;
          }
          c++;
        }
      r && (i2 = r + 10, function(t4, e3, i3) {
        var s3, h2 = "";
        for (s3 = e3, i3 += e3; s3 < i3; s3++)
          h2 += String.fromCharCode(t4.getUint8(s3));
        return h2;
      }(p, r + 4, 4) === "Exif" && ((h = (o = p.getUint16(i2)) === 18761) || o === 19789) && p.getUint16(i2 + 2, h) === 42 && (s2 = p.getUint32(i2 + 4, h)) >= 8 && (a = i2 + s2));
      if (a) {
        for (l = p.getUint16(a, h), n = 0; n < l; n++)
          if (c = a + 12 * n + 2, p.getUint16(c, h) === 274) {
            c += 8, e2 = p.getUint16(c, h);
            break;
          }
      }
      return e2;
    }(t2), e(s);
  }).catch((t2) => {
    i(t2);
  });
});
const g = defineComponent({ data: function() {
  return { w: 0, h: 0, scale: 1, x: 0, y: 0, loading: true, trueWidth: 0, trueHeight: 0, move: true, moveX: 0, moveY: 0, crop: false, cropping: false, cropW: 0, cropH: 0, cropOldW: 0, cropOldH: 0, canChangeX: false, canChangeY: false, changeCropTypeX: 1, changeCropTypeY: 1, cropX: 0, cropY: 0, cropChangeX: 0, cropChangeY: 0, cropOffsertX: 0, cropOffsertY: 0, support: "", touches: [], touchNow: false, rotate: 0, isIos: false, orientation: 0, imgs: "", coe: 0.2, scaling: false, scalingSet: "", coeStatus: "", isCanShow: true };
}, props: { img: { type: [String, Blob, null, File], default: "" }, outputSize: { type: Number, default: 1 }, outputType: { type: String, default: "jpeg" }, info: { type: Boolean, default: true }, canScale: { type: Boolean, default: true }, autoCrop: { type: Boolean, default: false }, autoCropWidth: { type: [Number, String], default: 0 }, autoCropHeight: { type: [Number, String], default: 0 }, fixed: { type: Boolean, default: false }, fixedNumber: { type: Array, default: () => [1, 1] }, fixedBox: { type: Boolean, default: false }, full: { type: Boolean, default: false }, canMove: { type: Boolean, default: true }, canMoveBox: { type: Boolean, default: true }, original: { type: Boolean, default: false }, centerBox: { type: Boolean, default: false }, high: { type: Boolean, default: true }, infoTrue: { type: Boolean, default: false }, maxImgSize: { type: [Number, String], default: 2e3 }, enlarge: { type: [Number, String], default: 1 }, preW: { type: [Number, String], default: 0 }, mode: { type: String, default: "contain" }, limitMinSize: { type: [Number, Array, String], default: () => 10 } }, computed: { cropInfo() {
  let t = {};
  if (t.top = this.cropOffsertY > 21 ? "-21px" : "0px", t.width = this.cropW > 0 ? this.cropW : 0, t.height = this.cropH > 0 ? this.cropH : 0, this.infoTrue) {
    let e = 1;
    this.high && !this.full && (e = window.devicePixelRatio), this.enlarge !== 1 & !this.full && (e = Math.abs(Number(this.enlarge))), t.width = t.width * e, t.height = t.height * e, this.full && (t.width = t.width / this.scale, t.height = t.height / this.scale);
  }
  return t.width = t.width.toFixed(0), t.height = t.height.toFixed(0), t;
}, isIE: () => !!window.ActiveXObject || "ActiveXObject" in window, passive() {
  return this.isIE ? null : { passive: false };
} }, watch: { img() {
  this.checkedImg();
}, imgs(t) {
  t !== "" && this.reload();
}, cropW() {
  this.showPreview();
}, cropH() {
  this.showPreview();
}, cropOffsertX() {
  this.showPreview();
}, cropOffsertY() {
  this.showPreview();
}, scale(t, e) {
  this.showPreview();
}, x() {
  this.showPreview();
}, y() {
  this.showPreview();
}, autoCrop(t) {
  t && this.goAutoCrop();
}, autoCropWidth() {
  this.autoCrop && this.goAutoCrop();
}, autoCropHeight() {
  this.autoCrop && this.goAutoCrop();
}, mode() {
  this.checkedImg();
}, rotate() {
  this.showPreview(), (this.autoCrop || this.cropW > 0 || this.cropH > 0) && this.goAutoCrop(this.cropW, this.cropH);
} }, methods: { getVersion(t) {
  var e = navigator.userAgent.split(" "), i = "";
  let s = 0;
  const h = new RegExp(t, "i");
  for (var o = 0; o < e.length; o++)
    h.test(e[o]) && (i = e[o]);
  return s = i ? i.split("/")[1].split(".") : ["0", "0", "0"], s;
}, checkOrientationImage(t, e, i, s) {
  if (this.getVersion("chrome")[0] >= 81)
    e = -1;
  else if (this.getVersion("safari")[0] >= 605) {
    const t2 = this.getVersion("version");
    t2[0] > 13 && t2[1] > 1 && (e = -1);
  } else {
    const t2 = navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
    if (t2) {
      let i2 = t2[1];
      i2 = i2.split("_"), (i2[0] > 13 || i2[0] >= 13 && i2[1] >= 4) && (e = -1);
    }
  }
  let h = document.createElement("canvas"), o = h.getContext("2d");
  switch (o.save(), e) {
    case 2:
      h.width = i, h.height = s, o.translate(i, 0), o.scale(-1, 1);
      break;
    case 3:
      h.width = i, h.height = s, o.translate(i / 2, s / 2), o.rotate(180 * Math.PI / 180), o.translate(-i / 2, -s / 2);
      break;
    case 4:
      h.width = i, h.height = s, o.translate(0, s), o.scale(1, -1);
      break;
    case 5:
      h.height = i, h.width = s, o.rotate(0.5 * Math.PI), o.scale(1, -1);
      break;
    case 6:
      h.width = s, h.height = i, o.translate(s / 2, i / 2), o.rotate(90 * Math.PI / 180), o.translate(-i / 2, -s / 2);
      break;
    case 7:
      h.height = i, h.width = s, o.rotate(0.5 * Math.PI), o.translate(i, -s), o.scale(-1, 1);
      break;
    case 8:
      h.height = i, h.width = s, o.translate(s / 2, i / 2), o.rotate(-90 * Math.PI / 180), o.translate(-i / 2, -s / 2);
      break;
    default:
      h.width = i, h.height = s;
  }
  o.drawImage(t, 0, 0, i, s), o.restore(), h.toBlob((t2) => {
    let e2 = URL.createObjectURL(t2);
    URL.revokeObjectURL(this.imgs), this.imgs = e2;
  }, "image/" + this.outputType, 1);
}, checkedImg() {
  if (this.img === null || this.img === "")
    return this.imgs = "", void this.clearCrop();
  this.loading = true, this.scale = 1, this.rotate = 0, this.clearCrop();
  let t = new Image();
  if (t.onload = () => {
    if (this.img === "")
      return this.$emit("imgLoad", "error"), this.$emit("img-load", "error"), false;
    let e2 = t.width, i = t.height;
    u.getData(t).then((s) => {
      this.orientation = s.orientation || 1;
      let h = Number(this.maxImgSize);
      !this.orientation && e2 < h & i < h ? this.imgs = this.img : (e2 > h && (i = i / e2 * h, e2 = h), i > h && (e2 = e2 / i * h, i = h), this.checkOrientationImage(t, this.orientation, e2, i));
    });
  }, t.onerror = () => {
    this.$emit("imgLoad", "error"), this.$emit("img-load", "error");
  }, this.img.substr(0, 4) !== "data" && (t.crossOrigin = ""), this.isIE) {
    var e = new XMLHttpRequest();
    e.onload = function() {
      var e2 = URL.createObjectURL(this.response);
      t.src = e2;
    }, e.open("GET", this.img, true), e.responseType = "blob", e.send();
  } else
    t.src = this.img;
}, startMove(t) {
  if (t.preventDefault(), this.move && !this.crop) {
    if (!this.canMove)
      return false;
    this.moveX = ("clientX" in t ? t.clientX : t.touches[0].clientX) - this.x, this.moveY = ("clientY" in t ? t.clientY : t.touches[0].clientY) - this.y, t.touches ? (window.addEventListener("touchmove", this.moveImg), window.addEventListener("touchend", this.leaveImg), t.touches.length == 2 && (this.touches = t.touches, window.addEventListener("touchmove", this.touchScale), window.addEventListener("touchend", this.cancelTouchScale))) : (window.addEventListener("mousemove", this.moveImg), window.addEventListener("mouseup", this.leaveImg)), this.$emit("imgMoving", { moving: true, axis: this.getImgAxis() }), this.$emit("img-moving", { moving: true, axis: this.getImgAxis() });
  } else
    this.cropping = true, window.addEventListener("mousemove", this.createCrop), window.addEventListener("mouseup", this.endCrop), window.addEventListener("touchmove", this.createCrop), window.addEventListener("touchend", this.endCrop), this.cropOffsertX = t.offsetX ? t.offsetX : t.touches[0].pageX - this.$refs.cropper.offsetLeft, this.cropOffsertY = t.offsetY ? t.offsetY : t.touches[0].pageY - this.$refs.cropper.offsetTop, this.cropX = "clientX" in t ? t.clientX : t.touches[0].clientX, this.cropY = "clientY" in t ? t.clientY : t.touches[0].clientY, this.cropChangeX = this.cropOffsertX, this.cropChangeY = this.cropOffsertY, this.cropW = 0, this.cropH = 0;
}, touchScale(t) {
  t.preventDefault();
  let e = this.scale;
  var i = this.touches[0].clientX, s = this.touches[0].clientY, h = t.touches[0].clientX, o = t.touches[0].clientY, r = this.touches[1].clientX, a = this.touches[1].clientY, c = t.touches[1].clientX, n = t.touches[1].clientY, p = Math.sqrt(Math.pow(i - r, 2) + Math.pow(s - a, 2)), l = Math.sqrt(Math.pow(h - c, 2) + Math.pow(o - n, 2)) - p, u2 = 1, g2 = (u2 = (u2 = u2 / this.trueWidth > u2 / this.trueHeight ? u2 / this.trueHeight : u2 / this.trueWidth) > 0.1 ? 0.1 : u2) * l;
  if (!this.touchNow) {
    if (this.touchNow = true, l > 0 ? e += Math.abs(g2) : l < 0 && e > Math.abs(g2) && (e -= Math.abs(g2)), this.touches = t.touches, setTimeout(() => {
      this.touchNow = false;
    }, 8), !this.checkoutImgAxis(this.x, this.y, e))
      return false;
    this.scale = e;
  }
}, cancelTouchScale(t) {
  window.removeEventListener("touchmove", this.touchScale);
}, moveImg(t) {
  if (t.preventDefault(), t.touches && t.touches.length === 2)
    return this.touches = t.touches, window.addEventListener("touchmove", this.touchScale), window.addEventListener("touchend", this.cancelTouchScale), window.removeEventListener("touchmove", this.moveImg), false;
  let e, i, s = "clientX" in t ? t.clientX : t.touches[0].clientX, h = "clientY" in t ? t.clientY : t.touches[0].clientY;
  e = s - this.moveX, i = h - this.moveY, this.$nextTick(() => {
    if (this.centerBox) {
      let t2, s2, h2, o, r = this.getImgAxis(e, i, this.scale), a = this.getCropAxis(), c = this.trueHeight * this.scale, n = this.trueWidth * this.scale;
      switch (this.rotate) {
        case 1:
        case -1:
        case 3:
        case -3:
          t2 = this.cropOffsertX - this.trueWidth * (1 - this.scale) / 2 + (c - n) / 2, s2 = this.cropOffsertY - this.trueHeight * (1 - this.scale) / 2 + (n - c) / 2, h2 = t2 - c + this.cropW, o = s2 - n + this.cropH;
          break;
        default:
          t2 = this.cropOffsertX - this.trueWidth * (1 - this.scale) / 2, s2 = this.cropOffsertY - this.trueHeight * (1 - this.scale) / 2, h2 = t2 - n + this.cropW, o = s2 - c + this.cropH;
      }
      r.x1 >= a.x1 && (e = t2), r.y1 >= a.y1 && (i = s2), r.x2 <= a.x2 && (e = h2), r.y2 <= a.y2 && (i = o);
    }
    this.x = e, this.y = i, this.$emit("imgMoving", { moving: true, axis: this.getImgAxis() }), this.$emit("img-moving", { moving: true, axis: this.getImgAxis() });
  });
}, leaveImg(t) {
  window.removeEventListener("mousemove", this.moveImg), window.removeEventListener("touchmove", this.moveImg), window.removeEventListener("mouseup", this.leaveImg), window.removeEventListener("touchend", this.leaveImg), this.$emit("imgMoving", { moving: false, axis: this.getImgAxis() }), this.$emit("img-moving", { moving: false, axis: this.getImgAxis() });
}, scaleImg() {
  this.canScale && window.addEventListener(this.support, this.changeSize, this.passive);
}, cancelScale() {
  this.canScale && window.removeEventListener(this.support, this.changeSize);
}, changeSize(t) {
  t.preventDefault();
  let e = this.scale;
  var i = t.deltaY || t.wheelDelta;
  i = navigator.userAgent.indexOf("Firefox") > 0 ? 30 * i : i, this.isIE && (i = -i);
  var s = this.coe, h = (s = s / this.trueWidth > s / this.trueHeight ? s / this.trueHeight : s / this.trueWidth) * i;
  h < 0 ? e += Math.abs(h) : e > Math.abs(h) && (e -= Math.abs(h));
  let o = h < 0 ? "add" : "reduce";
  if (o !== this.coeStatus && (this.coeStatus = o, this.coe = 0.2), this.scaling || (this.scalingSet = setTimeout(() => {
    this.scaling = false, this.coe = this.coe += 0.01;
  }, 50)), this.scaling = true, !this.checkoutImgAxis(this.x, this.y, e))
    return false;
  this.scale = e;
}, changeScale(t) {
  let e = this.scale;
  t = t || 1;
  var i = 20;
  if ((t *= i = i / this.trueWidth > i / this.trueHeight ? i / this.trueHeight : i / this.trueWidth) > 0 ? e += Math.abs(t) : e > Math.abs(t) && (e -= Math.abs(t)), !this.checkoutImgAxis(this.x, this.y, e))
    return false;
  this.scale = e;
}, createCrop(t) {
  t.preventDefault();
  var e = "clientX" in t ? t.clientX : t.touches ? t.touches[0].clientX : 0, i = "clientY" in t ? t.clientY : t.touches ? t.touches[0].clientY : 0;
  this.$nextTick(() => {
    var t2 = e - this.cropX, s = i - this.cropY;
    if (t2 > 0 ? (this.cropW = t2 + this.cropChangeX > this.w ? this.w - this.cropChangeX : t2, this.cropOffsertX = this.cropChangeX) : (this.cropW = this.w - this.cropChangeX + Math.abs(t2) > this.w ? this.cropChangeX : Math.abs(t2), this.cropOffsertX = this.cropChangeX + t2 > 0 ? this.cropChangeX + t2 : 0), this.fixed) {
      var h = this.cropW / this.fixedNumber[0] * this.fixedNumber[1];
      h + this.cropOffsertY > this.h ? (this.cropH = this.h - this.cropOffsertY, this.cropW = this.cropH / this.fixedNumber[1] * this.fixedNumber[0], this.cropOffsertX = t2 > 0 ? this.cropChangeX : this.cropChangeX - this.cropW) : this.cropH = h, this.cropOffsertY = this.cropOffsertY;
    } else
      s > 0 ? (this.cropH = s + this.cropChangeY > this.h ? this.h - this.cropChangeY : s, this.cropOffsertY = this.cropChangeY) : (this.cropH = this.h - this.cropChangeY + Math.abs(s) > this.h ? this.cropChangeY : Math.abs(s), this.cropOffsertY = this.cropChangeY + s > 0 ? this.cropChangeY + s : 0);
  });
}, changeCropSize(t, e, i, s, h) {
  t.preventDefault(), window.addEventListener("mousemove", this.changeCropNow), window.addEventListener("mouseup", this.changeCropEnd), window.addEventListener("touchmove", this.changeCropNow), window.addEventListener("touchend", this.changeCropEnd), this.canChangeX = e, this.canChangeY = i, this.changeCropTypeX = s, this.changeCropTypeY = h, this.cropX = "clientX" in t ? t.clientX : t.touches[0].clientX, this.cropY = "clientY" in t ? t.clientY : t.touches[0].clientY, this.cropOldW = this.cropW, this.cropOldH = this.cropH, this.cropChangeX = this.cropOffsertX, this.cropChangeY = this.cropOffsertY, this.fixed && this.canChangeX && this.canChangeY && (this.canChangeY = 0), this.$emit("change-crop-size", { width: this.cropW, height: this.cropH });
}, changeCropNow(t) {
  t.preventDefault();
  var e = "clientX" in t ? t.clientX : t.touches ? t.touches[0].clientX : 0, i = "clientY" in t ? t.clientY : t.touches ? t.touches[0].clientY : 0;
  let s = this.w, h = this.h, o = 0, r = 0;
  if (this.centerBox) {
    let t2 = this.getImgAxis(), e2 = t2.x2, i2 = t2.y2;
    o = t2.x1 > 0 ? t2.x1 : 0, r = t2.y1 > 0 ? t2.y1 : 0, s > e2 && (s = e2), h > i2 && (h = i2);
  }
  this.$nextTick(() => {
    var t2 = e - this.cropX, a = i - this.cropY;
    if (this.canChangeX && (this.changeCropTypeX === 1 ? this.cropOldW - t2 > 0 ? (this.cropW = s - this.cropChangeX - t2 <= s - o ? this.cropOldW - t2 : this.cropOldW + this.cropChangeX - o, this.cropOffsertX = s - this.cropChangeX - t2 <= s - o ? this.cropChangeX + t2 : o) : (this.cropW = Math.abs(t2) + this.cropChangeX <= s ? Math.abs(t2) - this.cropOldW : s - this.cropOldW - this.cropChangeX, this.cropOffsertX = this.cropChangeX + this.cropOldW) : this.changeCropTypeX === 2 && (this.cropOldW + t2 > 0 ? (this.cropW = this.cropOldW + t2 + this.cropOffsertX <= s ? this.cropOldW + t2 : s - this.cropOffsertX, this.cropOffsertX = this.cropChangeX) : (this.cropW = s - this.cropChangeX + Math.abs(t2 + this.cropOldW) <= s - o ? Math.abs(t2 + this.cropOldW) : this.cropChangeX - o, this.cropOffsertX = s - this.cropChangeX + Math.abs(t2 + this.cropOldW) <= s - o ? this.cropChangeX - Math.abs(t2 + this.cropOldW) : o))), this.canChangeY && (this.changeCropTypeY === 1 ? this.cropOldH - a > 0 ? (this.cropH = h - this.cropChangeY - a <= h - r ? this.cropOldH - a : this.cropOldH + this.cropChangeY - r, this.cropOffsertY = h - this.cropChangeY - a <= h - r ? this.cropChangeY + a : r) : (this.cropH = Math.abs(a) + this.cropChangeY <= h ? Math.abs(a) - this.cropOldH : h - this.cropOldH - this.cropChangeY, this.cropOffsertY = this.cropChangeY + this.cropOldH) : this.changeCropTypeY === 2 && (this.cropOldH + a > 0 ? (this.cropH = this.cropOldH + a + this.cropOffsertY <= h ? this.cropOldH + a : h - this.cropOffsertY, this.cropOffsertY = this.cropChangeY) : (this.cropH = h - this.cropChangeY + Math.abs(a + this.cropOldH) <= h - r ? Math.abs(a + this.cropOldH) : this.cropChangeY - r, this.cropOffsertY = h - this.cropChangeY + Math.abs(a + this.cropOldH) <= h - r ? this.cropChangeY - Math.abs(a + this.cropOldH) : r))), this.canChangeX && this.fixed) {
      var c = this.cropW / this.fixedNumber[0] * this.fixedNumber[1];
      c + this.cropOffsertY > h ? (this.cropH = h - this.cropOffsertY, this.cropW = this.cropH / this.fixedNumber[1] * this.fixedNumber[0]) : this.cropH = c;
    }
    if (this.canChangeY && this.fixed) {
      var n = this.cropH / this.fixedNumber[1] * this.fixedNumber[0];
      n + this.cropOffsertX > s ? (this.cropW = s - this.cropOffsertX, this.cropH = this.cropW / this.fixedNumber[0] * this.fixedNumber[1]) : this.cropW = n;
    }
  });
}, checkCropLimitSize() {
  let { cropW: t, cropH: e, limitMinSize: i } = this, s = new Array();
  return s = Array.isArray[i] ? i : [i, i], t = parseFloat(s[0]), e = parseFloat(s[1]), [t, e];
}, changeCropEnd(t) {
  window.removeEventListener("mousemove", this.changeCropNow), window.removeEventListener("mouseup", this.changeCropEnd), window.removeEventListener("touchmove", this.changeCropNow), window.removeEventListener("touchend", this.changeCropEnd);
}, endCrop() {
  this.cropW === 0 && this.cropH === 0 && (this.cropping = false), window.removeEventListener("mousemove", this.createCrop), window.removeEventListener("mouseup", this.endCrop), window.removeEventListener("touchmove", this.createCrop), window.removeEventListener("touchend", this.endCrop);
}, startCrop() {
  this.crop = true;
}, stopCrop() {
  this.crop = false;
}, clearCrop() {
  this.cropping = false, this.cropW = 0, this.cropH = 0;
}, cropMove(t) {
  if (t.preventDefault(), !this.canMoveBox)
    return this.crop = false, this.startMove(t), false;
  if (t.touches && t.touches.length === 2)
    return this.crop = false, this.startMove(t), this.leaveCrop(), false;
  window.addEventListener("mousemove", this.moveCrop), window.addEventListener("mouseup", this.leaveCrop), window.addEventListener("touchmove", this.moveCrop), window.addEventListener("touchend", this.leaveCrop);
  let e, i, s = "clientX" in t ? t.clientX : t.touches[0].clientX, h = "clientY" in t ? t.clientY : t.touches[0].clientY;
  e = s - this.cropOffsertX, i = h - this.cropOffsertY, this.cropX = e, this.cropY = i, this.$emit("cropMoving", { moving: true, axis: this.getCropAxis() }), this.$emit("crop-moving", { moving: true, axis: this.getCropAxis() });
}, moveCrop(t, e) {
  let i = 0, s = 0;
  t && (t.preventDefault(), i = "clientX" in t ? t.clientX : t.touches[0].clientX, s = "clientY" in t ? t.clientY : t.touches[0].clientY), this.$nextTick(() => {
    let t2, h, o = i - this.cropX, r = s - this.cropY;
    if (e && (o = this.cropOffsertX, r = this.cropOffsertY), t2 = o <= 0 ? 0 : o + this.cropW > this.w ? this.w - this.cropW : o, h = r <= 0 ? 0 : r + this.cropH > this.h ? this.h - this.cropH : r, this.centerBox) {
      let e2 = this.getImgAxis();
      t2 <= e2.x1 && (t2 = e2.x1), t2 + this.cropW > e2.x2 && (t2 = e2.x2 - this.cropW), h <= e2.y1 && (h = e2.y1), h + this.cropH > e2.y2 && (h = e2.y2 - this.cropH);
    }
    this.cropOffsertX = t2, this.cropOffsertY = h, this.$emit("cropMoving", { moving: true, axis: this.getCropAxis() }), this.$emit("crop-moving", { moving: true, axis: this.getCropAxis() });
  });
}, getImgAxis(t, e, i) {
  t = t || this.x, e = e || this.y, i = i || this.scale;
  let s = { x1: 0, x2: 0, y1: 0, y2: 0 }, h = this.trueWidth * i, o = this.trueHeight * i;
  switch (this.rotate) {
    case 0:
      s.x1 = t + this.trueWidth * (1 - i) / 2, s.x2 = s.x1 + this.trueWidth * i, s.y1 = e + this.trueHeight * (1 - i) / 2, s.y2 = s.y1 + this.trueHeight * i;
      break;
    case 1:
    case -1:
    case 3:
    case -3:
      s.x1 = t + this.trueWidth * (1 - i) / 2 + (h - o) / 2, s.x2 = s.x1 + this.trueHeight * i, s.y1 = e + this.trueHeight * (1 - i) / 2 + (o - h) / 2, s.y2 = s.y1 + this.trueWidth * i;
      break;
    default:
      s.x1 = t + this.trueWidth * (1 - i) / 2, s.x2 = s.x1 + this.trueWidth * i, s.y1 = e + this.trueHeight * (1 - i) / 2, s.y2 = s.y1 + this.trueHeight * i;
  }
  return s;
}, getCropAxis() {
  let t = { x1: 0, x2: 0, y1: 0, y2: 0 };
  return t.x1 = this.cropOffsertX, t.x2 = t.x1 + this.cropW, t.y1 = this.cropOffsertY, t.y2 = t.y1 + this.cropH, t;
}, leaveCrop(t) {
  window.removeEventListener("mousemove", this.moveCrop), window.removeEventListener("mouseup", this.leaveCrop), window.removeEventListener("touchmove", this.moveCrop), window.removeEventListener("touchend", this.leaveCrop), this.$emit("cropMoving", { moving: false, axis: this.getCropAxis() }), this.$emit("crop-moving", { moving: false, axis: this.getCropAxis() });
}, getCropChecked(t) {
  let e = document.createElement("canvas"), i = new Image(), s = this.rotate, h = this.trueWidth, o = this.trueHeight, r = this.cropOffsertX, a = this.cropOffsertY;
  function c(t2, i2) {
    e.width = Math.round(t2), e.height = Math.round(i2);
  }
  i.onload = () => {
    if (this.cropW !== 0) {
      let t2 = e.getContext("2d"), n = 1;
      this.high & !this.full && (n = window.devicePixelRatio), this.enlarge !== 1 & !this.full && (n = Math.abs(Number(this.enlarge)));
      let p = this.cropW * n, l = this.cropH * n, u2 = h * this.scale * n, g2 = o * this.scale * n, d2 = (this.x - r + this.trueWidth * (1 - this.scale) / 2) * n, m2 = (this.y - a + this.trueHeight * (1 - this.scale) / 2) * n;
      switch (c(p, l), t2.save(), s) {
        case 0:
          this.full ? (c(p / this.scale, l / this.scale), t2.drawImage(i, d2 / this.scale, m2 / this.scale, u2 / this.scale, g2 / this.scale)) : t2.drawImage(i, d2, m2, u2, g2);
          break;
        case 1:
        case -3:
          this.full ? (c(p / this.scale, l / this.scale), d2 = d2 / this.scale + (u2 / this.scale - g2 / this.scale) / 2, m2 = m2 / this.scale + (g2 / this.scale - u2 / this.scale) / 2, t2.rotate(90 * s * Math.PI / 180), t2.drawImage(i, m2, -d2 - g2 / this.scale, u2 / this.scale, g2 / this.scale)) : (d2 += (u2 - g2) / 2, m2 += (g2 - u2) / 2, t2.rotate(90 * s * Math.PI / 180), t2.drawImage(i, m2, -d2 - g2, u2, g2));
          break;
        case 2:
        case -2:
          this.full ? (c(p / this.scale, l / this.scale), t2.rotate(90 * s * Math.PI / 180), d2 /= this.scale, m2 /= this.scale, t2.drawImage(i, -d2 - u2 / this.scale, -m2 - g2 / this.scale, u2 / this.scale, g2 / this.scale)) : (t2.rotate(90 * s * Math.PI / 180), t2.drawImage(i, -d2 - u2, -m2 - g2, u2, g2));
          break;
        case 3:
        case -1:
          this.full ? (c(p / this.scale, l / this.scale), d2 = d2 / this.scale + (u2 / this.scale - g2 / this.scale) / 2, m2 = m2 / this.scale + (g2 / this.scale - u2 / this.scale) / 2, t2.rotate(90 * s * Math.PI / 180), t2.drawImage(i, -m2 - u2 / this.scale, d2, u2 / this.scale, g2 / this.scale)) : (d2 += (u2 - g2) / 2, m2 += (g2 - u2) / 2, t2.rotate(90 * s * Math.PI / 180), t2.drawImage(i, -m2 - u2, d2, u2, g2));
          break;
        default:
          this.full ? (c(p / this.scale, l / this.scale), t2.drawImage(i, d2 / this.scale, m2 / this.scale, u2 / this.scale, g2 / this.scale)) : t2.drawImage(i, d2, m2, u2, g2);
      }
      t2.restore();
    } else {
      let t2 = h * this.scale, r2 = o * this.scale, a2 = e.getContext("2d");
      switch (a2.save(), s) {
        case 0:
          c(t2, r2), a2.drawImage(i, 0, 0, t2, r2);
          break;
        case 1:
        case -3:
          c(r2, t2), a2.rotate(90 * s * Math.PI / 180), a2.drawImage(i, 0, -r2, t2, r2);
          break;
        case 2:
        case -2:
          c(t2, r2), a2.rotate(90 * s * Math.PI / 180), a2.drawImage(i, -t2, -r2, t2, r2);
          break;
        case 3:
        case -1:
          c(r2, t2), a2.rotate(90 * s * Math.PI / 180), a2.drawImage(i, -t2, 0, t2, r2);
          break;
        default:
          c(t2, r2), a2.drawImage(i, 0, 0, t2, r2);
      }
      a2.restore();
    }
    t(e);
  }, this.img.substr(0, 4) !== "data" && (i.crossOrigin = "Anonymous"), i.src = this.imgs;
}, getCropData(t) {
  this.getCropChecked((e) => {
    t(e.toDataURL("image/" + this.outputType, this.outputSize));
  });
}, getCropBlob(t) {
  this.getCropChecked((e) => {
    e.toBlob((e2) => t(e2), "image/" + this.outputType, this.outputSize);
  });
}, showPreview() {
  if (!this.isCanShow)
    return false;
  this.isCanShow = false, setTimeout(() => {
    this.isCanShow = true;
  }, 16);
  let t = this.cropW, e = this.cropH, i = this.scale;
  var s = {};
  s.div = { width: `${t}px`, height: `${e}px` };
  let h = (this.x - this.cropOffsertX) / i, o = (this.y - this.cropOffsertY) / i;
  s.w = t, s.h = e, s.url = this.imgs, s.img = { width: `${this.trueWidth}px`, height: `${this.trueHeight}px`, transform: `scale(${i})translate3d(${h}px, ${o}px, 0px)rotateZ(${90 * this.rotate}deg)` }, s.html = `
      <div class="show-preview" style="width: ${s.w}px; height: ${s.h}px,; overflow: hidden">
        <div style="width: ${t}px; height: ${e}px">
          <img src=${s.url} style="width: ${this.trueWidth}px; height: ${this.trueHeight}px; transform:
          scale(${i})translate3d(${h}px, ${o}px, 0px)rotateZ(${90 * this.rotate}deg)">
        </div>
      </div>`, this.$emit("realTime", s), this.$emit("real-time", s);
}, reload() {
  let t = new Image();
  t.onload = () => {
    this.w = parseFloat(window.getComputedStyle(this.$refs.cropper).width), this.h = parseFloat(window.getComputedStyle(this.$refs.cropper).height), this.trueWidth = t.width, this.trueHeight = t.height, this.original ? this.scale = 1 : this.scale = this.checkedMode(), this.$nextTick(() => {
      this.x = -(this.trueWidth - this.trueWidth * this.scale) / 2 + (this.w - this.trueWidth * this.scale) / 2, this.y = -(this.trueHeight - this.trueHeight * this.scale) / 2 + (this.h - this.trueHeight * this.scale) / 2, this.loading = false, this.autoCrop && this.goAutoCrop(), this.$emit("img-load", "success"), this.$emit("imgLoad", "success"), setTimeout(() => {
        this.showPreview();
      }, 20);
    });
  }, t.onerror = () => {
    this.$emit("imgLoad", "error"), this.$emit("img-load", "error");
  }, t.src = this.imgs;
}, checkedMode() {
  let t = 1, e = this.trueWidth, i = this.trueHeight;
  const s = this.mode.split(" ");
  switch (s[0]) {
    case "contain":
      this.trueWidth > this.w && (t = this.w / this.trueWidth), this.trueHeight * t > this.h && (t = this.h / this.trueHeight);
      break;
    case "cover":
      e = this.w, t = e / this.trueWidth, i *= t, i < this.h && (i = this.h, t = i / this.trueHeight);
      break;
    default:
      try {
        let h = s[0];
        if (h.search("px") !== -1) {
          h = h.replace("px", ""), e = parseFloat(h);
          const o = e / this.trueWidth;
          let r = 1, a = s[1];
          a.search("px") !== -1 && (a = a.replace("px", ""), i = parseFloat(a), r = i / this.trueHeight), t = Math.min(o, r);
        }
        if (h.search("%") !== -1 && (h = h.replace("%", ""), e = parseFloat(h) / 100 * this.w, t = e / this.trueWidth), s.length === 2 && h === "auto") {
          let e2 = s[1];
          e2.search("px") !== -1 && (e2 = e2.replace("px", ""), i = parseFloat(e2), t = i / this.trueHeight), e2.search("%") !== -1 && (e2 = e2.replace("%", ""), i = parseFloat(e2) / 100 * this.h, t = i / this.trueHeight);
        }
      } catch (h) {
        t = 1;
      }
  }
  return t;
}, goAutoCrop(t, e) {
  if (this.imgs === "" || this.imgs === null)
    return;
  this.clearCrop(), this.cropping = true;
  let i = this.w, s = this.h;
  if (this.centerBox) {
    const t2 = Math.abs(this.rotate) % 2 > 0;
    let e2 = (t2 ? this.trueHeight : this.trueWidth) * this.scale, h2 = (t2 ? this.trueWidth : this.trueHeight) * this.scale;
    i = e2 < i ? e2 : i, s = h2 < s ? h2 : s;
  }
  var h = t || parseFloat(this.autoCropWidth), o = e || parseFloat(this.autoCropHeight);
  h !== 0 && o !== 0 || (h = 0.8 * i, o = 0.8 * s), h = h > i ? i : h, o = o > s ? s : o, this.fixed && (o = h / this.fixedNumber[0] * this.fixedNumber[1]), o > this.h && (h = (o = this.h) / this.fixedNumber[1] * this.fixedNumber[0]), this.changeCrop(h, o);
}, changeCrop(t, e) {
  if (this.centerBox) {
    let i = this.getImgAxis();
    t > i.x2 - i.x1 && (e = (t = i.x2 - i.x1) / this.fixedNumber[0] * this.fixedNumber[1]), e > i.y2 - i.y1 && (t = (e = i.y2 - i.y1) / this.fixedNumber[1] * this.fixedNumber[0]);
  }
  this.cropW = t, this.cropH = e, this.checkCropLimitSize(), this.$nextTick(() => {
    this.cropOffsertX = (this.w - this.cropW) / 2, this.cropOffsertY = (this.h - this.cropH) / 2, this.centerBox && this.moveCrop(null, true);
  });
}, refresh() {
  this.img, this.imgs = "", this.scale = 1, this.crop = false, this.rotate = 0, this.w = 0, this.h = 0, this.trueWidth = 0, this.trueHeight = 0, this.clearCrop(), this.$nextTick(() => {
    this.checkedImg();
  });
}, rotateLeft() {
  this.rotate = this.rotate <= -3 ? 0 : this.rotate - 1;
}, rotateRight() {
  this.rotate = this.rotate >= 3 ? 0 : this.rotate + 1;
}, rotateClear() {
  this.rotate = 0;
}, checkoutImgAxis(t, e, i) {
  t = t || this.x, e = e || this.y, i = i || this.scale;
  let s = true;
  if (this.centerBox) {
    let h = this.getImgAxis(t, e, i), o = this.getCropAxis();
    h.x1 >= o.x1 && (s = false), h.x2 <= o.x2 && (s = false), h.y1 >= o.y1 && (s = false), h.y2 <= o.y2 && (s = false);
  }
  return s;
} }, mounted() {
  this.support = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== void 0 ? "mousewheel" : "DOMMouseScroll";
  let t = this;
  var e = navigator.userAgent;
  this.isIOS = !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), HTMLCanvasElement.prototype.toBlob || Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", { value: function(e2, i, s) {
    for (var h = atob(this.toDataURL(i, s).split(",")[1]), o = h.length, r = new Uint8Array(o), a = 0; a < o; a++)
      r[a] = h.charCodeAt(a);
    e2(new Blob([r], { type: t.type || "image/png" }));
  } }), this.showPreview(), this.checkedImg();
}, destroyed() {
  window.removeEventListener("mousemove", this.moveCrop), window.removeEventListener("mouseup", this.leaveCrop), window.removeEventListener("touchmove", this.moveCrop), window.removeEventListener("touchend", this.leaveCrop), this.cancelScale();
} });
pushScopeId("data-v-48aab112");
const d = { key: 0, class: "cropper-box" }, m = ["src"], f = { class: "cropper-view-box" }, w = ["src"], v = { key: 1 };
popScopeId(), g.render = function(t, e, i, u2, g2, C) {
  return openBlock(), createElementBlock("div", { class: "vue-cropper", ref: "cropper", onMouseover: e[28] || (e[28] = (...e2) => t.scaleImg && t.scaleImg(...e2)), onMouseout: e[29] || (e[29] = (...e2) => t.cancelScale && t.cancelScale(...e2)) }, [t.imgs ? (openBlock(), createElementBlock("div", d, [withDirectives(createElementVNode("div", { class: "cropper-box-canvas", style: normalizeStyle({ width: t.trueWidth + "px", height: t.trueHeight + "px", transform: "scale(" + t.scale + "," + t.scale + ") translate3d(" + t.x / t.scale + "px," + t.y / t.scale + "px,0)rotateZ(" + 90 * t.rotate + "deg)" }) }, [createElementVNode("img", { src: t.imgs, alt: "cropper-img", ref: "cropperImg" }, null, 8, m)], 4), [[vShow, !t.loading]])])) : createCommentVNode("", true), createElementVNode("div", { class: normalizeClass(["cropper-drag-box", { "cropper-move": t.move && !t.crop, "cropper-crop": t.crop, "cropper-modal": t.cropping }]), onMousedown: e[0] || (e[0] = (...e2) => t.startMove && t.startMove(...e2)), onTouchstart: e[1] || (e[1] = (...e2) => t.startMove && t.startMove(...e2)) }, null, 34), withDirectives(createElementVNode("div", { class: "cropper-crop-box", style: normalizeStyle({ width: t.cropW + "px", height: t.cropH + "px", transform: "translate3d(" + t.cropOffsertX + "px," + t.cropOffsertY + "px,0)" }) }, [createElementVNode("span", f, [createElementVNode("img", { style: normalizeStyle({ width: t.trueWidth + "px", height: t.trueHeight + "px", transform: "scale(" + t.scale + "," + t.scale + ") translate3d(" + (t.x - t.cropOffsertX) / t.scale + "px," + (t.y - t.cropOffsertY) / t.scale + "px,0)rotateZ(" + 90 * t.rotate + "deg)" }), src: t.imgs, alt: "cropper-img" }, null, 12, w)]), createElementVNode("span", { class: "cropper-face cropper-move", onMousedown: e[2] || (e[2] = (...e2) => t.cropMove && t.cropMove(...e2)), onTouchstart: e[3] || (e[3] = (...e2) => t.cropMove && t.cropMove(...e2)) }, null, 32), t.info ? (openBlock(), createElementBlock("span", { key: 0, class: "crop-info", style: normalizeStyle({ top: t.cropInfo.top }) }, toDisplayString(t.cropInfo.width) + " \xD7 " + toDisplayString(t.cropInfo.height), 5)) : createCommentVNode("", true), t.fixedBox ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", v, [createElementVNode("span", { class: "crop-line line-w", onMousedown: e[4] || (e[4] = (e2) => t.changeCropSize(e2, false, true, 0, 1)), onTouchstart: e[5] || (e[5] = (e2) => t.changeCropSize(e2, false, true, 0, 1)) }, null, 32), createElementVNode("span", { class: "crop-line line-a", onMousedown: e[6] || (e[6] = (e2) => t.changeCropSize(e2, true, false, 1, 0)), onTouchstart: e[7] || (e[7] = (e2) => t.changeCropSize(e2, true, false, 1, 0)) }, null, 32), createElementVNode("span", { class: "crop-line line-s", onMousedown: e[8] || (e[8] = (e2) => t.changeCropSize(e2, false, true, 0, 2)), onTouchstart: e[9] || (e[9] = (e2) => t.changeCropSize(e2, false, true, 0, 2)) }, null, 32), createElementVNode("span", { class: "crop-line line-d", onMousedown: e[10] || (e[10] = (e2) => t.changeCropSize(e2, true, false, 2, 0)), onTouchstart: e[11] || (e[11] = (e2) => t.changeCropSize(e2, true, false, 2, 0)) }, null, 32), createElementVNode("span", { class: "crop-point point1", onMousedown: e[12] || (e[12] = (e2) => t.changeCropSize(e2, true, true, 1, 1)), onTouchstart: e[13] || (e[13] = (e2) => t.changeCropSize(e2, true, true, 1, 1)) }, null, 32), createElementVNode("span", { class: "crop-point point2", onMousedown: e[14] || (e[14] = (e2) => t.changeCropSize(e2, false, true, 0, 1)), onTouchstart: e[15] || (e[15] = (e2) => t.changeCropSize(e2, false, true, 0, 1)) }, null, 32), createElementVNode("span", { class: "crop-point point3", onMousedown: e[16] || (e[16] = (e2) => t.changeCropSize(e2, true, true, 2, 1)), onTouchstart: e[17] || (e[17] = (e2) => t.changeCropSize(e2, true, true, 2, 1)) }, null, 32), createElementVNode("span", { class: "crop-point point4", onMousedown: e[18] || (e[18] = (e2) => t.changeCropSize(e2, true, false, 1, 0)), onTouchstart: e[19] || (e[19] = (e2) => t.changeCropSize(e2, true, false, 1, 0)) }, null, 32), createElementVNode("span", { class: "crop-point point5", onMousedown: e[20] || (e[20] = (e2) => t.changeCropSize(e2, true, false, 2, 0)), onTouchstart: e[21] || (e[21] = (e2) => t.changeCropSize(e2, true, false, 2, 0)) }, null, 32), createElementVNode("span", { class: "crop-point point6", onMousedown: e[22] || (e[22] = (e2) => t.changeCropSize(e2, true, true, 1, 2)), onTouchstart: e[23] || (e[23] = (e2) => t.changeCropSize(e2, true, true, 1, 2)) }, null, 32), createElementVNode("span", { class: "crop-point point7", onMousedown: e[24] || (e[24] = (e2) => t.changeCropSize(e2, false, true, 0, 2)), onTouchstart: e[25] || (e[25] = (e2) => t.changeCropSize(e2, false, true, 0, 2)) }, null, 32), createElementVNode("span", { class: "crop-point point8", onMousedown: e[26] || (e[26] = (e2) => t.changeCropSize(e2, true, true, 2, 2)), onTouchstart: e[27] || (e[27] = (e2) => t.changeCropSize(e2, true, true, 2, 2)) }, null, 32)]))], 4), [[vShow, t.cropping]])], 544);
}, g.__scopeId = "data-v-48aab112";
typeof window != "undefined" && window.Vue && window.Vue.createApp({}).component("VueCropper", g);
var H5Cropper_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = defineComponent({
  name: "H5Cropper",
  components: {
    VueCropper: g
  },
  props: {
    hideInput: {
      type: Boolean,
      default: () => false
    },
    option: {
      type: Object,
      default: () => {
      }
    }
  },
  setup(props, ctx) {
    const cropper = ref(null);
    const headinput = ref(null);
    const img = ref("");
    const defaultConfig = {
      ceilbutton: false,
      outputSize: 1,
      outputType: "png",
      info: false,
      canScale: true,
      autoCrop: false,
      autoCropWidth: 0,
      autoCropHeight: 0,
      fixed: true,
      fixedNumber: [1, 1],
      full: false,
      fixedBox: true,
      canMove: true,
      canMoveBox: false,
      original: false,
      centerBox: true,
      high: true,
      infoTrue: false,
      maxImgSize: 2e3,
      enlarge: 1,
      mode: "100%",
      cancelButtonText: "\u53D6\u6D88",
      confirmButtonText: "\u786E\u5B9A",
      cancelButtonBackgroundColor: "#606266",
      confirmButtonBackgroundColor: "#ed594c",
      cancelButtonTextColor: "#ffffff",
      confirmButtonTextColor: "#ffffff"
    };
    const config = reactive(__spreadValues(__spreadValues({}, defaultConfig), props.option));
    function moving(e) {
      let modal = document.getElementsByClassName("cropper-modal")[0];
      if (e.moving) {
        modal.style = "background-color: rgba(0,0,0,0.5);transition: 0.88s";
      } else {
        modal.style = "background-color: rgba(0,0,0,0.8);transition: 0.88s";
      }
    }
    async function upphoto(e) {
      let photourl = e.target.files[0];
      if (photourl != void 0) {
        ctx.emit("imgorigoinf", photourl);
        img.value = await onloadimg(photourl);
        config.autoCrop = true;
        setTimeout(() => {
          addsolide();
        }, 10);
      }
    }
    function onloadimg(photourl) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        reader.readAsDataURL(photourl);
        reader.onload = (e) => {
          resolve(e.target["result"]);
        };
      });
    }
    function canceltailor() {
      img.value = "";
      ctx.emit("canceltailor");
    }
    function tailoring() {
      cropper.value.getCropData((data) => {
        ctx.emit("getbase64Data", data);
        ctx.emit("getbase64", data);
        img.value = "";
        config.autoCrop = false;
      });
      cropper.value.getCropBlob((data) => {
        ctx.emit("getblobData", data);
        ctx.emit("getblob", data);
        const suffix = {
          jpeg: "jpg",
          png: "png",
          webp: "webp"
        }[config.outputType];
        const time = new Date().getTime();
        const file = new File([data], `${time}.${suffix}`, {
          type: `image/${config.outputType}`
        });
        ctx.emit("getFile", file);
        ctx.emit("get-file", file);
        img.value = "";
        config.autoCrop = false;
      });
    }
    function rotating() {
      cropper.value.rotateRight();
      let modal = document.getElementsByClassName("cropper-modal")[0];
      modal.style = "background-color: rgba(0,0,0,0.5);transition: 0.88s";
    }
    function addsolide() {
      if (document.getElementById("vertical") == null) {
        let box = document.getElementsByClassName("cropper-crop-box")[0];
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
        let verticalRight = document.createElement("div");
        verticalRight.style.width = "1px";
        verticalRight.style.height = "100%";
        verticalRight.style.top = "0px";
        verticalRight.style.right = "33%";
        verticalRight.style.position = "absolute";
        verticalRight.style.backgroundColor = "#fff";
        verticalRight.style.zIndex = "522";
        verticalRight.style.opacity = "0.5";
        let verticalTop = document.createElement("div");
        verticalTop.style.width = "100%";
        verticalTop.style.height = "1px";
        verticalTop.style.top = "33%";
        verticalTop.style.left = "0px";
        verticalTop.style.position = "absolute";
        verticalTop.style.backgroundColor = "#fff";
        verticalTop.style.zIndex = "522";
        verticalTop.style.opacity = "0.5";
        let verticalBottom = document.createElement("div");
        verticalBottom.style.width = "100%";
        verticalBottom.style.height = "1px";
        verticalBottom.style.bottom = "33%";
        verticalBottom.style.left = "0px";
        verticalBottom.style.position = "absolute";
        verticalBottom.style.backgroundColor = "#fff";
        verticalBottom.style.zIndex = "522";
        verticalBottom.style.opacity = "0.5";
        let LeftTopSide = document.createElement("div");
        LeftTopSide.style.width = "30px";
        LeftTopSide.style.height = "4px";
        LeftTopSide.style.top = "-4px";
        LeftTopSide.style.left = "-4px";
        LeftTopSide.style.position = "absolute";
        LeftTopSide.style.backgroundColor = "#fff";
        LeftTopSide.style.zIndex = "522";
        LeftTopSide.style.opacity = "1";
        let TopListSide = document.createElement("div");
        TopListSide.style.width = "4px";
        TopListSide.style.height = "30px";
        TopListSide.style.top = "-4px";
        TopListSide.style.left = "-4px";
        TopListSide.style.position = "absolute";
        TopListSide.style.backgroundColor = "#fff";
        TopListSide.style.zIndex = "522";
        TopListSide.style.opacity = "1";
        let RightTopSide = document.createElement("div");
        RightTopSide.style.width = "30px";
        RightTopSide.style.height = "4px";
        RightTopSide.style.top = "-4px";
        RightTopSide.style.right = "-4px";
        RightTopSide.style.position = "absolute";
        RightTopSide.style.backgroundColor = "#fff";
        RightTopSide.style.zIndex = "522";
        RightTopSide.style.opacity = "1";
        let TopRightSide = document.createElement("div");
        TopRightSide.style.width = "4px";
        TopRightSide.style.height = "30px";
        TopRightSide.style.top = "-4px";
        TopRightSide.style.right = "-4px";
        TopRightSide.style.position = "absolute";
        TopRightSide.style.backgroundColor = "#fff";
        TopRightSide.style.zIndex = "522";
        TopRightSide.style.opacity = "1";
        let LeftBottomSide = document.createElement("div");
        LeftBottomSide.style.width = "30px";
        LeftBottomSide.style.height = "4px";
        LeftBottomSide.style.bottom = "-4px";
        LeftBottomSide.style.left = "-4px";
        LeftBottomSide.style.position = "absolute";
        LeftBottomSide.style.backgroundColor = "#fff";
        LeftBottomSide.style.zIndex = "522";
        LeftBottomSide.style.opacity = "1";
        let BottomListSide = document.createElement("div");
        BottomListSide.style.width = "4px";
        BottomListSide.style.height = "30px";
        BottomListSide.style.bottom = "-4px";
        BottomListSide.style.left = "-4px";
        BottomListSide.style.position = "absolute";
        BottomListSide.style.backgroundColor = "#fff";
        BottomListSide.style.zIndex = "522";
        BottomListSide.style.opacity = "1";
        let RightBottomSide = document.createElement("div");
        RightBottomSide.style.width = "30px";
        RightBottomSide.style.height = "4px";
        RightBottomSide.style.bottom = "-4px";
        RightBottomSide.style.right = "-4px";
        RightBottomSide.style.position = "absolute";
        RightBottomSide.style.backgroundColor = "#fff";
        RightBottomSide.style.zIndex = "522";
        RightBottomSide.style.opacity = "1";
        let BottomRightSide = document.createElement("div");
        BottomRightSide.style.width = "4px";
        BottomRightSide.style.height = "30px";
        BottomRightSide.style.bottom = "-4px";
        BottomRightSide.style.right = "-4px";
        BottomRightSide.style.position = "absolute";
        BottomRightSide.style.backgroundColor = "#fff";
        BottomRightSide.style.zIndex = "522";
        BottomRightSide.style.opacity = "1";
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
    }
    return {
      config,
      moving,
      upphoto,
      img,
      cropper,
      headinput,
      canceltailor,
      tailoring,
      rotating
    };
  }
});
const _hoisted_1 = { class: "upbtn" };
const _hoisted_2 = {
  key: 1,
  class: "bg"
};
const _hoisted_3 = {
  key: 0,
  class: "btndiv"
};
const _hoisted_4 = { class: "wrapper" };
const _hoisted_5 = {
  key: 1,
  class: "btndiv"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_vueCropper = resolveComponent("vueCropper");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    !_ctx.hideInput ? (openBlock(), createElementBlock("input", {
      key: 0,
      style: { "opacity": "0" },
      class: "upbtn",
      type: "file",
      accept: "image/*",
      onChange: _cache[0] || (_cache[0] = ($event) => _ctx.upphoto($event)),
      ref: "headinput"
    }, null, 544)) : createCommentVNode("", true),
    _ctx.img ? (openBlock(), createElementBlock("div", _hoisted_2, [
      _ctx.config.ceilbutton ? (openBlock(), createElementBlock("div", _hoisted_3, [
        createElementVNode("div", {
          class: "btn",
          onClick: _cache[1] || (_cache[1] = (...args) => _ctx.canceltailor && _ctx.canceltailor(...args)),
          style: normalizeStyle({
            backgroundColor: _ctx.config.cancelButtonBackgroundColor,
            color: _ctx.config.cancelButtonTextColor
          })
        }, toDisplayString(_ctx.config.cancelButtonText), 5),
        createElementVNode("div", {
          class: "img",
          onClick: _cache[2] || (_cache[2] = (...args) => _ctx.rotating && _ctx.rotating(...args))
        }),
        createElementVNode("div", {
          class: "btn",
          onClick: _cache[3] || (_cache[3] = (...args) => _ctx.tailoring && _ctx.tailoring(...args)),
          style: normalizeStyle({
            backgroundColor: _ctx.config.confirmButtonBackgroundColor,
            color: _ctx.config.confirmButtonTextColor
          })
        }, toDisplayString(_ctx.config.confirmButtonText), 5)
      ])) : createCommentVNode("", true),
      createElementVNode("div", _hoisted_4, [
        createVNode(_component_vueCropper, {
          id: "cropper",
          ref: "cropper",
          img: _ctx.img,
          outputSize: _ctx.config.outputSize,
          outputType: _ctx.config.outputType,
          info: _ctx.config.info,
          canScale: _ctx.config.canScale,
          autoCrop: _ctx.config.autoCrop,
          autoCropWidth: _ctx.config.autoCropWidth,
          autoCropHeight: _ctx.config.autoCropHeight,
          fixed: _ctx.config.fixed,
          fixedNumber: _ctx.config.fixedNumber,
          full: _ctx.config.full,
          fixedBox: _ctx.config.fixedBox,
          canMove: _ctx.config.canMove,
          canMoveBox: _ctx.config.canMoveBox,
          original: _ctx.config.original,
          centerBox: _ctx.config.centerBox,
          high: _ctx.config.high,
          infoTrue: _ctx.config.infoTrue,
          maxImgSize: _ctx.config.maxImgSize,
          enlarge: _ctx.config.enlarge,
          mode: _ctx.config.mode,
          onCropMoving: _cache[4] || (_cache[4] = ($event) => _ctx.moving($event)),
          onImgMoving: _cache[5] || (_cache[5] = ($event) => _ctx.moving($event))
        }, null, 8, ["img", "outputSize", "outputType", "info", "canScale", "autoCrop", "autoCropWidth", "autoCropHeight", "fixed", "fixedNumber", "full", "fixedBox", "canMove", "canMoveBox", "original", "centerBox", "high", "infoTrue", "maxImgSize", "enlarge", "mode"])
      ]),
      !_ctx.config.ceilbutton ? (openBlock(), createElementBlock("div", _hoisted_5, [
        createElementVNode("div", {
          class: "btn",
          onClick: _cache[6] || (_cache[6] = (...args) => _ctx.canceltailor && _ctx.canceltailor(...args)),
          style: normalizeStyle({
            backgroundColor: _ctx.config.cancelButtonBackgroundColor,
            color: _ctx.config.cancelButtonTextColor
          })
        }, toDisplayString(_ctx.config.cancelButtonText), 5),
        createElementVNode("div", {
          class: "img",
          onClick: _cache[7] || (_cache[7] = (...args) => _ctx.rotating && _ctx.rotating(...args))
        }),
        createElementVNode("div", {
          class: "btn",
          onClick: _cache[8] || (_cache[8] = (...args) => _ctx.tailoring && _ctx.tailoring(...args)),
          style: normalizeStyle({
            backgroundColor: _ctx.config.confirmButtonBackgroundColor,
            color: _ctx.config.confirmButtonTextColor
          })
        }, toDisplayString(_ctx.config.confirmButtonText), 5)
      ])) : createCommentVNode("", true)
    ])) : createCommentVNode("", true)
  ]);
}
var H5Cropper = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-675e13ee"]]);
export { H5Cropper as default };
