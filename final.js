(async function(brokerCompany, context){
    const instanceId =brokerCompany.instanceId;
    const ownerId = brokerCompany.owner.id;
    const team = brokerCompany.team.id
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
              limit : 2000
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
    async function testFunc(contactId) {
      if (contactId) {
        return context.freeagent.updateEntity({
          entity: 'contact',
          id: contactId,
          field_values: {
            lead_owner_id: ownerId,
            subteam_id: team,
          },
        });
      }
      return null;
  }

    
      await Promise.all(contactIds.forEach(testFunc));
  }(brokerCompany, context));