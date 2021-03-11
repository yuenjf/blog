"use strict";

const Controller = require("egg").Controller;

class MainController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = "博客后台页面";
    }

    // 判断用户名密码是否正确
    async checkLogin() {
        const { ctx, app } = this;

        // 直接存进数据库，不安全，可选择加密存储
        const userName = ctx.request.body.userName;
        const password = ctx.request.body.password;

        const sql =
            "SELECT userName FROM admin WHERE userName = ? AND password = ? ";
        const result = await app.mysql.query(sql, [userName, password]);

        // 判断登录状态,如果成功则进行session缓存
        if (result.length > 0) {
            const openId = new Date().getTime();
            ctx.session.openId = { openId };
            ctx.body = { data: true, openId };
        } else {
            ctx.body = { data: false };
        }
    }

    //  后台文章分类信息
    async getTypeInfo() {
        const { ctx, app } = this;
        const resType = await app.mysql.select("type");
        ctx.body = { data: resType };
    }

    //添加文章
    async addArticle() {
        const { ctx, app } = this;

        let tmpArticle = ctx.request.body;
        const result = await app.mysql.insert("article", tmpArticle);
        const insertSuccess = result.affectedRows === 1;
        const insertId = result.insertId;

        ctx.body = {
            isSuccess: insertSuccess,
            insertId: insertId,
        };
    }

    //修改文章
    async updateArticle() {
        const { ctx, app } = this;

        let tmpArticle = ctx.request.body;
        const result = await app.mysql.update("article", tmpArticle);
        const updateSuccess = result.affectedRows === 1;

        ctx.body = {
            isSuccess: updateSuccess,
        };
    }

    // 获取文章列表
    async getArticleList() {
        const { ctx, app } = this;
        let sql = `
            SELECT article.id as id,
            article.title as title,
            FROM_UNIXTIME(article.releaseDate,'%Y-%m-%d') as releaseDate,  
            type.typeName as typeName 
            FROM article LEFT JOIN type ON article.typeId = type.id
            ORDER BY article.id DESC
        `;
        const resList = await app.mysql.query(sql);
        ctx.body = { data: resList };
    }

    //删除文章
    async delArticle() {
        const { ctx, app } = this;
        
        let id = ctx.params.id;
        const result = await app.mysql.delete("article", { id: id });
        ctx.body = { data: result };
    }
}

module.exports = MainController;
