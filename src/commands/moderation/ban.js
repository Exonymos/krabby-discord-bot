const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {
    const targetUserId = interaction.options.get("target-user").value;
    const reason =
      interaction.options.get("reason")?.value || "No reason provided.";

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(targetUserId);

    if (!targetUser) {
      await interaction.editReply(
        "The user you provided is not in the server."
      );
      return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply("You cannot ban the server owner.");
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position; // The highest role position of the target user.
    const requestUserRolePosition = interaction.member.roles.highest.position; // The highest role position of the user who requested the ban.
    const botRolePosition = interaction.guild.members.me.roles.highest.position; // The highest role position of the bot.

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply(
        "You cannot ban a user with a higher or equal role position."
      );
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply(
        "I cannot ban a user with a higher or equal role position."
      );
      return;
    }

    // Ban the user
    try {
      await targetUser.ban({ reason });
      await interaction.editReply(
        `${targetUser} was banned.\nReason: ${reason}`
      );
    } catch (error) {
      console.log(`There was an error banning the user: ${error}`);
    }
  },

  name: "ban",
  description: "Ban a user from the server.",
  // devOnly: Boolean,
  // testOnly: Boolean,
  options: [
    {
      name: "target-user",
      description: "The user to ban.",
      required: true,
      type: ApplicationCommandOptionType.User,
    },
    {
      name: "reason",
      description: "The reason for the ban.",
      required: false,
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.BanMembers],
  botPermissions: [PermissionFlagsBits.BanMembers],
};
