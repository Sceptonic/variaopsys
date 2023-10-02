const { Command } = require("discord.js-commando");

module.exports = class RoleCommand extends Command {
  constructor(client) {
    super(client, {
      name: "role",
      aliases: ["giverole"],
      group: "administrator",
      memberName: "role",
      description: "Grants a member a specified role.",
      guildOnly: true,
      args: [
        {
          key: "member",
          prompt: "What member do you want to role?",
          type: "member"
        },
        {
          key: "role",
          prompt: "What role would you like to grant this member?",
          type: "role"
        }
      ]
    });
  }

  hasPermission(msg) {
    if (msg.member.roles.cache.some(role => role.name === "Community Affairs & Moderation")) {
      return true;
    }
    return "Sorry :persevere:! You must be a Moderator!";
  }

  async run(msg, { member, role }) {
    if (!member.roles.cache.has(role.id)) {
      member.roles.add(role.id);
      msg.reply(`Modified roles for ${member.user.tag} | + ${role.name}`);
    } else {
      member.roles.remove(role.id);
      msg.reply(`Modified roles for ${member.user.tag} | - ${role.name}`);
    }
  }
};

