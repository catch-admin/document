## 二次开发
如果你已经看完上面的其他篇章节的介绍，可能还没法继续进行自己的项目开发。因为群里很多伙伴反应了这个问题，所以这里就专门做一篇文档。
看完你会觉得 So Easy。

首先当然需要下载安装文档，请先保证你能正常运行 `CatchAdmin`。后台正常进入且能访问。而且你也了解了前后端分离的开发模式。那么现在就开始吧。

## 步骤如下
- 创建模块
- 生成代码
- 创建 View
- 配置动态菜单


以创建 CMS 模块为例子。

## 创建模块
CatchAdmin 提供了很简洁的命令来操作
```shell
php think create:module cms
```

## 创建你的第一个接口
进入`后台系统管理`模块，找到`代码生成`, 按照流程创建。当然你看提示 `success` 的时候，你一个`restful `接口就已经创建成功了。很简单方便。

如果你不嫌弃麻烦的话，可以按照下面的步骤走😄

下一步进入 `cms`, 创建 `controller` 文件夹。命令如下
```shell
cd cms && mkdir controller
```

#### 创建控制器。
```shell
cd controller && touch Test.php
```

编写 `Controller` 代码, 如下
```php
namespace catchAdmin\cms\controller;

use catcher\base\CatchController;
use catcher\CatchResponse;

class Test extends CatchController
{
    public function index()
    {
        return CatchResponse::success('Hello CatchAdmin');
    }
}
```
#### 创建路由
在 `cms` 目录下, 创建 `route.php` 文件，命令如下:
```shell
touch route.php
```
加入路由
```php
$router->get('test', '\catchAdmin\cms\controller\Test@index');
```

到这里 `PHP` 的接口就已经创建好了。使用 `Postman` 访问下能正确返回数据。

## 前端
下面就是重头戏了，目前从反映来看，最让摸不着头脑的就是前端的菜单配置以及如何访问页面。

在前端项目进入到根目录，进入到 `src/views` 目录，为了和后端项目保持统一，所以你需要同样创建 `cms` 目录。`cms` 目录
创建后，在创建 `test` 目录。命令如下:

```shell
cd src/views && mkdir cms && cd cms && mkdir test
```

创建 `Vue` 文件。
```shell
cd test && touch index.vue
```
代码如下:
```js
<template>
    <div> Hello World</div>
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<style scoped>

</style>
```

到这里还是无法正常访问的，所以你需要先创建一个 Map 映射。找到 `src/config/componentMap.js` 文件，这里就是需要添夹映射的地方。
添加如下代码
```js
test: () => import('@/views/cms/test'),
```

添加完还要添加菜单才可以看到，打开后台管理，找到`菜单管理`，然后要在 `cms` 管理模块下增加，
:::tip
cms 管理模块添加的时候组件必须需要选择 `layout`
:::

然后在 `cms` 管理模块下添加`测试`子组件，**关键在组件必须选择 `test` 组件**，无需刷新页面，添加完之后就可以在左侧看到菜单。测试组件的
- 权限标识要填写 `test`，也就是控制器名称
- 模块就是填写 CMS。
但是有一点要注意，此时你是 `Admin` 超级管理员。如果你不是 `Admin` 超级管理员的话，就必须让当**前角色加入权限菜单**。


这样整个流程就结束了。
