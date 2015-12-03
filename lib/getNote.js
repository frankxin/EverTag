/**
 * Created by frankxin on 15/11/12.
 */

'strict mode'

/**
 *
 * 这个接口需要优化!!!!! 好慢,查询要花1s json 传输就有225kb
 *
 */

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
//var Guid = "03600af3-e5f6-4db0-a200-20bd1b416bbe";

module.exports = function getNote(Guid){
  return new Promise(function(resolve,reject){
    noteStore.getNote(Guid,true,true,true,false,function(err,note){
      /**
       *
       * 错误处理优化,我没找到相对应的guid的content时不应该抛出错误
       *
       * EDAMNotFoundException,EDAMUserException: errCode 2 should be passed
       *
       */

      if(err){
        resolve(null);
        console.log("Error for Not Found Note : " + err)
      }else {
        resolve(note)
      }
    })
  })
};


