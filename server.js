const Sequelize=require('sequelize')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const sequelize=require('./models/index.js')
//const morgan= require('morgan')
//app.use(morgan('tiny'))
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
app.use(express.json())
const jsonParser = express.json()
app.use(jsonParser);

app.use(express.urlencoded({ extended: true }))
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "gyt workz e-commerce project",
			version: "1.0.0",
			description: "API documentation UI",
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
        
	},
	
    apis: ["./*.js"]
};



const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));



const router = require('./routes')
//console.log(router);
app.use('/api', router)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})


