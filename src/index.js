//require("dotenv").config(); // for production
require("dotenv").config({ path: './.env.local' }); // for local development
const { Client, ActivityType } = require("discord.js");
const MY_BOT_TOKEN = process.env.TOKEN;
const eventHandler = require("./handlers/eventHandler");
const client = new Client({ intents: 40819 }); // 65043 alternate

let status = [
  {
    name: "with Noobs",
    type: ActivityType.Playing,
  },
  {
    name: "/help",
    type: ActivityType.Listening,
  },
];

const keep_alive = require("./keep_alive.js");

eventHandler(client);

client.on("ready", () => {
  console.log(`✅ Successfully logged in as ${client.user.username}!`);

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 900000);
});

client.login(MY_BOT_TOKEN);
