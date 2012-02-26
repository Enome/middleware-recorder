Middleware recorder
==================

# What does this package do?

# Installing it

``` shell
npm install middleware-recorder
```

It lets you pass a middleware to a recorder and record the result into an object you can assert.

## Basic usage

``` js
var record = require('middleware-recorder').middleware;

var middleware = function(req, res, next){
  res.local('email', 'jef@example.com');
  req.session.user = 'Geert';
  next()
}

var obj = {};
record( middleware ).into( obj );
console.log(obj);

/* Logs the following object */

{
  result: { 
    locals: { 
      email: 'jef@example.com' 
    },
    session: { 
      user: 'Geert' } 
    },
    next: true
  }
}
```

## Tape object

We also provide you with a tape object you can record into that has two methods.

### Wipe

The wipe method will reset the tape.

``` js
var tape = require('middleware-recorder').tape;

record( middleware ).into(tape);

tape.wipe()
```

### Compare

To use compare you need to install the optional package difflet.

``` shell
npm install difflet
```

If you like testing the whole result object instead each property it sometimes can be annoying to see the difference between what you expect and tape.result. So I added a compare method to tape which uses difflet package.


``` js
var tape = require('middleware-recorder').tape;

record( middleware ).into(tape);

var expected = {
  //...
};

tape.compare(expected);
```

This will use console.log to output the difference between the two objects.


## The request object

If you could only test middleware that doesn't take a meaningful request object this package would kinda suck. So the second argument of recording function takes a request object.

``` js
var request = { body: { username: 'Geert' } };
record( middleware, request ).into(tape);
```

## The response object

The response object has a few default methods ( see recorder/response.js ). In case I missed some methods you can either contact me or you can add a third argument to the record function.


``` js
var middleware = function(req, res, next){

  res.foobar('barfoo');

};

var extendRes = {
  foobar: function(value){
    this.result.foobar = value;
  }
};

record( middleware, null, extendRes ).into( tape );
```

## See it in action

Since you will mostly be using this for testing check out the tests/examples at: tests/middleware.js.

## Running the tests

``` shell
npm install -g mocha
make test
```
