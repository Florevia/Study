# Shell

## shell

1. 一名解释型编程语言
2. 解释器：sh、zsh、bash
3. 两种命令：

- 内建命令（built-in）：命令实现在 shell 程序内部，执行时不创建新进程，直接在当前 shell 里运行。
  例：cd、exit、export、alias、fg/bg/jobs、ulimit、read、source
- 外部命令（external）：是文件系统里的可执行文件，shell 通过 PATH 找到后用 fork/exec 启动为新进程。
  例：ls、cat、grep、ps、curl、sed、awk 等

4. PATH 变量：环境变量，告诉 shell 到那些目录里按顺序去寻找外部命令。用冒号分隔的一串目录。

## shell 命令

### pwd （Print Work Directory）

查看当前所在的工作目录

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

### ls -l

查看文件和文件夹详情

- ![ls -l 结果解释](./img/ls%20-l%20结果解释.png)
- ![ls -a 结果解释](./img/ls%20-l%20前缀解释.png)
- ![ls -a 结果解释](./img/ls%20-l%20文件类型.png)
- ![ls -a 结果解释](./img/ls%20-l%20权限符号.png)

### ls -l -a

查看是不是一个仓库

### mkdir （make directory）

创建一个文件夹

### touch

创建文件

```sh
touch filename.md
```

### echo

将一个进程的标准输出

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

## 查看文件内容

### cat （concatenate）

查看文件内容

### less

分页查看文件内容

### more

分页查看文件内容

### head -n

查看文件前几行

### tail

查看文件后几行

### vim

编辑文件，也能查看文件内容

### mkdir -p a/b/c/d

创建多级文件夹

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

给 user 添加可执行权限

### su

切换用户

### sudo + 命令

以管理员权限执行命令

### id

查看用户信息

### lsof -P -n -i :<端口号>

查看占用端口号的进程

### vim

编辑文件

### ps -p

查看进程信息

### kill -9 <进程号>

强制终止进程

### curl

查看网络请求

```zsh
curl -X GET http://localhost:8297
# 或者
curl --request GET http://localhost:8297
```

## 环境变量

### export

导出环境变量

```zsh
export <变量名>=<值>
```

### echo $<变量名>

查看环境变量值

```zsh

echo $name
```

### unset <变量名>

删除环境变量

```zsh
unset name
```

### env

查看环境变量

### grep（Global Regular Expression Print）

在文件或输入中搜索匹配的文本行。

**常用选项**

```md
| `-n` | 显示行号以及具体内容 | `grep -n "TODO" src/*.js` |
| `-c` | 只显示匹配行数 | `grep -c "error" log.txt` |
| `-A n` | 显示匹配行及后 n 行 | `grep -A 3 "error" log.txt` |
| `-B n` | 显示匹配行及前 n 行 | `grep -B 3 "error" log.txt` |
```
