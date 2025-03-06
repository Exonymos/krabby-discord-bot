const path = require("path");
const getAllFiles = require("./getAllFiles");

module.exports = (exceptions = []) => {
  let localCommands = [];

  const CommandCategories = getAllFiles(
    path.join(__dirname, "..", "commands"),
    true
  );

  for (const CommandCategory of CommandCategories) {
    const commandFiles = getAllFiles(CommandCategory);

    for (const commandFile of commandFiles) {
      const commandObject = require(commandFile);

      if (exceptions.includes(commandObject.name)) {
        continue;
      }
      localCommands.push(commandObject);
    }
  }

  return localCommands;
};
