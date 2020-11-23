## Http客户端
::: tip
CatchAdmin 提供了一个简洁的 Http 客户端以帮助用户进行 Curl 请求操作。
:::

先来看一个简单的例子, 请求 `CatchAdmin` 的用户列表

```php
$response = Http::token('token')->get('http://127.0.0.1:9090/users');

return $response->json();

```

通过简单的接口便可以返回请求数据.


## 头部信息
你可以使用 `headers` 方法来设置头部信息，接受一个 array 参数
```php
Http::headers([
    'token' => 'token'
])
```

## body
如果你希望设置 Body 信息。请使用 `body` 方法，它接受一个 string
```php
Http::body(‘body’)
```

## 超时时间
你可以通过 `timeout` 方法，设置一个 `number` 类型的参数
```
Http::timeout(‘body’)
```

## token 令牌
如果你想要为你的请求添加 `Authorization Token` 令牌请求头，你可以使用`token`方法
```php
Http::token('token');
```

## json
`json` 方法选项用来轻松将`JSON`数据当成主体上传， 如果没有设置`Content-Type`头信息的时候会设置成 `application/json` 。他接受一个 array 参数
```php
Http::json([

])
```
## 异步请求
使用 `async`
```
$promise = Http::asynac()->get()
```
这样就是生成一个异步请求，返回 Promise 对象，所以你不可以直接使用 Response 的响应, 继续使用代码如下

```php
$promise->then(
    function (ResponseInterface $res) {
        echo $res->getStatusCode() . "\n";
    },
    function (RequestException $e) {
        echo $e->getMessage() . "\n";
        echo $e->getRequest()->getMethod();
    }
);
```

## Form 请求
使用 `form` 方法进行请求, 以请求 CatchAdmin 登陆为例，代码实现
```php
$response = Http::form([
            'email' => 'admin@gmail.com',
            'password' => 'admin'
        ])->post('http://127.0.0.1:9090/login');

dd($response['data']['token']);
```
你可以直接把响应当作数组来使用，因为它实现了 ArrayAccess 接口，具体可以查看源代码实现。


## Query 请求
如果你在使用 Get 时，可以使用该方法提供 Query 参数
```php
$response = Http::token('token')
            ->query([
                'limit' => 20
            ])
            ->get('http://127.0.0.1:9090/users');


return $response->json();
```

## 上传附件
如果你需要单独上传文件附件，可以使用 attach 方法，它接受三个参数，name，文件资源路径，文件名称,看一下代码
```php
$response = Http::token('token')
            ->attach('image', fopen(root_path() . DIRECTORY_SEPARATOR . 'logo.png', 'r+'), 'logo.png')
            ->post('http://127.0.0.1:9090/upload/image');

return $response;
```


## Response 响应
响应提供以下几个方法，可以使用
 - `ok`
 - `successful`
 - `failed`
 - `headers` 响应头信息
 - `then` 异步响应需要使用
 - `status` 响应状态码
 - `body` 响应 Body
 - `json` Api 数据格式化
å