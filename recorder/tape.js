var log = console.log

exports.inject = function(_log){

  log = _log;

};

exports.wipe = function(){

  if( typeof this.result !== 'undefined' ){

    this.result = {};
    
  };

};

exports.compare = function(obj){

  try 
  {
    var difflet = require('difflet');
  } 
  catch(err) 
  {
    throw new Error('Please install difflet: npm install difflet.');
  }

  var diff = difflet( { indent : 2} );
  log( diff.compare( this.result, obj ) );


};
