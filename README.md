# 前言

> vue日益成熟（虽然我还在用2.0没有上到3.0），但是已经成为了主流的前端开发框架之一，于是衍生出了很多跨平台应用，各种常见的web及h5，在这个图片满天飞的时代，避免不了的就是上传图片，于是乎，诞生了一款来着xyxiao001大佬的[vue-cropper](https://github.com/xyxiao001/vue-cropper)，功能丰富还好用，唯一不足的就是对h5的样式支持比较滞后，于是乎这款超好用的vue-cropper-h5出现了！！！

## 地址

###### npm：[https://www.npmjs.com/package/vue-cropper-h5](https://www.npmjs.com/package/vue-cropper-h5)
###### git：[https://github.com/2277419213/vue-cropper-h5](https://github.com/2277419213/vue-cropper-h5)

## 食用方式

```
安装
npm install vue-cropper-h5

组件内使用
import H5Cropper  from 'vue-cropper-h5' 
components: {
  H5Cropper,
},

main.js里面使用
import H5Cropper from 'vue-cropper-h5' 

Vue.use(H5Cropper)
```

## Dome

```
<template>
  <div class="dome">
    <div class="cropper">
      <img :src="img" class="img" />
      <!-- option是配置，格式是对象，getbase64Data是组件的一个方法获取裁剪完的头像 2.14新增一个获取getblobData的方法,有需要的自取 -->
      <H5Cropper :option="option" @getbase64Data="getbase64Data" @getblobData="getblobData"></H5Cropper>
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
        "http://diy.qqjay.com/u/files/2012/0217/31241e407e76134dab98e0aa5e0ccabd.jpg"
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

## 效果演示

###### GitHub有可能出现gif无法显示的问题，可以到[npm](https://www.npmjs.com/package/vue-cropper-h5)查看效果演示
![](http://gy7.gdzcbw.cn/file/h5img/cropperdome.gif)

## 配置文件及默认配置

关于配置详细信息，请查看源文档，感谢原作者xyxiao001大佬的[vue-cropper](https://github.com/xyxiao001/vue-cropper)
<table style="text-align: center">
  <thead>
    <tr>
        <td>名称</td>
        <td>功能</td>
        <td>默认值</td>
        <td>可选值</td>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>ceilbutton</td>
        <td>操作按钮是否在顶部</td>
        <td>false</td>
        <td>true || false</td>
    </tr>
    <tr>
        <td>outputSize</td>
        <td>裁剪生成图片的质量</td>
        <td>1</td>
        <td>0.1 - 1</td>
    </tr>
    <tr>
        <td>outputType</td>
        <td>裁剪生成图片的格式</td>
        <td>png</td>
        <td>jpeg(就是jpg) || png || webp</td>
    </tr>
    <tr>
        <td>info</td>
        <td>裁剪框的大小信息</td>
        <td>false</td>
        <td>true || false</td>
    </tr>
    <tr>
        <td>canScale</td>
        <td>图片是否允许滚轮缩放</td>
        <td>true 这个手机上用不到，电脑调试有用</td>
        <td>true || false</td>
    </tr>
    <tr>
        <td>autoCropWidth</td>
        <td>默认生成截图框宽度</td>
        <td>容器的80%</td>
        <td>0~max</td>
    </tr>
    <tr>
        <td>autoCropHeight</td>
        <td>默认生成截图框高度</td>
        <td>容器的80%</td>
        <td>0~max</td>
    </tr>
    <tr>
        <td>fixed</td>
        <td>是否开启截图框宽高固定比例</td>
        <td>true</td>
        <td>true | false</td>
    </tr>
    <tr>
        <td>fixedNumber</td>
        <td>截图框的宽高比例</td>
        <td>[1, 1]</td>
        <td>[宽度, 高度]</td>
    </tr>
    <tr>
        <td>full</td>
        <td>是否输出原图比例的截图</td>
        <td>false</td>
        <td>true | false</td>
    </tr>
    <tr>
        <td>fixedBox</td>
        <td>固定截图框大小 不允许改变</td>
        <td>true</td>
        <td>true | false</td>
    </tr>
    <tr>
        <td>canMove</td>
        <td>上传图片是否可以移动</td>
        <td>true</td>
        <td>true | false</td>
    </tr>
    <tr>
        <td>canMoveBox</td>
        <td>截图框能否拖动</td>
        <td>false</td>
        <td>true | false</td>
    </tr>
    <tr>
        <td>original</td>
        <td>上传图片按照原始比例渲染</td>
        <td>false</td>
        <td>true | false</td>
    </tr>
    <tr>
        <td>centerBox</td>
        <td>截图框是否被限制在图片里面</td>
        <td>true</td>
        <td>true | false</td>
    </tr>
	<tr>
        <td>high</td>
        <td>是否按照设备的dpr 输出等比例图片</td>
        <td>true</td>
        <td>true | false</td>
    </tr>
    <tr>
        <td>infoTrue</td>
        <td>true 为展示真实输出图片宽高  false 展示看到的截图框宽高</td>
        <td>false</td>
        <td>true | false</td>
    </tr>
    <tr>
        <td>maxImgSize</td>
        <td>限制图片最大宽度和高度</td>
        <td>2000</td>
        <td>0-max</td>
    </tr>
    <tr>
        <td>enlarge</td>
        <td>图片根据截图框输出比例倍数</td>
        <td>1</td>
        <td>0-max(建议不要太大不然会卡死的呢)</td>
    </tr>
    <tr>
        <td>mode</td>
        <td>图片默认渲染方式</td>
        <td>contain</td>
        <td>contain , cover, 100px, 100% auto</td>
    </tr>
  </tbody>
</table>

## 内置方法
### @getbase64Data 获取裁剪完成的base64数据
### @getblobData 获取裁剪完成的blob数据
### @imgorigoinf 获取裁剪前照片的数据（File）

## 版本

### 1.1.6
新增@imgorigoinf方法,用于获取裁剪前照片的数据（File）

### 1.1.5
新增@getblobData方法,用于获取裁剪完成的照片blob数据

### 1.1.4
感谢网友@PROMISE提供的建议，由于很多不在微信浏览器使用，会有浏览器原生的菜单栏挡住底部按钮，现增加Boolean(ceilbutton),可以自行选择按钮在底部还是顶部，默认底部

### 1.1.3
同步更新原作者0.5版本vue-cropper,顺带限制了一下裁剪框最小大小

### 1.1.2
添加transform-runtime

### 1.1.1
采用异步方法onload图片

### 1.1.0
修复一下裁剪框初始化时堆积在左上角的问题

### 1.0.8
修复一下裁剪框参数不生效的问题(踩坑，js将未经申明的Boolean类型false等同于空字符串，if(false=='') => true)

### 1.0.7
如你所见，当前版本，1.0.2和1.0.0已经用不了了，如果有兴趣或者意见建议，欢迎Wechat告诉我

### 1.0.2
灰度测试 不可更改option和没有预留方法

### 1.0.0
初步更新，后面改了项目配置已经用不了

## 鸣谢

##### 给我白嫖了很久的原作者 xyxiao001
大佬写了个vue-cropper基本百度搜索vue裁剪框就有很多教程都是指向vue-cropper的，理所当然我白嫖了很久，还白嫖进大佬群里，哈哈哈进群方式见原作者github！[vue-cropper](https://github.com/xyxiao001/vue-cropper)

##### 一个很有想法的UI Jane_Apricot
一个很有想法的ui,主要这次封装是在和ui做外包项目，ui提供要把vue-cropper改成和微信一样的思路包括细节，设计风格一贯简约新颖，有兴趣的话WeChat联系她吧(WeChat:Jane_Apricot)

##### 说一下我自己 JuLizhanzhan
更多常见我的nickname是居里栈栈,微信QQ同名，哈哈哈，其实我也就是一个在不断学习的学者，只是比别人稍微多一点行动力，譬如这次的npm模块封装，我从原本的啥都不会，到会发布，我很不好意思的想告诉你们，1.0.0版本其实和1.0.2版本核心代码一样，只是一开始的懵，我package.json文件写错了运行不起来，然后因为npm仓库我原本以为和GitHub一样最后可以删掉重来，没有想到npm过了24小时就不可以删除了，所以就留一下尴尬的历史，不过试错也是成长的一部分，希望大家共同进步，学有所成，最后祝大家新年快乐啦，外带提一句寻找高薪工作（h5,web,小程序）和诚接外包项目，有兴趣的朋友们记得找我聊聊，WeChat:812936565(备注GitHub)