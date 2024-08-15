const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ApplicationCommandOptionType,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ReactionUserManager,
    ThreadOnlyChannel,
} = require("discord.js");

module.exports = {
    name: "ajuda",
    description: "☽ Utilitário ☾ Tudo bem pedir ajuda, as vezes as coisas são confusas mesmo...!",

    callback: async (client, interaction) => {
        const EmbedAjuda = new EmbedBuilder()
        .setColor("#ffffff")
        .setTitle("<a:moonts:1250205079605084502> Ajuda de Moonts")
        .setDescription(`Olá ${interaction.user}, meu nome é Moonts e eu sou apenas um bot para o Discord!\n\nPossuo diversas funcionalidades para se divertir e transformar seu ambiente mais agradavél, qualquer coisa é só chamar!`)
        .setThumbnail(client.user.displayAvatarURL())
        
    await interaction.reply({
            ephemeral: false,
            embeds: [EmbedAjuda]
        })
    },
};
