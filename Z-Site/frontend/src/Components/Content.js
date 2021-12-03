import React, { useEffect, useState } from 'react'
import { flexbox, height } from '@mui/system';
import { Box } from '@mui/system';
import Calendar from './Calendar'
import Sidebar from './Sidebar'
import axios from 'axios'
function Content() {
    const [data,setData] = useState([])
    
    useEffect(async()=>{
        let apiCall = async () =>{
            const res = await axios.get("http://localhost:3001/Zbot");
            setData(res.data)
        }
        apiCall();
         
    },[])

   
   console.log(data)

   let calendarData = []
   calendarData = data

    return (
        <div>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', width: "25%" ,height:"100%",  flexWrap: 'nowrap', backgroundColor: "#202124" }}>
            <Sidebar props={data}/>
        </Box>
        <Box sx={{ display: 'flex',  width: "75%", flexWrap: 'wrap' }}>
        <Calendar />
        </Box>
        </Box>
        </div>
    )
}

export default Content
