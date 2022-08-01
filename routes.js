const productController = require('./controllers/productController')
const reviewController = require('./controllers/reviewController')
const orderController = require('./controllers/orderController')
const customerController = require('./controllers/customerController')

const {db} = require('./models/index.js')
const User = db.users
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const router = require('express').Router()
router.get('/testing',(req,res)=>{res.send('testing api working')})
//product routes
router.post('/addProduct' , productController.addProduct)
router.get('/allProducts', productController.getAllProducts)
router.get('/productDetails/:id', productController.getOneProduct)
router.put('/productEdit/:id', productController.updateProduct)
router.delete('/deleteProduct/:id', productController.deleteProduct)
router.get('/allProductsPaginated', productController.getAllProductsPaginated)
router.get('/getProductReviewsEager/:id', productController.getProductReviewsEager)
router.get('/getProductReviewsLazy/:id', productController.getProductReviewsLazy)

//review routes
router.get('/allReviews', reviewController.getAllReviews)
router.get('/allReviewsPaginated', reviewController.getAllReviewsPaginated)
router.post('/addReview/:id', reviewController.addReview)

//order routes
router.get('/allOrders', orderController.getAllOrders) 
router.get('/allOrdersPaginated', orderController.getAllOrdersPaginated)
router.get('/getOrderedProductsEager/:id', orderController.getOrderedProductsEager)
router.get('/getOrderedProductsLazy/:id', orderController.getOrderedProductsLazy)

//customer routes
router.get('/allCustomers', customerController.getAllCustomers)
router.get('/allCustomersPaginated', customerController.getAllCustomersPaginated)
router.get('/getCustomerOrdersEager/:id', customerController.getCustomerOrdersEager)
router.get('/getCustomerOrdersLazy/:id', customerController.getCustomerOrdersLazy)
//user routes

router.get('/users', async(req,res)=>{
    let userDetails = await User.findAll({});
    res.status(200).send(userDetails);
})

router.get('/users/fullname',authenicateToken , async(req,res)=>{
    //let userDetails = await User.findOne({where : { userName : req.user}});
    res.status(200).send(req.user);
})


router.post('/users',async(req,res)=>{
    const {fullName, userName, password} = await req.body;
    
    const hashedPassword =   await bcrypt.hash(password, 10); 
    const info = {
        fullName : fullName,
        userName : userName,
        password : hashedPassword
    }

    const user1 = await User.create(info)
    res.status(200).send(user1)
})


router.post('/users/login', async(req, res)=>{
    const givenUser = req.body.userName
    const user = await User.findOne({givenUser})
    if(user==null){
        return res.status(400).send('cannot find user')
    }
    try{
         if(await bcrypt.compare(req.body.password, user.password)){
            res.send('Login Success')
         } else {
            res.send('Password Incorrect')
         }

    } catch{
         res.status(500).send
    }
})


router.post('/login', (req,res)=>{
    const username = req.body.userName
    const user = { name: username }

   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
   res.send(accessToken);
})

function authenicateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token==null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })

}

module.exports = router