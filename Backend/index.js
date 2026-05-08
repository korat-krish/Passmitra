require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./config/db');
const cors = require('cors');
const authroute = require('./routes/auth.route');
const adminRoutes = require("./routes/admin/admin.route");
db();

app.use(cors());
app.use(express.json());
app.listen(port , ()=>{
    console.log(`serever listen on port http://localhost:${port}`)
})
app.get('/',(req,res)=>{
    res.send("Welcome to passmitra pass");
})

app.use('/api/auth',authroute);
app.use("/api/admin", adminRoutes);