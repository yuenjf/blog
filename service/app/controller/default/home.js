'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const {ctx} = this;
        ctx.body = 'api hi';
    }

    //  获取文章列表
    async getArticleList() {
        const {ctx, app} = this;
        let sql = `
            SELECT article.id as id ,
            article.title as title ,
            FROM_UNIXTIME(article.addTime,'%Y-%m-%d') as addTime ,
            article.introduce as introduce ,
            article.viewCount as viewCount ,
            type.typeName as typeName 
            FROM article LEFT JOIN type ON article.typeId = type.id
        `
        const results = await app.mysql.query(sql)
        ctx.body = {data: results}
    }

    //  根据 ID 获取文章该内容
    async getArticleById() {
        const {ctx, app} = this;
        let id = ctx.params.id
        let sql = `
            SELECT article.id as ArticleId ,
            article.title as title ,
            FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ,
            article.introduce as introduce ,
            article.content as content ,
            article.viewCount as viewCount ,
            type.id as typeId ,
            type.typeName as typeName 
            FROM article LEFT JOIN type ON article.typeId = type.id 
            WHERE article.id=${id}
        `
        const results = await app.mysql.query(sql)
        ctx.body = {data: results}
    }

    //  获取类别编号和名称
    async getNavTypeInfo() {
        const {ctx, app} = this;
        const results = await app.mysql.select('type')
        ctx.body = {data: results}
    }

    //  根据 ID 获得文章列表
    async getListById() {
        const {ctx, app} = this;
        let id = ctx.params.id
        let sql = `
            SELECT article.id as id ,
            article.title as title ,
            FROM_UNIXTIME(article.addTime,'%Y-%m-%d') as addTime ,
            article.introduce as introduce ,
            article.viewCount as viewCount ,
            type.typeName as typeName 
            FROM article LEFT JOIN type ON article.typeId = type.id
            WHERE typeId=${id}
        `
        const results = await app.mysql.query(sql)
        ctx.body = {data: results}
    }
}

module.exports = HomeController;
