// Import necessary Discord.js modules
const { Client, Interaction } = require("discord.js");

module.exports = {
  name: "hello",
  description: "Say hello",
  callback: async (client, interaction) => {
    // Get the user who triggered the command
    const user = interaction.user;

    // Define an array of unique and funny greetings
    const greetings = [
      `👋 Hello, ${user.username}! Get ready for an adventure that transcends space and time! 🚀🌈`,
      `🌟 Ahoy, ${user.username}! Your presence adds a touch of magic to our cosmic gathering! ✨🎩`,
      `👋 Greetings, ${user.username}! Your arrival is like a burst of confetti, spreading joy across the galaxy! 🎉🌌`,
      `🚀 Salutations, ${user.username}! Prepare to embark on a journey through realms uncharted and dreams untamed! 🗺️💫`,
      `🌈 Hey there, ${user.username}! May your day be filled with technicolor wonders and delightful surprises! 🌈✨`,
      `🎉 Hello, ${user.username}! It's party time in the cosmos, and you're the guest of honor! 🥳🚀`,
      `🌌 Ahoy, ${user.username}! Your cosmic charisma shines brighter than a thousand suns! ✨🌟`,
      `🎩 Greetings, ${user.username}! Step into the interdimensional circus of laughter and awe! 🎪😄`,
      `🚀 Salutations, ${user.username}! Your spirit soars through the multiverse, leaving trails of inspiration in its wake! 🌠✨`,
      `🌈 Hey there, ${user.username}! Prepare for a kaleidoscope of cosmic wonders that will leave you breathless! 🌌🌈`,
      `🗺️ Hello, ${user.username}! Let's navigate the vast tapestry of existence and discover hidden treasures together! 🌍✨`,
      `🥳 Ahoy, ${user.username}! It's time to celebrate your cosmic presence with a burst of intergalactic festivity! 🎉🚀`,
      `🌌 Greetings, ${user.username}! Your cosmic energy sets the universe ablaze with boundless creativity and passion! 🔥✨`,
      `🎩 Salutations, ${user.username}! Prepare to be enchanted as we unveil the mysteries of the cosmic wonderland! 🌠🔮`,
      `🚀 Hello, ${user.username}! Strap yourself in for a journey that transcends the boundaries of imagination! 🌌🌠`,
      `🌈 Ahoy, ${user.username}! Your vibrant spirit brings a splash of color to the cosmic canvas! 🎨✨`,
      `🎉 Greetings, ${user.username}! Let's set the cosmos ablaze with laughter, joy, and endless possibilities! 🔥🚀`,
      `🌌 Salutations, ${user.username}! Your cosmic essence resonates with the harmonies of the universe, creating celestial symphonies! 🎶✨`,
      `🌍 Hey there, ${user.username}! The cosmic stage is set, and you're about to become the protagonist of your own extraordinary story! 🎭🌠`,
      `🎩 Hello, ${user.username}! Welcome to the cosmic carnival, where every moment is filled with wonder and excitement! 🎪✨`,
      `🥳 Ahoy, ${user.username}! Join the interstellar jubilation as we dance among the stars and celebrate the magic of the cosmos! 🌟🎉`,
      `🌌 Greetings, ${user.username}! Your cosmic wanderlust fuels the desire to explore distant realms and unravel the secrets of the universe! 🚀🔭`,
      `🎨 Salutations, ${user.username}! With the cosmic palette in hand, let's paint a masterpiece of infinite imagination across the cosmos! 🖌️✨`,
      `🌠 Hello, ${user.username}! Brace yourself for a collision of cosmic forces that will ignite your spirit and illuminate your path! ⚡🚀`,
      `🌈 Ahoy, ${user.username}! Step into the cosmic portal, where rainbows merge with stardust, and dreams take flight! 🌠🌈`,
    ];

    // Select a random greeting from the array
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];

    // Reply to the user with the random greeting
    await interaction.reply({ content: randomGreeting });
  },
};
