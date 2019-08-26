const showMessage = (text, id, slimbot) => {
  const params = {
    text,
    show_alert: true
  };
  slimbot.answerCallbackQuery(id, params);
};
const showItems = async data => {
  var emoji = require("node-emoji");
  console.log("showing products");
  const raw_folders = await data.ms.GET("entity/productfolder", {
    limit: 100
  });
  if (data.query.data === "Доставка") {
    let arr = [];
    const raw_services = await data.ms.GET("entity/service", {
      filter: {
        pathName: data.query.data
      }
    });
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
      `${raw_services.rows[0].pathName}`,
      params
    );
    return;
  } else {
    for (let i = 0; i < raw_folders.rows.length; i++) {
      if (raw_folders.rows[i].name === data.query.data) {
        var exactFolder = await data.ms.GET(
          `https://online.moysklad.ru/api/remap/1.1/report/stock/all?store.id=f5a37aa8-77d8-11e9-912f-f3d400078b6b&productFolder.id=${
            raw_folders.rows[i].id
          }`
        );
      }
    }
    // console.log(exactFolder)
    if (exactFolder.meta.size === 0) {
      data.slimbot.sendMessage(
        data.query.from.id,
        emoji.emojify(
          `Сосед, в этой категории пока ничего нет, попробуй другой раздел :slightly_smiling_face:`
        )
      );
    } else {
      const raw_products = await data.ms.GET("entity/product", {
        limit: 100,
        expand: "country",
        expand: "productFolder",
        expand: "uom",
        filter: {
          pathName: {
            $et: data.query.data
          }
        }
      });
      let arr = [];
      for (let i = 0; i < exactFolder.rows.length; i++) {
        for (let y = 0; y < raw_products.rows.length; y++) {
          if (
            exactFolder.rows[i] !== undefined &&
            exactFolder.rows[i].name === raw_products.rows[y].name
          ) {
            if (
              exactFolder.rows[i].folder.pathName === "Фрукты, овощи и зелень"
            ) {
              if (exactFolder.rows[i].stock > 0.2) {
                var callback =
                  exactFolder.rows[0].folder.pathName === undefined
                    ? "/catalog"
                    : exactFolder.rows[0].folder.pathName;
                arr.push([
                  {
                    text: raw_products.rows[y].name,
                    callback_data: raw_products.rows[y].id
                  }
                ]);
              }
            } else {
              if (exactFolder.rows[i].stock > 0.2) {
                var callback =
                  exactFolder.rows[0].folder.pathName === undefined
                    ? "/catalog"
                    : exactFolder.rows[0].folder.pathName;
                arr.push([
                  {
                    text: raw_products.rows[y].name,
                    callback_data: raw_products.rows[y].id
                  }
                ]);
              }
            }
          }
          else if(exactFolder.rows[i] === undefined){
            showMessage("Категория пуста", data.query.id, data.slimbot);
          }
        }
      }

      if (exactFolder.meta.size > 100) {
        arr.push([{ text: "Следующая страница", callback_data: "/nextPage" }]);
      }
      arr.push([{ text: "◀︎Назад", callback_data: callback }]);
        var params = {
          parse_mode: "Markdown",
          reply_markup: JSON.stringify({
            inline_keyboard: arr
          })
        };
      data.slimbot.editMessageText(
        data.query.message.chat.id,
        data.query.message.message_id,
        `${raw_products.rows[0].pathName}`,
        params
      );
      return;
    }
  }

};
export default showItems;

// const showItems = async data => {
//   console.log("showing products");
//   const raw_products = await data.ms.GET("entity/product", {
//     limit: 25,
//     expand: 'country',
//     expand: "productFolder",
//     filter:{
//         pathName: {
//             $et: data.query.data,
//         }
//     }
//   });
// //   if(raw_products.meta.size > 25){
// //   var raw_products2 = await data.ms.GET("entity/product", {
// //     limit: 20,
// //     offset: 26,
// //     expand: 'country',
// //     expand: "productFolder",
// //     filter:{
// //         pathName: {
// //             $et: data.query.data,
// //         }
// //     }
// //   });
// // }
// // if(raw_products.meta.size > 45){
// //   var raw_products3 = await data.ms.GET("entity/product", {
// //     limit: 20,
// //     offset: 46,
// //     expand: 'country',
// //     expand: "productFolder",
// //     filter:{
// //         pathName: {
// //             $et: data.query.data,
// //         }
// //     }
// //   });
// // }
//   // console.log(raw_products3,'++++++++++++++++++++++++')
//   const products = [...raw_products.rows]
//   let arr = []
//   products.forEach((el, i )=>{
//     arr.push([{text: el.name, callback_data: el.id}])
//   })
//   // const products2 = [...raw_products2.rows]
//   // products2.forEach((el2, i2 )=>{
//   //   arr.push([{text: el2.name, callback_data: el2.id}])
//   // })
//   // const products3 = [...raw_products3.rows]
//   // products3.forEach((el3, i3 )=>{
//   //   arr.push([{text: el3.name, callback_data: el3.id}])
//   // })
//   const callback = products[0].productFolder.pathName === undefined ? "/catalog" : products[0].productFolder.pathName

//   arr.push([{text: "◀︎Назад", callback_data: callback}])
//   const params = {
//     parse_mode: "Markdown",
//     reply_markup: JSON.stringify({
//       inline_keyboard: arr
//     })
//   };
//   data.slimbot.editMessageText(
//     data.query.message.chat.id,
//     data.query.message.message_id,
//     `${products[0].pathName}`,
//     params
//   );
//   return
// };
// export default showItems;
