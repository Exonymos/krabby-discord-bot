module.exports = {
  name: "ping",
  description: "Measure the bot's latency and API latency.",
  callback: async (client, interaction) => {
    try {
      await interaction.deferReply();

      const timestamp = Date.now();
      const reply = await interaction.fetchReply();
      const latency = reply.createdTimestamp - interaction.createdTimestamp;
      const apiLatency = client.ws.ping;

      interaction.editReply({
        embeds: [
          {
            title: "PONG! 🏓",
            fields: [
              { name: "Client Latency", value: `\`${latency}ms\`` },
              { name: "API Latency", value: `\`${apiLatency}ms\`` },
              {
                name: "Timestamp Difference",
                value: `\`${timestamp - reply.createdTimestamp}ms\``,
              },
            ],
            timestamp: new Date(),
            color: 0x4fc242, // Green color
          },
        ],
      });
    } catch (error) {
      console.error(
        "An error occurred while executing the /ping command:",
        error
      );
      await interaction.reply({
        content: "An error occurred while executing the command.",
        ephemeral: true,
      });
    }
  },
};
