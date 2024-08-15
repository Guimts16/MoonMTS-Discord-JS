const { EmbedBuilder, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const { createCanvas, loadImage } = require("canvas");
const path = require("path");
const fs = require("fs");
module.exports = {
    name: "perfil",
    description: "☽ Utilitário ☾ Seu perfil",
    options: [
        {
            name: "opção",
            description: "Escolha o que deseja ver",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "Ver",
                    value: "see",
                    description: "Ver o perfil de alguém."
                },
                {
                    name: "Sobre mim",
                    value: "me",
                    description: "Mudar seu sobre mim"
                }
            ]
        },
        {
            name: "membro",
            description: "O membro para visualizar.",
            type: ApplicationCommandOptionType.User,
            required: true,
        }
    ],
    callback: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
            ephemeral: true,
            content: "<a:loading:1249458733344489633> **Carregando...**"
        });
        if (interaction.options.getString("opção") === "see") {
            const targetUser = interaction.options.getUser("membro");

            const backgroundPath = path.join(__dirname, "./perfil/profile.png");

            const canvasWidth = 800;
            const canvasHeight = 600;

            const canvas = createCanvas(canvasWidth, canvasHeight);
            const ctx = canvas.getContext("2d");

            try {
                const backgroundImage = await loadImage(backgroundPath);
                ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);

                const avatarURL = targetUser.displayAvatarURL({ format: "png", size: 512 });
                const avatarImage = await loadImage(avatarURL);

                const avatarSize = 128;
                const avatarX = 20;
                const avatarY = 20;

                ctx.beginPath();
                ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();

                ctx.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);

                ctx.restore();

                const buffer = canvas.toBuffer("image/png");
                const attachment = new AttachmentBuilder(buffer, { name: "profile-image.png" });

                await interaction.editReply({
                    files: [attachment],
                    content: `Aqui está o perfil de ${targetUser.tag}!`,
                    ephemeral: false
                });
            } catch (error) {
                console.error("Erro ao criar a imagem:", error);
                await interaction.editReply({
                    content: "Ocorreu um erro ao tentar gerar a imagem do perfil.",
                    ephemeral: true
                });
            }
        } else {
            await interaction.editReply({
                content: "Função 'Sobre mim' ainda não implementada.",
                ephemeral: true
            });
        }
    }
};
