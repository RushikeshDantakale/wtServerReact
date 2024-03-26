const mongoose = require('mongoose');

// Connection string from environment variable
const DB = process.env.DB;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connection to MongoDB successful');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});
