# 请求介绍
`CatchAdmin`后台管理封装了自己的 `CatchRequest`，该 `Request `提供了请求前的验证校验。可大大提供你的开发效率。无需在 Controller 声明验证规则在校验捕获异常，该 Request 全部封装好了。在进入 Controller 之前进行校验，将验证和 Controller 分离。保证了代码简洁和可读性。
:::tip
如果你需要使用 Creator_id 字段，那么会在请求里面自动添加进去。随时获得 creator_id 无需你手动添加。
:::
下面提供了简单案列使用

## 验证
::: tip
由于官方提供的案例，用起来其实还是挺不方便的，所以`CatchAdmin`对请求做了一丢丢的改变，当然在使用上和文档没有任何区别。但是更加简单简洁，只需要定义规则后，在需要的验证的方法中注入即可
:::

如果你不喜欢这种方法，可以直接使用 `Validate` 验证方式。

## 使用

使用方法其实和 Validate 区别不大，以创建用户为例，在 user 模块的 request 目录创建 CreateUserRequest.php. 内容如下:

```php
class CreateRequest extends CatchRequest
{

    protected function rules(): array
    {
        // TODO: Implement rules() method.
        return [
            'username|用户名' => 'require|max:20',
            'password|密码' => 'require|min:5|max:12',
            'passwordConfirm|密码' => 'confirm:password',
            'email|邮箱'    => 'require|email|unique:'.Users::class,
        ];
    }

    protected function message(): array
    {
        // TODO: Implement message() method.
    }
}
```
就是这么简单，另外基类还提供了两个属性。

- $needCreatorId  属性是否添加 creator_id，默认 true
- $batch 是否批量验证 （不建议) 默认 false

在 User 控制中直接注入到方法，就可以完美验证表单了。
```
 public function save(CreateRequest $request)
```

## 自定义验证
以项目中的 `sometimes` 验证为例，只需要实现 `ValidateInterface` 接口即可。  
```php
namespace catcher\validates;

class Sometimes implements ValidateInterface
{

    public function type(): string
    {
        // TODO: Implement type() method.
        return 'sometimes';
    }

    public function verify($value): bool
    {
        // TODO: Implement verify() method.
        if ($value) {
            return true;
        }

        return false;
    }

    public function message(): string
    {
        // TODO: Implement message() method.
        return '';
    }
}

```
#### 注入新验证
在实现完新规则之后，只需要在 config\catch.php 里面配置就可以了。

```php
'validates' => [
    \catcher\validates\Sometimes::class,
  ],
```

### 获取登陆用户信息
`request` 还提供了获取登陆用户信息的功能，如果你想获取登陆用户的信息，那么你可以这么使用.
```
$request->user()
```