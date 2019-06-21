import isBotCommand from "./util";
import { botCommandHandler, botMessageHandler } from "./src";

const messageHandler = (data,num) => {
  console.log("bot_message typeof: ");
  isBotCommand(data) ? botCommandHandler(data) : botMessageHandler(data, num);
};
export default messageHandler;
