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


const getCustomerOrdersEager =  async (req, res) => {

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

const getCustomerOrdersLazy =  async (req, res) => {

    const id = req.params.id 

    const customer1 = await customer.findByPk(id);
    const order1  = await customer1.getOrders();
    res.status(200).send(order1)

}

module.exports = {
    getAllCustomers,
    getCustomerOrdersEager,
    getCustomerOrdersLazy,
    getAllCustomersPaginated 
};