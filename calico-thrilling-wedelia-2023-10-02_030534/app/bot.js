const http = require("http");
const express = require('express');
const app = express();
const server = require("http").createServer(app);
const _ = require("lodash"); // Require the lodash library

// Array of guild ids
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

const listener = server.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

setInterval(() => {
  http.get(`ProjectAmerika`);
}, 280000);

const Discord = require("discord.js");
const commando = require("discord.js-commando");
const request = require("request-promise");
const path = require("path");
const config = require(path.join(__dirname, "config", "config.json"));
const client = new commando.CommandoClient({
  owner: "849853905797382145",
  commandPrefix: ";",
  unknownCommandResponse: true,
  selfbot: false,
  commandEditableDuration: 60
});

// Status
const Constants = require('discord.js/src/util/Constants.js');
Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`;

client.on('ready', () => {
  client.user.setPresence({
    activity: { name: 'with Guns', type: 'PLAYING' }, // Updated status configuration
    status: "dnd"
  })
    .then(console.log)
    .catch(console.error);
  console.log("logged in");
});

client.registry
  .registerGroups([
    ["mod", "Moderation commands"],
    ["miscellaneous", "Miscellaneous commands"],
    ["administrator", "Administrator commands"],
    ["icf", "Immigration commands"]
  ])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, "commands"));

let timeout = new Set();
let cdseconds = 15; // 1 Minute

client.on("message", msgObject => {
  if (msgObject.channel.id == 845022229057241098) {
    let Arguments = msgObject.content.split(" ");
    let channel = msgObject.client.guilds
      .get("845022229057241098")
      .channels.find("id", Arguments[0]);
    if (channel) {
      channel
        .fetchMessages({ around: Arguments[1], limit: 1 })
        .then(messages => {
          const fetchedMsg = messages.first();
          fetchedMsg.edit(
            "Wowzers, your command has been executed in-game on server `" +
            Arguments[2] +
            "`!"
          );
        });
    } else {
    }
  } else if (msgObject.channel.id == 845022229057241098) {
    let Arguments = msgObject.content.split(" ");
    let channel = msgObject.client.guilds
      .get("845022229057241098")
      .channels.find("id", Arguments[0]);
    let idMessage = Arguments[1];
    let JobId = Arguments[2];
    let pppeh = Arguments[3];
    let Players = Arguments[4];

    if (channel) {
      channel.fetchMessages({ around: idMessage, limit: 1 }).then(messages => {
        const fetchedMsg = messages.first();
        let embed = new Discord.MessageEmbed() // Update to MessageEmbed
          .setAuthor("")
          .setTitle(`Server ${pppeh}`)
          .setTimestamp()
          .setURL(
      //      `https://www.roblox.com/games/5233827496/NYC?jobId=${JobId}`
          );
        Players = Players.split("|");
        const flattenedPlayers = _.flatMap(Players, m => {
          let sehbjfwjhkgetrghjjhg = m.split(":");
          return [
            { name: sehbjfwjhkgetrghjjhg[0], value: `[Roblox Profile](https://www.roblox.com/users/${sehbjfwjhkgetrghjjhg[1]}/profile)`, inline: true }
          ];
        });
        flattenedPlayers.forEach(player => {
          embed.addField(player.name, player.value, player.inline);
        });
        fetchedMsg.reply(embed);
      });
    } else {
    }
  }
  /*
  if (msgObject.content.toLowerCase().includes("black")) {
    msgObject.channel.send("Did I just hear my favorite object?")  
  }*/
});

client.login(config.token);
