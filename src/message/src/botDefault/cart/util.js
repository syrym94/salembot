import addToOrder from "../../../../query/cartHandler/func/addToCart/src/addToOrder/addToOrder";
import cart from "./cart";
var emoji = require("node-emoji");
const getCustomerOrder = async data => {
  let momentArr = [];
  const rawOrders = await data.ms.GET(`entity/customerorder`);
  for (let i = 0; i < rawOrders.rows.length; i++) {
    for (let m = 0; m < rawOrders.rows.length; m++) {
      momentArr.push(rawOrders.rows[m].moment);
    }
    let orderByMoment = await data.ms.GET(`entity/customerorder`, {
      filter: {
        moment: momentArr[momentArr.length - 1]
      }
    });
    const order = orderByMoment.rows[0];
    exports.order = order;
    let currentOrder = await data.ms.GET(`entity/customerorder/${order.id}`, {
      expand: "state"
    });
    if(currentOrder.positions.meta.size === 0 && i === 0) 
    {
      data.slimbot.sendMessage(
        data.message.from.id,
        emoji.emojify(
          "Сосед, твоя корзина пока пуста, жми кнопку «Список продуктов :apple::croissant::cheese_wedge:», чтобы просмотреть товары, доступные в магазине!🥑"
        )
      );
      console.log(data)
    } else {
      if (currentOrder.state.name === "Подтвержден") {
        const rawCounterParty = await data.ms.GET("entity/counterparty", {
          filter: {
            code: data.message.from.id
          }
        });
        // console.log(rawCounterParty)
        const counterPartyID = rawCounterParty.rows[0].id;
        const newOrder = await data.ms.POST("entity/customerorder", {
          organization: {
            meta: {
              href:
                "https://online.moysklad.ru/api/remap/1.1/entity/organization/f58eb26f-205d-11e9-9ff4-34e80000bb3a",
              metadataHref:
                "https://online.moysklad.ru/api/remap/1.1/entity/organization/metadata",
              type: "organization",
              mediaType: "application/json",
              uuidHref:
                "https://online.moysklad.ru/app/#MyCompany/edit?id=f58eb26f-205d-11e9-9ff4-34e80000bb3a"
            }
          },
          agent: {
            meta: {
              href: `https://online.moysklad.ru/api/remap/1.1/entity/counterparty/${counterPartyID}`,
              type: "counterparty",
              mediaType: "application/json"
            }
          }
        });
        addToOrder(newOrder, data);
      } else {
        if (order.positions.meta.size !== 0) {
          const positions = await data.ms.GET(
            `entity/customerorder/${order.id}/positions`,
            {
              expand: "assortment"
            }
          );
          let arr = [];
          let booleanArr = [];
          for (var y = 0; y < positions.rows.length; y++) {
            let a =
              positions.rows[y].assortment.name ===
                "Доставка по Алматы через Glovo" ||
              positions.rows[y].assortment.name ===
                "Доставка в другие города Казахстана" ||
              positions.rows[y].assortment.name ===
                "Самовывоз с Тулебаева 114а";
            booleanArr[y] = a;
            a++;
            arr.push([
              {
                text: `${positions.rows[y].assortment.name} - ${positions.rows[
                  y
                ].assortment.salePrices[0].value / 100}тг - ${
                  positions.rows[y].quantity
                }шт\n`,
                callback_data: JSON.stringify({
                  data: positions.rows[y].assortment.id,
                  action: "e"
                })
              }
            ]);
          }
          // console.log(order)
          let numberedArr = booleanArr.sort();
          arr.push([
            {
              text: "Очистить корзину",
              callback_data: JSON.stringify({
                data: order.id,
                action: "c"
              })
            }
          ]);
          for (let k = 0; k < arr.length; k++) {
            let innerArray = arr[k];
            for (let n = 0; n < innerArray.length; n++) {
              var inner2Array = innerArray[n];
            }
          }
          if (numberedArr[numberedArr.length - 1]) {
            arr.push([
              {
                text: "Подытожить заказ",
                callback_data: JSON.stringify({
                  data: order.id,
                  action: "b"
                })
              }
            ]);
          } else {
            arr.push([
              {
                text: "Выберите метод доставки",
                callback_data: JSON.stringify({
                  data: order.id,
                  action: "f"
                })
              }
            ]);
          }

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
      return false;
    }
  }
};
export { getCustomerOrder };
