const {
    EmbedBuilder,
    ApplicationCommandOptionType,
} = require("discord.js");

module.exports = {
    name: "ban",
    description: "☽ Moderação ☾ Bane um usuário.",
    options: [
        {
            name: "usuario",
            description: "O usuário para ser punido.",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "motivo",
            description: "O motivo para o banimento.",
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
            await interaction.guild.members.ban(User.id, { reason: `Motivo: ${reason}` });

            const EmbedBan = new EmbedBuilder()
                .setColor("#ffffff")
                .setTitle("<a:moonts:1250205079605084502> Banimento aplicado com sucesso!")
                .setDescription("Usuário banido com sucesso! Ninguém mandou fazer coisa errada!\n\n**Revisão do banimento:**")
                .addFields(
                    { name: "<:member:1250220199807029275> Usuário:", value: `<@${User.id}> - (${User.id})`, inline: true },
                    { name: "<:link:1249877263676211300> Motivo:", value: reason, inline: true },
                    { name: ":man_police_officer::skin-tone-1: Moderador:", value: `<@${interaction.user.id}> - (${interaction.user.id})`},
                    { name: "<:calendar:1249877245116420177> Data do Banimento:", value: new Date().toLocaleString("pt-BR")}
                )
                .setThumbnail(client.user.displayAvatarURL());

            const Resultado = "<:yes:1249877246806720534> | Usuário banido com sucesso!";

            await interaction.editReply({
                content: Resultado,
                ephemeral: false,
                embeds: [EmbedBan]
            });
            return;

        } catch (error) {
            console.error(error);

            const EmbedBan = new EmbedBuilder()
                .setColor("#ffffff")
                .setTitle("<a:moonts:1250205079605084502> Ops... Não foi possível banir este usuário.")
                .setDescription("Verifique se o usuário tem algum cargo maior que o meu e se ele está no servidor.")
                .setThumbnail(client.user.displayAvatarURL());

            const Resultado = "<:x_:1249877249185021993> | Não foi possível banir este usuário!";

            await interaction.editReply({
                content: Resultado,
                ephemeral: false,
                embeds: [EmbedBan]
            });
            return;
        }
    },
};
