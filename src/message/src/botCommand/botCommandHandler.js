import { start, cart } from "./commands";
import { catalog, unknown } from "../botDefault";
const botCommandHandler = data => {
  console.log("command");
  const cmd = data.message.text;
  console.log(`cmd: ${cmd}`);
  switch (cmd) {
    case "/start":
      start(data);
      break;
    case "/cart":
      cart(data);
      break;
    case "/catalog":
      catalog(data);
      break;
    default:
      unknown(data);
  }
};
export default botCommandHandler;
