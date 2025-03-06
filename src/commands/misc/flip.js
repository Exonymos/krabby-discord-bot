const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "flip",
  description: "Flip a coin.",

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const flippingEmbed = new EmbedBuilder()
      .setTitle("Coin Flip")
      .setColor("#ffdf2b")
      .setDescription("The coin is flipping...")
      .setImage("https://i.imgur.com/saHz9qj.gif");

    const flippingMessage = await interaction.editReply({
      embeds: [flippingEmbed],
    });

    setTimeout(() => {
      const resultEmbed = new EmbedBuilder()
        .setTitle("Coin Flip")
        .setColor("#ffdf2b")
        .setDescription(`The coin landed on **${getRandomResult()}**!`)
        .setThumbnail("https://i.imgur.com/rmhE7Sb.gif");

      interaction.editReply({ embeds: [resultEmbed] });
    }, 2500);
  },
};

function getRandomResult() {
  const results = ["Heads", "Tails"];
  return results[Math.floor(Math.random() * results.length)];
}
