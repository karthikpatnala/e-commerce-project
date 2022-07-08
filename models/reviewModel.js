module.exports = (sequelize, DataTypes) => {

    const Review = sequelize.define("review", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        createdAt:{
            type: DataTypes.DATE,
            field:'created_at'   
        },
        updatedAt:{
            type: DataTypes.DATE ,
            field:'updated_at' 
        },

        rating: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        }
    },
    {freezeTableName:'review'})

    return Review

}