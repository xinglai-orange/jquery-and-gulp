
## 项目介绍
本项目是一个基于gulp的移动端h5打包方案，其特点如下：
- 更适合中小型多页应用。
- 既可实现全后端分离，也可以生成后端渲染所需要的模板。
- 引入gulp-file-include的概念，方便多页面间对布局、组件的重用

## 使用说明
项目之前需要安装（全局）一下：gulp,sass,（按照依次顺序安装）
在本目录下 cmd(命令) 进入dos 执行：
    cnpm/npm install
调试和测试环境执行：
    gulp 
正式环境执行：
    gulp build

- 页面展示建议用vscode中的插件-liveServer，直接右下角go live打开浏览

## CLI命令(npm scripts)
| 命令           | 作用&效果        
| gulp           | 打包测试环境
| gulp build       | 打包正式环境-代码压缩

## 目录结构说明
```
├-dest # 编译后生成的所有代码、资源（图片、字体等，虽然只是简单的从源目录迁移过来）
├─node_modules # 利用npm管理的所有包及其依赖
├─sass # 所有sass样式--sass样式统一管理打包，不支持单独引用sass
├──────base # 基础样式
|    └─helper # 各个页面使用到的公共资源
|    |    ├─btn # 按钮
|    |    ├─_classes # 公共类名
|    |    ├─mixin,function # sass函数
|    |    ├─spacing # 间距
|    |    └─variables # 公共变量
|    └─include # 公共样式
├─doc # 储存项目相关文档账号信息
├─config.rb # sass 中的 compass 配置项
├─gulpfile.js # gulp 任务的编写
├─package.json:         不做任何陈述
├─src # 当前项目的源码
    include # 各个页面公共部分，模板文件等，统一以.htm结尾
    │  ├─header.htm # 页面顶部模板
    │  └─footer.htm # 页面底部模板
    └─lib # 各个页面使用到的公共资源
        ├─css # css资源
        ├─data # 数据json文件
        ├─iconfont # iconfont的字体文件
        ├─images # 公用的图片资源
        └─js # js独立文件，相关js插件组件,业务逻辑
```

## 公共模板使用方法
### 后缀对象为页面参数，在header.htm模块中使用@@title定义变量---注意：页面 定义参数 与 传递参数 必须完全一致
@@include("include/header.htm",{
    "title":"",
    "keywords": "",
    "description": ""
})
### 我定义了一个环境变量来判断测试/正式环境 @@name-test=测试环境，dev=正式环境 @@admain-正式/测试环境域名   方便通过模板适应不同环境

### 模板中可以使用if判断，方法如下
@@if (name == 'test') {
    //测试环境使用以下代码
}