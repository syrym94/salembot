import {getCustomerOrder} from './util'
var emoji = require('node-emoji')

const cart = async data => {
  console.log("showing cart");
  //check if cart(customerOrder exists)
  const cart = await getCustomerOrder(data)
  if(!cart){
      data.slimbot.sendMessage(data.message.chat.id, emoji.emojify('Сосед, твоя корзина пока пуста, жми кнопку «Список продуктов :apple::croissant::cheese_wedge:», чтобы просмотреть товары, доступные в магазине!🥑'))
  }
};
export default cart;
