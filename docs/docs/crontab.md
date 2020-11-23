## 定时任务
CatchAdmin 基于 Pcntl 开发了多进程管理，支持的定时任务处理。可以替代 Crontab。那为什么要舍弃 Crontab 用上自带的这个服务呢。
- 基于后台面板管理可控
- 随时可以查看任务执行的情况
- 多进程处理性能高，占用服务器资源少

## 配置
在 `config/catch.php` 配置文件中，新增了 `crontab` 配置。
```php
 'crontab' => [
        /**
         * 存储目录
         */
        'store_path' => runtime_path('catch/crontab'),

        /**
         * 主进程 pid 存储
         */
        'master_pid_file' => runtime_path('catch/crontab') . 'master.pid',

        /**
         * 日志配置
         */
        'log' => [
            // 日志记录方式
            'type'           => 'File',
            // 日志保存目录
            'path'           => runtime_path('catch/schedule'),
            // 单文件日志写入
            'single'         => false,
            // 独立日志级别
            'apart_level'    => [],
            // 最大日志文件数量
            'max_files'      => 0,
            // 使用JSON格式记录
            'json'           => false,
            // 日志处理
            'processor'      => null,
            // 关闭通道日志写入
            'close'          => false,
            // 日志输出格式化
            'format'         => '[%s][%s] %s',
            // 是否实时写入
            'realtime_write' => false,
        ],

        /**
         * crontab 任务命名空间
         */
        'task_namespace' => '',
    ],
```
## 使用参数
- 必选 `action`: [start|stop|reload|restart] 具体功能看下面
- 可选 `-d` 是否以守护进程模式运行
- 可选 `-p` 进程 PID
- 可选 `-s` 静态进程数量
- 可选 `-dy` 动态进程数量
- 可选 `-i` alarm 间隔(s)

## 启动
启动任务管理, `-d` 选项是启动守护进程模式
```php
php think catch:crontab start 
```
#### 查看状态
```php
php think catch:crontab status
```

#### 关闭
```php
php think catch:crontab stop
```

#### 重启子进程
```php
php think catch:crontab reload
```

#### 重启启动
```php
php think catch:crontab restart
```

## 开发 Task
在任意目录都可建立你的 Task 目录.我们就以熟悉的 `app` 为例。建立 TestTask。
```
cd app && mkdir task && touch TestTask.php
```
然后输入内容
```php
namespace app\task;

// 必须要继承的基类
use catcher\base\CatchCronTask;

class Test extends CatchCronTask
{
    // 这里是真正处理的地方
    public function deal()
    {
        // TODO: Implement deal() method.
        sleep(5);
        file_put_contents(root_path() . 'test.txt', '执行成功了吗');
    }

    // 如果出现错误或者异常，可以在这里处理
    public function dealWithException(\Throwable $e)
    {
        // TODO: Implement dealWithException() method.
    }
}

```
然后要设置配置，在 `config/catch.php` 的 `crontab` 配置中 `task_namespace` 配置命名空间 `\\app\\task`

这样还不够。在后台需要添加你的 task 任务
[![whcbXd.jpg](https://s1.ax1x.com/2020/09/18/whcbXd.jpg)](https://imgchr.com/i/whcbXd)
首先按照上图开启你的系统监控模块
[![whg0ud.jpg](https://s1.ax1x.com/2020/09/18/whg0ud.jpg)](https://imgchr.com/i/whg0ud)
开启之后如上图，添加你的任务，cron 表达式就是正常的定时任务,如下设置
```
// cron 表达式
 *    *    *    *    *
 -    -    -    -    -
 |    |    |    |    |
 |    |    |    |    |
 |    |    |    |    +----- day of week (0 - 6) (Sunday=0)
 |    |    |    +---------- month (1 - 12)
 |    |    +--------------- day of month (1 - 31)
 |    +-------------------- hour (0 - 23)
 +------------------------- min (0 - 59)
```
调用的任务类设置 `TestTask` 就完成了。感兴趣的话，就赶快试一试吧。
