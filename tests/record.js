var record = require('../').record;
var tape = require('../').tape;

describe('Middleware Recorder', function(){


  describe('Example', function(){

    var middleware = function(req, res, next){

      res.local('email', 'jef@example.com');
      req.session.user = 'Geert';
      next()

    };

    beforeEach( function(){

      record( middleware ).into( tape );

    });

    afterEach( function(){

      tape.wipe()

    });

    it('adds locals to the result', function(){

      console.log(tape.result);
      tape.result.should.eql({
        locals: { email: 'jef@example.com' },
        session: { user: 'Geert' },
        next: true
      });

    });

  });


  describe('Async Example', function(){

    var middleware = function(req, res, next){

      res.local('email', 'jef@example.com');
      req.session.country = req.body.country;

      setTimeout(function(){

        res.send( res.locals().email );

      }, 50);

    };

    beforeEach( function(done){

      var req = { body: { country: 'Belgium' } };
      record( middleware, req ).into( tape, done );

    });

    afterEach( function(){

      tape.wipe()

    });

    it('adds locals to the result', function(){

      tape.result.should.eql({
        locals: { email: 'jef@example.com' },
        session: { country: 'Belgium' },
        send: 'jef@example.com'
      });

    });

  });


  describe('Locals', function(){

    var middleware = function(req, res, next){

      res.local('email', 'geert@example.com');

    };

    beforeEach( function(){

      record( middleware ).into( tape );

    });

    afterEach( function(){

      tape.wipe()

    });

    it('adds locals to the result', function(){

      tape.result.locals.email.should.eql('geert@example.com');

    });

  });


  describe('Render', function(){

    var middleware = function(req, res, next){

      res.render('users/new', { user: { username: 'Geert', password: '1234' } } );

    };

    beforeEach( function(){

      record( middleware ).into( tape );

    });

    afterEach( function(){

      tape.wipe();

    });

    it('add render to the result', function(){

      tape.result.render.should.eql({
        template:'users/new', 
        locals: { user: { username: 'Geert', password: '1234' } } 
      });

    });

  });


  describe('Redirect', function(){

    var middleware = function(req, res, next){

      res.redirect('/login');

    };

    beforeEach( function(){

      record( middleware ).into( tape );

    });

    afterEach( function(){

      tape.wipe();

    });

    it('add render to the result', function(){

      tape.result.redirect.should.eql('/login');

    });

  });


  describe('Send', function(){

    var middleware = function(req, res, next){

      res.send('Hello? Yes, this is dog.');

    };

    beforeEach( function(){

      record( middleware ).into( tape );

    });

    afterEach( function(){

      tape.wipe();

    });

    it('add render to the result', function(){

      tape.result.send.should.eql('Hello? Yes, this is dog.');

    });

  });


  describe('Session', function(){

    var middleware = function(req, res, next){

      req.session.username = 'Geert';

    };

    beforeEach( function(){

      record( middleware ).into( tape );

    });

    afterEach( function(){

      tape.wipe();

    });

    it('adds session to the result', function(){

      tape.result.session.username.should.eql('Geert');

    });

  });


  describe('Asynchronize calls inside middleware', function(){

    var middleware = function(req, res, next){

      setTimeout( function(){ res.send('barfoo'); }, 100 );

    };

    beforeEach(function(done){

      record( middleware ).into( tape, done );

    });

    afterEach( function(){

      tape.wipe();

    });

    it('', function(){

      tape.result.send.should.eql('barfoo');

    });

  });


  describe('Add additional functions to the response object', function(){

    var middleware = function(req, res, next){

      res.foobar('barfoo');

    };

    beforeEach(function(){

      var adjustRes = {

        foobar: function(value){

          this.result.foobar = value;

        }

      };

      record( middleware, null, adjustRes ).into( tape );

    });

    afterEach( function(){

      tape.wipe();

    });

    it('adds foobar to result', function(){

      tape.result.foobar.should.eql('barfoo');

    });

  });


});
