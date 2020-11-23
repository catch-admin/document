# 命令介绍
命令行请务必看一下，对于你开发会有很大的帮助，提升你的开发效率。`CatchAdmin` 提供了很多有用的命令，在你的开发使用熟练的话，将会大大增加你的开发效率。

## 安装框架
```
php think catch:install
```
#### 参数列表
  - 可选参数 `-r`，重置数据库

:::warning
  使用该选项参数, 通过 migration 的生成的表将会被回滚删除，然后重新添加初始化数据.
:::

## 备份数据
```
php think backup:data
```
#### 参数列表
- 必选参数 `tables`, 多个表需要使用 , 分隔开
- 可选参数 `-z`, 是否压缩成 zip 格式

#### 事例
```
php think backup:data users,roles -z
```

## 创建模块
如果你想使用模块式开发，请使用下面命令生成模块
```
php think create:module moduleName
```
#### 参数
- moduleName 模块名称

该命令会在 catch 目录下生成模块文件夹，默认有三个文件加上若干文件夹
- moduleService.php  // 服务启动文件
- route.php // 路由文件
- module.json  // 模块信息描述文件

这样基本的模块就创建完毕了。

## 创建表
在创建完`migrations`，需要设计表结构。可以在官方文档上看到如何使用[数据迁移](https://www.kancloud.cn/manual/thinkphp6_0/1118028),当你设计完结构之后，如果还有默认数据的话，需要使用 seeds 进行填充。在做完这些工作之后，使用以下命令
```
php think catch-migrate:run module
```
::: tip
该命令可以生成对应的表结构
:::

```
php think catch-seed:run module
```
::: tip
该命令可以填充对应的表数据
:::

## 创建 Migration
```
php think catch-migrate:create
```
#### 参数
  - 必选参数 module, 模块名称
  - 必选参数 MigrationName，驼峰法命名

#### 实例
```
php think catch-migrate:create permissions RoleHasPermissions
```

## 创建模型
当你创建表成功后，还需要生成对应的模型，如果你是自己创建模型的话，还要填充表字段将会很浪费时间，所以才会有该命令的产生。
```
php think create:model moduleName modelName
```
##### 参数
  - moduelName 模块名称
  - modelName 模型名称
  - 可选参数 --softDelete 值:SOFTDELETE 软删除参数之后，使用的模型会有区别，请注意
  
`模型名称`和`模块名`称都是必须的，模型名称还必须是驼峰规则，不然会找不到表，例如你的表名是`user_role`,那么你的模型名称就应该是 `UserRole` 这样的驼峰命名，这是约定。


## 模块禁用
如果不想使用某个模块了，可以使用下面的命令。
```
php think disable:module moduleName
```
:::warning
该命令使用之后会将相关菜单全部删除。
:::

## 模块启用
如果想继续使用某个模块了，可以使用下面的命令。
```
php think enable:module moduleName
```
:::tip
该命令使用之后会将相关删除菜单全部恢复。
:::

## 打包模块
:::tip
这是预留命令，目前来看没有任何作用
:::
```
php think package:zip module
```
该命令会将文件夹压缩成ZIP包。

## 模块服务发现
在 catchAdmin 中使用多模块的时候，必须使用服务发现，保证模块的可用
```
php think catch-service:discover
```

## 导出菜单
目前 CatchAdmin 由于模块独立，所以安装模块的时候对于权限菜单也是独立的，所以当你开发完独立的模块之后，应该是需要单独导出菜单的。所以提供了很简单的命令，支持树状导出。
```sh
php think export permissions -p parent_id -m system
```
- permissions 就是权限表,根据实际填写
   - `-p` 树状的父级标识，CatchAdmin permissions 表使用 `parent`
   - `-m` 导出的模块名称

## 执行 migrate
项目有时候需要更新，新增字段，借助 migration，可以很好的管理表字段的版本。
```sh
php think catch-migrate:run moduleName
```
可以很好更新模块下的 migration

## 填充数据
如果模块有初始化数据需要填充，那么就需要下面的命令
```sh
php think catch-seed:run moduleName
```
这个命令是更新模块下所有 seed，因为 seed 是没有版本控制的，所以你不能每次都去执行模块下所有的 seeder，你可以指定执行某个 seeder.
```sh
php think catch-seed:run moduleName -s SeederClass
```
## 缓存敏感词
```sh
php think cache:sensitiveWord
```