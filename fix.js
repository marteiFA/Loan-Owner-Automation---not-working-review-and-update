(async function(brokerCompany, context){
    const instanceId = brokerCompany.instanceId;
        const ownerId = brokerCompany.owner.id;
           const getContacts = async () => {
           let response = await context.freeagent.listEntityValues({
               entity : "contact",
               filters : [
                   {
                       field_name : "logo_id",
                       operator : "includes",
                       values : [instanceId]
                   }
               ], 
               limit : 100
           });
   
           return response.entity_values.map((e) => {
                 const returnValue = {
                   id : e.id,
                     
               }
                 
                 return returnValue;
           })
   }
    const contacts = await getContacts()
   const contactIds = contacts.map((contact) => contact.id)
   
   
   const getLoans = async () => {
           let response2 = await context.freeagent.listEntityValues({
               entity : "deal",
               filters : [
                   {
                       field_name : "deal_field31",
                       operator : "includes",
                       values : contactIds
                   }
               ], 
               limit : 100
           });
   
           return response2.entity_values.map((e) => {
                 const returnValue2 = {
                   id : e.id,
                     
               }
                 
                 return returnValue2;
           })
   }
    const loans = await getLoans()
   const dealIds = loans.map((deal) => deal.id)
   async function testFunc(dealId) {
       if (dealId) {
         return context.freeagent.updateEntity({
           entity: 'deal',
           id: dealId,
           field_values: {
             owner_id: ownerId,
           },
         });
       }
       return null;
     }
       await Promise.all(dealIds.forEach(testFunc));
   }(brokerCompany, context));