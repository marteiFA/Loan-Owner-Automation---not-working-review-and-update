(async function (brokerCompany, context) {
    const instanceId = brokerCompany.instanceId;
    const ownerId = brokerCompany.owner.id;
    const getContacts = async () => {
      let response = await context.freeagent.listEntityValues({
        entity: "contact",
        filters: [
          {
            field_name: "logo_id",
            operator: "includes",
            values: [instanceId],
          },
        ],
        limit: 100,
      });
  return response;
};
    const contacts = await getContacts();
    
    contacts.map((contact) => {
        if(contact.id){
            return context.freeagent.updateEntity({
                entity: 'contact',
                id: contact.id,
                field_values:{
                    lead_owner_id: ownerId,
                    subteam_id: team,
                }
            })
        } else{
            return null
        }
    })
  
    const getLoans = async () => {
      let response2 = await context.freeagent.listEntityValues({
        entity: "deal",
        filters: [
          {
            field_name: "deal_field31",
            operator: "includes",
            values: contactIds,
          },
        ],
        limit: 100,
      });
  
      return response2.entity_values.map((e) => {
        const returnValue2 = {
          id: e.id,
        };
  
        return returnValue2;
      });
    };
    return { getLoans: getLoans };
    const loans = await getLoans();
    const dealIds = loans.map((deal) => deal.id);
    // async function testFunc(dealId) {
    //   if (dealId) {
    //     return context.freeagent.updateEntity({
    //       entity: "deal",
    //       id: dealId,
    //       field_values: {
    //         owner_id: ownerId,
    //       },
    //     });
    //   }
    //   return null;
    // }
    // await Promise.all(dealIds.forEach(testFunc));
  })(brokerCompany, context);


  //Loan Owner = owner_id


  loans.map((loan) => {
    if(loan.id){
        context.freeagent.updateEntity({
            entity: 'loan',
            id: loan.id,
            field_values:{
                owner_id: ownerId,
            }
        })
    } else{
        return null
    }
})