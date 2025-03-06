const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");

// Create a Map to track command cooldowns
const cooldowns = new Map();

module.exports = {
  deleted: false,
  name: "embed",
  description: "Send an embed message.",
  options: [
    {
      name: "title",
      description: "The title of the embed.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "description",
      description: "The description of the embed.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "color",
      description: "The color of the embed (hexadecimal format).",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "thumbnail",
      description: "The thumbnail image URL for the embed.",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "image",
      description: "The main image URL for the embed.",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],

  callback: async (client, interaction) => {
    try {
      // Check if the user is on cooldown
      if (cooldowns.has(interaction.user.id)) {
        const cooldownEnd = cooldowns.get(interaction.user.id);
        const remainingTime = (cooldownEnd - Date.now()) / 1000;

        // Reply with a message indicating the remaining cooldown time
        await interaction.reply({
          content: `You are on cooldown. Please wait \`${remainingTime.toFixed(
            0
          )}\` seconds.`,
          ephemeral: true,
        });
        return;
      }

      const title = interaction.options.getString("title");
      const description = interaction.options.getString("description");
      const color = interaction.options.getString("color") || "7289DA";
      const thumbnail = interaction.options.getString("thumbnail");
      const image = interaction.options.getString("image");

      const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color);

      if (thumbnail) {
        embed.setThumbnail(thumbnail);
      }

      if (image) {
        embed.setImage(image);
      }

      await interaction.reply({ embeds: [embed] });

      // Set the user on cooldown for 10 minutes (600,000 milliseconds)
      cooldowns.set(interaction.user.id, Date.now() + 600000);

      // Remove the cooldown after 10 minutes
      setTimeout(() => {
        cooldowns.delete(interaction.user.id);
      }, 600000);
    } catch (error) {
      console.error(
        "An error occurred while executing the /embed command:",
        error
      );
      await interaction.reply({
        content: "An error occurred while executing the command.",
        ephemeral: true,
      });
    }
  },
};
