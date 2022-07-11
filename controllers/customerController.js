const {db} = require('../models/index.js')
const customer = db.customers;
const Order =db.orders;

//apis
const getAllCustomers = async (req, res) => {

    let customerList = await customer.findAll()

    res.status(200).send(customerList)

}

const getAllCustomersPaginated = async (req, res) => {

    let customerList = await customer.findAll({
        limit: parseInt(req.query.limit),
        offset: parseInt(req.query.offset)
    })

    res.status(200).send(customerList)

}


const getCustomerOrders =  async (req, res) => {

    const id = req.params.id

    const data = await customer.findOne({
        include: [{
            model: Order,
            as: 'orders'
        }],
        where: {customerId: id }
    })

    res.status(200).send(data)

}

module.exports = {
    getAllCustomers,
    getCustomerOrders,
    getAllCustomersPaginated 
};