const showMessage = (text, id, slimbot) => {
  const params = {
    text,
    show_alert: true
  };
  slimbot.answerCallbackQuery(id, params);
};

const decrease = async data => {
  var emoji = require('node-emoji')
  let product = JSON.parse(data.query.data);
  const rawOrders = await data.ms.GET(`entity/customerorder`);
  let productID = product.data;
  let exactProduct = await data.ms.GET(`entity/product/${productID}`);
  for (let i = 0; i < rawOrders.rows.length; i++) {
    const agentInfo = await data.ms.GET(rawOrders.rows[i].agent.meta.href);
    if (agentInfo.code === String(data.query.from.id)) {
      console.log("Order exists!");
      const order = rawOrders.rows[i];
      if (order.positions.meta.size !== 0) {
        const positions = await data.ms.GET(
          `entity/customerorder/${order.id}/positions`,
          {
            expand: "assortment"
          }
        );
        let arr = [];
        for (let y = 0; y < positions.rows.length; y++) {
          if (positions.rows[y].assortment.id === exactProduct.id) {
            var newOrder = await data.ms.GET(
              `entity/customerorder/${order.id}/positions`,
              {
                expand: "assortment"
              }
            );
            if (
              newOrder.rows[y].assortment.id === positions.rows[y].assortment.id
            ) {
              if (
                positions.rows[y].quantity &&
                Number(positions.rows[y].quantity) > 1
              ) {
                let increasedOrder = await data.ms.PUT(
                  `/entity/customerorder/${order.id}/positions/${
                    positions.rows[y].id
                  }`,
                  {
                    quantity: Number(positions.rows[y].quantity) - 1
                  },
                  showMessage(
                    `Количество продукта уменьшено на 1 и равно ${positions
                      .rows[y].quantity - 1}`,
                    data.query.id,
                    data.slimbot
                  )
                );
              } else if (Number(positions.rows[y].quantity) === 1) {
                let increasedOrder = await data.ms.DELETE(
                  `/entity/customerorder/${order.id}/positions/${
                    positions.rows[y].id
                  }`,
                  showMessage(emoji.emojify(
                    "Продукт полностью удален из корзины, жми кнопку «Список продуктов :apple::croissant::cheese_wedge:» для добавления нового товара или «Корзина» для подтверждения заказа"),
                    data.query.id,
                    data.slimbot
                  )
                );
                let finalCheck = await data.ms.GET(
                  `/entity/customerorder/${order.id}`
                );
                if (finalCheck.positions.meta.size === 0) {
                  await data.ms.DELETE(`/entity/customerorder/${order.id}`),
                    data.slimbot.sendMessage(
                      data.query.from.id,
                      emoji.emojify("Сосед, твоя корзина пуста, жми кнопку «Список продуктов :apple::croissant::cheese_wedge:», чтобы просмотреть товары, доступные в магазине!🥑")
                    );
                }
              }
              arr.push([
                {
                  text: "+",
                  callback_data: JSON.stringify({
                    data: positions.rows[y].assortment.id,
                    action: "+"
                  })
                },
                {
                  text: "-",
                  callback_data: JSON.stringify({
                    data: positions.rows[y].assortment.id,
                    action: "-"
                  })
                }
              ]);
              const params = {
                parse_mode: "Markdown",
                reply_markup: JSON.stringify({
                  inline_keyboard: arr
                })
              };
              if (positions.rows[y].quantity  >= 2) {
                data.slimbot.sendMessage(
                  data.query.from.id,
                  `${
                    positions.rows[y].assortment.name
                  }, в количестве - ${positions.rows[y].quantity - 1} шт.`,
                  params
                );
              } else {
                console.log('empty')
              }
            }
          }
        }
      }
    }
  }
};
export default decrease;
// // if (!await data.ms.GET(`entity/customerorder/${order.id}/positions`)) {
//                   // data.slimbot.sendMessage(data.message.chat.id, 'Сосед, твоя корзина пуста, жми кнопку «Каталог🛒», чтобы просмотреть товары, доступные в магазине!🥑')
//                   console.log(data.ms.GET(`entity/customerorder/${order.id}`))
//                 // }
