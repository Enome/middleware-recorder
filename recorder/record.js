var defaultRes = require('./response');
var defaultReq = require('./request');
var _ = require('underscore');

module.exports = function(middleware, adjustReq, adjustRes){

  return {

    into: function(tape, done){

      var next, response, request;

      if(typeof done === 'undefined'){
        done = function(){};
      };

      response = _.extend({ result:{}, done: done }, defaultRes(), adjustRes);
      request = _.extend({}, defaultReq(), adjustReq);

      request.session.destroy = function(key){
        if( typeof this[key] !== 'undefined' ){
          delete this[key];
        };
      };

      next = function(){
        response.result.next = true;
        done();
      };

      middleware(request, response, next);

      delete request.session['destroy']
      if(!_.isEmpty(request.session)){
        response.result.session = request.session;
      };

      tape.result = response.result;

    }

  };

};
