module.exports = {
    name: 'leave',
    description: 'stop the bot and leave the channel',
    async execute(message) {
        const voiceChannel = message.member.voice.channel;
 
        if(!voiceChannel) return message.channel.send("Je moet wel in een vc zijn he");
        await voiceChannel.leave();
        await message.channel.send('Leaving channel :smiling_face_with_tear:')
 
    }
}