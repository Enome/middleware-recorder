var tape = require('../recorder/tape');

describe('Tape', function(){

  describe('Wipe', function(){

    var result = null;

    beforeEach(function(){

      tape.result = { username: 'Geert', password: '1234' };
      result = tape.wipe();

    });

    it('should wipe the content of result', function(){

      tape.eql({});
      
    });

    it('returns the tape objects', function(){

      result.should.eql(tape);

    });

  });


  describe('Compare', function(){

    var comparison = null;

    beforeEach(function(){

      tape.result = { username: 'Geert', password: '1234' };

    });

    it('returns a compare string', function(){

      tape.compare({ username: 'Gert' }).should.eql('{\n  "username" : \u001b[34m\u001b[1m"Gert"\u001b[0m,\n  \u001b[31m\u001b[1m"password" : "1234"\u001b[0m\n}');

    });

  });


  describe('Equal', function(){

    it( 'equals eachother', function(){

      tape.result = { username: 'Geert', password: '1234' };
      tape.eql( {username: 'Geert', password: '1234' } );

    });

  });

});
