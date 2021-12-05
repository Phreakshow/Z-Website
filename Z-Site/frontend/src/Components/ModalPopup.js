import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from "@emotion/styled";
import "./Style.css";

function ModalPopup({modalIsOpen,setModalIsOpenToTrue,setModalIsOpenToFalse, modalProps}) {
    

let backgroundVar = ""
let borderVar = ""
let textColor = ""
switch(modalProps.extendedProps?.type){
    case "FL":
      backgroundVar = "#FEEDF5"
      borderVar = "0.5rem solid #EC4899"
      textColor = "#EC4899"
      break;
    case "WL":
      backgroundVar = "#D3EFFC"
      borderVar = "0.5rem solid #0EA5E9"
      textColor = "#0369A1"
      break;
    case "LA":
      backgroundVar = "#75FF83"
      borderVar = "0.5rem solid #51b15b"
      textColor = "#006C0B"
      break;  
      case "PP":
        backgroundVar = "#FAFC9E"
        borderVar = "0.5rem solid #F7FC16"
        textColor = "#757700"
        break;
        case "PV":
          backgroundVar = "#F8B95A"
          borderVar = "0.5rem solid #FC9216"
          textColor = "#774F00"
          break;
          case "VC":
          backgroundVar = "	#828df8"
          borderVar = "0.5rem solid #0027F2"
          textColor = "#00116C"
          break;  
          case "NF":
            backgroundVar = "#FFACAC"
            borderVar = "0.5rem solid #FF0606"
            textColor = "#D40000"
            break;  
    default:
      backgroundVar = ""
      borderVar = ""
}
 
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "25rem",
        maxWidth: "75%",
        bgcolor: 'background.paper',
        border: '1rem solid',
        boxShadow: 24,
        p: 4,

        color: textColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "8px",
        
        flexWrap: "nowrap",
        
    background: backgroundVar ,
    borderRadius: "0.8rem",
    borderColor: backgroundVar,
    borderLeft: borderVar,
    


    
    
      };
      
      let telegramLink = ""
      if( modalProps.extendedProps?.tg !== undefined){
          if(modalProps.extendedProps.tg != null){
       telegramLink = modalProps.extendedProps.tg
         } else {
             telegramLink = "N/A"
         }}

     let date = ""
     let time = ""
         if( modalProps.extendedProps?.dateForModal !== undefined){
          date = new Date(modalProps.extendedProps.dateForModal);
          time = date.getHours() + ':' + date.getMinutes() + (date.getMinutes()<10?'0':'')
          date = date.getDate() +'.' + (date.getMonth()+1) + '.'+ date.getFullYear()
            } else {
                date = "N/A"
                time = "N/A"	
            }
   
    
      
       const pooCoinCheck = () => {
        let poo = ""
        if( modalProps.extendedProps?.poo !== undefined){
            if(modalProps.extendedProps.poo != null){
            poo = modalProps.extendedProps.poo
            return <a href={poo} target="_blank">Link</a>
           }
           
             else {
            return  "N/A"
           }}
            
       }


       const presaleCheck = () => {
        let presale = ""
        if( modalProps.extendedProps?.pink !== undefined){
            if(modalProps.extendedProps.pink != null){
            presale = modalProps.extendedProps.pink
            return <a href={presale} target="_blank">Link</a>
           }
           
             else {
            return  "N/A"
           }}
            
       }
    
    return(
        <>
           

            <Modal
  open={modalIsOpen}
  onBackdropClick={()=>{setModalIsOpenToFalse()}}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  keepMounted
 
>
   <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2" >
   <b>{modalProps.title}</b>
    </Typography>
    
    <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ fontWeight: 600 }}>
    Date: {date}
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ fontWeight: 600 }}>
    Time: {time}
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ fontWeight: 600 }}>
    Telegram Group: <a href={telegramLink} target="_blank">Link</a>
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ fontWeight: 600 }}>
    Poocoin Link: {pooCoinCheck()}
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ fontWeight: 600 }}>
    Presale Link: {presaleCheck()}
    </Typography>
  </Box>
  
</Modal>
        </>
    )
  };


export default ModalPopup






 