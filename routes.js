const productController = require('./controllers/productController')
const reviewController = require('./controllers/reviewController')
const orderController = require('./controllers/orderController')
const customerController = require('./controllers/customerController')

const router = require('express').Router()
router.get('/testing',(req,res)=>{res.send('testing api working')})

router.post('/addProduct' , productController.addProduct)
router.get('/allProducts', productController.getAllProducts)
router.get('/allProductsPaginated', productController.getAllProductsPaginated)
router.get('/getProductReviews/:id', productController.getProductReviews)
router.get('/productDetails/:id', productController.getOneProduct)
router.put('/productEdit/:id', productController.updateProduct)
router.delete('/deleteProduct/:id', productController.deleteProduct)


router.get('/allReviews', reviewController.getAllReviews)
router.get('/allReviewsPaginated', reviewController.getAllReviewsPaginated)
router.post('/addReview/:id', reviewController.addReview)


router.get('/allOrders', orderController.getAllOrders) 
router.get('/allOrdersPaginated', orderController.getAllOrdersPaginated)
router.get('/getOrderedProducts/:id', orderController.getOrderedProducts)


router.get('/allCustomers', customerController.getAllCustomers)
router.get('/allCustomersPaginated', customerController.getAllCustomersPaginated)
router.get('/getCustomerOrders/:id', customerController.getCustomerOrders)


module.exports = router