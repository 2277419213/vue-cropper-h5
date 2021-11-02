# 前言

> vue 日益成熟，但是已经成为了主流的前端开发框架之一，于是衍生出了很多跨平台应用，各种常见的 web 及 h5，在这个图片满天飞的时代，避免不了的就是上传图片，于是乎，诞生了一款来着 xyxiao001 大佬的[vue-cropper](https://github.com/xyxiao001/vue-cropper)，功能丰富还好用，唯一不足的就是对 h5 的样式支持比较滞后，于是乎这款超好用的 vue-cropper-h5 出现了！！！

## 地址

###### npm：[https://www.npmjs.com/package/vue-cropper-h5](https://www.npmjs.com/package/vue-cropper-h5)

###### yarn：[https://classic.yarnpkg.com/en/package/vue-cropper-h5](https://classic.yarnpkg.com/en/package/vue-cropper-h5)

###### cnpm：[https://developer.aliyun.com/mirror/npm/package/vue-cropper-h5](https://developer.aliyun.com/mirror/npm/package/vue-cropper-h5)

###### jsdelivr(cdn)：[https://www.jsdelivr.com/package/npm/vue-cropper-h5](https://www.jsdelivr.com/package/npm/vue-cropper-h5)

###### unpkg(cdn)：[https://unpkg.com/vue-cropper-h5@1.1.9/dist/index.js](https://unpkg.com/vue-cropper-h5@1.1.9/dist/index.js)

###### github：[https://github.com/2277419213/vue-cropper-h5](https://github.com/2277419213/vue-cropper-h5)

###### gitee：[https://gitee.com/JuLizhanzhan/vue-cropper-h5](https://gitee.com/JuLizhanzhan/vue-cropper-h5)

## 食用方式

### 安装

```shell
npm install vue-cropper-h5

or

yarn add vue-cropper-h5

or

cnpm install vue-cropper-h5
```

### 支持 vue3.0 熟悉的样式熟悉的配参

```
npm install vue-cropper-h5@next
yarn 和 cnpm 同上
```

### 安装不下来？

```
//有可能应为墙的原因，导致您安装不了github的模块，您可以试试vue-cropper-h5@china这个版本，我把他放到了gitee上
npm install vue-cropper-h5@china
yarn 和 cnpm 同上
```

### 普通使用

```
<template>
  <div id="app">
    <h5-cropper></h5-cropper>
  </div>
</template>

<script>
// 局部引入
import H5Cropper  from 'vue-cropper-h5'
export default {
  name: 'App',
  components: { H5Cropper }
};

// 全局引入
import H5Cropper from 'vue-cropper-h5'
Vue.use(H5Cropper)

//注意！！！vue3.0版本需要引入样式
import "vue-cropper-h5/dist/style.css";
//鹅🐧外提醒，若运行报错，请检查或更新下自己的vue版本
</script>
```

### cdn 使用(版本详见[jsdelivr](https://www.jsdelivr.com/package/npm/vue-cropper-h5))

#### 示例

简单示例：[simple](./example/cdn/simple.html)  
高级示例(配合各种组件库的 Upload 使用)：[hide-input](./example/cdn/hide-input.html)

```
引入
<script src="https://cdn.jsdelivr.net/npm/vue-cropper-h5@1.1.9/dist/index.min.js"></script>

使用
<h5-cropper></h5-cropper>

事件
| getbase64 | 获取裁剪完成的 Base64 数据 |
| getblob | 获取裁剪完成的 Blob 数据 |
| get-file | 获取裁剪完成的 File 数据 |
```

## Dome

```
<template>
  <div class="dome">
    <div class="cropper">
      <img :src="img" class="img" />
      <!-- option是配置，格式是对象，getbase64Data是组件的一个方法获取裁剪完的头像 2.14新增一个获取getblobData的方法 -->
      <h5-cropper :option="option" @getbase64Data="getbase64Data" @getblobData="getblobData" @getFile="getFile"></h5-cropper>
    </div>
    <div class="info">
      <div>作者：居里栈栈</div>
      <div>Wechat：812936565</div>
    </div>
  </div>
</template>

<script>
import H5Cropper from "vue-cropper-h5";
export default {
  components: { H5Cropper },
  data() {
    return {
      option: {}, //配置
      img:
        "http://geren.yi-school.top/images/logo.png"
    };
  },
  methods: {
    getbase64Data(data) {
      this.img = data;
    }
  }
};
</script>

<style scoped>
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
```

## 演示网站

###### 可以到[http://www.yi-school.top](http://www.yi-school.top)查看效果演示

## Attr

感谢 Violet_Ice 紫冰提供的更新
| 名称 | 说明 | 默认值 | 可选值 |
| :--- | :--- | :--- | :--- |
| hide-input | 隐藏默认的`<input type="file" />` | false | true or false |
| option | vue-cropper 的 Attr 配置 | {} | 详见[Option 及默认配置](#Option及默认配置) |

## Option 及默认配置

关于配置详细信息，请查看源文档，感谢原作者 xyxiao001 大佬的[vue-cropper](https://github.com/xyxiao001/vue-cropper)
| 名称 | 功能 | 默认值 | 可选值 |
| :--- | :--- | :--- | :--- |
| ceilbutton | 操作按钮是否在顶部 | false | true or false |
| outputSize | 裁剪生成图片的质量 | 1 | 0.1 - 1 |
| outputType | 裁剪生成图片的格式 | png | jpeg(就是 jpg) or png or webp |
| info | 裁剪框的大小信息 | false | true or false |
| canScale | 图片是否允许滚轮缩放 | true(这个手机上用不到，电脑调试有用) | true or false |
| autoCropWidth | 默认生成截图框宽度 | 容器的 80% | 0~max |
| autoCropHeight | 默认生成截图框高度 | 容器的 80% | 0~max |
| fixed | 是否开启截图框宽高固定比例 | true | true or false |
| fixedNumber | 截图框的宽高比例 | [1, 1] | [宽度, 高度] |
| full | 是否输出原图比例的截图 | false | true or false |
| fixedBox | 固定截图框大小 不允许改变 | true | true or false |
| canMove | 上传图片是否可以移动 | true | true or false |
| canMoveBox | 截图框能否拖动 | false | true or false |
| original | 上传图片按照原始比例渲染 | false | true or false |
| centerBox | 截图框是否被限制在图片里面 | true | true or false |
| high | 是否按照设备的 dpr 输出等比例图片 | true | true or false |
| infoTrue | true 为展示真实输出图片宽高 false 展示看到的截图框宽高 | false | true or false |
| maxImgSize | 限制图片最大宽度和高度 | 2000 | 0-max |
| enlarge | 图片根据截图框输出比例倍数 | 1 | 0-max(建议不要太大不然会卡死的呢) |
| mode | 图片默认渲染方式 | 100% | contain, cover, 100px, 100% auto |
| cancelButtonText | 取消按钮文本 | 取消 | -- |
| confirmButtonText | 确定按钮文本 | 确定 | -- |
| cancelButtonBackgroundColor | 取消按钮背景色 | #606266 | -- |
| confirmButtonBackgroundColor | 确定按钮背景色 | #ed594c | -- |
| cancelButtonTextColor | 取消按钮字体色 | #ffffff | -- |
| confirmButtonTextColor | 确定按钮字体色 | #ffffff | -- |

## 事件

| 事件名        | 说明                                                 | 参数   |
| :------------ | :--------------------------------------------------- | :----- |
| getbase64Data | 获取裁剪完成的 Base64 数据                           | Base64 |
| getbase64     | 同上，兼容 CDN 使用                                  | base64 |
| getblobData   | 获取裁剪完成的 Blob 数据                             | Blob   |
| getblob       | 同上，兼容 CDN 使用                                  | Blob   |
| getFile       | 获取裁剪完成的 File 数据                             | File   |
| get-file      | 同上，兼容 CDN 使用                                  | File   |
| imgorigoinf   | 获取裁剪前照片的数据（使用 `hide-input` 后不会触发） | file   |
| canceltailor  | 进入裁剪框页面按取消按钮触发                         | --     |

## 接口

感谢 Violet_Ice 紫冰提供的更新，loadBase64 使用了正则校验：[Base64 格式校验正则](https://learnku.com/articles/42295)
| 接口名 | 说明 | 参数 |
| :--- | :--- | :--- |
| loadFile | 允许用户自行传入文件(配合 `hide-input` 使用) | \<file\> |
| loadBase64 | 允许用户自行传入 Base64 (配合 `hide-input` 使用) | \<base64\> |

## 版本

## vue3.0

### 2.0.0

发布支持 vue3.0 的组件，还是熟悉的样式，还是熟悉的配参

## vue2.0

### 1.2.5

更新下文档，新增国内镜像版本，以及支持 vue3.0 的版本

### 1.2.4

修复了下载失败的问题@[Issues#38](https://github.com/2277419213/vue-cropper-h5/issues/38)，这个问题和之前 1.2.1 是一样的，原先我放在了 coding，coding 修改了规则，后面我放回 github，现在又莫名的超时，所以我打算放回 gitee，虽然我很少用 gitee，所以有什么问题，还是比较欢迎在 github 上给我提出[GitHub Issues](https://github.com/2277419213/vue-cropper-h5/issues)

### 1.2.3

更新了原作者修复的 bug，关于 ios13.4 图片旋转的问题

### 1.2.2

加入了用户点击取消按钮的回调事件(canceltailor)事件@[Issues#13](https://github.com/2277419213/vue-cropper-h5/issues/13)  
优化了按钮在部分手机上的样式问题，感谢@[尤小小](https://github.com/habc0807)提出的问题  
加入按钮的可配置选项，文字，文字颜色，背景色，详见[Option 及默认配置](#Option及默认配置)

### 1.2.1

因为之前为了适配 h5，我对原作者的 vue-cropper 有一点小修改，后面是放在 coding 上，然后 coding 改了路由规则，于是 npm 下载就报错了，感谢发现的热心码友告诉我，我得以即时更新，现在仓库挪到了 github 上，可能有点慢  
请耐心等待，其次 1.2.1 更新了原作者修复的 bug，关于谷歌 81 内核和 ios13.5 的图片旋转的，我也一并同步了，有兴趣的朋友可以去看看https://www.chromestatus.com/feature/6313474512650240

### 1.2.0

新增 getFile 和 get-file 获取裁剪完成的 File 数据，感谢@[Violet_Ice 紫冰](https://github.com/violetice)

### 1.1.9

更新了一下 cdn 引入时的事件，因为之前事件 getbase64Data 和 getblobData 会在 cdn 引入的时候出现无法响应的情况，具体原因不明，如有大佬知道麻烦告知一下，谢谢！  
于是在不影响旧事件的前提下，新增 getbase64 和 getblob 方法，方便各位 cdn 引入的朋友调用，感谢@[awen1988](https://github.com/awen1988),提出的问题及解决方案！

### 1.1.8

感谢下@[Violet_Ice 紫冰](https://github.com/violetice)，一个很厉害的大佬，指出了我很多不规范的地方，还新加了两个接口（详见[接口](#接口)，也看了大佬指导的[样式篇规范](https://fly.layui.com/jie/29160/)收益颇丰，再次感谢大佬！  
感谢下第二位大佬，我的朋友@[umbrella22](https://github.com/umbrella22)贡献了一套他的 webpack 配置，顺带帮我优化了一下，再次感谢大佬！

### 1.1.7

部分码友反映称，原始图片太小会显示得很小，于是修改下默认渲染方式 mode

### 1.1.6

新增@imgorigoinf 方法,用于获取裁剪前照片的数据（File）

### 1.1.5

新增@getblobData 方法,用于获取裁剪完成的照片 blob 数据

### 1.1.4

感谢码友提供的建议，由于很多不在微信浏览器使用，会有浏览器原生的菜单栏挡住底部按钮，现增加 Boolean(ceilbutton),可以自行选择按钮在底部还是顶部，默认底部

### 1.1.3

同步更新原作者 0.5 版本 vue-cropper,顺带限制了一下裁剪框最小大小

### 1.1.2

添加 transform-runtime

### 1.1.1

采用异步方法 onload 图片

### 1.1.0

修复一下裁剪框初始化时堆积在左上角的问题

### 1.0.8

修复一下裁剪框参数不生效的问题(踩坑，js 将未经申明的 Boolean 类型 false 等同于空字符串，if(false=='') => true)

### 1.0.7

如你所见，当前版本，1.0.2 和 1.0.0 已经用不了了，如果有兴趣或者意见建议，欢迎 Wechat 告诉我

### 1.0.2

灰度测试 不可更改 option 和没有预留方法

### 1.0.0

初步更新，后面改了项目配置已经用不了

## 鸣谢

##### 给我白嫖了很久的原作者 xyxiao001

大佬写了个 vue-cropper 基本百度搜索 vue 裁剪框就有很多教程都是指向 vue-cropper 的，理所当然我白嫖了很久，还白嫖进大佬群里，哈哈哈进群方式见原作者 github！[vue-cropper](https://github.com/xyxiao001/vue-cropper)

##### 一个很有想法的 UI Jane_Apricot

一个很有想法的 ui,主要这次封装是在和 ui 做外包项目，ui 提供要把 vue-cropper 改成和微信一样的思路包括细节，设计风格一贯简约新颖，有兴趣的话 WeChat 联系她吧(WeChat:Jane_Apricot)

##### 说一下我自己 JuLizhanzhan

更多常见我的 nickname 是居里栈栈,微信 QQ 同名，哈哈哈，其实我也就是一个在不断学习的学者，只是比别人稍微多一点行动力，譬如这次的 npm 模块封装，我从原本的啥都不会，到会发布，我很不好意思的想告诉你们，1.0.0 版本其实和 1.0.2 版本核心代码一样，只是一开始的懵，我 package.json 文件写错了运行不起来，然后因为 npm 仓库我原本以为和 GitHub 一样最后可以删掉重来，没有想到 npm 过了 24 小时就不可以删除了，所以就留一下尴尬的历史，不过试错也是成长的一部分，希望大家共同进步，学有所成，最后祝大家新年快乐啦，外带提一句寻找高薪工作（h5,web,小程序）和诚接外包项目，有兴趣的朋友们记得找我聊聊，WeChat:812936565(备注 GitHub)
