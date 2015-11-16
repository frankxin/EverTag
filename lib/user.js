/**
 * Created by frankxin on 15/11/16.
 */

'strict mode'

const Evernote = require('evernote').Evernote,
    config = require('../_config.json');

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


/**
 * main user
 */
var user = getUser();

user.then(function(usr){
  console.log(usr);
  console.log(usr.id + '\n');
  console.log(usr.username + '\n');
  console.log(usr.name + '\n');
  console.log(usr.email + '\n');
}).catch(function(err){
  console.log(err);
});
