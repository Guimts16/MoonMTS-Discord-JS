const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ApplicationCommandOptionType,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ChannelType,
    Events,
    ModalBuilder,
    TextInputBuilder, 
    TextInputStyle,
} = require("discord.js");

module.exports = async (client, interaction) => {
	if (!interaction.isModalSubmit()) return;
    const name = interaction.fields.getTextInputValue('nameRaid');

    const channels = interaction.guild.channels.cache.filter(channel => channel.name == name);
    channels.forEach(channel => {
        interaction.reply({
            ephemeral: true,
            content: `Todos os canais contendo "${name}" foram deletados.`
        });
        channel.delete()
            .then(() => console.log(`Deletado canal ${channel.name} em ${interaction.guild.name}`))
            .catch(console.error);

    });
}


