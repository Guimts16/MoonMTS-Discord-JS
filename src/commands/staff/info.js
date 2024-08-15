const { EmbedBuilder, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const fs = require('fs');
const path = require('path');
const { infos } = require("../../database/dbFunctions.js");

module.exports = {
    name: "info",
    description: "☽ Moderação ☾ Informações sobre um membro.",
    options: [
        {
            name: "history",
            description: "Ver histórico de mensagens de um membro",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "membro",
                    description: "O membro cujo histórico de mensagens você quer ver",
                    type: ApplicationCommandOptionType.User,
                    required: true,
                }
            ]
        }
    ],
    callback: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
            ephemeral: true,
            content: "<a:loading:1249877261977649256> **Carregando...**"
        });
        const member = interaction.options.getUser("membro");
        const guildId = interaction.guild.id;
        const memberId = member.id;
        const memberMessages = await infos.get(`${guildId}.${memberId}`);

        if (!memberMessages || memberMessages.length === 0) {
            return await interaction.editReply({
                content: `Nenhuma mensagem encontrada para o membro ${member.tag}.`,
                ephemeral: true
            });
        }

        const maxMessages = 10;
        const maxEmbedCharacters = 2000; 
        let totalEmbedCharacters = 0;
        let messagesToShow = [];
        let messagesToFile = [];

        const embed = new EmbedBuilder()
            .setColor("White")
            .setTitle(`<a:moonts:1250205079605084502> Histórico de mensagens de ${member.tag}`);

        for (const msg of memberMessages.reverse()) {
            const messageContent = `<:paper:1249877260148801558> **Mensagem:** ${msg.message}\n<:calendar:1249877245116420177> **Data:** ${msg.date}\n<:link:1249877263676211300> **Canal:** <#${msg.channel}>`;
            totalEmbedCharacters += messageContent.length;

            if (totalEmbedCharacters <= maxEmbedCharacters) {
                const mensagem_file = `Mensagem: ${msg.message}\nData: ${msg.date}\nCanal: <#${msg.channel}>`;
                messagesToShow.push(mensagem_file);

            } else {
                const mensagem_file = `Mensagem: ${msg.message}\nData: ${msg.date}\nCanal: <#${msg.channel}>`;
                messagesToFile.push(mensagem_file);

            }
        }

        if (messagesToFile.length > 0) {
            const tempDir = path.join(__dirname, '../temp');
            const filePath = path.join(tempDir, `${member.tag}_messages.txt`);

            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
            }

            const fileContent = messagesToFile.join('\n\n');
            fs.writeFileSync(filePath, fileContent);

            await interaction.editReply({
                content: `O histórico de mensagens de ${member}.`,
                files: [new AttachmentBuilder(filePath, { name: `${member.tag}_messages.txt` })],
                ephemeral: true
            });

            fs.unlink(filePath, (err) => {
                if (err) console.error(`Erro ao deletar o arquivo temporário: ${err}`);
            });
        } else {
            messagesToShow.slice(0, maxMessages).forEach((msg, index) => {
                embed.addFields({ name: `Mensagem #${index + 1}`, value: msg, inline: false });
            });

            await interaction.editReply({
                content: null,
                embeds: [embed],
                ephemeral: true
            });
        }
    }
};
