const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class HandannounceCommand extends Command {
  constructor(client) {
    super(client, {
      name: "hannounce",
      aliases: ["han"],
      group: "miscellaneous",
      memberName: "hannounce",
      description: "Posts an announcement needed by Staff / Government, that tags @here",
      throttling: {
        usages: 1,
        duration: 10
      },
      args: [
        {
          key: "description",
          prompt: "What is the Description?",
          type: "string"
        }
      ]
    });
  }

  hasPermission(msgObject) {
    if (msgObject.guild.id === "1136844246641541152" || msgObject.guild.id === "867863166691180604") {
      if (msgObject.member.roles.cache.some(role => role.name === "Founding Fathers")) {
        return true;
      } else if (msgObject.author.id === "675794471065092161") {
        return true;
      } else if (msgObject.member.roles.cache.some(role => role.name === "Developer")) {
        return true;
      } else if (msgObject.member.roles.cache.some(role => role.name === "Admin")) {
        return true;
      }
      return "Sorry 😣! You must be an Admin!";
    } else {
      return "Sorry :persevere:! You must use this command in the State of Mayflower!";
    }
  }

  async run(msg, { description }) {
    // Find the channel by its predefined ID
    const channel = msg.guild.channels.cache.get("1141865626227450007");

    // Check if the channel was found
    if (!channel) {
      return msg.reply("I couldn't find the predefined announcement channel.");
    }

    // Create the announcement embed
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("**Mayflower Announcement**")
      .setAuthor(
        `${msg.member.displayName}`,
        `${msg.author.displayAvatarURL()}`
      )
      .setDescription(description)
      .setFooter('State of Mayflower', 'https://cdn.discordapp.com/icons/800898562786590771/992d0fe8b8ef622128a7750259f1b863.jpg')
      .setTimestamp();

    // Send the announcement embed and mention @here
    channel.send("@here", { embed })
      .then(() => {
        msg.reply("**Congrats** :sunglasses:! You have announced your Announcement!");
      })
      .catch((error) => {
        console.error(`Failed to send announcement: ${error}`);
      });
  }
};
