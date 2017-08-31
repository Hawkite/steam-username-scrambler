var SteamUser = require("steam-user");
var client = new SteamUser();
var prompt = require('prompt');
var delay = 3500;
if(process.argv.length > 2 && !isNaN(parseInt(process.argv[2])))
  delay = parseInt(process.argv[2]);

console.log(`Name changes will occur at ${delay} millisecond intervals`);
 prompt.start();
 prompt.get(['username', {name:'password',hidden:true}], function (err, result) {
    if(result)
      client.logOn({
          "accountName": result.username,
          "password": result.password
      });
    else
      process.exit();
  });

client.on('loggedOn', function(details) {
	console.log("Logged into Steam as " + client.steamID.getSteam3RenderedID());
	client.setPersona(SteamUser.EPersonaState.Online);
    setInterval(function(){
      client.setPersona(SteamUser.EPersonaState.Online,new Buffer(Math.random()+"").toString("base64").substring(3).toUpperCase());
    },delay);
});
