const itemDesc = async (item, data) => {
  console.log(data.query.data)
  if (data.query.data === 'd1412b2f-611b-11e9-9ff4-31500011a224' || data.query.data === '9c4298d8-9d71-11e9-9107-5048000fb3c6' || data.query.data === '93986de0-9d95-11e9-912f-f3d4001482d3' ){
    const raw_service = await data.ms.GET(`entity/service/${data.query.data}`)
    // console.log(raw_service)
    const name = `${raw_service.name}`
    const price = `${raw_service.salePrices[0].value/100} тенге`;
    const msg = [name, price]
    return msg.join("\n")
  } else {
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
  let description;
  if(item[0].description){
    description = 'Описание:\n' + item[0].description
  }else{
    description = '';
  }
  if ("country" in item[0]) {
    const countryJson = await data.ms.GET(item[0].country.meta.href);
    country = `${countryJson.description}`;
  }

  const msg = [name, country, price, description ];
  return msg.join("\n");
}
};
export { itemDesc };
