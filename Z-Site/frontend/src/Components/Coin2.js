import React,{useEffect, useState} from "react";

import { Grid } from '@mui/material';
let timing = 100;
function Coin2({props}){
    const [coins,setCoins] = useState([])
    const [counter,setCounter] = useState(0)
    let coinS = props;
    useEffect(() => {
        let timer = setInterval(()=>{

                //вземаме сегашното време в дата и час - в числа -----
                let date = new Date()
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let hour = date.getHours();
                let minutes = date.getMinutes();
                let currentTime = hour + '.' + minutes 
                let today = month +'.' + day
                currentTime = Number(currentTime)
                today = Number(today)
                //------------------------------------------------------------

                //филтриране на токените -------------------------------------
                //тук има 100% по-добре имплентация , но за сега това работи--
                let coinsLenght = coinS.length
                let filteredCoins = [];
                let onlyFiveCoins = [];
                    for(let i =0;i<coinsLenght;i++){
                        if(coinS[i].Date !=null){
                            if(typeof coinS[i].Date == 'string'){
                                coinS[i].Date = Number(coinS[i].Date.replace('/','.'))
                            }    
                        }
                        if(coinS[i].Time != null){
                            if(typeof coinS[i].Time == 'string'){
                                coinS[i].Time = Number(coinS[i].Time.replace(':',"."))        
                            }
                        } 
                    }
                   //всички токени който са с днешна дата и са в следващите часове------------
                   for(let i =0;i<coinsLenght;i++){
                        if(coinS[i].Date == today){
                            if(coinS[i].Time > currentTime){
                                filteredCoins.push(coinS[i])
                            }
                        }
                    } 
                    //сортираме в възходящ ред ------------------------------------------------
                    filteredCoins.sort((a,b) => {
                        return a.Time - b.Time
                    })
                    //показваме само следващите 5 токена или останалите ако са под 5 ----------
                    if(filteredCoins.length >=5){
                        for(let i=0;i<5;i++){
                            onlyFiveCoins.push(filteredCoins[i])
                        }
                        setCoins(onlyFiveCoins)
                    }else {
                        setCoins(filteredCoins)
                    }
                    
                console.log(counter)
                if(counter >1){
                    timing = 60000
                }else {
                }
                setCounter(counter + 1)
        },timing)
        return function cleanup(){
            clearInterval(timer)
        }
    },[counter])
    
    return( <div>
        <h1>TOKEN FEED</h1>
        {coins.map(coin =>  
            <Grid  container
                    direction="column"
                    justifyContent="center"
                    alignItems="center">
            <Grid item xs> {coin.name} </Grid>
            <Grid item xs> {coin.TG} </Grid>
            <Grid item xs> {coin.Time}</Grid>
            -------------- 
            </Grid>
            )}
    </div>
    )
}
   


export default Coin2;