const mongoose = require('mongoose');

const conDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Tasker", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to the database!');
    } catch (error) {
        console.log("Cannot connect to the database!", error);
        process.exit(1); // Exit the process if the connection fails
    }
};

module.exports = conDB;
