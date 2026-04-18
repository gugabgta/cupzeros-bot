const dotenv = require('dotenv');
dotenv.config();

const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

if (!process.env.DISCORD_TOKEN || process.env.DISCORD_TOKEN.length < 50) {
    console.error('Error: DISCORD_TOKEN is missing or too short in .env file');
    process.exit(1);
}

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

let activeRaider = null;

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('Bot is online. Use !setup-raid to start the tracker.');
});

function createRaidMessage() {
    const embed = new EmbedBuilder()
        .setTitle('🛡️ Raid Activity Tracker')
        .setDescription(activeRaider 
            ? `🔥 **${activeRaider.username}** is currently active on a raid!` 
            : '✅ No one is currently raiding. Click below to start!')
        .setColor(activeRaider ? 0xFF4500 : 0x00FF00)
        .setTimestamp();

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('start_raid')
                .setLabel('Start Raid')
                .setStyle(ButtonStyle.Success)
                .setDisabled(activeRaider !== null),
            new ButtonBuilder()
                .setCustomId('finish_raid')
                .setLabel('Finish Raid')
                .setStyle(ButtonStyle.Danger)
                .setDisabled(activeRaider === null)
        );

    return { embeds: [embed], components: [row] };
}

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase() === '!setup-raid') {
        await message.channel.send(createRaidMessage());
    }

    if (message.content.toLowerCase() === 'ping') {
        await message.reply('Pong!');
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'start_raid') {
        if (activeRaider) {
            return interaction.reply({ content: `Sorry, ${activeRaider.username} is already raiding!`, ephemeral: true });
        }
        
        activeRaider = interaction.user;
        await interaction.update(createRaidMessage());
        console.log(`${interaction.user.tag} started a raid.`);
    }

    if (interaction.customId === 'finish_raid') {
        if (!activeRaider) {
            return interaction.reply({ content: 'No one is currently raiding.', ephemeral: true });
        }

        if (interaction.user.id !== activeRaider.id) {
            return interaction.reply({ content: `Only ${activeRaider.username} can finish their raid!`, ephemeral: true });
        }

        activeRaider = null;
        await interaction.update(createRaidMessage());
        console.log(`${interaction.user.tag} finished their raid.`);
    }
});

client.login(process.env.DISCORD_TOKEN);
