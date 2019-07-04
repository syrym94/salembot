import { addToCart } from "./func";
import  { clearCart } from "./func";
import { editCart } from "./func"
import { increase } from "./func"
import { decrease } from "./func"
import { confirmOrder } from "./func"
import { enterNumber } from "./func"
import { delivery } from "./func"

const cartHandler = (cartAction, data, num) => {
  switch (cartAction.action) {
    case "a":
      console.log("add item to the cart");
      addToCart(data);
      break;
    case "b":
      console.log('confirming order');
      confirmOrder(data);
      break;
    case "c":
      console.log("clearing cart");
      clearCart(data);
      break;
    case "e":
      console.log("edit cart item");
      editCart(data)
      break;
    case "d":
      console.log("entering the number");
      enterNumber(data,num)
      break;
    case "f":
      console.log("Choosing delivery method");
      delivery(data)
      break;
    case "+":
      console.log("incresing number of product");
      increase(data)
      break;
    case "-":
      console.log("decreasing number of product");
      decrease(data)
      break;
  }
};
export default cartHandler;
