## 验证
::: tip
后台请求模仿了 Larvel FormRequest 来进行表单验证
:::

如果你不喜欢这种方法，可以直接使用 `Validate` 验证方式。

## 使用

使用方法其实和 Validate 区别不大，已创建用户为例，在 user 模块的 request 目录创建 CreateUserRequest.php. 内容如下:

```
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

## 自定义验证规则
以项目中的 `sometimes` 验证为例，只需要实现 `ValidateInterface` 接口即可。  
```
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

```
'validates' => [
    \catcher\validates\Sometimes::class,
  ],
```
