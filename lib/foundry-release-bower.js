var fs = require('fs');
var spawn = require('child_process').spawn;

exports.updateFiles = function (params, cb) {
  var bowerJson = fs.readFileSync('bower.json', 'utf8');
  var bower = JSON.parse(bowerJson);
  bower.version = params.version;
  var output = JSON.stringify(bower, null, 2);
  fs.writeFile('bower.json', output, 'utf8', cb);
};

exports.register = function (params, cb) {
  // TODO: We are getting frustrated at possibilities for `.git` setup and can't think of a nice solution
  //   Assume `.git` folder
  //   Prompt user (with `.git` default)
  //   Something else
  // TODO: Use actual register command
  var child = spawn('bower', ['login'], {stdio: 'inherit'});
  child.on('exit', function handleExit (code) {
    var err = code ? new Error('`bower
  });
};
