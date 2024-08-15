const {
    EmbedBuilder,
    ApplicationCommandOptionType,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,

} = require("discord.js");

module.exports = {
    name: "avatar",
    description: "☽ Utilitário ☾ Quer ver a foto de um amigo? Ou aquale banner SHOW!",
    options: [
        {
            name: "opção",
            description: "Escolha o que deseja ver",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "Imagem",
                    value: "avatar",
                    description: "Ver a foto de perfil do úsuario."
                },
                {
                    name: "Banner",
                    value: "banner",
                    description: "Ver aquele banner daora do úsuario"
                }
            ]
        },
        {
            name: "usuario",
            description: "O usuário para visualiar.",
            type: ApplicationCommandOptionType.User,
            required: true,
        } 
    ],
    callback: async (client, interaction) => {
        if (interaction.options.get("opção").value === "avatar") {
            const User = interaction.options.get("usuario").user;
            const image = User.displayAvatarURL({ size: 512 })
            const AvatarEmbed = new EmbedBuilder()
                .setColor("#ffffff")
                .setTitle(`<a:moonts:1250205079605084502> ${User.tag}`)
                .setImage(image)
                .setFooter({ text: "Acredite se quiser... Isso é uma imagem."}) ;
            const button = new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setURL(image)
                .setLabel("Ver avatar no navegador")
                .setEmoji("🖼")
            const row = new ActionRowBuilder().addComponents(button);
        await interaction.reply({
                ephemeral: false,
                embeds: [AvatarEmbed],
                components: [row]
            })
        }
        else {
            try {
                const User = interaction.options.get("usuario").user;
                const fetchedUser = await client.users.fetch(User.id, { force: true });
                    const banner = fetchedUser.bannerURL({ size: 1024 });
    
                if (banner) {
                    const BannerEmbed = new EmbedBuilder()
                        .setColor("#ffffff")
                        .setTitle(`<a:moonts:1250205079605084502> ${User.tag}`)
                        .setImage(banner)
                        .setFooter({ text: "Acredite se quiser... Isso é uma imagem." });
    
                    const button = new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setURL(banner)
                        .setLabel("Ver banner no navegador")
                        .setEmoji("🖼")    
                    const row = new ActionRowBuilder().addComponents(button);
    
                    await interaction.reply({
                        ephemeral: false,
                        embeds: [BannerEmbed],
                        components: [row]
                    });
                } else {
                    const BannerEmbed = new EmbedBuilder()
                        .setColor("#ffffff")
                        .setTitle(`<a:moonts:1250205079605084502> ${User.tag}`)
                        .setDescription("Esse usuário não tem um banner!");
    
                    await interaction.reply({
                        ephemeral: false,
                        embeds: [BannerEmbed]
                    });
                }
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    ephemeral: true,
                    content: "Ocorreu um erro ao tentar obter o banner do usuário."
                });
            }
        }
    }
}
