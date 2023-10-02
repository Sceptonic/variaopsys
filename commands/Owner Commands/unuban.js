const { Command } = require("discord.js-commando");

module.exports = class unuban extends Command {
  constructor(client) {
    super(client, {
      name: "unuban",
      group: "administrator",
      memberName: "unuban",
      description: "Unbans a user from all Discords",
      guildOnly: true,
      args: [
        {
          type: "user",
          prompt: "What is the User?",
          key: "target"
        },
        {
          type: "string",
          prompt: "What is the reason for un ultra banning this user?",
          key: "reason",
          default: "No Reason Provided"
        }
      ]
    });
  }
  
  hasPermission(msgObject) {
    // Check if the user has the "Founding Fathers" role
    if (msgObject.member.roles.cache.some(role => role.name === "Founding Fathers")) {
      return true;
    }
    return "Sorry :persevere:! You must be an Founding Father!";
  }
  
  async run(msgObject, { target, reason }) {
    msgObject.reply(
      "Coolio :joy::joy:! Let's unban em' from everything! :gun:"
    );
    
    // Unban the target user from all servers
    this.client.guilds.cache.forEach(guild => {
      guild.members.unban(target.id, `"${reason}" - ${msgObject.author.tag}`);
    });
    
    msgObject.channel.send(
      `Unbanned ${target.tag} in all the servers :triumph::relieved:! All done!`
    );
  }
};

