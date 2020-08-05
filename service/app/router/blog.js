'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/blog/index', controller.blog.main.index);
  router.get('/blog/getArticleList', controller.blog.main.getArticleList);
  router.get('/blog/getArticleById/:id', controller.blog.main.getArticleById);
  router.get('/blog/getNavTypeInfo', controller.blog.main.getNavTypeInfo);
  router.get('/blog/getListById/:id', controller.blog.main.getListById);
};
