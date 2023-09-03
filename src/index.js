const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config()
const app = express();
const port = process.env.PORT || 3001
app.get('/', (req, res) => {
     res.send('hello world')
})
mongoose.connect(`mongodb+srv://kimtrinh:${process.env.MONGO_DB}@cluster0.yqrzhit.mongodb.net/?retryWrites=true&w=majority`)
.then(()=> {
    console.log('connect db successfully')
})
.catch((err)=> {
    console.log(err)
})
app.listen(port, () => {
    console.log('listening on port', + port)
})