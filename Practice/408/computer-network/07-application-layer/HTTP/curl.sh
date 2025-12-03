# 拿到自己的 IP

curl --http1.1 --verbose https://httpbin.org/ip

# GET 一个简单 JSON

curl --http1.1 --verbose https://httpbin.org/json

# 带查询参数的 GET

curl https://httpbin.org/get?foo=bar&x=1

curl -G "https://httpbin.org" \
  --data-urlencode "foo=bar" \
  --data-urlencode "x=1"

# 中文参数编码

curl --http

# User-Agent 练习

curl --http1.1 --verbose https://httpbin.org/user-agent