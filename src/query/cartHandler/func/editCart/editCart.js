const editCart = async data => {
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
            var outer = positions.rows[y]
            arr.push(
              [
                {
                  text: "+",
                  callback_data: JSON.stringify({
                    data: positions.rows[y].assortment.id,
                    action: '+'})
                },
                {
                  text: "-",
                  callback_data: JSON.stringify({
                    data: positions.rows[y].assortment.id,
                    action: '-'})
                }
                // {
                //   text: "Enter desired number",
                //   callback_data: JSON.stringify({
                //     data: positions.rows[y].assortment.id,
                //     action: 'd'})
                // }
              ]
            );
          }
        }
        const params = {
          parse_mode: "Markdown",
          reply_markup: JSON.stringify({
            inline_keyboard: arr
          })
        };
        data.slimbot.sendMessage(
          data.query.from.id,
          ` Сосед, чтобы изменить количество жми плюс/минус, если хочешь удалить товар из корзины, жми до нуля.\n${outer.assortment.name} ,количество - ${
            outer.quantity}`,
          params
        );
      }
    }
  }
};
export default editCart;
