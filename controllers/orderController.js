const {db} = require('../models/index.js')
const order = db.orders;

//apis
const getAllOrders = async (req, res) => {

   let ordersList = await order.findAll()

   res.status(200).send(ordersList)

}

module.exports = {getAllOrders};