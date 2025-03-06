const { Client, Interaction, MessageEmbed, User } = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Get the avatar of a user.",

  callback: async (client, interaction) => {
    try {
      let targetUser;

      if (interaction.options.get("user")) {
        targetUser = interaction.options.getUser("user");
      } else {
        targetUser = interaction.user;
      }

      const avatarEmbed = {
        color: parseInt("7289DA", 16),
        title: `Avatar - ${targetUser.username}`,
        image: {
          url: targetUser.displayAvatarURL({ dynamic: true, size: 4096 }),
        },
        footer: {
          text: `Requested by ${interaction.user.username}`,
        },
        timestamp: new Date(),
      };

      await interaction.reply({ embeds: [avatarEmbed] });
    } catch (error) {
      console.error(
        "An error occurred while executing the /avatar command:",
        error
      );
      await interaction.reply({
        content: "An error occurred while executing the command.",
        ephemeral: true,
      });
    }
  },
};
