const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

// Connect to Database
connectToMongo();

// Port and App Initialization
const app = express()
const port = 5000

// Using CROSS ORIGIN RESOURCE SHARING for Frontend and backend connectivity
app.use(cors())

// Use Express JS 
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// Starting Server
app.listen(port, () => {
  console.log(`iNotebook Backend Listening at http://localhost:${port}`)
})