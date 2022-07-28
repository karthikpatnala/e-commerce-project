const productController = require('./controllers/productController')
const reviewController = require('./controllers/reviewController')
const orderController = require('./controllers/orderController')
const customerController = require('./controllers/customerController')
const router = require('express').Router()
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

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

router.get('/testing',(req,res)=>{res.send('testing api working')})

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


router.post('/addProduct' , productController.addProduct)



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

router.get('/allProducts', productController.getAllProducts)



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


router.get('/productDetails/:id', productController.getOneProduct)


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

router.put('/productEdit/:id', productController.updateProduct)

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