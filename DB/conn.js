const mongoose = require('mongoose')

mongoose.set("strictQuery", false)


const DB =  process.env.URI;

console.log(DB , 8);


mongoose.connect(DB).then(()=>{
        console.log('connection successful')
    }).catch((err)=>{
        console.log(err)
    });