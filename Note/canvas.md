# canvas

## 使用步骤

```html
<!-- 第一步：创建 canvas 元素 -->
<canvas id="myCanvas" width="200" height="100"></canvas>
<!-- 注意：不能使用自闭合标签，不能用css设置宽高，否则会失真，而是要用HTNl属性 -->
```

```js
// 第二步：获取 canvas 元素
const canvas = document.getElementById("myCanvas");
// 第三步：获取绘图上下文
const ctx = canvas.getContext("2d");
// 这里的2d表示2d绘图上下文，还有3d
// 第四步：绘制
ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 200, 100);
// 左上角坐标为(0, 0)；宽高分别为200和100
```

## 绘制图形

canvas 只有两种原始图形

- 矩形
  - 三个矩形 API
    - fillRect(x, y, w, h) 实心矩形
    - strokeRect(x, y, w, h) 边框矩形
    - clearRect(x, y, w, h) 清除区域（透明）
- 路径（Path）

  - 路径的标准流程
    - beginPath() 开始路径
    - moveTo(x, y) 移动起点
    - lineTo(x, y) 绘线
    - closePath() 关闭路径
    - stroke() 绘制边框
    - fill() 填充

- 圆和弧（Arcs）

```js
ctx.arc(
  x,
  y, // 圆心
  radius, // 半径
  startAngle, // 起始角（弧度）
  // 弧度 = Math.PI / 180 * 角度
  endAngle, // 结束角（弧度）
  counterclockwise // 是否逆时针
);
```

## canvas API
