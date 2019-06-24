const createNewUser = async (data) =>{
    console.log('creating new user')
    const first_name = data.message.contact.first_name===undefined ? 'John ' : data.message.contact.first_name + " "
    const last_name = data.message.contact.last_name===undefined ? 'Doe' : data.message.contact.last_name
    const newUser = await data.ms.POST('entity/counterparty', {
        code: `${data.message.contact.user_id}`,
        name: `${first_name}${last_name}`,
        phone: data.message.contact.phone_number,
        description: `telegram: @${data.message.from.username}`,
        companyType: 'individual',
        tags: [ 'telegramclients' ]
    })
    console.log(newUser)
    return true
}
export default createNewUser