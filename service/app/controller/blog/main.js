"use strict";

const Controller = require("egg").Controller;

class MainController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = "博客前台页面";
    }

    //  获取文章列表
    async getArticleList() {
        const { ctx, app } = this;
        const sql = `
            SELECT article.id as id ,
            article.title as title ,
            FROM_UNIXTIME(article.releaseDate,'%Y-%m-%d') as releaseDate ,
            article.introduction as introduction ,
            article.viewCount as viewCount ,
            type.typeName as typeName 
            FROM article LEFT JOIN type ON article.typeId = type.id
        `;
        const results = await app.mysql.query(sql);
        ctx.body = { data: results };
    }

    //  根据 ID 获取文章该内容
    async getArticleById() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        const sql = `
            SELECT article.id as ArticleId ,
            article.title as title ,
            FROM_UNIXTIME(article.releaseDate,'%Y-%m-%d %H:%i:%s') as releaseDate ,
            article.viewCount as viewCount ,
            article.introduction as introduction ,
            article.content as content ,
            type.id as typeId ,
            type.typeName as typeName 
            FROM article LEFT JOIN type ON article.typeId = type.id 
            WHERE article.id = ?
        `;
        const results = await app.mysql.query(sql, [id]);
        ctx.body = { data: results };
    }

    //  获取类别编号和名称
    async getNavTypeInfo() {
        const { ctx, app } = this;
        const results = await app.mysql.select("type");
        ctx.body = { data: results };
    }

    //  根据 ID 获得文章列表
    async getListById() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        const sql = `
            SELECT article.id as id ,
            article.title as title ,
            FROM_UNIXTIME(article.releaseDate,'%Y-%m-%d') as releaseDate ,
            article.introduction as introduction ,
            article.viewCount as viewCount ,
            type.typeName as typeName 
            FROM article LEFT JOIN type ON article.typeId = type.id
            WHERE typeId = ?
        `;
        const results = await app.mysql.query(sql, [id]);
        ctx.body = { data: results };
    }
}

module.exports = MainController;
