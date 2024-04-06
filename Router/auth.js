const { generateCodeString } = require('../Functions/function');
const express = require('express')
const router = express()
const mongoose = require("mongoose")
const cors = require('cors')
express.json({limit:'1tb',type:'application/json'})
express.urlencoded({limit:'1tb',type:'application/json',extended:true})
router.use(cors())
require("../DB/conn")
const Question = require("../Model/questionSchema")
const Topic = require("../Model/topicSchema")
const User = require("../Model/userSchema")


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

router.post("/create_question_set" ,async (req, res) => {

  
  
  try{
    const que_set_exists =await Topic.find({name: req.body.set_name})
    
    //first get the topic info and if its unique , then proceed
    if(que_set_exists.length === 0){
      
      const {set_name  ,number_of_question:no_of_questions , description } = req.body

      // {
      //   set_name: 'Science',
      //   description: 'This is Science Topic',
      //   questions: [
      //     {
      //       question: 'What is Science',
      //       choices: [Array],
      //       checkedAnswers: [Array]
      //     },
      //     { question: 'QQQW', choices: [Array], checkedAnswers: [Array] }
      //   ]
      // } 

      
      //if its not unique -> generate the 5 digit number code which will be unique, and save the code as topic code.
      const topic_code = generateCodeString();

      console.log({set_name  ,number_of_question:no_of_questions , description } , 51);
      
      
      const newTopic = new Topic({name:set_name,no_of_questions , description , topic_code });

      // Save the new topic document
      const savedTopic = await newTopic.save();
      
      res.status(201).json({message: "Question information saved successfully!" , savedTopic});
      
      
      //and every question with the question , choices and correct answers, join one more atrribute topic code
      
    }else{
      //if not unique-> give error topic name already in use or topic name not available.
      return res.status(501).json({error:"Topic Already Exists! Try to Create the different Topic Name!"})
    }
  }catch(error){
      res.send(error)
  }

  
})



router.get("/test" , (req,res) => {
   const a = {
    set_name: 'Science',
    description: 'This is Science Topic',
    questions: [
      {
        question: 'What is Science',
        choices: [Array],
        checkedAnswers: [Array]
      },
      { question: 'QQQW', choices: [Array], checkedAnswers: [Array] }
    ]
  } 

  const newUsers = [
    { name: 'John Doe', email: 'john@example.com', age: 25 },
    { name: 'Jane Smith', email: 'jane@example.com', age: 30 },
    { name: 'Bob Johnson', email: 'bob@example.com', age: 35 }
  ];
  
  User.insertMany(newUsers)
    .then(docs => {
      console.log('Documents inserted:', docs);
    })
    .catch(err => {
      console.error('Error inserting documents:', err);
    });
})

module.exports =  router