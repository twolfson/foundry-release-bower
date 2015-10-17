// Load in dependencies
var fs = require('fs');
var expect = require('chai').expect;
var bowerRelease = require('../');
var fixtureUtils = require('./utils/fixtures');

// Guarantee safeguards against exec are in place (see WARNING.md)
var childUtils = require('./utils/child-process');

// Define our test
describe('Updating files', function () {
  describe('in a bower module', function () {
    var fixtureDir = fixtureUtils.fixtureDir('bower');
    before(function updateFiles (done) {
      bowerRelease.updateFiles({
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

describe('Registering', function () {
  describe('a bower module', function () {
    var fixtureDir = fixtureUtils.fixtureDir('bower');
    before(function registerToBower (done) {
      this.execStub = sinon.stub(shell, 'exec');
      bowerRelease.register({
        version: '0.1.0',
        message: 'Release 0.1.0',
        description: null,
        gitUrl: 'git://test.git'
      }, done);
    });
    after(function cleanup () {
      this.execStub.restore();
    });

    it('registers to bower', function () {
      expect(this.execStub.args[0]).to.deep.equal(['bower register super-secret-foundry-test git://test.git']);
    });
  });
});
