const productController = require('./controllers/productController')
const reviewController = require('./controllers/reviewController')
const orderController = require('./controllers/orderController')
const customerController = require('./controllers/customerController')

const router = require('express').Router()
router.get('/testing',(req,res)=>{res.send('testing api working')})

router.post('/addProduct' , productController.addProduct)
router.get('/allProducts', productController.getAllProducts)
router.get('/productDetails/:id', productController.getOneProduct)
router.put('/productEdit/:id', productController.updateProduct)
router.delete('/deleteProduct/:id', productController.deleteProduct)
router.get('/allProductsPaginated', productController.getAllProductsPaginated)
router.get('/getProductReviewsEager/:id', productController.getProductReviewsEager)
router.get('/getProductReviewsLazy/:id', productController.getProductReviewsLazy)


router.get('/allReviews', reviewController.getAllReviews)
router.get('/allReviewsPaginated', reviewController.getAllReviewsPaginated)
router.post('/addReview/:id', reviewController.addReview)


router.get('/allOrders', orderController.getAllOrders) 
router.get('/allOrdersPaginated', orderController.getAllOrdersPaginated)
router.get('/getOrderedProductsEager/:id', orderController.getOrderedProductsEager)
router.get('/getOrderedProductsLazy/:id', orderController.getOrderedProductsLazy)


router.get('/allCustomers', customerController.getAllCustomers)
router.get('/allCustomersPaginated', customerController.getAllCustomersPaginated)
router.get('/getCustomerOrdersEager/:id', customerController.getCustomerOrdersEager)
router.get('/getCustomerOrdersLazy/:id', customerController.getCustomerOrdersLazy)


module.exports = router