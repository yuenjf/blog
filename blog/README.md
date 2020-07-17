## blog 前台展示页面

####一、使用模块
- markdown 渲染：[marked](https://github.com/markedjs/marked) + [highlight.js](https://github.com/highlightjs/highlight.js)

- markdown 导航：[markdown-navbar](https://github.com/parksben/markdown-navbar)


####二、遇到的问题
- [next.js如何同时引入Antd和Sass](https://segmentfault.com/a/1190000020724663)

- useContext 无法获取值
    + 解决：父组件 `XxContext` 单独使用 `export` 导出，子组件使用 `{XxContext }` 接收

- [antd v4 如何使用后团引入icon](https://segmentfault.com/q/1010000022166166/a-1020000022167654)

- next.js 使用 antd Menu导航菜单，变成了单页应用