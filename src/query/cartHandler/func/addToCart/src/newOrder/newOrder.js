import addToOrder from '../addToOrder/addToOrder'

const newOrder = async data => {
  const rawCounterParty = await data.ms.GET("entity/counterparty", {
    filter: {
      code: data.query.from.id
    }
  });
  console.log(rawCounterParty)
  const counterPartyID = rawCounterParty.rows[0].id;
  console.log(counterPartyID)
  const newOrder = await data.ms.POST("entity/customerorder", {
    organization: {
      meta: {
        href:
          "https://online.moysklad.ru/api/remap/1.1/entity/organization/f58eb26f-205d-11e9-9ff4-34e80000bb3a",
        metadataHref:
          "https://online.moysklad.ru/api/remap/1.1/entity/organization/metadata",
        type: "organization",
        mediaType: "application/json",
        uuidHref:
        "https://online.moysklad.ru/app/#MyCompany/edit?id=f58eb26f-205d-11e9-9ff4-34e80000bb3a"
      }
    },
    agent: {
      meta: {
        href: `https://online.moysklad.ru/api/remap/1.1/entity/counterparty/${counterPartyID}`,
        type: "counterparty",
        mediaType: "application/json"
      },
    }
  });
  console.log("successfuly created new EMPTY customer order\nnow adding item to the order");
  addToOrder(newOrder, data)
};
export default newOrder;
