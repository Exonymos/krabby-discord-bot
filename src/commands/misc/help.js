module.exports = {
  name: "help",
  description: "Shows the help menu",
  callback: async (client, interaction) => {
    const commands = [
      {
        name: "/8ball",
        value: "Ask the magic 8ball a question",
        emoji: "🎱",
      },
      {
        name: "/avatar",
        value: "Get the avatar of a user",
        emoji: "📷",
      },
      {
        name: "/embed",
        value: "Create an embed message",
        emoji: "📝",
      },
      {
        name: "/flip",
        value: "Flip a coin",
        emoji: "🪙",
      },
      {
        name: "/hello",
        value: "Say hello",
        emoji: "👋",
      },
      {
        name: "/help",
        value: "Shows the help menu",
        emoji: "❓",
      },
      {
        name: "/insult",
        value: "Get Insulted",
        emoji: "🤬",
      },
      {
        name: "/ping",
        value: "Measure the bot's latency and API latency",
        emoji: "🏓",
      },
      {
        name: "/projects",
        value: "See projects made by Exonymos",
        emoji: "📚",
      },
      {
        name: "/trivia",
        value: "Play a game of trivia",
        emoji: "🎮",
      },
    ];

    const helpEmbed = {
      color: 0x7289da,
      title: "Commands Info",
      description: "Here are the list of commands",
      fields: commands.map((command) => ({
        name: `${command.emoji} ${command.name}`,
        value: command.value,
      })),
    };

    const helpButton = {
      type: 1,
      components: [
        {
          type: 2,
          style: 5,
          label: "Get More Help",
          url: "https://discord.com/channels/1125815251334611004/1125815252374798351",
          disabled: false,
        },
      ],
    };

    await interaction.reply({
      embeds: [helpEmbed],
      components: [helpButton],
    });
  },
};
