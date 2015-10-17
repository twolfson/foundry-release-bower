var fs = require('fs');
var prompt = require('prompt');
var shell = require('shelljs');
var quote = require('shell-quote').quote;

exports.updateFiles = function (params, cb) {
  var bowerJson = fs.readFileSync('bower.json', 'utf8');
  var bower = JSON.parse(bowerJson);
  bower.version = params.version;
  var output = JSON.stringify(bower, null, 2);
  fs.writeFile('bower.json', output, 'utf8', cb);
};

exports.register = function (params, cb) {
  // Load in package info
  var bowerJson = fs.readFileSync('bower.json', 'utf8');
  var bower = JSON.parse(bowerJson);

  function registerFn(err, result) {
    // If there was an error, callback with it
    if (err) {
      return cb(err);
    }

    // Otherwise, perform registration
    shell.exec(quote(['bower', 'register', bower.name, results.gitUrl]));
  }

  // If there is no provided `gitUrl`, then prompt for one
  // https://github.com/flatiron/prompt
  if (!params.gitUrl) {
    var schema = {
      properties: {
        gitUrl: /^git:\/\/.*\.git$/,
        message: '`git://` URL to use for bower',
        required: true
      }
    };
    prompt.start();
    prompt.get(schema, registerFn);
  // Otherwise, pass it along as our results
  } else {
    registerFn(null, params);
  }
};
