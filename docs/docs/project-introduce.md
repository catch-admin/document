# 目录结构
使用 `tp6` 开发，可以脱离 `app` 目录，本项目就是很好的例子，如果你的思维局限在 `app` 目录下，这将会给你一个很好范例，重新认识 `Tp`。而且在开发该项目时，弱化了多应用，取而代之是路由。
## 目录结构
```sh
|-- app
    |-- ExceptionHandle.php // 异常捕获
    |-- service.php // 核心服务注入
|-- catch // 核心目录
|-- config
    |-- catch.php // 配置文件
|-- extend
    |-- catcher // 扩展库目录
|-- public
    |-- catch-admin // 资源目录
|-- runtime
|-- route
|-- vendor
|-- view
```

## 核心目录
该目录是真正的开发目录，当然如果你不喜欢在此开发，也可以在 `app` 下开发，并没有什么影响。下面来说明目录结构。以`permissions`目录为例 (关于在 `app` 目录下进行多应用的开发, 请查看[tp多应用开发](https://www.kancloud.cn/manual/thinkphp6_0/1297876))
```sh
|-- catch
   |-- permissions
      |-- controller
      |-- model
      |-- database
         |-- migrations
         |-- seeds
      |-- request
      |-- module.json
      |-- route.php
      
```
- `controller` 目录存放控制器文件
- `model` 目录存放模型文件
- `database/migrations` 目录存放数据库迁移的，就是表结构
- `database/seeds` 目录存在数据库默认数据
- `request` 目录存在表单请求，验证规则可以写在这里
- `route.php` 路由文件，路由规则需要写在里面
- `module.json` 保存模块信息

## 公共库
公共库 `extend\cacher` 目录, 里面主要存放封装的类库。来看一下目录。
```
|-- extend
   |-- catcher
      |-- base
      |-- command
      |-- event
      |-- exceptions
      |-- traits
      |-- validates
      |-- CatchAdmin.php
      |-- CatchForm.php
      |-- CatchResponse.php
      |-- Tree.php
      |-- Code.php
      |-- Utils.php
      |-- CatchQuery.php
      |-- CatchAuth.php
```
接着来说明一下各个目录的作用。
- `base` 目录存在一些基类
- `command` 目录存在 console 命令
- `event` 目录存在事件
- `exceptions` 目录存放自定义异常类
- `exceptions` 目录存放自定义 facade 门面
- `generate` 目录存放文件生成功能
- `library` 目录存放插件
  - client Http 客户端
  - crontab 定时任务功能
  - excel Excel功能
  - rate 接口速率限制
  - BackupDatabase 备份数据库
  - composer 解析 composer.json 文件
  - Compress 打包工具
  - Error 定义错误
  - FileSystem 文件处理类
  - InstallCatchMoudle 模块安装
  - PraseClass 解析类
  - ProgressBar Cli 模式下的进度条
  - ScheduleKernel 定时任务调度器
- `traits` 目录复用类库
- `validates` 目录存在自定义的验证器
- `middlewares` 目录存在自定义的中间件
- `CatchAdmin.php` 获取 catchAdmin 的目录信息
- `CatchForm.php` 快速生成表单 (前后端项目无用)
- `CatchResponse.php` 响应
- `Tree.php` 树结构生成
- `Code.php` 集合项目的 code
- `Utils.php` 工具集合
- `CatchQuery.php` 替代内置的 Query，可实现自己的一些查询操作
- `CatchAuth.php` 认证


