# Shell

## shell
1. 一名解释型编程语言
2. 解释器：sh、zsh、bash
3. 两种命令：
- 内建命令（built-in）：命令实现在 shell 程序内部，执行时不创建新进程，直接在当前 shell 里运行。
例：cd、exit、export、alias、fg/bg/jobs、ulimit、read、source 
- 外部命令（external）：是文件系统里的可执行文件，shell 通过 PATH 找到后用 fork/exec 启动为新进程。
例：ls、cat、grep、ps、curl、sed、awk 等
4. PATH变量：环境变量，告诉shell到那些目录里按顺序去寻找外部命令。用冒号分隔的一串目录。


### pwd （Print Work Directory）

查看当前所在的工作目录

---

### open

1. 打开工作目录，macos 在 Finder
2. 打开应用程序，Wechat open -a 'WeChat'
3. 打开网页

```sh
open 'https://www.baidu.com'
```

```sh
open -a 'Safari' 'https://www.baidu.com'
```

```sh
open -a "Finder" '/Users/lilin/Code/Notes'
```

### ls （list）

查看当前目录下，有哪些文件或者文件夹

### ls -a

查看所有文件包括隐藏文件夹和隐藏文件

- ![ls -a 结果解释](./img/ls%20-a%20结果解释.png)

### ls -l

查看文件和文件夹详情

- ![ls -l 结果解释](./img/ls%20-l%20结果解释.png)
- ![ls -a 结果解释](./img/ls%20-l%20前缀解释.png)
- ![ls -a 结果解释](./img/ls%20-l%20文件类型.png)
- ![ls -a 结果解释](./img/ls%20-l%20权限符号.png)

### ls -l -a

查看是不是一个仓库

---

### mkdir （make directory）

创建一个文件夹

---

### touch

创建文件

```sh
touch filename.md
```

---

### echo

打印

---

### >

重定向符号：把输出的内容重定向到一个文件

```sh
echo "\*\*\*" > <文件名>
# 覆盖前面内容
```

```sh
echo "llll" >> <文件>
# 会累加内容
```

---

### cat （concatenate）

查看文件内容

```sh
cat ../demo.md
```

---

### |

管道 ：输出 -> 输入

```sh
echo "llllllll" | cat > in.doc
```

只管把输出流入，需要一个命令来拿这个输入，比如 cat

---

### cd （change directory）

切换目录

---

### rm （remove）

删除文件夹或文件 rm lilin/note.md （同级）

### rm -r

删掉目录/文件夹

### chmod u+x <文件名>

给user添加可执行权限

### su 用户名

### su do 


   

### JavaScript 引擎

-	V8（Chrome、Node.js、Deno）
-	SpiderMonkey（Firefox）
-	JavaScriptCore / Nitro（Safari）

### 计算机系统

硬件+软件

1. 软件：系统软件（操作系统、编译器等）+ 应用软件
2. 硬件：
   - 运算器 
   - 控制器
   - 存储器
   - 输入设备
   - 输出设备：