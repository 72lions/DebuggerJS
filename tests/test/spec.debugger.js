/* Modules */
var common = require('../modules/common.js');
var expect = require('expect.js');
common.include('../../src/namespaces.js');
common.include('../../src/helpers/utils.js');
common.include('../../src/logger.js');
common.include('../../src/loggers/memory.js');
common.include('../../src/parsers/default.js');

describe('Debugger.Utils', function() {

  describe('#isArray', function() {

    it('Should return true', function() {
      var result = Debugger.Utils.isArray([]);
      expect(result).to.be(true);
    });

    it('Should return false', function() {
      var result1 = Debugger.Utils.isArray({});
      var result2 = Debugger.Utils.isArray(function() {});
      var result3 = Debugger.Utils.isArray(14);
      var result4 = Debugger.Utils.isArray('String');

      expect(result1).to.be(false);
      expect(result2).to.be(false);
      expect(result3).to.be(false);
      expect(result4).to.be(false);
    });

  });

});

describe('Debugger.Logger', function() {

  var logger = new Debugger.Logger();

  it('#register', function() {
    var result = logger.register('CONSOLE',
        new Debugger.Loggers.Memory(),
        new Debugger.Parsers.Default());
    expect(result).to.be(true);
  });

  describe('#log', function() {

    it('It should not log since it is not enabled', function() {
      var result = logger.log('RADIO', ['Performance for serializing is', 15, 35], 'performance');
      expect(result).to.be(false);
    });

    it('Should log', function() {
      logger.on();
      var result = logger.log('RADIO', ['Performance for serializing is', 15, 35], 'performance');
      logger.off();
      expect(result).to.be(true);
    });

    it('Should log only stuff from the RADIO modules', function() {
      logger.on(['RADIO']);
      var result1 = logger.log('RADIO', ['Performance for serializing is', 15, 35], 'performance');
      var result2 = logger.log('CONTACT', ['Username', 'thodoris'], 'data');
      logger.off();
      expect(result1).to.be(true);
      expect(result2).to.be(false);
    });

    it('Should log only stuff with RADIO, CONTACT modules', function() {
      logger.on(['RADIO', 'CONTACT']);
      var result1 = logger.log('RADIO', ['Performance for serializing is', 15, 35], 'performance');
      var result2 = logger.log('CONTACT', ['Username', 'thodoris'], 'data');
      var result3 = logger.log('ABOUT', ['Username', 'thodoris'], 'data');
      logger.off();
      expect(result1).to.be(true);
      expect(result2).to.be(true);
      expect(result3).to.be(false);
    });

    it('Should log stuff with the performance tag', function() {
      logger.on(null, ['performance']);
      var result1 = logger.log('RADIO', ['Performance for serializing is', 15, 35], 'performance');
      var result2 = logger.log('CONTACT', ['Username', 'thodoris'], 'data');
      logger.off();
      expect(result1).to.be(true);
      expect(result2).to.be(false);
    });

    it('Should log stuff with the performance, data tag', function() {
      logger.on(null, ['performance', 'data']);
      var result1 = logger.log('RADIO', ['Performance for serializing is', 15, 35], 'performance');
      var result2 = logger.log('CONTACT', ['Username', 'thodoris'], 'data');
      var result3 = logger.log('CONTACT', ['Username', 'thodoris'], 'temp');
      logger.off();
      expect(result1).to.be(true);
      expect(result2).to.be(true);
      expect(result3).to.be(false);
    });

    it('Should log stuff with the RADIO, CONTACT module and performance, data tag', function() {
      logger.on(['RADIO', 'CONTACT'], ['performance', 'data']);
      var result1 = logger.log('RADIO', ['Performance for serializing is', 15, 35], 'performance');
      var result2 = logger.log('RADIO', ['Performance for serializing is', 15, 35], 'data');
      var result3 = logger.log('RADIO', ['Performance for serializing is', 15, 35], 'temp');
      var result4 = logger.log('CONTACT', ['Username', 'thodoris'], 'performance');
      var result5 = logger.log('CONTACT', ['Username', 'thodoris'], 'data');
      var result6 = logger.log('CONTACT', ['Username', 'thodoris'], 'temp');
      var result7 = logger.log('TEST', ['Username', 'thodoris'], 'performance');
      var result8 = logger.log('TEST', ['Username', 'thodoris'], 'data');
      var result9 = logger.log('TEST', ['Username', 'thodoris'], 'temp');
      logger.off();
      expect(result1).to.be(true);
      expect(result2).to.be(true);
      expect(result3).to.be(false);
      expect(result4).to.be(true);
      expect(result5).to.be(true);
      expect(result6).to.be(false);
      expect(result7).to.be(false);
      expect(result8).to.be(false);
      expect(result9).to.be(false);
    });

  });


});
