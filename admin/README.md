# blog 前端 后台管理页面

## 一、使用模块

-   react-router-dom 路由

-   antd UI 库

-   css 样式：[styled-jsx](https://juejin.im/post/5b3dd2d25188251b193d2d7e)

-   markdown 渲染：[marked](https://github.com/markedjs/marked) + [highlight.js](https://github.com/highlightjs/highlight.js)

-   markdown 导航：[markdown-navbar](https://github.com/parksben/markdown-navbar)

## 二、遇到的问题

-   Warning: Received `true` for a non-boolean attribute `jsx`.
    -   原因： create-react-app 的 webpack 配置中的 babelrc 默认是 false。使得 babel 没有生效，无法转译 styled-jsx。
    -   解决：使用 react-app-rewired + customize-cra 来配置 config-overrides.js 文件覆盖默认 webpack 配置（推荐）。
        使用 npm run eject 曝露 config ,修改 webpack.config.js 文件中的 bebelrc 为 true。（不推荐）
-   AddArticle 组件使用 styled-jsx 渲染 markdown 的样式不成功，怀疑是对第三方组件的支持问题，使用 `<style jsx global>` 全局渲染成功

-   Access to XMLHttpRequest at 'http://127.0.0.1:7001/admin/checkLogin' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '\*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.

    -   原因：跨域问题

-   路由通过`props.history.push("xxx")`转跳空白

    -   原因：父路由设置了 exact 精确匹配，子路由转跳所以空白

-   DatePicker 中设置 value 提示错误 date.clone is not a function
    -   原因：DatePicker 中的 value 的类型为 moment，需要`import moment from 'moment';`，然后用这样的方式设置`value{moment(data)}`
