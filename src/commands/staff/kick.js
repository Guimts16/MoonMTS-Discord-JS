const {
    EmbedBuilder,
    ApplicationCommandOptionType,
} = require("discord.js");

module.exports = {
    name: "kick",
    description: "☽ Moderação ☾ Expulsa um infrator do servidor, usado como uma forma de aviso..",
    options: [
        {
            name: "usuario",
            description: "O usuário para ser expulso.",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "motivo",
            description: "O motivo para a expulsão.",
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    callback: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
            ephemeral: true,
            content: "<a:loading:1249877261977649256> **Carregando...**"
        });

        try {
            const User = interaction.options.get("usuario").user;
            const reason = interaction.options.get("motivo").value;

            await interaction.guild.members.kick(User.id, { reason: `Motivo: ${reason}` });

            const EmbedKick = new EmbedBuilder()
            .setColor("#ffffff")
            .setTitle("<a:moonts:1250205079605084502> Expulsão aplicada com sucesso!")
                .setDescription("Usuário expulso com sucesso! Comporte-se melhor da próxima vez!\n\nRevisão de expulsão:")
                .addFields(
                    { name: "<:member:1250220199807029275> Usuário:", value: `<@${User.id}> - (${User.id})`, inline: true },
                    { name: "<:link:1249877263676211300> Motivo:", value: reason, inline: true },
                    { name: ":man_police_officer::skin-tone-1: Moderador:", value: `<@${interaction.user.id}> - (${interaction.user.id})`},
                    { name: "<:calendar:1249877245116420177> Data da expulsão:", value: new Date().toLocaleString("pt-BR")}
                )
                .setThumbnail(client.user.displayAvatarURL());

            const Resultado = "<:yes:1249877246806720534> | Usuário expulso com sucesso!";

            await interaction.editReply({
                content: Resultado,
                ephemeral: false,
                embeds: [EmbedKick]
            });
            return;

        } catch (error) {
            console.error(error);

            const EmbedKick = new EmbedBuilder()
                .setColor("#ffffff")
                .setTitle("<a:moonts:1250205079605084502> Ops... Não foi possível expulsar este usuário.")
                .setDescription("Verifique se o usuário tem algum cargo maior que o meu e se ele está no servidor.")
                .setThumbnail(client.user.displayAvatarURL());

            const Resultado = "<:x_:1249877249185021993> | Não foi possível expulsar este usuário!";

            await interaction.editReply({
                content: Resultado,
                ephemeral: false,
                embeds: [EmbedKick]
            });
            return;
        }
    },
};
