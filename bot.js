require('dotenv').config();
const Discord = require("discord.js");
const { Client, GatewayIntentBits, Routes } = require('discord.js');

const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
})
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  
  const guildId = '1059718459434471494'
  const guild = client.guilds.cache.get(guildId)
  let commands

  if (guild){
    commands = guild.commands
  }else{
    commands = client.application?.commands
  }

  commands?.create({
    name: 'ping',
    description: 'Replies with pong.',
  })
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }

    const {commandName, options} = interaction

    if (commandName === 'ping') {
        interaction.reply({
            content: 'pong',
            ephemeral: true,
        })
    }
})

client.login(process.env.DISCORD_TOKEN);
