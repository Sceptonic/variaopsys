const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const roblox = require("noblox.js");

module.exports = class CitizenshipAppealCommand extends Command {
  constructor(client) {
    super(client, {
      name: "cappeal",
      description: "Handles specified target's immigration appeal",
      group: "icf",
      memberName: "cappeal",
      args: [
        {
          prompt: "Who's immigration appeal do you wish to handle?",
          type: "string",
          key: "person"
        },
        {
          key: "option",
          prompt:
            "Do you wish to `accept`/`deny`/`invprivate` this immigration appeal?",
          type: "string",
          validate: text => {
            if (text == "accept" || text == "deny" || text == "invprivate")
              return true;
          }
        }
      ]
    });
  }

  hasPermission(msgObject) {
    if (msgObject.guild.id == "1136844246641541152" || msgObject.guild.id == "874071911225765988") {
      if (msgObject.member.roles.cache.some(role => role.name === "Founding Fathers")) {
        return true;
      } else if (
        msgObject.author == this.client.users.cache.get("ICF Director")
      ) {
        return true;
      } else if (
        msgObject.member.roles.cache.some(role => role.name == "Admin")
      ) {
        return true;
      } else if (
        msgObject.member.roles.cache.some(role => role.name == "sd")
      ) {
        return true;
      }
      return "Sorry 😣! You must be a member of the ICF";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the State of Mayflower!"
      );
    }
  }

  async run(message, args) {
    var webhook = new MessageEmbed()
      .setTitle(`${args.person}'s Citizenship Appeal`)
      .setDescription(args.option)
      .setColor(0x1D37D9)
      .setTimestamp();

    var nickname;
    if (message.member.nickname) {
      nickname = message.member.nickname;
    } else {
      nickname = message.author.username;
    }
    var choice;
    if (args.option == "accept") {
      choice = "Accepted";
    }
    if (args.option == "deny") {
      choice = "Denied";
    }
    if (args.option == "invprivate") {
      choice = "Inventory Private";
    }

    let playerName = args.person;
    if (choice == "Accepted") {
      let robloxToken =
        "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_1088024AA235FE9F7043EDB04B8582C04DB8E365EF6AE227D59B0E0E9A7D5C92B1511A6E78FB6FBC91D5AC68BDD44570E521B52FD46A3801CF3B4143BE59DB6E407FCAF03D9DF19A42771CDBA3AF4BAA2F2D6928BCD9B7597B22B3FD2617EB389DE20650B93B278F58C8D39FEF04B4AAA147684C1F1F1538A7049338DE28EB03F44661A55A9D5D5B57CA6B4A49F4F84D552381EA3AD59E23973182D6A294853791914725DC50178E99BEAD7F948E61C08E089CA0629E0C341F625CE90C8AF6CDE938EA5EA108BED9B73511053CA06502FAAD2BCEF4C4091E0F5EE0755157164303FE2A2CE20B012C14585E6AA40458FF95B968104E638CDEBE34C467F4A3DD04E94C6B4F703BBB81287C7A0A2E82847668C0F4741B8111A5D35E05DB6A71DB0744600F329C0542DEF54AB9959CABE00E7401B35F009F2642ACBD29D886316E23B68B19A1BC058A0ED1F049C4F659AD18B20228CB1BF5991A2C9A27B630D3259368F2896A77CB0FA39F0AEC6E9E3E30D72A21E6DC2BBA50F13A195574B22B10843B7E066199D89B136F67FE16F8797FCCD6870953";

      await roblox.setCookie(robloxToken);

      let groupID = 13204661;
      let playerID = await roblox.getIdFromUsername(args.person);
      playerName = await roblox.getUsernameFromId(playerID);

      await roblox.setRank(groupID, playerID, 244);
    }

    webhook
      .setAuthor("Citizenship")
      .addField("Username", playerName)
      .addField("Action", choice);

    let log = new MessageEmbed()
      .setTitle("Citizenship Management")
      .setColor("#1D37D9")
      .setDescription(
        `${message.author} has set **${args.person}**'s appeal to \`${choice.toLowerCase()}\`!`
      )
      .setFooter(
        "Mayflower Command Logging",
        "https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg"
      )
      .setTimestamp();

    this.client.channels.cache.get("978804311775674378").send(log);

    message.reply("Successfully sent your appeal message! 🤗");
  }
};
