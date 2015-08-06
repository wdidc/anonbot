var request = require("request")

module.exports = function(token){
  var url = "https://slack.com/api/"
  var methodNames = [
    "api.test",
    "auth.test",
    "channels.list",
    "channels.info",
    "chat.postMessage",
    "groups.list",
    "users.info"
  ]
  var methods = {
    token: token
  }
  methodNames.forEach(function(name){
    var names = name.split(".")
    methods[names[0]] = methods[names[0]] || {}
    methods[names[0]][names[1]] = function(callback, opts){
      get(name,callback, opts)
    }
  })
  return methods

  function get(method, callback, opts){
    opts = opts || ""
    if( typeof opts == "object" ){
      opts = serialize(opts)
    }
    console.log(url + method + "?token="+ token + opts)
    request(url + method + "?token="+ token + opts,function(e,r,b){
      callback(b)
    })
  }
  function serialize(o){
    var string = ""
    for( var key in o ){
      if( o.hasOwnProperty(key) ){
        string += "&" + key + "=" + o[key]
      }
    }
    return string
  }
}
