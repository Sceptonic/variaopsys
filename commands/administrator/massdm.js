const { Command } = require("discord.js-commando");

module.exports = class MassDMCommand extends Command {
  constructor(client) {
    super(client, {
      name: "massdm",
      aliases: ["senddm"],
      group: "administrator",
      memberName: "massdm",
      description: "Send a direct message to all members in the server.",
      guildOnly: true, // This command can only be used in a server (guild).
      args: [
        {
          key: "message",
          prompt: "What message would you like to send to all members?",
          type: "string"
        }
      ]
    });
  }

  // Check if the user has permission to use this command.
  hasPermission(msg) {
    if (msg.member.roles.cache.some(role => role.name === "Community Affairs & Moderation")) {
      return true;
    }
    return "Sorry, you must be a Moderator to use this command!";
  }

  // The main logic of the command.
  async run(msg, { message }) {
    // Loop through all members in the server and send them a DM.
    msg.guild.members.cache.forEach(async (member) => {
      try {
        await member.send(message);
      } catch (error) {
        console.error(`Failed to send DM to ${member.user.tag}: ${error}`);
      }
    });

    msg.reply(`Sent the message to all server members: "${message}"`);
  }
};
