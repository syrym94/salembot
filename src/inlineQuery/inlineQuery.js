import search from "../query/cartHandler/func/search/search";
const inlineQuery = async data => {
  const product = require('../../product.json')
  var exactFolder = await data.ms.GET(
    `https://online.moysklad.ru/api/remap/1.1/report/stock/all?store.id=f5a37aa8-77d8-11e9-912f-f3d400078b6b`,
    {
      limit: 100,
    }
  );
  var exactFolder2 = await data.ms.GET(
    `https://online.moysklad.ru/api/remap/1.1/report/stock/all?store.id=f5a37aa8-77d8-11e9-912f-f3d400078b6b`,
    {
      limit: 100,
      offset:100
    }
  );
  var exactFolder3 = await data.ms.GET(
    `https://online.moysklad.ru/api/remap/1.1/report/stock/all?store.id=f5a37aa8-77d8-11e9-912f-f3d400078b6b`,
    {
      limit: 100,
      offset:200
    }
  );
  var exactFolder4 = await data.ms.GET(
    `https://online.moysklad.ru/api/remap/1.1/report/stock/all?store.id=f5a37aa8-77d8-11e9-912f-f3d400078b6b`,
    {
      limit: 100,
      offset:300
    }
  );
  var exactFolder5 = await data.ms.GET(
    `https://online.moysklad.ru/api/remap/1.1/report/stock/all?store.id=f5a37aa8-77d8-11e9-912f-f3d400078b6b`,
    {
      limit: 100,
      offset:400
    }
  );
  var exactFolder6 = await data.ms.GET(
    `https://online.moysklad.ru/api/remap/1.1/report/stock/all?store.id=f5a37aa8-77d8-11e9-912f-f3d400078b6b`,
    {
      limit: 100,
      offset:500
    }
  );
  var exactFolder7 = await data.ms.GET(
    `https://online.moysklad.ru/api/remap/1.1/report/stock/all?store.id=f5a37aa8-77d8-11e9-912f-f3d400078b6b`,
    {
      limit: 100,
      offset:600
    }
  );
  var exactFolder8 = await data.ms.GET(
    `https://online.moysklad.ru/api/remap/1.1/report/stock/all?store.id=f5a37aa8-77d8-11e9-912f-f3d400078b6b`,
    {
      limit: 100,
      offset:700
    }
  );
  var exactFolder9 = await data.ms.GET(
    `https://online.moysklad.ru/api/remap/1.1/report/stock/all?store.id=f5a37aa8-77d8-11e9-912f-f3d400078b6b`,
    {
      limit: 100,
      offset:800
    }
  );
  var exactFolder10 = await data.ms.GET(
    `https://online.moysklad.ru/api/remap/1.1/report/stock/all?store.id=f5a37aa8-77d8-11e9-912f-f3d400078b6b`,
    {
      limit: 100,
      offset:900
    }
  );
  var exactFolder11 = await data.ms.GET(
    `https://online.moysklad.ru/api/remap/1.1/report/stock/all?store.id=f5a37aa8-77d8-11e9-912f-f3d400078b6b`,
    {
      limit: 100,
      offset:1000
    }
  );
  var exactFolder12 = await data.ms.GET(
    `https://online.moysklad.ru/api/remap/1.1/report/stock/all?store.id=f5a37aa8-77d8-11e9-912f-f3d400078b6b`,
    {
      limit: 100,
      offset:1100
    }
  );
  var exactFolder13 = await data.ms.GET(
    `https://online.moysklad.ru/api/remap/1.1/report/stock/all?store.id=f5a37aa8-77d8-11e9-912f-f3d400078b6b`,
    {
      limit: 100,
      offset:1200
    }
  );
  let arr = []
  function sort (entry){
    for(let i=0;i<entry.rows.length;i++){
      arr.push(entry.rows[i].name)
    }
    return arr
  }
  sort(exactFolder)
  sort(exactFolder2)
  sort(exactFolder3)
  sort(exactFolder4)
  sort(exactFolder5)
  sort(exactFolder6)
  sort(exactFolder7)
  sort(exactFolder8)
  sort(exactFolder9)
  sort(exactFolder10)
  sort(exactFolder11)
  sort(exactFolder12)
  sort(exactFolder13)
  let sortedArr = []
    for(let i=0;i<arr.length;i++){
      for(let j=0;j<product.length;j++){
        if(arr[i]===product[j].name){
        sortedArr.push(product[j])
        }
      }
    }
  search(data,sortedArr);
};
export default inlineQuery;
