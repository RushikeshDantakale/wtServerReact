const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
    ,
    description: {
        type: String
    },
    no_of_questions: {
        type: String,
        required: true
    },
    topic_code : {
        type:String
    }

},
    {
        timestamps: true // Automatically add createdAt and updatedAt fields
    }
)

const Topic = mongoose.model('TOPIC', topicSchema)


module.exports = Topic