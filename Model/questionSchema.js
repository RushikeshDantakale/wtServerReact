const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    choices: {
    type: [String],
    required: true,
    validate: {
      validator: function (options) {
        return options.length === 4; // Ensure there are exactly 4 options
      },
      message: 'There must be exactly 4 choices'
    }
    },
    answer:{
        type:[String],
        required:true
    },
},
    {
        timestamps: true // Automatically add createdAt and updatedAt fields
      }
    )

const Question = mongoose.model('QUESTION',questionSchema)


module.exports = Question
