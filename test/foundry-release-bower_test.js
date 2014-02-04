// Load in dependencies
var fs = require('fs');
var expect = require('chai').expect;
var bowerRelease = require('../');
var fixtureUtils = require('./utils/fixtures');

// Define our test
describe('Setting the version', function () {
  describe('in a bower module', function () {
    var fixtureDir = fixtureUtils.fixtureDir('bower');
    before(function release (done) {
      bowerRelease.setVersion({
        version: '0.1.0',
        message: 'Release 0.1.0',
        description: null
      }, done);
    });

    it('updates the bower.json', function () {
      var pkgJson = fs.readFileSync(fixtureDir + '/bower.json');
      expect(JSON.parse(pkgJson)).to.have.property('version', '0.1.0');
    });
  });
});
