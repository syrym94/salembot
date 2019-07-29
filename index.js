import Moysklad from "moysklad";
import Slimbot from "slimbot";
import { queryHandler, messageHandler } from "./src";
import date from "date-and-time";
import "app-module-path/register";

require("dotenv").config();
require("isomorphic-fetch");

const slimbot = new Slimbot(process.env.TOKEN);
const ms = Moysklad({
  login: process.env.LOGIN,
  password: process.env.PASSWORD
});

slimbot.on("message", message => {
  const data = { slimbot, ms, message };
  console.log(
    "################################################################"
  );
  let now = new Date();
  console.log(
    date.format(now, "YYYY/MM/DD HH:mm:ss") + " from user: " + message.from.id
  );
  exports.mes = message.text
  messageHandler(data)
});
slimbot.on("callback_query", query => {
  const data = { slimbot, ms, query };
  // Get the callback data specified
  let callback_data = data.data;
  console.log(
    "################################################################"
  );
  let now = new Date();
  console.log(
    date.format(now, "YYYY/MM/DD HH:mm:ss") + " from user: " + query.from.id
  );
  queryHandler(data);
});

slimbot.startPolling();

/*
    what am i? - a telegram bot
    what is my purpose? - recieve orders and earn munhey
    what language am i written in? - NodeJS
    what package am i wrtten in? - slimbot
    why? - because i said so
    babel? - yes
    import/export? - yes
    existential crisis? - a bit, yes
*/
