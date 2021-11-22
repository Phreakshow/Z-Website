const mongoose = require('mongoose');

const coinSchema = mongoose.Schema({
    name:String,
    TG:String,
    Type:String,
    Date:String,
    Time:String,
    Poo:String,
    Pink:String,
    DataFormated:Object,
    PromoLink:String,
})

module.exports = mongoose.model('Zbot' , coinSchema , "Zbot");