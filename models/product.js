module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("product", {
        productId:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field:'product_id'},

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        },
        
    
    },
   { freezeTableName:'product',
    timestamps:false
})

    return Product

}