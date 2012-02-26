var tape = require('../recorder/tape');

describe('Tape', function(){

  describe('Wipe', function(){

    beforeEach(function(){

      tape.result = { username: 'Geert', password: '1234' };
      tape.wipe();

    });

    it('should wipe the content of result', function(){

      tape.result.should.eql({});
      
    });

  });


  describe('Compare', function(){

    var comparison = null;

    beforeEach(function(){

      tape.result = { username: 'Geert', password: '1234' };

      //Inject fake console log
      tape.inject(function(s){ comparison = s; });

      tape.compare({ username: 'Gert' });

    });

    it('returns a compare string', function(){

      comparison.should.eql('{\n  "username" : \u001b[34m\u001b[1m"Gert"\u001b[0m,\n  \u001b[31m\u001b[1m"password" : "1234"\u001b[0m\n}');

    });

  });

});
