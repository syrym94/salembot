const itemDesc = async (item, data) => {
  const name = `${item[0].name}`;

  // const rawDescription = item[0].description === undefined ? 'Отсутствует' : item[0].description
  // const description = `Описание: ${rawDescription}`;
  const rawPrice = item[0].salePrices[0].value / 100;

  const weight = (item[0].weight === 0 || item[0].weight === 1) ? "" : `${item[0].weight} `;

  const uomJson = await data.ms.GET(item[0].meta.href);
  let price = ``
  if(uomJson.uom !== undefined){
    let uom = await data.ms.GET(uomJson.uom.meta.href)
    price = `${rawPrice} тенге за ${weight}${uom.name}`
  } else {
    price = `${rawPrice} тенге`;
  }
  let country = "";
  if ("country" in item[0]) {
    const countryJson = await data.ms.GET(item[0].country.meta.href);
    country = `${countryJson.description}`;
  }

  const msg = [name, country, price ];
  return msg.join("\n");
};
export { itemDesc };
