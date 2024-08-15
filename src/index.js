const {
    token
} = require("../config.json");

const { 
    Client,
    IntentsBitField, 
    ActivityType, 
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
} = require("discord.js");
const eventHandler = require("./handlers/eventHandler");
const { logs } = require("./database/dbFunctions.js");
const { infos } = require("./database/dbFunctions.js");
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildIntegrations,
        IntentsBitField.Flags.GuildModeration,
    ],
});

client.on('ready', (c) => {
    client.user.setActivity({
        name: 'By Guimts!',
        type: ActivityType.Custom
    })
})
client.on("messageDelete", async (message) => {
    if (message.author.id === client.user.id) return;
    const config = logs.get(message.guild.id);
    try {
        if (config["chat"]) {
            const channel = client.channels.cache.get(config["chat"])
            const currentTime = Date.now();
            const timestamp = currentTime.toString().slice(0, -3);
            const embed = new EmbedBuilder()
            .setColor("White")
            .setAuthor({
                name: "Moonts - Logs",
                iconURL: message.guild.iconURL()
            })
            .setThumbnail(message.author.avatarURL({ dynamic: true, size: 512 }))
            .setTitle("Mensagem deletada.")
            .setFields([
                {
                    name: "<a:moonts:1250205079605084502> Mensagem deletada:",
                    value: "```" + message.content + "```",
                    inline: false,
                },
                {
                    name: "<:member:1250220199807029275> Mensagem de:",
                    value: "<@" + message.author.id + ">" + " (" + message.author.tag + ")",
                    inline: false,
                },
                { 
                    name: "<:link:1249877263676211300> Canal:",
                    value: "<#" + message.channel.id + "> (" + message.channel.name + ")",
                    inline: true,
                },
                {
                    name: "<:calendar:1249877245116420177> Deletada em:",
                    value: message.createdAt.toLocaleString() + " (<t:" + timestamp + ":R>)",
                    inline: true,
                }
            ])
            .setTimestamp()
            await channel.send({ embeds: [embed] });
            return;
        }
    } catch {
        return;
    }
})
client.on("messageCreate", async (message) => {
    if (message.content == "$mts") {
        console.log(message.content)
        if (message.author.id !== "617362818299199498") {
            return;

        };
        console.log("S")
        const embed = new EmbedBuilder()
        .setColor("White")
        .setAuthor({
            name: "Moonts - Configurações",
            iconURL: message.guild.iconURL()
        })
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTitle("Configurações de administrador.")
        .setDescription("Olá, Guimts. Seja-bem-vindo ao painel de configuração do Moonts. Aqui você pode fazer comandos exclusivos seus!")
        const delChat = new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setCustomId("delChat")
        .setLabel("Deletar chat")
        .setEmoji("🗑️")
        const delRaid = new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setCustomId("delRaid")
        .setLabel("Deletar raid")
        .setEmoji("☢")

        const row  = new ActionRowBuilder().addComponents(delChat, delRaid)
        await message.reply({ embeds: [embed], components: [row] })
        return;

    }
})



client.on("messageUpdate", async (oldMessage, newMessage) => {
    if (oldMessage.author.id === client.user.id) return;
    try {    
        const config = await logs.get(oldMessage.guild.id)
        if (config["chat"]) {
            const channel = client.channels.cache.get(config["chat"])
            const currentTime = Date.now();
            const timestamp = currentTime.toString().slice(0, -3);
            const Embed = new EmbedBuilder()
            .setAuthor({
                name: "Moonts - Logs",
                iconURL: oldMessage.guild.iconURL()
            })
            .setThumbnail(oldMessage.author.avatarURL({ dynamic: true, size: 512 }))
            .setTitle("Mensagem editada.")
            .setColor("White")
            .setFields([
                {
                    name: "<:member:1250220199807029275> Mensagem de:",
                    value: "<@" + oldMessage.author.id + ">" + " (" + oldMessage.author.tag + ")",
                    inline: false,
                },
                {
                    name: "📝 Mensagem antiga:",
                    value: "```" + oldMessage.content + "```",
                    inline: true,
                },
                {
                    name: "<:paper:1249877260148801558> Mensagem nova:",
                    value: "```" + newMessage.content + "```",
                    inline: true,
                },
                {
                    name: "<:link:1249877263676211300> Canal:",
                    value: "<#" + oldMessage.channel.id + "> (" + oldMessage.channel.name + ")",
                    inline: false,
                },
                {
                    name: "<:calendar:1249877245116420177> Editada em:",
                    value: oldMessage.createdAt.toLocaleString() + " (<t:" + timestamp + ":R>)",
                    inline: true,
                }
            ])
            .setTimestamp()
            await channel.send({ embeds: [Embed] })
            return
        
} } catch {
    return
}
})

client.on('voiceStateUpdate', async (old, news) => {
    const lgs = await logs.get(old.guild.id)
    const logs_logs = lgs["call"];
    if (!lgs["call"]) return;

    canal = client.channels.cache.get(logs_logs);
    if (old.channel === null && news.channel !== null) {
        const time = Date.now();
        const entrou = time.toString().slice(0, -3);
        const EntrouEmbed = new EmbedBuilder()
        .setColor("White")
        .setAuthor({
            iconURL: news.member.displayAvatarURL({
                dynamic: true,
                size: 1024,
            }),
            name: news.member.user.tag
        })
        .setThumbnail(news.member.displayAvatarURL())
        .setFields([
            {
                name: "🎤 Entrou no canal de voz:",
                value: "<#" + news.channel.id + "> (" + news.channel.name + ")",
                inline: true,
            },
            {
                name: "<a:bum:1154575599592018020> Entrada:",
                value: "<t:" + entrou + ":R>",
                inline: true,
            },
        ])
        .setTimestamp()
        canal.send({
            embeds: [EntrouEmbed]
        })
    }
    if (old.channel !== null && news.channel === null) {
        const time = Date.now();
        const saiu = time.toString().slice(0, -3);
        const saiuEmbed = new EmbedBuilder()
        .setAuthor({
            iconURL: old.member.displayAvatarURL({
                dynamic: true,
                size: 1024,
            }),
            name: old.member.user.tag
        })
        .setColor("White")
        .setThumbnail(old.member.displayAvatarURL())
        .setFields([
            {
                name: "🎤 Saiu do canal de voz:",
                value: "<#" + old.channel.id + "> (" + old.channel.name + ")",
                inline: true,
            },
            {
                name: "<a:bum:1154575599592018020> Saída:",
                value: "<t:" + saiu + ":R>",
                inline: true,
            },
        ])
        .setTimestamp()
        canal.send({
            embeds: [saiuEmbed]
        })
    }
    if (old.channel !== null && news.channel !== null && old.channel.id !== news.channel.id) {
        const time = Date.now();
        const mudou = time.toString().slice(0, -3);
        const MudouEmbed = new EmbedBuilder()
        .setColor("White")
        .setThumbnail(old.member.displayAvatarURL())
        .setAuthor({
            iconURL: old.member.displayAvatarURL({
                dynamic: true,
                size: 1024,
            }),
            name: old.member.user.tag
        })
        .addFields([
            {
                name: "🎤 Mudou de canal de voz:",
                value: "<#" + old.channel.id + "> (" + old.channel.name + ")",
                inline: true,
            },
            {
                name: "🎤 Para:",
                value: "<#" + news.channel.id + "> (" + news.channel.name + ")",
                inline: true,
            },
            {
                name: "<a:bum:1154575599592018020> Mudou:",
                value: "<t:" + mudou + ":R>",
                inline: false,
            },
        ])
        .setTimestamp()

        canal.send({
            embeds: [MudouEmbed]
        })
    }
});
client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    const guildId = message.guild.id;
    const memberId = message.author.id;
    const messageContent = message.content;

    const guildInfo = await infos.get(guildId);

    if (!guildInfo) {
        await infos.set(guildId, {});
    }
    const currentTime = Date.now();
    const timestamp = currentTime.toString().slice(0, -3);
    const memberMessages = await infos.get(`${guildId}.${memberId}`);

    if (!memberMessages) {
        await infos.set(`${guildId}.${memberId}`, []);
    }

    await infos.push(`${guildId}.${memberId}`, {
        "name": message.author.username,
        "avatar": message.author.displayAvatarURL(),
        channel: message.channel.id,
        message: messageContent,
        date: message.createdAt.toLocaleString() + " ( <t:" + timestamp + "> )",
    });

});
eventHandler(client);

client.login(token);
