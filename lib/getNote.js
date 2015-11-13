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

var keyword = "";

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
        resolve(response);
      }
    })
  });
}

//var noteAsyc = getNote('03600af3-e5f6-4db0-a200-20bd1b416bbe');
var searchAsyc = searchNote(keyword);

searchAsyc.then(function(note){
  var Guid = note.notes[0].guid;
  console.log(Guid);
  return getNote(Guid);
}).then(function(noteContent){
  console.log(noteContent);
}).catch(function(err){
  console.log(err)
});

