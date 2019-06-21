import Slimbot from "slimbot";

const slimbot = new Slimbot("812120217:AAFI4F_jf1wdOGkYfUX1uWVaxvdW9Qclius");

const showMessage = (text, id, slimbot) => {
  const params = {
    text,
    show_alert: true
  };
  slimbot.answerCallbackQuery(id, params);
};

const enterNumber = async data => {
  data.slimbot.on("message", message => {
    const data = { slimbot, message };
    var userNum = (+message.text)
  })
  showMessage(`Enter the desired number`, data.query.id, data.slimbot);
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
              let increasedOrder = await data.ms.PUT(
                `/entity/customerorder/${order.id}/positions/${
                  positions.rows[y].id
                }`,
                {
                  quantity:
                    positions.rows[y].quantity &&
                    Number(positions.rows[y].quantity) > 0
                      ? Number(positions.rows[y].quantity) + userNum
                      : 1
                }
              );
            }
          }
        }
      }
    }
  }
}
export default enterNumber;
