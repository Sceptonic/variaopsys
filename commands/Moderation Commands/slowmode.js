const { Command } = require("discord.js-commando");

module.exports = class SlowmodeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "slowmode",
      group: "miscellaneous",
      memberName: "slowmode",
      description: "Sets the slowmode for a channel",
      userPermissions: ["MANAGE_CHANNELS"],
      throttling: {
        usages: 1,
        duration: 10
      },
      args: [
        {
          key: "channel",
          prompt: "Which channel do you want to set slowmode for?",
          type: "channel"
        },
        {
          key: "duration",
          prompt: "How many seconds should the slowmode be?",
          type: "integer",
          validate: duration => duration >= 0
        }
      ]
    });
  }

  async run(message, { channel, duration }) {
    try {
      await channel.setRateLimitPerUser(duration);
      return message.reply(`Slowmode set to ${duration} seconds in ${channel}.`);
    } catch (error) {
      console.error(error);
      return message.reply("An error occurred while setting slowmode.");
    }
  }
};



