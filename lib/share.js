/**
 * Created by frankxin on 15/12/1.
 */

const getNote = require('./getNote'),
      co  = require('co'),
      mongoose = require('mongoose');

var note,
    Guid = "03600af3-e5f6-4db0-a200-20bd1b416bbe",
    userID = "589223";

co(function* saveNoteToDB(){
  note = yield getNote(Guid);
  yield savePostToDatabase(userID,note.guid,note.content,note.title);
}).then(function(){
  console.log('fetch a note and save the note to database');
}).catch(function(err){
  console.log(err);
});


/**
 * Data things
 */

mongoose.connect('mongodb://127.0.0.1:27017/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('-------------- Connect to database -----------------');
});

var postSchema = new mongoose.Schema({
  userID : String,
  postID : String,
  content : String,
  title : String,
  shareTime : Date,
  status : String
});

var Post = mongoose.model('post',postSchema);

function* savePostToDatabase(userID,postID,content,title){
  var post = new Post({
    userID : userID,
    postID : postID,
    content : content,
    title : title
  });

  return new Promise(function(resolve,reject){
    post.save(function(err){
      if(err){
        reject(new Error('What a fucking mongo! + " " + err'));
      }else{
        resolve();
      }
    })
  })
}

