## 模型介绍

在日常开发中，和我们打交道最多的就是数据库了。所以经常会使用到模型。`CatchAdmin`也提供非常便利的 `CURD` 操作。如果你想使用这些操作，必须使用`CatchModel`类。继承它，会让你的 `CURD`更加迅速稳定。

看看他是如何定义的？在此之前的呢，先看一下模型如何定义的。

```php
class Attachments extends CatchModel
{
    protected $name = 'attachments';
    
    protected $field = [
            'id', // 
			'path', // 附件存储路径
            'url', // 资源地址
			'mime_type', // 资源mimeType
			'file_ext', // 资源后缀
			'file_size', // 资源大小
			'filename', // 资源名称
			'driver', // local,oss,qcloud,qiniu
			'created_at', // 创建时间
			'updated_at', // 更新时间
			'deleted_at', // 删除时间
    ];
}
```
像这样的形式的模型，都是通过命令生成的。无需你手动填写。所以 `CatchAdmin` 中所有的模型拥有`Field` 属性，它就是表字段的映射，这在之后的 `CURD` 中很有必要。


## CatchModel
```php
abstract class CatchModel extends \think\Model
{
    // 除了 softDelete 其他三个 trait 都是 catchadmin 中使用的。你可以用到任何你想用的地方
    use SoftDelete, TransTrait, BaseOptionsTrait, ScopeTrait;

    // 自定义创建时间字段
    protected $createTime = 'created_at';
    // 自定义更新时间字段
    protected $updateTime = 'updated_at';
    // 自定义删除字段
    protected $deleteTime = 'deleted_at';
    // 默认删除的值
    protected $defaultSoftDelete = 0;
    // 自动写入时间戳
    protected $autoWriteTimestamp = true;

    public const LIMIT = 10;

    // 开启
    public const ENABLE = 1;
    // 禁用
    public const DISABLE = 2;
}
```
一目了然。他使用软删除。所以如果你不想使用软删除，可以直接继承 `\think\Model`。他还使用了三个`trait`,这三个`trait`就是 `CURD` 操作的保证。

#### BaseOptionsTrait
看一下它所提供的有哪些方法，在下面会一一说明。

```php
    // 列表查询方法
    public function getList(){}

    // 新增单条数据
    public function storeBy(array $data){}

    // 循环插入数据时使用
    public function createBy(array $data){}

    // 更新数据
    public function updateBy($id, $data, $field = ''): bool{}

    // 查找数据
    // 第一个是 id
    // 第二个是查询的字段
    // 第三个 true 可查询软删除的数据
    public function findBy($id, array $field = ['*'], $trash = false){}

    // 删除数据
    // force true 可物理删除数据
    public function deleteBy($id, $force = false){}

    // 批量插入数据
    public function insertAllBy(array $data){}

    // 软删除恢复
    public function recover($id){}
    
    // 获取删除字段
    public function getDeleteAtField(){}

    // 别名字段 自动添加当前模型的表名
    public function aliasField($field): string{}

    // 禁用/启用 如果表里面有 status 字段默认使用，当然也可以自定义字段
    public function disOrEnable($id, $field='status'){}
```

#### TransTrait
这是关于事务操作的方法，轻松使用模型操作，丢弃 `Db::startTrans`, 这种不是很便利的操作。使用方法和文档是一样的，无需担心。
```php
    // 开启事务
    public function startTrans(){}

    // 提交事务
    public function commit(){}

    // 回滚事务
    public function rollback(){}

    // 事务组的操作  
    public function transaction(\Closure $function){}
```
在继承`CatchModel`之后你可以直接在模型里面使用，eg.而且有非常友好的提示。
```php
$this->startTrans();
```

#### ScopeTrait
范围查询只提供了创建者查询。非常方便。
```php
public function scopeCreator($query);
```
使用有很好的案例,例如
```php
$this->catchSearch()
    ->field('*')
    ->catchOrder()
    ->creator()
    ->paginate();
```
:::warning
当你使用范围查询的 creator 方法时候，必须放在 field 方法之后，而且不能单独使用，必须强制使用 field 方法进行查询。
:::

#### 搜索
`catchadmin` 默认使用框架的搜索器，所以你只需要使用搜索器就好了，搜索的参数被`CatchAdmin`过滤了。具体搜索器的用法可以看[框架文档](https://www.kancloud.cn/manual/thinkphp6_0/1037590)


## CatchQeury
`CatchQuery`在框架起到了很重要的作用，它继承了框架 `Query`, 并且新写了很多方法，这些方法在开发中起到很大的作用。所以将这些方法运用到你的开发之中，会事半功倍。
#### 重写的方法
```php
  
  // model Join 的模型
  // oinField join 模型的字段
 // currentJoinField 当前模型的关联的字段
  // field 需要 join 的模型查询的字段
  public function catchJoin(string $model, string $joinField, string $currentJoinField, array $field = [], string $type = 'INNER', array $bind = []): CatchQuery

  // 这个方法很常用
  // 例如你表里有 10 个字段，但是偏偏有一字段你不需要，那么这个方法可以帮你过滤掉该字段 
  // ！注意 是主表的字段
  public function withoutField($field, $needAlias = false)

  // 调用它 配合搜索器完美实现搜索  
  public function catchSearch($params = []): CatchQuery

  // 获取 alias 字段  
  public function getAlias()
   
  // like 查询 默认 both %%
  // option => left %xxx
  // option => right xxx% 
  public function whereLike(string $field, $condition, string $logic = 'AND', $option ='both'): Query

  // 增加额外字段 在有必要的时候可以添加  
  public function addFields($fields): CatchQuery

  // 分页
  public function paginate($listRows = null, $simple = false): Paginator

  // 排序
  // 如果你使用了它，并且存在 sort 字段 那么最后的结果就是这样的
  // order('sort')->order('id') 很方便有么有
  public function catchOrder($order = 'desc')

  // 添加子查询  
  public function  addSelectSub(callable $callable, string $as)

  // 字段自增
  public function increment($field, $amount = 1)
  // 字段自减  
  public function decrement($field, $amount = 1)


```
