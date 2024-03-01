const express = require('express')
const cors=require('cors')
const dotenv=require('dotenv');
const bodyParser=require('body-parser');
const path=require('path');
const UserRoutes=require("./Routes/UserRoutes");
const AdminRoutes=require("./Routes/AdminRoutes")

dotenv.config();
const app = express();
app.use(cors())
app.use(bodyParser.json());

const port=process.env.PORT;
// app.use('/user',UserRoutes);

app.use('/admin',AdminRoutes);


app.listen(port,()=>{
    console.log('server is running on 2100')
})