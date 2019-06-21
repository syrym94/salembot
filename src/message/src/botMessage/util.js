const isNumber = num => {
  const n = Number(num);
  if (isNaN(n)) {
    return false;
  }
    return n;
};
export default isNumber;
