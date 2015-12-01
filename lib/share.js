/**
 * Created by frankxin on 15/12/1.
 */

const note = require('./getNote'),
      co  = require('co'),
      mongoose = require('mongoose');


co(function* saveNote(){
  var userID = getUserID();
  yield savePostToDatabase(userID,note.guid,note.content,note.title);
}).then(function(){
  console.log('save a post to database');
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

var Post = new mongoose.model('post',postSchema);

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

