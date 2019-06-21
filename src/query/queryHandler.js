import { hasSubGroup, showProducts, showSubGroup, isItem, showItemDescription } from "./catHandlers";
import { isCommandPressed,isCartActionPressed } from "./util";
import cartHandler from './cartHandler/cartHandler'
const query = async data => {
  console.log("bot_query: ");
  const isCommand = isCommandPressed(data.query.data, data);
  const isCartAction = isCartActionPressed(data.query.data, data)
  if(!isCartAction)
  {
    if (!isCommand) {
      const item = await isItem(data.query.data, data);
      if (!item) {
        const hasSub = await hasSubGroup(data); // either get subgroup items or get lost(return false)
        !hasSub ? showProducts(data) : showSubGroup(data, hasSub);
      } else {
        console.log("this is an item");
        showItemDescription(item, data)
        return
      }
    }
  }
  else
  {
    console.log('this is a cart action')
    cartHandler(isCartAction, data)
  }
};
export default query;
