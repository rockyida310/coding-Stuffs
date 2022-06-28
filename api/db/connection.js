const mongoose = require('mongoose');

const connection = async (url) => {
    try{
        const options = {
            useNewUrlParser : true,
            useUnifiedTopology: true 
        }

        await mongoose.connect(url,options);
        console.log('Connected to database');
    }catch(error){
        console.log('Could not connect to database : ',error);
    }
};

module.exports = connection;