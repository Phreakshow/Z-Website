import React,{useEffect, useState} from "react";
import { Grid } from '@mui/material';
import './Coin2.css'

let timing = 100;

function tomorrowCoinS(coins,today,currentTime){
    let tmrArr = [];
    let todaY = today
    let currentTimE = currentTime
    let coinS = coins
    console.log('fun',coinS.length)
    let coinsLenght = coinS.length
    for(let i =0;i<coinsLenght;i++){
        if(coinS[i].Date + 0.1 == todaY){
            if(coinS[i].Time > currentTimE){
                if(coinS[i].DateFormated.length > 20){
                   //2021-11-22T22:14:00.000Z
                   let indexT = coinS[i].DateFormated.indexOf('T')
                   let indexD = coinS[i].DateFormated.indexOf('.')
                   
                   let newDate = coinS[i].DateFormated.slice(indexT+1,indexD-3)
                   coinS[i].DateFormated = newDate
                }
                if(coinS[i].Poo != null){
                    coinS[i].Poo2 = coinS[i].Poo.slice(0,32)
                }
               
                tmrArr.push(coinS[i])
            }
        }
    }
    return tmrArr 
}

function Coin2({props}){
    const [coins,setCoins] = useState([])
    const [tomorrowCoins,setTomorrowCoins] = useState([])
    const [todayDisplay,setTodayDisplay] = useState(",")
    const [tomorrowDisplay,setTomorrowDisplay] = useState(",")
    const [counter,setCounter] = useState(0)
    let coinS = props;
    useEffect(() => {
        let timer = setInterval(()=>{


                //вземаме сегашното време UTC в дата и час - в числа -----
                //тук е голям мармалад има по-добра имплентация ,но за сега това върши работа ;_;
                let date = new Date()
                let year = date.getUTCFullYear()
                let month = date.getUTCMonth() + 1;
                let daysInMonth = new Date(year,month,0).getDate();
                let day = date.getUTCDate();
                let hour = date.getUTCHours();
                let minutes = date.getUTCMinutes();
                if(minutes < 10){
                    minutes = '0' + minutes
                }
                if(day < 10){
                    day = "0" + day
                }
                let currentTime = hour + '.' + minutes 
                let todayD = month  + '/' + day + '/' + year;
                setTodayDisplay(todayD)
                let tomorrowD = year;
                let helperDay = Number(day)
                let helperMonth = Number(month)
                let helperYear = year
                
                if(helperDay +1 > daysInMonth){
                    helperMonth += 1;
                    helperDay = 1;
                    if(helperMonth > 12){
                        helperMonth = 1;
                        helperYear += 1;
                    }
                    if(helperDay < 10){
                        helperDay = "0" + helperDay
                    }
                    tomorrowD = helperMonth + '/' + helperDay +"/" + helperYear;
                    console.log('ttt',tomorrowD)
                }else {
                    helperDay += 1
                    if(helperDay <10){
                        helperDay = "0" + helperDay
                    }
                    tomorrowD = month + '/' + helperDay + "/" + year;
                }
                setTomorrowDisplay(tomorrowD)
                let today = month +'.' + day
                currentTime = Number(currentTime)
                today = Number(today)
                //------------------------------------------------------------

                //филтриране на токените -------------------------------------
                //тук има 100% по-добре имплентация , но за сега това работи--
                let coinsLenght = coinS.length
                let filteredCoins = [];
                let onlyFiveCoins = [];
                let tmrCoins = [];

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
                                if(coinS[i].DateFormated.length > 20){
                                   //2021-11-22T22:14:00.000Z
                                   let indexT = coinS[i].DateFormated.indexOf('T')
                                   let indexD = coinS[i].DateFormated.indexOf('.')
                                   
                                   let newDate = coinS[i].DateFormated.slice(indexT+1,indexD-3)
                                   coinS[i].DateFormated = newDate
                                }
                                if(coinS[i].Poo != null){
                                    coinS[i].Poo2 = coinS[i].Poo.slice(0,32)
                                }
                               
                                filteredCoins.push(coinS[i])
                            }
                        }
                        
                        if(coinS[i].Date == today + 0.01){
                            if(coinS[i].DateFormated.length > 20){
                                //2021-11-22T22:14:00.000Z
                                let indexT = coinS[i].DateFormated.indexOf('T')
                                let indexD = coinS[i].DateFormated.indexOf('.')
                                
                                let newDate = coinS[i].DateFormated.slice(indexT+1,indexD-3)
                                coinS[i].DateFormated = newDate
                             }
                             if(coinS[i].Poo != null){
                                coinS[i].Poo2 = coinS[i].Poo.slice(0,32)
                            }
                            tmrCoins.push(coinS[i])
                        }
                    } 
                    //сортираме в възходящ ред ------------------------------------------------
                    filteredCoins.sort((a,b) => {
                        return a.Time - b.Time
                    })
                    tmrCoins.sort((a,b) => {
                        return a.Time - b.Time
                    })
                    //показваме само следващите 5 токена или останалите ако са под 5 ----------
                    if(filteredCoins.length >=5){
                        for(let i=0;i<5;i++){
                            onlyFiveCoins.push(filteredCoins[i])
                        }
                        setCoins(onlyFiveCoins)
                    }else if(filteredCoins.length<5){
                        let index = 5 - filteredCoins.length
                        tmrCoins = tmrCoins.slice(0,index)
                        setTomorrowCoins(tmrCoins)
                        setCoins(filteredCoins)
                    }
                    
                console.log(counter)
                if(counter >2){
                    timing = 60000
                }else {
                }
                setCounter(counter + 1)
        },timing)
        return function cleanup(){
            clearInterval(timer)
        }
    },[counter])
    console.log(coins.length)
    if(coins.length>=5){
        return( <div className="coins-wrapper">
        <p className="token-p">Upcoming events</p>
        <p className="date-p">TODAY {todayDisplay}</p>
        {coins.map(coin =>  
        <div className="coin-div">
            <Grid  container
                    direction="column"
                    justifyContent="center"
                    alignItems="center">
            <Grid item xs className="time-grid"><p className="coin-time"><span className={coin.Type === "WL" ? "dotWL" : 
                                                                                          coin.Type ==="PP" ? "dotPP" :
                                                                                          coin.Type == "PV" ? "dotPV" :
                                                                                          coin.Type == "LA" ? "dotLA" :
                                                                                          coin.Type == "FL" ? "dotFL" :
                                                                                          coin.Type == "VC" ? "dotVC": 
                                                                                          coin.Type == "NF" ? "dotNF" : "dot2"}></span>{coin.DateFormated}</p></Grid>
            <Grid item xs className="name-grid"><a href={coin.TG} target="_blank"> {coin.name} <span className="type-span">{coin.Type}</span></a></Grid>
            <Grid item xs className="chart-grid"><a href={coin.Poo} target="_blank">{coin.Poo2}...</a></Grid>
            </Grid>
            </div>
            )}
    </div>
    )
    }else if(coins.length <5){
        return( <div className="coins-wrapper">
            {console.log("a",coins,tomorrowCoins)}
        <p className="token-p">Upcoming events</p>
        <p className="date-p">TODAY {todayDisplay}</p>
        {coins.map(coin =>  
        <div className="coin-div">
            <Grid  container
                    direction="column"
                    justifyContent="center"
                    alignItems="center">
            <Grid item xs className="time-grid"><p className="coin-time"><span className={coin.Type === "WL" ? "dotWL" : 
                                                                                          coin.Type ==="PP" ? "dotPP" :
                                                                                          coin.Type == "PV" ? "dotPV" :
                                                                                          coin.Type == "LA" ? "dotLA" :
                                                                                          coin.Type == "FL" ? "dotFL" :
                                                                                          coin.Type == "VC" ? "dotVC": 
                                                                                          coin.Type == "NF" ? "dotNF" : "dot2"}></span>{coin.DateFormated}</p></Grid>
            <Grid item xs className="name-grid"><a href={coin.TG} target="_blank"> {coin.name} <span className="type-span">{coin.Type}</span></a></Grid>
            <Grid item xs className="chart-grid"><a href={coin.Poo} target="_blank">{coin.Poo2}...</a></Grid>
            </Grid>
            </div>
            )}
        <p className="date-p">{tomorrowDisplay}</p>
        {tomorrowCoins.map(coin =>  
        <div className="coin-div">
            <Grid  container
                    direction="column"
                    justifyContent="center"
                    alignItems="center">
            <Grid item xs className="time-grid"><p className="coin-time"><span className={coin.Type.includes("WL") ? "dotWL" : 
                                                                                          coin.Type.includes("PP") ? "dotPP" :
                                                                                          coin.Type.includes("PV") ? "dotPV" :
                                                                                          coin.Type.includes("LA") ? "dotLA" :
                                                                                          coin.Type.includes("FL") ? "dotFL" :
                                                                                          coin.Type.includes("VC") ? "dotVC": 
                                                                                          coin.Type.includes("NF") ? "dotNF" : "dot2"}></span>{coin.DateFormated}</p></Grid>
            <Grid item xs className="name-grid"><a href={coin.TG} target="_blank"> {coin.name} <span className="type-span">{coin.Type}</span></a></Grid>
            <Grid item xs className="chart-grid"><a href={coin.Poo} target="_blank">{coin.Poo2}...</a></Grid>
            </Grid>
            </div>
            )}
    </div>
    )
    }
}
   


export default Coin2;