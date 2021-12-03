import React,{useEffect, useState} from "react";
import { Grid } from '@mui/material';
import './Coin2.css'

let timing = 100;

function Coin2(data){
    const [coins,setCoins] = useState([])
    const [tomorrowCoins,setTomorrowCoins] = useState([])
    const [tomorrowHelper,setTomorrowHelper] = useState([])
    const [todayDisplay,setTodayDisplay] = useState(",")
    const [tomorrowDisplay,setTomorrowDisplay] = useState(",")
    const [counter,setCounter] = useState(0)
    
    let coinS = [];
    coinS = data.data.map((x)=>x)
    console.log(coinS)
    useEffect(() => {
        let timer = setInterval(()=>{


                //вземаме сегашното време UTC в дата и час - в числа -----
                //тук е голям мармалад има по-добра имплентация ,но за сега това върши работа ;_;
                let date = new Date()
                // let year = date.getUTCFullYear()
                // let month = date.getUTCMonth() + 1;
                // let daysInMonth = new Date(year,month,0).getDate();
                // let day = date.getUTCDate();
                // let hour = date.getUTCHours();
                // let minutes = date.getUTCMinutes();

                let year = date.getFullYear()
                let month = date.getMonth() + 1;
                let daysInMonth = new Date(year,month,0).getDate();
                let day = date.getDate();
                let hour = date.getHours();
                let minutes = date.getMinutes();
                
                if(minutes < 10){
                    minutes = '0' + minutes
                }
                if(day < 10){
                    day = "0" + day
                }
                let utcDiff = -(new Date().getTimezoneOffset() / 60)
                

                let currentTime = hour + '.' + minutes 
                let todayD = month  + '/' + day + '/' + year;
                setTodayDisplay(todayD)
                let tomorrowD = year;
                let helperDay = Number(day)
                let helperMonth = Number(month)
                let helperYear = year
                

                // утрешната дата ако мине дните на месеца да смени месеца или година и
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
                   
                }else {
                    helperDay += 1
                    if(helperDay <10){
                        helperDay = "0" + helperDay
                    }
                    tomorrowD = month + '/' + helperDay + "/" + year;
                }

                let tomorrowCheck = helperMonth + "."+helperDay
                let daysInMonthCoin = helperMonth +"."+daysInMonth
                daysInMonthCoin = Number(daysInMonthCoin)
                
                tomorrowCheck = Number(tomorrowCheck)
                
                setTomorrowDisplay(tomorrowD)
                let today = month +'.' + day
                currentTime = Number(currentTime)
                today = Number(today)
               
                //------------------------------------------------------------

                //филтриране на токените -------------------------------------
                //тук има 100% по-добре имплентация , но за сега това работи--
                let coinsLenght = coinS.length
                let filteredCoins = [];
                let tmrCoins = [];
                let tmrHelper = [];

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
                        coinS[i].Time2 = coinS[i].Time + utcDiff 


                        
                        if(coinS[i].Time2 >= 24){
                            
                            let helperDate = coinS[i].Date + 0.01
                            
                            if(helperDate > daysInMonthCoin){
                                helperDate = month +1+ helperDate - daysInMonthCoin
                                
                                if(helperDate > 12.31){
                                    helperDate = 1.01
                                }
                            }
                            coinS[i].Date = helperDate 
                            let h = coinS[i].Time2 - 24
                            coinS[i].Time = h
                            coinS[i].flagged = true
                        }
                    }
                    console.log(coinS)
                   //всички токени който са с днешна дата и са в следващите часове------------

                   for(let i =0;i<coinsLenght;i++){
                        if(coinS[i].Date == today){
                            if(coinS[i].Time2 > currentTime){
                                //PM -----------------------------------
                                
                                if(coinS[i].Time2 >12){
                                    let helpr = coinS[i].Time2 - 12.0
                                    if(helpr < 10){
                                        helpr = "0" + helpr.toFixed(2)
                                        helpr = helpr.replace('.',':')
                                        helpr = helpr + ' ' + "PM"
                                        coinS[i].DateFormated = helpr
                                    }else {
                                        helpr = helpr.toFixed(2);
                                        helpr = helpr.replace('.',':')
                                        helpr = helpr + ' ' + "PM"
                                        coinS[i].DateFormated = helpr
                                    }
                                }
                                //AM -----------------------------------
                                else if(coinS[i].Time2 <= 12){
                                    let helpr = coinS[i].Time2
                                    if(helpr ==2){
                                        coinS[i].DateFormated = "12:00 AM"
                                    }else if(helpr ==12){
                                        coinS[i].DateFormated = "12:00 PM"
                                    }
                                    else if(helpr < 10){
                                        helpr = "0" + helpr.toFixed(2)
                                        helpr = helpr.replace('.',':')
                                        helpr = helpr + ' ' + "AM"
                                        coinS[i].DateFormated = helpr
                                    }else{
                                        helpr = helpr.toFixed(2);
                                        helpr = helpr.replace('.',':')
                                        helpr = helpr + ' ' + "AM"
                                        coinS[i].DateFormated = helpr
                                    }
                                }
                                //--------------------------------------
                                
                            }
                            
                            if(coinS[i].Time2 > currentTime){
                                
                                filteredCoins.push(coinS[i])
                            }
                        }
                        
                        /// TOMORROW -------------------------------------------------------
                        //----------------------------------------------
                        //------------------------------------------------------------------
                        if(coinS[i].Date == tomorrowCheck){
                            if(coinS[i].DateFormated.length > 20){

                                //PM -------------------------------------------
                                if(coinS[i].flagged === true){
                                    console.log("flagged",coinS[i])
                                    console.log(coinS[i].Time2)
                                    let helper = coinS[i].Time
                                    helper = helper.toFixed(2)
                                    let time2 = -coinS[i].Time
                                    console.log(time2)
                                    coinS[i].Time = time2
                                    tmrHelper.push(coinS[i])
                                    if(helper == 0){
                                        coinS[i].DateFormated = "12:00 AM"
                                    }
                                    else if(helper < 10){
                                        helper = "0" + helper + " AM"
                                        helper = helper.replace('.',':')
                                        coinS[i].DateFormated = helper
                                    }
                                    console.log("helping",helper)
                                }
                                else if(coinS[i].Time2 >12){
                                    let helpr = coinS[i].Time2 - 12.0
                                    console.log(coinS[i],helpr)
                                    if(helpr < 10){
                                        helpr = "0" + helpr.toFixed(2)
                                        helpr = helpr.replace('.',':')
                                        helpr = helpr + ' ' + "PM"
                                        coinS[i].DateFormated = helpr
                                    }else{
                                        helpr = helpr.toFixed(2);
                                        helpr = helpr.replace('.',':')
                                        helpr = helpr + ' ' + "PM"
                                        coinS[i].DateFormated = helpr
                                        console.log(coinS[i])
                                    }
                                }
                                
                                //AM -----------------------------------
                                else if(coinS[i].Time2 <= 12){
                                    let helpr = coinS[i].Time2
                                    if(helpr ==2){
                                        coinS[i].DateFormated = "12:00 AM"
                                    }else if(helpr ==12){
                                        coinS[i].DateFormated = "12:00 PM"
                                    }
                                    else if(helpr < 10){
                                        helpr = "0" + helpr.toFixed(2)
                                        helpr = helpr.replace('.',':')
                                        helpr = helpr + ' ' + "AM"
                                        coinS[i].DateFormated = helpr
                                    }else{
                                        helpr = helpr.toFixed(2);
                                        helpr = helpr.replace('.',':')
                                        helpr = helpr + ' ' + "AM"
                                        coinS[i].DateFormated = helpr
                                    }
                                }
                             }
                             if(coinS[i].Poo != null){
                                coinS[i].Poo2 = coinS[i].Poo.slice(0,32)
                            }
                            tmrCoins.push(coinS[i])
                        }
                    }
                    //console.log(filteredCoins) 
                    //сортираме в възходящ ред ------------------------------------------------
                    filteredCoins.sort((a,b) => {
                        return a.Time - b.Time
                    })
                    console.log("tmr",tmrHelper)
                    tmrHelper.sort((a,b) => {
                        return b.Time - a.Time
                    })
                    console.log("tmr",tmrHelper)
                    tmrCoins.sort((a,b) => {
                        return a.Time - b.Time
                    })

                    if(tmrHelper.length > 1){
                       setTomorrowHelper(tmrHelper)
                    }
                    console.log(tomorrowHelper)
                    tmrCoins.splice(0,tomorrowHelper.length,...tomorrowHelper)
                   // ----------
                    //setCoins(filteredCoins)
                    if(filteredCoins.length<20){
                        let index = 20 - filteredCoins.length
                        tmrCoins = tmrCoins.slice(0,index)
                        setTomorrowCoins(tmrCoins)
                        setCoins(filteredCoins)
                    }else {
                        setCoins(filteredCoins)
                    }
    
                console.log(counter)
                if(counter >2){
                    timing = 60000
                }

                setCounter(counter + 1)
        },timing)

        return function cleanup(){
            clearInterval(timer)
        }

    },[counter])
    console.log(coins,tomorrowCoins)
    if(coins.length>=20){
        return( <div className="coins-wrapper">
        <p className="token-p">Upcoming events</p>
        <p className="date-p">TODAY {todayDisplay}</p>
        {coins.map(coin =>  
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
            <Grid item xs className={coin.Type.includes("PP") ? "chart-grid-PP" : "chart-grid"}><a href={coin.Poo} target="_blank">{coin.Poo2}...</a></Grid>
            </Grid>
            {/* chart-grid */}
            </div> 
            )}
    </div>
    )
    }else if(coins.length <20){
        return( <div className="coins-wrapper">
        <p className="token-p">Upcoming events</p>
        <p className="date-p">TODAY {todayDisplay}</p>
        {coins.map(coin =>  
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
        <p className="date-p">TOMORROW {tomorrowDisplay}</p>
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