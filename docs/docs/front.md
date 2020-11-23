# 前端开发

## 表格操作
下面的操作基于 引入 mixins，
```js
import formOperate from '@/layout/mixin/formOperate'

export default {
  mixins: [formOperate]
}

```
### 参数
- formName: string ｜ 表名
- formFieldsData: object ｜ 表单对象
- queryParam: object ｜ 搜索参数
  - defaultQueryParam: array | 默认搜索参数
- refreshRoute: bool | 刷新路由（一般用不到）
- url: string | 请求的操作的 URL

### 新增
- beforeCreate: function | 新增前
- handleCreate: function
  
### 更新
- beforeUpdate: function | 更新前
- handleUpdate: function
  
### 删除
- beforeDelete: function | 删除前
- handleDelete: functio
  
### 批量删除
- handleSelectMulti: function | 批量选择
- beforeMultiDelete: function | 批量删除前
- handleMultiDelete: function
  
### 提交
- beforeSubmit: function | 提交前
- handleSubmit: function
  
### 取消
- handleCancel: function
- afterCancel: function | 取消后
  
### 搜索
- handleSearch
  
### 刷新
- handleRefresh
  
### 分页
```
<el-pagination
  background
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="paginate.current"
  hide-on-single-page
  :page-sizes="paginate.sizes"
  :page-size="paginate.limit"
  :layout="paginate.layout"
  :total="paginate.total"/>
```
## 前端权限
### 按钮权限
#### 基于角色
每次新增角色需要有一个唯一标识，角色的按钮权限就是基于这个唯一标识。
在需要使用的页面引入
```sh
import { permission } from '@/directive/permission/index.js' // 权限判断指令
export default{
  directives: { permission }
}
```
在需要判断的按钮上加上
```sh
<el-tag v-permission="['editor']">editor</el-tag>
```

#### 基于Action
每个菜单的 Action，也就是按钮都有一个权限标识，以@分割的。Action 的判断就是基于这个。
在需要使用的页面引入
```sh
import { action } from '@/directive/permission/index.js' // 权限判断指令
export default{
  directives: { permission }
}
```
在需要判断的按钮上加上
```sh
<el-tag v-action="'job@delete'">删除</el-tag>
```
或者
```
<el-tag v-action="'job.delete'">删除</el-tag>
```
如果模块之间有重复的 Action，那么就需要添加 module 名称来识别了。
```sh
<el-tag v-action="'permissions@job@delete'">删除</el-tag>
```
或者
```
<el-tag v-action="'permissions.job.delete'">删除</el-tag>
```