module.exports = {
  name: "projects",
  description: "See projects made by Exonymos",
  callback: async (client, interaction) => {
    const projectEmbed = {
      color: 0x008afa,
      title: "Projects",
      description: "See projects made by Exonymos",
      footer: {
        text: "Made by Exonymos",
        icon_url:
          "https://cdn.discordapp.com/avatars/732162578368823306/90a040cb373f0f0fea3f87d45a1b3c0a.webp?size=1024",
      },
    };

    const projectButton = {
      type: 1,
      components: [
        {
          type: 2,
          style: 5,
          label: "See Projects",
          url: "https://exonymos.github.io/Projects/",
          disabled: false,
        },
      ],
    };

    await interaction.reply({
      embeds: [projectEmbed],
      components: [projectButton],
    });
  },
};
