const catalog = async data => {
  console.log("returning full catalog");
  const fullCatalog = await data.ms.GET(`/entity/productfolder`, {
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
  data.slimbot.sendMessage(
    data.message.chat.id,
    "Сосед, в этом разделе ты можешь просмотреть полный список продуктов магазина Салем, Сосед!",
    params
  );
};
export default catalog;
