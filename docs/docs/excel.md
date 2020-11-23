## Excel

## 导出
:::tip
`CatchAdmin` 提供一套简单易使用的导出工具，可以轻松完成导出功能，只需要简单的实现。便能完成。下面来看一下如何使用吧。
:::

来看一个简单的例子，导出 `Users` 表的数据
```php
namespace catcher\library\excel;

use think\facade\Db;

class Users implements ExcelContract
{

    public function headers(): array
    {
        // TODO: Implement headers() method.
        return [
            '用户名', '邮箱'
        ];
    }

    public function sheets()
    {
        // TODO: Implement sheets() method.
        return Db::name('user')->field(['username', 'email'])->limit(100)->cursor();
    }
}

```
首先你要实现的 `catcher\library\excel\ExcelContract` 接口，只需要实现两个方法
- headers
  - `headers` 方法用于设置 excel 头部栏目显示的数据名称
- sheets
  - `sheets` 方法用于查询处理数据


除了接口必须实现的方法外，还提供了其他可用的方法

## 设置对应的数据值

示例的数据只有两个字段 `username` 和 `email`, 一一对应`用户名`和`邮箱`。如果查询是这样的话.
```php
Db::name('user')->field(['email', 'username'])->limit(100)->cursor();
``` 
那么数据就会是相反的，不会一一对应其设置的 `headers`,所以此时提供了新的方法。
```php
public function keys(): array
{
    // TODO: Implement keys() method.
    return [
        'username', 'email'
    ];
}
```

## 设置标题
有时候需要在 `excel` 顶部设置标题，可以使用 `setTitle` 方法
```php
public function setTitle()
{
    return [
        'A1:G1', '测试', Alignment::HORIZONTAL_CENTER
    ];
}
```

返回的一个数组
- 第一个元素 占用的列
- 第二个元素 标题
- 第三个元素 位置（使用`PhpOffice\PhpSpreadsheet\Style\Alignment`提供的位置常量设置）

## 设置开始列
如果开始列不是从 `A` 列开始的话，可以通过该方法进行设置
```php
public function start()
{
    return 'B';
}
```

## 设置行
如果你设置了 `title`，那么一定需要设置开始行了。因为默认是从 `A1`,所以有必要进行开始行的设置。
```php
public function setRow()
{
    return 2;
}
```

## 设置对应列的宽度
如果你需要设置列的宽度，那么可以用`setWidth`方法进行设置

```php
public function setWidth()
{
    return [
        'A' => 50,
    ];
}
```

## 获取活动的列
如果你需要一些自定义列的需求，那么可以通过该方法`getWorksheet`获取当前激活的 `sheet` 来处理
```php
public function getWorksheet($sheet)
{
    return $sheet;
}
```

## before 处理
获取当前活动列之后，通过该方法你就可以自定义处理数据前的准备工作
```php
public function before()
{
    // todo
}
```

## 内存溢出
如果是因为数据量太大，导致内存溢出。提供了 `memory` 属性设置运行时所需内存。
```php
public $memory = '1024M';
```


## 新增模型导出
注意模型导出提供的功能很有限，适用于简单导出，如果你需要更加完善的导出，还是按照上面的文档来，提供一个导出用户例子
```php
Users::field(['id', 'username', 'email', 'status', 'created_at'])->select()
                ->each(function (&$item, $key){
                    $item->status = $item->status == Users::ENABLE ? '启用' : '停用';
                })->export(['id', '用户名', '邮箱', '状态', '创建日期'])
```