const catalog = async data => {
  console.log("returning full catalog");
  const fullCatalog = await data.ms.GET(`/entity/productfolder`, {
    limit: 100,
    filter: {
      pathName: ""
    }
  });
  // const fullCatalog1 = await data.ms.GET(`/entity/productfolder/d1407d1a-611b-11e9-9ff4-31500011a220`)

  // console.log(fullCatalog1)
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
      item.name != "Рыба и морепродукты" &&
      item.name != "Кофейня" &&
      item.name != "La flore"
    ) {
      arr.push([{ text: item.name, callback_data: item.name }]);
    }
  });
      // arr.push([{ text: fullCatalog1.name, callback_data: fullCatalog1.name }]);

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
