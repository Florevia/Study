## npm install

```mermaid
flowchart TD
Start([输入 npm install]) --> CheckFiles{检查项目文件}

    CheckFiles --> HasLock{存在<br/>package-lock.json?}

    HasLock -->|是| ReadLock[读取 package-lock.json]
    HasLock -->|否| ReadPkg[读取 package.json]

    ReadLock --> CheckIntegrity{检查完整性}
    CheckIntegrity -->|一致| UseCache{检查本地缓存}
    CheckIntegrity -->|不一致| ReadPkg

    ReadPkg --> ParseDeps[解析依赖版本范围]
    ParseDeps --> idealTree[构建依赖树]
    idealTree --> Dedupe[扁平化 + 去重]

    Dedupe --> UseCache

    UseCache -->|缓存存在| LinkCache[从缓存复制到<br/>node_modules]
    UseCache -->|缓存不存在| Download[从 npm registry<br/>下载包]

    Download --> SaveCache[保存到本地缓存<br/>~/.npm/_cacache]
    SaveCache --> Extract[解压到 node_modules]

    LinkCache --> RunScripts[执行生命周期脚本]
    Extract --> RunScripts

    RunScripts --> UpdateLock[生成/更新<br/>package-lock.json]
    UpdateLock --> End([安装完成])
```

### 检查完整性

- 验证缓存中的包文件是否完整、未被篡改或损坏。npm 使用 hash 值来校验文件完整性。

### 扁平化

- 把所有依赖，包括依赖的依赖都提升至顶层 node_modules 中。
- 这样 import 在找依赖包的时候，在自己的文件夹里找不到，会到 node_modules 里找

---

## pnpm install

```mermaid
flowchart TD
    A[pnpm install] --> B[解析 package.json]
    B --> C[读取/生成 pnpm-lock.yaml]
    C --> D{检查全局 store}
    D -->|已存在| E[直接创建硬链接]
    D -->|不存在| F[从 registry 下载]
    F --> G[解压到全局 store]
    G --> H[内容寻址存储]
    H --> E
    E --> I[构建 node_modules]
    I --> J[创建符号链接结构]
    J --> K[执行生命周期脚本]
    K --> L[完成 ✓]
```

---

### pnpm 的核心特性：Content-Addressable Store（内容寻址存储）

- 用文件的哈希值来找文件

---

### 并行下载

- 串行下载（Sequential）：

```text
时间轴 ─────────────────────────────────────────→

下载 lodash
|████████|
          下载 express
          |████████████|
                        下载 axios
                        |██████|

总时间 = lodash + express + axios
```

- 并行下载（Parallel）：

```text
时间轴 ───────────────────→

下载 lodash    |████████|
下载 express   |████████████|
下载 axios     |██████|

总时间 ≈ max(lodash, express, axios)
```
