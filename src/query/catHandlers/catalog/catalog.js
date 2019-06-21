const catalog = async data => {
  console.log("pressed query /catalog\nreturning full catalog");
  const fullCatalog = await data.ms.GET("/entity/productfolder", {
    limit: 100,
    filter: {
      pathName: ""
    }
  });
  let arr = [];
  fullCatalog.rows.forEach((item, i) => {
    if (
      item.name != "Алкоголь" &&
      item.name != "Доставка" &&
      item.name != "Сигареты" &&
      item.name != "Лекции" &&
      item.name != "Упаковка" &&
      item.name != "Замороженные ягоды и овощи" &&
      item.name != "Кулинария" &&
      item.name != "Подарки" &&
      item.name != "Куриные продукты" &&
      item.name != "Рыба и морепродукты"
    ) {
      arr.push([{ text: item.name, callback_data: item.name }]);
    }
  });
  const params = {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
      inline_keyboard: arr
    })
  };
  data.slimbot.editMessageText(
    data.query.message.chat.id,
    data.query.message.message_id,
    "В этом разделе вы можете просмотреть полный список товаров магазина Салем, Сосед!",
    params
  );
};
export default catalog;
