/**
 * Created by frankxin on 15/11/16.
 */

'strict mode'

const Evernote = require('evernote').Evernote,
    config = require('../_config.json'),
    co = require('co'),
    mongoose = require('mongoose');

const client = new Evernote.Client({
  token: config.developerToken_for_sandbox
});

const userStore = client.getUserStore();

function getUser(){
  return new Promise(function(resolve,reject){
    userStore.getUser(function(err , user){
      if(err){
        reject(new Error('What a fuck! + " " + err'));
      }else{
        resolve(user);
      }
    })
  })
};

//asyc to syc
//如果提供接口一定要是异步的
module.exports = function user(ctx){

  return new Promise(function(resolve,reject){

    co(function* getUserSyc(){
      mongoose.connect('mongodb://127.0.0.1:27017/test');

      var db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', function (callback) {
        console.log('-------------- Connect to database -----------------');
      });

      var usr;
      usr = yield getUser();
      console.log(usr.id + '\n');
      console.log(usr.username + '\n');
      //yield saveUserToDatabase(usr.id , usr.username);
      db.close();
      ctx.response.set('Cache-Control', 'no-cache');
      ctx.response.body = {
        userID : usr.id,
        userName : usr.username
      };
      ctx.response.status = 200;
      resolve();
    }).then(function(){
      console.log('save one user to database');
    }).catch(function(err){
      console.log(err);
      reject();
    });
  });

};


/**
 * Data things
 */


var userSchema = new mongoose.Schema({
  userID : String,
  userName : String
});

/**
 * Mongoose automatically looks for the plural version of your model name
 */
var User = mongoose.model('User',userSchema);

/**
 * Interface
 */
function saveUserToDatabase(userID,userName){
  return new Promise(function(resolve,reject){
    var user = new User({
      userID : userID,
      userName : userName
    });

    user.save(function(err){
      if (err) {
        reject(new Error('What a fucking mongo! + " " + err'));
      }else{
        resolve();
      }
    })
  })
}
