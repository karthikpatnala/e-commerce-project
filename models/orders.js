module.exports = (sequelize, DataTypes) => {

    const Order = sequelize.define("orders", {
        orderId:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field:'order_id'}
               

     
    
    },
   { freezeTableName:'orders',
    timestamps:false
})

    return Order

}