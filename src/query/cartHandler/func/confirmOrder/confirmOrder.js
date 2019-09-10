var emoji = require('node-emoji')

var messageFromUser = require("../../../../../index");
const showMessage = (text, id, slimbot) => {
  const params = {
    text,
    show_alert: true
  };
  slimbot.answerCallbackQuery(id, params);
};

const confirmOrder = async data => {
  var incomingOrder = require('../../../../message/src/botDefault/cart/util')
  if(messageFromUser.mes === 'Корзина🛒'){
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
  data.slimbot.editMessageText(
    data.query.message.chat.id,
    data.query.message.message_id,
    emoji.emojify(`Сосед, напиши свой город, название улицы, номер дома для доставки одним сообщением и жми кнопку “подтвердить заказ”:grin:`),
    params
  )
  const rawData = await data.ms.PUT(
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
  } else {
  showMessage(emoji.emojify(`Рахмет, сосед, заказ принят, мы свяжемся с тобой по указаному в telegram номеру, чтобы уточнить детали :rocket:`), data.query.id, data.slimbot)
  data.slimbot.sendMessage(
    '@salemsosedtelegram',`Новый заказ`)
  }

  if(messageFromUser.mes !== undefined && messageFromUser.mes !== 'Корзина🧩'){
  let counterparty = await data.ms.GET(
    `entity/counterparty`,{filter: {
      code: data.query.from.id},
    }
  );
  let address = await data.ms.PUT(`entity/counterparty/${counterparty.rows[0].id}`,{ actualAddress: `${messageFromUser.mes}` },)
  }
  // data.slimbot.on("message", message => {
  //   data.slimbot.sendMessage(
  //     data.query.from.id,
  //     `Ваш заказ принят! В скором времени мы свяжемся с вами`
  //   );
  // });

  // let orderID = JSON.parse(data.query.data)
  // let orderConfirm = await data.ms.GET(`entity/customerorder/${orderID.data}`)

  //   let chat_id = data.query.from.id
  //   let title = 'Корзина'
  //   let description = ' Цена за все продукты в Корзине'
  //   let need_name = true
  //   let need_phone_number = true
  //   let need_shipping_address = true
  //   let payload = 'invoice_number'
  //   let provider_token = '410694247:TEST:36e662b8-0b87-4eea-9a76-3d8546d7a5be'
  //   let start_parameter = 'Some_param_123'
  //   let is_flexible = true
  //   let currency = 'KZT'
  //   let prices = JSON.stringify([{label: 'Корзина', amount: orderConfirm.sum }])
  //   data.slimbot.sendInvoice(chat_id,title, description, payload, provider_token,start_parameter, currency, prices,is_flexible,need_name, need_phone_number,need_shipping_address)
  //   data.slimbot.on('successful_payment', (data) => {
  //   console.log(`${data.query.from.first_name} just payed ${data.slimbot.successful_payment.total_amount / 100} KZT.`)
  // })

  //   data.slimbot.sendMessage(
  //     data.query.from.id,
  //     `В вашей корзине количество наименований товаров - ${orderConfirm.positions.meta.size}  \nНа сумму ${orderConfirm.sum /
  //       100} тенге`
  //   );
  // data.slimbot.sendMessage(
  //   '@salemsosedtelegram',`New Order from ${data.query.from.first_name}`)
  // console.log(messageFromUser.mes,'+++++++++++++',data)
  // data.slimbot
  //   .sendMessage(
  //     data.query.from.id,
  //     `Ваш заказ принят! В скором времени мы свяжемся с вами`,
  //   )
};
export default confirmOrder;
