/**
 * Created by frankxin on 15/11/16.
 */

'strict mode'

const Evernote = require('evernote').Evernote,
    config = require('../_config.json'),
    co = require('co');

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
}

//asyc to syc
function* getUserSyc(){
  var usr;
  usr = yield getUser();
  console.log(usr);
  console.log(usr.id + '\n');
  console.log(usr.username + '\n');
}


co(getUserSyc).then(function(){}).catch(function(err){
  console.log(err);
});
