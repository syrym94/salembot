const unknown= async (data) =>{
    var messageFromUser = require("../../../../../index");
    var incomingOrder = require('../cart/util')
    let arr = []
    arr.push(
        [
          {
            text: "Подтвердить заказ",
            callback_data: JSON.stringify({
              data: incomingOrder.order.id,
              action: "q"
          })}
        ]
        )
      const params = {
        parse_mode: "Markdown",
        reply_markup: JSON.stringify({
          inline_keyboard: arr
        })
      };
      console.log(data)
  let counterparty = await data.ms.GET(
    `entity/counterparty`,{filter: {
      code: data.message.from.id},
    }
  );
    let address = await data.ms.PUT(`entity/counterparty/${counterparty.rows[0].id}`,{ actualAddress: `${messageFromUser.mes}` },)
    data.slimbot.sendMessage(data.message.from.id, 'Сосед, жми на кнопку «подтвердить заказ»',params)
    await data.ms.PUT(
        `entity/customerorder/${incomingOrder.order.id}`,
        {
          state: {
            meta: {
            href: 'https://online.moysklad.ru/api/remap/1.1/entity/customerorder/metadata/states/f5a40ec5-205d-11e9-9ff4-34e80000bb5f',
            metadataHref: 'https://online.moysklad.ru/api/remap/1.1/entity/customerorder/metadata',
            type: 'state',
            mediaType: 'application/json'
          },
            name: 'Подтвержден'
          }
        }
      )
    // console.log("unknown command",data)
    // data.slimbot.sendMessage(data.message.chat.id, `Такой команды нет`)
}
export default unknown