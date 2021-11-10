const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const port = 3001;

const url = "mongodb+srv://trash12:trash12@cluster0.d49al.mongodb.net/Zbot?retryWrites=true&w=majority"

app.use(express.json())
app.use(cors())

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
})
const coinrouter = require('./routes')
app.use('/Zbot',coinrouter)

app.get('/',(req,res) => {
    res.status(200).send("wokings")
})


app.listen(port, () => console.log(`on prot ${port}`));

//TO START /node server.js