const Discord = require("discord.js");
const Distube = require("distube").default;
const config = require("./config.json");
const client = new Discord.Client({
  intents: 641,
});

const distube = new Distube(client, {
  emitNewSongOnly: false,
  searchSongs: 0,
});

client.on("ready",  () => {
  console.log(`RQ is bijna ready`);
  client.user.setActivity("I Love Youngboy", { type: "PLAYING" });
});

const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"
  }\` | Loop: \`${queue.repeatMode
    ? queue.repeatMode == 2
      ? "All Queue"
      : "This Song"
    : "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// distube events
distube.on("playSong", (queue, song) => {
  let playembed = new Discord.MessageEmbed()
    .setColor("#C0A6A7")
    .setTitle(`:ghost:  Playing! `)
    .setThumbnail(song.thumbnail)
    .setDescription(`[${song.name}](${song.url})`)
    .addField("Gevraagd door", `${song.user}`, true)
    .addField("Duration", `${song.formattedDuration.toString()}`, true)
    .setFooter(status(queue), song.user.displayAvatarURL({ dynamic: true }));
  queue.textChannel.send({ embeds: [playembed] });
});
distube.on("addSong", (queue, song) => {
  let playembed = new Discord.MessageEmbed()
    .setColor("#C0A6A7")
    .setTitle(`:ghost:  Toegevoegd aan queue `)
    .setThumbnail(song.thumbnail)
    .setDescription(`[${song.name}](${song.url})`)
    .addField("Gevraagd door", `${song.user}`, true)
    .addField("Duration", `${song.formattedDuration.toString()}`, true)
    .setFooter(
      `By Sect`,
      song.user.displayAvatarURL({ dynamic: true })
    );

  queue.textChannel.send({ embeds: [playembed] });
});
distube.on('addList', (queue, plalist) => {
  let playembed= new Discord.MessageEmbed()
    .setColor("#C0A6A7")
    .setTitle(`:dragon_face:  PlayList toegevoegd aan Queue `)
    .setThumbnail(plalist.thumbnail)
    .setDescription(`[${plalist.name}](${plalist.url})`)
    .addField("Gevraagd door", `${plalist.user}`, true)
    .addField("Tijdsduur", `${plalist.formattedDuration.toString()}`, true)
    .setFooter(
      `By Sect`,
      plalist.user.displayAvatarURL({ dynamic: true })
    );

  queue.textChannel.send({ embeds: [playembed] });
})
client.on("messageCreate", async (message) => {
  if (
    !message.guild ||
    message.author.bot ||
    !message.content.startsWith(config.prefix)
  )
    return;

    ///////// NO MUSIC COMMANDS ////////////////////
  let args = message.content.slice(config.prefix.length).trim().split(" ");
  let cmd = args.shift()?.toLowerCase();
  if (cmd === 'talk'){
    message.channel.send(`Yo ${message.author}, hoe gaat het bro?`);
  } else if (cmd === 'goed' | cmd === 'good'){
      message.channel.send("Lekker man!")
  } else if (cmd === 'slecht' | cmd === 'idk'){
      message.channel.send('Dats fucked up man')
  } else if (cmd === 'fuck'){
    let tMember = message.mentions.members.first();
    let answers = [
      `${tMember.user} has been fucked by ${message.author.username}, but that nigga's pull out game STRONG.`,
      `${tMember.user} gave ${message.author.username} herpes.`,
      `${tMember.user} GAVE ${message.author} AIDS LMFAO`,
      `${tMember.user} has been impregnated by ${message.author.username} :pregnant_woman::skin-tone-5:`,
      `${tMember.user} got raped by this lame ahh nigga called ${message.author.username} :skull:`
    ]
    let randomA = answers[Math.floor(Math.random() * answers.length)];
    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setColor('#C0A6A7')
          .setTitle('Fucked  :clown:')
          .setDescription(randomA)
      ]
    })
  }
  
  
  
  if (cmd === "ping") {
    message.channel.send(`>>> Ping :- \`${client.ws.ping}\``);
  

    
  }
  else if (cmd === "play" | cmd === "p") {
    let search = args.join(" ");
    let channel = message.member.voice.channel;
    let queue = distube.getQueue(message.guildId);
    if (!channel) {
      return message.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setColor("#C0A6A7")
            .setDescription(`>>> Join een vc`)
            .setFooter(
              `By Sect`,
              message.author.displayAvatarURL({ dynamic: true })
            ),
        ],
      });
    }
    // if (message.guild.me.voice.channel !== channel) {
    //   return message.reply({
    //     embeds: [
    //       new Discord.MessageEmbed()
    //         .setColor("BLURPLE")
    //         .setDescription(`>>> Please Join My Voice Channel to Play Song`)
    //         .setFooter(
    //           `Coded By Kabir Singh`,
    //           message.author.displayAvatarURL({ dynamic: true })
    //         ),
    //     ],
    //   });
    // }
    if (!search) {
      return message.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setColor("#c4f835")
            .setDescription(`>>> Geef song naam of link noobie`)
            .setFooter(
              `By Sect`,
              message.author.displayAvatarURL({ dynamic: true })
            ),
        ],
      });
    }
    distube.play(message, search);
  } else if (cmd === "skip" | cmd === "s") {
    let queue = distube.getQueue(message.guild.id);
    let channel = message.member.voice.channel;
    if (!channel) {
      return message.channel.send(`** Je zit niet in een vc bro **`)
    }
    if (!queue) {
      return message.channel.send(`** Nothing Playing **`)
    }
    queue.skip();
    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setColor("#C0A6A7")
          .setTitle(`Song Skipped`)
          .setDescription(`Song veranderd door ${message.author}`)
          
      ]
    })

  } else if (cmd === 'pause') {
    let queue = distube.getQueue(message.guild.id);
    let channel = message.member.voice.channel;
    if (!channel) {
      return message.channel.send(`** Je zit niet in een vc bro **`)
    }
    if (!queue.songs.length) {
      return message.channel.send(`** Nothing Playing **`)
    }
    queue.pause()
    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setColor("#C0A6A7")
          .setTitle(`Song Pause`)
          .setDescription(`Song Paused by ${message.author}`)
          
      ]
    })
  } else if (cmd === 'resume' | cmd === 'r') {
    let queue = distube.getQueue(message.guild.id);
    let channel = message.member.voice.channel;
    if (!channel) {
      return message.channel.send(`** Je zit niet in een vc bro **`)
    }
    if (!queue.songs.length) {
      return message.channel.send(`** Nothing Playing **`)
    }
    queue.resume()
    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setColor("#C0A6A7")
          .setTitle(`Song Resume`)
          .setDescription(`Song Resumed by ${message.author}`)
          .setFooter(`By Sect`)
      ]
    })
  } else if (cmd === "queue" && 'q') {
    let queue = distube.getQueue(message.guild.id);
    let channel = message.member.voice.channel;
    if (!channel) {
      return message.channel.send(`** Je zit niet in een vc bro **`)
    }
    if (!queue.songs.length) {
      return message.channel.send(`** Nothing Playing **`)
    }
    if (queue.playing) {
      let embedsc = queue.songs.map((song, index) => {
        return `${index + 1} [${song.name}](${song.url}) \`[${song.formattedDuration}]\``
      })

      message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setColor('#C0A6A7')
            .setTitle(`Queue Of \`${message.guild.name}\``)
            .setDescription(`>>> ${embedsc.join("\n")}`.substr(0, 3000))
            .setFooter(`${queue.songs.length} Songs`, message.guild.iconURL({ dynamic: true }))
        ]
      })

    }
  } else if (cmd === "np") {
    let queue = distube.getQueue(message.guild.id);
    if (!queue.songs.length) {
      return message.channel.send(`** Nothing Playing **`)
    }
    let song = queue.songs[0];
    let embed = new Discord.MessageEmbed()
      .setAuthor(`Now Playing`, song.thumbnail)
      .setColor('#C0A6A7')
      .setTitle(song.name)
      .setURL(song.url)
      .setThumbnail(song.thumbnail)
      .addFields([
        {
          name: "**Duration**",
          value: `>>> ${song.formattedDuration.toString()}`,
          inline: true
        },
        {
          name: "**User**",
          value: `>>> ${song.user}`,
          inline: true
        },
        {
          name: "**Views**",
          value: `>>> ${song.views.toLocaleString()}`,
          inline: true
        }
      ])

    message.channel.send({ embeds: [embed] })
  }
});


client.login(process.env.token);