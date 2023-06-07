const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/crypto_db';
const connectDB = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const cryptoSchema = new mongoose.Schema({
name: String,
    last: String,
    buy: String,
    sell: String,
    volume: String,
    base_unit: String
});

const Crpyto = mongoose.model('Crpyto', cryptoSchema);

module.exports = { connectDB, Crpyto };
