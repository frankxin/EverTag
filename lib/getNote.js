/**
 * Created by frankxin on 15/11/12.
 */

'strict mode'

const Evernote = require('evernote').Evernote,
    config = require('../_config.json'),
    co = require('co');

const client = new Evernote.Client({
  token: config.developerToken_for_sandbox
});

const noteStore = client.getNoteStore();

var webApiUrlPrefix = '';

/**
 * Just for test
 * @type {string}
 */
var Guid = "03600af3-e5f6-4db0-a200-20bd1b416bbe";

module.exports = function getNote(Guid){
  return new Promise(function(resolve,reject){
    noteStore.getNote(Guid,true,true,true,false,function(err,note){
      if(err){
        reject(new Error('What a fuck getNote ! ' + err + ": " + err.errorCode))
      }else {
        resolve(note)
      }
    })
  })
};


/**
 * 异步同步化 , fetchNote 函数的运行
 */

//module.exports = function(){
//
//  var emitNote = {};
//
//  co(function* fetchNote(){
//    emitNote = yield getNote(Guid);
//  }).then(function(){
//    console.log('fetchNote is finished');
//    return emitNote;
//  }).catch(function(err){
//    console.log(err);
//  });
//};
