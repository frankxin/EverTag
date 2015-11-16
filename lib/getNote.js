/**
 * Created by frankxin on 15/11/12.
 */

'strict mode'

const Evernote = require('evernote').Evernote,
    config = require('../_config.json');

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

function getNote(Guid){
  return new Promise(function(resolve,reject){
    noteStore.getNote(Guid,true,true,true,false,function(err,note){
      if(err){
        reject(new Error('What a fuck getNote ! ' + err + ": " + err.errorCode))
      }else {
        resolve(note)
      }
    })
  })
}


var noteAsyc = getNote(Guid);

noteAsyc.then(function(note){
  console.log(note);
}).catch(function(err){
  console.log(err);
});
