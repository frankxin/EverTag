/**
 * Created by frankxin on 15/11/16.
 */

'strict mode'

const Evernote = require('evernote').Evernote,
    config = require('../_config.json');

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

var searchAsyc = searchNote(keyword);

searchAsyc.then(function(note){
  //var Guid = note.notes[0].guid;
  console.log(note);
}).catch(function(err){
  console.log(err)
});
