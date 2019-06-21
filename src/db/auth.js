import { doesExist } from "./src";
const auth = async (data) => {
  return await doesExist(data)
};
export default auth;
