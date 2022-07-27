const Sequelize=require('sequelize')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const sequelize=require('./models/index.js')
<<<<<<< HEAD
=======
const morgan= require('morgan')
app.use(morgan('tiny'))
>>>>>>> 34a44409cc65b103a24b4452bde5bca4fd2fdc8a
app.use(express.json())
const jsonParser = express.json()
app.use(jsonParser);

app.use(express.urlencoded({ extended: true }))

const router = require('./routes.js')
//console.log(router);
app.use('/api', router)
 

const PORT = process.env.PORT || 3000


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

