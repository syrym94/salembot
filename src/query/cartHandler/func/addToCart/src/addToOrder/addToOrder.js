import checkIfInOrder from "./util";
import cart from "../../../../../../message/src/botDefault/cart/cart"

const showMessage = (text, id, slimbot) => {
  const params = {
    text,
    show_alert: true
  };
  slimbot.answerCallbackQuery(id, params);
};

const addToOrder = async (order, data) => {
  const orderID = order.id;
  // console.log(order,'++++++++++')
  // let income = 
  // if(data.query === undefined)
  const rawProductData = JSON.parse(data.query.data);
  const productID = rawProductData.data;
  if (await checkIfInOrder(orderID, productID, data.ms)) {
    console.log("it is indeed in the order");

    showMessage("Товар уже в корзине, сосед!", data.query.id, data.slimbot);
  } else {
    const rawProduct = await data.ms.GET(`entity/product/${productID}`);
    console.log("it's not in the order\nadding this item to order");
    try {
      await data.ms.POST(`/entity/customerorder/${orderID}/positions`, {
        quantity: 1,
        price: rawProduct.salePrices[0].value,
        discount: 0,
        vat: 0,
        assortment: {
          meta: {
            href: `https://online.moysklad.ru/api/remap/1.1/entity/product/${productID}`,
            type: "product",
            mediaType: "application/json"
          }
        },
        reserve: 1
      });
      showMessage("Сосед, товар добавлен в корзину.", data.query.id, data.slimbot);
      if(productID === 'd1412b2f-611b-11e9-9ff4-31500011a224' || productID === '9c4298d8-9d71-11e9-9107-5048000fb3c6' || productID === '93986de0-9d95-11e9-912f-f3d4001482d3' || productID === 'cb51764a-d541-11e9-0a80-046a0004c4d0'){
        console.log('asdasdas')
        cart(data)
      }
    } catch (error) {
      console.log(error);
      data.slimbot.sendMessage(data.message.chat.id, "Произошла ошибка🤭");
    }
  }
};
export default addToOrder;
