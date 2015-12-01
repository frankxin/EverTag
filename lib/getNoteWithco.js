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
//var Guid = "03600af3-e5f6-4db0-a200-20bd1b416bbe";
var keyword = "compass";

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

function searchNote(keyword){
  return new Promise(function(resolve,reject){

    var noteFilter = new Evernote.NoteFilter();
    noteFilter.words = keyword;
    noteFilter.ascending = false;
    noteFilter.inactive = false;

    noteStore.findNotes(noteFilter, 0, 20, function(err , response){
      if(err) {
        reject(new Error('What a fuck !' + err + ": " + err.errorCode));
      } else {
        resolve(response.notes[0].guid);
      }
    })
  });
}

/**
 * 异步同步化
 */
function* fetchNote(){
  var guid,note;
  guid = yield searchNote(keyword);
  note = yield getNote('03600af3-e5f6-4db0-a200-20bd1b416bbe');
  console.log(note);
}

/**
 * fetchNote 函数的运行
 */
co(fetchNote).then(function(){
  console.log('fetchNote is finished');
}).catch(function(err){
  console.log(err);
});
    //.catch(function(err){
  //console.log(err);
//});
//var fetch = fetchNote();
//
//fetch.next().value.then(function(note){
//  var Guid = note.notes[0].guid;
//  fetch.next(Guid).value.then(function(noteContent){
//    fetch.next(noteContent);
//  });
//}).catch(function(err){
//  console.log(err);
//});

//var searchAsyc = searchNote(keyword);
//
//searchAsyc.then(function(note){
//  var Guid = note.notes[0].guid;
//  console.log(note);
//  return noteAsyc(Guid);
//}).then(function(noteContent){
//  console.log(noteContent);
//}).catch(function(err){
//  console.log(err)
//});


//var noteAsyc = getNote(Guid);
//
//noteAsyc.then(function(note){
//  console.log(note);
//}).catch(function(err){
//  console.log(err);
//});
