var debug = true;
require('console-lt').overwrite();
module.exports = {

  debug: true,

   getfirstfree: function(ports,nf_ports,user){
    console.log(user.name, 'want to connect')
    for (var x in ports) {
      if (ports[x]){
        ports[x]=false;
        nf_ports[x]=user;
		console.log(user.name, '=', x, 'port')
        return x;
      }
    }
  },

   range: function(start, end) {
     o={}
      for (let i = start; i <= end; i++) {
          o[i]=true;
      }
      return o;
  },

  log: function () {
    if (this.debug){
      let arg='';
      for (var i = 0; i < arguments.length; ++i) {
        arg+=arguments[i]+' ';
      }
      console.log(arg);
    }
  }

}
