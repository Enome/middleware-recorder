var assert = require('assert')

exports.wipe = function(){

  if( typeof this.result !== 'undefined' ){

    this.result = {};
    
  };

  return this;

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
  return diff.compare( this.result, obj );


};

exports.eql = function(obj){

  var util = require('util');
  var difflet = require('difflet');
  var diff = difflet( { indent : 2} );
  var dff = diff.compare( this.result, obj );

  var compare = '\n\u001b[0m'
                 + '\n\nRESULT:   ' + JSON.stringify(this.result, false, null)
                 + '\nEXPECTED: ' + JSON.stringify(obj, false, null)
                 + '\nDIFF: \n' + dff 

  assert.deepEqual( obj, this.result, compare);

}
