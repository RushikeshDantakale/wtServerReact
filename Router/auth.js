const express = require('express')
const router = express()
const cors = require('cors')
express.json({limit:'1tb',type:'application/json'})
express.urlencoded({limit:'1tb',type:'application/json',extended:true})
router.use(cors())
require("../DB/conn")
const Question = require("../Model/questionSchema")


router.get("/" , (req,res) =>{
    res.json({message:"server is running !"})
})


router.get("/get_questions",async (req,res)=>{
    const questions = await Question.find({} ,  { question: 1, choices: 1, _id: 1 }) //get only question choices and id
    res.send(questions)
 })

module.exports =  router