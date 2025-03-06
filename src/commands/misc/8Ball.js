const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: "8ball",
  description: "Ask the Magic 8-Ball a question.",
  options: [
    {
      name: "question",
      description: "Your question for the Magic 8-Ball.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  callback: async (client, interaction) => {
    try {
      // Array of possible 8-Ball responses
      const responses = [
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes - definitely.",
        "You may rely on it.",

        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Yes.",
        "Signs point to yes.",

        "Reply hazy, try again.",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again.",

        "Don't count on it.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Very doubtful.",
      ];

      // Get the user's question from the interaction options
      const question = interaction.options.getString("question");

      // Generate a random response from the array
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      // Create a new EmbedBuilder
      const embed = new EmbedBuilder()
        .setColor("#5b5b5b")
        .setTitle("Magic 8-Ball")
        .setThumbnail(
          "https://em-content.zobj.net/source/skype/289/pool-8-ball_1f3b1.png"
        )
        .addFields(
          { name: "Question", value: question },
          { name: "Response", value: randomResponse }
        );

      // Reply to the user with the Magic 8-Ball response and embedded image
      await interaction.reply({
        embeds: [embed],
        ephemeral: false,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
