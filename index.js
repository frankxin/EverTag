/**
 * Created by frankxin on 15/11/5.
 */

const koa = require('koa'),
    co = require('co'),
    router = require('koa-router')(),
    render = require('./render'),
    app = new koa();

//app.use(co.wrap(function* responseTime(ctx,next){
//  const start = new Date;
//  yield next();
//  let ms = new Date - start;
//  console.log(`response time is ${ms} ms`);
//}));
//
//app.use(co.wrap(function* logging(ctx,next){
//  const start = new Date;
//  yield next();
//  let used = new Date - start;
//  console.log(ctx.originalUrl + "\n" +ctx.method+"\n"+used+'ms')
//}));
//
//app.use(co.wrap(function* body(ctx,next){
//  yield next();
//  if(ctx.path !== '/' ) return;
//  ctx.body = "hello world";
//}));

router.get('/user',function* (){
  console.log('it work');
  this.body = yield render('user');
  console.log(this.body);
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
console.log('listening on port 3000');