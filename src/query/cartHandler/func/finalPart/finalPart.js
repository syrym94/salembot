import catalog from '../../../../message/src/botDefault/catalog/catalog'
const showMessage = (text, id, slimbot) => {
  const params = {
    text,
    show_alert: true
  };
  slimbot.answerCallbackQuery(id, params);
};

const finalPart = async data => {
  showMessage("Сосед, рахмет за заказ", data.query.id, data.slimbot);
  catalog(data)
  data.slimbot.sendMessage('@SSteleg','Новый заказ')
}
export default finalPart;
