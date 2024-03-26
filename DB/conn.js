const mongoose = require('mongoose')

mongoose.set("strictQuery", false)


const DB = "mongodb://localhost:27017/reactQuiz" ||  process.env.DB ;


mongoose.connect(DB).then(()=>{
        console.log('connection successful')
    }).catch((err)=>{
        console.log(err)
    });