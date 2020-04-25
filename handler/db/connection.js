const mongoose = require('mongoose');

const URI = process.env.mongodb_url;

const connectDB = async () => {
    await mongoose.connect(URI,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log('DB Connected !');
}

module.exports = connectDB;