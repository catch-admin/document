## 权限介绍
- GET 请求是默认不经过权限控制，如果需要验证权限
  - 需要在方法注释中加入 `@CatchAuth` 标识

- 超级管理员不经过权限控制,后台默认安装的用户


### 数据权限
关于数据权限的概念，很简单，就是要标记数据的所有者。所以
> 如果你需要数据权限的时候，那么表结构需要默认的 `creator_id`字段，用来标记数据的所有者。

一旦使用了数据权限，那么可以使用`CatchRequest`,使用它可以无缝获取`creator_id`，这是无感知的。
当你使用:
```php
$request->param() 
or 
$request->post()
```
就可以轻松获取到。

## 使用
`CatchAdmin` 封装了可用 `trait` 来帮助开发者处理数据权限数据，引入 `trait`
```php
use catchAdmin\permissions\model\DataRangScopeTrait
```

在`模型`中使用 `dataRange` 方法，该方法接受一个 `roles` 对象数组，如果不传，则获取当前登录用户的角色组。

以用户列表为例
```php
$this->dataRange()
    ->withoutField(['updated_at'], true)
    ->catchSearch()
    ->catchLeftJoin(Department::class, 'id', 'department_id', ['department_name'])
    ->order($this->aliasField('id'), 'desc')
    ->paginate();
```

:::tip
dataRange 因为它不是`Query` 方法，所以它必须放在最前面。而又因为它返回`Query` 对象，所以它可以正常使用 Query 的方法。
:::

数据权限并没有提供全局的方法，所以可以在你需要权限管理的地方引入它。