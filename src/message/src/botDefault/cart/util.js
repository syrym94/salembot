const getCustomerOrder = async data => {
  const rawOrders = await data.ms.GET(`entity/customerorder`);
  for (let i = 0; i < rawOrders.rows.length; i++) {
    const agentInfo = await data.ms.GET(rawOrders.rows[i].agent.meta.href);
    if (agentInfo.code === String(data.message.from.id)) {
      console.log("Order exists!");
      const order = rawOrders.rows[i];
      exports.order = order;
      if (order.positions.meta.size !== 0) {
        const positions = await data.ms.GET(
          `entity/customerorder/${order.id}/positions`,
          {
            expand: "assortment"
          }
        );
        let arr = [];
        let booleanArr = []
        for (var y = 0; y < positions.rows.length; y++) {
            let a = positions.rows[y].assortment.name === "Доставка по Алматы" ||
              positions.rows[y].assortment.name ===
                "Доставка в другие города Казахстана" ||
              positions.rows[y].assortment.name === "Самовывоз с Тулебаева 114а"
              booleanArr[y] = a
              a++
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
        console.log(order)
        let numberedArr = booleanArr.sort()
        arr.push([
          { text: "Очистить корзину", callback_data: JSON.stringify({
            data: order.id,
            action: "c"
          }) }
        ]);
        for (let k = 0; k < arr.length; k++) {
          let innerArray = arr[k];
          for (let n = 0; n < innerArray.length; n++) {
            var inner2Array = innerArray[n];
          }
        }
        if(numberedArr[numberedArr.length - 1]){
        arr.push([
          {
            text: "Подытожить заказ",
            callback_data: JSON.stringify({
              data: order.id,
              action: "b"
            })
          }
        ]);} else {
        arr.push([
          {
            text: "Выберите метод доставки",
            callback_data: JSON.stringify({
              data: order.id,
              action: "f"
            })
          }
        ]);}

        const params = {
          parse_mode: "Markdown",
          reply_markup: JSON.stringify({
            inline_keyboard: arr
          })
        };
        data.slimbot.sendMessage(
          data.message.chat.id,
          `Сосед, все что ты собрал в списке ниже, если хочешь изменить заказ, просто жми на любую позицию!\nСумма: ${order.sum /
            100}тг\nИтого: ${order.sum / 100}тг`,
          params
        );
      }
      return true;
    }
  }
  return false;
};
export { getCustomerOrder };
