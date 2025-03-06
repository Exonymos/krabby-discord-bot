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
    const subCommand = interaction.options.getSubcommand();

    if (subCommand === "amount") {
      const amount = interaction.options.getInteger("amount");
      const targetUser = interaction.options.getUser("target-user");
      const contains = interaction.options.getString("contains");

      const channel = interaction.channel;
      const messages = await channel.messages.fetch({ limit: amount });

      let messagesToDelete = messages;
      if (targetUser) {
        messagesToDelete = messages.filter(
          (message) => message.author.id === targetUser.id
        );
      }
      if (contains) {
        messagesToDelete = messagesToDelete.filter((message) =>
          message.content.includes(contains)
        );
      }

      await interaction.deferReply({ ephemeral: true });

      try {
        await channel.bulkDelete(messagesToDelete);
        interaction.editReply({
          content: `Deleted ${messagesToDelete.size} messages.`,
          ephemeral: true,
        });
      } catch (error) {
        console.log(`There was an error deleting messages: ${error}`);
        interaction.editReply({
          content: "An error occurred while deleting messages.",
          ephemeral: true,
        });
      }
    } else if (subCommand === "from-id") {
      const messageId = interaction.options.getString("message-id");

      const channel = interaction.channel;
      const messages = await channel.messages.fetch({ limit: 100 });

      const messagesToDelete = messages
        .filter((message) => message.id >= messageId)
        .map((message) => message.id);

      await interaction.deferReply({ ephemeral: true });

      try {
        await channel.bulkDelete(messagesToDelete);
        interaction.editReply({
          content: `Deleted all messages from Message ID: \`${messageId}\` onwards.`,
          ephemeral: true,
        });
      } catch (error) {
        console.log(`There was an error deleting messages: ${error}`);
        interaction.editReply({
          content: "An error occurred while deleting messages.",
          ephemeral: true,
        });
      }
    }
  },

  name: "purge",
  description: "Delete multiple messages from a channel.",
  options: [
    {
      name: "amount",
      description: "Delete messages up to a specified amount.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "amount",
          description: "The number of messages to delete (1-100).",
          required: true,
          type: ApplicationCommandOptionType.Integer,
        },
        {
          name: "target-user",
          description: "Delete messages from a specific user.",
          required: false,
          type: ApplicationCommandOptionType.User,
        },
        {
          name: "contains",
          description: "Delete messages that contain a specific text.",
          required: false,
          type: ApplicationCommandOptionType.String,
        },
      ],
    },
    {
      name: "from-id",
      description: "Delete all messages from a specific message ID onwards.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "message-id",
          description: "The ID of the message to start deleting from.",
          required: true,
          type: ApplicationCommandOptionType.String,
        },
      ],
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.ManageMessages],
};
