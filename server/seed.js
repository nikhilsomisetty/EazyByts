const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio-cms')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const seedAdmin = async () => {
    try {
        const username = 'admin';
        const password = 'password123';

        const userExists = await User.findOne({ username });

        if (userExists) {
            console.log('Admin user already exists');
            process.exit();
        }

        await User.create({ username, password });
        console.log(`Admin user created. Username: ${username}, Password: ${password}`);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedAdmin();
