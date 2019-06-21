const checkIfInOrder = async (orderID, productID, ms) => {
  console.log("checking if this item is in customerOrder");
  const orderItem = await ms.GET(`entity/customerorder/${orderID}/positions/`, {
    expand: "assortment"
  });
  let isItemInOrder = false
  for(let i = 0; i<orderItem.rows.length;i++){
    if(orderItem.rows[i].assortment.id === productID){
        isItemInOrder = true
        break
      }
  }
  return isItemInOrder;
};
export default checkIfInOrder;
