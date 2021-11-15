import React, { useEffect, useState } from "react";
import { flexbox } from '@mui/system';
import { Grid } from '@mui/material';
import { Box, ThemeProvider } from '@mui/system';


function Coin() {
    const [coins,setCoins] = useState([])
    const [upcomingCoins,setUpcomingCoins] = useState([])
    const [finalCoins,setFinalCoins] = useState([])
    //Get the data from the DB , stored in coins!

    useEffect(async() => {
        await fetch("/Zbot").then(res=> {
            if(res.ok) {
                console.log("a req has been made")
                return res.json();
                
            }    
        }).then(jsonRes => setCoins(jsonRes))

    },[])
   //Трите реда долу ша тряа са сменят....ма за разделител вършат раота
        
   //function to get coinEventTime ,conver it to number
   //hoping she keeps this time varian 13:00 or else this shit won't work :@
    
    let Coinnames = '';
    let Cointime = '';
    let Coinday = '';
    let currentTime = 0;
    let today = 0;
    let coinsAfterTime = [];
    let counter = 0;
    //Get time ---------------------------------------------------------

    function GetTime(){
        let date = new Date()
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        currentTime = hour + '.' + minutes 
        today = month +'.' + day
        currentTime = Number(currentTime)
        today = Number(today)
        }

        //get all upcoming coins this should run only when Z updates not every time :@
        function getUpcomingCoins(){
            Coinnames = ''
                GetTime()
            coins.map(coin => {
                Cointime = coin.Time;
                Coinday = coin.Date;

                if(Coinday != null){
                    Coinday = Coinday.replace('/','.')
                    Coinday = Number(Coinday)
                   if(Coinday == today){
                       if(Cointime != null){
                            Cointime = Cointime.replace(':','.')
                            Cointime = Number(Cointime)
                            if(Cointime > currentTime){
                                Coinnames += " " + coin.name
                                }
                            }    
                        }
                    }
                })
            }
        //getUpcomingCoins();
        
        //push all upcoming Coins in an array

        

        function nextCoins(){
            
            
            for(let i =0;i<coins.length;i++){
                if(Coinnames.includes(coins[i].name)){
                    coinsAfterTime.push(coins[i])
                }
            }
            console.log(coinsAfterTime)
            counter++
            console.log('counter',counter)
            return;
        }
        nextCoins();

       
        setInterval(nextCoins()
        ,10000)
    return( <div>
        <h1>TOKEN FEED</h1>
        {coinsAfterTime.map(coin =>  
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

export default Coin;