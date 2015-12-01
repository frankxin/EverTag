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

const noteStore = client.getNoteStore();

/**
 * test param
 * @type {string}
 */
var keyword = "compass";

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

function* searchAsyc(){
  var notes;
  notes = yield searchNote(keyword);
  console.log(notes);
}

co(searchAsyc).then(function(){}).catch(function(err){
  console.log(err);
});

