/**
 * Created by frankxin on 15/11/5.
 */

const koa = require('koa'),
    co = require('co'),
    router = require('koa-router')(),
    render = require('./render'),
    user = require('./lib/user'),
    app = new koa();


/**
 * APP Interface:
 *
 * 1. /user , method: get , Oauth -> redirect to mainPage
 *
 * 2. /search:keyword , method: get , param: keyword , return a list of pre selected
 *
 * 3. /getArticle:id , method: get , param: guid , return a Article
 *
 * 4. /public:id , method: put , param: guid , return a status and the public link
 *
 * 5. /delete:id , method: delete , param: guid ,return a status
 *
 * 6. /getList:userID , method: get , param: userID , return a list of article with status
 *
 */

/**
 * Data Structure:
 *
 * 1. user: userID username
 *
 * 2. note: userID noteContent noteInform
 *
 */

router.get('/user',function* (){
  console.log('get /user');
  //this.body = yield render('user');
  user();
});

router.get('/getArticle:id',function* (){

});

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
console.log('listening on port 3000');