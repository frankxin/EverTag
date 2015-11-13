/**
 * Created by frankxin on 15/11/6.
 */

var view = require('co-views');

module.exports = view('views',{
  map: { html: 'jade' },//use handlebar or underscore template
  default: 'jade'
});
