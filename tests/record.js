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

      tape.wipe()
      record( middleware ).into( tape );

    });

    it('adds locals to the result', function(){

      tape.eql({
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

      tape.eql({
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

      tape.eql( { locals: { email: 'geert@example.com' } });

    });

  });


  describe('Render', function(){

    var middleware = function(req, res, next){
      res.render('users/new', { user: { username: 'Geert', password: '1234' } } );
    };

    beforeEach( function(){

      tape.wipe();
      record( middleware ).into( tape );

    });

    it('add render to the result', function(){

      tape.eql( { render: { template: 'users/new', locals: { user: { username: 'Geert', password: '1234' } } } } ); 

    });

  });


  describe('Redirect', function(){

    var middleware = function(req, res, next){
      res.redirect('/login');
    };

    beforeEach( function(){

      tape.wipe();
      record( middleware ).into( tape );

    });

    it('add render to the result', function(){

      tape.eql( { redirect: '/login' } );

    });

  });


  describe('Send', function(){

    var middleware = function(req, res, next){
      res.send('Hello? Yes, this is dog.');
    };

    beforeEach( function(){

      tape.wipe();
      record( middleware ).into( tape );

    });


    it('add render to the result', function(){

      tape.eql( { send: 'Hello? Yes, this is dog.' } );

    });

  });


  describe('Session', function(){

    describe('Create', function(){

      var middleware = function(req, res, next){
        req.session.username = 'Geert';
      };

      beforeEach( function(){

        tape.wipe();
        record( middleware ).into( tape );

      });


      it('adds session to the result', function(){

        tape.eql( { session: { username: 'Geert' } } );

      });

    });

    describe('Destroy', function(){

      var middleware = function(req, res, next){
        req.session.destroy('username');
      };

      beforeEach( function(){

        tape.wipe();
        record( middleware, { session: { username: 'geert' } } ).into( tape );

      });

      it('removes the session from result', function(){

        tape.eql({});

      });

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

      tape.eql({ send: 'barfoo' });

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
