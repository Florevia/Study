# VueUse 常用工具函数详解

VueUse 是 Vue 组合式 API (Composition API) 的实用工具集。它提供了大量开箱即用的 Hooks，能极大提升开发效率。

以下是按场景分类的常用函数介绍：

## 1. 状态与存储 (State & Storage)

### `useLocalStorage` / `useSessionStorage`

自动将响应式变量同步到 `localStorage` 或 `sessionStorage`。

```javascript
import { useLocalStorage } from "@vueuse/core";

// 绑定 localStorage 中的 'my-storage-key'
// 如果 localStorage 中不存在，则使用默认值 { name: 'Apple', color: 'red' }
const store = useLocalStorage("my-storage-key", {
  name: "Apple",
  color: "red",
});

// 修改 store.value 也会自动更新 localStorage
store.value.name = "Banana";
```

### `useToggle`

用于切换布尔值的状态，常用于弹窗、开关等。

```javascript
import { useToggle } from "@vueuse/core";

const [value, toggle] = useToggle(); // 默认为 false

toggle(); // value 变为 true
toggle(); // value 变为 false
toggle(true); // 强制设为 true
```

## 2. 浏览器与页面交互 (Browser & Interface)

### `useTitle`

动态修改网页标题。

```javascript
import { useTitle } from "@vueuse/core";

const title = useTitle();
title.value = "新标题"; // 网页标题变为 "新标题"
```

### `useClipboard`

剪贴板操作，处理复制粘贴相当简单。

```javascript
import { useClipboard } from "@vueuse/core";

const source = ref("Hello");
const { text, copy, copied, isSupported } = useClipboard({ source });

// 调用 copy() 即可复制 source 的值
// copied.value 会暂时变为 true，用于显示 "复制成功" 的提示
```

### `useDark`

轻松实现暗黑模式切换。通常配合 `useToggle` 使用。

```javascript
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);

// isDark 会自动检测系统偏好，并在 html 标签上添加 'dark' class
```

### `useFullscreen`

全屏切换功能。

```javascript
import { useFullscreen } from "@vueuse/core";
import { ref } from "vue";

const el = ref(null); // 绑定到某个 DOM 元素
const { isFullscreen, enter, exit, toggle } = useFullscreen(el);
```

## 3. 传感器 (Sensors)

### `useMouse`

响应式追踪鼠标位置。

```javascript
import { useMouse } from "@vueuse/core";

const { x, y } = useMouse();
```

### `useWindowSize`

响应式追踪窗口尺寸。

```javascript
import { useWindowSize } from "@vueuse/core";

const { width, height } = useWindowSize();
```

### `useScroll`

监听元素的滚动位置。

```javascript
import { ref } from "vue";
import { useScroll } from "@vueuse/core";

const el = ref(null);
const { x, y, isScrolling, arrivedState, directions } = useScroll(el);
```

### `useElementBounding`

获取元素的边界信息（类似 `getBoundingClientRect`），但是是响应式的。

```javascript
import { ref } from "vue";
import { useElementBounding } from "@vueuse/core";

const el = ref(null);
const { x, y, top, right, bottom, left, width, height } =
  useElementBounding(el);
```

## 4. 优化与控制 (Optimization)

### `useDebounceFn` / `useThrottleFn`

防抖和节流函数。

```javascript
import { useDebounceFn } from "@vueuse/core";

const debouncedFn = useDebounceFn(() => {
  // 执行耗时操作，如搜索 API 调用
  console.log("Do something...");
}, 1000);

// 即使频繁调用，也只会每 1000ms 执行一次
window.addEventListener("resize", debouncedFn);
```

### `onClickOutside`

监听点击元素外部的事件，常用于点击外部关闭模态框或下拉菜单。

```javascript
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const target = ref(null);

onClickOutside(target, (event) => {
  console.log("点击了 target 外部");
  // 这里可以执行关闭弹窗的逻辑
});
```

## 5. 动画与时间 (Animation & Time)

### `useTransition`

数值过渡动画。

```javascript
import { ref } from "vue";
import { useTransition, TransitionPresets } from "@vueuse/core";

const source = ref(0);
const output = useTransition(source, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
});

source.value = 100; // output 会在 1000ms 内从 0 平滑过渡到 100
```

### `useNow` / `useDateFormat`

获取当前时间并格式化。

```javascript
import { useNow, useDateFormat } from "@vueuse/core";

const formatted = useDateFormat(useNow(), "YYYY-MM-DD HH:mm:ss");
```

## 总结

VueUse 的核心在于**组合式**和**响应式**。它将复杂的浏览器 API 或逻辑封装成简单的 ref 对象，极大减少了样板代码。
