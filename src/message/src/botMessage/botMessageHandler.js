import { createNewUser } from "../../../db/src";
import { catalog, unknown, cart } from "../botDefault";
import { start } from "../botCommand/commands";
var emoji = require('node-emoji')

const botMessageHandler = async (data,num) => {
  console.log("message");
  console.log(`msg: ${data.message.text}`);
  switch (data.message.text) {
    case emoji.emojify("Список продуктов :apple::croissant::cheese_wedge:"):
      catalog(data);
      break;
    case "Корзина🛒":
      cart(data)
      break;
    case undefined:
      await createNewUser(data);
      data.slimbot.sendMessage(
        data.message.chat.id,
        "Ты успешно зарегистрирован в магазине!😊"
      );
      start(data);
      break;
    default:
      unknown(data);
  }
};
export default botMessageHandler;
