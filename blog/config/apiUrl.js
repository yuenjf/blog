//  接口地址配置文件

// 接口地址
let ipUrl = `http://127.0.0.1:7001/blog/`

let servicePath = {
    // 首页文章列表接口
    getArticleList: ipUrl + `getArticleList`,
    // 文章详细页内容接口 ,需要接收参数
    getArticleById: ipUrl + `getArticleById/`,
    // 首页导航类别接口
    getNavTypeInfo: ipUrl + `getNavTypeInfo`,
    // 列表页内容接口 ,需要接收参数
    getListById: ipUrl + `getListById/`,

}

export default servicePath