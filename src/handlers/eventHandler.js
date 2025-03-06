const path = require("path");
const getAllFiles = require("../utils/getAllFiles");
const config = require("../../config.json");

module.exports = (client) => {
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a > b);

    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

    client.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
        try {
          const eventFunction = require(eventFile);
          await eventFunction(client, arg);
        } catch (error) {
          console.log(
            `There was an error while executing an event in ${eventFile}: ${error}`
          );
        }
      }
    });
  }

  client.on("guildMemberUpdate", async (before, after) => {
    if (after.guild.id === config.guildId) {
      if (after.user.bot) {
        return;
      }

      const verifiedRole = after.roles.cache.get(config.verifiedRoleId);
      const noobRole = after.guild.roles.cache.get(config.noobRoleId);

      if (
        verifiedRole &&
        noobRole &&
        after.roles.cache.has(verifiedRole.id) &&
        after.roles.cache.has(noobRole.id)
      ) {
        await after.roles.remove(noobRole);

        const logChannel = client.channels.cache.get(config.logChannelId);
        if (logChannel) {
          const userMention = after.user.toString();
          const roleMention = noobRole.toString();
          const logMessage = `> ${userMention} is no longer a \`NOOB\`. Role ${roleMention} has been removed.`;
          await logChannel.send(logMessage);
        }
      }
    }
  });

  // Automatically react with the selected emoji to new messages in a specific channel
  client.on("messageCreate", async (message) => {
    const channelId = config.reactChannelId;
    const emoji = config.reactEmoji;

    if (message.channel.id === channelId) {
      try {
        await addReaction(message, emoji);
      } catch (error) {
        console.log(`There was an error while adding a reaction: ${error}`);
      }
    }
  });

  // Check and react with the selected emoji if a message doesn't have it
  client.on("messageUpdate", async (oldMessage, newMessage) => {
    const channelId = config.reactChannelId;
    const emoji = config.reactEmoji;

    if (newMessage.channel.id === channelId) {
      const reactedEmoji = getReactedEmoji(newMessage, emoji);

      if (!reactedEmoji) {
        try {
          await addReaction(newMessage, emoji);
        } catch (error) {
          console.log(`There was an error while adding a reaction: ${error}`);
        }
      }
    }
  });

  // Helper function to add a reaction based on the emoji type
  async function addReaction(message, emoji) {
    if (isCustomEmoji(emoji)) {
      const [emojiName, emojiId] = parseCustomEmoji(emoji);
      const customEmoji = getCustomEmoji(message.guild, emojiName, emojiId);

      if (customEmoji) {
        await message.react(customEmoji);
      }
    } else {
      await message.react(emoji);
    }
  }

  // Helper function to check if the emoji is a custom server emoji
  function isCustomEmoji(emoji) {
    return emoji.startsWith(":") && emoji.endsWith(":");
  }

  // Helper function to parse custom emoji into name and id
  function parseCustomEmoji(emoji) {
    const emojiName = emoji.slice(1, -1).split(":")[0];
    const emojiId = emoji.slice(1, -1).split(":")[1];

    return [emojiName, emojiId];
  }

  // Helper function to get the custom emoji from the guild
  function getCustomEmoji(guild, emojiName, emojiId) {
    const customEmoji = guild.emojis.cache.find(
      (emoji) => emoji.name === emojiName && emoji.id === emojiId
    );
    return customEmoji ? customEmoji.id : null;
  }

  // Helper function to check if the message has already reacted with the emoji
  function getReactedEmoji(message, emoji) {
    const reactions = message.reactions.cache;
    const reactedEmoji = reactions.find(
      (reaction) => reaction.emoji.name === emoji
    );
    return reactedEmoji ? reactedEmoji.emoji.name : null;
  }
};
