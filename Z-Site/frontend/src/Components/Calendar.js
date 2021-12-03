import React,{useEffect, useState, useRef} from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import styled from "@emotion/styled";
import "./Style.css";
import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'
import ModalPopup from "./ModalPopup.js";
import { color } from "@mui/system";
import axios from 'axios'

export default function Calendar(){
     const [events, setEvents] = useState([]);
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [modalProps,setModalProps] = useState("")


    
  useEffect(async()=>{
      let apiCall = async () =>{
          const res = await axios.get("http://localhost:3001/Zbot");
          setEvents(res.data)
      }
      apiCall();
       
  },[])


  const setModalIsOpenToTrue =()=>{
    setModalIsOpen(true)
}

const setModalIsOpenToFalse =()=>{
    setModalIsOpen(false)
}




console.log(events)

  let projectList = []

//___________________________

  //________________________________________
 

  for(let i = 0; i < events.length; i++){
    let obj = {};
    obj["title"] = events[i].Type.trim() +" " +  events[i].name 
    var str = events[i].DateFormated
    str = str.slice(0, 19) + str.slice(23);
    obj["start"] = str
    obj["pink"] = events[i].Pink
    obj["poo"] = events[i].Poo
    obj["tg"] = events[i].TG
    let typeStr = events[i].Type.split(" ").join("")
    obj["type"] = typeStr
    
    // LA, WL, PP, PV, VC , NF, FL, 
    let category = ""
    if(typeStr === "FL"){
      category = `fair-launch`} else if(typeStr === "WL"){
        category = `white-list`}else if(typeStr === "LA"){
          category = `launch`} else if(typeStr === "PP"){
            category = `public-presale`} else if(typeStr === "PV"){
              category = `private-sale`} else if(typeStr === "VC"){
                category = `voice-chat`}else if(typeStr === "NF"){
                  category = `nft`}
    obj["display"] = `block`
    obj["classNames"] = [category]
    obj["id"] = i;
    obj["dateForModal"] = events[i].DateFormated
    
    
    projectList.push(obj)
  
  }
  
  console.log(projectList)



  

 


  return (
    <div style={{ width: "100%", height: "100%" , margin:"10vh 0 0 0" }}>
    <StyleWrapper>
    <ModalPopup modalProps={modalProps} modalIsOpen={modalIsOpen} setModalIsOpenToTrue={setModalIsOpenToTrue} setModalIsOpenToFalse={setModalIsOpenToFalse}/>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,listWeek",
        }}
        expandRows="true"
        allDaySlot="false"
        eventTimeFormat= {{
  hour: 'numeric',
  minute: '2-digit',
  meridiem: 'short'
}}
        events={function (start, callback) {
        callback(projectList)}}
    eventClick = {(info)=>{ 
      setModalIsOpenToTrue(true)
      setModalProps(info.event._def)
      console.log(modalProps)
      
      
    }}

      />
      
      </StyleWrapper>
    </div>
  );
}










//-----------------------Styling
export const StyleWrapper = styled.div`
  .fc-direction-ltr .fc-toolbar > * > :not(:first-child) {
    margin-left: 9.75px
;
}

.fc-h-event .fc-event-main-frame {
    display: flex;
    flex-direction: column;
}


.fc-h-event .fc-event-title {
    margin-left:4px;
    display: flex;
    flex-wrap: wrap;
    vertical-align: top;
    
    padding: 0 1px;
    
}

.fc-direction-ltr .fc-daygrid-event .fc-event-time {
    
    margin-left:4px;
    
    /* text-xs/Medium */
    
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    /* identical to box height, or 133% */
    
    display: flex;
    align-items: center;
    
  
}



.white-list  { display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 1px;
    padding-bottom: 9px;
    margin: 4px;
    flex-wrap: nowrap;
    
background: #D3EFFC;
border-radius: 4px;
border-color: #D3EFFC;
border-left: 2px solid #0EA5E9;


font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 16px;
cursor: pointer;}

.white-list .fc-event-time {
  color:  #0369A1;
}

.white-list .fc-event-title {
  color:  #0369A1;
  
}

.fair-launch{ display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 1px;
    padding-bottom: 9px;
    margin: 4px;
    
    color:  #a10303;
background: #FEEDF5;
border-radius: 4px;
border-color: #FEEDF5;
border-left: 2px solid #EC4899;


font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 16px;
cursor: pointer;}

.fair-launch .fc-event-time {
  color:  #EC4899;
}
.fair-launch .fc-event-title {
  color:  #EC4899;
}


.launch{ display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 1px;
    padding-bottom: 9px;
    margin: 4px;
    
    color:  #006C0B;
background: #75FF83;
border-radius: 4px;
border-color: #75FF83;
border-left: 2px solid #51b15b;


font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 16px;
cursor: pointer;}

.launch .fc-event-time {
  color:  #006C0B;
}
.launch .fc-event-title {
  color:  #006C0B;
}

.public-presale{ display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 1px;
    padding-bottom: 9px;
    margin: 4px;
    
    color:  #757700;
background: #FAFC9E;
border-radius: 4px;
border-color: #FAFC9E;
border-left: 2px solid #F7FC16;


font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 16px;
cursor: pointer;}

.public-presale .fc-event-time {
  color:  #757700;
}
.public-presale .fc-event-title {
  color:  #757700;
}

.private-sale{ display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 1px;
    padding-bottom: 9px;
    margin: 4px;
    
    color:  #a10303;
background: #F8B95A;
border-radius: 4px;
border-color: #F8B95A;
border-left: 2px solid #FC9216;


font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 16px;
cursor: pointer;}

.private-sale .fc-event-time {
  color:  #774F00;
}
.private-sale .fc-event-title {
  color:  #774F00;
}

.voice-chat{ display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 1px;
    padding-bottom: 9px;
    margin: 4px;
    
    color:  #a10303;
background: 	#828df8;
border-radius: 4px;
border-color: 	#828df8;
border-left: 2px solid #0027F2;


font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 16px;
cursor: pointer;}

.voice-chat .fc-event-time {
  color:  #00116C;
}
.voice-chat .fc-event-title {
  color:  #00116C;
}

.nft{ display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 1px;
    padding-bottom: 9px;
    margin: 4px;
    
    color:  #a10303;
background: #FFACAC;
border-radius: 4px;
border-color: #FFACAC;
border-left: 2px solid #FF0606;


font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 16px;
cursor: pointer;}

.nft .fc-event-time {
  color:  #D40000;
}
.nft .fc-event-title {
  color:  #D40000;
}



.fc .fc-button {
  display: inline-block;
flex-direction: row;
align-items: flex-start;
padding: 0px;

position: static;
width: 64.87px;
height: 26.47px;
left: 54.87px;
top: 0px;


/* Inside Auto Layout */

flex: none;
order: 1;
flex-grow: 0;
margin: 0px 0px;
}


.fc .fc-button-primary:not(:disabled):active, .fc .fc-button-primary:not(:disabled).fc-button-active {
    color: #fff;
    color: var(--fc-button-text-color, #fff);
    background-color: #DC2626;
    border-radius: 7.46667px;
   border-color: rgba(255, 255, 255, 0.01)
    
}

.fc-direction-ltr .fc-button-group > .fc-button {
  font-family: 'Inter', sans-serif;
    margin-left: 0.15rem;
    border-radius: 7.46667px;
    color: #71717A;
    background: rgba(255, 255, 255, 0.01);
    border-color: rgba(255, 255, 255, 0.01)
}
.css-1ta79b3 .fc-direction-ltr .fc-toolbar>*>:not(:first-child) {
    margin-left: 9.75px;
}

.fc .fc-button-primary:not(:disabled):active:focus,
  .fc .fc-button-primary:not(:disabled).fc-button-active:focus {
    box-shadow: none;
  }

  .fc .fc-button:focus {
    outline: 0;
    box-shadow: none
  }


.fc .fc-timegrid-now-indicator-arrow {
    position: absolute;
    z-index: 4;
    margin-top: -5px;
    border-style: solid;
    border-color: #1976d2;
    border-color: var(--fc-now-indicator-color, #1976d2);
}

.fc-direction-ltr .fc-timegrid-now-indicator-arrow {
    left: 0;
    border-width: 5px 0 5px 6px;
    border-top-color: transparent;
    border-bottom-color: transparent;
}

.fc .fc-timegrid-now-indicator-line {
    position: absolute;
    z-index: 4;
    left: 0;
    right: 0;
    border-style: solid;
    border-color: #1976d2;
    border-color: var(--fc-now-indicator-color, #1976d2);
    border-width: 3px 0 0;
}

.fc .fc-timegrid-slot { /* a <td> */
  
    height: 3em;
    border-bottom: 0 /* each cell owns its top border */
  }





.fc .fc-list-event:hover td {
    background-color: rgba(208, 208, 208, 0.01);
    ;
  }


  .fc .fc-list-event-dot {
    display: none;
    box-sizing: content-box;
    width: 0;
    height: 0;
    border: 5px solid none;
    border: calc(var(--fc-list-event-dot-width, 10px) / 2) solid var(--fc-event-border-color, none);
    border-radius: 0px;
    border-radius: calc(var(--fc-list-event-dot-width, 10px) / 2);
  }

  .fc .fc-list-event-graphic,
  .fc .fc-list-event-time {
    
    width: 1.5rem;
    underline: none;
    border: 0px solid red;
  }

  .fc .fc-list-event-title  {
    color: inherit;
    border: 0px solid red;
  }

  .fc .fc-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.75rem
  }
  

  .fc-timegrid-event-harness > .fc-timegrid-event {
    position: absolute; /* absolute WITHIN the harness */
   
    flex-wrap: wrap;
  flex-direction: row;
    top: 0; /* for when not yet positioned */
    bottom: 0; /* " */
    left: 0;
    right: 0;
  }

  .fc .fc-toolbar-title {
    font-family: 'Inter', sans-serif;
    font-size: 1.75em;
    margin: 0;
}


`

 