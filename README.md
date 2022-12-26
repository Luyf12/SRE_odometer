# SRE_odometer
2022 ZJU Software Requirements Engineering Project<br>

本产品基于Double-C Analytics Dashboard平台，基于其可视化分析功能的基础之上，尤其针对 Pytorch项目，对其进行改造和升级。在我们的升级过后，使用者将可以可视化地观察被分析项目的活跃情况以及社区的发展速度，并监测各开发者对项目的贡献程度。除此之外，我们还可以通过pull request收集项目设计相关的讨论，并支持多个项目的横向比较。相比之前的平台，除了以上新增的功能以外，我们还将在性能上对项目进行改善，将数据缓存到本地，并优化从GitHub上获取数据的方法，提升用户获取信息的体验。对于平台的加载速度和并发度，我们也会在⼀定程度上进行提升。

### Usage

##### mongodb

* 参考这篇安装mongodb https://blog.csdn.net/weixin_41466575/article/details/105326230 ，不要全看！**从”在bin目录下执行mongo命令“这一条开始（包括这一条）不要看！**下载完后先看看mongodb的data目录下有没有“db”这个文件夹，没有就新创建一个
* 设置系统环境变量，比如我装的路径是这样：`d:\mongodb\bin`，加到系统环境变量PATH中

* 因为新版的mongodb没有Mongo.exe，需要安装mongosh(mongodb 的shell)。平时操作数据库就在mongosh中操作。
* 安装**mongosh**。参考 https://blog.csdn.net/qq_28550263/article/details/119892582 ，安装完就行了。启动的时候就直接点击mongosh就行，如果想方便点就添加到系统变量（比如我安装路径是d:\mogosh\mogosh.exe，就把d:\mogosh添加到系统变量，这样命令行就可以直接输入mogosh运行了)
* 注意mongosh在运行的时候，mongodb要保持打开。mongodb的打开关闭可以参考 https://blog.csdn.net/weixin_39182073/article/details/105861453 

##### github API

* 后端没有使用爬虫，而是直接使用了github的开源接口Octokit，通过这个接口可以很方便地直接访问到github资源，具体的用法可以参考 https://github.com/octokit/octokit.js ，这个暂时不用管。

* token获取：在backend/controllers/dash.js中，有这么一个东西：

  ```js
  const octokit = new Octokit({
    auth: `ghp_blablabalal`,
  });
  ```

  所有访问github的服务都需要授权，而这个auth是授权证书，你可以在 https://github.com/settings/tokens 中设置你自己的token。为了方便和统一，我已经设置了一个永不过期的token，`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` ，也即：

  ```js
  const octokit = new Octokit({
    auth: `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`,
  });
  ```


#### Start

```
cd backend
npm run install
cd client
npm run start
```

首先在backend和client中安装依赖

```js
cd backend
npm run start
```

显示“server is listening on port 4538.."表示后端运行成功

打开另一个终端

```js
cd client
npm run start
```

项目运行在 http://localhost:3000
