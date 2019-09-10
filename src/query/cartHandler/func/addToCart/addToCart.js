import { newOrder, addToOrder } from "./src";

const addToCart = async data => {
  const newOrderUrlEncoded = await encodeURIComponent("Новый");
  const rawData = await data.ms.GET(
    `entity/customerorder?state.name=${newOrderUrlEncoded}`
  );
  let doesOrderExist = false;
  for (let i = 0; i < rawData.rows.length; i++) {
    const a = await data.ms.GET(rawData.rows[i].agent.meta.href);
    if (a.code === String(data.query.from.id)) {
      doesOrderExist = rawData.rows[i]
      break;
    }
  }
  if (!doesOrderExist) {
    console.log("order not found\ncreating new order");
    newOrder(data);
  } else {
    console.log("orded exists\nadding to existing order");
    console.log(doesOrderExist,'&&&&&&&&&&&',data);
    addToOrder(doesOrderExist ,data)
  }
};
export default addToCart;
