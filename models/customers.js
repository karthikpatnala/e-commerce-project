module.exports = (sequelize, DataTypes) => {

    const Customer = sequelize.define("customers", {
        customerId:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'customer_id'},
        firstName:{
                type:DataTypes.STRING,
                field:'first_name'},
        lastName:{
                    type:DataTypes.STRING,
                   field:'last_name'}            
         },
   { freezeTableName:'customers',
    timestamps:false
})

    return Customer

}


