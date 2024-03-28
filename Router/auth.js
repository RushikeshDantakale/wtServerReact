const express = require('express')
const router = express()
const mongoose = require("mongoose")
const cors = require('cors')
express.json({limit:'1tb',type:'application/json'})
express.urlencoded({limit:'1tb',type:'application/json',extended:true})
router.use(cors())
require("../DB/conn")
const Question = require("../Model/questionSchema")


router.get("/" , (req,res) =>{
    res.json({message:"server is running !"})
})

router.post("/admin/login" , async (req,res)=>{
    const { email , password } = req.body

    const collection = mongoose.connection.collection('admin')
    const response = await collection.find({}).toArray()
    
    if(response[0].username == email && response[0].password == password){
        res.status(200).json({message:"Login Successful !"})
    }else{

        res.status(401).json({error:"Invalid Username or Password !" , username : response[0].username })
    }
})




router.get("/get_questions",async (req,res)=>{
    const questions = await Question.find({} ,  { question: 1, choices: 1, _id: 1 }) //get only question choices and id
    res.send(questions)
 })

module.exports =  router