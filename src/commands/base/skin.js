const { EmbedBuilder, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "skin",
    description: "☽ Utilitário ☾ Quer ver a skin de um jogador de Minecraft?",
    options: [
        {
            name: "nickname",
            description: "O nickname do jogador de Minecraft.",
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    callback: async (client, interaction) => {
        const nickname = interaction.options.getString("nickname");
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
            ephemeral: true,
            content: "<a:2Minecraft:1251973920706396241> **Carregando...**"
        });

        try {
            const skinUrl = `https://mineskin.eu/armor/body/${nickname}/100.png`;
            const capeUrl = `https://skins.danielraybone.com/v1/profile/${nickname}`;
            const response = await axios.get(capeUrl);
            const data = response.data;
            let capeImageUrl = null;
            
            if (data.assets.cape) {
                
                capeImageUrl = data.assets.cape.url;
            }
            const skinEmbed = new EmbedBuilder()
                .setColor("#5A9EC9")
                .setTitle(`<a:2Minecraft:1251973920706396241>・Skin de ${nickname}`)
                .setImage(skinUrl)
                .setFooter({ text: "Skin do Minecraft" });
            if (capeImageUrl !== null) {
                
                skinEmbed.addFields(
                    { name: "<:Cape:1251974763262251088>・Capa", value: `[Clique aqui para ver a capa](${data.assets.cape.url})(**edite o formato da imagem para .png**)`, inline: true }
                );
            }

            const button = new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setURL(skinUrl)
                .setLabel("Ver skin no navegador")
                .setEmoji("🖼");

            const row = new ActionRowBuilder().addComponents(button);
            
            await interaction.editReply({
                ephemeral: false,
                content: null,
                embeds: [skinEmbed],
                components: [row]
            });
        } catch (error) {
            console.error("ERRO:" + error);

            if (error.response && error.response.status === 404) {
                await interaction.editReply({
                    ephemeral: true,
                    content: `<a:2Minecraft:1251973920706396241>・Não foi possível encontrar o jogador com o nickname ${nickname}.`
                });
            } else {
                await interaction.editReply({
                    ephemeral: true,
                    content: "<a:2Minecraft:1251973920706396241>・Ocorreu um erro ao tentar obter a skin do jogador."
                });
            }
        }
    }
};
