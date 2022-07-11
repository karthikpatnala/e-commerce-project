const {db} = require('../models/index.js')
const order = db.orders;

//apis
const getAllOrders = async (req, res) => {

   let ordersList = await order.findAll()
   res.status(200).send(ordersList)

}

const getAllOrdersPaginated = async (req, res) => {
      let ordersList = await order.findAll({
      limit: parseInt(req.query.limit),
      offset: parseInt(req.query.offset)
  })
       res.status(200).send(ordersList)
}

module.exports = {
   getAllOrders,
   getAllOrdersPaginated
};