const cors = require('cors');
const morgan = require('morgan');
const route1 = require('./routes/route1')
const { Sequelize } = require("sequelize")
const express = require('express');
const Connection = require("./utils/connection");
const app = express();


		//Database Setup
		const sequelize = new Sequelize(Connection);
		module.exports = sequelize;
		try {
			sequelize.authenticate();
			console.log("Connection has been established successfully.");
		} catch (error) {
			console.log("Unable to connect to the database:");
		}

// Middleware 
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
require("dotenv").config()


// Routing
app.use('/api/route1', route1)

// Listener       
app.listen(process.env.PORT, () =>
	console.log(`Server listening on ${process.env.PORT}...`)
);