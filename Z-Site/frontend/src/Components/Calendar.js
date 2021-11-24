import React,{useEffect, useState, useRef} from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import styled from "@emotion/styled";
import "./Style.css";


export default function Calendar(props){


  let projectList = []

//___________________________

  //________________________________________
  

  for(let i = 0; i < props.props.length; i++){
    let obj = {};
    obj["title"] = props.props[i].Type.trim() + " " +  props.props[i].name 
    var str = props.props[i].DateFormated
    str = str.slice(0, 19) + str.slice(23);
    obj["start"] = str
    obj["pink"] = props.props[i].Pink
    obj["poo"] = props.props[i].Poo
    obj["tg"] = props.props[i].TG
    let typeStr = props.props[i].Type.split(" ").join("")
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
    obj["classNames"] =[category]
    
    projectList.push(obj)
  
  }
  console.log(props.props)
  console.log(projectList)





  


  return (
    <div style={{ width: "100%", height: "100%" }}>
    <StyleWrapper>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,listWeek",
        }}
        expandRows="true"
        
        eventTimeFormat= {{
  hour: 'numeric',
  minute: '2-digit',
  meridiem: 'short'
}}
        events={function (start, callback) {
        callback(projectList);
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
    white-space: normal;
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
  
    
background: rgba(14, 165, 233, 0.1);;
border-radius: 4px;
border-color: rgba(255, 255, 255, 0.9);
border-left: 2px solid #0EA5E9;


font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 16px;}

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
border-color: rgba(255, 255, 255, 0.9);
border-left: 2px solid #EC4899;


font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 16px;}

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
    
    color:  #a10303;
background: #75FF83;
border-radius: 4px;
border-color: #75FF83;
border-left: 2px solid #51b15b;


font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 16px;}

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
    
    color:  #a10303;
background: #FAFC9E;
border-radius: 4px;
border-color: #FAFC9E;
border-left: 2px solid #F7FC16;


font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 16px;}

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
line-height: 16px;}

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
background: #808CFA;
border-radius: 4px;
border-color: #808CFA;
border-left: 2px solid #0027F2;


font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 16px;}

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
line-height: 16px;}

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
    background-color: #1976d2;
    background-color: var(--fc-button-active-bg-color, #1976d2);
    
}


.fc .fc-button-primary:not(:disabled):active:focus,
  .fc .fc-button-primary:not(:disabled).fc-button-active:focus {
    box-shadow: none;
  }

  

`