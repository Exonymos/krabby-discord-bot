const insults = [
  "You must be made of copper and tellurium because you're Cu-Te!",
  "You're so funny, I forgot to laugh.",
  "Is your name Google? Because you have everything I've been searching for... not!",
  "You're not stupid; you just have bad luck thinking.",
  "Are you a magician? Because whenever you're around, everyone disappears.",
  "If laughter is the best medicine, your face must be curing the world.",
  "I'm not saying I hate you, but I would unplug your life support to charge my phone.",
  "You bring joy to my life, when you leave.",
  "I thought of you today. It reminded me to take out the trash.",
  `Hey you're so good at being yourself. I'm jealous!`,
  `You must be a parking ticket because you've got 'FINE' written all over you,`,
  `Don't worry, The worst mistake anyone can make is being afraid to make one, just like you!`,
  `You're like a dictionary, You add meaning to my life.`,
  `I would call you a genius, but I'm afraid it would be an insult to geniuses.`,
  `Well, well, well, if it isn't The one and only human version of a participation trophy.`,
  `I must say, your face makes onions cry. And that's saying something!`,
  `You're so bright that you light up the room... when you leave it, that is,`,
  `I'd agree with you, but then we'd both be wrong.`,
  `I was going to give you a nasty look, but I see you already have one.`,
  `Remember, intelligence is not a curse. It's just something you don't have.`,
  "If you were a vegetable, you'd be a 'cute-cumber.'",
  "I'm not saying you're old, but your birth certificate is in Roman numerals.",
  "If brains were taxed, you'd get a rebate.",
  "I'm not insulting you; I'm describing you.",
  "I'm not saying you're dumb; you're just a part of the 'No Child Left Behind' program.",
  "You're so slow that snails outrun you.",
  "I've seen better faces on clocks.",
  "You're so indecisive that even your GPS is confused about your destination.",
  "Your family tree must be a cactus because everyone on it is a prick.",
  "Your life is like a joke, but nobody's laughing.",
  "You must have been born on a highway because that's where most accidents happen.",
  "You're like a broken pencil—pointless.",
  "I'm not saying you're lazy; I'm saying you're actively doing nothing.",
  "I don't have the time or crayons to explain this to you.",
  "Is your name Wi-Fi? Because I'm feeling a connection... with someone else.",
  "Roses are red, violets are blue, I thought I was ugly until I met you.",
  "You're so dull, you make beige look colorful.",
  "You're the reason they invented spell-check.",
  "You're not stupid; you just have 'bad idea jeans.'",
  "You're so full of crap, you could fertilize a farm.",
];

module.exports = {
  name: "insult",
  deleted: false,
  description: "Sends a insult to the user",
  callback: async (client, interaction) => {
    try {
      const insult = insults[Math.floor(Math.random() * insults.length)];
      const userName = interaction.user.username;
      await interaction.reply(`Hey **${userName}**,\n\> ${insult}`);
    } catch (error) {
      console.error(error);
    }
  },
};
