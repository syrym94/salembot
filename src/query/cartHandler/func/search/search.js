import Fuse from "fuse.js";
const product = require("../../../../../product.json");
const search = async data => {
  var options = {
    shouldSort: true,
    includeScore: true,
    threshold: 0.2,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["name"]
  };
  var fuse = new Fuse(product, options);

  let item = fuse.search(data.query.query);
  let arr = []
  for (let i = 0; i < item.length; i++) {
    arr.push([
      {
        text: item[i].item.name,
        callback_data: item[i].item.id
      }]
    )
  }
  const params = {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
      inline_keyboard: arr
    })
  };
  data.slimbot.sendMessage(
      data.query.from.id,
      `Результаты поиска`,
      params
    );
};
export default search;