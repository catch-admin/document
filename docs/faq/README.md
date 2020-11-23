## FAQ
### 为什么项目安装成功之后无法访问
  - 安装项目之后，打开 `DEBUG`，将 `.env` 的 `debug` 设置为 `true`.
  - 不要直接访问 `PHP` 项目，即使你在配置完域名之后.

### 为什么权限添加之后没有生效
`CatchAdmin` 在用户登录之后，会将登录用户的权限信息缓存起来。所以需要刷新一下后台重新拉取信息。


#### 常见错误
```
Cloud not Create token :strpos() expect parameter 1 to be string. array give
```
请检查 .env 文件是否生成了 jwt 密钥。如果没有，请执行
```shell
php think jwt:create
```
:::tip
如果还是不行，请检查是否有 .env 文件
:::

```
There are no commands defined in the "jwt" namespace.
```
解决方案有两个，均由于 Composer 升级导致的。
- 降低 composer 版本, `composer self-update --rollback`
- 升级 tp 核心版本，composer update 即可
> 目前推荐第一种，防止有其他包没有做适配工作。激进点可以选择第二种，毕竟 composer2 太香了。
  
## 为什么找不到 CatchAdmin 的 SQL 文件
CatchAdmin 摒弃了 SQL 形式的安装，采用了 Migration 建立数据表，数据表在每个模块都是独立。
具体可以查看模块下的 database 文件下的 migration，可以清晰看到每个模块的数据表的迭代情况

## 如何获取登录用户的信息
CatchAdmin 可以全局获取登录用户信息
```php
request()->user()
```
- 获取用户角色
```php
request()->user()->getRoles()
```

## composer install 安装报错
如果遇到了 `think service:discover handling the post-autoload-dump event returned with error code 255` 错误。
- 如果存在 `composer.lock`, 删除 vendor 文件夹以及删除 composer.lock 文件，之后 `composer install`。
- 直接 `composer update` 即可

### 升级到 6.0.3 之后报错，路由访问不到
建议使用 6.0.2，6.0.3 资源路由出现解析错误，目前无法解决。如果你要升级的话。需要自行改动搜有资源路由。
```php
$route->resouce('hello', 'HelloController');
```
升级之后需要这么改动
```php
$route->get('hello', 'HelloController@index');
$route->post('hello', 'HelloController@save');
$route->put('hello/<id>', 'HelloController@update');
$route->delete('hello/<id>', 'HelloController@delete');
```


### 上线部署
优化自动加载的时候要去除 require-dev 的加载目录
```
composer dump-autoload --no-dev
```
### 出现权限问题
```shell
chmod(): Operation not permitted
```
需要改变运行用户, 找到 fpm 运行的用户组，然后使用下面命令，`fpm 默认是 www-data`, 如果修改了用户，根据实际情况修改即可。
```shell
chown -R www-data:www-data catch/
```

### 出现路由为定义
- 检查 runtime\catch 目录下是否有缓存
- 检查对应的模块是否开启, module.json 文件 enable 字段