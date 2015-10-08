var fs = require('fs');
var shell = require('shelljs');

exports.updateFiles = function (params, cb) {
  var bowerJson = fs.readFileSync('bower.json', 'utf8');
  var bower = JSON.parse(bowerJson);
  bower.version = params.version;
  var output = JSON.stringify(bower, null, 2);
  fs.writeFile('bower.json', output, 'utf8', cb);
};

exports.register = function (params, cb) {
  shell.exec('read -p "Sup" yn', {silent: false});
};
