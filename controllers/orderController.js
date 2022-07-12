const {db} = require('../models/index.js')
const order = db.orders;
const Product=db.products;
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


const getOrderedProductsEager =  async (req, res) => {

   const id = req.params.id

   const data = await order.findOne({
       include: [{
           model:Product ,
           as: 'product'
       }],
       where: {orderId: id }
   })

   res.status(200).send(data)

}

const getOrderedProductsLazy =  async (req, res) => {

   const id = req.params.id 

   const order1 = await order.findByPk(id);
   const product1  = await order1.getProduct();
   res.status(200).send(product1)

}

module.exports = {
   getAllOrders,
   getAllOrdersPaginated,
   getOrderedProductsEager,
   getOrderedProductsLazy

};