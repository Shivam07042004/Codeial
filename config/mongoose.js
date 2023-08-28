const mongoose = require('mongoose');

mongoose
    .connect('mongodb://127.0.0.1:27017/codieal_db2')
    .then(() => { 
        console.log('Successfully connected to the database'); 
    })
    .catch((error) => { 
        console.log('Error in connecting to the database:', error);
    });
