const getCustomerOrder = async data => {
  const rawOrders = await data.ms.GET(`entity/customerorder`);
  for (let i = 0; i < rawOrders.rows.length; i++) {
    const agentInfo = await data.ms.GET(rawOrders.rows[i].agent.meta.href);
    if (agentInfo.code === String(data.message.from.id)) {
      console.log("Order exists!");
      const order = rawOrders.rows[i];
      exports.order = order
      if (order.positions.meta.size !== 0) {
        const positions = await data.ms.GET(
          `entity/customerorder/${order.id}/positions`,
          {
            expand: "assortment"
          }
        );
        let arr = [];
        for (var y = 0; y < positions.rows.length; y++) {
          arr.push([
            {
              text: `${positions.rows[y].assortment.name} - ${positions.rows[y]
                .assortment.salePrices[0].value / 100}тг - ${
                positions.rows[y].quantity
              }шт\n`,
              callback_data: JSON.stringify({
                data: positions.rows[y].assortment.id,
                action: "e"
              })
            }
          ]);
        }
        arr.push([
          { text: "Очистить корзину", callback_data: '{"action": "c"}' }
        ]);
        arr.push([{text:"Подытожить заказ", callback_data: JSON.stringify({
          data: order.id,
          action: "b"
        })}])
        const params = {
          parse_mode: "Markdown",
          reply_markup: JSON.stringify({
            inline_keyboard: arr
          })
        };
        data.slimbot.sendMessage(
          data.message.chat.id,
          `Сосед, все что ты собрал в списке ниже, если хочешь изменить заказ, просто жми на любую позицию!\nСумма: ${order.sum /
            100}тг\nДоставка: 1000тг\nИтого: ${order.sum /
              100 + 1000}тг`,
          params
        );
      }
      return true;
    }
  }
  return false;
};
export { getCustomerOrder };
