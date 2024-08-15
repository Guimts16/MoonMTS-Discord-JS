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
    name: "clear",
    description: "☽ Moderação ☾ Delete várias mensagens de uma vez.",
    options: [
        {
            name: "quantidade",
            description: "Quantidade de mensagens (Max: 100)",
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
    ],
    callback: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
            ephemeral: true,
            content: "<a:loading:1249877261977649256> **Carregando...**"
        })
        const amount = interaction.options.get("quantidade").value;

        if (amount < 1) {
            interaction.editReply({
                content: "❌ | O número tem que ser maior que 0",
                ephemeral: true,
            });
        }

        interaction.channel.bulkDelete(amount, true).then((_message) => {
            interaction.editReply({
                content: `<a:moonts:1250205079605084502> | Total de mensagens deletadas: ${_message.size}`,
                ephemeral: true,
            });
        });
    },
};
