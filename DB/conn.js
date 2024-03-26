const mongoose = require('mongoose')

mongoose.set("strictQuery", false)


const DB = process.env.DB ;


mongoose.connect(DB).then(()=>{
        console.log('connection successful')
    }).catch((err)=>{
        console.log(err)
    });