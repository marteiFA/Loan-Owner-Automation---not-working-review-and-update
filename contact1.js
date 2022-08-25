(async function (contact, context) {
    const brokerCompanyId = contact.account.id;
    const instanceId = contact.instanceId  

    const company = await context.freeagent.listEntityValues({
      entity: "logo",
      filters: [
        {
          field_name: "id",
          operator: "equals",
          values: brokerCompanyId,
        },
      ],
      limit: 1,
    });

    return context.freeagent.updateEntity({
        entity: 'contact',
        id: instanceId,
        field_values: {
            subteam_id: company.subteam_id.value,
        },
      });
  }(contact, context));