'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = '博客后台页面';
  }

  // 判断用户名密码是否正确
  async checkLogin() {
    const { ctx, app } = this;

    // 直接存进数据库，不安全，可选择加密存储
    const userName = ctx.request.body.userName;
    const password = ctx.request.body.password;

    const sql = 'SELECT userName FROM admin WHERE userName = ? AND password = ? ';
    const result = await app.mysql.query(sql, [ userName, password ]);

    // 判断登录状态,如果成功则进行session缓存
    if (result.length > 0) {
      const openId = new Date().getTime();
      ctx.session.openId = { openId };
      ctx.body = { data: true, openId };
    } else {
      ctx.body = { data: false };
    }
  }
}

module.exports = MainController;
