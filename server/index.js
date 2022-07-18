const cors = require('cors');
const morgan = require('morgan');
const landing = require('./routes/landing')
const route1 = require('./routes/route1')
const route2 = require('./routes/route2')
const express = require('express');
const app = express()


// Middleware
app.use(cors())
app.use(morgan("tiny"))
require("dotenv").config()


// Routing
app.use('/', landing)
app.use('/api/route1', route1)
app.use('/api/route2', route2)


// Listener
app.listen(process.env.PORT, () =>
        console.log(`Server listening on ${process.env.PORT}...`)
);