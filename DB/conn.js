const mongoose = require('mongoose');

// Connection string from environment variable
const DB = "mongodb+srv://Rushi9080:Rushi9080@cluster0.dnrwsii.mongodb.net/reactQuiz?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DB)
.then(() => {
    console.log('Connection to MongoDB successful');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});
