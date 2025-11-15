# Shell

# Markdown 标记语言语法

Markdown 是一种轻量级标记语言，语法简洁直观。

1.  标题 (Headers)

- `# 一级标题`
- `## 二级标题`
- `### 三级标题`

2.  强调 (Emphasis)

- `*斜体文本*`
- `_斜体文本_`
- `**粗体文本**`
- `__粗体文本__`
- `~~删除线文本~~`

3.  列表 (Lists)

    无序列表

    - `- 列表项 1`
    - `* 列表项 2`
    - `+ 列表项 3`

    有序列表

    - `1. 第一项`
    - `2. 第二项`
    - `3. 第三项`

4.  链接 (Links)

` [这是一个链接](https://www.google.com)`

5.  图片 (Images)

`![图片替代文字](图片路径.jpg)`

6.  代码 (Code)

    - 行内代码：使用反引号`` 包裹。
    - 代码块：使用三个反引号```包裹。

    ```javascript (标注代码类型)
    function hello() {
      console.log("Hello, world!");
    }
    ```

7.  引用 (Blockquotes)

- `> 这是一段引用的文字`
- `> > 嵌套引用`

8. 水平分割线 (Horizontal Rule)

- `---`
- `***`
- `___`

---

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

---

## git

### 什么是 git 仓库？

git 仓库就是放代码的地方

### git status

查看仓库信息

### git init

初始化/创建一个本地仓库

### git add + filename

### git add -A (git add -all)

```sh
# 提交全部文件
git add -A

# 提交该目录下全部文件
git add .
```

提交到缓冲区，提交冷静期

---

### git commit -m "备注信息"

```sh
git commit -m "我写了个 shell.md，把它提交到 git 仓库"
```

---

### git log

查看提交记录

---

### git branch

查看当前分支

### git branch -r

看远程分支列表

### git branch -a

查看全部分支 远程+本地

### git branch -vv

查看分支详情或上游关系

### git branch <分支名>

新建分支

本地仓库、main 分支 进行代码开发

远程仓库（github）、 无分支 保存代码

---

### git switch + 分支名

转换到其他分支

### git switch -c <分支名>

创建并转换到其他分支

---

### git branch + git checkout /

创建分支并转到该分支上

---

### git remote

将本地仓库与远程仓库建立连接

```sh
git remote add <r-github/origin> <git@github.com:Florevia/notes.git/(url)>
```

### git remote -v

查看当前 git 仓库的远程仓库名

---

### git push

```sh
git push <remote_repo_name> <local_branch_name：remote_branch_name>
```

将本地仓库分支内容推到远程仓库

```sh
git push -u <remote_repo_name> <branch_name：remote_branch_name>
```

-u（--set-upstream）: 在远程仓库建立分支,两仓库分支创立链接

git push: 并推到远程仓库分支上

---

### git push （origin） --delete （feature）

删除远程分支

### git checkout/switch

检出/转换分支

---

### git fetch --prune

同步远程分支变化,更新远程列表

---

### git clone

往本地拿远程仓库内容

```sh
git clone -b main --single-branch <repo-url>
# 只下载（克隆）main 分支

git clone <repo-url>
# 下载（克隆）所有分支
```

---

### git fetch `url`

## 将远程内容拉到本地

### git rebase origin/main

将远程更新 线性对齐主干（线性）

- 例：将A变基到B：
 git switch A --> git A rebase B

### git merge origin/main

将远程更新 合并 （有分支）

- 例： 把B合并到A：
 git switch A --> git A merge B
 

```sh
# 同步远程信息（不动工作区）
git fetch origin

# 切到你的功能分支（若已在则略过）
git switch feature/login

# 把当前分支变基到远程最新的主干上（或变基到对应的远程跟踪分支）
git rebase origin/main

```

![merge&rebase](./img/merge&rebase.png)

---

### 对称加密和非对称加密

- 对称加密 (Symmetric)：加密与解密用同一把密钥。
代表算法：AES（推荐）、ChaCha20、旧的 DES/3DES（不再推荐）。

- 非对称加密 (Asymmetric / 公钥密码学)：用公钥加密/验证，私钥解密/签名。
代表算法：RSA、ECC（如 P-256、Curve25519）、（以及密钥交换 Diffie-Hellman/ECDH）。

---

### chmod u+x <文件名>

给user添加可执行权限

### su 用户名

### su do 

### shell
1. 一名解释型编程语言
2. 解释器：sh、zsh、bash
3. 两种命令：
- 内建命令（built-in）：命令实现在 shell 程序内部，执行时不创建新进程，直接在当前 shell 里运行。
例：cd、exit、export、alias、fg/bg/jobs、ulimit、read、source 
- 外部命令（external）：是文件系统里的可执行文件，shell 通过 PATH 找到后用 fork/exec 启动为新进程。
例：ls、cat、grep、ps、curl、sed、awk 等
4. PATH变量：环境变量，告诉shell到那些目录里按顺序去寻找外部命令。用冒号分隔的一串目录。
   

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