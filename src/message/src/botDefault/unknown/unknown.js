import confirmOrder from '../../../../query/cartHandler/func/confirmOrder/confirmOrder'
const unknown= (data) =>{
    console.log("unknown command")
    // data.slimbot.sendMessage(data.message.chat.id, `Такой команды нет`)
}
export default unknown