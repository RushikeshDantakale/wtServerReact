const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const PORT = process.env.PORT || 5000 
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
dotenv.config({path:'./.env'});


app.use(require("./Router/auth"))
require("./DB/conn")

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`)
 });