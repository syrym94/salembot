const previousPage = async data => {
    console.log("showing products");
    const raw_products = await data.ms.GET("entity/product", {
      limit: 40,
      offset: 0,
      expand: 'country',
      expand: "productFolder",
      expand: "uom",
      filter:{
          pathName: {
              $et: data.query.message.text,
          }
      }
    });
    const products = [...raw_products.rows]
    let arr = []
    products.forEach((el, i )=>{
      arr.push([{text: el.name, callback_data: el.id}])
    })
    if (raw_products.meta.previousHref)
      arr.push([{text: 'Предыдущая страница', callback_data:'/previousPage'}])
    if (raw_products.meta.nextHref)
    arr.push([{text: 'Следующая страница', callback_data:'/nextPage'}])
    const callback = products[0].productFolder.pathName === undefined ? "/catalog" : products[0].productFolder.pathName
  
    arr.push([{text: "◀︎Назад к категориям", callback_data: callback}])
    const params = {
      parse_mode: "Markdown",
      reply_markup: JSON.stringify({
        inline_keyboard: arr
      })
    };
    data.slimbot.editMessageText(
      data.query.message.chat.id,
      data.query.message.message_id,
      `${products[0].pathName}`,
        params
    );
    return
  };
export default previousPage