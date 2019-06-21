const isItem = async (el, data) => {
  try {
    const item = await data.ms.GET("entity/product", {
      filter: {
        id: el
      },
      expand: "country",
      expand: "productFolder"
    });
    return item.rows;
  } catch (err) {
    return false;
  }
};
export default isItem;
