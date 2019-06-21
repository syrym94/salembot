const isBotCommand = (data) =>{
    const isBot =
    (data.message.entities!== undefined && data.message.entities[0].type === 'bot_command') ? true : false
    return isBot
}
export default isBotCommand