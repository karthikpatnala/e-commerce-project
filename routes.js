const productController = require('./controllers/productController')
const reviewController = require('./controllers/reviewController')
const orderController = require('./controllers/orderController')
const customerController = require('./controllers/customerController')
const router = require('express').Router()
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const rateLimit=require('express-rate-limit')
const limiter=rateLimit({
    max :5,
    windowMs : 10000
})
/**
 * @swagger
 * /testing:
 *  get:
 *      summary: A basic testing api for verification
 *      description: testing api launched successfully
 *      responses:
 *          200:
 *              description: OK succeeded
 *          404:
 *              description: Page not found 
 */

router.get('/testing',limiter,(req,res)=>{res.send('testing api working')});
/**
 * @swagger
 * components:
 *   schemas:
 *     Products:
 *       type: object
 *       required:
 *         - productId
 *         - title
 *         - price
 *         - description
 *         - order_id
 *       properties:
 *         productId:
 *           type: integer
 *           description: The auto-generated id of the product
 *         title:
 *           type: string
 *           description: The product title
 *         price:
 *           type: integer
 *           description: The price of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         order_id:
 *           type: integer
 *           description: The related order id of the product
 * 
 *      
 */

 /**
  * @swagger
  * tags:
  *   name: Products
  *   description: The Products managing API
  */



/**
 * @swagger
 * /addProduct:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Products'
 *     responses:
 *       200:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       500:
 *         description: Unknown error
 */


router.post('/addProduct' ,limiter, productController.addProduct)



/**
 * @swagger
 * /allProducts:
 *   get:
 *     summary: Returns the list of all the Products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the Products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Products'
 */

router.get('/allProducts',limiter, productController.getAllProducts)



/**
 * @swagger
 * /productDetails/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       404:
 *         description: The product was not found
 */


router.get('/productDetails/:id',limiter, productController.getOneProduct)


/**
 * @swagger
 * /productEdit/{id}:
 *  put:
 *    summary: Update the product by the id
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Products'
 *    responses:
 *      200:
 *        description: The product was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Products'
 *      404:
 *        description: The Product was not found
 *      500:
 *        description: unknown error
 */

router.put('/productEdit/:id',limiter, productController.updateProduct)

/**
 * @swagger
 * /Products/{id}:
 *   delete:
 *     summary: Remove the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product id
 * 
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 */



router.delete('/deleteProduct/:id', productController.deleteProduct)
router.get('/allProductsPaginated', productController.getAllProductsPaginated)
router.get('/getProductReviewsEager/:id', productController.getProductReviewsEager)
router.get('/getProductReviewsLazy/:id', productController.getProductReviewsLazy)


/**
 * @swagger
 * components:
 *   schemas:
 *     Reviews:
 *       type: object
 *       required:
 *         - id
 *         - createdAt
 *         - updatedAt
 *         - rating
 *         - description
 *         - product_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the product
 *         createdAt:
 *           type: null
 *           description: The review was created
 *         updatedAt:
 *           type: null
 *           description: The review was updated
 *         rating:
 *           type:integer
 *           description: The rating of the related product      
 *         description:
 *           type: string
 *           description: The description of the product
 *         product_id:
 *           type: integer
 *           description: The related order id of the product
 *      
 */

 /**
  * @swagger
  * tags:
  *   name: Reviews
  *   description: The Reviews managing API
  */


/**
 * @swagger
 * /allReviews:
 *   get:
 *     summary: Returns the list of all the Reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: The list of the Reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reviews'
 * 
 */

router.get('/allReviews',limiter, reviewController.getAllReviews)
router.get('/allReviewsPaginated', reviewController.getAllReviewsPaginated)

/**
 * @swagger
 * /addReview/{id}:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reviews'
 *     responses:
 *       200:
 *         description: The review was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reviews' 
 *       500:
 *         description: Unknown error 
 */



router.post('/addReview/:id', reviewController.addReview)


/**
 * @swagger
 * components:
 *   schemas:
 *     Orders:
 *       type: object
 *       required:
 *         - orderId
 *         - customer_Id
 *       properties:
 *         orderId:
 *           type: integer
 *           description: The id of the order
 *         customer_Id:
 *           type: integer
 *           description: The related order id of the customer
 *      
 */

 /**
  * @swagger
  * tags:
  *   name: Orders
  *   description: The Oreders managing API
  */
 
/**
 * @swagger
 * /allOrders:
 *   get:
 *     summary: Returns the list of all the Orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: The list of all the Orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Orders'
 * 
 */



router.get('/allOrders', limiter, orderController.getAllOrders) 
router.get('/allOrdersPaginated', orderController.getAllOrdersPaginated)
router.get('/getOrderedProductsEager/:id', orderController.getOrderedProductsEager)
router.get('/getOrderedProductsLazy/:id', orderController.getOrderedProductsLazy)
/**
 * @swagger
 * components:
 *   schemas:
 *     Customers:
 *       type: object
 *       required:
 *         - customerId
 *         - firstName
 *         - lastName
 *       properties:
 *         customerId:
 *           type: integer
 *           description: The id of the customer
 *         firstName:
 *           type: string
 *           description: The first name of the customer
 *      
 *         lastName:
 *           type: string
 *           description: The last name of the customer
 *      
 */

 /**
  * @swagger
  * tags:
  *   name: Customers
  *   description: The Customers managing API
  */
 
/**
 * @swagger
 * /allCustomers:
 *   get:
 *     summary: Returns the list of all the Customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: The list of all the Customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customers'
 * 
 */




router.get('/allCustomers',limiter, customerController.getAllCustomers)
router.get('/allCustomersPaginated', customerController.getAllCustomersPaginated)
router.get('/getCustomerOrdersEager/:id', customerController.getCustomerOrdersEager)
router.get('/getCustomerOrdersLazy/:id', customerController.getCustomerOrdersLazy)


module.exports = router