const { token } = require('./config.json');
const { Client, Events, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');

const client = new Client ({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${client.user.tag}!`);

    const ping = new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with "Pong!"');

    const hello = new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Replies with "Hello!"');

    client.application.commands.create(ping,"1147428028834660394");
    client.application.commands.create(hello,"1147428028834660394");

    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;
        if(interaction.commandName === 'ping'){
            interaction.reply('Pong!');
        }
        if(interaction.commandName === 'hello'){
            interaction.reply(`Hello ${interaction.user.username.split('#')[0]}`);
        }
    });
});

client.login(token);