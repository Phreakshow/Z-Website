import React from 'react'
import { flexbox } from '@mui/system';
import { Box } from '@mui/system';
import Calendar from './Calendar'
import Sidebar from './Sidebar'

function Content() {
    return (
        <div>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', width: "25%", flexWrap: 'wrap' }}>
            <Sidebar/>
        </Box>
        <Box sx={{ display: 'flex', width: "75%", flexWrap: 'wrap' }}>
        <Calendar/>
        </Box>
        </Box>
        </div>
    )
}

export default Content
