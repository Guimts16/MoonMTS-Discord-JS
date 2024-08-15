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
    if (!interaction.isButton()) return;

    if (interaction.customId === "delChat") {
        interaction.channel.delete()
        interaction.reply({
            ephemeral: true,
            content: `Chat deletado.`
        })
    }
    if (interaction.customId === "delRaid") {
        const modal = new ModalBuilder()
            .setCustomId('delraid_modal')
            .setTitle('Painel - Delete Raids');
    
    
        const name = new TextInputBuilder()
            .setCustomId('nameRaid')
            .setLabel("Qual o nome dos canais criados?")
            .setStyle(TextInputStyle.Short);
    
        
        const modalname = new ActionRowBuilder().addComponents(name);
    
        modal.addComponents(modalname);
    
        await interaction.showModal(modal);
    }

};
