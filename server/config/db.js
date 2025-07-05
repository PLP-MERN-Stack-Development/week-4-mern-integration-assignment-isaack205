// Import mongoose library
const mongoose = require('mongoose');

// Mongiodb url
const mongo_uri = process.env.MONGO_URI

console.log('MONGO_URI:', mongo_uri);

const connectDb = async () => {
    try {
        await mongoose.connect(mongo_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connection to mongodb successful');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDb;