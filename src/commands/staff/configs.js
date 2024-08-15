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
const { logs } = require("../../database/dbFunctions.js");

module.exports = {
    name: "config",
    description: "☽ Moderação ☾ Configurar as Logs.",
    options: [
        {
            name: "channel",
            description: "Configurar os canais de logs",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "Call's Logs",
                    value: "call_logs",
                    description: "Coloque um chat para enviar a log desejada."
                },
                {
                    name: "Chat's Logs",
                    value: "chat_logs",
                    description: "Coloque um chat para enviar a log desejada."
                }
            ]
        },
        {
            name: "id",
            description: "Canal desejado | DEIXE EM BRANCO SE QUISER REMOVER.",
            type: ApplicationCommandOptionType.Channel,
            required: false,
        }
    ],
    callback: async (client, interaction) => {
        if (!interaction.member.permissions.has("MANAGE_GUILD")) {
            interaction.reply({
                content: "❌ | Você não tem permissão para executar esse comando.",
                ephemeral: true,
            });
            return;
        }

        const opcao = interaction.options.getString("channel");
        const id = interaction.options.getChannel("id");

        let configKey;
        switch (opcao) {
            case "call_logs":
                configKey = "call";
                break;
            case "chat_logs":
                configKey = "chat";
                break;
            default:
                interaction.reply({
                    content: "❌ | Opção inválida.",
                    ephemeral: true,
                });
                return;
        }

        try {
            let config = await logs.get(interaction.guild.id) || {};
            if (id === null) {
                if (!Object.prototype.hasOwnProperty.call(config, configKey)) {
                    interaction.reply({
                        content: "<:x_:1249877249185021993> | Não há nenhum canal configurado com esse nome.",
                        ephemeral: true,
                    });
                    return;
                }
                
                delete config[configKey];
                await logs.set(interaction.guild.id, config);

                const EmbedRemove = new EmbedBuilder()
                    .setTitle("Canal REMOVIDO.")
                    .setDescription(`<:config:1249877268357185597> Canal de ${opcao.replace('_', ' ')} removido com sucesso!`)
                    .setThumbnail(client.user.avatarURL())
                    .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL() })
                    .setColor("White");

                interaction.reply({
                    embeds: [EmbedRemove],
                    ephemeral: true,
                });
            } else {
                config[configKey] = id.id;
                await logs.set(interaction.guild.id, config);

                const EmbedAdd = new EmbedBuilder()
                    .setTitle("Canal adicionado.")
                    .setDescription(`<:config:1249877268357185597> Canal de **${opcao.replace('_', ' ')}** configurado com sucesso!\nCanal: <#${id.id}>`)
                    .setThumbnail(client.user.avatarURL())
                    .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL() })
                    .setColor("White");

                interaction.reply({
                    embeds: [EmbedAdd],
                    ephemeral: true,
                });
            }
        } catch (error) {
            console.error("Erro encontrado:", error);
            interaction.reply({
                content: "❌ | Ocorreu um erro ao tentar configurar o canal. (Veja o console)",
                ephemeral: true,
            });
        }
    },
};
