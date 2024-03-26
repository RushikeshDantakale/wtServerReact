const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 5000 

app.use(cors())
app.use(express.json())

app.use(require("./Router/auth"))
require("./DB/conn")

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`)
 });