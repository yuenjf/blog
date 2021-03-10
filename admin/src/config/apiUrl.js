//  接口地址配置文件

// 接口地址
let ipUrl = `http://127.0.0.1:7001/admin/`;

let servicePath = {
    // 登录校验
    checkLogin: ipUrl + `checkLogin`,
    //  获得文章类别信息
    getTypeInfo: ipUrl + `getTypeInfo`,
    //  添加文章
    addArticle: ipUrl + `addArticle`,
};

export default servicePath;
