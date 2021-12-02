import React from 'react';
import Content from './Components/Content'
import Navbar from './Components/Navbar'
import './appStyle.css'


function App(){
    return(
        <div className="container-app">
            <Navbar />
            <Content />
         
        </div>
    )
}

export default App;