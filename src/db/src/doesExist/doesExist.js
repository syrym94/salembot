import createNewUser from '../createNewUser/createNewUser'

const doesExist = async (data) =>{
    console.log('checking if user exists in DB')
    const user = await data.ms.GET('entity/counterparty', {
        filter: {
            code: data.message.from.id
        }
    })
    if(user.rows.length === 0){
        console.log('user does not exist')
        return false
    }
    console.log('user exists')
    return true
}
export default doesExist