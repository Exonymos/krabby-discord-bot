module.exports = {
  name: "trivia",
  description: "Shows the trivia menu",
  callback: async (client, interaction) => {
    const triviaEmbed = {
      color: 0x008afa,
      title: "Trivia Game",
      description: "Put your knowledge to test!",
      fields: [
        {
          name: "How to play?",
          value: "Click the button below to play the game!",
        },
      ],
      footer: {
        text: "Made by Exonymos",
        icon_url:
          "https://cdn.discordapp.com/avatars/732162578368823306/90a040cb373f0f0fea3f87d45a1b3c0a.webp?size=1024",
      },
    };

    const triviaButton = {
      type: 1,
      components: [
        {
          type: 2,
          style: 5,
          label: "Play Trivia!",
          url: "https://exonymos.github.io/Projects/Quiz-Game/",
          disabled: false,
        },
      ],
    };

    await interaction.reply({
      embeds: [triviaEmbed],
      components: [triviaButton],
    });
  },
};
