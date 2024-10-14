const express = require('express');
const app = express();
const port = 1203
app.use(express.json());
const cors = require("cors");
app.use(cors());

app.use('/users',require('./routes/userroute'))

app.listen(port,(error)=> {
    if(error){
        console.log(error)
    }else{
        console.log(`Server has started at ${port}`)
    }
})

