module.exports = (client) => {
  client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    console.log(
      `[Message] (#${message.channel.name}) ${message.author.username}: \n> ${message.content}`
    );
  });
};
