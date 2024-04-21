const { generateCodeString , convertToSeconds } = require('../Functions/function');
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
const Register = require("../Model/registerSchema")


router.get("/" , (req,res) =>{
    res.json({message:"server is running !"})
})

router.post("/admin/login" , async (req,res)=>{
    const { email , password } = req.body

    const collection = mongoose.connection.collection('admin')
    const user = await collection.find({}).toArray()

    
    
    if(user[0].username == email && user[0].password == password){
        res.status(200).json({message:"Login Successful !" , user})
    }else{
        res.status(401).json({error:"Invalid Username or Password !"})
    }
})




router.get("/get_questions",async (req,res)=>{
    const questions = await Question.find({} ,  { question: 1, choices: 1, _id: 1 }) //get only question choices and id
    res.send(questions)
 })

router.post("/create_question_set" ,async (req, res) => {
  try{
    console.log(req.body , 51);
    const que_set_exists =await Topic.find({name: req.body.set_name})
    //first get the topic info and if its unique , then proceed
    if(que_set_exists.length === 0){
      const {set_name  ,number_of_question:no_of_questions , description,quiz_time:{hr , min} } = req.body     
      //if its not unique -> generate the 5 digit number code which will be unique, and save the code as topic code.
      const time = convertToSeconds(hr , min)
      console.log(time , 49);
      const topic_code = generateCodeString();     
      const newTopic = new Topic({name:set_name,no_of_questions , description , topic_code , time });
      // Save the new topic document
      const savedTopic = await newTopic.save();
      let updated_questions = req.body.questions.map((que)=>{
          return {
            ...que,
            topic_code 
          }
      })
      const queResponse =await Question.insertMany(updated_questions, { ordered: false })
      console.log(updated_questions , 72);
      console.log(queResponse , 72);
      //and every question with the question , choices and correct answers, join one more atrribute topic code
        if(queResponse && newTopic){
         return res.status(201).json({message: "Question set information saved successfully!" , savedTopic});
        } 
    }else{
      //if not unique-> give error topic name already in use or topic name not available.
      return res.status(501).json({error:"Topic Already Exists! Try to Create the different Topic Name!"})
    }
  }catch(error){
      res.status(501).json({error:"Internal Server Error!"})
  }
})


//update and add questions
router.post("/add_and_update_questions" ,async (req,res) => {
  const {topic_code , questions } = req.body
  const que_length = questions.length
  console.log(questions , 82);
  try{
      const updateNumberQue = await Topic.updateOne({topic_code},{$inc : { no_of_questions : que_length  }})
      const insertNewQue = Question.insertMany(questions)
      console.log(updateNumberQue , insertNewQue , 88);
      res.status(201).send({message:"questions added successfully!" , record : insertNewQue})
  }catch(err){
    res.status(501).send("Internal Server Error!")
  }

})

router.get("/get-topics",async(req,res)=>{
  try{
    const response =await Topic.find({})
    res.status(201).send(response)

  }catch(error){
    res.send(error)
  }
  
})

//get all users
router.get("/admin/getRegisteredUsers" , async (req,res) =>{
  try{
      const users = await Register.find({})
      res.status(201).send(users)
  }catch(error){
    res.send(error)
  }
})

router.delete("/delete/:id/:topic_code" ,async (req,res) =>{
  const {id , topic_code} = req.params;
  try{
    const questions = await Question.deleteMany({topic_code})
    const deletedTopic = await Topic.findByIdAndDelete(id);
    if (deletedTopic && questions) {
      return res.status(201).json({ message: "Topic and Topic Related Questions Deleted Successfully!" });
    }
    res.status(501).json({ error: "Something Went Wrong!" });
  }catch(error){
      res.status(501).send("Internal Server Error!")
  }
})

//delete user record
router.delete("/userDelete/:id" ,async (req,res) =>{
  const {id } = req.params;
  try{
    const deletedUser = await Register.findByIdAndDelete(id);
    if (deletedUser) {
      return res.status(201).json({ message: "User Deleted Successfully!" });
    }
    res.status(501).json({ error: "Something Went Wrong!" });
  }catch(error){
      res.status(501).send("Internal Server Error!")
  }
})

router.post("/getQuestions/:topic_code",async (req,res)=>{
  const {topic_code} = req.params

  const questions = await Question.find({topic_code})

  res.send(questions)
})


//for registration with email and give access to give the quizz
router.post("/user/register" ,async (req,res)=>{
  const {email , topic_code , topic_name} = req.body
  try{
    const isExist = await Register.find({$and : [{email} ,{topic_code} ]})
    if(isExist.length !== 0){
      return res.status(501).send("You already given that quiz!")
    }
    const userRegister = new Register({email , topic_code , topic_name });
    const topic_info = await Topic.find({topic_code})
    const questions=  await Question.find({topic_code})

      // Save the new user record
    await userRegister.save()
    res.status(201).send({message:"user Registered Successfully!" , data : {
      topic_info , 
      questions
    }})
  }catch(error){
    res.send(error)
  }
})


router.post("/update_question_set" ,async (req,res) => {
  try {
    const { topic_code, set_name, description, number_of_question, quiz_time, questions } = req.body;

    const time = convertToSeconds(quiz_time.hr , quiz_time.min)

    // Update the question set
    await Topic.findOneAndUpdate({ topic_code }, { name:set_name, description, no_of_questions:number_of_question, time });

    // Update each question in the question set
    for (const updatedQuestion of questions) {
      const { _id, question, choices, answer } = updatedQuestion;
      await Question.findByIdAndUpdate(_id, { question, choices, answer });
    }

    // Send a success response
    res.status(200).json({ message: 'Question set and questions updated successfully' });
  } catch (error) {
    console.error('Error updating question set:', error);
    res.status(500).json({ error: 'An error occurred while updating the question set' });
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