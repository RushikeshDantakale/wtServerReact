const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    topic_name: {
        type: String
    },
    topic_code: {
        type: String,
        required: true
    },
    que_attempted : {
        type:Number
    },
    total_right_answers : {
        type : [Number]
    }

},
{
    timestamps: true // Automatically add createdAt and updatedAt fields
}
)

const Register = mongoose.model('REGISTER', registerSchema)


module.exports = Register