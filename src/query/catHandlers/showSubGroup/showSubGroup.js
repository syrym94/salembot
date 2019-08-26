const showSubGroup = (data, sub) => {
  console.log("showing sub");
  let arr = [];
  sub.forEach((el, i) => {
    arr.push([{ text: el.name, callback_data: el.name }]);
  });
  arr.push([{text: "◀︎Назад", callback_data: `/catalog`}])
  const params = {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
      inline_keyboard: arr
    })
  };
  data.slimbot.editMessageText(
    data.query.message.chat.id,
    data.query.message.message_id,
    `Вы смотрите каталог товара:\n${sub[0].pathName}`,
    params
  );
  return
}
export default showSubGroup;
