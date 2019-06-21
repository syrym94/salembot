import { catalog, nextPage, previousPage } from "./catHandlers";
const isBackPressed = a => {
  if (a.includes("/b/")) {
    return true;
  }
  return false;
};
const isCommandPressed = (command, data) => {
  let iscommand = false;
  switch (command) {
    case "/catalog":
      catalog(data);
      iscommand = true;
      break;
    case "/nextPage":
      nextPage(data)
      iscommand = true;
      break;
    case "/previousPage":
      previousPage(data)
      iscommand = true;
      break;
    default:
      return iscommand;
  }
  return iscommand;
};
const isCartActionPressed = (command) => {
  if (
    /^[\],:{}\s]*$/.test(
      command
        .replace(/\\["\\\/bfnrtu]/g, "@")
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          "]"
        )
        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
    )
  ) {
    return JSON.parse(command)
  } else {
    return false;
  }
};
export { isBackPressed, isCommandPressed, isCartActionPressed };
