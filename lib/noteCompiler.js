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

var webApiUrlPrefix = '';


/**
 * Helper
 */

/*10 system to 16 system*/
Number.prototype.toHexString = function() {
  return this.toString(16);
};

/*handle bodyHash to String*/
const _toHex = function(data) {
  var char = [];
  for (var i = 0; i < data.length; i++) {
    var d = data[i];
    char[i * 2] = Math.floor(d / 16).toHexString();
    char[i * 2 + 1] = (d % 16).toHexString();
  }
  return char.join('');
};

const _makeImgUrl = function(urlPrefix, guid, style) {

  //if i don't login i must send developerToken
  var s = "<img src=\"" + urlPrefix + "res/" + guid + '?auth=' + config.developerToken + "\" " + style + " />";
  console.log(s);
  return s;

};

var _processContent = function(note){

  var patternEnNote = /<en-note[^>]*/i,
      patternEnMedia = /(<en-media[^<]+<\/en-media>)/ig;

  var content = note.content,
      resource = note.resources,
      out = content.match(patternEnNote),
      startIndex = out.index + out[0].length,
      endIndex = content.lastIndexOf("</en-note>"),
      body = content.substring(startIndex, endIndex);

  //replace the en-media
  var newContent = body.replace(patternEnMedia, function(match, pos, originalText) {
    var patternHash = /hash=\"([0-9a-f]+)\"/,
        patternStyle = /style=\"[^"]+\"/i,
        style;

    var key = match.match(patternHash),
        hash = key[1];
    //match the style of img
    var styleIsNuLL = match.match(patternStyle);

    if (styleIsNuLL != null) {
      style = styleIsNuLL;
    } else {
      style = '';
    }

    for (var i = 0; i < resource.length; i++) {
      var toHexHash = toHex(resource[i].data.bodyHash);
      if (toHexHash == hash) {
        var imgBlock = makeImgUrl(webApiUrlPrefix, resource[i].guid, style);
        return imgBlock;
      }
    }
  });
  //prepare a entire content to render
  var allContent = "<div " + newContent + "</div>";

  console.log(allContent);
  return allContent

};

var noteCompiler = {} || noteCompiler;

noteCompiler.toHex = _toHex;
noteCompiler.makeImgUrl = _makeImgUrl;
noteCompiler.processContent = _processContent;