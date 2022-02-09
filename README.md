# v3design

## 简介
页面生成器，拖拽生成静态页面（所见即所得）。

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
node builder.js
```

### 静态页面查看方法
```
点击页面生成页面后，
项目下会产生dist文件夹，
需要手动在dist下手动启动一个server, 推荐 http-server。
```

### Compiles and minifies for production
```
npm run build
注: build出来的不是项目本身，而是拖拽后的页面。
本项目前demo阶段，只提供思路，暂没有拆分前后端以及npm包。
```

### TODO LIST
1. 启动流程自动化。
2. 目标页面 预加载(静态化)。
3. 组件交互or通信事件机制？。
4. 页面通用属性注入 如title。
5. tsx-style-px2vw.js 的loader。这个是因为目前 postcss-px-to-viewport只处理了.scss 并不会处理style标签。

以上todo 有兴趣的老板可以提idea or code。

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
