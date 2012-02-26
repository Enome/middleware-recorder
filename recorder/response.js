module.exports = function(){

  return {

    local: function(key, value){ 

      if( typeof this.result.locals === 'undefined' ){
        this.result.locals = {};
      };

      this.result.locals[key] = value;

    },

    render: function(template, locals){
      this.result.render =  { template: template, locals: locals };
      this.done()
    },

    redirect: function(url){
      this.result.redirect = url;
      this.done()
    },

    send: function(text){
      this.result.send = text;
      this.done()
    },

    locals: function(){

      return this.result.locals;

    }

  };

};
