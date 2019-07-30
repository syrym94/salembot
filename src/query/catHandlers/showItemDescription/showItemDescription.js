import { itemDesc } from "./util";
var emoji = require('node-emoji')

const showItemDescription = async (item, data) => {
  if (data.query.data === 'd1412b2f-611b-11e9-9ff4-31500011a224' || data.query.data === '9c4298d8-9d71-11e9-9107-5048000fb3c6' || data.query.data === '93986de0-9d95-11e9-912f-f3d4001482d3'){
    const msg = await itemDesc(item, data);
    const raw_service = await data.ms.GET(`entity/service/${data.query.data}`)
    const arr = [
    [
      {
        text: "Добавить в корзину",
        callback_data: JSON.stringify({ data: raw_service.id, action: "a" })
      }
    ],
    [{ text: emoji.emojify("Список продуктов :apple::croissant::cheese_wedge:"), callback_data: "/catalog" }],
    [{ text: "◀︎Назад", callback_data: raw_service.pathName }]
  ];
  const params = {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
      inline_keyboard: arr
    })
  };
  // console.log(raw_service.id,raw_service,params)
  data.slimbot.editMessageText(
    data.query.message.chat.id,
    data.query.message.message_id,
    msg,
    params
  );
  } else {
  const msg = await itemDesc(item, data);
  const arr = [
    [
      {
        text: "Добавить в корзину",
        callback_data: JSON.stringify({ data: item[0].id, action: "a" })
      }
    ],
    [{ text: emoji.emojify("Список продуктов :apple::croissant::cheese_wedge:"), callback_data: "/catalog" }],
    [{ text: "◀︎Назад", callback_data: item[0].productFolder.name }]
  ];
  const params = {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
      inline_keyboard: arr
    })
  };
  // const fetch = require("node-fetch");
  // const base64Auth = new Buffer(process.env.LOGIN + ':' + process.env.PASSWORD).toString(
  //   "base64"
  // );
  // const fetchOptions = {
  //   method: "GET",
  //   credentials: "include",
  //   headers: {
  //     Authorization: `Basic ${base64Auth}`
  //   },
  //   redirect: "manual"
  // };
  // console.log(item[0])
//   try {
//    async function getAdress() { await fetch(
//     `${item[0].image.miniature.href}`,
//     fetchOptions
//   )
//     .then(function(resp) {
//       if (resp.status === 302) {
//         adress = resp.headers.get("location");
//         return adress;
//       }
//       return null;
//     })
//     .catch(function(err) {
//       console.log(err);
//     })
//   return adress}
//   let adress =  await getAdress().then(data => data)
//   data.slimbot.sendPhoto(data.query.message.chat.id, adress)
// }
// catch(e){
//   console.log(e.message)
// }
    data.slimbot.sendMessage(
      data.query.message.chat.id,
      msg,
      params
    )
  }
};
export default showItemDescription;
