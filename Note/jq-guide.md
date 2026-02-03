# jq 命令详解笔记

`jq` 是一个轻量级且灵活的命令行 JSON 处理器。你可以把它看作是用于 JSON 数据的 `sed`、`awk` 或 `grep`。它可以用来切片、过滤、映射和转换结构化数据。

## 2. 基础用法

假设我们有一个 JSON 数据（可以是文件，也可以是 curl 的输出）：

```json
{
  "name": "Google",
  "location": {
    "city": "Mountain View",
    "country": "US"
  },
  "employees": ["Alice", "Bob", "Charlie"]
}
```

### 2.1 格式化输出 (Pretty Print)

最简单的用法是使用 `.`，它代表整个对象，并会将其格式化输出。

```bash
echo '{"foo": "bar"}' | jq .
# 输出:
# {
#   "foo": "bar"
# }
```

### 2.2 访问属性

使用 `.fieldName` 来访问特定的字段。

```bash
# 获取 location 对象
... | jq '.location'

# 获取嵌套的 city 属性
... | jq '.location.city'
```

### 2.3 数组操作

- **获取特定元素**: `.[index]`
  ```bash
  ... | jq '.employees[0]' # 输出 "Alice"
  ```
- **数组切片**: `.[start:end]`
  ```bash
  ... | jq '.employees[0:2]' # 输出 ["Alice", "Bob"]
  ```
- **迭代数组**: `.[]` (取出数组中的所有元素，不再是数组格式)
  ```bash
  ... | jq '.employees[]'
  # 输出:
  # "Alice"
  # "Bob"
  # "Charlie"
  ```

## 3. 进阶用法 (管道与构造)

`jq` 支持使用 `|` 管道符将一个过滤器的输出传递给下一个过滤器。

### 3.1 管道操作

取出数组中的元素，并再次处理：

```bash
# 假设数据是 [{"id":1}, {"id":2}]
... | jq '.[] | .id'
# 输出:
# 1
# 2
```

### 3.2 构造新对象

你可以从原始 JSON 中提取字段并构造一个新的 JSON 对象。

```bash
# 假设原始数据有很深的嵌套，我们只想要 name 和 city
... | jq '{userName: .name, city: .location.city}'
# 输出:
# {
#   "userName": "Google",
#   "city": "Mountain View"
# }
```

## 4. 强大的函数

### 4.1 keys (查看所有键)

当你拿到一个陌生的大型 JSON 时，`keys` 非常有用。

```bash
... | jq 'keys'
```

### 4.2 length (计算长度)

计算数组长度、对象字段数或字符串长度。

```bash
... | jq '.employees | length' # 输出 3
```

### 4.3 map (列表映射)

对数组中的每个元素执行操作。

```bash
# 假设数据是 [1, 2, 3]
echo '[1, 2, 3]' | jq 'map(. * 2)'
# 输出: [2, 4, 6]
```

### 4.4 select (过滤/查询)

常用于从数组中筛选符合条件的元素。

```bash
# 假设数据是 [{"id":1, "valid":true}, {"id":2, "valid":false}]
... | jq '.[] | select(.valid == true)'
# 输出: {"id":1, "valid":true}
```

## 5. 实战场景：结合 Curl

回到你的 `curl` 脚本场景，假设 API 返回如下结构：

```json
{
  "candidates": [
    {
      "content": {
        "parts": [{ "text": "明天天气不错..." }]
      }
    }
  ]
}
```

如果你只想要提取最终的**文本回答**，可以这样写：

```bash
./sh.sh | jq -r '.candidates[0].content.parts[0].text'
```

- `python -m json.tool` 也是一种选择，但 `jq` 强大太多了。
- `-r` (raw-output): 直接输出原始字符串，不带引号（去掉 JSON 的双引号）。
