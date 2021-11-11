import React, { useEffect, useState } from "react";
import { flexbox } from '@mui/system';
import { Grid } from '@mui/material';
import { Box, ThemeProvider } from '@mui/system';



function Coin() {
    const [coins,setCoins] = useState([])

    useEffect(() => {
        fetch("/Zbot").then(res=> {
            if(res.ok) {
                return res.json();
            }    
        }).then(jsonRes => setCoins(jsonRes))
    },[])
   //Трите реда долу ша тряа са сменят....ма за разделител вършат раота
    
    return( <div>
        <h1>TOKEN FEED</h1>
        {coins.map(coin =>
            <Grid  container
                    direction="column"
                    justifyContent="center"
                    alignItems="center">
            
            <Grid item xs> {coin.name} </Grid>
            <Grid item xs> {coin.TG} </Grid>
            -------------- 
            </Grid>
            )}
    </div>
    )
}

export default Coin;