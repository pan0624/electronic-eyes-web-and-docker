# electronic-eyes-web-and-docker

校园充电站查询web端,基于来点电官方小程序接口

## 文件结构

```
electric-eye/
├── index.html # 主页面文件
├── fun.js # JavaScript逻辑文件
└── style.css # 样式文件

```

## index.html 界面

显示充电桩列表，并通过按钮选择不同的充电桩位置，同时动态加载充电桩数据到下方列表。

```html

<link rel="stylesheet" href="style.css">

引入格式化样式文件

```

```html

<script src="fun.js"></script>

使用fun.js中函数

```

```html

<button id="btn1" class="location-btn" data-index="1">三食堂左侧</button>

button通过index绑定不同参数的函数

```

## fun.js 函数部分

实现了充电桩状态的查询和显示。

  

```javascript

document.addEventListener('DOMContentLoaded', function() {

```

- 等待页面加载完成后再执行后续代码，确保 DOM 元素已经就绪。

  

```javascript

const chargersList = document.getElementById('chargersList');

const buttons = document.querySelectorAll('.location-btn');

let selectedButtonIndex = null;

```

- 获取页面中用于显示充电桩列表的元素 `chargersList`。

- 获取所有带有 `location-btn` 类的按钮元素。

- 定义一个变量 `selectedButtonIndex` 用于记录当前选中的按钮索引。

  

```javascript

function runScript(deviceId) {

```

- 定义一个函数 `runScript`，接受一个参数 `deviceId`（充电桩设备 ID）。

  

```javascript

fetch(`https://api.power.powerliber.com/client/1/device/port-list`, {

method: 'POST',

headers: {

'Content-Type': 'application/x-www-form-urlencoded',

},

body: `token=aaa&client_id=1&app_id=dd&device_id=${deviceId}`

})

```

- 使用 `fetch` 发起一个 POST 请求到指定的 API 地址。

- 设置请求头为 `application/x-www-form-urlencoded`。

- 构造请求体，包含令牌、客户端 ID、应用 ID 和设备 ID。

  

```javascript

.then(response => response.json())

.then(data => {

```

- 将响应转换为 JSON 格式。

- 处理返回的数据。

  

```javascript

const chargers = data.data.list.map((item, idx) => {

const id = item.id;

const charge_status = item.charge_status;

const power = item.power;

const time_consumed = item.time_consumed;

  

const current_id = id - data.data.list[0].id + 1;

  

if (charge_status === 0) {

return {

id: current_id,

};

}

return undefined;

});

```

- 遍历返回的充电桩列表数据。

- 提取每个充电桩的 ID、充电状态、功率和已用时间。

- 计算当前充电桩的相对 ID。

- 如果充电桩状态为空闲（`charge_status === 0`），则返回一个对象，否则返回 `undefined`。

  

```javascript

const allChargersEmpty = chargers.every(charger => charger === undefined);

if (allChargersEmpty) {

chargers.push({ id: '无可用充电桩' });

}

```

- 检查所有充电桩是否都不可用。

- 如果是，则添加一个提示项到列表中。

  

```javascript

updateChargersList(chargers);

})

.catch(error => {

console.error('请求失败:', error);

});

}

```

- 调用 `updateChargersList` 函数更新页面显示。

- 捕获并处理请求错误。

  

```javascript

function updateChargersList(chargers) {

chargersList.innerHTML = '';

chargers.forEach(item => {

if (item) {

const cell = document.createElement('div');

cell.className = 'weui-cell';

cell.innerHTML = `<div class="charger-id">${item.id}</div>`;

chargersList.appendChild(cell);

}

});

}

```

- 定义一个函数 `updateChargersList`，用于更新充电桩列表的显示。

- 清空之前的列表内容。

- 遍历充电桩数据，为每个有效的充电桩创建一个列表项并添加到页面中。

  

```javascript

buttons.forEach(button => {

button.addEventListener('click', function() {

const index = parseInt(this.getAttribute('data-index'));

selectedButtonIndex = index;

  

buttons.forEach(btn => btn.classList.remove('active'));

this.classList.add('active');

  

switch(index) {

case 1:

runScript("242043");

break;

case 2:

runScript("268217");

break;

case 3:

runScript("409084");

break;

case 4:

runScript("409082");

break;

case 5:

runScript("409081");

break;

case 6:

runScript("240733");

break;

case 7:

runScript("240734");

break;

case 8:

runScript("228179");

break;

case 9:

runScript("228086");

break;

}

});

});

```

- 为每个按钮添加点击事件监听器。

- 获取按钮的索引并更新选中状态。

- 移除其他按钮的选中样式，添加当前按钮的选中样式。

- 根据按钮索引调用对应的 `runScript` 函数，传入不同的设备 ID。

  

## style.css

这份 CSS 文件定义了一个网页的样式，主要包含以下部分：

  

### 1. 全局样式

```css

* {

margin: 0;

padding: 0;

box-sizing: border-box;

}

  

body {

font-family: 'Arial', sans-serif;

background-color: #f5f5f5;

color: #333;

}

```

- `*` 选择器对所有元素设置默认的 `margin` 和 `padding` 为 0，避免浏览器默认样式的影响。

- `box-sizing: border-box;` 让元素的宽度和高度包含内边距和边框，便于布局。

- `body` 设置了字体为 Arial，背景色为浅灰色（#f5f5f5），文字颜色为深灰色（#333）。

  

### 2. 容器布局

```css

.container {

width: 100%;

max-width: 1200px;

margin: 0 auto;

padding: 20px;

}

```

- `.container` 是页面的主要容器，宽度为 100%，最大宽度限制为 1200px，居中显示，内边距为 20px。

  

### 3. 页面内容区域

```css

.page {

background-color: #fff;

border-radius: 10px;

box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

padding: 20px;

margin-top: 20px;

}

  

.page__hd {

margin-bottom: 20px;

}

  

.weui-cells__title {

font-size: 24px;

color: #333;

margin-bottom: 20px;

text-align: center;

}

```

- `.page` 是一个白色背景的内容块，有圆角和阴影，内边距 20px，顶部外边距 20px。

- `.page__hd` 是页面头部，底部外边距 20px。

- `.weui-cells__title` 是标题样式，字体大小 24px，居中显示，底部外边距 20px。

  

### 4. 按钮样式

```css

.page__ft {

display: grid;

grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

gap: 10px;

margin-bottom: 20px;

}

  

.location-btn {

padding: 10px 15px;

background-color: #f0f0f0;

border: none;

border-radius: 5px;

color: #333;

font-size: 14px;

cursor: pointer;

transition: all 0.3s ease;

text-align: center;

}

  

.location-btn:hover {

background-color: #e0e0e0;

}

  

.location-btn.active {

background-color: #4CAF50;

color: white;

box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);

}

```

- `.page__ft` 使用 CSS Grid 布局，自动填充列，每列最小宽度 150px，列之间有 10px 间距。

- `.location-btn` 是按钮的基本样式，灰色背景，无边框，圆角，字体大小 14px，悬停时变浅灰色。

- `.location-btn.active` 是按钮的激活状态，绿色背景，白色文字，有阴影。

  

### 5. 列表样式

```css

.page__bd {

margin-top: 20px;

}

  

.weui-cells {

margin-top: 10px;

border-radius: 5px;

overflow: hidden;

}

  

.weui-cell {

padding: 15px;

border-bottom: 1px solid #eee;

display: flex;

align-items: center;

}

  

.weui-cell:last-child {

border-bottom: none;

}

  

.weui-cells__title {

font-size: 18px;

font-weight: bold;

margin-bottom: 10px;

color: #333;

padding: 0 15px;

}

  

.charger-id {

font-size: 16px;

color: #555;

display: flex;

align-items: center;

}

  

.charger-id::before {

content: '';

display: inline-block;

width: 8px;

height: 8px;

background-color: #4CAF50;

border-radius: 50%;

margin-right: 10px;

}

```

- `.page__bd` 是页面主体部分，顶部外边距 20px。

- `.weui-cells` 是列表容器，有圆角和溢出隐藏。

- `.weui-cell` 是列表项，内边距 15px，底部有浅灰色边框，最后一项无边框。

- `.weui-cells__title` 是列表标题，字体加粗，底部外边距 10px。

- `.charger-id` 是列表项中的标识，左侧有一个绿色圆点。

  

## docker 编译镜像

  

### Dockerfile

```dockerfile

# 第一阶段：编译 Go 代码
FROM golang:1.20-alpine AS builder

WORKDIR /app

# 安装依赖
COPY go.mod ./
RUN go mod download

# 复制源码并编译
COPY main.go .
RUN go build -o /app/server

# 第二阶段：准备运行环境
FROM alpine:latest

# 创建目录并复制编译好的二进制文件和静态文件
WORKDIR /root/
COPY --from=builder /app/server .

# 复制网站文件到 /static 目录
COPY index.html /static/
COPY style.css /static/
COPY fun.js /static/

# 暴露端口 80
EXPOSE 80

# 启动命令
CMD ["/root/server"]

```

  

### 编译

先登录dockerhub
```shell
docker login
输入用户名和密码（不是邮箱和Personal access token）
```

直接编译跨架构镜像报错设备不支持，发现是docker 默认bulidx默认没有跨架构编译功能。

1.创建新的跨架构buildx并设置为默认（对其他功能无影响）

```shell

docker buildx create --use --name onebuilder --driver docker-container --bootstrap

```
注意这步网络要求很高，请自行解决命令行代理问题，耗时100s+属于正常时间。


2.确认已经切换到当前Builder实例

```shell

docker buildx ls

```

![image.png](https://s2.loli.net/2025/03/16/b36UN9fk8yBxupS.png)

后面带* 号的为当前使用Builder

3.编译并上传
```shell
docker buildx build --platform linux/amd64,linux/arm64 -t pan0623/electric-eye:latest --push .
```

自行到dockerhub仓库进行检查
![image.png](https://s2.loli.net/2025/03/16/zV1b3jJKwicD9PL.png)

## 使用

使用方法

1.docker compose (推荐)

首先创建electric-eye文件夹，随后创建docker-compose.yml

```docker
version: '3'
services:

  electric-eye:
    image: pan0623/electric-eye
    ports:
      - "62480:80"
    container_name: electric-eye
```

随后执行 docker compose up -d

1. docker run 直接运行

```shell
docker run -d -p 62480:80 --name electric-eye pan0623/electric-eye
```

对于大多数设备请尽量避免直接将容器内部80端口映射到外部80端口，请参考我的用例修改映射端口到至少大于1024