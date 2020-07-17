## blog 后台管理页面

####一、使用模块

- react-router-dom 路由

- antd UI 库

- css 样式：[styled-jsx](https://juejin.im/post/5b3dd2d25188251b193d2d7e)

- markdown 渲染：[marked](https://github.com/markedjs/marked) + [highlight.js](https://github.com/highlightjs/highlight.js)

- markdown 导航：[markdown-navbar](https://github.com/parksben/markdown-navbar)

####二、遇到的问题

- Warning: Received `true` for a non-boolean attribute `jsx`.
  - 原因：原因是 create-react-app 的 webpack 配置中的 babelrc 默认是 false。使得 babel 没有生效，无法转译 styled—jsx。
  - 解决：使用 react-app-rewired + customize-cra 来配置 config-overrides.js 文件覆盖默认 webpack 配置（推荐）。使用 `npm run eject` 曝露 config ,修改 webpack.config.j s 文件中的 `bebelrc` 为 true。（不推荐）
