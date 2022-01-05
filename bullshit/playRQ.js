



// const ytsearch = require('yt-search');
// const { Client, Intents} = require('discord.js')
// const {
//     joinVoiceChannel,
//     createAudioPlayer,
//     createAudioResource,
//     NoSubscriberBehavior
// } = require('@discordjs/voice');

// const client = new Client({
//         shards: "auto", //1700+ servers
//         intents: [
//             Intents.FLAGS.GUILDS,
//             Intents.FLAGS.GUILD_VOICE_STATES
//         ]
//     })


// module.exports = {
//     name: "play",
//     description: "test command",

//     async run(client, message, args) {

//         const voiceChannel = message.member.voice.channel;
//         if (!voiceChannel) return message.channel.send('Please connect to a voice channel!');
//         if (!args.length) return message.channel.send('Please Provide Something To Play!')

// client.on("ready", async () => {
//     for(const channelId of Channels){
//         joinChannel(channelId);
//         //wait 500ms
//         await new Promise(res => setTimeout(() => res(2), 500))
//     }
//       function joinChannel(channelId) {
//         client.channels.fetch(channelId).then(channel => {
//             const connection = await joinVoiceChannel({
//                 channelId: message.member.voice.channel.id,
//                 guildId: message.guild.id,
//                 adapterCreator: message.guild.voiceAdapterCreator
        
//             });
//             const videoFinder = async (query) => {
//                 const videoResult = await ytsearch(query);
//                 return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;


//         }
//             const video = await videoFinder(args.join(' '));
//             if (video) {
//                 const stream = ytdl(video.url, { filter: 'audioonly' });
//                 const player = createAudioPlayer();
//                 const resource = createAudioResource(stream)

//                 await player.play(resource);
//                 connection.subscribe(player);
            




//                 await message.reply(`:thumbsup: Now Playing ***${video.title}***`)
            
//              } else {
//                  message.channel.send('No video results found');
//         }
//     }
// }