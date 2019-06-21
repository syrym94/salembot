const hasSubGroup = async data => {
    const subGroup = await data.ms.GET('entity/productfolder', {
        filter: {
            pathName: data.query.data
        }
    })
    if(subGroup.rows.length === 0)
        return false
    return subGroup.rows
};
export default hasSubGroup;
