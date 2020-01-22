# 目录
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

## catchAdmin 核心目录
该目录是真正的开发目录，当然如果你不喜欢在此开发，也可以在 `app` 下开发，并没有什么影响。下面来说明目录结构。以`permissions`目录为例
```sh
|-- catchAdmin
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
- `traits` 目录复用类库
- `validates` 目录存在自定义的验证器
- `CatchAdmin.php` 获取 catchAdmin 的目录信息
- `CatchForm.php` 快速生成表单 (前后端项目无用)
- `CatchResponse.php` 响应
- `Tree.php` 树结构生成
- `Code.php` 集合项目的 code
- `Utils.php` 工具集合
- `CatchQuery.php` 替代内置的 Query，可实现自己的一些查询操作
- `CatchAuth.php` 认证

以上就是对目录结构介绍

