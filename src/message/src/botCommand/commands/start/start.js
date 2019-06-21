import auth from "../../../../../db/auth";
var emoji = require('node-emoji')

const start = async data => {
  const doesUserExist = await auth(data);
  let keyboard;
  let msg;
  if (doesUserExist) {
    keyboard = [[{ text: emoji.emojify("Список продуктов :apple::croissant::cheese_wedge:")}], [{ text: "Корзина🛒" }]];
    msg = "Добро пожаловать в магазин \"Салем Сосед!\"";
  } else {
    keyboard = [
      [{ text: "Поделиться контактными данными", request_contact: true }]
    ];
    msg = "Салем, Сосед! Для просмотра продуктов, пожалуйста, зарегистрируйся.";
  }
  const params = {
    parse_mode: "Markdown",
    one_time_keyboard: true,
    reply_markup: JSON.stringify({
      keyboard: keyboard,
      resize_keyboard: true
    })
  };
  data.slimbot.sendMessage(data.message.chat.id, msg, params);
};
export default start;
