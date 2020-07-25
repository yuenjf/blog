'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'ho';
  }


  // 判断用户名密码是否正确
  async checkLogin() {
    const { ctx, app } = this;

    const userName = ctx.request.body.userName;
    const password = ctx.request.body.password;

    const sql = 'SELECT userName FROM admin WHERE userName = ? AND password = ? ';
    const result = await app.mysql.query(sql, [ userName, password ]);

    // 判断登录状态,如果成功则进行session缓存
    if (result.length > 0) {
      const openId = new Date().getTime();
      ctx.session.openId = { openId };
      ctx.body = { data: '登录成功', openId };
    } else {
      ctx.body = { data: '登录失败' };
    }
  }
}

module.exports = MainController;
