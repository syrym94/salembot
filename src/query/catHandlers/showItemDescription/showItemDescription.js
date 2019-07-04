import { itemDesc } from "./util";

const showItemDescription = async (item, data) => {
  if (data.query.data === 'd1412b2f-611b-11e9-9ff4-31500011a224' || data.query.data === '9c4298d8-9d71-11e9-9107-5048000fb3c6' || data.query.data === '93986de0-9d95-11e9-912f-f3d4001482d3'){
    const msg = await itemDesc(item, data);
    const raw_service = await data.ms.GET(`entity/service/${data.query.data}`)
    const arr = [
    [
      {
        text: "Добавить в корзину",
        callback_data: JSON.stringify({ data: raw_service.id, action: "a" })
      }
    ],
    [{ text: "Список продуктов🛒", callback_data: "/catalog" }],
    [{ text: "◀︎Назад", callback_data: raw_service.pathName }]
  ];
  const params = {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
      inline_keyboard: arr
    })
  };
  console.log(raw_service.id,raw_service,params)
  data.slimbot.editMessageText(
    data.query.message.chat.id,
    data.query.message.message_id,
    msg,
    params
  );
  } else {
  const msg = await itemDesc(item, data);
  const arr = [
    [
      {
        text: "Добавить в корзину",
        callback_data: JSON.stringify({ data: item[0].id, action: "a" })
      }
    ],
    [{ text: "Список продуктов🛒", callback_data: "/catalog" }],
    [{ text: "◀︎Назад", callback_data: item[0].productFolder.name }]
  ];
  const params = {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
      inline_keyboard: arr
    })
  };
  console.log(item[0].id,item[0].productFolder.name,params)
  data.slimbot.editMessageText(
    data.query.message.chat.id,
    data.query.message.message_id,
    msg,
    params
  );
  }
};
export default showItemDescription;
