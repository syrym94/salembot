var emoji = require('node-emoji')
const confirmOrder = async (data) => {
  var incomingOrder = require('../../../../message/src/botDefault/cart/util')
  let arr = [];
  arr.push(
    [
      {
        text: "Подтвердить заказ",
        callback_data: JSON.stringify({
          data: incomingOrder.order.id,
          action: "b"
      })}
    ]
    )
  const params = {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
      inline_keyboard: arr
    })
  };
  if(data.query.message.chat.id)
  data.slimbot.editMessageText(
    data.query.message.chat.id,
    data.query.message.message_id,
    emoji.emojify(`Сосед, напиши свой город, название улицы, номер дома для доставки одним сообщением`)
  )
};
export default confirmOrder;
