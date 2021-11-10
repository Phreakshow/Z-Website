import React, { useEffect, useState } from "react";

function Coin() {
    const [coins,setCoins] = useState([])

    useEffect(() => {
        fetch("/Zbot").then(res=> {
            if(res.ok) {
                return res.json();
            }    
        }).then(jsonRes => setCoins(jsonRes))
    },[])
   
    
    return <div>
        <h1>Coins Page</h1>
        {coins.map(coin =>
            <h1>{coin.name} {coin.TG}</h1>
            )}
    </div>

}

export default Coin;