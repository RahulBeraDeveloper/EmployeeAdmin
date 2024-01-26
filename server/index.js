const express = require('express');
const cors = require('cors');
const adminRoute = require('./Routes/AdminRoute.js')


const app = express()
app.use(cors({
    origin:["http://localhost:5173"],
    methods:['GET','POST','PUT'],
    credentials:true
}))

app.use(express.json())
app.use('/auth',adminRoute)

app.listen(4500,()=>{
    console.log("server is running")
})