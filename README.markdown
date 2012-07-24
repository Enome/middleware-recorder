**Outdated: use [express-recorder](https://github.com/Enome/express-recorder) instead**

Middleware recorder
==================

# Installing it

``` shell
npm install middleware-recorder
```

# What does this package do?

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

We also provide you with a tape object you can record into that has three methods.

### Wipe

The wipe method will reset the tape.

``` js
var tape = require('middleware-recorder').tape;

record( middleware ).into(tape);

tape.wipe()
```

#### Note

The wipe method returns the tape object. So if you find yourself writing this a alot:

``` js
tape.wipe()
record( middleware ).into( tape );
```

Then the following can save you one whole line of code:

``` js
record( middleware ).into( tape.wipe() );
```


### Compare

To use compare you need to install the optional package difflet.

``` shell
npm install difflet
```

This will show you a diff between the result and the expected object.


``` js
var tape = require('middleware-recorder').tape;

record( middleware ).into(tape);

var expected = {
  //...
};

console.log( tape.compare(expected) );
```

This will use console.log to output the difference between the two objects.


### Eql

This will do a assert.deepEqual between the result and the expected object. It will use compare to output the error message if the assertion fails. ( So for this you also need difflet ) This is usefull when you are testing the complete result instead of small parts of it.

``` js
var tape = require('middleware-recorder').tape;

record( middleware ).into(tape);

var expected = {
  //...
};

tape.eql(expected);
```


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
