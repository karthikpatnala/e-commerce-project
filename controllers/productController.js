const {db} = require('../models/index.js')
const Product = db.products
const Review = db.reviews

// APIs
const addProduct = async (req, res) => {

let info = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description
    }

const product = await Product.create(info)
    res.status(200).send(product)
    console.log(product)

}


const getAllProductsPaginated = async (req, res) => {
   console.log(req.query.limit)
    let products = await Product.findAll({
        limit: parseInt(req.query.limit),
        offset: parseInt(req.query.offset)
    })

    res.status(200).send(products)

}
const getAllProducts = async (req, res) => {
    console.log(req.query.limit)
     let products = await Product.findAll({})
 
     res.status(200).send(products)
 
 }


const getOneProduct = async (req, res) => {

    let id = req.params.id
    console.log('id',id)
    let product = await Product.findOne({ where: { productId: id }})

    res.status(200).send(product)

}



const updateProduct = async (req, res) => {

    let id = req.params.id

    const product = await Product.update(req.body, { where: { productId: id }})

    res.status(200).send(product)
   

}



const deleteProduct = async (req, res) => {

    let id = req.params.id
    
    await Product.destroy({ where: { productId: id }} )

    res.status(200).send('Product is deleted !')

}


const getProductReviewsEager =  async (req, res) => {

    const id = req.params.id
    const data = await Product.findOne({
        include: [{
            model: Review,
            as: 'review'
        }],
        where: {productId: id }
    })
   res.status(200).send(data)

}

const getProductReviewsLazy =  async (req, res) => {
    const id = req.params.id 

    const product1 = await Product.findByPk(id);
    const review1  = await product1.getReview();
    res.status(200).send(review1)
    
}



module.exports = {
    addProduct, 
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getProductReviewsLazy,
    getProductReviewsEager,
    getAllProductsPaginated
    
}