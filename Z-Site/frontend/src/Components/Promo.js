import React, { useState } from "react";
import ResponsivePlayer from "./ResponsivePlayer";
import './Promo.css'
let counter =0;

//Работи само с мп4 , за снимки ще трябва да измисля нещо друго и switch :
//тук слагам лоадинг мп4----------------------

let arr = ["https://imgur.com/xnT2suj.mp4"];
let arrTG = [];
const Promo = ({props}) => {
    const [url,setUrl] = useState('https://imgur.com/xnT2suj.mp4')
    //всички монети са в coinS-----------------
    let coinS = props
   
    //филтрираме само монетите който са промотед и имат медиен файл , и ги слагаме в арей------------
    if(arr.length <2){
        for(let i = 0;i<coinS.length;i++){
            if(coinS[i].PromoLink != undefined){
                arr.unshift(coinS[i].PromoLink)
                arrTG.unshift(coinS[i].TG)
            }
        }    
    }
    console.log(arr)
    //вземаме дължината на арея и когата наближи края на видеото вървящо вмомента 
    //вдигаме стойността на counter с 1 , като после пращаме линка намиращ се на arr[counter]
    //когато стигнем предпоследно място в арея, ресетваме counter и процеса започва наново--------
    let len = arr.length
    const handleWatchComplete = ({played}) => {
        if(played >0.99){
            if(counter < len-1){
                setUrl(arr[counter])
                counter++
            }else if(counter == len-1){
                counter = 0
                setUrl(arr[counter])
                counter++
            }
        }
    }
    return(
        <div className="promo-wrapper">
            <button onClick={()=> window.open(arrTG[counter-1] , "_blank")} className="player-button">
            <ResponsivePlayer
             url={url}
             onProgress={handleWatchComplete}
             
             />
             </button>
        </div>
    )
}
export default Promo;