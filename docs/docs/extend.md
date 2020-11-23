## 项目扩展
在开发项目的时候你会发现很多的不同，一些基础的方法之类的，但还是无法使用。这里着重介绍一些后台的隐藏功能。

### 配置
后台项目配置保存在 `config\catch.php` 文件中。都有哪些配置呢？下面一一介绍。

- domain 设置之后只能使用该域名访问后台
- permission
  - is_allow_get 允许所有 get 请求，不做权限校验
  - `super_admin_id` 默认 `1`，对于用户`ID=1`的用户不做权限校验
- auth 认证
  - default 使用哪个门面。默认 admin
  - guard 门面 
    - dirver 驱动，默认 admin 使用 jwt
    - provider 认证服务
  - providers 服务提供
    - driver orm 默认使用, 建议都使用他
    - model  用户模型来进行认证

- validate 自定义规则
- upload 上传服务校验
- route_middleware 权限认证中间件
- event 后台事件

### 基类
存储目录 `extend\catcher\base` 目录下, 一共提供四个基础类使用
- CatchController 非必选 可以不用
- CatchModel 非必选 如果你不使用软删除的话可以不用该类
- CatchRequest 必选 对于 Request 尽量使用它
- CatchValidate 非必选 可不用

### command
存储目录 `extend\catcher\command` 目录下, 一共提供四个基础类使用
文档中提到过的命令都存储在这里，有兴趣的可以看看。

### event
目前只提供了路由加载事件

### exceptions
- CatchException 异常基类 后台所有异常都是继承
- FailedException 失败异常
- LoginFailedException 登陆失败
- PermissionsForbiddenException 权限禁止
- ValidateFailedException 验证失败

### generate
代码生成器，这个没啥好说的了

### library
目前提供了两个工具
- compress 打包解包
- Http 客户端

### traits
只提供了 db 两个 trait 功能
 - db
   - baseoptiontrait CURD 基础操作
   - transtrait 事务操作

### validates
自定义验证规则的文件可以放在这里。

### 其他
- catchAdmin 基础后台的文件创建，路由文件缓存等功能
- CatchAdminService 核心，后台功能入口点
- CatchAuth 用户认证
- CatchCatchKeys 缓存 KEY 管理
- CatchExceptionHandle 后台异常接管，不在使用 app\ExceptionHandle
- CatchUpoload 上传支持 七牛，oss，腾讯云，和本地
- Code 异常码管理类
- Tree 树状结构生成类
- Utils 小工具类
- CatchQuery 这个类要着重说一下，因为打交道最多的就是 Model 了
  