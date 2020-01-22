# 命令
`CatchAdmin` 提供了很多命令加速你的开发。

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

## 生成模块
当你看完目录介绍后一定觉得很苦恼，每个小模块都要手动创建那么多文件，简直痛苦万分，不用担心。使用一键创建可以摆脱这个困恼。

在开发流程上，有些许和之前不同，通常开发是需要先建立数据库，但是在这个项目中使用的是 `migration` 来建立的数据表，所以需要先建立文件，然后创建表，最后创建模型。那么就开始吧。使用下面的命令
```php
php think create:module name
```
默认创建以下文件和目录
```
|-- controller
    |-- Index.php
|-- model
|-- database
    |-- migrations
    |-- seeds    
|- request
    |-- CreateRequest
    |-- UpdateRequest
|-- view
    |-- index.html    
route.php
module.json    
```
好像还不错，不过还缺了点什么。不能自定义自己的 controller，migrations，还有 view。当然会有这些啦，添加了一些额外的可选参数
```
php think create:module name -c "A,B,C"
```
::: tip
-c 参数代表 controller，当你你有多个 controller的时，要以,隔开。这个参数还有另外的作用，会生成对应的 request 和 view 目录。
:::

```
php think create:module name -m "A,B,C"
```
::: tip
 -m 参数代表 migrations, 当你有多个 migrations 时，还是以 , 隔开
:::

```
php think create:module name -s "A,B,C"
```
::: tip
-s 参数代表 migrations, 当你有多个 migrations 时，还是以 , 隔开
:::

```
php think create:module name -se "A"
```
::: tip
-se 可以创建 Service 文件，注意，目前只支持创建一个 Service
:::

这样基本的模块就创建完毕了。
## 创建表
在创建完`migrations`，需要设计表结构。可以在官方文档上看到如何使用[数据迁移](https://www.kancloud.cn/manual/thinkphp6_0/1118028),当你设计完结构之后，如果还有默认数据的话，需要使用 seeds 进行填充。在做完这些工作之后，使用以下命令
```
php think catch-migration:run module
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
  - 比选参数 MigrationName，驼峰法命名

#### 实例
```
php think catch-migrate:create permissions RoleHasPermissions
```

## 创建模型
当你创建表成功后，还需要生成对应的模型，如果你是自己创建模型的话，还要填充表字段将会很浪费时间，所以才会有该命令的产生。
```
php think create:model modelName ModuleName
```
模型名称和模块名称都是必须的，模型名称还必须是驼峰规则，不然会找不到表，例如你的表名是`user_role`,那么你的模型名称就应该是 `UserRole` 这样的驼峰命名，这是约定。
