const dbConfig = require('../dbConfig.js');

const {Sequelize,DataTypes} = require('sequelize');

 const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        define: {
            timestamps: false
          },
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)
sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})


const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize




db.products = require('./product.js')(sequelize, DataTypes)
db.reviews = require('./review.js')(sequelize, DataTypes)
db.orders = require('./orders.js')(sequelize, DataTypes)
db.customers = require('./customers.js')(sequelize, DataTypes)
// db.sequelize.sync({alter:true})
//  .then(() => {
//      console.log('re sync applied successfully!')
// })


db.products.hasMany(db.reviews, {
    foreignKey: 'product_id',
    as: 'review'
})

db.reviews.belongsTo(db.products, {
    foreignKey: 'product_id',
    as: 'product'
})

db.customers.hasMany(db.orders, {
    foreignKey: 'customer_id',
    as: 'orders'
})
db.orders.belongsTo(db.customers,{
    foreignKey: 'customer_id',
    as: 'customers'

})

db.orders.hasMany(db.products, {
    foreignKey: 'order_id',
    as: 'product'
})
db.products.belongsTo(db.orders, {
 foreignKey: 'order_id',
 as: 'orders'
})
module.exports = {db,sequelize}