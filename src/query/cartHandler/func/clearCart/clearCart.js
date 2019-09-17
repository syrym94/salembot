const showMessage = (text, id, slimbot) => {
  const params = {
    text,
    show_alert: true
  };
  slimbot.answerCallbackQuery(id, params);
};

const clearCart = async (data) => {
    let a =await data.ms.GET(`/entity/customerorder`)
    // let parsedOrderId = JSON.parse(data.query.data)
    // console.log(parsedOrderId.data)
    // console.log(a.rows[0].meta,'+++++',a.rows[0].owner,'_________',a.rows[0].agent,')))))))))',a.rows[0].documents)
    let b = a.rows[a.rows.length - 1].id 
    data.ms.DELETE(`https://online.moysklad.ru/api/remap/1.1/entity/customerorder/${b}`) 
    data.slimbot.sendMessage(data.query.from.id,`Сосед, твоя корзина опустела. Жми на «список продуктов», чтобы собрать корзину снова!`);
  //   let product = JSON.parse(data.query.data);
  // const rawOrders = await data.ms.GET(`entity/customerorder`);
  // let productID = product.data;
  // let exactProduct = await data.ms.GET(`entity/product/${productID}`);
  // for (let i = 0; i < rawOrders.rows.length; i++) {
  //   const agentInfo = await data.ms.GET(rawOrders.rows[i].agent.meta.href);
  //   if (agentInfo.code === String(data.query.from.id)) {
  //     console.log("Order exists!");
  //     const order = rawOrders.rows[i];
  //     if (order.positions.meta.size !== 0) {
  //       const positions = await data.ms.GET(
  //         `entity/customerorder/${order.id}/positions`,
  //         {
  //           expand: "assortment"
  //         }
  //       );
  //       for (let y = 0; y < positions.rows.length; y++) {
  //         if (positions.rows[y].assortment.id === exactProduct.id) {
  //           var newOrder = await data.ms.GET(
  //             `entity/customerorder/${order.id}/positions`,
  //             {
  //               expand: "assortment"
  //             }
  //           );
  //           if (newOrder.rows[y].assortment.id === positions.rows[y].assortment.id) {
  //             await data.ms.DELETE(`/entity/customerorder/${order.id}`
  //           )
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  }
export default clearCart;
