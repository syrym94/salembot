import catalog from '../../../../message/src/botDefault/catalog/catalog'
const showMessage = (text, id, slimbot) => {
  const params = {
    text,
    show_alert: true
  };
  slimbot.answerCallbackQuery(id, params);
};

const finalPart = async data => {
  console.log(data, '********')
  showMessage("Сосед, рахмет за заказ, если хочешь сформировать новый - жми список продуктов!", data.query.id, data.slimbot);
  catalog(data)
}
export default finalPart;
