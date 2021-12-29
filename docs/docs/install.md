# 项目安装
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
```
或者
```
composer create-project jaguarjack/catchadmin:dev-master catchAdmin
```

进入到`CatchAdmin`目录，该项目不提供`Web install`方式，请使用命令行方式安装。使用以下几个命令即可安装成功。
保证已经保证了`composer`包管理器。`MAC`以及`LINUX`可使用下面的命令, `windows`直接下载`exe`安装

```sh
curl -sS http://install.phpcomposer.com/installer | php

// 由于某种原因，下载包会非常慢，所以需要修改镜像来加速，推荐阿里镜像。
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/

// 安装 composer 扩展
composer install --ignore-platform-reqs

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
在使用前端项目之前，你需要安装前端管理器，这个不多做解释了。推荐使用`yarn` 安装，首先你需要安装 `yarn` 管理器。使用淘宝镜像。
```sh
yarn config set registry https://registry.npm.taobao.org/
```
#### 下载项目
```sh
git clone https://github.com/JaguarJack/catch-admin-vue.git
```

#### 进入目录,使用 yarn 安装
```sh
yarn install
```

#### 配置接口地址，找到 vue 项目下的 
- `.env.development` 文件是配置开发环境的 API 接口地址 (实际上就是 PHP 项目的地址)

#### 启动开发模式
请先在前端项目根目录下的`.env.development` 文件设置 `VUE_APP_BASE_API`开发环境的 API 请求地址
```sh
# just a flag
ENV = 'development'

# base api
VUE_APP_BASE_API = 'http://127.0.0.1:9090'
```
然后启动项目
```sh
npm run dev
```

::: tip
vue 后台使用了是 `element admin` [文档地址](https://panjiachen.gitee.io/vue-element-admin-site/zh/)
:::

## 重新初始化项目
有时候因为更新而导致数据不一致，最近改动的比较频繁，你需要重新安装项目的话，可以使用下面的命令
```
php think catch:install -r
```

## 打包前端项目
打包前请先配置正是环境 API 地址。在项目的根目录下的`.env.production`文件配置
```
# just a flag
ENV = 'production'

# base api
VUE_APP_BASE_API = '正式环境的 API 地址'
```
然后进行打包
```
npm run build:prod
```
::: tip
前端项目配置最好开启 `Gzip`,可以加速前端项目访问速度。
:::
#### 推荐配置
```sh
http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip 配置
    gzip  on;
    gzip_min_length 1k;
    gzip_comp_level 4;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript ;
    gzip_static on;
    gzip_vary on;
    gzip_buffers 8 16k;


    include /etc/nginx/conf.d/*.conf;
}
```
