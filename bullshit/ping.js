// module.exports = {
//     name: 'ping',
//     description: 'this is a ping command!',
//     execute(message, args){
//         message.channel.send('pong');
//     }
// }


// const Discord = require("discord.js");

// const client = new Discord.Client({ intents: [ "GUILD_MESSAGES", "GUILDS"]});

// const prefix = '-';

// const fs = require("fs");

// client.commands = new Discord.Collection();

// const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith(".js"));
// for(const file of commandFiles){
//     const command = require(`./commands/${file}`);

//     client.commands.set(command.name, command); 
// }


// client.once('ready', () => {
//     console.log("RQ is online!");
// });

// client.on('messageCreate', message =>{
//     if(!message.content.startsWith(prefix) || message.author.bot) return;

//     const args = message.content.slice(prefix.length).split(/ +/);
//     const command = args.shift().toLowerCase();

//     if(command === 'talk'){
//         client.commands.get('ping').run(message, args);
//     } else if (command == "play"){
//         client.commands.get("play").run(message, args)
//     } else if (command == "leave"){
//         client.commands.get("leave").run(message, args);
//     }
// });

//