### XMLHttpRequest的readyState属性

XMLHttpRequest对象有一个 readyState 属性，表示请求的状态，它有以下5个可能的值：

1. 0 (UNSENT) : 代理被创建，但尚未调用 open() 方法
2. 1 (OPENED) : open() 方法已经被调用
3. 2 (HEADERS_RECEIVED) : send() 方法已经被调用，并且头部和状态已经可获得
4. 3 (LOADING) : 下载中； responseText 属性已经包含部分数据
5. 4 (DONE) : 下载操作已完成