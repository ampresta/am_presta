const cors = require('cors');
const morgan = require('morgan');
const route1 = require('./routes/route1')
const express = require('express');
const app = express();
const db = require("./config/database")

const PORT = process.env.PORT


//Database Setup
try {
	db.authenticate();
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
app.listen(PORT, () =>
		console.log(`Server listening on ${PORT}...`)
);