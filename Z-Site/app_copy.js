//https://docs.google.com/spreadsheets/d/1wJ2HYziS63QHZaC_QlLD1BWVM4hux9u-7fEJOBJ7fBE/edit?usp=sharing
// 1wJ2HYziS63QHZaC_QlLD1BWVM4hux9u-7fEJOBJ7fBE

//https://spredsheets.google.com/feeds/cells/1wJ2HYziS63QHZaC_QlLD1BWVM4hux9u-7fEJOBJ7fBE/1/public/full?alt=json

const {google, dlp_v2} = require('googleapis');
const keys = require('./keys.json');

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
)

const { MongoClient } = require('mongodb');

const url = "mongodb+srv://trash12:trash12@cluster0.d49al.mongodb.net/Zbot?retryWrites=true&w=majority"
const mongoCL = new MongoClient(url);
const assert = require('assert')
const dbName = "Zbot"

const moment = require('moment-timezone')
client.authorize(function(err,tokens){

    if(err){
        console.log(err)
        return;
    }else {
        console.log('connected')
        getSheet(client);
    }
})

// i don't even know what this shit  below does ---------------------------
//https://docs.google.com/spreadsheets/d/1_o-Hqm06ulgMMAUEl_R5ugFYFXsW5sV-ZAYFAtm0V7M/edit?usp=sharing
let SheetArr = []
async function getSheet(cl){
    const gsapi = google.sheets({ version:'v4' , auth:cl});

    const sheet = {
        spreadsheetId:"1_o-Hqm06ulgMMAUEl_R5ugFYFXsW5sV-ZAYFAtm0V7M",
        range:"Z list"
    }
    
    
    let Sheet = await gsapi.spreadsheets.values.get(sheet);
    SheetArr = Sheet.data
    let end = SheetArr.values.length
    let arr = []

    for(let i = 1 ;i<=end;i++){
        if(SheetArr.values[i][8] == undefined){
            break;
        }else {
            let name = SheetArr.values[i][8]     
            let TG = SheetArr.values[i][9]
            let promoLink = SheetArr.values[i][10]
            let promocoin = {
                "name":name,
                "TG":TG,
                "promoLink":promoLink
            }
            arr.push(promocoin)
        }
    }
    console.log(arr)

    try {
        await mongoCL.connect();
        const db = mongoCL.db(dbName)
        const collection = db.collection('Zbot')
        
        let del = collection.deleteMany({})

        for(let i = 1 ; i<end;i++){
            let name = SheetArr.values[i][0]
            let TG = SheetArr.values[i][1]
            let Type = SheetArr.values[i][2]
            let Date = SheetArr.values[i][3]
            let Time = SheetArr.values[i][4]
            let Poo = SheetArr.values[i][5]
            let Pink = SheetArr.values[i][6]
            let DateFormated = moment.utc(`${SheetArr.values[i][3]} ${SheetArr.values[i][4]}`, 'MM/DD HH:mm' )
            let nameOfCoins = {
                "name": name,
                "TG":TG,
                "Type":Type,
                "Date": Date,
                "Time": Time,
                "Poo":Poo,
                "Pink":Pink,
                "DateFormated":DateFormated._d,
            }
            for(let j = 0;j<arr.length;j++){
                if(name == arr[j].name){
                    nameOfCoins = {
                        "name": name,
                        "TG":TG,
                        "Type":Type,
                        "Date": Date,
                        "Time": Time,
                        "Poo":Poo,
                        "Pink":Pink,
                        "DateFormated":DateFormated._d,
                        "PromoLink":arr[j].promoLink
                    }
                }
            }
        const p = await collection.insertOne(nameOfCoins);   
        console.log("finished")
        }
    console.log("finished@")
    }catch(err){
        console.log(err.stack)
    }
}


// async function readData(){
//     try {

//         await mongoCL.connect();
//         const db = mongoCL.db(dbName)
//         const coll = db.collection('Zbot')

//         let cursor = await coll.find({});
//         console.log(cursor)
//       await cursor.forEach((doc) => console.log(doc));

//     }catch(err){
//         console.log(err)
//     }
// }
// readData()
// //2021-11-11T12:30:00Z"