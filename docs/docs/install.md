# 安装
## 环境要求
`CatchAdmin` 要求以下环境:

- PHP >= 7.1.0 
- Mysql >= 5.5.0
- PDO Extension
- MBstring Extension
- CURL Extension
- ZIP Extension
- Composer

::: tip
一共需要安装两个项目，一是 PHP 的项目，二是 VUE 项目，请跟着下面的步骤走。
:::
## 安装 PHP 项目
目前项目托管在`gitee`上，可以前往 [CatchAdmin](https://gitee.com/jaguarjack/catchAdmin) 下载。
或者可以使用`git`(推荐使用) clone 代码，方便及时更新代码。
```sh
git clone https://gitee.com/jaguarjack/catchAdmin.git

OR

composer create-project jaguarjack/catchadmin:dev-master catchAdmin
```

进入到`CatchAdmin`目录，该项目不提供`Web install`方式，请使用命令行方式安装。使用以下几个命令即可安装成功。
保证已经保证了`composer`包管理器。`MAC`以及`LINUX`可使用下面的命令, `windows`直接下载`exe`安装

```sh
curl -sS http://install.phpcomposer.com/installer | php

// 由于某种原因，下载包会非常慢，所以需要修改镜像来加速，推荐阿里镜像。
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/

// 安装 composer 扩展
coomposer install

// 安装后台, 按照提示输入对应信息即可
php think catch:install

// 启动后台
php think run
```
::: warning
注意不能直接访问 PHP 项目，导致 Exception，前后端分离，需要通过 API 接口形式访问，所以你需要安装 VUE 项目后台，看到数据的展示
:::


::: tip
如果你是第一次使用 VUE，建议先去看看 VUE 文档，了解一下。
:::
## 下载 vue 项目

```sh
// 下载项目
git clone https://github.com/yanwenwu/catch-admin-vue.git

// 进入目录
- npm install

// 配置接口地址，找到 vue 项目下的 
- `.env.development` 文件是配置开发环境的 API 接口地址 (实际上就是 PHP 项目的地址)

// 启动项目
yarn serve
OR
npm build
```

::: tip
vue 后台使用了是 `ant-design-pro-vue` [文档地址](https://pro.loacg.com/docs/getting-started)
:::

