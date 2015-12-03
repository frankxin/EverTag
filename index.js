/**
 * Created by frankxin on 15/11/5.
 */

const koa = require('koa'),
    co = require('co'),
    router = require('koa-router')(),
    render = require('./render'),
    user = require('./lib/user'),
    search = require('./lib/search'),
    getNote = require('./lib/getNote'),
    share = require('./lib/share'),
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

router.get('/user',getUser);
// url to /search/{keyword}
router.get('/search/:kw',searchPost);
router.get('/get_note/:guid',getPost);
router.put('/share/:guid',sharePost);

function* getUser(){
  console.log('get /user');
  yield user(this);
  console.log('send user');
}

function* searchPost(){
  var searchData;
  console.log('search start');

  searchData = yield search(this.params.kw);

  this.response.body = searchData;
}

function* getPost(){
  var guid = this.params.guid,
      note;

  console.log('get note start');

  note = yield getNote(guid);

  this.response.body = note;
}

function* sharePost(){
  var guid = this.params.guid,
      note,status;

  note = yield getNote(guid);


  status = yield share(guid,this);

  this.response.body = {
    status : status
  }
}



app.use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
console.log('listening on port 3000');