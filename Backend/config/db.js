const mongoose = require('mongoose');

const db = () => {
    mongoose.connect(process.env.MONGO_URL).then(()=> {
        console.log("Database Connected Successfully..!!");
    }) .catch((error)=>{
        console.log("Mongodb Error :",error);
    })
}

module.exports = db;