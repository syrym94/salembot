const delivery = async data => {
  const raw_services = await data.ms.GET("entity/service", {
    filter: {
      pathName: "Доставка"
    }
  });
  let parsedOrder = JSON.parse(data.query.data);
  let customerOrder = await data.ms.GET(
    `entity/customerOrder/${parsedOrder.data}`
  );
  let arr = [];
  if (customerOrder.sum / 100 > 5000) {
    for (let i = 0; i < raw_services.rows.length; i++) {
      arr.push([
        {
          text: raw_services.rows[i].name,
          callback_data: raw_services.rows[i].id
        }
      ]);
      var callback =
        raw_services.rows[0].folder === undefined
          ? "/catalog"
          : exactFolder.rows[0].folder.pathName;
    }
  } else if(customerOrder.sum / 100 < 5000) {
    arr.push([
      {
        text: raw_services.rows[0].name,
        callback_data: raw_services.rows[0].id
      }
    ])
    var callback =
        raw_services.rows[0].folder === undefined
          ? "/catalog"
          : exactFolder.rows[0].folder.pathName;
  }
  arr.push([{ text: "◀︎Назад", callback_data: callback }]);
  const params = {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
      inline_keyboard: arr
    })
  };
  data.slimbot.editMessageText(
    data.query.message.chat.id,
    data.query.message.message_id,
    `${raw_services.rows[0].pathName}\nОсуществляется при заказе от 5000 тенге, сосед.`,
    params
  );
}

export default delivery;
