module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("users", {
        fullName:{
            type:DataTypes.STRING,
           },
        userName:{
                type:DataTypes.STRING,
                primaryKey: true
                },
        password:{
                    type:DataTypes.STRING,
                   }            
         },
   { freezeTableName:'users',
    timestamps:false
})

    return Users

}




