var fs = require('fs');
var shell = require('shelljs');

exports.specVersion = '1.1.0';

exports.updateFiles = function (params, cb) {
  if (shell.test('-f', 'bower.json')) {
    var bowerJson = fs.readFileSync('bower.json', 'utf8');
    var bower = JSON.parse(bowerJson);
    bower.version = params.version;
    var output = JSON.stringify(bower, null, 2);
    fs.writeFile('bower.json', output, 'utf8', cb);
  } else {
    process.nextTick(cb);
  }
};
