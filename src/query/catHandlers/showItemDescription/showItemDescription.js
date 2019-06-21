import { itemDesc } from "./util";

const showItemDescription = async (item, data) => {
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
  data.slimbot.editMessageText(
    data.query.message.chat.id,
    data.query.message.message_id,
    msg,
    params
  );
};
export default showItemDescription;
