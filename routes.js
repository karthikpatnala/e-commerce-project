const productController = require('./controllers/productController')
const reviewController = require('./controllers/reviewController')
const orderController = require('./controllers/orderController')
const customerController = require('./controllers/customerController')

const router = require('express').Router()
router.get('/testing',(req,res)=>{res.send('testing api working')})
router.post('/addProduct' , productController.addProduct)

router.get('/allProducts', productController.getAllProducts)

router.get('/allReviews', reviewController.getAllReviews)
router.post('/addReview/:id', reviewController.addReview)

router.get('/getProductReviews/:id', productController.getProductReviews)

router.get('/productDetails/:id', productController.getOneProduct)

router.put('/productEdit/:id', productController.updateProduct)


router.delete('/deleteProduct/:id', productController.deleteProduct)
router.get('/allOrders', orderController.getAllOrders)
router.get('/allCustomers', customerController.getAllCustomers)
router.get('/getCustomerOrders/:id', customerController.getCustomerOrders)
module.exports = router